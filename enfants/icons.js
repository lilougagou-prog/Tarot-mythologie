// ============================================================================
// Mini Olympe — bibliothèque d'icônes vectorielles (SVG dessinées à la main)
// Chaque symbole est composé de "parties" (parts). Chaque partie devient une
// région coloriable indépendante dans le mini-jeu Coloriage, et une simple
// silhouette d'une seule couleur partout ailleurs (badges, objets cachés,
// mémo). Tout est du SVG généré en JS : aucune image externe nécessaire.
// ============================================================================

// --- primitives : convertit une description de forme en balise SVG --------
function shapeTag(s) {
  switch (s.t) {
    case "path":
      return `<path d="${s.d}"/>`;
    case "circle":
      return `<circle cx="${s.cx}" cy="${s.cy}" r="${s.r}"/>`;
    case "ellipse":
      return `<ellipse cx="${s.cx}" cy="${s.cy}" rx="${s.rx}" ry="${s.ry}"${
        s.rotate ? ` transform="rotate(${s.rotate} ${s.cx} ${s.cy})"` : ""
      }/>`;
    case "rect":
      return `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}"${
        s.rx ? ` rx="${s.rx}"` : ""
      }/>`;
    case "polygon":
      return `<polygon points="${s.points}"/>`;
    default:
      return "";
  }
}

function overlayTag(s) {
  // Traits fins décoratifs, toujours noirs (cordes de lyre, corde d'arc...),
  // jamais coloriables : purement visuels, par-dessus les régions.
  if (s.t === "line") {
    return `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}"/>`;
  }
  if (s.t === "path") {
    return `<path d="${s.d}" fill="none"/>`;
  }
  return "";
}

// --- générateurs procéduraux (évitent de recopier des dizaines de points) -
function grapeCluster(cx, cy, r) {
  const rows = [2, 3, 2, 1];
  const shapes = [];
  let y = cy - r * 1.7;
  rows.forEach((n, i) => {
    const spread = (n - 1) * r * 1.15;
    for (let j = 0; j < n; j++) {
      const x = cx - spread / 2 + j * r * 1.15;
      shapes.push({ t: "circle", cx: x, cy: y, r });
    }
    y += r * 1.5;
  });
  return shapes;
}

function wheatGrains(cx, top, bottom, pairs) {
  const shapes = [];
  const step = (bottom - top) / (pairs - 1);
  for (let i = 0; i < pairs; i++) {
    const y = top + i * step;
    const spread = 12 + (i % 2) * 2;
    shapes.push({ t: "ellipse", cx: cx - spread, cy: y, rx: 8, ry: 4 });
    shapes.push({ t: "ellipse", cx: cx + spread, cy: y, rx: 8, ry: 4 });
  }
  return shapes;
}

function panTubes(x0, y0, count, width, gap, maxH, minH) {
  const shapes = [];
  const overlay = [];
  const step = (maxH - minH) / (count - 1);
  for (let i = 0; i < count; i++) {
    const h = maxH - i * step;
    const x = x0 + i * (width + gap);
    shapes.push({ t: "rect", x, y: y0 + (maxH - h), w: width, h, rx: 2 });
  }
  overlay.push({ t: "line", x1: x0 - 3, y1: y0 + maxH * 0.35, x2: x0 + count * (width + gap), y2: y0 + maxH * 0.35 });
  overlay.push({ t: "line", x1: x0 - 3, y1: y0 + maxH * 0.65, x2: x0 + count * (width + gap), y2: y0 + maxH * 0.65 });
  return { shapes, overlay };
}

const WAVE_D =
  "M0 90 q12.5 -14 25 0 q12.5 14 25 0 q12.5 -14 25 0 q12.5 14 25 0 L100 100 L0 100 Z";

