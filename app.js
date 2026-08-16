/* ===================== DONNÉES : ARCANES MAJEURS (correspondances verrouillées) ===================== */

const MAJORS = [
["Le Mat","Dionysos","🍇","Liberté · instinct · départ · lâcher-prise","major","lierre · vigne · panthère · sac de voyage"],
["I — Le Bateleur","Hermès","☿","Commencement · potentiel · habileté","major","caducée · quatre enseignes · table · sac de voyage"],
["II — La Papesse","Métis","📖","Savoir caché · intuition · connaissance","major","voile · colonnes · livre · lune"],
["III — L'Impératrice","Héra","🦚","Souveraineté · création · fécondité","major","paon · couronne · sceptre · grenade"],
["IV — L'Empereur","Zeus","⚡","Autorité · structure · pouvoir","major","foudre · aigle · sceptre · trône"],
["V — Le Pape","Chiron","🏹","Transmission · enseignement · initiation","major","bâton · disciples · blessure · sagesse"],
["VI — L'Amoureux","Éros","🏹","Choix · désir · attraction","major","arc · flèche · deux chemins · coupe"],
["VII — Le Chariot","Apollon","☀","Victoire · maîtrise · mouvement","major","char solaire · laurier · lyre · chevaux"],
["VIII — La Justice","Thémis","⚖","Équilibre · vérité · décision","major","balance · épée · couronne · colonnes"],
["IX — L'Hermite","Déméter","🌾","Quête · solitude · patience","major","épis · lanterne · chemin · blé"],
["X — La Roue de Fortune","Tyché","☸","Cycles · destin · changement","major","roue · corne d'abondance · chute · sommet"],
["XI — La Force","Héraclès","🦁","Maîtrise · courage · puissance intérieure","major","lion · peau de lion · massue · mains nues"],
["XII — Le Pendu","Prométhée","🔥","Sacrifice · suspension · autre regard","major","chaînes · feu · rocher · suspension"],
["XIII — L'Arcane sans nom","Hadès","☠","Transformation · fin · passage","major","faux · grenade · cyprès · monde souterrain"],
["XIV — Tempérance","Iris","🌈","Équilibre · circulation · médiation","major","deux vases · ailes · arc-en-ciel · eau"],
["XV — Le Diable","Pan","🐐","Instinct · désir · attachement","major","cornes · flûte · chaînes · vigne"],
["XVI — La Maison-Dieu","Poséidon","🔱","Rupture · effondrement · libération","major","tour · trident · vagues · éclair"],
["XVII — L'Étoile","Hécate","✦","Espoir · orientation · intuition","major","étoiles · torches · chiens · carrefour"],
["XVIII — La Lune","Séléné","☾","Inconscient · intuition · incertitude","major","lune · deux tours · chien · eau"],
["XIX — Le Soleil","Hélios","☀","Clarté · joie · vitalité","major","soleil · char solaire · rayons · laurier"],
["XX — Le Jugement","Minos","⚖","Révélation · appel · bilan","major","balance · trompette · âmes · lumière"],
["XXI — Le Monde","Gaïa","🌿","Accomplissement · totalité · unité","major","mandorle · racines · monde vivant · quatre figures"]
];

