/* ===========================================================
   TAROT DE DELPHES — données et logique
   =========================================================== */

const SUITS = {
  "Bâtons": {
    slug:"wands", icon:"🔥", element:"Feu",
    short:"Feu · action · volonté",
    sense:"L'énergie créatrice, l'élan, le désir d'agir et de construire. Les Bâtons racontent la volonté à l'œuvre : ce qui pousse, ce qui s'enflamme, ce qui se met en mouvement.",
    symbols:"soleil · flamme · vigne · bourgeon",
    court:["Éos","Niké","Hestia","Héphaïstos"],
    story:"Éos ouvre le ciel → Niké porte l'élan à la victoire → Hestia garde la flamme du foyer → Héphaïstos la façonne en création."
  },
  "Coupes": {
    slug:"cups", icon:"💧", element:"Eau",
    short:"Eau · émotion · relation",
    sense:"Les émotions, le désir amoureux, les liens et l'intuition. Les Coupes racontent ce qui se ressent avant de se comprendre : l'attachement, la beauté, la sensibilité.",
    symbols:"eau · rose · coquillage · myrte",
    court:["Himéros","Énée","Aphrodite","Nérée"],
    story:"Himéros fait naître le désir → Énée traverse la mer pour son destin → Aphrodite règne sur l'amour accompli → Nérée garde la sagesse des profondeurs."
  },
  "Épées": {
    slug:"swords", icon:"🌬", element:"Air",
    short:"Air · pensée · décision",
    sense:"L'intelligence, le discernement, la parole et le conflit. Les Épées racontent l'esprit en mouvement : l'idée qui naît, la décision qui tranche, l'affrontement qui clarifie.",
    symbols:"vent · plume · nuage · oiseau",
    court:["Zéphyr","Bellérophon","Athéna","Éole"],
    story:"Zéphyr souffle la première idée → Bellérophon l'engage dans l'action et le risque → Athéna la discerne avec stratégie → Éole en maîtrise entièrement la force."
  },
  "Deniers": {
    slug:"coins", icon:"🌿", element:"Terre",
    short:"Terre · matière · croissance",
    sense:"Le corps, le travail, la matière et la patience du temps long. Les Deniers racontent ce qui pousse dans la terre jusqu'à devenir richesse tangible.",
    symbols:"graine · blé · racine · fruit",
    court:["Chloris","Triptolemos","Perséphone","Ploutos"],
    story:"Chloris fait germer la plante → Triptolemos cultive et transmet le savoir-faire → Perséphone connaît les cycles de la terre → Ploutos récolte l'abondance."
  }
};

const NUMBER_KEYS = {
  1:{ title:"L'Origine", direction:"potentiel · naissance", symbol:"graine · bourgeon · rayon isolé",
      essay:"Le nombre 1 ouvre la série : c'est la graine posée sur la terre, le premier souffle avant tout développement. Rien n'est encore déployé, mais tout le potentiel de l'enseigne y est contenu, intact et indivis — un commencement pur, sans histoire encore écrite." },
  2:{ title:"La Rencontre", direction:"dualité · choix", symbol:"miroir · paire · deux chemins",
      essay:"Le nombre 2 introduit la rencontre : deux éléments identiques se font face, se répondent ou s'opposent. C'est le moment du choix, du dialogue ou de la tension entre deux forces égales, la première polarité après l'unité." },
  3:{ title:"L'Élan", direction:"expansion · création", symbol:"triangle · fleur ouverte · lien",
      essay:"Le nombre 3 marque la première croissance réelle : ce qui n'était qu'un couple devient mouvement, lien, dynamique. Une direction commence à se dessiner, un troisième terme naît de la rencontre des deux premiers." },
  4:{ title:"La Fondation", direction:"structure · sécurité", symbol:"carré · quatre points · fondation",
      essay:"Le nombre 4 pose une base stable : les quatre points cardinaux, les quatre côtés du carré. C'est l'ordre, la fondation, la sécurité d'une forme enfin construite — un repos avant l'épreuve à venir." },
  5:{ title:"L'Épreuve", direction:"rupture · tension", symbol:"fissure · déséquilibre · branche cassée",
      essay:"Le nombre 5, au centre de la série de dix, brise la symétrie du 4 : un déséquilibre, une épreuve, un accident nécessaire pour que le mouvement reprenne. Rien ne progresse sans cette secousse." },
  6:{ title:"L'Harmonie", direction:"équilibre · échange", symbol:"symétrie · échange · fleur complète",
      essay:"Le nombre 6 rétablit l'équilibre après la rupture du 5 : deux fois trois, une composition symétrique qui traduit l'accord retrouvé, l'échange réussi, la circulation apaisée entre les forces." },
  7:{ title:"La Quête", direction:"recherche · réflexion", symbol:"étoile isolée · montagne · chemin",
      essay:"Le nombre 7 rompt de nouveau la symétrie parfaite du 6 : il introduit la quête, l'isolement d'un élément qui cherche encore sa place, la réflexion et le dépassement avant la maîtrise." },
  8:{ title:"La Maîtrise", direction:"puissance organisée", symbol:"roue · spirale · mouvement circulaire",
      essay:"Le nombre 8, double carré, annonce une puissance organisée : ce qui était instable au 5 devient ici mouvement contrôlé, structure complexe mais maîtrisée, force mise en ordre." },
  9:{ title:"La Maturation", direction:"accomplissement intérieur", symbol:"fruit mûr · arbre chargé · lune presque pleine",
      essay:"Le nombre 9, dernier chiffre plein avant le retour au dix, marque un état presque achevé : le fruit est mûr, la leçon presque intégrée, à un pas seulement de l'aboutissement complet." },
  10:{ title:"L'Accomplissement", direction:"cycle accompli · transmission", symbol:"cercle fermé · récolte · graine",
      essay:"Le nombre 10 referme le cycle et en ouvre un autre : la série entière de l'enseigne est réunie, la récolte est faite, et déjà s'annonce, comme un nouvel As, le commencement suivant." }
};

