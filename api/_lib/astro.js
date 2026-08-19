// Briques astronomiques partagées entre api/astral.js (thème natal) et api/transits.js
// (positions du jour, pour l'horoscope dynamique) — extrait ici pour ne pas dupliquer
// cette logique entre les deux endpoints. Préfixé "_lib" : par convention Vercel, un
// dossier commençant par "_" à l'intérieur de api/ n'est jamais exposé comme route.

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
// référentiel standard pour un thème astral comme pour un transit.
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

module.exports = {
  ZODIAC_SIGNS, BODIES, BODY_KEYS,
  normalizeDeg, eclipticLongitude, zodiacFromLongitude, isRetrograde,
  ASPECTS, computeAspects,
};
