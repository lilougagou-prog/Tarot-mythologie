// Backend serverless (Vercel) — interprète un rêve raconté en texte libre, à la manière de
// l'onirocritique grecque antique : Artémidore de Daldis, au IIe siècle après J.-C., en a
// laissé le traité le plus complet de l'Antiquité, l'Onirocriticon. Identifie les symboles
// ou éléments marquants du récit et propose un sens concret — jamais une prédiction
// littérale de l'avenir, seulement un reflet symbolique.
//
// Reçoit en POST : { dreamText: string, profile?: { occupation?, loveStatus?,
//   hasChildren?: true|false, interests? }, recentReading?: { date?, cards: string[],
//   synthesisExcerpt? } }
//   - dreamText : récit libre du rêve, tel que tapé (non vide, max MAX_DREAM_LENGTH
//     caractères).
//   - profile (optionnel, voir profileForDream() dans app.js) : le métier notamment change
//     beaucoup le sens plausible d'un rêve — retour direct d'utilisatrice ("le métier a une
//     grande importance pour l'interprétation des rêves"). Tous les champs sont
//     individuellement optionnels ; profile absent au complet ne change rien au
//     comportement, l'interprétation reste identique à avant cette fonctionnalité.
//   - recentReading (optionnel, voir recentReadingForDream() dans app.js) : le tirage de
//     tarot le plus récent de cette personne — les cartes tirées et un court extrait de la
//     synthèse déjà générée, jamais la question posée (qui reste privée, même logique que
//     memory dans api/reading.js). Un simple indice optionnel que l'IA peut utiliser SI
//     pertinent, jamais un lien forcé — retour direct d'utilisatrice : les rêves et les
//     tirages doivent pouvoir s'éclairer l'un l'autre.
// Renvoie : { analysis: string } — 2 à 4 paragraphes séparés par un retour à la ligne
// double, prêts à être affichés tels quels (voir renderDreamForm() dans app.js).
//
// Jamais mis en cache côté serveur — le client décide seul de conserver ou non le résultat
// (voir dreams/dreamState dans app.js) : l'archive des rêves reste 100% locale, comme le
// Journal des tirages.
//
// La clé API Anthropic vit uniquement ici, côté serveur, dans la variable d'environnement
// ANTHROPIC_API_KEY (jamais exposée au navigateur).
//
// Même protection "usage personnel" optionnelle que les autres endpoints IA : si
// APP_ACCESS_CODE est définie côté serveur, l'en-tête X-App-Access-Code est requis.

