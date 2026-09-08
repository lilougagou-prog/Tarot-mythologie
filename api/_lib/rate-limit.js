// Limitation de débit générique, en base (une fonction serverless n'a pas de mémoire partagée
// entre invocations — un simple compteur en mémoire ne protégerait donc rien). Une ligne par
// tentative dans rate_limits(bucket_key, created_at) ; compte celles de la dernière minute pour
// la clé donnée. Utilisée pour ralentir les tentatives de connexion/inscription automatisées
// (voir api/auth-login.js, api/auth-signup.js) — même principe que le garde-fou déjà en place
// sur les appels IA (voir AI_CALL_LIMIT_PER_PERSON dans app.js), transposé à l'authentification.
const { sql, ensureSchema } = require("./db");

async function checkRateLimit(bucketKey, maxPerMinute){
  await ensureSchema();
  const s = sql();
  const since = new Date(Date.now() - 60 * 1000);
  const rows = await s`SELECT count(*)::int AS n FROM rate_limits WHERE bucket_key = ${bucketKey} AND created_at > ${since}`;
  const count = rows[0] ? rows[0].n : 0;
  if(count >= maxPerMinute) return { allowed: false };
  await s`INSERT INTO rate_limits (bucket_key) VALUES (${bucketKey})`;
  return { allowed: true };
}

// x-forwarded-for peut contenir plusieurs IP séparées par des virgules (proxys successifs) —
// la première est celle du client d'origine.
function clientIp(req){
  const fwd = req.headers["x-forwarded-for"];
  if(typeof fwd === "string" && fwd.trim()) return fwd.split(",")[0].trim();
  return req.socket && req.socket.remoteAddress || "unknown";
}

module.exports = { checkRateLimit, clientIp };
