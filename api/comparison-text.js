// Backend serverless (Vercel) — rédige un court texte suivi (2-3 paragraphes) qui tisse en
// une lecture fluide les résultats DÉJÀ CALCULÉS localement par compareProfiles() côté
// client (élément dominant, points communs, tensions potentielles, divinité tutélaire
// commune) pour la fonctionnalité "Mes proches" (comparaison de thèmes). Bonus optionnel
// au-dessus d'une comparaison déjà complète sans lui — voir renderComparison() dans app.js.
//
// Reçoit en POST : { comparison: {
//   yourFirstName, yourGender?, theirFirstName, theirGender?, relationType,
//   yourSigns: {sun,moon,ascendant}, theirSigns: {sun,moon,ascendant},
//   element: {a, b, kind} | null,      // kind: "resonance" | "complement" | "tension"
//   sharedDeity: string | null,
//   commonPoints: [{your, their, type}], tensePoints: [{your, their, type}],
// } }
//   - Résumé minimal (voir profileForComparisonText() dans app.js), jamais les deux thèmes
//     complets — même logique de sobriété que le "profile" envoyé à /api/portrait.
//   - yourGender/theirGender : "f" | "m" | absent/null (préfère ne pas préciser) chacun,
//     indépendamment — pour accorder correctement le texte ; sans eux, formulation
//     volontairement neutre (voir genderNote() plus bas).
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

// Indication de genre par personne, indépendante l'une de l'autre (l'un peut être connu et
// l'autre non). `asYou` : cette personne est celle adressée en "tu" (accord d'adjectif) ;
// sinon elle est nommée par son prénom (le pronom "il"/"elle" devient possible si le genre
// est connu, sinon toujours évité — voir prompt principal).
function genderNote(name, gender, asYou) {
  if (gender === "f") {
    return asYou
      ? `${name} est de genre féminin : accorde tous les adjectifs et participes qui la/le concernent au féminin (ex. "tu es née", "tu es à l'aise").`
      : `${name} est de genre féminin : tu peux utiliser "elle" pour parler d'${name} si besoin, et accorder les adjectifs/participes qui la concernent au féminin.`;
  }
  if (gender === "m") {
    return asYou
      ? `${name} est de genre masculin : accorde tous les adjectifs et participes qui le concernent au masculin (ex. "tu es né", "tu es à l'aise").`
      : `${name} est de genre masculin : tu peux utiliser "il" pour parler de ${name} si besoin, et accorder les adjectifs/participes qui le concernent au masculin.`;
  }
  return asYou
    ? `Le genre de ${name} n'est pas précisé : évite tout accord de genre explicite le concernant.`
    : `Le genre de ${name} n'est pas précisé : n'utilise jamais de pronom genré ("il"/"elle"/"sa"/"son") pour en parler — répète son prénom ou utilise des tournures neutres.`;
}

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
  const yourGenderNote = genderNote(you, comparison.yourGender === "f" || comparison.yourGender === "m" ? comparison.yourGender : null, true);
  const theirGenderNote = genderNote(them, comparison.theirGender === "f" || comparison.theirGender === "m" ? comparison.theirGender : null, false);

  // Un bloc PAR PERSONNE (plutôt qu'une ligne par planète mélangeant les deux prénoms) :
  // plus explicite pour l'IA que "Soleil : Sophie en X, Léa en Y" sur une même ligne, qui
  // s'est révélé source de confusion en pratique — un retour direct d'utilisatrice a signalé
  // un texte affirmant "il a une Lune en Poissons" pour un fils dont la Lune était en Cancer
  // (c'est son Soleil qui était en Poissons) alors que les données envoyées étaient
  // correctes : l'IA avait interverti deux placements en rédigeant. Regrouper par personne
  // réduit ce risque en donnant à l'IA un seul repère mental par bloc de faits.
  const ys = comparison.yourSigns || {}, ts = comparison.theirSigns || {};
  const personBlock = (label, signs) => {
    const rows = [];
    if (signs.sun) rows.push(`- Soleil en ${signs.sun}`);
    if (signs.moon) rows.push(`- Lune en ${signs.moon}`);
    if (signs.ascendant) rows.push(`- Ascendant ${signs.ascendant}`);
    return rows.length ? `Thème de ${label} :\n${rows.join("\n")}` : "";
  };
  const yourBlock = personBlock(you, ys);
  const theirBlock = personBlock(them, ts);

  const crossLines = [];
  if (comparison.element && typeof comparison.element === "object") {
    const el = comparison.element;
    const kindLabel = el.kind === "resonance" ? "même élément" : el.kind === "complement" ? "éléments complémentaires" : "éléments en tension";
    crossLines.push(`Élément dominant : ${el.a} (${you}) / ${el.b} (${them}) — ${kindLabel}`);
  }
  if (typeof comparison.sharedDeity === "string" && comparison.sharedDeity) {
    crossLines.push(`Divinité tutélaire commune : ${comparison.sharedDeity}`);
  }
  const pointsLine = (list) => Array.isArray(list)
    ? list
        .filter((p) => p && typeof p.your === "string" && typeof p.their === "string" && typeof p.type === "string")
        .map((p) => `${p.your} (${you}) ${p.type} ${p.their} (${them})`)
        .join(", ")
    : "";
  const commonLine = pointsLine(comparison.commonPoints);
  const tenseLine = pointsLine(comparison.tensePoints);
  if (commonLine) crossLines.push(`Points communs relevés : ${commonLine}`);
  if (tenseLine) crossLines.push(`Tensions potentielles relevées : ${tenseLine}`);

  if (!yourBlock && !theirBlock && !crossLines.length) {
    res.status(400).json({ error: "Requête invalide : comparison ne contient aucune donnée exploitable." });
    return;
  }

  const dataBlock = [yourBlock, theirBlock, ...crossLines].filter(Boolean).join("\n\n");

  const prompt = `Tu es un astrologue et tarologue chaleureux, direct et humain. Voici une comparaison déjà calculée entre le thème de ${you} et celui de ${them} — ces données sont la SEULE source de vérité, ne les modifie jamais et ne les mélange jamais entre les deux personnes :

${dataBlock}

Cette comparaison concerne ${toneHint}
${yourGenderNote}
${theirGenderNote}

Rédige un texte en français, à la deuxième personne pour ${you} ("tu", "ton", "ta" — ${you} est la personne qui lit) et en nommant ${them} par son prénom, en 2 à 3 paragraphes fluides qui tissent ensemble ces éléments en une lecture cohérente de la relation — un texte suivi, pas une liste, pas un paragraphe par élément. Règles strictes :
- EXACTITUDE AVANT TOUT : chaque fois que tu mentionnes un signe ou une planète, vérifie qu'il correspond EXACTEMENT à la personne concernée dans les données ci-dessus (le Soleil de ${you} n'est jamais celui de ${them}, et inversement — ni pour le Soleil, ni pour la Lune, ni pour l'Ascendant). N'invente jamais un placement qui n'est pas listé. En cas de doute sur un détail précis, reste plus général plutôt que de risquer une erreur factuelle.
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
