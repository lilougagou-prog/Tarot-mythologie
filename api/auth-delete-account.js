// Backend serverless (Vercel) — supprime définitivement le compte : ses identifiants, toutes
// ses sessions et sa sauvegarde cloud (user_data), en une seule requête. Les contraintes
// ON DELETE CASCADE posées sur sessions.user_id et user_data.user_id (voir _lib/db.js) suffisent
// à tout effacer d'un coup dès que la ligne users correspondante disparaît — pas de suppression
// manuelle table par table à maintenir en synchro. N'efface JAMAIS les données restées en
// localStorage sur les appareils déjà synchronisés : seul ce qui vivait côté serveur pour ce
// compte disparaît (exactement le même principe que désinstaller l'app pour les données locales
// — voir la politique de confidentialité).
const { sql, ensureSchema } = require("./_lib/db");
const { verifySessionFromRequest } = require("./_lib/session");

module.exports = async function handler(req, res){
  if(req.method !== "POST"){
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

  try{
    await ensureSchema();
    const s = sql();
    await s`DELETE FROM users WHERE id = ${userId}`;
    res.status(200).json({ ok: true });
  } catch(err){
    console.error("Erreur /api/auth-delete-account:", err);
    res.status(500).json({ error: "Impossible de supprimer le compte pour le moment." });
  }
};
