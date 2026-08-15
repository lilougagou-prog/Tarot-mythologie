const MAJORS = [
["Le Mat","Dionysos","🍇","Liberté · instinct · départ","major","lierre · panthère · vigne · bâton"],
["I — Le Bateleur","Hermès","☿","Commencement · potentiel · habileté","major","caducée · dés · quatre enseignes · sac de voyage"],
["II — La Papesse","Métis","📖","Savoir caché · intuition · connaissance","major","livre · voile · colonnes · sagesse"],
["III — L’Impératrice","Héra","🦚","Souveraineté · création · fécondité","major","paon · couronne · sceptre · grenade · voile"],
["IV — L’Empereur","Zeus","⚡","Autorité · structure · pouvoir","major","foudre · aigle · chêne · trône"],
["V — Le Pape","Chiron","🐎","Transmission · enseignement · initiation","major","parchemin · torche · plantes · disciples"],
["VI — L’Amoureux","Éros","🏹","Choix · désir · attraction","major","arc · flèche · deux chemins · fleurs"],
["VII — Le Chariot","Apollon","☀","Victoire · maîtrise · mouvement","major","char · chevaux opposés · bouclier · laurier"],
["VIII — La Justice","Thémis","⚖","Équilibre · vérité · décision","major","balance · épée · colonnes · couronne"],
["IX — L’Hermite","Déméter","🏮","Quête · solitude · patience","major","lanterne · chemin · épis · fleurs de Perséphone"],
["X — La Roue de Fortune","Tyché","◉","Cycles · destin · changement","major","roue · corne d’abondance · montée · sommet · chute"],
["XI — La Force","Héraclès","🦁","Maîtrise · courage · puissance intérieure","major","lion de Némée · peau de lion · mains · massue"],
["XII — Le Pendu","Prométhée","🔥","Sacrifice · suspension · autre regard","major","rocher · chaînes · aigle · feu"],
["XIII — L’Arcane sans nom","Hadès","☠","Transformation · fin · passage","major","faux · grenade · cyprès · ossements · pousses"],
["XIV — Tempérance","Iris","🌈","Équilibre · circulation · médiation","major","deux vases · eau · ailes · arc-en-ciel"],
["XV — Le Diable","Pan","🐐","Instinct · désir · attachement","major","cornes · flûte · chaînes · vigne · feu"],
["XVI — La Maison Dieu","Poséidon","🔱","Rupture · effondrement · libération","major","tour · trident · vagues · chute"],
["XVII — L’Étoile","Hécate","✦","Espoir · orientation · intuition","major","huit étoiles · deux vases · torches · chiens · chemin"],
["XVIII — La Lune","Séléné","☾","Inconscient · intuition · incertitude","major","lune · deux tours · chiens · eau · crustacé"],
["XIX — Le Soleil","Hélios","☀","Clarté · joie · vitalité","major","soleil · char solaire · deux figures · laurier"],
["XX — Le Jugement","Minos","⚖","Révélation · appel · bilan","major","juge · trois âmes · lumière · Enfers"],
["XXI — Le Monde","Gaïa","🌿","Accomplissement · totalité · unité","major","mandorle · racines · quatre figures · monde vivant"]
];

const COURTS = {
"Bâtons":[
["Valet de Bâtons","Éos","🌅","Éveil · impulsion · potentiel"],
["Cavalier de Bâtons","Niké","🏆","Élan · conquête · victoire"],
["Reine de Bâtons","Hestia","🔥","Feu intérieur · confiance · stabilité"],
["Roi de Bâtons","Héphaïstos","⚒","Création · maîtrise · transformation"]
],
"Coupes":[
["Valet de Coupes","Himeros","💗","Désir naissant · sensibilité · attirance"],
["Cavalier de Coupes","Énée","⛵","Quête · voyage du cœur · engagement"],
["Reine de Coupes","Aphrodite","🕊","Amour · beauté · désir · réceptivité"],
["Roi de Coupes","Nérée","🌊","Profondeur · sagesse · vérité émotionnelle"]
],
"Épées":[
["Valet d’Épées","Zéphyr","🍃","Curiosité · rapidité · esprit vif"],
["Cavalier d’Épées","Bellérophon","🐎","Action · courage · maîtrise · confrontation"],
["Reine d’Épées","Athéna","🦉","Discernement · stratégie · intelligence"],
["Roi d’Épées","Éole","🌬","Autorité · contrôle · maîtrise des forces de l’air"]
],
"Deniers":[
["Valet de Deniers","Chloris","🌸","Germination · potentiel · croissance"],
["Cavalier de Deniers","Triptolemos","🌾","Travail · transmission · agriculture"],
["Reine de Deniers","Perséphone","🌺","Cycles · fertilité · renaissance"],
["Roi de Deniers","Ploutos","🪙","Abondance · richesse · prospérité"]
]
};