const MAJORS = [
  { num:"0", label:"Le Mat", dieu:"Dionysos", glyph:"🍇",
    keywords:"Liberté · instinct · départ", symbols:"lierre · panthère · vigne · bâton de voyage",
    marseille:"Sans numéro, hors de la série, Le Mat marche seul, vêtements en lambeaux, bâton et baluchon à l'épaule, mordu ou suivi par un animal. Il ne s'inscrit dans aucun ordre : c'est la folie sacrée, l'esprit qui échappe à la numérotation même du jeu, libre de toute trajectoire fixée.",
    mythe:"Dionysos, dieu de l'ivresse rituelle, du vin et du cortège errant, franchit sans cesse la frontière entre la cité et la sauvagerie, entre la raison et la transe. Le lierre, la vigne et la panthère qui l'accompagnent traduisent cette liberté instinctive et débordante — la même que celle du Mat, qui avance sans chemin tracé, quitte à s'y perdre." },
  { num:"I", label:"Le Bateleur", dieu:"Hermès", glyph:"☿",
    keywords:"Commencement · potentiel · habileté", symbols:"caducée · dés · quatre enseignes · sac de voyage",
    marseille:"Debout derrière une table où sont posés les emblèmes des quatre enseignes, le Bateleur jongle, démontre, propose. Son chapeau en forme de huit couché annonce l'infini des possibles. Il n'est pas encore engagé dans une voie précise : il montre simplement qu'il sait faire, que tout est encore disponible.",
    mythe:"Hermès, messager véloce, dieu des échanges, des routes et de la ruse habile, invente des outils avant même d'avoir un but précis pour eux. Le caducée, symbole de médiation entre les forces opposées, résonne avec la table du Bateleur où se croisent les quatre outils du destin — un dieu et une carte qui disent tous deux : l'habileté précède le chemin." },
  { num:"II", label:"La Papesse", dieu:"Métis", glyph:"📖",
    keywords:"Savoir caché · intuition · connaissance", symbols:"livre · voile · colonnes · sagesse",
    marseille:"Assise entre deux colonnes, un livre mi-ouvert sur les genoux, souvent voilée, la Papesse ne montre rien : elle garde. C'est l'arcane du savoir qui ne se donne pas, de la mémoire intérieure, du mystère réservé à qui saura patienter et chercher au-delà de l'apparence.",
    mythe:"Métis, titanide de la ruse intelligente, première épouse de Zeus, fut avalée par lui — mais sa sagesse continua d'agir depuis l'intérieur du dieu, invisible et pourtant décisive. Ce savoir absorbé, non exposé, incarne exactement le livre refermé de la Papesse : une connaissance qui opère de l'intérieur plutôt que de se montrer." },
  { num:"III", label:"L'Impératrice", dieu:"Héra", glyph:"🦚",
    keywords:"Souveraineté · création · fécondité", symbols:"paon · couronne · sceptre · grenade · voile",
    marseille:"Couronnée, assise en plein air, un sceptre surmonté d'un aigle et un bouclier à ses côtés, l'Impératrice incarne une autorité généreuse et fertile. Elle ne conquiert pas : elle engendre, protège et fait prospérer ce qui lui est confié.",
    mythe:"Héra, reine de l'Olympe, protectrice du mariage et de l'ordre légitime du foyer comme de la cité, porte le paon — regard qui voit tout — et la grenade, fruit de la fécondité nuptiale. Cette souveraineté créatrice et protectrice est précisément celle que l'Impératrice déploie sur son trône." },
  { num:"IV", label:"L'Empereur", dieu:"Zeus", glyph:"⚡",
    keywords:"Autorité · structure · pouvoir", symbols:"foudre · aigle · chêne · trône",
    marseille:"Assis de profil sur un trône ou un cube, jambes croisées dessinant un 4, sceptre et bouclier à l'aigle en main, l'Empereur traduit le pouvoir terrestre en structure stable : une autorité qui organise et qui dure.",
    mythe:"Zeus, maître de la foudre et garant de l'ordre cosmique, siège au sommet de l'Olympe, le chêne et l'aigle comme emblèmes de sa puissance. L'Empereur est son écho humain : l'autorité qui fonde et fait respecter une loi, le pouvoir qui structure le monde plutôt que de simplement le dominer." },
  { num:"V", label:"Le Pape", dieu:"Chiron", glyph:"🐎",
    keywords:"Transmission · enseignement · initiation", symbols:"parchemin · torche · plantes médicinales · disciples",
    marseille:"Assis, coiffé d'une tiare à triple étage, deux doigts levés en geste de bénédiction, deux disciples agenouillés devant lui, le Pape transmet une tradition. Ce n'est pas un pouvoir qui s'impose, mais un savoir qui se donne à qui s'agenouille pour le recevoir.",
    mythe:"Chiron, le plus sage des centaures, précepteur d'Achille, d'Asclépios et de Jason, guérisseur blessé lui-même de façon incurable, enseigne précisément parce qu'il a connu la limite et la souffrance. Le Pape hérite de cette figure du maître qui transmet non par pure autorité, mais par une sagesse forgée dans l'épreuve." },
  { num:"VI", label:"L'Amoureux", dieu:"Éros", glyph:"🏹",
    keywords:"Choix · désir · attraction", symbols:"arc · flèche · deux chemins · fleurs",
    marseille:"Un jeune homme se tient entre deux figures féminines, hésitant, tandis qu'un Cupidon ailé vise depuis le ciel, flèche prête à partir. La carte fige l'instant du choix, sous la pression d'un désir qui ne demande pas la permission.",
    mythe:"Éros, dieu du désir dont les flèches déclenchent une passion irrésistible, est la force même qui met l'Amoureux en tension entre deux directions. Le geste de l'archer céleste au-dessus de la scène n'est pas une allégorie lointaine : c'est littéralement le dieu qui agit sur la carte." },
  { num:"VII", label:"Le Chariot", dieu:"Apollon", glyph:"☀",
    keywords:"Victoire · maîtrise · mouvement", symbols:"char · chevaux opposés · bouclier · laurier",
    marseille:"Debout dans son char tiré par deux chevaux tournés en sens contraires, sous un dais étoilé, le conducteur avance malgré tout droit devant lui. La victoire ne vient pas de l'absence de forces contraires, mais de la capacité à les tenir ensemble et à les diriger.",
    mythe:"Apollon, dieu du soleil, de la prophétie et de la mesure, traverse le ciel chaque jour sur son char éclatant, maîtrisant la course ardente de ses chevaux. Il incarne la victoire du Chariot : non la violence, mais la conduite lucide d'une énergie puissante vers un seul but." },
  { num:"VIII", label:"La Justice", dieu:"Thémis", glyph:"⚖",
    keywords:"Équilibre · vérité · décision", symbols:"balance · épée · colonnes · couronne",
    marseille:"Couronnée, assise, une épée dressée dans une main et une balance tenue à l'équilibre dans l'autre, la Justice réunit les deux instruments du jugement : la force qui tranche et la mesure qui pèse.",
    mythe:"Thémis, titanide de la loi divine et de l'ordre cosmique, mère des Moires et des Heures, présidait l'oracle de Delphes avant Apollon lui-même. Elle est l'ordre juste qui précède et fonde toute justice humaine — la balance de la carte n'est que l'instrument de sa loi bien plus ancienne." },
  { num:"IX", label:"L'Hermite", dieu:"Déméter", glyph:"🏮",
    keywords:"Quête · solitude · patience", symbols:"lanterne · chemin · épis · fleurs de Perséphone",
    marseille:"Vieillard encapuchonné, marchant appuyé sur un bâton, une lanterne à demi cachée sous son manteau, l'Hermite éclaire seul son propre chemin, gardant une petite flamme précieuse au cœur d'une longue recherche.",
    mythe:"Déméter, déesse des moissons, erre sur la terre en quête de sa fille Perséphone, torche en main dans les récits antiques, traversant patiemment le deuil avant la renaissance. Sa marche solitaire et sa lumière portée dans l'obscurité sont exactement celles de l'Hermite." },
  { num:"X", label:"La Roue de Fortune", dieu:"Tyché", glyph:"◉",
    keywords:"Cycles · destin · changement", symbols:"roue · corne d'abondance · montée · sommet · chute",
    marseille:"Une roue tourne, portant des figures qui montent, trônent un instant au sommet, puis retombent, actionnée par un opérateur souvent aveugle au sens qu'il donne. Rien n'est permanent : tout état n'est qu'un point sur un cercle en mouvement perpétuel.",
    mythe:"Tyché, déesse du hasard et de la fortune, protectrice imprévisible des cités et des destins individuels, est représentée avec une roue ou un gouvernail comme attributs. Ici, la correspondance est presque littérale : la roue de la carte est son emblème même." },
  { num:"XI", label:"La Force", dieu:"Héraclès", glyph:"🦁",
    keywords:"Maîtrise · courage · puissance intérieure", symbols:"lion de Némée · peau de lion · mains nues · massue",
    marseille:"Une figure ouvre ou referme calmement la gueule d'un lion à mains nues, coiffée d'un chapeau en forme d'infini. Ce n'est pas la force brutale qui est célébrée, mais une maîtrise si complète qu'elle n'a plus besoin de lutter avec violence.",
    mythe:"Héraclès, le plus fort des héros, accomplit comme premier des travaux la victoire sur le lion de Némée, dont il revêt ensuite la peau invulnérable. Le lion vaincu devenu vêtement du héros rejoint la carte : la bête dominée n'est plus un ennemi mais une force intégrée, portée avec soi." },
  { num:"XII", label:"Le Pendu", dieu:"Prométhée", glyph:"🔥",
    keywords:"Sacrifice · suspension · autre regard", symbols:"rocher · chaînes · aigle · feu dérobé",
    marseille:"Suspendu par un pied à une potence de bois, les mains liées derrière le dos, le visage pourtant serein, le Pendu montre une immobilité volontaire ou subie qui ouvre un regard inversé sur le monde — un sacrifice qui n'est pas une défaite.",
    mythe:"Prométhée, enchaîné à un rocher du Caucase pour avoir dérobé le feu aux dieux et l'avoir offert aux hommes, endure un châtiment sans fin sans jamais renier son geste. Comme le Pendu, il est immobilisé mais non vaincu : une épreuve traversée pour offrir une lumière plus grande à d'autres que soi." },
  { num:"XIII", label:"L'Arcane sans nom", dieu:"Hadès", glyph:"☠",
    keywords:"Transformation · fin · passage", symbols:"faux · grenade · cyprès · ossements · pousses",
    marseille:"Un squelette fauche un champ d'où repoussent pourtant des mains et des têtes parmi les ossements. Volontairement sans nom, cette carte montre que la moisson produit aussi une nouvelle germination : une force impersonnelle et cyclique plutôt qu'un simple anéantissement.",
    mythe:"Hadès, dieu des Enfers, n'est pas un dieu du mal mais le gardien impartial et sans visage du royaume des morts — maître aussi des richesses cachées sous la terre (son autre nom, Ploutôn, signifie littéralement « riche »), écho direct des pousses qui émergent des ossements. La transformation ici n'a pas de nom propre parce qu'elle est une loi de la nature, non une intention personnelle." },
  { num:"XIV", label:"Tempérance", dieu:"Iris", glyph:"🌈",
    keywords:"Équilibre · circulation · médiation", symbols:"deux vases · eau · ailes · arc-en-ciel",
    marseille:"Une figure ailée verse un liquide d'un vase à l'autre, en un geste continu et mesuré. C'est la carte de la circulation, du mélange juste, de la modération qui ne fige rien mais fait passer une chose dans une autre sans rien perdre.",
    mythe:"Iris, messagère de l'arc-en-ciel, relie le ciel, la terre et la mer, portant la volonté divine d'un royaume à l'autre comme un pont de lumière et d'eau. Ses ailes et son élément — la rencontre de la lumière et de l'eau — sont exactement le geste de tempérance que la carte met en image." },
  { num:"XV", label:"Le Diable", dieu:"Pan", glyph:"🐐",
    keywords:"Instinct · désir · attachement", symbols:"cornes · flûte · chaînes · vigne · feu",
    marseille:"Cornu, ailé, dressé sur un piédestal, deux petites figures enchaînées à ses pieds portant elles-mêmes cornes et queue, le Diable du Tarot de Marseille n'est pas un mal métaphysique : c'est la matière, l'instinct et l'appétit rendus visibles, sans jugement moral appuyé.",
    mythe:"Pan, dieu aux jambes et cornes de bouc, incarnation même de la nature sauvage, de la panique et de l'instinct sexuel non domestiqué, est presque littéralement l'image de cette carte. Il ne représente pas le mal, mais la nature à l'état brut — exactement ce que montre l'arcane." },
  { num:"XVI", label:"La Maison-Dieu", dieu:"Poséidon", glyph:"🔱",
    keywords:"Rupture · effondrement · libération", symbols:"tour · trident · vagues · chute",
    marseille:"Une tour est frappée au sommet, sa couronne crénelée s'envole, deux figures tombent la tête la première. C'est l'effondrement soudain d'une structure trop rigide ou trop haute — une chute violente qui force à l'humilité.",
    mythe:"Poséidon, l'Ébranleur de terre, dieu des séismes et de la puissance destructrice de la mer, fait s'écrouler tours et cités d'un seul coup de trident. Il est la cause mythologique de ce que la carte montre comme effet : son trident remplace ici la foudre du ciel." },
  { num:"XVII", label:"L'Étoile", dieu:"Hécate", glyph:"✦",
    keywords:"Espoir · orientation · intuition", symbols:"huit étoiles · deux vases · torches · chemin",
    marseille:"Une femme nue, agenouillée près d'un point d'eau, verse deux vases — l'un vers l'eau, l'autre vers la terre — sous une grande étoile entourée de sept ou huit plus petites. C'est l'espoir tranquille, l'orientation retrouvée après l'obscurité du Diable et de la Maison-Dieu.",
    mythe:"Hécate, déesse des carrefours, de la nuit et des torches, guide de Perséphone dans son passage entre les mondes, veille sur les chemins cachés sous les étoiles. Elle est précisément la déesse d'une orientation nocturne et lumineuse — exactement la promesse de la carte." },
  { num:"XVIII", label:"La Lune", dieu:"Séléné", glyph:"☾",
    keywords:"Inconscient · intuition · incertitude", symbols:"lune · deux tours · chiens · écrevisse",
    marseille:"Une lune au visage humain laisse tomber des gouttes, deux tours se font face, deux chiens ou loups hurlent, une écrevisse émerge de l'eau en contrebas. C'est le territoire de l'instinct, de l'imagination et de l'incertain, le seuil entre le connu et l'inconnu.",
    mythe:"Séléné, déesse et personnification de la lune elle-même, traverse le ciel nocturne comme Hélios traverse le jour. Sa présence n'est pas une simple analogie : elle est littéralement l'astre que la carte représente au centre du ciel." },
  { num:"XIX", label:"Le Soleil", dieu:"Hélios", glyph:"☀",
    keywords:"Clarté · joie · vitalité", symbols:"soleil · char solaire · deux figures · laurier",
    marseille:"Un soleil rayonnant à visage humain domine deux enfants ou deux figures jumelles, réunis près d'un muret bas. La chaleur et la clarté sont partagées sans l'ambiguïté trouble de la Lune : une joie ouverte, une vitalité simple.",
    mythe:"Hélios, titan du soleil, conduit chaque jour son char ardent à travers le ciel, source de lumière, de clarté et de vie. Comme Séléné pour la Lune, il n'illustre pas simplement le Soleil : il est le Soleil que la carte représente." },
  { num:"XX", label:"Le Jugement", dieu:"Minos", glyph:"⚖",
    keywords:"Révélation · appel · bilan", symbols:"trompette · trois figures ressuscitées · lumière",
    marseille:"Un ange sonne de la trompette dans le ciel tandis que trois figures se dressent hors de leurs tombeaux, bras levés. C'est l'appel qui réveille, le bilan d'une vie entière soudain mis en lumière, la résurrection après le passage de l'Arcane sans nom.",
    mythe:"Minos, roi mortel devenu l'un des trois juges des Enfers, pèse la vie de chaque âme pour décider de son sort — l'acte même de juger que la carte donne à voir sous le son de la trompette. Il est le juge invisible derrière l'appel, celui qui décide ce que chaque âme relevée mérite." },
  { num:"XXI", label:"Le Monde", dieu:"Gaïa", glyph:"🌿",
    keywords:"Accomplissement · totalité · unité", symbols:"mandorle · quatre figures · racines · monde vivant",
    marseille:"Une figure dansante est enserrée dans une couronne ovale, entourée aux quatre coins des symboles des évangélistes — ange, aigle, taureau, lion. C'est la totalité accomplie, le monde entier tenu dans une seule figure harmonieuse.",
    mythe:"Gaïa, déesse primordiale et personnification de la Terre elle-même, mère des Titans, des mers et des montagnes, est le sol vivant d'où jaillit toute chose et vers lequel tout retourne. Elle est la totalité que la mandorle encadre, le monde vivant que la figure dansante habite." }
];

