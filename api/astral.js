// Backend serverless (Vercel) — calcule un profil astral (thème natal) à partir d'une
// date, heure et lieu de naissance.
//
// Reçoit en POST : { date: "YYYY-MM-DD", time: "HH:MM", place: string }
//   - date/time : date et heure LOCALES de naissance (heure au lieu de naissance, pas UTC)
//   - place     : lieu en texte libre, ex. "Lyon, France"
//
// Renvoie : { resolvedPlace, latitude, longitude, timezone, utcInstant, sunSign, moonSign, bodies }
//
// Étapes :
//   1. Géocodage du lieu (Open-Meteo Geocoding API — gratuite, sans clé, renvoie aussi
//      le fuseau IANA du lieu directement via GeoNames, ce qui évite une bibliothèque
//      séparée de lookup de fuseau).
//   2. Résolution de l'heure UTC exacte de naissance : Luxon convertit l'heure locale
//      dans ce fuseau IANA, en tenant compte automatiquement des règles historiques de
//      changement d'heure (base de données IANA intégrée à Node).
//   3. Position écliptique géocentrique "de la date" de chaque corps céleste, via
//      astronomy-engine (auto-suffisant, pas de fichier d'éphémérides externe) — d'où
//      on dérive signe zodiacal, degré dans le signe, et rétrogradation.
//
// Vie privée : la date/heure/lieu de naissance ne sont utilisées que le temps de ce
// calcul (une invocation serverless sans état) — rien n'est journalisé ni persisté ici.
// C'est au client de les garder en localStorage s'il veut les réutiliser.
//
// Même protection "usage personnel" optionnelle que /api/reading (voir ce fichier) :
// si APP_ACCESS_CODE est définie côté serveur, l'en-tête X-App-Access-Code est requis.

const { DateTime } = require("luxon");
const Astronomy = require("astronomy-engine");

const ZODIAC_SIGNS = [
  "Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge",
  "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons",
];

const BODIES = [
  "Sun", "Moon", "Mercury", "Venus", "Mars",
  "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto",
];

const BODY_KEYS = {
  Sun: "sun", Moon: "moon", Mercury: "mercury", Venus: "venus", Mars: "mars",
  Jupiter: "jupiter", Saturn: "saturn", Uranus: "uranus", Neptune: "neptune", Pluto: "pluto",
};

function normalizeDeg(d) {
  return ((d % 360) + 360) % 360;
}

// Longitude écliptique géocentrique "de la date" (tropique, équinoxe vraie de la date) —
// référentiel standard pour un thème astral.
function eclipticLongitude(body, date) {
  if (body === "Moon") {
    return Astronomy.EclipticGeoMoon(date).lon; // Spherical: propriété "lon", pas "elon"
  }
  const vec = Astronomy.GeoVector(body, date, true); // true = corrige l'aberration (position apparente)
  return Astronomy.Ecliptic(vec).elon;
}

function zodiacFromLongitude(lon) {
  const norm = normalizeDeg(lon);
  const index = Math.floor(norm / 30);
  const degreeInSign = Math.round((norm - index * 30) * 100) / 100;
  return { sign: ZODIAC_SIGNS[index], degreeInSign };
}

// Rétrograde : la longitude diminue-t-elle sur une fenêtre d'un jour ? (marche pour
// toutes les planètes ; le Soleil et la Lune ne sont jamais rétrogrades, ça ressort
// naturellement du calcul sans cas particulier.)
function isRetrograde(body, date) {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const lon1 = eclipticLongitude(body, date);
  const lon2 = eclipticLongitude(body, new Date(date.getTime() + oneDayMs));
  let delta = normalizeDeg(lon2 - lon1);
  if (delta > 180) delta -= 360;
  return delta < 0;
}

async function geocodePlace(place) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(place)}&count=1&language=fr&format=json`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("geocoding_failed");
  const data = await r.json();
  const first = (data.results || [])[0];
  if (!first) return null;
  const parts = [first.name, first.admin1, first.country].filter(
    (p, i, arr) => p && arr.indexOf(p) === i
  );
  return {
    resolvedPlace: parts.join(", "),
    latitude: first.latitude,
    longitude: first.longitude,
    timezone: first.timezone,
  };
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

  const { date, time, place } = req.body || {};

  if (
    typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time) ||
    typeof place !== "string" || !place.trim() || place.length > 200
  ) {
    res.status(400).json({
      error: "Requête invalide : { date: \"AAAA-MM-JJ\", time: \"HH:MM\", place: string } attendu.",
    });
    return;
  }

  let geo;
  try {
    geo = await geocodePlace(place.trim());
  } catch (err) {
    console.error("Erreur /api/astral (géocodage) :", err.message);
    res.status(502).json({ error: "Impossible de contacter le service de géocodage." });
    return;
  }

  if (!geo) {
    res.status(400).json({ error: "Lieu introuvable — précise ta recherche (ex. \"Lyon, France\")." });
    return;
  }

  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);

  const local = DateTime.fromObject(
    { year, month, day, hour, minute },
    { zone: geo.timezone }
  );

  if (!local.isValid) {
    res.status(400).json({
      error: `Date ou heure de naissance invalide pour ce lieu (${local.invalidReason || "raison inconnue"}). Vérifie la date et l'heure saisies.`,
    });
    return;
  }

  // Luxon n'échoue pas silencieusement sur une heure locale qui n'a jamais existé (le
  // "trou" d'un passage à l'heure d'été, ex. 2h30 un jour où les horloges sautent de
  // 2h à 3h) : elle choisit un instant UTC plausible sans le signaler. On le détecte
  // nous-mêmes en revenant de cet instant UTC vers l'heure locale et en vérifiant
  // qu'on retombe bien sur l'heure demandée.
  const roundTrip = local.toUTC().setZone(geo.timezone);
  if (roundTrip.hour !== hour || roundTrip.minute !== minute || roundTrip.day !== day) {
    res.status(400).json({
      error: "Cette heure de naissance n'a pas existé à cet endroit ce jour-là (probablement un changement d'heure) — vérifie l'heure saisie.",
    });
    return;
  }

  const utcDate = local.toUTC().toJSDate();

  let bodies;
  try {
    bodies = {};
    for (const body of BODIES) {
      const lon = eclipticLongitude(body, utcDate);
      const { sign, degreeInSign } = zodiacFromLongitude(lon);
      bodies[BODY_KEYS[body]] = {
        longitude: Math.round(lon * 10000) / 10000,
        sign,
        degreeInSign,
        retrograde: isRetrograde(body, utcDate),
      };
    }
  } catch (err) {
    console.error("Erreur /api/astral (calcul astronomique) :", err.message);
    res.status(502).json({ error: "Impossible de calculer les positions planétaires." });
    return;
  }

  res.status(200).json({
    resolvedPlace: geo.resolvedPlace,
    latitude: geo.latitude,
    longitude: geo.longitude,
    timezone: geo.timezone,
    utcInstant: utcDate.toISOString(),
    sunSign: bodies.sun.sign,
    moonSign: bodies.moon.sign,
    bodies,
  });
};
