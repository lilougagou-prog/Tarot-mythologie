const CACHE="delphes-v87";
const ASSETS=["./","./index.html","./styles.css","./app.js","./manifest.json","./icon.svg"];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

// Réseau d'abord, cache seulement en secours hors-ligne — inversé par rapport à avant
// (cache d'abord, réseau en repli). Retour répété "le texte n'a toujours pas changé" malgré
// plusieurs correctifs déployés : avec l'ancienne stratégie, une PWA déjà ouverte (ou
// rouverte) restait servie par LE SERVICE WORKER ENCORE ACTIF au moment de la requête, qui
// pouvait très bien être une version d'avant le dernier déploiement tant que le nouveau
// n'avait pas fini de s'installer puis de s'activer en arrière-plan (skipWaiting()/
// clients.claim() ci-dessus prennent un instant, jamais zéro) — un premier rechargement après
// un déploiement pouvait donc systématiquement retomber sur l'ancien code, quel que soit le
// contenu déjà présent dans app.js à ce moment-là. Avec le réseau d'abord, ce problème
// disparaît : tant que l'appareil est en ligne (nécessaire de toute façon pour les
// fonctionnalités IA), chaque chargement récupère directement la dernière version depuis le
// serveur, sans dépendre du cycle de vie du service worker. Le cache continue d'être tenu à
// jour avec chaque réponse reçue du réseau, pour qu'un usage hors-ligne retombe sur la
// version la plus récente déjà vue plutôt que sur le contenu figé à l'installation.
// Uniquement les requêtes GET : les appels IA (POST vers /api/*) ne doivent jamais passer par
// le cache, ils continuent d'aller directement au réseau, exactement comme avant.
self.addEventListener("fetch",event=>{
  if(event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(res=>{
        if(res && res.ok){
          const resClone = res.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request, resClone)).catch(()=>{});
        }
        return res;
      })
      .catch(()=>caches.match(event.request))
  );
});
