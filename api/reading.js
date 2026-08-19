// Backend serverless (Vercel) — génère une lecture de tarot via l'API Anthropic.
//
// Reçoit en POST : { question: string, cards: [carte, ...], positions?: [string, ...], profile?, history? }
//   - cards : de 1 à 12 cartes (tirage "Oui/Non" à "Année à venir", voir SPREADS
//     dans app.js) — plus la même limitation à exactement 3 cartes.
//   - positions (optionnel) : intitulé de chaque position dans le tirage, dans le même
//     ordre que cards (ex. "Défi", "Résultat"...) — donne à l'IA le sens de chaque carte
//     dans les tirages autres que le tirage général.
//   - profile (optionnel, envoyé par le client quand un Profil astral est enregistré) :
//     { firstName, nameNumber, nameNumberMeaning, sunSign, moonSign, ascendantSign,
//     personalYear, personalYearMeaning }. ascendantSign peut être absent/null (heure de
//     naissance inconnue). N'importe quel champ manquant ou profile absent au complet ne
//     change rien au comportement — la lecture reste identique à avant cette fonctionnalité.
//   - history (optionnel, envoyé par le client quand le Journal dégage une tendance —
//     voir journalTrendsForReading() dans app.js) : { topCard, topDomain }, l'un ou l'autre
//     pouvant être absent/null. Absent au complet tant que le Journal n'a pas assez
//     d'entrées pour qu'une tendance ait un sens.
// Renvoie : { cards: [string, ...] (même longueur et ordre que cards en entrée), synthesis }
//
// La clé API Anthropic vit uniquement ici, côté serveur, dans la variable
// d'environnement ANTHROPIC_API_KEY (jamais exposée au navigateur).
//
// Protection optionnelle "usage personnel" : si la variable d'environnement
// APP_ACCESS_CODE est définie, chaque requête doit fournir le même code dans
// l'en-tête X-App-Access-Code (le client le demande une fois et le garde en
// localStorage — voir requestAccessCode() dans app.js). Tant qu'elle est
// définie, seule une personne connaissant ce code peut déclencher un appel
// payant. Pour ouvrir l'appli à d'autres plus tard, il suffit de supprimer
// APP_ACCESS_CODE dans les réglages Vercel — aucun changement de code requis.

const Anthropic = require("@anthropic-ai/sdk");

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// Reproduit exactement la logique de cardFullName() côté client (app.js) :
// les arcanes majeurs sont stockés sous la forme "IV — L'Empereur" et on ne
// garde que la partie après le tiret.
function cardFullName(card) {
  const name = Array.isArray(card) ? card[0] : card && card.name;
  const type = Array.isArray(card) ? card[4] : card && card.type;
  if (type === "major") {
    const match = String(name || "").match(/—\s*(.+)$/);
    return match ? match[1] : name;
  }
  return name;
}

