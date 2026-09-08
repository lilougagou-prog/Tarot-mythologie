// Backend serverless (Vercel) — la sauvegarde cloud elle-même, une fois connecté.
//
// GET  -> { data: {...} | null, updatedAt: string | null }   récupère la dernière sauvegarde enregistrée
// POST { data: {...} } -> { ok: true, updatedAt }             remplace intégralement la sauvegarde enregistrée
//
// `data` a exactement la même forme que le contenu de exportBackupData() côté client (un objet
// {clé localStorage: valeur}) — ce endpoint ne fait que poser ce même objet en base, jamais un
// nouveau format. Toujours authentifié par un jeton de session valide (voir
// _lib/session.js — Authorization: Bearer <token>), jamais par le seul APP_ACCESS_CODE : la
// session prouve déjà quel compte agit, un code d'accès partagé n'apporterait rien de plus ici.
const { sql, ensureSchema } = require("./_lib/db");
const { verifySessionFromRequest } = require("./_lib/session");

const MAX_PAYLOAD_BYTES = 5 * 1024 * 1024; // 5 Mo — très généreux pour du texte de localStorage

module.exports = async function handler(req, res){
  if(req.method !== "GET" && req.method !== "POST"){
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }
  if(!process.env.DATABASE_URL){
    res.status(500).json({ error: "Le compte n'est pas encore configuré côté serveur." });
    return;
  }

  const userId = await verifySessionFromRequest(req).catch(() => null);
  if(!userId){
    res.status(401).json({ error: "Session expirée ou invalide — reconnecte-toi." });
    return;
  }

  const s = sql();
  await ensureSchema();

  if(req.method === "GET"){
    try{
      const rows = await s`SELECT data, updated_at FROM user_data WHERE user_id = ${userId}`;
      if(!rows.length){ res.status(200).json({ data: null, updatedAt: null }); return; }
      res.status(200).json({ data: rows[0].data, updatedAt: rows[0].updated_at });
    } catch(err){
      console.error("Erreur GET /api/sync-data:", err);
      res.status(500).json({ error: "Impossible de récupérer la sauvegarde pour le moment." });
    }
    return;
  }

  // POST
  const body = req.body || {};
  if(!body.data || typeof body.data !== "object" || Array.isArray(body.data)){
    res.status(400).json({ error: "Requête invalide : { data: {...} } attendu." });
    return;
  }
  const size = Buffer.byteLength(JSON.stringify(body.data), "utf8");
  if(size > MAX_PAYLOAD_BYTES){
    res.status(413).json({ error: "Sauvegarde trop volumineuse." });
    return;
  }
  try{
    const rows = await s`
      INSERT INTO user_data (user_id, data, updated_at) VALUES (${userId}, ${JSON.stringify(body.data)}, now())
      ON CONFLICT (user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()
      RETURNING updated_at
    `;
    res.status(200).json({ ok: true, updatedAt: rows[0].updated_at });
  } catch(err){
    console.error("Erreur POST /api/sync-data:", err);
    res.status(500).json({ error: "Impossible d'enregistrer la sauvegarde pour le moment." });
  }
};
