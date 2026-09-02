// Backend serverless (Vercel) — revérifie auprès de Stripe qu'un abonnement déjà enregistré
// côté client est toujours actif. Fait partie du système de paiement préparé mais pas encore
// activé (voir PAYMENT_ENABLED dans app.js et le commentaire au-dessus
// d'api/create-checkout-session.js) — appelé au plus une fois par jour par
// verifySubscriptionStatus() dans app.js, jamais de webhook : Stripe sert directement de
// source de vérité, sans base de données à maintenir côté app.
//
// Reçoit en GET : ?subscription_id=...
// Renvoie : { active: boolean, status: string } — active vaut true pour "active" ou
// "trialing" (voir STATUTS_ACTIFS ci-dessous), false pour tout le reste (annulé, impayé,
// incomplet...). Un abonnement introuvable (déjà supprimé côté Stripe) renvoie
// { active: false, status: "not_found" } plutôt qu'une erreur, pour que le client désactive
// proprement le premium au lieu de rester bloqué sur une erreur réseau.

const Stripe = require("stripe");

const STATUTS_ACTIFS = new Set(["active", "trialing"]);

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

  const subscriptionId = req.query && req.query.subscription_id;
  if (typeof subscriptionId !== "string" || !subscriptionId.trim()) {
    res.status(400).json({ error: "Requête invalide : ?subscription_id=... attendu." });
    return;
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Le paiement n'est pas encore configuré." });
    return;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const sub = await stripe.subscriptions.retrieve(subscriptionId);
    res.status(200).json({ active: STATUTS_ACTIFS.has(sub.status), status: sub.status });
  } catch (err) {
    if (err && err.statusCode === 404) {
      res.status(200).json({ active: false, status: "not_found" });
      return;
    }
    console.error("Erreur /api/subscription-status:", err);
    res.status(502).json({ error: "Impossible de vérifier l'abonnement." });
  }
};
