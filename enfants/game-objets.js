// ============================================================================
// Mini Olympe — mini-jeu Objets cachés
// Une grande scène illustrée + une liste de symboles à retrouver et cocher,
// façon jeu de « cherche et trouve ». Les coordonnées de chaque objet sont en
// pourcentage de la largeur/hauteur de l'image (repérées à l'œil sur la
// scène). Pour ajouter une scène : déposer l'image dans assets/objets/,
// repérer les coordonnées de chaque symbole, ajouter une entrée ci-dessous.
// ============================================================================

const HIDDEN_SCENES = [
  {
    id: "jardin",
    title: "Le jardin du temple",
    image: "assets/objets/jardin.jpg",
    ratio: 1000 / 890,
    items: [
      { id: "foudre", label: "Foudre de Zeus", emoji: "⚡", x: 41, y: 13 },
      { id: "laurier", label: "Couronne de laurier", emoji: "🌿", x: 49, y: 92 },
      { id: "trident", label: "Trident de Poséidon", emoji: "🔱", x: 18, y: 18 },
      { id: "chouette", label: "Chouette d'Athéna", emoji: "🦉", x: 30, y: 21 },
      { id: "lyre", label: "Lyre d'Apollon", emoji: "🎵", x: 78, y: 72 },
      { id: "pegase", label: "Pégase", emoji: "🐎", x: 49, y: 24 },
      { id: "grenade", label: "Grenade de Perséphone", emoji: "🔴", x: 39, y: 66 },
      { id: "serpent", label: "Serpent d'Asclépios", emoji: "🐍", x: 7, y: 48 },
      { id: "casque", label: "Casque grec", emoji: "🪖", x: 55, y: 75 },
      { id: "vase", label: "Vase antique", emoji: "🏺", x: 6, y: 18 },
      { id: "flamme", label: "Flamme olympique", emoji: "🔥", x: 88, y: 31 },
      { id: "labyrinthe", label: "Labyrinthe du Minotaure", emoji: "🌀", x: 14, y: 62 },
      { id: "navire", label: "Navire grec", emoji: "⛵", x: 24, y: 75 },
    ],
  },
  {
    id: "etagere",
    title: "L'étagère aux trésors",
    image: "assets/objets/etagere.jpg",
    ratio: 1000 / 1122,
    items: [
      { id: "laurier", label: "Couronne de laurier", emoji: "🌿", x: 25, y: 11 },
      { id: "chouette", label: "Chouette d'Athéna", emoji: "🦉", x: 52, y: 11 },
      { id: "casque", label: "Casque grec", emoji: "🪖", x: 65, y: 10 },
      { id: "vase", label: "Vase antique", emoji: "🏺", x: 12, y: 11 },
      { id: "pegase", label: "Pégase", emoji: "🐎", x: 35, y: 29 },
      { id: "lyre", label: "Lyre d'Apollon", emoji: "🎵", x: 50, y: 29 },
      { id: "navire", label: "Navire grec", emoji: "⛵", x: 55, y: 49 },
      { id: "trident", label: "Trident de Poséidon", emoji: "🔱", x: 70, y: 43 },
      { id: "flamme", label: "Flamme olympique", emoji: "🔥", x: 9, y: 65 },
      { id: "labyrinthe", label: "Labyrinthe du Minotaure", emoji: "🌀", x: 25, y: 65 },
      { id: "grenade", label: "Grenade de Perséphone", emoji: "🔴", x: 56, y: 66 },
      { id: "serpent", label: "Serpent d'Asclépios", emoji: "🐍", x: 81, y: 64 },
    ],
  },
];

const HUNT_HIT_RADIUS = 5.5; // % de la largeur de l'image, sauf override par objet (r)
// Rayon (en multiple de HUNT_HIT_RADIUS/r) du recadrage utilisé pour la
// miniature de chaque symbole dans la liste : un peu plus large que la zone
// cliquable pour que l'objet soit bien reconnaissable en tout petit.
const HUNT_THUMB_ZOOM = 1.5;
const HUNT_THUMB_PX = 96; // résolution de la miniature (backing canvas)

