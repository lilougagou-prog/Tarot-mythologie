// Changer ce numéro à CHAQUE déploiement qui touche un fichier mis en cache :
// c'est ce qui rend le service worker "différent" aux yeux du navigateur et
// déclenche la mise à jour (sinon le fetch de app.js reste servi depuis
// l'ancien cache indéfiniment, même après un nouveau déploiement).
const CACHE = "mini-olympe-v16";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./icons.js",
  "./progress.js",
  "./game-coloriage.js",
  "./game-objets.js",
  "./game-labyrinthe.js",
  "./game-memo.js",
  "./game-attributs.js",
  "./app.js",
  "./manifest.json",
  "./icon.svg",
  "./assets/coloriage/zeus.png",
  "./assets/coloriage/hera.png",
  "./assets/coloriage/athena.png",
  "./assets/coloriage/apollon.png",
  "./assets/coloriage/artemis.png",
  "./assets/coloriage/aphrodite.png",
  "./assets/coloriage/demeter.png",
  "./assets/coloriage/dionysos.png",
  "./assets/coloriage/hephaistos.png",
  "./assets/coloriage/hestia.png",
  "./assets/coloriage/poseidon.png",
  "./assets/coloriage/hades.png",
  "./assets/objets/jardin.jpg",
  "./assets/objets/etagere.jpg",
  "./assets/memo/zeus.jpg",
  "./assets/memo/hera.jpg",
  "./assets/memo/poseidon.jpg",
  "./assets/memo/athena.jpg",
  "./assets/memo/apollon.jpg",
  "./assets/memo/artemis.jpg",
  "./assets/memo/ares.jpg",
  "./assets/memo/aphrodite.jpg",
  "./assets/memo/hermes.jpg",
  "./assets/memo/dionysos.jpg",
  "./assets/memo/hestia.jpg",
  "./assets/memo/demeter.jpg",
  "./assets/memo/zeus-attr.jpg",
  "./assets/memo/hera-attr.jpg",
  "./assets/memo/poseidon-attr.jpg",
  "./assets/memo/athena-attr.jpg",
  "./assets/memo/apollon-attr.jpg",
  "./assets/memo/artemis-attr.jpg",
  "./assets/memo/ares-attr.jpg",
  "./assets/memo/aphrodite-attr.jpg",
  "./assets/memo/hermes-attr.jpg",
  "./assets/memo/dionysos-attr.jpg",
  "./assets/memo/hestia-attr.jpg",
  "./assets/memo/demeter-attr.jpg",
  "./assets/memo/hades.jpg",
  "./assets/memo/persephone.jpg",
  "./assets/memo/heracles.jpg",
  "./assets/memo/pan.jpg",
  "./assets/memo/hephaistos.jpg",
  "./assets/memo/hades-attr.jpg",
  "./assets/memo/persephone-attr.jpg",
  "./assets/memo/heracles-attr.jpg",
  "./assets/memo/pan-attr.jpg",
  "./assets/memo/hephaistos-attr.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        // cache.addAll() fait un fetch() classique par fichier, qui peut
        // repêcher une réponse encore "fraîche" dans le cache HTTP du
        // navigateur (GitHub Pages envoie Cache-Control: max-age=600) —
        // donc mettre en cache du contenu déjà périmé malgré un nouveau
        // service worker. { cache: "reload" } force un vrai aller-retour
        // réseau pour chaque fichier, sans jamais passer par le cache HTTP.
        Promise.all(
          ASSETS.map((url) =>
            fetch(url, { cache: "reload" }).then((res) => cache.put(url, res))
          )
        )
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