const SUITS = {
"Bâtons":["wands","🔥","Feu · action · volonté","soleil · flamme · vigne · bourgeon"],
"Coupes":["cups","💧","Eau · émotion · relation","eau · rose · coquillage · myrte"],
"Épées":["swords","🌬","Air · pensée · décision","vent · plume · nuage · oiseau"],
"Deniers":["coins","🌿","Terre · matière · croissance","graine · blé · racine · fruit"]
};

const NUMBER_KEYS = {
1:["origine","graine · bourgeon · rayon","potentiel · naissance"],
2:["dualité","miroir · paire · deux chemins","relation · choix · polarité"],
3:["expansion","triangle · fleur ouverte · lien","création · développement"],
4:["structure","carré · quatre points · fondation","stabilité · ordre · sécurité"],
5:["rupture","fissure · déséquilibre · branche cassée","tension · épreuve · changement"],
6:["harmonie","symétrie · échange · fleur complète","rééquilibrage · circulation · accord"],
7:["recherche","étoile isolée · montagne · chemin","quête · dépassement · réflexion"],
8:["maîtrise","roue · spirale · mouvement circulaire","puissance contrôlée · organisation"],
9:["maturation","fruit mûr · arbre chargé · lune presque pleine","accomplissement intérieur · maturation"],
10:["cycle accompli","cercle fermé · récolte · graine","aboutissement · transmission · nouveau cycle"]
};

let journal = JSON.parse(localStorage.getItem("arcanes-journal") || "[]");
let route = "home";

function escapeHTML(value){
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}

function pipHTML(suit, number){
  const icon = SUITS[suit]?.[1] || "•";
  return `<div class="pips pips-${number}">${
    Array.from({length:number}, () => `<span class="pip">${icon}</span>`).join("")
  }</div>`;
}

function cardHTML(c, cls="major", subtitle=""){
  const isNumber = c[4] === "number";
  const visual = isNumber
    ? pipHTML(c[6], c[7])
    : `<div class="glyph">${c[2] || "✦"}</div>`;

  return `<div class="tarot-card ${cls}" data-card="${encodeURIComponent(JSON.stringify(c))}">
    <div class="frame">
      <div class="card-no">${escapeHTML(c[0])}</div>
      ${visual}
      <div class="card-name">${escapeHTML(c[1])}</div>
      <div class="card-sub">${escapeHTML(subtitle || c[3] || "")}</div>
    </div>
  </div>`;
}

function allCards(){
  const cards = MAJORS.map(x => [...x]);

  for(const [suit, rows] of Object.entries(COURTS)){
    rows.forEach(x => cards.push([x[0], x[1], x[2], x[3], "court", "", suit]));
  }

  for(const [suit, meta] of Object.entries(SUITS)){
    for(let n = 1; n <= 10; n++){
      const key = NUMBER_KEYS[n];
      cards.push([
        `${n === 1 ? "As" : n} de ${suit}`,
        key[0],
        meta[1],
        `${key[2]} · ${meta[2]}`,
        "number",
        `${key[1]} · ${meta[3]}`,
        suit,
        n
      ]);
    }
  }

  return cards;
}

const CARDS = allCards();

function setRoute(newRoute){
  route = newRoute;
  render();
  window.scrollTo(0,0);
}

function render(){
  const screen = document.getElementById("screen");
  const title = document.getElementById("pageTitle");

  if(!screen || !title) return;

  document.querySelectorAll(".bottom-nav button").forEach(button => {
    button.classList.toggle("active", button.dataset.route === route);
  });

  const back = document.getElementById("backBtn");
  if(back) back.hidden = route === "home";

  title.textContent = {
    home:"Le Temple des Arcanes",
    tirage:"Tirage",
    apprendre:"Apprendre",
    symboles:"Bibliothèque symbolique",
    journal:"Journal"
  }[route] || "Le Temple des Arcanes";

  if(route === "home") screen.innerHTML = home();
  if(route === "tirage") screen.innerHTML = tirage();
  if(route === "apprendre") screen.innerHTML = apprendre();
  if(route === "symboles") screen.innerHTML = symboles();
  if(route === "journal") screen.innerHTML = journalView();

  bind();
}

