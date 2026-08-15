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

let journal = JSON.parse(localStorage.getItem("arcanes-journal")||"[]");
let route = "home";

function cardHTML(c, cls="major", subtitle=""){
  return `<div class="tarot-card ${cls}" data-card="${encodeURIComponent(JSON.stringify(c))}">
    <div class="frame">
      <div class="card-no">${c[0]}</div>
      <div class="glyph">${c[2]||"✦"}</div>
      <div class="mini-symbols">${(c[5]||"").split(" · ").slice(0,3).map(x=>x[0]).join(" · ")}</div>
      <div class="card-name">${c[1]}</div>
      <div class="card-sub">${subtitle||c[3]||""}</div>
    </div>
  </div>`;
}

function allCards(){
  const arr = MAJORS.map(x=>({...x,kind:"major"}));
  for(const [s,rows] of Object.entries(COURTS)) rows.forEach(x=>arr.push([x[0],x[1],x[2],x[3],"court","",s]));
  for(const [s,meta] of Object.entries(SUITS)){
    for(let n=1;n<=10;n++){
      const k=NUMBER_KEYS[n];
      arr.push([`${n===1?"As":n} de ${s}`,`${k[0]}`,meta[1],`${k[2]} · ${meta[2]}`,"number",`${k[1]} · ${meta[3]}`,s]);
    }
  }
  return arr;
}
const CARDS = allCards();

function setRoute(r){route=r; render(); window.scrollTo(0,0);}
function render(){
  const screen=document.getElementById("screen");
  const title=document.getElementById("pageTitle");
  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.route===route));
  document.getElementById("backBtn").hidden=route==="home";
  title.textContent={home:"Le Temple des Arcanes",tirage:"Tirage",apprendre:"Apprendre",symboles:"Bibliothèque symbolique",journal:"Journal"}[route]||"Le Temple des Arcanes";
  if(route==="home") screen.innerHTML=home();
  if(route==="tirage") screen.innerHTML=tirage();
  if(route==="apprendre") screen.innerHTML=apprendre();
  if(route==="symboles") screen.innerHTML=symboles();
  if(route==="journal") screen.innerHTML=journalView();
  bind();
}

function home(){
 return `<section class="hero">
   <span class="pill">V1 · 78 cartes · Tarot de Marseille réinterprété</span>
   <h2>Un tarot qui s'apprend en le regardant.</h2>
   <p>Une première version privée de ton Temple : tirage, apprentissage, bibliothèque symbolique et journal. Les personnages mythologiques et la structure des cartes suivent les choix définis ensemble.</p>
 </section>
 <div class="grid">
   <div class="tile" data-go="tirage"><strong>✦ Tirer les cartes</strong><span>Un tirage simple pour commencer.</span></div>
   <div class="tile" data-go="apprendre"><strong>◈ Apprendre</strong><span>Explore les 78 cartes et leurs personnages.</span></div>
   <div class="tile" data-go="symboles"><strong>✧ Symboles</strong><span>Comprendre la grammaire des nombres et des enseignes.</span></div>
   <div class="tile" data-go="journal"><strong>☽ Journal</strong><span>Conserver tes tirages et tes interprétations.</span></div>
 </div>
 <div class="section-title"><h3>Les 22 majeurs</h3><span class="pill">mythologie grecque</span></div>
 <div class="card-grid">${MAJORS.slice(0,8).map(c=>cardHTML(c)).join("")}</div>`;
}

function tirage(){
 return `<div class="draw-zone">
   <h2>Un tirage</h2>
   <p class="note">Les cartes sont mélangées aléatoirement. Pour l'instant, cette V1 propose un tirage de trois cartes.</p>
   <button class="primary" id="drawBtn">Tirer 3 cartes</button>
   <div id="drawn"></div>
 </div>`;
}