const COURTS = {
  "Bâtons":[
    { rank:"Valet", dieu:"Éos", glyph:"🌅", keywords:"Éveil · impulsion · potentiel",
      mythe:"Éos, déesse de l'aurore, est chaque jour la première à ouvrir le ciel de lumière : héraut juvénile de l'élément du feu, elle est l'étincelle avant le brasier, l'éveil avant l'élan." },
    { rank:"Cavalier", dieu:"Niké", glyph:"🏆", keywords:"Élan · conquête · victoire",
      mythe:"Niké, déesse ailée de la victoire, vole vers celui ou celle qui l'emporte : mouvement décisif, triomphant, elle engage la volonté du Bâton dans l'action jusqu'à son terme." },
    { rank:"Reine", dieu:"Hestia", glyph:"🔥", keywords:"Feu intérieur · confiance · stabilité",
      mythe:"Hestia, gardienne du foyer sacré, la plus calme des Olympiennes, ne conquiert rien : elle entretient. Le feu maîtrisé de l'intérieur, la constance plutôt que la conquête." },
    { rank:"Roi", dieu:"Héphaïstos", glyph:"⚒", keywords:"Création · maîtrise · transformation",
      mythe:"Héphaïstos, dieu forgeron, boiteux mais souverain à son enclume, transforme le feu brut en création durable. La maîtrise du Bâton devenue œuvre et métier accompli." }
  ],
  "Coupes":[
    { rank:"Valet", dieu:"Himeros", glyph:"💗", keywords:"Désir naissant · sensibilité · attirance",
      mythe:"Himéros, personnification du désir naissant, compagnon d'Éros, est le tout premier frémissement du cœur avant qu'il ne devienne attachement — la sensibilité à peine éveillée." },
    { rank:"Cavalier", dieu:"Énée", glyph:"⛵", keywords:"Quête · voyage du cœur · engagement",
      mythe:"Énée, dont le long périple en mer est guidé par la piété et la fidélité à son destin comme à sa famille, engage l'émotion dans le mouvement et l'épreuve : le cœur mis à l'épreuve du voyage." },
    { rank:"Reine", dieu:"Aphrodite", glyph:"🕊", keywords:"Amour · beauté · désir · réceptivité",
      mythe:"Aphrodite, déesse de l'amour et de la beauté, est la maîtrise pleinement intériorisée du monde affectif — et, dans cette cour, la mère d'Énée : le désir qui a engendré la quête devient ici souveraineté sur le domaine du cœur." },
    { rank:"Roi", dieu:"Nérée", glyph:"🌊", keywords:"Profondeur · sagesse · vérité émotionnelle",
      mythe:"Nérée, le « Vieillard de la mer », sage et véridique, connaît les profondeurs sans jamais mentir. Une sagesse émotionnelle assise, posée, qui vient du fond plutôt que de la surface." }
  ],
  "Épées":[
    { rank:"Valet", dieu:"Zéphyr", glyph:"🍃", keywords:"Curiosité · rapidité · esprit vif",
      mythe:"Zéphyr, le vent d'ouest, léger et rapide, est l'idée qui vient à peine de naître : curiosité vive, agilité mentale, premier souffle de l'esprit." },
    { rank:"Cavalier", dieu:"Bellérophon", glyph:"🐎", keywords:"Action · courage · maîtrise · confrontation",
      mythe:"Bellérophon dompte et chevauche Pégase, le cheval ailé — avec l'aide d'Athéna qui lui offre la bride d'or — pour affronter la Chimère. Action décisive, courage, maîtrise d'une force indomptable et confrontation directe : le Cavalier par excellence." },
    { rank:"Reine", dieu:"Athéna", glyph:"🦉", keywords:"Discernement · stratégie · intelligence",
      mythe:"Athéna, déesse de la sagesse stratégique et de la guerre raisonnée, incarne le discernement, le jugement clair, l'intelligence appliquée avec précision — celle-là même qui aide Bellérophon à maîtriser Pégase." },
    { rank:"Roi", dieu:"Éole", glyph:"🌬", keywords:"Autorité · contrôle · maîtrise des forces de l'air",
      mythe:"Éole, gardien et souverain des vents, peut les libérer ou les enfermer à volonté dans son outre. Autorité sur la pensée et la parole, maîtrise de forces que d'autres ne savent pas contenir." }
  ],
  "Deniers":[
    { rank:"Valet", dieu:"Chloris", glyph:"🌸", keywords:"Germination · potentiel · croissance",
      mythe:"Chloris, déesse des fleurs et de la végétation printanière (future Flore), est le tout premier signe de germination : un potentiel encore invisible sous la terre, prêt à percer." },
    { rank:"Cavalier", dieu:"Triptolemos", glyph:"🌾", keywords:"Travail · transmission · agriculture",
      mythe:"Triptolemos, instruit par Déméter elle-même, parcourt le monde sur un char ailé pour enseigner l'art de semer et de cultiver le blé. Davantage un héros-passeur de culture qu'un guerrier : le travail de la terre mis en mouvement et transmis." },
    { rank:"Reine", dieu:"Perséphone", glyph:"🌺", keywords:"Cycles · fertilité · renaissance",
      mythe:"Perséphone, dont le passage annuel entre les Enfers et la surface règle les saisons, connaît de l'intérieur les cycles de mort et de renaissance de la terre — la fécondité vécue et intériorisée." },
    { rank:"Roi", dieu:"Ploutos", glyph:"🪙", keywords:"Abondance · richesse · prospérité",
      mythe:"Ploutos, dieu de la richesse agricole et de l'abondance, fils de Déméter, est le fruit final du cycle : la croissance patiente devenue prospérité accomplie." }
  ]
};

