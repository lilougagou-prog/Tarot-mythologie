// Backend serverless (Vercel) — remplace les phrases toutes faites affichées sous chaque
// case du Profil astral (nombre du prénom, chaque planète, l'ascendant, chaque aspect) par
// une phrase personnalisée générée par IA, et explique pourquoi la divinité tutélaire du
// thème a été choisie.
//
// Reçoit en POST : { profile: { firstName, nameNumber?, nameNumberMeaning?,
//   ascendantSign?, planets: [{key, label, sign, house?, retrograde?}, ...],
//   aspects: [{key, type, a, b}, ...], tutelaryDeity?: { name, note?,
//   contributors: [{label, sign, cardName?, precise?}, ...] } } }
//   - Résumé agrégé uniquement (voir profileForAstralText() dans app.js) — jamais le thème
//     natal complet (degrés exacts, etc.), même logique de sobriété que /api/portrait.
//   - `planets`/`aspects` peuvent être vides mais `profile` doit contenir au moins une
//     donnée exploitable (voir la validation plus bas).
//   - Sur chaque contributeur, `precise: true` + `cardName` signale que la divinité tutélaire
//     a été déterminée via le décan exact (10°) du signe plutôt que le signe entier (voir
//     DECAN_MINOR_CARDS/tutelaryDeity() dans app.js) — donne à l'IA de quoi ancrer son
//     explication sur une carte précise plutôt que sur le signe seul, quand c'est possible.
// Renvoie : { text: { nameNumber?: string, ascendant?: string, planets: {clé: string},
//   aspects: {clé: string}, tutelaryReason?: string } }
//
// Généré une seule fois et mis en cache côté client (profile.astralText dans
// localStorage), régénéré si la divinité tutélaire recalculée change (voir
// ensureAstralText() dans app.js) — même logique de cache qu'/api/portrait sinon.
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

  const planets = Array.isArray(profile.planets)
    ? profile.planets.filter((p) => p && typeof p.key === "string" && typeof p.label === "string" && typeof p.sign === "string")
    : [];
  const aspects = Array.isArray(profile.aspects)
    ? profile.aspects.filter((a) => a && typeof a.key === "string" && typeof a.type === "string" && typeof a.a === "string" && typeof a.b === "string")
    : [];
  const deity = profile.tutelaryDeity && typeof profile.tutelaryDeity === "object" && typeof profile.tutelaryDeity.name === "string"
    ? profile.tutelaryDeity
    : null;
  const hasNameNumber = Number.isFinite(profile.nameNumber);
  const hasAscendant = typeof profile.ascendantSign === "string" && profile.ascendantSign;

  if (!planets.length && !aspects.length && !hasNameNumber && !hasAscendant && !deity) {
    res.status(400).json({ error: "Requête invalide : profile ne contient aucune donnée exploitable." });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Configuration serveur incomplète." });
    return;
  }

  const lines = [];
  if (hasNameNumber) {
    const meaning = typeof profile.nameNumberMeaning === "string" ? profile.nameNumberMeaning : null;
    lines.push(`Nombre du prénom : ${profile.nameNumber}${meaning ? ` (${meaning})` : ""}`);
  }
  if (planets.length) {
    lines.push("Planètes :");
    planets.forEach((p) => {
      lines.push(`- [clé "${p.key}"] ${p.label} en ${p.sign}${p.house ? `, maison ${p.house}` : ""}${p.retrograde ? ", rétrograde" : ""}`);
    });
  }
  if (hasAscendant) lines.push(`Ascendant : ${profile.ascendantSign}`);
  if (aspects.length) {
    lines.push("Aspects marqués entre planètes :");
    aspects.forEach((a) => {
      lines.push(`- [clé "${a.key}"] ${a.a} ${a.type} ${a.b}`);
    });
  }
  if (deity) {
    const contributors = Array.isArray(deity.contributors)
      ? deity.contributors
          .filter((c) => c && typeof c.label === "string" && typeof c.sign === "string")
          .map((c) => (c.precise && typeof c.cardName === "string" ? `${c.label} en ${c.sign} (décan de la carte "${c.cardName}")` : `${c.label} en ${c.sign}`))
          .join(", ")
      : "";
    lines.push(`Figure mythologique déjà déterminée par calcul comme la plus présente dans ce thème (ne remets jamais ce choix en cause) : ${deity.name}${deity.note ? ` — ${deity.note}` : ""}`);
    if (contributors) lines.push(`Placements qui ont le plus contribué à ce choix : ${contributors}`);
  }

  const firstName = profile.firstName.trim();

  const prompt = `Tu es un astrologue chaleureux, direct et humain. Voici le thème de ${firstName} :
${lines.join("\n")}

Pour CHACUN des éléments ci-dessus, rédige une phrase personnalisée en français, à la deuxième personne ("tu", "ton", "ta"), qui explique ce que cette position signifie concrètement pour cette personne — jamais une formule générique interchangeable d'une personne à l'autre. Règles strictes :
- Chaque planète et l'ascendant : 1 seule phrase, formulation propre à cette planète précise et à ce signe précis (pas un gabarit répété d'une planète à l'autre).
- Chaque aspect : 1 seule phrase qui explique la dynamique entre les deux planètes de façon concrète, sans jamais utiliser les mots "aspect", "orbe", "conjonction", "trigone", "carré", "opposition" ou "sextile" — traduis-les en dynamique vécue (tension, alliance naturelle, occasion, frottement à observer…).
- Nombre du prénom : 1 à 2 phrases qui relient ce nombre à un trait de personnalité concret.
${deity ? `- tutelaryReason : 2 à 3 phrases qui expliquent pourquoi CETTE figure mythologique précise résonne avec CE thème, en t'appuyant sur les placements qui ont le plus contribué au choix et sur ce que cette figure représente mythologiquement. Si un placement précise un "décan de la carte X" entre parenthèses, tu peux t'appuyer dessus pour ancrer l'explication sur cette carte précise plutôt que sur le signe seul — mais ne mentionne jamais le mot "décan" lui-même, ni "carte", ni le nom technique de la carte : reformule toujours en langage naturel, comme une simple facette du thème. N'explique jamais le calcul (poids, score) lui-même, seulement le sens. Ne remets jamais en cause le choix de la figure : explique-le, ne le questionne pas.` : ""}
- Jamais de "maison X" mentionnée sans dire ce qu'elle signifie en langage courant si tu la mentionnes.
- Ton chaleureux, direct, humain — jamais mécanique, jamais de formule toute faite du type "cela montre que".

Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown, exactement sous cette forme (les clés de "planets" et "aspects" doivent être EXACTEMENT les clés entre guillemets données ci-dessus, pas les labels) :
{"nameNumber":${hasNameNumber ? '"..."' : "null"},"ascendant":${hasAscendant ? '"..."' : "null"},"planets":{${planets.map((p) => `"${p.key}":"..."`).join(",")}},"aspects":{${aspects.map((a) => `"${a.key}":"..."`).join(",")}},"tutelaryReason":${deity ? '"..."' : "null"}}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2200,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (message.content || [])
      .map((block) => block.text || "")
      .join("\n")
      .trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("Réponse IA incomplète");
    }

    // Nettoyage tolérant : ne garde que des chaînes non vides, laisse le client retomber
    // sur ses phrases génériques pour tout champ manquant ou mal formé plutôt que d'échouer
    // toute la réponse pour un seul champ raté.
    const cleanPlanets = {};
    if (parsed.planets && typeof parsed.planets === "object") {
      for (const p of planets) {
        if (typeof parsed.planets[p.key] === "string" && parsed.planets[p.key].trim()) cleanPlanets[p.key] = parsed.planets[p.key].trim();
      }
    }
    const cleanAspects = {};
    if (parsed.aspects && typeof parsed.aspects === "object") {
      for (const a of aspects) {
        if (typeof parsed.aspects[a.key] === "string" && parsed.aspects[a.key].trim()) cleanAspects[a.key] = parsed.aspects[a.key].trim();
      }
    }

    res.status(200).json({
      text: {
        nameNumber: typeof parsed.nameNumber === "string" && parsed.nameNumber.trim() ? parsed.nameNumber.trim() : null,
        ascendant: typeof parsed.ascendant === "string" && parsed.ascendant.trim() ? parsed.ascendant.trim() : null,
        planets: cleanPlanets,
        aspects: cleanAspects,
        tutelaryReason: typeof parsed.tutelaryReason === "string" && parsed.tutelaryReason.trim() ? parsed.tutelaryReason.trim() : null,
      },
    });
  } catch (err) {
    console.error("Erreur /api/astral-text:", err);
    res.status(502).json({ error: "Impossible de générer les textes astraux." });
  }
};
