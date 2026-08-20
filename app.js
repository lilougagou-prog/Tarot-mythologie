/* ===================== DONNÉES : ARCANES MAJEURS (correspondances verrouillées) ===================== */

const MAJORS = [
["Le Mat","Dionysos","🍇","Liberté · instinct · départ · lâcher-prise","major","lierre · vigne · panthère · sac de voyage · bâton"],
["I — Le Bateleur","Hermès","☿","Commencement · potentiel · habileté","major","caducée · bâton · coupe · épée · denier · table · sac de voyage"],
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
  myth:"C'est l'étincelle que Prométhée déroba aux dieux pour l'offrir aux hommes — un feu premier, avant toute maîtrise, porteur d'un potentiel immense et encore dangereux. Cet As est ce don initial, à apprivoiser plutôt qu'à redouter."
},
"2 de Bâtons": {
  marseille:"Un personnage tient le globe d'une main et un bâton de l'autre, regardant au loin depuis ses remparts : premier choix de direction, projet qui hésite encore entre deux voies.",
  myth:"Héraclès, à la croisée des chemins, dut choisir entre la voie facile du plaisir et celle, plus rude, de la vertu — un choix qui façonna toute sa légende. Cette carte pose la même question : quelle direction donner à une énergie qui ne demande qu'à partir ?"
},
"3 de Bâtons": {
  marseille:"Trois bâtons plantés en terre, un personnage regarde des navires s'éloigner vers l'horizon : entreprise lancée, expansion, résultats encore à venir mais déjà en mouvement.",
  myth:"Jason, une fois l'Argo achevé, dut attendre que le vent se lève pour partir vers la Toison d'or — l'élan était prêt, restait à le laisser porter ses fruits au loin. Cette carte est cette attente active, tournée vers ce qui vient."
},
"4 de Bâtons": {
  marseille:"Quatre bâtons soutiennent une guirlande de fleurs, deux figures célèbrent devant : stabilité heureuse, fondations posées, moment de répit mérité après l'effort.",
  myth:"Les fêtes en l'honneur d'Hestia et du foyer marquaient traditionnellement l'achèvement d'une maison — un seuil franchi, une base désormais sûre pour continuer à bâtir. Cette carte célèbre ce même palier stable."
},
"5 de Bâtons": {
  marseille:"Cinq personnages croisent leurs bâtons dans un désordre apparent : rivalité, tension d'énergies qui s'opposent sans qu'aucune ne prenne clairement le dessus.",
  myth:"Les jeux du stade antique opposaient les athlètes dans une compétition rude mais codifiée — la friction n'y était pas destructrice, elle faisait partie du jeu. Cette carte invite à voir le conflit comme un frottement nécessaire, pas une catastrophe."
},
"6 de Bâtons": {
  marseille:"Un cavalier couronné de laurier avance entouré de bâtons, acclamé par d'autres : victoire reconnue publiquement, effort enfin récompensé et validé par les autres.",
  myth:"Le laurier couronnait les vainqueurs des jeux Pythiques, à Delphes même, en hommage à Apollon qui l'avait consacré après sa propre victoire sur le serpent Python. Cette carte est cette reconnaissance méritée, célébrée devant témoins."
},
"7 de Bâtons": {
  marseille:"Un personnage en position haute défend sa place avec un bâton contre six autres levés vers lui : résistance, position à défendre, courage face à une pression multiple.",
  myth:"Achille, seul face à la coalition adverse sous les murs de Troie, continua de tenir sa position malgré le nombre. Cette carte est cette même ténacité — tenir bon, même sans certitude de l'issue."
},
"8 de Bâtons": {
  marseille:"Huit bâtons filent dans les airs, en plein vol, vers un but encore invisible : accélération soudaine, événements qui se précipitent après une période d'attente.",
  myth:"Les flèches d'Apollon, dieu archer autant que solaire, atteignaient toujours leur cible avec une vitesse redoutable. Cette carte annonce ce même mouvement rapide, presque impossible à ralentir une fois lancé."
},
"9 de Bâtons": {
  marseille:"Un personnage blessé mais debout tient son dernier bâton, huit autres dressés derrière lui en rempart : résilience, vigilance maintenue malgré la fatigue accumulée.",
  myth:"Héraclès, au seuil de son douzième et dernier travail, portait déjà les marques des onze précédents sans jamais renoncer. Cette carte est cette endurance presque épuisée mais qui refuse encore de céder."
},
"10 de Bâtons": {
  marseille:"Un personnage courbé porte dix bâtons vers une maison au loin : charge lourde, responsabilités accumulées, but presque atteint mais au prix d'un fardeau conséquent.",
  myth:"Atlas porte le poids du ciel sur ses épaules, une charge sans fin qu'aucun repos ne vient jamais alléger totalement. Cette carte questionne cette même charge : est-elle encore nécessaire à porter seul jusqu'au bout ?"
},
"As de Coupes": {
  marseille:"Une main sort des nuages, offrant une coupe débordante d'où jaillissent cinq jets d'eau : émotion neuve et généreuse, cœur ouvert avant toute retenue.",
  myth:"La source de Castalie, au pied du mont Parnasse à Delphes, offrait à qui s'y abreuvait une inspiration purifiée, presque sacrée. Cet As est cette même eau vive, promesse d'un sentiment encore intact."
},
"2 de Coupes": {
  marseille:"Deux figures échangent leurs coupes face à face, un caducée ailé entre elles : union, réciprocité, lien affectif qui se noue à parts égales.",
  myth:"Éros et Psyché, après bien des épreuves, finirent unis dans une réciprocité que ni les dieux ni les obstacles n'avaient réussi à empêcher. Cette carte célèbre cet échange équilibré, où chacun donne autant qu'il reçoit."
},
"3 de Coupes": {
  marseille:"Trois figures lèvent leur coupe ensemble, en cercle, entourées de fruits : joie partagée, célébration collective, abondance émotionnelle vécue à plusieurs.",
  myth:"Les Charites, déesses de la grâce et de la joie, dansaient toujours ensemble, jamais seules — leur bonheur n'existait que partagé. Cette carte est cette même allégresse qui a besoin d'être vécue à plusieurs pour prendre tout son sens."
},
"4 de Coupes": {
  marseille:"Un personnage assis sous un arbre regarde trois coupes sans réaction, une quatrième lui est tendue depuis un nuage : lassitude, indifférence face à une opportunité pourtant offerte.",
  myth:"Narcisse, absorbé par son propre reflet, ne vit jamais l'amour d'Écho pourtant sincèrement tendu vers lui. Cette carte avertit de ce même risque : trop tourné vers l'intérieur, on peut laisser passer ce qui mériterait un regard."
},
"5 de Coupes": {
  marseille:"Un personnage en deuil contemple trois coupes renversées, sans voir les deux qui restent debout derrière lui : regret, attention entièrement fixée sur la perte plutôt que sur ce qui subsiste.",
  myth:"Déméter, pleurant Perséphone disparue, refusa longtemps de voir qu'elle pourrait un jour la retrouver. Cette carte rappelle cette même leçon : le chagrin est légitime, mais il ne doit pas aveugler sur ce qui reste encore possible."
},
"6 de Coupes": {
  marseille:"Deux enfants échangent des coupes fleuries dans un jardin paisible : nostalgie douce, souvenir d'enfance, tendresse simple retrouvée sans calcul.",
  myth:"Perséphone, enfant, cueillait des fleurs dans les prairies avant que le monde souterrain ne l'appelle — un souvenir d'innocence auquel elle resta toujours attachée. Cette carte ravive ce même attachement à une douceur passée."
},
"7 de Coupes": {
  marseille:"Sept coupes flottent dans les nuages, chacune contenant une image différente — trésor, serpent, couronne : choix multiples, illusions à démêler avant de décider vraiment.",
  myth:"Circé offrait à ses visiteurs des breuvages aux apparences trompeuses, séduisants mais rarement ce qu'ils semblaient être. Cette carte invite à la même vigilance : toutes les promesses ne se valent pas, il faut regarder au-delà du reflet."
},
"8 de Coupes": {
  marseille:"Un personnage s'éloigne de nuit, laissant huit coupes soigneusement empilées derrière lui : départ volontaire, quête de sens qui prime sur ce qui a déjà été construit.",
  myth:"Perséphone elle-même quitte chaque année le monde d'en haut pour redescendre — un départ qui n'est ni fuite ni échec, mais nécessité intérieure. Cette carte est ce même choix de partir vers autre chose, même en laissant de l'acquis derrière soi."
},
"9 de Coupes": {
  marseille:"Un personnage satisfait est assis, bras croisés, devant neuf coupes alignées en arc : contentement, désirs comblés, bien-être qui n'a plus besoin de rien démontrer.",
  myth:"Dans les Champs Élysées, les âmes bienheureuses jouissaient d'un repos paisible, sans manque ni attente. Cette carte est ce même sentiment d'accomplissement affectif, tranquille et suffisant."
},
"10 de Coupes": {
  marseille:"Une famille réunie lève les bras vers un arc-en-ciel de dix coupes au-dessus d'elle : bonheur familial accompli, harmonie durable, joie qui se transmet au-delà de soi.",
  myth:"Iris, messagère arc-en-ciel entre les mondes, relie le ciel et la terre d'une lumière qui ne se referme jamais tout à fait sur elle-même. Cette carte est ce bonheur qui rayonne et se partage, plutôt que de rester enfermé."
},
"As de Épées": {
  marseille:"Une main tient une épée droite couronnée de laurier et de palme : idée claire, vérité qui perce, décision prise avec une netteté qui ne laisse pas de place au doute.",
  myth:"La Pythie, à Delphes, prononçait ses oracles dans une clarté parfois brutale — une vérité qu'on ne pouvait ni négocier ni adoucir. Cet As porte cette même force tranchante : une pensée juste, mais qui exige d'être entendue telle quelle."
},
"2 de Épées": {
  marseille:"Une figure aux yeux bandés tient deux épées croisées sur sa poitrine, dos à la mer : indécision assumée, équilibre précaire entre deux choix qu'on refuse encore de trancher.",
  myth:"Thémis elle-même, avant de juger, se bandait parfois les yeux pour ne pas laisser l'apparence influencer la balance. Cette carte est ce moment suspendu où l'on refuse de choisir, le temps de voir plus clair."
},
"3 de Épées": {
  marseille:"Trois épées transpercent un cœur rouge sous un ciel d'orage : douleur nette, vérité blessante mais nécessaire, rupture qui ne peut plus être évitée.",
  myth:"Les flèches d'Éros ne visaient pas toujours l'amour partagé : certaines, dorées, faisaient naître un amour non réciproque, source d'une souffrance bien réelle. Cette carte est cette blessure précise, qu'il faut traverser plutôt que nier."
},
"4 de Épées": {
  marseille:"Une figure allongée repose sur un tombeau, trois épées suspendues au mur et une sous elle : retrait nécessaire, repos de l'esprit après une période de tension.",
  myth:"Endymion, plongé par Séléné dans un sommeil éternel pour rester jeune à jamais, avait cessé toute agitation. Cette carte invite à cette même pause volontaire : l'esprit a parfois besoin de silence pour se réparer."
},
"5 de Épées": {
  marseille:"Un personnage ramasse trois épées avec un sourire ambigu tandis que deux figures s'éloignent, tête baissée : victoire à coût élevé, conflit gagné mais qui laisse un goût amer.",
  myth:"Bellérophon, après sa victoire sur la Chimère, laissa son orgueil grandissant l'éloigner peu à peu de ceux qui l'admiraient. Cette carte questionne le prix réel de certaines victoires — celles qui isolent plus qu'elles ne rassemblent."
},
"6 de Épées": {
  marseille:"Un passeur conduit une barque chargée d'épées vers une rive plus calme, deux silhouettes assises à l'arrière : transition, éloignement volontaire d'une zone de trouble vers plus de sérénité.",
  myth:"Charon menait les âmes à travers le Styx, non vers une fin, mais vers un autre état — un passage nécessaire, jamais un naufrage. Cette carte est ce même mouvement : quitter une eau agitée pour une autre, plus tranquille."
},
"7 de Épées": {
  marseille:"Un personnage s'éloigne d'un camp en emportant cinq épées, en laissant deux derrière lui, avec un air furtif : stratégie, action menée en partie seule, discrétion parfois nécessaire.",
  myth:"Ulysse conçut le stratagème du cheval de Troie non par la force, mais par une ruse qu'il garda pour lui jusqu'au bout. Cette carte est cette même intelligence tactique — efficace, mais qui flirte parfois avec la limite de l'honnêteté."
},
"8 de Épées": {
  marseille:"Une figure entravée et les yeux bandés se tient debout, entourée de huit épées plantées en cercle : sentiment d'enfermement, obstacles qui semblent infranchissables — mais le chemin entre les épées reste ouvert.",
  myth:"Andromède, enchaînée au rocher offerte au monstre marin, semblait sans issue jusqu'à ce que Persée vienne rompre ce qui la retenait. Cette carte rappelle que l'entrave est souvent plus mentale que réellement définitive."
},
"9 de Épées": {
  marseille:"Un personnage se réveille en sursaut, le visage dans les mains, neuf épées suspendues au-dessus de lui : angoisse nocturne, pensées ressassées qui empêchent le repos.",
  myth:"Les Érinyes poursuivaient les coupables jusque dans leurs rêves, sans relâche, réveillant sans cesse une culpabilité qu'aucune fuite ne pouvait apaiser. Cette carte est cette même nuit agitée — mais le jour, souvent, dissipe ce que la nuit avait grossi."
},
"10 de Épées": {
  marseille:"Un personnage gît au sol, transpercé de dix épées, sous un ciel qui commence pourtant à s'éclaircir à l'horizon : fin brutale d'un cycle, mais aussi le signe qu'il ne peut plus rien empirer après cela.",
  myth:"Actéon, changé en cerf et déchiré par ses propres chiens pour avoir vu Artémis au bain, connut une fin sans appel — mais son histoire, elle, devint un avertissement qui survécut à sa chute. Cette carte est ce point le plus bas d'où, justement, il ne reste qu'à se relever."
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

// Images (base64) — les 6 premières cartes ont une illustration ; les autres restent en glyphe pour le moment.
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

// Numérologie du temps : année et mois personnels, à partir de la date de naissance
// ("AAAA-MM-JJ") et de la date du jour — formule classique (jour + mois de naissance +
// année en cours, puis + mois en cours), même grammaire symbolique que le nombre du
// prénom (NUMBER_KEYS, réduit 1-9). Contrairement au nombre du prénom (fixe), ces deux-là
// évoluent avec le temps : l'année personnelle change chaque 1er janvier, le mois
// personnel chaque mois — une façon de situer où on en est dans son propre cycle.
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

/* ===================== BIBLIOTHÈQUE SYMBOLIQUE ÉTOFFÉE ===================== */
// id -> {icon, label, category, desc, links: [ids de divinités]}

const SYMBOL_LIBRARY = {
  // Lieux & passages
  "porte":{icon:"🚪",label:"Porte",category:"Lieux & passages",desc:"Seuil, choix à faire, passage d'un état à un autre.",links:[],lore:[
    "Dans la mythologie grecque, les portes ne sont jamais anodines : elles séparent deux mondes et marquent le moment où un choix devient irréversible.",
    "Homère décrit dans l'Odyssée deux portes du sommeil, l'une de corne, l'autre d'ivoire : les rêves qui passent par la porte de corne se réalisent, ceux qui passent par la porte d'ivoire ne sont que des illusions trompeuses. Franchir une porte n'est donc jamais un geste neutre — encore faut-il savoir laquelle on choisit.",
    "Les portes des Enfers, elles, gardées par Cerbère, ne se franchissent que dans un sens pour les mortels ordinaires : entrer y est possible, en ressortir exige une faveur exceptionnelle.",
    "La porte est ainsi devenue un symbole de seuil, de choix décisif, de passage d'un état à un autre et de ce qui sépare l'illusion de la vérité.",
  ]},
  "chemin":{icon:"🛤",label:"Chemin",category:"Lieux & passages",desc:"Évolution en cours, quête, direction prise plutôt qu'imposée.",links:[],lore:[
    "Le chemin est l'un des symboles les plus anciens du choix humain, et la mythologie grecque en a fait une véritable scène philosophique.",
    "Selon un récit rapporté par le sophiste Prodicos, le jeune Héraclès, arrivé à un carrefour, vit apparaître deux figures : la Vertu, qui lui promettait une vie difficile mais glorieuse, et le Vice, qui lui promettait une vie facile mais sans grandeur. Héraclès dut choisir sa route avant même d'avoir accompli le moindre exploit.",
    "Le chemin qu'on choisit à ce carrefour engage tout ce qui suivra — non pas un simple décor, mais une direction qui façonne le reste de l'histoire.",
    "Le chemin est devenu un symbole de choix, de direction assumée, de quête et d'évolution en cours plutôt qu'imposée.",
  ]},
  "pont":{icon:"🌉",label:"Pont",category:"Lieux & passages",desc:"Transition, lien construit entre deux états qui semblaient séparés.",links:[],lore:[
    "Le pont est un symbole plus discret dans la mythologie grecque que la porte ou le chemin : les récits antiques franchissent plus souvent les frontières par un passeur (Charon sur le Styx) ou par les airs (Hermès, Iris) que par une construction humaine.",
    "C'est peut-être ce qui rend le pont particulier : contrairement au passeur qu'il faut payer ou au messager qu'il faut attendre, le pont est un lien qu'on peut bâtir soi-même entre deux rives qui semblaient séparées pour toujours.",
    "Il est ainsi devenu un symbole de transition choisie, de lien construit et de réconciliation entre deux états qui semblaient incompatibles.",
  ]},
  "grotte":{icon:"🕳",label:"Grotte",category:"Lieux & passages",desc:"Inconscient, retrait nécessaire, initiation loin du regard des autres.",links:[],lore:[
    "La grotte occupe une place à part dans la mythologie grecque : c'est un lieu caché, à l'écart du regard des dieux comme des hommes, où peuvent se produire des événements décisifs.",
    "Le mythe le plus célèbre est celui de la naissance de Zeus lui-même : pour le soustraire à son père Cronos, qui dévorait ses enfants, sa mère Rhéa le cacha dans une grotte du mont Ida, en Crète, où il fut élevé en secret jusqu'à pouvoir renverser son père.",
    "Les grottes abritent aussi des figures oraculaires, comme celle de Trophonios, où l'on descendait consulter un oracle si redoutable que ceux qui en ressortaient étaient dits ne plus jamais sourire.",
    "La grotte est devenue un symbole de retrait nécessaire, d'initiation loin du regard des autres et de protection avant de pouvoir affronter le monde.",
  ]},
  "montagne":{icon:"⛰",label:"Montagne",category:"Lieux & passages",desc:"Épreuve, élévation progressive, objectif qui se mérite.",links:[],lore:[
    "La montagne la plus importante de la mythologie grecque est bien sûr l'Olympe, demeure des dieux, si haute que son sommet touchait, croyait-on, le domaine céleste lui-même.",
    "Le mont Parnasse, non loin de Delphes, était quant à lui consacré à Apollon et aux Muses : c'est sur ses pentes que résonnait l'inspiration poétique et prophétique.",
    "Gravir une montagne dans l'imaginaire grec n'est donc jamais seulement un effort physique : c'est se rapprocher d'un savoir ou d'une présence qui ne se donne pas au niveau du sol.",
    "La montagne est devenue un symbole d'épreuve, d'élévation progressive et d'objectif qui se mérite à chaque pas.",
  ]},
  "forêt":{icon:"🌲",label:"Forêt",category:"Lieux & passages",desc:"Inconnu, instinct, risque de s'égarer avant de retrouver son chemin.",links:[],lore:[
    "La forêt appartient au domaine d'Artémis, déesse de la chasse et des espaces sauvages, qui y règne avec ses nymphes loin des cités et de leurs lois.",
    "C'est aussi le territoire de Pan, dieu à moitié bouc, dont la présence dans les bois profonds pouvait saisir le voyageur d'une terreur soudaine et irraisonnée — la « panique » lui doit d'ailleurs son nom.",
    "La forêt grecque n'est donc pas un simple décor : c'est un lieu où les repères de la civilisation s'effacent, où l'instinct reprend le dessus sur la raison.",
    "Elle est devenue un symbole d'inconnu, d'instinct, de risque de s'égarer avant de retrouver son chemin — et de nature qui échappe à tout contrôle.",
  ]},
  "mer":{icon:"🌊",label:"Mer",category:"Lieux & passages",desc:"Inconscient, immensité, départ vers un ailleurs incertain.",links:["poséidon","nérée"],lore:[
    "La mer appartient avant tout à Poséidon, dieu des océans et des tremblements de terre, dont l'humeur changeante pouvait aussi bien porter les navires que les briser.",
    "Elle abrite aussi des figures plus anciennes et plus paisibles, comme Nérée, le « Vieillard de la mer », doué de sagesse et de don de prophétie, père des cinquante Néréides.",
    "La mer réunit ainsi deux visages : la puissance instable de Poséidon et la sagesse discrète de Nérée — la même immensité peut engloutir ou révéler.",
    "Elle est devenue un symbole d'inconscient, d'immensité, de départ vers un ailleurs incertain et de puissance qu'on ne maîtrise jamais complètement.",
    "La mer est particulièrement associée à Poséidon et à Nérée.",
  ]},
  "rivière":{icon:"🏞",label:"Rivière",category:"Lieux & passages",desc:"Passage, changement continu, ce qui circule sans jamais s'arrêter.",links:[],lore:[
    "Les fleuves occupent une place à part dans la mythologie grecque : ce sont des divinités à part entière, et certains d'entre eux marquent la frontière entre le monde des vivants et celui des morts.",
    "Le Styx, fleuve des Enfers, est si sacré que les dieux eux-mêmes prêtaient sur ses eaux leurs serments les plus solennels — un serment fait sur le Styx ne pouvait jamais être rompu. Le Léthé, lui, faisait oublier aux âmes leur vie passée à celles qui buvaient de ses eaux avant de renaître.",
    "Une rivière, dans cet imaginaire, n'est donc jamais un simple obstacle : elle engage, elle efface, elle fait passer d'un état à un autre sans retour possible.",
    "La rivière est devenue un symbole de passage, de changement continu et de ce qui circule sans jamais s'arrêter — parfois au prix d'un serment ou d'un oubli.",
  ]},
  "temple":{icon:"🏛",label:"Temple",category:"Lieux & passages",desc:"Connaissance sacrée, initiation, seuil entre le profane et le sacré.",links:[],lore:[
    "Le temple est le lieu où le sacré se rend accessible aux mortels, sans jamais leur appartenir tout à fait.",
    "Le plus célèbre d'entre eux, pour ce tarot, est sans doute le temple d'Apollon à Delphes, où la Pythie, assise sur son trépied, rendait des oracles réputés infaillibles — et où était gravée la maxime « Connais-toi toi-même ».",
    "Franchir le seuil d'un temple, c'était donc quitter le monde profane pour entrer dans un espace où la parole divine pouvait se faire entendre, à condition de savoir l'écouter.",
    "Le temple est devenu un symbole de savoir sacré, d'initiation et de seuil entre le monde profane et ce qui le dépasse.",
  ]},
  "monde souterrain":{icon:"⚱",label:"Enfer / monde souterrain",category:"Lieux & passages",desc:"Transformation profonde, mort symbolique, vérité qui ne peut plus rester cachée.",links:["hadès","perséphone"],lore:[
    "Le monde souterrain est le royaume d'Hadès, frère de Zeus et de Poséidon, qui en hérita lors du partage du cosmos entre les trois dieux.",
    "Perséphone y règne à ses côtés une partie de l'année, après avoir été enlevée par Hadès et liée aux Enfers pour avoir mangé quelques grains de grenade (voir la fiche « Grenade »). Son passage entre les deux mondes rythme les saisons.",
    "Contrairement à une idée reçue, ce monde souterrain n'est pas un lieu de punition pour tous : c'est avant tout le domaine de ce qui a été transformé, de ce qui ne peut plus revenir en arrière — un passage plus qu'un châtiment.",
    "Il est devenu un symbole de transformation profonde, de mort symbolique et de vérité qui ne peut plus rester cachée une fois qu'on y est descendu.",
    "Le monde souterrain est particulièrement associé à Hadès et à Perséphone.",
  ]},

  // Mythologie — attributs et divinités
  "caducée":{icon:"⚕",label:"Caducée",category:"Mythologie",desc:"Attribut d'Hermès : médiation, circulation, communication entre des mondes séparés.",links:["hermès"],lore:[
    "Le caducée est le bâton d'Hermès, reconnaissable à ses deux serpents entrelacés et à ses ailes.",
    "Hermès est le messager des dieux. Il circule constamment entre les différents mondes : Olympe, monde humain et monde souterrain.",
    "Son bâton correspond donc parfaitement à sa fonction : il accompagne celui qui franchit les frontières et transporte les messages d'un monde à l'autre.",
    "Les deux serpents qui s'entrelacent peuvent également évoquer la rencontre, l'échange et la circulation.",
    "Le caducée est ainsi devenu un symbole de médiation, de communication, de circulation, de commerce, de passage et de lien entre les mondes.",
    "Le caducée est particulièrement associé à Hermès.",
    "Le caducée d'Hermès ne doit pas être confondu avec le bâton d'Asclépios, qui ne possède qu'un seul serpent et qui est le véritable symbole traditionnel de la médecine.",
  ]},
  "chouette":{icon:"🦉",label:"Chouette",category:"Mythologie",desc:"Attribut d'Athéna : sagesse, observation, vision claire dans l'obscurité.",links:["athéna"],lore:[
    "La chouette accompagne Athéna et devient l'un des animaux les plus immédiatement reconnaissables de la déesse.",
    "Les Grecs lui attribuaient une capacité à voir dans l'obscurité. Cette particularité en faisait une image naturelle de la clairvoyance : là où les autres ne voient rien, la chouette voit.",
    "Elle correspond donc parfaitement à Athéna, dont la sagesse consiste non seulement à accumuler des connaissances, mais surtout à observer, comprendre et discerner avant d'agir.",
    "La chouette est devenue un symbole de sagesse, d'observation, de discernement, de connaissance et de clairvoyance.",
    "La chouette est particulièrement associée à Athéna.",
  ]},
  "paon":{icon:"🦚",label:"Paon",category:"Mythologie",desc:"Attribut d'Héra : beauté, vigilance, souveraineté légitime.",links:["héra"],lore:[
    "Le paon est devenu l'un des animaux emblématiques d'Héra.",
    "Selon le récit le plus célèbre, Héra plaça les nombreux yeux d'Argos Panoptès, son fidèle gardien, sur la queue du paon après la mort de celui-ci. Les motifs en forme d'yeux devinrent ainsi le souvenir éternel d'Argos.",
    "Le paon semble donc toujours regarder autour de lui. Son plumage magnifique rappelle également le rang d'Héra, reine des dieux, déesse du mariage et de la souveraineté.",
    "Le paon est devenu un symbole de beauté, de vigilance, de dignité, de souveraineté et de regard protecteur.",
    "Le paon est particulièrement associé à Héra.",
  ]},
  "foudre":{icon:"⚡",label:"Foudre",category:"Mythologie",desc:"Attribut de Zeus : autorité, révélation soudaine, jugement qui s'impose de lui-même.",links:["zeus"],lore:[
    "La foudre est l'arme et l'emblème de Zeus.",
    "Après avoir vaincu les Titans, Zeus reçoit des Cyclopes la foudre comme arme divine. Elle devient ensuite l'instrument grâce auquel il impose son autorité et punit ceux qui défient l'ordre des dieux.",
    "Mais la foudre possède également une dimension de révélation : elle surgit brutalement dans le ciel et transforme la nuit en un éclair de lumière.",
    "Elle est donc devenue un symbole de puissance divine, d'autorité, de révélation soudaine, de destruction et de transformation brutale.",
    "La foudre est particulièrement associée à Zeus.",
  ]},
  "trident":{icon:"🔱",label:"Trident",category:"Mythologie",desc:"Attribut de Poséidon : puissance sur les forces naturelles instables — mer, séismes, émotions profondes.",links:["poséidon"],lore:[
    "Le trident est l'attribut le plus reconnaissable de Poséidon.",
    "Le dieu de la mer le porte comme une arme et comme un instrument de domination sur les forces naturelles. Avec lui, il peut agiter la mer et provoquer les tremblements de terre.",
    "Le trident possède donc trois pointes comme si le pouvoir du dieu se déployait dans plusieurs directions à la fois, mais sa signification fondamentale reste celle de la puissance de Poséidon sur les éléments.",
    "Il est devenu un symbole de puissance, de maîtrise des forces naturelles, de mer, de profondeur et de force indomptable.",
    "Le trident est particulièrement associé à Poséidon.",
  ]},
  "lyre":{icon:"🎵",label:"Lyre",category:"Mythologie",desc:"Attribut d'Apollon : harmonie, vérité transmise par la beauté plutôt qu'imposée.",links:["apollon"],lore:[
    "La lyre est l'instrument d'Apollon, dieu de la musique, de la poésie et de la lumière — mais elle ne fut pas inventée par lui.",
    "Selon le mythe, c'est Hermès, encore enfant, qui façonna la première lyre à partir d'une carapace de tortue et de cordes tendues, avant de l'offrir à Apollon en échange du troupeau de bœufs qu'il lui avait dérobé. L'instrument de la beauté naît ainsi d'un geste de ruse réparé par un cadeau.",
    "Entre les mains d'Apollon, la lyre devient l'instrument d'une vérité qui persuade par l'harmonie plutôt que par la force — à l'opposé de l'arc, autre attribut du dieu, qui frappe à distance.",
    "La lyre est devenue un symbole d'harmonie, d'inspiration et de vérité transmise par la beauté plutôt qu'imposée.",
    "La lyre est particulièrement associée à Apollon.",
  ]},
  "arc":{icon:"🏹",label:"Arc",category:"Mythologie",desc:"Attribut d'Artémis la chasseresse — et, dans le Tarot, d'Éros : intention, concentration, désir qui vise juste sans toujours consulter la raison.",links:["artémis","éros"],lore:[
    "L'arc est l'instrument du chasseur : il permet d'atteindre sa cible à distance.",
    "Il est particulièrement associé à Artémis, déesse de la chasse et des espaces sauvages. Dans l'Hymne homérique qui lui est consacré, elle est explicitement décrite comme une chasseuse qui porte son arc et ses flèches.",
    "Son arc représente donc une puissance maîtrisée : la chasse n'est pas un geste désordonné, mais une concentration de l'attention sur une cible.",
    "L'arc est devenu un symbole de volonté, d'intention, de concentration, de maîtrise de soi et de désir dirigé vers un objectif.",
    "L'arc est particulièrement associé à Artémis, mais également à Apollon — et, dans le Tarot, à Éros : trois façons différentes de viser juste.",
  ]},
  "torches":{icon:"🔥",label:"Torches",category:"Mythologie",desc:"Attribut d'Hécate : illumination, guidance dans l'obscurité sans jamais imposer le chemin.",links:["hécate"],lore:[
    "Lorsque Perséphone disparaît, Déméter parcourt le monde à sa recherche pendant neuf jours. Hécate, qui a entendu les cris de Perséphone, rejoint ensuite Déméter avec des torches enflammées pour l'aider à découvrir ce qui s'est passé.",
    "La torche devient ainsi la lumière qui permet de traverser la nuit et de retrouver ce qui a été perdu.",
    "Hécate conserve ensuite cette fonction de déesse porteuse de torches, liée aux chemins nocturnes, aux seuils et au monde souterrain.",
    "Les torches sont donc devenues un symbole de lumière, de connaissance, de révélation, de guidance et de recherche de la vérité.",
    "Les torches sont particulièrement associées à Hécate et, dans le mythe de Perséphone, à Déméter.",
  ]},
  "lion":{icon:"🦁",label:"Lion",category:"Mythologie",desc:"Lié à Héraclès : courage, force domptée sans violence gratuite.",links:["héraclès"],lore:[
    "Le lion est lié à Héraclès à travers son premier grand exploit : le lion de Némée.",
    "Cette créature monstrueuse ravageait la région de Némée et possédait une peau que les armes ordinaires ne pouvaient transpercer. Héraclès dut finalement l'affronter à mains nues et l'étouffa.",
    "Après avoir vaincu le lion, il utilisa ses propres griffes pour découper sa peau, qu'il porta ensuite comme une armure. La dépouille du monstre devint ainsi le signe visible de sa force et de son triomphe.",
    "Le lion est devenu un symbole de courage, de puissance, de force, de victoire et de dépassement de l'impossible.",
    "Le lion est particulièrement associé à Héraclès.",
  ]},
  "vigne":{icon:"🍇",label:"Vigne",category:"Mythologie",desc:"Attribut de Dionysos : plaisir, transformation, abondance instinctive.",links:["dionysos"],lore:[
    "La vigne est indissociable de Dionysos, dieu du vin, de l'ivresse, de la fête, mais aussi de la transformation et de l'extase.",
    "Dans les mythes, Dionysos voyage avec son cortège de satyres, de ménades et de divinités liées à la nature sauvage. La vigne et le vin deviennent les moyens par lesquels l'être humain quitte momentanément son état ordinaire et entre dans un autre état de conscience.",
    "La vigne porte également l'idée de cycle : elle pousse, fleurit, produit ses grappes, puis perd ses feuilles avant de renaître au printemps. Elle rassemble donc la fécondité de la terre et la transformation.",
    "Elle est devenue un symbole de plaisir, d'abondance, de transformation, d'extase, de fête et de vitalité.",
    "La vigne est particulièrement associée à Dionysos.",
  ]},
  "grenade":{icon:"🔴",label:"Grenade",category:"Mythologie",desc:"Le fruit aux innombrables graines : fertilité, abondance, cycle, attachement, ce qui relie au monde souterrain — associée à Perséphone et Hadès.",links:["perséphone","hadès"],lore:[
    "Lorsque Perséphone fut enlevée par Hadès et conduite aux Enfers, elle y mangea quelques grains de grenade. Dans la mythologie grecque, manger la nourriture des morts crée un lien avec le monde souterrain. Perséphone ne pouvait donc plus simplement quitter les Enfers pour toujours.",
    "Elle fut finalement autorisée à retourner auprès de sa mère Déméter pendant une partie de l'année, mais devait revenir auprès d'Hadès pour l'autre partie. Son départ vers les Enfers correspond à l'automne, tandis que son retour sur terre accompagne le renouveau du printemps.",
    "La grenade est particulièrement associée à Perséphone.",
  ]},
  "épis":{icon:"🌾",label:"Épis de blé",category:"Mythologie",desc:"Attribut de Déméter : récolte, travail, nourriture, cycle des saisons.",links:["déméter"],lore:[
    "Le blé est avant tout associé à Déméter, déesse de l'agriculture et des récoltes.",
    "Lorsque Perséphone fut enlevée par Hadès, Déméter, accablée de chagrin, parcourut le monde à sa recherche et cessa de faire pousser les plantes. La terre devint stérile et les récoltes disparurent.",
    "Lorsque Perséphone put finalement revenir auprès d'elle, la terre recommença à produire. Le cycle de Perséphone expliquait ainsi symboliquement l'alternance des saisons et le retour des récoltes.",
    "L'épi de blé représente donc ce qui nourrit les hommes mais aussi ce qui doit être semé, mourir, puis renaître pour produire une nouvelle récolte.",
    "Il est devenu un symbole de récolte, de nourriture, de travail, de fécondité, de cycle et d'abondance.",
    "Le blé et l'épi sont particulièrement associés à Déméter.",
  ]},
  "char solaire":{icon:"☀",label:"Char solaire",category:"Mythologie",desc:"Attribut d'Hélios (et repris par Apollon) : clarté, trajectoire réglée, rien ne peut rester caché sous cette lumière.",links:["hélios","apollon"],lore:[
    "Le char est un objet majeur de la mythologie grecque parce qu'il permet aux dieux de parcourir le ciel.",
    "Le char d'Hélios traverse chaque jour le ciel et fait apparaître le soleil. Celui d'Apollon sera également associé au parcours solaire dans les traditions plus tardives.",
    "Le char représente donc une force qui possède une direction et que le conducteur doit être capable de maîtriser.",
    "Il est devenu un symbole de direction, de maîtrise, de progression, de mouvement et de conquête d'un chemin.",
  ]},
  "arc-en-ciel":{icon:"🌈",label:"Arc-en-ciel",category:"Mythologie",desc:"Attribut d'Iris : médiation, passage, réconciliation entre deux états.",links:["iris"],lore:[
    "L'arc-en-ciel est le corps même d'Iris, déesse messagère qui relie l'Olympe à la terre et à la mer en empruntant ce pont de couleurs.",
    "Iris tient un rôle proche de celui d'Hermès, mais tourné vers les dieux plutôt que vers les hommes : elle porte leurs messages et, selon certaines traditions, va puiser l'eau sacrée du Styx sur laquelle les dieux prêtent leurs serments les plus solennels.",
    "Apparaître après l'orage, relier le ciel et la terre en un instant fragile : l'arc-en-ciel condense en une image la fonction même d'Iris, messagère et médiatrice.",
    "Il est devenu un symbole de médiation, de passage et de réconciliation entre deux états qui semblaient incompatibles.",
    "L'arc-en-ciel est particulièrement associé à Iris.",
  ]},
  "flûte":{icon:"🎶",label:"Flûte",category:"Mythologie",desc:"Attribut de Pan : instinct non policé par la raison, appel de la nature brute.",links:["pan"],lore:[
    "La flûte de Pan, ou syrinx, naît d'une histoire de fuite et de métamorphose.",
    "Pan, dieu à moitié bouc, poursuivait de son désir la nymphe Syrinx. Pour lui échapper, elle se réfugia au bord d'un fleuve et fut changée en roseaux au moment même où Pan croyait enfin la saisir. Ne serrant dans ses bras que des tiges creuses, il en assembla plusieurs de longueurs différentes pour en tirer un instrument — et lui donna le nom de la nymphe.",
    "La flûte de Pan porte ainsi la trace d'un désir qui n'a pas obtenu ce qu'il cherchait, mais qui en a fait naître autre chose : une musique instinctive, non policée par la raison, à l'image du dieu qui la joue.",
    "Elle est devenue un symbole d'instinct, d'appel de la nature brute et de désir transformé plutôt qu'assouvi.",
    "La flûte est particulièrement associée à Pan.",
  ]},
  "balance":{icon:"⚖",label:"Balance",category:"Mythologie",desc:"Attribut de Thémis (et de Minos au Jugement) : équilibre, justice, mesure exacte avant toute décision.",links:["thémis","minos"],lore:[
    "La balance représente ce qui doit être pesé et comparé avant qu'un jugement soit rendu.",
    "Cette idée existe déjà dans la mythologie grecque : Zeus est représenté pesant le destin des guerriers sur une balance, notamment dans les scènes de psychostasie, où le sort des combattants est mis en balance.",
    "La justice apparaît ainsi comme une force qui ne choisit pas selon les émotions, mais qui mesure et attribue à chacun ce qui lui revient.",
    "La balance est donc devenue un symbole de justice, d'équilibre, de mesure, de jugement et d'impartialité.",
    "Elle peut être associée à Thémis et à Dikè, personnifications de l'ordre divin et de la justice.",
  ]},
  "ailes":{icon:"🕊",label:"Ailes",category:"Mythologie",desc:"Selon le contexte : Niké (victoire), Hermès (rapidité, message) ou Éros (désir qui s'envole). Toujours un mouvement qui échappe à la pesanteur ordinaire.",links:["hermès","éros"],lore:[
    "Les ailes, dans la mythologie grecque, distinguent ceux qui échappent à la pesanteur ordinaire du monde.",
    "Hermès porte des sandales ailées qui lui permettent de voyager entre l'Olympe, le monde des hommes et celui des morts à une vitesse que rien ne peut freiner. Éros, lui, est représenté avec des ailes qui traduisent la rapidité et l'imprévisibilité du désir amoureux, qui se pose où il veut sans qu'on puisse le retenir. Niké, déesse de la victoire, vole vers celui ou celle qu'elle choisit de couronner, et sa venue ne se commande pas.",
    "Trois figures, trois façons d'échapper au sol : le message, le désir, la victoire — chacun a ses propres ailes.",
    "Elles sont devenues un symbole de mouvement qui échappe à la pesanteur ordinaire, de rapidité et de ce qui ne peut être ni retenu ni forcé.",
    "Les ailes sont particulièrement associées à Hermès et à Éros.",
  ]},

  // Objets classiques du Tarot
  "bâton":{icon:"🪄",label:"Bâton",category:"Objets",desc:"Enseigne liée au feu : volonté, énergie, croissance par l'action.",links:[],lore:[
    "Le bâton est avant tout un objet de mouvement et d'action. Dans les représentations anciennes, il peut être le bâton du voyageur, du berger, du pèlerin ou de celui qui avance à travers le monde.",
    "Il est l'emblème de l'énergie qui pousse à agir.",
    "Il évoque aussi directement la branche vivante : quelque chose qui pousse à partir de la terre et qui cherche la lumière.",
    "Le bâton représente donc la volonté, l'énergie, l'action, l'ambition, la croissance, la créativité et la force vitale.",
  ]},
  "coupe":{icon:"🍷",label:"Coupe",category:"Objets",desc:"Enseigne liée à l'eau : émotion, réceptivité, relation qui se reçoit et se partage.",links:[],lore:[
    "La coupe est un récipient : elle reçoit, contient et conserve.",
    "C'est précisément ce qui explique sa symbolique dans le Tarot. Là où le bâton agit vers l'extérieur, la coupe accueille ce qui vient de l'extérieur. Elle devient donc l'image de l'univers intérieur : émotions, sentiments, intuition, imagination et relations.",
    "La coupe évoque également les récipients sacrés utilisés dans les cultes antiques pour contenir le vin, l'eau, le lait ou les offrandes faites aux dieux.",
    "La coupe est un symbole de l'émotion, de la réceptivité, de l'intuition, de l'amour, de la relation, de l'offrande et de ce que l'on porte intérieurement.",
  ]},
  "épée":{icon:"⚔",label:"Épée",category:"Objets",desc:"Enseigne liée à l'air : pensée, décision, conflit — et la vérité qui en découle.",links:[],lore:[
    "L'épée est l'arme qui tranche.",
    "Cette caractéristique physique explique une grande partie de sa symbolique : elle sépare, coupe, distingue et met fin à ce qui doit être terminé.",
    "Mais l'épée est également une arme associée au pouvoir et à l'autorité. Elle peut protéger la justice, défendre une cause ou imposer une décision.",
    "Dans les traditions symboliques européennes, l'épée est donc devenue associée à l'intelligence capable de distinguer le vrai du faux, mais aussi au conflit qui naît lorsque deux volontés s'opposent.",
    "Sa lame droite évoque également une pensée qui va directement à l'essentiel.",
    "L'épée est ainsi devenue un symbole de pensée, de vérité, de discernement, de décision, de justice, de conflit, de rupture et de pouvoir : l'esprit qui tranche et révèle ce qui est vrai.",
  ]},
  "denier":{icon:"🪙",label:"Denier",category:"Objets",desc:"Enseigne liée à la terre : matière, travail, ressource, valeur concrète.",links:[],lore:[
    "Le denier est une pièce de monnaie. C'est le seul des quatre emblèmes du Tarot qui représente directement quelque chose de matériel et de tangible.",
    "La monnaie représente ce qui possède une valeur mesurable : richesse, ressources, travail, échange et possession.",
    "Mais dans le Tarot, le denier ne se limite pas à l'argent. Il représente plus largement le monde concret : le corps, la matière, la maison, le travail, les ressources et tout ce que l'on construit dans le monde réel.",
    "Sa forme ronde peut également évoquer le cycle, la terre, le soleil et ce qui se matérialise.",
    "Le denier est ainsi devenu un symbole de matière, de richesse, de travail, de ressources, de sécurité, de prospérité, de corps et d'ancrage : ce qui prend forme dans la matière.",
  ]},

  // Objets mythologiques
  "couronne":{icon:"👑",label:"Couronne",category:"Objets mythologiques",desc:"Autorité légitime, accomplissement, souveraineté assumée avec dignité.",links:["héra","apollon"],lore:[
    "La couronne est l'objet qui rend visible le rang de celui ou celle qui la porte. Dans la mythologie grecque, les dieux souverains sont représentés avec des attributs qui manifestent leur autorité, et les couronnes végétales servent également à distinguer les vainqueurs, les héros et ceux qui ont reçu une reconnaissance divine.",
    "Héra, reine de l'Olympe, porte la sienne comme signe visible d'une souveraineté qui ne se discute pas — une autorité de naissance, non conquise (voir la fiche « Héra »).",
    "La couronne de laurier d'Apollon, elle, se mérite : elle devient le signe d'une victoire et d'un accomplissement après la transformation de Daphné en laurier.",
    "La couronne réunit donc deux idées : celui qui règne de droit et celui qui a accompli quelque chose qui mérite d'être reconnu.",
    "Elle est devenue un symbole de souveraineté, d'autorité, de victoire, d'accomplissement et de reconnaissance.",
    "La couronne est particulièrement associée à Héra et à Apollon — deux légitimités différentes, l'une de rang, l'autre de mérite.",
  ]},
  "sceptre":{icon:"🔱",label:"Sceptre",category:"Objets mythologiques",desc:"Pouvoir stable, commandement exercé avec constance plutôt qu'imposé par la force.",links:["zeus","héra"],lore:[
    "Le sceptre est le signe du pouvoir exercé par celui qui gouverne.",
    "Dans les récits homériques, Zeus tient le sceptre comme signe de sa souveraineté sur les dieux et les hommes. Le sceptre n'est donc pas seulement une arme : il représente l'autorité légitime et le droit de commander.",
    "Héra, reine de l'Olympe, porte elle aussi un sceptre — signe d'une autorité qui n'a besoin d'aucune démonstration de force pour s'imposer, à la différence de celle, plus spectaculaire, de Zeus (voir la fiche « Héra »).",
    "Il est également utilisé par les rois et les magistrats comme marque de leur fonction.",
    "Le sceptre est ainsi devenu un symbole de pouvoir, de commandement, d'autorité, de gouvernement et de responsabilité.",
    "Le sceptre est particulièrement associé à Zeus et à Héra, ainsi qu'aux figures souveraines en général.",
  ]},
  "clé":{icon:"🗝",label:"Clé",category:"Objets mythologiques",desc:"Accès, connaissance réservée, passage qui ne s'ouvre qu'à qui sait où chercher.",links:[],lore:[
    "La clé est littéralement ce qui permet de franchir une porte normalement fermée.",
    "Dans les traditions liées à Hécate, celle-ci est appelée « porteuse des clés » et Kleidouchos, « celle qui tient les clés ». Elle règne sur les carrefours, les seuils et les frontières entre différents espaces.",
    "La clé devient alors l'objet qui permet d'accéder à ce qui était caché.",
    "Elle est devenue un symbole de passage, d'accès, de connaissance secrète, de pouvoir sur les seuils et d'ouverture vers un autre monde.",
    "La clé est particulièrement associée à Hécate.",
  ]},
  "lanterne":{icon:"🏮",label:"Lanterne",category:"Objets mythologiques",desc:"Recherche, lumière intérieure portée dans l'obscurité plutôt que réponse immédiate.",links:["déméter"],lore:[
    "La lanterne est plus tardive que la torche et ne possède pas, dans la mythologie grecque, un récit fondateur comparable au trident de Poséidon ou à la foudre de Zeus.",
    "Mais sa symbolique découle directement de l'idée ancienne de la lumière portée dans l'obscurité.",
    "Elle peut être reliée à Hécate et à sa fonction de guide nocturne : la déesse porte des torches lorsqu'elle accompagne Déméter dans sa recherche de Perséphone.",
    "La lanterne représente donc une lumière plus intime que la foudre : elle n'éclaire pas le monde entier, elle permet simplement de continuer à avancer lorsque l'on ne voit plus son chemin.",
    "Elle est devenue un symbole de recherche, de lumière intérieure, d'espoir, d'orientation et de découverte de ce qui était caché.",
  ]},
  "torche":{icon:"🔦",label:"Torche",category:"Objets mythologiques",desc:"Illumination, connaissance transmise, guidance dans l'incertitude.",links:["hécate"],lore:[
    "Lorsque Perséphone disparaît, Déméter parcourt le monde à sa recherche pendant neuf jours. Hécate, qui a entendu les cris de Perséphone, rejoint ensuite Déméter avec des torches enflammées pour l'aider à découvrir ce qui s'est passé.",
    "La torche devient ainsi la lumière qui permet de traverser la nuit et de retrouver ce qui a été perdu.",
    "Hécate conserve ensuite cette fonction de déesse porteuse de torches, liée aux chemins nocturnes, aux seuils et au monde souterrain.",
    "La torche est donc devenue un symbole de lumière, de connaissance, de révélation, de guidance et de recherche de la vérité.",
    "La torche est particulièrement associée à Hécate et, dans le mythe de Perséphone, à Déméter.",
  ]},
  "flèche":{icon:"🎯",label:"Flèche",category:"Objets mythologiques",desc:"Direction précise, volonté qui vise, conséquence qui suit le tir.",links:["éros"],lore:[
    "La flèche prolonge l'intention de l'archer : une fois tirée, elle ne peut plus revenir en arrière.",
    "Elle possède donc une symbolique différente de l'arc. L'arc représente la préparation et la tension ; la flèche représente le moment où l'intention devient action.",
    "Chez Artémis et Apollon, les flèches peuvent donner la mort à distance. Chez Éros, elles prennent une dimension différente : elles atteignent directement le cœur et provoquent l'amour ou le désir.",
    "La flèche est ainsi devenue un symbole de direction, de volonté, d'action, de conséquence, de désir et d'atteinte d'un objectif.",
    "La flèche peut être associée à Artémis, Apollon et Éros selon le contexte.",
  ]},
  "miroir":{icon:"🪞",label:"Miroir",category:"Objets mythologiques",desc:"Introspection, vérité renvoyée, perception de soi parfois inconfortable.",links:[],lore:[
    "Le miroir est naturellement associé à Aphrodite parce qu'il renvoie à la beauté et à la perception de son propre visage.",
    "Dans l'imaginaire mythologique, Aphrodite est la déesse dont la beauté peut provoquer le désir, la rivalité et même la guerre. Le miroir devient alors l'objet qui permet de contempler cette beauté mais aussi de prendre conscience de l'image que l'on renvoie aux autres.",
    "Il possède donc une double dimension : il montre ce qui est visible, mais il peut également révéler notre rapport à nous-mêmes.",
    "Le miroir est devenu un symbole de beauté, de perception, d'introspection, d'identité, de désir et de connaissance de soi.",
    "Le miroir est particulièrement associé à Aphrodite.",
  ]},
  "voile":{icon:"🧣",label:"Voile",category:"Objets mythologiques",desc:"Secret, connaissance cachée, frontière entre ce qui se montre et ce qui se protège.",links:["métis"],lore:[
    "Le voile possède une symbolique particulièrement forte dans les rites grecs, notamment autour des femmes, du mariage et des mystères religieux.",
    "Couvrir le visage ou le corps signifie cacher quelque chose au regard ordinaire. Le voile crée donc une frontière entre ce qui peut être vu et ce qui doit rester secret.",
    "Cette symbolique convient particulièrement aux divinités et aux rites liés aux mystères : le sacré n'est pas entièrement accessible au regard profane.",
    "Le voile peut également représenter le passage d'un état à un autre, notamment dans le mariage, où la jeune femme change de statut.",
    "Dans le Tarot, ce voile est celui de la Papesse, associée à Métis : un savoir qui ne s'expose pas mais agit depuis l'intérieur, retenu derrière un voile plutôt qu'imposé au regard (voir la fiche « Métis »).",
    "Il est ainsi devenu un symbole de secret, de connaissance cachée, de mystère, de frontière, de transformation et de passage — ce qui existe derrière le monde visible mais qui n'est pas encore révélé.",
  ]},
  "chaîne":{icon:"⛓",label:"Chaîne",category:"Objets mythologiques",desc:"Attachement, dépendance, lien — la question est toujours de savoir s'il enferme ou s'il peut être dénoué.",links:["pan","prométhée"],lore:[
    "La chaîne la plus célèbre de la mythologie grecque est celle qui retint Prométhée sur un rocher du Caucase, en punition d'avoir donné le feu aux hommes contre la volonté de Zeus.",
    "Chaque jour, un aigle venait dévorer son foie, qui repoussait chaque nuit, prolongeant son supplice sans fin — jusqu'à ce que Chiron accepte de mourir à sa place et qu'Héraclès mette fin à son calvaire (voir la fiche « Prométhée »).",
    "La chaîne de Prométhée dit quelque chose de plus large que la simple punition : elle montre qu'un don fait sans autorisation a toujours un prix, et que l'attachement qui en résulte peut aussi bien enfermer que devenir, avec le temps, la preuve de ce qu'on a osé offrir.",
    "Dans le Tarot, la chaîne est aussi l'attribut du Diable, associé à Pan : elle n'y figure plus une punition méritée mais un attachement à l'instinct, moins imposé de l'extérieur qu'accepté de l'intérieur (voir la fiche « Pan »).",
    "Elle est devenue un symbole d'attachement, de dépendance et de lien — la question étant toujours de savoir s'il enferme ou s'il peut être dénoué.",
    "La chaîne est particulièrement associée à Prométhée et à Pan — deux attachements de nature très différente.",
  ]},
  "roue":{icon:"☸",label:"Roue",category:"Objets mythologiques",desc:"Cycle, changement, destin qui tourne sans considération pour le mérite.",links:["tyché"],lore:[
    "La roue est l'attribut de Tyché, déesse du hasard et de la fortune, souvent représentée les yeux bandés, un gouvernail à la main pour rappeler qu'elle dirige le destin des hommes sans qu'ils puissent l'influencer.",
    "Sa roue tourne sans considération pour le mérite : elle peut élever un inconnu au sommet ou faire chuter un roi, dans un mouvement que ni la vertu ni la faute ne peuvent arrêter.",
    "Contrairement à une punition ou une récompense méritée, ce que fait tourner la roue de Tyché échappe à toute logique morale — c'est précisément ce qui en fait un symbole aussi redouté que fascinant.",
    "Elle est devenue un symbole de cycle, de changement et de destin qui tourne sans considération pour le mérite.",
    "La roue est particulièrement associée à Tyché.",
  ]},
  "char":{icon:"🏇",label:"Char",category:"Objets mythologiques",desc:"Direction, maîtrise, progression réglée vers un but choisi.",links:["apollon","hélios"],lore:[
    "Le char est un objet majeur de la mythologie grecque parce qu'il permet aux dieux de parcourir le ciel.",
    "Le char d'Hélios traverse chaque jour le ciel et fait apparaître le soleil. Celui d'Apollon sera également associé au parcours solaire dans les traditions plus tardives.",
    "Le char représente donc une force qui possède une direction et que le conducteur doit être capable de maîtriser.",
    "Il est devenu un symbole de direction, de maîtrise, de progression, de mouvement et de conquête d'un chemin.",
  ]},

  // Animaux
  "aigle":{icon:"🦅",label:"Aigle",category:"Animaux",desc:"Hauteur de vue, pouvoir, vision d'ensemble — lié à Zeus.",links:["zeus"],lore:[
    "L'aigle est l'oiseau de Zeus et l'un de ses attributs les plus reconnaissables. Dans les récits mythologiques, Zeus peut lui-même prendre la forme d'un aigle, notamment lorsqu'il enlève Ganymède pour l'amener auprès des dieux.",
    "L'aigle est aussi celui qui s'élève plus haut que les autres oiseaux et qui semble pouvoir regarder le monde depuis les hauteurs du ciel. Il devient ainsi l'image parfaite de Zeus, maître de l'Olympe et dieu du ciel.",
    "Dans une autre tradition, l'aigle apparaît comme un signe favorable envoyé par Zeus. Il peut alors être interprété comme un messager venu du ciel.",
    "L'aigle est donc devenu un symbole de pouvoir, de souveraineté, de hauteur, de vision, de force et de message divin.",
    "L'aigle est particulièrement associé à Zeus.",
  ]},
  "serpent":{icon:"🐍",label:"Serpent",category:"Animaux",desc:"Transformation, connaissance, guérison, lien avec le monde souterrain.",links:[],lore:[
    "Le serpent possède une symbolique beaucoup plus ancienne et plus complexe que celle d'un simple animal associé au mal.",
    "Il change de peau et semble ainsi mourir puis renaître. Cette capacité a nourri son association avec la transformation et le renouvellement.",
    "Il vit également dans les fissures du sol, les grottes et les lieux cachés. Il appartient donc symboliquement à ce qui se trouve sous la surface : la terre, les profondeurs et le monde souterrain.",
    "Le serpent est aussi associé à Asclépios, dieu de la médecine. Son image enroulée autour du bâton du dieu est devenue un symbole de guérison.",
    "Enfin, dans de nombreux mythes grecs, les serpents gardent des lieux ou des secrets : ils deviennent ainsi des créatures placées entre le monde visible et ce qui est caché.",
    "Le serpent est donc devenu un symbole de transformation, de guérison, de connaissance cachée, de régénération et du monde souterrain.",
    "Le serpent est associé à plusieurs divinités, notamment Asclépios, Athéna, Apollon et les puissances chthoniennes.",
  ]},
  "chien":{icon:"🐕",label:"Chien",category:"Animaux",desc:"Gardien des seuils, protection, instinct fidèle — lié à Hécate.",links:["hécate"],lore:[
    "Le chien est particulièrement lié à Hécate.",
    "Hécate est une déesse des carrefours, de la nuit, de la magie et du monde des morts. Dans les récits antiques, son arrivée est annoncée par les aboiements des chiens et elle est accompagnée de chiens infernaux.",
    "Un récit raconte également qu'Hécube, reine de Troie, fut transformée en chienne après la chute de Troie et devint ensuite la compagne d'Hécate.",
    "Le chien garde ainsi les frontières : il veille sur la maison, sur les chemins, sur les portes et, dans l'imaginaire d'Hécate, sur la frontière entre les vivants et les morts.",
    "Il est devenu un symbole de protection, de vigilance, d'instinct, de seuil et de passage entre les mondes.",
    "Le chien est particulièrement associé à Hécate.",
  ]},
  "cheval":{icon:"🐎",label:"Cheval",category:"Animaux",desc:"Mouvement, liberté, puissance mise en marche.",links:[],lore:[
    "Le cheval est avant tout lié à Poséidon.",
    "Lorsque les dieux se disputèrent la protection d'Athènes, Poséidon fit apparaître un cheval dans certaines traditions du mythe. Il devint ensuite le dieu des chevaux autant que celui de la mer et des tremblements de terre.",
    "Le cheval représente une force difficile à contenir : il court, franchit les distances et transporte l'être humain au-delà de ses propres limites.",
    "Dans la mythologie grecque, les chevaux divins peuvent également tirer les chars des dieux et parcourir le ciel, la mer ou les domaines surnaturels.",
    "Le cheval est donc devenu un symbole de mouvement, de liberté, de puissance, de vitesse et de force indomptée.",
    "Le cheval est particulièrement associé à Poséidon.",
  ]},
  "pégase":{icon:"🦄",label:"Pégase",category:"Animaux",desc:"Inspiration, élévation, maîtrise d'une force extraordinaire — monture de Bellérophon.",links:["bellérophon"],lore:[
    "Pégase naît du sang de Méduse lorsqu'elle est décapitée par Persée.",
    "Créature extraordinaire, cheval ailé capable de s'élever dans le ciel, il devient ensuite le compagnon du héros Bellérophon, qui tente de le maîtriser pour combattre la Chimère.",
    "Pégase représente donc quelque chose de plus subtil que le simple cheval : c'est la force qui s'élève au-dessus de la matière.",
    "Dans la tradition ultérieure, il est également associé aux Muses et à la source Hippocrène, ce qui renforce son association avec l'inspiration poétique.",
    "Pégase est ainsi devenu un symbole de l'inspiration, de l'imagination, de l'élévation, de la liberté et de la maîtrise d'une force exceptionnelle.",
    "Pégase est particulièrement associé à Bellérophon et, dans les traditions ultérieures, aux Muses.",
  ]},
  "dauphin":{icon:"🐬",label:"Dauphin",category:"Animaux",desc:"Guidance, mer, protection pendant la traversée.",links:[],lore:[
    "Le dauphin appartient au monde de Poséidon et de la mer.",
    "Dans un célèbre récit, Poséidon cherchait Amphitrite, qui s'était enfuie. Un dauphin la retrouva et la conduisit auprès du dieu. Pour le remercier, Poséidon plaça ensuite le dauphin dans le ciel sous la forme de la constellation Delphinus.",
    "Le dauphin apparaît aussi dans plusieurs récits comme un animal qui vient au secours des hommes et les guide à travers la mer.",
    "Il est donc devenu un symbole de guidance, de navigation, de protection, de mer et d'intervention bienveillante du monde marin.",
    "Le dauphin est particulièrement associé à Poséidon, mais également à Apollon dans certains mythes.",
  ]},
  "colombe":{icon:"🕊",label:"Colombe",category:"Animaux",desc:"Amour, paix — liée à Aphrodite.",links:["aphrodite"],lore:[
    "La colombe est l'un des oiseaux d'Aphrodite.",
    "Elle représente l'amour doux et l'attachement amoureux. Contrairement aux animaux puissants ou menaçants, elle évoque quelque chose de tendre, intime et pacifique.",
    "Son association avec Aphrodite s'est renforcée par sa présence dans l'iconographie de la déesse et dans la symbolique amoureuse antique.",
    "Elle est ainsi devenue un symbole de l'amour, de la tendresse, de la paix, de l'union et de la beauté.",
    "La colombe est particulièrement associée à Aphrodite.",
  ]},
  "corbeau":{icon:"🐦‍⬛",label:"Corbeau",category:"Animaux",desc:"Présage, connaissance du monde invisible.",links:[],lore:[
    "Le corbeau est particulièrement lié à Apollon et à la divination.",
    "Dans un récit, Apollon envoie un corbeau chercher de l'eau pour accomplir un sacrifice. Mais l'oiseau s'attarde auprès d'un figuier, mange les figues et revient trop tard. Pour se justifier, il accuse un serpent d'avoir empêché sa mission.",
    "Apollon comprend le mensonge et punit le corbeau. Il aurait alors noirci son plumage et placé le corbeau, le serpent et la coupe dans le ciel sous forme de constellations.",
    "Cette histoire explique mythiquement certaines caractéristiques de l'oiseau tout en renforçant son association avec les présages et le savoir caché.",
    "Le corbeau est donc devenu un symbole de présage, de connaissance, d'observation, de vérité cachée et du monde invisible.",
    "Le corbeau est particulièrement associé à Apollon.",
  ]},
  "abeille":{icon:"🐝",label:"Abeille",category:"Animaux",desc:"Travail, organisation collective, abondance construite patiemment.",links:[],lore:[
    "L'abeille possède une symbolique ancienne liée au travail, à l'organisation et à l'abondance.",
    "Dans la mythologie grecque, les abeilles apparaissent notamment dans les traditions liées à Dionysos et à certaines figures de prêtresses et de nymphes. Le miel était également une offrande précieuse aux divinités.",
    "L'abeille forme une société organisée où chaque individu participe à une œuvre collective. Elle transforme les fleurs en miel et rassemble ainsi les richesses dispersées de la nature.",
    "Elle est devenue une image de travail, d'organisation, de fécondité, d'abondance, de coopération et de transformation de la matière.",
    "L'abeille peut être associée à plusieurs traditions grecques, notamment à Dionysos et aux cultes initiatiques.",
  ]},
  "papillon":{icon:"🦋",label:"Papillon",category:"Animaux",desc:"Transformation, âme, métamorphose accomplie.",links:[],lore:[
    "Le papillon possède une association particulièrement forte avec Psyché.",
    "En grec ancien, psychê signifie à la fois « âme » et « souffle de vie ». Dans l'Antiquité, l'âme humaine pouvait être représentée sous la forme d'un papillon.",
    "Le mythe de Psyché raconte l'histoire d'une mortelle dont les épreuves la conduisent finalement à devenir immortelle et à rejoindre Éros parmi les dieux.",
    "La transformation du papillon — de la chenille enfermée dans sa chrysalide jusqu'à l'être ailé qui en sort — correspond parfaitement à cette idée : quelque chose change de forme pour accéder à une nouvelle existence.",
    "Le papillon est donc devenu un symbole de transformation, d'âme, de renaissance, d'évolution et de passage vers un nouvel état.",
    "Le papillon est particulièrement associé à Psyché.",
  ]},
  "cerf":{icon:"🦌",label:"Cerf",category:"Animaux",desc:"Nature, intuition, passage entre deux mondes.",links:[],lore:[
    "Le cerf est profondément lié à Artémis, déesse de la chasse, des forêts et des animaux sauvages.",
    "Dans plusieurs récits, les cerfs sont placés sous sa protection. Le plus célèbre est celui du cerf de Cérynie, une bête extraordinaire aux bois d'or et aux sabots d'airain qu'Héraclès doit capturer lors de son troisième travail. Mais le cerf apparaît également dans les récits qui rappellent le pouvoir d'Artémis sur la nature sauvage.",
    "Le mythe d'Actéon montre d'ailleurs l'autre aspect de cette relation : le chasseur surprend Artémis alors qu'elle se baigne. Furieuse, la déesse le transforme en cerf et ses propres chiens le dévorent sans le reconnaître.",
    "Le cerf devient ainsi une créature située à la frontière entre l'homme et la nature sauvage. Il représente une nature belle et libre, mais qui ne peut être possédée sans conséquences.",
    "Le cerf est devenu un symbole de nature sauvage, d'instinct, d'intuition, de vigilance, de sensibilité et de passage entre le monde humain et le monde naturel.",
    "Le cerf est particulièrement associé à Artémis.",
  ]},

  // Plantes & végétaux
  "laurier":{icon:"🌿",label:"Laurier",category:"Plantes",desc:"Victoire, gloire, accomplissement mérité après l'effort.",links:["apollon"],lore:[
    "Le laurier est intimement lié à Apollon. Selon le mythe, Apollon poursuivit la nymphe Daphné, dont il était tombé amoureux. Daphné, refusant ses avances, demanda à être sauvée et fut transformée en laurier par son père, le dieu-fleuve Pénée.",
    "Apollon, comprenant qu'il ne pourrait jamais l'avoir, déclara alors que le laurier lui serait désormais consacré. Il en porta une couronne et en fit un arbre sacré.",
    "Les Grecs offrirent ensuite des couronnes de laurier aux vainqueurs, aux poètes et à ceux qui avaient accompli de grandes choses. À Delphes, le laurier était également associé aux pratiques prophétiques d'Apollon.",
    "Le laurier est ainsi devenu un symbole de victoire, de gloire, d'accomplissement, de poésie, de prophétie et de reconnaissance.",
    "Le laurier est particulièrement associé à Apollon et à Daphné.",
  ]},
  "olivier":{icon:"🫒",label:"Olivier",category:"Plantes",desc:"Paix, sagesse, prospérité durable.",links:[],lore:[
    "L'olivier est lié à Athéna et à la naissance symbolique d'Athènes. Lorsque Poséidon et Athéna se disputèrent la protection de la cité, les deux divinités offrirent un présent aux habitants.",
    "Poséidon fit jaillir une source d'eau salée. Athéna planta quant à elle le premier olivier. Les habitants considérèrent ce cadeau comme plus précieux, car l'arbre pouvait leur donner de la nourriture, de l'huile, du bois et de la lumière.",
    "Athéna devint ainsi la protectrice de la cité, qui prit son nom : Athènes.",
    "L'olivier est devenu le symbole de la paix, de la sagesse, de la prospérité, de la civilisation et de la protection divine.",
    "L'olivier est particulièrement associé à Athéna.",
  ]},
  "blé":{icon:"🌾",label:"Blé",category:"Plantes",desc:"Récolte, travail, nourriture, cycle des saisons.",links:["déméter"],lore:[
    "Le blé est avant tout associé à Déméter, déesse de l'agriculture et des récoltes.",
    "Lorsque Perséphone fut enlevée par Hadès, Déméter, accablée de chagrin, parcourut le monde à sa recherche et cessa de faire pousser les plantes. La terre devint stérile et les récoltes disparurent.",
    "Lorsque Perséphone put finalement revenir auprès d'elle, la terre recommença à produire. Le cycle de Perséphone expliquait ainsi symboliquement l'alternance des saisons et le retour des récoltes.",
    "L'épi de blé représente donc ce qui nourrit les hommes mais aussi ce qui doit être semé, mourir, puis renaître pour produire une nouvelle récolte.",
    "Il est devenu un symbole de récolte, de nourriture, de travail, de fécondité, de cycle et d'abondance.",
    "Le blé et l'épi sont particulièrement associés à Déméter.",
  ]},
  "cyprès":{icon:"🌲",label:"Cyprès",category:"Plantes",desc:"Mort, mémoire, passage — arbre funéraire qui reste vert toute l'année.",links:["hadès","apollon"],lore:[
    "Le cyprès possède une association très forte avec la mort et le monde funéraire dans l'Antiquité grecque : planté aux abords des tombeaux, son feuillage qui ne tombe jamais en fit l'arbre de la permanence du deuil, dressé à la frontière entre le monde des vivants et celui d'Hadès (voir la fiche « Enfer / monde souterrain »).",
    "Un des récits les plus célèbres est celui de Cyparisse, un jeune homme aimé d'Apollon. Il possédait un cerf qu'il aimait profondément. Après avoir tué accidentellement l'animal, Cyparisse fut inconsolable et demanda à pouvoir pleurer éternellement.",
    "Apollon le transforma alors en cyprès.",
    "Le cyprès devint ainsi l'arbre du deuil et du souvenir. Son feuillage persistant et sa silhouette qui s'élève vers le ciel renforcèrent encore cette association avec la mort, la mémoire et le passage vers l'au-delà.",
    "Le cyprès est devenu un symbole de mort, de deuil, de mémoire, de passage et de permanence du souvenir.",
    "Le cyprès est particulièrement associé à Hadès et au monde funéraire, ainsi qu'à Apollon à travers le mythe de Cyparisse.",
  ]},
  "rose":{icon:"🌹",label:"Rose",category:"Plantes",desc:"Amour, beauté, désir — et la vulnérabilité qui va avec.",links:["aphrodite"],lore:[
    "La rose est principalement associée à Aphrodite, déesse de l'amour et de la beauté.",
    "Dans certaines traditions mythologiques, les roses seraient apparues à travers les histoires liées à Aphrodite et à ceux qu'elle aimait. Leur beauté, leur parfum et leurs épines correspondent parfaitement à la double nature de l'amour : attirant et merveilleux, mais capable aussi de blesser.",
    "La couleur rouge a progressivement renforcé l'association entre la rose et le désir, le sang, la passion et l'amour charnel.",
    "La rose est donc devenue un symbole de l'amour, de la beauté, du désir, de la passion mais aussi de la vulnérabilité et de la douleur qui peuvent accompagner l'amour.",
    "La rose est particulièrement associée à Aphrodite.",
  ]},
  "myrte":{icon:"🌸",label:"Myrte",category:"Plantes",desc:"Amour, mariage — liée à Aphrodite.",links:["aphrodite"],lore:[
    "Le myrte est une plante sacrée d'Aphrodite.",
    "Selon une tradition, lorsqu'Aphrodite sortit de la mer, elle aurait cherché à dissimuler sa nudité derrière des branches de myrte. L'arbuste devint alors l'un de ses végétaux sacrés.",
    "Le myrte était également utilisé lors des mariages et des cérémonies liées à l'amour. Il représentait une union durable et la fécondité du couple.",
    "Il est ainsi devenu un symbole de l'amour, du mariage, de la beauté, de la fécondité et de l'union.",
    "Le myrte est particulièrement associé à Aphrodite.",
  ]},
  "lierre":{icon:"🍃",label:"Lierre",category:"Plantes",desc:"Attachement, immortalité — lié à Dionysos.",links:["dionysos"],lore:[
    "Le lierre est l'une des plantes les plus fortement liées à Dionysos.",
    "Contrairement à la vigne, qui disparaît pendant l'hiver avant de renaître, le lierre reste vert et continue de s'accrocher aux arbres et aux pierres. Cette résistance lui a donné une dimension d'immortalité et de permanence.",
    "Les cortèges de Dionysos sont souvent représentés avec du lierre, porté en couronne ou utilisé pour orner les thyrses et les objets rituels.",
    "Le lierre est ainsi devenu un symbole de Dionysos, de l'attachement, de la vitalité, de l'immortalité et de ce qui survit au passage du temps.",
    "Le lierre est particulièrement associé à Dionysos.",
  ]},
  "lotus":{icon:"🪷",label:"Lotus",category:"Plantes",desc:"Émergence, purification, renaissance depuis les eaux troubles.",links:[],lore:[
    "Le lotus possède une symbolique particulière parce qu'il pousse dans la boue et l'eau avant de faire apparaître une fleur à la surface.",
    "Dans l'imaginaire antique, cette capacité à émerger d'un milieu sombre pour s'ouvrir à la lumière pouvait évoquer la purification et la renaissance.",
    "Il faut toutefois être prudent avec l'association directe entre le lotus et une divinité grecque précise : le « lotus » des textes grecs ne correspond pas nécessairement à la fleur de lotus telle qu'on la représente aujourd'hui. Chez Homère, les Lotophages sont notamment un peuple dont la nourriture provoque l'oubli et le désir de ne plus retourner chez soi.",
    "Il peut ainsi représenter émergence, purification, renaissance, oubli et transformation.",
  ]},
  "pavot":{icon:"🌺",label:"Pavot",category:"Plantes",desc:"Sommeil, oubli, rêve — ce qui apaise mais peut aussi endormir la vigilance.",links:[],lore:[
    "Le pavot est lié à plusieurs divinités, notamment Déméter et Perséphone, et à l'univers du sommeil et de l'oubli.",
    "Ses propriétés soporifiques étaient connues dans l'Antiquité. La fleur pouvait donc symboliser le sommeil, l'apaisement et l'oubli.",
    "Dans le contexte du mythe de Déméter et de Perséphone, le pavot est également associé à la fertilité et aux mystères liés à la terre. Il peut ainsi relier le sommeil de l'être humain au repos de la nature avant son réveil.",
    "Le pavot est devenu un symbole de sommeil, d'oubli, de rêve, d'apaisement et de passage entre deux états.",
    "Le pavot peut être particulièrement associé à Déméter et Perséphone.",
  ]},
  "crocus":{icon:"🌼",label:"Fleur de crocus",category:"Plantes",desc:"Renouveau, printemps, transformation qui recommence.",links:[],lore:[
    "Le crocus est lié à une histoire de transformation particulièrement tragique.",
    "Selon le mythe, Crocos était un jeune homme associé à Hermès. Après sa mort accidentelle, il fut transformé en fleur. Dans certaines traditions, la fleur apparaît également dans les récits liés à Perséphone et à son retour saisonnier.",
    "Le crocus fleurit très tôt, parfois alors que l'hiver n'est pas encore totalement terminé. Il est donc naturellement devenu une image du retour de la vie après une période de froid et d'immobilité.",
    "Sa floraison précoce permet d'en faire un symbole de renouveau, de printemps, de transformation et de renaissance après une période sombre.",
    "Le crocus est particulièrement intéressant pour représenter la transformation : quelque chose meurt ou disparaît, puis réapparaît sous une autre forme.",
  ]},

  // Fruits & graines
  "raisin":{icon:"🍇",label:"Raisin",category:"Fruits & graines",desc:"Abondance, plaisir partagé, transformation par la fermentation.",links:["dionysos"],lore:[
    "Le raisin est le fruit de Dionysos. Il concentre tout ce que représente la vigne : abondance, plaisir et transformation.",
    "Le raisin fraîchement cueilli devient du vin après fermentation. Ce changement physique fascinait les anciens et correspond parfaitement à l'univers de Dionysos : quelque chose de naturel se transforme en une substance capable de modifier profondément l'état de celui qui la consomme.",
    "Le raisin symbolise donc l'abondance, le plaisir, la transformation, la fête et l'ivresse.",
    "Le raisin est particulièrement associé à Dionysos.",
  ]},
  "olive":{icon:"🫒",label:"Olive",category:"Fruits & graines",desc:"Le fruit concret du don d'Athéna : nourriture, huile, paix, prospérité.",links:["athéna"],lore:[
    "L'olive est le fruit de l'arbre offert par Athéna à la cité d'Athènes.",
    "Elle représente donc la partie concrète du don d'Athéna : une nourriture, une huile précieuse, une source de lumière et un produit essentiel à la vie quotidienne.",
    "Elle porte la symbolique de l'olivier mais de manière plus directement liée à la prospérité, à la nourriture, à la paix et aux bienfaits de la civilisation.",
    "L'olive est particulièrement associée à Athéna.",
  ]},
  "figue":{icon:"🫐",label:"Figue",category:"Fruits & graines",desc:"Fécondité douce, plaisir simple, maturité assumée.",links:[],lore:[
    "La figue était un fruit important dans le monde grec et était liée à la fertilité et à l'abondance.",
    "Son apparence est elle-même particulière : ce que nous appelons une « figue » est en réalité une structure remplie de nombreuses petites fleurs devenues fruits. Elle contient donc une multitude de graines cachées à l'intérieur.",
    "Cette richesse intérieure en a fait un fruit naturellement associé à la fécondité, à l'abondance et à la prospérité.",
    "La figue peut donc représenter fertilité, abondance, nourriture, richesse cachée et fécondité de la terre.",
  ]},
  "pomme":{icon:"🍎",label:"Pomme",category:"Fruits & graines",desc:"Beauté, désir et rivalité — le fruit du jugement de Pâris.",links:["aphrodite","héraclès"],lore:[
    "La pomme possède plusieurs associations mythologiques grecques.",
    "La plus célèbre est sans doute la pomme d'or offerte par Eris lors du mariage de Pélée et Thétis. La déesse de la Discorde lança la pomme portant l'inscription destinée « à la plus belle », ce qui déclencha la rivalité entre Héra, Athéna et Aphrodite et conduisit finalement au jugement de Pâris.",
    "La pomme devient alors le fruit de la beauté, du désir, de la rivalité et du choix.",
    "Les pommes d'or du jardin des Hespérides sont également liées à Héraclès et à l'immortalité.",
    "La pomme peut donc représenter beauté, désir, tentation, rivalité, choix et immortalité.",
  ]},
  "noix":{icon:"🌰",label:"Noix",category:"Fruits & graines",desc:"Ce qui reste protégé, caché, réservé à qui sait ouvrir la coque.",links:[],lore:[
    "La noix est particulièrement intéressante parce qu'elle possède une coque dure qui protège une nourriture cachée à l'intérieur.",
    "Dans le symbolisme antique, cette structure pouvait naturellement évoquer ce qui est dissimulé, protégé ou réservé à celui qui sait ouvrir la coque.",
    "Contrairement à la grenade ou au laurier, elle n'est pas rattachée à un grand mythe grec unique : elle reste avant tout un symbole naturel et initiatique, celui de ce qui se mérite d'être découvert.",
  ]},
  "graine":{icon:"🌱",label:"Graine",category:"Fruits & graines",desc:"Potentiel pur, ce qui n'a pas encore germé mais porte déjà toute la forme à venir.",links:[],lore:[
    "Elle semble morte lorsqu'elle est enfouie dans la terre. Pourtant, elle contient déjà la possibilité d'une nouvelle plante. Elle disparaît donc temporairement pour réapparaître sous une autre forme.",
    "Cette idée rejoint parfaitement les grands cycles de la mythologie grecque : Perséphone descend sous la terre puis revient, les champs meurent en hiver puis renaissent au printemps, et la terre recommence chaque année son œuvre.",
    "La graine peut ainsi représenter le potentiel, le commencement, la gestation, la transformation, la mort apparente et la renaissance.",
  ]},

  // Éléments
  "feu":{icon:"🔥",label:"Feu",category:"Éléments",desc:"Flamme, étincelle, soleil, fumée : action, volonté, élan.",links:[],lore:[
    "Le feu occupe une place unique dans la mythologie grecque : c'est le seul élément que les dieux ont d'abord refusé aux hommes.",
    "Prométhée le déroba à l'Olympe, caché dans une tige de fenouil, pour l'offrir à l'humanité — un geste qui lui valut d'être enchaîné pour l'éternité (voir la fiche « Chaîne »). Le feu devint ainsi le premier outil véritablement humain, celui qui permit la technique, la cuisson, la métallurgie et la civilisation elle-même.",
    "Le philosophe Empédocle en fit plus tard l'une des quatre racines de toute matière, aux côtés de l'eau, de l'air et de la terre — une théorie qui a nourri toute la pensée grecque sur la nature du monde, bien après les mythes qui l'avaient d'abord racontée.",
    "Le feu est devenu un symbole d'action, de volonté, d'élan — et du prix qu'il faut parfois payer pour ce qu'on ose transmettre.",
  ]},
  "eau":{icon:"💧",label:"Eau",category:"Éléments",desc:"Source, rivière, vague, pluie, miroir : émotion, relation, ce qui circule.",links:[],lore:[
    "L'eau est, dans la mythologie grecque, l'élément qui traverse aussi bien le monde des vivants que celui des morts : les fleuves des Enfers (Styx, Léthé, Achéron) sont tous des cours d'eau, et c'est sur l'eau du Styx que les dieux prêtaient leurs serments les plus sacrés.",
    "Elle est aussi le domaine de Poséidon et de tout un peuple de divinités marines et fluviales, des Néréides aux dieux-fleuves, qui montrent que l'eau n'est jamais un simple décor mais un ensemble de forces vivantes.",
    "Empédocle en fit l'une des quatre racines de toute matière, aux côtés du feu, de l'air et de la terre — l'élément de ce qui coule, se mêle et jamais ne reste immobile.",
    "L'eau est devenue un symbole d'émotion, de relation et de ce qui circule sans jamais s'arrêter tout à fait.",
  ]},
  "air":{icon:"🌬",label:"Air",category:"Éléments",desc:"Vent, souffle, plume, nuage : pensée, décision, clarté mentale.",links:[],lore:[
    "L'air, dans la mythologie grecque, est le domaine où circulent les messages : c'est par les airs qu'Hermès porte ses nouvelles et qu'Iris tend son arc-en-ciel entre le ciel et la terre.",
    "C'est aussi le souffle (pneuma) que les Anciens associaient à la vie elle-même et, plus tard, à la pensée et à l'inspiration — respirer et penser relevaient d'un même principe invisible.",
    "Empédocle en fit l'une des quatre racines de toute matière, aux côtés du feu, de l'eau et de la terre — l'élément qu'on ne voit jamais directement, mais dont les effets se sentent partout.",
    "L'air est devenu un symbole de pensée, de décision et de clarté mentale — ce qui circule sans jamais se laisser saisir.",
  ]},
  "terre":{icon:"🌿",label:"Terre",category:"Éléments",desc:"Racine, pierre, sol, montagne : matière, croissance, incarnation concrète.",links:[],lore:[
    "La terre est, dans la mythologie grecque, une puissance primordiale : Gaïa, la Terre elle-même, engendre en premier le Ciel (Ouranos) et donne naissance à toutes les générations divines qui suivront, y compris les Titans et, à travers eux, les dieux de l'Olympe.",
    "Elle est aussi le domaine de Déméter, déesse des moissons, dont le chagrin après l'enlèvement de Perséphone rend la terre stérile chaque année, avant que son retour ne la fasse à nouveau produire.",
    "Empédocle en fit l'une des quatre racines de toute matière, aux côtés du feu, de l'eau et de l'air — l'élément le plus stable, celui qui porte et nourrit tous les autres.",
    "La terre est devenue un symbole de matière, de croissance et d'incarnation concrète — ce qui accueille, porte et fait pousser.",
  ]},

  // Astres & phénomènes
  "soleil":{icon:"☀",label:"Soleil",category:"Astres & phénomènes",desc:"Clarté, conscience, vitalité, vérité qui n'a plus besoin de se cacher.",links:["hélios"],lore:[
    "Le soleil est le corps même d'Hélios, qui traverse chaque jour le ciel sur son char de feu, voyant tout ce qui se passe sur terre sans qu'aucun secret ne puisse lui échapper.",
    "Son fils Phaéton, voulant un jour conduire le char à sa place, en perdit le contrôle et faillit embraser la terre entière — un rappel que la lumière qui révèle tout est aussi une force qu'il faut savoir maîtriser.",
    "Le soleil ne se cache jamais : c'est précisément ce qui en fait, dans cette mythologie, le témoin par excellence, celui devant qui rien ne reste dans l'ombre.",
    "Il est devenu un symbole de clarté, de conscience, de vitalité et de vérité qui n'a plus besoin de se cacher.",
    "Le soleil est particulièrement associé à Hélios.",
  ]},
  "lune":{icon:"🌙",label:"Lune",category:"Astres & phénomènes",desc:"Inconscient, intuition, cycles, incertitude qui n'empêche pas d'avancer.",links:["séléné","métis"],lore:[
    "La lune est le corps de Séléné, qui traverse le ciel nocturne comme son frère Hélios traverse le ciel diurne.",
    "Son mythe le plus connu est celui d'Endymion, berger d'une beauté si parfaite que Séléné, tombée amoureuse, obtint pour lui un sommeil éternel plutôt que la mort — afin de pouvoir continuer, chaque nuit, à venir le contempler.",
    "La lune porte aussi la trace de Métis, titanide de la ruse et de la sagesse cachée : un savoir qui, comme la lune elle-même, ne se montre jamais tout entier d'un coup, mais se dévoile par phases.",
    "Elle est devenue un symbole d'inconscient, d'intuition, de cycles et d'incertitude qui n'empêche pas d'avancer.",
    "La lune est particulièrement associée à Séléné et à Métis.",
  ]},
  "étoiles":{icon:"✦",label:"Étoile",category:"Astres & phénomènes",desc:"Orientation, espoir, inspiration retrouvée après l'épreuve.",links:["hécate"],lore:[
    "Les étoiles se rattachent à Hécate par sa mère, Astéria, titanide dont le nom signifie littéralement « étoilée ».",
    "Pour échapper aux avances de Zeus, Astéria se jeta dans la mer et fut changée en île — Délos, selon certaines traditions — après avoir été un temps assimilée aux étoiles filantes. Sa fille Hécate hérita de cette proximité avec le ciel nocturne et l'orientation qu'il offre à qui sait le lire.",
    "Contrairement au soleil qui révèle tout d'un coup, les étoiles n'éclairent que faiblement — mais elles suffisent à orienter celui qui a perdu son chemin dans l'obscurité.",
    "Elles sont devenues un symbole d'orientation, d'espoir et d'inspiration retrouvée après l'épreuve.",
    "Les étoiles sont particulièrement associées à Hécate, par sa mère Astéria.",
  ]},
  "aurore":{icon:"🌅",label:"Aurore",category:"Astres & phénomènes",desc:"Commencement, renaissance, ce qui redémarre après l'obscurité.",links:[],lore:[
    "L'aurore est le corps d'Éos, déesse aux doigts de rose qui ouvre chaque jour les portes du ciel pour annoncer le passage d'Hélios.",
    "Éos est aussi connue pour ses amours mortelles, comme Tithonos, à qui elle obtint l'immortalité sans penser à demander aussi l'éternelle jeunesse — un rappel que même un don des dieux peut se retourner si l'on ne pense pas à tout.",
    "Chaque aurore répète ainsi un même geste : ouvrir à nouveau ce qui semblait clos, redonner une chance après la nuit la plus sombre.",
    "Elle est devenue un symbole de commencement, de renaissance et de ce qui redémarre après l'obscurité.",
  ]},
  "éclipse":{icon:"🌑",label:"Éclipse",category:"Astres & phénomènes",desc:"Obscurcissement temporaire, transition, révélation qui attend son heure.",links:[],lore:[
    "Longtemps, une éclipse fut perçue comme un présage redoutable : le soleil ou la lune s'éteignant sans explication ne pouvait, croyait-on, qu'annoncer un désordre plus grand encore.",
    "C'est un Grec, le philosophe Anaxagore, qui proposa au Ve siècle avant notre ère l'une des premières explications naturelles de ce phénomène : l'éclipse ne serait pas un signe des dieux mais l'ombre portée d'un astre sur un autre — une idée si audacieuse pour son temps qu'elle lui valut d'être accusé d'impiété.",
    "L'éclipse raconte ainsi, mieux qu'aucun autre phénomène céleste, le moment où le mythe cède la place à l'explication — sans que le sentiment de mystère ne disparaisse tout à fait.",
    "Elle est devenue un symbole d'obscurcissement temporaire, de transition et de révélation qui attend son heure pour se manifester.",
  ]},
  "éclair":{icon:"⚡",label:"Éclair",category:"Astres & phénomènes",desc:"Révélation brutale, rupture soudaine, énergie qui ne prévient pas.",links:["zeus","poséidon"],lore:[
    "L'éclair partage son origine avec la foudre (voir cette fiche) : c'est l'arme que les Cyclopes forgèrent pour Zeus après sa victoire sur les Titans.",
    "Mais l'éclair est aussi ce qui rend visible, l'espace d'un instant, ce que l'obscurité cachait — une déchirure brève dans la nuit, plutôt que le coup qui suit. Poséidon, de son côté, produit une violence tout aussi soudaine mais depuis le sol : ses coups de trident font trembler la terre avec la même absence totale de préavis.",
    "Zeus dans le ciel, Poséidon sous la terre : à eux deux, ils montrent qu'aucun des deux royaumes, ni le plus haut ni le plus profond, n'est à l'abri d'une violence instantanée.",
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
  "protée":"Dieu marin insaisissable, capable de changer sans cesse de forme.",
  "cyclopes":"Artisans géants à l'œil unique, forgerons associés à Héphaïstos dans les grandes œuvres divines.",
  "cybèle":"Déesse de la terre nourricière, souveraine d'une abondance sauvage.",
};

// Textes mythologiques développés pour les figures listées ci-dessus (voir showDeityDetail() /
// Apprendre → Figures mythologiques). Séparé de DEITY_NOTES pour ne pas changer le type de
// DEITY_NOTES (utilisé partout ailleurs comme simple chaîne courte) : même logique additive
// que SYMBOL_LIBRARY.lore.
const DEITY_LORE = {
  "dionysos": [
    "Dionysos est le fils de Zeus et d'une mortelle, Sémélé, morte foudroyée en voulant contempler son amant divin dans toute sa splendeur — Zeus dut alors coudre l'enfant à naître dans sa propre cuisse pour le mener à terme, d'où son surnom de « deux fois né ».",
    "Contrairement aux autres Olympiens, il parcourut le monde des mortels, leur enseignant la culture de la vigne et provoquant sur son passage des scènes de folie collective chez ceux qui refusaient de le reconnaître comme dieu — comme le roi Penthée, déchiré par sa propre mère en plein délire bachique.",
    "Dieu de la métamorphose autant que de l'ivresse, il incarne ce qui échappe à la raison et à l'ordre établi.",
  ],
  "hermès": [
    "Né dans une grotte du mont Cyllène (voir la fiche « Grotte »), Hermès manifesta son astuce dès le jour de sa naissance : il déroba le troupeau de son frère Apollon, puis inventa la lyre à partir d'une carapace de tortue et la lui offrit en échange de son pardon (voir la fiche « Lyre »).",
    "Seul dieu à circuler librement entre l'Olympe, la Terre et les Enfers, il devint le messager officiel de Zeus et le guide des âmes des morts vers l'autre monde — un rôle qui en fait le patron des voyageurs, des marchands et de tous ceux qui franchissent des frontières.",
  ],
  "métis": [
    "Titanide de la ruse, Métis fut la première épouse de Zeus. Une prophétie annonçait qu'elle enfanterait un fils plus puissant que son père : Zeus, pour l'empêcher, l'avala tout entière alors qu'elle était enceinte.",
    "Loin de disparaître, Métis continua d'agir depuis l'intérieur de Zeus, forgeant en secret l'armure de leur fille : le moment venu, Athéna jaillit tout armée du crâne de son père, portant en elle la ruse de sa mère autant que la puissance de Zeus.",
  ],
  "héra": [
    "Sœur et épouse de Zeus, Héra règne sur l'Olympe comme protectrice du mariage et garante de l'ordre légitime — un rôle qu'elle défend avec une fermeté que la mythologie associe souvent à la jalousie, tant les infidélités de son époux sont nombreuses.",
    "Elle ne se contente jamais d'observer : elle poursuit Héraclès de sa colère toute sa vie durant simplement parce qu'il est le fruit d'une liaison de Zeus, et impose à Léto l'interdiction de mettre au monde ses enfants sur la moindre terre ferme, retardant ainsi la naissance d'Apollon et d'Artémis.",
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
  ],
  "apollon": [
    "Fils de Zeus et de Léto, Apollon naquit avec sa sœur jumelle Artémis sur l'île flottante de Délos, seul lieu qui accepta de les accueillir après qu'Héra eut interdit à toute terre ferme de recevoir l'accouchement de sa rivale.",
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
    "Fils de Zeus et d'une mortelle, Alcmène, Héraclès fut la cible de la jalousie d'Héra dès le berceau : elle envoya deux serpents l'étrangler dans son sommeil, qu'il étrangla lui-même de ses propres mains encore enfant.",
    "Rendu fou par Héra à l'âge adulte, il tua sa propre famille dans un accès de délire, et dut, pour se purifier de ce crime, accomplir douze travaux jugés impossibles — de l'étranglement du lion de Némée à la capture de Cerbère aux portes des Enfers.",
    "Ses travaux ont fait de lui le modèle même de la force mise au service d'une expiation, plutôt que d'une simple conquête.",
  ],
  "prométhée": [
    "Titan resté aux côtés de Zeus pendant la guerre contre les autres Titans, Prométhée façonna aussi, selon certains récits, les premiers hommes à partir d'argile.",
    "Voyant l'humanité livrée au froid et à l'ignorance, il déroba le feu aux dieux et l'offrit aux mortels (voir la fiche « Feu ») — un don qui lui valut d'être enchaîné à un rocher du Caucase, où un aigle venait chaque jour dévorer son foie, qui repoussait chaque nuit, jusqu'à ce que Chiron accepte de mourir à sa place pour le libérer (voir la fiche « Chiron »).",
    "Son nom reste attaché à tout affranchissement payé au prix fort — le savoir arraché plutôt que donné.",
  ],
  "hadès": [
    "Fils de Cronos et de Rhéa, Hadès hérita du monde souterrain lors du partage du cosmos entre lui et ses frères Zeus et Poséidon — un lot que la tradition présente souvent comme le moins enviable, mais qu'il gouverne avec une rigueur incorruptible plutôt qu'avec cruauté.",
    "Il quitte rarement son royaume, à l'exception notable de l'enlèvement de Perséphone (voir la fiche « Perséphone »), dont il tombe amoureux et qu'il installe à ses côtés comme reine des Enfers.",
    "Contrairement à une image tardive qui en fait un dieu maléfique, Hadès reste dans les mythes grecs un juge impartial, gardien d'un ordre auquel nul, pas même les dieux, ne peut se soustraire.",
  ],
  "perséphone": [
    "Fille de Zeus et de Déméter, Perséphone cueillait des fleurs dans un pré lorsque la terre s'ouvrit sous elle et qu'Hadès l'emporta sur son char vers son royaume souterrain.",
    "Ayant mangé quelques grains de grenade offerts par Hadès (voir la fiche « Grenade »), elle se lia irrévocablement aux Enfers et dut, par un accord négocié par Zeus, y passer une partie de chaque année, devenant reine des morts autant que fille de la déesse des moissons.",
    "Son passage entre les deux mondes en fait la figure même de la transformation qui n'efface jamais totalement ce qu'on était avant.",
  ],
  "iris": [
    "Fille du Titan Thaumas et de l'Océanide Électre, Iris personnifie l'arc-en-ciel (voir la fiche « Arc-en-ciel »), pont visible entre le ciel et la terre qu'elle emprunte pour porter les messages des dieux aux mortels comme aux autres divinités.",
    "Contrairement à Hermès, dont les missions relèvent souvent de la ruse ou du commerce, Iris est associée à la fidélité du message transmis sans détour — une messagère de confiance, jamais rusée ni trompeuse.",
  ],
  "pan": [
    "Fils d'Hermès, Pan naquit avec des cornes, des sabots de bouc et un visage si étrange que sa propre mère fuit à sa vue — les autres dieux, eux, s'amusèrent de son apparence et l'adoptèrent comme l'un des leurs.",
    "Il règne sur les forêts et les troupeaux (voir la fiche « Forêt ») et peut, d'un simple cri, saisir les voyageurs d'une terreur irraisonnée dans les bois profonds — la « panique » lui doit d'ailleurs son nom.",
  ],
  "poséidon": [
    "Frère de Zeus et d'Hadès, Poséidon reçut la mer en partage lors de la division du cosmos (voir la fiche « Mer »). D'humeur aussi changeante que les flots qu'il gouverne, il peut aussi bien porter les navires que déchaîner tempêtes et tremblements de terre d'un coup de son trident.",
    "Sa rivalité avec Athéna pour devenir le patron d'Athènes — il fit jaillir une source d'eau salée du rocher, elle offrit un olivier — illustre bien son tempérament : la force spectaculaire face à la sagesse durable, et c'est cette dernière que la ville choisit.",
  ],
  "hécate": [
    "Déesse des carrefours et des passages, Hécate est représentée sous une triple forme, tournée à la fois vers le ciel, la terre et les Enfers — l'une des seules divinités, avec Perséphone, à circuler librement entre les trois royaumes.",
    "Elle fut la seule à entendre les cris de Perséphone lors de son enlèvement et l'aida ensuite à retrouver sa mère Déméter ; depuis, elle veille sur les carrefours nocturnes, la magie et tout ce qui exige de choisir une direction dans l'obscurité.",
  ],
  "séléné": [
    "Déesse de la lune, Séléné traverse le ciel nocturne sur un char tiré par des chevaux ailés, tandis que son frère Hélios conduit celui du soleil le jour (voir la fiche « Lune »).",
    "Éprise du berger Endymion (voir la fiche « Endymion »), elle obtint de Zeus qu'il reste éternellement jeune et endormi, afin de pouvoir le contempler chaque nuit sans jamais le voir vieillir ni mourir.",
  ],
  "hélios": [
    "Dieu du soleil, Hélios traverse chaque jour le ciel sur un char de feu, de l'orient à l'occident, avant de regagner l'Océan pendant la nuit pour reprendre sa course au matin suivant (voir la fiche « Soleil »).",
    "Son fils Phaéton, voulant prouver sa filiation, obtint un jour de conduire le char à sa place — incapable d'en maîtriser les chevaux, il faillit embraser la terre entière avant que Zeus ne le foudroie pour l'arrêter.",
  ],
  "minos": [
    "Roi légendaire de Crète de son vivant, Minos devint après sa mort l'un des trois juges des Enfers, réputé pour la rigueur impartiale de ses jugements — une réputation acquise du temps où il régnait déjà avec une justice sans complaisance.",
    "Sur terre, il fit construire par Dédale le Labyrinthe pour y enfermer le Minotaure, fruit d'une union contre nature de son épouse — un épisode qui n'entacha jamais, dans les Enfers, la légitimité de son jugement sur les autres âmes.",
  ],
  "gaïa": [
    "Déesse primordiale, Gaïa est la Terre elle-même, apparue au tout début du monde depuis le Chaos originel — mère de toutes choses, des Titans aux Cyclopes en passant par les monstres les plus redoutables.",
    "C'est elle qui, lassée de la tyrannie de son époux Ouranos, poussa leur fils Cronos à le renverser, puis, plus tard, encouragea Zeus à faire de même contre les Titans devenus à leur tour trop puissants — la Terre choisissant toujours, en dernier recours, l'équilibre plutôt que la démesure d'un seul.",
  ],
  "athéna": [
    "Née tout armée du crâne de Zeus, après qu'il eut avalé sa mère Métis enceinte (voir la fiche « Métis »), Athéna hérita à la fois de la puissance de son père et de la ruse de sa mère.",
    "Déesse de la sagesse stratégique plutôt que de la guerre brutale, elle protège les héros rusés — Ulysse, Persée, Bellérophon — en leur offrant conseils et objets plutôt qu'en combattant à leur place, et devint la patronne d'Athènes après avoir offert à la ville l'olivier, symbole de paix durable.",
  ],
  "aphrodite": [
    "Déesse de l'amour et de la beauté, Aphrodite naquit, selon le récit le plus ancien, de l'écume de mer formée autour des membres tranchés d'Ouranos — un mythe plus ancien que la naissance de la plupart des autres Olympiens.",
    "Sa beauté suscite jalousies et rivalités jusque parmi les dieux : c'est elle qui remporte le jugement de Pâris en lui promettant l'amour de la plus belle femme du monde, Hélène — une promesse qui déclenchera la guerre de Troie.",
  ],
  "nérée": [
    "Surnommé le « Vieillard de la mer », Nérée est un dieu marin plus ancien que Poséidon, réputé pour sa sagesse, sa bienveillance et son don de prophétie, contrairement à d'autres divinités marines plus tumultueuses.",
    "Père de cinquante Néréides dont Thétis (voir la fiche « Thétis »), mère d'Achille, il incarne un versant plus paisible de la mer (voir la fiche « Mer ») — la sagesse plutôt que la tempête.",
  ],
  "bellérophon": [
    "Héros grec, Bellérophon parvint à dompter Pégase, le cheval ailé né du sang de la Gorgone Méduse, grâce à un mors d'or offert par Athéna en songe.",
    "Monté sur Pégase, il vainquit la Chimère, monstre crachant le feu — mais voulut ensuite s'élever jusqu'à l'Olympe lui-même, un excès de démesure que Zeus punit en envoyant un taon piquer Pégase, précipitant Bellérophon à terre pour le reste de sa vie.",
  ],
  "éos": [
    "Déesse de l'aurore, Éos ouvre chaque matin les portes du ciel pour annoncer le passage du char d'Hélios, son frère — ses doigts de rose colorent le ciel juste avant le lever du jour (voir la fiche « Aurore »).",
    "Éprise de plusieurs mortels, dont Tithonos, elle obtint pour lui l'immortalité mais oublia de demander aussi l'éternelle jeunesse : il vieillit sans jamais pouvoir mourir, jusqu'à se réduire, dit-on, à une simple voix.",
  ],
  "niké": [
    "Déesse ailée de la victoire, Niké accompagne indifféremment les vainqueurs, sans jamais prendre elle-même part au combat — elle couronne l'issue plutôt que de la déterminer.",
    "Fille du Titan Pallas et de Styx, elle se rangea aux côtés de Zeus dès la guerre contre les Titans, et resta depuis une fidèle compagne de son char, symbole d'un triomphe qui se mérite sans jamais se garantir d'avance.",
  ],
  "hestia": [
    "Sœur aînée de Zeus, Hestia est la déesse du foyer et gardienne de la flamme sacrée qui brûle au centre de chaque maison comme de chaque cité.",
    "Courtisée par Apollon et Poséidon, elle refusa tout mariage et obtint de Zeus de rester à jamais vierge, s'installant définitivement au cœur de l'Olympe plutôt que de suivre l'un ou l'autre — une place discrète mais essentielle, puisque aucun foyer ne peut exister sans elle.",
  ],
  "héphaïstos": [
    "Fils d'Héra, Héphaïstos naquit si chétif ou si laid, selon les versions, que sa mère le rejeta du haut de l'Olympe — une chute qui le laissa boiteux pour le restant de son existence.",
    "Devenu le forgeron des dieux malgré ce rejet initial, il créa les armes et merveilles les plus admirées de l'Olympe, du bouclier d'Achille aux flèches d'Éros, prouvant par son art ce que sa naissance semblait lui interdire.",
  ],
  "himeros": [
    "Dieu ailé du désir soudain, Himeros accompagne Éros et Aphrodite dans leur cortège, incarnant cette part du désir qui surgit sans prévenir, avant même que la raison n'ait le temps d'intervenir.",
    "Moins connu qu'Éros, il en partage le même registre — le désir irrésistible — mais dans sa forme la plus immédiate : l'élan plutôt que la flèche qui vise.",
  ],
  "énée": [
    "Fils d'Aphrodite et du mortel Anchise, Énée combattit du côté troyen pendant la guerre de Troie, protégé à plusieurs reprises par sa mère au cœur des combats.",
    "À la chute de Troie, il porta sur son dos son père âgé et mena son fils par la main hors de la ville en flammes, fidèle jusque dans la ruine de sa cité — un périple qui, selon la légende romaine, le mènera à fonder la lignée dont naîtra Rome.",
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
    "Mortelle d'une beauté si extraordinaire qu'elle suscita la jalousie d'Aphrodite, Psyché fut aimée en secret par Éros, qui lui interdit de jamais chercher à voir son visage.",
    "Rongée par la curiosité, elle finit par l'éclairer une nuit à la lueur d'une lampe et le perdit aussitôt ; pour le retrouver, elle dut accomplir pour Aphrodite une série d'épreuves presque impossibles, avant d'obtenir enfin l'immortalité et d'être réunie à lui pour toujours.",
  ],
  "charites": [
    "Trois déesses de la grâce et de la joie — le plus souvent nommées Aglaé, Euphrosyne et Thalie —, les Charites ne sont jamais représentées seules : elles dansent toujours ensemble, indissociables les unes des autres.",
    "Compagnes d'Aphrodite et des Muses, elles président à tout ce qui rend la vie belle sans nécessité — la beauté, la fête, la reconnaissance — plutôt qu'à ce qui est simplement utile.",
  ],
  "narcisse": [
    "Jeune homme d'une beauté remarquable, Narcisse repoussait sans exception tous ceux qui l'aimaient, dont la nymphe Écho (voir la fiche « Écho »), inconsolable de son rejet.",
    "Puni pour son indifférence, il aperçut un jour son propre reflet dans une source et en tomba éperdument amoureux, incapable de s'en détacher jusqu'à en mourir sur place — incapable de voir qu'aucun amour, pas même le sien, ne pouvait lui être rendu par une image.",
  ],
  "écho": [
    "Nymphe bavarde, Écho fut punie par Héra, qui découvrit qu'elle la distrayait volontairement pour couvrir les infidélités de Zeus : elle perdit dès lors la capacité de parler la première, condamnée à ne répéter que les derniers mots d'autrui.",
    "Éprise de Narcisse, elle ne put jamais lui déclarer son amour autrement qu'en répétant ses propres paroles, et se consuma de chagrin après son rejet jusqu'à ne plus laisser d'elle qu'une voix, dit-on, résonnant encore dans les montagnes.",
  ],
  "circé": [
    "Magicienne experte en herbes et en breuvages, Circé vit sur une île isolée où elle transforme en animaux les voyageurs qui s'y aventurent sans méfiance — c'est ainsi qu'elle changea en pourceaux une partie de l'équipage d'Ulysse.",
    "Ulysse, protégé par une plante magique offerte par Hermès, résista à son sortilège et la contraignit à rendre à ses hommes leur forme humaine. Il resta ensuite une année entière sur son île, dont naquit un fils, Télégonos — qui, des années plus tard et sans le reconnaître, tuera son propre père, achevant malgré lui une prophétie qui pesait sur Ulysse depuis son retour à Ithaque.",
    "Sa magie ne sert pas qu'à punir les intrus : par jalousie, elle change aussi la nymphe Scylla en monstre. Éprise du dieu marin Glaucos, lui-même épris de Scylla, Circé empoisonne la source où celle-ci se baigne — la nymphe en ressort affublée d'une ceinture de têtes de chiens hurlants, condamnée à hanter pour toujours un détroit périlleux, face au tourbillon de Charybde (voir la fiche « Mer »).",
    "Elle inflige un sort semblable à Picus, roi du Latium déjà marié à la nymphe Canens : le voyant refuser ses avances par fidélité, elle le change en pic — l'oiseau porte encore aujourd'hui son nom latin, picus. Deux amours contrariés, deux métamorphoses : la magie de Circé transforme aussi souvent qu'elle punit.",
  ],
  "thétis": [
    "Fille de Nérée (voir la fiche « Nérée »), Thétis est une Néréide capable de se métamorphoser à volonté — feu, eau, lion, serpent — pour échapper à qui cherche à la retenir. Zeus et Poséidon la convoitèrent tous deux, jusqu'à ce qu'une prophétie annonce que le fils de Thétis surpasserait son père : par prudence, les deux dieux renoncèrent et la marièrent à un simple mortel, Pélée.",
    "Pélée ne put l'épouser qu'en la maintenant de force à travers toutes ses métamorphoses, sur les conseils de Chiron (voir la fiche « Chiron ») — une lutte que Thétis finit par accepter sans jamais renoncer à sa propre nature changeante. Leurs noces, auxquelles la déesse de la Discorde ne fut pas conviée, déclenchèrent l'épisode de la pomme d'or qui mènera plus tard au jugement de Pâris.",
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
    "Roi d'Ithaque réputé pour sa ruse plus que pour sa force, Ulysse conçut le stratagème du cheval de bois qui permit enfin aux Grecs de s'emparer de Troie après dix années de siège infructueux.",
    "Son retour chez lui prit dix années supplémentaires, semées d'épreuves — le Cyclope Polyphème, les sirènes, Circé, Charybde et Scylla — durant lesquelles son intelligence lui permit chaque fois d'échapper à des périls que la seule force n'aurait pas surmontés.",
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
    "Sœur jumelle d'Apollon, Artémis naquit la première et, dit-on, aida elle-même sa mère Léto à accoucher de son frère peu après — elle devint ainsi protectrice des accouchements autant que déesse de la chasse.",
    "Farouchement attachée à sa virginité et à son intimité, elle règne sur les forêts sauvages (voir la fiche « Forêt ») et punit sans hésiter quiconque, comme Actéon (voir la fiche « Actéon »), s'aventure à la surprendre.",
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
    sunSign: a.sunSign || null,
    moonSign: a.moonSign || null,
    ascendantSign: a.ascendant?.sign || null,
    nameNumber: saved.nameNumber,
    nameNumberMeaning: numMeaning ? numMeaning[0] : null,
    personalYear: py,
    personalYearMeaning: pyMeaning ? pyMeaning[0] : null,
    tutelaryDeity: deity ? deity.deityName : null,
    topAspects,
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
  return {
    firstName: saved.firstName,
    nameNumber: saved.nameNumber,
    nameNumberMeaning: numMeaning ? numMeaning[0] : null,
    ascendantSign: a.ascendant?.sign || null,
    planets,
    aspects,
    tutelaryDeity: deity ? {
      name: deity.deityName,
      note: deity.note,
      contributors: (deity.contributors||[]).map(c=>({ label: c.label, sign: c.sign })),
    } : null,
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
// Même logique de discrétion qu'ensurePortrait() : jamais de prompt de code d'accès depuis
// un simple affichage du Profil astral, échec silencieux (les phrases génériques restent
// affichées), un seul appel réseau tant qu'aucun texte n'est en cache.
function ensureAstralText(){
  const p = getProfile();
  if(!p || !p.astral) return;
  if(getCachedAstralText()) return;
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
      fresh.astralText = text;
      saveProfileData(fresh);
      if(cardDetailReturnTo === showProfilAstral) showProfilAstral();
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
// code d'accès depuis un simple chargement de l'accueil, échec silencieux, un seul appel
// tant qu'aucune rétrospective n'existe pour l'année en cours.
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
      if(route==="home") render();
    })
    .catch(()=>{ /* échec silencieux : pas de rétrospective cette année, réessayé à la prochaine visite */ })
    .finally(()=>{ retrospectiveFetchInFlight = false; });
}

/* ===================== RITUEL DU JOUR (recommandation unifiée, IA, 1x/jour) ===================== */
// Contrairement au portrait et à la rétrospective (générés une fois), rappelé une fois par
// jour — coût récurrent, du même ordre qu'une lecture à 1 carte. Fusionne carte du jour +
// transits du jour (signes + aspect le plus marqué avec le thème natal, voir
// strongestTransitAspect() ci-dessus) + mois personnel en UNE recommandation, plutôt que
// des blocs séparés à interpréter soi-même — un ancien bloc "Horoscope du jour" affiché en
// plus faisait doublon (mêmes signes du jour, juste dits autrement) : supprimé, sa matière
// est maintenant entièrement absorbée ici.
function ritualSummary(profile, dayCard, transits){
  if(!dayCard) return null;
  const pm = profile ? personalMonthNumber(profile.birthDate) : null;
  const pmMeaning = NUMBER_KEYS[pm];
  const transitAspect = strongestTransitAspect(transits, profile);
  return {
    firstName: profile?.firstName || null,
    dayCardName: cardFullName(dayCard),
    dayCardKeywords: (dayCard[3]||"").split("·")[0].trim(),
    sunSign: transits?.sun?.sign || null,
    moonSign: transits?.moon?.sign || null,
    transitAspect: transitAspect ? { body: transitAspect.body, action: transitAspect.action, natal: transitAspect.natal } : null,
    personalMonth: pm,
    personalMonthMeaning: pmMeaning ? pmMeaning[0] : null,
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

async function generateAIReading(question, cards, positions){
  const timeout = new Promise((_,reject)=>setTimeout(()=>reject(new Error("timeout")), 15000));
  const profile = profileForReading();
  const history = journalTrendsForReading();
  const memory = cardMemory(cards, question);
  const call = fetch("/api/reading", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-App-Access-Code": getAccessCode() },
    body: JSON.stringify({ question, cards, positions, ...(profile ? { profile } : {}), ...(history ? { history } : {}), ...(memory ? { memory } : {}) })
  }).then(async r=>{
    if(r.status === 401){
      // Code manquant/incorrect : on l'efface pour qu'il soit redemandé au prochain tirage.
      localStorage.removeItem("delphesAccessCode");
    }
    if(!r.ok) throw new Error("réponse backend invalide");
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
    .catch(() => { tirageState.aiStatus = "error"; saveTirageState(); render(); }); // repli silencieux vers le template
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
  title.textContent = {home:"Tarot de Delphes", tirage:"Tirage", apprendre:"Apprendre", symboles:"Symboles", profil:"Profil"}[route] || "Tarot de Delphes";
  if(route==="home") screen.innerHTML = home();
  if(route==="tirage") screen.innerHTML = tirage();
  if(route==="apprendre") screen.innerHTML = apprendre();
  if(route==="symboles") screen.innerHTML = symboles();
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

function home(){
  const streak = updateStreak();
  const day = MAJORS[dayOfYear() % MAJORS.length];
  const lore = CARD_LORE[day[0]];
  const profile = getProfile();
  const links = profileMajorLinks();
  const resonates = !!(links && links.some(l => l.card[0] === day[0]));
  ensureTransits();
  ensurePortrait();
  ensureAstralText();
  ensureRetrospective();
  const cachedTransits = getCachedTransits();
  ensureRitual(day, cachedTransits);
  const ritual = getCachedRitual();
  const retrospective = getCachedRetrospective();
  const retrospectiveReady = retrospective && retrospective.year === new Date().getFullYear();
  return `<section class="hero">
    ${homeGlowHTML()}
    <div class="hero-emblem">✦</div>
    <h2>Tarot de Delphes</h2>
    ${profile?.firstName ? `<p class="note" style="margin-top:2px">Bonjour ${escapeHTML(profile.firstName)} ✦</p>` : ""}
    <p>Un tarot mythologique grec qui s'apprend en le regardant : tirage, symboles reliés entre eux, et un parcours d'apprentissage progressif.</p>
    ${streak > 1 ? `<span class="pill" style="margin-top:10px">✦ ${streak} jours de suite</span>` : ""}
  </section>
  ${retrospectiveReady ? `<div class="grid" style="margin-bottom:20px">
    <div class="tile" data-go-retrospective="1"><strong>🎂 Ta rétrospective de l'année</strong><span>Un an de tirages, résumé pour toi.</span></div>
  </div>` : ""}
  ${ritual ? `<div class="section-title centered"><h3>Ton rituel du jour</h3></div>
  <p class="lore-text" style="max-width:560px;margin:0 auto 20px;text-align:center;opacity:.9;font-weight:500">${escapeHTML(ritual)}</p>` : ""}
  <div class="section-title centered"><h3>Carte du jour</h3></div>
  <div class="day-card" data-card="${encodeURIComponent(JSON.stringify(day))}">${cardHTML(day,"major")}</div>
  ${resonates ? `<p class="note" style="text-align:center">✦ Cette carte résonne avec ton profil astral.</p>` : ""}
  ${lore ? `<p class="lore-text" style="max-width:560px;margin:14px auto 0;text-align:center;opacity:.85">${escapeHTML(lore.myth.length > 220 ? lore.myth.slice(0,220).trim()+"…" : lore.myth)}</p>` : ""}
  <p class="tap-hint">touche la carte pour en découvrir la lecture complète</p>
  <div class="grid" style="margin-top:30px">
    <div class="tile" data-go="tirage"><strong>✦ Tirer les cartes</strong><span>Choisis toi-même trois cartes dans le jeu.</span></div>
    <div class="tile" data-go="apprendre"><strong>◈ Apprendre</strong><span>Un parcours progressif sur les 78 cartes.</span></div>
    <div class="tile" data-go="symboles"><strong>✧ Symboles</strong><span>Chaque symbole est relié aux autres.</span></div>
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
        return `<div class="tile" data-spread="${s.key}">
        <strong>${s.glyph} ${escapeHTML(s.name)}</strong>
        <span>${escapeHTML(s.description)} (${displayCount} carte${displayCount>1?"s":""})</span>
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

// Relie le profil astral enregistré aux arcanes majeurs (via ZODIAC_MAJOR_LINKS), pour
// mettre en avant "tes" cartes dans Apprendre. Regroupe Soleil/Lune/Ascendant qui
// tomberaient sur la même carte plutôt que de l'afficher en double.
function profileMajorLinks(){
  const p = getProfile();
  if(!p || !p.astral) return null;
  const items = [];
  if(p.astral.sunSign) items.push({ label:"Soleil", sign:p.astral.sunSign });
  if(p.astral.moonSign) items.push({ label:"Lune", sign:p.astral.moonSign });
  if(p.astral.ascendant && p.astral.ascendant.sign) items.push({ label:"Ascendant", sign:p.astral.ascendant.sign });

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
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
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
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
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
  document.getElementById("screen").innerHTML = `<div class="detail">
    <div class="section-title"><h3>Figures mythologiques</h3></div>
    <p class="note">${entries.length} figures citées dans le jeu — certaines ont leur propre carte, d'autres n'apparaissent que dans une lecture.</p>
    <div class="symbol-list">${entries.map(([id,note])=>`<div class="symbol clickable" data-deity="${escapeHTML(id)}"><b>${escapeHTML(id.charAt(0).toUpperCase()+id.slice(1))}</b><br><small>${escapeHTML(note)}</small></div>`).join("")}</div>
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  // Pour qu'une figure cliquée dans cette liste revienne bien ici plutôt que de sauter
  // au menu Apprendre (même logique que showSymbolDetail() etc.).
  cardDetailReturnTo = () => showLearnFigures();
  bindChips();
}

function symboles(){
  // Un seul répertoire, trié par ordre alphabétique — plus de catégories : symboles et
  // nombres mélangés, triés sur leur libellé affiché (locale française, accents compris).
  const items = [
    ...Object.entries(SYMBOL_LIBRARY).map(([id,s])=>({ sort:s.label, html:symbolCard(id,s) })),
    ...Object.entries(NUMBER_KEYS).map(([n,k])=>({
      sort:k[0],
      html:`<div class="symbol clickable" data-number="${n}" data-search="${escapeHTML((k[0]+" "+k[1]+" "+k[2]).toLowerCase())}"><b>${n==="1"?"As":n} — ${escapeHTML(k[0])}</b><br>${escapeHTML(k[1])}</div>`
    }))
  ].sort((a,b)=>a.sort.localeCompare(b.sort,"fr"));

  return `<section class="hero">
    ${constellationHTML()}
    <div class="hero-emblem">✦</div>
    <h2>Bibliothèque symbolique</h2>
    <p>Chaque symbole est relié aux cartes et aux figures mythologiques qui l'utilisent.</p>
    <div class="search"><input id="symbolSearch" placeholder="Rechercher un symbole…"></div>
  </section>
  <div class="symbol-list" style="margin-top:20px">${items.map(i=>i.html).join("")}</div>`;
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
    ${s.lore && s.lore.length ? `<div class="section-title"><h3>Aux origines du symbole</h3></div>
      ${s.lore.map(p=>`<p class="lore-text">${escapeHTML(p)}</p>`).join("")}` : ""}
    ${linkedDeities.length ? `<div class="section-title"><h3>Figures liées</h3></div>
      <div class="symbol-list">${linkedDeities.map(d=>`<div class="symbol clickable" data-deity="${escapeHTML(d)}"><b>${escapeHTML(d[0].toUpperCase()+d.slice(1))}</b><br><small>${escapeHTML(DEITY_NOTES[d])}</small></div>`).join("")}</div>` : ""}
    ${related.length ? `<div class="section-title"><h3>Cartes concernées</h3></div>
      <div class="card-grid">${related.map(c=>cardHTML(c, c[4]==="major"?"major":(SUITS[c[6]]?.[0]||"major"))).join("")}</div>` : ""}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    backTo();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
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
    backTo();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
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
  const related = CARDS.filter(c => (c[4]==="major"||c[4]==="court") && (c[1]||"").toLowerCase()===id);
  const lore = DEITY_LORE[id];
  document.getElementById("screen").innerHTML = `<div class="detail">
    ${wasNew ? discoveryFX() : ""}
    <div class="symbol-hero">✦</div>
    <h2>${escapeHTML(name)}</h2>
    <p class="symbol-cat-big">Figure mythologique</p>
    <p>${escapeHTML(note)}</p>
    ${lore && lore.length ? `<div class="section-title"><h3>Le mythe</h3></div>
      ${lore.map(p=>`<p class="lore-text">${escapeHTML(p)}</p>`).join("")}` : ""}
    ${related.length ? `<div class="section-title"><h3>Carte${related.length>1?"s":""} associée${related.length>1?"s":""}</h3></div>
      <div class="card-grid">${related.map(c=>cardHTML(c, c[4]==="major"?"major":(SUITS[c[6]]?.[0]||"major"))).join("")}</div>` : ""}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    backTo();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  cardDetailReturnTo = () => showDeityDetail(id, backTo);
  bindCards(); bindChips();
}

/* ===================== ONGLET PROFIL (profil astral + journal) ===================== */

function profil(){
  const links = profileMajorLinks();
  return `<section class="hero">
    <div class="hero-emblem">☉</div>
    <h2>Profil</h2>
    <p>Ton profil astral et l'historique de tes tirages — tout reste privé, sur cet appareil.</p>
  </section>
  <div class="grid" style="margin-top:20px">
    <div class="tile" data-profil-go="astral"><strong>☉ Profil astral</strong><span>Ton thème natal complet, calculé à partir de ta date, heure et lieu de naissance.</span></div>
    <div class="tile" data-profil-go="journal"><strong>☽ Journal</strong><span>${journal.length} tirage${journal.length>1?"s":""} enregistré${journal.length>1?"s":""}.</span></div>
    <div class="tile" data-profil-go="stats"><strong>📊 Statistiques</strong><span>Tes tendances : cartes, thèmes, série de jours.</span></div>
  </div>
  ${links ? `
  <div class="section-title centered"><h3>Arcanes majeurs liés à ton profil astral</h3></div>
  <div class="card-grid">${links.map(l=>`<div>
    <p class="suit-h4" style="text-align:center;margin-bottom:6px">${escapeHTML(l.labels.join(" & "))} en ${escapeHTML(l.sign)}</p>
    ${cardHTML(l.card,"major")}
  </div>`).join("")}</div>` : ""}`;
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
// pesé "vote", via ZODIAC_MAJOR_LINKS (déjà utilisé pour l'horoscope et Apprendre), pour la
// divinité associée à son signe. Les planètes proches du Soleil (Mercure, Vénus) tombent
// souvent dans le même signe ou un signe voisin — les votes ne sont donc pas juste "celui du
// Soleil gagne toujours", même si le Soleil reste le plus lourd en cas d'égalité.
// `contributors` (les corps qui ont voté pour la divinité gagnante, du plus lourd au plus
// léger) sert à expliquer CE choix — voir tutelaryReason dans profileForAstralText() et
// showTutelaryReason() ci-dessous.
function tutelaryDeity(saved){
  const a = saved?.astral;
  if(!a || !a.bodies) return null;

  const scores = {}; // clé divinité (minuscules) -> score cumulé
  const order = [];  // ordre de rencontre, pour départager les égalités (Soleil d'abord)
  const contributorsByDeity = {}; // clé divinité -> [{label, sign, weight}, ...]
  const vote = (sign, weight, label) => {
    const cardName = sign && ZODIAC_MAJOR_LINKS[sign];
    const card = cardName && MAJORS.find(c=>c[0]===cardName);
    if(!card) return;
    const deityKey = card[1].toLowerCase();
    if(!(deityKey in scores)){ order.push(deityKey); contributorsByDeity[deityKey] = []; }
    scores[deityKey] = (scores[deityKey]||0) + weight;
    contributorsByDeity[deityKey].push({ label, sign, weight });
  };
  Object.entries(TUTELARY_WEIGHTS).forEach(([key,weight])=> vote(a.bodies[key]?.sign, weight, (PLANET_LABELS[key]||key).replace(/^[☉☽]\s*/,"")));
  if(a.ascendant?.sign) vote(a.ascendant.sign, 3, "Ascendant");

  if(!order.length) return null;
  const maxScore = Math.max(...Object.values(scores));
  const winnerKey = order.find(k => scores[k] === maxScore); // premier rencontré = priorité au Soleil
  const card = MAJORS.find(c=>c[1].toLowerCase()===winnerKey);
  if(!card) return null;
  const contributors = (contributorsByDeity[winnerKey]||[]).sort((x,y)=>y.weight-x.weight);
  return { deityKey: winnerKey, deityName: card[1], card, note: DEITY_NOTES[winnerKey] || null, contributors };
}

// Explication de secours (déterministe, sans IA) tant que le texte généré par
// /api/astral-text n'est pas encore en cache — voir astralText.tutelaryReason dans
// renderProfilResults(). Simple énumération des placements qui pèsent le plus dans le
// score, pas une vraie phrase mythologique (c'est le rôle du texte IA une fois prêt).
function tutelaryReasonFallback(deity){
  if(!deity || !deity.contributors || !deity.contributors.length) return null;
  const top = deity.contributors.slice(0,3).map(c=>`${c.label} en ${c.sign}`);
  const list = top.length > 1 ? `${top.slice(0,-1).join(", ")} et ${top[top.length-1]}` : top[0];
  return `Ce choix s'appuie surtout sur ${list} — les placements qui pèsent le plus dans ton thème.`;
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
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  document.getElementById("profilEdit").onclick = ()=> showProfilEditForm();
  bindChips(); // rend cliquable la divinité tutélaire (data-deity)
  ensurePortrait();
  ensureAstralText();
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
      saveProfileData({ firstName, nameNumber, birthDate, birthTime: timeUnknown ? null : birthTime, timeUnknown, birthPlace, astral });
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
  // génération se termine ou si elle échoue — jamais de case vide.
  const planetText = (key, body) => (astralText?.planets && typeof astralText.planets[key] === "string" ? astralText.planets[key] : natalPlanetSentence(key, body)) || "";
  const ascendantText = a.ascendant ? ((typeof astralText?.ascendant === "string" ? astralText.ascendant : natalAscendantSentence(a.ascendant)) || "") : "";
  const aspectKey = asp => `${asp.bodies[0]}_${asp.type}_${asp.bodies[1]}`;
  const aspectText = asp => (astralText?.aspects && typeof astralText.aspects[aspectKey(asp)] === "string" ? astralText.aspects[aspectKey(asp)] : natalAspectSentence(asp)) || "";
  const nameNumberText = (typeof astralText?.nameNumber === "string" ? astralText.nameNumber : numMeaning?.[2]) || "";
  const tutelaryReasonText = (typeof astralText?.tutelaryReason === "string" ? astralText.tutelaryReason : tutelaryReasonFallback(deity)) || "La figure la plus présente dans ton thème natal.";

  return `<div class="detail">
    <div class="section-title"><h3>Profil astral</h3></div>
    <p class="question-recall">« ${escapeHTML(saved.firstName)} »</p>

    ${portrait
      ? portrait.split(/\n\s*\n/).map(p=>`<p class="lore-text" style="margin-top:10px">${escapeHTML(p.trim())}</p>`).join("")
      : (summary ? `<p class="lore-text" style="margin-top:10px">${escapeHTML(summary)}</p>` : "")}

    ${deity ? `
    <div class="section-title centered" style="margin-top:24px"><h3>Ta divinité tutélaire</h3></div>
    <div class="symbol-list">
      <div class="symbol clickable" data-deity="${escapeHTML(deity.deityKey)}" style="text-align:center">
        <div style="font-size:32px">${escapeHTML(deity.card[2]||"✦")}</div>
        <b>${escapeHTML(deity.deityName)}</b>
        ${deity.note ? `<br><small>${escapeHTML(deity.note)}</small>` : ""}
      </div>
    </div>
    <p class="note" style="text-align:center;margin-top:6px">${escapeHTML(tutelaryReasonText)} Touche pour en savoir plus.</p>` : ""}

    ${numMeaning ? `<div class="symbol-list" style="margin-top:14px">
      <div class="symbol"><b>Nombre du prénom : ${saved.nameNumber} — ${escapeHTML(numMeaning[0])}</b><br>${escapeHTML(nameNumberText)}</div>
    </div>` : ""}

    ${(pyMeaning || pmMeaning) ? `
    <div class="section-title centered" style="margin-top:24px"><h3>Numérologie du temps</h3></div>
    <p class="note" style="text-align:center">Contrairement au nombre du prénom (fixe), ceux-ci évoluent avec le temps.</p>
    <div class="symbol-list" style="margin-top:14px">
      ${pyMeaning ? `<div class="symbol"><b>Année personnelle ${py} — ${escapeHTML(pyMeaning[0])}</b><br>${escapeHTML(pyMeaning[2])}</div>` : ""}
      ${pmMeaning ? `<div class="symbol"><b>Mois personnel ${pm} — ${escapeHTML(pmMeaning[0])}</b><br>${escapeHTML(pmMeaning[2])}</div>` : ""}
    </div>` : ""}

    <div class="section-title centered" style="margin-top:24px"><h3>Thème natal</h3></div>
    <p class="note" style="text-align:center">${escapeHTML(saved.birthPlace)} · ${escapeHTML(dateLabel)}${saved.timeUnknown ? " · heure inconnue" : (saved.birthTime ? " · " + escapeHTML(saved.birthTime) : "")}</p>

    <div class="symbol-list" style="margin-top:14px">
      <div class="symbol"><b>☉ Soleil en ${escapeHTML(a.sunSign)}</b><br>${escapeHTML(planetText("sun", a.bodies.sun))}</div>
      <div class="symbol"><b>☽ Lune en ${escapeHTML(a.moonSign)}</b><br>${escapeHTML(planetText("moon", a.bodies.moon))}</div>
      ${a.ascendant
        ? `<div class="symbol"><b>Ascendant ${escapeHTML(a.ascendant.sign)}</b><br>${escapeHTML(ascendantText)}</div>`
        : `<div class="symbol"><b>Ascendant</b><br><small>Heure de naissance inconnue — l'ascendant et les maisons ne peuvent pas être calculés avec certitude.</small></div>`}
    </div>

    ${a.houseWarning ? `<p class="note" style="margin-top:10px">${escapeHTML(a.houseWarning)}</p>` : ""}

    <div class="section-title"><h3>Planètes</h3></div>
    <div class="symbol-list">
      ${PLANET_ORDER.map(k=>{
        const b = a.bodies[k];
        if(!b) return "";
        return `<div class="symbol"><b>${PLANET_LABELS[k]} en ${escapeHTML(b.sign)}</b> — ${b.degreeInSign}°${b.house?` · maison ${b.house}`:""}${b.retrograde?" · rétrograde":""}<br>${escapeHTML(planetText(k, b))}</div>`;
      }).join("")}
    </div>

    ${a.aspects && a.aspects.length ? `
    <div class="section-title"><h3>Aspects</h3></div>
    <div class="symbol-list">
      ${a.aspects.map(asp=>`<div class="symbol"><b>${PLANET_LABELS[asp.bodies[0]]} ${asp.type} ${PLANET_LABELS[asp.bodies[1]]}</b><br>${escapeHTML(aspectText(asp))}<br><small>orbe ${asp.orb}°</small></div>`).join("")}
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
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
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
  </div>` : ""}`;
}

function showStats(){
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">${statsView()}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  cardDetailReturnTo = showStats;
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
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  cardDetailReturnTo = showRetrospective;
}

// Voir le commentaire au-dessus de showSymbolDetail() pour le paramètre backTo.
function showDetail(c, backTo = cardDetailReturnTo){
  const suit = c[6], cls = c[4]==="major" ? "major" : (SUITS[suit]?.[0] || "major");
  const lore = CARD_LORE[c[0]];
  const wasNew = markSeen("cards", c[0]);
  preDetailScroll = window.scrollY;
  document.getElementById("screen").innerHTML = `<div class="detail">
    ${wasNew ? discoveryFX() : ""}
    ${cardHTML(c,cls)}
    <h2>${escapeHTML(c[0])}</h2>
    ${DEITY_NOTES[(c[1]||"").toLowerCase()] ? `<h3 class="clickable-deity" data-deity="${escapeHTML(c[1].toLowerCase())}">${escapeHTML(c[1])}</h3>` : `<h3>${escapeHTML(c[1])}</h3>`}
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
  triggerScreenAnim("detail");
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    backTo();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
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
    };
  });
  document.querySelectorAll("[data-profil-go]").forEach(el=>{
    el.onclick = ()=>{
      const key = el.dataset.profilGo;
      if(key==="astral") showProfilAstral();
      else if(key==="journal") showJournal();
      else if(key==="stats") showStats();
    };
  });
  document.getElementById("homeBtn").onclick=()=>setRoute("home");
  document.getElementById("backBtn").onclick=()=>setRoute("home");

  const dayCard = document.querySelector(".day-card[data-card]");
  if(dayCard) dayCard.onclick = ()=> showDetail(JSON.parse(decodeURIComponent(dayCard.dataset.card)));

  document.querySelectorAll("[data-spread]").forEach(el=>{
    el.onclick = ()=>{
      const key = el.dataset.spread;
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
      const poolSize = spreadConf().poolSize;
      tirageState = { question: tirageState.question, spreadType: tirageState.spreadType, spread: shuffledDeck().slice(0,poolSize), picks: [], notes:"", saved:false, savedIndex:null, aiReading:null, aiStatus:"idle" };
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

  const search = document.getElementById("symbolSearch");
  if(search) search.addEventListener("input", ()=>{
    const q = search.value.toLowerCase().trim();
    document.querySelectorAll("[data-search]").forEach(el=>{ el.hidden = q && !el.dataset.search.includes(q); });
  });

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

if("serviceWorker" in navigator) navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
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