function cardField(card, arrayIndex, objectKey) {
  return Array.isArray(card) ? card[arrayIndex] : card && card[objectKey];
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

  const { question, cards, positions, profile, history } = req.body || {};

  if (
    typeof question !== "string" ||
    !question.trim() ||
    !Array.isArray(cards) ||
    cards.length < 1 ||
    cards.length > 12
  ) {
    res.status(400).json({
      error: "Requête invalide : { question: string, cards: [1 à 12 cartes] } attendu.",
    });
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY manquante dans les variables d'environnement.");
    res.status(500).json({ error: "Configuration serveur incomplète." });
    return;
  }

  const cardBlock = cards
    .map((c, i) => {
      const keywords = cardField(c, 3, "keywords") || "";
      const symbols = cardField(c, 5, "symbols") || "";
      const posLabel = Array.isArray(positions) && typeof positions[i] === "string" ? ` (position : ${positions[i]})` : "";
      return `${i + 1}. ${cardFullName(c)}${posLabel} — mots-clés : ${keywords} — symboles : ${symbols}`;
    })
    .join("\n");

  // Bloc de contexte personnel optionnel (prénom + numérologie + profil astral), tiré du
  // Profil enregistré côté client s'il existe. Ne comporte que les champs réellement
  // présents ; absent au complet si `profile` n'est pas fourni ou vide.
  let personalBlock = "";
  if (profile && typeof profile === "object") {
    const lines = [];
    if (typeof profile.firstName === "string" && profile.firstName.trim()) {
      const meaning = typeof profile.nameNumberMeaning === "string" ? profile.nameNumberMeaning : null;
      const num = Number.isFinite(profile.nameNumber) ? profile.nameNumber : null;
      lines.push(
        `Prénom : ${profile.firstName.trim()}` +
          (num ? ` (nombre numérologique ${num}${meaning ? ` — ${meaning}` : ""})` : "")
      );
    }
    const astralParts = [];
    if (typeof profile.sunSign === "string" && profile.sunSign) astralParts.push(`Soleil en ${profile.sunSign}`);
    if (typeof profile.moonSign === "string" && profile.moonSign) astralParts.push(`Lune en ${profile.moonSign}`);
    if (typeof profile.ascendantSign === "string" && profile.ascendantSign) astralParts.push(`Ascendant ${profile.ascendantSign}`);
    if (astralParts.length) lines.push(`Thème astral : ${astralParts.join(", ")}.`);

    if (Number.isFinite(profile.personalYear)) {
      const meaning = typeof profile.personalYearMeaning === "string" ? profile.personalYearMeaning : null;
      lines.push(`Année personnelle (numérologie) : ${profile.personalYear}${meaning ? ` — ${meaning}` : ""}.`);
    }

    if (lines.length) {
      personalBlock = `\nContexte sur la personne qui consulte (${lines.join(" — ")}) : tu peux t'en servir avec subtilité pour nuancer ta lecture si c'est pertinent — jamais de façon appuyée ni comme un horoscope générique, et jamais au détriment des cartes tirées, qui restent le cœur de la lecture.\n`;
    }
  }

  // Bloc de tendances du Journal optionnel (voir journalTrendsForReading() dans app.js) —
  // même logique de discrétion que personalBlock ci-dessus : un indice de plus, jamais
  // une contrainte qui prendrait le pas sur les cartes tirées aujourd'hui.
  let historyBlock = "";
  if (history && typeof history === "object") {
    const parts = [];
    if (typeof history.topCard === "string" && history.topCard) {
      parts.push(`la carte "${history.topCard}" revient souvent dans ses tirages précédents`);
    }
    if (typeof history.topDomain === "string" && history.topDomain) {
      parts.push(`cette personne pose souvent des questions liées à ${history.topDomain}`);
    }
    if (parts.length) {
      historyBlock = `\nHistorique de ses tirages précédents (${parts.join(" ; ")}) : tu peux t'en servir avec beaucoup de subtilité si c'est pertinent pour cette question précise — jamais de façon appuyée, et jamais au détriment des cartes tirées aujourd'hui.\n`;
    }
  }

  const n = cards.length;
  const hasPositions = Array.isArray(positions) && positions.some((p) => typeof p === "string" && p);

  // Prompt repris de generateAIReading() dans app.js, généralisé pour n'importe quel
  // nombre de cartes (1 à 12 selon le tirage choisi — voir SPREADS dans app.js).
  const prompt = `Tu es un tarologue professionnel, chaleureux, direct et humain. Une personne pose cette question : "${question}"

Cette personne a tiré ${n === 1 ? "cette carte" : `ces ${n} cartes`}, dans cet ordre${hasPositions ? " (avec la position de chacune dans le tirage entre parenthèses)" : ""} :
${cardBlock}
${personalBlock}${historyBlock}
Rédige une lecture de tarot en français, comme le ferait un professionnel expérimenté en face à face. Règles strictes :
- Appelle toujours chaque carte par son nom exact donné ci-dessus (par exemple "le 10 d'Épées", "Le Chariot") — jamais par un simple mot-clé comme "Harmonie".
${hasPositions ? "- Tiens compte du sens de la position de chaque carte dans le tirage (donnée entre parenthèses) pour son interprétation.\n" : ""}- Réponds vraiment et précisément à la question posée, pas de façon générique.
- Ton chaleureux, direct, humain — pas mécanique, pas de formule toute faite du type "si je devais résumer".
- Varie la structure : adapte-toi vraiment au contenu et au type de question (décision, sentiment, timing, etc.), ne suis pas un plan fixe.

Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown, exactement sous cette forme :
{"cards":[tableau de ${n} chaîne${n>1?"s":""} de texte, dans le même ordre que les cartes ci-dessus, chacune 1-2 phrases sur ce que cette carte apporte à la question],"synthesis":"un paragraphe de 3-5 phrases qui répond vraiment à la question en s'appuyant sur l'ensemble des cartes ensemble"}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: Math.min(3500, Math.max(1000, 300 + n * 220)),
      messages: [{ role: "user", content: prompt }],
    });

    const text = (message.content || [])
      .map((block) => block.text || "")
      .join("\n")
      .trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (!Array.isArray(parsed.cards) || parsed.cards.length !== n || !parsed.synthesis) {
      throw new Error("Réponse IA incomplète");
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Erreur /api/reading:", err);
    res.status(502).json({ error: "Impossible de générer la lecture IA." });
  }
};
