// Backend serverless (Vercel) — connexion : { email, password } -> { token, email }.
//
// Message d'erreur volontairement générique ("e-mail ou mot de passe incorrect") qu'il s'agisse
// d'un compte inexistant ou d'un mauvais mot de passe — ne jamais laisser un tiers déduire
// qu'une adresse e-mail précise a un compte ici (anti-énumération, même logique que le rapport
// de sécurité premium de l'app sœur Panthéon). Vérification du mot de passe en temps constant
// (voir _lib/password.js). Limitation de débit par IP ET par e-mail visé (voir _lib/rate-limit.js)
// pour ralentir une attaque par force brute même distribuée sur plusieurs adresses IP.
const { sql, ensureSchema } = require("./_lib/db");
const { verifyPassword } = require("./_lib/password");
const { createSession } = require("./_lib/session");
const { checkRateLimit, clientIp } = require("./_lib/rate-limit");

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

  const body = req.body || {};
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const ip = clientIp(req);
  const [byIp, byEmail] = await Promise.all([
    checkRateLimit(`login-ip:${ip}`, 10).catch(() => ({ allowed: true })),
    email ? checkRateLimit(`login-email:${email}`, 10).catch(() => ({ allowed: true })) : Promise.resolve({ allowed: true }),
  ]);
  if(!byIp.allowed || !byEmail.allowed){
    res.status(429).json({ error: "Trop de tentatives, réessaie dans une minute." });
    return;
  }

  if(!email || !password){
    res.status(400).json({ error: "E-mail et mot de passe requis." });
    return;
  }
  if(!process.env.DATABASE_URL){
    res.status(500).json({ error: "Le compte n'est pas encore configuré côté serveur." });
    return;
  }

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
    if(!ok){
      res.status(401).json({ error: "E-mail ou mot de passe incorrect." });
      return;
    }
    const token = await createSession(user.id);
    res.status(200).json({ token, email });
  } catch(err){
    console.error("Erreur /api/auth-login:", err);
    res.status(500).json({ error: "Impossible de te connecter pour le moment." });
  }
};
