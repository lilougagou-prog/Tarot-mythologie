// Backend serverless (Vercel) — rédige UNE recommandation concrète pour la journée en
// cours, qui relie carte du jour + transits du jour (signes + aspect le plus marqué avec
// le thème natal) + mois personnel en un conseil cohérent plutôt que des blocs séparés à
// interpréter soi-même. Absorbe ce que faisait un ancien bloc "Horoscope du jour" affiché
// à part (redondant : mêmes signes du jour, juste dits autrement).
//
// Reçoit en POST : { summary: { firstName?, dayCardName, dayCardKeywords?, sunSign?,
//   moonSign?, transitAspect?: {body, action, natal}, personalMonth?, personalMonthMeaning? } }
//   - dayCardName : seul champ obligatoire (nom de la carte du jour).
//   - transitAspect (voir strongestTransitAspect() dans app.js) : l'aspect le plus marqué
//     entre une planète rapide du jour et un point du thème natal, déjà mis en mots par le
//     client (ex. body:"Mercure", action:"met sous tension", natal:"ton monde intérieur").
//   - Résumé agrégé uniquement (voir ritualSummary() dans app.js) — jamais de données du
//     Journal ni de questions personnelles.
// Renvoie : { ritual: string } — 2-3 phrases, prêtes à être affichées telles quelles.
//
// Contrairement au portrait et à la rétrospective (générés une fois), cet endpoint est
// rappelé une fois par jour (mis en cache côté client — voir ensureRitual() dans app.js) :
// coût récurrent, du même ordre qu'une lecture de tirage à 1 carte.
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
    typeof summary.dayCardName !== "string" ||
    !summary.dayCardName.trim()
  ) {
    res.status(400).json({
      error: "Requête invalide : { summary: { dayCardName: string, ... } } attendu.",
    });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Configuration serveur incomplète." });
    return;
  }

  const lines = [`Carte du jour : ${summary.dayCardName.trim()}${typeof summary.dayCardKeywords === "string" && summary.dayCardKeywords ? ` (${summary.dayCardKeywords})` : ""}`];
  if (typeof summary.sunSign === "string" && summary.sunSign) lines.push(`Soleil du jour en ${summary.sunSign}`);
  if (typeof summary.moonSign === "string" && summary.moonSign) lines.push(`Lune du jour en ${summary.moonSign}`);
  const ta = summary.transitAspect;
  if (ta && typeof ta.body === "string" && typeof ta.action === "string" && typeof ta.natal === "string") {
    lines.push(`Aspect du jour le plus marqué avec son thème natal : ${ta.body} ${ta.action} ${ta.natal}`);
  }
  if (Number.isFinite(summary.personalMonth)) {
    const meaning = typeof summary.personalMonthMeaning === "string" ? summary.personalMonthMeaning : null;
    lines.push(`Mois personnel : ${summary.personalMonth}${meaning ? ` (${meaning})` : ""}`);
  }

  const firstName = typeof summary.firstName === "string" && summary.firstName.trim() ? summary.firstName.trim() : null;

  const prompt = `Tu es un guide chaleureux et concis. Voici les éléments du jour${firstName ? ` pour ${firstName}` : ""} :
${lines.join("\n")}

Rédige UNE recommandation concrète pour aujourd'hui, en 2 à 3 phrases, qui relie ces éléments en un conseil unique et cohérent — pas une liste, pas un élément traité après l'autre. Règles strictes :
- Ton chaleureux, direct, humain — jamais mystique-vague ("laisse l'univers te guider", "l'énergie du jour t'invite").
- Concret et actionable : quelque chose que la personne peut vraiment faire ou observer aujourd'hui, pas une généralité.
- N'utilise jamais de jargon technique (n'écris pas "transit", "aspect", "orbe").

Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown, exactement sous cette forme : {"ritual":"le texte, 2-3 phrases"}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (message.content || [])
      .map((block) => block.text || "")
      .join("\n")
      .trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (typeof parsed.ritual !== "string" || !parsed.ritual.trim()) {
      throw new Error("Réponse IA incomplète");
    }

    res.status(200).json({ ritual: parsed.ritual.trim() });
  } catch (err) {
    console.error("Erreur /api/ritual:", err);
    res.status(502).json({ error: "Impossible de générer le rituel du jour." });
  }
};