// --- table des symboles ------------------------------------------------------
// Chaque symbole : { parts: [{id, shapes:[...]}], overlay: [...] (optionnel) }
// Tout est dessiné dans un repère 0..100 x 0..100.
const SYMBOLS = {
  foudre: {
    parts: [
      { id: "main", shapes: [{ t: "path", d: "M58 4 L36 50 L50 50 L32 96 L72 46 L54 46 Z" }] },
    ],
  },
  diademe: {
    parts: [
      {
        id: "main",
        shapes: [
          { t: "path", d: "M18 80 L18 55 L30 68 L42 36 L50 58 L58 36 L70 68 L82 55 L82 80 Z" },
        ],
      },
      { id: "gemme", shapes: [{ t: "circle", cx: 50, cy: 68, r: 7 }] },
    ],
  },
  trident: {
    parts: [
      {
        id: "main",
        shapes: [
          { t: "rect", x: 46, y: 34, w: 8, h: 58, rx: 2 },
          { t: "rect", x: 20, y: 30, w: 60, h: 8, rx: 2 },
          { t: "path", d: "M24 30 L32 4 L40 30 Z" },
          { t: "path", d: "M46 28 L50 0 L54 28 Z" },
          { t: "path", d: "M60 30 L68 4 L76 30 Z" },
        ],
      },
      { id: "vague", shapes: [{ t: "path", d: WAVE_D }] },
    ],
  },
  epi: {
    parts: [
      { id: "tige", shapes: [{ t: "path", d: "M47 98 C45 70 46 40 50 6 C54 40 55 70 53 98 Z" }] },
      { id: "grains", shapes: wheatGrains(50, 20, 72, 5) },
    ],
  },
  chouette: {
    parts: [
      {
        id: "corps",
        shapes: [
          { t: "ellipse", cx: 50, cy: 64, rx: 26, ry: 28 },
          { t: "ellipse", cx: 50, cy: 34, rx: 20, ry: 18 },
          { t: "path", d: "M32 20 L38 4 L42 22 Z" },
          { t: "path", d: "M68 20 L62 4 L58 22 Z" },
          { t: "path", d: "M18 55 Q6 66 16 84 Q26 78 26 60 Z" },
          { t: "path", d: "M82 55 Q94 66 84 84 Q74 78 74 60 Z" },
        ],
      },
      {
        id: "visage",
        shapes: [
          { t: "circle", cx: 42, cy: 34, r: 8 },
          { t: "circle", cx: 58, cy: 34, r: 8 },
          { t: "path", d: "M47 40 L53 40 L50 48 Z" },
        ],
      },
    ],
  },
  lyre: {
    parts: [
      {
        id: "main",
        shapes: [
          { t: "ellipse", cx: 50, cy: 88, rx: 22, ry: 10 },
          { t: "path", d: "M28 88 Q18 40 34 10 Q40 8 40 16 Q28 44 40 84 Z" },
          { t: "path", d: "M72 88 Q82 40 66 10 Q60 8 60 16 Q72 44 60 84 Z" },
          { t: "rect", x: 32, y: 10, w: 36, h: 8, rx: 3 },
        ],
      },
    ],
    overlay: [
      { t: "line", x1: 40, y1: 18, x2: 40, y2: 84 },
      { t: "line", x1: 45, y1: 18, x2: 45, y2: 84 },
      { t: "line", x1: 50, y1: 18, x2: 50, y2: 84 },
      { t: "line", x1: 55, y1: 18, x2: 55, y2: 84 },
      { t: "line", x1: 60, y1: 18, x2: 60, y2: 84 },
    ],
  },
  arc: {
    parts: [
      {
        id: "main",
        shapes: [
          { t: "path", d: "M22 6 Q58 50 22 94 Q34 50 22 6 Z" },
          { t: "rect", x: 22, y: 47, w: 60, h: 6 },
          { t: "path", d: "M82 38 L98 50 L82 62 Z" },
          { t: "path", d: "M22 40 L34 47 L22 47 Z" },
          { t: "path", d: "M22 60 L34 53 L22 53 Z" },
        ],
      },
    ],
    overlay: [{ t: "line", x1: 22, y1: 6, x2: 22, y2: 94 }],
  },
  casque: {
    parts: [
      {
        id: "dome",
        shapes: [
          { t: "path", d: "M20 60 Q20 15 50 15 Q80 15 80 60 L80 72 L20 72 Z" },
          { t: "rect", x: 15, y: 70, w: 70, h: 12, rx: 4 },
        ],
      },
      { id: "crete", shapes: [{ t: "path", d: "M42 6 Q50 -6 58 6 L64 60 Q50 68 36 60 Z" }] },
    ],
  },
  coquillage: {
    parts: [{ id: "main", shapes: [{ t: "path", d: "M50 95 L15 40 Q50 5 85 40 Z" }] }],
    overlay: [
      { t: "line", x1: 50, y1: 95, x2: 25, y2: 45 },
      { t: "line", x1: 50, y1: 95, x2: 38, y2: 25 },
      { t: "line", x1: 50, y1: 95, x2: 62, y2: 25 },
      { t: "line", x1: 50, y1: 95, x2: 75, y2: 45 },
    ],
  },
  marteau: {
    parts: [
      {
        id: "enclume",
        shapes: [
          { t: "path", d: "M15 70 L85 70 L78 80 L22 80 Z" },
          { t: "rect", x: 38, y: 80, w: 24, h: 10 },
          { t: "rect", x: 28, y: 90, w: 44, h: 8, rx: 2 },
        ],
      },
      {
        id: "marteau",
        shapes: [
          { t: "rect", x: 55, y: 15, w: 30, h: 18, rx: 3 },
          { t: "rect", x: 28, y: 20, w: 30, h: 8, rx: 4 },
        ],
      },
    ],
  },
  sandale: {
    parts: [
      {
        id: "main",
        shapes: [
          { t: "path", d: "M20 70 Q15 55 25 45 Q40 38 60 42 Q80 46 82 60 Q84 72 70 78 Q45 86 20 70 Z" },
          { t: "path", d: "M35 45 Q50 30 65 45 L60 50 Q50 40 40 50 Z" },
        ],
      },
      {
        id: "aile",
        shapes: [
          { t: "path", d: "M18 55 Q0 45 4 25 Q14 30 20 40 Q24 30 30 32 Q26 46 30 56 Q22 60 18 55 Z" },
        ],
      },
    ],
  },
  raisin: {
    parts: [
      { id: "grains", shapes: grapeCluster(50, 45, 10) },
      { id: "feuille", shapes: [{ t: "path", d: "M45 10 Q50 0 60 4 Q58 14 48 16 Z" }] },
    ],
    overlay: [{ t: "line", x1: 50, y1: 16, x2: 50, y2: 28 }],
  },
  cle: {
    parts: [
      {
        id: "main",
        shapes: [
          { t: "circle", cx: 50, cy: 24, r: 18 },
          { t: "rect", x: 44, y: 40, w: 12, h: 46 },
          { t: "rect", x: 56, y: 70, w: 14, h: 8 },
          { t: "rect", x: 56, y: 82, w: 10, h: 8 },
        ],
      },
      { id: "anneau", shapes: [{ t: "circle", cx: 50, cy: 24, r: 8 }] },
    ],
  },
  grenade: {
    parts: [
      {
        id: "fruit",
        shapes: [
          { t: "circle", cx: 50, cy: 58, r: 32 },
          { t: "path", d: "M38 26 L42 8 L48 24 L50 4 L52 24 L58 8 L62 26 Z" },
        ],
      },
      {
        id: "graines",
        shapes: [
          { t: "circle", cx: 64, cy: 66, r: 5 },
          { t: "circle", cx: 70, cy: 74, r: 5 },
          { t: "circle", cx: 60, cy: 78, r: 5 },
          { t: "circle", cx: 70, cy: 60, r: 4 },
        ],
      },
    ],
  },
  massue: {
    parts: [
      {
        id: "main",
        shapes: [
          { t: "path", d: "M46 96 L54 96 L58 40 Q70 30 66 14 Q60 2 50 2 Q40 2 34 14 Q30 30 42 40 Z" },
        ],
      },
      {
        id: "noeuds",
        shapes: [
          { t: "circle", cx: 42, cy: 20, r: 4 },
          { t: "circle", cx: 52, cy: 14, r: 4 },
          { t: "circle", cx: 60, cy: 22, r: 4 },
          { t: "circle", cx: 46, cy: 30, r: 4 },
          { t: "circle", cx: 58, cy: 32, r: 4 },
        ],
      },
    ],
  },
  flute: (() => {
    const { shapes, overlay } = panTubes(12, 15, 7, 9, 2, 78, 26);
    return { parts: [{ id: "main", shapes }], overlay };
  })(),
  flamme: {
    parts: [
      {
        id: "main",
        shapes: [
          {
            t: "path",
            d: "M50 4 C34 26 26 44 32 60 C26 56 22 66 26 74 C31 84 42 90 50 90 C62 90 72 80 72 66 C72 54 64 48 62 38 C60 46 54 50 50 46 C56 34 52 16 50 4 Z",
          },
        ],
      },
      {
        id: "brasero",
        shapes: [
          { t: "path", d: "M22 88 L78 88 L70 100 L30 100 Z" },
          { t: "ellipse", cx: 50, cy: 88, rx: 28, ry: 7 },
        ],
      },
    ],
  },
};