// Fiches enrichies : lecture Tarot de Marseille + éclairage mythologique — pour la carte du jour et le détail des arcanes.
const CARD_LORE = {
"Le Mat": {
  marseille:"Dans la tradition du Tarot de Marseille, le Mat est le seul arcane sans numéro fixe : il erre hors de la séquence, symbole de la liberté totale, de l'innocence et du risque de la démesure quand aucun repère ne guide plus le pas.",
  myth:"Dionysos incarne cette même sortie du cadre : dieu du vin et de l'extase sacrée, il voyage accompagné d'une panthère, affranchi des conventions sociales. Sa légende rappelle que la liberté sans mesure peut aussi bien libérer que faire perdre pied — le Mat est une invitation, pas un aboutissement."
},
"I — Le Bateleur": {
  marseille:"Sur la table du Bateleur reposent les quatre objets des enseignes à venir (bâton, coupe, épée, denier) : tout est en germe, rien n'est encore joué. C'est l'arcane du potentiel et de l'habileté à mettre en mouvement.",
  myth:"Hermès, messager rusé et maître du commerce comme du langage, est le passeur par excellence entre les mondes des dieux, des hommes et des morts. Le Bateleur, comme lui, ne crée rien de nouveau : il révèle ce qui est déjà possible et sait le mettre en scène."
},
"II — La Papesse": {
  marseille:"Assise entre deux colonnes, un livre fermé sur les genoux, la Papesse garde un savoir qui ne se dévoile pas de force : intuition, retenue, connaissance intérieure qui agit sans se montrer.",
  myth:"Métis, titanide de la ruse et de la sagesse pratique, fut avalée par Zeus qui craignait sa descendance — mais son intelligence continua d'agir depuis l'intérieur même du dieu. Un savoir caché n'est pas un savoir inactif."
},
"III — L'Impératrice": {
  marseille:"L'Impératrice tient sceptre et écu : souveraineté, fécondité, pouvoir de faire grandir ce qui a été semé. C'est l'arcane de la création assumée avec autorité.",
  myth:"Héra, reine des dieux et protectrice du mariage, incarne une souveraineté légitime — non pas conquise par la force, mais issue d'un statut assumé pleinement, avec ses exigences comme ses privilèges."
},
"IV — L'Empereur": {
  marseille:"De profil, jambes croisées, l'Empereur pose une structure stable : autorité, ordre établi, pouvoir qui ne se remet pas en question à chaque instant.",
  myth:"Zeus, roi des dieux et maître de la foudre, garantit l'ordre cosmique après avoir renversé les Titans. Son autorité n'est pas arbitraire : elle est la condition pour que le monde tienne debout."
},
"V — Le Pape": {
  marseille:"Le Pape bénit deux disciples agenouillés : transmission, enseignement, passage initiatique d'un savoir d'un être à un autre.",
  myth:"Chiron, centaure sage — et blessé d'une plaie qui ne guérira jamais — fut le précepteur d'Achille, de Jason et de bien d'autres héros. Sa légende dit que transmettre ne demande pas d'être soi-même intact : parfois, c'est précisément la blessure qui rend l'enseignement juste."
},
"VI — L'Amoureux": {
  marseille:"Un homme hésite entre deux figures féminines pendant qu'un archer vise depuis le ciel : c'est l'arcane du choix, du désir qui échappe en partie à la raison.",
  myth:"Éros, dieu du désir irrésistible, décoche ses flèches sans toujours consulter la volonté de ceux qu'il touche. L'attraction précède souvent la décision consciente — l'Amoureux rappelle qu'un choix vécu comme libre est aussi guidé par des forces qu'on ne maîtrise pas entièrement."
},
"VII — Le Chariot": {
  marseille:"Le conducteur du Chariot avance en maîtrisant deux forces opposées attelées ensemble : victoire, mais victoire obtenue par la maîtrise, pas par la force brute.",
  myth:"Apollon, dieu de la lumière et de la mesure, conduit chaque jour son char à travers le ciel avec une régularité parfaite. Sa victoire n'est jamais un coup d'éclat isolé : c'est une discipline répétée qui finit par ressembler à une évidence."
},
"VIII — La Justice": {
  marseille:"Balance dans une main, épée dans l'autre : la Justice pèse avant de trancher. C'est l'arcane de la décision fondée sur un examen exact, pas sur l'humeur du moment.",
  myth:"Thémis, titanide de la loi divine, portait déjà la balance avant même l'avènement des dieux de l'Olympe — la justice comme ordre premier du monde, antérieur à toute autorité particulière."
},
"IX — L'Hermite": {
  marseille:"Seul, une lanterne à la main, l'Hermite avance à son propre rythme : patience, retrait volontaire, quête qui ne se précipite pas.",
  myth:"Déméter, déesse des moissons, erre sur la terre à la recherche de sa fille Perséphone disparue, refusant toute récolte tant qu'elle ne l'a pas retrouvée. Sa patience obstinée façonne littéralement les saisons — certaines attentes créent le temps lui-même plutôt que de simplement le traverser."
},
"X — La Roue de Fortune": {
  marseille:"La Roue tourne, portant certains vers le haut et d'autres vers le bas, sans considération pour le mérite : cycles, hasard, retournements de situation.",
  myth:"Tyché, déesse de la fortune, distribue chance et malchance sans logique apparente. Sa roue rappelle qu'aucune position, haute ou basse, n'est définitivement acquise."
},
"XI — La Force": {
  marseille:"Une femme ouvre sans effort apparent la gueule d'un lion : la vraie force de cet arcane n'est pas musculaire, elle est intérieure et maîtrisée.",
  myth:"Héraclès dompte le lion de Némée à mains nues, sans arme, dans le premier de ses douze travaux. La légende retient moins la violence du combat que la maîtrise qui en résulte."
},
"XII — Le Pendu": {
  marseille:"Suspendu la tête en bas, le Pendu semble immobilisé — mais cette suspension ouvre un autre regard sur ce qui l'entoure : sacrifice volontaire, pas simple malheur.",
  myth:"Prométhée, enchaîné à un rocher pour avoir donné le feu aux hommes, accepte une punition éternelle par choix assumé. Son sacrifice change durablement la perspective de toute l'humanité — la position basse n'empêche pas d'être à l'origine d'un basculement."
},
"XIII — L'Arcane sans nom": {
  marseille:"Sans titre inscrit, cette carte fauche des formes déjà mortes d'où repoussent de nouvelles pousses : fin nécessaire, jamais destruction gratuite.",
  myth:"Hadès, dieu du monde souterrain, ne règne pas par cruauté mais gère le passage obligé de toute chose vers une autre forme d'existence. Ce qu'il retient n'est jamais perdu, seulement transformé ailleurs."
},
"XIV — Tempérance": {
  marseille:"Un ange verse un liquide d'un vase à l'autre sans en perdre une goutte : équilibre, dosage, circulation entre deux états qui doivent apprendre à se répondre.",
  myth:"Iris, messagère arc-en-ciel entre l'Olympe et la Terre, incarne littéralement ce passage fluide entre deux mondes — ni l'un ni l'autre seul ne suffit, l'équilibre est dans le mouvement entre les deux."
},
"XV — Le Diable": {
  marseille:"Deux figures enchaînées se tiennent devant le Diable, mais leurs chaînes sont lâches — l'attachement de cet arcane est souvent plus consenti qu'il n'y paraît.",
  myth:"Pan, dieu à moitié bouc, incarne l'instinct animal non policé par la raison. Il n'est ni bon ni mauvais en soi : il rappelle simplement ce qui, en nous, échappe au contrôle rationnel et mérite d'être reconnu plutôt que nié."
},
"XVI — La Maison-Dieu": {
  marseille:"La foudre frappe une tour et en fait tomber les occupants : effondrement brutal d'une structure qui semblait pourtant solide.",
  myth:"Poséidon, dieu des séismes autant que de la mer, peut faire s'écrouler en un instant ce que les hommes ont mis des années à bâtir. Sa colère est rapide — mais elle libère aussi le terrain pour reconstruire autrement."
},
"XVII — L'Étoile": {
  marseille:"Une femme verse de l'eau sous un ciel étoilé : espoir retrouvé après l'épreuve, orientation silencieuse plutôt que certitude bruyante.",
  myth:"Hécate, déesse des carrefours, porte la torche qui guide dans l'obscurité sans jamais imposer le chemin à suivre. Elle éclaire ; elle ne décide pas à la place de celui qui marche."
},
"XVIII — La Lune": {
  marseille:"Deux tours encadrent un chemin sous une lune qui déforme les distances : incertitude, inconscient, ce qui n'est pas encore tout à fait clair.",
  myth:"Séléné, déesse de la lune, éclaire la nuit d'une lumière changeante qui révèle et trompe à la fois. Cet arcane invite à avancer malgré le flou plutôt que d'attendre une clarté totale avant de bouger."
},
"XIX — Le Soleil": {
  marseille:"Deux enfants jouent sous un soleil éclatant : clarté retrouvée, joie simple, vérité qui n'a plus besoin de se cacher.",
  myth:"Hélios, dieu solaire, voit tout depuis son char qui traverse le ciel chaque jour. Rien ne peut rester longtemps dissimulé sous une lumière aussi directe."
},
"XX — Le Jugement": {
  marseille:"Un ange sonne de la trompette et des figures se relèvent de leur tombeau : bilan, appel qui ne peut être ignoré, remise à sa juste place.",
  myth:"Minos, juge des morts aux Enfers, pèse les actes de chacun sans complaisance ni cruauté gratuite. Le jugement, ici, n'est pas une punition : c'est une clarification attendue depuis longtemps."
},
"XXI — Le Monde": {
  marseille:"Une figure danse au centre d'une couronne végétale entourée des quatre créatures : accomplissement, totalité, la boucle enfin bouclée.",
  myth:"Gaïa, déesse primordiale de la Terre et mère de toutes choses, est l'aboutissement qui contient et intègre tout ce qui a précédé plutôt que de l'exclure. Le Monde n'efface rien du chemin parcouru — il le rassemble."
}
};

// Images (base64) — les 6 premières cartes ont une illustration ; les autres restent en glyphe pour le moment.
const CARD_IMAGES = {};
Object.assign(CARD_IMAGES, {
  "Le Mat": "assets/card-0-lemat.jpg",
  "I — Le Bateleur": "assets/card-1-bateleur.jpg",
  "II — La Papesse": "assets/card-2-papesse.jpg",
  "III — L'Impératrice": "assets/card-3-imperatrice.jpg",
  "IV — L'Empereur": "assets/card-4-empereur.jpg",
  "VI — L'Amoureux": "assets/card-6-amoureux.jpg",
});

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
["Valet d'Épées","Zéphyr","🍃","Curiosité · rapidité · esprit vif"],
["Cavalier d'Épées","Bellérophon","🐎","Action · courage · confrontation"],
["Reine d'Épées","Athéna","🦉","Discernement · stratégie · intelligence"],
["Roi d'Épées","Éole","🌬","Autorité · contrôle · maîtrise des forces de l'air"]
],
"Deniers":[
["Valet de Deniers","Chloris","🌸","Germination · potentiel · croissance"],
["Cavalier de Deniers","Triptolème","🌾","Travail · transmission · agriculture"],
["Reine de Deniers","Perséphone","🌺","Cycles · fertilité · renaissance"],
["Roi de Deniers","Ploutos","🪙","Abondance · richesse · prospérité"]
]
};

const SUITS = {
"Bâtons":["wands","🔥","Feu · action · volonté","soleil · flamme · vigne · bourgeon"],
"Coupes":["cups","💧","Eau · émotion · relation","source · rivière · vague · miroir"],
"Épées":["swords","🌬","Air · pensée · décision","vent · souffle · plume · nuage"],
"Deniers":["coins","🌿","Terre · matière · croissance","racine · pierre · sol · montagne"]
};

const NUMBER_KEYS = {
1:["origine","graine · bourgeon · rayon · source","potentiel · naissance"],
2:["dualité","miroir · paire · deux chemins · portes opposées","relation · choix · polarité"],
3:["expansion","triangle · fleur ouverte · trois branches","création · développement"],
4:["structure","carré · quatre pierres · quatre directions","stabilité · ordre · sécurité"],
5:["rupture","fissure · branche cassée · élément déséquilibré","tension · épreuve · changement"],
6:["harmonie","symétrie · échange · deux éléments qui se répondent","rééquilibrage · circulation · accord"],
7:["recherche","étoile isolée · montagne · chemin ascendant","quête · dépassement · réflexion"],
8:["maîtrise","roue · spirale · mouvement circulaire","puissance contrôlée · organisation"],
9:["maturation","fruit mûr · arbre chargé · lune presque pleine","accomplissement intérieur"],
10:["cycle accompli","cercle fermé · récolte · graine prête à être replantée","aboutissement · transmission"]
};

