// ============================================================================
// Mini Olympe — mini-jeu Coloriage
// Deux moteurs cohabitent :
//  - un dessin illustré (PNG trait noir) + remplissage façon "pot de peinture"
//    (flood fill sur canvas), pour les dieux listés dans COLORING_IMAGES ;
//  - à défaut, l'emblème vectoriel généré en JS (icons.js) avec ses régions
//    déjà découpées.
// Ajouter une illustration : déposer le PNG dans assets/coloriage/ et ajouter
// une entrée dans COLORING_IMAGES ci-dessous. Rien d'autre à changer.
// ============================================================================

const COL_PALETTE = [
  "#e03131", "#f76707", "#f59f00", "#ffd43b",
  "#66a80f", "#12b886", "#15aabf", "#1c7ed6",
  "#3b5bdb", "#9c36b5", "#e64980", "#a15c2a",
  "#495057", "#ffffff",
];

const COLORING_IMAGES = {
  zeus: "assets/coloriage/zeus.png",
  hera: "assets/coloriage/hera.png",
  athena: "assets/coloriage/athena.png",
  apollon: "assets/coloriage/apollon.png",
  artemis: "assets/coloriage/artemis.png",
  aphrodite: "assets/coloriage/aphrodite.png",
  demeter: "assets/coloriage/demeter.png",
  dionysos: "assets/coloriage/dionysos.png",
  hephaistos: "assets/coloriage/hephaistos.png",
  hestia: "assets/coloriage/hestia.png",
};

// résolution de travail max du canvas (largeur, en px) : suffisant pour un
// dessin net à l'écran, tout en gardant le remplissage rapide sur mobile.
const COL_CANVAS_MAX_WIDTH = 800;
// luminosité (0-255) en dessous de laquelle un pixel est considéré comme un
// trait noir (frontière), et non comme une zone à colorier. Assez strict
// pour ne jamais laisser le remplissage déborder au travers d'un trait fin,
// même antialiasé (testé sur toutes les illustrations : marge blanche fine
// mais nette autour de chaque trait plutôt qu'un débordement).
const COL_LINE_THRESHOLD = 246;

