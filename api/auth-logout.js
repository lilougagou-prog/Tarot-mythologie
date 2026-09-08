// Backend serverless (Vercel) — déconnexion : invalide le jeton de session envoyé (en-tête
// Authorization: Bearer <token>), pour qu'un appareil perdu/prêté ne reste pas connecté
// indéfiniment si on pense à s'y déconnecter avant. Ne renvoie jamais d'erreur si le jeton
// n'existait déjà plus (déconnexion déjà faite ailleurs, ou jeton expiré) — le résultat recherché
// (« ce jeton ne marche plus ») est de toute façon atteint.
const { deleteSession } = require("./_lib/session");

module.exports = async function handler(req, res){
  if(req.method !== "POST"){
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }
  const auth = req.headers["authorization"];
  const token = typeof auth === "string" && auth.startsWith("Bearer ") ? auth.slice("Bearer ".length).trim() : "";
  if(token){
    try{ await deleteSession(token); }
    catch(err){ console.error("Erreur /api/auth-logout:", err); }
  }
  res.status(200).json({ ok: true });
};