function home(){
  return `<section class="hero">
    <span class="pill">V1 · 78 cartes · Tarot de Marseille réinterprété</span>
    <h2>Un tarot qui s'apprend en le regardant.</h2>
    <p>Les personnages mythologiques, la structure des cartes et la grammaire symbolique suivent les choix validés ensemble.</p>
  </section>

  <div class="grid">
    <div class="tile" data-go="tirage">
      <strong>✦ Tirer les cartes</strong>
      <span>Un tirage de trois cartes avec question et notes.</span>
    </div>
    <div class="tile" data-go="apprendre">
      <strong>◈ Apprendre</strong>
      <span>Explorer les 78 cartes et leurs personnages.</span>
    </div>
    <div class="tile" data-go="symboles">
      <strong>✧ Symboles</strong>
      <span>Comprendre la grammaire des nombres et des enseignes.</span>
    </div>
    <div class="tile" data-go="journal">
      <strong>☽ Journal</strong>
      <span>Conserver tes tirages et tes interprétations.</span>
    </div>
  </div>

  <div class="section-title">
    <h3>Les 22 majeurs</h3>
    <span class="pill">mythologie grecque</span>
  </div>

  <div class="card-grid">
    ${MAJORS.slice(0,8).map(card => cardHTML(card)).join("")}
  </div>`;
}

function tirage(){
  return `<div class="draw-zone">
    <h2>Un tirage</h2>
    <p class="note">Pose ta question avant de tirer. Les 78 cartes sont mélangées aléatoirement.</p>

    <textarea id="drawQuestion" placeholder="Ta question…"></textarea>

    <button class="primary" id="drawBtn">Tirer 3 cartes</button>

    <div id="drawn"></div>
  </div>`;
}

function drawCards(){
  const question = document.getElementById("drawQuestion")?.value.trim() || "";
  const shuffled = [...CARDS].sort(() => Math.random() - 0.5).slice(0,3);
  const drawn = document.getElementById("drawn");

  if(!drawn) return;

  drawn.innerHTML = `
    <div class="card-grid">
      ${shuffled.map(card => cardHTML(
        card,
        card[4] === "major" ? "major" : (SUITS[card[6]]?.[0] || "major")
      )).join("")}
    </div>

    <div style="margin-top:18px">
      <textarea id="drawNotes" placeholder="Tes premières impressions, symboles, interprétation…"></textarea>
      <button class="secondary" id="saveDraw">Enregistrer dans le journal</button>
    </div>`;

  document.getElementById("saveDraw").onclick = () => {
    journal.unshift({
      date: new Date().toLocaleString("fr-FR"),
      question,
      cards: shuffled.map(card => card[0]),
      notes: document.getElementById("drawNotes")?.value || ""
    });

    localStorage.setItem("arcanes-journal", JSON.stringify(journal));
    alert("Tirage enregistré dans le journal.");
  };

  document.querySelectorAll("[data-card]").forEach(el => {
    el.onclick = () => showDetail(JSON.parse(decodeURIComponent(el.dataset.card)));
  });
}

function apprendre(){
  return `<section class="hero">
    <span class="pill">Parcours libre</span>
    <h2>Apprendre les 78 cartes</h2>
    <p>Les numérales utilisent une grammaire commune : nombre + enseigne + symboles. Elles ne portent aucun personnage.</p>
  </section>

  <div class="section-title"><h3>Arcanes majeurs</h3></div>
  <div class="card-grid">
    ${MAJORS.map(card => cardHTML(card)).join("")}
  </div>

  <div class="section-title"><h3>Figures de cour</h3></div>
  ${Object.entries(COURTS).map(([suit, rows]) => `
    <h3>${suit}</h3>
    <div class="card-grid">
      ${rows.map(row => cardHTML(
        [row[0],row[1],row[2],row[3],"court","",suit],
        SUITS[suit][0]
      )).join("")}
    </div>
  `).join("")}

  <div class="section-title"><h3>Cartes numérales</h3></div>
  ${Object.keys(SUITS).map(suit => `
    <h3>${suit}</h3>
    <div class="card-grid">
      ${CARDS
        .filter(card => card[4] === "number" && card[6] === suit)
        .map(card => cardHTML(card, SUITS[suit][0]))
        .join("")}
    </div>
  `).join("")}`;
}

