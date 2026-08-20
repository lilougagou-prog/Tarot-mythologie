// ============================================================================
// Mini Olympe — routeur et écrans principaux (accueil, galerie, fiche dieu)
// ============================================================================

const screenEl = document.getElementById("screen");
const titleEl = document.getElementById("pageTitle");
const backBtn = document.getElementById("backBtn");
const homeBtn = document.getElementById("homeBtn");

const GAMES_MENU = [
  {
    key: "coloriage",
    emoji: "🎨",
    title: "Coloriage",
    desc: "Colorie les emblèmes des dieux avec tes couleurs préférées.",
    color: "#e64980",
  },
  {
    key: "objets",
    emoji: "🔍",
    title: "Objets cachés",
    desc: "Retrouve les symboles et associe-les au bon dieu.",
    color: "#12b886",
  },
  {
    key: "labyrinthe",
    emoji: "🧭",
    title: "Labyrinthe",
    desc: "Aide le petit hibou à traverser le labyrinthe.",
    color: "#3b5bdb",
  },
  {
    key: "memo",
    emoji: "🧠",
    title: "Mémo",
    desc: "Retourne les cartes et retrouve les bonnes paires.",
    color: "#f59f00",
  },
];

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, "");
  const [route, param] = raw.split("/");
  return { route: route || "accueil", param };
}

function navigate(hash) {
  location.hash = hash;
}

function setHeader(title, showBack) {
  titleEl.textContent = title;
  backBtn.hidden = !showBack;
}

function router() {
  if (typeof window.__cleanupScreen === "function") {
    window.__cleanupScreen();
    window.__cleanupScreen = null;
  }
  const { route, param } = parseHash();
  window.scrollTo(0, 0);
  screenEl.innerHTML = "";
  screenEl.className = "screen screen-" + route;

  switch (route) {
    case "galerie":
      setHeader("Galerie des dieux", true);
      renderGalerie(screenEl);
      break;
    case "dieu":
      renderFiche(screenEl, param);
      break;
    case "coloriage":
      if (param) {
        const god = getGod(param);
        setHeader(god ? god.name : "Coloriage", true);
        renderColoriageGame(screenEl, param);
      } else {
        setHeader("Coloriage", true);
        renderColoriagePicker(screenEl);
      }
      break;
    case "objets":
      setHeader("Objets cachés", true);
      renderObjetsGame(screenEl);
      break;
    case "labyrinthe":
      setHeader("Labyrinthe", true);
      renderLabyrintheGame(screenEl);
      break;
    case "memo":
      setHeader("Mémo", true);
      renderMemoGame(screenEl);
      break;
    default:
      setHeader("Mini Olympe", false);
      renderHome(screenEl);
  }
}

window.addEventListener("hashchange", router);
backBtn.addEventListener("click", () => history.back());
homeBtn.addEventListener("click", () => navigate("#/accueil"));

// ---------------------------------------------------------------------------
function renderHome(container) {
  const p = loadProgress();
  const total = GODS.length;
  const found = p.discovered.length;

  const hero = document.createElement("section");
  hero.className = "hero";
  hero.innerHTML = `
    <div class="hero-emoji">⚡🏛️🦉</div>
    <h2>Bienvenue, jeune héros !</h2>
    <p>Joue, découvre les dieux de l'Olympe et deviens incollable sur la mythologie grecque.</p>
    <div class="stars-badge">⭐ ${found} / ${total} dieux découverts</div>
    <div class="progress-track"><div class="progress-fill" style="width:${(found / total) * 100}%"></div></div>
  `;
  container.appendChild(hero);

  const grid = document.createElement("section");
  grid.className = "game-grid";
  GAMES_MENU.forEach((g) => {
    const card = document.createElement("a");
    card.href = `#/${g.key}`;
    card.className = "game-card";
    card.style.setProperty("--card-color", g.color);
    card.innerHTML = `
      <div class="game-card-emoji">${g.emoji}</div>
      <div class="game-card-title">${g.title}</div>
      <div class="game-card-desc">${g.desc}</div>
    `;
    grid.appendChild(card);
  });
  container.appendChild(grid);

  const gallery = document.createElement("a");
  gallery.href = "#/galerie";
  gallery.className = "gallery-banner";
  gallery.innerHTML = `<span>📖 Galerie des dieux</span><span class="gallery-banner-sub">Découvre les fiches de tous les dieux et héros</span>`;
  container.appendChild(gallery);

  const reset = document.createElement("button");
  reset.className = "reset-link";
  reset.textContent = "Réinitialiser ma progression";
  reset.addEventListener("click", () => {
    if (confirm("Effacer toute la progression enregistrée sur cet appareil ?")) {
      resetProgress();
      router();
    }
  });
  container.appendChild(reset);
}