function col_hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function renderColoriagePicker(container) {
  const p = loadProgress();
  const intro = document.createElement("p");
  intro.className = "screen-intro";
  intro.textContent = "Choisis un dieu ou un héros à colorier !";
  container.appendChild(intro);

  const grid = document.createElement("div");
  grid.className = "god-grid";
  GODS.forEach((g) => {
    const done = p.coloriage.includes(g.id);
    const card = document.createElement("a");
    card.href = `#/coloriage/${g.id}`;
    card.className = "god-card";
    card.style.setProperty("--god-color", g.color);
    card.innerHTML = `
      <div class="god-card-badge">${renderSymbolBadge(g.symbol)}</div>
      <div class="god-card-name">${g.name}</div>
      <div class="god-card-title">${g.title}</div>
      ${done ? '<div class="god-card-found" title="Colorié">🎨</div>' : ""}
    `;
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

function renderColoriageGame(container, godId) {
  const god = getGod(godId);
  if (!god) {
    container.innerHTML = `<p class="empty-msg">Ce personnage n'existe pas encore.</p>`;
    return;
  }
  if (COLORING_IMAGES[god.id]) {
    renderColoriageImageGame(container, god);
  } else {
    renderColoriageEmblemGame(container, god);
  }
}

// --- coquille commune : entête + emplacement du dessin + palette ----------
function col_buildShell(container, god, contentHtml) {
  const wrap = document.createElement("section");
  wrap.className = "coloriage-screen";
  wrap.innerHTML = `
    <div class="coloriage-heading">
      <div>${renderSymbolBadge(god.symbol, "coloriage-mini-badge")}</div>
      <div>
        <div class="coloriage-name">${god.name}</div>
        <div class="coloriage-sub">${god.symbolName}</div>
      </div>
    </div>
    ${contentHtml}
    <div class="coloriage-toolbar">
      <div class="color-palette" role="listbox" aria-label="Couleurs"></div>
      <div class="coloriage-buttons">
        <button type="button" class="btn btn-ghost" id="col-clear">↺ Effacer</button>
      </div>
    </div>
    <div class="coloriage-done-msg" id="col-done" hidden>
      🎉 Bravo, tu as colorié ${god.name} ! 🎉
    </div>
  `;
  container.appendChild(wrap);
  return wrap;
}

function col_buildPalette(wrap, onSelect) {
  const paletteEl = wrap.querySelector(".color-palette");
  COL_PALETTE.forEach((color, i) => {
    const sw = document.createElement("button");
    sw.type = "button";
    sw.className = "color-swatch" + (i === 0 ? " selected" : "");
    sw.style.background = color;
    sw.setAttribute("aria-label", "Couleur");
    sw.addEventListener("click", () => {
      paletteEl.querySelectorAll(".color-swatch").forEach((s) => s.classList.remove("selected"));
      sw.classList.add("selected");
      onSelect(color);
    });
    paletteEl.appendChild(sw);
  });
  return COL_PALETTE[0];
}

// --- moteur 1 : emblème vectoriel, régions déjà découpées (icons.js) ------
function renderColoriageEmblemGame(container, god) {
  const { svg, regionIds } = buildColoringPage(god);
  const painted = new Set();
  let selectedColor = COL_PALETTE[0];
  let celebrated = false;

  const wrap = col_buildShell(container, god, `<div class="coloring-svg-wrap">${svg}</div>`);
  selectedColor = col_buildPalette(wrap, (c) => (selectedColor = c));

  const svgEl = wrap.querySelector(".coloring-svg");
  svgEl.addEventListener("click", (ev) => {
    const region = ev.target.closest("[data-region]");
    if (!region) return;
    region.style.fill = selectedColor;
    painted.add(region.getAttribute("data-region"));
    checkComplete();
  });

  wrap.querySelector("#col-clear").addEventListener("click", () => {
    svgEl.querySelectorAll("[data-region]").forEach((r) => (r.style.fill = ""));
    painted.clear();
    celebrated = false;
    wrap.querySelector("#col-done").hidden = true;
  });

  function checkComplete() {
    if (celebrated || painted.size < regionIds.length) return;
    celebrated = true;
    markColored(god.id);
    confettiBurst();
    wrap.querySelector("#col-done").hidden = false;
  }
}

// --- moteur 2 : illustration PNG + remplissage "pot de peinture" ----------
function renderColoriageImageGame(container, god) {
  let selectedColor = COL_PALETTE[0];
  let celebrated = false;
  let ctx, width, height, fillableMask, everFilled, originalData, currentData;
  let totalFillable = 0;
  let coloredCount = 0;

  const wrap = col_buildShell(
    container,
    god,
    `<div class="coloring-svg-wrap coloring-canvas-wrap">
      <p class="coloring-loading" id="col-loading">Chargement du dessin…</p>
      <canvas class="coloring-canvas" id="col-canvas" hidden></canvas>
    </div>`
  );
  selectedColor = col_buildPalette(wrap, (c) => (selectedColor = c));

  const canvas = wrap.querySelector("#col-canvas");
  const loadingEl = wrap.querySelector("#col-loading");
  const doneEl = wrap.querySelector("#col-done");

  const img = new Image();
  img.onload = () => {
    const scale = Math.min(1, COL_CANVAS_MAX_WIDTH / img.naturalWidth);
    width = Math.round(img.naturalWidth * scale);
    height = Math.round(img.naturalHeight * scale);
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, width, height);

    originalData = ctx.getImageData(0, 0, width, height);
    currentData = ctx.createImageData(width, height);
    currentData.data.set(originalData.data);

    everFilled = new Uint8Array(width * height);

    fillableMask = new Uint8Array(width * height);
    totalFillable = 0;
    for (let i = 0; i < width * height; i++) {
      const o = i * 4;
      const luma =
        originalData.data[o] * 0.299 + originalData.data[o + 1] * 0.587 + originalData.data[o + 2] * 0.114;
      if (luma > COL_LINE_THRESHOLD) {
        fillableMask[i] = 1;
        totalFillable++;
      }
    }
    loadingEl.hidden = true;
    canvas.hidden = false;
  };
  img.onerror = () => {
    loadingEl.textContent = "Impossible de charger le dessin. Réessaie plus tard.";
  };
  img.src = COLORING_IMAGES[god.id];

  function floodFill(startX, startY) {
    const startIdx = startY * width + startX;
    if (!fillableMask[startIdx]) return; // clic sur un trait : rien à faire

    const [r, g, b] = col_hexToRgb(selectedColor);
    const visited = new Uint8Array(width * height);
    const stack = [startIdx];
    visited[startIdx] = 1;
    let newlyFilled = 0;

    const tryPush = (n) => {
      if (!visited[n] && fillableMask[n]) {
        visited[n] = 1;
        stack.push(n);
      }
    };

    while (stack.length) {
      const idx = stack.pop();
      const x = idx % width;
      const y = (idx / width) | 0;
      const o = idx * 4;
      currentData.data[o] = r;
      currentData.data[o + 1] = g;
      currentData.data[o + 2] = b;
      currentData.data[o + 3] = 255;
      if (!everFilled[idx]) {
        everFilled[idx] = 1;
        newlyFilled++;
      }
      if (x > 0) tryPush(idx - 1);
      if (x < width - 1) tryPush(idx + 1);
      if (y > 0) tryPush(idx - width);
      if (y < height - 1) tryPush(idx + width);
    }

    ctx.putImageData(currentData, 0, 0);
    coloredCount += newlyFilled;
    checkComplete();
  }

  // Peindre au doigt/souris : un simple clic remplit une zone, mais glisser
  // (comme un pinceau) remplit d'affilée toutes les petites zones traversées
  // — bien plus rapide sur les dessins avec beaucoup de petits détails (plis,
  // mèches...) qu'un tapotement zone par zone.
  let dragging = false;
  let lastX = -1;
  let lastY = -1;

  const pixelFromEvent = (ev) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(((ev.clientX - rect.left) / rect.width) * width),
      y: Math.floor(((ev.clientY - rect.top) / rect.height) * height),
    };
  };

  canvas.addEventListener("pointerdown", (ev) => {
    if (!ctx) return;
    dragging = true;
    canvas.setPointerCapture(ev.pointerId);
    const { x, y } = pixelFromEvent(ev);
    lastX = x;
    lastY = y;
    if (x >= 0 && x < width && y >= 0 && y < height) floodFill(x, y);
  });
  canvas.addEventListener("pointermove", (ev) => {
    if (!dragging || !ctx) return;
    const { x, y } = pixelFromEvent(ev);
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    if (Math.abs(x - lastX) < 5 && Math.abs(y - lastY) < 5) return;
    lastX = x;
    lastY = y;
    floodFill(x, y);
  });
  const stopDragging = () => (dragging = false);
  canvas.addEventListener("pointerup", stopDragging);
  canvas.addEventListener("pointerleave", stopDragging);
  canvas.addEventListener("pointercancel", stopDragging);

  wrap.querySelector("#col-clear").addEventListener("click", () => {
    if (!ctx) return;
    currentData.data.set(originalData.data);
    ctx.putImageData(currentData, 0, 0);
    everFilled.fill(0);
    coloredCount = 0;
    celebrated = false;
    doneEl.hidden = true;
  });

  function checkComplete() {
    if (celebrated || !totalFillable) return;
    // Seuil volontairement pas trop strict : certains dessins ont beaucoup
    // de tout petits détails (mèches, plis) qu'un enfant ne coloriera pas
    // forcément un par un, et ce n'est pas grave.
    if (coloredCount / totalFillable < 0.7) return;
    celebrated = true;
    markColored(god.id);
    confettiBurst();
    doneEl.hidden = false;
  }
}
