// ============================================================================
// Mini Olympe — mini-jeu Objets cachés → association au bon dieu
// ============================================================================

const OBJ_ROUND_SIZE = 4;
const OBJ_CELLS = [
  { x: 22, y: 28 },
  { x: 78, y: 26 },
  { x: 24, y: 76 },
  { x: 76, y: 74 },
];

function obj_shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function renderObjetsGame(container) {
  let sessionOrder = obj_shuffle(GODS);
  let sessionIndex = 0;
  let roundNum = 0;
  let matched = new Set();
  let selectedId = null;

  const wrap = document.createElement("section");
  wrap.className = "objets-screen";
  wrap.innerHTML = `
    <p class="screen-intro">Clique sur un symbole caché, puis sur le nom du dieu à qui il appartient !</p>
    <div class="objets-round-label" id="obj-round"></div>
    <div class="hidden-scene" id="obj-scene">
      <span class="scene-deco deco-1" aria-hidden="true">🏛️</span>
      <span class="scene-deco deco-2" aria-hidden="true">🌿</span>
      <span class="scene-deco deco-3" aria-hidden="true">☁️</span>
      <span class="scene-deco deco-4" aria-hidden="true">🌿</span>
    </div>
    <div class="objets-targets" id="obj-targets"></div>
    <div class="objets-done-msg" id="obj-done" hidden>
      <p id="obj-done-text"></p>
      <button type="button" class="btn btn-primary" id="obj-next">Manche suivante ▶</button>
    </div>
  `;
  container.appendChild(wrap);

  const sceneEl = wrap.querySelector("#obj-scene");
  const targetsEl = wrap.querySelector("#obj-targets");
  const roundLabel = wrap.querySelector("#obj-round");
  const doneMsg = wrap.querySelector("#obj-done");
  const doneText = wrap.querySelector("#obj-done-text");

  wrap.querySelector("#obj-next").addEventListener("click", startRound);

  function nextBatch() {
    if (sessionIndex >= sessionOrder.length) {
      sessionOrder = obj_shuffle(GODS);
      sessionIndex = 0;
    }
    const batch = sessionOrder.slice(sessionIndex, sessionIndex + OBJ_ROUND_SIZE);
    sessionIndex += OBJ_ROUND_SIZE;
    return batch;
  }

  function startRound() {
    roundNum++;
    matched = new Set();
    selectedId = null;
    doneMsg.hidden = true;
    const gods = nextBatch();
    roundLabel.textContent = `Manche ${roundNum}`;

    sceneEl.querySelectorAll(".obj-symbol").forEach((n) => n.remove());
    const shuffledSymbols = obj_shuffle(gods);
    shuffledSymbols.forEach((g, i) => {
      const cell = OBJ_CELLS[i] || { x: 50, y: 50 };
      const jitterX = (Math.random() - 0.5) * 8;
      const jitterY = (Math.random() - 0.5) * 8;
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "obj-symbol";
      tile.style.left = cell.x + jitterX + "%";
      tile.style.top = cell.y + jitterY + "%";
      tile.style.setProperty("--god-color", g.color);
      tile.dataset.godId = g.id;
      tile.innerHTML = renderSymbolBadge(g.symbol);
      tile.setAttribute("aria-label", "Symbole caché");
      tile.addEventListener("click", () => onSymbolClick(g.id, tile));
      sceneEl.appendChild(tile);
    });

    targetsEl.innerHTML = "";
    obj_shuffle(gods).forEach((g) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "obj-target";
      chip.style.setProperty("--god-color", g.color);
      chip.dataset.godId = g.id;
      chip.innerHTML = `<span>${g.name}</span><span class="obj-target-title">${g.title}</span>`;
      chip.addEventListener("click", () => onTargetClick(g.id, chip));
      targetsEl.appendChild(chip);
    });
  }

  function onSymbolClick(godId, tile) {
    if (matched.has(godId)) return;
    selectedId = godId;
    sceneEl.querySelectorAll(".obj-symbol").forEach((t) => t.classList.remove("selected"));
    tile.classList.add("selected");
  }

  function onTargetClick(godId, chip) {
    if (matched.has(godId)) return;
    if (!selectedId) {
      chip.classList.add("nudge");
      setTimeout(() => chip.classList.remove("nudge"), 400);
      return;
    }
    if (selectedId === godId) {
      matched.add(godId);
      chip.classList.add("matched");
      chip.disabled = true;
      const symTile = sceneEl.querySelector(`.obj-symbol[data-god-id="${godId}"]`);
      if (symTile) {
        symTile.classList.remove("selected");
        symTile.classList.add("matched");
        symTile.disabled = true;
      }
      selectedId = null;
      checkRoundComplete();
    } else {
      chip.classList.add("shake");
      setTimeout(() => chip.classList.remove("shake"), 400);
    }
  }

  function checkRoundComplete() {
    const total = targetsEl.querySelectorAll(".obj-target").length;
    if (matched.size < total) return;
    incGameCount("objets", [...matched]);
    confettiBurst();
    doneText.textContent = `🎉 Bravo ! Tu as retrouvé les ${total} symboles ! 🎉`;
    doneMsg.hidden = false;
  }

  startRound();
}
