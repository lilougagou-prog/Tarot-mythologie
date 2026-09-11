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
// POST /api/account?action=contact         { type, message, email? } -> { ok: true }
// GET  /api/account?action=ai-usage        (Authorization: Bearer ADMIN_SECRET) -> { total, byKind, last30Days }
//
// Voir README « Compte (bêta) — sauvegarde cloud » pour la logique détaillée de chaque action ;
// ce fichier ne fait qu'assembler ce qui vivait avant dans 6 fichiers séparés (et désormais
// "contact", ajouté ici pour la même raison plutôt que dans un 13e fichier api/contact.js —
// voir _lib/contact-db.js pour ce qui distingue cette action des cinq premières : une connexion
// Postgres différente, CONTACT_DATABASE_URL, vers la base de l'app sœur Panthéon).
const { sql, ensureSchema } = require("./_lib/db");
const { hashPassword, verifyPassword, isPasswordValid } = require("./_lib/password");
const { createSession, verifySessionFromRequest, deleteSession } = require("./_lib/session");
const { checkRateLimit, clientIp } = require("./_lib/rate-limit");
const { ensureContactSchema, insertContactMessage } = require("./_lib/contact-db");
const { getAiUsageStats } = require("./_lib/ai-usage");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SYNC_PAYLOAD_BYTES = 5 * 1024 * 1024; // 5 Mo — très généreux pour du texte de localStorage
const CONTACT_TYPES = new Set(["question", "bug", "autre"]);
const MAX_CONTACT_MESSAGE_LENGTH = 4000;

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

// Formulaire "Nous contacter" (voir renderContact()/showContact() dans app.js) — stockage
// simple, jamais d'envoi d'email automatique : les messages atterrissent dans la même table que
// ceux de Panthéon (voir _lib/contact-db.js) et se consultent depuis une seule page, côté
// Panthéon (admin-messages.html), plutôt que d'avoir une boîte de réception par app.
async function actionContact(req, res){
  if(req.method !== "POST"){ res.status(405).json({ error: "Méthode non autorisée." }); return; }
  if(!checkAccessCode(req, res)) return;

  const { allowed } = await checkRateLimit(`contact:${clientIp(req)}`, 5).catch(() => ({ allowed: true }));
  if(!allowed){ res.status(429).json({ error: "Trop de messages envoyés, réessaie dans quelques minutes." }); return; }

  const body = req.body || {};
  const type = body.type;
  if(!CONTACT_TYPES.has(type)){ res.status(400).json({ error: "Requête invalide : type attendu (question, bug ou autre)." }); return; }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if(!message){ res.status(400).json({ error: "Le message est vide." }); return; }
  if(message.length > MAX_CONTACT_MESSAGE_LENGTH){ res.status(400).json({ error: "Message trop long." }); return; }

  let email = null;
  if(body.email != null){
    if(typeof body.email !== "string" || !EMAIL_RE.test(body.email.trim())){ res.status(400).json({ error: "Adresse email invalide." }); return; }
    email = body.email.trim();
  }

  if(!process.env.CONTACT_DATABASE_URL){ res.status(500).json({ error: "Le formulaire de contact n'est pas encore configuré côté serveur." }); return; }

  try{
    await ensureContactSchema();
    await insertContactMessage({ type, message, email });
    res.status(200).json({ ok: true });
  } catch(err){
    console.error("Erreur /api/account?action=contact:", err);
    res.status(500).json({ error: "Envoi impossible pour le moment, réessaie plus tard." });
  }
}

// Compteur d'appels IA (voir _lib/ai-usage.js et admin-ai-usage.html) — retour direct
// d'utilisatrice : "je veux pouvoir savoir combien d'appels IA ont été faits". Protégé par
// ADMIN_SECRET (variable d'environnement séparée d'APP_ACCESS_CODE, qui lui protège l'usage
// de l'appli — ici c'est une page réservée à la personne qui gère l'appli, pas aux
// utilisatrices) : sans ADMIN_SECRET défini côté serveur, l'action refuse tout accès plutôt
// que de laisser les statistiques ouvertes par défaut.
async function actionAiUsage(req, res){
  if(req.method !== "GET"){ res.status(405).json({ error: "Méthode non autorisée." }); return; }
  const requiredSecret = process.env.ADMIN_SECRET;
  if(!requiredSecret){ res.status(500).json({ error: "Compteur non configuré côté serveur (ADMIN_SECRET manquant)." }); return; }
  const auth = req.headers["authorization"];
  if(auth !== `Bearer ${requiredSecret}`){ res.status(401).json({ error: "Non autorisé." }); return; }
  if(!requireDatabase(req, res)) return;

  try{
    const stats = await getAiUsageStats();
    res.status(200).json(stats);
  } catch(err){
    console.error("Erreur /api/account?action=ai-usage:", err);
    res.status(500).json({ error: "Impossible de récupérer les statistiques pour le moment." });
  }
}

const ACTIONS = {
  signup: actionSignup,
  login: actionLogin,
  logout: actionLogout,
  "delete-account": actionDeleteAccount,
  "sync-data": actionSyncData,
  cleanup: actionCleanup,
  contact: actionContact,
  "ai-usage": actionAiUsage,
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