const DRAW_POSITIONS = ["I","II","III"]; // discrets, sans intitulé imposé

/* ===================== BIBLIOTHÈQUE SYMBOLIQUE ÉTOFFÉE ===================== */
// id -> {icon, label, category, desc, links: [ids de divinités]}

const SYMBOL_LIBRARY = {
  // Lieux & passages
  "porte":{icon:"🚪",label:"Porte",category:"Lieux & passages",desc:"Seuil, choix à faire, passage d'un état à un autre.",links:[]},
  "chemin":{icon:"🛤",label:"Chemin",category:"Lieux & passages",desc:"Évolution en cours, quête, direction prise plutôt qu'imposée.",links:[]},
  "pont":{icon:"🌉",label:"Pont",category:"Lieux & passages",desc:"Transition, lien construit entre deux états qui semblaient séparés.",links:[]},
  "grotte":{icon:"🕳",label:"Grotte",category:"Lieux & passages",desc:"Inconscient, retrait nécessaire, initiation loin du regard des autres.",links:[]},
  "montagne":{icon:"⛰",label:"Montagne",category:"Lieux & passages",desc:"Épreuve, élévation progressive, objectif qui se mérite.",links:[]},
  "forêt":{icon:"🌲",label:"Forêt",category:"Lieux & passages",desc:"Inconnu, instinct, risque de s'égarer avant de retrouver son chemin.",links:[]},
  "mer":{icon:"🌊",label:"Mer",category:"Lieux & passages",desc:"Inconscient, immensité, départ vers un ailleurs incertain.",links:["poséidon","nérée"]},
  "rivière":{icon:"🏞",label:"Rivière",category:"Lieux & passages",desc:"Passage, changement continu, ce qui circule sans jamais s'arrêter.",links:[]},
  "temple":{icon:"🏛",label:"Temple",category:"Lieux & passages",desc:"Connaissance sacrée, initiation, seuil entre le profane et le sacré.",links:[]},
  "monde souterrain":{icon:"⚱",label:"Enfer / monde souterrain",category:"Lieux & passages",desc:"Transformation profonde, mort symbolique, vérité qui ne peut plus rester cachée.",links:["hadès","perséphone"]},

  // Mythologie — attributs et divinités
  "caducée":{icon:"⚕",label:"Caducée",category:"Mythologie",desc:"Attribut d'Hermès : médiation, circulation, communication entre des mondes séparés.",links:["hermès"]},
  "chouette":{icon:"🦉",label:"Chouette",category:"Mythologie",desc:"Attribut d'Athéna : sagesse, observation, vision claire dans l'obscurité.",links:["athéna"]},
  "paon":{icon:"🦚",label:"Paon",category:"Mythologie",desc:"Attribut d'Héra : beauté, vigilance, souveraineté légitime.",links:["héra"]},
  "foudre":{icon:"⚡",label:"Foudre",category:"Mythologie",desc:"Attribut de Zeus : autorité, révélation soudaine, jugement qui s'impose de lui-même.",links:["zeus"]},
  "trident":{icon:"🔱",label:"Trident",category:"Mythologie",desc:"Attribut de Poséidon : puissance sur les forces naturelles instables — mer, séismes, émotions profondes.",links:["poséidon"]},
  "lyre":{icon:"🎵",label:"Lyre",category:"Mythologie",desc:"Attribut d'Apollon : harmonie, vérité transmise par la beauté plutôt qu'imposée.",links:["apollon"]},
  "arc":{icon:"🏹",label:"Arc",category:"Mythologie",desc:"Attribut d'Éros : intention, concentration, désir qui vise juste sans toujours consulter la raison.",links:["éros"]},
  "torches":{icon:"🔥",label:"Torches",category:"Mythologie",desc:"Attribut d'Hécate : illumination, guidance dans l'obscurité sans jamais imposer le chemin.",links:["hécate"]},
  "lion":{icon:"🦁",label:"Lion",category:"Mythologie",desc:"Lié à Héraclès : courage, force domptée sans violence gratuite.",links:["héraclès"]},
  "vigne":{icon:"🍇",label:"Vigne",category:"Mythologie",desc:"Attribut de Dionysos : plaisir, transformation, abondance instinctive.",links:["dionysos"]},
  "grenade":{icon:"🔴",label:"Grenade",category:"Mythologie",desc:"Le fruit aux innombrables graines : fertilité, abondance, cycle, attachement, ce qui relie au monde souterrain — associée à Perséphone et Hadès.",links:["perséphone","hadès"]},
  "épis":{icon:"🌾",label:"Épis de blé",category:"Mythologie",desc:"Attribut de Déméter : récolte, travail, nourriture, cycle des saisons.",links:["déméter"]},
  "char solaire":{icon:"☀",label:"Char solaire",category:"Mythologie",desc:"Attribut d'Hélios (et repris par Apollon) : clarté, trajectoire réglée, rien ne peut rester caché sous cette lumière.",links:["hélios","apollon"]},
  "arc-en-ciel":{icon:"🌈",label:"Arc-en-ciel",category:"Mythologie",desc:"Attribut d'Iris : médiation, passage, réconciliation entre deux états.",links:["iris"]},
  "flûte":{icon:"🎶",label:"Flûte",category:"Mythologie",desc:"Attribut de Pan : instinct non policé par la raison, appel de la nature brute.",links:["pan"]},
  "balance":{icon:"⚖",label:"Balance",category:"Mythologie",desc:"Attribut de Thémis (et de Minos au Jugement) : équilibre, justice, mesure exacte avant toute décision.",links:["thémis","minos"]},
  "ailes":{icon:"🕊",label:"Ailes",category:"Mythologie",desc:"Selon le contexte : Niké (victoire), Hermès (rapidité, message) ou Éros (désir qui s'envole). Toujours un mouvement qui échappe à la pesanteur ordinaire.",links:["hermès","éros"]},

  // Objets classiques du Tarot
  "bâton":{icon:"🪄",label:"Bâton",category:"Objets",desc:"Enseigne liée au feu : volonté, énergie, croissance par l'action.",links:[]},
  "coupe":{icon:"🍷",label:"Coupe",category:"Objets",desc:"Enseigne liée à l'eau : émotion, réceptivité, relation qui se reçoit et se partage.",links:[]},
  "épée":{icon:"⚔",label:"Épée",category:"Objets",desc:"Enseigne liée à l'air : pensée, décision, conflit — et la vérité qui en découle.",links:[]},
  "denier":{icon:"🪙",label:"Denier",category:"Objets",desc:"Enseigne liée à la terre : matière, travail, ressource, valeur concrète.",links:[]},

  // Objets mythologiques
  "couronne":{icon:"👑",label:"Couronne",category:"Objets mythologiques",desc:"Autorité légitime, accomplissement, souveraineté assumée avec dignité.",links:["héra"]},
  "sceptre":{icon:"🔱",label:"Sceptre",category:"Objets mythologiques",desc:"Pouvoir stable, commandement exercé avec constance plutôt qu'imposé par la force.",links:["zeus","héra"]},
  "clé":{icon:"🗝",label:"Clé",category:"Objets mythologiques",desc:"Accès, connaissance réservée, passage qui ne s'ouvre qu'à qui sait où chercher.",links:[]},
  "lanterne":{icon:"🏮",label:"Lanterne",category:"Objets mythologiques",desc:"Recherche, lumière intérieure portée dans l'obscurité plutôt que réponse immédiate.",links:["déméter"]},
  "torche":{icon:"🔦",label:"Torche",category:"Objets mythologiques",desc:"Illumination, connaissance transmise, guidance dans l'incertitude.",links:["hécate"]},
  "flèche":{icon:"🎯",label:"Flèche",category:"Objets mythologiques",desc:"Direction précise, volonté qui vise, conséquence qui suit le tir.",links:["éros"]},
  "miroir":{icon:"🪞",label:"Miroir",category:"Objets mythologiques",desc:"Introspection, vérité renvoyée, perception de soi parfois inconfortable.",links:[]},
  "voile":{icon:"🧣",label:"Voile",category:"Objets mythologiques",desc:"Secret, connaissance cachée, frontière entre ce qui se montre et ce qui se protège.",links:["métis"]},
  "chaîne":{icon:"⛓",label:"Chaîne",category:"Objets mythologiques",desc:"Attachement, dépendance, lien — la question est toujours de savoir s'il enferme ou s'il peut être dénoué.",links:["pan","prométhée"]},
  "roue":{icon:"☸",label:"Roue",category:"Objets mythologiques",desc:"Cycle, changement, destin qui tourne sans considération pour le mérite.",links:["tyché"]},
  "char":{icon:"🏇",label:"Char",category:"Objets mythologiques",desc:"Direction, maîtrise, progression réglée vers un but choisi.",links:["apollon","hélios"]},

  // Animaux
  "aigle":{icon:"🦅",label:"Aigle",category:"Animaux",desc:"Hauteur de vue, pouvoir, vision d'ensemble — lié à Zeus.",links:["zeus"]},
  "serpent":{icon:"🐍",label:"Serpent",category:"Animaux",desc:"Transformation, connaissance, guérison, lien avec le monde souterrain.",links:[]},
  "chien":{icon:"🐕",label:"Chien",category:"Animaux",desc:"Gardien des seuils, protection, instinct fidèle — lié à Hécate.",links:["hécate"]},
  "cheval":{icon:"🐎",label:"Cheval",category:"Animaux",desc:"Mouvement, liberté, puissance mise en marche.",links:[]},
  "pégase":{icon:"🦄",label:"Pégase",category:"Animaux",desc:"Inspiration, élévation, maîtrise d'une force extraordinaire — monture de Bellérophon.",links:["bellérophon"]},
  "dauphin":{icon:"🐬",label:"Dauphin",category:"Animaux",desc:"Guidance, mer, protection pendant la traversée.",links:[]},
  "colombe":{icon:"🕊",label:"Colombe",category:"Animaux",desc:"Amour, paix — liée à Aphrodite.",links:["aphrodite"]},
  "corbeau":{icon:"🐦‍⬛",label:"Corbeau",category:"Animaux",desc:"Présage, connaissance du monde invisible.",links:[]},
  "abeille":{icon:"🐝",label:"Abeille",category:"Animaux",desc:"Travail, organisation collective, abondance construite patiemment.",links:[]},
  "papillon":{icon:"🦋",label:"Papillon",category:"Animaux",desc:"Transformation, âme, métamorphose accomplie.",links:[]},
  "cerf":{icon:"🦌",label:"Cerf",category:"Animaux",desc:"Nature, intuition, passage entre deux mondes.",links:[]},

  // Plantes & végétaux
  "laurier":{icon:"🌿",label:"Laurier",category:"Plantes",desc:"Victoire, gloire, accomplissement mérité après l'effort.",links:["apollon"]},
  "olivier":{icon:"🫒",label:"Olivier",category:"Plantes",desc:"Paix, sagesse, prospérité durable.",links:[]},
  "blé":{icon:"🌾",label:"Blé",category:"Plantes",desc:"Récolte, travail, nourriture, cycle des saisons.",links:["déméter"]},
  "cyprès":{icon:"🌲",label:"Cyprès",category:"Plantes",desc:"Mort, mémoire, passage — arbre funéraire qui reste vert toute l'année.",links:["hadès"]},
  "rose":{icon:"🌹",label:"Rose",category:"Plantes",desc:"Amour, beauté, désir — et la vulnérabilité qui va avec.",links:["aphrodite"]},
  "myrte":{icon:"🌸",label:"Myrte",category:"Plantes",desc:"Amour, mariage — liée à Aphrodite.",links:["aphrodite"]},
  "lierre":{icon:"🍃",label:"Lierre",category:"Plantes",desc:"Attachement, immortalité — lié à Dionysos.",links:["dionysos"]},
  "lotus":{icon:"🪷",label:"Lotus",category:"Plantes",desc:"Émergence, purification, renaissance depuis les eaux troubles.",links:[]},
  "pavot":{icon:"🌺",label:"Pavot",category:"Plantes",desc:"Sommeil, oubli, rêve — ce qui apaise mais peut aussi endormir la vigilance.",links:[]},
  "crocus":{icon:"🌼",label:"Fleur de crocus",category:"Plantes",desc:"Renouveau, printemps, transformation qui recommence.",links:[]},

  // Fruits & graines
  "raisin":{icon:"🍇",label:"Raisin",category:"Fruits & graines",desc:"Abondance, plaisir partagé, transformation par la fermentation.",links:["dionysos"]},
  "figue":{icon:"🫐",label:"Figue",category:"Fruits & graines",desc:"Fécondité douce, plaisir simple, maturité assumée.",links:[]},
  "graine":{icon:"🌱",label:"Graine",category:"Fruits & graines",desc:"Potentiel pur, ce qui n'a pas encore germé mais porte déjà toute la forme à venir.",links:[]},

  // Éléments
  "feu":{icon:"🔥",label:"Feu",category:"Éléments",desc:"Flamme, étincelle, soleil, fumée : action, volonté, élan.",links:[]},
  "eau":{icon:"💧",label:"Eau",category:"Éléments",desc:"Source, rivière, vague, pluie, miroir : émotion, relation, ce qui circule.",links:[]},
  "air":{icon:"🌬",label:"Air",category:"Éléments",desc:"Vent, souffle, plume, nuage : pensée, décision, clarté mentale.",links:[]},
  "terre":{icon:"🌿",label:"Terre",category:"Éléments",desc:"Racine, pierre, sol, montagne : matière, croissance, incarnation concrète.",links:[]},

  // Astres & phénomènes
  "soleil":{icon:"☀",label:"Soleil",category:"Astres & phénomènes",desc:"Clarté, conscience, vitalité, vérité qui n'a plus besoin de se cacher.",links:["hélios"]},
  "lune":{icon:"🌙",label:"Lune",category:"Astres & phénomènes",desc:"Inconscient, intuition, cycles, incertitude qui n'empêche pas d'avancer.",links:["séléné","métis"]},
  "étoiles":{icon:"✦",label:"Étoile",category:"Astres & phénomènes",desc:"Orientation, espoir, inspiration retrouvée après l'épreuve.",links:["hécate"]},
  "aurore":{icon:"🌅",label:"Aurore",category:"Astres & phénomènes",desc:"Commencement, renaissance, ce qui redémarre après l'obscurité.",links:[]},
  "éclipse":{icon:"🌑",label:"Éclipse",category:"Astres & phénomènes",desc:"Obscurcissement temporaire, transition, révélation qui attend son heure.",links:[]},
  "éclair":{icon:"⚡",label:"Éclair",category:"Astres & phénomènes",desc:"Révélation brutale, rupture soudaine, énergie qui ne prévient pas.",links:["zeus","poséidon"]},
};

