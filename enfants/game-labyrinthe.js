// ============================================================================
// Mini Olympe — mini-jeu Labyrinthe (généré aléatoirement)
// ============================================================================

const MAZE_LEVELS = [
  { key: "facile", label: "Facile", size: 7 },
  { key: "moyen", label: "Moyen", size: 9 },
  { key: "difficile", label: "Difficile", size: 11 },
];

// petits objets purement décoratifs semés sur le chemin (aucun effet de jeu)
const MAZE_DECOR = ["🏺", "🛡️", "📜", "🌿", "🏛️"];

// Astérion, le petit Minotaure : mascotte du labyrinthe, dessinée mignonne et
// souriante à dessein (grands yeux, cornes toutes rondes) — pas question de
// faire peur ! C'est aussi son vrai nom dans la mythologie.
const MINOTAUR_SVG = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <ellipse cx="18" cy="48" rx="9" ry="13" fill="#a15c2a"/>
  <ellipse cx="82" cy="48" rx="9" ry="13" fill="#a15c2a"/>
  <path d="M24 28 Q10 14 18 2 Q26 14 30 26 Z" fill="#f1e3c8"/>
  <path d="M76 28 Q90 14 82 2 Q74 14 70 26 Z" fill="#f1e3c8"/>
  <circle cx="50" cy="54" r="33" fill="#c68642"/>
  <ellipse cx="50" cy="70" rx="19" ry="13" fill="#e8b382"/>
  <circle cx="44" cy="71" r="2.4" fill="#5c3a1e"/>
  <circle cx="56" cy="71" r="2.4" fill="#5c3a1e"/>
  <circle cx="37" cy="47" r="8" fill="#fff"/>
  <circle cx="63" cy="47" r="8" fill="#fff"/>
  <circle cx="38" cy="48" r="4" fill="#3a2313"/>
  <circle cx="64" cy="48" r="4" fill="#3a2313"/>
  <path d="M41 77 Q50 83 59 77" stroke="#5c3a1e" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`;

function maze_generate(cols, rows) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) row.push({ N: true, E: true, S: true, W: true, visited: false });
    cells.push(row);
  }
  const dirs = [
    { dc: 0, dr: -1, self: "N", opp: "S" },
    { dc: 1, dr: 0, self: "E", opp: "W" },
    { dc: 0, dr: 1, self: "S", opp: "N" },
    { dc: -1, dr: 0, self: "W", opp: "E" },
  ];
  const stack = [{ c: 0, r: 0 }];
  cells[0][0].visited = true;
  while (stack.length) {
    const cur = stack[stack.length - 1];
    const options = [];
    dirs.forEach((d) => {
      const nc = cur.c + d.dc;
      const nr = cur.r + d.dr;
      if (nc >= 0 && nc < cols && nr >= 0 && nr < rows && !cells[nr][nc].visited) {
        options.push({ nc, nr, d });
      }
    });
    if (options.length === 0) {
      stack.pop();
      continue;
    }
    const pick = options[Math.floor(Math.random() * options.length)];
    cells[cur.r][cur.c][pick.d.self] = false;
    cells[pick.nr][pick.nc][pick.d.opp] = false;
    cells[pick.nr][pick.nc].visited = true;
    stack.push({ c: pick.nc, r: pick.nr });
  }
  return cells;
}

function renderLabyrintheGame(container) {
  let level = MAZE_LEVELS[0];
  let cells, cols, rows, cellPx, playerC, playerR, goalGod, won;

  const wrap = document.createElement("section");
  wrap.className = "maze-screen";
  wrap.innerHTML = `
    <p class="screen-intro maze-banner">Aide Astérion, le gentil Minotaure, à sortir de son labyrinthe pour retrouver un dieu !</p>
    <p class="screen-subintro">💡 Le sais-tu ? Dans la mythologie, le Minotaure s'appelle en réalité Astérion.</p>
    <div class="maze-levels" id="maze-levels"></div>
    <div class="maze-frame"><div class="maze-wrap"><div class="maze-grid" id="maze-grid"></div></div></div>
    <div class="dpad" id="maze-dpad">
      <button type="button" class="dpad-btn dpad-up" data-dir="up" aria-label="Haut">▲</button>
      <button type="button" class="dpad-btn dpad-left" data-dir="left" aria-label="Gauche">◀</button>
      <button type="button" class="dpad-btn dpad-right" data-dir="right" aria-label="Droite">▶</button>
      <button type="button" class="dpad-btn dpad-down" data-dir="down" aria-label="Bas">▼</button>
    </div>
    <div class="maze-win" id="maze-win" hidden></div>
  `;
  container.appendChild(wrap);

  const levelsEl = wrap.querySelector("#maze-levels");
  MAZE_LEVELS.forEach((lv) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "level-btn" + (lv.key === level.key ? " selected" : "");
    btn.textContent = lv.label;
    btn.addEventListener("click", () => {
      level = lv;
      levelsEl.querySelectorAll(".level-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      startMaze();
    });
    levelsEl.appendChild(btn);
  });

  const gridEl = wrap.querySelector("#maze-grid");
  const winEl = wrap.querySelector("#maze-win");

  function startMaze() {
    winEl.hidden = true;
    won = false;
    cols = level.size;
    rows = level.size;
    cells = maze_generate(cols, rows);
    playerC = 0;
    playerR = 0;
    goalGod = randomGods(1)[0];
    cellPx = Math.max(24, Math.floor(Math.min(46, (Math.min(window.innerWidth, 520) - 56) / cols)));

    gridEl.style.gridTemplateColumns = `repeat(${cols}, ${cellPx}px)`;
    gridEl.style.gridTemplateRows = `repeat(${rows}, ${cellPx}px)`;
    gridEl.innerHTML = "";

    const wallColor = "#8a6a3d";
    const openCells = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = cells[r][c];
        const div = document.createElement("div");
        div.className = "maze-cell";
        div.style.borderTop = cell.N ? `3px solid ${wallColor}` : "3px solid transparent";
        div.style.borderRight = cell.E ? `3px solid ${wallColor}` : "3px solid transparent";
        div.style.borderBottom = cell.S ? `3px solid ${wallColor}` : "3px solid transparent";
        div.style.borderLeft = cell.W ? `3px solid ${wallColor}` : "3px solid transparent";
        const isStart = r === 0 && c === 0;
        const isGoal = r === rows - 1 && c === cols - 1;
        if (isGoal) {
          div.classList.add("maze-goal");
          div.innerHTML = renderSymbolBadge(goalGod.symbol);
          div.style.setProperty("--god-color", goalGod.color);
        } else if (!isStart) {
          openCells.push({ r, c });
        }
        gridEl.appendChild(div);
      }
    }

    // quelques objets grecs semés sur le chemin, juste pour le décor
    const decorCount = Math.min(MAZE_DECOR.length, Math.floor((cols * rows) / 16));
    shuffleArray(openCells)
      .slice(0, decorCount)
      .forEach((cell, i) => {
        const deco = document.createElement("div");
        deco.className = "maze-decor";
        deco.style.left = cell.c * cellPx + "px";
        deco.style.top = cell.r * cellPx + "px";
        deco.style.width = cellPx + "px";
        deco.style.height = cellPx + "px";
        deco.style.fontSize = cellPx * 0.55 + "px";
        deco.textContent = MAZE_DECOR[i % MAZE_DECOR.length];
        gridEl.appendChild(deco);
      });

    let player = gridEl.querySelector(".maze-player");
    if (!player) {
      player = document.createElement("div");
      player.className = "maze-player";
      player.innerHTML = MINOTAUR_SVG;
    }
    gridEl.appendChild(player);
    positionPlayer(player);
  }

  function positionPlayer(player) {
    player.style.width = cellPx * 0.78 + "px";
    player.style.height = cellPx * 0.78 + "px";
    player.style.left = playerC * cellPx + cellPx * 0.11 + "px";
    player.style.top = playerR * cellPx + cellPx * 0.11 + "px";
  }

  function tryMove(dc, dr) {
    if (won) return;
    const cell = cells[playerR][playerC];
    if (dc === 1 && cell.E) return;
    if (dc === -1 && cell.W) return;
    if (dr === 1 && cell.S) return;
    if (dr === -1 && cell.N) return;
    playerC += dc;
    playerR += dr;
    const player = gridEl.querySelector(".maze-player");
    positionPlayer(player);
    if (playerC === cols - 1 && playerR === rows - 1) {
      won = true;
      incGameCount("labyrinthe", [goalGod.id]);
      confettiBurst();
      winEl.hidden = false;
      winEl.innerHTML = `
        <div class="maze-win-card" style="--god-color:${goalGod.color}">
          <div class="maze-win-badge">${renderSymbolBadge(goalGod.symbol)}</div>
          <div>
            <div class="maze-win-title">🎉 Bravo ! Astérion a retrouvé ${goalGod.name} !</div>
            <div class="maze-win-desc">${goalGod.description}</div>
          </div>
        </div>
        <div class="fiche-actions">
          <a class="btn btn-primary" href="#/dieu/${goalGod.id}">📖 Voir la fiche de ${goalGod.name}</a>
          <button type="button" class="btn btn-ghost" id="maze-again">🔁 Nouveau labyrinthe</button>
        </div>
      `;
      winEl.querySelector("#maze-again").addEventListener("click", startMaze);
    }
  }

  wrap.querySelector("#maze-dpad").addEventListener("click", (ev) => {
    const btn = ev.target.closest(".dpad-btn");
    if (!btn) return;
    const dir = btn.dataset.dir;
    if (dir === "up") tryMove(0, -1);
    if (dir === "down") tryMove(0, 1);
    if (dir === "left") tryMove(-1, 0);
    if (dir === "right") tryMove(1, 0);
  });

  function onKeyDown(ev) {
    const map = {
      ArrowUp: [0, -1], w: [0, -1], W: [0, -1],
      ArrowDown: [0, 1], s: [0, 1], S: [0, 1],
      ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0],
      ArrowRight: [1, 0], d: [1, 0], D: [1, 0],
    };
    const mv = map[ev.key];
    if (!mv) return;
    ev.preventDefault();
    tryMove(mv[0], mv[1]);
  }
  document.addEventListener("keydown", onKeyDown);
  window.__cleanupScreen = () => document.removeEventListener("keydown", onKeyDown);

  startMaze();
}
