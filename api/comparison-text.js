// Backend serverless (Vercel) — rédige un court texte suivi (2-3 paragraphes) qui tisse en
// une lecture fluide les résultats DÉJÀ CALCULÉS localement par compareProfiles() côté
// client (élément dominant, points communs, tensions potentielles, divinité tutélaire
// commune) pour la fonctionnalité "Mes proches" (comparaison de thèmes). Bonus optionnel
// au-dessus d'une comparaison déjà complète sans lui — voir renderComparison() dans app.js.
//
// Reçoit en POST : { comparison: {
//   yourFirstName, theirFirstName, relationType,
//   yourSigns: {sun,moon,ascendant}, theirSigns: {sun,moon,ascendant},
//   element: {a, b, kind} | null,      // kind: "resonance" | "complement" | "tension"
//   sharedDeity: string | null,
//   commonPoints: [{your, their, type}], tensePoints: [{your, their, type}],
// } }
//   - Résumé minimal (voir profileForComparisonText() dans app.js), jamais les deux thèmes
//     complets — même logique de sobriété que le "profile" envoyé à /api/portrait.
// Renvoie : { text: string } — 2-3 paragraphes séparés par un retour à la ligne double.
//
// Généré une seule fois par proche et mis en cache côté client (relation.comparisonText
// dans delphesRelations, avec une empreinte des dates de naissance des deux thèmes
// concernés) — voir ensureComparisonText() dans app.js.
//
// La clé API Anthropic vit uniquement ici, côté serveur, dans la variable d'environnement
// ANTHROPIC_API_KEY (jamais exposée au navigateur).
//
// Même protection "usage personnel" optionnelle que les autres endpoints IA : si
// APP_ACCESS_CODE est définie côté serveur, l'en-tête X-App-Access-Code est requis.

const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Indication de ton à donner à l'IA selon le type de relation — pour ne jamais employer de
// vocabulaire de couple avec un parent/enfant/frère-sœur/ami·e, l'erreur la plus probable
// si le prompt ne le précisait pas explicitement.
const RELATION_TONE_HINT = {
  "Partenaire": "une relation de couple : le vocabulaire amoureux est approprié ici.",
  "Enfant": "une relation parent → enfant (la personne qui lit est le parent) : jamais de vocabulaire de couple, plutôt une dynamique de transmission, de protection, de compréhension mutuelle à travers les âges.",
  "Parent": "une relation enfant → parent (la personne qui lit est l'enfant) : jamais de vocabulaire de couple, même remarque que ci-dessus.",
  "Frère / Sœur": "une relation de fratrie : complicité, histoire commune, rivalité parfois — jamais de vocabulaire de couple.",
  "Ami·e": "une amitié : jamais de vocabulaire de couple.",
  "Autre": "un lien proche dont la nature exacte n'est pas précisée : reste neutre, sans présumer qu'il s'agit d'un couple.",
};

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

  const { comparison } = req.body || {};

  if (
    !comparison ||
    typeof comparison !== "object" ||
    typeof comparison.yourFirstName !== "string" ||
    !comparison.yourFirstName.trim() ||
    typeof comparison.theirFirstName !== "string" ||
    !comparison.theirFirstName.trim()
  ) {
    res.status(400).json({
      error: "Requête invalide : { comparison: { yourFirstName, theirFirstName, ... } } attendu.",
    });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Configuration serveur incomplète." });
    return;
  }

  const you = comparison.yourFirstName.trim();
  const them = comparison.theirFirstName.trim();
  const relationType = typeof comparison.relationType === "string" && comparison.relationType ? comparison.relationType : "Autre";
  const toneHint = RELATION_TONE_HINT[relationType] || RELATION_TONE_HINT["Autre"];

  const lines = [];
  const ys = comparison.yourSigns || {}, ts = comparison.theirSigns || {};
  if (ys.sun && ts.sun) lines.push(`Soleil : ${you} en ${ys.sun}, ${them} en ${ts.sun}`);
  if (ys.moon && ts.moon) lines.push(`Lune : ${you} en ${ys.moon}, ${them} en ${ts.moon}`);
  if (ys.ascendant && ts.ascendant) lines.push(`Ascendant : ${you} ${ys.ascendant}, ${them} ${ts.ascendant}`);
  if (comparison.element && typeof comparison.element === "object") {
    const el = comparison.element;
    const kindLabel = el.kind === "resonance" ? "même élément" : el.kind === "complement" ? "éléments complémentaires" : "éléments en tension";
    lines.push(`Élément dominant : ${el.a} (${you}) / ${el.b} (${them}) — ${kindLabel}`);
  }
  if (typeof comparison.sharedDeity === "string" && comparison.sharedDeity) {
    lines.push(`Divinité tutélaire commune : ${comparison.sharedDeity}`);
  }
  const pointsLine = (list) => Array.isArray(list)
    ? list
        .filter((p) => p && typeof p.your === "string" && typeof p.their === "string" && typeof p.type === "string")
        .map((p) => `${p.your} (${you}) ${p.type} ${p.their} (${them})`)
        .join(", ")
    : "";
  const commonLine = pointsLine(comparison.commonPoints);
  const tenseLine = pointsLine(comparison.tensePoints);
  if (commonLine) lines.push(`Points communs relevés : ${commonLine}`);
  if (tenseLine) lines.push(`Tensions potentielles relevées : ${tenseLine}`);

  if (!lines.length) {
    res.status(400).json({ error: "Requête invalide : comparison ne contient aucune donnée exploitable." });
    return;
  }

  const prompt = `Tu es un astrologue et tarologue chaleureux, direct et humain. Voici une comparaison déjà calculée entre le thème de ${you} et celui de ${them} :
${lines.join("\n")}

Cette comparaison concerne ${toneHint}

Rédige un texte en français, à la deuxième personne pour ${you} ("tu", "ton", "ta" — ${you} est la personne qui lit) et en nommant ${them} par son prénom (jamais de pronom genré "il"/"elle"/"sa"/"son" pour parler de ${them} : répète son prénom ou utilise des tournures neutres), en 2 à 3 paragraphes fluides qui tissent ensemble ces éléments en une lecture cohérente de la relation — un texte suivi, pas une liste, pas un paragraphe par élément. Règles strictes :
- Ton chaleureux, direct, humain — jamais mécanique, jamais de formule toute faite du type "comme le montre la comparaison" ou "en résumé".
- N'utilise jamais de jargon technique non expliqué (n'écris jamais les mots "aspect", "orbe", "conjonction", "trigone", "carré", "opposition", "sextile", "élément") : traduis chaque élément en dynamique relationnelle concrète, en langage courant.
- Ne liste pas mécaniquement chaque élément un par un : entrelace-les pour raconter une dynamique à deux, pas une fiche technique.
- Mentionne aussi bien ce qui rapproche que les tensions potentielles, sans jamais présenter une tension comme un problème ou une incompatibilité — plutôt comme un terrain à connaître.
- Ne commence jamais par "Cher/Chère" ni par une formule d'en-tête de lettre.

Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown, exactement sous cette forme :
{"text":"le texte, paragraphes séparés par un retour à la ligne double (\\n\\n)"}`;

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

    if (typeof parsed.text !== "string" || !parsed.text.trim()) {
      throw new Error("Réponse IA incomplète");
    }

    res.status(200).json({ text: parsed.text.trim() });
  } catch (err) {
    console.error("Erreur /api/comparison-text:", err);
    res.status(502).json({ error: "Impossible de générer le texte de comparaison." });
  }
};
