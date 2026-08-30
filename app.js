/* ===================== DONNÉES : ARCANES MAJEURS (correspondances verrouillées) ===================== */

const MAJORS = [
["Le Mat","Dionysos","🍇","Liberté · instinct · départ · lâcher-prise","major","lierre · vigne · panthère · sac de voyage · bâton · couronne · dauphin · abeille · figue · raisin · noix"],
["I — Le Bateleur","Hermès","☿","Commencement · potentiel · habileté","major","caducée · bâton · coupe · épée · denier · table · sac de voyage · lyre · air · crocus"],
["II — La Papesse","Métis","📖","Savoir caché · intuition · connaissance","major","voile · colonnes · livre · lune"],
["III — L'Impératrice","Héra","🦚","Souveraineté · création · fécondité","major","paon · couronne · sceptre · grenade · lierre · crocus · pomme"],
["IV — L'Empereur","Zeus","⚡","Autorité · structure · pouvoir","major","foudre · aigle · sceptre · trône · grotte · char solaire · balance · chaîne · corne d'abondance · lierre · crocus · chêne · taureau · cygne · étoiles · éclair"],
["V — Le Pape","Chiron","🏹","Transmission · enseignement · initiation","major","bâton · disciples · blessure · sagesse · montagne · chaîne"],
["VI — L'Amoureux","Éros","🏹","Choix · désir · attraction","major","arc · flèche · deux chemins · coupe · ailes · papillon · laurier"],
["VII — Le Chariot","Apollon","☀","Victoire · maîtrise · mouvement","major","char solaire · laurier · lyre · chevaux · montagne · temple · arc · balance · flûte · serpent · dauphin · corbeau · cerf · flèche · couronne · cyprès"],
["VIII — La Justice","Thémis","⚖","Équilibre · vérité · décision","major","balance · épée · couronne · colonnes"],
["IX — L'Hermite","Déméter","🌾","Quête · solitude · patience","major","épis · lanterne · chemin · blé · torches · grenade · terre · pavot"],
["X — La Roue de Fortune","Tyché","☸","Cycles · destin · changement","major","roue · corne d'abondance · chute · sommet"],
["XI — La Force","Héraclès","🦁","Maîtrise · courage · puissance intérieure","major","lion · peau de lion · massue · mains nues · chemin · forêt · coupe · chaîne · flèche · chien · taureau · terre · pomme"],
["XII — Le Pendu","Prométhée","🔥","Sacrifice · suspension · autre regard","major","chaînes · feu · rocher · suspension · aigle · torche"],
["XIII — L'Arcane sans nom","Hadès","☠","Transformation · fin · passage","major","faux · grenade · cyprès · monde souterrain · lyre · épis · blé"],
["XIV — Tempérance","Iris","🌈","Équilibre · circulation · médiation","major","deux vases · ailes · arc-en-ciel · eau · air"],
["XV — Le Diable","Pan","🐐","Instinct · désir · attachement","major","cornes · flûte · chaînes · vigne · forêt · lune"],
["XVI — La Maison-Dieu","Poséidon","🔱","Rupture · effondrement · libération","major","tour · trident · vagues · éclair · mer · cheval · dauphin · olivier · eau · taureau"],
["XVII — L'Étoile","Hécate","✦","Espoir · orientation · intuition","major","étoiles · torches · chiens · carrefour · clé · lanterne"],
["XVIII — La Lune","Séléné","☾","Inconscient · intuition · incertitude","major","lune · deux tours · chien · eau"],
["XIX — Le Soleil","Hélios","☀","Clarté · joie · vitalité","major","soleil · char solaire · rayons · laurier · coupe · lune · aurore"],
["XX — Le Jugement","Minos","⚖","Révélation · appel · bilan","major","balance · trompette · âmes · lumière · monde souterrain · labyrinthe · taureau"],
["XXI — Le Monde","Gaïa","🌿","Accomplissement · totalité · unité","major","mandorle · racines · monde vivant · quatre figures · terre"]
];

// Correspondances signe zodiacal -> arcane majeur, tradition ésotérique classique
// (Golden Dawn), adaptée à l'ordre Marseille de ce jeu (Justice = VIII, Force = XI —
// deux attributions qui collent d'ailleurs très bien aux illustrations : la balance pour
// la Justice/Balance, le lion pour la Force/Lion). Sert à relier le profil astral aux
// arcanes majeurs dans l'onglet Apprendre (voir profileMajorLinks()).
const ZODIAC_MAJOR_LINKS = {
  "Bélier":"IV — L'Empereur",
  "Taureau":"V — Le Pape",
  "Gémeaux":"VI — L'Amoureux",
  "Cancer":"VII — Le Chariot",
  "Lion":"XI — La Force",
  "Vierge":"IX — L'Hermite",
  "Balance":"VIII — La Justice",
  "Scorpion":"XIII — L'Arcane sans nom",
  "Sagittaire":"XIV — Tempérance",
  "Capricorne":"XV — Le Diable",
  "Verseau":"XVII — L'Étoile",
  "Poissons":"XVIII — La Lune",
};

// Ancrage réel de chaque correspondance ci-dessus, en deux temps : `astro` explique le lien
// TRADITIONNEL entre le signe et la carte (élément, planète maîtresse, symbolisme), `myth`
// donne un fait mythologique grec CONCRET et vérifiable qui explique pourquoi le dieu/déesse
// de cette carte l'incarne vraiment (ex. le lion de Némée pour Héraclès/La Force) — jamais
// une vague paraphrase du mot-clé. Sert à la fois de contenu de secours local
// (majorLinksTextFallback() ci-dessous) et de matière imposée à l'IA côté /api/astral-text
// (voir mythAstro/mythFact dans profileForAstralText()) pour qu'elle ne soit jamais tentée
// d'inventer un mythe approximatif ou erroné.
const ZODIAC_MAJOR_MYTH = {
  "Bélier": {
    astro: "Bélier, premier signe du zodiaque, signe de feu cardinal gouverné par Mars, incarne l'instinct de commencement et d'autorité brute — la tradition en fait le signe de L'Empereur.",
    myth: "Zeus n'a obtenu son trône qu'en renversant son père Cronos lors de la Titanomachie : une autorité conquise de haute lutte, jamais héritée passivement.",
  },
  "Taureau": {
    astro: "Taureau, signe de terre fixe gouverné par Vénus, incarne la stabilité et ce qui se transmet dans la durée — la tradition en fait le signe du Pape, figure d'enseignement.",
    myth: "Chiron, le plus sage des centaures, a formé patiemment des héros comme Achille, Jason ou Asclépios : une transmission fidèle qui prend le temps qu'il faut, jamais un savoir imposé d'un coup.",
  },
  "Gémeaux": {
    astro: "Gémeaux, signe d'air mutable gouverné par Mercure, incarne la dualité et le choix entre deux voies — la tradition en fait le signe de L'Amoureux.",
    myth: "Les jumeaux Castor et Pollux, un mortel et un immortel, étaient si liés l'un à l'autre que Pollux a partagé son immortalité pour ne jamais être séparé de son frère : un choix d'amour entre deux êtres.",
  },
  "Cancer": {
    astro: "Cancer, signe d'eau cardinal gouverné par la Lune, incarne le mouvement cyclique qui revient toujours vers son point d'attache — la tradition en fait le signe du Chariot.",
    myth: "Apollon traverse chaque jour le ciel sur un char solaire, dans une trajectoire réglée qui se répète sans jamais dévier : le même mouvement maîtrisé qui revient toujours à son origine.",
  },
  "Lion": {
    astro: "Lion, signe de feu fixe gouverné par le Soleil, incarne le rayonnement et le courage — la tradition en fait tout naturellement le signe de La Force.",
    myth: "Le lion lui-même vient du premier des douze travaux d'Héraclès : terrasser à mains nues, sans arme, le lion de Némée à la peau impénétrable — la maîtrise d'une force brute par la seule volonté.",
  },
  "Vierge": {
    astro: "Vierge, signe de terre mutable gouverné par Mercure, incarne le tri patient et minutieux, l'attention aux détails qui font mûrir les choses — la tradition en fait le signe de L'Hermite.",
    myth: "Déméter, déesse des moissons, s'est retirée du monde, errant seule et endeuillée à la recherche de sa fille Perséphone enlevée par Hadès, privant la terre de récoltes tant que sa quête solitaire ne trouvait pas d'issue.",
  },
  "Balance": {
    astro: "Balance, seul signe du zodiaque représenté par un objet plutôt qu'un être vivant, incarne littéralement l'équilibre et la pesée — la tradition en fait évidemment le signe de La Justice.",
    myth: "Thémis, déesse de la justice divine et de l'ordre, est celle-là même qu'on représente tenant une balance pour peser les actes : l'image qui a directement inspiré la carte.",
  },
  "Scorpion": {
    astro: "Scorpion, signe d'eau fixe, est associé à la mort et à la transformation — la tradition en fait le signe de L'Arcane sans nom.",
    myth: "Dans le mythe d'Orion, un scorpion envoyé pour le punir le tue d'une piqûre mortelle ; les deux furent changés en constellations qui ne se lèvent jamais ensemble, l'une s'effaçant quand l'autre paraît — un cycle de mort et de passage.",
  },
  "Sagittaire": {
    astro: "Sagittaire, centaure archer mi-homme mi-cheval, est un être-pont entre deux natures — la tradition en fait le signe de Tempérance, carte de la médiation.",
    myth: "Iris, messagère des dieux, est l'arc-en-ciel qui relie le ciel à la terre, l'Olympe au monde des mortels : un pont entre deux mondes, comme le centaure sagittaire relie l'instinct animal à la visée de sa flèche.",
  },
  "Capricorne": {
    astro: "Capricorne, symbolisé depuis l'Antiquité par une chèvre, incarne l'instinct animal et l'attachement à la matière — la tradition en fait le signe du Diable.",
    myth: "Pan, dieu à cornes et à pattes de bouc, est le bouc lui-même : dieu de l'instinct sauvage et de la panique (le mot vient de lui), c'est-à-dire de tout ce qui échappe à la maîtrise.",
  },
  "Verseau": {
    astro: "Verseau, signe d'air fixe tourné vers l'avenir et l'indépendance, cherche une lumière qui guide au loin — la tradition en fait le signe de L'Étoile.",
    myth: "Hécate, déesse des carrefours et des chemins nocturnes, porte une torche pour éclairer la route dans l'obscurité : une image d'orientation et d'espoir.",
  },
  "Poissons": {
    astro: "Poissons, dernier signe du zodiaque, signe d'eau mutable, baigne dans l'inconscient et l'instinct plus que dans la raison — la tradition en fait le signe de La Lune.",
    myth: "Séléné, déesse de la lune, gouverne la nuit et tire les marées : son attraction sur les eaux fait écho direct à Poissons, signe d'eau mû par des forces qu'on ne voit pas mais qu'on ressent.",
  },
};

// Être Soleil en tel signe n'a pas le même poids ni le même sens qu'être Lune ou Ascendant
// dans ce même signe — chacun engage un domaine de vie différent. Sert à différencier,
// pour une même carte liée (voir ZODIAC_MAJOR_LINKS/ZODIAC_MAJOR_MYTH ci-dessus), ce
// qu'apporte spécifiquement le Soleil de ce qu'apporte la Lune ou l'Ascendant — utilisé à la
// fois par majorLinksTextFallback() ci-dessous et transmis à l'IA (voir pointDomain dans
// profileForAstralText()) pour qu'un même mot-clé de carte ne soit jamais expliqué deux fois
// dans les mêmes termes selon le point qui le porte.
const POINT_DOMAIN_HINT = {
  "Soleil": "ton identité profonde, ce qui te définit consciemment et ta vitalité",
  "Lune": "ton monde intérieur, tes émotions et tes besoins instinctifs, souvent moins visibles de l'extérieur",
  "Ascendant": "la façon dont tu te présentes au monde, ta première impression, ce que les autres perçoivent souvent de toi avant de te connaître vraiment",
};

// Correspondances signe zodiacal + décan (tranche de 10°) -> carte numérale (2 à 10),
// tradition des "decanates" du Golden Dawn popularisée par le Thoth Tarot de Crowley —
// même famille ésotérique que ZODIAC_MAJOR_LINKS ci-dessus, mais à l'échelle du degré
// plutôt que du signe entier. Chaque enseigne correspond à une triplicité élémentaire
// (Bâtons/Feu : Bélier-Lion-Sagittaire ; Coupes/Eau : Cancer-Scorpion-Poissons ;
// Épées/Air : Balance-Verseau-Gémeaux ; Deniers/Terre : Capricorne-Taureau-Vierge), et
// dans chacune, le 1er signe de la triplicité porte les cartes 2-3-4, le 2e les 5-6-7, le
// 3e les 8-9-10. Sert à affiner tutelaryDeity() (ci-dessous) au-delà des 12 divinités des
// arcanes majeurs : si la carte numérale du décan a déjà sa propre figure mythologique
// (NUMBER_CARD_DEITY), le calcul vote pour elle plutôt que pour le dieu du majeur entier.
const DECAN_MINOR_CARDS = {
  "Bélier":     ["2 de Bâtons","3 de Bâtons","4 de Bâtons"],
  "Lion":       ["5 de Bâtons","6 de Bâtons","7 de Bâtons"],
  "Sagittaire": ["8 de Bâtons","9 de Bâtons","10 de Bâtons"],
  "Cancer":     ["2 de Coupes","3 de Coupes","4 de Coupes"],
  "Scorpion":   ["5 de Coupes","6 de Coupes","7 de Coupes"],
  "Poissons":   ["8 de Coupes","9 de Coupes","10 de Coupes"],
  "Balance":    ["2 de Épées","3 de Épées","4 de Épées"],
  "Verseau":    ["5 de Épées","6 de Épées","7 de Épées"],
  "Gémeaux":    ["8 de Épées","9 de Épées","10 de Épées"],
  "Capricorne": ["2 de Deniers","3 de Deniers","4 de Deniers"],
  "Taureau":    ["5 de Deniers","6 de Deniers","7 de Deniers"],
  "Vierge":     ["8 de Deniers","9 de Deniers","10 de Deniers"],
};
// Retourne la carte numérale du décan exact d'un signe (0°-10° = 1er décan, etc.) ou null
// si le signe n'est pas reconnu. degreeInSign vient directement du calcul astral déjà fait
// par /api/astral (voir profileForAstralText()) — aucun nouveau calcul astronomique ici.
function decanCardFor(sign, degreeInSign){
  const cards = DECAN_MINOR_CARDS[sign];
  if(!cards) return null;
  const idx = Math.min(2, Math.max(0, Math.floor((degreeInSign ?? 0) / 10)));
  return cards[idx];
}

// Signe zodiacal -> animal symbolique (catégorie "Animaux" de SYMBOL_LIBRARY), pour
// l'Animal représentatif (voir representativeAnimal() plus bas). Un animal par signe,
// choisi en priorité pour son lien mythologique déjà écrit dans la fiche du symbole
// lui-même (ex. Cancer/Apollon -> corbeau, dont la fiche raconte justement l'épisode
// d'Apollon) ; à défaut de mythe déjà établi pour ce signe précis, un lien thématique ou
// iconographique plus large (ex. Sagittaire, traditionnellement représenté en centaure,
// mi-homme mi-cheval -> cheval). Deux animaux (Pégase, Araignée) ne sont rattachés à aucun
// signe : ils ne peuvent surgir que via DOMAIN_ANIMAL ci-dessous, sur la base des questions
// posées plutôt que de la naissance.
const SIGN_ANIMAL = {
  "Bélier":"aigle",       // lié à Zeus, dieu du majeur du signe (voir la fiche « Aigle »)
  "Taureau":"taureau",    // le signe est littéralement cet animal, lui-même lié à Zeus/Poséidon/Minos
  "Gémeaux":"papillon",   // lié à Psyché, épouse d'Éros — dieu du majeur du signe (l'Amoureux)
  "Cancer":"corbeau",     // lié à Apollon, dieu du majeur du signe (le Chariot)
  "Lion":"cerf",          // le cerf de Cérynie, 3e travail d'Héraclès — dieu du majeur du signe (la Force)
  "Vierge":"abeille",     // travail patient et récolte organisée — écho thématique à Déméter, dieu du majeur (l'Hermite)
  "Balance":"colombe",    // paix et harmonie retrouvées — écho thématique à Thémis, dieu du majeur (la Justice)
  "Scorpion":"serpent",   // lié aux puissances chthoniennes et au monde souterrain — dieu du majeur du signe (Hadès)
  "Sagittaire":"cheval",  // le Sagittaire, traditionnellement un centaure, mi-homme mi-cheval
  "Capricorne":"dauphin", // le Capricorne, traditionnellement une chèvre-poisson — la moitié aquatique
  "Verseau":"chien",      // lié à Hécate, dieu du majeur du signe (l'Étoile)
  "Poissons":"cygne",     // grâce et clair de lune sur l'eau — écho thématique à Séléné, dieu du majeur (la Lune)
};

// Domaine de question dominant du Journal (voir QUESTION_DOMAINS/detectDomain() plus bas)
// -> animal symbolique, pour affiner l'Animal représentatif avec ce qui est vécu plutôt que
// seulement ce qui est écrit dans le thème natal. Certains recoupent volontairement
// SIGN_ANIMAL (ex. Colombe pour l'amour, déjà liée à Aphrodite dans sa fiche) : quand les
// deux signaux tombent sur le même animal, c'est un renforcement, pas un conflit.
const DOMAIN_ANIMAL = {
  "un lien affectif":"colombe",                    // lié à Aphrodite (voir la fiche « Colombe »)
  "ta vie professionnelle":"abeille",               // travail, organisation, ruche
  "une question matérielle":"araignée",             // habileté patiente qui construit ce qu'elle tisse (voir la fiche « Araignée »)
  "ton équilibre personnel":"serpent",              // guérison, lié à Asclépios (voir la fiche « Serpent »)
  "ta vie personnelle et familiale":"cygne",         // Léda et la naissance de ses enfants (voir la fiche « Cygne »)
  "une décision à prendre":"pégase",                // élévation après un choix assumé, lié à Bellérophon (voir la fiche « Pégase »)
};

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
},

/* ----- Figures de cour (16) ----- */
"Valet de Bâtons": {
  marseille:"Le Valet de Bâtons se tient prêt, bâton en main, avant même que le mouvement ne commence : c'est l'arcane de l'élan qui s'annonce, encore neuf, pas encore éprouvé par l'action.",
  myth:"Éos, déesse de l'aurore aux doigts de rose, ouvre chaque jour les portes du ciel pour que le soleil s'y engage. Elle ne conduit pas le char : elle rend simplement le passage possible — l'énergie de ce Valet est la même, une promesse plus qu'un accomplissement."
},
"Cavalier de Bâtons": {
  marseille:"Le Cavalier de Bâtons galope, bâton levé, sans se retourner : action rapide, engagement total, énergie qui préfère avancer que réfléchir davantage.",
  myth:"Niké, déesse ailée de la victoire, se tient aux côtés des vainqueurs sans jamais combattre elle-même — elle est le mouvement qui précède et accompagne le triomphe. Ce Cavalier avance avec cette même certitude conquérante, parfois trop vite pour mesurer les obstacles."
},
"Reine de Bâtons": {
  marseille:"La Reine de Bâtons tient son bâton fermement, assise mais jamais passive : confiance stable, feu intérieur qui n'a plus besoin de se démontrer.",
  myth:"Hestia, déesse du foyer, refusa les prétendants de l'Olympe pour garder la flamme sacrée toujours allumée au centre de chaque maison. Sa présence discrète mais irremplaçable est la vraie force de cette Reine : un feu qui n'éblouit pas mais qui ne s'éteint jamais."
},
"Roi de Bâtons": {
  marseille:"Le Roi de Bâtons dirige avec l'autorité de celui qui a lui-même façonné son pouvoir : maîtrise acquise par le travail, création menée jusqu'au bout.",
  myth:"Héphaïstos, dieu forgeron rejeté pour sa claudication, se rendit indispensable par son génie créateur — armes des dieux, palais, automates. Sa légende rappelle que l'autorité la plus solide n'est pas celle qu'on reçoit, mais celle qu'on forge patiemment de ses mains."
},
"Valet de Coupes": {
  marseille:"Le Valet de Coupes contemple sa coupe avec étonnement : sensibilité qui s'éveille, premier émoi, désir encore trop neuf pour se nommer clairement.",
  myth:"Himeros, dieu ailé compagnon d'Éros, incarne le désir soudain, celui qui saisit avant toute réflexion. Ce Valet ressent avant de comprendre — une attirance sincère, encore fragile."
},
"Cavalier de Coupes": {
  marseille:"Le Cavalier de Coupes avance lentement, coupe tendue devant lui : offre sincère, quête menée par le cœur plus que par la stratégie.",
  myth:"Énée, fils d'Aphrodite, quitta Troie en flammes en portant son père sur son dos, fidèle à ce qu'il aimait jusque dans la ruine. Ce Cavalier porte la même loyauté tranquille : il engage son cœur pour un temps long, pas pour un instant."
},
"Reine de Coupes": {
  marseille:"La Reine de Coupes regarde sa coupe fermée, comme un secret qu'elle seule connaît : intuition affective, réceptivité, beauté qui n'a pas besoin de se justifier.",
  myth:"Aphrodite, née de l'écume marine, incarne un amour qui échappe à toute logique et pourtant gouverne les dieux comme les hommes. Cette Reine ressent avec cette même acuité : rien ne lui échappe de ce qui touche au cœur."
},
"Roi de Coupes": {
  marseille:"Le Roi de Coupes reste stable sur une mer agitée, coupe en main : maîtrise émotionnelle, sagesse acquise à force d'avoir traversé bien des marées.",
  myth:"Nérée, vieillard bienveillant de la mer et père des cinquante Néréides, connaît toutes les vérités mais ne les impose jamais — il les révèle à qui sait le retenir. Ce Roi gouverne ses eaux intérieures avec cette même patience, sans jamais se laisser submerger."
},
"Valet d'Épées": {
  marseille:"Le Valet d'Épées observe, épée prête, l'esprit en alerte : curiosité vive, idées qui filent plus vite qu'elles ne se posent.",
  myth:"Zéphyr, le plus doux des vents, peut aussi bien caresser les fleurs que déraciner un arbre selon son humeur. Ce Valet a cette même vivacité changeante — un esprit brillant, encore à apprivoiser."
},
"Cavalier d'Épées": {
  marseille:"Le Cavalier d'Épées charge sans ralentir, épée haute : action décidée, parfois précipitée, qui préfère l'affrontement direct à l'attente.",
  myth:"Bellérophon, monté sur Pégase, terrassa la Chimère avec autant de courage que d'impétuosité — avant qu'un excès d'ambition ne précipite sa chute. Ce Cavalier porte la même bravoure fougueuse, à condition de ne pas viser plus haut que ce que la situation permet."
},
"Reine d'Épées": {
  marseille:"La Reine d'Épées tient son épée droite, le regard clair : discernement, indépendance d'esprit, décision prise sans se laisser attendrir inutilement.",
  myth:"Athéna, née tout armée de la tête de Zeus, conseille les héros sans jamais se laisser guider par la seule émotion — sa chouette voit dans l'obscurité ce que d'autres manquent. Cette Reine juge avec cette même lucidité, précieuse et parfois redoutée."
},
"Roi d'Épées": {
  marseille:"Le Roi d'Épées gouverne depuis son trône, épée verticale : autorité intellectuelle, décisions mesurées, contrôle exercé sur des forces qui pourraient autrement tout emporter.",
  myth:"Éole, gardien des vents, les enferme dans une outre pour n'en libérer que ce qui est nécessaire — un pouvoir sur des forces invisibles mais redoutables. Ce Roi maîtrise ses pensées avec la même rigueur, sans jamais les laisser se déchaîner sans raison."
},
"Valet de Deniers": {
  marseille:"Le Valet de Deniers observe une pièce avec attention, comme une graine qu'on examine avant de la semer : projet naissant, application studieuse, patience du débutant.",
  myth:"Chloris, déesse des fleurs, transforme d'un souffle chaque endroit qu'elle traverse en jardin. Ce Valet porte cette même promesse silencieuse — rien n'est encore visible, mais tout est déjà en germination."
},
"Cavalier de Deniers": {
  marseille:"Le Cavalier de Deniers avance sans se presser, dans un champ plutôt que sur un chemin de bataille : travail méthodique, constance préférée à la précipitation.",
  myth:"Triptolème reçut de Déméter un char ailé et des grains de blé pour enseigner l'agriculture au monde entier, patiemment, terre après terre. Ce Cavalier porte cette même vocation : transmettre un savoir utile, sans hâte inutile."
},
"Reine de Deniers": {
  marseille:"La Reine de Deniers tient son denier avec douceur, entourée d'abondance discrète : fertilité, capacité à faire grandir ce qui lui est confié, générosité concrète.",
  myth:"Perséphone traverse chaque année le monde souterrain puis en revient, faisant fleurir la terre à son retour. Cette Reine incarne cette même alternance féconde : elle sait que la croissance a besoin de ses saisons de repli."
},
"Roi de Deniers": {
  marseille:"Le Roi de Deniers siège entouré de richesse tangible : réussite matérielle installée, sens pratique, autorité fondée sur des résultats concrets et durables.",
  myth:"Ploutos, dieu de la richesse, fut rendu aveugle par Zeus afin qu'il distribue l'abondance sans favoritisme, à qui la mérite comme à qui ne la mérite pas. Ce Roi gère ce qu'il possède avec ce même sérieux — une prospérité qui doit encore être mise au service de quelque chose."
},

/* ----- Cartes numérales (40) — l'éclairage mythologique varie librement au fil des nombres ----- */
"As de Bâtons": {
  marseille:"L'As de Bâtons est une main qui surgit des nuages, tenant un bâton en bourgeon : énergie brute encore intacte, désir d'agir qui ne demande qu'à s'exprimer.",
  myth:"Hormos personnifie l'élan qui précède toute action, avant même qu'un but précis ne soit choisi — honoré à Athènes aux côtés de la Pitié, comme s'il fallait tempérer une force aussi brute (voir la fiche « Hormos »). Cet As est ce don initial, à apprivoiser plutôt qu'à redouter."
},
"2 de Bâtons": {
  marseille:"Un personnage tient le globe d'une main et un bâton de l'autre, regardant au loin depuis ses remparts : premier choix de direction, projet qui hésite encore entre deux voies.",
  myth:"Artémis, encore enfant, choisit elle-même son domaine et son mode de vie plutôt que d'attendre qu'on les lui impose — l'arc, les montagnes sauvages, l'indépendance (voir la fiche « Artémis »). Cette carte pose la même question : quelle direction donner à une énergie qui ne demande qu'à partir ?"
},
"3 de Bâtons": {
  marseille:"Trois bâtons plantés en terre, un personnage regarde des navires s'éloigner vers l'horizon : entreprise lancée, expansion, résultats encore à venir mais déjà en mouvement.",
  myth:"Arès, une fois la guerre déclarée, ne la négocie plus : l'élan brut qu'il personnifie n'attend que l'issue qu'il a lui-même déjà mise en mouvement (voir la fiche « Arès »). Cette carte est cette même attente active, tournée vers ce qui vient."
},
"4 de Bâtons": {
  marseille:"Quatre bâtons soutiennent une guirlande de fleurs, deux figures célèbrent devant : stabilité heureuse, fondations posées, moment de répit mérité après l'effort.",
  myth:"Thalia, l'une des trois Charites, personnifie justement la fête et l'abondance qui n'ont besoin de rien justifier d'autre qu'elles-mêmes (voir la fiche « Thalia »). Cette carte célèbre ce même palier stable, un seuil franchi qu'il ne reste qu'à savourer."
},
"5 de Bâtons": {
  marseille:"Cinq personnages croisent leurs bâtons dans un désordre apparent : rivalité, tension d'énergies qui s'opposent sans qu'aucune ne prenne clairement le dessus.",
  myth:"Zelos personnifie précisément cette ardeur rivale, frère de la Victoire elle-même mais jamais son garant (voir la fiche « Zelos »). Cette carte invite à voir le conflit comme un frottement nécessaire, pas une catastrophe."
},
"6 de Bâtons": {
  marseille:"Un cavalier couronné de laurier avance entouré de bâtons, acclamé par d'autres : victoire reconnue publiquement, effort enfin récompensé et validé par les autres.",
  myth:"Bia, la Force qui exécute sans jamais discuter, siège depuis la victoire sur les Titans à la place d'honneur que sa loyauté lui a value, jamais remise en question (voir la fiche « Bia »). Cette carte est cette même reconnaissance méritée, célébrée devant témoins."
},
"7 de Bâtons": {
  marseille:"Un personnage en position haute défend sa place avec un bâton contre six autres levés vers lui : résistance, position à défendre, courage face à une pression multiple.",
  myth:"Agon, personnification de la compétition codifiée, honoré à Olympie aux côtés des concours sportifs, est précisément ce terrain qu'il faut sans cesse redéfendre face à qui veut le prendre (voir la fiche « Agon »). Cette carte est cette même ténacité — tenir bon, même sans certitude de l'issue."
},
"8 de Bâtons": {
  marseille:"Huit bâtons filent dans les airs, en plein vol, vers un but encore invisible : accélération soudaine, événements qui se précipitent après une période d'attente.",
  myth:"Borée, dieu du vent du Nord et le plus violent des quatre Anémoi, souffle avec une force capable de fracasser une flotte entière ou d'emporter en un instant ce qui se dresse sur son passage (voir la fiche « Borée »). Cette carte est ce même mouvement rapide, presque impossible à ralentir une fois lancé."
},
"9 de Bâtons": {
  marseille:"Un personnage blessé mais debout tient son dernier bâton, huit autres dressés derrière lui en rempart : résilience, vigilance maintenue malgré la fatigue accumulée.",
  myth:"Alké personnifie la vaillance martiale, cette fermeté qui tient la ligne dans l'épreuve sans jamais chercher l'éclat (voir la fiche « Alké »). Cette carte est cette endurance presque épuisée mais qui refuse encore de céder."
},
"10 de Bâtons": {
  marseille:"Un personnage courbé porte dix bâtons vers une maison au loin : charge lourde, responsabilités accumulées, but presque atteint mais au prix d'un fardeau conséquent.",
  myth:"Kratos, personnification de la Puissance souveraine, est celui qui fait exécuter les ordres de Zeus jusqu'au bout, quel que soit le poids de la tâche (voir la fiche « Kratos »). Cette carte questionne cette même charge : est-elle encore nécessaire à porter seul jusqu'au bout ?"
},
"As de Coupes": {
  marseille:"Une main sort des nuages, offrant une coupe débordante d'où jaillissent cinq jets d'eau : émotion neuve et généreuse, cœur ouvert avant toute retenue.",
  myth:"Philotès, personnification de l'affection et du désir partagé (voir la fiche « Philotès »), incarne cet élan qui donne sans calcul ni condition. Cet As est ce même premier don, avant même de savoir ce qu'il en coûtera."
},
"2 de Coupes": {
  marseille:"Deux figures échangent leurs coupes face à face, un caducée ailé entre elles : union, réciprocité, lien affectif qui se noue à parts égales.",
  myth:"Harmonie et Cadmos, fondateur de Thèbes, furent unis lors de noces où tous les dieux de l'Olympe vinrent en personne (voir les fiches « Harmonie » et « Cadmos »). Cette carte célèbre cet échange équilibré, où chacun donne autant qu'il reçoit."
},
"3 de Coupes": {
  marseille:"Trois figures lèvent leur coupe ensemble, en cercle, entourées de fruits : joie partagée, célébration collective, abondance émotionnelle vécue à plusieurs.",
  myth:"Euphrosyne, l'une des trois Charites, personnifie la joie qui ne se vit jamais seule (voir la fiche « Euphrosyne »). Cette carte est cette même allégresse qui a besoin d'être vécue à plusieurs pour prendre tout son sens."
},
"4 de Coupes": {
  marseille:"Un personnage assis sous un arbre regarde trois coupes sans réaction, une quatrième lui est tendue depuis un nuage : lassitude, indifférence face à une opportunité pourtant offerte.",
  myth:"Hypnos, dieu du Sommeil (voir la fiche « Hypnos »), veille sur ce même assoupissement où plus rien, pas même une offrande tendue, ne parvient à percer. Cette carte avertit de ce même risque : trop enfermé dans son propre repos, on peut laisser passer ce qui mériterait un regard."
},
"5 de Coupes": {
  marseille:"Un personnage en deuil contemple trois coupes renversées, sans voir les deux qui restent debout derrière lui : regret, attention entièrement fixée sur la perte plutôt que sur ce qui subsiste.",
  myth:"Orphée, en se retournant vers Eurydice un instant trop tôt au sortir des Enfers, la perdit une seconde fois, cette fois pour toujours (voir la fiche « Orphée »). Cette carte rappelle cette même leçon : le chagrin est légitime, mais il ne doit pas aveugler sur ce qui reste encore possible."
},
"6 de Coupes": {
  marseille:"Deux enfants échangent des coupes fleuries dans un jardin paisible : nostalgie douce, souvenir d'enfance, tendresse simple retrouvée sans calcul.",
  myth:"Ariane offrit à Thésée son fil sans rien exiger en retour, sinon la confiance qu'il revienne (voir la fiche « Ariane »). Cette carte est ce même geste : une tendresse donnée sans calcul, avec la simplicité d'un souvenir d'enfance."
},
"7 de Coupes": {
  marseille:"Sept coupes flottent dans les nuages, chacune contenant une image différente — trésor, serpent, couronne : choix multiples, illusions à démêler avant de décider vraiment.",
  myth:"Circé offrait à ses visiteurs des breuvages aux apparences trompeuses, séduisants mais rarement ce qu'ils semblaient être (voir la fiche « Circé »). Cette carte invite à la même vigilance : toutes les promesses ne se valent pas, il faut regarder au-delà du reflet."
},
"8 de Coupes": {
  marseille:"Un personnage s'éloigne de nuit, laissant huit coupes soigneusement empilées derrière lui : départ volontaire, quête de sens qui prime sur ce qui a déjà été construit.",
  myth:"Ulysse, après une année entière passée sur l'île de Circé (voir les fiches « Ulysse » et « Circé »), choisit de reprendre la mer vers Ithaque plutôt que de s'installer dans un confort déjà acquis. Cette carte est ce même choix de partir vers autre chose, même en laissant de l'acquis derrière soi."
},
"9 de Coupes": {
  marseille:"Un personnage satisfait est assis, bras croisés, devant neuf coupes alignées en arc : contentement, désirs comblés, bien-être qui n'a plus besoin de rien démontrer.",
  myth:"Hébé versait aux dieux de l'Olympe le nectar et l'ambroisie, la boisson même de l'immortalité (voir la fiche « Hébé »). Cette carte est ce même sentiment d'accomplissement, tranquille et suffisant, qui n'attend plus rien d'ailleurs."
},
"10 de Coupes": {
  marseille:"Une famille réunie lève les bras vers un arc-en-ciel de dix coupes au-dessus d'elle : bonheur familial accompli, harmonie durable, joie qui se transmet au-delà de soi.",
  myth:"Hyménée, dieu du mariage qu'on invoquait à voix haute à chaque noce pour qu'elle ne tourne jamais au malheur (voir la fiche « Hyménée »), préside à cette même joie qui se transmet des mariés jusqu'aux enfants qui dansent déjà sous le même arc. Cette carte est ce bonheur qui rayonne et se partage, plutôt que de rester enfermé."
},
"As de Épées": {
  marseille:"Une main tient une épée droite couronnée de laurier et de palme : idée claire, vérité qui perce, décision prise avec une netteté qui ne laisse pas de place au doute.",
  myth:"Aletheia, personnification de la Vérité, ne connaît pas de demi-mesure : son nom même signifie « ce qui échappe à l'oubli » (voir la fiche « Aletheia »). Cet As porte cette même force tranchante : une pensée juste, mais qui exige d'être entendue telle quelle."
},
"2 de Épées": {
  marseille:"Une figure aux yeux bandés tient deux épées croisées sur sa poitrine, dos à la mer : indécision assumée, équilibre précaire entre deux choix qu'on refuse encore de trancher.",
  myth:"Ananké, déesse primordiale de la Nécessité, enlace le temps lui-même depuis l'origine du monde — même les dieux s'inclinent devant ses décrets (voir la fiche « Ananké »). Cette carte est ce moment suspendu où l'on refuse encore de choisir, avant que la nécessité, tôt ou tard, ne tranche à sa place."
},
"3 de Épées": {
  marseille:"Trois épées transpercent un cœur rouge sous un ciel d'orage : douleur nette, vérité blessante mais nécessaire, rupture qui ne peut plus être évitée.",
  myth:"Éris, déesse de la Discorde, jeta parmi les invités des noces de Thétis une pomme d'or portant trois mots : « à la plus belle » — un geste minuscule qui déclencha la guerre de Troie (voir la fiche « Éris »). Cette carte est cette même blessure précise, une vérité jetée sans retour possible, qu'il faut traverser plutôt que nier."
},
"4 de Épées": {
  marseille:"Une figure allongée repose sur un tombeau, trois épées suspendues au mur et une sous elle : retrait nécessaire, repos de l'esprit après une période de tension.",
  myth:"Lethée, fleuve de l'Oubli, offre aux âmes épuisées le repos d'oublier un temps ce qui les a usées (voir la fiche « Lethée »). Cette carte invite à cette même pause volontaire : l'esprit a parfois besoin de silence pour se réparer."
},
"5 de Épées": {
  marseille:"Un personnage ramasse trois épées avec un sourire ambigu tandis que deux figures s'éloignent, tête baissée : victoire à coût élevé, conflit gagné mais qui laisse un goût amer.",
  myth:"Némésis, déesse de la rétribution, rétablit toujours l'équilibre lorsque l'orgueil dépasse sa juste mesure (voir la fiche « Némésis »). Cette carte questionne le prix réel de certaines victoires — celles qui isolent plus qu'elles ne rassemblent."
},
"6 de Épées": {
  marseille:"Un passeur conduit une barque chargée d'épées vers une rive plus calme, deux silhouettes assises à l'arrière : transition, éloignement volontaire d'une zone de trouble vers plus de sérénité.",
  myth:"Palioxis, personnification du reflux d'une armée en déroute dans le cortège d'Arès, n'incarne jamais la défaite elle-même, mais le moment où continuer le combat cesserait d'avoir un sens (voir la fiche « Palioxis »). Cette carte est ce même mouvement : quitter une eau agitée pour une autre, plus tranquille."
},
"7 de Épées": {
  marseille:"Un personnage s'éloigne d'un camp en emportant cinq épées, en laissant deux derrière lui, avec un air furtif : stratégie, action menée en partie seule, discrétion parfois nécessaire.",
  myth:"Apaté, personnification de la Tromperie, sait exactement jusqu'où une ruse peut aller sans jamais tout à fait devenir un mensonge déclaré (voir la fiche « Apaté »). Cette carte est cette même intelligence tactique — efficace, mais qui flirte parfois avec la limite de l'honnêteté."
},
"8 de Épées": {
  marseille:"Une figure entravée et les yeux bandés se tient debout, entourée de huit épées plantées en cercle : sentiment d'enfermement, obstacles qui semblent infranchissables — mais le chemin entre les épées reste ouvert.",
  myth:"Phobos, personnification de la Peur, brandi sur les boucliers pour faire vaciller des rangs entiers avant même le premier coup porté (voir la fiche « Phobos »). Cette carte rappelle que l'entrave est souvent plus mentale que réellement définitive."
},
"9 de Épées": {
  marseille:"Un personnage se réveille en sursaut, le visage dans les mains, neuf épées suspendues au-dessus de lui : angoisse nocturne, pensées ressassées qui empêchent le repos.",
  myth:"Morphée, dieu des songes, sait façonner dans le rêve des visions si parfaites qu'elles se confondent avec la réalité — y compris celles qu'on ne voudrait jamais voir (voir la fiche « Morphée »). Cette carte est cette même nuit agitée — mais le jour, souvent, dissipe ce que la nuit avait grossi."
},
"10 de Épées": {
  marseille:"Un personnage gît au sol, transpercé de dix épées, sous un ciel qui commence pourtant à s'éclaircir à l'horizon : fin brutale d'un cycle, mais aussi le signe qu'il ne peut plus rien empirer après cela.",
  myth:"Thanatos, personnification de la mort paisible, n'est jamais cruel — seulement inévitable, quoi qu'on tente pour l'enchaîner (voir la fiche « Thanatos »). Cette carte est ce point le plus bas d'où, justement, il ne reste qu'à se relever."
},
"As de Deniers": {
  marseille:"Une main tient un unique denier doré au-dessus d'un jardin fleuri : opportunité concrète, début tangible, promesse de croissance matérielle bien enracinée.",
  myth:"Gaïa, mère de toute chose, fait surgir de la terre elle-même tout ce qui nourrit et fait vivre. Cet As est ce même don originel — une graine bien réelle, qui ne demande qu'à être plantée avec soin."
},
"2 de Deniers": {
  marseille:"Un personnage jongle avec deux deniers reliés par un ruban en forme d'infini, un navire tanguant en arrière-plan : adaptation, équilibre à maintenir entre plusieurs priorités concrètes.",
  myth:"Protée, dieu marin insaisissable, changeait sans cesse de forme pour s'ajuster à chaque situation plutôt que d'y résister. Cette carte demande cette même souplesse : jongler sans perdre l'équilibre."
},
"3 de Deniers": {
  marseille:"Un artisan sculpte une pierre dans une abbaye, deux figures consultent ses plans à ses côtés : travail collectif, compétence reconnue, projet qui prend forme grâce à la collaboration.",
  myth:"Héphaïstos ne construisait jamais seul les grandes œuvres de l'Olympe : les Cyclopes et d'autres artisans divins unissaient leur savoir-faire au sien. Cette carte célèbre ce même travail à plusieurs mains, plus solide que tout effort isolé."
},
"4 de Deniers": {
  marseille:"Un personnage serre fermement un denier contre sa poitrine, deux sous ses pieds, un sur sa tête : contrôle, besoin de sécurité qui peut virer à la rigidité si l'on s'y accroche trop fort.",
  myth:"Ploutos, rendu aveugle, distribue la richesse sans toujours voir à qui elle profite vraiment — un excès de retenue peut, comme un excès de largesse, priver l'abondance de son sens. Cette carte questionne ce qu'on retient peut-être trop fort pour rien."
},
"5 de Deniers": {
  marseille:"Deux personnages démunis passent devant un vitrail éclairé sans y entrer, dans le froid : période difficile, sentiment d'exclusion — alors qu'un refuge est pourtant tout proche.",
  myth:"Déméter, en deuil, laissa la terre entière stérile et froide, aveugle un temps aux dieux qui pourtant cherchaient à l'aider. Cette carte rappelle que même dans l'épreuve, un secours reste parfois à portée, si l'on accepte de le voir."
},
"6 de Deniers": {
  marseille:"Un marchand pèse et distribue des pièces à deux mendiants agenouillés : générosité, échange, redistribution équilibrée entre celui qui a et celui qui a besoin.",
  myth:"Triptolème, formé par Déméter, ne garda pas pour lui seul le secret de l'agriculture : il le porta de terre en terre pour que chacun en profite. Cette carte est ce même geste de partage, juste et mesuré."
},
"7 de Deniers": {
  marseille:"Un cultivateur s'appuie sur sa houe, contemplant sept deniers accrochés à un buisson : évaluation, pause dans l'effort pour juger si la récolte à venir vaut la peine investie.",
  myth:"Triptolème encore, entre deux semailles, devait attendre que la terre fasse son œuvre sans pouvoir en précipiter le cours. Cette carte est ce temps d'observation patiente, avant de savoir si l'effort portera ses fruits."
},
"8 de Deniers": {
  marseille:"Un artisan burine ses deniers un à un, appliqué, dans un atelier ordonné : travail méthodique, perfectionnement d'un savoir-faire par la répétition patiente.",
  myth:"Héphaïstos, encore, ne façonnait ses œuvres les plus admirables — le bouclier d'Achille, les filets invisibles — qu'après d'innombrables heures à la forge. Cette carte est cette même maîtrise qui ne s'acquiert que par la pratique répétée."
},
"9 de Deniers": {
  marseille:"Une figure élégante se tient seule dans un jardin abondant, un faucon sur le poing : indépendance, aisance acquise par soi-même, plaisir tranquille d'une réussite qui n'a plus rien à prouver.",
  myth:"Cybèle, déesse de la terre nourricière, régnait sur une abondance sauvage qu'elle seule savait apprivoiser, libre et souveraine. Cette carte est cette même autonomie sereine, faite d'un travail déjà accompli."
},
"10 de Deniers": {
  marseille:"Une famille sur trois générations se tient réunie dans une cour prospère, entourée de dix deniers : héritage, réussite durable qui dépasse la seule réussite individuelle pour se transmettre.",
  myth:"Gaïa, mère originelle, engendra les générations divines qui façonnèrent le monde bien après elle — une fondation si solide qu'elle continue de porter tout ce qui est venu ensuite. Cette carte est cet aboutissement qui se transmet, plutôt que de s'arrêter à soi."
}
};

// Images (base64) — les 22 majeurs ont une illustration complète ; les cartes de cour et
// numérales restent en glyphe/pips pour le moment, sauf celles ajoutées ci-dessous au fil
// de l'illustration progressive du jeu (56 cartes mineures au total).
const CARD_IMAGES = {};
Object.assign(CARD_IMAGES, {
  "Le Mat": "assets/card-0-lemat.jpg",
  "I — Le Bateleur": "assets/card-1-bateleur.jpg",
  "II — La Papesse": "assets/card-2-papesse.jpg",
  "III — L'Impératrice": "assets/card-3-imperatrice.jpg",
  "IV — L'Empereur": "assets/card-4-empereur.jpg",
  "V — Le Pape": "assets/card-5-pape.jpg",
  "VI — L'Amoureux": "assets/card-6-amoureux.jpg",
  "VII — Le Chariot": "assets/card-7-chariot.jpg",
  "VIII — La Justice": "assets/card-8-justice.jpg",
  "IX — L'Hermite": "assets/card-9-hermite.jpg",
  "X — La Roue de Fortune": "assets/card-10-rouedefortune.jpg",
  "XI — La Force": "assets/card-11-force.jpg",
  "XII — Le Pendu": "assets/card-12-pendu.jpg",
  "XIII — L'Arcane sans nom": "assets/card-13-arcanesansnom.jpg",
  "XIV — Tempérance": "assets/card-14-temperance.jpg",
  "XV — Le Diable": "assets/card-15-diable.jpg",
  "XVI — La Maison-Dieu": "assets/card-16-maisondieu.jpg",
  "XVII — L'Étoile": "assets/card-17-etoile.jpg",
  "XVIII — La Lune": "assets/card-18-lune.jpg",
  "XIX — Le Soleil": "assets/card-19-soleil.jpg",
  "XX — Le Jugement": "assets/card-20-jugement.jpg",
  "XXI — Le Monde": "assets/card-21-monde.jpg",
  // Cartes numérales d'Épées (1-10) — le jeu numéral complet de cette enseigne est
  // désormais illustré.
  "As de Épées": "assets/card-epees-1.jpg",
  "2 de Épées": "assets/card-epees-2.jpg",
  "3 de Épées": "assets/card-epees-3.jpg",
  "4 de Épées": "assets/card-epees-4.jpg",
  "5 de Épées": "assets/card-epees-5.jpg",
  "6 de Épées": "assets/card-epees-6.jpg",
  "7 de Épées": "assets/card-epees-7.jpg",
  "8 de Épées": "assets/card-epees-8.jpg",
  "9 de Épées": "assets/card-epees-9.jpg",
  "10 de Épées": "assets/card-epees-10.jpg",
  // Figures de cour d'Épées — leur divinité (Zéphyr, Bellérophon, Athéna, Éole) était déjà
  // connue via COURTS, seule l'illustration manquait. Le jeu de cour d'Épées est
  // maintenant complet.
  "Valet d'Épées": "assets/card-epees-valet.jpg",
  "Cavalier d'Épées": "assets/card-epees-cavalier.jpg",
  "Reine d'Épées": "assets/card-epees-reine.jpg",
  "Roi d'Épées": "assets/card-epees-roi.jpg",
  // Cartes numérales de Bâtons (1-10) — le jeu numéral complet de cette enseigne est
  // désormais illustré.
  "As de Bâtons": "assets/card-batons-1.jpg",
  "2 de Bâtons": "assets/card-batons-2.jpg",
  "3 de Bâtons": "assets/card-batons-3.jpg",
  "4 de Bâtons": "assets/card-batons-4.jpg",
  "5 de Bâtons": "assets/card-batons-5.jpg",
  "6 de Bâtons": "assets/card-batons-6.jpg",
  "7 de Bâtons": "assets/card-batons-7.jpg",
  "8 de Bâtons": "assets/card-batons-8.jpg",
  "9 de Bâtons": "assets/card-batons-9.jpg",
  "10 de Bâtons": "assets/card-batons-10.jpg",
  // Figures de cour de Bâtons — Valet (Éos), Cavalier (Niké), Reine (Hestia) et Roi
  // (Héphaïstos) : leur divinité était déjà connue via COURTS, seule l'illustration
  // manquait. Le jeu de cour de Bâtons est maintenant complet.
  "Valet de Bâtons": "assets/card-batons-valet.jpg",
  "Cavalier de Bâtons": "assets/card-batons-cavalier.jpg",
  "Reine de Bâtons": "assets/card-batons-reine.jpg",
  "Roi de Bâtons": "assets/card-batons-roi.jpg",
  // Cartes numérales de Coupes (1-10) et désormais ses 4 figures de cour — l'enseigne de
  // Coupes est intégralement illustrée, comme Épées et Bâtons avant elle.
  "As de Coupes": "assets/card-coupes-1.jpg",
  "2 de Coupes": "assets/card-coupes-2.jpg",
  "3 de Coupes": "assets/card-coupes-3.jpg",
  "4 de Coupes": "assets/card-coupes-4.jpg",
  "5 de Coupes": "assets/card-coupes-5.jpg",
  "6 de Coupes": "assets/card-coupes-6.jpg",
  "7 de Coupes": "assets/card-coupes-7.jpg",
  "8 de Coupes": "assets/card-coupes-8.jpg",
  "9 de Coupes": "assets/card-coupes-9.jpg",
  "10 de Coupes": "assets/card-coupes-10.jpg",
  "Valet de Coupes": "assets/card-coupes-valet.jpg",
  "Cavalier de Coupes": "assets/card-coupes-cavalier.jpg",
  "Reine de Coupes": "assets/card-coupes-reine.jpg",
  "Roi de Coupes": "assets/card-coupes-roi.jpg",
});

// Cartes numérales dotées d'une figure mythologique propre (contrairement aux autres
// cartes numérales, qui partagent encore un simple mot générique entre les 4 enseignes —
// voir NUMBER_KEYS) : la divinité associée prend la place de ce mot générique dans les
// écrans de détail (voir cardDeityLabel() ci-dessous), exactement comme pour les majeurs
// et les figures de cour. Pour l'instant limité aux cartes numérales illustrées
// (CARD_IMAGES ci-dessus) ; à étendre au fil des prochaines illustrations mineures. Les
// figures de cour n'ont pas besoin d'entrée ici : COURTS leur attribue déjà une divinité
// propre nativement (c[1]), contrairement aux cartes numérales.
const NUMBER_CARD_DEITY = {
  "As de Épées": "aletheia",
  "2 de Épées": "ananké",
  "3 de Épées": "éris",
  "4 de Épées": "lethée",
  "5 de Épées": "némésis",
  "6 de Épées": "palioxis",
  "7 de Épées": "apaté",
  "8 de Épées": "phobos",
  "As de Bâtons": "hormos",
  "2 de Bâtons": "artémis",
  "3 de Bâtons": "arès",
  "4 de Bâtons": "thalia",
  "5 de Bâtons": "zelos",
  "6 de Bâtons": "bia",
  "7 de Bâtons": "agon",
  "8 de Bâtons": "borée",
  "9 de Bâtons": "alké",
  "10 de Bâtons": "kratos",
  "9 de Épées": "morphée",
  "10 de Épées": "thanatos",
  "As de Coupes": "philotès",
  "2 de Coupes": "harmonie",
  "3 de Coupes": "euphrosyne",
  "4 de Coupes": "hypnos",
  "5 de Coupes": "orphée",
  "6 de Coupes": "ariane",
  "7 de Coupes": "circé",
  "8 de Coupes": "ulysse",
  "9 de Coupes": "hébé",
  "10 de Coupes": "hyménée",
};
// Symboles propres à une carte numérale précise (une fois illustrée avec sa propre figure,
// voir NUMBER_CARD_DEITY ci-dessus), utilisés par allCards() à la place de la formule
// générique `${NUMBER_KEYS[n][1]} · ${SUITS[suit][3]}`, partagée par toutes les cartes du
// même rang ou de la même enseigne. Sans cette table, impossible de relier par exemple
// "Artémis" à la seule carte "2 de Bâtons" sans l'associer aussi à "2 de Coupes", "2 de
// Épées" et "2 de Deniers" (même rang) ou à tout le reste des Bâtons (même enseigne).
const NUMBER_CARD_SYMBOLS = {
  "2 de Bâtons": "forêt · temple · arc · cerf · flèche",
  "9 de Épées": "pavot",
  "As de Coupes": "colombe · eau",
  "2 de Coupes": "caducée",
  "4 de Coupes": "pavot",
  "5 de Coupes": "lyre · monde souterrain",
  "8 de Coupes": "mer",
  "10 de Coupes": "torches",
};
// Nom affiché comme "divinité" d'une carte dans les écrans de détail : la figure propre
// à la carte si elle existe (NUMBER_CARD_DEITY), sinon c[1] tel quel (le nom du dieu pour
// un majeur/figure de cour, ou le mot générique du nombre pour une carte numérale pas
// encore illustrée).
function cardDeityLabel(c){
  const id = NUMBER_CARD_DEITY[c[0]];
  return id ? (id.charAt(0).toUpperCase() + id.slice(1)) : c[1];
}

// Le 5e champ (absent des lignes qui n'en ont pas encore un de vraiment établi) liste les
// symboles de SYMBOL_LIBRARY (identifiants, pas les libellés) mythologiquement rattachés à
// cette figure — utilisé par allCards()/cardsForSymbol() pour peupler "Cartes concernées"
// sur la fiche de ces symboles, jusqu'ici toujours vide pour toute figure de cour (voir le
// commentaire dans allCards()).
const COURTS = {
"Bâtons":[
["Valet de Bâtons","Éos","🌅","Éveil · impulsion · potentiel","aurore · étoiles"],
["Cavalier de Bâtons","Niké","🏆","Élan · conquête · victoire","ailes"],
["Reine de Bâtons","Hestia","🔥","Feu intérieur · confiance · stabilité","feu"],
["Roi de Bâtons","Héphaïstos","⚒","Création · maîtrise · transformation","sceptre · torche · soleil"]
],
"Coupes":[
["Valet de Coupes","Himeros","💗","Désir naissant · sensibilité · attirance"],
["Cavalier de Coupes","Énée","⛵","Quête · voyage du cœur · engagement"],
["Reine de Coupes","Aphrodite","🕊","Amour · beauté · désir · réceptivité","colombe · rose · myrte · pomme · miroir"],
["Roi de Coupes","Nérée","🌊","Profondeur · sagesse · vérité émotionnelle","mer"]
],
"Épées":[
["Valet d'Épées","Zéphyr","🍃","Curiosité · rapidité · esprit vif","air"],
["Cavalier d'Épées","Bellérophon","🐎","Action · courage · confrontation","pégase"],
["Reine d'Épées","Athéna","🦉","Discernement · stratégie · intelligence","chouette · araignée · olivier · olive · pomme · serpent · flûte · torche · corbeau"],
["Roi d'Épées","Éole","🌬","Autorité · contrôle · maîtrise des forces de l'air"]
],
"Deniers":[
["Valet de Deniers","Chloris","🌸","Germination · potentiel · croissance"],
["Cavalier de Deniers","Triptolème","🌾","Travail · transmission · agriculture","blé"],
["Reine de Deniers","Perséphone","🌺","Cycles · fertilité · renaissance","monde souterrain · grenade · torches · torche · épis · blé · pavot · crocus · graine · terre"],
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

// Types de tirage proposés dans l'onglet Tirage. "general" est le tirage historique de
// l'app (inchangé) ; les autres réutilisent exactement le même mécanisme (pioche face
// cachée, choix manuel, lecture IA ou repli local) avec un nombre de cartes et des
// intitulés de position différents.
const SPREADS = {
  general: {
    key:"general", name:"Tirage général", glyph:"✦",
    description:"Le tirage classique : une lecture ouverte sur ta question.",
    count:3, poolSize:15,
    positions:["Passé récent","Situation actuelle","Évolution possible"],
  },
  yesno: {
    key:"yesno", name:"Oui / Non", glyph:"◐",
    description:"Une carte, une réponse directe et nuancée.",
    count:1, poolSize:9,
    positions:["Réponse"],
  },
  amour: {
    key:"amour", name:"Amour", glyph:"♡",
    description:"Un éclairage sur toi, l'autre, et ce qui se joue entre vous.",
    count:3, poolSize:15,
    positions:["Toi","L'autre","La relation"],
  },
  celtic: {
    key:"celtic", name:"Croix celtique", glyph:"✛",
    description:"Le grand tirage classique, pour une question qui mérite une vraie exploration.",
    count:10, poolSize:24,
    positions:["Situation actuelle","Défi","Racine (passé)","Passé récent","Ce qui te guide","Futur proche","Toi-même","Entourage","Espoirs et craintes","Résultat"],
  },
  annee: {
    key:"annee", name:"Année à venir", glyph:"❋",
    description:"Un aperçu mois par mois, de maintenant jusqu'à la fin de l'année.",
    count:12, poolSize:24, // valeurs par défaut ; count/positions réellement utilisés sont
    // recalculés dynamiquement dans spreadConf() (voir remainingMonthsPositions ci-dessous).
    positions:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],
  },
};
const MONTH_NAMES = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
// Le tirage "Année à venir" ne pioche que pour les mois restants de l'année en cours
// (mois courant inclus) plutôt que toujours 12 cartes — inutile de tirer une carte pour
// un mois déjà passé.
function remainingMonthsPositions(now){
  return MONTH_NAMES.slice((now||new Date()).getMonth());
}
// Question posée par défaut pour "Année à venir" : ce tirage n'a pas de question propre
// (voir tile-click dans bind()), on saute directement à la pioche.
const YEAR_DEFAULT_QUESTION = "Comment vont se dérouler les mois à venir, jusqu'à la fin de l'année ?";
function spreadConf(){
  const base = SPREADS[tirageState.spreadType] || SPREADS.general;
  if(base.key === "annee"){
    const positions = remainingMonthsPositions();
    return { ...base, count: positions.length, positions };
  }
  return base;
}

// Réduction numérologique classique : additionne les chiffres jusqu'à retomber sur un
// seul chiffre (1-9). Volontairement sans nombre maître (11/22/33) pour retomber
// systématiquement sur la même grammaire symbolique que les cartes numérales
// (NUMBER_KEYS) — réutilisée par nameNumerology() et par la numérologie du temps
// (personalYearNumber/personalMonthNumber) ci-dessous.
function reduceToDigit(n){
  n = Math.abs(Math.trunc(n));
  while(n > 9){
    n = String(n).split("").reduce((a,d)=>a+Number(d),0);
  }
  return n;
}

// Numérologie du prénom (méthode pythagoricienne classique : A=1, B=2… I=9, J=1…).
function nameNumerology(name){
  const normalized = (name||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toUpperCase();
  const letters = normalized.replace(/[^A-Z]/g,"");
  if(!letters) return null;
  let sum = 0;
  for(const ch of letters){
    const idx = ch.charCodeAt(0) - 65; // 0-25
    sum += (idx % 9) + 1;
  }
  return reduceToDigit(sum);
}

// Numérologie du temps : année, mois et jour personnels, à partir de la date de naissance
// ("AAAA-MM-JJ") et de la date du jour — formule classique (jour + mois de naissance +
// année en cours, puis + mois en cours, puis + jour en cours), même grammaire symbolique
// que le nombre du prénom (NUMBER_KEYS, réduit 1-9). Contrairement au nombre du prénom
// (fixe), ces trois-là évoluent avec le temps : l'année personnelle change chaque
// 1er janvier, le mois personnel chaque mois, le jour personnel chaque jour — une façon de
// situer où on en est dans son propre cycle, à trois échelles. Le jour personnel sert
// notamment à l'horoscope du jour (ritualSummary() ci-dessous) : contrairement au mois
// personnel, il garantit une donnée qui change réellement tous les jours.
function personalYearNumber(birthDate, now){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(birthDate||"")) return null;
  const [, month, day] = birthDate.split("-").map(Number);
  const year = (now||new Date()).getFullYear();
  return reduceToDigit(day + month + year);
}
function personalMonthNumber(birthDate, now){
  const py = personalYearNumber(birthDate, now);
  if(py === null) return null;
  const month = (now||new Date()).getMonth() + 1;
  return reduceToDigit(py + month);
}
function personalDayNumber(birthDate, now){
  const pm = personalMonthNumber(birthDate, now);
  if(pm === null) return null;
  const day = (now||new Date()).getDate();
  return reduceToDigit(pm + day);
}

/* ===================== BIBLIOTHÈQUE SYMBOLIQUE ÉTOFFÉE ===================== */
// id -> {icon, label, category, desc, links: [ids de divinités]}

const SYMBOL_LIBRARY = {
  // Lieux & passages
  "porte":{icon:"🚪",label:"Porte",category:"Lieux & passages",desc:"Seuil, choix à faire, passage d'un état à un autre.",links:[],lore:[
    "Dans la mythologie grecque, les portes ne sont jamais anodines : elles séparent deux mondes et marquent le moment où un choix devient irréversible.",
    "Homère décrit dans l'Odyssée deux portes du sommeil, l'une de corne, l'autre d'ivoire : les rêves qui passent par la porte de corne se réalisent, ceux qui passent par la porte d'ivoire ne sont que des illusions trompeuses. Franchir une porte n'est donc jamais un geste neutre — encore faut-il savoir laquelle on choisit.",
    "La porte la plus chargée de sens de toute l'Iliade est sans doute la porte Scée de Troie : c'est là qu'Hector fait ses adieux à Andromaque avant son dernier combat contre Achille, et c'est par elle que le vieux roi Priam sortira plus tard, seul et sans escorte, supplier le meurtrier de son fils de lui rendre son corps.",
    "Les portes des Enfers, elles, gardées par Cerbère, ne se franchissent que dans un sens pour les mortels ordinaires : entrer y est possible, en ressortir exige une faveur exceptionnelle.",
    "La porte est ainsi devenue un symbole de seuil, de choix décisif, de passage d'un état à un autre et de ce qui sépare l'illusion de la vérité.",
  ]},
  "chemin":{icon:"🛤",label:"Chemin",category:"Lieux & passages",desc:"Évolution en cours, quête, direction prise plutôt qu'imposée.",links:[],lore:[
    "Le chemin est l'un des symboles les plus anciens du choix humain, et la mythologie grecque en a fait une véritable scène philosophique.",
    "Selon un récit rapporté par le sophiste Prodicos, le jeune Héraclès, arrivé à un carrefour, vit apparaître deux figures : la Vertu, qui lui promettait une vie difficile mais glorieuse, et le Vice, qui lui promettait une vie facile mais sans grandeur. Héraclès dut choisir sa route avant même d'avoir accompli le moindre exploit.",
    "Le chemin que suivit Thésée pour rejoindre Athènes illustre la même idée sous un tout autre angle : plutôt que la route maritime, plus sûre, le jeune héros choisit délibérément la voie terrestre, infestée de brigands, et les vainquit un à un en chemin — Périphétès, Sinis, Sciron, Cercyon, Procruste — arrivant à la cour de son père déjà couvert de gloire, avant même d'y être reconnu.",
    "Le chemin qu'on choisit à ce carrefour engage tout ce qui suivra — non pas un simple décor, mais une direction qui façonne le reste de l'histoire.",
    "Le chemin est devenu un symbole de choix, de direction assumée, de quête et d'évolution en cours plutôt qu'imposée.",
  ]},
  "pont":{icon:"🌉",label:"Pont",category:"Lieux & passages",desc:"Transition, lien construit entre deux états qui semblaient séparés.",links:[],lore:[
    "Le pont est un symbole plus discret dans la mythologie grecque que la porte ou le chemin : les récits antiques franchissent plus souvent les frontières par un passeur (Charon sur le Styx) ou par les airs (Hermès, Iris) que par une construction humaine.",
    "C'est peut-être ce qui rend le pont particulier : contrairement au passeur qu'il faut payer ou au messager qu'il faut attendre, le pont est un lien qu'on peut bâtir soi-même entre deux rives qui semblaient séparées pour toujours.",
    "La tradition en offre malgré tout un exemple concret et rituel : lors de la procession sacrée qui menait chaque année les futurs initiés d'Athènes à Éleusis pour les Mystères, un homme masqué, posté sur le pont franchissant le Céphise, couvrait les passants de moqueries et d'insultes — un rite appelé les gephyrismoi (« railleries du pont »), comme si le pont exigeait qu'on y dépose son orgueil avant d'accéder au sacré.",
    "Il est ainsi devenu un symbole de transition choisie, de lien construit et de réconciliation entre deux états qui semblaient incompatibles.",
  ]},
  "grotte":{icon:"🕳",label:"Grotte",category:"Lieux & passages",desc:"Inconscient, retrait nécessaire, initiation loin du regard des autres.",links:[],lore:[
    "La grotte occupe une place à part dans la mythologie grecque : c'est un lieu caché, à l'écart du regard des dieux comme des hommes, où peuvent se produire des événements décisifs.",
    "Le mythe le plus célèbre est celui de la naissance de Zeus lui-même : pour le soustraire à son père Cronos, qui dévorait ses enfants, sa mère Rhéa le cacha dans une grotte du mont Ida, en Crète, où il fut élevé en secret jusqu'à pouvoir renverser son père.",
    "Les grottes abritent aussi des figures oraculaires, comme celle de Trophonios, où l'on descendait consulter un oracle si redoutable que ceux qui en ressortaient étaient dits ne plus jamais sourire.",
    "Homère en décrit une autre, plus paisible, dans l'Odyssée : la grotte des Nymphes sur l'île d'Ithaque, où les marins déposaient leurs offrandes. Elle possédait deux entrées, l'une réservée aux mortels, l'autre — tournée vers le nord — réservée aux seuls dieux, preuve qu'un même lieu caché peut ouvrir sur deux mondes selon la porte qu'on choisit d'emprunter.",
    "La grotte est devenue un symbole de retrait nécessaire, d'initiation loin du regard des autres et de protection avant de pouvoir affronter le monde.",
  ]},
  "montagne":{icon:"⛰",label:"Montagne",category:"Lieux & passages",desc:"Épreuve, élévation progressive, objectif qui se mérite.",links:[],lore:[
    "La montagne la plus importante de la mythologie grecque est bien sûr l'Olympe, demeure des dieux, si haute que son sommet touchait, croyait-on, le domaine céleste lui-même.",
    "Le mont Parnasse, non loin de Delphes, était quant à lui consacré à Apollon et aux Muses : c'est sur ses pentes que résonnait l'inspiration poétique et prophétique.",
    "Gravir une montagne dans l'imaginaire grec n'est donc jamais seulement un effort physique : c'est se rapprocher d'un savoir ou d'une présence qui ne se donne pas au niveau du sol.",
    "Le mont Pélion, en Thessalie, complète ce paysage sacré d'une autre manière : loin du faste de l'Olympe, c'est sur ses pentes boisées que le centaure Chiron éleva et forma les plus grands héros grecs — Achille, Jason, Asclépios — preuve qu'une montagne n'élève pas seulement vers les dieux, elle peut aussi façonner, à l'écart du monde, ceux qui deviendront des légendes.",
    "La montagne est devenue un symbole d'épreuve, d'élévation progressive et d'objectif qui se mérite à chaque pas.",
  ]},
  "forêt":{icon:"🌲",label:"Forêt",category:"Lieux & passages",desc:"Inconnu, instinct, risque de s'égarer avant de retrouver son chemin.",links:[],lore:[
    "La forêt appartient au domaine d'Artémis, déesse de la chasse et des espaces sauvages, qui y règne avec ses nymphes loin des cités et de leurs lois.",
    "C'est aussi le territoire de Pan, dieu à moitié bouc, dont la présence dans les bois profonds pouvait saisir le voyageur d'une terreur soudaine et irraisonnée — la « panique » lui doit d'ailleurs son nom.",
    "La forêt grecque n'est donc pas un simple décor : c'est un lieu où les repères de la civilisation s'effacent, où l'instinct reprend le dessus sur la raison.",
    "C'est aussi dans une forêt, celle du mont Érymanthe, qu'Héraclès dut traquer le sanglier monstrueux qui ravageait la région lors de son quatrième travail — une poursuite qui l'entraîna loin des sentiers connus, dans la neige et les broussailles, avant qu'il ne parvienne à capturer la bête vivante.",
    "Elle est devenue un symbole d'inconnu, d'instinct, de risque de s'égarer avant de retrouver son chemin — et de nature qui échappe à tout contrôle.",
  ]},
  "mer":{icon:"🌊",label:"Mer",category:"Lieux & passages",desc:"Inconscient, immensité, départ vers un ailleurs incertain.",links:["poséidon","nérée","ulysse"],lore:[
    "La mer appartient avant tout à Poséidon, dieu des océans et des tremblements de terre, dont l'humeur changeante pouvait aussi bien porter les navires que les briser.",
    "Elle abrite aussi des figures plus anciennes et plus paisibles, comme Nérée, le « Vieillard de la mer », doué de sagesse et de don de prophétie, père des cinquante Néréides.",
    "La mer réunit ainsi deux visages : la puissance instable de Poséidon et la sagesse discrète de Nérée — la même immensité peut engloutir ou révéler.",
    "Elle abrite aussi des dangers d'une tout autre nature : les Sirènes, dont le chant était si envoûtant qu'aucun marin ne pouvait y résister sans se jeter par-dessus bord, guettaient les navires près de leur île. Ulysse n'y échappa qu'en se faisant attacher au mât pendant que ses compagnons, les oreilles bouchées de cire, ramaient sans rien entendre.",
    "Elle est devenue un symbole d'inconscient, d'immensité, de départ vers un ailleurs incertain et de puissance qu'on ne maîtrise jamais complètement.",
    "La mer est particulièrement associée à Poséidon et à Nérée — et, dans le Tarot, à Ulysse.",
  ]},
  "rivière":{icon:"🏞",label:"Rivière",category:"Lieux & passages",desc:"Passage, changement continu, ce qui circule sans jamais s'arrêter.",links:[],lore:[
    "Les fleuves occupent une place à part dans la mythologie grecque : ce sont des divinités à part entière, et certains d'entre eux marquent la frontière entre le monde des vivants et celui des morts.",
    "Le Styx, fleuve des Enfers, est si sacré que les dieux eux-mêmes prêtaient sur ses eaux leurs serments les plus solennels — un serment fait sur le Styx ne pouvait jamais être rompu. Le Léthé, lui, faisait oublier aux âmes leur vie passée à celles qui buvaient de ses eaux avant de renaître.",
    "C'est aussi dans les eaux du Styx que Thétis plongea son fils Achille encore nourrisson, pour le rendre invulnérable — le tenant par le talon, seul point de son corps que le fleuve ne put jamais atteindre, et qui devait plus tard causer sa mort.",
    "Une rivière, dans cet imaginaire, n'est donc jamais un simple obstacle : elle engage, elle efface, elle fait passer d'un état à un autre sans retour possible.",
    "La rivière est devenue un symbole de passage, de changement continu et de ce qui circule sans jamais s'arrêter — parfois au prix d'un serment ou d'un oubli.",
  ]},
  "temple":{icon:"🏛",label:"Temple",category:"Lieux & passages",desc:"Connaissance sacrée, initiation, seuil entre le profane et le sacré.",links:[],lore:[
    "Le temple est le lieu où le sacré se rend accessible aux mortels, sans jamais leur appartenir tout à fait.",
    "Le plus célèbre d'entre eux, pour ce tarot, est sans doute le temple d'Apollon à Delphes, où la Pythie, assise sur son trépied, rendait des oracles réputés infaillibles — et où était gravée la maxime « Connais-toi toi-même ».",
    "Franchir le seuil d'un temple, c'était donc quitter le monde profane pour entrer dans un espace où la parole divine pouvait se faire entendre, à condition de savoir l'écouter.",
    "Le temple d'Artémis à Éphèse comptait, lui, parmi les Sept Merveilles du monde antique : reconstruit plusieurs fois après avoir été détruit, notamment par un incendie volontaire resté tristement célèbre, il attirait des pèlerins de toute l'Asie Mineure — preuve qu'un temple, une fois consacré, peut renaître de ses propres cendres aussi souvent qu'il le faut.",
    "Le temple est devenu un symbole de savoir sacré, d'initiation et de seuil entre le monde profane et ce qui le dépasse.",
  ]},
  "monde souterrain":{icon:"⚱",label:"Enfer / monde souterrain",category:"Lieux & passages",desc:"Transformation profonde, mort symbolique, vérité qui ne peut plus rester cachée.",links:["hadès","perséphone","orphée"],lore:[
    "Le monde souterrain est le royaume d'Hadès, frère de Zeus et de Poséidon, qui en hérita lors du partage du cosmos entre les trois dieux.",
    "Perséphone y règne à ses côtés une partie de l'année, après avoir été enlevée par Hadès et liée aux Enfers pour avoir mangé quelques grains de grenade (voir la fiche « Grenade »). Son passage entre les deux mondes rythme les saisons.",
    "Contrairement à une idée reçue, ce monde souterrain n'est pas un lieu de punition pour tous : c'est avant tout le domaine de ce qui a été transformé, de ce qui ne peut plus revenir en arrière — un passage plus qu'un châtiment.",
    "Trois juges y président le sort de chaque âme : Minos (voir la fiche « Minos »), Rhadamanthe et Éaque, tous trois anciens rois mortels choisis pour leur réputation de justice absolue de leur vivant — preuve que même aux Enfers, le jugement reste une affaire humaine avant d'être divine.",
    "Rares sont les vivants qui y sont descendus puis en sont ressortis : Orphée fut de ceux-là, sa lyre à la main, venu réclamer Eurydice à Hadès et Perséphone eux-mêmes (voir la fiche « Orphée ») — la preuve que ce royaume peut, à de très rares exceptions, entendre une supplique vivante.",
    "Il est devenu un symbole de transformation profonde, de mort symbolique et de vérité qui ne peut plus rester cachée une fois qu'on y est descendu.",
    "Le monde souterrain est particulièrement associé à Hadès et à Perséphone — et, par sa propre descente, à Orphée.",
  ]},
  "labyrinthe":{icon:"🌀",label:"Labyrinthe",category:"Lieux & passages",desc:"Épreuve complexe, chemin qui s'égare avant de se retrouver — à condition d'avoir un fil à suivre.",links:["minos","ariane"],lore:[
    "Le labyrinthe fut construit en Crète par l'architecte Dédale, sur l'ordre du roi Minos (voir la fiche « Minos »), pour y enfermer le Minotaure : une créature à tête de taureau et corps d'homme, née de l'union contre nature de la reine Pasiphaé et d'un taureau envoyé par Poséidon.",
    "Chaque année, Athènes devait envoyer sept jeunes gens et sept jeunes filles en offrande au monstre, jusqu'à ce que le héros Thésée se porte volontaire pour l'affronter. Ariane, fille de Minos, tomba amoureuse de lui et lui offrit un fil à dérouler en avançant, afin de pouvoir retrouver la sortie une fois le Minotaure vaincu (voir la fiche « Ariane »).",
    "Thésée tua le monstre au cœur du dédale et en ressortit en suivant le fil à rebours — mais le labyrinthe garda une dernière victime : son propre architecte. Dédale, enfermé par Minos avec son fils Icare pour avoir aidé Ariane, ne put s'en échapper qu'en fabriquant des ailes de plumes et de cire, un vol dont Icare, monté trop près du soleil, ne revint jamais.",
    "Le labyrinthe est ainsi devenu un symbole d'épreuve complexe, de chemin qui s'égare avant de se retrouver, de piège qu'on peut créer soi-même sans pouvoir toujours s'en libérer, et de guidage indispensable — le fil — pour traverser ce qu'on ne peut affronter seul.",
    "Le labyrinthe est particulièrement associé à Minos et à Ariane.",
  ]},

  // Mythologie — attributs et divinités
  "caducée":{icon:"⚕",label:"Caducée",category:"Mythologie",desc:"Attribut d'Hermès : médiation, circulation, communication entre des mondes séparés.",links:["hermès","cadmos","harmonie"],lore:[
    "Le caducée est le bâton d'Hermès, reconnaissable à ses deux serpents entrelacés et à ses ailes.",
    "Hermès est le messager des dieux. Il circule constamment entre les différents mondes : Olympe, monde humain et monde souterrain.",
    "Son bâton correspond donc parfaitement à sa fonction : il accompagne celui qui franchit les frontières et transporte les messages d'un monde à l'autre.",
    "Une tradition antique raconte même comment les deux serpents en vinrent à s'y enrouler : Hermès, tombant sur deux serpents en plein combat, aurait jeté son bâton entre eux pour les séparer — au lieu de continuer à se battre, les deux animaux s'enroulèrent alors autour du bois, changeant l'affrontement en une figure d'équilibre parfait.",
    "Ce même motif de deux serpents unis plutôt qu'ennemis se retrouve, de façon frappante, dans un tout autre mythe : devenus vieux, Cadmos et son épouse Harmonie furent changés ensemble en serpents et menés côte à côte vers les Champs Élysées plutôt que vers une fin funeste (voir les fiches « Cadmos » et « Harmonie »). Rien ne prouve que les Anciens aient eux-mêmes établi ce rapprochement entre les deux récits, mais certains y voient un écho : les deux serpents du caducée pourraient être lus, par extension poétique, comme le souvenir de ce couple réconcilié jusque dans la métamorphose.",
    "Le caducée est ainsi devenu un symbole de médiation, de communication, de circulation, de commerce, de passage et de lien entre les mondes.",
    "Le caducée est particulièrement associé à Hermès — et, par ce rapprochement plus tardif entre ses deux serpents, à Cadmos et Harmonie.",
    "Le caducée d'Hermès ne doit pas être confondu avec le bâton d'Asclépios, qui ne possède qu'un seul serpent et qui est le véritable symbole traditionnel de la médecine.",
  ]},
  "chouette":{icon:"🦉",label:"Chouette",category:"Mythologie",desc:"Attribut d'Athéna : sagesse, observation, vision claire dans l'obscurité.",links:["athéna"],lore:[
    "La chouette accompagne Athéna et devient l'un des animaux les plus immédiatement reconnaissables de la déesse.",
    "Les Grecs lui attribuaient une capacité à voir dans l'obscurité. Cette particularité en faisait une image naturelle de la clairvoyance : là où les autres ne voient rien, la chouette voit.",
    "Elle correspond donc parfaitement à Athéna, dont la sagesse consiste non seulement à accumuler des connaissances, mais surtout à observer, comprendre et discerner avant d'agir.",
    "Homère donne d'ailleurs à Athéna l'épithète de « Glaukôpis », qu'on traduit par « aux yeux pers » ou « au regard de chouette » — un lien si ancien entre la déesse et l'oiseau qu'il remonte peut-être à des cultes antérieurs à l'époque classique. Les Athéniens frappèrent plus tard leur monnaie d'argent, la fameuse tétradrachme, à l'effigie de la chouette : une pièce si répandue dans tout le bassin méditerranéen qu'on la surnommait simplement « la chouette ».",
    "La chouette est devenue un symbole de sagesse, d'observation, de discernement, de connaissance et de clairvoyance.",
    "La chouette est particulièrement associée à Athéna.",
  ]},
  "paon":{icon:"🦚",label:"Paon",category:"Mythologie",desc:"Attribut d'Héra : beauté, vigilance, souveraineté légitime.",links:["héra"],lore:[
    "Le paon est devenu l'un des animaux emblématiques d'Héra.",
    "Selon le récit le plus célèbre, Héra plaça les nombreux yeux d'Argos Panoptès, son fidèle gardien, sur la queue du paon après la mort de celui-ci. Les motifs en forme d'yeux devinrent ainsi le souvenir éternel d'Argos.",
    "Argos Panoptès, « celui qui voit tout », devait son nom à son corps couvert de cent yeux, dont une partie restait toujours éveillée pendant que les autres dormaient. Héra l'avait chargé de surveiller Io, une jeune femme aimée de Zeus qu'elle avait changée en génisse par jalousie — c'est en la délivrant de cette garde, sur ordre de Zeus, qu'Hermès endormit puis tua Argos, avant qu'Héra ne recueille ses cent yeux sur la queue de son oiseau favori.",
    "Le paon semble donc toujours regarder autour de lui. Son plumage magnifique rappelle également le rang d'Héra, reine des dieux, déesse du mariage et de la souveraineté.",
    "Le paon est devenu un symbole de beauté, de vigilance, de dignité, de souveraineté et de regard protecteur.",
    "Le paon est particulièrement associé à Héra.",
  ]},
  "foudre":{icon:"⚡",label:"Foudre",category:"Mythologie",desc:"Attribut de Zeus : autorité, révélation soudaine, jugement qui s'impose de lui-même.",links:["zeus"],lore:[
    "La foudre est l'arme et l'emblème de Zeus.",
    "Après avoir vaincu les Titans, Zeus reçoit des Cyclopes la foudre comme arme divine. Elle devient ensuite l'instrument grâce auquel il impose son autorité et punit ceux qui défient l'ordre des dieux.",
    "Mais la foudre possède également une dimension de révélation : elle surgit brutalement dans le ciel et transforme la nuit en un éclair de lumière.",
    "Zeus l'utilisa un jour malgré lui contre celle qu'il aimait : Sémélé, désireuse de voir son amant divin sous sa forme véritable, l'exigea de lui — et fut instantanément réduite en cendres par l'éclat de la foudre, que nul mortel ne peut contempler sans en mourir (voir la fiche « Sémélé »).",
    "Elle est donc devenue un symbole de puissance divine, d'autorité, de révélation soudaine, de destruction et de transformation brutale.",
    "La foudre est particulièrement associée à Zeus.",
  ]},
  "trident":{icon:"🔱",label:"Trident",category:"Mythologie",desc:"Attribut de Poséidon : puissance sur les forces naturelles instables — mer, séismes, émotions profondes.",links:["poséidon"],lore:[
    "Le trident est l'attribut le plus reconnaissable de Poséidon.",
    "Le dieu de la mer le porte comme une arme et comme un instrument de domination sur les forces naturelles. Avec lui, il peut agiter la mer et provoquer les tremblements de terre.",
    "Le trident possède donc trois pointes comme si le pouvoir du dieu se déployait dans plusieurs directions à la fois, mais sa signification fondamentale reste celle de la puissance de Poséidon sur les éléments.",
    "Pendant la Gigantomachie, la guerre entre les dieux et les Géants, Poséidon aurait poursuivi le géant Polybotès à travers la mer Égée et, d'un coup de trident, arraché un morceau de l'île de Cos qu'il lui lança dessus — le fragment, retombé dans la mer, serait devenu l'île de Nisyros, écrasant le géant dessous pour l'éternité.",
    "Il est devenu un symbole de puissance, de maîtrise des forces naturelles, de mer, de profondeur et de force indomptable.",
    "Le trident est particulièrement associé à Poséidon.",
  ]},
  "lyre":{icon:"🎵",label:"Lyre",category:"Mythologie",desc:"Attribut d'Apollon : harmonie, vérité transmise par la beauté plutôt qu'imposée.",links:["apollon","orphée"],lore:[
    "La lyre est l'instrument d'Apollon, dieu de la musique, de la poésie et de la lumière — mais elle ne fut pas inventée par lui.",
    "Selon le mythe, c'est Hermès, encore enfant, qui façonna la première lyre à partir d'une carapace de tortue et de cordes tendues, avant de l'offrir à Apollon en échange du troupeau de bœufs qu'il lui avait dérobé. L'instrument de la beauté naît ainsi d'un geste de ruse réparé par un cadeau.",
    "Entre les mains d'Apollon, la lyre devient l'instrument d'une vérité qui persuade par l'harmonie plutôt que par la force — à l'opposé de l'arc, autre attribut du dieu, qui frappe à distance.",
    "C'est aussi une lyre, offerte par Apollon lui-même, qu'Orphée emporta jusqu'aux Enfers pour tenter de ramener son épouse Eurydice parmi les vivants : son chant, dit-on, faisait taire jusqu'aux tourments des damnés et adoucissait le cœur inflexible d'Hadès — la preuve que cet instrument peut atteindre ce que ni la force ni la prière ordinaire ne peuvent obtenir.",
    "La lyre est devenue un symbole d'harmonie, d'inspiration et de vérité transmise par la beauté plutôt qu'imposée.",
    "La lyre est particulièrement associée à Apollon — et, dans le Tarot, à Orphée.",
  ]},
  "arc":{icon:"🏹",label:"Arc",category:"Mythologie",desc:"Attribut d'Artémis la chasseresse — et, dans le Tarot, d'Éros : intention, concentration, désir qui vise juste sans toujours consulter la raison.",links:["artémis","éros"],lore:[
    "L'arc est l'instrument du chasseur : il permet d'atteindre sa cible à distance.",
    "Il est particulièrement associé à Artémis, déesse de la chasse et des espaces sauvages. Dans l'Hymne homérique qui lui est consacré, elle est explicitement décrite comme une chasseuse qui porte son arc et ses flèches.",
    "Son arc représente donc une puissance maîtrisée : la chasse n'est pas un geste désordonné, mais une concentration de l'attention sur une cible.",
    "L'arc d'Ulysse, dans l'Odyssée, illustre à lui seul cette maîtrise : à son retour, aucun des prétendants venus envahir son palais ne parvient même à le bander, tant sa tension exige une force et une habileté hors du commun — seul Ulysse, révélant enfin sa véritable identité, réussit à la fois à le tendre et à tirer une flèche à travers douze anneaux alignés, avant de se retourner contre les prétendants eux-mêmes.",
    "L'arc est devenu un symbole de volonté, d'intention, de concentration, de maîtrise de soi et de désir dirigé vers un objectif.",
    "L'arc est particulièrement associé à Artémis, mais également à Apollon — et, dans le Tarot, à Éros : trois façons différentes de viser juste.",
  ]},
  "torches":{icon:"🔥",label:"Torches",category:"Mythologie",desc:"Attribut d'Hécate : illumination, guidance dans l'obscurité sans jamais imposer le chemin.",links:["hécate","hyménée"],lore:[
    "Lorsque Perséphone disparaît, Déméter parcourt le monde à sa recherche pendant neuf jours. Hécate, qui a entendu les cris de Perséphone, rejoint ensuite Déméter avec des torches enflammées pour l'aider à découvrir ce qui s'est passé.",
    "La torche devient ainsi la lumière qui permet de traverser la nuit et de retrouver ce qui a été perdu.",
    "Hécate conserve ensuite cette fonction de déesse porteuse de torches, liée aux chemins nocturnes, aux seuils et au monde souterrain.",
    "Les torches accompagnent aussi un tout autre passage : lors des mariages grecs, un cortège nocturne conduisait la mariée jusqu'à la maison de son époux à la lueur de flambeaux, sous la protection d'Hyménée, dieu du mariage — la même lumière qui aide à chercher ce qui est perdu sert alors à célébrer ce qui vient de commencer.",
    "Les torches sont donc devenues un symbole de lumière, de connaissance, de révélation, de guidance et de recherche de la vérité.",
    "Les torches sont particulièrement associées à Hécate et, dans le mythe de Perséphone, à Déméter — et, lors des noces, à Hyménée.",
  ]},
  "lion":{icon:"🦁",label:"Lion",category:"Mythologie",desc:"Lié à Héraclès : courage, force domptée sans violence gratuite.",links:["héraclès"],lore:[
    "Le lion est lié à Héraclès à travers son premier grand exploit : le lion de Némée.",
    "Cette créature monstrueuse ravageait la région de Némée et possédait une peau que les armes ordinaires ne pouvaient transpercer. Héraclès dut finalement l'affronter à mains nues et l'étouffa.",
    "Après avoir vaincu le lion, il utilisa ses propres griffes pour découper sa peau, qu'il porta ensuite comme une armure. La dépouille du monstre devint ainsi le signe visible de sa force et de son triomphe.",
    "Zeus aurait ensuite placé le lion de Némée parmi les étoiles, où il devint la constellation du Lion — un rappel céleste, comme pour le corbeau ou le dauphin, que certains exploits méritent d'être fixés dans le ciel pour ne jamais être oubliés.",
    "Le lion est devenu un symbole de courage, de puissance, de force, de victoire et de dépassement de l'impossible.",
    "Le lion est particulièrement associé à Héraclès.",
  ]},
  "vigne":{icon:"🍇",label:"Vigne",category:"Mythologie",desc:"Attribut de Dionysos : plaisir, transformation, abondance instinctive.",links:["dionysos"],lore:[
    "La vigne est indissociable de Dionysos, dieu du vin, de l'ivresse, de la fête, mais aussi de la transformation et de l'extase.",
    "Dans les mythes, Dionysos voyage avec son cortège de satyres, de ménades et de divinités liées à la nature sauvage. La vigne et le vin deviennent les moyens par lesquels l'être humain quitte momentanément son état ordinaire et entre dans un autre état de conscience.",
    "La vigne porte également l'idée de cycle : elle pousse, fleurit, produit ses grappes, puis perd ses feuilles avant de renaître au printemps. Elle rassemble donc la fécondité de la terre et la transformation.",
    "Le mythe d'Icarios rappelle que ce don comportait aussi un risque : Dionysos lui enseigna le premier l'art de faire du vin, mais les bergers auxquels il en fit goûter, ivres pour la première fois de leur vie, crurent avoir été empoisonnés et le tuèrent. Sa fille Érigone, désespérée de le retrouver mort, se pendit à son tour — un rappel que l'ivresse dionysiaque, aussi joyeuse soit-elle, n'est jamais totalement sans danger pour qui ne sait pas encore ce qu'elle est.",
    "Elle est devenue un symbole de plaisir, d'abondance, de transformation, d'extase, de fête et de vitalité.",
    "La vigne est particulièrement associée à Dionysos.",
  ]},
  "grenade":{icon:"🔴",label:"Grenade",category:"Mythologie",desc:"Le fruit aux innombrables graines : fertilité, abondance, cycle, attachement, ce qui relie au monde souterrain — associée à Perséphone et Hadès.",links:["perséphone","hadès"],lore:[
    "Lorsque Perséphone fut enlevée par Hadès et conduite aux Enfers, elle y mangea quelques grains de grenade. Dans la mythologie grecque, manger la nourriture des morts crée un lien avec le monde souterrain. Perséphone ne pouvait donc plus simplement quitter les Enfers pour toujours.",
    "Elle fut finalement autorisée à retourner auprès de sa mère Déméter pendant une partie de l'année, mais devait revenir auprès d'Hadès pour l'autre partie. Son départ vers les Enfers correspond à l'automne, tandis que son retour sur terre accompagne le renouveau du printemps.",
    "Au-delà de ce mythe, la grenade était aussi offerte lors des mariages grecs comme symbole de fécondité : ses innombrables graines rassemblées sous une même écorce évoquaient la promesse d'une descendance abondante.",
    "Elle est ainsi devenue un symbole de fertilité, d'abondance, de cycle, d'attachement et de ce qui relie irréversiblement au monde souterrain.",
    "La grenade est particulièrement associée à Perséphone.",
  ]},
  "épis":{icon:"🌾",label:"Épis de blé",category:"Mythologie",desc:"Attribut de Déméter : récolte, travail, nourriture, cycle des saisons.",links:["déméter"],lore:[
    "Le blé est avant tout associé à Déméter, déesse de l'agriculture et des récoltes.",
    "Lorsque Perséphone fut enlevée par Hadès, Déméter, accablée de chagrin, parcourut le monde à sa recherche et cessa de faire pousser les plantes. La terre devint stérile et les récoltes disparurent.",
    "Lorsque Perséphone put finalement revenir auprès d'elle, la terre recommença à produire. Le cycle de Perséphone expliquait ainsi symboliquement l'alternance des saisons et le retour des récoltes.",
    "Au terme des Mystères d'Éleusis, dont Déméter était la divinité tutélaire, le point culminant de l'initiation consistait, dit-on, à montrer aux initiés un simple épi de blé moissonné, présenté en silence — un geste si dépouillé qu'il concentrait à lui seul tout ce que le mystère avait à révéler sur la vie, la mort et ce qui renaît.",
    "L'épi de blé représente donc ce qui nourrit les hommes mais aussi ce qui doit être semé, mourir, puis renaître pour produire une nouvelle récolte.",
    "Il est devenu un symbole de récolte, de nourriture, de travail, de fécondité, de cycle et d'abondance.",
    "Le blé et l'épi sont particulièrement associés à Déméter.",
  ]},
  "char solaire":{icon:"☀",label:"Char solaire",category:"Mythologie",desc:"Attribut d'Hélios (et repris par Apollon) : clarté, trajectoire réglée, rien ne peut rester caché sous cette lumière.",links:["hélios","apollon"],lore:[
    "Le char est un objet majeur de la mythologie grecque parce qu'il permet aux dieux de parcourir le ciel.",
    "Le char d'Hélios traverse chaque jour le ciel et fait apparaître le soleil. Celui d'Apollon sera également associé au parcours solaire dans les traditions plus tardives.",
    "Le fils d'Hélios, Phaéton, obtint un jour de le conduire à la place de son père — et, incapable d'en maîtriser les chevaux, faillit embraser la terre entière avant que Zeus ne soit contraint de l'abattre d'un éclair pour l'arrêter. Le mythe rappelle qu'un tel char ne se laisse conduire que par celui qui en a vraiment la maîtrise.",
    "Le char représente donc une force qui possède une direction et que le conducteur doit être capable de maîtriser.",
    "Il est devenu un symbole de direction, de maîtrise, de progression, de mouvement et de conquête d'un chemin.",
  ]},
  "arc-en-ciel":{icon:"🌈",label:"Arc-en-ciel",category:"Mythologie",desc:"Attribut d'Iris : médiation, passage, réconciliation entre deux états.",links:["iris"],lore:[
    "L'arc-en-ciel est le corps même d'Iris, déesse messagère qui relie l'Olympe à la terre et à la mer en empruntant ce pont de couleurs.",
    "Iris tient un rôle proche de celui d'Hermès, mais tourné vers les dieux plutôt que vers les hommes : elle porte leurs messages et, selon certaines traditions, va puiser l'eau sacrée du Styx sur laquelle les dieux prêtent leurs serments les plus solennels.",
    "Apparaître après l'orage, relier le ciel et la terre en un instant fragile : l'arc-en-ciel condense en une image la fonction même d'Iris, messagère et médiatrice.",
    "Dans l'Iliade, c'est elle que Zeus envoie porter à Priam l'ordre d'aller récupérer, sans crainte, le corps de son fils Hector auprès d'Achille — un message si périlleux qu'aucun mortel n'aurait osé le porter, mais qu'elle traverse en un instant, sans jamais risquer d'être elle-même retenue.",
    "Il est devenu un symbole de médiation, de passage et de réconciliation entre deux états qui semblaient incompatibles.",
    "L'arc-en-ciel est particulièrement associé à Iris.",
  ]},
  "flûte":{icon:"🎶",label:"Flûte",category:"Mythologie",desc:"Attribut de Pan : instinct non policé par la raison, appel de la nature brute.",links:["pan"],lore:[
    "La flûte de Pan, ou syrinx, naît d'une histoire de fuite et de métamorphose.",
    "Pan, dieu à moitié bouc, poursuivait de son désir la nymphe Syrinx. Pour lui échapper, elle se réfugia au bord d'un fleuve et fut changée en roseaux au moment même où Pan croyait enfin la saisir. Ne serrant dans ses bras que des tiges creuses, il en assembla plusieurs de longueurs différentes pour en tirer un instrument — et lui donna le nom de la nymphe.",
    "La flûte de Pan porte ainsi la trace d'un désir qui n'a pas obtenu ce qu'il cherchait, mais qui en a fait naître autre chose : une musique instinctive, non policée par la raison, à l'image du dieu qui la joue.",
    "Un autre joueur de flûte osa un jour défier Apollon lui-même : le satyre Marsyas, qui avait ramassé l'instrument après qu'Athéna l'eut rejeté en voyant combien il déformait son visage en soufflant dedans. Vaincu au concours, Marsyas fut écorché vif par le dieu en punition de son insolence — un rappel brutal que l'instinct de la flûte, aussi séduisant soit-il, ne l'emporte jamais impunément sur l'harmonie mesurée de la lyre.",
    "Elle est devenue un symbole d'instinct, d'appel de la nature brute et de désir transformé plutôt qu'assouvi.",
    "La flûte est particulièrement associée à Pan.",
  ]},
  "balance":{icon:"⚖",label:"Balance",category:"Mythologie",desc:"Attribut de Thémis (et de Minos au Jugement) : équilibre, justice, mesure exacte avant toute décision.",links:["thémis","minos"],lore:[
    "La balance représente ce qui doit être pesé et comparé avant qu'un jugement soit rendu.",
    "Cette idée existe déjà dans la mythologie grecque : Zeus est représenté pesant le destin des guerriers sur une balance, notamment dans les scènes de psychostasie, où le sort des combattants est mis en balance.",
    "Homère met en scène ce geste au moment le plus tendu de l'Iliade : avant le combat final entre Achille et Hector, Zeus place sur sa balance d'or les deux destins en jeu — celui d'Hector s'enfonce, signe que son heure est venue, et Apollon, qui le protégeait jusque-là, doit alors l'abandonner à son sort.",
    "La justice apparaît ainsi comme une force qui ne choisit pas selon les émotions, mais qui mesure et attribue à chacun ce qui lui revient.",
    "La balance est donc devenue un symbole de justice, d'équilibre, de mesure, de jugement et d'impartialité.",
    "Elle peut être associée à Thémis et à Dikè, personnifications de l'ordre divin et de la justice.",
  ]},
  "ailes":{icon:"🕊",label:"Ailes",category:"Mythologie",desc:"Selon le contexte : Niké (victoire), Hermès (rapidité, message) ou Éros (désir qui s'envole). Toujours un mouvement qui échappe à la pesanteur ordinaire.",links:["hermès","éros"],lore:[
    "Les ailes, dans la mythologie grecque, distinguent ceux qui échappent à la pesanteur ordinaire du monde.",
    "Hermès porte des sandales ailées qui lui permettent de voyager entre l'Olympe, le monde des hommes et celui des morts à une vitesse que rien ne peut freiner. Éros, lui, est représenté avec des ailes qui traduisent la rapidité et l'imprévisibilité du désir amoureux, qui se pose où il veut sans qu'on puisse le retenir. Niké, déesse de la victoire, vole vers celui ou celle qu'elle choisit de couronner, et sa venue ne se commande pas.",
    "Trois figures, trois façons d'échapper au sol : le message, le désir, la victoire — chacun a ses propres ailes.",
    "Les ailes ne garantissent pourtant pas toujours la maîtrise : celles que Dédale fabriqua pour lui et son fils Icare, en plumes et en cire, leur permirent de fuir le labyrinthe crétois par les airs (voir la fiche « Labyrinthe ») — mais Icare, grisé par cette liberté nouvelle, s'éleva trop près du soleil, dont la chaleur fit fondre la cire, et il périt englouti par la mer.",
    "Elles sont devenues un symbole de mouvement qui échappe à la pesanteur ordinaire, de rapidité et de ce qui ne peut être ni retenu ni forcé.",
    "Les ailes sont particulièrement associées à Hermès et à Éros.",
  ]},

  // Objets classiques du Tarot
  "bâton":{icon:"🪄",label:"Bâton",category:"Objets",desc:"Enseigne liée au feu : volonté, énergie, croissance par l'action.",links:[],lore:[
    "Le bâton est avant tout un objet de mouvement et d'action. Dans les représentations anciennes, il peut être le bâton du voyageur, du berger, du pèlerin ou de celui qui avance à travers le monde.",
    "Il est l'emblème de l'énergie qui pousse à agir.",
    "Il évoque aussi directement la branche vivante : quelque chose qui pousse à partir de la terre et qui cherche la lumière.",
    "Le bâton le plus chargé de sens dans les cortèges dionysiaques est le thyrse : une tige de fenouil couronnée d'une pomme de pin et entourée de feuilles de lierre et de vigne (voir les fiches « Lierre » et « Vigne »), que Dionysos et ses suivants brandissaient comme une arme rituelle, capable, dit-on, de faire jaillir le vin ou le miel du sol d'un simple coup.",
    "Le bâton représente donc la volonté, l'énergie, l'action, l'ambition, la croissance, la créativité et la force vitale.",
  ]},
  "coupe":{icon:"🍷",label:"Coupe",category:"Objets",desc:"Enseigne liée à l'eau : émotion, réceptivité, relation qui se reçoit et se partage.",links:[],lore:[
    "La coupe est un récipient : elle reçoit, contient et conserve.",
    "C'est précisément ce qui explique sa symbolique dans le Tarot. Là où le bâton agit vers l'extérieur, la coupe accueille ce qui vient de l'extérieur. Elle devient donc l'image de l'univers intérieur : émotions, sentiments, intuition, imagination et relations.",
    "La coupe évoque également les récipients sacrés utilisés dans les cultes antiques pour contenir le vin, l'eau, le lait ou les offrandes faites aux dieux.",
    "Une coupe extraordinaire intervient dans le dixième travail d'Héraclès : pour traverser l'océan et atteindre le troupeau du géant Géryon, il emprunte la coupe d'or dans laquelle Hélios traverse chaque nuit le ciel d'ouest en est pour retrouver son point de départ — un récipient assez vaste, pour une fois, non pour contenir un breuvage mais pour porter un dieu, et cette fois un héros, d'un bout du monde à l'autre.",
    "La coupe est un symbole de l'émotion, de la réceptivité, de l'intuition, de l'amour, de la relation, de l'offrande et de ce que l'on porte intérieurement.",
  ]},
  "épée":{icon:"⚔",label:"Épée",category:"Objets",desc:"Enseigne liée à l'air : pensée, décision, conflit — et la vérité qui en découle.",links:[],lore:[
    "L'épée est l'arme qui tranche.",
    "Cette caractéristique physique explique une grande partie de sa symbolique : elle sépare, coupe, distingue et met fin à ce qui doit être terminé.",
    "Mais l'épée est également une arme associée au pouvoir et à l'autorité. Elle peut protéger la justice, défendre une cause ou imposer une décision.",
    "Dans les traditions symboliques européennes, l'épée est donc devenue associée à l'intelligence capable de distinguer le vrai du faux, mais aussi au conflit qui naît lorsque deux volontés s'opposent.",
    "La harpé, épée recourbée que Persée reçut d'Hermès, tranche l'un des mythes les plus célèbres de toute la mythologie grecque : c'est elle qui décapite la Gorgone Méduse, dont le seul regard pétrifiait quiconque le croisait — un exploit que Persée n'accomplit qu'en évitant de la regarder directement, guidé par son reflet dans un bouclier poli.",
    "Sa lame droite évoque également une pensée qui va directement à l'essentiel.",
    "L'épée est ainsi devenue un symbole de pensée, de vérité, de discernement, de décision, de justice, de conflit, de rupture et de pouvoir : l'esprit qui tranche et révèle ce qui est vrai.",
  ]},
  "denier":{icon:"🪙",label:"Denier",category:"Objets",desc:"Enseigne liée à la terre : matière, travail, ressource, valeur concrète.",links:[],lore:[
    "Le denier est une pièce de monnaie. C'est le seul des quatre emblèmes du Tarot qui représente directement quelque chose de matériel et de tangible.",
    "La monnaie représente ce qui possède une valeur mesurable : richesse, ressources, travail, échange et possession.",
    "Mais dans le Tarot, le denier ne se limite pas à l'argent. Il représente plus largement le monde concret : le corps, la matière, la maison, le travail, les ressources et tout ce que l'on construit dans le monde réel.",
    "Une seule pièce, minuscule, franchit pourtant la frontière entre les deux mondes : l'obole que l'on plaçait dans la bouche du défunt pour payer Charon, le passeur qui faisait traverser le Styx aux âmes des morts (voir la fiche « Rivière ») — sans cette pièce, disait-on, l'âme restait errante sur la rive, incapable de payer son dernier voyage.",
    "Sa forme ronde peut également évoquer le cycle, la terre, le soleil et ce qui se matérialise.",
    "Le denier est ainsi devenu un symbole de matière, de richesse, de travail, de ressources, de sécurité, de prospérité, de corps et d'ancrage : ce qui prend forme dans la matière.",
  ]},

  // Objets mythologiques
  "couronne":{icon:"👑",label:"Couronne",category:"Objets mythologiques",desc:"Autorité légitime, accomplissement, souveraineté assumée avec dignité.",links:["héra","apollon"],lore:[
    "La couronne est l'objet qui rend visible le rang de celui ou celle qui la porte. Dans la mythologie grecque, les dieux souverains sont représentés avec des attributs qui manifestent leur autorité, et les couronnes végétales servent également à distinguer les vainqueurs, les héros et ceux qui ont reçu une reconnaissance divine.",
    "Héra, reine de l'Olympe, porte la sienne comme signe visible d'une souveraineté qui ne se discute pas — une autorité de naissance, non conquise (voir la fiche « Héra »).",
    "La couronne de laurier d'Apollon, elle, se mérite : elle devient le signe d'une victoire et d'un accomplissement après la transformation de Daphné en laurier.",
    "La couronne réunit donc deux idées : celui qui règne de droit et celui qui a accompli quelque chose qui mérite d'être reconnu.",
    "Une autre couronne, offerte par Dionysos à son épouse Ariane (voir la fiche « Ariane »), fut plus tard placée parmi les étoiles sous le nom de Couronne boréale — preuve qu'une couronne peut aussi être un don d'amour plutôt qu'un simple insigne de pouvoir.",
    "Elle est devenue un symbole de souveraineté, d'autorité, de victoire, d'accomplissement et de reconnaissance.",
    "La couronne est particulièrement associée à Héra et à Apollon — deux légitimités différentes, l'une de rang, l'autre de mérite.",
  ]},
  "sceptre":{icon:"🔱",label:"Sceptre",category:"Objets mythologiques",desc:"Pouvoir stable, commandement exercé avec constance plutôt qu'imposé par la force.",links:["zeus","héra","héphaïstos"],lore:[
    "Le sceptre est le signe du pouvoir exercé par celui qui gouverne.",
    "Dans les récits homériques, Zeus tient le sceptre comme signe de sa souveraineté sur les dieux et les hommes. Le sceptre n'est donc pas seulement une arme : il représente l'autorité légitime et le droit de commander.",
    "Héra, reine de l'Olympe, porte elle aussi un sceptre — signe d'une autorité qui n'a besoin d'aucune démonstration de force pour s'imposer, à la différence de celle, plus spectaculaire, de Zeus (voir la fiche « Héra »).",
    "Dans l'Iliade, le sceptre d'Agamemnon porte le poids de plusieurs générations : forgé par Héphaïstos, offert par Zeus à Pélops, il se transmet ensuite de père en fils jusqu'à Agamemnon, qui le brandit comme la preuve que son autorité ne sort pas de nulle part mais d'une lignée ininterrompue depuis les dieux eux-mêmes.",
    "Il est également utilisé par les rois et les magistrats comme marque de leur fonction.",
    "Le sceptre est ainsi devenu un symbole de pouvoir, de commandement, d'autorité, de gouvernement et de responsabilité.",
    "Le sceptre est particulièrement associé à Zeus et à Héra, ainsi qu'aux figures souveraines en général.",
  ]},
  "clé":{icon:"🗝",label:"Clé",category:"Objets mythologiques",desc:"Accès, connaissance réservée, passage qui ne s'ouvre qu'à qui sait où chercher.",links:["hécate"],lore:[
    "La clé est littéralement ce qui permet de franchir une porte normalement fermée.",
    "Dans les traditions liées à Hécate, celle-ci est appelée « porteuse des clés » et Kleidouchos, « celle qui tient les clés ». Elle règne sur les carrefours, les seuils et les frontières entre différents espaces.",
    "La clé devient alors l'objet qui permet d'accéder à ce qui était caché.",
    "Cette fonction n'était pas seulement symbolique : dans plusieurs sanctuaires grecs, la clé du temple était matériellement confiée à une prêtresse, dont la charge consistait précisément à ouvrir et fermer l'accès au lieu sacré — un pouvoir concret sur le seuil, à l'image de celui qu'Hécate exerce sur les passages entre les mondes.",
    "Elle est devenue un symbole de passage, d'accès, de connaissance secrète, de pouvoir sur les seuils et d'ouverture vers un autre monde.",
    "La clé est particulièrement associée à Hécate.",
  ]},
  "lanterne":{icon:"🏮",label:"Lanterne",category:"Objets mythologiques",desc:"Recherche, lumière intérieure portée dans l'obscurité plutôt que réponse immédiate.",links:["déméter","hécate"],lore:[
    "La lanterne est plus tardive que la torche et ne possède pas, dans la mythologie grecque, un récit fondateur comparable au trident de Poséidon ou à la foudre de Zeus.",
    "Mais sa symbolique découle directement de l'idée ancienne de la lumière portée dans l'obscurité.",
    "Elle peut être reliée à Hécate et à sa fonction de guide nocturne : la déesse porte des torches lorsqu'elle accompagne Déméter dans sa recherche de Perséphone.",
    "La lanterne représente donc une lumière plus intime que la foudre : elle n'éclaire pas le monde entier, elle permet simplement de continuer à avancer lorsque l'on ne voit plus son chemin.",
    "L'anecdote la plus célèbre liée à une lanterne reste peut-être celle du philosophe Diogène de Sinope, qui aurait parcouru les rues d'Athènes en plein jour, une lanterne allumée à la main, en affirmant chercher « un homme » — un geste provocateur pour dénoncer, lanterne en plein soleil, combien l'honnêteté véritable restait introuvable même à la lumière du jour.",
    "Elle est devenue un symbole de recherche, de lumière intérieure, d'espoir, d'orientation et de découverte de ce qui était caché.",
  ]},
  "torche":{icon:"🔦",label:"Torche",category:"Objets mythologiques",desc:"Illumination, connaissance transmise, guidance dans l'incertitude.",links:["hécate","déméter","prométhée"],lore:[
    "Lorsque Perséphone disparaît, Déméter parcourt le monde à sa recherche pendant neuf jours. Hécate, qui a entendu les cris de Perséphone, rejoint ensuite Déméter avec des torches enflammées pour l'aider à découvrir ce qui s'est passé.",
    "La torche devient ainsi la lumière qui permet de traverser la nuit et de retrouver ce qui a été perdu.",
    "Hécate conserve ensuite cette fonction de déesse porteuse de torches, liée aux chemins nocturnes, aux seuils et au monde souterrain.",
    "À Athènes, des courses de relais nocturnes appelées lampadédromies opposaient des équipes de jeunes gens qui se transmettaient une torche allumée sans jamais la laisser s'éteindre, en l'honneur de Prométhée, d'Héphaïstos ou d'Athéna (voir la fiche « Prométhée ») — une manière de rejouer, dans la course, le don du feu qui avait fondé la civilisation elle-même.",
    "La torche est donc devenue un symbole de lumière, de connaissance, de révélation, de guidance et de recherche de la vérité.",
    "La torche est particulièrement associée à Hécate et, dans le mythe de Perséphone, à Déméter.",
  ]},
  "flèche":{icon:"🎯",label:"Flèche",category:"Objets mythologiques",desc:"Direction précise, volonté qui vise, conséquence qui suit le tir.",links:["éros"],lore:[
    "La flèche prolonge l'intention de l'archer : une fois tirée, elle ne peut plus revenir en arrière.",
    "Elle possède donc une symbolique différente de l'arc. L'arc représente la préparation et la tension ; la flèche représente le moment où l'intention devient action.",
    "Chez Artémis et Apollon, les flèches peuvent donner la mort à distance. Chez Éros, elles prennent une dimension différente : elles atteignent directement le cœur et provoquent l'amour ou le désir.",
    "Les flèches d'Héraclès, trempées dans le sang empoisonné de l'Hydre de Lerne, se révélèrent indispensables bien après sa mort : léguées au héros Philoctète, elles seules, selon un oracle, pouvaient permettre aux Grecs de vaincre Troie — obligeant ses compagnons à aller chercher Philoctète, qu'ils avaient pourtant abandonné blessé et hurlant de douleur sur l'île de Lemnos des années plus tôt.",
    "La flèche est ainsi devenue un symbole de direction, de volonté, d'action, de conséquence, de désir et d'atteinte d'un objectif.",
    "La flèche peut être associée à Artémis, Apollon et Éros selon le contexte.",
  ]},
  "miroir":{icon:"🪞",label:"Miroir",category:"Objets mythologiques",desc:"Introspection, vérité renvoyée, perception de soi parfois inconfortable.",links:["aphrodite"],lore:[
    "Le miroir est naturellement associé à Aphrodite parce qu'il renvoie à la beauté et à la perception de son propre visage.",
    "Dans l'imaginaire mythologique, Aphrodite est la déesse dont la beauté peut provoquer le désir, la rivalité et même la guerre. Le miroir devient alors l'objet qui permet de contempler cette beauté mais aussi de prendre conscience de l'image que l'on renvoie aux autres.",
    "Il possède donc une double dimension : il montre ce qui est visible, mais il peut également révéler notre rapport à nous-mêmes.",
    "Le miroir rejoint aussi un tout autre mythe, plus sombre : Narcisse, épris de son propre reflet dans l'eau d'une source, ne put jamais s'en détacher et dépérit à force de le contempler sans fin (voir la fiche « Narcisse ») — la preuve que la même surface qui révèle peut aussi retenir prisonnier celui qui s'y regarde trop longtemps.",
    "Le miroir est devenu un symbole de beauté, de perception, d'introspection, d'identité, de désir et de connaissance de soi.",
    "Le miroir est particulièrement associé à Aphrodite.",
  ]},
  "voile":{icon:"🧣",label:"Voile",category:"Objets mythologiques",desc:"Secret, connaissance cachée, frontière entre ce qui se montre et ce qui se protège.",links:["métis"],lore:[
    "Le voile possède une symbolique particulièrement forte dans les rites grecs, notamment autour des femmes, du mariage et des mystères religieux.",
    "Couvrir le visage ou le corps signifie cacher quelque chose au regard ordinaire. Le voile crée donc une frontière entre ce qui peut être vu et ce qui doit rester secret.",
    "Cette symbolique convient particulièrement aux divinités et aux rites liés aux mystères : le sacré n'est pas entièrement accessible au regard profane.",
    "Le voile peut également représenter le passage d'un état à un autre, notamment dans le mariage, où la jeune femme change de statut.",
    "Ce même voile trouvait une place précise dans le rituel du mariage grec : lors de la cérémonie appelée anakalyptêria, littéralement le « dévoilement », l'épouse retirait son voile devant son époux pour la première fois — un geste qui rendait le mariage visible et effectif aux yeux de tous.",
    "Dans le Tarot, ce voile est celui de la Papesse, associée à Métis : un savoir qui ne s'expose pas mais agit depuis l'intérieur, retenu derrière un voile plutôt qu'imposé au regard (voir la fiche « Métis »).",
    "Il est ainsi devenu un symbole de secret, de connaissance cachée, de mystère, de frontière, de transformation et de passage — ce qui existe derrière le monde visible mais qui n'est pas encore révélé.",
  ]},
  "chaîne":{icon:"⛓",label:"Chaîne",category:"Objets mythologiques",desc:"Attachement, dépendance, lien — la question est toujours de savoir s'il enferme ou s'il peut être dénoué.",links:["pan","prométhée"],lore:[
    "La chaîne la plus célèbre de la mythologie grecque est celle qui retint Prométhée sur un rocher du Caucase, en punition d'avoir donné le feu aux hommes contre la volonté de Zeus.",
    "Chaque jour, un aigle venait dévorer son foie, qui repoussait chaque nuit, prolongeant son supplice sans fin — jusqu'à ce que Chiron accepte de mourir à sa place et qu'Héraclès mette fin à son calvaire (voir la fiche « Prométhée »).",
    "La chaîne de Prométhée dit quelque chose de plus large que la simple punition : elle montre qu'un don fait sans autorisation a toujours un prix, et que l'attachement qui en résulte peut aussi bien enfermer que devenir, avec le temps, la preuve de ce qu'on a osé offrir.",
    "Dans le Tarot, la chaîne est aussi l'attribut du Diable, associé à Pan : elle n'y figure plus une punition méritée mais un attachement à l'instinct, moins imposé de l'extérieur qu'accepté de l'intérieur (voir la fiche « Pan »).",
    "Une autre chaîne, tout aussi célèbre, retint Andromède à un rocher battu par les flots, livrée en sacrifice à un monstre marin pour expier l'orgueil de sa mère Cassiopée — jusqu'à ce que Persée, de retour avec la tête de Méduse, la délivre et l'épouse (voir la fiche « Étoile »). Contrairement à celle de Prométhée, cette chaîne-là ne punit aucune faute : elle ne fait que retenir une victime innocente, en attendant qu'un sauveur se présente.",
    "Elle est devenue un symbole d'attachement, de dépendance et de lien — la question étant toujours de savoir s'il enferme ou s'il peut être dénoué.",
    "La chaîne est particulièrement associée à Prométhée et à Pan — deux attachements de nature très différente.",
  ]},
  "roue":{icon:"☸",label:"Roue",category:"Objets mythologiques",desc:"Cycle, changement, destin qui tourne sans considération pour le mérite.",links:["tyché"],lore:[
    "La roue est l'attribut de Tyché, déesse du hasard et de la fortune, souvent représentée les yeux bandés, un gouvernail à la main pour rappeler qu'elle dirige le destin des hommes sans qu'ils puissent l'influencer.",
    "Sa roue tourne sans considération pour le mérite : elle peut élever un inconnu au sommet ou faire chuter un roi, dans un mouvement que ni la vertu ni la faute ne peuvent arrêter.",
    "Contrairement à une punition ou une récompense méritée, ce que fait tourner la roue de Tyché échappe à toute logique morale — c'est précisément ce qui en fait un symbole aussi redouté que fascinant.",
    "Une autre roue, châtiment cette fois, retient Ixion pour l'éternité : ayant tenté de séduire Héra, il fut attaché à une roue enflammée tournant sans fin dans les Enfers — un tourment qui, contrairement à celui de Tyché, ne doit rien au hasard : c'est une punition méritée, non un coup du sort imprévisible.",
    "Elle est devenue un symbole de cycle, de changement et de destin qui tourne sans considération pour le mérite.",
    "La roue est particulièrement associée à Tyché.",
  ]},
  "char":{icon:"🏇",label:"Char",category:"Objets mythologiques",desc:"Direction, maîtrise, progression réglée vers un but choisi.",links:["apollon","hélios"],lore:[
    "Le char est un objet majeur de la mythologie grecque parce qu'il permet aux dieux de parcourir le ciel.",
    "Le char d'Hélios traverse chaque jour le ciel et fait apparaître le soleil. Celui d'Apollon sera également associé au parcours solaire dans les traditions plus tardives.",
    "Un tout autre char porte, lui, la marque d'une malédiction familiale plutôt que celle du ciel : pour épouser Hippodamie, Pélops dut affronter son père en une course de chars à l'issue mortelle pour tous les prétendants précédents — il ne l'emporta qu'en sabotant secrètement l'essieu du char de son adversaire, un geste de tricherie qui pèsera sur toute sa descendance, jusqu'à la maison d'Atrée.",
    "Le char représente donc une force qui possède une direction et que le conducteur doit être capable de maîtriser.",
    "Il est devenu un symbole de direction, de maîtrise, de progression, de mouvement et de conquête d'un chemin.",
  ]},
  "corne d'abondance":{icon:"🐐",label:"Corne d'abondance",category:"Objets mythologiques",desc:"La corne de la chèvre Amalthée : abondance intarissable, don généreux qui ne s'épuise jamais.",links:["zeus"],lore:[
    "La corne d'abondance provient du mythe de la naissance de Zeus : caché dans une grotte du mont Ida, en Crète, pour échapper à son père Cronos, qui dévorait ses enfants (voir la fiche « Grotte »), le nourrisson fut nourri du lait de la chèvre Amalthée — ou, selon d'autres versions, d'une nymphe portant ce nom.",
    "En jouant avec elle, Zeus enfant aurait brisé accidentellement l'une de ses cornes. Pour se faire pardonner, il la dota d'un pouvoir merveilleux : produire indéfiniment tout ce que son propriétaire pouvait désirer — nourriture, fruits, richesses — sans jamais se vider.",
    "Devenu roi des dieux, Zeus plaça plus tard Amalthée elle-même parmi les étoiles, sous la forme de la constellation du Capricorne, en remerciement pour ces années passées à le nourrir en secret.",
    "La corne d'abondance est ainsi devenue un symbole de générosité, de prospérité intarissable, de nourriture toujours disponible et de gratitude qui répare un tort involontaire.",
    "La corne d'abondance est particulièrement associée à Zeus, par l'intermédiaire d'Amalthée.",
  ]},

  // Animaux
  "aigle":{icon:"🦅",label:"Aigle",category:"Animaux",desc:"Hauteur de vue, pouvoir, vision d'ensemble — lié à Zeus.",links:["zeus"],lore:[
    "L'aigle est l'oiseau de Zeus et l'un de ses attributs les plus reconnaissables. Dans les récits mythologiques, Zeus peut lui-même prendre la forme d'un aigle, notamment lorsqu'il enlève Ganymède pour l'amener auprès des dieux.",
    "L'aigle est aussi celui qui s'élève plus haut que les autres oiseaux et qui semble pouvoir regarder le monde depuis les hauteurs du ciel. Il devient ainsi l'image parfaite de Zeus, maître de l'Olympe et dieu du ciel.",
    "Dans une autre tradition, l'aigle apparaît comme un signe favorable envoyé par Zeus. Il peut alors être interprété comme un messager venu du ciel.",
    "L'aigle est aussi l'instrument de la punition de Zeus : c'est un aigle qu'il envoie chaque jour dévorer le foie de Prométhée enchaîné sur son rocher, un foie qui repousse chaque nuit pour que le châtiment ne s'achève jamais (voir la fiche « Chaîne ») — preuve que l'oiseau qui élève peut aussi, sur ordre du même dieu, devenir l'instrument d'un tourment sans fin.",
    "L'aigle est donc devenu un symbole de pouvoir, de souveraineté, de hauteur, de vision, de force et de message divin.",
    "L'aigle est particulièrement associé à Zeus.",
  ]},
  "serpent":{icon:"🐍",label:"Serpent",category:"Animaux",desc:"Transformation, connaissance, guérison, lien avec le monde souterrain.",links:[],lore:[
    "Le serpent possède une symbolique beaucoup plus ancienne et plus complexe que celle d'un simple animal associé au mal.",
    "Il change de peau et semble ainsi mourir puis renaître. Cette capacité a nourri son association avec la transformation et le renouvellement.",
    "Il vit également dans les fissures du sol, les grottes et les lieux cachés. Il appartient donc symboliquement à ce qui se trouve sous la surface : la terre, les profondeurs et le monde souterrain.",
    "Le serpent est aussi associé à Asclépios, dieu de la médecine. Son image enroulée autour du bâton du dieu est devenue un symbole de guérison.",
    "À Delphes, c'est un serpent, Python, gardien de l'ancien oracle de la Terre, qu'Apollon dut vaincre pour s'emparer du sanctuaire et y installer le sien — la prêtresse qui y rendait ensuite les oracles, la Pythie, tenait son nom de ce combat fondateur.",
    "Enfin, dans de nombreux mythes grecs, les serpents gardent des lieux ou des secrets : ils deviennent ainsi des créatures placées entre le monde visible et ce qui est caché.",
    "Le serpent est donc devenu un symbole de transformation, de guérison, de connaissance cachée, de régénération et du monde souterrain.",
    "Le serpent est associé à plusieurs divinités, notamment Asclépios, Athéna, Apollon et les puissances chthoniennes.",
  ]},
  "chien":{icon:"🐕",label:"Chien",category:"Animaux",desc:"Gardien des seuils, protection, instinct fidèle — lié à Hécate.",links:["hécate"],lore:[
    "Le chien est particulièrement lié à Hécate.",
    "Hécate est une déesse des carrefours, de la nuit, de la magie et du monde des morts. Dans les récits antiques, son arrivée est annoncée par les aboiements des chiens et elle est accompagnée de chiens infernaux.",
    "Un récit raconte également qu'Hécube, reine de Troie, fut transformée en chienne après la chute de Troie et devint ensuite la compagne d'Hécate.",
    "Le chien le plus redoutable de la mythologie grecque reste toutefois Cerbère, monstre à trois têtes qui garde l'entrée des Enfers et empêche quiconque d'en ressortir sans autorisation — seul Héraclès parvint à le maîtriser à mains nues, lors de son douzième et dernier travail, avant de le ramener brièvement sur terre pour prouver son exploit.",
    "Le chien garde ainsi les frontières : il veille sur la maison, sur les chemins, sur les portes et, dans l'imaginaire d'Hécate, sur la frontière entre les vivants et les morts.",
    "Il est devenu un symbole de protection, de vigilance, d'instinct, de seuil et de passage entre les mondes.",
    "Le chien est particulièrement associé à Hécate.",
  ]},
  "cheval":{icon:"🐎",label:"Cheval",category:"Animaux",desc:"Mouvement, liberté, puissance mise en marche.",links:["poséidon"],lore:[
    "Le cheval est avant tout lié à Poséidon.",
    "Lorsque les dieux se disputèrent la protection d'Athènes, Poséidon fit apparaître un cheval dans certaines traditions du mythe. Il devint ensuite le dieu des chevaux autant que celui de la mer et des tremblements de terre.",
    "Le cheval représente une force difficile à contenir : il court, franchit les distances et transporte l'être humain au-delà de ses propres limites.",
    "Dans la mythologie grecque, les chevaux divins peuvent également tirer les chars des dieux et parcourir le ciel, la mer ou les domaines surnaturels.",
    "Le cheval le plus célèbre de la guerre de Troie n'en était pourtant pas un vivant : c'est un cheval de bois, conçu par Ulysse et empli de guerriers grecs cachés, qui permit de faire tomber la ville après dix années de siège infructueux — les Troyens, croyant recevoir une offrande de paix, l'introduisirent eux-mêmes derrière leurs propres murailles.",
    "Le cheval est donc devenu un symbole de mouvement, de liberté, de puissance, de vitesse et de force indomptée.",
    "Le cheval est particulièrement associé à Poséidon.",
  ]},
  "pégase":{icon:"🦄",label:"Pégase",category:"Animaux",desc:"Inspiration, élévation, maîtrise d'une force extraordinaire — monture de Bellérophon.",links:["bellérophon"],lore:[
    "Pégase naît du sang de Méduse lorsqu'elle est décapitée par Persée.",
    "Créature extraordinaire, cheval ailé capable de s'élever dans le ciel, il devient ensuite le compagnon du héros Bellérophon, qui tente de le maîtriser pour combattre la Chimère.",
    "Pégase représente donc quelque chose de plus subtil que le simple cheval : c'est la force qui s'élève au-dessus de la matière.",
    "Dans la tradition ultérieure, il est également associé aux Muses et à la source Hippocrène, ce qui renforce son association avec l'inspiration poétique.",
    "Grisé par ses exploits, Bellérophon tenta un jour de s'élever sur Pégase jusqu'à l'Olympe lui-même, comme s'il pouvait rejoindre le rang des dieux (voir la fiche « Bellérophon ») — Zeus envoya un simple taon piquer la monture, qui se cabra et désarçonna le héros, le laissant retomber sur terre boiteux et solitaire pour le reste de sa vie, tandis que Pégase, lui, poursuivait seul son ascension.",
    "Pégase est ainsi devenu un symbole de l'inspiration, de l'imagination, de l'élévation, de la liberté et de la maîtrise d'une force exceptionnelle.",
    "Pégase est particulièrement associé à Bellérophon et, dans les traditions ultérieures, aux Muses.",
  ]},
  "dauphin":{icon:"🐬",label:"Dauphin",category:"Animaux",desc:"Guidance, mer, protection pendant la traversée.",links:["poséidon","dionysos","apollon"],lore:[
    "Le dauphin appartient au monde de Poséidon et de la mer.",
    "Dans un célèbre récit, Poséidon cherchait Amphitrite, qui s'était enfuie. Un dauphin la retrouva et la conduisit auprès du dieu. Pour le remercier, Poséidon plaça ensuite le dauphin dans le ciel sous la forme de la constellation Delphinus.",
    "Le dauphin apparaît aussi dans plusieurs récits comme un animal qui vient au secours des hommes et les guide à travers la mer.",
    "Il est aussi lié à Dionysos par un mythe plus inattendu : des pirates l'ayant capturé sans reconnaître sa nature divine, le dieu fit surgir de la vigne sur le pont du navire et se changea lui-même en lion, semant une telle terreur que les marins se jetèrent à l'eau — où ils furent aussitôt changés en dauphins, condamnés à porter secours aux marins en perdition pour le reste des temps.",
    "Il est donc devenu un symbole de guidance, de navigation, de protection, de mer et d'intervention bienveillante du monde marin.",
    "Le dauphin est particulièrement associé à Poséidon, mais également à Apollon dans certains mythes.",
  ]},
  "colombe":{icon:"🕊",label:"Colombe",category:"Animaux",desc:"Amour, paix — liée à Aphrodite.",links:["aphrodite"],lore:[
    "La colombe est l'un des oiseaux d'Aphrodite.",
    "Elle représente l'amour doux et l'attachement amoureux. Contrairement aux animaux puissants ou menaçants, elle évoque quelque chose de tendre, intime et pacifique.",
    "Son association avec Aphrodite s'est renforcée par sa présence dans l'iconographie de la déesse et dans la symbolique amoureuse antique.",
    "Les colombes jouent aussi un rôle décisif dans l'expédition des Argonautes : pour franchir les Symplégades, deux rochers mobiles qui se refermaient sur tout ce qui tentait de passer entre eux, Jason envoya d'abord une colombe en éclaireur — l'oiseau ne perdit que quelques plumes de sa queue au moment où les rochers se refermèrent, leur indiquant l'instant exact où le navire pourrait s'y risquer à son tour.",
    "Elle est ainsi devenue un symbole de l'amour, de la tendresse, de la paix, de l'union et de la beauté.",
    "La colombe est particulièrement associée à Aphrodite.",
  ]},
  "corbeau":{icon:"🐦‍⬛",label:"Corbeau",category:"Animaux",desc:"Présage, connaissance du monde invisible.",links:["apollon","athéna"],lore:[
    "Le corbeau est particulièrement lié à Apollon et à la divination.",
    "Dans un récit, Apollon envoie un corbeau chercher de l'eau pour accomplir un sacrifice. Mais l'oiseau s'attarde auprès d'un figuier, mange les figues et revient trop tard. Pour se justifier, il accuse un serpent d'avoir empêché sa mission.",
    "Apollon comprend le mensonge et punit le corbeau. Il aurait alors noirci son plumage et placé le corbeau, le serpent et la coupe dans le ciel sous forme de constellations.",
    "Cette histoire explique mythiquement certaines caractéristiques de l'oiseau tout en renforçant son association avec les présages et le savoir caché.",
    "Le corbeau — ou la corneille, selon les versions — aurait autrefois été l'oiseau d'Athéna, avant d'être banni de sa suite : c'est lui qui vint lui rapporter qu'Érichthonios, l'enfant né du désir déçu d'Héphaïstos, avait été découvert malgré son interdiction de regarder le coffre où elle l'avait caché (voir la fiche « Héphaïstos ») — furieuse d'une nouvelle qu'elle n'avait pas demandée, la déesse chassa l'oiseau bavard et lui préféra désormais la chouette, plus silencieuse.",
    "Le corbeau est donc devenu un symbole de présage, de connaissance, d'observation, de vérité cachée et du monde invisible.",
    "Le corbeau est particulièrement associé à Apollon.",
  ]},
  "abeille":{icon:"🐝",label:"Abeille",category:"Animaux",desc:"Travail, organisation collective, abondance construite patiemment.",links:[],lore:[
    "L'abeille possède une symbolique ancienne liée au travail, à l'organisation et à l'abondance.",
    "Dans la mythologie grecque, les abeilles apparaissent notamment dans les traditions liées à Dionysos et à certaines figures de prêtresses et de nymphes. Le miel était également une offrande précieuse aux divinités.",
    "L'abeille forme une société organisée où chaque individu participe à une œuvre collective. Elle transforme les fleurs en miel et rassemble ainsi les richesses dispersées de la nature.",
    "À Delphes même, les prêtresses de l'oracle étaient parfois appelées Mélissai, « les abeilles » — un nom qui renvoyait à leur pureté et à leur discrétion, à l'image de l'insecte qui butine sans jamais rien gaspiller de ce qu'il recueille.",
    "Elle est devenue une image de travail, d'organisation, de fécondité, d'abondance, de coopération et de transformation de la matière.",
    "L'abeille peut être associée à plusieurs traditions grecques, notamment à Dionysos et aux cultes initiatiques.",
  ]},
  "papillon":{icon:"🦋",label:"Papillon",category:"Animaux",desc:"Transformation, âme, métamorphose accomplie.",links:[],lore:[
    "Le papillon possède une association particulièrement forte avec Psyché.",
    "En grec ancien, psychê signifie à la fois « âme » et « souffle de vie ». Dans l'Antiquité, l'âme humaine pouvait être représentée sous la forme d'un papillon.",
    "Le mythe de Psyché raconte l'histoire d'une mortelle dont les épreuves la conduisent finalement à devenir immortelle et à rejoindre Éros parmi les dieux.",
    "La transformation du papillon — de la chenille enfermée dans sa chrysalide jusqu'à l'être ailé qui en sort — correspond parfaitement à cette idée : quelque chose change de forme pour accéder à une nouvelle existence.",
    "Sur certains vases funéraires grecs, l'âme du défunt est représentée s'échappant du corps sous la forme d'un minuscule papillon ailé — une image qui unit, dans un même souffle, la mort du corps et l'envol de ce qui lui survit.",
    "Le papillon est donc devenu un symbole de transformation, d'âme, de renaissance, d'évolution et de passage vers un nouvel état.",
    "Le papillon est particulièrement associé à Psyché.",
  ]},
  "cerf":{icon:"🦌",label:"Cerf",category:"Animaux",desc:"Nature, intuition, passage entre deux mondes.",links:["artémis","héraclès"],lore:[
    "Le cerf est profondément lié à Artémis, déesse de la chasse, des forêts et des animaux sauvages.",
    "Dans plusieurs récits, les cerfs sont placés sous sa protection. Le plus célèbre est celui du cerf de Cérynie, une bête extraordinaire aux bois d'or et aux sabots d'airain qu'Héraclès doit capturer lors de son troisième travail. Mais le cerf apparaît également dans les récits qui rappellent le pouvoir d'Artémis sur la nature sauvage.",
    "Le mythe d'Actéon montre d'ailleurs l'autre aspect de cette relation : le chasseur surprend Artémis alors qu'elle se baigne. Furieuse, la déesse le transforme en cerf et ses propres chiens le dévorent sans le reconnaître.",
    "La poursuite de la biche de Cérynie dura, dit-on, une année entière avant qu'Héraclès ne parvienne à la capturer vivante et intacte, comme l'exigeait l'oracle — il dut ensuite s'expliquer directement auprès d'Artémis et d'Apollon, furieux qu'on ait touché à un animal qui leur était consacré, avant d'être autorisé à repartir avec elle.",
    "Le cerf devient ainsi une créature située à la frontière entre l'homme et la nature sauvage. Il représente une nature belle et libre, mais qui ne peut être possédée sans conséquences.",
    "Le cerf est devenu un symbole de nature sauvage, d'instinct, d'intuition, de vigilance, de sensibilité et de passage entre le monde humain et le monde naturel.",
    "Le cerf est particulièrement associé à Artémis.",
  ]},
  "taureau":{icon:"🐂",label:"Taureau",category:"Animaux",desc:"Puissance brute, désir irrésistible — et, parfois, ce qu'elle engendre de monstrueux.",links:["zeus","poséidon","minos"],lore:[
    "Le taureau intervient dans plusieurs métamorphoses parmi les plus célèbres de la mythologie grecque. Zeus, épris de la princesse phénicienne Europe, se changea en taureau d'une blancheur et d'une douceur telles qu'elle grimpa sur son dos sans crainte — avant qu'il ne s'élance dans la mer et l'emporte jusqu'en Crète, où elle lui donna plusieurs fils, dont Minos (voir la fiche « Minos »).",
    "Un autre taureau, offert par Poséidon à ce même Minos devenu roi de Crète pour qu'il le lui sacrifie, était si beau que Minos, incapable de s'en séparer, le garda pour lui et sacrifia un animal ordinaire à la place. En punition, Poséidon rendit folle d'amour pour ce taureau l'épouse de Minos, Pasiphaé — de leur union naquit le Minotaure, tête de taureau et corps d'homme, enfermé plus tard dans le Labyrinthe (voir la fiche « Labyrinthe »).",
    "Ce même taureau, devenu incontrôlable, ravagea ensuite la campagne crétoise jusqu'à ce qu'Héraclès le capture vivant lors de son septième travail et le ramène en Grèce continentale — où, relâché, il finira par causer la mort du prince Androgée, déclenchant la guerre entre Athènes et la Crète qui est à l'origine du tribut envoyé au Minotaure.",
    "Le taureau est ainsi devenu un symbole de puissance brute, de désir irrésistible, de fécondité et, selon le contexte, de ce que cette puissance peut engendrer de monstrueux lorsqu'elle échappe à tout contrôle.",
    "Le taureau est particulièrement associé à Zeus, à Poséidon et, par le Minotaure, à Minos.",
  ]},
  "cygne":{icon:"🦢",label:"Cygne",category:"Animaux",desc:"Métamorphose séduisante, beauté qui dissimule un dessein — lié à Zeus.",links:["zeus"],lore:[
    "Le cygne est la forme que prend Zeus pour séduire Léda, reine de Sparte : sous cette apparence trompeusement paisible, il s'unit à elle le même jour que son propre époux, Tyndare.",
    "De cette double union naquirent, selon les traditions les plus répandues, Hélène — dont la beauté déclenchera plus tard la guerre de Troie — et les Dioscures Castor et Pollux, l'un mortel par son père humain, l'autre immortel par Zeus, unis au point de partager leur immortalité à parts égales après la mort de l'un d'eux.",
    "Le cygne est ainsi devenu un symbole de métamorphose séduisante, de beauté qui dissimule un dessein, et d'une naissance double où se mêlent l'humain et le divin.",
    "Le cygne est particulièrement associé à Zeus, par le mythe de Léda.",
  ]},
  "araignée":{icon:"🕷",label:"Araignée",category:"Animaux",desc:"Habileté sans limite, orgueil qui défie trop haut — la punition d'Arachné.",links:["athéna"],lore:[
    "Arachné était une jeune tisserande d'une habileté si extraordinaire qu'elle osa prétendre surpasser Athéna elle-même, déesse du tissage autant que de la sagesse.",
    "Athéna, déguisée en vieille femme, la mit d'abord en garde — en vain. Les deux rivales tissèrent alors chacune une tapisserie : celle d'Athéna glorifiait les dieux de l'Olympe, celle d'Arachné représentait sans détour leurs tromperies et leurs scandales, dont les métamorphoses de Zeus lui-même pour séduire des mortelles (voir la fiche « Taureau »).",
    "Le travail d'Arachné, techniquement parfait, ne laissait rien à reprocher — ce qui rendit la déesse plus furieuse encore. Athéna déchira la tapisserie et frappa la jeune femme, qui, de honte, tenta de se pendre. Prise de pitié au dernier instant, Athéna la sauva de la mort mais la changea en araignée, la condamnant à tisser sans fin, suspendue à son propre fil.",
    "L'araignée est ainsi devenue un symbole d'habileté sans limite, de création patiente, mais aussi d'orgueil qui défie trop haut et de talent qui, pour n'avoir pas su se taire, se retrouve puni jusque dans sa propre perfection.",
    "L'araignée est particulièrement associée à Athéna, par le mythe d'Arachné.",
  ]},

  // Plantes & végétaux
  "laurier":{icon:"🌿",label:"Laurier",category:"Plantes",desc:"Victoire, gloire, accomplissement mérité après l'effort.",links:["apollon","éros"],lore:[
    "Le laurier est intimement lié à Apollon. Selon le mythe, Apollon, frappé d'une flèche d'or par Éros après l'avoir raillé sur son habileté à l'arc (voir la fiche « Éros »), tomba éperdument amoureux de la nymphe Daphné — elle-même atteinte d'une flèche de plomb qui la rendit incapable de l'aimer en retour. Daphné, refusant ses avances, demanda à être sauvée et fut transformée en laurier par son père, le dieu-fleuve Pénée.",
    "Apollon, comprenant qu'il ne pourrait jamais l'avoir, déclara alors que le laurier lui serait désormais consacré. Il en porta une couronne et en fit un arbre sacré.",
    "Les Grecs offrirent ensuite des couronnes de laurier aux vainqueurs, aux poètes et à ceux qui avaient accompli de grandes choses. À Delphes, le laurier était également associé aux pratiques prophétiques d'Apollon.",
    "Les jeux Pythiques, célébrés tous les quatre ans à Delphes en l'honneur d'Apollon, récompensaient ainsi leurs vainqueurs — musiciens, poètes et athlètes — d'une couronne de laurier coupé dans la vallée voisine de Tempé, là où, selon la légende, Apollon lui-même s'était purifié après avoir tué le serpent Python (voir la fiche « Serpent »).",
    "Le laurier est ainsi devenu un symbole de victoire, de gloire, d'accomplissement, de poésie, de prophétie et de reconnaissance.",
    "Le laurier est particulièrement associé à Apollon et à Daphné.",
  ]},
  "olivier":{icon:"🫒",label:"Olivier",category:"Plantes",desc:"Paix, sagesse, prospérité durable.",links:["athéna","poséidon"],lore:[
    "L'olivier est lié à Athéna et à la naissance symbolique d'Athènes. Lorsque Poséidon et Athéna se disputèrent la protection de la cité, les deux divinités offrirent un présent aux habitants.",
    "Poséidon fit jaillir une source d'eau salée. Athéna planta quant à elle le premier olivier. Les habitants considérèrent ce cadeau comme plus précieux, car l'arbre pouvait leur donner de la nourriture, de l'huile, du bois et de la lumière.",
    "Athéna devint ainsi la protectrice de la cité, qui prit son nom : Athènes.",
    "Les oliviers sacrés d'Athènes, descendants directs de celui planté par Athéna, étaient protégés par une loi si stricte que déraciner l'un d'eux, même sur son propre terrain, pouvait valoir l'exil à son propriétaire — preuve que ce don, des siècles après le mythe, restait toujours traité comme un bien appartenant à la cité entière plutôt qu'à un seul homme.",
    "L'olivier est devenu le symbole de la paix, de la sagesse, de la prospérité, de la civilisation et de la protection divine.",
    "L'olivier est particulièrement associé à Athéna.",
  ]},
  "blé":{icon:"🌾",label:"Blé",category:"Plantes",desc:"Récolte, travail, nourriture, cycle des saisons.",links:["déméter"],lore:[
    "Le blé est avant tout associé à Déméter, déesse de l'agriculture et des récoltes.",
    "Lorsque Perséphone fut enlevée par Hadès, Déméter, accablée de chagrin, parcourut le monde à sa recherche et cessa de faire pousser les plantes. La terre devint stérile et les récoltes disparurent.",
    "Lorsque Perséphone put finalement revenir auprès d'elle, la terre recommença à produire. Le cycle de Perséphone expliquait ainsi symboliquement l'alternance des saisons et le retour des récoltes.",
    "Déméter choisit un jour un jeune prince éleusinien, Triptolème, pour répandre ce savoir à travers le monde : elle lui offrit un char tiré par des dragons ailés et des graines de blé, avec pour mission d'enseigner aux hommes, où qu'ils se trouvent, l'art de cultiver la terre — un don qui fit de lui l'un des personnages centraux des Mystères d'Éleusis.",
    "L'épi de blé représente donc ce qui nourrit les hommes mais aussi ce qui doit être semé, mourir, puis renaître pour produire une nouvelle récolte.",
    "Il est devenu un symbole de récolte, de nourriture, de travail, de fécondité, de cycle et d'abondance.",
    "Le blé et l'épi sont particulièrement associés à Déméter.",
  ]},
  "cyprès":{icon:"🌲",label:"Cyprès",category:"Plantes",desc:"Mort, mémoire, passage — arbre funéraire qui reste vert toute l'année.",links:["hadès","apollon"],lore:[
    "Le cyprès possède une association très forte avec la mort et le monde funéraire dans l'Antiquité grecque : planté aux abords des tombeaux, son feuillage qui ne tombe jamais en fit l'arbre de la permanence du deuil, dressé à la frontière entre le monde des vivants et celui d'Hadès (voir la fiche « Enfer / monde souterrain »).",
    "Un des récits les plus célèbres est celui de Cyparisse, un jeune homme aimé d'Apollon. Il possédait un cerf qu'il aimait profondément. Après avoir tué accidentellement l'animal, Cyparisse fut inconsolable et demanda à pouvoir pleurer éternellement.",
    "Apollon le transforma alors en cyprès.",
    "Le cyprès devint ainsi l'arbre du deuil et du souvenir. Son feuillage persistant et sa silhouette qui s'élève vers le ciel renforcèrent encore cette association avec la mort, la mémoire et le passage vers l'au-delà.",
    "Le bois de cyprès, réputé quasiment imputrescible, était d'ailleurs concrètement utilisé pour fabriquer cercueils et sarcophages dans l'Antiquité — une propriété bien réelle qui renforçait encore, très concrètement, son lien avec la mort et la permanence au-delà du corps.",
    "Le cyprès est devenu un symbole de mort, de deuil, de mémoire, de passage et de permanence du souvenir.",
    "Le cyprès est particulièrement associé à Hadès et au monde funéraire, ainsi qu'à Apollon à travers le mythe de Cyparisse.",
  ]},
  "rose":{icon:"🌹",label:"Rose",category:"Plantes",desc:"Amour, beauté, désir — et la vulnérabilité qui va avec.",links:["aphrodite"],lore:[
    "La rose est principalement associée à Aphrodite, déesse de l'amour et de la beauté.",
    "Dans certaines traditions mythologiques, les roses seraient apparues à travers les histoires liées à Aphrodite et à ceux qu'elle aimait. Leur beauté, leur parfum et leurs épines correspondent parfaitement à la double nature de l'amour : attirant et merveilleux, mais capable aussi de blesser.",
    "La couleur rouge a progressivement renforcé l'association entre la rose et le désir, le sang, la passion et l'amour charnel.",
    "Un mythe précis explique même cette couleur : en courant pieds nus porter secours à Adonis mortellement blessé par un sanglier, Aphrodite se serait blessée sur les épines d'un rosier jusque-là blanc — son sang aurait alors teint les fleurs d'un rouge qu'elles n'ont plus jamais perdu.",
    "La rose est donc devenue un symbole de l'amour, de la beauté, du désir, de la passion mais aussi de la vulnérabilité et de la douleur qui peuvent accompagner l'amour.",
    "La rose est particulièrement associée à Aphrodite.",
  ]},
  "myrte":{icon:"🌸",label:"Myrte",category:"Plantes",desc:"Amour, mariage — liée à Aphrodite.",links:["aphrodite"],lore:[
    "Le myrte est une plante sacrée d'Aphrodite.",
    "Selon une tradition, lorsqu'Aphrodite sortit de la mer, elle aurait cherché à dissimuler sa nudité derrière des branches de myrte. L'arbuste devint alors l'un de ses végétaux sacrés.",
    "Le myrte était également utilisé lors des mariages et des cérémonies liées à l'amour. Il représentait une union durable et la fécondité du couple.",
    "Une tradition raconte même qu'un satyre l'aurait un jour épiée alors qu'elle se baignait, cachée derrière des branches de myrte insuffisamment épaisses pour la dissimuler tout à fait — une pudeur trahie qui n'a jamais empêché l'arbuste de rester associé à elle depuis.",
    "Il est ainsi devenu un symbole de l'amour, du mariage, de la beauté, de la fécondité et de l'union.",
    "Le myrte est particulièrement associé à Aphrodite.",
  ]},
  "lierre":{icon:"🍃",label:"Lierre",category:"Plantes",desc:"Attachement, immortalité — lié à Dionysos.",links:["dionysos"],lore:[
    "Le lierre est l'une des plantes les plus fortement liées à Dionysos.",
    "Contrairement à la vigne, qui disparaît pendant l'hiver avant de renaître, le lierre reste vert et continue de s'accrocher aux arbres et aux pierres. Cette résistance lui a donné une dimension d'immortalité et de permanence.",
    "Les cortèges de Dionysos sont souvent représentés avec du lierre, porté en couronne ou utilisé pour orner les thyrses et les objets rituels.",
    "Selon une tradition, le lierre aurait protégé Dionysos enfant en poussant si vite autour de son berceau qu'il le dissimula entièrement aux yeux d'Héra, furieuse de la naissance de ce fils illégitime de Zeus — un geste de protection végétale qui explique pourquoi la plante lui reste depuis indéfectiblement attachée.",
    "Le lierre est ainsi devenu un symbole de Dionysos, de l'attachement, de la vitalité, de l'immortalité et de ce qui survit au passage du temps.",
    "Le lierre est particulièrement associé à Dionysos.",
  ]},
  "lotus":{icon:"🪷",label:"Lotus",category:"Plantes",desc:"Émergence, purification, renaissance depuis les eaux troubles.",links:[],lore:[
    "Le lotus possède une symbolique particulière parce qu'il pousse dans la boue et l'eau avant de faire apparaître une fleur à la surface.",
    "Dans l'imaginaire antique, cette capacité à émerger d'un milieu sombre pour s'ouvrir à la lumière pouvait évoquer la purification et la renaissance.",
    "Il faut toutefois être prudent avec l'association directe entre le lotus et une divinité grecque précise : le « lotus » des textes grecs ne correspond pas nécessairement à la fleur de lotus telle qu'on la représente aujourd'hui. Chez Homère, les Lotophages sont notamment un peuple dont la nourriture provoque l'oubli et le désir de ne plus retourner chez soi.",
    "Homère précise que ce fruit était si doux que quiconque y goûtait perdait aussitôt tout désir de rentrer chez soi et tout souvenir du chemin du retour — les compagnons d'Ulysse qui en mangèrent durent être ramenés de force, en pleurs, jusqu'aux navires.",
    "Il peut ainsi représenter émergence, purification, renaissance, oubli et transformation.",
  ]},
  "pavot":{icon:"🌺",label:"Pavot",category:"Plantes",desc:"Sommeil, oubli, rêve — ce qui apaise mais peut aussi endormir la vigilance.",links:["hypnos","morphée"],lore:[
    "Le pavot est lié à plusieurs divinités, notamment Déméter et Perséphone, et à l'univers du sommeil et de l'oubli.",
    "Ses propriétés soporifiques étaient connues dans l'Antiquité. La fleur pouvait donc symboliser le sommeil, l'apaisement et l'oubli.",
    "Dans le contexte du mythe de Déméter et de Perséphone, le pavot est également associé à la fertilité et aux mystères liés à la terre. Il peut ainsi relier le sommeil de l'être humain au repos de la nature avant son réveil.",
    "Le pavot est aussi l'attribut d'Hypnos, dieu du Sommeil, et de son fils Morphée (voir la fiche « Morphée »), qu'on représente parfois une tige de pavot à la main ou une couronne de ces mêmes fleurs sur la tête — un lien si étroit entre la plante et le sommeil qu'il a traversé les siècles jusque dans le vocabulaire médical de l'opium et de la morphine.",
    "Le pavot est devenu un symbole de sommeil, d'oubli, de rêve, d'apaisement et de passage entre deux états.",
    "Le pavot peut être particulièrement associé à Déméter et Perséphone — et, par son usage le plus direct, à Hypnos et à son fils Morphée.",
  ]},
  "crocus":{icon:"🌼",label:"Fleur de crocus",category:"Plantes",desc:"Renouveau, printemps, transformation qui recommence.",links:[],lore:[
    "Le crocus est lié à une histoire de transformation particulièrement tragique.",
    "Selon le mythe, Crocos était un jeune homme associé à Hermès. Après sa mort accidentelle, il fut transformé en fleur. Dans certaines traditions, la fleur apparaît également dans les récits liés à Perséphone et à son retour saisonnier.",
    "Le crocus fleurit très tôt, parfois alors que l'hiver n'est pas encore totalement terminé. Il est donc naturellement devenu une image du retour de la vie après une période de froid et d'immobilité.",
    "Dans l'Iliade, Homère décrit le sol se couvrant spontanément de crocus, de lotus et de jacinthe tendre au moment où Zeus et Héra s'unissent sur le mont Ida — comme si la terre elle-même célébrait, par ses fleurs les plus fragiles, l'union du roi et de la reine des dieux.",
    "Sa floraison précoce permet d'en faire un symbole de renouveau, de printemps, de transformation et de renaissance après une période sombre.",
    "Le crocus est particulièrement intéressant pour représenter la transformation : quelque chose meurt ou disparaît, puis réapparaît sous une autre forme.",
  ]},
  "chêne":{icon:"🌳",label:"Chêne",category:"Plantes",desc:"Arbre sacré de Zeus : force tranquille, sagesse qui parle par le vent plutôt que par des mots clairs.",links:["zeus"],lore:[
    "Le chêne est l'arbre sacré de Zeus, et le plus ancien oracle de toute la Grèce, celui de Dodone, en Épire, lui était entièrement consacré.",
    "Contrairement à Delphes, où la Pythie prononçait des paroles, l'oracle de Dodone rendait ses réponses par le simple bruissement des feuilles d'un chêne sacré planté au cœur du sanctuaire — des prêtres appelés Selloi interprétaient ensuite ce murmure pour en tirer un sens destiné aux pèlerins venus consulter le dieu.",
    "Sa solidité, sa longévité et ses racines profondément ancrées dans le sol en ont naturellement fait l'image d'une force tranquille, capable de résister aux tempêtes les plus violentes sans jamais rompre.",
    "Le chêne est ainsi devenu un symbole de force stable, de sagesse ancienne, de protection divine et d'une vérité qui se murmure plutôt qu'elle ne s'impose.",
    "Le chêne est particulièrement associé à Zeus.",
  ]},

  // Fruits & graines
  "raisin":{icon:"🍇",label:"Raisin",category:"Fruits & graines",desc:"Abondance, plaisir partagé, transformation par la fermentation.",links:["dionysos"],lore:[
    "Le raisin est le fruit de Dionysos. Il concentre tout ce que représente la vigne : abondance, plaisir et transformation.",
    "Le raisin fraîchement cueilli devient du vin après fermentation. Ce changement physique fascinait les anciens et correspond parfaitement à l'univers de Dionysos : quelque chose de naturel se transforme en une substance capable de modifier profondément l'état de celui qui la consomme.",
    "Un vin resté célèbre dans l'Odyssée est celui que le prêtre Maron offre à Ulysse : si fort qu'il fallait le couper avec vingt parts d'eau, c'est lui qu'Ulysse utilise pour enivrer le Cyclope Polyphème avant de lui crever son unique œil et de s'échapper de sa caverne.",
    "Le raisin symbolise donc l'abondance, le plaisir, la transformation, la fête et l'ivresse.",
    "Le raisin est particulièrement associé à Dionysos.",
  ]},
  "olive":{icon:"🫒",label:"Olive",category:"Fruits & graines",desc:"Le fruit concret du don d'Athéna : nourriture, huile, paix, prospérité.",links:["athéna"],lore:[
    "L'olive est le fruit de l'arbre offert par Athéna à la cité d'Athènes.",
    "Elle représente donc la partie concrète du don d'Athéna : une nourriture, une huile précieuse, une source de lumière et un produit essentiel à la vie quotidienne.",
    "Elle porte la symbolique de l'olivier mais de manière plus directement liée à la prospérité, à la nourriture, à la paix et aux bienfaits de la civilisation.",
    "Lors des Jeux panathénaïques d'Athènes, les vainqueurs des épreuves sportives recevaient comme récompense de grandes amphores remplies d'huile d'olive sacrée, pressée des oliviers issus directement de celui planté par Athéna — un prix aussi précieux que pratique, puisque cette huile pouvait ensuite être vendue ou échangée dans tout le monde grec.",
    "L'olive est particulièrement associée à Athéna.",
  ]},
  "figue":{icon:"🫐",label:"Figue",category:"Fruits & graines",desc:"Fécondité douce, plaisir simple, maturité assumée.",links:[],lore:[
    "La figue était un fruit important dans le monde grec et était liée à la fertilité et à l'abondance.",
    "Son apparence est elle-même particulière : ce que nous appelons une « figue » est en réalité une structure remplie de nombreuses petites fleurs devenues fruits. Elle contient donc une multitude de graines cachées à l'intérieur.",
    "Cette richesse intérieure en a fait un fruit naturellement associé à la fécondité, à l'abondance et à la prospérité.",
    "Le figuier était aussi associé à Dionysos : lors des processions rituelles en son honneur, on portait des représentations en bois de figuier taillées en forme phallique, symboles explicites de la fécondité que le dieu était censé répandre sur la terre et les hommes.",
    "La figue peut donc représenter fertilité, abondance, nourriture, richesse cachée et fécondité de la terre.",
  ]},
  "pomme":{icon:"🍎",label:"Pomme",category:"Fruits & graines",desc:"Beauté, désir et rivalité — le fruit du jugement de Pâris.",links:["aphrodite","héraclès"],lore:[
    "La pomme possède plusieurs associations mythologiques grecques.",
    "La plus célèbre est sans doute la pomme d'or offerte par Eris lors du mariage de Pélée et Thétis. La déesse de la Discorde lança la pomme portant l'inscription destinée « à la plus belle », ce qui déclencha la rivalité entre Héra, Athéna et Aphrodite et conduisit finalement au jugement de Pâris.",
    "La pomme devient alors le fruit de la beauté, du désir, de la rivalité et du choix.",
    "Les pommes d'or du jardin des Hespérides sont également liées à Héraclès et à l'immortalité.",
    "Ces mêmes pommes d'or jouent aussi un rôle décisif dans la course d'Atalante (voir la fiche « Atalante ») : pour la ralentir, Hippomène en laisse tomber trois devant elle, empruntées au jardin des Hespérides, et c'est en s'arrêtant chaque fois pour les ramasser qu'elle finit par perdre la course — et gagner, du même geste, un mari à sa mesure.",
    "La pomme peut donc représenter beauté, désir, tentation, rivalité, choix et immortalité.",
  ]},
  "noix":{icon:"🌰",label:"Noix",category:"Fruits & graines",desc:"Ce qui reste protégé, caché, réservé à qui sait ouvrir la coque.",links:[],lore:[
    "La noix est particulièrement intéressante parce qu'elle possède une coque dure qui protège une nourriture cachée à l'intérieur.",
    "Dans le symbolisme antique, cette structure pouvait naturellement évoquer ce qui est dissimulé, protégé ou réservé à celui qui sait ouvrir la coque.",
    "Le noyer porte en réalité un mythe précis, moins connu que celui de la grenade ou du laurier : Carya, princesse de Laconie aimée de Dionysos, mourut et fut changée par le dieu en noyer. Les Dioscures, informés par Artémis, en avertirent les Spartiates, qui lui élevèrent un temple et sculptèrent en son honneur des colonnes en forme de jeunes femmes — les caryatides, dont le nom vient directement du grec karya, « noyer ».",
    "Elle reste ainsi un symbole de ce qui est dissimulé, protégé, réservé à celui qui sait ouvrir la coque — et, par Carya, d'un amour que même la mort n'a pas empêché de rester visible.",
  ]},
  "graine":{icon:"🌱",label:"Graine",category:"Fruits & graines",desc:"Potentiel pur, ce qui n'a pas encore germé mais porte déjà toute la forme à venir.",links:[],lore:[
    "Elle semble morte lorsqu'elle est enfouie dans la terre. Pourtant, elle contient déjà la possibilité d'une nouvelle plante. Elle disparaît donc temporairement pour réapparaître sous une autre forme.",
    "Cette idée rejoint parfaitement les grands cycles de la mythologie grecque : Perséphone descend sous la terre puis revient, les champs meurent en hiver puis renaissent au printemps, et la terre recommence chaque année son œuvre.",
    "Une tradition précise même le nombre de ces graines : selon certaines versions du mythe, Perséphone en aurait avalé six, ce qui explique pourquoi elle doit passer six mois de l'année aux Enfers avant de remonter passer les six autres auprès de sa mère — un compte exact pour un mythe qui explique, graine par graine, le rythme même des saisons.",
    "La graine peut ainsi représenter le potentiel, le commencement, la gestation, la transformation, la mort apparente et la renaissance.",
  ]},

  // Éléments
  "feu":{icon:"🔥",label:"Feu",category:"Éléments",desc:"Flamme, étincelle, soleil, fumée : action, volonté, élan.",links:["prométhée","hestia"],lore:[
    "Le feu occupe une place unique dans la mythologie grecque : c'est le seul élément que les dieux ont d'abord refusé aux hommes.",
    "Prométhée le déroba à l'Olympe, caché dans une tige de fenouil, pour l'offrir à l'humanité — un geste qui lui valut d'être enchaîné pour l'éternité (voir la fiche « Chaîne »). Le feu devint ainsi le premier outil véritablement humain, celui qui permit la technique, la cuisson, la métallurgie et la civilisation elle-même.",
    "Le philosophe Empédocle en fit plus tard l'une des quatre racines de toute matière, aux côtés de l'eau, de l'air et de la terre — une théorie qui a nourri toute la pensée grecque sur la nature du monde, bien après les mythes qui l'avaient d'abord racontée.",
    "Ce feu volé devait aussi être entretenu sans jamais s'éteindre : dans chaque cité grecque, une flamme perpétuelle brûlait au prytanée, sous la garde d'Hestia (voir la fiche « Hestia »), et les colons qui partaient fonder une nouvelle ville emportaient toujours un peu de cette braise pour allumer le premier feu de leur nouveau foyer.",
    "Le feu est devenu un symbole d'action, de volonté, d'élan — et du prix qu'il faut parfois payer pour ce qu'on ose transmettre.",
  ]},
  "eau":{icon:"💧",label:"Eau",category:"Éléments",desc:"Source, rivière, vague, pluie, miroir : émotion, relation, ce qui circule.",links:[],lore:[
    "L'eau est, dans la mythologie grecque, l'élément qui traverse aussi bien le monde des vivants que celui des morts : les fleuves des Enfers (Styx, Léthé, Achéron) sont tous des cours d'eau, et c'est sur l'eau du Styx que les dieux prêtaient leurs serments les plus sacrés.",
    "Elle est aussi le domaine de Poséidon et de tout un peuple de divinités marines et fluviales, des Néréides aux dieux-fleuves, qui montrent que l'eau n'est jamais un simple décor mais un ensemble de forces vivantes.",
    "Empédocle en fit l'une des quatre racines de toute matière, aux côtés du feu, de l'air et de la terre — l'élément de ce qui coule, se mêle et jamais ne reste immobile.",
    "À Delphes, les pèlerins venus consulter l'oracle devaient d'abord se purifier dans les eaux de la source Castalie, au pied du mont Parnasse — un geste rituel qui rappelle qu'aucune parole divine ne pouvait être reçue sans être, au préalable, purifiée par l'eau.",
    "L'eau est devenue un symbole d'émotion, de relation et de ce qui circule sans jamais s'arrêter tout à fait.",
  ]},
  "air":{icon:"🌬",label:"Air",category:"Éléments",desc:"Vent, souffle, plume, nuage : pensée, décision, clarté mentale.",links:["hermès","iris","borée","zéphyr"],lore:[
    "L'air, dans la mythologie grecque, est le domaine où circulent les messages : c'est par les airs qu'Hermès porte ses nouvelles et qu'Iris tend son arc-en-ciel entre le ciel et la terre.",
    "C'est aussi le souffle (pneuma) que les Anciens associaient à la vie elle-même et, plus tard, à la pensée et à l'inspiration — respirer et penser relevaient d'un même principe invisible.",
    "Les quatre vents cardinaux, les Anémoi, personnifient directement cet air en mouvement : Borée au nord (voir la fiche « Borée »), Notos au sud, Euros à l'est et Zéphyr à l'ouest (voir la fiche « Zéphyr »), chacun soufflant avec un caractère bien distinct, du plus brutal au plus doux.",
    "Empédocle en fit l'une des quatre racines de toute matière, aux côtés du feu, de l'eau et de la terre — l'élément qu'on ne voit jamais directement, mais dont les effets se sentent partout.",
    "L'air est devenu un symbole de pensée, de décision et de clarté mentale — ce qui circule sans jamais se laisser saisir.",
  ]},
  "terre":{icon:"🌿",label:"Terre",category:"Éléments",desc:"Racine, pierre, sol, montagne : matière, croissance, incarnation concrète.",links:["gaïa","déméter"],lore:[
    "La terre est, dans la mythologie grecque, une puissance primordiale : Gaïa, la Terre elle-même, engendre en premier le Ciel (Ouranos) et donne naissance à toutes les générations divines qui suivront, y compris les Titans et, à travers eux, les dieux de l'Olympe.",
    "Elle est aussi le domaine de Déméter, déesse des moissons, dont le chagrin après l'enlèvement de Perséphone rend la terre stérile chaque année, avant que son retour ne la fasse à nouveau produire.",
    "Le géant Antée, fils de Gaïa et de Poséidon, tirait toute sa force du contact avec sa mère la Terre : invincible tant qu'il restait au sol, il ne fut vaincu par Héraclès que lorsque celui-ci comprit qu'il fallait le soulever à bout de bras, le coupant ainsi de la source même de sa puissance, pour pouvoir enfin l'étouffer.",
    "Empédocle en fit l'une des quatre racines de toute matière, aux côtés du feu, de l'eau et de l'air — l'élément le plus stable, celui qui porte et nourrit tous les autres.",
    "La terre est devenue un symbole de matière, de croissance et d'incarnation concrète — ce qui accueille, porte et fait pousser.",
  ]},

  // Astres & phénomènes
  "soleil":{icon:"☀",label:"Soleil",category:"Astres & phénomènes",desc:"Clarté, conscience, vitalité, vérité qui n'a plus besoin de se cacher.",links:["hélios"],lore:[
    "Le soleil est le corps même d'Hélios, qui traverse chaque jour le ciel sur son char de feu, voyant tout ce qui se passe sur terre sans qu'aucun secret ne puisse lui échapper.",
    "Son fils Phaéton, voulant un jour conduire le char à sa place, en perdit le contrôle et faillit embraser la terre entière — un rappel que la lumière qui révèle tout est aussi une force qu'il faut savoir maîtriser.",
    "Le soleil ne se cache jamais : c'est précisément ce qui en fait, dans cette mythologie, le témoin par excellence, celui devant qui rien ne reste dans l'ombre.",
    "C'est lui, dit-on, qui surprit un jour Arès et Aphrodite dans les bras l'un de l'autre et le rapporta aussitôt à Héphaïstos, l'époux trompé (voir les fiches « Arès » et « Aphrodite ») — une preuve concrète que rien, dans cette mythologie, n'échappe longtemps au regard du Soleil.",
    "Il est devenu un symbole de clarté, de conscience, de vitalité et de vérité qui n'a plus besoin de se cacher.",
    "Le soleil est particulièrement associé à Hélios.",
  ]},
  "lune":{icon:"🌙",label:"Lune",category:"Astres & phénomènes",desc:"Inconscient, intuition, cycles, incertitude qui n'empêche pas d'avancer.",links:["séléné","métis"],lore:[
    "La lune est le corps de Séléné, qui traverse le ciel nocturne comme son frère Hélios traverse le ciel diurne.",
    "Son mythe le plus connu est celui d'Endymion, berger d'une beauté si parfaite que Séléné, tombée amoureuse, obtint pour lui un sommeil éternel plutôt que la mort — afin de pouvoir continuer, chaque nuit, à venir le contempler.",
    "La lune porte aussi la trace de Métis, titanide de la ruse et de la sagesse cachée : un savoir qui, comme la lune elle-même, ne se montre jamais tout entier d'un coup, mais se dévoile par phases.",
    "Un mythe plus étrange lui prête aussi une autre conquête : le dieu Pan, désireux de la séduire, se serait déguisé en bélier à la toison d'un blanc éclatant pour l'attirer dans les bois et gagner ses faveurs — preuve que même la lune, réputée insaisissable, pouvait se laisser surprendre par la ruse.",
    "Elle est devenue un symbole d'inconscient, d'intuition, de cycles et d'incertitude qui n'empêche pas d'avancer.",
    "La lune est particulièrement associée à Séléné et à Métis.",
  ]},
  "étoiles":{icon:"✦",label:"Étoile",category:"Astres & phénomènes",desc:"Orientation, espoir, inspiration retrouvée après l'épreuve.",links:["hécate","astéria","éos"],lore:[
    "Les étoiles se rattachent à Hécate par sa mère, Astéria, titanide dont le nom signifie littéralement « étoilée ».",
    "Pour échapper aux avances de Zeus, Astéria se jeta dans la mer et fut changée en île — Délos, selon certaines traditions — après avoir été un temps assimilée aux étoiles filantes. Sa fille Hécate hérita de cette proximité avec le ciel nocturne et l'orientation qu'il offre à qui sait le lire.",
    "Contrairement au soleil qui révèle tout d'un coup, les étoiles n'éclairent que faiblement — mais elles suffisent à orienter celui qui a perdu son chemin dans l'obscurité.",
    "Le chasseur Orion, aimé un temps par Éos (voir la fiche « Éos »), fut lui aussi placé parmi les étoiles après sa mort, sous la forme d'une des constellations les plus reconnaissables du ciel nocturne — un ceinturon de trois étoiles alignées que l'on retrouve, presque inchangé, sur toutes les cartes du ciel depuis l'Antiquité.",
    "Elles sont devenues un symbole d'orientation, d'espoir et d'inspiration retrouvée après l'épreuve.",
    "Les étoiles sont particulièrement associées à Hécate, par sa mère Astéria.",
  ]},
  "aurore":{icon:"🌅",label:"Aurore",category:"Astres & phénomènes",desc:"Commencement, renaissance, ce qui redémarre après l'obscurité.",links:["éos","hélios"],lore:[
    "L'aurore est le corps d'Éos, déesse aux doigts de rose qui ouvre chaque jour les portes du ciel pour annoncer le passage d'Hélios.",
    "Éos est aussi connue pour ses amours mortelles, comme Tithonos, à qui elle obtint l'immortalité sans penser à demander aussi l'éternelle jeunesse — un rappel que même un don des dieux peut se retourner si l'on ne pense pas à tout.",
    "Elle pleure aussi un fils tombé à la guerre de Troie, Memnon, roi des Éthiopiens tué par Achille : chaque matin, dit-on, la rosée qui couvre l'herbe n'est autre que les larmes qu'elle continue de verser sur lui, inlassablement, depuis sa mort.",
    "Chaque aurore répète ainsi un même geste : ouvrir à nouveau ce qui semblait clos, redonner une chance après la nuit la plus sombre.",
    "Elle est devenue un symbole de commencement, de renaissance et de ce qui redémarre après l'obscurité.",
  ]},
  "éclipse":{icon:"🌑",label:"Éclipse",category:"Astres & phénomènes",desc:"Obscurcissement temporaire, transition, révélation qui attend son heure.",links:[],lore:[
    "Longtemps, une éclipse fut perçue comme un présage redoutable : le soleil ou la lune s'éteignant sans explication ne pouvait, croyait-on, qu'annoncer un désordre plus grand encore.",
    "C'est un Grec, le philosophe Anaxagore, qui proposa au Ve siècle avant notre ère l'une des premières explications naturelles de ce phénomène : l'éclipse ne serait pas un signe des dieux mais l'ombre portée d'un astre sur un autre — une idée si audacieuse pour son temps qu'elle lui valut d'être accusé d'impiété.",
    "Hérodote raconte qu'une éclipse survenue en pleine bataille entre Lydiens et Mèdes, prédite à l'avance par le philosophe Thalès de Milet, terrifia les deux armées au point de les pousser à conclure la paix sur-le-champ — la première éclipse de l'histoire dont la date peut être calculée avec précision aujourd'hui, à partir de ce seul récit.",
    "L'éclipse raconte ainsi, mieux qu'aucun autre phénomène céleste, le moment où le mythe cède la place à l'explication — sans que le sentiment de mystère ne disparaisse tout à fait.",
    "Elle est devenue un symbole d'obscurcissement temporaire, de transition et de révélation qui attend son heure pour se manifester.",
  ]},
  "éclair":{icon:"⚡",label:"Éclair",category:"Astres & phénomènes",desc:"Révélation brutale, rupture soudaine, énergie qui ne prévient pas.",links:["zeus","poséidon"],lore:[
    "L'éclair partage son origine avec la foudre (voir cette fiche) : c'est l'arme que les Cyclopes forgèrent pour Zeus après sa victoire sur les Titans.",
    "Mais l'éclair est aussi ce qui rend visible, l'espace d'un instant, ce que l'obscurité cachait — une déchirure brève dans la nuit, plutôt que le coup qui suit. Poséidon, de son côté, produit une violence tout aussi soudaine mais depuis le sol : ses coups de trident font trembler la terre avec la même absence totale de préavis.",
    "Zeus dans le ciel, Poséidon sous la terre : à eux deux, ils montrent qu'aucun des deux royaumes, ni le plus haut ni le plus profond, n'est à l'abri d'une violence instantanée.",
    "Un roi mortel, Salmonée, poussa un jour l'orgueil jusqu'à vouloir imiter cette arme : il traînait des chaudrons de bronze derrière son char pour en imiter le tonnerre et lançait des torches enflammées en se proclamant l'égal de Zeus — le vrai dieu, furieux de cette imposture, le foudroya sur-le-champ d'un authentique éclair.",
    "L'éclair est devenu un symbole de révélation brutale, de rupture soudaine et d'énergie qui ne prévient pas.",
    "L'éclair est particulièrement associé à Zeus et à Poséidon.",
  ]},
};

// Alias : formes alternatives pointant vers la même fiche
const SYMBOL_ALIASES = {
  "deux vases":"eau","vases":"eau","panthère":"vigne","sac de voyage":"chemin","table":"caducée",
  "colonnes":"voile","livre":"voile","cornes":"flûte","peau de lion":"lion","massue":"lion","mains nues":"lion",
  "rocher":"chaîne","suspension":"chaîne","faux":"monde souterrain","tour":"chaîne","vagues":"mer",
  "chien":"chien","carrefour":"étoiles","deux tours":"lune","rayons":"soleil","âmes":"balance",
  "trompette":"balance","mandorle":"terre","racines":"terre","monde vivant":"terre","quatre figures":"terre",
  "disciples":"bâton","blessure":"bâton","sagesse":"bâton",
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

  /* ----- Figures de cour supplémentaires ----- */
  "éos":"Déesse de l'aurore aux doigts de rose, elle ouvre chaque matin les portes du ciel au passage du soleil.",
  "niké":"Déesse ailée de la victoire, elle accompagne les vainqueurs sans jamais combattre elle-même.",
  "hestia":"Déesse du foyer, gardienne de la flamme sacrée au centre de chaque maison.",
  "héphaïstos":"Dieu forgeron, créateur ingénieux des armes et merveilles de l'Olympe malgré son rejet initial.",
  "himeros":"Dieu ailé du désir soudain, compagnon d'Éros.",
  "énée":"Héros troyen, fils d'Aphrodite, fidèle jusque dans la ruine de sa cité.",
  "zéphyr":"Dieu du vent d'ouest, le plus doux mais aussi le plus changeant des vents.",
  "éole":"Gardien des vents, il les enferme et n'en libère que ce qui est nécessaire.",
  "chloris":"Déesse des fleurs, elle transforme en jardin chaque lieu qu'elle traverse.",
  "triptolème":"Héros formé par Déméter, messager de l'agriculture porté de terre en terre.",
  "ploutos":"Dieu de la richesse, rendu aveugle par Zeus pour la distribuer sans favoritisme.",

  /* ----- Autres figures mentionnées dans les lectures des cartes numérales ----- */
  "jason":"Chef des Argonautes, parti à la conquête de la Toison d'or à bord de l'Argo.",
  "achille":"Le plus grand guerrier de la guerre de Troie, connu pour sa bravoure et sa colère.",
  "thétis":"Néréide insaisissable, mère d'Achille, dont la ténacité et le don de métamorphose défièrent le destin annoncé pour son fils.",
  "atlas":"Titan condamné à porter le poids du ciel sur ses épaules pour l'éternité.",
  "psyché":"Mortelle aimée d'Éros, unie à lui après avoir traversé de nombreuses épreuves.",
  "charites":"Trois déesses de la grâce et de la joie, toujours représentées ensemble, jamais seules.",
  "narcisse":"Jeune homme épris de son propre reflet, incapable de voir l'amour qu'on lui offrait.",
  "écho":"Nymphe condamnée à ne répéter que les derniers mots des autres, éprise en vain de Narcisse.",
  "circé":"Magicienne capable de transformer les hommes en animaux à l'aide de breuvages trompeurs.",
  "pythie":"Prêtresse d'Apollon à Delphes, elle rendait des oracles dans une clarté parfois brutale.",
  "endymion":"Berger plongé par Séléné dans un sommeil éternel pour rester à jamais jeune.",
  "charon":"Passeur des Enfers, il conduit les âmes à travers le Styx vers l'autre monde.",
  "ulysse":"Héros rusé de l'Odyssée, inventeur du stratagème du cheval de Troie.",
  "andromède":"Princesse enchaînée à un rocher en offrande à un monstre marin, sauvée par Persée.",
  "persée":"Héros vainqueur de la Gorgone Méduse, sauveur d'Andromède.",
  "érinyes":"Divinités vengeresses qui poursuivent les coupables sans relâche, jusque dans leurs rêves.",
  "actéon":"Chasseur changé en cerf par Artémis pour l'avoir surprise au bain, puis déchiré par ses propres chiens.",
  "artémis":"Déesse de la chasse et de la nature sauvage, farouchement protectrice de son intimité.",
  "orion":"Géant chasseur aimé d'Éos puis compagnon de chasse d'Artémis, changé en étoiles après une mort injuste.",
  "iphigénie":"Fille d'Agamemnon, sauvée in extremis du sacrifice par Artémis, qui la fit prêtresse de son temple.",
  "ariane":"Fille de Minos, elle guide Thésée hors du Labyrinthe grâce à un fil, puis devient l'épouse immortelle de Dionysos.",
  "sémélé":"Mère mortelle de Dionysos, morte en voyant Zeus dans sa splendeur, puis ramenée de l'Olympe par son fils et déifiée.",
  "hébé":"Déesse de la jeunesse, échanson des dieux sur l'Olympe, devenue l'épouse d'Héraclès après sa divinisation.",
  "ilithyie":"Déesse de l'accouchement, capable aussi bien de faciliter une naissance que de la retenir sur ordre d'Héra.",
  "léto":"Titanide aimée de Zeus, elle ne put accoucher d'Apollon et d'Artémis qu'après avoir trouvé refuge sur l'île de sa sœur Astéria.",
  "astéria":"Titanide changée en île pour fuir Zeus, devenue Délos — refuge plus tard offert à sa sœur Léto.",
  "cadmos":"Fondateur et premier roi de Thèbes, vainqueur d'un dragon et époux d'Harmonie.",
  "harmonie":"Fille d'Arès et d'Aphrodite, personnification de la concorde, épouse de Cadmos.",
  "atalante":"Chasseresse invaincue à la course, première à blesser le sanglier de Calydon.",
  "protée":"Dieu marin insaisissable, capable de changer sans cesse de forme.",
  "cyclopes":"Artisans géants à l'œil unique, forgerons associés à Héphaïstos dans les grandes œuvres divines.",
  "cybèle":"Déesse de la terre nourricière, souveraine d'une abondance sauvage.",

  /* ----- Personnifications des cartes numérales illustrées d'Épées ----- */
  "aletheia":"Personnification de la Vérité, dont le nom signifie littéralement « ce qui échappe à l'oubli ».",
  "ananké":"Déesse primordiale de la Nécessité, à laquelle même les dieux ne peuvent se soustraire.",
  "éris":"Déesse de la Discorde, dont la pomme d'or jetée aux noces de Thétis déclencha le jugement de Pâris.",
  "lethée":"Fleuve des Enfers, personnification de l'Oubli — son eau efface jusqu'au souvenir d'avoir vécu.",
  "némésis":"Déesse de la rétribution, qui rétablit l'équilibre chaque fois que la démesure dépasse sa juste limite.",
  "palioxis":"Personnification du reflux d'une armée en déroute, du cortège d'Arès — le repli, non la défaite.",
  "apaté":"Personnification de la Tromperie, fille de la Nuit, rivale d'Aletheia la Vérité.",
  "phobos":"Personnification de la Peur, fils d'Arès et d'Aphrodite, jumeau de Deimos — il escorte les guerriers avant le combat.",
  "morphée":"Dieu des songes, fils d'Hypnos, capable de prendre dans le rêve la forme parfaite de n'importe quel mortel.",
  "thanatos":"Personnification de la mort paisible, frère jumeau d'Hypnos le Sommeil — inévitable, jamais cruelle.",
  "hormos":"Personnification de l'élan qui précède toute action, honoré à Athènes à côté de la Pitié.",
  "arès":"Dieu de la guerre dans sa forme la plus brute, fils de Zeus et d'Héra, amant d'Aphrodite.",
  "thalia":"L'une des trois Charites, personnifiant la fête, l'abondance et tout ce qui s'épanouit sans nécessité.",
  "zelos":"Personnification du Zèle et de l'émulation rivale, frère de Niké, compagnon permanent du trône de Zeus.",
  "bia":"Personnification de la Force brute qui exécute sans jamais discuter, sœur de Niké.",
  "agon":"Personnification de la Compétition codifiée, honoré à Olympie aux côtés des concours sportifs.",
  "borée":"Dieu du vent du Nord, l'un des quatre Anémoi, fils d'Astréos et d'Éos — ravisseur de la princesse athénienne Orithye.",
  "alké":"Personnification de la Vaillance martiale, la fermeté qui tient bon dans l'épreuve — figure mineure, peu documentée.",
  "kratos":"Personnification de la Puissance souveraine, frère de Niké, de Bia et de Zelos, exécuteur des ordres de Zeus.",
  "philotès":"Personnification de l'affection, de l'amitié et du désir partagé, fille de la Nuit — sœur d'Éris, d'Apaté et de Némésis, mais tournée vers ce qui unit plutôt que ce qui sépare.",
  "euphrosyne":"L'une des trois Charites, personnifiant la joie et la gaieté partagée — jamais représentée seule.",
  "hypnos":"Dieu du Sommeil, frère jumeau de Thanatos et père de Morphée — un pouvoir assez redoutable pour tromper Zeus lui-même.",
  "orphée":"Musicien légendaire dont le chant charmait bêtes, arbres et jusqu'aux Enfers — descendu chercher son épouse Eurydice, il la perdit une seconde fois.",
  "hyménée":"Dieu du mariage, fils d'Apollon et d'une Muse selon la tradition la plus répandue — les Grecs l'invoquaient à voix haute à chaque noce, persuadés qu'une fête sans lui tournerait au malheur.",
};

// Textes mythologiques développés pour les figures listées ci-dessus (voir showDeityDetail() /
// Apprendre → Figures mythologiques). Séparé de DEITY_NOTES pour ne pas changer le type de
// DEITY_NOTES (utilisé partout ailleurs comme simple chaîne courte) : même logique additive
// que SYMBOL_LIBRARY.lore.
const DEITY_LORE = {
  "dionysos": [
    "Dionysos est le fils de Zeus et d'une mortelle, Sémélé, morte foudroyée en voulant contempler son amant divin dans toute sa splendeur — Zeus dut alors coudre l'enfant à naître dans sa propre cuisse pour le mener à terme, d'où son surnom de « deux fois né » (voir la fiche « Sémélé »).",
    "Contrairement aux autres Olympiens, il parcourut le monde des mortels, leur enseignant la culture de la vigne et provoquant sur son passage des scènes de folie collective chez ceux qui refusaient de le reconnaître comme dieu — comme le roi Penthée, déchiré par sa propre mère en plein délire bachique.",
    "Sur l'île de Naxos, il trouva Ariane abandonnée par Thésée et l'épousa, lui offrant l'immortalité (voir la fiche « Ariane ») — et, une fois adulte, il n'oublia jamais sa mère : il descendit jusqu'aux Enfers pour la ramener parmi les dieux de l'Olympe.",
    "Dieu de la métamorphose autant que de l'ivresse, il incarne ce qui échappe à la raison et à l'ordre établi.",
  ],
  "hermès": [
    "Né dans une grotte du mont Cyllène (voir la fiche « Grotte »), Hermès manifesta son astuce dès le jour de sa naissance : il déroba le troupeau de son frère Apollon, puis inventa la lyre à partir d'une carapace de tortue et la lui offrit en échange de son pardon (voir la fiche « Lyre »).",
    "Messager officiel de Zeus et guide des âmes des morts vers l'autre monde, Hermès franchit sans entrave les frontières entre l'Olympe, la terre et les Enfers — un privilège qu'on lui prête souvent, à tort, comme exclusif : Iris relie elle aussi le ciel et la terre, et va jusqu'aux portes du Styx lorsqu'il faut y puiser l'eau du serment sacré (voir la fiche « Iris »), tandis qu'Hécate, de par sa nature triple, circule tout aussi librement entre les trois royaumes (voir la fiche « Hécate »). Ce qui distingue Hermès n'est donc pas l'exclusivité du passage, mais la diversité des rôles qu'il y joue : messager, psychopompe, patron des voyageurs, des marchands et des voleurs.",
    "Sa vie amoureuse est aussi mouvementée que ses voyages. D'Aphrodite (voir la fiche « Aphrodite »), il eut un fils à la double nature, Hermaphrodite, fusionné plus tard avec la nymphe Salmacis en un seul être aux deux sexes. De la nymphe Dryope, il eut Pan (voir la fiche « Pan »), né avec des cornes et des sabots de bouc, que sa propre mère fuit à sa naissance. D'une troisième union, avec Chioné, naquit Autolycos, voleur si habile qu'il pouvait changer à volonté la forme et la couleur de tout ce qu'il dérobait — un don hérité directement de son père, et qui fera de lui, plus tard, le grand-père maternel d'Ulysse (voir la fiche « Ulysse »).",
    "Dans le Tarot, Hermès est le Bateleur (I), la carte du potentiel et de l'habileté à mettre en mouvement ce qui existe déjà : comme lui, le Bateleur ne crée rien à partir de rien — il détourne un troupeau en pardon, une carapace en instrument, un désir en descendance rusée, et fait de chaque passage une occasion plutôt qu'un simple trajet.",
  ],
  "métis": [
    "Titanide de la ruse, Métis fut la première épouse de Zeus. Une prophétie annonçait qu'elle enfanterait un fils plus puissant que son père : Zeus, pour l'empêcher, l'avala tout entière alors qu'elle était enceinte.",
    "Loin de disparaître, Métis continua d'agir depuis l'intérieur de Zeus, forgeant en secret l'armure de leur fille : le moment venu, Athéna jaillit tout armée du crâne de son père, portant en elle la ruse de sa mère autant que la puissance de Zeus.",
  ],
  "héra": [
    "Sœur et épouse de Zeus, Héra règne sur l'Olympe comme protectrice du mariage et garante de l'ordre légitime — un rôle qu'elle défend avec une fermeté que la mythologie associe souvent à la jalousie, tant les infidélités de son époux sont nombreuses.",
    "Elle ne se contente jamais d'observer : elle pousse Sémélé à sa perte par ruse (voir la fiche « Sémélé »), poursuit Héraclès de sa colère toute sa vie durant simplement parce qu'il est le fruit d'une liaison de Zeus (voir la fiche « Héraclès »), et impose à Léto l'interdiction de mettre au monde ses enfants sur la moindre terre ferme, retardant ainsi la naissance d'Apollon et d'Artémis (voir la fiche « Léto »).",
    "Reine avant d'être épouse, elle incarne la légitimité et l'autorité plus que la douceur.",
  ],
  "zeus": [
    "Plus jeune fils de Cronos et de Rhéa, Zeus échappa au sort de ses frères et sœurs — avalés à la naissance par un père craignant d'être détrôné — grâce à sa mère, qui le cacha dans une grotte du mont Ida en Crète et fit avaler à Cronos une pierre emmaillotée à sa place.",
    "Devenu adulte, il libéra ses frères et sœurs et mena la guerre contre les Titans, dont il sortit vainqueur pour établir un nouvel ordre cosmique sur l'Olympe, dont il devint le souverain incontesté, maître de la foudre.",
    "Garant de l'ordre du monde, il reste pourtant l'un des dieux aux liaisons et aux colères les plus nombreuses de toute la mythologie.",
  ],
  "chiron": [
    "Contrairement aux autres centaures, réputés violents et incontrôlés, Chiron était réputé pour sa sagesse et sa maîtrise de la médecine, de la musique et du tir à l'arc — il forma parmi ses élèves Achille, Jason et Asclépios.",
    "Immortel, il fut pourtant blessé accidentellement par une flèche empoisonnée d'Héraclès et, ne pouvant ni guérir ni mourir, souffrit sans fin jusqu'à ce qu'il accepte d'échanger son immortalité contre la libération de Prométhée enchaîné (voir la fiche « Prométhée »).",
    "Sa blessure incurable en fait le symbole du guérisseur qui ne peut se soigner lui-même — celui qui transmet un savoir né de sa propre douleur.",
  ],
  "éros": [
    "Aux origines les plus anciennes du mythe, Éros est une force primordiale née dès l'origine du monde, avant même les dieux de l'Olympe — une puissance d'attraction qui met en mouvement toute chose.",
    "Les récits plus tardifs en font le fils d'Aphrodite, armé d'un arc dont les flèches font naître l'amour chez quiconque elles atteignent, y compris les dieux eux-mêmes. Son propre amour pour la mortelle Psyché (voir la fiche « Psyché ») ne fut possible qu'au prix d'épreuves redoutables imposées par Aphrodite, jalouse de sa belle-fille.",
    "Un jour où Apollon venait de terrasser le serpent Python, il railla le jeune Éros, jugeant son arc d'enfant indigne d'un dieu de la guerre. Vexé, Éros lui prouva le contraire : il lui décocha une flèche d'or, qui embrase le désir chez qui elle touche, et visa la nymphe Daphné d'une flèche de plomb, qui provoque au contraire un rejet total. Apollon, foudroyé de désir, se lança à la poursuite de Daphné, qui le fuyait avec la même intensité — jusqu'à ce qu'elle obtienne d'être changée en laurier plutôt que rattrapée (voir la fiche « Laurier »). Ce concours improvisé, où le plus jeune des deux prouva qu'il visait plus juste que le plus grand, resta la meilleure démonstration qu'aucune flèche, fût-elle celle d'un dieu de la lumière, ne vaut celle d'Éros.",
    "Dans le Tarot, Éros est l'Amoureux (VI), la carte du choix qui échappe en partie à la raison : ses flèches, dorées ou de plomb, rappellent que le désir n'attend jamais la permission de la volonté — Apollon lui-même, dieu de la mesure et de la clarté, en fit les frais face à un enfant armé d'un simple arc.",
  ],
  "apollon": [
    "Fils de Zeus et de Léto (voir la fiche « Léto »), Apollon naquit avec sa sœur jumelle Artémis sur l'île flottante de Délos, seul lieu qui accepta de les accueillir après qu'Héra eut interdit à toute terre ferme de recevoir l'accouchement de sa rivale.",
    "Dieu de la lumière, de la musique et de la vérité, il conduit le char solaire et rend, depuis son temple de Delphes (voir la fiche « Temple »), des oracles par la voix de la Pythie — sa devise gravée sur le fronton du temple, « Connais-toi toi-même », résume son exigence de clarté.",
  ],
  "thémis": [
    "Titanide antérieure aux dieux de l'Olympe, Thémis personnifie la loi divine et l'ordre juste du monde — non pas la justice humaine, changeante et discutée, mais un principe plus ancien que les dieux eux-mêmes.",
    "Elle rendit elle-même des oracles à Delphes avant qu'Apollon n'y installe son propre sanctuaire, et resta la conseillère de Zeus, assise à ses côtés sur l'Olympe pour veiller à ce qu'aucune décision divine ne s'écarte de l'ordre juste.",
  ],
  "déméter": [
    "Déesse des moissons, Déméter enseigna aux hommes l'art de l'agriculture — un don qu'elle retira au monde entier de rage et de chagrin lorsque sa fille Perséphone fut enlevée par Hadès (voir la fiche « Enfer / monde souterrain »).",
    "La terre entière resta stérile jusqu'à ce que Zeus négocie un compromis : Perséphone passerait une partie de l'année aux Enfers et l'autre auprès de sa mère — un partage qui, depuis, rythme les saisons, l'hiver au deuil de Déméter et le printemps à ses retrouvailles.",
  ],
  "tyché": [
    "Déesse de la fortune et du hasard, Tyché échappe à toute généalogie fixe selon les auteurs — tantôt fille de Zeus, tantôt de l'Océan — comme si le hasard lui-même refusait de se laisser enfermer dans une origine unique.",
    "Représentée portant une corne d'abondance et un gouvernail, parfois les yeux bandés, elle peut combler de richesses comme ruiner en un instant, sans qu'aucun mérite ni aucune faute n'entre en compte — la roue qu'on lui associe (voir la fiche « Roue ») tourne sans se soucier de qui elle élève ou abaisse.",
  ],
  "héraclès": [
    "Fils de Zeus et d'une mortelle, Alcmène, l'enfant fut d'abord nommé Alcide, du nom de son grand-père Alcée. Il fut la cible de la jalousie d'Héra avant même sa naissance : elle chargea Ilithyie de retenir l'accouchement par magie, une ruse à peine déjouée (voir la fiche « Ilithyie »), puis, une fois l'enfant né, envoya deux serpents l'étrangler dans son sommeil — qu'il étrangla lui-même de ses propres mains encore enfant.",
    "Zeus, voulant offrir à son fils mortel une part d'immortalité, le fit un jour approcher du sein d'Héra endormie, espérant qu'il tète son lait divin sans qu'elle le sache. L'enfant tira si fort qu'elle se réveilla en sursaut et l'écarta d'un geste brusque : le lait jaillit à travers le ciel nocturne et y forma la traînée blanche que l'on nomme depuis la Voie lactée.",
    "Rendu fou par Héra à l'âge adulte, il tua sa propre famille dans un accès de délire. Pour s'en purifier, l'oracle de Delphes lui ordonna de se mettre au service du roi Eurysthée pendant douze ans et de prendre un nouveau nom, Héraclès — « la gloire d'Héra » — comme pour retourner contre elle-même la persécution qu'elle lui infligeait : chaque exploit accompli sous ce nom deviendrait, malgré elle, un hommage à la déesse.",
    "Eurysthée lui imposa alors douze travaux jugés impossibles. Héraclès étouffa d'abord à mains nues le lion de Némée, dont la peau devint son armure, puis affronta l'hydre de Lerne, dont il fallait cautériser chaque cou pour empêcher deux têtes de repousser à la place d'une — son neveu Iolaos l'y aida, geste qui coûtera à ce travail d'être invalidé plus tard, faute d'avoir agi seul. Il captura ensuite vivante la biche de Cérynie, consacrée à Artémis, après une année entière de poursuite sans jamais la blesser, puis ramena vivant le sanglier d'Érymanthe en le forçant dans la neige profonde.",
    "Vinrent ensuite les écuries d'Augias, nettoyées en une seule journée en détournant le cours de deux fleuves — un travail lui aussi invalidé, cette fois pour avoir réclamé un salaire — puis les oiseaux du lac Stymphale, chassés à l'aide de castagnettes de bronze offertes par Athéna, le taureau de Crète maîtrisé à mains nues, et les juments de Diomède, dressées en leur faisant dévorer leur propre maître.",
    "Il obtint ensuite la ceinture d'Hippolyte, reine des Amazones, d'abord prête à la lui offrir de bon cœur — jusqu'à ce qu'Héra, semant la discorde parmi les Amazones, ne transforme la rencontre en bataille. Il ramena seul le troupeau de Géryon depuis les confins du monde connu, cueillit les pommes d'or des Hespérides en soulageant un temps Atlas de son fardeau céleste par la ruse, et descendit enfin aux Enfers pour en ramener vivant, à mains nues, le chien Cerbère, avant de le rendre à Hadès.",
    "Deux travaux ayant été invalidés par Eurysthée, Héraclès dut en accomplir deux de plus pour atteindre le compte requis — quatorze épreuves au total pour douze travaux officiellement reconnus.",
    "Après sa mort, consumé par une tunique empoisonnée, il fut accueilli parmi les dieux de l'Olympe. C'est Héra elle-même, désormais réconciliée avec celui dont le nom entier célébrait sa gloire, qui lui donna pour épouse sa propre fille Hébé, déesse de la jeunesse éternelle (voir la fiche « Hébé ») — le pardon le plus complet qu'elle pouvait lui offrir, en l'accueillant dans sa propre famille.",
    "Dans le Tarot, Héraclès est la figure de la Force (XI), où l'on voit une femme ouvrir sans effort apparent la gueule d'un lion : ses travaux racontent la même leçon à plus grande échelle — la force qui compte n'est jamais celle du combat, mais celle qui transforme une punition en victoire répétée sur soi-même, jusqu'à faire de son propre nom un acte de réconciliation.",
  ],
  "prométhée": [
    "Titan resté aux côtés de Zeus pendant la guerre contre les autres Titans, Prométhée façonna aussi, selon certains récits, les premiers hommes à partir d'argile.",
    "Voyant l'humanité livrée au froid et à l'ignorance, il déroba le feu aux dieux et l'offrit aux mortels (voir la fiche « Feu ») — un don qui lui valut d'être traîné jusqu'à un rocher du Caucase par Bia et Kratos, la Force et la Puissance (voir les fiches « Bia » et « Kratos »), sur ordre de Zeus, puis enchaîné là où un aigle venait chaque jour dévorer son foie, qui repoussait chaque nuit, jusqu'à ce que Chiron accepte de mourir à sa place pour le libérer (voir la fiche « Chiron »).",
    "Son nom reste attaché à tout affranchissement payé au prix fort — le savoir arraché plutôt que donné.",
  ],
  "hadès": [
    "Fils de Cronos et de Rhéa, Hadès hérita du monde souterrain lors du partage du cosmos entre lui et ses frères Zeus et Poséidon — un lot que la tradition présente souvent comme le moins enviable, mais qu'il gouverne avec une rigueur incorruptible plutôt qu'avec cruauté.",
    "Sa part dans la victoire des Olympiens sur les Titans fut pourtant décisive : les Cyclopes, libérés du Tartare par Zeus en échange de leur aide, forgèrent à chacun des trois frères un présent capable de renverser le combat — la foudre pour Zeus, le trident pour Poséidon, et pour Hadès un casque qui rend invisible celui qui le porte. Coiffé de ce casque, il put s'approcher sans être vu pour dérober les armes des Titans ou frapper sans jamais être repéré — une contribution aussi discrète que déterminante.",
    "Il quitte rarement son royaume, à l'exception notable de l'enlèvement de Perséphone (voir la fiche « Perséphone »), dont il tombe amoureux et qu'il installe à ses côtés comme reine des Enfers.",
    "Avant elle, ou selon d'autres versions alors même qu'il en était déjà l'époux, Hadès s'était épris de la naïade Menthé. Perséphone, découvrant cette liaison, la piétina de rage jusqu'à la changer en la plante odorante qui porte encore son nom — la menthe, dont le parfum ne se libère jamais aussi fort que lorsqu'on la foule aux pieds, comme un dernier écho de la colère qui l'a transformée.",
    "Contrairement à une image tardive qui en fait un dieu maléfique, Hadès reste dans les mythes grecs un juge impartial, gardien d'un ordre auquel nul, pas même les dieux, ne peut se soustraire.",
    "Dans le Tarot, Hadès est l'Arcane sans nom (XIII), celui qui fauche sans jamais détruire gratuitement : son casque d'invisibilité pendant la guerre des Titans, sa discrétion presque totale hors de son royaume, jusqu'à la façon dont il vit ses amours, tout chez lui agit en silence — une transformation qui opère sans jamais chercher à se faire remarquer.",
  ],
  "perséphone": [
    "Fille de Zeus et de Déméter, Perséphone cueillait des fleurs dans un pré lorsque la terre s'ouvrit sous elle et qu'Hadès l'emporta sur son char vers son royaume souterrain.",
    "Ayant mangé quelques grains de grenade offerts par Hadès (voir la fiche « Grenade »), elle se lia irrévocablement aux Enfers et dut, par un accord négocié par Zeus, y passer une partie de chaque année, devenant reine des morts autant que fille de la déesse des moissons.",
    "Son passage entre les deux mondes en fait la figure même de la transformation qui n'efface jamais totalement ce qu'on était avant.",
  ],
  "iris": [
    "Fille du Titan Thaumas et de l'Océanide Électre, Iris personnifie l'arc-en-ciel (voir la fiche « Arc-en-ciel »), pont visible entre le ciel et la terre qu'elle emprunte pour porter les messages des dieux aux mortels comme aux autres divinités.",
    "Contrairement à Hermès, dont les missions relèvent souvent de la ruse ou du commerce, Iris est associée à la fidélité du message transmis sans détour — une messagère de confiance, jamais rusée ni trompeuse. Son rôle ne s'arrête d'ailleurs pas au seul lien entre le ciel et la terre : lorsqu'un dieu doit prêter le serment le plus sacré qui soit, c'est elle qui va puiser, aux portes des Enfers, l'eau du Styx dans laquelle jurer un tel serment (voir la fiche « Hermès »).",
  ],
  "pan": [
    "Fils d'Hermès et de la nymphe Dryope (voir la fiche « Hermès »), Pan naquit avec des cornes, des sabots de bouc et un visage si étrange que sa propre mère fuit à sa vue — les autres dieux, eux, s'amusèrent de son apparence et l'adoptèrent comme l'un des leurs.",
    "Il règne sur les forêts et les troupeaux (voir la fiche « Forêt ») et peut, d'un simple cri, saisir les voyageurs d'une terreur irraisonnée dans les bois profonds — la « panique » lui doit d'ailleurs son nom.",
  ],
  "poséidon": [
    "Frère de Zeus et d'Hadès, Poséidon reçut la mer en partage lors de la division du cosmos (voir la fiche « Mer »). D'humeur aussi changeante que les flots qu'il gouverne, il peut aussi bien porter les navires que déchaîner tempêtes et tremblements de terre d'un coup de son trident.",
    "Sa rivalité avec Athéna pour devenir le patron d'Athènes — il fit jaillir une source d'eau salée du rocher, elle offrit un olivier — illustre bien son tempérament : la force spectaculaire face à la sagesse durable, et c'est cette dernière que la ville choisit.",
  ],
  "hécate": [
    "Fille de la titanide Astéria (voir la fiche « Astéria »), Hécate hérita de sa mère une proximité particulière avec le ciel nocturne. Déesse des carrefours et des passages, elle est représentée sous une triple forme, tournée à la fois vers le ciel, la terre et les Enfers — l'une des seules divinités, avec Perséphone, à circuler librement entre les trois royaumes.",
    "Lorsque Zeus renversa les Titans et redistribua les pouvoirs de l'univers, il réserva à Hécate un traitement à part : seule parmi les divinités de l'ancienne génération, elle conserva l'intégralité de ses privilèges sur la terre, la mer et le ciel. Hésiode raconte que Zeus l'honora plus qu'aucune autre, lui laissant le pouvoir d'accorder ou de refuser son aide aux marins, aux chasseurs, aux athlètes en compétition et à quiconque l'invoque — sans jamais lui retirer la moindre part de ce qu'elle possédait avant lui.",
    "Elle fut la seule à entendre les cris de Perséphone lors de son enlèvement et l'aida ensuite à retrouver sa mère Déméter ; depuis, elle veille sur les carrefours nocturnes, la magie et tout ce qui exige de choisir une direction dans l'obscurité.",
    "Dans le Tarot, Hécate est l'Étoile (XVII), la carte de l'orientation silencieuse plutôt que de la certitude bruyante : le privilège que lui accorda Zeus n'est jamais un pouvoir qui s'impose — comme la torche qu'elle porte, il éclaire un chemin sans jamais choisir à la place de celui qui le suit.",
  ],
  "séléné": [
    "Déesse de la lune, Séléné traverse le ciel nocturne sur un char tiré par des chevaux ailés, tandis que son frère Hélios conduit celui du soleil le jour (voir la fiche « Lune »).",
    "Éprise du berger Endymion (voir la fiche « Endymion »), elle obtint de Zeus qu'il reste éternellement jeune et endormi, afin de pouvoir le contempler chaque nuit sans jamais le voir vieillir ni mourir.",
  ],
  "hélios": [
    "Dieu du soleil, Hélios traverse chaque jour le ciel sur un char de feu, de l'orient à l'occident, avant de regagner l'Océan pendant la nuit pour reprendre sa course au matin suivant (voir la fiche « Soleil »). Voyant tout depuis cette hauteur, rien ne lui échappe jamais tout à fait — c'est lui qui révélera un jour à Héphaïstos les amours cachées d'Aphrodite (voir la fiche « Aphrodite »).",
    "Son fils Phaéton, voulant prouver sa filiation, obtint un jour de conduire le char à sa place — incapable d'en maîtriser les chevaux, il faillit embraser la terre entière avant que Zeus ne le foudroie pour l'arrêter. Ses sœurs, les Héliades, le pleurèrent si longtemps sur les rives du fleuve où il était tombé qu'elles furent changées en peupliers, leurs larmes durcissant en gouttes d'ambre.",
    "De l'Océanide Persé, Hélios eut plusieurs autres enfants restés célèbres : Aiétès, roi de Colchide, la magicienne Circé (voir la fiche « Circé »), et Pasiphaé, épouse du roi Minos et mère du Minotaure (voir la fiche « Minos ») — trois destins bien différents, mais tous marqués par une même maîtrise redoutable de la magie ou du pouvoir.",
    "Il aima aussi la mortelle Leucothoé, changée en arbuste à encens après avoir été enterrée vivante par son propre père, et la nymphe Clytie, qui se consuma de jalousie à l'idée de l'avoir perdu : restée à le fixer sans relâche, elle finit par s'enraciner et devenir cette fleur qui, encore aujourd'hui, tourne son visage vers le soleil tout au long du jour.",
    "Dans le Tarot, Hélios est la figure du Soleil (XIX), où deux enfants jouent sous une lumière si éclatante que rien ne peut y rester dissimulé — la même clarté qui, dans ses mythes, révèle toujours ce que d'autres voudraient cacher, qu'il s'agisse d'un secret d'alcôve ou d'un chagrin transformé en fleur tournée vers la lumière.",
  ],
  "minos": [
    "Roi légendaire de Crète de son vivant, Minos devint après sa mort l'un des trois juges des Enfers, réputé pour la rigueur impartiale de ses jugements — une réputation acquise du temps où il régnait déjà avec une justice sans complaisance.",
    "Sur terre, il fit construire par Dédale le Labyrinthe pour y enfermer le Minotaure, fruit d'une union contre nature de son épouse — un épisode qui n'entacha jamais, dans les Enfers, la légitimité de son jugement sur les autres âmes. C'est sa propre fille Ariane qui, en secret, permit à Thésée d'en ressortir vivant (voir la fiche « Ariane »).",
  ],
  "gaïa": [
    "Déesse primordiale, Gaïa est la Terre elle-même, apparue au tout début du monde depuis le Chaos originel — mère de toutes choses, des Titans aux Cyclopes en passant par les monstres les plus redoutables.",
    "C'est elle qui, lassée de la tyrannie de son époux Ouranos, poussa leur fils Cronos à le renverser, puis, plus tard, encouragea Zeus à faire de même contre les Titans devenus à leur tour trop puissants — la Terre choisissant toujours, en dernier recours, l'équilibre plutôt que la démesure d'un seul.",
  ],
  "athéna": [
    "Née tout armée du crâne de Zeus, après qu'il eut avalé sa mère Métis enceinte (voir la fiche « Métis »), Athéna hérita à la fois de la puissance de son père et de la ruse de sa mère.",
    "Déesse de la sagesse stratégique plutôt que de la guerre brutale, elle protège les héros rusés — Ulysse, Persée, Bellérophon — en leur offrant conseils et objets plutôt qu'en combattant à leur place, et devint la patronne d'Athènes après avoir offert à la ville l'olivier, symbole de paix durable.",
    "Il lui arrive aussi d'endosser un rôle plus maternel malgré elle : lorsque Héphaïstos, épris d'elle, la poursuit et se voit repoussé, Gaïa recueille de cette rencontre manquée l'enfant Érichthonios et le confie à Athéna pour qu'elle l'élève (voir la fiche « Héphaïstos ») — un enfant qu'elle n'a pas conçu, mais qu'elle protège avec la même rigueur qu'elle réserve à ses héros favoris.",
  ],
  "aphrodite": [
    "Déesse de l'amour et de la beauté, Aphrodite naquit, selon le récit le plus ancien, de l'écume de mer formée autour des membres tranchés d'Ouranos — un mythe plus ancien que la naissance de la plupart des autres Olympiens.",
    "Sa beauté suscite jalousies et rivalités jusque parmi les dieux : c'est elle qui remporte le jugement de Pâris en lui promettant l'amour de la plus belle femme du monde, Hélène — une promesse qui déclenchera la guerre de Troie.",
    "Mariée par Zeus à Héphaïstos, le forgeron boiteux de l'Olympe, elle ne l'aima jamais vraiment : son cœur allait à Arès, dieu de la guerre (voir la fiche « Arès »). Hélios, qui voit tout depuis son char (voir la fiche « Hélios »), surprit leur liaison et la révéla à Héphaïstos, qui tendit à sa femme et son amant un filet d'or invisible et incassable, les piégeant nus devant tous les dieux assemblés, plus amusés que scandalisés. De cette union naquirent Harmonie (voir la fiche « Harmonie ») et, selon les récits les plus tardifs, Éros lui-même (voir la fiche « Éros »).",
    "Elle aima aussi le jeune Adonis, né d'un arbre à myrrhe après une naissance elle-même née d'une faute funeste. Confié encore enfant à Perséphone pour être élevé en secret, il grandit si beau que les deux déesses se le disputèrent, jusqu'à ce que Zeus tranche : Adonis partagerait son temps entre l'une et l'autre. Il choisit de passer le plus clair de ses jours auprès d'Aphrodite — jusqu'à ce qu'un sanglier, lancé sur ses traces par la jalousie d'Arès selon certains récits, le blesse mortellement à la chasse. Accourue trop tard, Aphrodite se blessa elle-même à une épine en se précipitant vers lui ; là où leurs sangs mêlés touchèrent la terre, des anémones rouges jaillirent aussitôt.",
    "Éprise plus tard du prince troyen Anchise, elle se présenta à lui déguisée en simple mortelle et lui interdit, sous peine de la foudre de Zeus, de jamais révéler qui l'avait aimé. De leur union naquit Énée (voir la fiche « Énée ») — mais Anchise, un jour ivre, se vanta malgré tout de sa conquête divine, et la foudre promise s'abattit sur lui, l'estropiant pour le reste de sa vie.",
    "Dans le Tarot, Aphrodite est la Reine de Coupes, où l'amour se vit avec réceptivité plutôt qu'avec conquête : ses trois amours racontent pourtant trois visages bien différents de ce même domaine — le mariage de devoir avec Héphaïstos, la passion assumée avec Arès jusqu'au scandale, et l'amour tendre ou tragique avec Adonis et Anchise, où le désir se paie toujours d'un prix, qu'il s'agisse d'une fleur née du sang ou d'un secret trahi.",
  ],
  "nérée": [
    "Surnommé le « Vieillard de la mer », Nérée est un dieu marin plus ancien que Poséidon, réputé pour sa sagesse, sa bienveillance et son don de prophétie, contrairement à d'autres divinités marines plus tumultueuses.",
    "Père de cinquante Néréides dont Thétis (voir la fiche « Thétis »), mère d'Achille, il incarne un versant plus paisible de la mer (voir la fiche « Mer ») — la sagesse plutôt que la tempête.",
    "Dans le Tarot, Nérée est le Roi de Coupes, stable sur une mer agitée sans jamais s'y laisser submerger : sa sagesse ne s'impose pas, elle se révèle à qui sait la retenir — exactement la maîtrise émotionnelle que ce Roi a acquise à force d'avoir traversé bien des marées.",
  ],
  "bellérophon": [
    "Héros grec, Bellérophon parvint à dompter Pégase, le cheval ailé né du sang de la Gorgone Méduse, grâce à un mors d'or offert par Athéna en songe.",
    "Monté sur Pégase, il vainquit la Chimère, monstre crachant le feu — mais voulut ensuite s'élever jusqu'à l'Olympe lui-même, un excès de démesure que Zeus punit en envoyant un taon piquer Pégase, précipitant Bellérophon à terre pour le reste de sa vie.",
  ],
  "éos": [
    "Déesse de l'aurore, Éos ouvre chaque matin les portes du ciel pour annoncer le passage du char d'Hélios, son frère — ses doigts de rose colorent le ciel juste avant le lever du jour (voir la fiche « Aurore »).",
    "Éprise de plusieurs mortels, dont Tithonos, elle obtint pour lui l'immortalité mais oublia de demander aussi l'éternelle jeunesse : il vieillit sans jamais pouvoir mourir, jusqu'à se réduire, dit-on, à une simple voix.",
    "Elle aima aussi le chasseur Orion, qu'elle emporta à Délos pour vivre à ses côtés, avant qu'il ne devienne le compagnon de chasse d'Artémis (voir la fiche « Orion »).",
    "Unie à Astréos, dieu des étoiles, elle mit aussi au monde les quatre vents, dont Borée, le vent du Nord (voir la fiche « Borée ») — une aurore qui n'ouvre pas seulement le ciel au soleil, mais engendre aussi les souffles qui le traversent.",
  ],
  "niké": [
    "Déesse ailée de la victoire, Niké accompagne indifféremment les vainqueurs, sans jamais prendre elle-même part au combat — elle couronne l'issue plutôt que de la déterminer.",
    "Fille du Titan Pallas et de Styx, elle se rangea aux côtés de Zeus dès la guerre contre les Titans, et resta depuis une fidèle compagne de son char, symbole d'un triomphe qui se mérite sans jamais se garantir d'avance.",
    "Trois de ses frères et sœurs firent le même choix qu'elle et reçurent la même récompense : Kratos, la Puissance (voir la fiche « Kratos »), Bia, la Force (voir la fiche « Bia »), et Zelos, le Zèle rival (voir la fiche « Zelos »), devinrent eux aussi des compagnons permanents du trône de Zeus.",
  ],
  "hestia": [
    "Sœur aînée de Zeus, Hestia est la déesse du foyer et gardienne de la flamme sacrée qui brûle au centre de chaque maison comme de chaque cité.",
    "Courtisée par Apollon et Poséidon, elle refusa tout mariage et obtint de Zeus de rester à jamais vierge, s'installant définitivement au cœur de l'Olympe plutôt que de suivre l'un ou l'autre — une place discrète mais essentielle, puisque aucun foyer ne peut exister sans elle.",
  ],
  "héphaïstos": [
    "Fils d'Héra, Héphaïstos naquit si chétif ou si laid, selon les versions, que sa mère le rejeta du haut de l'Olympe — une chute qui le laissa boiteux pour le restant de son existence.",
    "Devenu le forgeron des dieux malgré ce rejet initial, il créa les armes et merveilles les plus admirées de l'Olympe, du bouclier d'Achille aux flèches d'Éros, prouvant par son art ce que sa naissance semblait lui interdire.",
    "Épris d'Athéna (voir la fiche « Athéna »), qui refusait pourtant tout mariage, il tenta un jour de s'unir à elle de force. Elle se déroba, et sa semence tomba sur la terre lorsqu'elle l'essuya avec un morceau de laine — de ce contact naquit Érichthonios, mi-enfant mi-serpent, que Gaïa, mère de toutes choses, remit alors à Athéna elle-même pour qu'elle l'élève. N'étant fils d'Athéna que par cette adoption, Érichthonios grandit sous sa seule protection avant de devenir, une fois adulte, l'un des premiers rois légendaires d'Athènes.",
    "Dans le Tarot, Héphaïstos est le Roi de Bâtons, l'autorité qui se forge plutôt qu'elle ne se reçoit : rejeté par sa mère, repoussé par Athéna elle-même, il n'obtient jamais rien par simple droit de naissance — pas même une descendance, puisque Érichthonios naît de son désir déçu et grandit dans les mains d'une autre. Ce qu'il crée, en revanche, arme, palais ou enfant né malgré lui de la terre, reste par la force ce qu'il a lui-même façonné jusqu'au bout.",
  ],
  "himeros": [
    "Dieu ailé du désir soudain, Himeros accompagne Éros et Aphrodite dans leur cortège, incarnant cette part du désir qui surgit sans prévenir, avant même que la raison n'ait le temps d'intervenir.",
    "Moins connu qu'Éros, il en partage le même registre — le désir irrésistible — mais dans sa forme la plus immédiate : l'élan plutôt que la flèche qui vise.",
    "Dans le Tarot, Himeros est le Valet de Coupes, celui qui contemple sa coupe avec un étonnement encore neuf : ce même émoi qui saisit avant qu'on ait pu le nommer, sincère mais trop récent pour se savoir encore où il mène.",
  ],
  "énée": [
    "Fils d'Aphrodite et du mortel Anchise (voir la fiche « Aphrodite »), Énée combattit du côté troyen pendant la guerre de Troie, protégé à plusieurs reprises par sa mère au cœur des combats.",
    "À la chute de Troie, il porta sur son dos son père âgé et mena son fils par la main hors de la ville en flammes, fidèle jusque dans la ruine de sa cité — un périple qui, selon la légende romaine, le mènera à fonder la lignée dont naîtra Rome.",
    "Après des années d'errance en mer, sa flotte échoue à Carthage, où règne la reine Didon. Elle s'éprend de lui — un amour qu'Aphrodite favorise elle-même en secret, en envoyant son fils Éros attiser leur passion (voir la fiche « Éros ») — et Énée s'attarde à ses côtés, prêt à oublier sa mission pour y rester. Zeus, inquiet de le voir s'égarer de son destin, envoie Hermès (voir la fiche « Hermès ») lui rappeler qu'il ne lui appartient pas de choisir : il doit repartir fonder en Italie la lignée d'où naîtra Rome. Énée s'exécute et quitte Carthage sans un dernier adieu ; Didon, désespérée, se donne la mort sur un bûcher, non sans avoir maudit sa descendance — une malédiction que la tradition romaine lira plus tard comme l'origine mythique des guerres puniques entre Rome et Carthage.",
    "Dans le Tarot, Énée est le Cavalier de Coupes, celui qui avance porté par le cœur plus que par la stratégie — mais son passage à Carthage montre la limite de cette carte : l'amour vécu avec Didon était sincère, et pourtant il n'était pas son chemin. La vraie fidélité de ce Cavalier n'est donc pas seulement celle qu'il porte à qui il aime, mais celle qu'il garde envers ce qu'il doit accomplir, même au prix d'un cœur brisé derrière lui.",
  ],
  "zéphyr": [
    "Dieu du vent d'ouest, Zéphyr est réputé le plus doux des vents, celui qui annonce le printemps et fait éclore les fleurs sur son passage.",
    "Il n'en reste pas moins capable de jalousie brutale : amoureux éconduit de Chloris (voir la fiche « Chloris »), il détourna par dépit un disque lancé par Apollon, tuant accidentellement le jeune Hyacinthe que le dieu aimait — preuve que même le plus doux des vents peut tourner à la tempête.",
  ],
  "éole": [
    "Gardien des vents, Éole les tient enfermés dans une outre ou une caverne selon les récits, ne les libérant qu'au compte-goutte pour ne pas déchaîner le chaos sur terre et sur mer.",
    "Il offrit un jour à Ulysse une outre contenant tous les vents contraires, ne laissant souffler que celui qui le ramènerait chez lui — un cadeau que l'équipage du héros, croyant y trouver un trésor, ouvrit par curiosité, relâchant la tempête qui les ramena au point de départ.",
  ],
  "chloris": [
    "Déesse des fleurs, Chloris transforme en jardin chaque lieu qu'elle traverse — son simple souffle suffit, dit-on, à faire éclore les plantes sur son passage.",
    "Enlevée par Zéphyr, le vent d'ouest, qui l'épousa ensuite en réparation, elle devint la déesse romaine Flora sous une autre identité — l'un des rares mythes grecs où la déesse enlevée obtient en retour un domaine et un pouvoir propres.",
  ],
  "triptolème": [
    "Jeune prince formé par Déméter elle-même, en reconnaissance de l'hospitalité que sa famille lui offrit alors qu'elle cherchait sa fille Perséphone à travers le monde, Triptolème reçut de la déesse l'art de cultiver le blé.",
    "Monté sur un char ailé tiré par des dragons, il parcourut la terre entière pour enseigner l'agriculture à tous les peuples, devenant ainsi le messager du plus grand don de Déméter aux hommes.",
  ],
  "ploutos": [
    "Dieu de la richesse et de l'abondance des récoltes, Ploutos est le fils de Déméter — un lien qui rattache la richesse à la fertilité de la terre plutôt qu'à l'or amassé.",
    "Zeus le rendit aveugle pour qu'il distribue ses faveurs sans favoritisme, sans distinguer les bons des mauvais — une richesse qui, depuis, tombe autant sur le mérite que sur le hasard.",
  ],
  "jason": [
    "Héritier légitime du trône d'Iolcos, spolié par son oncle Pélias, Jason reçut de ce dernier une mission jugée impossible en échange de la couronne : ramener la Toison d'or, gardée par un dragon ne dormant jamais, aux confins du monde connu.",
    "Il rassembla pour ce voyage les plus grands héros grecs de sa génération à bord du navire Argo, les Argonautes, et ne parvint à ses fins qu'avec l'aide de Médée, magicienne éprise de lui qui trahit son propre père pour l'aider à s'emparer de la Toison.",
  ],
  "achille": [
    "Fils de la Néréide Thétis (voir la fiche « Thétis ») et d'un mortel, Achille fut plongé enfant dans le Styx par sa mère pour le rendre invulnérable — seul son talon, par lequel elle le tenait, resta vulnérable.",
    "Le plus grand guerrier de la guerre de Troie, il se retira des combats après une querelle avec Agamemnon, laissant les Grecs perdre du terrain, jusqu'à ce que la mort de son ami Patrocle le pousse à revenir se battre dans une colère qui ne s'éteignit qu'avec la mort d'Hector.",
  ],
  "atlas": [
    "Titan ayant combattu aux côtés de ses frères contre Zeus, Atlas fut condamné, à leur défaite, à porter la voûte céleste sur ses épaules pour l'éternité — non la Terre, comme on le croit souvent, mais le ciel lui-même.",
    "Héraclès, venu chercher les pommes d'or du jardin des Hespérides gardé par les filles d'Atlas, proposa un temps de porter le ciel à sa place pendant qu'Atlas allait chercher les pommes — un répit que le Titan dut abandonner, ruse d'Héraclès à l'appui, pour reprendre son fardeau.",
  ],
  "psyché": [
    "Mortelle d'une beauté si extraordinaire qu'elle suscita la jalousie d'Aphrodite (voir la fiche « Aphrodite »), Psyché fut aimée en secret par Éros, qui lui interdit de jamais chercher à voir son visage.",
    "Rongée par la curiosité, elle finit par l'éclairer une nuit à la lueur d'une lampe et le perdit aussitôt. Pour le retrouver, elle dut se soumettre à Aphrodite, qui lui imposa quatre épreuves conçues pour être impossibles à surmonter par une simple mortelle.",
    "La première consistait à trier avant la nuit tombée un immense tas de graines mélangées — blé, orge, millet, pavot, pois chiches — grain par grain. Des fourmis, prises de pitié devant tant de patience désespérée, achevèrent le tri à sa place pendant qu'elle pleurait, épuisée.",
    "La deuxième l'envoyait récolter la toison d'or de béliers du soleil, si redoutables qu'ils encornaient quiconque les approchait en plein jour. Un roseau du fleuve, ému par sa détresse, lui conseilla d'attendre le soir, quand les bêtes se reposaient à l'ombre : elle put alors simplement cueillir la laine restée accrochée aux buissons, sans jamais affronter les béliers eux-mêmes.",
    "La troisième la menait remplir un vase de cristal à une source glacée jaillissant d'une paroi à pic, gardée par des dragons et alimentant le Styx — un lieu littéralement inaccessible à un être humain. L'aigle de Zeus, redevable envers Éros, s'en chargea lui-même en s'envolant remplir le vase à sa place.",
    "La dernière exigeait de descendre aux Enfers demander à Perséphone un peu de sa beauté, enfermée dans une boîte à ne jamais ouvrir. Guidée par les conseils précis d'une tour, elle apprit à refuser toute pitié en chemin — un vieillard, un tisserand, une main tendue hors d'un fleuve, autant de pièges destinés à lui faire perdre les deux pièces réservées à Charon et les deux gâteaux d'orge destinés à apaiser Cerbère. Elle traversa ainsi les Enfers sans encombre — mais, cédant une dernière fois à la même curiosité qui l'avait déjà perdue avec la lampe, elle ouvrit la boîte sur le chemin du retour et sombra aussitôt dans un sommeil semblable à la mort, dont seul Éros parvint à la réveiller.",
    "Touché par tant d'épreuves traversées pour lui, Éros obtint de Zeus que Psyché soit rendue immortelle et officiellement mariée à ses côtés sur l'Olympe.",
    "Chacune de ces épreuves se résout non par la force, mais par la patience, l'humilité à accepter une aide extérieure et, à l'inverse, la rechute dans l'impulsivité qui l'avait perdue une première fois : le nom même de Psyché signifie « âme » en grec, et son parcours est resté la figure même de l'âme qui doit traverser l'épreuve et la tentation pour atteindre l'union complète.",
  ],
  "charites": [
    "Trois déesses de la grâce et de la joie — le plus souvent nommées Aglaé, Euphrosyne et Thalie —, les Charites ne sont jamais représentées seules : elles dansent toujours ensemble, indissociables les unes des autres.",
    "Compagnes d'Aphrodite et des Muses, elles président à tout ce qui rend la vie belle sans nécessité — la beauté, la fête, la reconnaissance — plutôt qu'à ce qui est simplement utile.",
  ],
  "narcisse": [
    "Jeune homme d'une beauté remarquable, Narcisse repoussait sans exception tous ceux qui l'aimaient, dont la nymphe Écho (voir la fiche « Écho »), inconsolable de son rejet.",
    "Puni par Némésis (voir la fiche « Némésis ») pour son indifférence, il aperçut un jour son propre reflet dans une source et en tomba éperdument amoureux, incapable de s'en détacher jusqu'à en mourir sur place — incapable de voir qu'aucun amour, pas même le sien, ne pouvait lui être rendu par une image.",
  ],
  "écho": [
    "Nymphe bavarde, Écho fut punie par Héra, qui découvrit qu'elle la distrayait volontairement pour couvrir les infidélités de Zeus : elle perdit dès lors la capacité de parler la première, condamnée à ne répéter que les derniers mots d'autrui.",
    "Éprise de Narcisse, elle ne put jamais lui déclarer son amour autrement qu'en répétant ses propres paroles, et se consuma de chagrin après son rejet jusqu'à ne plus laisser d'elle qu'une voix, dit-on, résonnant encore dans les montagnes.",
  ],
  "circé": [
    "Fille d'Hélios (voir la fiche « Hélios ») et magicienne experte en herbes et en breuvages, Circé vit sur une île isolée où elle transforme en animaux les voyageurs qui s'y aventurent sans méfiance — c'est ainsi qu'elle changea en pourceaux une partie de l'équipage d'Ulysse.",
    "Ulysse, protégé par une plante magique offerte par Hermès, résista à son sortilège et la contraignit à rendre à ses hommes leur forme humaine. Il resta ensuite une année entière sur son île, dont naquit un fils, Télégonos — qui, des années plus tard et sans le reconnaître, tuera son propre père, achevant malgré lui une prophétie qui pesait sur Ulysse depuis son retour à Ithaque.",
    "Sa magie ne sert pas qu'à punir les intrus : par jalousie, elle change aussi la nymphe Scylla en monstre. Éprise du dieu marin Glaucos, lui-même épris de Scylla, Circé empoisonne la source où celle-ci se baigne — la nymphe en ressort affublée d'une ceinture de têtes de chiens hurlants, condamnée à hanter pour toujours un détroit périlleux, face au tourbillon de Charybde (voir la fiche « Mer »).",
    "Elle inflige un sort semblable à Picus, roi du Latium déjà marié à la nymphe Canens : le voyant refuser ses avances par fidélité, elle le change en pic — l'oiseau porte encore aujourd'hui son nom latin, picus. Deux amours contrariés, deux métamorphoses : la magie de Circé transforme aussi souvent qu'elle punit.",
    "Dans le Tarot, Circé est la figure du 7 de Coupes, où sept coupes flottent dans les nuages, chacune montrant une image différente — trésor, serpent, couronne : ces reflets multiples et trompeurs sont exactement ce que promettent ses breuvages, séduisants mais rarement ce qu'ils semblent être.",
  ],
  "thétis": [
    "Fille de Nérée (voir la fiche « Nérée »), Thétis est une Néréide capable de se métamorphoser à volonté — feu, eau, lion, serpent — pour échapper à qui cherche à la retenir. Zeus et Poséidon la convoitèrent tous deux, jusqu'à ce qu'une prophétie annonce que le fils de Thétis surpasserait son père : par prudence, les deux dieux renoncèrent et la marièrent à un simple mortel, Pélée.",
    "Pélée ne put l'épouser qu'en la maintenant de force à travers toutes ses métamorphoses, sur les conseils de Chiron (voir la fiche « Chiron ») — une lutte que Thétis finit par accepter sans jamais renoncer à sa propre nature changeante. Leurs noces, auxquelles Éris, déesse de la Discorde, ne fut pas conviée (voir la fiche « Éris »), déclenchèrent l'épisode de la pomme d'or qui mènera plus tard au jugement de Pâris.",
    "De cette union naquit Achille (voir la fiche « Achille »), qu'elle tenta de rendre invulnérable en le plongeant dans le Styx (voir la fiche « Rivière »), puis de soustraire à son destin en le déguisant en jeune fille à la cour du roi Lycomède — une ruse qu'Ulysse finit par déjouer. Jusqu'au bout, Thétis lutta avec une ténacité sans faille contre une prophétie qu'elle savait pourtant ne jamais pouvoir empêcher.",
  ],
  "pythie": [
    "Prêtresse d'Apollon au temple de Delphes (voir la fiche « Temple »), la Pythie rendait ses oracles assise sur un trépied placé au-dessus d'une faille d'où s'échappaient, croyait-on, des vapeurs inspirant ses transes prophétiques.",
    "Ses réponses, données dans un état second, étaient réputées ambiguës autant qu'infaillibles — c'est elle qui annonça au roi Crésus que, s'il attaquait la Perse, il détruirait un grand empire, sans préciser lequel des deux ce serait.",
  ],
  "endymion": [
    "Berger — ou, selon d'autres versions, roi ou chasseur — d'une beauté remarquable, Endymion fut aperçu et aimé par Séléné, déesse de la lune (voir la fiche « Séléné »), alors qu'il dormait sur le mont Latmos.",
    "Pour pouvoir le contempler chaque nuit sans jamais le voir vieillir ni mourir, elle obtint de Zeus qu'il reste plongé dans un sommeil éternel — un amour figé dans l'instant, préservé au prix de tout le reste.",
  ],
  "charon": [
    "Passeur des Enfers, Charon fait traverser aux âmes des morts le fleuve Styx (voir la fiche « Rivière ») à bord de sa barque, à condition qu'elles puissent lui payer l'obole traditionnellement placée sous la langue des défunts.",
    "Les âmes qui n'ont pas reçu de sépulture ni de pièce pour le passeur restent condamnées à errer sur la rive sans jamais pouvoir traverser — un détail qui rappelle que, dans la Grèce antique, le rite funéraire compte autant que la mort elle-même.",
  ],
  "ulysse": [
    "Roi d'Ithaque réputé pour sa ruse plus que pour sa force — une ruse qu'on dit héritée de son grand-père maternel Autolycos, fils d'Hermès et voleur incomparable (voir la fiche « Hermès ») —, Ulysse conçut le stratagème du cheval de bois qui permit enfin aux Grecs de s'emparer de Troie après dix années de siège infructueux.",
    "Son retour chez lui prit dix années supplémentaires, semées d'épreuves — le Cyclope Polyphème, les sirènes, Circé, Charybde et Scylla — durant lesquelles son intelligence lui permit chaque fois d'échapper à des périls que la seule force n'aurait pas surmontés.",
    "Dans le Tarot, Ulysse est la figure du 8 de Coupes, où un personnage s'éloigne de nuit, laissant des coupes soigneusement empilées derrière lui : après une année entière passée sur l'île de Circé (voir la fiche « Circé »), c'est bien lui qui choisit de reprendre la mer vers Ithaque plutôt que de s'installer dans un confort déjà acquis.",
  ],
  "andromède": [
    "Princesse éthiopienne, Andromède fut enchaînée à un rocher au bord de la mer en offrande expiatoire à un monstre marin, envoyé par Poséidon pour punir sa mère Cassiopée de s'être vantée d'une beauté supérieure à celle des Néréides.",
    "Persée, revenant de sa victoire sur la Gorgone Méduse, la découvrit ainsi exposée et la sauva du monstre avant de l'épouser — un couple que les Grecs placèrent ensuite parmi les étoiles (voir la fiche « Étoile »).",
  ],
  "persée": [
    "Fils de Zeus et de la mortelle Danaé, Persée reçut pour mission de rapporter la tête de la Gorgone Méduse, dont le regard pétrifiait quiconque le croisait.",
    "Guidé par Athéna et muni d'objets magiques — sandales ailées, casque d'invisibilité, bouclier poli comme un miroir —, il trancha la tête de Méduse sans jamais la regarder directement, puis s'en servit comme d'une arme redoutable, notamment pour sauver Andromède (voir la fiche « Andromède »).",
  ],
  "érinyes": [
    "Divinités vengeresses nées, selon un récit, du sang d'Ouranos mutilé, les Érinyes poursuivent sans relâche ceux qui ont commis des crimes contre leur propre famille — matricide, parricide, parjure envers les siens.",
    "Elles pourchassèrent ainsi Oreste après qu'il eut tué sa mère pour venger son père, jusqu'à ce qu'un tribunal institué par Athéna elle-même vienne, pour la première fois, remplacer leur vengeance sans fin par un jugement.",
  ],
  "actéon": [
    "Chasseur habile, Actéon surprit un jour par mégarde la déesse Artémis se baignant nue dans une source avec ses nymphes.",
    "Furieuse d'avoir été vue, la déesse le changea sur-le-champ en cerf ; ses propres chiens de chasse, ne le reconnaissant plus, le poursuivirent et le déchirèrent — puni non pour une faute voulue, mais pour avoir simplement vu ce qui ne devait pas l'être.",
  ],
  "artémis": [
    "Sœur jumelle d'Apollon, Artémis naquit la première et, dit-on, aida elle-même sa mère Léto (voir la fiche « Léto ») à accoucher de son frère peu après — elle devint ainsi protectrice des accouchements autant que déesse de la chasse.",
    "Encore enfant, assise sur les genoux de Zeus, elle choisit elle-même la voie qu'elle voulait suivre plutôt que d'attendre qu'on la lui impose : un arc et des flèches, une meute de chiennes, les montagnes sauvages pour domaine, et la promesse de n'avoir jamais à se marier — tout ce qu'il fallait pour ne dépendre de personne.",
    "Farouchement attachée à sa virginité et à son intimité, elle règne sur les forêts sauvages (voir la fiche « Forêt ») et punit sans hésiter quiconque, comme Actéon (voir la fiche « Actéon »), s'aventure à la surprendre.",
    "Elle fit pourtant une exception pour le chasseur Orion, devenu son compagnon de chasse le plus proche — jusqu'à ce que la jalousie de son frère mette fin à cette amitié (voir la fiche « Orion »).",
    "Sa colère peut se muer en pitié tout aussi soudainement : sur le point de laisser sacrifier Iphigénie à Aulis, elle la sauva au dernier instant en substituant une biche sur l'autel (voir la fiche « Iphigénie »).",
    "La chasseresse Atalante, élevée à l'écart des hommes comme elle, partage avec elle ce même mode de vie farouche et indépendant (voir la fiche « Atalante »).",
    "Dans le Tarot, Artémis est la figure du 2 de Bâtons, où l'on tient déjà les deux bâtons d'un premier territoire conquis, le regard tourné vers ce qui reste à choisir : c'est exactement le geste de son enfance, quand elle a fixé elle-même la direction de toute son existence avant que quiconque d'autre n'ait pu la choisir à sa place.",
  ],
  "orion": [
    "Orion est un chasseur géant, réputé pour sa beauté autant que pour son habileté à la chasse — au point qu'Éos, déesse de l'aurore, tomba amoureuse de lui et l'emporta à Délos pour vivre à ses côtés (voir la fiche « Éos »).",
    "Il devint plus tard le compagnon de chasse d'Artémis, partageant avec elle de longues journées dans les forêts sauvages (voir la fiche « Forêt ») — une complicité si grande que la déesse, pourtant farouchement attachée à son indépendance, s'attacha à lui plus qu'à quiconque.",
    "Apollon, craignant de voir sa sœur s'éprendre d'un mortel, lança un scorpion géant à la poursuite d'Orion, qui ne put lui échapper qu'en se jetant à la mer. Désignant alors à Artémis une forme sombre qui nageait au loin sans lui dire qui elle était, il la mit au défi de l'atteindre de ses flèches — elle visa juste, sans jamais savoir qu'elle venait de tuer celui qu'elle aimait.",
    "Bouleversée, elle obtint que le corps d'Orion soit placé parmi les étoiles ; le scorpion y fut envoyé lui aussi, mais assez loin pour que les deux constellations ne se lèvent jamais ensemble dans le ciel.",
    "Orion est particulièrement associé à Éos et à Artémis.",
  ],
  "iphigénie": [
    "Fille du roi Agamemnon, Iphigénie fut promise au sacrifice à Aulis, où la flotte grecque en partance pour Troie restait immobilisée par l'absence de vent — une punition d'Artémis, que le roi avait offensée.",
    "Un devin annonça que seul le sacrifice d'Iphigénie apaiserait la déesse. Mais au moment même où la lame allait s'abattre, Artémis, prise de pitié, substitua une biche sur l'autel et emporta la jeune fille, restée invisible à tous, jusqu'en Tauride (voir la fiche « Artémis »).",
    "Elle y devint prêtresse du temple d'Artémis, chargée des rites du sanctuaire — loin de la mort qu'on lui promettait, une seconde vie entièrement consacrée à la déesse qui l'avait sauvée.",
    "Iphigénie est particulièrement associée à Artémis.",
  ],
  "ariane": [
    "Fille de Minos, roi de Crète (voir la fiche « Minos »), et de Pasiphaé, Ariane tomba amoureuse de Thésée le jour où il arriva parmi les jeunes gens envoyés en tribut au Minotaure, enfermé au cœur du Labyrinthe.",
    "Pour lui permettre d'en ressortir vivant après avoir affronté le monstre, elle lui confia une pelote de fil à dérouler en avançant — le fameux « fil d'Ariane », resté depuis l'expression même de ce qui permet de retrouver son chemin dans ce qui semblait inextricable.",
    "Thésée l'emmena avec lui en fuyant la Crète, mais l'abandonna endormie sur l'île de Naxos. C'est là que Dionysos la trouva, en tomba amoureux et l'épousa, lui offrant l'immortalité et une couronne d'or que l'on retrouve, dit-on, parmi les étoiles sous la forme d'une constellation (voir la fiche « Dionysos »).",
    "Une tradition tardive veut que ce mariage n'ait pas été sans conséquence pour tout le monde : le jeune dieu Hyménée, invité à chanter pour l'occasion avec une voix aussi belle que celle de son père Apollon, l'y aurait perdue (voir la fiche « Hyménée ») — la plus heureuse des fêtes coûtant cher à quelqu'un d'autre.",
    "Ariane est particulièrement associée à Dionysos.",
    "Dans le Tarot, Ariane est la figure du 6 de Coupes, où deux enfants échangent des coupes fleuries dans un jardin paisible : son fil, offert à Thésée sans rien exiger en retour, est ce même geste simple et généreux, une tendresse qui donne avant même de calculer.",
  ],
  "sémélé": [
    "Fille de Cadmos, roi de Thèbes (voir la fiche « Cadmos »), Sémélé fut aimée de Zeus — une liaison qui attira aussitôt la jalousie d'Héra, toujours prompte à se venger d'une rivale mortelle.",
    "Déguisée en vieille nourrice, Héra convainquit Sémélé de demander à son amant de se montrer à elle dans toute sa splendeur divine. Zeus, lié par une promesse qu'il ne pouvait rompre, dut s'exécuter — et la vision foudroya Sémélé sur-le-champ. Il sauva l'enfant qu'elle portait en le cousant dans sa propre cuisse jusqu'à son terme (voir la fiche « Dionysos »).",
    "Devenu adulte, Dionysos n'oublia jamais sa mère : il descendit jusqu'aux Enfers pour l'en faire remonter, et obtint qu'elle soit accueillie parmi les dieux de l'Olympe sous un nouveau nom, Thyoné — la seule mortelle jamais divinisée pour avoir simplement été aimée d'un dieu.",
    "Sémélé est particulièrement associée à Dionysos.",
  ],
  "hébé": [
    "Fille de Zeus et d'Héra, Hébé personnifie la jeunesse éternelle qui règne sur l'Olympe. C'est elle qui, avant d'être remplacée par le jeune Ganymède, servait le nectar et l'ambroisie aux dieux lors de leurs banquets — la boisson même de l'immortalité.",
    "Lorsque Héraclès mourut de ses souffrances et fut accueilli parmi les dieux en récompense de ses travaux (voir la fiche « Héraclès »), c'est Hébé qui devint son épouse sur l'Olympe — un mariage qui scella sa victoire finale sur la mortalité elle-même.",
    "Hébé est particulièrement associée à Héraclès.",
    "Dans le Tarot, Hébé est la figure du 9 de Coupes, où un personnage comblé se tient devant neuf coupes alignées, sans plus rien à démontrer : elle est justement celle qui verse aux dieux le nectar et l'ambroisie, la boisson même d'un contentement qui n'attend plus rien d'ailleurs.",
  ],
  "ilithyie": [
    "Fille de Zeus et d'Héra, Ilithyie préside aux accouchements : c'est elle qui, dit-on, permet à l'enfant de venir au monde — ou qui, si elle le choisit, peut retenir une naissance presque indéfiniment.",
    "Lorsque Héraclès dut naître, Héra, jalouse comme toujours d'un enfant de Zeus né d'une mortelle, envoya Ilithyie s'asseoir devant la porte d'Alcmène, jambes et doigts croisés, pour empêcher l'accouchement de se conclure (voir la fiche « Héraclès »).",
    "Une servante d'Alcmène, comprenant la ruse, annonça faussement que l'enfant venait de naître : surprise, Ilithyie décroisa un instant les mains — juste assez pour que la naissance, enfin libérée, puisse avoir lieu.",
    "Ilithyie est particulièrement associée à Héraclès et à Héra.",
  ],
  "léto": [
    "Titanide, fille de Coéos et de Phoebé, Léto est la sœur d'Astéria (voir la fiche « Astéria »). Aimée de Zeus, elle devint aussitôt la cible de la jalousie d'Héra, qui interdit à toute terre ferme de l'accueillir pour son accouchement (voir la fiche « Héra »).",
    "Léto erra ainsi de rivage en rivage, refusée partout, jusqu'à atteindre Délos — l'île errante en laquelle sa propre sœur Astéria s'était autrefois changée pour échapper à Zeus. N'étant plus à proprement parler une « terre ferme » ancrée nulle part, Délos put l'accueillir sans enfreindre l'interdit d'Héra.",
    "C'est là que Léto mit au monde ses jumeaux, Apollon et Artémis (voir les fiches « Apollon » et « Artémis ») — un accouchement rendu possible, au bout du compte, par la solidarité d'une sœur devenue elle-même un refuge.",
    "Toujours poursuivie par la colère d'Héra alors même que ses jumeaux n'étaient encore que des nourrissons, elle s'arrêta un jour en Lycie pour boire à un étang et y baigner ses enfants. Des paysans du lieu, par pure méchanceté, troublèrent l'eau à coups de pied pour l'empêcher de se désaltérer et la chassèrent en l'insultant. Léto, épuisée, les changea sur-le-champ en grenouilles, condamnées depuis à barboter pour toujours dans la vase de cet étang qu'ils lui avaient interdit.",
    "Devenue mère comblée, elle ne tolère pourtant aucun outrage fait à ses enfants. Niobé, reine de Thèbes et mère de quatorze enfants, se vanta un jour d'être plus digne d'admiration que Léto, qui n'en avait mis au monde que deux. Léto, blessée dans son orgueil de mère, envoya Apollon et Artémis venger l'insulte : l'un abattit à l'arc tous les fils de Niobé, l'autre toutes ses filles, sans qu'aucune supplication n'arrête leurs flèches. Pétrifiée de chagrin, Niobé se changea en rocher sur le mont Sipyle, d'où continue, dit-on, de suinter une eau semblable à des larmes sans fin.",
    "Léto n'a pas de carte qui porte son nom dans ce tarot, mais son histoire précède et rend possible celle de la carte VII — Le Chariot, celle de son fils Apollon : avant la maîtrise éclatante du char solaire, il y a l'endurance silencieuse d'une mère rejetée de toutes parts, qui doit d'abord trouver refuge avant que quiconque, chez elle, ne puisse triompher. Sa vengeance envers Niobé rappelle enfin qu'une victoire acquise dans la douleur ne pardonne jamais l'insulte faite à ce prix.",
    "Léto est particulièrement associée à Apollon, à Artémis et à Astéria.",
  ],
  "astéria": [
    "Titanide, fille de Coéos et de Phoebé, Astéria — dont le nom signifie littéralement « étoilée » (voir la fiche « Étoile ») — est la sœur de Léto (voir la fiche « Léto »).",
    "Poursuivie par les avances de Zeus, elle refusa de se laisser posséder et se jeta dans la mer plutôt que de céder, se changeant en île errante, un temps assimilée aux étoiles filantes avant de se fixer sous le nom de Délos.",
    "C'est sur cette même île qu'elle offrit, sans le savoir encore, un refuge à sa sœur Léto, venue y accoucher d'Apollon et d'Artémis après avoir été rejetée de partout ailleurs. Avec le dieu marin Persès, Astéria est aussi mère d'Hécate (voir la fiche « Hécate »), qui hérita de sa proximité avec le ciel nocturne.",
    "Astéria est particulièrement associée à Léto et à Hécate.",
  ],
  "cadmos": [
    "Fils du roi Agénor de Phénicie et frère d'Europe — enlevée par Zeus changé en taureau —, Cadmos partit à la recherche de sa sœur sans jamais la retrouver. L'oracle de Delphes (voir la fiche « Temple ») lui conseilla d'abandonner cette quête et de suivre à la place une vache marquée d'un croissant de lune jusqu'à ce qu'elle s'arrête d'elle-même : à cet endroit précis, il devrait fonder une ville.",
    "La vache s'arrêta sur le site de la future Thèbes. Pour un sacrifice, Cadmos envoya ses compagnons chercher de l'eau à une source voisine, gardée par un dragon consacré à Arès (voir la fiche « Arès »), qui les tua tous. Cadmos vainquit à son tour le dragon puis, sur les conseils d'Athéna, sema ses dents dans le sol : des guerriers tout armés en surgirent aussitôt et s'entretuèrent jusqu'à ce qu'il n'en reste que cinq, devenus les ancêtres des plus grandes familles de Thèbes.",
    "Pour avoir tué un être consacré à Arès, Cadmos dut servir le dieu pendant huit années. Sa peine achevée, il fut réconcilié avec lui et reçut pour épouse Harmonie, fille d'Arès et d'Aphrodite (voir la fiche « Harmonie ») — des noces où tous les dieux de l'Olympe vinrent en personne, chose presque jamais accordée à des mortels.",
    "Devenus vieux, Cadmos et Harmonie furent changés ensemble en serpents et menés vers les Champs Élysées plutôt que vers une fin funeste — une métamorphose vécue comme une grâce plutôt qu'une punition, pour avoir traversé côte à côte tant d'épreuves. La tradition grecque attribue aussi à Cadmos l'introduction de l'alphabet en Grèce.",
    "Cadmos est particulièrement associé à Harmonie.",
  ],
  "harmonie": [
    "Fille d'Arès (voir la fiche « Arès »), dieu de la guerre, et d'Aphrodite (voir la fiche « Aphrodite »), Harmonie naît de l'union la plus improbable qui soit — la guerre et l'amour — et en personnifie pourtant l'issue la plus apaisée : la concorde qui succède au conflit.",
    "Son mariage avec Cadmos, fondateur de Thèbes (voir la fiche « Cadmos »), fut célébré en présence de tous les dieux de l'Olympe, venus lui offrir des présents — dont un collier forgé par Héphaïstos, d'une beauté si rare qu'il resta légendaire pour les générations suivantes.",
    "Devenue vieille aux côtés de Cadmos, elle fut changée avec lui en serpent et rejoignit les Champs Élysées — refusant, jusque dans la métamorphose, de se séparer de celui qu'elle avait épousé.",
    "Harmonie est particulièrement associée à Cadmos.",
    "Dans le Tarot, Harmonie est la figure du 2 de Coupes, où deux personnages échangent leurs coupes face à face, un caducée ailé suspendu entre eux (voir la fiche « Caducée ») — ses deux serpents entrelacés font écho, par un rapprochement plus tardif, à ce même couple changé en serpents à la fin de sa vie : cette carte célèbre l'union à parts égales, où chacun donne autant qu'il reçoit.",
  ],
  "atalante": [
    "Abandonnée à sa naissance par un père qui espérait un fils, Atalante fut allaitée par une ourse puis recueillie par des chasseurs — une enfance sauvage qui en fit une coureuse et une archère hors pair, proche par son mode de vie de la déesse Artémis (voir la fiche « Artémis »).",
    "Lors de la grande chasse au sanglier de Calydon, elle fut la première à toucher la bête de sa flèche, avant même les héros les plus renommés présents ce jour-là ; le meneur de la chasse, Méléagre, insista pour qu'elle reçoive la dépouille en récompense, malgré les protestations de certains chasseurs de ne pas voir ce prix revenir à une femme.",
    "Refusant le mariage, elle ne consentit à épouser que celui qui la vaincrait à la course — les prétendants battus payaient leur défaite de leur vie, et aucun n'y était jamais parvenu. Hippomène, aidé par Aphrodite, laissa tomber trois pommes d'or du jardin des Hespérides tout au long de la course : chaque fois qu'Atalante s'arrêtait pour en ramasser une, il regagnait du terrain, jusqu'à finir par la devancer.",
    "Atalante est particulièrement associée à Artémis.",
  ],
  "protée": [
    "Dieu marin au service de Poséidon, Protée connaît l'avenir mais refuse de le révéler à quiconque le lui demande directement.",
    "Pour lui arracher une prophétie, il faut le surprendre pendant son sommeil et le maintenir de force malgré les métamorphoses qu'il enchaîne pour échapper à toute prise — lion, serpent, flamme, eau — jusqu'à ce qu'épuisé, il reprenne sa forme véritable et consente enfin à répondre.",
  ],
  "cyclopes": [
    "Géants à l'œil unique, les Cyclopes forgent pour les dieux leurs armes les plus redoutables — la foudre de Zeus, le trident de Poséidon, le casque d'invisibilité d'Hadès — dans les forges d'Héphaïstos.",
    "L'un d'eux, Polyphème, rendu tristement célèbre par l'Odyssée, est d'une nature bien différente : berger solitaire et brutal, il enferme Ulysse et ses compagnons dans sa grotte avant d'être aveuglé par la ruse du héros pour leur permettre de s'échapper.",
  ],
  "cybèle": [
    "Déesse originaire d'Asie Mineure assimilée par les Grecs à leur propre panthéon, Cybèle personnifie la terre nourricière dans toute sa puissance sauvage, bien au-delà de la douceur cultivée qu'incarne Déméter.",
    "Son culte, marqué par une musique frénétique et des rites d'une intensité rare, traversa la Méditerranée jusqu'à Rome, où elle fut officiellement adoptée comme protectrice de la cité en des temps de crise.",
  ],

  /* ----- Personnifications des cartes numérales illustrées d'Épées (voir NUMBER_CARD_DEITY) ----- */
  "aletheia": [
    "Aletheia personnifie la Vérité elle-même. Les traditions varient sur son origine : fille de Zeus pour les uns, née de Chronos, le temps primordial, pour les autres — un lien qui a donné naissance à l'adage selon lequel le temps finit toujours par révéler ce qui a été caché.",
    "Son nom grec, alètheia, signifie littéralement « ce qui n'est plus caché » — la négation de lèthè, l'oubli (voir la fiche « Lethée »). Les deux figures se répondent ainsi comme deux pôles opposés : l'une dévoile, l'autre efface.",
    "Elle a pour rivale Apaté (voir la fiche « Apaté »), l'esprit de la tromperie. Lassée de voir sa parole détournée et travestie par les hommes, Aletheia se serait retirée au fond d'un puits, loin de la surface où la vérité se déforme si facilement — origine de l'adage antique selon lequel « la vérité est au fond du puits ».",
    "Dans le Tarot, Aletheia est la figure de l'As d'Épées, où une lame se dresse, nette et couronnée de laurier : la lecture traditionnelle de cette carte — une idée qui perce, une décision prise sans l'ombre d'un doute — est exactement ce que personnifie Aletheia, la vérité qui ne négocie jamais avec ce qui l'entoure.",
  ],
  "ananké": [
    "Ananké personnifie la Nécessité — non pas un simple besoin, mais la contrainte absolue à laquelle rien, pas même les dieux, ne peut se soustraire.",
    "Les récits orphiques la font naître aux tout premiers instants du monde, enlacée à Chronos, le temps primordial, autour de l'œuf cosmique dont naîtra l'univers entier : ensemble, ils mettent la création en mouvement selon un ordre qu'aucune volonté ne peut ensuite défaire.",
    "De cette union naissent, selon certains récits, les Moires elles-mêmes, filant le fil de chaque destinée sur le fuseau que Platon décrit tournant sur les genoux d'Ananké — l'axe même autour duquel tourne le monde. Zeus lui-même, dit-on, s'incline devant ses décrets : la nécessité gouverne jusqu'au roi des dieux.",
    "Dans le Tarot, Ananké est la figure du 2 d'Épées, où une silhouette aux yeux bandés retient deux épées croisées, refusant encore de trancher : cet équilibre suspendu ne dure jamais éternellement, chez elle moins que quiconque — la nécessité finit toujours par imposer un choix, qu'on y consente ou non.",
  ],
  "éris": [
    "Éris personnifie la Discorde, sœur d'Arès — une puissance de rupture qui, une fois déclenchée, ne peut plus être désamorcée.",
    "Non invitée aux noces de Thétis et Pélée (voir la fiche « Thétis »), par crainte qu'elle n'y sème le trouble, elle se présenta malgré tout et jeta parmi les déesses assemblées une pomme d'or portant une seule inscription : « à la plus belle ». Héra, Athéna et Aphrodite se la disputèrent aussitôt, jusqu'à ce que Zeus confie à Pâris le soin de trancher — un jugement qui déclenchera la guerre de Troie.",
    "Hésiode distingue pourtant deux Éris bien différentes : l'une pousse au conflit destructeur, l'autre à une rivalité plus saine, celle qui incite le voisin paresseux à travailler autant que celui qui prospère à côté de lui. La discorde n'est donc pas toujours la même force — seule la première porte le nom que la légende a retenu.",
    "Dans le Tarot, Éris est la figure du 3 d'Épées, où trois lames transpercent un cœur : sa pomme d'or n'était, elle aussi, qu'un seul mot bien plus tranchant qu'il n'y paraissait — une vérité minuscule, jetée sans préméditation, mais qui blesse aussitôt trois orgueils à la fois et ne laisse plus la possibilité de revenir en arrière.",
  ],
  "lethée": [
    "Lethée est le fleuve de l'Oubli, l'un des cours d'eau qui traversent les Enfers — boire à ses eaux efface, dit-on, jusqu'au souvenir d'avoir vécu.",
    "Les âmes des morts s'y désaltéraient traditionnellement avant de renaître, pour ne rien garder de leur existence précédente. Mais une tradition plus tardive, orphique, conseillait l'inverse à ses initiés : sur des tablettes d'or déposées dans leurs tombes, on leur enjoignait d'éviter la source de Lethée et de chercher plutôt celle de Mnémosyne, la Mémoire — pour rester, même dans la mort, fidèles à ce qu'ils avaient été.",
    "Son nom même s'oppose à celui d'Aletheia, la Vérité (voir la fiche « Aletheia ») : alètheia signifie littéralement « ce qui échappe à Lethée » — l'un dévoile ce que l'autre recouvre, deux forces jumelles et contraires.",
    "Dans le Tarot, Lethée est la figure du 4 d'Épées, où une silhouette repose, immobile, après une période de tension : son don n'est pas la perte, mais le répit — le silence nécessaire pour que l'esprit, un temps, cesse de se souvenir de ce qui l'épuisait.",
  ],
  "némésis": [
    "Némésis personnifie l'indignation légitime et la rétribution qui rétablit l'équilibre chaque fois que la démesure — l'orgueil, la chance excessive, le mépris d'autrui — dépasse une limite qu'aucun mortel ne devrait franchir.",
    "C'est elle, selon la tradition la plus répandue, qui punit Narcisse (voir la fiche « Narcisse ») pour avoir repoussé sans pitié tous ceux qui l'aimaient : elle le condamna à tomber amoureux de son propre reflet, un amour qu'il ne pourrait jamais obtenir en retour — la faute retournée contre celui qui l'avait commise.",
    "On la représente ailée, tenant parfois une roue — celle de la fortune, qui n'épargne personne indéfiniment — ou un instrument de mesure, rappelant que rien ne doit dépasser sa juste proportion, le fameux « rien de trop » gravé au temple de Delphes.",
    "Dans le Tarot, Némésis est la figure du 5 d'Épées, où une victoire se ramasse avec un sourire ambigu tandis que d'autres s'éloignent, tête baissée : elle rappelle que tout triomphe payé au prix de l'orgueil ou de l'excès finit, tôt ou tard, par se retourner contre celui qui l'a emporté.",
  ],
  "palioxis": [
    "Palioxis personnifie la débandade — le reflux chaotique d'une armée qui rompt les rangs et fuit, à l'opposé exact de la charge conquérante.",
    "Elle appartient au cortège d'Arès, aux côtés de figures comme Phobos (voir la fiche « Phobos ») et son jumeau Deimos, la Terreur, ou Kydoimos, la Confusion du combat : une escorte de forces qui n'affrontent jamais l'ennemi elles-mêmes, mais décident souvent de l'issue d'une bataille en s'emparant d'un camp ou de l'autre.",
    "Contrairement à Ioké, sa contrepartie qui personnifie la poursuite acharnée du vainqueur, Palioxis n'est pas la défaite elle-même : elle est ce moment où continuer le combat cesserait d'avoir un sens, et où seul reculer permet de préserver ce qui peut encore l'être.",
    "Dans le Tarot, Palioxis est la figure du 6 d'Épées, où une silhouette conduit une barque chargée de lames vers une rive plus calme : son reflux n'est jamais une honte, mais le choix, souvent le plus lucide, de quitter une eau agitée avant qu'elle n'engloutisse tout.",
  ],
  "apaté": [
    "Apaté personnifie la Tromperie. Hésiode en fait une fille de Nyx, la Nuit, née sans père — au côté d'autres forces sombres comme Éris, la Discorde (voir la fiche « Éris »), ou Géras, la Vieillesse : des puissances qui agissent sur le monde sans jamais avoir besoin d'être invoquées.",
    "Des traditions plus tardives l'associent aussi aux maux répandus sur le monde lorsque Pandore souleva le couvercle du vase qui lui avait été confié — la tromperie comptant, dans cette lecture, parmi les premières épreuves faites aux hommes.",
    "Elle a pour rivale Aletheia, la Vérité (voir la fiche « Aletheia ») : l'une dévoile ce que l'autre travestit, et aucune des deux ne l'emporte jamais tout à fait sur l'autre.",
    "Dans le Tarot, Apaté est la figure du 7 d'Épées, où une silhouette s'éloigne en emportant plusieurs lames, en laissant sciemment les autres derrière elle : une stratégie qui n'est pas un vol pur et simple, mais qui flirte sciemment avec la limite de l'honnêteté — exactement le territoire qu'Apaté ne quitte jamais.",
  ],
  "phobos": [
    "Phobos personnifie la Peur qui saisit avant tout raisonnement — fils d'Arès (voir la fiche « Arès ») et d'Aphrodite, jumeau de Deimos, la Terreur, avec qui il escorte son père au combat (voir la fiche « Palioxis » pour ce même cortège).",
    "Homère le place, aux côtés de la tête de la Gorgone, sur le bouclier d'Agamemnon comme sur l'égide d'Athéna : son image seule, brandie face à l'ennemi, suffisait à faire vaciller des rangs entiers avant qu'une seule lame ne soit levée.",
    "Les Spartiates lui vouaient un culte à part, non pour la bannir, mais pour l'apprivoiser : une peur reconnue et maîtrisée, croyaient-ils, forge une discipline plus sûre qu'une bravoure aveugle qui ignore le danger.",
    "Dans le Tarot, Phobos est la figure du 8 d'Épées, où une silhouette entravée et les yeux bandés se tient debout, cernée d'épées qui laissent pourtant un passage : sa peur, comme la sienne, retient bien plus l'esprit que le corps.",
  ],
  "morphée": [
    "Morphée est le dieu des songes, fils d'Hypnos, le Sommeil — il façonne dans le rêve des silhouettes humaines si parfaites qu'elles se confondent avec la réalité, message des dieux glissé dans le repos des mortels.",
    "Ovide raconte comment Junon, voulant révéler à Alcyone la mort de son époux Céyx en mer, envoya Morphée prendre les traits exacts du disparu pour la lui annoncer en songe — une vérité que la déesse jugeait trop cruelle à dire éveillée, mais qu'il fallait pourtant transmettre.",
    "Dans le Tarot, Morphée est la figure du 9 d'Épées, où un dormeur repose sous neuf lames suspendues dans la nuit : tout ce qui visite le sommeil n'est pas apaisant — parfois l'esprit doit d'abord porter, même endormi, ce qu'il ne peut pas encore affronter éveillé.",
  ],
  "thanatos": [
    "Thanatos personnifie la mort paisible, sans violence ni souffrance — fils de Nyx comme Apaté (voir la fiche « Apaté »), et frère jumeau d'Hypnos, le Sommeil, tant les deux se ressemblent.",
    "Sisyphe parvint un jour à l'enchaîner par ruse, empêchant plus personne de mourir sur terre — jusqu'à ce qu'Arès, furieux de voir la guerre perdre tout enjeu sans la mort pour la trancher, ne vienne le libérer de force.",
    "Héraclès (voir la fiche « Héraclès ») le défia une autre fois corps à corps, pour arracher la reine Alceste des Enfers et la rendre à son époux — l'une des rares fois où la mort elle-même dut céder.",
    "Dans le Tarot, Thanatos est la figure du 10 d'Épées, où une silhouette gît transpercée sous un ciel qui pourtant s'éclaircit à l'horizon : sa fin n'est jamais cruelle, seulement inévitable — et c'est cette même inévitabilité qui marque, dans la carte, le point le plus bas d'où il ne reste qu'à se relever.",
  ],
  "hormos": [
    "Hormos personnifie l'élan qui précède toute action — l'impulsion brute, avant même qu'un but précis ne soit choisi.",
    "Les Athéniens lui vouaient un autel, tout près de celui dédié à Éléos, la Pitié, comme s'il fallait honorer côte à côte la force qui pousse à agir et la retenue qui sait, parfois, la tempérer.",
    "Figure mineure et peu documentée, Hormos n'a jamais eu de mythe développé qui lui soit propre — comme si l'élan qu'il personnifie ne s'attardait jamais assez longtemps sur un seul récit pour s'y fixer.",
    "Dans le Tarot, Hormos est la figure de l'As de Bâtons, où une main surgit des nuages tenant un bâton encore en bourgeon : une énergie brute et sans direction encore choisie, mais qui ne demande déjà plus qu'à s'exprimer.",
  ],
  "arès": [
    "Fils de Zeus et d'Héra (voir les fiches « Zeus » et « Héra »), Arès personnifie la guerre dans sa forme la plus brute — la violence du combat lui-même, plutôt que la stratégie qui l'encadre. Même ses propres parents le tenaient à distance : Zeus le qualifie, dans l'Iliade, du plus détestable de tous ses enfants.",
    "Son opposée naturelle est Athéna (voir la fiche « Athéna »), déesse d'une guerre pensée et disciplinée : les deux s'affrontent directement sur le champ de bataille de Troie, où Athéna prend systématiquement le dessus sur lui.",
    "Deux géants jumeaux, Otos et Éphialtès, parvinrent un jour à le capturer et à l'enfermer treize mois durant dans une jarre de bronze — une humiliation dont seul Hermès (voir la fiche « Hermès ») réussit à le délivrer. Même le dieu de la guerre, apprit-on ce jour-là, pouvait être réduit à l'impuissance.",
    "Son amour pour Aphrodite (voir la fiche « Aphrodite »), mariée à Héphaïstos, leur valut d'être surpris nus dans un filet d'or tissé par l'époux trompé — mais leur union donna aussi naissance à Harmonie (voir la fiche « Harmonie ») et aux jumeaux Phobos et Deimos (voir la fiche « Phobos »), qui l'escortent au combat.",
    "Dans le Tarot, Arès est la figure du 3 de Bâtons, où l'on regarde déjà au loin ce qu'une décision engagée va produire : chez lui, une fois la guerre déclarée, plus rien ne l'arrête ni ne se négocie — l'élan brut, sans retour possible, jusqu'à ce que l'issue se révèle d'elle-même.",
  ],
  "thalia": [
    "Thalia, dont le nom signifie « celle qui fleurit », est l'une des trois Charites — les déesses de la grâce et de la joie que la tradition ne représente jamais seules, toujours dansant ensemble (voir la fiche « Charites »).",
    "Parmi ses deux sœurs, elle personnifie plus particulièrement la fête, l'abondance et tout ce qui s'épanouit sans nécessité — les banquets, la parure, la beauté qui n'a besoin de rien justifier d'autre qu'elle-même.",
    "Une autre figure du même nom existe dans la mythologie grecque, l'une des neuf Muses, protectrice de la comédie et de la poésie pastorale : les deux Thalia restent distinctes, même si leur nom commun — et leur joie partagée — les rapproche.",
    "Dans le Tarot, Thalia est la figure du 4 de Bâtons, où des guirlandes de fleurs relient quatre bâtons au-dessus d'une fête déjà commencée : la stabilité heureuse et le répit mérité après l'effort sont exactement son domaine.",
  ],
  "zelos": [
    "Zelos personnifie le Zèle et l'émulation rivale — l'ardeur qui pousse à se mesurer aux autres, jusqu'à la compétition la plus âpre.",
    "Fils du Titan Pallas et de Styx, comme Niké, la Victoire (voir la fiche « Niké »), il se rangea avec ses frères et sœurs aux côtés de Zeus pendant la guerre contre les Titans, et resta depuis un compagnon permanent de son trône, en récompense de cette fidélité.",
    "Dans le Tarot, Zelos est la figure du 5 de Bâtons, où cinq personnages croisent leurs bâtons dans un désordre où personne ne prend clairement le dessus : cette énergie de rivalité brute, ni destructrice ni pacifique, est précisément la sienne — la friction de vouloir dépasser l'autre, sans qu'aucune règle n'ait encore tranché qui l'emporte.",
  ],
  "bia": [
    "Bia personnifie la Force brute — non la force qui combat pour elle-même, mais celle qui exécute sans jamais discuter ce qu'on lui ordonne.",
    "Fille du Titan Pallas et de Styx, sœur de Niké, de Kratos (voir les fiches « Niké » et « Kratos ») et de Zelos (voir la fiche « Zelos »), elle rallia elle aussi Zeus pendant la guerre contre les Titans et fut récompensée d'une place permanente à ses côtés, jamais quittée depuis.",
    "Elle et Kratos, sur ordre de Zeus, traînèrent un jour Prométhée jusqu'au rocher du Caucase où il fut enchaîné (voir la fiche « Prométhée ») — dans le récit qui la met en scène, Bia ne prononce jamais un mot, contrairement à Kratos : sa seule fonction est d'agir, jamais de justifier.",
    "Dans le Tarot, Bia est la figure du 6 de Bâtons, où un vainqueur couronné de laurier avance acclamé par la foule : la place qu'elle occupe aux côtés de Zeus depuis la victoire sur les Titans est exactement cette reconnaissance méritée, gagnée par une loyauté jamais remise en question.",
  ],
  "agon": [
    "Agon personnifie la Compétition elle-même — non l'affrontement guerrier, mais l'épreuve codifiée où l'on se mesure aux autres selon des règles communes à tous.",
    "Le voyageur Pausanias décrit avoir vu, à Olympie, une statue lui étant consacrée, tenant les haltères des sauteurs — Agon présidait aussi bien les concours sportifs que les concours dramatiques donnés lors des grandes fêtes religieuses.",
    "Dans le Tarot, Agon est la figure du 7 de Bâtons, où un seul personnage, en position haute, tient tête à six autres levés vers lui : il est précisément ce terrain où il faut sans cesse défendre sa place face à qui veut la prendre, épreuve après épreuve.",
  ],
  "borée": [
    "Borée est le dieu du vent du Nord, le plus violent des quatre Anémoi — ses frères Notos (le vent du Sud), Euros (le vent d'Est) et Zéphyr (voir la fiche « Zéphyr »), le vent d'Ouest, soufflent chacun avec une force bien moindre que la sienne.",
    "Fils d'Astréos et d'Éos, l'Aurore (voir la fiche « Éos »), il s'éprit de la princesse athénienne Orithye et, après avoir essuyé un refus, l'enleva en pleine tempête pour l'emmener régner à ses côtés en Thrace — un rapt brutal que les Athéniens finirent par honorer comme une alliance : Borée devint ainsi, par ce mariage, un beau-frère de leur cité.",
    "Lors des guerres médiques, les Athéniens, se souvenant de ce lien, adressèrent des prières à Borée pour qu'il vienne à leur secours contre la flotte perse — Hérodote raconte que ses vents se levèrent alors et fracassèrent une partie des navires ennemis au large de l'Eubée, un secours que la cité lui attribua par la suite comme un dû entre parents.",
    "Dans le Tarot, Borée est la figure du 8 de Bâtons, où huit bâtons filent dans les airs à toute vitesse vers un but encore invisible : ce même souffle brutal et soudain, capable d'enlever une princesse comme de disperser une flotte entière, est précisément ce qui porte cette carte — un mouvement qu'aucune volonté ne semble plus pouvoir ralentir une fois qu'il s'est levé.",
  ],
  "alké": [
    "Alké personnifie la Vaillance martiale — la fermeté qui tient la ligne dans l'épreuve, plus proche de l'endurance du combattant que de la fureur guerrière.",
    "C'est une figure mineure, très peu documentée dans les sources qui nous restent : ni généalogie développée ni récit propre ne lui sont attachés, seulement son nom, invoqué comme une qualité que l'on souhaite à qui affronte une épreuve longue.",
    "Dans le Tarot, Alké est la figure du 9 de Bâtons, où un personnage blessé mais debout tient son dernier bâton, huit autres dressés derrière lui en rempart : cette vaillance qui ne cède pas, même affaiblie, est exactement la sienne — une résistance qui tient bon non par éclat, mais par simple refus de céder.",
  ],
  "kratos": [
    "Kratos personnifie la Puissance souveraine — non la force qui agit d'elle-même, comme sa sœur Bia (voir la fiche « Bia »), mais l'autorité qui commande et fait exécuter.",
    "Fils du Titan Pallas et de Styx, frère de Niké, de Bia et de Zelos (voir les fiches « Niké », « Bia » et « Zelos »), il se rangea comme eux aux côtés de Zeus pendant la guerre contre les Titans et resta depuis un compagnon permanent de son trône, chargé d'en faire respecter les volontés.",
    "Dans la pièce Prométhée enchaîné d'Eschyle, c'est lui qui ouvre la scène : sur ordre de Zeus, il escorte Héphaïstos jusqu'au rocher du Caucase et lui ordonne d'y enchaîner Prométhée, pendant que Bia, silencieuse à ses côtés, se contente d'exécuter (voir la fiche « Prométhée »). Seul parmi les quatre enfants de Styx à recevoir une réplique dans les textes qui nous restent, il incarne le pouvoir qui se justifie en parlant, là où Bia agit sans un mot.",
    "Dans le Tarot, Kratos est la figure du 10 de Bâtons, où un personnage courbé porte à grand-peine dix bâtons vers une maison au loin : cette même puissance qui n'a de sens qu'en s'exerçant jusqu'au bout d'une charge, quel qu'en soit le poids, est précisément la sienne — la force devenue fardeau, mais jamais déposée avant le but atteint.",
  ],
  "philotès": [
    "Philotès personnifie l'affection, l'amitié et le désir partagé — la force qui rapproche. Hésiode en fait une fille de la Nuit, née sans père, aux côtés de sœurs bien plus sombres : Apaté la Tromperie, Némésis la Rétribution et Éris la Discorde (voir les fiches « Apaté », « Némésis » et « Éris ») — une même origine nocturne, mais un tempérament qui prend le chemin inverse du leur.",
    "Le philosophe Empédocle en fait l'une des deux grandes forces qui gouvernent l'univers : Philotès unit les éléments là où Éris, sa sœur, les sépare — l'amour et la discorde alternant sans fin pour façonner puis défaire le monde. Il va jusqu'à l'identifier à Aphrodite elle-même, sous son nom archaïque de Kypris.",
    "Un détail rare mais frappant lui est attaché : Empédocle la dit blessée et offensée par les sacrifices d'animaux, dont elle réclamerait l'abstention en son honneur — une divinité de l'union qui refuse jusqu'à la violence faite pour la célébrer.",
    "Dans le Tarot, Philotès est la figure de l'As de Coupes, où une main tendue depuis les nuages offre une coupe débordante d'eau vive : ce premier élan qui donne sans calcul ni condition, avant même de savoir ce qu'il en coûtera, est exactement ce qu'elle personnifie.",
  ],
  "euphrosyne": [
    "Euphrosyne, dont le nom signifie « joie » ou « bonne humeur », est l'une des trois Charites — les déesses de la grâce que la tradition ne représente jamais seules, toujours dansant ensemble aux côtés d'Aglaé et de Thalie (voir les fiches « Charites » et « Thalia »).",
    "Selon Hésiode, elle est fille de Zeus et de l'Océanide Eurynomé, même si les sources antiques varient sur le nombre exact et la généalogie des Charites. Compagnes d'Aphrodite et des Muses, les trois sœurs président aux fêtes et aux banquets de l'Olympe — tout ce qui rend la vie belle sans nécessité.",
    "Parmi ses sœurs, elle personnifie plus particulièrement la joie elle-même — non l'abondance ou la fête que représente Thalia (voir la fiche « Thalia »), mais l'allégresse qui ne naît que du partage, le plaisir simple d'être ensemble.",
    "Dans le Tarot, Euphrosyne est la figure du 3 de Coupes, où trois femmes lèvent leurs coupes ensemble vers le ciel : cette joie-là ne se vit jamais seule — inutile de la chercher dans la solitude, elle n'existe qu'à plusieurs.",
  ],
  "hypnos": [
    "Hypnos personnifie le Sommeil, fils de la Nuit — frère jumeau de Thanatos, la Mort paisible (voir la fiche « Thanatos »), avec qui il partage une ressemblance si troublante que les Anciens les disaient inséparables, l'un menant doucement là où l'autre mène pour toujours.",
    "Il habite, dit-on, une grotte silencieuse aux confins du monde, là où naît le fleuve Lethée, l'Oubli (voir la fiche « Lethée »), et où se rencontrent le jour et la nuit : des pavots poussent à son entrée, et c'est là qu'il engendra Morphée, le dieu des songes, capable de prendre en rêve les traits de n'importe quel mortel (voir la fiche « Morphée »).",
    "Dans l'Iliade, Héra le convainc d'endormir Zeus lui-même le temps de favoriser les Grecs sur le champ de bataille de Troie — l'un des rares récits où même le maître de l'Olympe cède à un pouvoir plus discret que le sien. Une autre tradition le dit épris du berger Endymion (voir la fiche « Endymion »), à qui il laissa les yeux entrouverts durant son sommeil éternel, pour ne jamais cesser de le contempler.",
    "Dans le Tarot, Hypnos est la figure du 4 de Coupes, où un dormeur assis sous un arbre reste indifférent aux coupes qui l'entourent, jusqu'à ce qu'une main lui tende depuis un nuage une quatrième offrande qu'il ne voit pas non plus : son sommeil n'est jamais malveillant, mais il peut, comme ici, faire manquer ce qui est pourtant offert.",
  ],
  "orphée": [
    "Orphée fut le plus grand musicien jamais né, fils du roi thrace Œagre et de la Muse Calliope — certaines traditions le disent plutôt fils d'Apollon lui-même, qui lui offrit une lyre d'or et lui enseigna à en jouer (voir la fiche « Lyre »). Son chant, dit-on, charmait aussi bien les bêtes sauvages que les arbres et les rochers, qui se déplaçaient pour venir l'entendre.",
    "Le jour de son mariage avec la nymphe Eurydice — cérémonie que le dieu Hyménée lui-même présida, sa torche ne cessant de fumer sans jamais prendre flamme, mauvais présage resté sans réponse (voir la fiche « Hyménée ») —, celle-ci fut mordue par un serpent en fuyant un satyr et mourut sur le coup : la joie des noces basculant en un instant dans le deuil.",
    "Fou de chagrin, Orphée descendit aux Enfers avec sa seule lyre : son chant adoucit le cœur inflexible d'Hadès et de Perséphone (voir les fiches « Hadès » et « Perséphone »), qui consentirent à lui rendre Eurydice, à une condition — marcher devant elle sans se retourner avant d'avoir atteint la lumière du jour. Presque arrivé, incapable de résister au doute, il se retourna un instant trop tôt : elle disparut une seconde fois, cette fois pour toujours.",
    "Dans le Tarot, Orphée est la figure du 5 de Coupes, où une silhouette en deuil contemple trois coupes renversées sans voir les deux qui tiennent encore debout derrière elle : son regard, comme le sien vers Eurydice au sortir des Enfers, se fixe sur la perte au moment précis où il ne fallait plus se retourner.",
  ],
  "hyménée": [
    "Hyménée personnifie le chant et le rite du mariage. La tradition la plus répandue en fait le fils d'Apollon et d'une Muse — Clio, Calliope, Uranie ou Terpsichore selon les versions —, même si d'autres récits le disent plutôt fils de Dionysos, ou de Dionysos et d'Aphrodite. On le représente jeune, une couronne de fleurs sur la tête et une torche allumée à la main, celle-là même qui éclaire le cortège nocturne menant la mariée jusqu'à son nouvel époux (voir la fiche « Torches »).",
    "Les Grecs croyaient sa présence indispensable à toute noce : sans lui, le mariage était voué au malheur — on l'invoquait donc à voix haute pendant la cérémonie, dans un chant qui portait justement son nom, l'hyménée, entonné tout au long du cortège menant l'épousée à sa nouvelle maison.",
    "Sa présence, pourtant, ne garantit pas toujours un présage favorable. Ovide raconte qu'appelé aux noces d'Orphée et Eurydice, Hyménée s'y rendit bien, mais sans prononcer les paroles rituelles ni afficher son visage joyeux : sa torche ne fit que fumer sans jamais vouloir prendre, quels que soient les efforts pour l'agiter — un présage qui, dans les faits, se révéla en dessous de la vérité (voir la fiche « Orphée »).",
    "Une tradition plus tardive veut aussi qu'il ait perdu, aux noces de Dionysos et d'Ariane sur l'île de Naxos, une voix pourtant réputée aussi belle que celle de son père Apollon (voir la fiche « Ariane ») — comme si présider aux noces des autres avait, plus d'une fois, un prix pour lui-même.",
    "Dans le Tarot, Hyménée est la figure du 10 de Coupes, où une famille réunie lève les bras vers un arc-en-ciel de dix coupes : cette carte est la fête qu'il préside dans ce qu'elle a de plus réussi, cette joie qui se transmet des mariés jusqu'aux enfants qui dansent déjà sous le même arc.",
  ],
};

/* ===================== ÉTAT ===================== */

let journal = JSON.parse(localStorage.getItem("arcanes-journal") || "[]");
let route = "home";

let tirageState = JSON.parse(localStorage.getItem("arcanes-tirage-state") || "null") || {
  question: "", spreadType: null, spread: null, picks: [], notes: "", saved: false, savedIndex: null, aiReading: null, aiStatus: "idle"
};
// Compatibilité : un tirage en cours sauvegardé avant l'ajout des types de tirage n'a pas
// de spreadType — on le traite comme le tirage général (3 cartes), déjà en cours.
if(tirageState.spread && !tirageState.spreadType) tirageState.spreadType = "general";
function saveTirageState(){ localStorage.setItem("arcanes-tirage-state", JSON.stringify(tirageState)); }

// Journal des rêves (onglet Rêves) — même principe de persistance que journal/tirageState
// ci-dessus, entièrement séparé du Journal des tirages (voir la section "RÊVES" plus bas).
let dreams = JSON.parse(localStorage.getItem("delphesDreams") || "[]");
let dreamState = JSON.parse(localStorage.getItem("delphesDreamState") || "null") || {
  text: "", analysis: null, saved: false, savedId: null, aiStatus: "idle"
};
function saveDreamState(){ localStorage.setItem("delphesDreamState", JSON.stringify(dreamState)); }
function saveDreams(){ localStorage.setItem("delphesDreams", JSON.stringify(dreams)); }

/* ===================== UTILITAIRES ===================== */

function escapeHTML(value){
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[ch]));
}

// Respecte la préférence système "réduire les animations" pour les effets purement
// décoratifs déclenchés en JS (particules, ripple…) — les transitions CSS "fonctionnelles"
// (flip de carte, transition d'écran) sont, elles, gérées directement par la media query
// prefers-reduced-motion dans styles.css.
function prefersReducedMotion(){
  try{ return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  catch{ return false; }
}

// Fait apparaître un texte mot par mot façon oracle qui parle (voir .tword dans
// styles.css) : le texte complet est bien présent dans le DOM dès le rendu — accessible,
// sélectionnable, copiable — seule l'opacité de chaque mot est animée en cascade via CSS
// (délai calculé ici, appliqué en inline style). La durée totale est plafonnée : c'est le
// nombre de mots qui détermine le délai par mot, jamais l'inverse, pour qu'un texte long
// ne traîne jamais.
function typewriterHTML(paragraphs){
  if(prefersReducedMotion()) return paragraphs.map(p=>`<p>${escapeHTML(p)}</p>`).join("");
  const totalWords = paragraphs.reduce((n,p)=>n + p.split(/\s+/).filter(Boolean).length, 0);
  const perWordMs = Math.max(12, Math.min(45, 1300 / Math.max(1, totalWords)));
  let wordIndex = 0;
  return paragraphs.map(p => {
    const spans = p.split(/\s+/).filter(Boolean).map(w => {
      const delay = Math.round(wordIndex * perWordMs);
      wordIndex++;
      return `<span class="tword" style="animation-delay:${delay}ms">${escapeHTML(w)}</span>`;
    }).join(" ");
    return `<p>${spans}</p>`;
  }).join("");
}

function allCards(){
  const cards = MAJORS.map(x => [...x]);
  for(const [suit, rows] of Object.entries(COURTS)){
    // x[4] : symboles propres à cette figure de cour (voir COURTS ci-dessus), utilisés par
    // cardsForSymbol() pour la peupler dans "Cartes concernées" — jusqu'ici toujours vide
    // ("") faute de ce champ, ce qui empêchait TOUTE figure de cour d'apparaître dans
    // n'importe quel symbole, quel qu'il soit.
    rows.forEach(x => cards.push([x[0],x[1],x[2],x[3],"court",x[4]||"",suit]));
  }
  for(const [suit, meta] of Object.entries(SUITS)){
    for(let n=1;n<=10;n++){
      const k=NUMBER_KEYS[n];
      const cardName = `${n===1?"As":n} de ${suit}`;
      // NUMBER_CARD_SYMBOLS permet à une carte numérale précise (une fois illustrée avec sa
      // propre figure mythologique, voir NUMBER_CARD_DEITY) d'avoir ses propres symboles
      // plutôt que la formule générique ci-dessous, partagée par toutes les cartes du même
      // rang ou de la même enseigne — sinon impossible, par construction, de relier par
      // exemple "Artémis" à la seule carte "2 de Bâtons" sans l'associer aussi à "2 de
      // Coupes", "2 de Épées" et "2 de Deniers", ou à tout le reste des Bâtons.
      const symbols = NUMBER_CARD_SYMBOLS[cardName] || `${k[1]} · ${meta[3]}`;
      cards.push([
        cardName, k[0], meta[1],
        `${k[2]} · ${meta[2]}`, "number",
        symbols, suit, n
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
  // Les illustrations sont déjà des cartes complètes (nom + déité intégrés au dessin) :
  // pas besoin de ré-afficher un libellé HTML par-dessus pour ces cartes-là.
  return `<div class="tarot-card ${cls} ${hasImg?"has-img":""}" data-card="${encodeURIComponent(JSON.stringify(c))}">
    <div class="frame">
      ${hasImg ? "" : `<div class="card-no">${escapeHTML(c[0])}</div>`}
      ${cardVisual(c)}
      ${hasImg ? "" : `<div class="card-name">${escapeHTML(c[1])}</div>`}
      ${hasImg ? "" : `<div class="card-sub">${escapeHTML(c[3]||"")}</div>`}
    </div>
  </div>`;
}

// Carte de la pioche : dos + face en carton retourné (flip 3D CSS, voir .flip-slot dans
// styles.css). Tant que la carte n'est pas choisie, la face reste vide (aucune image
// chargée) — c'est bindDeck() qui l'injecte au clic, juste avant de lancer le flip, pour
// ne jamais précharger l'illustration des cartes de la pioche jamais retournées.
function cardBackHTML(idx, card, revealed){
  const cls = card[4]==="major" ? "major" : (SUITS[card[6]]?.[0] || "major");
  return `<div class="flip-slot ${revealed?"flipped":""}" data-pick="${idx}">
    <div class="flip-inner">
      <div class="flip-face flip-back"><div class="back-frame"><span class="back-glyph">✦</span></div></div>
      <div class="flip-face flip-front">${revealed ? cardHTML(card, cls) : ""}</div>
    </div>
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

// `positionLabel` n'est utilisé que pour les tirages autres que "general" (qui garde sa
// propre narration en 3 temps, plus travaillée) — cf. currentReadingTexts().
function interpretationFor(card, index, domain, positionLabel){
  const name = cardFullName(card);
  const core = (card[3]||"").split("·")[0].trim().toLowerCase();
  const symbols = (card[5]||"").split("·").map(s=>s.trim()).filter(Boolean);
  const hint = symbols.length ? ` Le symbole de ${symbols[0]} en dit long ici.` : "";
  if(positionLabel) return `Pour « ${positionLabel} », ${name} met en avant ${core}.${hint}`;
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

// Synthèse de repli pour les tirages autres que "general" (1, 10 ou 12 cartes) — plus
// sobre que synthesisParagraphs (pensée pour exactement 3 cartes), utilisée seulement
// quand la lecture IA échoue ou dépasse le délai.
function synthesisParagraphsGeneric(question, cards, domain){
  const subject = extractSubject(question);
  const hasSubject = subject.length > 3;
  const subjectPhrase = hasSubject ? subject : domain.label;
  const names = cards.map(c=>cardFullName(c));
  if(names.length === 1){
    return [`Face à ${hasSubject ? "ta question — " + subjectPhrase : subjectPhrase}, ${names[0]} donne une réponse claire, à prendre comme une direction plutôt qu'un verdict absolu.`];
  }
  const middle = names.slice(1,-1).join(", ") || "ce qui se joue entre les deux";
  return [
    `Face à ${hasSubject ? "ta question — " + subjectPhrase : subjectPhrase}, ces ${names.length} cartes dessinent ensemble une trajectoire plutôt qu'une suite de réponses isolées.`,
    `Prises dans l'ordre, elles vont de ${names[0]} à ${names[names.length-1]}, en passant par ${middle}.`,
  ];
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

// Profil astral (prénom + thème natal), enregistré localement une fois calculé — voir
// showProfilAstral(). Jamais envoyé nulle part sauf, avec l'accord implicite de son
// existence, en résumé minimal à /api/reading pour nuancer une lecture (voir
// profileForReading ci-dessous et le bloc "Contexte sur la personne" dans api/reading.js).
function getProfile(){
  try{ return JSON.parse(localStorage.getItem("delphesProfile") || "null"); }
  catch{ return null; }
}
function saveProfileData(data){ localStorage.setItem("delphesProfile", JSON.stringify(data)); }

/* ===================== PROGRESSION PERSONNELLE (Apprendre) ===================== */
// Suivi de ce qui a réellement été consulté en détail — pas seulement tiré — dans trois
// catégories : cartes, figures mythologiques, symboles (nombres inclus). Chaque id n'est
// compté qu'une fois (Set), quel que soit le nombre de fois où on revisite la fiche.
// Renvoie true si c'est la toute première fois que cette fiche est consultée (utilisé
// pour le petit flash de découverte, voir discoveryFX() ci-dessous) — false sinon, y
// compris pour les appels existants qui ignorent la valeur de retour.
function markSeen(bucket, id){
  const key = "delphesSeen_" + bucket;
  let list;
  try{ list = JSON.parse(localStorage.getItem(key) || "[]"); }catch{ list = []; }
  if(!list.includes(id)){
    list.push(id);
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  }
  return false;
}
// Petit encart "Première découverte" affiché en haut d'une fiche jamais consultée avant
// (voir markSeen() ci-dessus) — juste un flash bref et purement décoratif, jamais
// bloquant, pour rendre la progression (déjà trackée, voir learningProgress()) un peu
// plus sensorielle qu'une barre qui se remplit en silence.
function discoveryFX(){
  return `<div class="discovery-badge">✦ Première découverte</div>`;
}

// Filigrane statique de constellation posé derrière un ".hero" (voir apprendre() et
// symboles()) — purement décoratif, un seul motif fixe (pas besoin d'en varier le tracé).
function constellationHTML(){
  return `<svg class="constellation-bg" viewBox="0 0 300 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <polyline points="20,90 70,40 130,60 190,20 250,55 280,30" fill="none" stroke="var(--gold)" stroke-width="0.6" opacity="0.4"/>
    <g fill="var(--gold-bright)">
      <circle cx="20" cy="90" r="2"/><circle cx="70" cy="40" r="2.4"/><circle cx="130" cy="60" r="1.8"/>
      <circle cx="190" cy="20" r="2.2"/><circle cx="250" cy="55" r="1.6"/><circle cx="280" cy="30" r="2"/>
    </g>
  </svg>`;
}

function seenCount(bucket){
  try{ return (JSON.parse(localStorage.getItem("delphesSeen_"+bucket) || "[]")).length; }
  catch{ return 0; }
}

// Libellés humains des codes stockés pour "Situation amoureuse" (voir renderProfilForm()) —
// utilisés pour composer lifeContextFor() ci-dessous, jamais affichés tels quels ailleurs.
const LOVE_STATUS_LABELS = {
  celibataire: "célibataire",
  en_couple: "en couple",
  marie: "marié·e ou pacsé·e",
  divorce: "divorcé·e ou séparé·e",
  veuf: "veuf ou veuve",
};

// Contexte de vie optionnel (métier, situation amoureuse, enfants, centres d'intérêt) —
// retour direct d'utilisatrice : "le métier a une grande importance pour l'interprétation
// des rêves, et pour les tirages tarot aussi". Tous les champs sont individuellement
// optionnels ("Préfère ne pas préciser" par défaut, voir renderProfilForm()) ; renvoie null
// si absolument rien n'est renseigné, pour ne rien ajouter au prompt dans ce cas. Factorisé
// ici pour être réutilisé par profileForReading()/profileForPortrait() ci-dessous et par le
// résumé envoyé à /api/dream (voir profileForDream()).
function lifeContextFor(saved){
  if(!saved) return null;
  const occupation = typeof saved.occupation === "string" && saved.occupation ? saved.occupation : null;
  const loveStatus = saved.loveStatus && LOVE_STATUS_LABELS[saved.loveStatus] ? LOVE_STATUS_LABELS[saved.loveStatus] : null;
  const hasChildren = saved.hasChildren === "oui" ? true : saved.hasChildren === "non" ? false : null;
  const interests = typeof saved.interests === "string" && saved.interests ? saved.interests : null;
  if(!occupation && !loveStatus && hasChildren===null && !interests) return null;
  return { occupation, loveStatus, hasChildren, interests };
}

// Résumé minimal du profil enregistré, prêt à envoyer à /api/reading — null si aucun
// profil n'est enregistré (dans ce cas la lecture se comporte exactement comme avant).
function profileForReading(){
  const p = getProfile();
  if(!p) return null;
  const numMeaning = NUMBER_KEYS[p.nameNumber];
  const py = personalYearNumber(p.birthDate);
  const pyMeaning = NUMBER_KEYS[py];
  return {
    firstName: p.firstName,
    nameNumber: p.nameNumber,
    nameNumberMeaning: numMeaning ? numMeaning[0] : null,
    sunSign: p.astral?.sunSign || null,
    moonSign: p.astral?.moonSign || null,
    ascendantSign: p.astral?.ascendant?.sign || null,
    personalYear: py,
    personalYearMeaning: pyMeaning ? pyMeaning[0] : null,
    lifeContext: lifeContextFor(p),
  };
}

// Résumé du profil enregistré, prêt à envoyer à /api/portrait (voir ensurePortrait()) —
// null si aucun profil astral n'est enregistré. Contrairement à profileForReading()
// (envoyé à chaque lecture), n'est envoyé qu'une seule fois, la première fois que le
// portrait est généré.
function profileForPortrait(saved){
  if(!saved || !saved.astral) return null;
  const a = saved.astral;
  const numMeaning = NUMBER_KEYS[saved.nameNumber];
  const py = personalYearNumber(saved.birthDate);
  const pyMeaning = NUMBER_KEYS[py];
  const deity = tutelaryDeity(saved);
  const topAspects = (a.aspects||[])
    .slice()
    .sort((x,y)=>x.orb-y.orb)
    .slice(0,3)
    .map(asp=>({
      type: asp.type,
      a: (PLANET_LABELS[asp.bodies[0]]||"").replace(/^[☉☽]\s*/,""),
      b: (PLANET_LABELS[asp.bodies[1]]||"").replace(/^[☉☽]\s*/,""),
    }));
  return {
    firstName: saved.firstName,
    gender: saved.gender || null, // "f" | "m" | null (préfère ne pas préciser) — pour accorder correctement le texte généré
    sunSign: a.sunSign || null,
    moonSign: a.moonSign || null,
    ascendantSign: a.ascendant?.sign || null,
    nameNumber: saved.nameNumber,
    nameNumberMeaning: numMeaning ? numMeaning[0] : null,
    personalYear: py,
    personalYearMeaning: pyMeaning ? pyMeaning[0] : null,
    tutelaryDeity: deity ? deity.deityName : null,
    topAspects,
    lifeContext: lifeContextFor(saved),
  };
}

// Résumé du profil enregistré, prêt à envoyer à /api/astral-text (voir ensureAstralText())
// — null si aucun profil astral n'est enregistré. Contrairement à profileForPortrait()
// (un paragraphe d'ensemble), ce résumé sert à générer UNE phrase personnalisée par
// planète/ascendant/aspect/nombre du prénom, pour remplacer les phrases toutes faites
// affichées sous chaque case du Profil astral (voir natalPlanetSentence() etc., gardées
// comme repli tant que ce texte n'est pas encore généré ou en cas d'échec). Les aspects
// sont plafonnés aux 10 plus exacts (par orbe) pour garder l'appel raisonnable — les
// aspects au-delà retombent simplement sur la phrase générique.
const ASTRAL_TEXT_MAX_ASPECTS = 10;
function profileForAstralText(saved){
  if(!saved || !saved.astral) return null;
  const a = saved.astral;
  const numMeaning = NUMBER_KEYS[saved.nameNumber];
  const deity = tutelaryDeity(saved);
  const planets = PLANET_ORDER
    .map(key => {
      const b = a.bodies?.[key];
      if(!b || !b.sign) return null;
      return { key, label: (PLANET_LABELS[key]||key).replace(/^[☉☽]\s*/,""), sign: b.sign, house: b.house||null, retrograde: !!b.retrograde };
    })
    .filter(Boolean);
  // key : identifiant stable (mêmes clés de corps que a.bodies, jamais traduites) pour que
  // renderProfilResults() puisse retrouver le texte de CET aspect précis quel que soit
  // l'ordre — a.aspects n'est pas trié par orbe à l'affichage, contrairement à cette liste.
  const aspects = (a.aspects||[])
    .slice()
    .sort((x,y)=>x.orb-y.orb)
    .slice(0, ASTRAL_TEXT_MAX_ASPECTS)
    .map(asp=>({
      key: `${asp.bodies[0]}_${asp.type}_${asp.bodies[1]}`,
      type: asp.type,
      a: (PLANET_LABELS[asp.bodies[0]]||"").replace(/^[☉☽]\s*/,""),
      b: (PLANET_LABELS[asp.bodies[1]]||"").replace(/^[☉☽]\s*/,""),
    }));
  // Arcanes majeurs liés au thème (Soleil/Lune/Ascendant, voir majorLinksFor()) — envoyés
  // avec le nom de leur dieu et leurs mots-clés (déjà connus localement, jamais à deviner
  // par l'IA) pour que majorLinksText ci-dessous puisse s'appuyer dessus sans inventer de
  // sens de carte. Voir la section "Arcanes majeurs liés à ton profil astral" dans profil().
  // Une entrée PAR POINT (Soleil/Lune/Ascendant), jamais groupée par carte comme le fait
  // majorLinksFor() pour la grille visuelle : être Soleil en tel signe n'apporte pas la même
  // chose qu'être Lune ou Ascendant dans ce même signe (voir POINT_DOMAIN_HINT ci-dessus),
  // même quand les deux tombent sur la même carte — l'IA doit donc écrire un paragraphe
  // distinct par point, jamais un seul paragraphe fusionné qui gommerait la différence.
  const majorLinks = majorLinksFor(a);
  const majorLinksByPoint = [];
  (majorLinks||[]).forEach(l=>{
    const myth = ZODIAC_MAJOR_MYTH[l.sign];
    l.labels.forEach(label=>{
      majorLinksByPoint.push({
        point: label,
        pointDomain: POINT_DOMAIN_HINT[label] || null,
        sign: l.sign,
        cardName: l.card[0],
        deityName: l.card[1],
        keywords: l.card[3],
        mythAstro: myth ? myth.astro : null,
        mythFact: myth ? myth.myth : null,
      });
    });
  });
  return {
    firstName: saved.firstName,
    gender: saved.gender || null, // "f" | "m" | null (préfère ne pas préciser) — pour accorder correctement le texte généré
    nameNumber: saved.nameNumber,
    nameNumberMeaning: numMeaning ? numMeaning[0] : null,
    ascendantSign: a.ascendant?.sign || null,
    planets,
    aspects,
    tutelaryDeity: deity ? {
      name: deity.deityName,
      note: deity.note,
      contributors: (deity.contributors||[]).map(c=>({ label: c.label, sign: c.sign, cardName: c.cardName || null, precise: !!c.precise })),
    } : null,
    majorLinks: majorLinksByPoint.length ? majorLinksByPoint : null,
  };
}

// Tendances dégagées du Journal (carte la plus fréquente, thème de question le plus
// fréquent) — null tant qu'il n'y a pas assez de tirages enregistrés pour qu'une
// tendance ait un sens (sinon un seul tirage "deviendrait" une tendance à 100%).
const JOURNAL_TRENDS_MIN_ENTRIES = 3;
function journalTrends(){
  if(journal.length < JOURNAL_TRENDS_MIN_ENTRIES) return null;

  const cardCounts = {};
  journal.forEach(j=> (j.cards||[]).forEach(name=>{ cardCounts[name] = (cardCounts[name]||0) + 1; }));
  const topCardEntry = Object.entries(cardCounts).sort((a,b)=>b[1]-a[1])[0];
  const topCard = (topCardEntry && topCardEntry[1] >= 2) ? { name: topCardEntry[0], count: topCardEntry[1] } : null;

  const domainCounts = {};
  journal.forEach(j=>{
    if(!j.question) return;
    const d = detectDomain(j.question);
    if(d === DEFAULT_DOMAIN) return; // pas assez spécifique pour compter comme "tendance"
    domainCounts[d.label] = (domainCounts[d.label]||0) + 1;
  });
  const topDomainEntry = Object.entries(domainCounts).sort((a,b)=>b[1]-a[1])[0];
  const topDomain = (topDomainEntry && topDomainEntry[1] >= 2) ? { label: topDomainEntry[0], count: topDomainEntry[1] } : null;

  if(!topCard && !topDomain) return null;
  return { totalReadings: journal.length, topCard, topDomain };
}

// Nombre minimum de tirages enregistrés avant que l'Animal représentatif (ci-dessous) ne se
// calcule. Volontairement plus élevé que JOURNAL_TRENDS_MIN_ENTRIES (3, pour une simple
// tendance affichée dans le Journal) : cette fonctionnalité prétend refléter un vrai
// comportement récurrent, pas une coïncidence sur quelques tirages.
const REPRESENTATIVE_ANIMAL_MIN_READINGS = 10;

// Fonctionnalité premium (voir showProfilResults()/renderProfilResults()) : simple
// interrupteur local, propre à cet appareil — un place-tenant pour un futur vrai système de
// compte/abonnement, qui n'existe pas aujourd'hui (l'app reste 100% locale, voir le
// README). À remplacer par une vraie vérification d'abonnement le jour où ce système
// existera ; ne pas construire de logique métier qui suppose que ce flag reflète un
// paiement réel.
// Défaut "premium activé" tant qu'aucun vrai système de paiement n'existe (voir README,
// section « Découpage gratuit / premium ») : les personnes qui testent déjà l'app ne
// doivent voir AUCUNE régression ni avoir la moindre manip à faire quand ce découpage a
// été introduit — seul un choix explicite ("0", via la case à cocher du Profil astral)
// bascule sur l'expérience gratuite. Le jour du vrai lancement payant (App Store), ce
// défaut sera inversé pour que le mode gratuit redevienne l'état de repli normal.
function isPremiumEnabled(){ return localStorage.getItem("delphesPremium") !== "0"; }
function setPremiumEnabled(on){ localStorage.setItem("delphesPremium", on ? "1" : "0"); }

// Découpage gratuit/premium défini avec l'utilisateur en vue d'une publication App Store
// (voir aussi le README) : gratuit = 1 tirage général par jour, la carte du jour, un
// échantillon réduit de la bibliothèque (5 symboles, 4 figures mythologiques, 2 arcanes
// majeurs, les 4 Rois de figures de cour — aucune carte numérale), le Journal et ses
// statistiques en entier, le Profil astral sans aucune explication écrite (ni divinité
// tutélaire, ni Animal représentatif). Premium = tout le reste. Comme pour
// isPremiumEnabled() ci-dessus, ce n'est qu'un découpage appliqué au flag local — seule
// isPremiumEnabled() aura besoin de changer le jour où un vrai système d'achat existera.
const FREE_MAJORS = new Set(["Le Mat", "I — Le Bateleur"]);
const FREE_COURTS = new Set(["Roi de Bâtons", "Roi de Coupes", "Roi d'Épées", "Roi de Deniers"]);
const FREE_SYMBOLS = new Set(["abeille", "aigle", "ailes", "air", "araignée"]); // 5 premiers par ordre alphabétique de la Bibliothèque symbolique
const FREE_FIGURES = new Set(["achille", "actéon", "agon", "aletheia"]); // 4 premières par ordre alphabétique de Figures mythologiques
const FREE_SPREAD_TYPES = new Set(["general"]);

// L'éclairage mythologique d'une carte (majeur/figure de cour) est gratuit seulement pour
// le petit échantillon ci-dessus ; les cartes numérales en sont toutes exclues (aucune
// exception dans ce découpage, même les cartes déjà illustrées avec leur propre figure).
function isCardMythFree(c){
  if(c[4]==="major") return FREE_MAJORS.has(c[0]);
  if(c[4]==="court") return FREE_COURTS.has(c[0]);
  return false;
}
function isSymbolLoreFree(id){ return FREE_SYMBOLS.has(id); }
function isFigureLoreFree(id){ return FREE_FIGURES.has(id); }
function isSpreadTypeFree(key){ return FREE_SPREAD_TYPES.has(key); }

// Un seul tirage général gratuit par jour civil (heure locale) sans le mode premium — clé
// dédiée en localStorage, comparée à la date du jour à chaque appel (donc remise à zéro
// automatiquement au changement de date, sans tâche de fond à programmer).
function hasUsedFreeGeneralReadingToday(){
  return localStorage.getItem("delphesFreeGeneralDate") === new Date().toDateString();
}
function markFreeGeneralReadingUsed(){
  localStorage.setItem("delphesFreeGeneralDate", new Date().toDateString());
}
// Peut-on lancer un NOUVEAU tirage de ce type maintenant (mode premium, sinon type gratuit
// et pas déjà utilisé aujourd'hui) ? Ne s'applique qu'au lancement d'un tirage — continuer
// ou consulter un tirage déjà en cours n'est jamais concerné.
function canStartSpread(key){
  if(isPremiumEnabled()) return true;
  if(!isSpreadTypeFree(key)) return false;
  return !hasUsedFreeGeneralReadingToday();
}

// Bloc "verrouillé" réutilisé partout où une explication est premium — même esprit visuel
// que l'ancien bloc dédié de l'Animal représentatif (désormais généralisé ici).
function premiumLockHTML(message){
  return `<div class="symbol-list" style="margin-top:14px">
    <div class="symbol" style="text-align:center">
      <div style="font-size:32px">🔒</div>
      <b>Fonctionnalité premium</b>
      <br><small>${escapeHTML(message)}</small>
    </div>
  </div>`;
}

// Détermine l'Animal représentatif : le signe solaire du thème natal indique un premier
// animal (SIGN_ANIMAL), affiné par le domaine de question le plus fréquent du Journal
// (DOMAIN_ANIMAL, via journalTrends().topDomain) une fois qu'assez de tirages ont été
// enregistrés pour que ce domaine soit un vrai motif plutôt qu'une coïncidence. Fonctionnalité
// premium (voir isPremiumEnabled()) : renvoie toujours { locked: true, ... } tant qu'elle
// n'est pas activée ou que le seuil de tirages n'est pas atteint, pour que l'écran puisse
// afficher un aperçu (« encore N tirages ») plutôt que rien.
function representativeAnimal(saved){
  const premium = isPremiumEnabled();
  const readingsCount = journal.length;
  const unlocked = premium && readingsCount >= REPRESENTATIVE_ANIMAL_MIN_READINGS;
  if(!unlocked) return { locked: true, premium, readingsCount, readingsNeeded: REPRESENTATIVE_ANIMAL_MIN_READINGS };

  const sunSign = saved?.astral?.bodies?.sun?.sign;
  const astralAnimalId = sunSign ? SIGN_ANIMAL[sunSign] : null;
  // journal.length >= REPRESENTATIVE_ANIMAL_MIN_READINGS (10) >= JOURNAL_TRENDS_MIN_ENTRIES
  // (3), donc journalTrends() ne peut jamais être null ici pour manque de tirages.
  const trends = journalTrends();
  const domainAnimalId = (trends && trends.topDomain) ? DOMAIN_ANIMAL[trends.topDomain.label] : null;

  // Le domaine de question, plus récent et plus "vécu", prime quand il tranche ; le thème
  // astral (fixe depuis la naissance) sert de repli tant qu'aucun sujet ne se dégage
  // clairement des tirages enregistrés.
  const animalId = domainAnimalId || astralAnimalId;
  if(!animalId) return { locked: false, animal: null }; // débloqué mais rien à afficher pour l'instant (ni profil astral, ni domaine net)

  const symbol = SYMBOL_LIBRARY[animalId];
  const matched = !!(astralAnimalId && domainAnimalId && astralAnimalId === domainAnimalId);
  // Explication toujours locale/déterministe (pas d'appel IA pour cette fonctionnalité,
  // volontairement plus légère que la divinité tutélaire).
  let source;
  if(matched) source = "ton thème astral et tes questions les plus fréquentes se rejoignent sur cet animal";
  else if(domainAnimalId) source = `surtout tes questions les plus fréquentes (${trends.topDomain.label})`;
  else source = "ton thème astral, en attendant qu'un sujet se dégage plus nettement de tes tirages";

  return { locked: false, animal: { id: animalId, label: symbol.label, icon: symbol.icon, desc: symbol.desc, matched, source } };
}

// Résumé minimal du rêve le plus récent, prêt à envoyer à /api/reading (voir
// generateAIReading()) — retour direct d'utilisatrice : les tirages et les rêves doivent
// pouvoir s'éclairer l'un l'autre, dans les deux sens (voir recentReadingForDream() plus bas
// pour le sens inverse). Seulement le rêve le plus RÉCENT (dreams est trié du plus récent au
// plus ancien) et seulement s'il date de moins de RECENT_DREAM_MAX_DAYS jours — au-delà, il
// n'a plus grand-chose à voir avec la question posée aujourd'hui. `id` sert de repère de
// fraîcheur (voir bindDreamForm() : id = String(Date.now()) à la création, jamais recalculé
// sur une modification) car `date` n'est qu'une chaîne déjà formatée (toLocaleString), pas
// exploitable pour un calcul d'ancienneté. N'envoie qu'un court extrait (même troncature que
// dreamJournalView()), jamais le récit complet.
const RECENT_DREAM_MAX_DAYS = 7;
function recentDreamForReading(){
  if(!dreams.length) return null;
  const d = dreams[0];
  if(!d.text || !d.text.trim()) return null;
  const ts = Number(d.id);
  if(!Number.isFinite(ts) || (Date.now() - ts) > RECENT_DREAM_MAX_DAYS*24*60*60*1000) return null;
  return { date: d.date, excerpt: d.text.length>140 ? d.text.slice(0,140).trim()+"…" : d.text.trim() };
}

// Résumé minimal des tendances du Journal, prêt à envoyer à /api/reading — null si pas
// (encore) de tendance dégagée (dans ce cas la lecture se comporte exactement comme avant).
function journalTrendsForReading(){
  const t = journalTrends();
  if(!t) return null;
  return {
    topCard: t.topCard ? t.topCard.name : null,
    topDomain: t.topDomain ? t.topDomain.label : null,
  };
}

// Mémoire du Journal : est-ce qu'une des cartes tirées aujourd'hui est déjà apparue dans un
// tirage précédent sur un sujet proche (même domaine détecté par detectDomain) ? `journal`
// est trié du plus récent au plus ancien (unshift à l'enregistrement), donc le premier
// match trouvé est le plus récent. Contrairement à journalTrends() (une tendance globale),
// c'est un rappel ponctuel, propre à CE tirage précis — d'où un nom et une fonction séparés.
// Ne renvoie jamais le texte de la question passée (vie privée) : seulement le nom de la
// carte, sa date, et le libellé du domaine détecté.
function cardMemory(chosenCards, question){
  const domain = detectDomain(question);
  if(domain === DEFAULT_DOMAIN) return null; // pas assez spécifique pour un rappel pertinent
  const chosenNames = new Set(chosenCards.map(c=>c[0]));
  for(const j of journal){
    if(!j.question) continue;
    if(detectDomain(j.question) !== domain) continue;
    const match = (j.cards||[]).find(name => chosenNames.has(name));
    if(match) return { cardName: match, date: j.date, domainLabel: domain.label };
  }
  return null;
}

// Statistiques complètes sur le Journal — page dédiée (voir statsView()/showStats()),
// distincte de journalTrends() qui ne sert que d'indice discret pour la lecture IA.
// Contrairement à journalTrends() (qui exige JOURNAL_TRENDS_MIN_ENTRIES avant de dégager
// une "tendance"), s'affiche dès le premier tirage enregistré : ce sont des comptages
// bruts, lisibles quel que soit l'échantillon.
// `entries` optionnel : sous-ensemble du Journal à analyser (par défaut, le Journal
// entier) — réutilisé tel quel par journalStatsSince() pour ne regarder que l'année
// écoulée dans la rétrospective annuelle, sans dupliquer cette logique.
function journalStats(entries){
  entries = entries || journal;
  if(!entries.length) return null;

  const cardCounts = {};
  const drawnNames = new Set();
  let majorDraws = 0, minorDraws = 0, totalDraws = 0;
  entries.forEach(j=>{
    (j.cards||[]).forEach(name=>{
      cardCounts[name] = (cardCounts[name]||0) + 1;
      drawnNames.add(name);
      totalDraws++;
      const card = CARDS.find(c=>c[0]===name);
      if(card && card[4]==="major") majorDraws++; else minorDraws++;
    });
  });
  const topCards = Object.entries(cardCounts)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5)
    .map(([name,count])=>({ name, count }));

  const domainCounts = {};
  entries.forEach(j=>{
    if(!j.question) return;
    const d = detectDomain(j.question);
    domainCounts[d.label] = (domainCounts[d.label]||0) + 1;
  });
  const domainDistribution = Object.entries(domainCounts)
    .sort((a,b)=>b[1]-a[1])
    .map(([label,count])=>({ label, count }));

  // Répartition par type de tirage — les entrées enregistrées avant l'existence des types
  // de tirage (Feature 4) n'ont pas de spreadType : "general" est un repli correct
  // puisque c'était alors le seul type possible (voir saveDraw() dans bind()).
  const spreadCounts = {};
  entries.forEach(j=>{
    const key = (j.spreadType && SPREADS[j.spreadType]) ? j.spreadType : "general";
    spreadCounts[key] = (spreadCounts[key]||0) + 1;
  });
  const spreadDistribution = Object.keys(SPREADS)
    .filter(k=>spreadCounts[k])
    .map(k=>({ key:k, name:SPREADS[k].name, glyph:SPREADS[k].glyph, count:spreadCounts[k] }))
    .sort((a,b)=>b.count-a.count);

  // Affinités mythologiques : quelles divinités et quels symboles reviennent le plus
  // souvent dans les cartes tirées — un profil qui se construit et s'affine à mesure que le
  // Journal grossit, contrairement à la divinité tutélaire ou l'Animal représentatif
  // (calculés une fois pour toutes à partir du thème astral). Indépendant de
  // domainDistribution ci-dessus (qui regarde les QUESTIONS posées, pas les cartes tirées).
  const deityCounts = {}, symbolCounts = {};
  entries.forEach(j=>{
    (j.cards||[]).forEach(name=>{
      const card = CARDS.find(c=>c[0]===name);
      if(!card) return;
      const deityId = (cardDeityLabel(card)||"").toLowerCase();
      if(DEITY_NOTES[deityId]) deityCounts[deityId] = (deityCounts[deityId]||0) + 1;
      (card[5]||"").split("·").map(s=>s.trim()).filter(Boolean).forEach(symId=>{
        if(SYMBOL_LIBRARY[symId]) symbolCounts[symId] = (symbolCounts[symId]||0) + 1;
      });
    });
  });
  const deityAffinities = Object.entries(deityCounts).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([id,count])=>({id,count}));
  const symbolAffinities = Object.entries(symbolCounts).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([id,count])=>({id,count}));

  const { streak, bestStreak } = getStreakState();

  return {
    totalReadings: entries.length,
    totalDraws,
    majorDraws, minorDraws,
    majorPercent: totalDraws ? Math.round(majorDraws/totalDraws*100) : 0,
    topCards,
    uniqueDrawnCount: drawnNames.size,
    neverDrawnCount: Math.max(0, CARDS.length - drawnNames.size),
    domainDistribution,
    spreadDistribution,
    deityAffinities, symbolAffinities,
    streak, bestStreak,
  };
}

// Date d'une entrée du Journal ("date" est un texte déjà formaté par
// toLocaleString("fr-FR"), pas une date ISO) -> objet Date, ou null si illisible. Utilisé
// uniquement pour scoper la rétrospective annuelle à "l'année écoulée" ; journalStats()
// lui-même n'a pas besoin de dates exploitables (il fonctionne sur le Journal entier).
function parseJournalDate(str){
  const m = /^(\d{2})\/(\d{2})\/(\d{4})/.exec(str||"");
  if(!m) return null;
  const d = new Date(Number(m[3]), Number(m[2])-1, Number(m[1]));
  return isNaN(d.getTime()) ? null : d;
}

// journalStats(), restreint aux entrées dont la date est postérieure ou égale à `fromDate`.
// Les entrées à la date illisible sont ignorées (repli silencieux, pas d'erreur).
function journalStatsSince(fromDate){
  const scoped = journal.filter(j=>{
    const d = parseJournalDate(j.date);
    return d && d >= fromDate;
  });
  return journalStats(scoped);
}

async function fetchAstralProfile({ date, time, place }){
  const r = await fetch("/api/astral", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": getAccessCode() },
    body: JSON.stringify({ date, time, place })
  });
  const data = await r.json().catch(()=>({}));
  if(r.status === 401){
    localStorage.removeItem("delphesAccessCode");
  }
  if(!r.ok){
    throw new Error(data.error || "Impossible de calculer le profil pour le moment.");
  }
  return data;
}

/* ===================== HOROSCOPE DU JOUR (transits vs thème natal) ===================== */
// Positions planétaires du jour (/api/transits, identiques pour tout le monde), mises en
// cache un jour entier dans localStorage — pas de rappel réseau à chaque affichage de
// l'accueil, seulement une fois par jour (même mécanique que updateStreak()/localDateKey()).
function getCachedTransits(){
  try{
    const cached = JSON.parse(localStorage.getItem("delphesTransits") || "null");
    if(cached && cached.date === localDateKey()) return cached.bodies;
  }catch{ /* cache corrompu, on retombe sur null */ }
  return null;
}
async function fetchTransits(code){
  const r = await fetch("/api/transits", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": code },
    body: JSON.stringify({})
  });
  if(r.status === 401) localStorage.removeItem("delphesAccessCode");
  if(!r.ok) throw new Error("positions du jour indisponibles");
  const data = await r.json();
  localStorage.setItem("delphesTransits", JSON.stringify({ date: localDateKey(), bodies: data.bodies }));
  return data.bodies;
}
let transitsFetchInFlight = false;
// Lance le calcul des positions du jour en tâche de fond si besoin (déjà en cache : rien
// à faire ; sinon un seul appel réseau, silencieux en cas d'échec — l'horoscope disparaît
// simplement pour aujourd'hui, rien d'autre n'est bloqué). Ne déclenche jamais le prompt du
// code d'accès depuis un simple chargement de l'accueil (voir getAccessCode()) : n'appelle
// l'API que si un code est déjà mémorisé — ce qui est garanti dès qu'un Profil astral existe,
// puisque le calculer une première fois est passé par ce même prompt.
function ensureTransits(){
  if(!getProfile()?.astral) return;
  if(getCachedTransits()) return;
  if(transitsFetchInFlight) return;
  const code = localStorage.getItem("delphesAccessCode");
  if(code === null) return;
  transitsFetchInFlight = true;
  fetchTransits(code)
    .then(()=>{ if(route==="home") render(); })
    .catch(()=>{ /* échec silencieux : pas d'horoscope aujourd'hui */ })
    .finally(()=>{ transitsFetchInFlight = false; });
}

/* ===================== PORTRAIT DE PERSONNALITÉ (généré une fois, IA) ===================== */
// Contrairement à l'horoscope du jour (recalculé chaque jour), le portrait décrit un thème
// natal qui ne change pas : généré une seule fois par /api/portrait, mis en cache
// directement dans le profil (profile.portrait) — jamais régénéré tant que le profil n'est
// pas modifié (voir bindProfilForm(), qui efface ce champ quand la date/heure/lieu change).
function getCachedPortrait(){
  const p = getProfile();
  return (p && typeof p.portrait === "string") ? p.portrait : null;
}
async function fetchPortrait(profileSummary, code){
  const r = await fetch("/api/portrait", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": code },
    body: JSON.stringify({ profile: profileSummary })
  });
  if(r.status === 401) localStorage.removeItem("delphesAccessCode");
  if(!r.ok) throw new Error("portrait indisponible");
  const data = await r.json();
  return data.portrait;
}
let portraitFetchInFlight = false;
// Même logique de discrétion qu'ensureTransits() : jamais de prompt de code d'accès
// déclenché depuis un simple affichage du Profil astral, échec silencieux (le portrait
// n'apparaît simplement pas), et un seul appel réseau tant qu'aucun portrait n'est en cache.
function ensurePortrait(){
  const p = getProfile();
  if(!p || !p.astral) return;
  if(getCachedPortrait()) return;
  if(portraitFetchInFlight) return;
  const code = localStorage.getItem("delphesAccessCode");
  if(code === null) return;
  const summary = profileForPortrait(p);
  if(!summary) return;
  portraitFetchInFlight = true;
  fetchPortrait(summary, code)
    .then(portrait=>{
      const fresh = getProfile();
      if(!fresh) return;
      fresh.portrait = portrait;
      saveProfileData(fresh);
      if(cardDetailReturnTo === showProfilAstral) showProfilAstral();
    })
    .catch(()=>{ /* échec silencieux : le portrait n'apparaît simplement pas */ })
    .finally(()=>{ portraitFetchInFlight = false; });
}

/* ===================== TEXTES ASTRAUX PERSONNALISÉS (générés une fois, IA) ===================== */
// Une phrase par planète/ascendant/aspect/nombre du prénom + l'explication de la divinité
// tutélaire, à la place des phrases toutes faites (natalPlanetSentence() etc., voir
// renderProfilResults()). Même logique de cache que le portrait : généré une seule fois,
// stocké dans profile.astralText, jamais régénéré tant que le profil n'est pas modifié
// (bindProfilForm() reconstruit un objet neuf à l'enregistrement, qui efface ce champ comme
// il efface déjà profile.portrait).
function getCachedAstralText(){
  const p = getProfile();
  return (p && p.astralText && typeof p.astralText === "object") ? p.astralText : null;
}
async function fetchAstralText(profileSummary, code){
  const r = await fetch("/api/astral-text", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": code },
    body: JSON.stringify({ profile: profileSummary })
  });
  if(r.status === 401) localStorage.removeItem("delphesAccessCode");
  if(!r.ok) throw new Error("textes astraux indisponibles");
  const data = await r.json();
  return data.text;
}
let astralTextFetchInFlight = false;
// Numéro de version du texte majorLinksText — à incrémenter à chaque changement du prompt
// (voir api/astral-text.js) qui change substantiellement le texte généré, MÊME quand ni
// tutelaryDeityKey ni la simple présence du champ ne changent. Retour direct d'utilisatrice
// après la réécriture "un paragraphe par point" : "c'est encore le même texte, c'est
// normal ?" — sans ce numéro, un texte déjà en cache (généré avec l'ancien prompt) passait
// les deux vérifications ci-dessous (deityKey inchangée, majorLinksText déjà présent) et ne
// se régénérait donc jamais tout seul, même après un vrai changement de logique côté prompt.
const MAJOR_LINKS_TEXT_VERSION = 3;
// Même logique de discrétion qu'ensurePortrait() : jamais de prompt de code d'accès depuis
// un simple affichage du Profil astral, échec silencieux (les phrases génériques restent
// affichées), un seul appel réseau tant qu'aucun texte n'est en cache.
function ensureAstralText(){
  const p = getProfile();
  if(!p || !p.astral) return;
  const cached = getCachedAstralText();
  const liveDeity = tutelaryDeity(p);
  const liveDeityKey = liveDeity ? liveDeity.deityKey : null;
  const expectsMajorLinksText = !!majorLinksFor(p.astral);
  // Le texte en cache ne reste valable que si la divinité tutélaire recalculée EN DIRECT
  // est toujours la même que celle pour laquelle il a été rédigé (tutelaryDeityKey, stocké
  // au moment de la génération ci-dessous) — tutelaryDeity() n'est jamais lui-même mis en
  // cache. Ça couvre deux cas : les profils enregistrés avant l'ajout des décans (cache
  // sans ce champ, donc automatiquement regénéré une fois), et, plus tard, l'illustration
  // de Coupes/Deniers qui rendra le calcul encore plus précis pour d'autres personnes —
  // sans ce garde-fou, le paragraphe IA en cache continuerait de justifier une divinité
  // différente de celle réellement affichée.
  // ET, séparément : un profil enregistré AVANT l'ajout de majorLinksText a un
  // tutelaryDeityKey qui matche toujours (rien n'a changé côté divinité) mais un cache qui
  // ne contient pas ce champ — sans cette deuxième condition, ce profil resterait bloqué
  // indéfiniment sur la phrase de secours locale (majorLinksTextFallback()) au lieu du
  // vrai texte IA, alors qu'un simple appel suffirait à le compléter.
  // ET, une troisième fois : même quand majorLinksText existe déjà, il peut avoir été généré
  // avec une version antérieure du prompt (voir MAJOR_LINKS_TEXT_VERSION ci-dessus) — dans
  // ce cas aussi, on régénère.
  if(cached && cached.tutelaryDeityKey === liveDeityKey && (!expectsMajorLinksText || (cached.majorLinksText && cached.majorLinksTextVersion === MAJOR_LINKS_TEXT_VERSION))) return;
  if(astralTextFetchInFlight) return;
  const code = localStorage.getItem("delphesAccessCode");
  if(code === null) return;
  const summary = profileForAstralText(p);
  if(!summary) return;
  astralTextFetchInFlight = true;
  fetchAstralText(summary, code)
    .then(text=>{
      const fresh = getProfile();
      if(!fresh) return;
      fresh.astralText = { ...text, tutelaryDeityKey: liveDeityKey, majorLinksTextVersion: MAJOR_LINKS_TEXT_VERSION };
      saveProfileData(fresh);
      if(cardDetailReturnTo === showProfilAstral) showProfilAstral();
      else if(cardDetailReturnTo === showMajorLinks) showMajorLinks();
    })
    .catch(()=>{ /* échec silencieux : les phrases génériques restent affichées */ })
    .finally(()=>{ astralTextFetchInFlight = false; });
}

/* ===================== RÉTROSPECTIVE ANNUELLE (une fois par an, IA) ===================== */
// Déclenchée à l'anniversaire de naissance (pas le 1er janvier — c'est le repère le plus
// intuitif pour "une année de ta vie", même si la numérologie du temps, elle, suit l'année
// civile) : compare le comportement observé (getFullYear()) au dernier généré, jamais deux
// fois la même année.
function hasBirthdayPassedThisYear(birthDate, now){
  now = now || new Date();
  const parts = (birthDate||"").split("-").map(Number);
  const bm = parts[1], bd = parts[2];
  if(!bm || !bd) return false;
  const thisYearBirthday = new Date(now.getFullYear(), bm-1, bd);
  return now >= thisYearBirthday;
}
const RETROSPECTIVE_MIN_ENTRIES = 3; // même seuil que journalTrends() : en dessous, pas assez de matière pour un vrai bilan
function getCachedRetrospective(){
  try{
    const cached = JSON.parse(localStorage.getItem("delphesRetrospective") || "null");
    if(cached && typeof cached.text === "string" && typeof cached.year === "number") return cached;
  }catch{ /* cache corrompu, on retombe sur null */ }
  return null;
}
// Résumé agrégé du Journal de l'année écoulée, prêt à envoyer à /api/retrospective — jamais
// le texte des questions ni des notes personnelles.
function retrospectiveSummary(stats, profile){
  return {
    firstName: profile.firstName || null,
    totalReadings: stats.totalReadings,
    majorPercent: stats.majorPercent,
    topCards: stats.topCards.slice(0,3).map(c=>({ name: c.name.replace(/^.*—\s*/,""), count: c.count })),
    topDomains: stats.domainDistribution.slice(0,3).map(d=>({ label: d.label, count: d.count })),
    bestStreak: stats.bestStreak,
  };
}
async function fetchRetrospective(summary, code){
  const r = await fetch("/api/retrospective", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": code },
    body: JSON.stringify({ summary })
  });
  if(r.status === 401) localStorage.removeItem("delphesAccessCode");
  if(!r.ok) throw new Error("rétrospective indisponible");
  const data = await r.json();
  return data.retrospective;
}
let retrospectiveFetchInFlight = false;
// Même logique de discrétion qu'ensureTransits()/ensurePortrait() : jamais de prompt de
// code d'accès depuis un simple chargement du Profil (onglet où vit désormais la tuile
// "Ta rétrospective de l'année", en 4e position), échec silencieux, un seul appel tant
// qu'aucune rétrospective n'existe pour l'année en cours.
function ensureRetrospective(){
  const p = getProfile();
  if(!p || !p.birthDate) return;
  const now = new Date();
  if(!hasBirthdayPassedThisYear(p.birthDate, now)) return;
  const cached = getCachedRetrospective();
  if(cached && cached.year === now.getFullYear()) return;
  if(retrospectiveFetchInFlight) return;
  const oneYearAgo = new Date(now.getFullYear()-1, now.getMonth(), now.getDate());
  const stats = journalStatsSince(oneYearAgo);
  if(!stats || stats.totalReadings < RETROSPECTIVE_MIN_ENTRIES) return;
  const code = localStorage.getItem("delphesAccessCode");
  if(code === null) return;
  retrospectiveFetchInFlight = true;
  fetchRetrospective(retrospectiveSummary(stats, p), code)
    .then(text=>{
      localStorage.setItem("delphesRetrospective", JSON.stringify({ year: now.getFullYear(), text }));
      if(route==="profil") render();
    })
    .catch(()=>{ /* échec silencieux : pas de rétrospective cette année, réessayé à la prochaine visite */ })
    .finally(()=>{ retrospectiveFetchInFlight = false; });
}

/* ===================== HOROSCOPE DU JOUR (recommandation unifiée, IA, 1x/jour) ===================== */
// Affiché côté interface sous le titre "Horoscope du jour" — le nom interne (ritualSummary,
// ensureRitual, delphesRitual…) reste "ritual", hérité d'un premier essai de wording, pour
// éviter de renommer toute une chaîne de fonctions/clé localStorage pour un simple
// changement de libellé visible.
//
// Contrairement au portrait et à la rétrospective (générés une fois), rappelé une fois par
// jour — coût récurrent, du même ordre qu'une lecture à 1 carte. Fusionne carte du jour +
// transits du jour (signes + aspect le plus marqué avec le thème natal, voir
// strongestTransitAspect() ci-dessus) + thème natal fixe (Soleil/Lune/ascendant de
// naissance) + nombre personnel DU JOUR en UNE recommandation, plutôt que des blocs
// séparés à interpréter soi-même — un ancien bloc "Horoscope du jour" affiché à part
// faisait doublon (mêmes signes du jour, juste dits autrement) : supprimé il y a
// plusieurs versions, sa matière absorbée ici. Le thème natal fixe et le nombre DU JOUR
// (plutôt que du mois, qui ne changeait pas assez souvent) ont été ajoutés ensuite,
// après un retour direct : sans eux, deux jours qui partagent la même carte (le cycle ne
// compte que 22 majeurs) et le même signe solaire transitant (constant tout un mois)
// produisaient un texte quasi identique.
function ritualSummary(profile, dayCard, transits){
  if(!dayCard) return null;
  const pd = profile ? personalDayNumber(profile.birthDate) : null;
  const pdMeaning = NUMBER_KEYS[pd];
  const transitAspect = strongestTransitAspect(transits, profile);
  const astral = profile?.astral;
  return {
    firstName: profile?.firstName || null,
    dayCardName: cardFullName(dayCard),
    dayCardKeywords: (dayCard[3]||"").split("·")[0].trim(),
    natalSunSign: astral?.sunSign || null,
    natalMoonSign: astral?.moonSign || null,
    natalAscendantSign: astral?.ascendant?.sign || null,
    sunSign: transits?.sun?.sign || null,
    moonSign: transits?.moon?.sign || null,
    transitAspect: transitAspect ? { body: transitAspect.body, action: transitAspect.action, natal: transitAspect.natal } : null,
    personalDay: pd,
    personalDayMeaning: pdMeaning ? pdMeaning[0] : null,
  };
}
function getCachedRitual(){
  try{
    const cached = JSON.parse(localStorage.getItem("delphesRitual") || "null");
    if(cached && cached.date === localDateKey()) return cached.text;
  }catch{ /* cache corrompu, on retombe sur null */ }
  return null;
}
async function fetchRitual(summary, code){
  const r = await fetch("/api/ritual", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": code },
    body: JSON.stringify({ summary })
  });
  if(r.status === 401) localStorage.removeItem("delphesAccessCode");
  if(!r.ok) throw new Error("rituel du jour indisponible");
  const data = await r.json();
  localStorage.setItem("delphesRitual", JSON.stringify({ date: localDateKey(), text: data.ritual }));
  return data.ritual;
}
let ritualFetchInFlight = false;
// Même logique de discrétion que les autres ensure*() : jamais de prompt de code d'accès
// depuis un simple chargement de l'accueil, échec silencieux (les blocs Horoscope/Carte du
// jour restent affichés indépendamment, rien n'est perdu), un seul appel par jour.
function ensureRitual(dayCard, transits){
  const profile = getProfile();
  if(!profile?.astral) return;
  if(getCachedRitual()) return;
  if(ritualFetchInFlight) return;
  const code = localStorage.getItem("delphesAccessCode");
  if(code === null) return;
  const summary = ritualSummary(profile, dayCard, transits);
  if(!summary) return;
  ritualFetchInFlight = true;
  fetchRitual(summary, code)
    .then(()=>{ if(route==="home") render(); })
    .catch(()=>{ /* échec silencieux */ })
    .finally(()=>{ ritualFetchInFlight = false; });
}

// Reprend exactement les mêmes types d'aspect et orbes que api/_lib/astro.js (ASPECTS),
// pour rester cohérent avec le calcul déjà fait côté serveur pour le thème natal.
const CLIENT_ASPECTS = [
  { type:"conjonction", angle:0, orb:8 },
  { type:"sextile", angle:60, orb:6 },
  { type:"carré", angle:90, orb:7 },
  { type:"trigone", angle:120, orb:8 },
  { type:"opposition", angle:180, orb:8 },
];
function findAspect(lon1, lon2){
  let diff = Math.abs(((lon1-lon2)%360+360)%360);
  if(diff > 180) diff = 360 - diff;
  for(const def of CLIENT_ASPECTS){
    const exactOrb = Math.abs(diff - def.angle);
    if(exactOrb <= def.orb) return { type:def.type, orb: Math.round(exactOrb*100)/100 };
  }
  return null;
}

const TRANSIT_LABELS = { sun:"Le Soleil", moon:"La Lune", mercury:"Mercure", venus:"Vénus", mars:"Mars" };
// Vocabulaire d'aspect générique (pas seulement pour les transits) : réutilisé plus bas
// pour les aspects natals du Profil astral (natalAspectSentence()). Décrit la nature
// structurelle de l'aspect (facile/tendu/à équilibrer) sans jamais prêter à la planète un
// "ton" qui contredirait sa nature — ex. trigone : "s'accorde naturellement avec" plutôt
// que "soutient en douceur", qui sonnait faux pour une planète comme Mars.
const ASPECT_ACTION_PHRASES = {
  conjonction:"vient renforcer", trigone:"s'accorde naturellement avec", sextile:"ouvre une occasion du côté de",
  carré:"met sous tension", opposition:"invite à trouver un équilibre avec",
};

// Aspect le plus marqué du jour entre les positions transitantes (transits, depuis
// /api/transits) et le thème natal enregistré (profile.astral) — jamais d'appel IA, tout
// est calculé localement (donc gratuit et instantané). Alimente uniquement le rituel du
// jour (ritualSummary() ci-dessous) : un ancien bloc "Horoscope du jour" séparé faisait ce
// même calcul pour l'afficher indépendamment, mais redisait presque la même chose que le
// rituel (mêmes signes du Soleil/de la Lune du jour) — fusionné ici plutôt que dupliqué.
function strongestTransitAspect(transits, profile){
  if(!transits || !profile || !profile.astral) return null;
  const natalBodies = profile.astral.bodies || {};
  const natalPoints = [
    { label:"ton identité", longitude: natalBodies.sun?.longitude },
    { label:"ton monde intérieur", longitude: natalBodies.moon?.longitude },
  ];
  if(profile.astral.ascendant) natalPoints.push({ label:"la façon dont tu te présentes", longitude: profile.astral.ascendant.longitude });

  const hits = [];
  ["sun","moon","mercury","venus","mars"].forEach(tb=>{
    const tLon = transits[tb]?.longitude;
    if(tLon == null) return;
    natalPoints.forEach(np=>{
      if(np.longitude == null) return;
      const asp = findAspect(tLon, np.longitude);
      if(asp) hits.push({ transitBody:tb, natal:np, aspect:asp });
    });
  });
  hits.sort((a,b)=>a.aspect.orb - b.aspect.orb); // l'aspect le plus exact d'abord
  if(!hits.length) return null;
  const h = hits[0];
  return { body: TRANSIT_LABELS[h.transitBody], action: ASPECT_ACTION_PHRASES[h.aspect.type], natal: h.natal.label };
}

/* ===================== COMPARAISON DE THÈMES (proches) ===================== */
// Fonctionnalité premium (voir isPremiumEnabled()) : compare le thème enregistré à celui
// d'un "proche" (partenaire, enfant, parent, ami·e...) enregistré séparément dans
// delphesRelations. C'est le même principe que la synastrie en astrologie traditionnelle
// (croiser deux thèmes plutôt qu'en lire un seul), généralisé à toute relation plutôt que
// réservé au couple — à la demande explicite de l'utilisatrice, pour pouvoir aussi comparer
// avec un enfant, un parent, un·e ami·e.

// Catégories de proches — volontairement neutres dans leur formulation (pas de vocabulaire
// propre au couple) : la même comparaison sert aussi bien un parent qui regarde son enfant
// qu'un couple ou une fratrie.
const RELATION_TYPES = {
  partenaire: "Partenaire",
  enfant: "Enfant",
  parent: "Parent",
  fratrie: "Frère / Sœur",
  ami: "Ami·e",
  autre: "Autre",
};

function getRelations(){
  try{
    const list = JSON.parse(localStorage.getItem("delphesRelations") || "[]");
    return Array.isArray(list) ? list : [];
  }catch{ return []; }
}
function saveRelations(list){ localStorage.setItem("delphesRelations", JSON.stringify(list)); }
function getRelation(id){ return getRelations().find(r => r.id === id) || null; }
// Ajoute (sans id) ou met à jour (id déjà présent) un proche ; renvoie l'id final.
function upsertRelation(rel){
  const list = getRelations();
  const idx = rel.id ? list.findIndex(r => r.id === rel.id) : -1;
  if(idx === -1){
    rel.id = rel.id || `rel_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    list.push(rel);
  } else {
    list[idx] = rel;
  }
  saveRelations(list);
  return rel.id;
}
function deleteRelation(id){ saveRelations(getRelations().filter(r => r.id !== id)); }

// Élément (Feu/Eau/Air/Terre) de chaque signe : pas une nouvelle classification, juste la
// lecture inverse de la triplicité déjà établie par DECAN_MINOR_CARDS ci-dessus (même
// enseigne = même élément, voir son commentaire).
const SIGN_ELEMENT = {};
for(const [sign, cards] of Object.entries(DECAN_MINOR_CARDS)){
  const suit = cards[0].split(" de ")[1]; // "2 de Bâtons" -> "Bâtons"
  SIGN_ELEMENT[sign] = SUITS[suit][2].split(" · ")[0]; // "Feu · action · volonté" -> "Feu"
}

// Choisit une variante de phrase de façon stable à partir d'une chaîne "seed" (ex. les deux
// signes concernés) : la même paire retombe toujours sur la même formulation (pas de
// scintillement au ré-affichage d'une même comparaison), mais des paires différentes
// tombent souvent sur des formulations différentes — pour qu'une lecture répétée de la
// fonctionnalité ne sonne pas comme un même gabarit recopié pour tout le monde. Hash
// djb2 : simple, rapide, suffisant ici (pas besoin de résistance aux collisions).
function stableVariant(list, seed){
  let h = 5381;
  for(let i=0;i<seed.length;i++) h = ((h*33) ^ seed.charCodeAt(i)) >>> 0;
  return list[h % list.length];
}

// Dynamique classique entre deux éléments : même élément = résonance, éléments
// complémentaires (Feu/Air, Terre/Eau) = équilibre naturel, éléments opposés = tension à
// apprivoiser plutôt qu'un problème en soi — jamais présentée comme une incompatibilité.
// Plusieurs variantes par cas (voir stableVariant() ci-dessus), sélectionnées sur la paire
// de signes exacte plutôt que sur la seule paire d'éléments (12×12 combinaisons possibles,
// pas seulement 4×4) : deux couples "Feu + Air" différents ont de bonnes chances de ne pas
// lire exactement la même phrase.
const ELEMENT_DYNAMIC_VARIANTS = {
  resonance: [
    el => `Vous partagez le même élément (${el}) : une vraie proximité de rythme et d'instinct — vous vous comprenez souvent sans avoir besoin de tout expliquer.`,
    el => `Même élément (${el}) des deux côtés : vous réagissez souvent de façon similaire face aux mêmes situations, ce qui peut aussi bien vous rapprocher que renforcer les mêmes travers.`,
    el => `${el} des deux côtés : un terrain commun fort, une manière de fonctionner qui se reconnaît d'instinct — pour le meilleur comme pour ce qu'il faudra parfois corriger ensemble.`,
    el => `Vous êtes tous les deux du même élément (${el}) : les mêmes réflexes, la même énergie de fond — rarement besoin de traduire ce que l'autre ressent.`,
  ],
  complement: [
    (elA,elB) => `${elA} et ${elB} se nourrissent naturellement l'un l'autre — un bon équilibre, tant que chacun garde sa place.`,
    (elA,elB) => `${elA} et ${elB} forment un duo classique qui fonctionne bien : l'un apporte souvent ce que l'autre n'a pas spontanément, sans opposition frontale.`,
    (elA,elB) => `Entre ${elA} et ${elB}, la différence est plutôt un moteur qu'un obstacle — chacun peut apporter à l'autre ce qui lui manque naturellement.`,
    (elA,elB) => `${elA} et ${elB} se complètent bien : deux façons différentes d'avancer, qui s'articulent plus qu'elles ne se heurtent.`,
  ],
  tension: [
    (elA,elB) => `${elA} et ${elB} avancent à des rythmes différents — une vraie richesse si elle est reconnue, une source de friction sinon.`,
    (elA,elB) => `${elA} et ${elB} n'ont pas spontanément le même tempo : ce qui semble évident pour l'un peut demander un vrai effort de traduction pour l'autre.`,
    (elA,elB) => `Entre ${elA} et ${elB}, les réflexes de base diffèrent — pas une incompatibilité, mais un ajustement conscient à faire régulièrement.`,
    (elA,elB) => `${elA} et ${elB} ne réagissent pas de la même façon aux mêmes situations : une différence à apprivoiser plutôt qu'à combler.`,
  ],
};
function elementDynamic(elA, elB, seed){
  const key = seed || `${elA}-${elB}`;
  if(elA === elB){
    return { kind:"resonance", text: stableVariant(ELEMENT_DYNAMIC_VARIANTS.resonance, key)(elA) };
  }
  const complementary = new Set(["Feu-Air","Air-Feu","Terre-Eau","Eau-Terre"]);
  const kind = complementary.has(`${elA}-${elB}`) ? "complement" : "tension";
  return { kind, text: stableVariant(ELEMENT_DYNAMIC_VARIANTS[kind], key)(elA, elB) };
}

// Points de comparaison entre deux thèmes (Soleil/Lune/Ascendant/Vénus/Mars de chacun),
// avec les mêmes types d'aspect et les mêmes orbes que CLIENT_ASPECTS/findAspect()
// ci-dessus — jusqu'ici utilisés au sein d'un seul thème (natal) ou entre transits du jour
// et thème natal (strongestTransitAspect()) ; ici, un troisième usage du même mécanisme,
// appliqué ENTRE deux personnes. Vénus (affinités, valeurs) et Mars (énergie, façon d'agir)
// complètent Soleil/Lune/Ascendant pour une comparaison plus fine, au-delà de l'identité et
// des émotions de base — retour direct d'utilisatrice ("tu ferais quoi pour pousser encore
// cette fonction ?").
const SYNASTRY_POINT_LABELS = { sun:"Soleil", moon:"Lune", ascendant:"Ascendant", venus:"Vénus", mars:"Mars" };
// Formulations possessives correctes (accord grammatical du point, pas de la personne) pour
// le côté "toi" ("Ton Soleil", mais "Ta Lune") et un groupe nominal sans pronom pour le côté
// "proche" ("la Lune de Léa" plutôt que "sa Lune" ou "sa/son Lune/Soleil", qui suppose un
// genre) — voir SYNASTRY_ASPECT_VARIANTS ci-dessous.
const SYNASTRY_POINT_YOUR = { sun:"Ton Soleil", moon:"Ta Lune", ascendant:"Ton Ascendant", venus:"Ta Vénus", mars:"Ton Mars" };
const SYNASTRY_POINT_ARTICLE = { sun:"le Soleil", moon:"la Lune", ascendant:"l'Ascendant", venus:"la Vénus", mars:"le Mars" };
function synastryPoints(profile){
  const pts = [];
  const b = profile?.astral?.bodies;
  if(b?.sun) pts.push({ key:"sun", sign:b.sun.sign, longitude:b.sun.longitude });
  if(b?.moon) pts.push({ key:"moon", sign:b.moon.sign, longitude:b.moon.longitude });
  if(profile?.astral?.ascendant) pts.push({ key:"ascendant", sign:profile.astral.ascendant.sign, longitude:profile.astral.ascendant.longitude });
  if(b?.venus) pts.push({ key:"venus", sign:b.venus.sign, longitude:b.venus.longitude });
  if(b?.mars) pts.push({ key:"mars", sign:b.mars.sign, longitude:b.mars.longitude });
  return pts;
}
const SYNASTRY_HARMONIOUS = new Set(["conjonction","trigone","sextile"]);
// Vocabulaire dédié à la comparaison à deux (distinct de ASPECT_ACTION_PHRASES, qui décrit
// une planète agissant sur une autre AU SEIN d'un même thème) : plusieurs variantes par
// type d'aspect (voir stableVariant()), chacune prenant les deux groupes nominaux déjà
// accordés (voir SYNASTRY_POINT_YOUR/SYNASTRY_POINT_ARTICLE) plutôt qu'un pronom genré.
const SYNASTRY_ASPECT_VARIANTS = {
  conjonction: [
    (your,their) => `${your} et ${their} se superposent presque exactement : une proximité immédiate, qui peut autant renforcer que confondre les deux plans.`,
    (your,their) => `${your} rencontre presque directement ${their} — vous touchez souvent au même point sans même vous concerter.`,
    (your,their) => `${your} et ${their} sont si proches qu'ils se répondent presque automatiquement, sans détour.`,
  ],
  trigone: [
    (your,their) => `${your} et ${their} s'accordent sans effort : ce terrain-là circule facilement entre vous, presque naturellement.`,
    (your,their) => `Entre ${your} et ${their}, le courant passe tout seul — un point d'appui simple à retrouver, quel que soit le sujet.`,
    (your,their) => `${your} et ${their} se soutiennent d'instinct, sans qu'il y ait besoin d'y travailler particulièrement.`,
  ],
  sextile: [
    (your,their) => `${your} ouvre une vraie occasion du côté de ${their}, à condition de la saisir plutôt que de la laisser passer.`,
    (your,their) => `${your} et ${their} s'entendent bien dès que l'un des deux fait le premier pas.`,
    (your,their) => `Entre ${your} et ${their}, la porte est ouverte — encore faut-il penser à la franchir.`,
  ],
  carré: [
    (your,their) => `${your} met ${their} sous tension — une friction réelle, mais aussi ce qui pousse souvent à avancer plutôt qu'à stagner.`,
    (your,their) => `${your} et ${their} ne parlent pas spontanément la même langue : un vrai point de friction à apprivoiser plutôt qu'à ignorer.`,
    (your,their) => `${your} bouscule ${their} — inconfortable sur le moment, mais rarement stérile si vous en reparlez calmement.`,
  ],
  opposition: [
    (your,their) => `${your} et ${their} se tirent dans des directions opposées — à équilibrer consciemment plutôt qu'à trancher d'un côté.`,
    (your,their) => `${your} fait presque face à ${their} : deux besoins réels, rarement satisfaits en même temps sans un effort d'ajustement.`,
    (your,their) => `${your} et ${their} tirent chacun à leur façon — un vrai jeu d'équilibre, pas un rapport de force à gagner.`,
  ],
};
// `theirName` : prénom du proche (profileB), utilisé pour composer "la Lune de Léa" côté
// proche — laissé optionnel pour rester compatible avec un appel sans nom disponible
// (auquel cas la phrase reste correcte mais un peu plus neutre, "sa Lune" étant évité de
// toute façon, voir plus haut).
function synastryAspects(profileA, profileB, theirName){
  const ptsA = synastryPoints(profileA), ptsB = synastryPoints(profileB);
  const name = theirName || "l'autre thème";
  const hits = [];
  ptsA.forEach(pa=>{
    ptsB.forEach(pb=>{
      if(pa.longitude == null || pb.longitude == null) return;
      const aspect = findAspect(pa.longitude, pb.longitude);
      if(!aspect) return;
      const variants = SYNASTRY_ASPECT_VARIANTS[aspect.type];
      const your = SYNASTRY_POINT_YOUR[pa.key];
      const their = `${SYNASTRY_POINT_ARTICLE[pb.key]} de ${name}`;
      const sentence = variants ? stableVariant(variants, `${pa.key}-${pb.key}-${aspect.type}-${pa.sign}-${pb.sign}`)(your, their) : "";
      hits.push({ a:pa, b:pb, aspect, harmonious: SYNASTRY_HARMONIOUS.has(aspect.type), sentence });
    });
  });
  hits.sort((x,y)=>x.aspect.orb - y.aspect.orb); // l'aspect le plus exact d'abord
  return hits;
}

// Fonction principale, pure et testable : compare deux thèmes (au format `saved`/profil
// astral, voir getProfile()) et renvoie une structure de données — pas de HTML ici, voir
// renderComparison() plus bas pour l'affichage. null si l'un des deux thèmes est incomplet.
function compareProfiles(profileA, profileB){
  if(!profileA?.astral || !profileB?.astral) return null;
  const sunA = profileA.astral.bodies?.sun?.sign, sunB = profileB.astral.bodies?.sun?.sign;
  const element = (sunA && sunB && SIGN_ELEMENT[sunA] && SIGN_ELEMENT[sunB])
    // Seed sur la paire de SIGNES (12×12), pas la seule paire d'éléments (4×4) : deux
    // couples qui partagent le même élément n'atterrissent pas forcément sur la même
    // variante de phrase (voir elementDynamic()/stableVariant()).
    ? { a:SIGN_ELEMENT[sunA], b:SIGN_ELEMENT[sunB], ...elementDynamic(SIGN_ELEMENT[sunA], SIGN_ELEMENT[sunB], `${sunA}-${sunB}`) }
    : null;

  const aspects = synastryAspects(profileA, profileB, profileB.firstName);
  // Plafond relevé à 5 (au lieu de 4) depuis l'ajout de Vénus/Mars : plus de points comparés
  // (5×5 au lieu de 3×3), donc un peu plus de place pour les faire tous remonter sans pour
  // autant afficher toute la grille.
  const common = aspects.filter(h=>h.harmonious).slice(0,5);
  const tense = aspects.filter(h=>!h.harmonious).slice(0,5);

  const deityA = tutelaryDeity(profileA), deityB = tutelaryDeity(profileB);
  const sharedDeity = (deityA && deityB && deityA.deityKey === deityB.deityKey) ? deityA : null;

  return {
    signs: {
      a: { sun:sunA, moon:profileA.astral.bodies?.moon?.sign, ascendant:profileA.astral.ascendant?.sign },
      b: { sun:sunB, moon:profileB.astral.bodies?.moon?.sign, ascendant:profileB.astral.ascendant?.sign },
    },
    element, common, tense, deityA, deityB, sharedDeity,
  };
}

/* ===== TEXTE ENRICHI PAR IA POUR LA COMPARAISON (optionnel, premium) ===== */
// Contrairement au reste de compareProfiles() (déterministe, gratuit une fois le mode
// premium activé), ce paragraphe est rédigé par l'IA — un texte suivi qui tisse les
// résultats déjà calculés localement (élément, aspects, divinité commune) en une lecture
// fluide, adaptée au type de relation plutôt qu'un texte générique valable pour tout le
// monde. Purement optionnel : la comparaison reste entièrement fonctionnelle sans lui (voir
// renderComparison()), il vient simplement s'ajouter au-dessus — retour direct
// d'utilisatrice ("tu ferais quoi pour pousser encore cette fonction ?").

// Résumé minimal envoyé à /api/comparison-text : jamais les thèmes complets, seulement les
// signes essentiels et les points déjà calculés par compareProfiles() — même principe de
// sobriété que profileForPortrait().
function profileForComparisonText(primary, relation){
  const cmp = compareProfiles(primary, relation);
  if(!cmp) return null;
  return {
    yourFirstName: primary.firstName,
    yourGender: primary.gender || null, // "f" | "m" | null (préfère ne pas préciser)
    theirFirstName: relation.firstName,
    theirGender: relation.gender || null,
    relationType: RELATION_TYPES[relation.relationType] || "Autre",
    yourSigns: cmp.signs.a,
    theirSigns: cmp.signs.b,
    element: cmp.element ? { a: cmp.element.a, b: cmp.element.b, kind: cmp.element.kind } : null,
    sharedDeity: cmp.sharedDeity ? cmp.sharedDeity.deityName : null,
    commonPoints: cmp.common.map(h => ({ your: SYNASTRY_POINT_LABELS[h.a.key], their: SYNASTRY_POINT_LABELS[h.b.key], type: h.aspect.type })),
    tensePoints: cmp.tense.map(h => ({ your: SYNASTRY_POINT_LABELS[h.a.key], their: SYNASTRY_POINT_LABELS[h.b.key], type: h.aspect.type })),
  };
}

// Empreinte des données de naissance ET du genre des deux thèmes concernés : si l'une de
// ces valeurs change (profil propre modifié, ou informations du proche modifiées), le texte
// en cache ne correspond plus à ce qui est réellement affiché — même logique de garde-fou
// que astralText.tutelaryDeityKey (voir ensureAstralText()), pour ne jamais laisser un texte
// périmé (mal genré, notamment) contredire silencieusement les données actuelles.
function comparisonFingerprint(primary, relation){
  return [primary.birthDate, primary.birthTime||"", primary.timeUnknown?1:0, primary.gender||"", relation.birthDate, relation.birthTime||"", relation.timeUnknown?1:0, relation.gender||""].join("|");
}
function getCachedComparisonText(primary, relation){
  const cached = relation?.comparisonText;
  if(cached && typeof cached === "object" && cached.fingerprint === comparisonFingerprint(primary, relation)) return cached.text;
  return null;
}
async function fetchComparisonText(payload, code){
  const r = await fetch("/api/comparison-text", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": code },
    body: JSON.stringify({ comparison: payload })
  });
  if(r.status === 401) localStorage.removeItem("delphesAccessCode");
  if(!r.ok) throw new Error("texte de comparaison indisponible");
  const data = await r.json();
  return data.text;
}
let comparisonTextFetchInFlight = {}; // clé : id du proche — plusieurs comparaisons distinctes peuvent être en vol
// Id du proche actuellement affiché par showComparison(), pour savoir si un re-rendu est
// nécessaire une fois le texte reçu en arrière-plan — même motif que cardDetailReturnTo
// pour les autres écrans, décliné pour ce fetch asynchrone précis.
let currentComparisonRelationId = null;
// Mêmes garde-fous de discrétion qu'ensurePortrait() : jamais de prompt de code d'accès
// déclenché depuis un simple affichage de la comparaison, échec silencieux (le texte
// enrichi n'apparaît simplement pas, le reste de la comparaison reste intact), un seul
// appel réseau par proche tant qu'aucun texte n'est en cache pour lui.
function ensureComparisonText(primary, relation){
  if(!primary?.astral || !relation?.astral) return;
  if(getCachedComparisonText(primary, relation)) return;
  if(comparisonTextFetchInFlight[relation.id]) return;
  const code = localStorage.getItem("delphesAccessCode");
  if(code === null) return;
  const payload = profileForComparisonText(primary, relation);
  if(!payload) return;
  comparisonTextFetchInFlight[relation.id] = true;
  fetchComparisonText(payload, code)
    .then(text=>{
      const fresh = getRelation(relation.id);
      if(!fresh) return;
      fresh.comparisonText = { text, fingerprint: comparisonFingerprint(primary, fresh) };
      upsertRelation(fresh);
      if(currentComparisonRelationId === relation.id) showComparison(relation.id);
    })
    .catch(()=>{ /* échec silencieux : le texte enrichi n'apparaît simplement pas */ })
    .finally(()=>{ delete comparisonTextFetchInFlight[relation.id]; });
}

/* ===== COMPARAISON DE GROUPE (3 personnes ou plus) ===== */
// Étend la comparaison à deux (compareProfiles()) à un groupe entier — typiquement toi et
// plusieurs proches à la fois, pour une vue d'ensemble de la dynamique familiale plutôt
// qu'une série de comparaisons isolées à ouvrir une par une. Retour direct d'utilisatrice
// ("peut-on pousser à la famille ?").
//
// `people`: [{ id, firstName, astral }, ...], au moins 2 — calcule compareProfiles() pour
// CHAQUE paire possible au sein du groupe (pas seulement toi vis-à-vis de chacun), avec
// C(n,2) paires pour n personnes. Volontairement pas de nouvelle fonction de "dynamique de
// groupe" globale : la famille n'est pas UNE compatibilité, mais un réseau de relations à
// deux qui s'additionnent — plus honnête que de tenter de les résumer en un seul verdict.
function compareGroup(people){
  const pairs = [];
  for(let i=0;i<people.length;i++){
    for(let j=i+1;j<people.length;j++){
      const cmp = compareProfiles(people[i], people[j]);
      if(cmp) pairs.push({ a:people[i], b:people[j], cmp });
    }
  }
  return pairs;
}

async function generateAIReading(question, cards, positions){
  // Le budget de temps grandit avec le nombre de cartes, exactement comme max_tokens côté
  // serveur (voir api/reading.js) : une Croix celtique ou une Année à venir demande à l'IA
  // de rédiger beaucoup plus de texte qu'un tirage à 1 ou 3 cartes, et prend donc
  // mécaniquement plus longtemps à générer. Un plafond fixe de 15s (l'ancienne valeur)
  // coupait la connexion avant que la réponse ait eu le temps d'arriver pour la plupart des
  // tirages un peu grands, ce qui faisait basculer silencieusement vers la lecture hors-ligne
  // bien plus souvent que nécessaire.
  const timeoutMs = Math.min(45000, Math.max(20000, 10000 + cards.length * 3000));
  const timeout = new Promise((_,reject)=>setTimeout(()=>reject(new Error("timeout")), timeoutMs));
  const profile = profileForReading();
  const history = journalTrendsForReading();
  const memory = cardMemory(cards, question);
  const dream = recentDreamForReading();
  const call = fetch("/api/reading", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": getAccessCode() },
    body: JSON.stringify({ question, cards, positions, ...(profile ? { profile } : {}), ...(history ? { history } : {}), ...(memory ? { memory } : {}), ...(dream ? { dream } : {}) })
  }).then(async r=>{
    if(r.status === 401){
      // Code manquant/incorrect : on l'efface pour qu'il soit redemandé au prochain tirage.
      localStorage.removeItem("delphesAccessCode");
    }
    if(!r.ok) throw new Error(`réponse backend invalide (HTTP ${r.status})`);
    return r.json();
  });

  const parsed = await Promise.race([call, timeout]);
  if(!Array.isArray(parsed.cards) || parsed.cards.length !== cards.length || !parsed.synthesis) throw new Error("réponse incomplète");
  return parsed;
}

function startAIReading(){
  if(tirageState.aiStatus === "loading" || tirageState.aiStatus === "done") return;
  tirageState.aiStatus = "loading";
  saveTirageState();
  render();
  const chosen = tirageState.picks.map(i=>tirageState.spread[i]);
  const positions = spreadConf().positions.slice(0, chosen.length);
  generateAIReading(tirageState.question, chosen, positions)
    .then(result => { tirageState.aiReading = result; tirageState.aiStatus = "done"; saveTirageState(); render(); })
    .catch(err => {
      // Le repli vers la lecture hors-ligne reste silencieux pour l'utilisateur (jamais
      // bloqué), mais l'erreur réelle (timeout, HTTP xxx, JSON invalide...) est désormais
      // journalisée dans la console — jusqu'ici elle disparaissait complètement, rendant
      // impossible de distinguer un simple dépassement de délai d'une vraie panne backend.
      console.warn("Lecture IA indisponible, repli hors-ligne :", err && err.message ? err.message : err);
      tirageState.aiStatus = "error"; saveTirageState(); render();
    });
}

/* ===================== VUES ===================== */

function setRoute(newRoute){ route = newRoute; render(); window.scrollTo(0,0); }

// Rejoue la transition douce sur #screen à chaque changement de contenu — on retire puis
// reforce la classe (avec un reflow entre les deux) car l'élément #screen n'est jamais
// recréé, seul son innerHTML change.
// kind="detail" (fiche carte/symbole/figure/apprendre — tout ce qui va "plus loin") entre
// avec un léger zoom avant, pour donner une sensation de profondeur ; kind="base" (onglets
// et retour vers un écran parent, via render()) entre avec un zoom arrière plus doux — la
// même paire d'animations partout, plutôt qu'une seule identique pour toute la navigation.
function triggerScreenAnim(kind="base"){
  const screen = document.getElementById("screen");
  if(!screen) return;
  screen.classList.remove("screen-anim", "screen-anim-detail");
  void screen.offsetWidth;
  screen.classList.add(kind==="detail" ? "screen-anim-detail" : "screen-anim");
}

function render(){
  const screen = document.getElementById("screen");
  const title = document.getElementById("pageTitle");
  if(!screen || !title) return;
  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active", b.dataset.route===route));
  const back = document.getElementById("backBtn");
  if(back) back.hidden = route === "home";
  title.textContent = {home:"Tarot de Delphes", tirage:"Tirage", apprendre:"Apprendre", reves:"Rêves", profil:"Profil"}[route] || "Tarot de Delphes";
  if(route==="home") screen.innerHTML = home();
  if(route==="tirage") screen.innerHTML = tirage();
  if(route==="apprendre") screen.innerHTML = apprendre();
  if(route==="reves") screen.innerHTML = reves();
  if(route==="profil") screen.innerHTML = profil();
  triggerScreenAnim();
  bind();
}

// Petite poussière de lumière qui flotte lentement dans le hero de l'accueil
// (positions/durées fixes mais variées, purement décoratif).
function homeGlowHTML(){
  const motes = [
    {left:"6%", size:6, dur:8, delay:0},
    {left:"20%", size:4, dur:11, delay:2.2},
    {left:"37%", size:7, dur:9.5, delay:.8},
    {left:"55%", size:5, dur:10.5, delay:3.4},
    {left:"71%", size:8, dur:8.8, delay:1.6},
    {left:"88%", size:5, dur:12, delay:.3},
  ];
  return `<div class="home-glow">${motes.map(m=>`<span class="mote" style="left:${m.left};width:${m.size}px;height:${m.size}px;animation-duration:${m.dur}s;animation-delay:${m.delay}s"></span>`).join("")}</div>`;
}

function localDateKey(d){
  d = d || new Date();
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,"0"), day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

// Numéro du jour dans l'année (1-366), pour répartir la carte du jour sur tout le
// calendrier plutôt que sur les 1-31 jours du mois (l'ancien calcul faisait retomber le
// 1er de chaque mois sur exactement la même carte).
function dayOfYear(d){
  d = d || new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}

// Série de jours consécutifs : incrémentée une fois par jour à la première visite de
// l'accueil (idempotent le reste de la journée), remise à 1 s'il y a eu un jour sans
// visite entre-temps.
// Retourne l'état de la série de jours SANS le modifier — utilisé par la page de
// statistiques (statsView()) pour lire streak/bestStreak sans dépendre d'un appel à
// updateStreak() (qui, lui, n'est censé être déclenché qu'une fois par jour, à l'accueil).
function getStreakState(){
  try{
    const state = JSON.parse(localStorage.getItem("delphesStreak") || "null");
    if(state && typeof state.streak === "number") return { streak: state.streak, bestStreak: typeof state.bestStreak === "number" ? state.bestStreak : state.streak };
  }catch{ /* état corrompu, on retombe sur zéro */ }
  return { streak:0, bestStreak:0 };
}
function updateStreak(){
  let state;
  try{ state = JSON.parse(localStorage.getItem("delphesStreak") || "null"); }catch{ state = null; }
  if(!state || typeof state.streak !== "number") state = { lastVisitDate:null, streak:0, bestStreak:0 };
  if(typeof state.bestStreak !== "number") state.bestStreak = state.streak; // migration douce d'un ancien état sans bestStreak

  const today = localDateKey();
  if(state.lastVisitDate === today) return state.streak; // déjà compté aujourd'hui

  const yesterday = localDateKey(new Date(Date.now() - 24*60*60*1000));
  state.streak = (state.lastVisitDate === yesterday) ? state.streak + 1 : 1;
  state.bestStreak = Math.max(state.bestStreak, state.streak);
  state.lastVisitDate = today;
  localStorage.setItem("delphesStreak", JSON.stringify(state));
  return state.streak;
}

/* ===================== CALENDRIER ATTIQUE ===================== */
// Calendrier civil d'Athènes antique : luni-solaire, douze mois lunaires (parfois treize,
// une année sur deux ou trois, pour rattraper le retard sur le soleil) qui commencent
// chacun à la nouvelle lune, la nouvelle année elle-même s'ouvrant à la première nouvelle
// lune suivant le solstice d'été. Calculé ici entièrement côté client, par pure
// arithmétique (aucun appel réseau) — approximatif par nature : la date du solstice
// utilise la formule basse précision de Meeus (Astronomical Algorithms, ch. 27, sans les
// termes périodiques correctifs, exacts à moins d'un jour) et les nouvelles lunes sont
// dérivées d'une lunaison moyenne (29,530588861 j) depuis une nouvelle lune de référence
// connue (6 janvier 2000, ~18h14 UT) — le calendrier attique réel dépendait en pratique de
// l'observation directe du ciel par les autorités religieuses, jamais parfaitement
// régulière. Suffisant pour donner une date et une divinité du jour plausibles, pas pour
// une reconstitution savante au jour près.
const ATTIC_MONTHS = [
  "Hécatombéion", "Métageitnion", "Boédromion", "Pyanepsion", "Maimactérion", "Poséidéion",
  "Gaméliion", "Anthestérion", "Élaphébolion", "Mounichion", "Thargélion", "Skirophorion",
];
const ATTIC_NEW_MOON_EPOCH_JD = 2451550.1; // nouvelle lune de référence : 6 janvier 2000, ~18h14 UT
const ATTIC_SYNODIC_MONTH = 29.530588861; // durée moyenne d'une lunaison, en jours

// Jour julien (approximatif, midi local pris comme référence — suffisant à l'échelle
// d'une journée) d'une date calendaire grégorienne. Algorithme classique (Fliegel &
// Van Flandern / Meeus).
function julianDayFromYMD(y, m, d){
  if(m <= 2){ y -= 1; m += 12; }
  const A = Math.floor(y/100);
  const B = 2 - A + Math.floor(A/4);
  return Math.floor(365.25*(y+4716)) + Math.floor(30.6001*(m+1)) + d + B - 1524.5 + 0.5; // +0.5 : midi local
}

// Jour julien approximatif du solstice de juin d'une année donnée (formule basse
// précision de Meeus, valable env. 1000 à 3000 apr. J.-C., sans les 24 termes
// périodiques de raffinement — exacte à moins d'un jour, ce qui suffit ici).
function juneSolsticeJD(year){
  const Y = (year - 2000) / 1000;
  return 2451716.56767 + 365241.62603*Y + 0.00325*Y*Y + 0.00888*Y*Y*Y - 0.00030*Y*Y*Y*Y;
}

// Divinités traditionnellement honorées à date fixe du mois, quel que soit le mois lui-
// même — les « jours sacrés » du calendrier attique attestés chez les auteurs anciens
// (Hésiode, Proclus) et la pratique religieuse courante : la Tétrade (4) pour Hermès,
// Aphrodite, Héraclès et Éros, tous nés ce jour-là ; le 6 pour Artémis et le 7 pour
// Apollon (nés eux aussi ces jours), le 7 et le 20 (Eikas) restant l'un et l'autre
// consacrés à Apollon ; le 8 pour Poséidon. Le dernier jour du mois (Héné kai néa, « la
// vieille et la nouvelle »), nuit de lune noire, est le Deipnon d'Hécate. Beaucoup de
// jours n'ont aucune divinité qui leur soit propre : la fonction renvoie alors un tableau
// vide plutôt que d'en inventer une.
const ATTIC_SACRED_DAYS = {
  1: ["apollon", "séléné"],
  4: ["hermès", "aphrodite", "héraclès", "éros"],
  6: ["artémis"],
  7: ["apollon"],
  8: ["poséidon"],
  20: ["apollon"],
};
function atticSacredDeities(day, daysInMonth){
  if(day === daysInMonth) return ["hécate"]; // Héné kai néa : Deipnon d'Hécate
  return ATTIC_SACRED_DAYS[day] || [];
}

// Calcule la date du jour dans le calendrier attique : mois (avec repli sur un « mois
// intercalaire » approximatif au-delà du douzième, les années embolimiques ayant
// traditionnellement inséré un second Poséidéion), jour du mois (1-indexé) et nombre de
// jours de ce mois (29 ou 30, un mois « creux » ou « plein » selon l'écart réel entre
// deux nouvelles lunes).
function atticCalendarInfo(date){
  date = date || new Date();
  const y = date.getFullYear(), m = date.getMonth()+1, d = date.getDate();
  const todayJD = julianDayFromYMD(y, m, d);

  let refYear = y;
  let solsticeJD = juneSolsticeJD(y);
  if(todayJD < solsticeJD){ refYear = y - 1; solsticeJD = juneSolsticeJD(refYear); }

  const k0 = Math.ceil((solsticeJD - ATTIC_NEW_MOON_EPOCH_JD) / ATTIC_SYNODIC_MONTH);
  const yearStartJD = ATTIC_NEW_MOON_EPOCH_JD + k0*ATTIC_SYNODIC_MONTH; // Noménie d'Hécatombéion

  const elapsed = Math.max(0, todayJD - yearStartJD);
  const monthIndex = Math.min(12, Math.floor(elapsed / ATTIC_SYNODIC_MONTH));
  const monthStartJD = yearStartJD + monthIndex*ATTIC_SYNODIC_MONTH;
  const nextMonthStartJD = yearStartJD + (monthIndex+1)*ATTIC_SYNODIC_MONTH;
  const daysInMonth = Math.max(29, Math.min(30, Math.round(nextMonthStartJD - monthStartJD)));
  const day = Math.max(1, Math.min(daysInMonth, Math.floor(todayJD - monthStartJD) + 1));
  const isEmbolimic = monthIndex === 12;
  const monthName = isEmbolimic ? "Poséidéion II (mois intercalaire)" : ATTIC_MONTHS[monthIndex];

  return { monthName, day, daysInMonth, isEmbolimic, deities: atticSacredDeities(day, daysInMonth) };
}

// Membre de phrase "— à honorer aujourd'hui : X" (une ou plusieurs divinités, jointes à la
// française) à ajouter après la date attique, ou chaîne vide si ce jour du mois n'a pas de
// divinité qui lui soit propre. Chaque nom est une puce cliquable (.clickable-deity, liée
// par bindChips()) qui ouvre la fiche complète de la divinité.
function atticDeityNoteHTML(deities){
  if(!deities.length) return "";
  const chips = deities.map(id => `<span class="clickable-deity" data-deity="${escapeHTML(id)}">${escapeHTML(id.charAt(0).toUpperCase()+id.slice(1))}</span>`);
  const joined = chips.length === 1 ? chips[0] : `${chips.slice(0,-1).join(", ")} et ${chips[chips.length-1]}`;
  return ` — à honorer aujourd'hui : ${joined}`;
}

function home(){
  const streak = updateStreak();
  const attic = atticCalendarInfo();
  const day = MAJORS[dayOfYear() % MAJORS.length];
  const lore = CARD_LORE[day[0]];
  const profile = getProfile();
  const links = profileMajorLinks();
  const resonates = !!(links && links.some(l => l.card[0] === day[0]));
  ensureTransits();
  // Portrait et textes d'interprétation IA : contenu premium (voir renderProfilResults) —
  // ne pas préchauffer le cache pour un profil gratuit qui ne les affichera jamais.
  if(isPremiumEnabled()){
    ensurePortrait();
    ensureAstralText();
  }
  const cachedTransits = getCachedTransits();
  ensureRitual(day, cachedTransits);
  const ritual = getCachedRitual();
  return `<section class="hero">
    ${homeGlowHTML()}
    <div class="hero-emblem-cluster">
      <span class="hero-emblem mini" style="animation-delay:.6s">✦</span>
      <span class="hero-emblem">✦</span>
      <span class="hero-emblem mini" style="animation-delay:1.9s">✦</span>
    </div>
    <h2>Tarot de Delphes</h2>
    ${profile?.firstName ? `<p class="note" style="margin-top:2px">✦ Bonjour ${escapeHTML(profile.firstName)} ✦</p>` : ""}
    <p class="attic-line" style="margin-top:2px">📜 ${attic.day} ${escapeHTML(attic.monthName)} <span style="opacity:.75">(calendrier attique)</span>${atticDeityNoteHTML(attic.deities)}</p>
    ${streak > 1 ? `<span class="pill" style="margin-top:10px">✦ ${streak} jours de suite</span>` : ""}
  </section>
  ${ritual ? `<div class="section-title centered"><h3>Horoscope du jour</h3></div>
  <p class="lore-text" style="max-width:560px;margin:0 auto 20px;text-align:center;opacity:.9;font-weight:500">${escapeHTML(ritual)}</p>` : ""}
  <div class="section-title centered"><h3>Carte du jour</h3></div>
  <div class="day-card" data-card="${encodeURIComponent(JSON.stringify(day))}">${cardHTML(day,"major")}</div>
  ${resonates ? `<p class="note" style="text-align:center">✦ Cette carte résonne avec ton profil astral.</p>` : ""}
  ${lore ? `<p class="lore-text" style="max-width:560px;margin:14px auto 0;text-align:center;opacity:.85">${escapeHTML(lore.myth.length > 220 ? lore.myth.slice(0,220).trim()+"…" : lore.myth)}</p>` : ""}
  <p class="tap-hint">touche la carte pour en découvrir la lecture complète</p>
  <div class="grid" style="margin-top:30px">
    <div class="tile" data-go="tirage"><strong>✦ Tirer les cartes</strong><span>Choisis toi-même trois cartes dans le jeu.</span></div>
    <div class="tile" data-go="apprendre"><strong>◈ Apprendre</strong><span>Un parcours progressif sur les 78 cartes.</span></div>
    <div class="tile" data-go="reves"><strong>☾ Rêves</strong><span>Note un rêve, fais-le interpréter à la manière des devins grecs.</span></div>
    <div class="tile" data-go="profil"><strong>☉ Profil</strong><span>Ton profil astral et tes tirages passés.</span></div>
  </div>`;
}

function tirage(){
  if(!tirageState.spreadType){
    return `<section class="draw-zone">
      ${oracleGlowHTML()}
      <div class="hero-emblem small">✦</div>
      <p class="note">Choisis le tirage qui correspond à ta question.</p>
    </section>
    <div class="grid" style="margin-top:10px">
      ${Object.values(SPREADS).map(s=>{
        const displayCount = s.key === "annee" ? remainingMonthsPositions().length : s.count;
        const locked = !canStartSpread(s.key);
        return `<div class="tile${locked?" locked":""}" data-spread="${s.key}">
        <strong>${s.glyph} ${escapeHTML(s.name)}${locked?" 🔒":""}</strong>
        <span>${escapeHTML(s.description)} (${displayCount} carte${displayCount>1?"s":""})</span>
        ${locked ? `<span class="note" style="display:block;margin-top:4px">${isSpreadTypeFree(s.key) ? "Ton tirage général gratuit du jour est déjà utilisé — reviens demain, ou passe en premium." : "Fonctionnalité premium — active-la depuis l'onglet Profil."}</span>` : ""}
      </div>`;
      }).join("")}
    </div>`;
  }
  const conf = spreadConf();
  if(!tirageState.spread){
    return `<section class="draw-zone">
      ${oracleGlowHTML()}
      <div class="hero-emblem small">${conf.glyph}</div>
      <span class="pill">${escapeHTML(conf.name)}</span>
      <p class="note">Pose ta question, puis choisis toi-même ${conf.count} carte${conf.count>1?"s":""} dans le jeu, face cachée.</p>
      <textarea id="drawQuestion" class="draw-question" placeholder="Écris ta question ici…">${escapeHTML(tirageState.question)}</textarea>
      <button class="primary" id="drawBtn" ${tirageState.question.trim()?"":"disabled"}>Consulter les arcanes</button>
      <button class="ghost" id="changeSpread">← Changer de tirage</button>
    </section>`;
  }
  const { spread, picks, question } = tirageState;
  if(picks.length < conf.count){
    const remaining = conf.count - picks.length;
    return `<section class="draw-zone compact">
      <p class="note">Choisis ${remaining} carte${remaining>1?"s":""} parmi celles-ci.</p>
      <p class="picks-counter">${picks.length} / ${conf.count} choisies</p>
    </section>
    <div class="deck-grid">${spread.map((c,i)=>cardBackHTML(i, c, picks.includes(i))).join("")}</div>`;
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

// Génère le halo & pluie d'étoiles utilisés pour animer l'encart "pose ta question" du
// tirage (déplacé ici depuis l'animation de chargement, cf. commentaire dans styles.css).
function oracleGlowHTML(){
  const count = 16;
  const glyphs = ["✦","✧","✶"];
  let stars = "";
  for(let i=0;i<count;i++){
    const left = (Math.random()*94).toFixed(1);
    const delay = (Math.random()*4.6).toFixed(2);
    const dur = (2.4 + Math.random()*2.2).toFixed(2);
    const rise = (-(140 + Math.random()*100)).toFixed(0);
    const g = glyphs[i % glyphs.length];
    stars += `<span class="spark-star" style="left:${left}%;--rise:${rise}px;animation-delay:${delay}s;animation-duration:${dur}s">${g}</span>`;
  }
  const haloDelay = (Math.random()*2.4).toFixed(2);
  const flashDelay = (Math.random()*3.4).toFixed(2);
  return `<div class="oracle-glow" style="--halo-delay:${haloDelay}s;--flash-delay:${flashDelay}s">${stars}</div>`;
}

// Calcule le texte de lecture (par carte + synthèse, IA ou repli local) pour le tirage en
// cours — utilisé à la fois pour l'affichage (renderDrawResult) et pour l'enregistrement
// dans le Journal, qui garde ainsi la lecture complète et pas seulement les noms des cartes.
function currentReadingTexts(){
  const { question, spread, picks, aiReading, aiStatus, spreadType } = tirageState;
  const chosen = picks.map(i=>spread[i]);
  const domain = detectDomain(question);
  const conf = spreadConf();
  const useAI = aiStatus === "done" && aiReading;
  const cardTexts = chosen.map((c,i)=> useAI ? aiReading.cards[i] : interpretationFor(c,i,domain, spreadType==="general" ? null : conf.positions[i]));
  const synthesis = useAI
    ? [aiReading.synthesis]
    : (spreadType==="general" ? synthesisParagraphs(question,chosen,domain) : synthesisParagraphsGeneric(question,chosen,domain));
  return { cardTexts, synthesis, source: useAI ? "ai" : "local" };
}

function renderDrawResult(){
  const { question, spread, picks, notes, saved, aiStatus, spreadType } = tirageState;
  const chosen = picks.map(i=>spread[i]);
  const domain = detectDomain(question);
  const conf = spreadConf();
  const loading = aiStatus === "loading";
  const reading = loading ? null : currentReadingTexts();

  const synthesisHTML = loading
    ? `<div class="ai-loading-magic">${starLoaderHTML("lg")}<p class="ai-loading-text">Les arcanes se consultent…</p></div>`
    : `${typewriterHTML(reading.synthesis)}
       ${reading.source==="local" && aiStatus==="error" ? `<p class="note">(Lecture générée hors-ligne — le service de lecture personnalisée n'a pas répondu.)</p>` : ""}`;

  return `
    ${spreadType === "annee"
      ? `<p class="question-recall">✦ Année à venir</p>`
      : `<p class="question-recall">« ${escapeHTML(question)} »</p>`}
    <div class="reading-grid">
      ${chosen.map((c,i)=>`<article class="reading-block">
        <div class="reading-roman">${escapeHTML(conf.positions[i]||"")}</div>
        ${cardHTML(c,c[4]==="major"?"major":(SUITS[c[6]]?.[0]||"major"))}
        <p class="card-name-recall">${escapeHTML(cardFullName(c))}</p>
        ${loading ? `<div class="ai-loading-magic small">${starLoaderHTML("sm")}</div>` : `<p>${escapeHTML(reading.cardTexts[i])}</p>`}
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

// Habille une illustration statique de 2 petits points de lumière scintillants (pur CSS,
// délais dérivés du nom pour varier d'une image à l'autre) — le zoom/pan lui-même
// vient de l'animation CSS posée sur .tile-img / .card-img.
function illusHTML(src, seed){
  const h = String(seed).split("").reduce((a,c)=>a+c.charCodeAt(0),0);
  const d1 = (0.2 + (h % 10) / 6).toFixed(2);
  const d2 = (1.2 + (h % 7) / 5).toFixed(2);
  return `<div class="illus"><img class="tile-img" src="${src}" alt="">
    <span class="spark" style="top:8%;left:10%;animation-delay:${d1}s"></span>
    <span class="spark" style="top:15%;left:82%;animation-delay:${d2}s"></span>
  </div>`;
}

// Progression personnelle : score composite pondéré sur ce qui a réellement été
// consulté en détail (cartes 60%, figures mythologiques 20%, symboles/nombres 20%) —
// pas juste le nombre de tirages sauvegardés, qui ne reflétait pas un vrai apprentissage.
function learningProgress(){
  const totalCards = CARDS.length;
  const totalFigures = Object.keys(DEITY_NOTES).length;
  const totalSymbols = Object.keys(SYMBOL_LIBRARY).length + Object.keys(NUMBER_KEYS).length;
  const cardsSeen = Math.min(totalCards, seenCount("cards"));
  const figuresSeen = Math.min(totalFigures, seenCount("figures"));
  const symbolsSeen = Math.min(totalSymbols, seenCount("symbols"));
  const percent = Math.min(100, Math.round(
    60 * (cardsSeen/totalCards) + 20 * (figuresSeen/totalFigures) + 20 * (symbolsSeen/totalSymbols)
  ));
  return { percent, totalCards, totalFigures, totalSymbols, cardsSeen, figuresSeen, symbolsSeen };
}

// Relie un thème astral (sunSign/moonSign/ascendant.sign) aux arcanes majeurs via
// ZODIAC_MAJOR_LINKS. Regroupe Soleil/Lune/Ascendant qui tomberaient sur la même carte
// plutôt que de l'afficher en double. Factorisé hors de profileMajorLinks() ci-dessous pour
// être réutilisable par profileForAstralText() (qui reçoit un `saved` explicite, sans
// repasser par getProfile() — voir le commentaire sur cette fonction).
function majorLinksFor(astral){
  if(!astral) return null;
  const items = [];
  if(astral.sunSign) items.push({ label:"Soleil", sign:astral.sunSign });
  if(astral.moonSign) items.push({ label:"Lune", sign:astral.moonSign });
  if(astral.ascendant && astral.ascendant.sign) items.push({ label:"Ascendant", sign:astral.ascendant.sign });

  const byCard = {};
  items.forEach(it=>{
    const cardName = ZODIAC_MAJOR_LINKS[it.sign];
    const card = cardName && MAJORS.find(c=>c[0]===cardName);
    if(!card) return;
    (byCard[cardName] ||= { card, labels:[], sign: it.sign }).labels.push(it.label);
  });
  const result = Object.values(byCard);
  return result.length ? result : null;
}
// Relie le profil astral ENREGISTRÉ aux arcanes majeurs, pour mettre en avant "tes" cartes
// dans l'onglet Profil et dans Apprendre (voir majorLinksFor() ci-dessus pour la logique).
function profileMajorLinks(){
  const p = getProfile();
  if(!p || !p.astral) return null;
  return majorLinksFor(p.astral);
}

function apprendre(){
  const p = learningProgress();
  return `<section class="hero">
    ${constellationHTML()}
    <div class="hero-emblem">✦</div>
    <h2>Apprendre le Tarot de Delphes</h2>
    <p>Explore le jeu par catégorie, ou découvre les figures mythologiques qui l'inspirent.</p>
    <div class="progress"><span style="width:${p.percent}%"></span></div>
    <small>Progression personnelle : ${p.percent}%</small>
  </section>
  <div class="grid" style="margin-top:20px">
    <div class="tile" data-learn="majeurs">${illusHTML("assets/learn-majeurs.jpg","majeurs")}<strong>Arcanes majeurs</strong><span>Les 22 grandes figures du jeu.</span></div>
    <div class="tile" data-learn="cour">${illusHTML("assets/learn-cour.jpg","cour")}<strong>Figures de cour</strong><span>16 figures, réparties en 4 enseignes.</span></div>
    <div class="tile" data-learn="numerales">${illusHTML("assets/learn-numerales.jpg","numerales")}<strong>Cartes numérales</strong><span>40 cartes, de l'As au Dix.</span></div>
    <div class="tile" data-learn="figures">${illusHTML("assets/learn-figures.jpg","figures")}<strong>Figures mythologiques</strong><span>Les ${Object.keys(DEITY_NOTES).length} divinités et héros du jeu.</span></div>
    <div class="tile" data-learn="symboles"><strong>✧ Bibliothèque symbolique</strong><span>Tous les symboles et les nombres, reliés aux cartes et aux figures.</span></div>
  </div>`;
}

/* ----- Sous-navigation de l'onglet Apprendre (écrans "detail" ré-utilisant le motif showXDetail) ----- */

function showLearnMajors(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">
    <div class="section-title"><h3>Arcanes majeurs</h3></div>
    <div class="card-grid">${MAJORS.map(c=>cardHTML(c)).join("")}</div>
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel : render() (ou tout écran qu'il affiche) peut lui-même
    // réécrire preDetailScroll pour SES propres besoins avant qu'on ait pu le relire —
    // exactement le même risque de corruption que cardDetailReturnTo (voir le commentaire
    // au-dessus de showSymbolDetail()), pour la même raison : une seule variable globale
    // mutable, réutilisée par tous les écrans "detail".
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = showLearnMajors;
  bindCards();
}

const SUIT_IMAGES = {"Bâtons":"assets/suit-batons.jpg","Coupes":"assets/suit-coupes.jpg","Deniers":"assets/suit-deniers.jpg","Épées":"assets/suit-epees.jpg"};

function showLearnCategory(kind){
  preDetailScroll = window.scrollY;
  const title = kind==="cour" ? "Figures de cour" : "Cartes numérales";
  document.getElementById("screen").innerHTML = `<div class="detail">
    <div class="section-title"><h3>${title}</h3></div>
    <div class="grid">${Object.entries(SUITS).map(([suit,m])=>`<div class="tile" data-learn-kind="${kind}" data-learn-suit="${escapeHTML(suit)}">${illusHTML(SUIT_IMAGES[suit],suit)}<strong>${escapeHTML(suit)}</strong><span>${escapeHTML(m[2])}</span></div>`).join("")}</div>
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel : render() (ou tout écran qu'il affiche) peut lui-même
    // réécrire preDetailScroll pour SES propres besoins avant qu'on ait pu le relire —
    // exactement le même risque de corruption que cardDetailReturnTo (voir le commentaire
    // au-dessus de showSymbolDetail()), pour la même raison : une seule variable globale
    // mutable, réutilisée par tous les écrans "detail".
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  document.querySelectorAll("[data-learn-suit]").forEach(el=>{
    el.onclick = ()=> showLearnSuit(el.dataset.learnKind, el.dataset.learnSuit);
  });
}

function showLearnSuit(kind, suit){
  preDetailScroll = window.scrollY;
  const cards = kind==="cour"
    ? (COURTS[suit]||[]).map(x=>[x[0],x[1],x[2],x[3],"court","",suit])
    : CARDS.filter(c=>c[4]==="number" && c[6]===suit);
  document.getElementById("screen").innerHTML = `<div class="detail">
    <div class="section-title"><h3>${escapeHTML(suit)}</h3></div>
    <div class="card-grid">${cards.map(c=>cardHTML(c,SUITS[suit]?.[0]||"major")).join("")}</div>
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=> showLearnCategory(kind);
  cardDetailReturnTo = () => showLearnSuit(kind, suit);
  bindCards();
}

function showLearnFigures(){
  preDetailScroll = window.scrollY;
  const entries = Object.entries(DEITY_NOTES).sort((a,b)=>a[0].localeCompare(b[0],"fr"));
  // Recherche en direct, même mécanisme que showSymbolsLibrary() (#symbolSearch/[data-search])
  // mais avec son propre id : cet écran ne passe pas par render()/bind() — un id dédié,
  // câblé ici même, reste cohérent avec le reste de l'écran qui gère déjà son propre
  // bindChips() plutôt que de dépendre de bind().
  document.getElementById("screen").innerHTML = `<div class="detail">
    <div class="section-title"><h3>Figures mythologiques</h3></div>
    <p class="note">${entries.length} figures citées dans le jeu — certaines ont leur propre carte, d'autres n'apparaissent que dans une lecture.</p>
    <div class="search"><input id="figuresSearch" placeholder="Rechercher une figure…"></div>
    <div class="symbol-list" style="margin-top:14px">${entries.map(([id,note])=>`<div class="symbol clickable" data-deity="${escapeHTML(id)}" data-search="${escapeHTML((id+" "+note).toLowerCase())}"><b>${escapeHTML(id.charAt(0).toUpperCase()+id.slice(1))}</b><br><small>${escapeHTML(note)}</small></div>`).join("")}</div>
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel : render() (ou tout écran qu'il affiche) peut lui-même
    // réécrire preDetailScroll pour SES propres besoins avant qu'on ait pu le relire —
    // exactement le même risque de corruption que cardDetailReturnTo (voir le commentaire
    // au-dessus de showSymbolDetail()), pour la même raison : une seule variable globale
    // mutable, réutilisée par tous les écrans "detail".
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  // Pour qu'une figure cliquée dans cette liste revienne bien ici plutôt que de sauter
  // au menu Apprendre (même logique que showSymbolDetail() etc.).
  cardDetailReturnTo = () => showLearnFigures();
  const search = document.getElementById("figuresSearch");
  search.addEventListener("input", ()=>{
    const q = search.value.toLowerCase().trim();
    document.querySelectorAll("#screen [data-search]").forEach(el=>{ el.hidden = q && !el.dataset.search.includes(q); });
  });
  bindChips();
}

// Écran "detail" (accessible depuis la tuile "Bibliothèque symbolique" de l'onglet
// Apprendre — anciennement son propre onglet de premier niveau "Symboles", fusionné ici
// pour libérer une place dans la barre de navigation, voir reves()/showDreamHome()) — même
// motif que showLearnFigures() : recherche en direct sur son propre id dédié, cette fonction
// gère son propre binding plutôt que de dépendre de bind()/#symbolSearch.
function showSymbolsLibrary(){
  preDetailScroll = window.scrollY;
  // Un seul répertoire, trié par ordre alphabétique — plus de catégories : symboles et
  // nombres mélangés, triés sur leur libellé affiché (locale française, accents compris).
  const items = [
    ...Object.entries(SYMBOL_LIBRARY).map(([id,s])=>({ sort:s.label, html:symbolCard(id,s) })),
    ...Object.entries(NUMBER_KEYS).map(([n,k])=>({
      sort:k[0],
      html:`<div class="symbol clickable" data-number="${n}" data-search="${escapeHTML((k[0]+" "+k[1]+" "+k[2]).toLowerCase())}"><b>${n==="1"?"As":n} — ${escapeHTML(k[0])}</b><br>${escapeHTML(k[1])}</div>`
    }))
  ].sort((a,b)=>a.sort.localeCompare(b.sort,"fr"));

  document.getElementById("screen").innerHTML = `<div class="detail">
    <div class="section-title"><h3>Bibliothèque symbolique</h3></div>
    <p class="note">Chaque symbole est relié aux cartes et aux figures mythologiques qui l'utilisent.</p>
    <div class="search"><input id="symbolSearch" placeholder="Rechercher un symbole…"></div>
    <div class="symbol-list" style="margin-top:14px">${items.map(i=>i.html).join("")}</div>
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel : render() (ou tout écran qu'il affiche) peut lui-même
    // réécrire preDetailScroll pour SES propres besoins avant qu'on ait pu le relire —
    // exactement le même risque de corruption que cardDetailReturnTo (voir le commentaire
    // au-dessus de showSymbolDetail()), pour la même raison : une seule variable globale
    // mutable, réutilisée par tous les écrans "detail".
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  // Pour qu'un symbole cliqué dans cette liste revienne bien ici plutôt que de sauter au
  // menu Apprendre (même logique que showLearnFigures() etc.).
  cardDetailReturnTo = () => showSymbolsLibrary();
  const search = document.getElementById("symbolSearch");
  search.addEventListener("input", ()=>{
    const q = search.value.toLowerCase().trim();
    document.querySelectorAll("#screen [data-search]").forEach(el=>{ el.hidden = q && !el.dataset.search.includes(q); });
  });
  bindChips();
}

function symbolCard(id, s){
  return `<div class="symbol clickable" data-symbol="${escapeHTML(id)}" data-search="${escapeHTML((s.label+" "+s.desc+" "+s.category).toLowerCase())}">
    <b>${s.icon} ${escapeHTML(s.label)}</b><br><small>${escapeHTML(s.desc.slice(0,80))}${s.desc.length>80?"…":""}</small>
  </div>`;
}

let preDetailScroll = 0;
// Où revenir depuis le détail d'une carte : par défaut la vue courante (render()),
// mais surchargé par les écrans "detail" intermédiaires (symbole, nombre, divinité,
// sous-listes d'Apprendre) pour qu'un retour depuis une fiche carte ramène bien à la
// sous-liste d'où l'on vient, pas directement au menu principal.
let cardDetailReturnTo = () => render();

// backTo (2e paramètre) : écran vers lequel revenir, capturé UNE SEULE FOIS au moment où
// cette fiche est ouverte pour la première fois (valeur par défaut = cardDetailReturnTo
// courant). Le passer explicitement — plutôt que de relire cardDetailReturnTo à chaque
// appel — est indispensable : cardDetailReturnTo est réécrasé plus bas pour les liens
// internes de CETTE fiche, donc le relire au moment du clic sur "← Retour" pointerait vers
// la fiche qu'on vient de quitter, pas vers celle d'où l'on est arrivé (ex. symbole → figure
// → carte → retour → retour se retrouverait bloqué en boucle sur la carte).
function showSymbolDetail(id, backTo = cardDetailReturnTo){
  const s = SYMBOL_LIBRARY[id]; if(!s) return;
  const wasNew = markSeen("symbols", id);
  preDetailScroll = window.scrollY;
  const related = cardsForSymbol(id);
  const linkedDeities = s.links.filter(l => DEITY_NOTES[l]);
  document.getElementById("screen").innerHTML = `<div class="detail">
    ${wasNew ? discoveryFX() : ""}
    <div class="symbol-hero">${s.icon}</div>
    <h2>${escapeHTML(s.label)}</h2>
    <p class="symbol-cat-big">${escapeHTML(s.category)}</p>
    <p>${escapeHTML(s.desc)}</p>
    ${s.lore && s.lore.length ? (
      (isPremiumEnabled() || isSymbolLoreFree(id))
        ? `<div class="section-title"><h3>Aux origines du symbole</h3></div>${s.lore.map(p=>`<p class="lore-text">${escapeHTML(p)}</p>`).join("")}`
        : `<div class="section-title"><h3>Aux origines du symbole</h3></div>${premiumLockHTML("Le texte mythologique détaillé de ce symbole fait partie du contenu premium.")}`
    ) : ""}
    ${linkedDeities.length ? `<div class="section-title"><h3>Figures liées</h3></div>
      <div class="symbol-list">${linkedDeities.map(d=>`<div class="symbol clickable" data-deity="${escapeHTML(d)}"><b>${escapeHTML(d[0].toUpperCase()+d.slice(1))}</b><br><small>${escapeHTML(DEITY_NOTES[d])}</small></div>`).join("")}</div>` : ""}
    ${related.length ? `<div class="section-title"><h3>Cartes concernées</h3></div>
      <div class="card-grid">${related.map(c=>cardHTML(c, c[4]==="major"?"major":(SUITS[c[6]]?.[0]||"major"))).join("")}</div>` : ""}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel, même raison que ci-dessus pour backTo() : l'écran vers
    // lequel on revient peut réécrire preDetailScroll pour ses propres besoins.
    const scrollTarget = preDetailScroll;
    backTo();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = () => showSymbolDetail(id, backTo);
  bindCards(); bindChips();
}

// Voir le commentaire au-dessus de showSymbolDetail() pour le paramètre backTo.
function showNumberDetail(n, backTo = cardDetailReturnTo){
  const k = NUMBER_KEYS[n]; if(!k) return;
  const wasNew = markSeen("symbols", "n"+n); // préfixé pour ne jamais entrer en collision avec un id de symbole
  preDetailScroll = window.scrollY;
  const related = CARDS.filter(c => c[4]==="number" && c[7]===Number(n));
  document.getElementById("screen").innerHTML = `<div class="detail">
    ${wasNew ? discoveryFX() : ""}
    <div class="symbol-hero">${n==="1"?"As":n}</div>
    <h2>${n==="1"?"As":n} — ${escapeHTML(k[0])}</h2>
    <p class="symbol-cat-big">Grammaire des nombres</p>
    <p>${escapeHTML(k[1])} — ${escapeHTML(k[2])}</p>
    <div class="section-title"><h3>Cartes concernées</h3></div>
    <div class="card-grid">${related.map(c=>cardHTML(c, SUITS[c[6]]?.[0]||"major")).join("")}</div>
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel, même raison que ci-dessus pour backTo() : l'écran vers
    // lequel on revient peut réécrire preDetailScroll pour ses propres besoins.
    const scrollTarget = preDetailScroll;
    backTo();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = () => showNumberDetail(n, backTo);
  bindCards(); bindChips();
}

// Voir le commentaire au-dessus de showSymbolDetail() pour le paramètre backTo.
function showDeityDetail(id, backTo = cardDetailReturnTo){
  const note = DEITY_NOTES[id]; if(!note) return;
  const wasNew = markSeen("figures", id);
  preDetailScroll = window.scrollY;
  const name = id.charAt(0).toUpperCase()+id.slice(1);
  const related = CARDS.filter(c => (c[4]==="major"||c[4]==="court")
    ? (c[1]||"").toLowerCase()===id
    : NUMBER_CARD_DEITY[c[0]]===id); // cartes numérales dotées d'une figure propre (voir NUMBER_CARD_DEITY)
  const lore = DEITY_LORE[id];
  document.getElementById("screen").innerHTML = `<div class="detail">
    ${wasNew ? discoveryFX() : ""}
    <div class="symbol-hero">✦</div>
    <h2>${escapeHTML(name)}</h2>
    <p class="symbol-cat-big">Figure mythologique</p>
    <p>${escapeHTML(note)}</p>
    ${lore && lore.length ? (
      (isPremiumEnabled() || isFigureLoreFree(id))
        ? `<div class="section-title"><h3>Le mythe</h3></div>${lore.map(p=>`<p class="lore-text">${escapeHTML(p)}</p>`).join("")}`
        : `<div class="section-title"><h3>Le mythe</h3></div>${premiumLockHTML("Le mythe complet de cette figure fait partie du contenu premium.")}`
    ) : ""}
    ${related.length ? `<div class="section-title"><h3>Carte${related.length>1?"s":""} associée${related.length>1?"s":""}</h3></div>
      <div class="card-grid">${related.map(c=>cardHTML(c, c[4]==="major"?"major":(SUITS[c[6]]?.[0]||"major"))).join("")}</div>` : ""}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel, même raison que ci-dessus pour backTo() : l'écran vers
    // lequel on revient peut réécrire preDetailScroll pour ses propres besoins.
    const scrollTarget = preDetailScroll;
    backTo();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = () => showDeityDetail(id, backTo);
  bindCards(); bindChips();
}

/* ===================== ONGLET PROFIL (profil astral + journal) ===================== */

function profil(){
  const links = profileMajorLinks();
  ensureRetrospective();
  const retrospective = getCachedRetrospective();
  const retrospectiveReady = retrospective && retrospective.year === new Date().getFullYear();
  return `<section class="hero">
    <div class="hero-emblem">☉</div>
    <h2>Profil</h2>
    <p>Ton profil astral et l'historique de tes tirages — tout reste privé, sur cet appareil.</p>
  </section>
  <div class="grid" style="margin-top:20px">
    <div class="tile" data-profil-go="astral"><strong>☉ Profil astral</strong><span>Ton thème natal complet, calculé à partir de ta date, heure et lieu de naissance.</span></div>
    <div class="tile" data-profil-go="journal"><strong>☽ Journal</strong><span>${journal.length} tirage${journal.length>1?"s":""} enregistré${journal.length>1?"s":""}.</span></div>
    <div class="tile" data-profil-go="stats"><strong>📊 Statistiques</strong><span>Tes tendances : cartes, thèmes, série de jours.</span></div>
    <div class="tile" data-profil-go="relations"><strong>🤝 Mes proches</strong><span>Compare ton thème à celui d'un partenaire, d'un enfant, d'un parent…</span></div>
    ${links ? `<div class="tile" data-profil-go="majeurs"><strong>🃏 Arcanes majeurs liés</strong><span>Les cartes que ton Soleil, ta Lune et ton Ascendant réveillent dans le jeu.</span></div>` : ""}
    ${retrospectiveReady ? `<div class="tile" data-go-retrospective="1"><strong>🎂 Ta rétrospective de l'année</strong><span>Un an de tirages, résumé pour toi.</span></div>` : ""}
  </div>
  <p class="note" style="text-align:center;margin-top:22px"><a href="politique-confidentialite.html" target="_blank" rel="noopener">Politique de confidentialité</a></p>`;
}

// Écran dédié (sorti de profil() pour lui laisser toute la place — auparavant une simple
// section en bas de l'onglet Profil, désormais sa propre tuile) : quels arcanes majeurs le
// thème réveille (Soleil/Lune/Ascendant, voir profileMajorLinks()/majorLinksFor()), et
// pourquoi ces cartes précisément + ce qu'elles disent de la personne (majorLinksText, IA,
// premium — voir plus haut).
function renderMajorLinks(){
  const links = profileMajorLinks();
  if(!links){
    return `<div class="section-title"><h3>Arcanes majeurs liés à ton profil astral</h3></div>
    <p class="note" style="text-align:center">Renseigne d'abord ton profil astral pour découvrir les arcanes majeurs qu'il réveille.</p>`;
  }
  // Le texte qui explique CE lien (pourquoi ces cartes précisément, ce qu'elles disent de
  // la personne) est de l'interprétation écrite : même découpage gratuit/premium que le
  // reste du Profil astral (voir renderProfilResults()/premiumLockHTML()) — la grille de
  // cartes elle-même (donnée brute : quel signe pointe vers quelle carte) reste gratuite,
  // seule l'explication est verrouillée.
  const premiumOn = isPremiumEnabled();
  if(premiumOn) ensureAstralText();
  const majorLinksText = premiumOn ? (getCachedAstralText()?.majorLinksText || majorLinksTextFallback(links) || null) : null;
  return `<div class="section-title"><h3>Arcanes majeurs liés à ton profil astral</h3></div>
  ${premiumOn
    ? (majorLinksText ? majorLinksText.split(/\n\s*\n/).map(p=>`<p class="lore-text" style="margin-top:10px">${escapeHTML(p.trim())}</p>`).join("") : "")
    : premiumLockHTML("Pourquoi ces cartes précisément — et ce qu'elles disent de toi — fait partie du contenu premium.")}
  <div class="card-grid" style="margin-top:14px">${links.map(l=>`<div>
    <p class="suit-h4" style="text-align:center;margin-bottom:6px">${escapeHTML(l.labels.join(" & "))} en ${escapeHTML(l.sign)}</p>
    ${cardHTML(l.card,"major")}
  </div>`).join("")}</div>`;
}
function showMajorLinks(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">${renderMajorLinks()}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel : render() (ou tout écran qu'il affiche) peut lui-même
    // réécrire preDetailScroll pour SES propres besoins avant qu'on ait pu le relire —
    // exactement le même risque de corruption que cardDetailReturnTo (voir le commentaire
    // au-dessus de showSymbolDetail()), pour la même raison : une seule variable globale
    // mutable, réutilisée par tous les écrans "detail".
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = showMajorLinks;
  bindCards();
}

/* ===================== ONGLET RÊVES (onirocritique grecque, IA) ===================== */
// Dans la Grèce antique, l'onirocritique — l'art de décrypter les rêves — était une vraie
// pratique divinatoire : Artémidore de Daldis en a laissé, au IIe siècle après J.-C., le
// traité le plus complet de l'Antiquité, l'Onirocriticon. Cette section s'en inspire : on
// raconte un rêve en texte libre (voir renderDreamForm()), l'IA en propose une
// interprétation (jamais une prédiction littérale de l'avenir, voir api/dream.js), et on
// peut la conserver dans un journal des rêves entièrement local (voir dreamJournalView()) —
// même logique de confidentialité que le Journal des tirages, mais une archive séparée.
//
// Anciennement l'onglet "Symboles" de premier niveau, fusionné dans Apprendre (voir
// showSymbolsLibrary()) pour libérer cette place dans la barre de navigation.
//
// Découpage gratuit/premium : noter, modifier et conserver un rêve reste gratuit (ce n'est
// que de la donnée, comme la gestion des proches) ; seule l'interprétation IA elle-même est
// réservée au premium, comme le reste de l'interprétation écrite de l'appli.
// Illustration de l'onglet Rêves : réutilise l'animation ken-burns déjà posée sur les
// vignettes (zoom/pan lent sur l'image, voir styles.css) pour donner une impression de
// nuages qui dérivent, et la classe .star déjà utilisée par starLoaderHTML() (scintillement
// twinkle) pour quelques étoiles scintillantes par-dessus — positions/délais fixes mais
// variés, purement décoratif, respecte prefers-reduced-motion comme le reste de l'app.
function revesHeroHTML(){
  const stars = [
    {left:12,top:12,delay:.2,dur:2.6},
    {left:80,top:9,delay:1.1,dur:2.1},
    {left:56,top:24,delay:.6,dur:2.8},
    {left:88,top:36,delay:1.6,dur:2.3},
    {left:20,top:48,delay:.9,dur:2.5},
    {left:68,top:58,delay:1.9,dur:2.2},
    {left:38,top:6,delay:.4,dur:2.4},
  ];
  return `<div class="reves-hero">
    <img class="reves-hero-img" src="assets/reves-hero.jpg" alt="">
    ${stars.map(s=>`<span class="star" style="left:${s.left}%;top:${s.top}%;animation-delay:${s.delay}s;animation-duration:${s.dur}s">✦</span>`).join("")}
  </div>`;
}
function reves(){
  return `<section class="hero">
    ${revesHeroHTML()}
    <div class="hero-emblem">☾</div>
    <h2>Rêves</h2>
    <p>Dans la Grèce antique, on lisait aussi l'avenir dans les rêves — <span class="clickable-deity" data-deity="morphée">Morphée</span> en façonnait les images, et des devins comme Artémidore de Daldis les décryptaient au réveil. Raconte ce dont tu te souviens, pour en connaître la signification.</p>
  </section>
  <div class="grid" style="margin-top:20px">
    <div class="tile" data-reves-go="new"><strong>✍️ Noter un rêve</strong><span>${dreamState.text.trim() ? "Reprends ton brouillon en cours." : "Raconte ce dont tu te souviens, seul(e) ou pour une interprétation."}</span></div>
    <div class="tile" data-reves-go="journal"><strong>📖 Journal des rêves</strong><span>${dreams.length} rêve${dreams.length>1?"s":""} enregistré${dreams.length>1?"s":""}.</span></div>
  </div>`;
}

// Résumé minimal envoyé à /api/dream en plus du récit lui-même : le métier notamment change
// beaucoup le sens plausible d'un rêve (ex. un rêve de chute ou de retard n'évoque pas la
// même chose selon qu'on est étudiant·e ou en poste à responsabilités) — retour direct
// d'utilisatrice. Uniquement le contexte de vie (voir lifeContextFor()), jamais le thème
// astral complet : un rêve reste avant tout un texte à interpréter pour lui-même.
function profileForDream(){
  const p = getProfile();
  if(!p) return null;
  return lifeContextFor(p);
}

// Résumé minimal du tirage le plus récent, prêt à envoyer à /api/dream (voir
// generateDreamAnalysis()) — sens inverse de recentDreamForReading() plus haut : les cartes
// tirées et un court extrait de la synthèse déjà générée, jamais la question posée (même
// discrétion que cardMemory() : la question reste privée). `journal` est trié du plus
// récent au plus ancien (unshift à l'enregistrement) — pas de filtre de fraîcheur ici
// (contrairement aux rêves, ses entrées n'ont pas de repère numérique exploitable, `date`
// n'étant qu'une chaîne déjà formatée) : le tirage le plus récent reste digne d'être
// mentionné même après un délai, ne serait-ce que comme un fil qui continue.
function recentReadingForDream(){
  if(!journal.length) return null;
  const j = journal[0];
  if(!Array.isArray(j.cards) || !j.cards.length) return null;
  const synth = typeof j.synthesis === "string" ? j.synthesis.trim() : "";
  return {
    date: j.date,
    cards: j.cards.slice(0,3),
    synthesisExcerpt: synth ? (synth.length>140 ? synth.slice(0,140).trim()+"…" : synth) : null,
  };
}

async function generateDreamAnalysis(dreamText){
  const profile = profileForDream();
  const recentReading = recentReadingForDream();
  const r = await fetch("/api/dream", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": getAccessCode() },
    body: JSON.stringify({ dreamText, ...(profile ? { profile } : {}), ...(recentReading ? { recentReading } : {}) })
  });
  if(r.status === 401) localStorage.removeItem("delphesAccessCode");
  const data = await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(data.error || "Impossible d'interpréter ce rêve pour le moment.");
  if(typeof data.analysis !== "string" || !data.analysis.trim()) throw new Error("Réponse IA incomplète");
  return data.analysis;
}

// Contrairement à startAIReading() (tirage), cet appel n'est jamais déclenché
// automatiquement : un rêve doit d'abord être écrit puis soumis explicitement (bouton
// "Interpréter"), pas relancé à chaque frappe.
function startDreamAnalysis(){
  if(dreamState.aiStatus === "loading") return;
  if(!dreamState.text.trim()) return;
  dreamState.aiStatus = "loading";
  saveDreamState();
  showDreamForm();
  generateDreamAnalysis(dreamState.text.trim())
    .then(analysis => {
      dreamState.analysis = analysis; dreamState.aiStatus = "done";
      saveDreamState();
      // Si ce rêve est déjà enregistré (mise à jour plutôt que première interprétation),
      // répercute l'analyse dans l'entrée du journal directement.
      if(dreamState.saved && dreamState.savedId != null){
        const entry = dreams.find(d=>d.id===dreamState.savedId);
        if(entry){ entry.analysis = analysis; saveDreams(); }
      }
      showDreamForm();
    })
    .catch(err => {
      console.error("Erreur /api/dream:", err.message);
      dreamState.aiStatus = "error"; saveDreamState(); showDreamForm();
    });
}

function renderDreamForm(){
  const { text, analysis, saved, aiStatus } = dreamState;
  const premiumOn = isPremiumEnabled();
  const loading = aiStatus === "loading";
  return `<div class="section-title"><h3>Noter un rêve</h3></div>
  <p class="note">Raconte ce dont tu te souviens, avec le plus de détails possible — lieux, personnages, émotions ressenties. Ton récit reste privé sur cet appareil ; il n'est envoyé que si tu demandes une interprétation.</p>
  <div class="draw-notes" style="margin-top:14px">
    <textarea id="dreamText" rows="8" placeholder="Cette nuit, j'ai rêvé que…" style="width:100%;resize:vertical;font:inherit">${escapeHTML(text)}</textarea>
  </div>
  ${loading ? `<div class="ai-loading-magic" style="margin-top:14px">${starLoaderHTML("lg")}<p class="ai-loading-text">Le rêve se laisse déchiffrer…</p></div>` : ""}
  ${analysis ? `<div class="section-title" style="margin-top:24px"><h3>Interprétation</h3></div>
    ${analysis.split(/\n\s*\n/).map(p=>`<p class="lore-text" style="margin-top:10px">${escapeHTML(p.trim())}</p>`).join("")}` : ""}
  ${aiStatus==="error" ? `<p class="note" style="color:var(--terracotta);margin-top:10px">L'interprétation n'a pas pu être générée. Réessaie dans un instant.</p>` : ""}
  <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
    <button class="primary" id="saveDream">${saved ? "Mettre à jour" : "Enregistrer dans mon journal"}</button>
    ${premiumOn ? `<button class="secondary" id="analyzeDream" ${loading?"disabled":""}>${analysis ? "Réinterpréter" : "Interpréter ce rêve"}</button>` : ""}
    <button class="ghost" id="clearDream">Effacer</button>
  </div>
  ${!premiumOn ? premiumLockHTML("L'interprétation IA du rêve, à la manière d'Artémidore de Daldis, fait partie du contenu premium — noter et conserver tes rêves reste gratuit.") : ""}`;
}
function showDreamForm(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">${renderDreamForm()}
    <button class="ghost" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = showDreamForm;
  bindDreamForm();
}
function bindDreamForm(){
  const textEl = document.getElementById("dreamText");
  const saveBtn = document.getElementById("saveDream");
  const analyzeBtn = document.getElementById("analyzeDream");
  const clearBtn = document.getElementById("clearDream");
  saveBtn.disabled = !dreamState.text.trim();
  textEl.addEventListener("input", ()=>{
    dreamState.text = textEl.value; saveDreamState();
    saveBtn.disabled = !textEl.value.trim();
  });
  saveBtn.onclick = ()=>{
    // Préserve la date d'origine sur une mise à jour (plutôt que de la rafraîchir à chaque
    // modification) — même logique que le "Modifier" d'un proche, voir upsertRelation().
    const existing = dreamState.savedId ? dreams.find(d=>d.id===dreamState.savedId) : null;
    const entry = {
      id: existing ? existing.id : String(Date.now()),
      date: existing ? existing.date : new Date().toLocaleString("fr-FR"),
      text: dreamState.text.trim(),
      analysis: dreamState.analysis,
    };
    const idx = dreams.findIndex(d=>d.id===entry.id);
    if(idx >= 0) dreams[idx] = entry; else dreams.unshift(entry);
    saveDreams();
    dreamState.saved = true; dreamState.savedId = entry.id; saveDreamState();
    alert("Rêve enregistré dans ton journal.");
    showDreamForm();
  };
  if(analyzeBtn) analyzeBtn.onclick = ()=> startDreamAnalysis();
  clearBtn.onclick = ()=>{
    dreamState = { text:"", analysis:null, saved:false, savedId:null, aiStatus:"idle" };
    saveDreamState();
    showDreamForm();
  };
}

function dreamJournalView(){
  if(!dreams.length) return `<div class="empty"><h2>Ton journal des rêves est vide.</h2><p>Il reste privé et local sur cet appareil.</p></div>`;
  const premiumOn = isPremiumEnabled();
  return `<section class="hero"><span class="pill">${dreams.length} rêve(s)</span><h2>Journal des rêves</h2></section>
  ${dreams.map((d,i)=>`<article class="tile journal-entry" style="margin-bottom:12px">
    <strong>${escapeHTML(d.date)}</strong>
    <p>${escapeHTML(d.text.length>140 ? d.text.slice(0,140).trim()+"…" : d.text)}</p>
    ${d.analysis
      ? (premiumOn
          ? `<details class="why"><summary>Revoir l'interprétation</summary>${d.analysis.split(/\n\s*\n/).map(p=>`<p>${escapeHTML(p.trim())}</p>`).join("")}</details>`
          : `<p class="note">🔒 Interprétation déjà générée — active le mode premium pour la revoir.</p>`)
      : `<p class="note">Pas encore interprété.</p>`}
    <div style="display:flex;gap:8px;margin-top:8px">
      <button class="ghost edit-dream" data-index="${i}">Modifier</button>
      <button class="ghost delete-dream" data-index="${i}">Supprimer</button>
    </div>
  </article>`).join("")}`;
}
function showDreamJournal(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">${dreamJournalView()}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = showDreamJournal;
  document.querySelectorAll(".edit-dream").forEach(b=>{
    b.onclick = ()=>{
      const i = Number(b.dataset.index);
      const d = dreams[i];
      dreamState = { text: d.text, analysis: d.analysis, saved:true, savedId:d.id, aiStatus:"idle" };
      saveDreamState();
      showDreamForm();
    };
  });
  document.querySelectorAll(".delete-dream").forEach(b=>{
    b.onclick = ()=>{
      const i = Number(b.dataset.index);
      const removedId = dreams[i].id;
      dreams.splice(i,1);
      saveDreams();
      // Le brouillon en cours pointait peut-être vers l'entrée qu'on vient de supprimer.
      if(dreamState.savedId === removedId){
        dreamState = { text:"", analysis:null, saved:false, savedId:null, aiStatus:"idle" };
        saveDreamState();
      }
      showDreamJournal();
    };
  });
}

/* ===================== ÉCRANS "MES PROCHES" ===================== */
// Gestion des proches (liste, ajout/modification, suppression) : toujours gratuite — c'est
// de la simple gestion de données, pas une interprétation. Seul l'écran de comparaison lui-
// même (renderComparison() plus bas) est premium.
function showRelations(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = renderRelations();
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  bindRelationsList();
  cardDetailReturnTo = showRelations;
}
function renderRelations(){
  const relations = getRelations();
  return `<div class="detail">
    <div class="section-title"><h3>Mes proches</h3></div>
    <p class="note">Compare ton thème à celui d'un proche — partenaire, enfant, parent, ami·e... Son thème reste uniquement sur cet appareil, comme le tien : le serveur ne fait que le calcul, sans rien conserver.</p>
    ${relations.length ? `<div class="symbol-list" style="margin-top:14px">
      ${relations.map(r=>`<div class="symbol">
        <div class="clickable" data-relation="${escapeHTML(r.id)}">
          <b>${escapeHTML(r.firstName)}</b><br><small>${escapeHTML(RELATION_TYPES[r.relationType]||"Autre")}${r.astral?.bodies?.sun?.sign ? " · "+escapeHTML(r.astral.bodies.sun.sign) : ""}</small>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button class="ghost edit-relation" data-edit-relation="${escapeHTML(r.id)}" style="font-size:12px;padding:4px 10px">Modifier</button>
          <button class="ghost delete-relation" data-delete-relation="${escapeHTML(r.id)}" style="font-size:12px;padding:4px 10px">Supprimer</button>
        </div>
      </div>`).join("")}
    </div>` : `<p class="note" style="text-align:center;margin-top:14px">Aucun proche enregistré pour l'instant.</p>`}
    <button class="primary" id="addRelation" style="margin-top:20px">+ Ajouter un proche</button>
    ${relations.length >= 2 ? `<button class="secondary" id="compareGroupBtn" style="margin-top:10px">👪 Comparer plusieurs proches</button>` : ""}
    <button class="ghost" id="detailBack" style="margin-top:10px">← Retour</button>
  </div>`;
}
function bindRelationsList(){
  document.getElementById("addRelation").onclick = ()=> showRelationForm();
  document.getElementById("detailBack").onclick = ()=>{
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  // N'existe que si au moins 2 proches sont enregistrés (voir renderRelations()).
  const groupBtn = document.getElementById("compareGroupBtn");
  if(groupBtn) groupBtn.onclick = ()=> showGroupSelect();
  document.querySelectorAll("[data-relation]").forEach(el=>{
    el.onclick = ()=> showComparison(el.dataset.relation);
  });
  // Boutons "Modifier"/"Supprimer" : éléments frères (pas descendants) des blocs cliquables
  // ci-dessus, donc pas besoin de stopPropagation — cliquer dessus ne déclenche jamais
  // showComparison().
  document.querySelectorAll("[data-edit-relation]").forEach(el=>{
    el.onclick = ()=> showRelationForm(el.dataset.editRelation);
  });
  document.querySelectorAll("[data-delete-relation]").forEach(el=>{
    el.onclick = ()=>{
      deleteRelation(el.dataset.deleteRelation);
      showRelations();
    };
  });
}

function showRelationForm(existingId){
  preDetailScroll = window.scrollY;
  const existing = existingId ? getRelation(existingId) : null;
  document.getElementById("screen").innerHTML = renderRelationForm(existing);
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  bindRelationForm(existing);
}
function renderRelationForm(existing){
  const r = existing || {};
  const options = Object.entries(RELATION_TYPES).map(([k,label])=>`<option value="${k}" ${r.relationType===k?"selected":""}>${escapeHTML(label)}</option>`).join("");
  return `<div class="detail">
    <div class="section-title"><h3>${existing ? "Modifier ce proche" : "Ajouter un proche"}</h3></div>
    <p class="note">Renseigne son prénom, sa date, heure et lieu de naissance pour calculer son thème complet.</p>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Prénom</p>
      <input id="relationFirstName" placeholder="Son prénom" value="${escapeHTML(r.firstName||"")}">
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Lien avec toi</p>
      <select id="relationType">${options}</select>
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Genre</p>
      <select id="relationGender">
        <option value="" ${!r.gender?"selected":""}>Préfère ne pas préciser</option>
        <option value="f" ${r.gender==="f"?"selected":""}>Féminin</option>
        <option value="m" ${r.gender==="m"?"selected":""}>Masculin</option>
      </select>
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Date de naissance</p>
      <input id="relationDate" type="date" value="${escapeHTML(r.birthDate||"")}">
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Heure de naissance</p>
      <input id="relationTime" type="time" value="${escapeHTML(r.birthTime||"")}" ${r.timeUnknown?"disabled":""}>
      <label style="display:flex;align-items:center;gap:8px;font-size:14px;margin-top:8px;opacity:.8">
        <input id="relationTimeUnknown" type="checkbox" style="width:auto" ${r.timeUnknown?"checked":""}>
        Heure de naissance inconnue
      </label>
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Lieu de naissance</p>
      <input id="relationPlace" placeholder="ex. Lyon, France" value="${escapeHTML(r.birthPlace||"")}">
    </div>
    <p class="note" id="relationFormError" style="display:none;color:var(--terracotta)"></p>
    <div id="relationFormLoading" style="display:none"></div>
    <button class="primary" id="relationSubmit">${existing ? "Mettre à jour" : "Calculer son thème"}</button>
    <button class="ghost" id="relationFormCancel">Annuler</button>
  </div>`;
}
function bindRelationForm(existing){
  const timeInput = document.getElementById("relationTime");
  const unknownCheckbox = document.getElementById("relationTimeUnknown");
  unknownCheckbox.addEventListener("change", ()=>{
    timeInput.disabled = unknownCheckbox.checked;
    if(unknownCheckbox.checked) timeInput.value = "";
  });
  document.getElementById("relationFormCancel").onclick = ()=> showRelations();
  document.getElementById("relationSubmit").onclick = async ()=>{
    const firstName = document.getElementById("relationFirstName").value.trim();
    const gender = document.getElementById("relationGender").value || null; // "f" | "m" | null (préfère ne pas préciser)
    const relationType = document.getElementById("relationType").value;
    const birthDate = document.getElementById("relationDate").value;
    const timeUnknown = unknownCheckbox.checked;
    const birthTime = timeUnknown ? "" : document.getElementById("relationTime").value;
    const birthPlace = document.getElementById("relationPlace").value.trim();
    const errorEl = document.getElementById("relationFormError");
    errorEl.style.display = "none";

    if(!firstName || !birthDate || !birthPlace || (!timeUnknown && !birthTime)){
      errorEl.textContent = "Merci de remplir tous les champs (ou de cocher « heure inconnue »).";
      errorEl.style.display = "block";
      return;
    }

    const submitBtn = document.getElementById("relationSubmit");
    submitBtn.disabled = true;
    const loadingEl = document.getElementById("relationFormLoading");
    loadingEl.innerHTML = `<div class="ai-loading-magic small">${starLoaderHTML("sm")}</div>`;
    loadingEl.style.display = "block";

    try{
      const astral = await fetchAstralProfile({ date: birthDate, time: timeUnknown ? null : birthTime, place: birthPlace });
      upsertRelation({ id: existing?.id, firstName, gender, relationType, birthDate, birthTime: timeUnknown ? null : birthTime, timeUnknown, birthPlace, astral });
      showRelations();
    } catch(err){
      errorEl.textContent = err.message || "Impossible de calculer son thème pour le moment.";
      errorEl.style.display = "block";
      submitBtn.disabled = false;
      loadingEl.style.display = "none";
    }
  };
}

// Écran de comparaison à proprement parler — seule partie premium de "Mes proches" (voir
// isPremiumEnabled()) : la gestion des proches ci-dessus reste gratuite, mais interpréter
// les deux thèmes l'un par rapport à l'autre est le genre de contenu réservé au premium
// dans le reste de l'app (voir renderProfilResults()).
function showComparison(relationId){
  preDetailScroll = window.scrollY;
  currentComparisonRelationId = relationId;
  const relation = getRelation(relationId);
  const primary = getProfile();
  document.getElementById("screen").innerHTML = renderComparison(primary, relation);
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  // Le texte enrichi par IA est un bonus premium au-dessus d'une comparaison déjà complète
  // sans lui (voir renderComparison()) : inutile de le déclencher pour un profil gratuit qui
  // ne verra de toute façon pas la section premium.
  if(relation && primary && isPremiumEnabled()) ensureComparisonText(primary, relation);
  const backBtn = document.getElementById("detailBack");
  if(backBtn) backBtn.onclick = ()=>{
    const scrollTarget = preDetailScroll;
    showRelations();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  const premiumToggle = document.getElementById("premiumToggle");
  if(premiumToggle) premiumToggle.onchange = ()=>{ setPremiumEnabled(premiumToggle.checked); showComparison(relationId); };
  // N'existe que dans la branche "pas encore de profil propre" de renderComparison().
  const profilEditBtn = document.getElementById("profilEdit");
  if(profilEditBtn) profilEditBtn.onclick = ()=> showProfilEditForm();
  // N'existe que dans la branche "comparaison normale" (proche + profil propre présents).
  const editRelationBtn = document.getElementById("editRelationFromComparison");
  if(editRelationBtn) editRelationBtn.onclick = ()=> showRelationForm(relationId);
  cardDetailReturnTo = () => showComparison(relationId);
  bindChips();
}
function renderComparison(primary, relation){
  if(!relation){
    return `<div class="detail">
      <div class="section-title"><h3>Comparaison</h3></div>
      <p class="note" style="text-align:center">Ce proche n'existe plus.</p>
      <button class="ghost" id="detailBack" style="margin-top:20px">← Retour</button>
    </div>`;
  }
  if(!primary || !primary.astral){
    return `<div class="detail">
      <div class="section-title"><h3>Comparaison avec ${escapeHTML(relation.firstName)}</h3></div>
      <p class="note" style="text-align:center">Renseigne d'abord ton propre profil astral pour pouvoir comparer les deux thèmes.</p>
      <button class="secondary" id="profilEdit" style="margin-top:14px">Renseigner mon profil</button>
      <button class="ghost" id="detailBack" style="margin-top:10px">← Retour</button>
    </div>`;
  }

  const premiumOn = isPremiumEnabled();
  const cmp = compareProfiles(primary, relation);
  const relLabel = RELATION_TYPES[relation.relationType] || "Autre";
  // Lieu RÉSOLU par le géocodage (ex. "Lyon, Rhône-Alpes, France") plutôt que le texte brut
  // tapé dans le formulaire — même correctif que renderProfilResults(), pour pouvoir
  // repérer une homonymie mal désambiguïsée sur le thème d'un proche aussi, pas seulement
  // sur le sien. Repli sur le texte tapé si le thème a été calculé avant ce correctif.
  const resolvedPlaceOf = p => p?.astral?.resolvedPlace || p?.birthPlace || "";

  return `<div class="detail">
    <div class="section-title"><h3>Toi & ${escapeHTML(relation.firstName)}</h3></div>
    <p class="question-recall">« ${escapeHTML(relLabel)} »</p>
    <p style="text-align:center;margin-top:6px"><button class="ghost" id="editRelationFromComparison" style="font-size:12px;padding:4px 10px">✎ Modifier ses informations</button></p>

    <p class="note" style="text-align:center;margin-top:10px">
      <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer">
        <input id="premiumToggle" type="checkbox" style="width:auto" ${premiumOn?"checked":""}>
        Mode premium (aperçu local — aucun vrai paiement)
      </label>
    </p>

    <div class="symbol-list" style="margin-top:14px;grid-template-columns:1fr 1fr">
      <div class="symbol" style="text-align:center"><b>Toi</b>${resolvedPlaceOf(primary)?`<br><small style="opacity:.7">${escapeHTML(resolvedPlaceOf(primary))}</small>`:""}<br>☉ ${escapeHTML(cmp.signs.a.sun||"—")}<br>☽ ${escapeHTML(cmp.signs.a.moon||"—")}${cmp.signs.a.ascendant?`<br>Asc. ${escapeHTML(cmp.signs.a.ascendant)}`:""}</div>
      <div class="symbol" style="text-align:center"><b>${escapeHTML(relation.firstName)}</b>${resolvedPlaceOf(relation)?`<br><small style="opacity:.7">${escapeHTML(resolvedPlaceOf(relation))}</small>`:""}<br>☉ ${escapeHTML(cmp.signs.b.sun||"—")}<br>☽ ${escapeHTML(cmp.signs.b.moon||"—")}${cmp.signs.b.ascendant?`<br>Asc. ${escapeHTML(cmp.signs.b.ascendant)}`:""}</div>
    </div>

    ${(()=>{ const text = premiumOn ? getCachedComparisonText(primary, relation) : null; return text
      ? text.split(/\n\s*\n/).map(p=>`<p class="lore-text" style="margin-top:14px">${escapeHTML(p.trim())}</p>`).join("")
      : ""; })()}

    ${premiumOn ? `
    ${cmp.element ? `
    <div class="section-title centered" style="margin-top:24px"><h3>Élément dominant</h3></div>
    <p class="note" style="text-align:center">${escapeHTML(cmp.element.a)} (toi) ${cmp.element.a===cmp.element.b ? "" : `· ${escapeHTML(cmp.element.b)} (${escapeHTML(relation.firstName)})`}</p>
    <div class="symbol-list" style="margin-top:10px">
      <div class="symbol" style="text-align:center">${escapeHTML(cmp.element.text)}</div>
    </div>` : ""}

    ${cmp.sharedDeity ? `
    <div class="section-title centered" style="margin-top:24px"><h3>Une divinité tutélaire commune</h3></div>
    <div class="symbol-list" style="margin-top:10px">
      <div class="symbol clickable" data-deity="${escapeHTML(cmp.sharedDeity.deityKey)}" style="text-align:center">
        <div style="font-size:32px">${escapeHTML(cmp.sharedDeity.card[2]||"✦")}</div>
        <b>${escapeHTML(cmp.sharedDeity.deityName)}</b>
        ${cmp.sharedDeity.note ? `<br><small>${escapeHTML(cmp.sharedDeity.note)}</small>` : ""}
      </div>
    </div>
    <p class="note" style="text-align:center;margin-top:6px">Vous êtes tous les deux placés sous cette figure — un vrai terrain commun.</p>` : ""}

    ${cmp.common.length ? `
    <div class="section-title centered" style="margin-top:24px"><h3>Vos points communs</h3></div>
    <div class="symbol-list" style="margin-top:10px">
      ${cmp.common.map(h=>`<div class="symbol"><b>${escapeHTML(SYNASTRY_POINT_LABELS[h.a.key])} (${escapeHTML(h.a.sign)}) ↔ ${escapeHTML(SYNASTRY_POINT_LABELS[h.b.key])} (${escapeHTML(h.b.sign)})</b><br><small>${escapeHTML(h.aspect.type)} — ${escapeHTML(h.sentence)}</small></div>`).join("")}
    </div>` : ""}

    ${cmp.tense.length ? `
    <div class="section-title centered" style="margin-top:24px"><h3>Vos points de tension potentiels</h3></div>
    <div class="symbol-list" style="margin-top:10px">
      ${cmp.tense.map(h=>`<div class="symbol"><b>${escapeHTML(SYNASTRY_POINT_LABELS[h.a.key])} (${escapeHTML(h.a.sign)}) ↔ ${escapeHTML(SYNASTRY_POINT_LABELS[h.b.key])} (${escapeHTML(h.b.sign)})</b><br><small>${escapeHTML(h.aspect.type)} — ${escapeHTML(h.sentence)}</small></div>`).join("")}
    </div>` : ""}

    ${(!cmp.common.length && !cmp.tense.length) ? `<p class="note" style="text-align:center;margin-top:14px">Pas d'aspect marqué entre vos deux thèmes — ni proximité forte, ni tension particulière.</p>` : ""}
    ` : premiumLockHTML("La comparaison détaillée (élément dominant, points communs, tensions potentielles, divinité tutélaire commune) fait partie du contenu premium.")}

    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
}

/* ===== ÉCRANS "COMPARAISON DE GROUPE" ===== */
// Sélection de plusieurs proches (au moins 2) à comparer entre eux et avec toi — voir
// compareGroup() plus haut. Gestion (sélection) toujours gratuite, même logique que la
// liste des proches ; seule la dynamique de groupe elle-même est premium (voir
// renderGroupComparison()).
function showGroupSelect(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = renderGroupSelect();
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  bindGroupSelect();
  cardDetailReturnTo = showGroupSelect;
}
function renderGroupSelect(){
  const relations = getRelations();
  return `<div class="detail">
    <div class="section-title"><h3>Comparer plusieurs proches</h3></div>
    <p class="note">Choisis au moins 2 proches — la dynamique de groupe compare chaque paire entre elles, toi comprise (partenaire + enfant, les deux enfants entre eux, etc.).</p>
    <div class="symbol-list" style="margin-top:14px">
      ${relations.map(r=>`<label class="symbol" style="display:flex;align-items:center;gap:10px;cursor:pointer">
        <input type="checkbox" class="group-select-checkbox" data-group-select="${escapeHTML(r.id)}" style="width:auto">
        <span><b>${escapeHTML(r.firstName)}</b><br><small>${escapeHTML(RELATION_TYPES[r.relationType]||"Autre")}</small></span>
      </label>`).join("")}
    </div>
    <p class="note" id="groupSelectCount" style="text-align:center;margin-top:10px">0 proche sélectionné</p>
    <button class="primary" id="groupSelectSubmit" style="margin-top:10px" disabled>Voir la dynamique du groupe</button>
    <button class="ghost" id="detailBack" style="margin-top:10px">← Retour</button>
  </div>`;
}
function bindGroupSelect(){
  const checkboxes = Array.from(document.querySelectorAll(".group-select-checkbox"));
  const countEl = document.getElementById("groupSelectCount");
  const submitBtn = document.getElementById("groupSelectSubmit");
  const updateCount = ()=>{
    const checked = checkboxes.filter(c=>c.checked);
    countEl.textContent = `${checked.length} proche${checked.length>1?"s":""} sélectionné${checked.length>1?"s":""}`;
    submitBtn.disabled = checked.length < 2;
  };
  checkboxes.forEach(c=> c.addEventListener("change", updateCount));
  updateCount();
  submitBtn.onclick = ()=>{
    const ids = checkboxes.filter(c=>c.checked).map(c=>c.dataset.groupSelect);
    showGroupComparison(ids);
  };
  document.getElementById("detailBack").onclick = ()=>{
    const scrollTarget = preDetailScroll;
    showRelations();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
}

function showGroupComparison(selectedIds){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = renderGroupComparison(selectedIds);
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  const backBtn = document.getElementById("detailBack");
  if(backBtn) backBtn.onclick = ()=>{
    const scrollTarget = preDetailScroll;
    showRelations();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  const premiumToggle = document.getElementById("premiumToggle");
  if(premiumToggle) premiumToggle.onchange = ()=>{ setPremiumEnabled(premiumToggle.checked); showGroupComparison(selectedIds); };
  // N'existe que dans la branche "pas encore de profil propre".
  const profilEditBtn = document.getElementById("profilEdit");
  if(profilEditBtn) profilEditBtn.onclick = ()=> showProfilEditForm();
  cardDetailReturnTo = () => showGroupComparison(selectedIds);
  bindChips();
}
function renderGroupComparison(selectedIds){
  const primary = getProfile();
  if(!primary || !primary.astral){
    return `<div class="detail">
      <div class="section-title"><h3>Dynamique du groupe</h3></div>
      <p class="note" style="text-align:center">Renseigne d'abord ton propre profil astral pour pouvoir comparer.</p>
      <button class="secondary" id="profilEdit" style="margin-top:14px">Renseigner mon profil</button>
      <button class="ghost" id="detailBack" style="margin-top:10px">← Retour</button>
    </div>`;
  }
  const relations = (selectedIds||[]).map(id=>getRelation(id)).filter(Boolean);
  if(relations.length < 2){
    return `<div class="detail">
      <div class="section-title"><h3>Dynamique du groupe</h3></div>
      <p class="note" style="text-align:center">Il faut au moins 2 proches pour une comparaison de groupe.</p>
      <button class="ghost" id="detailBack" style="margin-top:20px">← Retour</button>
    </div>`;
  }

  const premiumOn = isPremiumEnabled();
  // "Toi" toujours en tête : chaque proche est comparé à toi ET aux autres proches
  // sélectionnés (voir compareGroup()) — label affiché distinct du prénom réel pour toi.
  const people = [
    { id:"__primary__", firstName: primary.firstName, astral: primary.astral, label:"Toi" },
    ...relations.map(r=>({ id:r.id, firstName:r.firstName, astral:r.astral, label:r.firstName })),
  ];
  const names = people.map(p=>p.label).join(", ");

  return `<div class="detail">
    <div class="section-title"><h3>Dynamique du groupe</h3></div>
    <p class="question-recall">« ${escapeHTML(names)} »</p>

    <p class="note" style="text-align:center;margin-top:10px">
      <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer">
        <input id="premiumToggle" type="checkbox" style="width:auto" ${premiumOn?"checked":""}>
        Mode premium (aperçu local — aucun vrai paiement)
      </label>
    </p>

    ${premiumOn ? (()=>{
      const pairs = compareGroup(people);
      if(!pairs.length) return `<p class="note" style="text-align:center;margin-top:14px">Pas assez de données pour comparer ce groupe.</p>`;
      // Vue volontairement condensée (pas la comparaison détaillée à deux, voir
      // renderComparison()) : pour chaque paire, l'élément dominant (déjà formulé de façon
      // neutre, "vous", jamais "toi"/"ton" — valable pour n'importe quelle paire, y compris
      // deux proches entre eux) et l'aspect le plus exact, présenté factuellement (pas la
      // phrase personnalisée de synastryAspects(), écrite pour s'adresser à TOI
      // spécifiquement et donc incorrecte pour une paire qui ne t'inclut pas).
      return `<div class="symbol-list" style="margin-top:14px">
        ${pairs.map(({a,b,cmp})=>{
          const topHit = [...cmp.common, ...cmp.tense].sort((x,y)=>x.aspect.orb-y.aspect.orb)[0];
          const topKind = topHit ? (topHit.harmonious ? "point commun" : "tension potentielle") : null;
          return `<div class="symbol">
            <b>${escapeHTML(a.label)} & ${escapeHTML(b.label)}</b>
            ${cmp.element ? `<br><small>${escapeHTML(cmp.element.text)}</small>` : ""}
            ${cmp.sharedDeity ? `<br><small>✦ Divinité tutélaire commune : ${escapeHTML(cmp.sharedDeity.deityName)}</small>` : ""}
            ${topHit ? `<br><small>${escapeHTML(SYNASTRY_POINT_LABELS[topHit.a.key])} (${escapeHTML(topHit.a.sign)}) ↔ ${escapeHTML(SYNASTRY_POINT_LABELS[topHit.b.key])} (${escapeHTML(topHit.b.sign)}) — ${escapeHTML(topKind)} (${escapeHTML(topHit.aspect.type)})</small>` : ""}
          </div>`;
        }).join("")}
      </div>`;
    })() : premiumLockHTML("La dynamique de groupe (élément dominant, divinités communes, point fort par paire) fait partie du contenu premium.")}

    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
}

const PLANET_LABELS = {
  sun:"☉ Soleil", moon:"☽ Lune", mercury:"Mercure", venus:"Vénus", mars:"Mars",
  jupiter:"Jupiter", saturn:"Saturne", uranus:"Uranus", neptune:"Neptune", pluto:"Pluton",
};
const PLANET_ORDER = ["sun","moon","mercury","venus","mars","jupiter","saturn","uranus","neptune","pluto"];

// Domaine de vie associé à chaque planète — vocabulaire court, réutilisé pour expliquer ses
// aspects natals (natalAspectSentence ci-dessous). La phrase "position par signe" de
// chaque planète, elle, a sa propre formulation dédiée (PLANET_SIGN_SENTENCE ci-dessous) —
// pas de formule générique répétée dix fois, pour éviter un effet "copier-coller" à la
// lecture.
const PLANET_THEMES = {
  sun:"ton identité, ce que tu affirmes", moon:"ton monde intérieur, tes émotions",
  mercury:"ta façon de penser et de communiquer", venus:"ce que tu aimes, tes valeurs, tes relations",
  mars:"ton énergie, ta façon d'agir et de désirer", jupiter:"ce qui te fait grandir, ta confiance, ta chance",
  saturn:"ce qui te structure, tes limites, ton sens du devoir", uranus:"ta part de rupture, ton besoin de liberté",
  neptune:"ton intuition, tes rêves, ton imaginaire", pluto:"ta capacité de transformation profonde",
};

// Signe zodiacal -> mot-clé qualitatif court, en réutilisant la table de correspondance
// avec les arcanes majeurs (ZODIAC_MAJOR_LINKS) déjà utilisée pour "Apprendre" et
// l'horoscope du jour — reste cohérent avec le reste de l'appli plutôt que d'inventer un
// nouveau vocabulaire de "traits de signe".
function signArcana(sign){
  const cardName = sign && ZODIAC_MAJOR_LINKS[sign];
  return cardName ? MAJORS.find(c=>c[0]===cardName) : null;
}
function signQuality(sign){
  const card = signArcana(sign);
  return card ? (card[3]||"").split("·")[0].trim().toLowerCase() : null;
}

// Élision de "de" devant un mot-clé commençant par une voyelle ("d'espoir", jamais "de
// espoir") — les mots-clés de signQuality() commencent aussi bien par une consonne que par
// une voyelle ("victoire" mais aussi "équilibre", "instinct"…), l'élision doit donc être
// gérée ici plutôt que codée en dur dans chaque phrase qui l'utilise.
function elideDe(word){
  return /^[aàâeéèêëiîïoôœuùûüyh]/i.test(word) ? `d'${word}` : `de ${word}`;
}

// Une phrase par planète (et une pour l'Ascendant) expliquant sa position dans son signe —
// verbe et construction propres à chaque planète (pas un même gabarit répété dix fois),
// pour que la liste reste agréable à lire d'un bout à l'autre.
const PLANET_SIGN_SENTENCE = {
  sun: (sign, q) => `Ton identité s'exprime en ${sign}${q ? `, du côté ${elideDe(q)}` : ""}.`,
  moon: (sign, q) => `Tes émotions se vivent en ${sign}${q ? `, avec une tonalité ${elideDe(q)}` : ""}.`,
  mercury: (sign, q) => `Ta façon de penser et de communiquer se déploie en ${sign}${q ? `, sur fond ${elideDe(q)}` : ""}.`,
  venus: (sign, q) => `Ce que tu aimes porte la marque de ${sign}${q ? `, dans une dynamique ${elideDe(q)}` : ""}.`,
  mars: (sign, q) => `Ton énergie et ta façon d'agir prennent la forme de ${sign}${q ? `, en résonance avec ${q}` : ""}.`,
  jupiter: (sign, q) => `Ta confiance et ta capacité à grandir s'appuient sur ${sign}${q ? `, du côté ${elideDe(q)}` : ""}.`,
  saturn: (sign, q) => `Ton sens du devoir et tes limites se construisent en ${sign}${q ? `, avec une tonalité ${elideDe(q)}` : ""}.`,
  uranus: (sign, q) => `Ton besoin de liberté et ta part de rupture s'expriment en ${sign}${q ? `, sur fond ${elideDe(q)}` : ""}.`,
  neptune: (sign, q) => `Ton intuition et tes rêves flottent en ${sign}${q ? `, dans une dynamique ${elideDe(q)}` : ""}.`,
  pluto: (sign, q) => `Ta capacité de transformation s'ancre en ${sign}${q ? `, en résonance avec ${q}` : ""}.`,
};
function natalPlanetSentence(key, body){
  const builder = PLANET_SIGN_SENTENCE[key];
  if(!builder || !body || !body.sign) return null;
  const quality = signQuality(body.sign);
  const retro = body.retrograde ? " Rétrograde à ta naissance, cette énergie se vit souvent plus intérieurement qu'elle ne se montre." : "";
  return `${builder(body.sign, quality)}${retro}`;
}
function natalAscendantSentence(ascendant){
  if(!ascendant || !ascendant.sign) return null;
  const quality = signQuality(ascendant.sign);
  return `La façon dont tu te présentes aux autres emprunte les couleurs de ${ascendant.sign}${quality ? `, du côté ${elideDe(quality)}` : ""}.`;
}
// Une phrase expliquant un aspect natal entre deux planètes — même vocabulaire d'aspect
// (ASPECT_ACTION_PHRASES) que l'horoscope du jour, pour rester cohérent dans toute l'appli.
// Ces verbes décrivent la nature structurelle de l'aspect (facile/tendu/à équilibrer) sans
// jamais prêter à la planète un "ton" qui contredirait sa nature (ex. Mars n'est jamais
// décrit comme agissant "en douceur", même sur un aspect harmonieux).
function natalAspectSentence(asp){
  const label1 = PLANET_LABELS[asp.bodies[0]], label2 = PLANET_LABELS[asp.bodies[1]];
  const theme2 = PLANET_THEMES[asp.bodies[1]];
  const phrase = ASPECT_ACTION_PHRASES[asp.type];
  if(!label1 || !label2 || !phrase || !theme2) return null;
  return `${label1} ${phrase} ${theme2} (${label2}).`;
}

// Paragraphe récapitulatif du thème natal (Soleil/Lune/Ascendant + densité des aspects) —
// affiché en tête du Profil astral, avant le détail planète par planète.
function natalSummaryParagraph(saved){
  const a = saved.astral;
  if(!a || !a.sunSign || !a.moonSign) return null;
  const sunQ = signQuality(a.sunSign), moonQ = signQuality(a.moonSign);
  const ascQ = a.ascendant ? signQuality(a.ascendant.sign) : null;
  const who = saved.firstName ? `${saved.firstName}, ton` : "Ton";
  let text = `${who} thème natal place le Soleil en ${a.sunSign}${sunQ ? ` (${sunQ})` : ""} au cœur de ton identité, et la Lune en ${a.moonSign}${moonQ ? ` (${moonQ})` : ""} dans ton monde intérieur`;
  text += a.ascendant
    ? `, avec un Ascendant en ${a.ascendant.sign}${ascQ ? ` (${ascQ})` : ""} qui colore la façon dont tu te présentes aux autres.`
    : ` — l'heure de naissance inconnue ne permet pas de calculer ton Ascendant.`;
  const n = (a.aspects || []).length;
  if(n >= 3) text += ` Plusieurs de tes planètes dialoguent fortement entre elles (${n} aspects majeurs) : un thème dense, où les différentes facettes de ta personnalité s'influencent beaucoup les unes les autres.`;
  else if(n >= 1) text += ` Quelques aspects marquants relient tes planètes entre elles (voir le détail plus bas).`;
  else text += ` Peu d'aspects serrés entre tes planètes : les différentes facettes de ta personnalité fonctionnent plutôt chacune de leur côté.`;
  return text;
}

// Poids donnés à chaque corps pour déterminer la "divinité tutélaire" (ci-dessous) : les
// planètes personnelles (Soleil, Lune, Ascendant, Mercure, Vénus, Mars) pèsent lourd car
// elles varient vraiment d'une personne à l'autre ; Jupiter/Saturne pèsent peu (partagées
// par des cohortes de ~1-2 ans) ; Uranus/Neptune/Pluton sont volontairement exclues — elles
// restent dans le même signe pendant 7 à 20 ans, donc partagées par toute une génération et
// n'apportent rien à une distinction individuelle.
const TUTELARY_WEIGHTS = { sun:4, moon:3, mercury:2, venus:2, mars:2, jupiter:1, saturn:1 };

// Détermine la figure mythologique la plus représentée dans le thème natal : chaque corps
// pesé "vote" pour une divinité, à la précision maximale que l'illustration du jeu permet
// à ce jour :
// 1. D'abord le décan exact du signe (10°, voir DECAN_MINOR_CARDS) : s'il pointe vers une
//    carte numérale qui a déjà sa propre figure mythologique (NUMBER_CARD_DEITY — Épées et
//    Bâtons pour l'instant), le vote va à cette figure précise plutôt qu'au dieu du majeur
//    entier. C'est ce qui permet de sortir des 12 divinités des majeurs et de puiser dans
//    l'ensemble de la bibliothèque (~70 figures) au fur et à mesure que les enseignes sont
//    illustrées.
// 2. Sinon (Coupes/Deniers, pas encore illustrées, ou signe hors décan reconnu), repli sur
//    le dieu du majeur associé au signe entier via ZODIAC_MAJOR_LINKS — exactement le
//    comportement d'avant cette fonctionnalité.
// Les planètes proches du Soleil (Mercure, Vénus) tombent souvent dans le même signe ou un
// signe voisin — les votes ne sont donc pas juste "celui du Soleil gagne toujours", même si
// le Soleil reste le plus lourd en cas d'égalité.
// `contributors` (les corps qui ont voté pour la divinité gagnante, du plus lourd au plus
// léger, avec la carte de décan quand le vote était précis) sert à expliquer CE choix — voir
// tutelaryReason dans profileForAstralText() et showTutelaryReason() ci-dessous.
function tutelaryDeity(saved){
  const a = saved?.astral;
  if(!a || !a.bodies) return null;

  const scores = {}; // clé divinité (minuscules) -> score cumulé
  const order = [];  // ordre de rencontre, pour départager les égalités (Soleil d'abord)
  const contributorsByDeity = {}; // clé divinité -> [{label, sign, weight, cardName, precise}, ...]
  const vote = (sign, degreeInSign, weight, label) => {
    if(!sign) return;
    const decanCard = decanCardFor(sign, degreeInSign);
    const preciseKey = decanCard && NUMBER_CARD_DEITY[decanCard];
    let deityKey, precise;
    if(preciseKey){
      deityKey = preciseKey; precise = true;
    } else {
      const majorName = ZODIAC_MAJOR_LINKS[sign];
      const majorCard = majorName && MAJORS.find(c=>c[0]===majorName);
      if(!majorCard) return;
      deityKey = majorCard[1].toLowerCase(); precise = false;
    }
    if(!(deityKey in scores)){ order.push(deityKey); contributorsByDeity[deityKey] = []; }
    scores[deityKey] = (scores[deityKey]||0) + weight;
    contributorsByDeity[deityKey].push({ label, sign, weight, cardName: precise ? decanCard : null, precise });
  };
  Object.entries(TUTELARY_WEIGHTS).forEach(([key,weight])=>{
    const b = a.bodies[key];
    vote(b?.sign, b?.degreeInSign, weight, (PLANET_LABELS[key]||key).replace(/^[☉☽]\s*/,""));
  });
  if(a.ascendant?.sign) vote(a.ascendant.sign, a.ascendant.degreeInSign, 3, "Ascendant");

  if(!order.length) return null;
  const maxScore = Math.max(...Object.values(scores));
  const winnerKey = order.find(k => scores[k] === maxScore); // premier rencontré = priorité au Soleil
  // La carte associée à la divinité gagnante peut désormais être un arcane majeur (dieu
  // "large", cas encore le plus fréquent) ou une carte numérale précise via un décan —
  // même logique de recherche que showDeityDetail()/cardsForSymbol() pour cette
  // bibliothèque à deux niveaux.
  const card = CARDS.find(c => (c[4]==="major"||c[4]==="court") ? (c[1]||"").toLowerCase()===winnerKey : NUMBER_CARD_DEITY[c[0]]===winnerKey);
  if(!card) return null;
  const deityName = winnerKey.charAt(0).toUpperCase() + winnerKey.slice(1);
  const contributors = (contributorsByDeity[winnerKey]||[]).sort((x,y)=>y.weight-x.weight);
  return { deityKey: winnerKey, deityName, card, note: DEITY_NOTES[winnerKey] || null, contributors };
}

// Explication de secours (déterministe, sans IA) tant que le texte généré par
// /api/astral-text n'est pas encore en cache — voir astralText.tutelaryReason dans
// renderProfilResults(). Simple énumération des placements qui pèsent le plus dans le
// score, pas une vraie phrase mythologique (c'est le rôle du texte IA une fois prêt).
function tutelaryReasonFallback(deity){
  if(!deity || !deity.contributors || !deity.contributors.length) return null;
  // Quand le vote était précis (décan -> carte numérale, voir tutelaryDeity()), on nomme
  // aussi la carte pour que même cette explication de secours, sans IA, laisse deviner
  // d'où vient la précision — pas juste "Soleil en Sagittaire" comme avant, mais de quel
  // tiers du signe (et donc de quelle carte) il s'agit.
  const top = deity.contributors.slice(0,3).map(c=>c.precise && c.cardName ? `${c.label} en ${c.sign} (${c.cardName})` : `${c.label} en ${c.sign}`);
  const list = top.length > 1 ? `${top.slice(0,-1).join(", ")} et ${top[top.length-1]}` : top[0];
  return `Ce choix s'appuie surtout sur ${list} — les placements qui pèsent le plus dans ton thème.`;
}

// Même principe que tutelaryReasonFallback() ci-dessus, pour les arcanes majeurs liés au
// thème (voir profil()) : tant que majorLinksText (IA) n'est pas encore en cache, cette
// phrase de secours locale nomme chaque carte, le signe qui la relie, son dieu/mots-clés,
// ET s'appuie sur ZODIAC_MAJOR_MYTH (voir plus haut) pour expliquer, avec un vrai fait
// mythologique vérifiable, pourquoi ce dieu incarne cette carte — jamais un simple énoncé
// mécanique ("correspondance signe -> carte") qui ne dirait rien de la personne.
// Deux retours successifs sur cette phrase de secours (le texte IA, lui, n'a pas ce problème
// puisque le prompt lui interdit explicitement la répétition — voir /api/astral-text.js) :
// 1. "les trois textes terminent pareil" — la phrase de clôture précédente ne variait que par
//    substitution de mots (le nom du point) dans un gabarit par ailleurs identique, avec la
//    même clause finale mot pour mot ("se joue avant tout à cet endroit-là...") sur les 3
//    paragraphes. POINT_CLOSING_SENTENCE ci-dessous donne à chaque point sa propre PHRASE
//    entière, pas seulement ses propres mots.
// 2. "la relation avec l'arcane choisie n'est pas vraiment mise en valeur, tu parles plutôt
//    du signe astrologique" — la clôture parlait du "point" et de son "domaine" de façon
//    abstraite, la carte elle-même n'étant citée qu'en ouverture de paragraphe. Chaque
//    clôture démarre désormais explicitement par "Cette carte", et se referme sur les
//    mots-clés DE LA CARTE (pas seulement l'idée du domaine) : la carte reste le sujet de la
//    phrase, le point n'étant que l'angle par lequel elle s'exprime chez cette personne.
const POINT_CLOSING_SENTENCE = {
  "Soleil": (keywordsList) => `Cette carte parle alors de ce que tu es en plein jour, consciemment : ${keywordsList} — une part de toi que tu peux assumer et revendiquer ouvertement.`,
  "Lune": (keywordsList) => `Cette carte parle alors de ce que tu vis surtout en privé : ${keywordsList} — une part de toi qui se manifeste dans l'intimité de tes émotions, pas toujours visible au premier abord.`,
  "Ascendant": (keywordsList) => `Cette carte parle alors de l'image que tu donnes, parfois sans même le vouloir : ${keywordsList} — une part de toi que les autres perçoivent souvent avant que tu ne la reconnaisses toi-même.`,
};
function majorLinksTextFallback(links){
  if(!links || !links.length) return null;
  // Séparés par \n\n (comme le texte IA une fois généré — voir renderMajorLinks()) pour que
  // le rendu reste cohérent visuellement que ce texte de secours soit affiché ou déjà
  // remplacé par l'IA.
  const paragraphs = [];
  links.forEach(l=>{
    const myth = ZODIAC_MAJOR_MYTH[l.sign];
    const mythSentence = myth ? ` ${myth.astro} ${myth.myth}` : "";
    const keywordsList = l.card[3].split(" · ").join(", ");
    l.labels.forEach((label, idx)=>{
      const closingFn = POINT_CLOSING_SENTENCE[label];
      const closing = closingFn ? closingFn(keywordsList) : `Cette carte parle alors de ce que tu portes en toi : ${keywordsList}.`;
      const introSentence = idx === 0
        ? `${label} en ${l.sign} te relie à « ${l.card[0]} » (${l.card[1]} — ${l.card[3]}).${mythSentence}`
        : `${label}, aussi en ${l.sign}, te relie à cette même carte, « ${l.card[0]} » — mais pas de la même façon.`;
      paragraphs.push(`${introSentence} ${closing}`);
    });
  });
  return paragraphs.join("\n\n");
}

// Écran Profil astral : affiche le résultat s'il existe déjà, sinon le formulaire de
// première saisie. Comme les autres écrans "detail", le retour ramène au menu Profil.
function showProfilAstral(){
  preDetailScroll = window.scrollY;
  const saved = getProfile();
  cardDetailReturnTo = showProfilAstral;
  if(!saved){ showProfilEditForm(); return; }

  document.getElementById("screen").innerHTML = renderProfilResults(saved);
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel : render() (ou tout écran qu'il affiche) peut lui-même
    // réécrire preDetailScroll pour SES propres besoins avant qu'on ait pu le relire —
    // exactement le même risque de corruption que cardDetailReturnTo (voir le commentaire
    // au-dessus de showSymbolDetail()), pour la même raison : une seule variable globale
    // mutable, réutilisée par tous les écrans "detail".
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  document.getElementById("profilEdit").onclick = ()=> showProfilEditForm();
  bindChips(); // rend cliquable la divinité tutélaire (data-deity) et l'Animal représentatif (data-symbol)
  const premiumToggle = document.getElementById("premiumToggle");
  if(premiumToggle) premiumToggle.onchange = ()=>{ setPremiumEnabled(premiumToggle.checked); showProfilAstral(); };
  // Le portrait et les textes d'interprétation IA font partie du contenu premium (voir
  // renderProfilResults) : inutile de déclencher ces appels — et leur coût — pour un
  // profil qui ne les affichera pas.
  if(isPremiumEnabled()){
    ensurePortrait();
    ensureAstralText();
  }
}

// Formulaire de saisie/modification. `saved` (s'il existe) préremplit les champs ; le
// bouton d'annulation ramène au résultat si un profil existait déjà, sinon au menu Profil.
function showProfilEditForm(){
  preDetailScroll = window.scrollY;
  const saved = getProfile();
  document.getElementById("screen").innerHTML = renderProfilForm(saved);
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  bindProfilForm(saved);
}

function renderProfilForm(prefill){
  const p = prefill || {};
  return `<div class="detail">
    <div class="section-title"><h3>${p.firstName ? "Modifier mon profil astral" : "Profil astral"}</h3></div>
    <p class="note">Renseigne ton prénom, ta date, heure et lieu de naissance pour calculer ton thème complet. Ces informations restent uniquement sur cet appareil — le serveur ne fait que le calcul, sans rien conserver.</p>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Prénom</p>
      <input id="profilFirstName" placeholder="Ton prénom" value="${escapeHTML(p.firstName||"")}">
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Genre</p>
      <select id="profilGender">
        <option value="" ${!p.gender?"selected":""}>Préfère ne pas préciser</option>
        <option value="f" ${p.gender==="f"?"selected":""}>Féminin</option>
        <option value="m" ${p.gender==="m"?"selected":""}>Masculin</option>
      </select>
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Métier</p>
      <input id="profilOccupation" placeholder="Ton métier (optionnel)" value="${escapeHTML(p.occupation||"")}">
      <small style="display:block;margin-top:6px;opacity:.7">Aide à ancrer tes lectures (tirages, rêves) dans ton quotidien réel.</small>
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Situation amoureuse</p>
      <select id="profilLoveStatus">
        <option value="" ${!p.loveStatus?"selected":""}>Préfère ne pas préciser</option>
        <option value="celibataire" ${p.loveStatus==="celibataire"?"selected":""}>Célibataire</option>
        <option value="en_couple" ${p.loveStatus==="en_couple"?"selected":""}>En couple</option>
        <option value="marie" ${p.loveStatus==="marie"?"selected":""}>Marié·e ou pacsé·e</option>
        <option value="divorce" ${p.loveStatus==="divorce"?"selected":""}>Divorcé·e ou séparé·e</option>
        <option value="veuf" ${p.loveStatus==="veuf"?"selected":""}>Veuf ou veuve</option>
      </select>
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">As-tu des enfants ?</p>
      <select id="profilHasChildren">
        <option value="" ${!p.hasChildren?"selected":""}>Préfère ne pas préciser</option>
        <option value="oui" ${p.hasChildren==="oui"?"selected":""}>Oui</option>
        <option value="non" ${p.hasChildren==="non"?"selected":""}>Non</option>
      </select>
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Centres d'intérêt</p>
      <input id="profilInterests" placeholder="ex. randonnée, lecture, jardinage… (optionnel)" value="${escapeHTML(p.interests||"")}">
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Date de naissance</p>
      <input id="profilDate" type="date" value="${escapeHTML(p.birthDate||"")}">
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Heure de naissance</p>
      <input id="profilTime" type="time" value="${escapeHTML(p.birthTime||"")}" ${p.timeUnknown?"disabled":""}>
      <label style="display:flex;align-items:center;gap:8px;font-size:14px;margin-top:8px;opacity:.8">
        <input id="profilTimeUnknown" type="checkbox" style="width:auto" ${p.timeUnknown?"checked":""}>
        Je ne connais pas mon heure de naissance exacte
      </label>
    </div>
    <div class="draw-notes">
      <p class="suit-h4" style="margin:0 0 6px">Lieu de naissance</p>
      <input id="profilPlace" placeholder="ex. Lyon, France" value="${escapeHTML(p.birthPlace||"")}">
    </div>
    <p class="note" id="profilFormError" style="display:none;color:var(--terracotta)"></p>
    <div id="profilFormLoading" style="display:none"></div>
    <button class="primary" id="profilSubmit">Calculer mon profil</button>
    <button class="ghost" id="profilFormCancel">${p.firstName ? "Annuler" : "← Retour"}</button>
  </div>`;
}

function bindProfilForm(saved){
  const timeInput = document.getElementById("profilTime");
  const unknownCheckbox = document.getElementById("profilTimeUnknown");
  unknownCheckbox.addEventListener("change", ()=>{
    timeInput.disabled = unknownCheckbox.checked;
    if(unknownCheckbox.checked) timeInput.value = "";
  });

  document.getElementById("profilFormCancel").onclick = ()=>{
    if(saved) showProfilAstral(); else render();
  };

  document.getElementById("profilSubmit").onclick = async ()=>{
    const firstName = document.getElementById("profilFirstName").value.trim();
    const gender = document.getElementById("profilGender").value || null; // "f" | "m" | null (préfère ne pas préciser)
    const occupation = document.getElementById("profilOccupation").value.trim() || null;
    const loveStatus = document.getElementById("profilLoveStatus").value || null; // "celibataire"|"en_couple"|"marie"|"divorce"|"veuf"|null
    const hasChildren = document.getElementById("profilHasChildren").value || null; // "oui"|"non"|null
    const interests = document.getElementById("profilInterests").value.trim() || null;
    const birthDate = document.getElementById("profilDate").value;
    const timeUnknown = unknownCheckbox.checked;
    const birthTime = timeUnknown ? "" : document.getElementById("profilTime").value;
    const birthPlace = document.getElementById("profilPlace").value.trim();
    const errorEl = document.getElementById("profilFormError");
    errorEl.style.display = "none";

    if(!firstName || !birthDate || !birthPlace || (!timeUnknown && !birthTime)){
      errorEl.textContent = "Merci de remplir tous les champs (ou de cocher « heure inconnue »).";
      errorEl.style.display = "block";
      return;
    }

    const submitBtn = document.getElementById("profilSubmit");
    submitBtn.disabled = true;
    const loadingEl = document.getElementById("profilFormLoading");
    loadingEl.innerHTML = `<div class="ai-loading-magic small">${starLoaderHTML("sm")}</div>`;
    loadingEl.style.display = "block";

    try{
      const astral = await fetchAstralProfile({ date: birthDate, time: timeUnknown ? null : birthTime, place: birthPlace });
      const nameNumber = nameNumerology(firstName);
      saveProfileData({ firstName, gender, occupation, loveStatus, hasChildren, interests, nameNumber, birthDate, birthTime: timeUnknown ? null : birthTime, timeUnknown, birthPlace, astral });
      showProfilAstral();
    } catch(err){
      errorEl.textContent = err.message || "Impossible de calculer le profil pour le moment.";
      errorEl.style.display = "block";
      submitBtn.disabled = false;
      loadingEl.style.display = "none";
    }
  };
}

function renderProfilResults(saved){
  const a = saved.astral;
  const numMeaning = NUMBER_KEYS[saved.nameNumber];
  const dateLabel = (saved.birthDate||"").split("-").reverse().join("/");
  const py = personalYearNumber(saved.birthDate);
  const pm = personalMonthNumber(saved.birthDate);
  const pyMeaning = NUMBER_KEYS[py];
  const pmMeaning = NUMBER_KEYS[pm];
  const portrait = typeof saved.portrait === "string" ? saved.portrait : null; // lu directement sur `saved` (pas via getCachedPortrait()/getProfile()) pour rester cohérent avec le reste de la fonction, qui dérive tout de son propre paramètre
  const astralText = (saved.astralText && typeof saved.astralText === "object") ? saved.astralText : null; // même logique : lu directement sur `saved`
  const summary = natalSummaryParagraph(saved);
  const deity = tutelaryDeity(saved);
  // Texte de chaque case : la phrase générée par IA si elle est déjà en cache (astralText),
  // sinon la phrase toute faite habituelle (natalPlanetSentence() etc.) le temps que la
  // génération se termine ou si elle échoue — jamais de case vide. Toutes ces phrases
  // (planetText/ascendantText/aspectText/nameNumberText/portrait/summary) sont des
  // "explications" au sens du découpage premium défini avec l'utilisateur : les données
  // brutes du thème (signes, degrés, maisons) restent visibles gratuitement, mais leur
  // interprétation écrite est réservée au premium — voir `premiumOn` plus bas.
  const planetText = (key, body) => (astralText?.planets && typeof astralText.planets[key] === "string" ? astralText.planets[key] : natalPlanetSentence(key, body)) || "";
  const ascendantText = a.ascendant ? ((typeof astralText?.ascendant === "string" ? astralText.ascendant : natalAscendantSentence(a.ascendant)) || "") : "";
  const aspectKey = asp => `${asp.bodies[0]}_${asp.type}_${asp.bodies[1]}`;
  const aspectText = asp => (astralText?.aspects && typeof astralText.aspects[aspectKey(asp)] === "string" ? astralText.aspects[aspectKey(asp)] : natalAspectSentence(asp)) || "";
  const nameNumberText = (typeof astralText?.nameNumber === "string" ? astralText.nameNumber : numMeaning?.[2]) || "";
  const tutelaryReasonText = (typeof astralText?.tutelaryReason === "string" ? astralText.tutelaryReason : tutelaryReasonFallback(deity)) || "La figure la plus présente dans ton thème natal.";
  const ra = representativeAnimal(saved);
  const premiumOn = isPremiumEnabled();
  const expl = text => premiumOn ? `<br>${escapeHTML(text)}` : ""; // n'affiche la phrase d'interprétation que si le mode premium est actif

  return `<div class="detail">
    <div class="section-title"><h3>Profil astral</h3></div>
    <p class="question-recall">« ${escapeHTML(saved.firstName)} »</p>

    <p class="note" style="text-align:center;margin-top:10px">
      <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer">
        <input id="premiumToggle" type="checkbox" style="width:auto" ${premiumOn?"checked":""}>
        Mode premium (aperçu local — aucun vrai paiement)
      </label>
    </p>

    ${premiumOn
      ? (portrait
          ? portrait.split(/\n\s*\n/).map(p=>`<p class="lore-text" style="margin-top:10px">${escapeHTML(p.trim())}</p>`).join("")
          : (summary ? `<p class="lore-text" style="margin-top:10px">${escapeHTML(summary)}</p>` : ""))
      : premiumLockHTML("Le portrait de personnalité et le résumé de ton thème font partie du contenu premium.")}

    <div class="section-title centered" style="margin-top:24px"><h3>Ta divinité tutélaire</h3></div>
    ${premiumOn ? (deity ? `
    <div class="symbol-list">
      <div class="symbol clickable" data-deity="${escapeHTML(deity.deityKey)}" style="text-align:center">
        <div style="font-size:32px">${escapeHTML(deity.card[2]||"✦")}</div>
        <b>${escapeHTML(deity.deityName)}</b>
        ${deity.note ? `<br><small>${escapeHTML(deity.note)}</small>` : ""}
      </div>
    </div>
    <p class="note" style="text-align:center;margin-top:6px">${escapeHTML(tutelaryReasonText)} Touche pour en savoir plus.</p>` : `<p class="note" style="text-align:center">Pas encore assez d'éléments dans ton thème pour la calculer.</p>`)
      : premiumLockHTML("La divinité tutélaire calculée à partir de ton thème fait partie du contenu premium.")}

    <div class="section-title centered" style="margin-top:24px"><h3>Ton animal représentatif</h3></div>
    ${ra.locked ? premiumLockHTML(ra.premium
        ? `Se révèle après ${ra.readingsNeeded} tirages enregistrés dans ton Journal (${ra.readingsCount}/${ra.readingsNeeded} pour l'instant).`
        : `Combine ton thème astral et tes questions les plus fréquentes, une fois ${ra.readingsNeeded} tirages enregistrés dans ton Journal — active le mode premium ci-dessus.`)
      : (ra.animal ? `
    <div class="symbol-list">
      <div class="symbol clickable" data-symbol="${escapeHTML(ra.animal.id)}" style="text-align:center">
        <div style="font-size:32px">${escapeHTML(ra.animal.icon||"✦")}</div>
        <b>${escapeHTML(ra.animal.label)}</b>
        ${ra.animal.desc ? `<br><small>${escapeHTML(ra.animal.desc)}</small>` : ""}
      </div>
    </div>
    <p class="note" style="text-align:center;margin-top:6px">D'après ${escapeHTML(ra.animal.source)}. Touche pour en savoir plus.</p>` : `<p class="note" style="text-align:center">Enregistre ton profil astral pour le révéler.</p>`)}

    ${numMeaning ? `<div class="symbol-list" style="margin-top:14px">
      <div class="symbol"><b>Nombre du prénom : ${saved.nameNumber} — ${escapeHTML(numMeaning[0])}</b>${expl(nameNumberText)}</div>
    </div>` : ""}

    ${(pyMeaning || pmMeaning) ? `
    <div class="section-title centered" style="margin-top:24px"><h3>Numérologie du temps</h3></div>
    <p class="note" style="text-align:center">Contrairement au nombre du prénom (fixe), ceux-ci évoluent avec le temps.</p>
    <div class="symbol-list" style="margin-top:14px">
      ${pyMeaning ? `<div class="symbol"><b>Année personnelle ${py} — ${escapeHTML(pyMeaning[0])}</b>${expl(pyMeaning[2])}</div>` : ""}
      ${pmMeaning ? `<div class="symbol"><b>Mois personnel ${pm} — ${escapeHTML(pmMeaning[0])}</b>${expl(pmMeaning[2])}</div>` : ""}
    </div>` : ""}

    <div class="section-title centered" style="margin-top:24px"><h3>Thème natal</h3></div>
    <p class="note" style="text-align:center">${escapeHTML(a.resolvedPlace || saved.birthPlace)} · ${escapeHTML(dateLabel)}${saved.timeUnknown ? " · heure inconnue" : (saved.birthTime ? " · " + escapeHTML(saved.birthTime) : "")}</p>

    <div class="symbol-list" style="margin-top:14px">
      <div class="symbol"><b>☉ Soleil en ${escapeHTML(a.sunSign)}</b>${expl(planetText("sun", a.bodies.sun))}</div>
      <div class="symbol"><b>☽ Lune en ${escapeHTML(a.moonSign)}</b>${expl(planetText("moon", a.bodies.moon))}</div>
      ${a.ascendant
        ? `<div class="symbol"><b>Ascendant ${escapeHTML(a.ascendant.sign)}</b>${expl(ascendantText)}</div>`
        : `<div class="symbol"><b>Ascendant</b><br><small>Heure de naissance inconnue — l'ascendant et les maisons ne peuvent pas être calculés avec certitude.</small></div>`}
    </div>

    ${a.houseWarning ? `<p class="note" style="margin-top:10px">${escapeHTML(a.houseWarning)}</p>` : ""}

    <div class="section-title"><h3>Planètes</h3></div>
    <div class="symbol-list">
      ${PLANET_ORDER.map(k=>{
        const b = a.bodies[k];
        if(!b) return "";
        return `<div class="symbol"><b>${PLANET_LABELS[k]} en ${escapeHTML(b.sign)}</b> — ${b.degreeInSign}°${b.house?` · maison ${b.house}`:""}${b.retrograde?" · rétrograde":""}${expl(planetText(k, b))}</div>`;
      }).join("")}
    </div>

    ${a.aspects && a.aspects.length ? `
    <div class="section-title"><h3>Aspects</h3></div>
    <div class="symbol-list">
      ${a.aspects.map(asp=>`<div class="symbol"><b>${PLANET_LABELS[asp.bodies[0]]} ${asp.type} ${PLANET_LABELS[asp.bodies[1]]}</b>${expl(aspectText(asp))}<br><small>orbe ${asp.orb}°</small></div>`).join("")}
    </div>` : ""}

    <button class="secondary" id="profilEdit" style="margin-top:20px">Modifier mes informations</button>
    <button class="ghost" id="detailBack">← Retour</button>
  </div>`;
}

function journalView(){
  if(!journal.length) return `<div class="empty"><h2>Ton journal est vide.</h2><p>Le journal reste privé et local sur cet appareil.</p></div>`;
  const trends = journalTrends();
  return `<section class="hero"><span class="pill">${journal.length} tirage(s)</span><h2>Journal</h2></section>
  ${trends ? `<div class="symbol-list" style="margin-bottom:20px">
    <div class="symbol"><b>✦ Tes tendances</b><br>
      ${trends.topCard ? `La carte <b>${escapeHTML(trends.topCard.name.replace(/^.*—\s*/,""))}</b> revient souvent dans tes tirages (${trends.topCard.count} fois).<br>` : ""}
      ${trends.topDomain ? `Tu reviens souvent vers <b>${escapeHTML(trends.topDomain.label)}</b> (${trends.topDomain.count} tirages).` : ""}
    </div>
  </div>` : ""}
  ${journal.map((j,i)=>`<article class="tile journal-entry" style="margin-bottom:12px">
    <strong>${escapeHTML(j.date)}</strong>
    <span>${escapeHTML(j.question||"Sans question")}</span>
    <p>${escapeHTML((j.cards||[]).join(" · "))}</p>
    ${j.notes?`<p><b>Notes :</b> ${escapeHTML(j.notes)}</p>`:""}
    ${(j.synthesis && j.synthesis.length) ? `<details class="why">
      <summary>Revoir la lecture complète${j.source==="local"?" (générée hors-ligne)":""}</summary>
      ${(j.cards||[]).map((name,idx)=>`<p><b>${escapeHTML(name)}</b> — ${escapeHTML((j.cardTexts||[])[idx]||"")}</p>`).join("")}
      ${j.synthesis.map(p=>`<p>${escapeHTML(p)}</p>`).join("")}
    </details>` : ""}
    <button class="ghost delete-entry" data-index="${i}">Supprimer</button>
  </article>`).join("")}`;
}

// Écran "detail" (accessible depuis la tuile Journal de l'onglet Profil) — même motif
// que les autres sous-écrans (showLearnMajors, etc.), le bouton Retour ramène au menu
// Profil puisque `route` reste "profil" pendant toute la navigation.
function showJournal(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">${journalView()}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel : render() (ou tout écran qu'il affiche) peut lui-même
    // réécrire preDetailScroll pour SES propres besoins avant qu'on ait pu le relire —
    // exactement le même risque de corruption que cardDetailReturnTo (voir le commentaire
    // au-dessus de showSymbolDetail()), pour la même raison : une seule variable globale
    // mutable, réutilisée par tous les écrans "detail".
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = showJournal;
  document.querySelectorAll(".delete-entry").forEach(b=>{
    b.onclick = ()=>{
      const i = Number(b.dataset.index);
      journal.splice(i,1);
      localStorage.setItem("arcanes-journal", JSON.stringify(journal));
      // Garde tirageState.savedIndex cohérent : l'entrée liée au tirage en cours a pu
      // se décaler (suppression d'une entrée antérieure) ou disparaître (suppression de
      // l'entrée elle-même).
      if(Number.isInteger(tirageState.savedIndex)){
        if(tirageState.savedIndex === i){ tirageState.saved = false; tirageState.savedIndex = null; }
        else if(tirageState.savedIndex > i){ tirageState.savedIndex -= 1; }
        saveTirageState();
      }
      showJournal();
    };
  });
}

function statsView(){
  const s = journalStats();
  if(!s) return `<div class="empty"><h2>Pas encore de tirage enregistré.</h2><p>Tes statistiques apparaîtront ici dès ton premier tirage sauvegardé dans le Journal.</p></div>`;

  const majorPct = s.majorPercent;
  return `<section class="hero"><span class="pill">${s.totalReadings} tirage${s.totalReadings>1?"s":""}</span><h2>Statistiques</h2></section>

  <div class="section-title centered"><h3>Série de jours</h3></div>
  <div class="symbol-list" style="grid-template-columns:1fr 1fr">
    <div class="symbol" style="text-align:center"><b style="font-size:28px;display:block">${s.streak}</b>jour${s.streak>1?"s":""} de suite en ce moment</div>
    <div class="symbol" style="text-align:center"><b style="font-size:28px;display:block">${s.bestStreak}</b>meilleure série</div>
  </div>

  <div class="section-title centered" style="margin-top:28px"><h3>Majeurs / Mineurs</h3></div>
  <p class="note" style="text-align:center">${s.majorDraws} carte${s.majorDraws>1?"s":""} majeure${s.majorDraws>1?"s":""} tirée${s.majorDraws>1?"s":""}, ${s.minorDraws} mineure${s.minorDraws>1?"s":""}, sur ${s.totalDraws} au total.</p>
  <div class="progress" style="margin-top:10px"><span style="width:${majorPct}%"></span></div>
  <small style="display:block;text-align:center;margin-top:6px;opacity:.7">${majorPct}% de cartes majeures</small>

  <div class="section-title centered" style="margin-top:28px"><h3>Cartes qui reviennent souvent</h3></div>
  <div class="symbol-list">
    ${s.topCards.map(c=>`<div class="symbol"><b>${escapeHTML(c.name.replace(/^.*—\s*/,""))}</b> — ${c.count} fois</div>`).join("")}
  </div>
  <p class="note" style="text-align:center;margin-top:10px">${s.uniqueDrawnCount} carte${s.uniqueDrawnCount>1?"s":""} différente${s.uniqueDrawnCount>1?"s":""} tirée${s.uniqueDrawnCount>1?"s":""} sur les 78 du jeu${s.neverDrawnCount ? ` — il t'en reste ${s.neverDrawnCount} à découvrir en tirage` : ", toutes déjà croisées !"}.</p>

  ${s.domainDistribution.length ? `
  <div class="section-title centered" style="margin-top:28px"><h3>Tes thèmes de question</h3></div>
  <div class="symbol-list">
    ${s.domainDistribution.map(d=>`<div class="symbol"><b>${escapeHTML(d.label[0].toUpperCase()+d.label.slice(1))}</b> — ${d.count} tirage${d.count>1?"s":""}</div>`).join("")}
  </div>` : ""}

  ${s.spreadDistribution.length ? `
  <div class="section-title centered" style="margin-top:28px"><h3>Types de tirage utilisés</h3></div>
  <div class="symbol-list">
    ${s.spreadDistribution.map(sp=>`<div class="symbol"><b>${sp.glyph} ${escapeHTML(sp.name)}</b> — ${sp.count} fois</div>`).join("")}
  </div>` : ""}

  ${(s.deityAffinities.length || s.symbolAffinities.length) ? `
  <div class="section-title centered" style="margin-top:28px"><h3>Tes affinités mythologiques</h3></div>
  <p class="note" style="text-align:center">Les figures et symboles qui reviennent le plus dans les cartes que tu tires — se construit et s'affine à mesure que ton Journal grossit.</p>
  ${s.deityAffinities.length ? `<div class="symbol-list" style="margin-top:14px">
    ${s.deityAffinities.map(d=>`<div class="symbol clickable" data-deity="${escapeHTML(d.id)}"><b>${escapeHTML(d.id.charAt(0).toUpperCase()+d.id.slice(1))}</b><br><small>${d.count} carte${d.count>1?"s":""} liée${d.count>1?"s":""} tirée${d.count>1?"s":""}</small></div>`).join("")}
  </div>` : ""}
  ${s.symbolAffinities.length ? `<div class="symbol-list" style="margin-top:10px">
    ${s.symbolAffinities.map(sy=>{ const sym = SYMBOL_LIBRARY[sy.id]; return `<div class="symbol clickable" data-symbol="${escapeHTML(sy.id)}"><b>${sym.icon} ${escapeHTML(sym.label)}</b><br><small>${sy.count} fois</small></div>`; }).join("")}
  </div>` : ""}` : ""}`;
}

function showStats(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">${statsView()}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel : render() (ou tout écran qu'il affiche) peut lui-même
    // réécrire preDetailScroll pour SES propres besoins avant qu'on ait pu le relire —
    // exactement le même risque de corruption que cardDetailReturnTo (voir le commentaire
    // au-dessus de showSymbolDetail()), pour la même raison : une seule variable globale
    // mutable, réutilisée par tous les écrans "detail".
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = showStats;
  bindChips(); // rend cliquables les affinités mythologiques (data-deity/data-symbol)
}

function retrospectiveView(){
  const r = getCachedRetrospective();
  if(!r) return `<div class="empty"><h2>Pas encore de rétrospective.</h2></div>`;
  return `<section class="hero"><span class="pill">🎂 ${r.year}</span><h2>Ta rétrospective</h2></section>
  ${r.text.split(/\n\s*\n/).map(p=>`<p class="lore-text" style="margin-top:10px">${escapeHTML(p.trim())}</p>`).join("")}`;
}
function showRetrospective(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">${retrospectiveView()}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel : render() (ou tout écran qu'il affiche) peut lui-même
    // réécrire preDetailScroll pour SES propres besoins avant qu'on ait pu le relire —
    // exactement le même risque de corruption que cardDetailReturnTo (voir le commentaire
    // au-dessus de showSymbolDetail()), pour la même raison : une seule variable globale
    // mutable, réutilisée par tous les écrans "detail".
    const scrollTarget = preDetailScroll;
    render();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  cardDetailReturnTo = showRetrospective;
}

// Voir le commentaire au-dessus de showSymbolDetail() pour le paramètre backTo.
function showDetail(c, backTo = cardDetailReturnTo){
  const suit = c[6], cls = c[4]==="major" ? "major" : (SUITS[suit]?.[0] || "major");
  const lore = CARD_LORE[c[0]];
  const deityLabel = cardDeityLabel(c);
  const wasNew = markSeen("cards", c[0]);
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">
    ${wasNew ? discoveryFX() : ""}
    ${cardHTML(c,cls)}
    <h2>${escapeHTML(c[0])}</h2>
    ${DEITY_NOTES[(deityLabel||"").toLowerCase()] ? `<h3 class="clickable-deity" data-deity="${escapeHTML(deityLabel.toLowerCase())}">${escapeHTML(deityLabel)}</h3>` : `<h3>${escapeHTML(deityLabel)}</h3>`}
    <p>${escapeHTML(c[3]||"")}</p>
    ${lore ? `
      <div class="section-title"><h3>Lecture traditionnelle</h3></div>
      <p class="lore-text">${escapeHTML(lore.marseille)}</p>
      ${(isPremiumEnabled() || isCardMythFree(c)) ? `
        <div class="section-title"><h3>Éclairage mythologique — ${escapeHTML(deityLabel)}</h3></div>
        <p class="lore-text">${escapeHTML(lore.myth)}</p>
      ` : `
        <div class="section-title"><h3>Éclairage mythologique</h3></div>
        ${premiumLockHTML("L'éclairage mythologique de cette carte fait partie du contenu premium.")}
      `}
    ` : ""}
    <div class="section-title"><h3>Symboles</h3></div>
    ${symbolChips(c[5])}
    ${c[4]==="number"?`<div class="symbol-list" style="margin-top:14px"><div class="symbol"><b>Direction du nombre</b><br>${escapeHTML(NUMBER_KEYS[c[7]]?.[2]||"")}</div></div>`:""}
    ${suit?`<div class="symbol-list" style="margin-top:14px"><div class="symbol"><b>Enseigne</b><br>${escapeHTML(suit)} · ${escapeHTML(SUITS[suit]?.[2]||"")}</div></div>`:""}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    // Capturé avant l'appel, même raison que ci-dessus pour backTo() : l'écran vers
    // lequel on revient peut réécrire preDetailScroll pour ses propres besoins.
    const scrollTarget = preDetailScroll;
    backTo();
    requestAnimationFrame(()=>window.scrollTo(0,scrollTarget));
  };
  // Pour qu'un lien cliqué depuis cette fiche (nom de la figure, symbole…) revienne bien
  // ici plutôt que de sauter directement à l'écran qui nous a menés à cette carte.
  cardDetailReturnTo = () => showDetail(c, backTo);
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
  document.querySelectorAll(".symbol.clickable[data-number]").forEach(el=>{
    el.onclick = ()=> showNumberDetail(el.dataset.number);
  });
  document.querySelectorAll(".symbol.clickable[data-deity]").forEach(el=>{
    el.onclick = ()=> showDeityDetail(el.dataset.deity);
  });
  document.querySelectorAll(".symbol.clickable[data-symbol]").forEach(el=>{
    el.onclick = ()=> showSymbolDetail(el.dataset.symbol);
  });
  document.querySelectorAll(".clickable-deity[data-deity]").forEach(el=>{
    el.onclick = ()=> showDeityDetail(el.dataset.deity);
  });
}

// Petite pluie de particules dorées qui jaillit depuis un élément au moment d'une action
// marquante (carte choisie à la pioche…) — purement décoratif, s'auto-nettoie après coup.
// `el` doit avoir position:relative (voir .flip-slot dans styles.css).
function spawnGoldBurst(el){
  if(prefersReducedMotion()) return;
  const burst = document.createElement("div");
  burst.className = "gold-burst";
  const n = 10;
  for(let i=0;i<n;i++){
    const p = document.createElement("span");
    const angle = (Math.PI*2*i)/n + (Math.random()*0.4-0.2);
    const dist = 34 + Math.random()*26;
    p.style.setProperty("--dx", (Math.cos(angle)*dist).toFixed(1)+"px");
    p.style.setProperty("--dy", (Math.sin(angle)*dist).toFixed(1)+"px");
    p.style.animationDelay = Math.round(Math.random()*70)+"ms";
    burst.appendChild(p);
  }
  el.appendChild(burst);
  setTimeout(()=> burst.remove(), 900);
}

function bindDeck(){
  document.querySelectorAll(".flip-slot[data-pick]").forEach(el=>{
    el.onclick = ()=>{
      const idx = Number(el.dataset.pick);
      if(tirageState.picks.includes(idx) || tirageState.picks.length>=spreadConf().count) return;
      const card = tirageState.spread[idx];
      const cls = card[4]==="major" ? "major" : (SUITS[card[6]]?.[0] || "major");
      const front = el.querySelector(".flip-front");
      if(front) front.innerHTML = cardHTML(card, cls);
      spawnGoldBurst(el);
      // Un frame d'écart pour que le navigateur peigne d'abord la face (encore cachée par
      // le rotateY(180deg) du CSS) avant de lancer le flip — sinon le flip peut démarrer
      // sur une face encore vide selon les navigateurs.
      requestAnimationFrame(()=> el.classList.add("flipped"));
      // Le temps du flip 3D (voir .flip-inner dans styles.css) avant de mettre à jour
      // l'état et de re-rendre l'écran.
      setTimeout(()=>{
        tirageState.picks.push(idx);
        saveTirageState();
        render();
      }, 650);
    };
  });
}

function bind(){
  cardDetailReturnTo = () => render();
  document.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>setRoute(b.dataset.route));
  document.querySelectorAll("[data-go]").forEach(el=>el.onclick=()=>setRoute(el.dataset.go));
  document.querySelectorAll("[data-go-retrospective]").forEach(el=>el.onclick=()=>showRetrospective());
  document.querySelectorAll("[data-learn]").forEach(el=>{
    el.onclick = ()=>{
      const key = el.dataset.learn;
      if(key==="majeurs") showLearnMajors();
      else if(key==="cour") showLearnCategory("cour");
      else if(key==="numerales") showLearnCategory("numerales");
      else if(key==="figures") showLearnFigures();
      else if(key==="symboles") showSymbolsLibrary();
    };
  });
  document.querySelectorAll("[data-profil-go]").forEach(el=>{
    el.onclick = ()=>{
      const key = el.dataset.profilGo;
      if(key==="astral") showProfilAstral();
      else if(key==="journal") showJournal();
      else if(key==="stats") showStats();
      else if(key==="relations") showRelations();
      else if(key==="majeurs") showMajorLinks();
    };
  });
  document.querySelectorAll("[data-reves-go]").forEach(el=>{
    el.onclick = ()=>{
      const key = el.dataset.revesGo;
      if(key==="new") showDreamForm();
      else if(key==="journal") showDreamJournal();
    };
  });
  document.getElementById("homeBtn").onclick=()=>setRoute("home");
  document.getElementById("backBtn").onclick=()=>setRoute("home");

  const dayCard = document.querySelector(".day-card[data-card]");
  if(dayCard) dayCard.onclick = ()=> showDetail(JSON.parse(decodeURIComponent(dayCard.dataset.card)));

  document.querySelectorAll("[data-spread]").forEach(el=>{
    el.onclick = ()=>{
      const key = el.dataset.spread;
      if(!canStartSpread(key)){
        alert(isSpreadTypeFree(key)
          ? "Ton tirage général gratuit du jour est déjà utilisé — reviens demain, ou active le mode premium depuis l'onglet Profil."
          : "Ce tirage fait partie du contenu premium — active-le depuis l'onglet Profil.");
        return;
      }
      if(key === "annee"){
        // Pas de question à écrire pour ce tirage : on saute directement à la pioche,
        // avec une question par défaut (utilisée pour la lecture, jamais affichée à saisir).
        tirageState = { question: YEAR_DEFAULT_QUESTION, spreadType: key, spread: shuffledDeck().slice(0, SPREADS.annee.poolSize), picks: [], notes:"", saved:false, savedIndex:null, aiReading:null, aiStatus:"idle" };
      } else {
        tirageState.spreadType = key;
      }
      saveTirageState(); render();
    };
  });
  const changeSpread = document.getElementById("changeSpread");
  if(changeSpread) changeSpread.onclick = ()=>{ tirageState.spreadType = null; saveTirageState(); render(); };

  const draw = document.getElementById("drawBtn");
  const question = document.getElementById("drawQuestion");
  if(question && draw){
    question.addEventListener("input", ()=>{ tirageState.question=question.value; saveTirageState(); draw.disabled=!question.value.trim(); });
    draw.onclick = ()=>{
      // Re-vérifié ici en plus du clic sur la tuile de sélection : depuis cet écran
      // (question déjà saisie), on peut tirer plusieurs fois de suite sans repasser par la
      // sélection de tirage — c'est ce second tirage général du jour qu'il faut bloquer.
      if(!canStartSpread(tirageState.spreadType)){
        alert("Ton tirage général gratuit du jour est déjà utilisé — reviens demain, ou active le mode premium depuis l'onglet Profil.");
        return;
      }
      const poolSize = spreadConf().poolSize;
      tirageState = { question: tirageState.question, spreadType: tirageState.spreadType, spread: shuffledDeck().slice(0,poolSize), picks: [], notes:"", saved:false, savedIndex:null, aiReading:null, aiStatus:"idle" };
      if(tirageState.spreadType === "general" && !isPremiumEnabled()) markFreeGeneralReadingUsed();
      saveTirageState(); render();
    };
  }
  const notes = document.getElementById("drawNotes");
  if(notes) notes.addEventListener("input", ()=>{ tirageState.notes=notes.value; saveTirageState(); });

  const saveDraw = document.getElementById("saveDraw");
  if(saveDraw) saveDraw.onclick = ()=>{
    const chosen = tirageState.picks.map(i=>tirageState.spread[i]);
    const reading = currentReadingTexts();
    const entry = {
      date: new Date().toLocaleString("fr-FR"),
      question: tirageState.question,
      cards: chosen.map(c=>c[0]),
      notes: tirageState.notes || "",
      cardTexts: reading.cardTexts,
      synthesis: reading.synthesis,
      source: reading.source,
      spreadType: tirageState.spreadType || "general", // absent sur les tirages enregistrés avant l'existence des types de tirage (Feature 4) : "general" est un repli correct puisque c'était alors le seul type possible.
    };
    // Met à jour l'entrée existante plutôt que d'en ajouter une nouvelle si ce tirage a
    // déjà été enregistré (le bouton dit alors "Mettre à jour" — avant, il rajoutait
    // silencieusement un doublon à chaque clic).
    if(tirageState.saved && Number.isInteger(tirageState.savedIndex) && journal[tirageState.savedIndex]){
      journal[tirageState.savedIndex] = entry;
    } else {
      journal.unshift(entry);
      tirageState.savedIndex = 0;
    }
    localStorage.setItem("arcanes-journal", JSON.stringify(journal));
    tirageState.saved = true; saveTirageState();
    alert("Tirage enregistré dans le journal.");
    render();
  };
  const clearDraw = document.getElementById("clearDraw");
  if(clearDraw) clearDraw.onclick = ()=>{ tirageState = {question:"",spreadType:null,spread:null,picks:[],notes:"",saved:false,savedIndex:null,aiReading:null,aiStatus:"idle"}; saveTirageState(); render(); };
  // .delete-entry est maintenant lié directement dans showJournal() (le Journal n'est
  // plus une route de premier niveau, voir l'onglet Profil).
  // #symbolSearch : idem, câblé directement dans showSymbolsLibrary() (Symboles n'est plus
  // non plus une route de premier niveau, voir l'onglet Apprendre).

  bindCards(); bindChips(); bindDeck();

  if(route==="tirage" && tirageState.spread && tirageState.picks.length===spreadConf().count && tirageState.aiStatus==="idle"){
    startAIReading();
  }
}

// Ambiance de fond qui varie doucement selon l'heure du jour (voir body.tod-* dans
// styles.css) — calculé une seule fois au chargement, comme les transits/le rituel du
// jour : pas la peine de recalculer en continu pendant que l'app reste ouverte.
(function applyTimeOfDay(){
  if(!document.body) return; // garde défensive (environnements de test sans vrai <body>)
  const h = new Date().getHours();
  const cls = (h>=5 && h<8) ? "tod-dawn" : (h>=18 && h<22) ? "tod-dusk" : (h>=22 || h<5) ? "tod-night" : "tod-day";
  document.body.classList.add(cls);
})();

// Cause probable des retours répétés "le texte n'a toujours pas changé" après un correctif
// pourtant bien déployé côté serveur : sans ceci, une PWA déjà ouverte (ou installée sur
// l'écran d'accueil, où elle n'est quasiment jamais "rechargée" par l'utilisatrice) continue
// à exécuter le JS déjà chargé en mémoire indéfiniment — le nouveau service-worker.js peut
// très bien s'installer et prendre le contrôle en arrière-plan (self.skipWaiting()/
// self.clients.claim(), voir service-worker.js) sans que la page déjà ouverte s'en rende
// compte, puisque prendre le contrôle des FUTURES requêtes réseau ne change rien au code déjà
// interprété. "controllerchange" se déclenche précisément quand ce nouveau service worker
// prend le relais (y compris à la toute première visite, skipWaiting+clients.claim faisant
// que ça arrive presque immédiatement) : on recharge alors la page une seule fois (le drapeau
// `refreshing` évite une boucle si l'évènement se déclenchait plusieurs fois) pour que le
// nouveau app.js soit vraiment exécuté. Sans danger pour un brouillon en cours (tirage ou
// rêve) : chaque frappe est déjà sauvegardée en continu dans localStorage (tirageState/
// dreamState), donc rien n'est perdu au rechargement.
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", ()=>{
    if(refreshing) return;
    refreshing = true;
    window.location.reload();
  });
}
// Safari iOS n'active les styles :active que sur les éléments ayant un vrai listener tactile :
// cet écouteur (vide, passif) suffit à activer les micro-interactions au toucher partout dans l'app.
document.addEventListener("touchstart", function(){}, { passive:true });

// Petit "ripple" doré au clic sur les boutons — un seul écouteur délégué au document,
// jamais besoin de le re-binder après un render() puisqu'il ne dépend d'aucun élément
// particulier du DOM généré.
document.addEventListener("click", (e)=>{
  const btn = e.target.closest(".primary,.secondary,.ghost");
  if(!btn || prefersReducedMotion()) return;
  const rect = btn.getBoundingClientRect();
  const x = Number.isFinite(e.clientX) && e.clientX ? e.clientX - rect.left : rect.width/2;
  const y = Number.isFinite(e.clientY) && e.clientY ? e.clientY - rect.top : rect.height/2;
  const ripple = document.createElement("span");
  ripple.className = "ripple-fx";
  ripple.style.left = x + "px";
  ripple.style.top = y + "px";
  btn.appendChild(ripple);
  setTimeout(()=> ripple.remove(), 600);
});

render();
