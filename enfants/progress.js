// ============================================================================
// Mini Olympe — progression (localStorage) + petite fête de confettis
// ============================================================================

const PROGRESS_KEY = "miniolympe_progress_v1";

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) throw new Error("empty");
    const p = JSON.parse(raw);
    return {
      coloriage: p.coloriage || [],
      discovered: p.discovered || [],
      objets: p.objets || 0,
      labyrinthe: p.labyrinthe || 0,
      memo: p.memo || 0,
    };
  } catch (e) {
    return { coloriage: [], discovered: [], objets: 0, labyrinthe: 0, memo: 0 };
  }
}

function saveProgress(p) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  } catch (e) {
    /* stockage indisponible : on continue sans sauvegarder */
  }
}

function markDiscovered(godIds) {
  const p = loadProgress();
  let changed = false;
  godIds.forEach((id) => {
    if (!p.discovered.includes(id)) {
      p.discovered.push(id);
      changed = true;
    }
  });
  if (changed) saveProgress(p);
  return p;
}

function markColored(godId) {
  const p = loadProgress();
  if (!p.coloriage.includes(godId)) p.coloriage.push(godId);
  markDiscoveredInto(p, [godId]);
  saveProgress(p);
  return p;
}

function markDiscoveredInto(p, godIds) {
  godIds.forEach((id) => {
    if (!p.discovered.includes(id)) p.discovered.push(id);
  });
}

function incGameCount(key, godIds) {
  const p = loadProgress();
  p[key] = (p[key] || 0) + 1;
  if (godIds && godIds.length) markDiscoveredInto(p, godIds);
  saveProgress(p);
  return p;
}

function resetProgress() {
  saveProgress({ coloriage: [], discovered: [], objets: 0, labyrinthe: 0, memo: 0 });
}

// --- petite pluie de confettis, purement décorative ------------------------
const CONFETTI_COLORS = ["#ffd43b", "#3b5bdb", "#e64980", "#12b886", "#f59f00", "#9c36b5", "#e03131"];

function confettiBurst() {
  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  const count = 36;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    piece.style.background = color;
    piece.style.left = Math.random() * 100 + "%";
    piece.style.animationDelay = Math.random() * 0.4 + "s";
    piece.style.animationDuration = 1.6 + Math.random() * 1 + "s";
    piece.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
    piece.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
    if (Math.random() > 0.5) piece.style.borderRadius = "50%";
    layer.appendChild(piece);
  }
  document.body.appendChild(layer);
  setTimeout(() => layer.remove(), 2800);
}