const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MAX_DREAM_LENGTH = 4000;

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

  const { dreamText, profile, recentReading } = req.body || {};

  if (
    typeof dreamText !== "string" ||
    !dreamText.trim() ||
    dreamText.length > MAX_DREAM_LENGTH
  ) {
    res.status(400).json({
      error: `Requête invalide : { dreamText: string non vide, ${MAX_DREAM_LENGTH} caractères maximum } attendu.`,
    });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Configuration serveur incomplète." });
    return;
  }

  // Contexte de vie optionnel (voir profileForDream()/lifeContextFor() dans app.js) : le
  // métier notamment change beaucoup le sens plausible d'un rêve (un rêve de chute ou de
  // retard n'évoque pas la même chose selon qu'on est étudiant·e ou en poste à
  // responsabilités) — retour direct d'utilisatrice.
  let lifeContextBlock = "";
  if (profile && typeof profile === "object") {
    const parts = [];
    if (typeof profile.occupation === "string" && profile.occupation) parts.push(`métier : ${profile.occupation}`);
    if (typeof profile.loveStatus === "string" && profile.loveStatus) parts.push(`situation amoureuse : ${profile.loveStatus}`);
    if (profile.hasChildren === true) parts.push("a des enfants");
    else if (profile.hasChildren === false) parts.push("n'a pas d'enfants");
    if (typeof profile.interests === "string" && profile.interests) parts.push(`centres d'intérêt : ${profile.interests}`);
    if (parts.length) {
      lifeContextBlock = `\nContexte de vie de cette personne (${parts.join(", ")}) : tu peux t'en servir pour ancrer ton interprétation dans sa vie réelle si c'est pertinent — jamais de façon appuyée ni systématique, et jamais au détriment du récit lui-même, qui reste la seule vraie source.\n`;
    }
  }

  // Tirage de tarot récent optionnel (voir recentReadingForDream() dans app.js) — retour
  // direct d'utilisatrice : les rêves doivent pouvoir s'éclairer avec les tirages, mais
  // seulement si c'est vraiment pertinent, jamais un rapprochement forcé.
  let recentReadingBlock = "";
  if (
    recentReading &&
    typeof recentReading === "object" &&
    Array.isArray(recentReading.cards) &&
    recentReading.cards.length &&
    recentReading.cards.every((c) => typeof c === "string" && c)
  ) {
    const cardsList = recentReading.cards.join(", ");
    const synthPart = typeof recentReading.synthesisExcerpt === "string" && recentReading.synthesisExcerpt.trim()
      ? ` — la lecture en avait retenu : "${recentReading.synthesisExcerpt.trim()}"`
      : "";
    const datePart = typeof recentReading.date === "string" && recentReading.date ? ` (${recentReading.date})` : "";
    recentReadingBlock = `\nTirage de tarot récent de cette personne${datePart} : ${cardsList}${synthPart}. INDICE OPTIONNEL seulement : si, et seulement si, il existe un lien clair et naturel avec ce rêve, tu peux t'appuyer dessus ; sinon ignore-le complètement, ne force jamais un rapprochement artificiel et ne le mentionne jamais si ça n'apporte rien — le récit du rêve reste la seule vraie source.\n`;
  }

  const prompt = `Tu es un interprète de rêves inspiré de la tradition grecque antique de l'onirocritique — dans la lignée d'Artémidore de Daldis, auteur au IIe siècle après J.-C. de l'Onirocriticon, le traité d'interprétation des rêves le plus complet de l'Antiquité. Voici le récit d'un rêve, tel que raconté :

"""
${dreamText.trim()}
"""
${lifeContextBlock}${recentReadingBlock}
Rédige une interprétation en français, en 2 à 4 paragraphes fluides — un texte suivi, pas une liste à puces. Règles strictes :
- Identifie 2 à 4 éléments ou symboles marquants du récit et donne à chacun un sens concret, ancré dans ce que cet élément évoque traditionnellement (eau, chute, poursuite, maison, animal, un proche...), jamais un sens générique interchangeable d'un rêve à l'autre.
- Conclus par une synthèse qui relie ces éléments à un état intérieur, une préoccupation ou une émotion actuelle plausible.
- EXACTITUDE ET HONNÊTETÉ AVANT TOUT : ne t'appuie que sur ce qui est réellement raconté dans le récit ci-dessus, n'invente aucun détail qui n'y figure pas — et surtout, ne prétends JAMAIS prédire l'avenir de façon littérale ("il va t'arriver X", "tu rencontreras Y", "cela annonce que..."). Reste strictement dans le registre du reflet symbolique et intérieur, jamais dans celui de la divination événementielle.
- Ton chaleureux, direct, humain — jamais mystique-vague ni mécanique, jamais de formule toute faite du type "cela symbolise" ou "cela représente".
- Ne commence jamais par "Cher/Chère" ni par une formule d'en-tête de lettre.

Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown, exactement sous cette forme :
{"analysis":"le texte, paragraphes séparés par un retour à la ligne double (\\n\\n)"}`;

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

    if (typeof parsed.analysis !== "string" || !parsed.analysis.trim()) {
      throw new Error("Réponse IA incomplète");
    }

    res.status(200).json({ analysis: parsed.analysis.trim() });
  } catch (err) {
    console.error("Erreur /api/dream:", err);
    res.status(502).json({ error: "Impossible d'interpréter ce rêve pour le moment." });
  }
};