// Alias : formes alternatives pointant vers la même fiche
const SYMBOL_ALIASES = {
  "deux vases":"eau","vases":"eau","panthère":"vigne","sac de voyage":"chemin","table":"caducée",
  "colonnes":"voile","livre":"voile","cornes":"flûte","peau de lion":"lion","massue":"lion","mains nues":"lion",
  "rocher":"chaîne","suspension":"chaîne","faux":"monde souterrain","tour":"chaîne","vagues":"mer",
  "chien":"chien","carrefour":"étoiles","deux tours":"lune","rayons":"soleil","âmes":"balance",
  "trompette":"balance","mandorle":"terre","racines":"terre","monde vivant":"terre","quatre figures":"terre",
  "quatre enseignes":"caducée","disciples":"bâton","blessure":"bâton","sagesse":"bâton",
  "chevaux":"char","source":"eau","rivière":"eau","pluie":"eau","miroir":"eau",
  "vent":"air","souffle":"air","plume":"air","nuage":"air","racine":"terre","pierre":"terre","sol":"terre","montagne":"montagne",
};

function resolveSymbolId(raw){
  const key = raw.trim().toLowerCase();
  if(SYMBOL_LIBRARY[key]) return key;
  if(SYMBOL_ALIASES[key] && SYMBOL_LIBRARY[SYMBOL_ALIASES[key]]) return SYMBOL_ALIASES[key];
  return null;
}

