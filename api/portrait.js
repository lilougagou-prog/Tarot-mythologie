// Backend serverless (Vercel) — génère un portrait de personnalité rédigé (texte suivi,
// pas une liste) à partir d'un résumé du thème natal, via l'API Anthropic.
//
// Reçoit en POST : { profile: { firstName, gender?, sunSign, moonSign, ascendantSign?,
//   nameNumber?, nameNumberMeaning?, personalYear?, personalYearMeaning?,
//   tutelaryDeity?, topAspects?: [{type, a, b}, ...] } }
//   - Résumé minimal du thème (voir profileForPortrait() dans app.js), jamais le thème
//     natal complet (maisons, degrés exacts, etc.) — même logique de sobriété que le
//     "profile" envoyé à /api/reading.
//   - gender: "f" | "m" | absent/null (préfère ne pas préciser) — pour accorder
//     correctement le portrait ; sans lui, formulation volontairement neutre.
// Renvoie : { portrait: string } — 3-4 paragraphes séparés par un retour à la ligne
// double, prêts à être affichés tels quels (voir renderProfilResults() dans app.js).
//
// Généré une seule fois et mis en cache côté client (profile.portrait dans
// localStorage), pas régénéré à chaque visite — voir ensurePortrait() dans app.js.
//
// La clé API Anthropic vit uniquement ici, côté serveur, dans la variable
// d'environnement ANTHROPIC_API_KEY (jamais exposée au navigateur).
//
// Même protection "usage personnel" optionnelle que /api/reading et /api/astral : si
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

  const { profile } = req.body || {};

  if (
    !profile ||
    typeof profile !== "object" ||
    typeof profile.firstName !== "string" ||
    !profile.firstName.trim()
  ) {
    res.status(400).json({
      error: "Requête invalide : { profile: { firstName, ... } } attendu.",
    });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Configuration serveur incomplète." });
    return;
  }

  const lines = [];
  if (typeof profile.sunSign === "string" && profile.sunSign) lines.push(`Soleil en ${profile.sunSign}`);
  if (typeof profile.moonSign === "string" && profile.moonSign) lines.push(`Lune en ${profile.moonSign}`);
  if (typeof profile.ascendantSign === "string" && profile.ascendantSign) lines.push(`Ascendant ${profile.ascendantSign}`);
  if (Number.isFinite(profile.nameNumber)) {
    const meaning = typeof profile.nameNumberMeaning === "string" ? profile.nameNumberMeaning : null;
    lines.push(`Nombre du prénom ${profile.nameNumber}${meaning ? ` (${meaning})` : ""}`);
  }
  if (Number.isFinite(profile.personalYear)) {
    const meaning = typeof profile.personalYearMeaning === "string" ? profile.personalYearMeaning : null;
    lines.push(`Année personnelle ${profile.personalYear}${meaning ? ` (${meaning})` : ""}`);
  }
  if (typeof profile.tutelaryDeity === "string" && profile.tutelaryDeity) {
    lines.push(`Figure mythologique la plus présente dans le thème : ${profile.tutelaryDeity}`);
  }
  const aspectsLine = Array.isArray(profile.topAspects)
    ? profile.topAspects
        .filter((a) => a && typeof a.type === "string" && typeof a.a === "string" && typeof a.b === "string")
        .map((a) => `${a.a} ${a.type} ${a.b}`)
        .join(", ")
    : "";

  if (!lines.length) {
    res.status(400).json({ error: "Requête invalide : profile ne contient aucune donnée exploitable." });
    return;
  }

  // Accord de genre explicite si connu (voir renderProfilForm() dans app.js — champ
  // optionnel, "Préfère ne pas préciser" par défaut) : sans lui, l'IA doit deviner ou
  // rester dans le flou, ce qui produit soit un mauvais accord soit un texte trop plat.
  const genderHint = profile.gender === "f"
    ? "Cette personne est de genre féminin : accorde tous les adjectifs et participes qui la concernent au féminin (ex. \"tu es née\", \"tu es passionnée\")."
    : profile.gender === "m"
    ? "Cette personne est de genre masculin : accorde tous les adjectifs et participes qui la concernent au masculin (ex. \"tu es né\", \"tu es passionné\")."
    : "Le genre de cette personne n'est pas précisé : formule tes phrases de façon à éviter tout accord de genre explicite (par exemple \"tu ressens\" plutôt que \"tu es ravi/ravie\", ou d'autres tournures neutres).";

  const prompt = `Tu es un astrologue et tarologue chaleureux, direct et humain. Voici un résumé du thème de ${profile.firstName.trim()} :
${lines.join("\n")}
${aspectsLine ? `Aspects marquants entre ses planètes : ${aspectsLine}.` : ""}
${genderHint}

Rédige un portrait de personnalité en français, à la deuxième personne ("tu", "ton", "ta"), en 3 à 4 paragraphes fluides qui tissent ensemble ces éléments en une personnalité cohérente — un texte suivi, pas une liste, pas un paragraphe par élément. Règles strictes :
- Ton chaleureux, direct, humain — jamais mécanique, jamais de formule toute faite du type "comme le montre ton thème" ou "en résumé".
- N'utilise jamais de jargon technique non expliqué (n'écris jamais les mots "aspect", "orbe", "conjonction", "trigone", "carré", "opposition", "sextile") : traduis chaque élément en trait de caractère ou dynamique concrète, en langage courant.
- Ne liste pas mécaniquement chaque élément un par un : entrelace-les pour raconter une personnalité, pas une fiche technique.
- Ne commence jamais par "Cher/Chère" ni par le prénom en première ligne comme un en-tête de lettre.

Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown, exactement sous cette forme :
{"portrait":"le texte du portrait, paragraphes séparés par un retour à la ligne double (\\n\\n)"}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (message.content || [])
      .map((block) => block.text || "")
      .join("\n")
      .trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (typeof parsed.portrait !== "string" || !parsed.portrait.trim()) {
      throw new Error("Réponse IA incomplète");
    }

    res.status(200).json({ portrait: parsed.portrait.trim() });
  } catch (err) {
    console.error("Erreur /api/portrait:", err);
    res.status(502).json({ error: "Impossible de générer le portrait." });
  }
};