// ---------------------------------------------------------------------------
function renderGalerie(container) {
  const p = loadProgress();
  const grid = document.createElement("div");
  grid.className = "god-grid";
  GODS.forEach((g) => {
    const card = document.createElement("a");
    card.href = `#/dieu/${g.id}`;
    card.className = "god-card";
    card.style.setProperty("--god-color", g.color);
    const found = p.discovered.includes(g.id);
    card.innerHTML = `
      <div class="god-card-badge">${renderSymbolBadge(g.symbol)}</div>
      <div class="god-card-name">${g.name}</div>
      <div class="god-card-title">${g.title}</div>
      ${found ? '<div class="god-card-found" title="Découvert">⭐</div>' : ""}
    `;
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

// ---------------------------------------------------------------------------
function renderFiche(container, id) {
  const god = getGod(id);
  if (!god) {
    setHeader("Introuvable", true);
    container.innerHTML = `<p class="empty-msg">Ce personnage n'existe pas encore.</p>`;
    return;
  }
  setHeader(god.name, true);
  markDiscovered([god.id]);

  const idx = GODS.findIndex((g) => g.id === id);
  const prev = GODS[(idx - 1 + GODS.length) % GODS.length];
  const next = GODS[(idx + 1) % GODS.length];

  const wrap = document.createElement("section");
  wrap.className = "fiche";
  wrap.style.setProperty("--god-color", god.color);
  wrap.style.setProperty("--god-accent", god.accent);
  wrap.innerHTML = `
    <div class="fiche-badge">${renderSymbolBadge(god.symbol)}</div>
    <h2 class="fiche-name">${god.name}</h2>
    <div class="fiche-title">${god.title}</div>
    <div class="fiche-domain">✦ ${god.domain}</div>
    <p class="fiche-desc">${god.description}</p>
    <div class="fiche-symbol">Son symbole : <strong>${god.symbolName}</strong></div>
    <div class="fiche-funfact">
      <div class="fiche-funfact-label">💡 Le sais-tu ?</div>
      <div>${god.funFact}</div>
    </div>
    <div class="fiche-actions">
      <a class="btn btn-primary" href="#/coloriage/${god.id}">🎨 Colorier ${god.name}</a>
    </div>
    <div class="fiche-nav">
      <a href="#/dieu/${prev.id}" class="fiche-nav-btn">‹ ${prev.name}</a>
      <a href="#/galerie" class="fiche-nav-btn fiche-nav-mid">Galerie</a>
      <a href="#/dieu/${next.id}" class="fiche-nav-btn">${next.name} ›</a>
    </div>
  `;
  container.appendChild(wrap);
}

router();

// PWA : service worker (échoue silencieusement en local file:// ou sans support)
// Un service worker déjà installé ne revérifie pas toujours s'il existe une
// nouvelle version au simple réouverture de l'appli (surtout en PWA sur
// téléphone) : on force la vérification à chaque lancement, et dès qu'une
// nouvelle version prend la main, on recharge une fois pour l'afficher tout
// de suite plutôt que d'attendre la prochaine fermeture/réouverture.
if ("serviceWorker" in navigator) {
  // Si cette page était déjà contrôlée par un service worker au chargement,
  // un changement de contrôleur ensuite = une vraie mise à jour → on recharge.
  // Si elle n'avait PAS encore de contrôleur (tout premier chargement de
  // l'appli, rien n'était en cache), le "controllerchange" qui suit n'est
  // qu'une prise en main initiale, sans rien de nouveau à afficher : pas
  // besoin de recharger la page que l'enfant est justement en train de lire.
  const hadControllerAtLoad = !!navigator.serviceWorker.controller;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((reg) => reg.update().catch(() => {}))
      .catch(() => {});
  });

  let reloadedForUpdate = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadControllerAtLoad || reloadedForUpdate) return;
    reloadedForUpdate = true;
    window.location.reload();
  });
}
