// Backend serverless (Vercel) — génère une lecture de tarot via l'API Anthropic.
//
// Reçoit en POST : { question: string, cards: [carte1, carte2, carte3] }
// Renvoie : { card1, card2, card3, synthesis }
//
// La clé API Anthropic vit uniquement ici, côté serveur, dans la variable
// d'environnement ANTHROPIC_API_KEY (jamais exposée au navigateur).

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

  const { question, cards } = req.body || {};

  if (
    typeof question !== "string" ||
    !question.trim() ||
    !Array.isArray(cards) ||
    cards.length !== 3
  ) {
    res.status(400).json({
      error: "Requête invalide : { question: string, cards: [3 cartes] } attendu.",
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
      return `${i + 1}. ${cardFullName(c)} — mots-clés : ${keywords} — symboles : ${symbols}`;
    })
    .join("\n");

  // Prompt exact repris de generateAIReading() dans app.js.
  const prompt = `Tu es un tarologue professionnel, chaleureux, direct et humain. Une personne pose cette question : "${question}"

Elle a tiré ces trois cartes, dans cet ordre :
${cardBlock}

Rédige une lecture de tarot en français, comme le ferait un professionnel expérimenté en face à face. Règles strictes :
- Appelle toujours chaque carte par son nom exact donné ci-dessus (par exemple "le 10 d'Épées", "Le Chariot") — jamais par un simple mot-clé comme "Harmonie".
- Réponds vraiment et précisément à la question posée, pas de façon générique.
- Ton chaleureux, direct, humain — pas mécanique, pas de formule toute faite du type "si je devais résumer".
- Varie la structure : adapte-toi vraiment au contenu et au type de question (décision, sentiment, timing, etc.), ne suis pas un plan fixe.

Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown, exactement sous cette forme :
{"card1":"1-2 phrases sur ce que cette carte apporte à la question","card2":"...","card3":"...","synthesis":"un paragraphe de 3-5 phrases qui répond vraiment à la question en s'appuyant sur les trois cartes ensemble"}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = (message.content || [])
      .map((block) => block.text || "")
      .join("\n")
      .trim();
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    if (!parsed.card1 || !parsed.synthesis) {
      throw new Error("Réponse IA incomplète");
    }

    res.status(200).json(parsed);
  } catch (err) {
    console.error("Erreur /api/reading:", err);
    res.status(502).json({ error: "Impossible de générer la lecture IA." });
  }
};
