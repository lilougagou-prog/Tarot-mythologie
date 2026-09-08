// Backend serverless (Vercel) — regroupe les 6 endpoints du compte utilisateur (bêta) dans un
// seul fichier (auparavant auth-signup.js, auth-login.js, auth-logout.js,
// auth-delete-account.js, sync-data.js et cleanup-rate-limits.js) pour rester sous la limite de
// 12 fonctions serverless du plan Hobby Vercel — la première tentative de déploiement de ce
// chantier a échoué avec "No more than 12 Serverless Functions can be added to a Deployment on
// the Hobby plan" (18 fonctions routables dans api/ à ce moment-là, code du repo déjà passé par
// deux app sœurs sans qu'aucune des deux n'ait jamais eu besoin d'autant d'endpoints séparés).
// Regrouper plutôt que de payer un plan Pro : chaque action ci-dessous reste un morceau de code
// aussi isolé qu'avant, juste routé par ?action= plutôt que par un chemin dédié — aucun
// changement de comportement, seulement de forme.
//
// POST /api/account?action=signup          { email, password } -> { token, email }
// POST /api/account?action=login           { email, password } -> { token, email }
// POST /api/account?action=logout          (Authorization: Bearer <token>) -> { ok: true }
// POST /api/account?action=delete-account  (Authorization: Bearer <token>) -> { ok: true }
// GET  /api/account?action=sync-data       (Authorization: Bearer <token>) -> { data, updatedAt }
// POST /api/account?action=sync-data       { data } + Authorization -> { ok: true, updatedAt }
// GET  /api/account?action=cleanup         (Authorization: Bearer CRON_SECRET, Vercel Cron) -> { ok: true, ... }
//
// Voir README « Compte (bêta) — sauvegarde cloud » pour la logique détaillée de chaque action ;
// ce fichier ne fait qu'assembler ce qui vivait avant dans 6 fichiers séparés.
const { sql, ensureSchema } = require("./_lib/db");
const { hashPassword, verifyPassword, isPasswordValid } = require("./_lib/password");
const { createSession, verifySessionFromRequest, deleteSession } = require("./_lib/session");
const { checkRateLimit, clientIp } = require("./_lib/rate-limit");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SYNC_PAYLOAD_BYTES = 5 * 1024 * 1024; // 5 Mo — très généreux pour du texte de localStorage

function checkAccessCode(req, res){
  const requiredCode = process.env.APP_ACCESS_CODE;
  if(!requiredCode) return true;
  const providedCode = req.headers["x-app-access-code"];
  if(providedCode !== requiredCode){
    res.status(401).json({ error: "Code d'accès manquant ou incorrect." });
    return false;
  }
  return true;
}
function requireDatabase(req, res){
  if(process.env.DATABASE_URL) return true;
  res.status(500).json({ error: "Le compte n'est pas encore configuré côté serveur." });
  return false;
}