// Notes mythologiques courtes (pour les liens depuis les fiches symbole)
const DEITY_NOTES = {
  "dionysos":"Dieu de la vigne, de l'ivresse sacrée et de la métamorphose.",
  "hermès":"Messager des dieux, passeur rusé entre les mondes.",
  "métis":"Titanide de la ruse et de la sagesse pratique.",
  "héra":"Reine des dieux, protectrice du mariage et de la souveraineté légitime.",
  "zeus":"Roi des dieux, maître de la foudre et garant de l'ordre cosmique.",
  "chiron":"Centaure sage, précepteur de nombreux héros malgré une blessure incurable.",
  "éros":"Dieu du désir et de l'attraction irrésistible.",
  "apollon":"Dieu de la lumière, des arts et de la vérité — conducteur du char solaire.",
  "thémis":"Titanide de la loi divine et de la justice, antérieure aux dieux de l'Olympe.",
  "déméter":"Déesse des moissons, mère de Perséphone, à l'origine des saisons.",
  "tyché":"Déesse de la fortune et du hasard.",
  "héraclès":"Héros de la force maîtrisée à travers ses douze travaux.",
  "prométhée":"Titan qui donna le feu aux hommes et fut puni pour ce don.",
  "hadès":"Dieu du monde souterrain, gardien du passage vers une autre existence.",
  "perséphone":"Reine des Enfers une partie de l'année, fille de Déméter.",
  "iris":"Messagère arc-en-ciel entre l'Olympe et la Terre.",
  "pan":"Dieu à moitié bouc, incarnation de l'instinct non policé.",
  "poséidon":"Dieu de la mer et des séismes, capable de rupture soudaine.",
  "hécate":"Déesse des carrefours, de la magie et des passages.",
  "séléné":"Déesse de la lune.",
  "hélios":"Dieu du soleil, conducteur du char céleste.",
  "minos":"Juge des morts aux Enfers, connu pour son impartialité.",
  "gaïa":"Déesse primordiale de la Terre, mère de toutes choses.",
  "athéna":"Déesse de la sagesse stratégique.",
  "aphrodite":"Déesse de l'amour et de la beauté.",
  "nérée":"Vieillard de la mer, dieu marin sage et bienveillant.",
  "bellérophon":"Héros dompteur de Pégase, vainqueur de la Chimère.",
};

/* ===================== ÉTAT ===================== */

let journal = JSON.parse(localStorage.getItem("arcanes-journal") || "[]");
let route = "home";

let tirageState = JSON.parse(localStorage.getItem("arcanes-tirage-state") || "null") || {
  question: "", spread: null, picks: [], notes: "", saved: false, aiReading: null, aiStatus: "idle"
};
function saveTirageState(){ localStorage.setItem("arcanes-tirage-state", JSON.stringify(tirageState)); }

/* ===================== UTILITAIRES ===================== */

function escapeHTML(value){
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));
}

function allCards(){
  const cards = MAJORS.map(x => [...x]);
  for(const [suit, rows] of Object.entries(COURTS)){
    rows.forEach(x => cards.push([x[0],x[1],x[2],x[3],"court","",suit]));
  }
  for(const [suit, meta] of Object.entries(SUITS)){
    for(let n=1;n<=10;n++){
      const k=NUMBER_KEYS[n];
      cards.push([
        `${n===1?"As":n} de ${suit}`, k[0], meta[1],
        `${k[2]} · ${meta[2]}`, "number",
        `${k[1]} · ${meta[3]}`, suit, n
      ]);
    }
  }
  return cards;
}
const CARDS = allCards();

function cardsForSymbol(id){
  const names = [id, ...Object.entries(SYMBOL_ALIASES).filter(([,v])=>v===id).map(([k])=>k)];
  return CARDS.filter(c => {
    const sym = (c[5]||"").toLowerCase();
    return names.some(n => sym.includes(n));
  });
}

function shuffledDeck(){ return [...CARDS].sort(()=>Math.random()-.5); }

/* ===================== RENDU DE CARTE ===================== */

function pipHTML(suit, number){
  const icon = SUITS[suit]?.[1] || "•";
  return `<div class="pips pips-${number}">${Array.from({length:number},()=>`<span class="pip">${icon}</span>`).join("")}</div>`;
}

function cardVisual(c){
  const img = CARD_IMAGES[c[0]];
  if(img) return `<img class="card-img" src="${img}" alt="${escapeHTML(c[0])}">`;
  if(c[4] === "number") return pipHTML(c[6], c[7]);
  return `<div class="glyph">${c[2]||"✦"}</div>`;
}

function cardHTML(c, cls="major"){
  const hasImg = !!CARD_IMAGES[c[0]];
  return `<div class="tarot-card ${cls} ${hasImg?"has-img":""}" data-card="${encodeURIComponent(JSON.stringify(c))}">
    <div class="frame">
      ${hasImg ? "" : `<div class="card-no">${escapeHTML(c[0])}</div>`}
      ${cardVisual(c)}
      <div class="card-name">${escapeHTML(c[1])}</div>
      ${hasImg ? "" : `<div class="card-sub">${escapeHTML(c[3]||"")}</div>`}
    </div>
  </div>`;
}

function cardBackHTML(idx, revealed){
  return `<div class="tarot-card-back ${revealed?"revealed":""}" data-pick="${idx}">
    <div class="back-frame"><span class="back-glyph">✦</span></div>
  </div>`;
}

function symbolChips(symbolStr){
  if(!symbolStr) return "";
  const tokens = symbolStr.split("·").map(s=>s.trim()).filter(Boolean);
  return `<div class="chip-row">${tokens.map(t=>{
    const id = resolveSymbolId(t);
    return `<button class="chip" data-symbol="${id?escapeHTML(id):""}" ${id?"":"disabled"}>${escapeHTML(t)}</button>`;
  }).join("")}</div>`;
}

/* ===================== INTERPRÉTATION CONTEXTUELLE ===================== */

const QUESTION_DOMAINS = [
  { test:/amour|couple|relation|sentiment|aime|conjoint|partenaire/i, label:"un lien affectif" },
  { test:/travail|carrière|job|emploi|professionnel|poste|entretien|boulot/i, label:"ta vie professionnelle" },
  { test:/argent|finance|budget|dépense|salaire|achat/i, label:"une question matérielle" },
  { test:/santé|corps|fatigue|énergie|sommeil/i, label:"ton équilibre personnel" },
  { test:/déménage|maison|logement|famille|enfant/i, label:"ta vie personnelle et familiale" },
  { test:/dois-je|devrais-je|faut-il|choix|décision|accepter|refuser/i, label:"une décision à prendre" },
];
const DEFAULT_DOMAIN = { label:"cette situation" };

function detectDomain(question){
  for(const d of QUESTION_DOMAINS) if(d.test.test(question)) return d;
  return DEFAULT_DOMAIN;
}

// Nom d'affichage réel d'une carte (jamais un mot-clé) : "Le Chariot", "10 de Épées", "Valet de Bâtons"...
function cardFullName(c){
  if(c[4]==="major"){
    const m = c[0].match(/—\s*(.+)$/);
    return m ? m[1] : c[0];
  }
  return c[0];
}

