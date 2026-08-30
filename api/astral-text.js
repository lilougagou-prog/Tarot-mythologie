// Backend serverless (Vercel) — remplace les phrases toutes faites affichées sous chaque
// case du Profil astral (nombre du prénom, chaque planète, l'ascendant, chaque aspect) par
// une phrase personnalisée générée par IA, et explique pourquoi la divinité tutélaire du
// thème a été choisie.
//
// Reçoit en POST : { profile: { firstName, gender?, nameNumber?, nameNumberMeaning?,
//   ascendantSign?, planets: [{key, label, sign, house?, retrograde?}, ...],
//   aspects: [{key, type, a, b}, ...], tutelaryDeity?: { name, note?,
//   contributors: [{label, sign, cardName?, precise?}, ...] },
//   majorLinks?: [{point, pointDomain?, sign, cardName, deityName, keywords, mythAstro?,
//   mythFact?}, ...] } }
//   - gender: "f" | "m" | absent/null (préfère ne pas préciser) — pour accorder
//     correctement les phrases générées ; sans lui, formulation volontairement neutre.
//   - Résumé agrégé uniquement (voir profileForAstralText() dans app.js) — jamais le thème
//     natal complet (degrés exacts, etc.), même logique de sobriété que /api/portrait.
//   - `planets`/`aspects` peuvent être vides mais `profile` doit contenir au moins une
//     donnée exploitable (voir la validation plus bas).
//   - Sur chaque contributeur, `precise: true` + `cardName` signale que la divinité tutélaire
//     a été déterminée via le décan exact (10°) du signe plutôt que le signe entier (voir
//     DECAN_MINOR_CARDS/tutelaryDeity() dans app.js) — donne à l'IA de quoi ancrer son
//     explication sur une carte précise plutôt que sur le signe seul, quand c'est possible.
//   - `majorLinks` : les arcanes majeurs liés au thème via Soleil/Lune/Ascendant (voir
//     majorLinksFor()/ZODIAC_MAJOR_LINKS dans app.js — correspondance signe entier -> majeur,
//     fixe, jamais calculée par l'IA). Une entrée PAR POINT (`point`: "Soleil"/"Lune"/
//     "Ascendant"), jamais groupée par carte : deux points peuvent tomber sur la même carte
//     (`cardName` identique sur deux entrées) sans que ça signifie la même chose, voir
//     `pointDomain` (le domaine de vie propre à ce point, ex. identité pour le Soleil, monde
//     intérieur pour la Lune, voir POINT_DOMAIN_HINT dans app.js). Chaque entrée donne déjà
//     le dieu et les mots-clés de la carte pour que l'IA n'ait jamais à deviner un sens de
//     carte, ainsi que `mythAstro` (le lien traditionnel signe -> carte) et `mythFact` (un
//     fait mythologique grec réel et vérifiable expliquant pourquoi ce dieu incarne cette
//     carte, voir ZODIAC_MAJOR_MYTH dans app.js) : l'IA doit s'appuyer dessus tels quels,
//     jamais inventer un autre mythe.
// Renvoie : { text: { nameNumber?: string, ascendant?: string, planets: {clé: string},
//   aspects: {clé: string}, tutelaryReason?: string, majorLinksText?: string } }
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
  const majorLinks = Array.isArray(profile.majorLinks)
    ? profile.majorLinks
        .filter((l) => l && typeof l.point === "string" && l.point && typeof l.sign === "string" && typeof l.cardName === "string" && typeof l.deityName === "string")
        .map((l) => ({
          point: l.point,
          pointDomain: typeof l.pointDomain === "string" ? l.pointDomain : null,
          sign: l.sign,
          cardName: l.cardName,
          deityName: l.deityName,
          keywords: l.keywords,
          mythAstro: typeof l.mythAstro === "string" ? l.mythAstro : null,
          mythFact: typeof l.mythFact === "string" ? l.mythFact : null,
        }))
    : [];
  const hasNameNumber = Number.isFinite(profile.nameNumber);
  const hasAscendant = typeof profile.ascendantSign === "string" && profile.ascendantSign;

  if (!planets.length && !aspects.length && !hasNameNumber && !hasAscendant && !deity && !majorLinks.length) {
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
  if (majorLinks.length) {
    lines.push("Arcanes majeurs déjà liés à ce thème par calcul, UN POINT À LA FOIS (ne remets jamais ce choix en cause, n'en évoque aucun autre) :");
    const seenCards = new Set();
    majorLinks.forEach((l) => {
      const alreadyIntroduced = seenCards.has(l.cardName);
      seenCards.add(l.cardName);
      lines.push(`- ${l.point} en ${l.sign} -> "${l.cardName}", dieu/déesse ${l.deityName} (mots-clés : ${l.keywords})${alreadyIntroduced ? " [même carte qu'un point déjà listé ci-dessus]" : ""}`);
      if (l.pointDomain) lines.push(`  Domaine de vie propre à ce point précis (Soleil ≠ Lune ≠ Ascendant, même sur la même carte) : ${l.pointDomain}`);
      if (typeof l.mythAstro === "string" && l.mythAstro) lines.push(`  Pourquoi ce signe correspond traditionnellement à cette carte : ${l.mythAstro}`);
      if (typeof l.mythFact === "string" && l.mythFact) lines.push(`  Fait mythologique réel expliquant pourquoi ce dieu incarne cette carte (à reformuler avec tes mots, jamais à remplacer par un autre mythe) : ${l.mythFact}`);
    });
  }

  const firstName = profile.firstName.trim();

  // Accord de genre explicite si connu (voir renderProfilForm() dans app.js — champ
  // optionnel, "Préfère ne pas préciser" par défaut).
  const genderHint = profile.gender === "f"
    ? "Cette personne est de genre féminin : accorde tous les adjectifs et participes qui la concernent au féminin (ex. \"tu es née\", \"tu es concentrée\")."
    : profile.gender === "m"
    ? "Cette personne est de genre masculin : accorde tous les adjectifs et participes qui la concernent au masculin (ex. \"tu es né\", \"tu es concentré\")."
    : "Le genre de cette personne n'est pas précisé : formule tes phrases de façon à éviter tout accord de genre explicite.";

  const prompt = `Tu es un astrologue chaleureux, direct et humain. Voici le thème de ${firstName} :
${lines.join("\n")}
${genderHint}

Pour CHACUN des éléments ci-dessus, rédige une phrase personnalisée en français, à la deuxième personne ("tu", "ton", "ta"), qui explique ce que cette position signifie concrètement pour cette personne — jamais une formule générique interchangeable d'une personne à l'autre. Règles strictes :
- EXACTITUDE AVANT TOUT : les données ci-dessus sont la SEULE source de vérité. La phrase que tu écris pour une clé donnée (ex. "moon") doit parler UNIQUEMENT du signe listé pour cette clé précise — ne mélange jamais le signe d'une planète avec celui d'une autre (le signe de la Lune n'est jamais celui du Soleil, et inversement). N'invente jamais un signe ou un placement qui n'est pas dans les données ci-dessus.
- Chaque planète et l'ascendant : 1 seule phrase, formulation propre à cette planète précise et à ce signe précis (pas un gabarit répété d'une planète à l'autre).
- Chaque aspect : 1 seule phrase qui explique la dynamique entre les deux planètes de façon concrète, sans jamais utiliser les mots "aspect", "orbe", "conjonction", "trigone", "carré", "opposition" ou "sextile" — traduis-les en dynamique vécue (tension, alliance naturelle, occasion, frottement à observer…).
- Nombre du prénom : 1 à 2 phrases qui relient ce nombre à un trait de personnalité concret.
${deity ? `- tutelaryReason : 2 à 3 phrases qui expliquent pourquoi CETTE figure mythologique précise résonne avec CE thème, en t'appuyant sur les placements qui ont le plus contribué au choix et sur ce que cette figure représente mythologiquement. Si un placement précise un "décan de la carte X" entre parenthèses, tu peux t'appuyer dessus pour ancrer l'explication sur cette carte précise plutôt que sur le signe seul — mais ne mentionne jamais le mot "décan" lui-même, ni "carte", ni le nom technique de la carte : reformule toujours en langage naturel, comme une simple facette du thème. N'explique jamais le calcul (poids, score) lui-même, seulement le sens. Ne remets jamais en cause le choix de la figure : explique-le, ne le questionne pas.` : ""}
${majorLinks.length ? `- majorLinksText : un texte SUBSTANTIEL, un paragraphe DISTINCT par POINT listé ci-dessus (Soleil/Lune/Ascendant — jamais par carte : si deux points partagent la même carte, ils ont quand même chacun leur propre paragraphe, séparés par un retour à la ligne double comme les autres textes de l'app), d'AU MOINS 5 à 6 phrases CHACUN — jamais une seule phrase expédiée par point, jamais un résumé télégraphique. S'il y a 2 points, le texte total doit faire au moins 10 à 12 phrases ; s'il y en a 3, au moins 15 à 18. Pour CHAQUE point, dans son propre paragraphe :
  (1) explique d'abord, en 2-3 phrases CONCRÈTES, pourquoi la carte associée à CE point précis est liée à ce thème. Si ce point est marqué "[même carte qu'un point déjà listé ci-dessus]", NE RÉEXPLIQUE PAS le mythe depuis le début (une phrase courte qui y renvoie suffit, ex. "la même carte que ton Soleil, mais...") — sinon, appuie-toi explicitement sur le fait mythologique réel donné ci-dessus pour cette carte (reformule-le avec tes mots, mais ne l'invente jamais, ne le remplace jamais par un autre mythe ni par un raccourci du type "le signe X correspond à la carte Y" resté abstrait) pour montrer, avec une vraie anecdote ou un vrai trait mythologique, pourquoi ce dieu/cette déesse incarne vraiment cette carte ;
  (2) développe ensuite, sur AU MOINS 3 phrases distinctes et concrètes (pas une seule formule condensée), ce que CETTE CARTE — son nom, son dieu/sa déesse, ses mots-clés — révèle vraiment de ${firstName} À TRAVERS CE POINT PRÉCIS ET LUI SEUL. Le "Domaine de vie propre à ce point" donné ci-dessus (Soleil = identité consciente et vitalité, Lune = monde intérieur et besoins instinctifs souvent moins visibles, Ascendant = image perçue par les autres avant qu'on la/le connaisse vraiment) sert UNIQUEMENT à choisir l'ANGLE par lequel tu abordes la carte — ce n'est jamais lui, le sujet du paragraphe : la carte doit rester le sujet grammatical et le fil conducteur de la plupart des phrases (nomme-la, reviens à ses mots-clés, à ce qu'elle représente), jamais un paragraphe qui parle surtout du signe, du point ou d'un trait de caractère générique sans jamais reconvoquer la carte elle-même. Pour une même carte partagée entre deux points, les deux paragraphes doivent dire des choses VISIBLEMENT DIFFÉRENTES (l'angle change), jamais la même explication reformulée à peine. Illustre avec une situation de vie plausible et parlante (comment ça se manifeste au quotidien, dans une relation, une décision, un moment de doute...), puis ce que cette prise de conscience permet de faire ou de voir différemment ; ne te contente jamais de reformuler le mot-clé donné, va chercher ce qu'il implique vraiment pour une personne.
  Cette deuxième partie est celle qui doit apporter le plus de valeur : ne la bâcle jamais, ne la résume jamais à une seule phrase.
  IMPORTANT : varie réellement la formulation et la structure d'un paragraphe à l'autre — n'utilise jamais la même phrase de conclusion ou le même tour de phrase répété pour chaque point (ex. jamais "pas comme un trait figé une fois pour toutes", "se joue avant tout à cet endroit-là" ou toute formule équivalente réutilisée telle quelle) : chaque point doit se lire comme écrit spécifiquement pour lui, pas comme un gabarit rempli trois fois.
  N'invente jamais une autre carte que celles listées, ni un sens qui ne découle pas de son dieu/mots-clés donnés. Nomme la carte par son nom entre guillemets français (ex. « Le Mat ») au moins une fois dans le paragraphe. Ne mentionne jamais le mot "arcane", "majeur" ou "correspondance ésotérique" : reste dans une langue naturelle, comme si tu racontais un lien de personnalité, pas un système de calcul.` : ""}
- Jamais de "maison X" mentionnée sans dire ce qu'elle signifie en langage courant si tu la mentionnes.
- Ton chaleureux, direct, humain — jamais mécanique, jamais de formule toute faite du type "cela montre que".

Réponds UNIQUEMENT avec un objet JSON valide, sans texte autour, sans balises markdown, exactement sous cette forme (les clés de "planets" et "aspects" doivent être EXACTEMENT les clés entre guillemets données ci-dessus, pas les labels) :
{"nameNumber":${hasNameNumber ? '"..."' : "null"},"ascendant":${hasAscendant ? '"..."' : "null"},"planets":{${planets.map((p) => `"${p.key}":"..."`).join(",")}},"aspects":{${aspects.map((a) => `"${a.key}":"..."`).join(",")}},"tutelaryReason":${deity ? '"..."' : "null"},"majorLinksText":${majorLinks.length ? '"..."' : "null"}}`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4200,
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
        majorLinksText: typeof parsed.majorLinksText === "string" && parsed.majorLinksText.trim() ? parsed.majorLinksText.trim() : null,
      },
    });
  } catch (err) {
    console.error("Erreur /api/astral-text:", err);
    res.status(502).json({ error: "Impossible de générer les textes astraux." });
  }
};
