// Backend serverless (Vercel) — création de compte : { email, password } -> { token, email }.
//
// Le compte ne sert QU'à faire suivre la sauvegarde de données déjà existante (voir
// exportBackupData()/importBackupData() dans app.js) d'un appareil à l'autre — jamais un
// nouveau type de donnée. Volontairement simple pour une app encore personnelle : pas de
// vérification par e-mail (nécessiterait un service d'envoi d'e-mails, non configuré
// aujourd'hui) — voir le README pour la suite possible. Mot de passe haché avec sel unique
// (voir _lib/password.js), jamais stocké ni journalisé en clair.
//
// Même protection optionnelle "usage personnel" que les autres endpoints (APP_ACCESS_CODE, voir
// api/reading.js) — sans ça, n'importe qui tombant sur l'URL de l'appli pourrait créer des
// comptes en boucle. Limitation de débit en plus (5 tentatives/minute/IP, voir
// _lib/rate-limit.js) : la vérification du code d'accès n'empêche pas à elle seule un script
// connaissant déjà ce code de créer des comptes en rafale.
const { sql, ensureSchema } = require("./_lib/db");
const { hashPassword, isPasswordValid } = require("./_lib/password");
const { createSession } = require("./_lib/session");
const { checkRateLimit, clientIp } = require("./_lib/rate-limit");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async function handler(req, res){
  if(req.method !== "POST"){
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const requiredCode = process.env.APP_ACCESS_CODE;
  if(requiredCode){
    const providedCode = req.headers["x-app-access-code"];
    if(providedCode !== requiredCode){
      res.status(401).json({ error: "Code d'accès manquant ou incorrect." });
      return;
    }
  }

  const { allowed } = await checkRateLimit(`signup:${clientIp(req)}`, 5).catch(() => ({ allowed: true }));
  if(!allowed){
    res.status(429).json({ error: "Trop de tentatives, réessaie dans une minute." });
    return;
  }

  const body = req.body || {};
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = body.password;

  if(!EMAIL_RE.test(email)){
    res.status(400).json({ error: "Adresse e-mail invalide." });
    return;
  }
  if(!isPasswordValid(password)){
    res.status(400).json({ error: "Le mot de passe doit contenir au moins 8 caractères." });
    return;
  }

  if(!process.env.DATABASE_URL){
    res.status(500).json({ error: "Le compte n'est pas encore configuré côté serveur." });
    return;
  }

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
    console.error("Erreur /api/auth-signup:", err);
    res.status(500).json({ error: "Impossible de créer le compte pour le moment." });
  }
};
