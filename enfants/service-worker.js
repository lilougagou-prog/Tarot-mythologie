// Changer ce numéro à CHAQUE déploiement qui touche un fichier mis en cache :
// c'est ce qui rend le service worker "différent" aux yeux du navigateur et
// déclenche la mise à jour (sinon le fetch de app.js reste servi depuis
// l'ancien cache indéfiniment, même après un nouveau déploiement).
const CACHE = "mini-olympe-v6";
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
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
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
