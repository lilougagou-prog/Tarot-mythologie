// ============================================================================
// Mini Olympe — données des dieux et héros de la mythologie grecque
// Contenu écrit pour des enfants à partir de 6 ans : phrases courtes,
// aucune scène violente ou effrayante, une "info rigolote" par personnage.
// ============================================================================

const GODS = [
  {
    id: "zeus",
    name: "Zeus",
    title: "Le roi des dieux",
    domain: "Le ciel et la foudre",
    symbol: "foudre",
    symbolName: "La foudre",
    color: "#3b5bdb",
    accent: "#ffd43b",
    description:
      "Zeus est le chef de tous les dieux du mont Olympe. Il lance des éclairs depuis le ciel et veille sur les dieux comme sur les humains.",
    funFact:
      "Bébé, Zeus a été caché sur l'île de Crète par sa maman Rhéa, pour le protéger et le laisser grandir tranquillement !",
  },
  {
    id: "hera",
    name: "Héra",
    title: "La reine des dieux",
    domain: "Le mariage et la famille",
    symbol: "diademe",
    symbolName: "Le diadème",
    color: "#9c36b5",
    accent: "#ffd8a8",
    description:
      "Héra est la reine de l'Olympe et l'épouse de Zeus. Elle protège les mariages et les familles.",
    funFact:
      "L'animal préféré d'Héra est le paon. On raconte que les taches sur ses plumes ressemblent à des centaines d'yeux, en son honneur !",
  },
  {
    id: "poseidon",
    name: "Poséidon",
    title: "Le dieu de la mer",
    domain: "La mer et les océans",
    symbol: "trident",
    symbolName: "Le trident",
    color: "#0c8599",
    accent: "#99e9f2",
    description:
      "Poséidon est le frère de Zeus. Avec son trident, il peut soulever d'immenses vagues ou calmer la mer.",
    funFact:
      "Poséidon adore les chevaux : on raconte que c'est lui qui aurait créé le tout premier cheval !",
  },
  {
    id: "demeter",
    name: "Déméter",
    title: "La déesse des moissons",
    domain: "La nature et les récoltes",
    symbol: "epi",
    symbolName: "L'épi de blé",
    color: "#66a80f",
    accent: "#ffe066",
    description:
      "Déméter veille sur les champs, les fruits et les moissons. Grâce à elle, la terre donne de belles récoltes.",
    funFact:
      "Quand sa fille Perséphone lui manque trop, Déméter est si triste que les plantes arrêtent de pousser : c'est l'hiver !",
  },
  {
    id: "athena",
    name: "Athéna",
    title: "La déesse de la sagesse",
    domain: "La sagesse et les bonnes idées",
    symbol: "chouette",
    symbolName: "La chouette",
    color: "#5c5f66",
    accent: "#e9ecef",
    description:
      "Athéna est très intelligente et pleine de bonnes idées. Elle aide les héros à trouver des solutions astucieuses.",
    funFact:
      "Athéna n'a pas eu d'enfance : elle serait sortie tout habillée et casquée directement de la tête de son père Zeus !",
  },
  {
    id: "apollon",
    name: "Apollon",
    title: "Le dieu de la musique",
    domain: "Le soleil, la musique et la poésie",
    symbol: "lyre",
    symbolName: "La lyre",
    color: "#f59f00",
    accent: "#fff3bf",
    description:
      "Apollon adore jouer de la lyre, un instrument à cordes, pour charmer tous les dieux de l'Olympe.",
    funFact:
      "Apollon est le frère jumeau d'Artémis. À eux deux, ils forment une équipe redoutable !",
  },
  {
    id: "artemis",
    name: "Artémis",
    title: "La déesse de la chasse",
    domain: "La forêt, la lune et les animaux",
    symbol: "arc",
    symbolName: "L'arc et la flèche",
    color: "#12b886",
    accent: "#d3f9d8",
    description:
      "Artémis parcourt les forêts avec son arc. Elle protège les animaux sauvages et veille sur les enfants.",
    funFact:
      "Artémis est née juste avant son frère jumeau Apollon, et elle aurait aidé sa maman à le mettre au monde !",
  },
  {
    id: "ares",
    name: "Arès",
    title: "Le dieu de la guerre",
    domain: "Le courage au combat",
    symbol: "casque",
    symbolName: "Le casque",
    color: "#e03131",
    accent: "#ffc9c9",
    description:
      "Arès porte toujours son casque et aime foncer dans la bataille. Il représente le courage, mais aussi la bagarre.",
    funFact:
      "Arès n'est pas très apprécié sur l'Olympe : même son papa Zeus trouve qu'il aime un peu trop se disputer !",
  },
  {
    id: "aphrodite",
    name: "Aphrodite",
    title: "La déesse de l'amour",
    domain: "L'amour et la beauté",
    symbol: "coquillage",
    symbolName: "Le coquillage",
    color: "#e64980",
    accent: "#ffdeeb",
    description:
      "Aphrodite est la déesse de l'amour et de la beauté. On raconte qu'elle serait née de l'écume des vagues.",
    funFact:
      "Selon la légende, Aphrodite serait arrivée sur le rivage debout dans un immense coquillage !",
  },
  {
    id: "hephaistos",
    name: "Héphaïstos",
    title: "Le dieu forgeron",
    domain: "Le feu et la fabrication d'objets",
    symbol: "marteau",
    symbolName: "Le marteau et l'enclume",
    color: "#e8590c",
    accent: "#ffd8a8",
    description:
      "Héphaïstos travaille dans une forge magique. Avec son marteau, il fabrique des armures et des bijoux extraordinaires pour les dieux.",
    funFact:
      "Héphaïstos est le meilleur bricoleur de l'Olympe : il aurait même fabriqué des servantes en or qui l'aidaient dans son atelier !",
  },
  {
    id: "hermes",
    name: "Hermès",
    title: "Le messager des dieux",
    domain: "Les voyages et les messages",
    symbol: "sandale",
    symbolName: "Les sandales ailées",
    color: "#1c7ed6",
    accent: "#a5d8ff",
    description:
      "Grâce à ses sandales ailées, Hermès vole à toute vitesse pour porter les messages de Zeus partout sur Terre.",
    funFact:
      "Le jour même de sa naissance, bébé Hermès aurait déjà inventé la lyre en utilisant une carapace de tortue !",
  },
  {
    id: "dionysos",
    name: "Dionysos",
    title: "Le dieu de la fête",
    domain: "La vigne et les grandes fêtes",
    symbol: "raisin",
    symbolName: "La grappe de raisin",
    color: "#ae3ec9",
    accent: "#eebefa",
    description:
      "Dionysos aime la musique, la danse et les grandes fêtes. C'est lui qui aurait appris aux hommes à cultiver la vigne.",
    funFact:
      "Partout où va Dionysos, on raconte qu'une joyeuse procession de danseurs et de musiciens le suit !",
  },
  {
    id: "hades",
    name: "Hadès",
    title: "Le dieu des Enfers",
    domain: "Le monde souterrain",
    symbol: "cle",
    symbolName: "La clé des Enfers",
    color: "#343a40",
    accent: "#b197fc",
    description:
      "Hadès est le frère de Zeus. Il règne calmement sur le monde souterrain et garde la clé de son royaume.",
    funFact:
      "Hadès possèderait un casque magique qui le rend complètement invisible !",
  },
  {
    id: "persephone",
    name: "Perséphone",
    title: "La déesse du printemps",
    domain: "Le printemps et les fleurs",
    symbol: "grenade",
    symbolName: "La grenade",
    color: "#f06595",
    accent: "#b2f2bb",
    description:
      "Perséphone est la fille de Déméter. Quand elle revient sur Terre chaque année, les fleurs se mettent à pousser.",
    funFact:
      "Perséphone partage son année en deux : une partie sur Terre au printemps, une partie aux Enfers. C'est pour cela qu'il y a les saisons !",
  },
  {
    id: "heracles",
    name: "Héraclès",
    title: "Le héros le plus fort",
    domain: "La force et le courage",
    symbol: "massue",
    symbolName: "La massue",
    color: "#a15c2a",
    accent: "#ffe8cc",
    description:
      "Héraclès est le héros le plus fort de toute la Grèce. Il a réalisé douze travaux extraordinaires pour prouver sa valeur.",
    funFact:
      "On raconte que bébé Héraclès était déjà si fort qu'il aurait attrapé deux serpents dans son berceau sans avoir peur !",
  },
  {
    id: "pan",
    name: "Pan",
    title: "Le dieu des bergers",
    domain: "Les forêts et la nature",
    symbol: "flute",
    symbolName: "La flûte de Pan",
    color: "#2f9e44",
    accent: "#d8f5a2",
    description:
      "Pan vit dans les forêts avec les bergers et les animaux. Il joue d'un instrument à plusieurs tubes appelé flûte de Pan.",
    funFact:
      "Quand Pan poussait un grand cri surprise dans la forêt, tout le monde s'enfuyait terrorisé... c'est de son nom que vient le mot « panique » !",
  },
];

function getGod(id) {
  return GODS.find((g) => g.id === id) || null;
}

function randomGods(count, excludeIds) {
  const pool = GODS.filter((g) => !excludeIds || !excludeIds.includes(g.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
