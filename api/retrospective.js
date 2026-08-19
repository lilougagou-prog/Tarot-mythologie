// Backend serverless (Vercel) — rédige un bilan narratif de l'année écoulée à partir d'un
// résumé agrégé du Journal, via l'API Anthropic. Déclenché une fois par an, à l'anniversaire
// de naissance (voir ensureRetrospective() dans app.js), jamais plus souvent.
//
// Reçoit en POST : { summary: { firstName?, totalReadings, topCards: [{name,count}, ...],
//   topDomains: [{label,count}, ...], majorPercent, bestStreak } }
//   - Résumé agrégé uniquement (voir retrospectiveSummary() dans app.js) : jamais le texte
//     des questions posées ni les notes personnelles — mêmes principes de sobriété que
//     journalTrendsForReading()/cardMemory() envoyés à /api/reading.
// Renvoie : { retrospective: string } — 2-3 paragraphes, prêts à être affichés tels quels.
//
// La clé API Anthropic vit uniquement ici, côté serveur, dans la variable
// d'environnement ANTHROPIC_API_KEY (jamais exposée au navigateur).
//
// Même protection "usage personnel" optionnelle que les autres endpoints : si
// APP_ACCESS_CODE est définie côté serveur, l'en-tête X-App-Access-Code est requis.

const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

  const { summary } = req.body || {};

  if (
    !summary ||
    typeof summary !== "object" ||
    !Number.isFinite(summary.totalReadings) ||
    summary.totalReadings < 1
  ) {
    res.status(400).json({
      error: "Requête invalide : { summary: { totalReadings: number >= 1, ... } } attendu.",
    });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Configuration serveur incomplète." });
    return;
  }

  const lines = [`${summary.totalReadings} tirage${summary.totalReadings > 1 ? "s" : ""} enregistré${summary.totalReadings > 1 ? "s" : ""} cette année`];
  if (Number.isFinite(summary.majorPercent)) {
    lines.push(`${summary.majorPercent}% de cartes majeures parmi les cartes tirées`);
  }
  if (Array.isArray(summary.topCards) && summary.topCards.length) {
    const parts = summary.topCards
      .filter((c) => c && typeof c.name === "string" && Number.isFinite(c.count))
      .map((c) => `${c.name} (${c.count}x)`);
    if (parts.length) lines.push(`Cartes qui reviennent le plus : ${parts.join(", ")}`);
  }
  if (Array.isArray(summary.topDomains) && summary.topDomains.length) {
    const parts = summary.topDomains
      .filter((d) => d && typeof d.label === "string" && Number.isFinite(d.count))
      .map((d) => `${d.label} (${d.count}x)`);
    if (parts.length) lines.push(`Thèmes qui reviennent le plus : ${parts.join(", ")}`);
  }
  if (Number.isFinite(summary.bestStreak) && summary.bestStreak > 1) {
    lines.push(`Meilleure série de jours consécutifs : ${summary.bestStreak}`);
  }

  const firstName = typeof summary.firstName === "string" && summary.firstName.trim() ? summary.firstName.trim() : null;

  const prompt = `Tu es un tarologue chaleureux et humain. Voici un résumé de l'année de tirages écoulée${firstName ? ` pour ${firstName}` : ""} :
${lines.join("\n")}

Rédige un bilan de l'année en français, à la deuxième personne ("tu", "ton", "ta"), en 2 à 3 paragraphes fluides — un texte suivi, pas une liste. Règles strictes :
- Ton chaleureux, direct, humain — jamais mécanique, jamais de formule toute faite ("comme le montrent tes statistiques"...).
- Ne liste pas les chiffres un par un : intègre-les naturellement dans un récit qui donne du sens à cette année de tirages.
- Termine sur une note tournée vers l'année à venir, sans prédiction précise ni tournure mystique vague ("laisse l'univers te guider").
- N'invente aucun événement ni aucune question précise que tu ne connais pas — reste sur ce que ces chiffres racontent, pas sur ce qu'ils pourraient signifier en détail.

Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown, exactement sous cette forme :
{"retrospective":"le texte du bilan, paragraphes séparés par un retour à la ligne double (\\n\\n)"}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 900,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (message.content || [])
      .map((block) => block.text || "")
      .join("\n")
      .trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (typeof parsed.retrospective !== "string" || !parsed.retrospective.trim()) {
      throw new Error("Réponse IA incomplète");
    }

    res.status(200).json({ retrospective: parsed.retrospective.trim() });
  } catch (err) {
    console.error("Erreur /api/retrospective:", err);
    res.status(502).json({ error: "Impossible de générer la rétrospective." });
  }
};
