// Backend serverless (Vercel) — rédige UNE recommandation concrète pour la journée en
// cours ("Horoscope du jour" côté interface — le nom de l'endpoint et des variables reste
// "ritual" en interne, pour ne pas renommer tout un pan du code pour un simple changement
// de libellé visible). Relie carte du jour + transits du jour (signes + aspect le plus
// marqué avec le thème natal) + thème natal fixe (Soleil/Lune/ascendant de naissance) +
// nombre personnel DU JOUR (pas du mois : voir plus bas pourquoi) en un conseil cohérent.
//
// Pourquoi le thème natal fixe et le nombre du jour ont été ajoutés : sans eux, deux
// jours qui partagent la même carte (le cycle ne compte que 22 majeurs) et le même signe
// transitant (le Soleil reste tout un mois dans le même signe) produisaient un texte
// quasi identique — tous les inputs variables étaient épuisés. Le thème natal fixe rend
// le texte différent d'une personne à l'autre même à carte/signe du jour identiques, et le
// nombre personnel DU JOUR (contrairement à celui du mois) change chaque jour, garantissant
// qu'aucune combinaison complète d'inputs ne se répète avant longtemps.
//
// Reçoit en POST : { summary: { firstName?, dayCardName, dayCardKeywords?,
//   natalSunSign?, natalMoonSign?, natalAscendantSign?, sunSign?, moonSign?,
//   transitAspect?: {body, action, natal}, personalDay?, personalDayMeaning? } }
//   - dayCardName : seul champ obligatoire (nom de la carte du jour).
//   - natalSunSign/natalMoonSign/natalAscendantSign : signes du thème natal enregistré
//     (profile.astral côté client) — fixes, jamais recalculés ici.
//   - sunSign/moonSign : signes transitants DU JOUR (positions du ciel aujourd'hui, pas le
//     thème natal) — à ne pas confondre avec les deux ci-dessus.
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

  // Deux blocs distincts dans le prompt : ce qui est FIXE (le thème natal — propre à la
  // personne, jamais le même d'un utilisateur à l'autre) et ce qui VARIE aujourd'hui (carte,
  // transits, nombre du jour) — pour que l'IA les combine plutôt que de simplement paraphraser
  // la carte, seul élément qu'elle donnerait sinon la même importance à chaque bloc.
  const natalLines = [];
  if (typeof summary.natalSunSign === "string" && summary.natalSunSign) natalLines.push(`Soleil natal en ${summary.natalSunSign}`);
  if (typeof summary.natalMoonSign === "string" && summary.natalMoonSign) natalLines.push(`Lune natale en ${summary.natalMoonSign}`);
  if (typeof summary.natalAscendantSign === "string" && summary.natalAscendantSign) natalLines.push(`Ascendant en ${summary.natalAscendantSign}`);

  const dayLines = [`Carte du jour : ${summary.dayCardName.trim()}${typeof summary.dayCardKeywords === "string" && summary.dayCardKeywords ? ` (${summary.dayCardKeywords})` : ""}`];
  if (typeof summary.sunSign === "string" && summary.sunSign) dayLines.push(`Soleil du jour en ${summary.sunSign}`);
  if (typeof summary.moonSign === "string" && summary.moonSign) dayLines.push(`Lune du jour en ${summary.moonSign}`);
  const ta = summary.transitAspect;
  if (ta && typeof ta.body === "string" && typeof ta.action === "string" && typeof ta.natal === "string") {
    dayLines.push(`Aspect du jour le plus marqué avec le thème natal : ${ta.body} ${ta.action} ${ta.natal}`);
  }
  if (Number.isFinite(summary.personalDay)) {
    const meaning = typeof summary.personalDayMeaning === "string" ? summary.personalDayMeaning : null;
    dayLines.push(`Nombre personnel du jour : ${summary.personalDay}${meaning ? ` (${meaning})` : ""}`);
  }

  const firstName = typeof summary.firstName === "string" && summary.firstName.trim() ? summary.firstName.trim() : null;

  const prompt = `Tu es un guide chaleureux et concis. Voici l'horoscope du jour à rédiger${firstName ? ` pour ${firstName}` : ""} :
${natalLines.length ? `Thème natal (fixe, propre à cette personne) :\n${natalLines.join("\n")}\n\n` : ""}Éléments du jour (ce qui change aujourd'hui) :
${dayLines.join("\n")}

Rédige UNE recommandation concrète pour aujourd'hui, en 2 à 3 phrases, qui relie ces éléments en un conseil unique et cohérent — pas une liste, pas un élément traité après l'autre. Règles strictes :
- Ancre le texte dans CETTE combinaison précise${natalLines.length ? " (thème natal + éléments du jour)" : " (les éléments du jour)"} : évite absolument toute formule qui pourrait s'appliquer telle quelle à n'importe quel autre jour ou n'importe quelle autre personne — c'est le défaut le plus important à éviter.
${natalLines.length ? "- Si le thème natal est fourni, fais-le résonner avec les éléments du jour plutôt que de le lister à part (ex. \"ta Lune en Poissons\" rendue plus sensible par tel élément du jour) — sans le nommer mot pour mot comme une fiche technique.\n" : ""}- Ton chaleureux, direct, humain — jamais mystique-vague ("laisse l'univers te guider", "l'énergie du jour t'invite").
- Concret et actionable : quelque chose que la personne peut vraiment faire ou observer aujourd'hui, pas une généralité.
- N'utilise jamais de jargon technique (n'écris pas "transit", "aspect", "orbe", "natal").

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
