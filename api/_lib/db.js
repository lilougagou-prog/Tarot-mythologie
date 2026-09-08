// Connexion Postgres partagée (Neon, serverless — @neondatabase/serverless renvoie directement
// un tableau de lignes, jamais un objet {rows}) et création paresseuse du schéma du compte
// utilisateur : users (identifiants), sessions (jetons de connexion) et user_data (la
// sauvegarde cloud elle-même — voir api/sync-data.js).
//
// RGPD/sécurité, dès la conception :
// - Les mots de passe ne sont JAMAIS stockés en clair : voir _lib/password.js (scrypt +
//   sel unique par compte, comparaison en temps constant).
// - Les jetons de session ne sont eux non plus jamais stockés en clair — seul leur hash SHA-256
//   vit en base (voir _lib/session.js) : une fuite de la base ne suffit pas à usurper une
//   session déjà ouverte, exactement comme pour un mot de passe.
// - user_data.data est un unique blob JSON — le même format que l'export/import manuel déjà
//   existant côté client (voir exportBackupData()/importBackupData() dans app.js) : le compte
//   cloud n'est qu'un second endroit où poser cette même sauvegarde, jamais une donnée d'un
//   autre type.
const { neon } = require("@neondatabase/serverless");

let sqlClient = null;
function sql(){
  if(!sqlClient){
    if(!process.env.DATABASE_URL) throw new Error("DATABASE_URL n'est pas configurée.");
    sqlClient = neon(process.env.DATABASE_URL);
  }
  return sqlClient;
}

let schemaReady = null;
async function ensureSchema(){
  if(schemaReady) return schemaReady;
  const s = sql();
  schemaReady = (async () => {
    await s`CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await s`CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      expires_at TIMESTAMPTZ NOT NULL
    )`;
    await s`CREATE TABLE IF NOT EXISTS user_data (
      user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await s`CREATE TABLE IF NOT EXISTS rate_limits (
      bucket_key TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await s`CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`;
    await s`CREATE INDEX IF NOT EXISTS idx_rate_limits_bucket_time ON rate_limits(bucket_key, created_at)`;
  })();
  return schemaReady;
}

module.exports = { sql, ensureSchema };
