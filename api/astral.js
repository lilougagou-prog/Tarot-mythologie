// Backend serverless (Vercel) — calcule un profil astral (thème natal) à partir d'une
// date, heure et lieu de naissance.
//
// Reçoit en POST : { date: "YYYY-MM-DD", time: "HH:MM" | null, place: string }
//   - date/time : date et heure LOCALES de naissance (heure au lieu de naissance, pas UTC)
//     time est optionnel ("heure de naissance inconnue") : dans ce cas le calcul se fait
//     à midi local (convention standard en astrologie pour une heure inconnue), et
//     ascendant/maisons — qui exigent une heure précise — sont renvoyés à null plutôt
//     que faux ; les signes et aspects, eux, restent fiables et sont toujours renvoyés.
//   - place     : lieu en texte libre, ex. "Lyon, France"
//
// Renvoie : { resolvedPlace, latitude, longitude, timezone, utcInstant, timeUnknown,
//             sunSign, moonSign, ascendant, midheaven, houseSystem, houseCusps,
//             houseWarning, bodies, aspects }
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

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

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

/* ===================== MAISONS PLACIDUS + ASCENDANT/MC ===================== */
// Système par défaut : Placidus (le plus courant). Algorithme porté d'une implémentation
// vérifiée contre swe_houses (Swiss Ephemeris) à 0.025° près (~1.5') par la communauté
// d'astronomy-engine (github.com/cosinekitty/astronomy, discussion #391) — on réutilise
// ici les mêmes briques astronomy-engine (obliquité "de la date" + temps sidéral) plutôt
// que de redériver la trigonométrie à la main.
//
// Connu pour être peu fiable au-delà d'environ 66,5° de latitude (cercles polaires) —
// voir HOUSE_LATITUDE_WARNING_THRESHOLD ci-dessous ; on le signale au client plutôt que
// de renvoyer un résultat silencieusement dégradé.
const HOUSE_LATITUDE_WARNING_THRESHOLD = 66.5;

// Résout une cuspide Placidus par itération (8 passes suffisent largement pour une
// précision sous l'arc-minute) : on affine une "ascension droite candidate" jusqu'à ce
// qu'elle corresponde à un point de l'écliptique dont l'arc diurne/nocturne est divisé
// dans le bon rapport (1/3 ou 2/3) par le méridien local.
function solvePlacidusCusp(tanPhi, ramcRad, cosOb, sinOb, cuspRatio, isNocturnalCusp) {
  const referenceRaRad = isNocturnalCusp ? ramcRad + Math.PI : ramcRad;
  let y = Math.sin(referenceRaRad);
  let x = Math.cos(referenceRaRad) * cosOb;
  for (let i = 0; i < 8; i++) {
    let dec = (y / Math.hypot(y, x)) * sinOb; // sin(déclinaison) du point candidat courant
    dec = Math.max(-0.999999, Math.min(0.999999, dec)); // garde-fou contre l'arrondi flottant
    const raw = (dec / Math.sqrt(1 - dec * dec)) * tanPhi; // tan(déclinaison) · tan(latitude)
    const clamped = Math.max(-1, Math.min(1, raw)); // au-delà de ±66.5° de latitude, l'arc diurne/nocturne peut être plein/nul : on clampe plutôt que de planter
    const ad = Math.asin(clamped); // différence ascensionnelle
    const requiredRa = referenceRaRad + (ad + (isNocturnalCusp ? -Math.PI / 2 : Math.PI / 2)) * cuspRatio;
    y = Math.sin(requiredRa);
    x = Math.cos(requiredRa) * cosOb;
  }
  return normalizeDeg(Math.atan2(y, x) * RAD2DEG);
}