function interpretationFor(card, index, domain){
  const name = cardFullName(card);
  const core = (card[3]||"").split("·")[0].trim().toLowerCase();
  const symbols = (card[5]||"").split("·").map(s=>s.trim()).filter(Boolean);
  const hint = symbols.length ? ` Le symbole de ${symbols[0]} en dit long ici.` : "";
  if(index === 0) return `${name} est déjà à l'œuvre autour de ${core}, même si ce n'est pas encore nommé clairement dans ${domain.label}.${hint}`;
  if(index === 1) return `${name} pointe vers ${core} comme point essentiel. C'est souvent là, et pas dans ce qui saute aux yeux, que se joue vraiment ${domain.label}.${hint}`;
  return `${name} indique une évolution possible autour de ${core} — une direction, pas une certitude figée.${hint}`;
}

function historyNote(question, domain){
  const history = journal.slice(0,8).filter(j=>j.question && domain.test && domain.test.test(j.question));
  if(!history.length) return null;
  return `Tu as déjà posé ${history.length} question(s) proche(s) de ce sujet — regarde si un motif se répète dans ton Journal.`;
}

// Extrait le cœur de la question (ce sur quoi elle porte réellement),
// en retirant les tournures interrogatives usuelles, pour parler DE ce sujet précis plutôt que d'une catégorie générale.
function extractSubject(question){
  let q = (question||"").trim().replace(/\?+$/,"").trim();
  const stems = [
    /^est[- ]ce que\s+/i, /^qu'est[- ]ce que\s+/i, /^dois[- ]je\s+/i, /^devrais[- ]je\s+/i,
    /^faut[- ]il\s+/i, /^puis[- ]je\s+/i, /^vais[- ]je\s+/i, /^que dois[- ]je\s+/i,
    /^comment\s+/i, /^pourquoi\s+/i, /^quand\s+/i, /^dois je\s+/i
  ];
  for(const s of stems){ if(s.test(q)){ q = q.replace(s,""); break; } }
  return q.trim();
}

const POSITIVE_KEYWORDS = ["victoire","harmonie","accomplissement","fécondité","clarté","joie","abondance","maîtrise","équilibre","espoir","transmission","souveraineté","potentiel","expansion"];
const CAUTION_KEYWORDS = ["rupture","déséquilibre","conflit","effondrement","instinct","attachement","incertitude","sacrifice","transformation","fin","suspension","manque"];

// Construit une vraie synthèse personnalisée : reprend le sujet exact de la question,
// fait dialoguer les 3 cartes autour de lui, et conclut dans un sens réellement déterminé par les cartes tirées.
function synthesisParagraphs(question, cards, domain){
  const subject = extractSubject(question);
  const hasSubject = subject.length > 3;
  const subjectPhrase = hasSubject ? subject : domain.label;
  const cores = cards.map(c => (c[3]||"").split("·")[0].trim().toLowerCase());
  const names = cards.map(c=>cardFullName(c));
  const isDecision = /dois[- ]je|devrais[- ]je|faut[- ]il|puis[- ]je|accepter|refuser|choix|décision/i.test(question);

  let score = 0;
  cores.forEach(core=>{
    if(POSITIVE_KEYWORDS.some(w=>core.includes(w))) score++;
    if(CAUTION_KEYWORDS.some(w=>core.includes(w))) score--;
  });

  const p1 = `Face à ${hasSubject ? "ta question — " + subjectPhrase : subjectPhrase}, ${names[0]}, ${names[1]} et ${names[2]} ne donnent pas une réponse toute faite : elles se répondent entre elles pour dessiner quelque chose de plus précis.`;

  const p2 = `${names[0]} montre que ${cores[0]} est déjà à l'œuvre dans cette histoire. ${names[1]} déplace ensuite le regard vers ${cores[1]} : c'est sans doute là, plus que dans ce qui est le plus visible, que se joue vraiment ${hasSubject?subjectPhrase:"la situation"}. Et ${names[2]} indique que la suite se dirige vers ${cores[2]}, à condition que rien ne vienne bouleverser cette dynamique d'ici là.`;

  let p3;
  if(isDecision){
    if(score > 0) p3 = `Si je devais résumer : les cartes penchent plutôt en faveur d'avancer — en gardant tout de même un œil sur ${cores[1]} avant de trancher tout à fait.`;
    else if(score < 0) p3 = `Si je devais résumer : les cartes invitent à la prudence avant de trancher. L'enjeu réel n'est pas ${cores[0]} en lui-même, mais le fait de ne pas avoir encore réglé ${cores[1]}.`;
    else p3 = `Si je devais résumer : ni franchement favorable ni franchement défavorable — tout dépendra de la manière dont tu géreras ${cores[1]} dans les prochains jours.`;
  } else {
    p3 = `Prises ensemble, ces trois cartes racontent moins un verdict qu'un mouvement : de ${cores[0]}, en passant par ${cores[1]}, vers ${cores[2]}.`;
  }
  return [p1, p2, p3];
}

/* ===================== LECTURE GÉNÉRÉE PAR IA (avec repli automatique) ===================== */
// Appelle notre backend (/api/reading, voir api/reading.js) qui garde la clé API Anthropic
// côté serveur et construit le prompt exact (repris ici pour mémoire, désormais côté backend).
// C'est le seul endroit du fichier concerné par ce changement.

// Tant que la variable d'environnement APP_ACCESS_CODE est définie côté backend, chaque appel
// doit fournir ce code (usage personnel : évite que quelqu'un d'autre déclenche des appels
// payants avec ta clé s'il tombe sur l'URL de l'appli). Demandé une seule fois, puis mémorisé.
// Le jour où l'appli est ouverte à d'autres, supprimer APP_ACCESS_CODE sur Vercel suffit — ce
// code continuera d'envoyer un en-tête vide, ignoré par le backend.
function getAccessCode(){
  let code = localStorage.getItem("delphesAccessCode");
  if(code === null){
    code = window.prompt("Code d'accès à l'appli (laisser vide si aucun) :") || "";
    localStorage.setItem("delphesAccessCode", code);
  }
  return code;
}

async function generateAIReading(question, cards){
  const timeout = new Promise((_,reject)=>setTimeout(()=>reject(new Error("timeout")), 15000));
  const call = fetch("/api/reading", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": getAccessCode() },
    body: JSON.stringify({ question, cards })
  }).then(async r=>{
    if(r.status === 401){
      // Code manquant/incorrect : on l'efface pour qu'il soit redemandé au prochain tirage.
      localStorage.removeItem("delphesAccessCode");
    }
    if(!r.ok) throw new Error("réponse backend invalide");
    return r.json();
  });

  const parsed = await Promise.race([call, timeout]);
  if(!parsed.card1 || !parsed.synthesis) throw new Error("réponse incomplète");
  return parsed;
}

function startAIReading(){
  if(tirageState.aiStatus === "loading" || tirageState.aiStatus === "done") return;
  tirageState.aiStatus = "loading";
  saveTirageState();
  render();
  const chosen = tirageState.picks.map(i=>tirageState.spread[i]);
  generateAIReading(tirageState.question, chosen)
    .then(result => { tirageState.aiReading = result; tirageState.aiStatus = "done"; saveTirageState(); render(); })
    .catch(() => { tirageState.aiStatus = "error"; saveTirageState(); render(); }); // repli silencieux vers le template
}

/* ===================== VUES ===================== */

function setRoute(newRoute){ route = newRoute; render(); window.scrollTo(0,0); }

function render(){
  const screen = document.getElementById("screen");
  const title = document.getElementById("pageTitle");
  if(!screen || !title) return;
  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active", b.dataset.route===route));
  const back = document.getElementById("backBtn");
  if(back) back.hidden = route === "home";
  title.textContent = {home:"Tarot de Delphes", tirage:"Tirage", apprendre:"Apprendre", symboles:"Symboles", journal:"Journal"}[route] || "Tarot de Delphes";
  if(route==="home") screen.innerHTML = home();
  if(route==="tirage") screen.innerHTML = tirage();
  if(route==="apprendre") screen.innerHTML = apprendre();
  if(route==="symboles") screen.innerHTML = symboles();
  if(route==="journal") screen.innerHTML = journalView();
  bind();
}

