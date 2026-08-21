// ============================================================================
// Mini Olympe — mini-jeu Mémo (retrouver les deux cartes identiques)
// ============================================================================

const MEMO_LEVELS = [
  { key: "6", label: "6 paires", pairs: 6 },
  { key: "8", label: "8 paires", pairs: 8 },
];

function renderMemoGame(container) {
  let level = MEMO_LEVELS[0];
  let cards = [];
  let flipped = [];
  let lock = false;
  let matchedPairs = 0;

  const wrap = document.createElement("section");
  wrap.className = "memo-screen";
  wrap.innerHTML = `
    <p class="screen-intro">Retourne deux cartes : retrouve les deux portraits identiques !</p>
    <div class="maze-levels" id="memo-levels"></div>
    <div class="memo-grid" id="memo-grid"></div>
    <div class="memo-win" id="memo-win" hidden></div>
  `;
  container.appendChild(wrap);

  const levelsEl = wrap.querySelector("#memo-levels");
  MEMO_LEVELS.forEach((lv) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "level-btn" + (lv.key === level.key ? " selected" : "");
    btn.textContent = lv.label;
    btn.addEventListener("click", () => {
      level = lv;
      levelsEl.querySelectorAll(".level-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      startGame();
    });
    levelsEl.appendChild(btn);
  });

  const gridEl = wrap.querySelector("#memo-grid");
  const winEl = wrap.querySelector("#memo-win");

  // La hauteur des cartes est fixée en pixels via une variable CSS, calculée
  // à partir de la largeur réellement disponible pour une carte (ratio 3/4).
  // Ni aspect-ratio ni le "padding-bottom hack" ne se sont montrés fiables
  // dans une grille CSS sur mobile : on mesure donc directement, ce qui
  // garantit que toutes les cartes (retournées ou non) ont la même taille.
  const MEMO_GRID_GAP = 10; // doit rester synchro avec .memo-grid { gap: ... } en CSS

  // Calculée à partir de la largeur du CONTENEUR (gridEl), pas d'une carte
  // existante : ça permet de poser la variable AVANT même de construire les
  // cartes (voir startGame), pour qu'aucune carte ne s'affiche jamais, ne
  // serait-ce qu'une image, à une taille provisoire (repli 120px) avant
  // d'être retaillée. Un tel repli transitoire semble pouvoir se figer dans
  // le calque graphique d'une carte déjà retournée en 3D (perspective +
  // preserve-3d), laissant une bande vide même une fois la bonne taille
  // appliquée en layout — d'où le correctif.
  function computeCardHeight(cols) {
    const gridW = gridEl.getBoundingClientRect().width;
    if (gridW <= 0) return null;
    const cardW = (gridW - MEMO_GRID_GAP * (cols - 1)) / cols;
    return (cardW * 4) / 3;
  }

  function syncCardHeights() {
    const cols = gridEl.classList.contains("memo-grid-8") ? 4 : 3;
    const h = computeCardHeight(cols);
    if (h) gridEl.style.setProperty("--memo-card-h", h + "px");
  }

  let resizeScheduled = false;
  function onResize() {
    if (resizeScheduled) return;
    resizeScheduled = true;
    requestAnimationFrame(() => {
      resizeScheduled = false;
      syncCardHeights();
    });
  }
  window.addEventListener("resize", onResize);
  window.__cleanupScreen = () => window.removeEventListener("resize", onResize);

  function startGame() {
    winEl.hidden = true;
    flipped = [];
    lock = false;
    matchedPairs = 0;

    const gods = shuffleArray(GODS).slice(0, level.pairs);
    let deck = [];
    gods.forEach((g) => {
      deck.push({ godId: g.id, matched: false });
      deck.push({ godId: g.id, matched: false });
    });
    cards = shuffleArray(deck);

    gridEl.className = "memo-grid memo-grid-" + level.pairs;
    // Poser la hauteur AVANT d'insérer la moindre carte (voir commentaire
    // sur computeCardHeight) : la classe memo-grid-N ci-dessus doit déjà
    // être appliquée, car elle change le nombre de colonnes utilisé pour
    // le calcul.
    const h = computeCardHeight(level.pairs === 8 ? 4 : 3);
    if (h) gridEl.style.setProperty("--memo-card-h", h + "px");
    gridEl.innerHTML = "";
    cards.forEach((card) => {
      const god = getGod(card.godId);
      const el = document.createElement("button");
      el.type = "button";
      el.className = "memo-card";
      el.style.setProperty("--god-color", god.color);
      const portrait = PORTRAIT_IMAGES[god.id];
      // Image posée en fond CSS (background-image + background-size:cover)
      // plutôt qu'en balise <img> : une <img> a son propre mécanisme de
      // taille intrinsèque, source d'ennuis par le passé (voir styles.css).
      // Un fond CSS se contente de remplir la boîte de son élément, déjà
      // correctement calculée.
      const face = portrait
        ? `<div class="memo-face memo-face-portrait" style="background-image:url('${portrait}')" role="img" aria-label=""></div>`
        : `<div class="memo-face memo-face-symbol">${renderSymbolBadge(god.symbol)}</div>`;
      el.innerHTML = `
        <div class="memo-card-inner">
          <div class="memo-card-back">❓</div>
          ${face}
        </div>
      `;
      card.el = el;
      el.addEventListener("click", () => onCardClick(card));
      gridEl.appendChild(el);
    });
    requestAnimationFrame(syncCardHeights);
  }

  function onCardClick(card) {
    if (lock || card.matched || card.el.classList.contains("flipped")) return;
    card.el.classList.add("flipped");
    flipped.push(card);
    if (flipped.length === 2) {
      lock = true;
      const [a, b] = flipped;
      if (a.godId === b.godId) {
        a.matched = true;
        b.matched = true;
        matchedPairs++;
        setTimeout(() => {
          a.el.classList.add("matched");
          b.el.classList.add("matched");
          flipped = [];
          lock = false;
          checkWin();
        }, 350);
      } else {
        setTimeout(() => {
          a.el.classList.remove("flipped");
          b.el.classList.remove("flipped");
          flipped = [];
          lock = false;
        }, 850);
      }
    }
  }

  function checkWin() {
    if (matchedPairs < level.pairs) return;
    const godIds = [...new Set(cards.map((c) => c.godId))];
    incGameCount("memo", godIds);
    confettiBurst();
    winEl.hidden = false;
    winEl.innerHTML = `
      <p>🎉 Bravo, toutes les paires sont trouvées ! 🎉</p>
      <button type="button" class="btn btn-primary" id="memo-again">🔁 Rejouer</button>
    `;
    winEl.querySelector("#memo-again").addEventListener("click", startGame);
  }

  startGame();
}