// Calcule l'Ascendant, le Milieu du Ciel (MC) et les 12 cuspides Placidus.
// `date` : instant UTC exact ; `latitude`/`longitude` : coordonnées du lieu de naissance.
function computeHouses(latitude, longitude, date) {
  const eclToEqOfDate = Astronomy.Rotation_ECT_EQD(date).rot[1]; // ligne 2 de la matrice de rotation écliptique -> équatoriale "de la date"
  const cosOb = eclToEqOfDate[1];
  const sinOb = eclToEqOfDate[2];
  const tanPhi = Math.tan(latitude * DEG2RAD);

  const gstHours = Astronomy.SiderealTime(date); // temps sidéral apparent de Greenwich, en heures
  const ramcDeg = normalizeDeg(gstHours * 15 + longitude); // ascension droite du milieu du ciel
  const ramcRad = ramcDeg * DEG2RAD;

  const houses = new Array(12).fill(0);
  houses[10] = solvePlacidusCusp(tanPhi, ramcRad, cosOb, sinOb, 1 / 3, false); // maison 11
  houses[11] = solvePlacidusCusp(tanPhi, ramcRad, cosOb, sinOb, 2 / 3, false); // maison 12
  houses[1] = solvePlacidusCusp(tanPhi, ramcRad, cosOb, sinOb, 2 / 3, true); // maison 2
  houses[2] = solvePlacidusCusp(tanPhi, ramcRad, cosOb, sinOb, 1 / 3, true); // maison 3
  houses[4] = normalizeDeg(houses[10] + 180); // maison 5, opposée à la 11
  houses[5] = normalizeDeg(houses[11] + 180); // maison 6, opposée à la 12
  houses[7] = normalizeDeg(houses[1] + 180); // maison 8, opposée à la 2
  houses[8] = normalizeDeg(houses[2] + 180); // maison 9, opposée à la 3

  const sinRamc = Math.sin(ramcRad);
  const cosRamc = Math.cos(ramcRad);
  const mc = normalizeDeg(Math.atan2(sinRamc, cosRamc * cosOb) * RAD2DEG);
  const descendant = normalizeDeg(
    Math.atan2(-cosRamc, sinRamc * cosOb + tanPhi * sinOb) * RAD2DEG
  );
  houses[0] = normalizeDeg(descendant + 180); // maison 1 = Ascendant
  houses[9] = mc; // maison 10 = Milieu du Ciel
  houses[3] = normalizeDeg(mc + 180); // maison 4 = Fond du Ciel (IC)
  houses[6] = descendant; // maison 7 = Descendant

  return { houses, ascendant: houses[0], midheaven: mc };
}

// À quelle maison (1-12) appartient une longitude écliptique donnée, sachant les 12
// cuspides (houses[i] = début de la maison i+1, dans l'ordre croissant autour du zodiaque).
function houseIndexOfLongitude(lon, houses) {
  const L = normalizeDeg(lon);
  for (let i = 0; i < 12; i++) {
    const start = houses[i];
    const end = houses[(i + 1) % 12];
    const span = normalizeDeg(end - start);
    const pos = normalizeDeg(L - start);
    if (span === 0 || pos < span) return i + 1;
  }
  return 12; // filet de sécurité (ne devrait pas être atteint)
}

/* ===================== ASPECTS ===================== */
const ASPECTS = [
  { type: "conjonction", angle: 0, orb: 8 },
  { type: "sextile", angle: 60, orb: 6 },
  { type: "carré", angle: 90, orb: 7 },
  { type: "trigone", angle: 120, orb: 8 },
  { type: "opposition", angle: 180, orb: 8 },
];

