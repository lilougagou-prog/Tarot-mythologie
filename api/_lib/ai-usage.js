// Compteur d'appels IA — retour direct d'utilisatrice : "je veux pouvoir savoir combien
// d'appels IA ont été faits" (chaque appel IA est facturé par Anthropic, ça sert à suivre
// l'usage/le coût sans avoir à ouvrir la console Anthropic).
//
// Un appel IA = une lecture de tarot, un portrait, un thème astral en texte, l'interprétation
// d'un rêve, une rétrospective, le rituel du jour ou un texte de comparaison — voir KINDS
// ci-dessous. Le calcul du thème astral lui-même (api/astral.js) et les transits du jour
// (api/transits.js) ne comptent PAS : ce sont de purs calculs astronomiques, sans appel IA,
// donc sans coût.
//
// Stockage agrégé par jour et par type (table ai_usage_daily, clé (day, kind)), jamais une
// ligne par appel : le total ne grossit jamais avec le nombre d'appels, seulement avec le
// nombre de jours écoulés × le nombre de types (7 aujourd'hui). Aucune donnée personnelle —
// ni qui a appelé, ni le contenu de l'appel, juste un jour et un compteur.
const { sql, ensureSchema } = require("./db");

const KINDS = {
  reading: "Lecture de tarot",
  "astral-text": "Thème astral (textes)",
  portrait: "Portrait de personnalité",
  dream: "Interprétation de rêve",
  retrospective: "Rétrospective annuelle",
  ritual: "Rituel du jour",
  "comparison-text": "Texte de comparaison",
};

// Ne doit jamais faire échouer l'appel IA qu'elle mesure : une erreur ici est seulement
// journalisée côté serveur, jamais remontée à l'appelant (le compteur est secondaire, la
// lecture/le portrait/etc. déjà généré(e) et payé(e) ne doit jamais être perdu(e) pour ça).
async function logAiCall(kind){
  try{
    await ensureSchema();
    const s = sql();
    await s`INSERT INTO ai_usage_daily (day, kind, count) VALUES (CURRENT_DATE, ${kind}, 1)
      ON CONFLICT (day, kind) DO UPDATE SET count = ai_usage_daily.count + 1`;
  } catch(err){
    console.error(`Erreur journalisation appel IA (${kind}):`, err);
  }
}

async function getAiUsageStats(){
  await ensureSchema();
  const s = sql();
  const [totalRows, byKindRows, dailyRows] = await Promise.all([
    s`SELECT coalesce(sum(count), 0)::int AS total FROM ai_usage_daily`,
    s`SELECT kind, coalesce(sum(count), 0)::int AS total FROM ai_usage_daily GROUP BY kind ORDER BY total DESC`,
    s`SELECT day::text AS day, kind, count FROM ai_usage_daily WHERE day > CURRENT_DATE - INTERVAL '30 days' ORDER BY day DESC, kind ASC`,
  ]);
  return {
    total: totalRows[0].total,
    byKind: byKindRows.map(r => ({ kind: r.kind, label: KINDS[r.kind] || r.kind, total: r.total })),
    last30Days: dailyRows.map(r => ({ day: r.day, kind: r.kind, label: KINDS[r.kind] || r.kind, count: r.count })),
  };
}

module.exports = { logAiCall, getAiUsageStats, KINDS };