/* ===========================================================
   Construction du jeu de 78 cartes
   =========================================================== */

function deSuit(suit){
  return suit === "Épées" ? `d'${suit}` : `de ${suit}`;
}

function marseilleCourt(rank, suitName, icon){
  const emblem = `l'emblème ${deSuit(suitName)}`;
  const base = {
    "Valet":`Le Valet se tient debout, tenant ${emblem} avec attention : c'est la figure la plus jeune de la cour, celle qui découvre le langage de l'enseigne et s'apprête tout juste à agir.`,
    "Cavalier":`Le Cavalier est en mouvement, monté à cheval, ${emblem} en main : il engage l'énergie de l'enseigne dans l'action, le déplacement et la confrontation avec le monde.`,
    "Reine":`La Reine, assise, tient ${emblem} avec calme et retenue : elle a intériorisé cette énergie et la maîtrise depuis l'intérieur, sans avoir à la démontrer.`,
    "Roi":`Le Roi, trônant et couronné, tient ${emblem} avec autorité : il incarne la maîtrise pleinement accomplie et structurée de cette énergie dans le monde.`
  };
  return base[rank] || "";
}

function buildCards(){
  const cards = [];

  MAJORS.forEach((m, i) => {
    cards.push({
      id:`major-${i}`, type:"major", index:i,
      label:i === 0 ? m.label : `${m.num} — ${m.label}`,
      title:m.dieu, dieu:m.dieu, glyph:m.glyph,
      keywords:m.keywords, symbols:m.symbols,
      marseille:m.marseille, mythe:m.mythe,
      cls:"major"
    });
  });

  Object.entries(COURTS).forEach(([suit, rows]) => {
    const meta = SUITS[suit];
    rows.forEach(row => {
      cards.push({
        id:`${meta.slug}-${row.rank.toLowerCase()}`, type:"court", suit,
        label:`${row.rank} ${deSuit(suit)}`,
        title:row.dieu, dieu:row.dieu, glyph:row.glyph,
        keywords:row.keywords, symbols:meta.symbols,
        marseille:marseilleCourt(row.rank, suit, meta.icon), mythe:row.mythe,
        cls:meta.slug
      });
    });
  });

  Object.entries(SUITS).forEach(([suit, meta]) => {
    for(let n = 1; n <= 10; n++){
      const key = NUMBER_KEYS[n];
      const nom = n === 1 ? "As" : String(n);
      cards.push({
        id:`${meta.slug}-n${n}`, type:"number", suit, number:n,
        label:`${nom} ${deSuit(suit)}`,
        title:key.title, glyph:meta.icon,
        keywords:`${key.direction} · ${meta.short}`,
        symbols:`${key.symbol} · ${meta.symbols}`,
        cls:meta.slug
      });
    }
  });

  return cards;
}