// Liste tous les aspects majeurs entre paires de corps, à partir de leurs longitudes
// écliptiques ({ clé: longitude, ... }).
function computeAspects(longitudes) {
  const keys = Object.keys(longitudes);
  const aspects = [];
  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      const a = keys[i];
      const b = keys[j];
      let diff = Math.abs(normalizeDeg(longitudes[a] - longitudes[b]));
      if (diff > 180) diff = 360 - diff;
      for (const def of ASPECTS) {
        const exactOrb = Math.abs(diff - def.angle);
        if (exactOrb <= def.orb) {
          aspects.push({
            bodies: [a, b],
            type: def.type,
            angle: def.angle,
            orb: Math.round(exactOrb * 100) / 100,
          });
          break; // un seul type d'aspect par paire (le premier qui matche, les cibles ne se chevauchent pas vu les orbes choisis)
        }
      }
    }
  }
  return aspects;
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
  const timeUnknown = time === null || time === undefined || time === "";

  if (
    typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    (!timeUnknown && (typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time))) ||
    typeof place !== "string" || !place.trim() || place.length > 200
  ) {
    res.status(400).json({
      error: "Requête invalide : { date: \"AAAA-MM-JJ\", time: \"HH:MM\" ou null, place: string } attendu.",
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
  const [hour, minute] = timeUnknown ? [12, 0] : time.split(":").map(Number);

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
  // qu'on retombe bien sur l'heure demandée. (Skippé en heure inconnue : midi est choisi
  // par nous, pas saisi par l'utilisateur — rien à valider dans ce cas.)
  if (!timeUnknown) {
    const roundTrip = local.toUTC().setZone(geo.timezone);
    if (roundTrip.hour !== hour || roundTrip.minute !== minute || roundTrip.day !== day) {
      res.status(400).json({
        error: "Cette heure de naissance n'a pas existé à cet endroit ce jour-là (probablement un changement d'heure) — vérifie l'heure saisie.",
      });
      return;
    }
  }

  const utcDate = local.toUTC().toJSDate();

  let bodies;
  let houseInfo = null;
  let aspects;
  try {
    if (!timeUnknown) {
      houseInfo = computeHouses(geo.latitude, geo.longitude, utcDate);
    }

    const rawLongitudes = {};
    bodies = {};
    for (const body of BODIES) {
      const lon = eclipticLongitude(body, utcDate);
      rawLongitudes[BODY_KEYS[body]] = lon;
      const { sign, degreeInSign } = zodiacFromLongitude(lon);
      bodies[BODY_KEYS[body]] = {
        longitude: Math.round(lon * 10000) / 10000,
        sign,
        degreeInSign,
        house: houseInfo ? houseIndexOfLongitude(lon, houseInfo.houses) : null,
        retrograde: isRetrograde(body, utcDate),
      };
    }
    aspects = computeAspects(rawLongitudes);
  } catch (err) {
    console.error("Erreur /api/astral (calcul astronomique) :", err.message);
    res.status(502).json({ error: "Impossible de calculer les positions planétaires." });
    return;
  }

  const ascendantZodiac = houseInfo ? zodiacFromLongitude(houseInfo.ascendant) : null;
  const midheavenZodiac = houseInfo ? zodiacFromLongitude(houseInfo.midheaven) : null;

  res.status(200).json({
    resolvedPlace: geo.resolvedPlace,
    latitude: geo.latitude,
    longitude: geo.longitude,
    timezone: geo.timezone,
    utcInstant: utcDate.toISOString(),
    timeUnknown,
    sunSign: bodies.sun.sign,
    moonSign: bodies.moon.sign,
    ascendant: houseInfo
      ? {
          longitude: Math.round(houseInfo.ascendant * 10000) / 10000,
          sign: ascendantZodiac.sign,
          degreeInSign: ascendantZodiac.degreeInSign,
        }
      : null,
    midheaven: houseInfo
      ? {
          longitude: Math.round(houseInfo.midheaven * 10000) / 10000,
          sign: midheavenZodiac.sign,
          degreeInSign: midheavenZodiac.degreeInSign,
        }
      : null,
    houseSystem: houseInfo ? "placidus" : null,
    houseCusps: houseInfo
      ? houseInfo.houses.map((lon, i) => ({
          house: i + 1,
          longitude: Math.round(lon * 10000) / 10000,
        }))
      : null,
    houseWarning:
      houseInfo && Math.abs(geo.latitude) >= HOUSE_LATITUDE_WARNING_THRESHOLD
        ? "Le système Placidus est peu fiable à cette latitude (proche ou au-delà des cercles polaires) — les maisons peuvent être imprécises ou dégénérées."
        : null,
    bodies,
    aspects,
  });
};