function home(){
  const day = MAJORS[new Date().getDate() % MAJORS.length];
  return `<section class="hero">
    <div class="hero-emblem">✦</div>
    <h2>Tarot de Delphes</h2>
    <p>Un tarot mythologique grec qui s'apprend en le regardant : tirage, symboles reliés entre eux, et un parcours d'apprentissage progressif.</p>
  </section>
  <div class="section-title centered"><h3>Carte du jour</h3></div>
  <div class="day-card" data-card="${encodeURIComponent(JSON.stringify(day))}">${cardHTML(day,"major")}</div>
  <p class="tap-hint">touche la carte pour en découvrir la lecture complète</p>
  <div class="grid" style="margin-top:30px">
    <div class="tile" data-go="tirage"><strong>✦ Tirer les cartes</strong><span>Choisis toi-même trois cartes dans le jeu.</span></div>
    <div class="tile" data-go="apprendre"><strong>◈ Apprendre</strong><span>Un parcours progressif sur les 78 cartes.</span></div>
    <div class="tile" data-go="symboles"><strong>✧ Symboles</strong><span>Chaque symbole est relié aux autres.</span></div>
    <div class="tile" data-go="journal"><strong>☽ Journal</strong><span>Retrouve tes tirages passés.</span></div>
  </div>`;
}

function tirage(){
  if(!tirageState.spread){
    return `<section class="draw-zone">
      <div class="hero-emblem small">✦</div>
      <p class="note">Pose ta question, puis choisis toi-même trois cartes dans le jeu, face cachée.</p>
      <textarea id="drawQuestion" class="draw-question" placeholder="Écris ta question ici…">${escapeHTML(tirageState.question)}</textarea>
      <button class="primary" id="drawBtn" ${tirageState.question.trim()?"":"disabled"}>Consulter les arcanes</button>
    </section>`;
  }
  const { spread, picks, question } = tirageState;
  if(picks.length < 3){
    return `<section class="draw-zone compact">
      <p class="note">Choisis ${3-picks.length} carte${3-picks.length>1?"s":""} parmi celles-ci.</p>
      <p class="picks-counter">${picks.length} / 3 choisies</p>
    </section>
    <div class="deck-grid">${spread.map((c,i)=>cardBackHTML(i, picks.includes(i))).join("")}</div>`;
  }
  return renderDrawResult();
}

// Génère un semis d'étoiles dorées scintillantes pour l'animation de chargement.
function starLoaderHTML(size){
  const count = size === "sm" ? 5 : 8;
  let stars = "";
  for(let i=0;i<count;i++){
    const left = (5 + Math.random()*90).toFixed(1);
    const top = (5 + Math.random()*80).toFixed(1);
    const delay = (Math.random()*1.6).toFixed(2);
    const dur = (1.1 + Math.random()*0.9).toFixed(2);
    stars += `<span class="star" style="left:${left}%;top:${top}%;animation-delay:${delay}s;animation-duration:${dur}s">✦</span>`;
  }
  return `<div class="stars-container ${size==="sm"?"sm":""}">${stars}</div>`;
}

