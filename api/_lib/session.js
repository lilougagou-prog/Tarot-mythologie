// Jetons de session — 32 octets aléatoires (64 caractères hex), donnés en clair au client une
// seule fois (à la création), mais dont seul le hash SHA-256 est conservé en base (sessions.
// token_hash) : même principe que les mots de passe (_lib/password.js), pour qu'une fuite de la
// base ne suffise pas à usurper une session déjà ouverte. Durée de vie : 90 jours (voir
// SESSION_TTL_DAYS) — largement au-delà d'un usage occasionnel, pour ne pas déconnecter
// silencieusement quelqu'un qui rouvre l'app après quelques semaines.
const crypto = require("crypto");
const { sql, ensureSchema } = require("./db");

const SESSION_TTL_DAYS = 90;

function hashToken(token){
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function createSession(userId){
  await ensureSchema();
  const s = sql();
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  await s`INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (${tokenHash}, ${userId}, ${expiresAt})`;
  return token;
}

// Renvoie l'id utilisateur si le jeton (en-tête Authorization: Bearer <token>) est valide et pas
// expiré, sinon null — jamais une exception, pour que chaque endpoint appelant puisse répondre
// 401 proprement plutôt que planter.
async function verifySessionFromRequest(req){
  const auth = req.headers["authorization"];
  if(typeof auth !== "string" || !auth.startsWith("Bearer ")) return null;
  const token = auth.slice("Bearer ".length).trim();
  if(!token) return null;
  await ensureSchema();
  const s = sql();
  const rows = await s`SELECT user_id FROM sessions WHERE token_hash = ${hashToken(token)} AND expires_at > now()`;
  if(!rows.length) return null;
  return rows[0].user_id;
}

async function deleteSession(token){
  await ensureSchema();
  const s = sql();
  await s`DELETE FROM sessions WHERE token_hash = ${hashToken(token)}`;
}

module.exports = { createSession, verifySessionFromRequest, deleteSession };
