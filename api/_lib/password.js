// Hachage de mot de passe — crypto.scrypt de Node (déjà présent, aucune dépendance
// supplémentaire), un sel aléatoire de 16 octets propre à chaque compte, comparaison finale en
// temps constant (timingSafeEqual) pour ne jamais laisser une attaque par mesure de temps
// deviner un mot de passe correct octet par octet. Jamais de mot de passe en clair, ni journalisé
// ni stocké : seuls hash et sel (tous deux inoffensifs seuls) vivent en base.
const crypto = require("crypto");

const KEY_LEN = 64;

function hashPassword(password){
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_LEN).toString("hex");
  return { hash, salt };
}

function verifyPassword(password, hash, salt){
  const candidate = crypto.scryptSync(password, salt, KEY_LEN);
  const stored = Buffer.from(hash, "hex");
  if(candidate.length !== stored.length) return false;
  return crypto.timingSafeEqual(candidate, stored);
}

// Exigence minimale, volontairement simple pour une app encore personnelle — voir le README
// pour la suite possible (règles plus riches, vérification par e-mail...).
function isPasswordValid(password){
  return typeof password === "string" && password.length >= 8;
}

module.exports = { hashPassword, verifyPassword, isPasswordValid };
