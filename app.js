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

// Rejoue la transition douce (fondu + léger glissement) sur #screen à chaque changement
// de contenu — on retire puis reforce la classe (avec un reflow entre les deux) car
// l'élément #screen n'est jamais recréé, seul son innerHTML change.
function triggerScreenAnim(){
  const screen = document.getElementById("screen");
  if(!screen) return;
  screen.classList.remove("screen-anim");
  void screen.offsetWidth;
  screen.classList.add("screen-anim");
}

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

function home(){
  const day = MAJORS[new Date().getDate() % MAJORS.length];
  return `<section class="hero">
    ${homeGlowHTML()}
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

function apprendre(){
  const progress = Math.min(100, Math.round((Math.min(78,journal.length*3)/78)*100));
  return `<section class="hero">
    <div class="hero-emblem">✦</div>
    <h2>Apprendre le Tarot de Delphes</h2>
    <p>Explore le jeu par catégorie, ou découvre les figures mythologiques qui l'inspirent.</p>
    <div class="progress"><span style="width:${progress}%"></span></div>
    <small>Progression personnelle : ${progress}%</small>
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
  triggerScreenAnim();
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
  triggerScreenAnim();
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
  triggerScreenAnim();
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
  triggerScreenAnim();
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
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
      <div class="symbol-list">${linkedDeities.map(d=>`<div class="symbol clickable" data-deity="${escapeHTML(d)}"><b>${escapeHTML(d[0].toUpperCase()+d.slice(1))}</b><br><small>${escapeHTML(DEITY_NOTES[d])}</small></div>`).join("")}</div>` : ""}
    ${related.length ? `<div class="section-title"><h3>Cartes concernées</h3></div>
      <div class="card-grid">${related.map(c=>cardHTML(c, c[4]==="major"?"major":(SUITS[c[6]]?.[0]||"major"))).join("")}</div>` : ""}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim();
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  cardDetailReturnTo = () => showSymbolDetail(id);
  bindCards(); bindChips();
}

function showNumberDetail(n){
  const k = NUMBER_KEYS[n]; if(!k) return;
  preDetailScroll = window.scrollY;
  const related = CARDS.filter(c => c[4]==="number" && c[7]===Number(n));
  document.getElementById("screen").innerHTML = `<div class="detail">
    <div class="symbol-hero">${n==="1"?"As":n}</div>
    <h2>${n==="1"?"As":n} — ${escapeHTML(k[0])}</h2>
    <p class="symbol-cat-big">Grammaire des nombres</p>
    <p>${escapeHTML(k[1])} — ${escapeHTML(k[2])}</p>
    <div class="section-title"><h3>Cartes concernées</h3></div>
    <div class="card-grid">${related.map(c=>cardHTML(c, SUITS[c[6]]?.[0]||"major")).join("")}</div>
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim();
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  cardDetailReturnTo = () => showNumberDetail(n);
  bindCards(); bindChips();
}

function showDeityDetail(id){
  const note = DEITY_NOTES[id]; if(!note) return;
  preDetailScroll = window.scrollY;
  const name = id.charAt(0).toUpperCase()+id.slice(1);
  const related = CARDS.filter(c => (c[4]==="major"||c[4]==="court") && (c[1]||"").toLowerCase()===id);
  document.getElementById("screen").innerHTML = `<div class="detail">
    <div class="symbol-hero">✦</div>
    <h2>${escapeHTML(name)}</h2>
    <p class="symbol-cat-big">Figure mythologique</p>
    <p>${escapeHTML(note)}</p>
    ${related.length ? `<div class="section-title"><h3>Carte${related.length>1?"s":""} associée${related.length>1?"s":""}</h3></div>
      <div class="card-grid">${related.map(c=>cardHTML(c, c[4]==="major"?"major":(SUITS[c[6]]?.[0]||"major"))).join("")}</div>` : ""}
    <button class="secondary" id="detailBack" style="margin-top:20px">← Retour</button>
  </div>`;
  triggerScreenAnim();
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    render();
    requestAnimationFrame(()=>window.scrollTo(0,preDetailScroll));
  };
  cardDetailReturnTo = () => showDeityDetail(id);
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
  triggerScreenAnim();
  window.scrollTo(0,0);
  document.getElementById("detailBack").onclick = ()=>{
    cardDetailReturnTo();
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

function bindDeck(){
  document.querySelectorAll("[data-pick]").forEach(el=>{
    el.onclick = ()=>{
      const idx = Number(el.dataset.pick);
      if(tirageState.picks.includes(idx) || tirageState.picks.length>=3) return;
      // Petit temps de bascule (la carte "se retourne" visuellement, voir .tarot-card-back.revealed
      // dans styles.css) avant de mettre à jour l'état et de re-rendre l'écran.
      el.classList.add("revealed");
      setTimeout(()=>{
        tirageState.picks.push(idx);
        saveTirageState();
        render();
      }, 380);
    };
  });
}

function bind(){
  cardDetailReturnTo = () => render();
  document.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>setRoute(b.dataset.route));
  document.querySelectorAll("[data-go]").forEach(el=>el.onclick=()=>setRoute(el.dataset.go));
  document.querySelectorAll("[data-learn]").forEach(el=>{
    el.onclick = ()=>{
      const key = el.dataset.learn;
      if(key==="majeurs") showLearnMajors();
      else if(key==="cour") showLearnCategory("cour");
      else if(key==="numerales") showLearnCategory("numerales");
      else if(key==="figures") showLearnFigures();
    };
  });
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
// Safari iOS n'active les styles :active que sur les éléments ayant un vrai listener tactile :
// cet écouteur (vide, passif) suffit à activer les micro-interactions au toucher partout dans l'app.
document.addEventListener("touchstart", function(){}, { passive:true });
render();