function symboles(){
  return `<section class="hero">
    <span class="pill">Grammaire visuelle</span>
    <h2>Bibliothèque symbolique</h2>
    <p>Le nombre donne la direction générale ; l’enseigne donne le domaine ; les symboles donnent les indices.</p>
  </section>

  <div class="symbol-list">
    ${Object.entries(NUMBER_KEYS).map(([number,key]) => `
      <div class="symbol">
        <b>${number === "1" ? "As" : number} — ${key[0]}</b><br>
        <span>${key[1]}</span><br>
        <small>${key[2]}</small>
      </div>
    `).join("")}
  </div>

  <div class="section-title"><h3>Les quatre enseignes</h3></div>

  <div class="symbol-list">
    ${Object.entries(SUITS).map(([suit,meta]) => `
      <div class="symbol">
        <b>${suit}</b><br>
        ${meta[2]}<br>
        <small>Symboles : ${meta[3]}</small>
      </div>
    `).join("")}
  </div>`;
}

function journalView(){
  if(!journal.length){
    return `<div class="empty">
      <h2>Ton journal est vide.</h2>
      <p>Enregistre un tirage pour commencer à construire ton historique personnel.</p>
    </div>`;
  }

  return `<section class="hero">
    <span class="pill">${journal.length} tirage(s)</span>
    <h2>Journal</h2>
    <p>Ton historique conserve tes questions, tes cartes et tes interprétations.</p>
  </section>

  ${journal.map((entry, index) => `
    <article class="tile" style="margin-bottom:12px">
      <strong>${escapeHTML(entry.date)}</strong>
      <span>${escapeHTML(entry.question || "Sans question")}</span>
      <p>${entry.cards.map(escapeHTML).join(" · ")}</p>
      ${entry.notes ? `<small>${escapeHTML(entry.notes)}</small>` : ""}
      <button class="secondary delete-entry" data-index="${index}" style="margin-top:12px">Supprimer</button>
    </article>
  `).join("")}`;
}

function bind(){
  document.querySelectorAll("[data-route]").forEach(button => {
    button.onclick = () => setRoute(button.dataset.route);
  });

  document.querySelectorAll("[data-go]").forEach(element => {
    element.onclick = () => setRoute(element.dataset.go);
  });

  const homeButton = document.getElementById("homeBtn");
  if(homeButton) homeButton.onclick = () => setRoute("home");

  const backButton = document.getElementById("backBtn");
  if(backButton) backButton.onclick = () => setRoute("home");

  const drawButton = document.getElementById("drawBtn");
  if(drawButton) drawButton.onclick = drawCards;

  document.querySelectorAll("[data-card]").forEach(element => {
    element.onclick = () => {
      showDetail(JSON.parse(decodeURIComponent(element.dataset.card)));
    };
  });

  document.querySelectorAll(".delete-entry").forEach(button => {
    button.onclick = () => {
      const index = Number(button.dataset.index);
      if(!Number.isInteger(index)) return;

      journal.splice(index, 1);
      localStorage.setItem("arcanes-journal", JSON.stringify(journal));
      render();
    };
  });
}

function showDetail(card){
  const suit = card[6];
  const cls = card[4] === "major"
    ? "major"
    : (SUITS[suit]?.[0] || "major");

  document.getElementById("screen").innerHTML = `
    <div class="detail">
      ${cardHTML(card, cls)}

      <h2>${escapeHTML(card[0])}</h2>
      <h3>${escapeHTML(card[1])}</h3>
      <p>${escapeHTML(card[3] || "")}</p>

      <div class="symbol-list">
        <div class="symbol">
          <b>Symboles</b><br>
          ${escapeHTML(card[5] || "À compléter")}
        </div>

        ${card[4] === "number" ? `
          <div class="symbol">
            <b>Direction du nombre</b><br>
            ${escapeHTML(NUMBER_KEYS[card[7]]?.[2] || "")}
          </div>
        ` : ""}
      </div>

      <button class="secondary" id="detailBack" style="margin-top:20px">
        ← Retour
      </button>
    </div>`;

  document.getElementById("detailBack").onclick = () => render();
}

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}