// --- rendu : badge plat (une seule couleur, utilisé partout hors coloriage)
function renderSymbolBadge(symbolId, extraClass) {
  const sym = SYMBOLS[symbolId];
  if (!sym) return "";
  // La silhouette principale reste pleine ; les parties secondaires (détails,
  // accents) reçoivent un léger voile sombre + un fin contour sombre. Une
  // simple transparence de la même teinte serait invisible quand l'accent
  // recouvre une forme déjà de la même couleur (ex. les yeux de la chouette) :
  // le contour, lui, reste lisible quelle que soit la couleur de base.
  const parts = sym.parts
    .map((p, i) => {
      const inner = p.shapes.map(shapeTag).join("");
      if (i === 0) return `<g fill="currentColor">${inner}</g>`;
      return `<g fill="#000" fill-opacity="0.28" stroke="#000" stroke-opacity="0.45" stroke-width="1.5">${inner}</g>`;
    })
    .join("");
  const overlay = (sym.overlay || []).map(overlayTag).join("");
  return `<svg viewBox="0 0 100 100" class="symbol-badge${extraClass ? " " + extraClass : ""}" aria-hidden="true">
    ${parts}
    <g class="symbol-overlay" stroke="currentColor" stroke-width="3" stroke-linecap="round">${overlay}</g>
  </svg>`;
}