async function actionSignup(req, res){
  if(req.method !== "POST"){ res.status(405).json({ error: "Méthode non autorisée." }); return; }
  if(!checkAccessCode(req, res)) return;

  const { allowed } = await checkRateLimit(`signup:${clientIp(req)}`, 5).catch(() => ({ allowed: true }));
  if(!allowed){ res.status(429).json({ error: "Trop de tentatives, réessaie dans une minute." }); return; }

  const body = req.body || {};
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = body.password;

  if(!EMAIL_RE.test(email)){ res.status(400).json({ error: "Adresse e-mail invalide." }); return; }
  if(!isPasswordValid(password)){ res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." }); return; }
  if(!requireDatabase(req, res)) return;

  try{
    await ensureSchema();
    const s = sql();
    const { hash, salt } = hashPassword(password);
    let userId;
    try{
      const rows = await s`INSERT INTO users (email, password_hash, password_salt) VALUES (${email}, ${hash}, ${salt}) RETURNING id`;
      userId = rows[0].id;
    } catch(err){
      if(err && err.code === "23505"){ // contrainte d'unicité email violée
        res.status(409).json({ error: "Un compte existe déjà avec cette adresse e-mail." });
        return;
      }
      throw err;
    }
    const token = await createSession(userId);
    res.status(201).json({ token, email });
  } catch(err){
    console.error("Erreur /api/account?action=signup:", err);
    res.status(500).json({ error: "Impossible de créer le compte pour le moment." });
  }
}

async function actionLogin(req, res){
  if(req.method !== "POST"){ res.status(405).json({ error: "Méthode non autorisée." }); return; }
  if(!checkAccessCode(req, res)) return;

  const body = req.body || {};
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const ip = clientIp(req);
  const [byIp, byEmail] = await Promise.all([
    checkRateLimit(`login-ip:${ip}`, 10).catch(() => ({ allowed: true })),
    email ? checkRateLimit(`login-email:${email}`, 10).catch(() => ({ allowed: true })) : Promise.resolve({ allowed: true }),
  ]);
  if(!byIp.allowed || !byEmail.allowed){ res.status(429).json({ error: "Trop de tentatives, réessaie dans une minute." }); return; }

  if(!email || !password){ res.status(400).json({ error: "E-mail et mot de passe requis." }); return; }
  if(!requireDatabase(req, res)) return;

  try{
    await ensureSchema();
    const s = sql();
    const rows = await s`SELECT id, password_hash, password_salt FROM users WHERE email = ${email}`;
    const user = rows[0];
    // Un hachage factice tourne même si le compte n'existe pas, pour que le temps de réponse ne
    // trahisse pas l'existence (ou non) d'un compte à cette adresse.
    const ok = user
      ? verifyPassword(password, user.password_hash, user.password_salt)
      : (verifyPassword(password, "0".repeat(128), "00"), false);
    if(!ok){ res.status(401).json({ error: "E-mail ou mot de passe incorrect." }); return; }
    const token = await createSession(user.id);
    res.status(200).json({ token, email });
  } catch(err){
    console.error("Erreur /api/account?action=login:", err);
    res.status(500).json({ error: "Impossible de te connecter pour le moment." });
  }
}

async function actionLogout(req, res){
  if(req.method !== "POST"){ res.status(405).json({ error: "Méthode non autorisée." }); return; }
  const auth = req.headers["authorization"];
  const token = typeof auth === "string" && auth.startsWith("Bearer ") ? auth.slice("Bearer ".length).trim() : "";
  if(token){
    try{ await deleteSession(token); }
    catch(err){ console.error("Erreur /api/account?action=logout:", err); }
  }
  res.status(200).json({ ok: true });
}

async function actionDeleteAccount(req, res){
  if(req.method !== "POST"){ res.status(405).json({ error: "Méthode non autorisée." }); return; }
  if(!requireDatabase(req, res)) return;
  const userId = await verifySessionFromRequest(req).catch(() => null);
  if(!userId){ res.status(401).json({ error: "Session expirée ou invalide — reconnecte-toi." }); return; }
  try{
    await ensureSchema();
    const s = sql();
    await s`DELETE FROM users WHERE id = ${userId}`;
    res.status(200).json({ ok: true });
  } catch(err){
    console.error("Erreur /api/account?action=delete-account:", err);
    res.status(500).json({ error: "Impossible de supprimer le compte pour le moment." });
  }
}

async function actionSyncData(req, res){
  if(req.method !== "GET" && req.method !== "POST"){ res.status(405).json({ error: "Méthode non autorisée." }); return; }
  if(!requireDatabase(req, res)) return;

  const userId = await verifySessionFromRequest(req).catch(() => null);
  if(!userId){ res.status(401).json({ error: "Session expirée ou invalide — reconnecte-toi." }); return; }

  const s = sql();
  await ensureSchema();

  if(req.method === "GET"){
    try{
      const rows = await s`SELECT data, updated_at FROM user_data WHERE user_id = ${userId}`;
      if(!rows.length){ res.status(200).json({ data: null, updatedAt: null }); return; }
      res.status(200).json({ data: rows[0].data, updatedAt: rows[0].updated_at });
    } catch(err){
      console.error("Erreur GET /api/account?action=sync-data:", err);
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
  if(size > MAX_SYNC_PAYLOAD_BYTES){ res.status(413).json({ error: "Sauvegarde trop volumineuse." }); return; }
  try{
    const rows = await s`
      INSERT INTO user_data (user_id, data, updated_at) VALUES (${userId}, ${JSON.stringify(body.data)}, now())
      ON CONFLICT (user_id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()
      RETURNING updated_at
    `;
    res.status(200).json({ ok: true, updatedAt: rows[0].updated_at });
  } catch(err){
    console.error("Erreur POST /api/account?action=sync-data:", err);
    res.status(500).json({ error: "Impossible d'enregistrer la sauvegarde pour le moment." });
  }
}

async function actionCleanup(req, res){
  const requiredSecret = process.env.CRON_SECRET;
  if(requiredSecret){
    const auth = req.headers["authorization"];
    if(auth !== `Bearer ${requiredSecret}`){ res.status(401).json({ error: "Non autorisé." }); return; }
  }
  if(!process.env.DATABASE_URL){ res.status(200).json({ ok: true, skipped: "DATABASE_URL non configurée." }); return; }
  try{
    await ensureSchema();
    const s = sql();
    const rateLimitsCutoff = new Date(Date.now() - 60 * 60 * 1000);
    const [deletedRateLimits, deletedSessions] = await Promise.all([
      s`DELETE FROM rate_limits WHERE created_at < ${rateLimitsCutoff}`,
      s`DELETE FROM sessions WHERE expires_at < now()`,
    ]);
    res.status(200).json({ ok: true, deletedRateLimits: deletedRateLimits.length ?? deletedRateLimits.count ?? null, deletedSessions: deletedSessions.length ?? deletedSessions.count ?? null });
  } catch(err){
    console.error("Erreur /api/account?action=cleanup:", err);
    res.status(500).json({ error: "Purge impossible pour le moment." });
  }
}

const ACTIONS = {
  signup: actionSignup,
  login: actionLogin,
  logout: actionLogout,
  "delete-account": actionDeleteAccount,
  "sync-data": actionSyncData,
  cleanup: actionCleanup,
};

module.exports = async function handler(req, res){
  const action = req.query && req.query.action;
  const fn = ACTIONS[action];
  if(!fn){
    res.status(400).json({ error: "Requête invalide : ?action= manquant ou inconnu." });
    return;
  }
  await fn(req, res);
};
