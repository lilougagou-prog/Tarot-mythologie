const CACHE = "mini-olympe-v2";
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
