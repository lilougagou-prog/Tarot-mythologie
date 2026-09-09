// Connexion Postgres DÉDIÉE au formulaire "Nous contacter" — délibérément séparée de sql()/
// ensureSchema() dans ./db.js (qui gèrent comptes, sessions et sauvegarde cloud sur DATABASE_URL,
// la base propre à Tarot de Delphes). CONTACT_DATABASE_URL pointe au contraire vers la base de
// l'app sœur Panthéon (voir .env.example) : les deux apps y écrivent dans la MÊME table
// contact_messages, distinguées par la colonne `app` — pour que tous les messages arrivent au
// même endroit, consultable depuis une seule page (admin-messages.html, côté Panthéon), plutôt
// que d'avoir deux boîtes de réception séparées à surveiller.
//
// Le schéma est donc définitivement celui déjà posé côté Panthéon (api/_lib/db.js là-bas) :
// jamais modifié depuis ici, seulement recréé de façon idempotente si absent (CREATE TABLE IF
// NOT EXISTS) — utile si cet endpoint tournait un jour avant que Panthéon n'ait initialisé la
// table, mais sans jamais rien y ajouter de spécifique à Tarot.
const { neon } = require("@neondatabase/serverless");

let cachedSql = null;
function contactSql(){
  if(!cachedSql){
    if(!process.env.CONTACT_DATABASE_URL) throw new Error("CONTACT_DATABASE_URL n'est pas configurée.");
    cachedSql = neon(process.env.CONTACT_DATABASE_URL);
  }
  return cachedSql;
}

async function ensureContactSchema(){
  const db = contactSql();
  await db`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      message_type TEXT NOT NULL,
      message TEXT NOT NULL,
      email TEXT,
      app TEXT NOT NULL DEFAULT 'pantheon',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;
  await db`ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS app TEXT NOT NULL DEFAULT 'pantheon';`;
}

// `app` toujours "tarot" ici, jamais paramétrable par l'appelant — cette connexion ne sert
// qu'à UN SEUL formulaire, pas de raison de laisser planer un doute sur l'origine des lignes
// qu'elle écrit.
async function insertContactMessage({ type, message, email }){
  const db = contactSql();
  await db`
    INSERT INTO contact_messages (message_type, message, email, app)
    VALUES (${type}, ${message}, ${email}, 'tarot')
  `;
}

module.exports = { ensureContactSchema, insertContactMessage };