function renderDrawResult(){
  const { question, spread, picks, notes, saved, aiReading, aiStatus } = tirageState;
  const chosen = picks.map(i=>spread[i]);
  const domain = detectDomain(question);
  const loading = aiStatus === "loading";
  const useAI = aiStatus === "done" && aiReading;

  const cardText = (c,i) => useAI ? aiReading[`card${i+1}`] : (loading ? "" : interpretationFor(c,i,domain));

  const synthesisHTML = loading
    ? `<div class="ai-loading-magic">${starLoaderHTML("lg")}<p class="ai-loading-text">Les arcanes se consultent…</p></div>`
    : useAI
      ? `<p>${escapeHTML(aiReading.synthesis)}</p>`
      : `${synthesisParagraphs(question,chosen,domain).map(p=>`<p>${escapeHTML(p)}</p>`).join("")}
         ${aiStatus==="error" ? `<p class="note">(Lecture générée hors-ligne — le service de lecture personnalisée n'a pas répondu.)</p>` : ""}`;

  return `
    <p class="question-recall">« ${escapeHTML(question)} »</p>
    <div class="reading-grid">
      ${chosen.map((c,i)=>`<article class="reading-block">
        <div class="reading-roman">${DRAW_POSITIONS[i]}</div>
        ${cardHTML(c,c[4]==="major"?"major":(SUITS[c[6]]?.[0]||"major"))}
        <p class="card-name-recall">${escapeHTML(cardFullName(c))}</p>
        ${loading ? `<div class="ai-loading-magic small">${starLoaderHTML("sm")}</div>` : `<p>${escapeHTML(cardText(c,i))}</p>`}
        <details class="why">
          <summary>Pourquoi cette carte ?</summary>
          ${symbolChips(c[5])}
        </details>
      </article>`).join("")}
    </div>
    <section class="answer">
      <h2>Lecture d'ensemble</h2>
      ${synthesisHTML}
      ${(()=>{ const h = historyNote(question,domain); return (!loading && h) ? `<p class="note" style="margin-top:10px">${escapeHTML(h)}</p>` : ""; })()}
      <div class="draw-notes"><textarea id="drawNotes" placeholder="Tes notes et ton interprétation personnelle…">${escapeHTML(notes||"")}</textarea></div>
      <button class="secondary" id="saveDraw">${saved ? "Mettre à jour dans le journal" : "Ajouter au journal"}</button>
      <button class="ghost" id="clearDraw">Nouveau tirage</button>
    </section>`;
}

function apprendre(){
  const progress = Math.min(100, Math.round((Math.min(78,journal.length*3)/78)*100));
  return `<section class="hero">
    <span class="pill">Parcours pédagogique</span>
    <h2>Apprendre le Tarot de Delphes</h2>
    <p>Touche une carte pour découvrir sa lecture complète : signification traditionnelle et éclairage mythologique.</p>
    <div class="progress"><span style="width:${progress}%"></span></div>
    <small>Progression personnelle : ${progress}%</small>
  </section>
  <div class="section-title"><h3>Arcanes majeurs</h3></div>
  <div class="card-grid">${MAJORS.map(c=>cardHTML(c)).join("")}</div>
  <div class="section-title"><h3>Les quatre enseignes</h3></div>
  <div class="symbol-list">${Object.entries(SUITS).map(([s,m])=>`<div class="symbol"><b>${s}</b><br>${escapeHTML(m[2])}</div>`).join("")}</div>
  ${Object.entries(COURTS).map(([suit,rows])=>`<div class="section-title"><h3>${suit}</h3></div><div class="card-grid">${rows.map(x=>cardHTML([x[0],x[1],x[2],x[3],"court","",suit],SUITS[suit][0])).join("")}</div>`).join("")}
  <div class="section-title"><h3>Cartes numérales</h3></div>
  ${Object.keys(SUITS).map(suit=>`<h4 class="suit-h4">${suit}</h4><div class="card-grid">${CARDS.filter(c=>c[4]==="number"&&c[6]===suit).map(c=>cardHTML(c,SUITS[suit][0])).join("")}</div>`).join("")}`;
}

function symboles(){
  const grouped = {};
  Object.entries(SYMBOL_LIBRARY).forEach(([id,s])=>{
    (grouped[s.category] ||= []).push([id,s]);
  });
  return `<section class="hero">
    <span class="pill">Bibliothèque vivante</span>
    <h2>Bibliothèque symbolique</h2>
    <p>Chaque symbole est relié aux cartes et aux figures mythologiques qui l'utilisent.</p>
    <div class="search"><input id="symbolSearch" placeholder="Rechercher un symbole…"></div>
  </section>
  ${Object.entries(grouped).map(([cat, items])=>`
    <div class="section-title"><h3>${escapeHTML(cat)}</h3></div>
    <div class="symbol-list">${items.map(([id,s])=>symbolCard(id,s)).join("")}</div>
  `).join("")}
  <div class="section-title"><h3>Les nombres</h3></div>
  <div class="symbol-list">${Object.entries(NUMBER_KEYS).map(([n,k])=>`<div class="symbol"><b>${n==="1"?"As":n} — ${escapeHTML(k[0])}</b><br>${escapeHTML(k[1])}</div>`).join("")}</div>`;
}

function symbolCard(id, s){
  return `<div class="symbol clickable" data-symbol="${escapeHTML(id)}" data-search="${escapeHTML((s.label+" "+s.desc+" "+s.category).toLowerCase())}">
    <b>${s.icon} ${escapeHTML(s.label)}</b><br><small>${escapeHTML(s.desc.slice(0,80))}${s.desc.length>80?"…":""}</small>
  </div>`;
}

let preDetailScroll = 0;

function showSymbolDetail(id){
  const s = SYMBOL_LIBRARY[id]; if(!s) return;
  preDetailScroll = window.scrollY;
  const related = cardsForSymbol(id);
  const linkedDeities = s.links.filter(l => DEITY_NOTES[l]);
  document.getElementById("screen").innerHTML = `<div class="detail">
    <div class="symbol-hero">${s.icon}</div>
    <h2>${escapeHTML(s.label)}</h2>
    <p class="symbol-cat-big">${escapeHTML(s.category)}</p>
    <p>${escapeHTML(s.desc)}</p>
    ${linkedDeities.length ? `<div class="section-title"><h3>Figures liées</h3></div>
      <div class="symbol-list">${linkedDeities.map(d=>`<div class="symbol"><b>${escapeHTML(d[0].toUpperCase()+d.slice(1))}</b><br><small>${escapeHTML(DEITY_NOTES[d])}</small></div>`).join("")}</div>` : ""}
    ${related.length ? `<div class="section-title"><h3>Cartes concernées</h3></div>
      <div class="card-grid">${related.map(c=>cardHTML(c, c[4]==="major"?"major":(SUITS[c[6]]?.[0]||"major"))).join("")}</div>` : ""}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  bindCards(); bindChips();
}

function journalView(){
  if(!journal.length) return `<div class="empty"><h2>Ton journal est vide.</h2><p>Le journal reste privé et local sur cet appareil.</p></div>`;
  return `<section class="hero"><span class="pill">${journal.length} tirage(s)</span><h2>Journal</h2></section>
  ${journal.map((j,i)=>`<article class="tile journal-entry" style="margin-bottom:12px">
    <strong>${escapeHTML(j.date)}</strong>
    <span>${escapeHTML(j.question||"Sans question")}</span>
    <p>${escapeHTML((j.cards||[]).join(" · "))}</p>
    ${j.notes?`<p><b>Notes :</b> ${escapeHTML(j.notes)}</p>`:""}
    <button class="ghost delete-entry" data-index="${i}">Supprimer</button>
  </article>`).join("")}`;
}

function showDetail(c){
  const suit = c[6], cls = c[4]==="major" ? "major" : (SUITS[suit]?.[0] || "major");
  const lore = CARD_LORE[c[0]];
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">
    ${cardHTML(c,cls)}
    <h2>${escapeHTML(c[0])}</h2>
    <h3>${escapeHTML(c[1])}</h3>
    <p>${escapeHTML(c[3]||"")}</p>
    ${lore ? `
      <div class="section-title"><h3>Lecture traditionnelle</h3></div>
      <p class="lore-text">${escapeHTML(lore.marseille)}</p>
      <div class="section-title"><h3>Éclairage mythologique — ${escapeHTML(c[1])}</h3></div>
      <p class="lore-text">${escapeHTML(lore.myth)}</p>
    ` : ""}
    <div class="section-title"><h3>Symboles</h3></div>
    ${symbolChips(c[5])}
    ${c[4]==="number"?`<div class="symbol-list" style="margin-top:14px"><div class="symbol"><b>Direction du nombre</b><br>${escapeHTML(NUMBER_KEYS[c[7]]?.[2]||"")}</div></div>`:""}
    ${suit?`<div class="symbol-list" style="margin-top:14px"><div class="symbol"><b>Enseigne</b><br>${escapeHTML(suit)} · ${escapeHTML(SUITS[suit]?.[2]||"")}</div></div>`:""}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  bindChips();
}

/* ===================== LIAISONS D'ÉVÉNEMENTS ===================== */

function bindCards(){
  document.querySelectorAll("[data-card]").forEach(el=>{
    el.onclick = ()=> showDetail(JSON.parse(decodeURIComponent(el.dataset.card)));
  });
}

function bindChips(){
  document.querySelectorAll(".chip[data-symbol]").forEach(el=>{
    if(!el.dataset.symbol) return;
    el.onclick = ()=> showSymbolDetail(el.dataset.symbol);
  });
  document.querySelectorAll(".symbol.clickable").forEach(el=>{
    el.onclick = ()=> showSymbolDetail(el.dataset.symbol);
  });
}

function bindDeck(){
  document.querySelectorAll("[data-pick]").forEach(el=>{
    el.onclick = ()=>{
      const idx = Number(el.dataset.pick);
      if(tirageState.picks.includes(idx) || tirageState.picks.length>=3) return;
      tirageState.picks.push(idx);
      saveTirageState();
      render();
    };
  });
}

function bind(){
  document.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>setRoute(b.dataset.route));
  document.querySelectorAll("[data-go]").forEach(el=>el.onclick=()=>setRoute(el.dataset.go));
  document.getElementById("homeBtn").onclick=()=>setRoute("home");
  document.getElementById("backBtn").onclick=()=>setRoute("home");

  const dayCard = document.querySelector(".day-card[data-card]");
  if(dayCard) dayCard.onclick = ()=> showDetail(JSON.parse(decodeURIComponent(dayCard.dataset.card)));

  const draw = document.getElementById("drawBtn");
  const question = document.getElementById("drawQuestion");
  if(question && draw){
    question.addEventListener("input", ()=>{ tirageState.question=question.value; saveTirageState(); draw.disabled=!question.value.trim(); });
    draw.onclick = ()=>{
      tirageState = { question: tirageState.question, spread: shuffledDeck().slice(0,15), picks: [], notes:"", saved:false, aiReading:null, aiStatus:"idle" };
      saveTirageState(); render();
    };
  }
  const notes = document.getElementById("drawNotes");
  if(notes) notes.addEventListener("input", ()=>{ tirageState.notes=notes.value; saveTirageState(); });

  const saveDraw = document.getElementById("saveDraw");
  if(saveDraw) saveDraw.onclick = ()=>{
    const chosen = tirageState.picks.map(i=>tirageState.spread[i]);
    const domain = detectDomain(tirageState.question);
    journal.unshift({
      date: new Date().toLocaleString("fr-FR"),
      question: tirageState.question,
      cards: chosen.map(c=>c[0]),
      notes: tirageState.notes || ""
    });
    localStorage.setItem("arcanes-journal", JSON.stringify(journal));
    tirageState.saved = true; saveTirageState();
    alert("Tirage enregistré dans le journal.");
    render();
  };
  const clearDraw = document.getElementById("clearDraw");
  if(clearDraw) clearDraw.onclick = ()=>{ tirageState = {question:"",spread:null,picks:[],notes:"",saved:false,aiReading:null,aiStatus:"idle"}; saveTirageState(); render(); };

  document.querySelectorAll(".delete-entry").forEach(b=>{
    b.onclick = ()=>{ const i=Number(b.dataset.index); journal.splice(i,1); localStorage.setItem("arcanes-journal", JSON.stringify(journal)); render(); };
  });

  const search = document.getElementById("symbolSearch");
  if(search) search.addEventListener("input", ()=>{
    const q = search.value.toLowerCase().trim();
    document.querySelectorAll("[data-search]").forEach(el=>{ el.hidden = q && !el.dataset.search.includes(q); });
  });

  bindCards(); bindChips(); bindDeck();

  if(route==="tirage" && tirageState.spread && tirageState.picks.length===3 && tirageState.aiStatus==="idle"){
    startAIReading();
  }
}

if("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
render();
