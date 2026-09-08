// Backend serverless (Vercel) — regroupe les deux endpoints de VÉRIFICATION Stripe
// (auparavant checkout-session-status.js et subscription-status.js, fusionnés ici pour rester
// sous la limite de 12 fonctions serverless du plan Hobby Vercel — voir le commentaire en tête
// d'api/account.js pour le détail de cette contrainte). Fait partie du système de paiement
// préparé mais pas encore activé (voir PAYMENT_ENABLED dans app.js et le commentaire au-dessus
// d'api/create-checkout-session.js, qui lui reste un fichier séparé : action de création,
// pas de vérification, moins naturel à regrouper ici).
//
// Reçoit en GET : ?type=checkout&session_id=...  OU  ?type=subscription&subscription_id=...
//
// type=checkout — confirme le résultat d'une session Stripe Checkout au retour du paiement
//   (voir success_url dans api/create-checkout-session.js, {CHECKOUT_SESSION_ID} y est remplacé
//   par Stripe). Renvoie { paid, subscriptionId, customerId, status } — le client
//   (checkPendingCheckoutReturn() dans app.js) enregistre subscriptionId localement pour les
//   revérifications futures (type=subscription ci-dessous). Aucune donnée personnelle de
//   paiement n'est renvoyée (ni carte, ni email, ni montant).
//
// type=subscription — revérifie auprès de Stripe qu'un abonnement déjà enregistré côté client
//   est toujours actif. Appelé au plus une fois par jour par verifySubscriptionStatus() dans
//   app.js, jamais de webhook : Stripe sert directement de source de vérité, sans base de
//   données à maintenir côté app. Renvoie { active, status } — active vaut true pour "active"
//   ou "trialing", false pour tout le reste. Un abonnement introuvable (déjà supprimé côté
//   Stripe) renvoie { active:false, status:"not_found" } plutôt qu'une erreur, pour que le
//   client désactive proprement le premium au lieu de rester bloqué sur une erreur réseau.

const Stripe = require("stripe");

const STATUTS_ACTIFS = new Set(["active", "trialing"]);

async function handleCheckout(req, res, stripe){
  const sessionId = req.query && req.query.session_id;
  if(typeof sessionId !== "string" || !sessionId.trim()){
    res.status(400).json({ error: "Requête invalide : ?session_id=... attendu." });
    return;
  }
  try{
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["subscription"] });
    const sub = session.subscription && typeof session.subscription === "object" ? session.subscription : null;
    const customerId = typeof session.customer === "string" ? session.customer : (session.customer && session.customer.id) || null;
    res.status(200).json({
      paid: session.payment_status === "paid",
      subscriptionId: sub ? sub.id : null,
      customerId,
      status: sub ? sub.status : null,
    });
  } catch(err){
    console.error("Erreur /api/stripe-status?type=checkout:", err);
    res.status(502).json({ error: "Impossible de confirmer le paiement." });
  }
}

async function handleSubscription(req, res, stripe){
  const subscriptionId = req.query && req.query.subscription_id;
  if(typeof subscriptionId !== "string" || !subscriptionId.trim()){
    res.status(400).json({ error: "Requête invalide : ?subscription_id=... attendu." });
    return;
  }
  try{
    const sub = await stripe.subscriptions.retrieve(subscriptionId);
    res.status(200).json({ active: STATUTS_ACTIFS.has(sub.status), status: sub.status });
  } catch(err){
    if(err && err.statusCode === 404){
      res.status(200).json({ active: false, status: "not_found" });
      return;
    }
    console.error("Erreur /api/stripe-status?type=subscription:", err);
    res.status(502).json({ error: "Impossible de vérifier l'abonnement." });
  }
}

module.exports = async function handler(req, res){
  if(req.method !== "GET"){
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

  const type = req.query && req.query.type;
  if(type !== "checkout" && type !== "subscription"){
    res.status(400).json({ error: "Requête invalide : ?type=checkout ou ?type=subscription attendu." });
    return;
  }

  if(!process.env.STRIPE_SECRET_KEY){
    console.error("STRIPE_SECRET_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Le paiement n'est pas encore configuré." });
    return;
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  if(type === "checkout") await handleCheckout(req, res, stripe);
  else await handleSubscription(req, res, stripe);
};