function renderObjetsGame(container) {
  let sceneIndex = 0;
  let found = new Set();
  let selectedId = null;
  let celebrated = false;

  const wrap = document.createElement("section");
  wrap.className = "objets-screen";
  wrap.innerHTML = `
    <p class="screen-intro">Choisis d'abord un symbole dans la liste, puis retrouve-le sur l'image !</p>
    <div class="maze-levels" id="hunt-scenes"></div>
    <div class="hunt-scene-wrap" id="hunt-scene-wrap">
      <img class="hunt-scene-img" id="hunt-img" alt="">
      <div class="hunt-targets" id="hunt-targets"></div>
    </div>
    <div class="hunt-toolbar">
      <div class="hunt-progress" id="hunt-progress"></div>
      <button type="button" class="btn btn-ghost" id="hunt-hint">🔍 Indice</button>
    </div>
    <div class="hunt-checklist" id="hunt-checklist"></div>
    <div class="objets-done-msg" id="hunt-done" hidden>
      <p id="hunt-done-text"></p>
      <button type="button" class="btn btn-primary" id="hunt-next">Manche suivante ▶</button>
    </div>
  `;
  container.appendChild(wrap);

  const scenesEl = wrap.querySelector("#hunt-scenes");
  HIDDEN_SCENES.forEach((scene, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "level-btn" + (i === 0 ? " selected" : "");
    btn.textContent = scene.title;
    btn.addEventListener("click", () => {
      sceneIndex = i;
      scenesEl.querySelectorAll(".level-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      startScene();
    });
    scenesEl.appendChild(btn);
  });

  const sceneWrapEl = wrap.querySelector("#hunt-scene-wrap");
  const imgEl = wrap.querySelector("#hunt-img");
  const targetsEl = wrap.querySelector("#hunt-targets");
  const checklistEl = wrap.querySelector("#hunt-checklist");
  const progressEl = wrap.querySelector("#hunt-progress");
  const doneEl = wrap.querySelector("#hunt-done");
  const doneTextEl = wrap.querySelector("#hunt-done-text");

  wrap.querySelector("#hunt-next").addEventListener("click", () => {
    sceneIndex = (sceneIndex + 1) % HIDDEN_SCENES.length;
    scenesEl.querySelectorAll(".level-btn").forEach((b, i) => b.classList.toggle("selected", i === sceneIndex));
    startScene();
  });

  wrap.querySelector("#hunt-hint").addEventListener("click", () => {
    const scene = HIDDEN_SCENES[sceneIndex];
    // Sans symbole choisi, l'indice en sélectionne un pour l'enfant plutôt
    // que de ne rien faire : l'indice reste toujours utile, tout en gardant
    // la règle « un symbole choisi à la fois » intacte.
    if (!selectedId) {
      const remaining = scene.items.filter((it) => !found.has(it.id));
      if (!remaining.length) return;
      const pick = remaining[Math.floor(Math.random() * remaining.length)];
      selectItem(pick.id);
    }
    const target = targetsEl.querySelector(`[data-id="${selectedId}"]`);
    if (target) {
      target.classList.add("hint");
      setTimeout(() => target.classList.remove("hint"), 2200);
    }
  });

  function startScene() {
    const scene = HIDDEN_SCENES[sceneIndex];
    found = new Set();
    selectedId = null;
    celebrated = false;
    doneEl.hidden = true;

    sceneWrapEl.style.aspectRatio = scene.ratio;
    imgEl.src = scene.image;
    imgEl.alt = scene.title;

    targetsEl.innerHTML = "";
    scene.items.forEach((item) => {
      const t = document.createElement("button");
      t.type = "button";
      t.className = "hunt-target";
      t.dataset.id = item.id;
      t.style.left = item.x + "%";
      t.style.top = item.y + "%";
      const r = item.r || HUNT_HIT_RADIUS;
      t.style.width = r * 2 + "%";
      t.setAttribute("aria-label", item.label);
      t.addEventListener("click", () => onTargetClick(item, t));
      targetsEl.appendChild(t);
    });

    checklistEl.innerHTML = "";
    scene.items.forEach((item) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "hunt-check-row";
      row.dataset.id = item.id;
      row.innerHTML = `
        <span class="hunt-check-box">✓</span>
        <canvas class="hunt-check-thumb" width="${HUNT_THUMB_PX}" height="${HUNT_THUMB_PX}"></canvas>
        <span class="hunt-check-label">${item.label}</span>
      `;
      row.addEventListener("click", () => selectItem(item.id));
      checklistEl.appendChild(row);
    });

    // Les miniatures sont un recadrage exact de la scène elle-même (pas une
    // icône générique) : un enfant qui ne sait pas encore lire reconnaît
    // ainsi tout de suite l'objet à chercher. On dessine dès que l'image est
    // chargée (déjà en cache la plupart du temps → quasi instantané).
    const drawThumbs = () => {
      scene.items.forEach((item) => {
        const canvas = checklistEl.querySelector(`.hunt-check-row[data-id="${item.id}"] canvas`);
        if (canvas) drawHuntThumb(canvas, imgEl, item);
      });
    };
    if (imgEl.complete && imgEl.naturalWidth) drawThumbs();
    else imgEl.addEventListener("load", drawThumbs, { once: true });

    updateProgress();
  }

  function selectItem(id) {
    if (found.has(id)) return;
    selectedId = selectedId === id ? null : id;
    checklistEl.querySelectorAll(".hunt-check-row").forEach((row) => {
      row.classList.toggle("selected", row.dataset.id === selectedId);
    });
  }

  function onTargetClick(item, targetEl) {
    if (found.has(item.id)) return;
    if (selectedId !== item.id) {
      // Mauvais endroit pour le symbole actuellement choisi (ou rien choisi
      // du tout) : un halo rouge bref à l'endroit cliqué, sans rien valider
      // — il faut d'abord choisir le bon symbole dans la liste.
      targetEl.classList.remove("wrong");
      void targetEl.offsetWidth; // relance l'animation si déjà jouée
      targetEl.classList.add("wrong");
      setTimeout(() => targetEl.classList.remove("wrong"), 500);
      const row = checklistEl.querySelector(".hunt-check-row.selected");
      if (row) {
        row.classList.remove("nudge");
        void row.offsetWidth;
        row.classList.add("nudge");
      }
      return;
    }
    onFound(item);
  }

  function onFound(item) {
    if (found.has(item.id)) return;
    found.add(item.id);
    selectedId = null;
    const target = targetsEl.querySelector(`[data-id="${item.id}"]`);
    if (target) target.classList.add("found");
    const row = checklistEl.querySelector(`.hunt-check-row[data-id="${item.id}"]`);
    if (row) {
      row.classList.add("found");
      row.classList.remove("selected");
    }
    updateProgress();
    checkComplete();
  }

  function updateProgress() {
    const scene = HIDDEN_SCENES[sceneIndex];
    progressEl.textContent = `${found.size} / ${scene.items.length} trouvés`;
  }

  function checkComplete() {
    const scene = HIDDEN_SCENES[sceneIndex];
    if (celebrated || found.size < scene.items.length) return;
    celebrated = true;
    incGameCount("objets");
    confettiBurst();
    doneTextEl.textContent = `🎉 Bravo ! Tu as retrouvé tous les symboles de « ${scene.title} » ! 🎉`;
    doneEl.hidden = false;
  }

  startScene();
}

// Recadre la scène pile autour d'un symbole pour servir de miniature exacte
// dans la liste (voir HUNT_THUMB_ZOOM/HUNT_THUMB_PX ci-dessus).
function drawHuntThumb(canvas, img, item) {
  if (!img.naturalWidth) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const rPct = (item.r || HUNT_HIT_RADIUS) * HUNT_THUMB_ZOOM;
  const cropW = (rPct / 100) * img.naturalWidth * 2;
  const cropH = (rPct / 100) * img.naturalHeight * 2;
  const cx = (item.x / 100) * img.naturalWidth;
  const cy = (item.y / 100) * img.naturalHeight;
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(img, cx - cropW / 2, cy - cropH / 2, cropW, cropH, 0, 0, size, size);
}