// --- rendu : régions coloriables (utilisé dans le jeu Coloriage) -----------
// Retourne { markup, regionIds } : chaque région est un <g data-region="...">
function renderSymbolColorable(symbolId, idPrefix) {
  const sym = SYMBOLS[symbolId];
  if (!sym) return { markup: "", regionIds: [] };
  const regionIds = [];
  const markup = sym.parts
    .map((p) => {
      const regionId = `${idPrefix}-${p.id}`;
      regionIds.push(regionId);
      const inner = p.shapes.map(shapeTag).join("");
      return `<g class="region" data-region="${regionId}">${inner}</g>`;
    })
    .join("");
  const overlay = (sym.overlay || []).map(overlayTag).join("");
  const overlayMarkup = overlay
    ? `<g class="symbol-overlay" fill="none" stroke="#2b2b2b" stroke-width="2.5" stroke-linecap="round">${overlay}</g>`
    : "";
  return { markup: markup + overlayMarkup, regionIds };
}

// --- gabarit de la page de coloriage : fond + couronne + étoiles + symbole -
function buildWreathRing(cx, cy, r, count, regionId) {
  let leaves = "";
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    const deg = (angle * 180) / Math.PI + 90;
    leaves += `<ellipse cx="${x}" cy="${y}" rx="10" ry="20" transform="rotate(${deg} ${x} ${y})"/>`;
  }
  return `<g class="region" data-region="${regionId}">${leaves}</g>`;
}

function buildStarRing(cx, cy, r, count, regionId) {
  let stars = "";
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    stars += starShape(x, y, 7);
  }
  return `<g class="region" data-region="${regionId}">${stars}</g>`;
}

function starShape(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : r * 0.42;
    pts.push(`${cx + Math.cos(angle) * radius},${cy + Math.sin(angle) * radius}`);
  }
  return `<polygon points="${pts.join(" ")}"/>`;
}

function buildColoringPage(god) {
  const cx = 200,
    cy = 200;
  const bg = `<g class="region" data-region="fond"><circle cx="${cx}" cy="${cy}" r="188"/></g>`;
  const wreath = buildWreathRing(cx, cy, 152, 20, "couronne");
  const stars = buildStarRing(cx, cy, 178, 12, "etoiles");
  const inner = `<circle cx="${cx}" cy="${cy}" r="128" fill="#fff" stroke="#2b2b2b" stroke-width="4" class="static-ring"/>`;
  const { markup: symbolMarkup, regionIds } = renderSymbolColorable(god.symbol, god.id);
  const scale = 2.1;
  const offset = cx - (100 * scale) / 2;
  const symbolWrapped = `<g transform="translate(${offset} ${offset}) scale(${scale})">${symbolMarkup}</g>`;

  const regionIdsAll = ["fond", "couronne", ...regionIds, "etoiles"];
  const svg = `<svg viewBox="0 0 400 400" class="coloring-svg" xmlns="http://www.w3.org/2000/svg">
    ${bg}
    ${wreath}
    ${inner}
    ${symbolWrapped}
    ${stars}
  </svg>`;
  return { svg, regionIds: regionIdsAll };
}
