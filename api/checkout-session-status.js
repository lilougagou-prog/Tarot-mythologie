// Backend serverless (Vercel) — confirme le résultat d'une session Stripe Checkout au retour
// du paiement. Fait partie du système de paiement préparé mais pas encore activé (voir
// PAYMENT_ENABLED dans app.js et le commentaire au-dessus d'api/create-checkout-session.js).
//
// Reçoit en GET : ?session_id=... (voir success_url dans api/create-checkout-session.js,
// {CHECKOUT_SESSION_ID} y est remplacé par Stripe).
// Renvoie : { paid: boolean, subscriptionId: string|null, customerId: string|null,
// status: string|null } — le client (checkPendingCheckoutReturn() dans app.js) enregistre
// subscriptionId localement pour les revérifications futures (voir subscription-status.js).
//
// Aucune donnée personnelle de paiement n'est renvoyée au client (ni carte, ni email, ni
// montant) — seulement de quoi savoir si l'abonnement est bien actif.

const Stripe = require("stripe");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
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

  const sessionId = req.query && req.query.session_id;
  if (typeof sessionId !== "string" || !sessionId.trim()) {
    res.status(400).json({ error: "Requête invalide : ?session_id=... attendu." });
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Le paiement n'est pas encore configuré." });
    return;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["subscription"] });
    const sub = session.subscription && typeof session.subscription === "object" ? session.subscription : null;
    const customerId = typeof session.customer === "string" ? session.customer : (session.customer && session.customer.id) || null;
    res.status(200).json({
      paid: session.payment_status === "paid",
      subscriptionId: sub ? sub.id : null,
      customerId,
      status: sub ? sub.status : null,
    });
  } catch (err) {
    console.error("Erreur /api/checkout-session-status:", err);
    res.status(502).json({ error: "Impossible de confirmer le paiement." });
  }
};
