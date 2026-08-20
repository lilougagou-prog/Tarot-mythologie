// ============================================================================
// Mini Olympe — mini-jeu Coloriage
// ============================================================================

const COL_PALETTE = [
  "#e03131", "#f76707", "#f59f00", "#ffd43b",
  "#66a80f", "#12b886", "#15aabf", "#1c7ed6",
  "#3b5bdb", "#9c36b5", "#e64980", "#a15c2a",
  "#495057", "#ffffff",
];

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

  const { svg, regionIds } = buildColoringPage(god);
  const painted = new Set();
  let selectedColor = COL_PALETTE[0];
  let celebrated = false;

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
    <div class="coloring-svg-wrap">${svg}</div>
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

  const paletteEl = wrap.querySelector(".color-palette");
  COL_PALETTE.forEach((color, i) => {
    const sw = document.createElement("button");
    sw.type = "button";
    sw.className = "color-swatch" + (i === 0 ? " selected" : "");
    sw.style.background = color;
    sw.setAttribute("aria-label", "Couleur");
    sw.addEventListener("click", () => {
      selectedColor = color;
      paletteEl.querySelectorAll(".color-swatch").forEach((s) => s.classList.remove("selected"));
      sw.classList.add("selected");
    });
    paletteEl.appendChild(sw);
  });

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
