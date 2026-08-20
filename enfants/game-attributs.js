// ============================================================================
// Mini Olympe — mini-jeu Retrouve les attributs
// Associer chaque carte-attribut à la carte-portrait du bon dieu. Limité aux
// dieux qui ont un portrait ET un attribut illustrés (ATTR_GOD_IDS ci-dessous
// dans data.js). Interaction : clic sur un attribut pour le sélectionner,
// puis clic sur le portrait du dieu correspondant.
// ============================================================================

const ATTR_ROUND_SIZE = 4;

function renderAttributsGame(container) {
  const pool = Object.keys(PORTRAIT_IMAGES).filter((id) => ATTRIBUTE_IMAGES[id]);
  let sessionOrder = shuffleArray(pool);
  let sessionIndex = 0;
  let roundNum = 0;
  let matched = new Set();
  let selectedId = null;

  const wrap = document.createElement("section");
  wrap.className = "attr-screen";
  wrap.innerHTML = `
    <p class="screen-intro">Clique sur un attribut, puis sur le portrait du dieu à qui il appartient !</p>
    <div class="attr-round-label" id="attr-round"></div>
    <div class="attr-cards" id="attr-cards"></div>
    <div class="attr-gods" id="attr-gods"></div>
    <div class="objets-done-msg" id="attr-done" hidden>
      <p id="attr-done-text"></p>
      <button type="button" class="btn btn-primary" id="attr-next">Manche suivante ▶</button>
    </div>
  `;
  container.appendChild(wrap);

  const cardsEl = wrap.querySelector("#attr-cards");
  const godsEl = wrap.querySelector("#attr-gods");
  const roundLabel = wrap.querySelector("#attr-round");
  const doneEl = wrap.querySelector("#attr-done");
  const doneTextEl = wrap.querySelector("#attr-done-text");

  wrap.querySelector("#attr-next").addEventListener("click", startRound);

  function nextBatch() {
    if (sessionIndex >= sessionOrder.length) {
      sessionOrder = shuffleArray(pool);
      sessionIndex = 0;
    }
    const batch = sessionOrder.slice(sessionIndex, sessionIndex + ATTR_ROUND_SIZE);
    sessionIndex += ATTR_ROUND_SIZE;
    return batch;
  }

  function startRound() {
    roundNum++;
    matched = new Set();
    selectedId = null;
    doneEl.hidden = true;
    const ids = nextBatch();
    roundLabel.textContent = `Manche ${roundNum}`;

    cardsEl.innerHTML = "";
    shuffleArray(ids).forEach((id) => {
      const god = getGod(id);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "attr-card";
      card.dataset.godId = id;
      card.innerHTML = `<img src="${ATTRIBUTE_IMAGES[id]}" alt="${god.name}">`;
      card.addEventListener("click", () => onAttrClick(id, card));
      cardsEl.appendChild(card);
    });

    godsEl.innerHTML = "";
    shuffleArray(ids).forEach((id) => {
      const god = getGod(id);
      const card = document.createElement("button");
      card.type = "button";
      card.className = "attr-god-card";
      card.dataset.godId = id;
      card.innerHTML = `<img src="${PORTRAIT_IMAGES[id]}" alt="${god.name}"><span>${god.name}</span>`;
      card.addEventListener("click", () => onGodClick(id, card));
      godsEl.appendChild(card);
    });
  }

  function onAttrClick(id, card) {
    if (matched.has(id)) return;
    selectedId = id;
    cardsEl.querySelectorAll(".attr-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
  }

  function onGodClick(id, card) {
    if (matched.has(id)) return;
    if (!selectedId) {
      card.classList.add("nudge");
      setTimeout(() => card.classList.remove("nudge"), 400);
      return;
    }
    if (selectedId === id) {
      matched.add(id);
      card.classList.add("matched");
      card.disabled = true;
      const attrCard = cardsEl.querySelector(`.attr-card[data-god-id="${id}"]`);
      if (attrCard) {
        attrCard.classList.remove("selected");
        attrCard.classList.add("matched");
        attrCard.disabled = true;
      }
      selectedId = null;
      checkRoundComplete();
    } else {
      card.classList.add("shake");
      setTimeout(() => card.classList.remove("shake"), 400);
    }
  }

  function checkRoundComplete() {
    const total = godsEl.querySelectorAll(".attr-god-card").length;
    if (matched.size < total) return;
    incGameCount("attributs", [...matched]);
    confettiBurst();
    doneTextEl.textContent = `🎉 Bravo ! Tu as retrouvé les ${total} attributs ! 🎉`;
    doneEl.hidden = false;
  }

  startRound();
}
