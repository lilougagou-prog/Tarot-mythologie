// Backend serverless (Vercel) — positions planétaires du jour ("transits"), pour
// l'horoscope dynamique de l'accueil (voir horoscopeDuJour() dans app.js).
//
// Contrairement à /api/astral, ne reçoit aucune donnée personnelle : les positions du
// jour sont les mêmes pour tout le monde, seule la date/heure UTC de la requête compte.
// Le client compare ensuite ces positions "transitantes" à son thème natal (déjà en
// localStorage, jamais renvoyé ici) pour produire un texte personnalisé — ce calcul de
// comparaison reste entièrement côté client.
//
// Reçoit en POST : {} (corps vide). Renvoie :
// { date: "AAAA-MM-JJ", computedAt: <instant ISO>, bodies: { sun: {longitude, sign,
//   degreeInSign, retrograde}, moon: {...}, mercury, venus, mars, jupiter, saturn,
//   uranus, neptune, pluto } }
//
// Pas de maisons/ascendant ici (ça exigerait un lieu, qu'on ne demande volontairement
// pas — un transit n'a pas besoin d'être géolocalisé, seules les longitudes écliptiques
// comptent). Résultat identique pour tous les appels dans la même journée UTC : le
// client le met en cache un jour entier (voir ensureTransits() dans app.js) plutôt que
// de rappeler cet endpoint à chaque affichage de l'accueil.
//
// Même protection "usage personnel" optionnelle que /api/reading et /api/astral : si
// APP_ACCESS_CODE est définie côté serveur, l'en-tête X-App-Access-Code est requis —
// même si, ce calcul étant gratuit (pas d'appel IA), ce n'est ici qu'une question de
// cohérence avec le reste de l'API plutôt que de protection de coût.

const { BODIES, BODY_KEYS, eclipticLongitude, zodiacFromLongitude, isRetrograde } = require("./_lib/astro");

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

  const now = new Date();

  try {
    const bodies = {};
    for (const body of BODIES) {
      const lon = eclipticLongitude(body, now);
      const { sign, degreeInSign } = zodiacFromLongitude(lon);
      bodies[BODY_KEYS[body]] = {
        longitude: Math.round(lon * 10000) / 10000,
        sign,
        degreeInSign,
        retrograde: isRetrograde(body, now),
      };
    }

    res.status(200).json({
      date: now.toISOString().slice(0, 10),
      computedAt: now.toISOString(),
      bodies,
    });
  } catch (err) {
    console.error("Erreur /api/transits:", err);
    res.status(502).json({ error: "Impossible de calculer les positions planétaires du jour." });
  }
};