function drawCards(){
 const pool=CARDS.filter(c=>c[4]!=="number"); // V1: majeurs + cours, numérales bientôt enrichies graphiquement
 const shuffled=[...pool].sort(()=>Math.random()-.5).slice(0,3);
 const drawn=document.getElementById("drawn");
 drawn.innerHTML=`<div class="card-grid">${shuffled.map(c=>cardHTML(c,c[4]==="major"?"major":SUITS[c[6]]?.[0]||"major")).join("")}</div>
 <div style="margin-top:18px"><button class="secondary" id="saveDraw">Enregistrer ce tirage</button></div>`;
 document.getElementById("saveDraw").onclick=()=>{
   const question=prompt("Question du tirage (facultatif) :")||"";
   journal.unshift({date:new Date().toLocaleString("fr-FR"),question,cards:shuffled.map(c=>c[0]),notes:""});
   localStorage.setItem("arcanes-journal",JSON.stringify(journal));
   alert("Tirage enregistré dans le journal.");
 };
}

function apprendre(){
 return `<section class="hero"><span class="pill">Parcours libre</span><h2>Apprendre les 78 cartes</h2><p>Commence par les majeurs, puis les familles et les figures de cour. Les cartes numérales utilisent une grammaire commune : nombre + élément + symboles.</p></section>
 <div class="section-title"><h3>Arcanes majeurs</h3></div>
 <div class="card-grid">${MAJORS.map(c=>cardHTML(c)).join("")}</div>
 <div class="section-title"><h3>Figures de cour</h3></div>
 ${Object.entries(COURTS).map(([s,rows])=>`<h3>${s}</h3><div class="card-grid">${rows.map(x=>cardHTML([x[0],x[1],x[2],x[3],"court","",s],SUITS[s][0])).join("")}</div>`).join("")}`;
}

function symboles(){
 return `<section class="hero"><span class="pill">Grammaire visuelle</span><h2>Bibliothèque symbolique</h2><p>Le nombre donne la direction générale ; l'enseigne donne le domaine ; les symboles donnent les indices permettant d'interpréter la carte.</p></section>
 <div class="symbol-list">${Object.entries(NUMBER_KEYS).map(([n,k])=>`<div class="symbol"><b>${n==="1"?"As":n} — ${k[0]}</b><br><span>${k[1]}</span><br><small>${k[2]}</small></div>`).join("")}</div>
 <div class="section-title"><h3>Les quatre enseignes</h3></div>
 <div class="symbol-list">${Object.entries(SUITS).map(([s,m])=>`<div class="symbol"><b>${s}</b><br>${m[2]}<br><small>Symboles : ${m[3]}</small></div>`).join("")}</div>`;
}

function journalView(){
 if(!journal.length) return `<div class="empty"><h2>Ton journal est vide.</h2><p>Enregistre un tirage pour commencer à construire ton historique personnel.</p></div>`;
 return `<section class="hero"><span class="pill">${journal.length} tirage(s)</span><h2>Journal</h2></section>
 ${journal.map((j,i)=>`<article class="tile" style="margin-bottom:12px"><strong>${j.date}</strong><span>${j.question||"Sans question"}</span><p>${j.cards.join(" · ")}</p></article>`).join("")}`;
}

function bind(){
 document.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>setRoute(b.dataset.route));
 document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>setRoute(b.dataset.go));
 document.getElementById("homeBtn").onclick=()=>setRoute("home");
 document.getElementById("backBtn").onclick=()=>setRoute("home");
 const draw=document.getElementById("drawBtn"); if(draw) draw.onclick=drawCards;
 document.querySelectorAll("[data-card]").forEach(el=>el.onclick=()=>{
   const c=JSON.parse(decodeURIComponent(el.dataset.card));
   showDetail(c);
 });
}
function showDetail(c){
 const suit=c[6], cls=c[4]==="major"?"major":(SUITS[suit]?.[0]||"major");
 document.getElementById("screen").innerHTML=`<div class="detail">
   ${cardHTML(c,cls)}
   <h2>${c[0]}</h2>
   <h3>${c[1]}</h3>
   <p>${c[3]||""}</p>
   <div class="symbol-list">
     <div class="symbol"><b>Symboles</b><br>${c[5]||"À compléter"}</div>
     ${c[4]==="number"?`<div class="symbol"><b>Direction du nombre</b><br>${NUMBER_KEYS[Object.keys(NUMBER_KEYS).find(n=>`${n===1?"As":n} de ${suit}`===c[0])]?.[2]||""}</div>`:""}
   </div>
   <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
 </div>`;
 document.getElementById("detailBack").onclick=()=>render();
}
if("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
render();
