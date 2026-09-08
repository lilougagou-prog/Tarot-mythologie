// Backend serverless (Vercel) — purge quotidienne (Cron Vercel, voir vercel.json) : retire les
// lignes de rate_limits vieilles de plus d'une heure (les adresses IP qui y servent à la
// limitation de débit ne doivent pas rester en base indéfiniment) ainsi que les sessions déjà
// expirées (voir _lib/session.js, 90 jours). Protégée par CRON_SECRET (optionnel) exactement
// comme la purge déjà en place côté app sœur Panthéon — Vercel Cron l'envoie automatiquement si
// la variable est définie.
const { sql, ensureSchema } = require("./_lib/db");

module.exports = async function handler(req, res){
  const requiredSecret = process.env.CRON_SECRET;
  if(requiredSecret){
    const auth = req.headers["authorization"];
    if(auth !== `Bearer ${requiredSecret}`){
      res.status(401).json({ error: "Non autorisé." });
      return;
    }
  }
  if(!process.env.DATABASE_URL){
    res.status(200).json({ ok: true, skipped: "DATABASE_URL non configurée." });
    return;
  }
  try{
    await ensureSchema();
    const s = sql();
    const rateLimitsCutoff = new Date(Date.now() - 60 * 60 * 1000);
    const [deletedRateLimits, deletedSessions] = await Promise.all([
      s`DELETE FROM rate_limits WHERE created_at < ${rateLimitsCutoff}`,
      s`DELETE FROM sessions WHERE expires_at < now()`,
    ]);
    res.status(200).json({ ok: true, deletedRateLimits: deletedRateLimits.length ?? deletedRateLimits.count ?? null, deletedSessions: deletedSessions.length ?? deletedSessions.count ?? null });
  } catch(err){
    console.error("Erreur /api/cleanup-rate-limits:", err);
    res.status(500).json({ error: "Purge impossible pour le moment." });
  }
};
