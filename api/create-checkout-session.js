// Backend serverless (Vercel) — démarre un paiement Stripe Checkout pour l'abonnement
// premium (9,99€/mois). Fait partie du système de paiement préparé mais PAS ENCORE activé
// côté client (voir PAYMENT_ENABLED dans app.js) — retour direct d'utilisatrice : "tu peux
// préparer le système de paiement, sans l'activer pour l'instant ?".
//
// Reçoit en POST : { returnUrl: string } — l'URL de l'app elle-même (fournie par le client,
// jamais fixée en dur ici : évite de coder un domaine qui peut différer entre déploiement de
// test et déploiement final).
// Renvoie : { url } — l'URL de la page de paiement hébergée par Stripe, vers laquelle le
// client redirige le navigateur. Aucune donnée de carte ne transite jamais par ce serveur.
//
// Deux variables d'environnement Vercel requises (voir le commentaire au-dessus de
// PAYMENT_ENABLED dans app.js pour le détail) :
//   - STRIPE_SECRET_KEY (clé secrète Stripe, jamais exposée au navigateur)
//   - STRIPE_PRICE_ID (id du Price Stripe pour l'abonnement mensuel à 9,99€)
//
// Même protection "usage personnel" que les autres endpoints (voir api/reading.js) :
// APP_ACCESS_CODE, si définie côté serveur, doit être fournie dans l'en-tête
// X-App-Access-Code.

const Stripe = require("stripe");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Méthode non autorisée." });
    return;
  }

  const requiredCode = process.env.APP_ACCESS_CODE;
  if (requiredCode) {
    const providedCode = req.headers["x-app-access-code"];
    if (providedCode !== requiredCode) {
      res.status(401).json({ error: "Code d'accès manquant ou incorrect." });
      return;
    }
  }

  const { returnUrl } = req.body || {};
  if (typeof returnUrl !== "string" || !returnUrl.trim()) {
    res.status(400).json({ error: "Requête invalide : { returnUrl: string } attendu." });
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PRICE_ID) {
    console.error("STRIPE_SECRET_KEY ou STRIPE_PRICE_ID manquante(s) dans les variables d'environnement.");
    res.status(500).json({ error: "Le paiement n'est pas encore configuré." });
    return;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      // {CHECKOUT_SESSION_ID} est remplacé par Stripe lui-même dans l'URL finale — voir
      // checkPendingCheckoutReturn() dans app.js, qui lit ces paramètres au retour.
      success_url: `${returnUrl}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnUrl}?checkout=cancelled`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Erreur /api/create-checkout-session:", err);
    res.status(502).json({ error: "Impossible de démarrer le paiement." });
  }
};
