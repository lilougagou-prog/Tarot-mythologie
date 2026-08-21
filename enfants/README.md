# Mini Olympe

Application web (PWA) pour enfants dès 6 ans, pour découvrir les dieux et héros de la mythologie grecque en s'amusant. Entièrement indépendante de l'application « Tarot de Delphes » à la racine du dépôt : pas de backend, pas de dépendance. La plupart des icônes (galerie, coloriage par défaut) sont du SVG généré en JavaScript ; certains dieux ont en plus une illustration (coloriage, portrait, attribut) fournie en image.

Pour la tester en local : servir ce dossier avec n'importe quel serveur statique (ex. `npx serve enfants` ou `python3 -m http.server` depuis `enfants/`) et ouvrir `index.html`. Le déploiement se fait comme un site statique classique, à l'adresse `/enfants/`.

## Contenu
17 fiches (les 12 Olympiens + Hadès, Perséphone, Héraclès, Pan et Hestia), chacune avec un nom, un titre, un domaine, un symbole, une description et une « info rigolote », pensées pour un enfant de 6 ans (pas de scène violente ou effrayante).

## Mini-jeux
- **Coloriage** — deux moteurs cohabitent : pour les dieux listés dans `COLORING_IMAGES` (`game-coloriage.js`, 12 des 17 à ce jour), une illustration dessinée (PNG, `assets/coloriage/`) coloriable au « pot de peinture » (remplissage par glisser ou par clic, façon pinceau, borné par les traits noirs) ; pour les autres, l'emblème SVG généré en JS (fond, couronne de laurier, symbole, étoiles), colorié région par région. Pour ajouter une illustration à un dieu qui n'en a pas encore : déposer le PNG dans `assets/coloriage/` et ajouter une entrée dans `COLORING_IMAGES`. Palette de 18 couleurs (dont 4 tons de peau). Bouton « Enregistrer » : partage natif du dessin colorié sur mobile (`navigator.share`, permet d'enregistrer dans Photos), téléchargement classique en repli.
- **Objets cachés** — vraie chasse aux symboles façon « cherche et trouve » : une grande scène illustrée (`assets/objets/`) et une liste de symboles à repérer et cocher. Les coordonnées de chaque symbole (`HIDDEN_SCENES` dans `game-objets.js`) sont en pourcentage de l'image, repérées à l'œil sur la scène. Pour ajouter une scène : déposer l'image, puis noter les coordonnées de chaque symbole (une grille de repérage aide beaucoup, voir l'historique du projet).
- **Labyrinthe** — labyrinthe généré aléatoirement (3 niveaux de difficulté), à parcourir au clavier, à la souris ou au D-pad tactile pour retrouver un dieu, avec Astérion (le Minotaure — mascotte volontairement mignonne et souriante, pas du tout effrayante) comme personnage guidé.
- **Mémo** — retrouver les deux cartes identiques (portrait illustré des 17 dieux, `PORTRAIT_IMAGES` dans `data.js`), en 6 ou 8 paires, sans texte sur les cartes.
- **Retrouve les attributs** — associer chaque carte-attribut (`ATTRIBUTE_IMAGES`) au portrait du bon dieu (clic sur l'attribut puis sur le portrait), par manches de 6, sur les 17 dieux.

La galerie des dieux et les fiches détaillées utilisent aussi les portraits (`PORTRAIT_IMAGES`) quand ils existent, sinon l'emblème SVG.

La progression (dieux découverts, coloriages terminés, parties jouées) est enregistrée dans `localStorage`, sur l'appareil de l'enfant.

## Structure
- `index.html` — structure de la page, chargement des polices (Baloo 2) et des scripts
- `styles.css` — tous les styles
- `data.js` — fiches des 17 dieux/héros (`GODS`), `PORTRAIT_IMAGES`/`ATTRIBUTE_IMAGES` (les 17), `shuffleArray`/`randomGods`
- `icons.js` — bibliothèque de symboles vectoriels dessinés en JS (`SYMBOLS`), rendu en badge plat ou en régions coloriables, + gabarit de page de coloriage (`buildColoringPage`)
- `progress.js` — progression (`localStorage`) et animation de confettis
- `app.js` — routeur (hash-based), écran d'accueil, galerie des dieux, fiche détaillée
- `game-coloriage.js`, `game-objets.js`, `game-labyrinthe.js`, `game-memo.js`, `game-attributs.js` — un fichier par mini-jeu
- `manifest.json` + `icon.svg` + `service-worker.js` — installation en PWA et cache offline (scope limité à `enfants/`, indépendant du service worker de l'app racine)

## Ajouter un dieu ou un héros
1. Ajouter une entrée dans `GODS` (`data.js`) avec un `id` unique et un `symbol` (identifiant de symbole).
2. Ajouter le symbole correspondant dans `SYMBOLS` (`icons.js`) : une ou plusieurs « parties » (`parts`), chacune devenant une région coloriable indépendante.

Tout le reste (galerie, coloriage, objets cachés, labyrinthe, mémo) s'adapte automatiquement à la liste `GODS`.