const CARDS = buildCards();
const CARD_BY_ID = Object.fromEntries(CARDS.map(c => [c.id, c]));

/* ===========================================================
   Utilitaires
   =========================================================== */

let journal = JSON.parse(localStorage.getItem("arcanes-journal") || "[]");
let route = "home";

let tirageState = { stage:"ask", question:"", pool:[], revealed:[], lastRevealedId:null };

function escapeHTML(value){
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}

function shuffle(arr){
  const a = [...arr];
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function dayCard(){
  const key = new Date().toISOString().slice(0,10);
  let hash = 0;
  for(const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return CARDS[hash % CARDS.length];
}

function pipHTML(suit, number){
  const icon = SUITS[suit]?.icon || "•";
  return `<div class="pips pips-${number}">${
    Array.from({length:number}, () => `<span class="pip">${icon}</span>`).join("")
  }</div>`;
}

function cardHTML(card){
  const visual = card.type === "number"
    ? pipHTML(card.suit, card.number)
    : `<div class="glyph">${card.glyph || "✦"}</div>`;

  return `<div class="tarot-card ${card.cls}" data-id="${card.id}">
    <div class="frame">
      <div class="card-no">${escapeHTML(card.label)}</div>
      ${visual}
      <div class="card-name">${escapeHTML(card.title)}</div>
      <div class="card-sub">${escapeHTML(card.keywords || "")}</div>
    </div>
  </div>`;
}

/* ===========================================================
   Routage / rendu
   =========================================================== */

function setRoute(newRoute){
  route = newRoute;
  if(newRoute !== "tirage"){
    tirageState = { stage:"ask", question:"", pool:[], revealed:[], lastRevealedId:null };
  }
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

  if(route === "tirage" && tirageState.lastRevealedId){
    const justId = tirageState.lastRevealedId;
    setTimeout(() => { if(tirageState.lastRevealedId === justId) tirageState.lastRevealedId = null; }, 650);
  }
}

function home(){
  const card = dayCard();
  const dateLabel = new Date().toLocaleDateString("fr-FR", { weekday:"long", day:"numeric", month:"long" });

  return `<section class="hero">
    <span class="pill">Tarot de Delphes · 78 cartes</span>
    <h2>Un tarot qui se lit à travers le mythe.</h2>
    <p>Chaque figure du Tarot de Marseille rencontre ici un dieu ou une déesse de la mythologie grecque, choisi pour éclairer son sens.</p>
  </section>

  <div class="divider"><span>✦</span></div>

  <div class="daycard-block" data-go-detail="${card.id}">
    <div class="date-label">Carte du jour · ${escapeHTML(dateLabel)}</div>
    ${cardHTML(card)}
    <div class="hint">Touche la carte pour en découvrir toute la symbolique</div>
  </div>

  <div class="divider"><span>✦</span></div>

  <div class="grid">
    <div class="tile" data-go="tirage">
      <strong>✦ Tirer les cartes</strong>
      <span>Un tirage de trois cartes, choisies à la main, une à une.</span>
    </div>
    <div class="tile" data-go="apprendre">
      <strong>◈ Apprendre</strong>
      <span>Explorer les 78 cartes, leurs dieux et leur symbolique complète.</span>
    </div>
    <div class="tile" data-go="symboles">
      <strong>✧ Symboles</strong>
      <span>Comprendre la grammaire des nombres et des enseignes.</span>
    </div>
    <div class="tile" data-go="journal">
      <strong>☽ Journal</strong>
      <span>Conserver tes tirages et tes interprétations.</span>
    </div>
  </div>`;
}

/* ---------- Tirage : pioche à l'aveugle ---------- */

const DECK_SIZE = 15;

function tirage(){
  if(tirageState.stage === "ask"){
    return `<div class="draw-zone">
      <div class="divider"><span>✦</span></div>
      <h2>Consulter les arcanes</h2>
      <p class="note">Pose ta question, en silence ou par écrit, puis mélange le paquet lorsque tu es prêt·e à tirer.</p>

      <textarea id="drawQuestion" placeholder="Ta question…">${escapeHTML(tirageState.question)}</textarea>

      <button class="primary" id="shuffleBtn">Battre les cartes</button>
    </div>`;
  }

  const { pool, revealed } = tirageState;
  const revealedIds = new Set(revealed.map(c => c.id));
  const done = revealed.length >= 3;

  const fanHTML = pool.map((card, idx) => {
    const isRevealed = revealedIds.has(card.id);
    const rot = ((idx % 5) - 2) * 5;
    const rise = Math.abs((idx % 5) - 2) * 5;

    if(isRevealed){
      const justFlipped = card.id === tirageState.lastRevealedId;
      return `<div class="deck-slot revealed${justFlipped ? " just-flipped" : ""}">
        ${cardHTML(card)}
      </div>`;
    }

    const muted = done ? " muted" : " pickable";
    return `<div class="deck-slot${muted}" data-pick="${idx}" style="transform:rotate(${rot}deg) translateY(${rise}px)">
      <div class="deck-inner">
        <div class="deck-face"><span class="emblem">✦</span></div>
      </div>
    </div>`;
  }).join("");

  const summary = done ? `
    <div class="draw-summary">
      <div class="divider"><span>ton tirage</span></div>
      ${tirageState.question ? `<p class="note">« ${escapeHTML(tirageState.question)} »</p>` : ""}
      <div class="drawn-recap">${revealed.map(c => cardHTML(c)).join("")}</div>
      <p class="note">Touche une carte pour en lire le sens complet.</p>
      <textarea id="drawNotes" placeholder="Tes premières impressions, symboles, interprétation…"></textarea>
      <div class="row">
        <button class="secondary" id="saveDraw">Enregistrer dans le journal</button>
        <button class="secondary" id="newDraw">Nouveau tirage</button>
      </div>
    </div>` : `<p class="pick-hint">Choisis encore ${3 - revealed.length} carte${3 - revealed.length > 1 ? "s" : ""}, sans les regarder à l'avance.</p>`;

  return `<div class="draw-zone">
    <p class="note">Le paquet est mêlé. Choisis trois cartes, une à une, de dos, comme si tu les tenais réellement en main.</p>
    <div class="deck-fan">${fanHTML}</div>
    ${summary}
  </div>`;
}

function startShuffle(){
  const question = document.getElementById("drawQuestion")?.value.trim() || "";
  tirageState = {
    stage:"choose",
    question,
    pool: shuffle(CARDS).slice(0, DECK_SIZE),
    revealed: [],
    lastRevealedId: null
  };
  render();
}

function pickCard(idx){
  if(tirageState.revealed.length >= 3) return;
  const card = tirageState.pool[idx];
  if(!card || tirageState.revealed.some(c => c.id === card.id)) return;

  tirageState.revealed.push(card);
  tirageState.lastRevealedId = card.id;
  render();
}

function saveDrawToJournal(){
  const notes = document.getElementById("drawNotes")?.value || "";
  journal.unshift({
    date: new Date().toLocaleString("fr-FR"),
    question: tirageState.question,
    cards: tirageState.revealed.map(c => `${c.label} — ${c.title}`),
    notes
  });
  localStorage.setItem("arcanes-journal", JSON.stringify(journal));
  alert("Tirage enregistré dans le journal.");
}

/* ---------- Apprendre ---------- */

function apprendre(){
  return `<section class="hero">
    <span class="pill">Parcours libre</span>
    <h2>Apprendre les 78 cartes</h2>
    <p>Touche n'importe quelle carte pour en découvrir la symbolique complète, entre Tarot de Marseille et mythologie grecque.</p>
  </section>

  <div class="divider"><span>arcanes majeurs</span></div>
  <div class="card-grid">
    ${MAJORS.map((m, i) => cardHTML(CARD_BY_ID[`major-${i}`])).join("")}
  </div>

  <div class="divider"><span>figures de cour</span></div>
  ${Object.entries(COURTS).map(([suit, rows]) => `
    <h3>${suit}</h3>
    <div class="card-grid">
      ${rows.map(row => cardHTML(CARD_BY_ID[`${SUITS[suit].slug}-${row.rank.toLowerCase()}`])).join("")}
    </div>
  `).join("")}

  <div class="divider"><span>cartes numérales</span></div>
  ${Object.keys(SUITS).map(suit => `
    <h3>${suit}</h3>
    <div class="card-grid">
      ${CARDS
        .filter(card => card.type === "number" && card.suit === suit)
        .map(card => cardHTML(card))
        .join("")}
    </div>
  `).join("")}`;
}

/* ---------- Symboles ---------- */

function symboles(){
  return `<section class="hero">
    <span class="pill">Grammaire visuelle</span>
    <h2>Bibliothèque symbolique</h2>
    <p>Le nombre donne la direction générale ; l'enseigne donne le domaine ; les figures mythologiques donnent le visage.</p>
  </section>

  <div class="divider"><span>les dix nombres</span></div>

  <div class="symbol-list">
    ${Object.entries(NUMBER_KEYS).map(([number,key]) => `
      <div class="symbol">
        <b>${number === "1" ? "As" : number} — ${key.title}</b><br>
        <span>${escapeHTML(key.symbol)}</span><br>
        <small>${escapeHTML(key.essay)}</small>
      </div>
    `).join("")}
  </div>

  <div class="divider"><span>les quatre enseignes</span></div>

  <div class="symbol-list">
    ${Object.entries(SUITS).map(([suit,meta]) => `
      <div class="symbol">
        <b>${suit} — ${meta.element}</b><br>
        ${escapeHTML(meta.sense)}<br>
        <small>Symboles : ${escapeHTML(meta.symbols)}</small><br>
        <small>Cour : ${escapeHTML(meta.story)}</small>
      </div>
    `).join("")}
  </div>`;
}

/* ---------- Journal ---------- */

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

/* ---------- Détail d'une carte ---------- */

function showDetail(card){
  const numberBlock = card.type === "number" ? `
    <div class="lore-block">
      <b class="lore-title">✦ Grammaire du nombre</b>
      <p>${escapeHTML(NUMBER_KEYS[card.number].essay)}</p>
    </div>
    <div class="lore-block mythe">
      <b class="lore-title">◈ L'univers des ${escapeHTML(card.suit)}</b>
      <p>${escapeHTML(SUITS[card.suit].sense)} Cette carte appartient au monde gouverné par ${escapeHTML(SUITS[card.suit].court.join(", "))} — ${escapeHTML(SUITS[card.suit].story)}</p>
    </div>` : `
    <div class="lore-block">
      <b class="lore-title">✦ Symbolique du Tarot de Marseille</b>
      <p>${escapeHTML(card.marseille || "")}</p>
    </div>
    <div class="lore-block mythe">
      <b class="lore-title">◈ Le mythe — ${escapeHTML(card.dieu)}</b>
      <p>${escapeHTML(card.mythe || "")}</p>
    </div>`;

  const category = card.type === "major"
    ? "Arcane majeur"
    : card.type === "court"
      ? `Figure de cour · ${card.suit}`
      : `Carte numérale · ${card.suit}`;

  document.getElementById("screen").innerHTML = `
    <div class="detail">
      <div class="detail-head">
        <div class="eyebrow-line">${escapeHTML(category)}</div>
        <h2>${escapeHTML(card.label)}</h2>
        <div class="dieu-name">${card.dieu ? `incarné par ${escapeHTML(card.dieu)}` : escapeHTML(card.title)}</div>
      </div>

      ${cardHTML(card)}

      <div class="symbol-list">
        <div class="symbol">
          <b>Symboles clés</b><br>
          ${escapeHTML(card.symbols || "À compléter")}
        </div>
      </div>

      ${numberBlock}

      <div class="row">
        <button class="secondary" id="detailBack">← Retour</button>
      </div>
    </div>`;

  document.getElementById("detailBack").onclick = () => render();
  window.scrollTo(0,0);
}

/* ===========================================================
   Liaison des événements
   =========================================================== */

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

  document.querySelectorAll("[data-go-detail]").forEach(element => {
    element.onclick = () => {
      const c = CARD_BY_ID[element.dataset.goDetail];
      if(c) showDetail(c);
    };
  });

  document.querySelectorAll("[data-id]").forEach(element => {
    if(element.closest("[data-go-detail]")) return;
    element.onclick = (event) => {
      event.stopPropagation();
      const c = CARD_BY_ID[element.dataset.id];
      if(c) showDetail(c);
    };
  });

  const shuffleButton = document.getElementById("shuffleBtn");
  if(shuffleButton) shuffleButton.onclick = startShuffle;

  document.querySelectorAll("[data-pick]").forEach(element => {
    element.onclick = () => pickCard(Number(element.dataset.pick));
  });

  const saveButton = document.getElementById("saveDraw");
  if(saveButton) saveButton.onclick = saveDrawToJournal;

  const newDrawButton = document.getElementById("newDraw");
  if(newDrawButton){
    newDrawButton.onclick = () => {
      tirageState = { stage:"ask", question:"", pool:[], revealed:[], lastRevealedId:null };
      render();
    };
  }

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

render();

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}
