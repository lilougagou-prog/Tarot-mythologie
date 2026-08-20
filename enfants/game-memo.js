// ============================================================================
// Mini Olympe — mini-jeu Mémo (paires dieu ↔ symbole)
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
    <p class="screen-intro">Retourne deux cartes : trouve le dieu et son symbole !</p>
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

  function startGame() {
    winEl.hidden = true;
    flipped = [];
    lock = false;
    matchedPairs = 0;

    const gods = shuffleArray(GODS).slice(0, level.pairs);
    let deck = [];
    gods.forEach((g) => {
      deck.push({ godId: g.id, type: "god", matched: false });
      deck.push({ godId: g.id, type: "symbol", matched: false });
    });
    cards = shuffleArray(deck);

    gridEl.className = "memo-grid memo-grid-" + level.pairs;
    gridEl.innerHTML = "";
    cards.forEach((card) => {
      const god = getGod(card.godId);
      const el = document.createElement("button");
      el.type = "button";
      el.className = "memo-card";
      el.style.setProperty("--god-color", god.color);
      const portrait = PORTRAIT_IMAGES[god.id];
      const face =
        card.type === "god"
          ? portrait
            ? `<div class="memo-face memo-face-portrait"><img src="${portrait}" alt="${god.name}"><span>${god.name}</span></div>`
            : `<div class="memo-face memo-face-god">${god.name}</div>`
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
  }

  function onCardClick(card) {
    if (lock || card.matched || card.el.classList.contains("flipped")) return;
    card.el.classList.add("flipped");
    flipped.push(card);
    if (flipped.length === 2) {
      lock = true;
      const [a, b] = flipped;
      if (a.godId === b.godId && a.type !== b.type) {
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
