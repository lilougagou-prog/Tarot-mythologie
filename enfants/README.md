# Mini Olympe

Application web (PWA) pour enfants dès 6 ans, pour découvrir les dieux et héros de la mythologie grecque en s'amusant. Entièrement indépendante de l'application « Tarot de Delphes » à la racine du dépôt : pas de backend, pas de dépendance, aucune image externe (tout est en SVG généré en JavaScript).

Pour la tester en local : servir ce dossier avec n'importe quel serveur statique (ex. `npx serve enfants` ou `python3 -m http.server` depuis `enfants/`) et ouvrir `index.html`. Le déploiement se fait comme un site statique classique, à l'adresse `/enfants/`.

## Contenu
16 fiches (les 12 Olympiens + Hadès, Perséphone, Héraclès et Pan), chacune avec un nom, un titre, un domaine, un symbole, une description et une « info rigolote », pensées pour un enfant de 6 ans (pas de scène violente ou effrayante).

## Mini-jeux
- **Coloriage** — deux moteurs cohabitent : pour les dieux listés dans `COLORING_IMAGES` (`game-coloriage.js`), une illustration dessinée (PNG, `assets/coloriage/`) coloriable au « pot de peinture » (remplissage par propagation sur canvas, borné par les traits noirs) ; pour les autres, l'emblème SVG généré en JS (fond, couronne de laurier, symbole, étoiles), colorié région par région. Pour ajouter une illustration à un dieu qui n'en a pas encore : déposer le PNG dans `assets/coloriage/` et ajouter une entrée dans `COLORING_IMAGES`.
- **Objets cachés** — retrouver les symboles dispersés dans une scène et les associer au bon dieu.
- **Labyrinthe** — labyrinthe généré aléatoirement (3 niveaux de difficulté), à parcourir au clavier, à la souris ou au D-pad tactile, pour retrouver un dieu.
- **Mémo** — jeu de paires classique (carte « nom du dieu » ↔ carte « symbole »), en 6 ou 8 paires.

La progression (dieux découverts, coloriages terminés, parties jouées) est enregistrée dans `localStorage`, sur l'appareil de l'enfant.

## Structure
- `index.html` — structure de la page, chargement des polices (Baloo 2) et des scripts
- `styles.css` — tous les styles
- `data.js` — fiches des 16 dieux/héros (`GODS`)
- `icons.js` — bibliothèque de 16 symboles vectoriels dessinés en JS (`SYMBOLS`), rendu en badge plat ou en régions coloriables, + gabarit de page de coloriage (`buildColoringPage`)
- `progress.js` — progression (`localStorage`) et animation de confettis
- `app.js` — routeur (hash-based), écran d'accueil, galerie des dieux, fiche détaillée
- `game-coloriage.js`, `game-objets.js`, `game-labyrinthe.js`, `game-memo.js` — un fichier par mini-jeu
- `manifest.json` + `icon.svg` + `service-worker.js` — installation en PWA et cache offline (scope limité à `enfants/`, indépendant du service worker de l'app racine)

## Ajouter un dieu ou un héros
1. Ajouter une entrée dans `GODS` (`data.js`) avec un `id` unique et un `symbol` (identifiant de symbole).
2. Ajouter le symbole correspondant dans `SYMBOLS` (`icons.js`) : une ou plusieurs « parties » (`parts`), chacune devenant une région coloriable indépendante.

Tout le reste (galerie, coloriage, objets cachés, labyrinthe, mémo) s'adapte automatiquement à la liste `GODS`.
