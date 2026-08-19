# Tarot de Delphes

Application web (PWA) de tarot mythologique grec — tirage interactif, lecture personnalisée générée par IA, bibliothèque de symboles, journal.

## Structure
- `index.html` — structure de la page
- `styles.css` — tous les styles (police Cinzel/EB Garamond, thème "divinatoire", animation de chargement en étoiles)
- `app.js` — toute la logique (données des cartes, symboles, tirage, navigation, appel au backend IA)
- `assets/` — 21 illustrations d'arcanes majeurs sur 22 (Le Mat, Bateleur, Papesse, Impératrice, Empereur, Pape, Amoureux, Chariot, Justice, Hermite, Roue de Fortune, Force, Pendu, Arcane sans nom, Tempérance, Diable, Maison-Dieu, Étoile, Lune, Soleil, Monde) ; seul Le Jugement + les 56 cartes mineures utilisent encore un glyphe emoji en attendant leur illustration. 4 illustrations (`learn-*.jpg`) pour les cases de l'onglet Apprendre, et 4 illustrations (`suit-*.jpg`) pour les 4 enseignes dans les sous-sections « Figures de cour » et « Cartes numérales ».
- `manifest.json` + `icon.svg` — nécessaires pour l'installation en PWA
- `service-worker.js` — cache offline
- `api/reading.js` — backend serverless (Vercel) qui appelle l'API Anthropic côté serveur
- `api/astral.js` — backend serverless (Vercel) qui calcule un profil astral (thème natal) à partir d'une date/heure/lieu de naissance
- `package.json` — dépendances `@anthropic-ai/sdk` (`api/reading.js`), `luxon` + `astronomy-engine` (`api/astral.js`)

## Lecture générée par IA — comment ça marche
La fonction `generateAIReading(question, cards, positions)` dans `app.js` envoie `{question, cards, positions}` en `POST` vers `/api/reading` — `positions` (les intitulés des positions du tirage choisi, ex. « Défi », « Résultat ») donne à l'IA le sens de chaque carte dans les tirages autres que le tirage général. Cette fonction serverless (`api/reading.js`), agnostique du type de tirage (1 à 12 cartes, voir `SPREADS` dans `app.js`) :
1. reconstruit le prompt exact (tarologue professionnel, format JSON strict, tient compte des positions si fournies),
2. appelle l'API Anthropic avec la clé stockée dans la variable d'environnement **`ANTHROPIC_API_KEY`** (jamais exposée au navigateur),
3. renvoie `{cards: [...], synthesis}` au client (un texte par carte, dans le même ordre, quel que soit le nombre de cartes du tirage).

Si l'appel échoue ou dépasse 15 secondes, l'app bascule automatiquement sur un texte généré localement (`synthesisParagraphs`/`synthesisParagraphsGeneric` selon le tirage, `interpretationFor`) — l'utilisateur n'est jamais bloqué.

### Protéger l'usage IA (recommandé tant que l'appli est personnelle)
Coût réel : de l'ordre du centime par tirage, variable selon le nombre de cartes (facturation à l'usage sur console.anthropic.com, indépendante d'un éventuel abonnement Claude.ai — les deux sont des produits distincts ; les grands tirages comme la Croix celtique ou l'Année à venir coûtent proportionnellement plus qu'un tirage à 1 ou 3 cartes). Pour éviter que quelqu'un d'autre qui tomberait sur l'URL de l'appli déclenche des appels avec ta clé :
- Définir une variable d'environnement **`APP_ACCESS_CODE`** (n'importe quelle chaîne secrète). Tant qu'elle est définie, le backend refuse toute requête qui ne fournit pas ce même code — l'appli le demande une fois côté client et le mémorise.
- Recommandé en complément, quel que soit l'usage : fixer un **plafond de dépense mensuel strict** sur console.anthropic.com (Settings → Limits) pour ne jamais pouvoir dépasser un montant que tu choisis.
- Pour ouvrir l'appli à d'autres plus tard : supprimer `APP_ACCESS_CODE` sur Vercel — aucun changement de code nécessaire. Penser alors à revoir le plafond de dépense en conséquence.

## Profil astral — comment ça marche
`POST /api/astral` (`api/astral.js`) calcule un thème astral complet à partir d'une date, heure et lieu de naissance. Reçoit `{ date: "AAAA-MM-JJ", time: "HH:MM" | null, place: string }` (heure **locale** au lieu de naissance ; `time: null` pour une heure de naissance inconnue — voir plus bas) et renvoie :
```json
{
  "resolvedPlace": "Lyon, Rhône-Alpes, France",
  "latitude": 45.75, "longitude": 4.85,
  "timezone": "Europe/Paris",
  "utcInstant": "1990-07-15T12:00:00.000Z",
  "timeUnknown": false,
  "sunSign": "Cancer", "moonSign": "Bélier",
  "ascendant": { "longitude": 201.02, "sign": "Balance", "degreeInSign": 21.02 },
  "midheaven": { "longitude": 115.94, "sign": "Cancer", "degreeInSign": 25.94 },
  "houseSystem": "placidus",
  "houseCusps": [{ "house": 1, "longitude": 201.02 }, "... x12"],
  "houseWarning": null,
  "bodies": {
    "sun": { "longitude": 112.75, "sign": "Cancer", "degreeInSign": 22.75, "house": 9, "retrograde": false },
    "moon": { "...": "..." },
    "mercury": {}, "venus": {}, "mars": {}, "jupiter": {}, "saturn": {}, "uranus": {}, "neptune": {}, "pluto": {}
  },
  "aspects": [{ "bodies": ["sun", "jupiter"], "type": "conjonction", "angle": 0, "orb": 0.2 }, "..."]
}
```
Pipeline en 5 étapes, chacune sur un service/bibliothèque activement maintenu (ou sur des formules maison, pour les étapes 4-5) :
1. **Géocodage** — [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) (gratuite, sans clé) : convertit le lieu en latitude/longitude, et renvoie directement le **fuseau IANA** du lieu (ex. `"Europe/Paris"`) via GeoNames.
2. **Heure UTC exacte** — [Luxon](https://moment.github.io/luxon/) convertit l'heure locale dans ce fuseau, en tenant compte des règles historiques de changement d'heure (base IANA intégrée à Node). Un contrôle maison détecte les heures locales qui n'ont jamais existé (le "trou" d'un passage à l'heure d'été) et renvoie une erreur claire plutôt que de laisser Luxon deviner silencieusement.
3. **Positions planétaires** — [astronomy-engine](https://github.com/cosinekitty/astronomy) calcule la longitude écliptique géocentrique "de la date" de chaque corps (Soleil à Pluton), d'où sont dérivés signe zodiacal, degré dans le signe et rétrogradation.
4. **Maisons (Placidus) + Ascendant/MC** — calculés à la main par-dessus l'obliquité de l'écliptique et le temps sidéral local que fournit déjà astronomy-engine (pas de dépendance supplémentaire). Algorithme porté d'une implémentation vérifiée contre `swe_houses` (Swiss Ephemeris) à ~1.5' près par la communauté d'astronomy-engine ([discussion #391](https://github.com/cosinekitty/astronomy/discussions/391)). Le système Placidus devient peu fiable au-delà d'environ 66,5° de latitude (cercles polaires) : `houseWarning` le signale dans la réponse plutôt que de renvoyer un résultat silencieusement dégradé.
5. **Aspects** — conjonction, sextile, carré, trigone, opposition entre chaque paire de corps, avec un orbe de 6 à 8° selon le type.

**Heure de naissance inconnue** : envoyer `time: null` fait calculer le thème à midi local (convention standard) ; `timeUnknown: true` et `ascendant`/`midheaven`/`houseCusps`/`houseWarning`/`bodies.*.house` valent `null` dans la réponse (une heure précise est indispensable pour ces calculs-là), mais signes et aspects restent fiables et sont toujours renvoyés.

**Vie privée** : la date/heure/lieu de naissance ne sont utilisées que le temps du calcul (fonction serverless sans état, rien n'est journalisé ni persisté côté serveur) — c'est au client de les garder en `localStorage` s'il veut les réutiliser. Même protection optionnelle `APP_ACCESS_CODE` que `/api/reading` (en-tête `X-App-Access-Code`).

### Client : onglet Profil
Barre du bas → **Profil** → deux cases, **Profil astral** et **Journal** (l'ancien onglet Journal a fusionné ici). Première visite de « Profil astral » : formulaire (prénom, date/heure/lieu de naissance, case « heure inconnue ») → appel à `/api/astral` → tout le résultat mis en cache dans `localStorage` (`delphesProfile`, jamais renvoyé au serveur ensuite) ; les visites suivantes affichent directement le résultat, avec un bouton « Modifier mes informations » qui rouvre le formulaire prérempli.

Le prénom reçoit en plus une **numérologie** (`nameNumerology()` dans `app.js`, méthode pythagoricienne classique réduite à 1-9, volontairement sans nombre maître 11/22/33) dont la signification réutilise directement `NUMBER_KEYS`, la même grammaire symbolique que les cartes numérales.

Quand un profil est enregistré, `generateAIReading()` envoie automatiquement un résumé (`profileForReading()` : prénom, nombre numérologique, signes solaire/lunaire/ascendant) à `/api/reading`, qui l'intègre avec subtilité à la lecture si c'est pertinent — sans jamais devenir un horoscope générique ni éclipser les cartes tirées. Sans profil enregistré, la lecture se comporte exactement comme avant.

## Déployer sur Vercel

Vercel héberge en un seul projet le site statique (racine du repo) et la fonction backend (`api/reading.js`) — c'est l'option la plus simple pour ce projet.

1. Créer une clé API sur [console.anthropic.com](https://console.anthropic.com) (nécessite un moyen de paiement configuré) et, si souhaité, y fixer un plafond de dépense mensuel (Settings → Limits).
2. Sur [vercel.com](https://vercel.com), **New Project** → importer ce dépôt GitHub.
3. Aucune configuration de build n'est nécessaire (site statique + dossier `api/` détectés automatiquement).
4. Dans **Settings → Environment Variables**, ajouter :
   - `ANTHROPIC_API_KEY` = la clé créée à l'étape 1 (cocher Production, Preview et Development).
   - `APP_ACCESS_CODE` = un code secret de ton choix (voir ci-dessus ; optionnel mais recommandé tant que l'appli est personnelle).
5. Déployer. Vercel donne une URL du type `https://ton-projet.vercel.app/`.

Pour tester en local avec la CLI Vercel :
```bash
npm install
cp .env.example .env   # puis renseigner ANTHROPIC_API_KEY (et APP_ACCESS_CODE si souhaité)
npx vercel dev
```

*(Netlify fonctionne aussi selon un principe identique : Netlify Functions à la place du dossier `api/`, et la même variable d'environnement dans Site settings → Environment variables — mais nécessiterait d'adapter `api/reading.js` au format Netlify Functions.)*

## Installer sur iPhone une fois déployé
1. Ouvrir l'URL de déploiement (Vercel) dans Safari sur l'iPhone.
2. Appuyer sur Partager → Ajouter à l'écran d'accueil → Ajouter.
3. L'application apparaît avec son icône et s'ouvre comme une app, y compris hors ligne (sauf la lecture IA, qui a besoin du réseau — avec repli automatique sinon).

## État actuel du reste de l'app
- Navigation 5 onglets (Accueil / Tirage / Apprendre / Symboles / Profil)
- Tirage : 5 types de tirage au choix (`SPREADS` dans `app.js`), écran de sélection animé (halo scintillant + pluie d'étoiles) — Tirage général (3 cartes, pioche de 15), Oui/Non (1 carte, pioche de 9), Amour (3 cartes — Toi / L'autre / La relation, pioche de 15), Croix celtique (10 cartes avec position dédiée pour chacune, pioche de 24), Année à venir (12 cartes, une par mois, pioche de 24). Bouton « ← Changer de tirage » pour revenir à la sélection. Lecture personnalisée générée par IA (tient compte de la position de chaque carte dans le tirage), avec animation de chargement (étoiles dorées scintillantes) et repli local si l'IA ne répond pas, enrichie par le Profil astral quand il existe
- Bibliothèque de 86 symboles et nombres, triés par ordre alphabétique, tous cliquables et reliés aux cartes/divinités ; position de scroll préservée à la navigation
- Détail de carte enrichi : lecture Tarot de Marseille + éclairage mythologique pour les 22 arcanes majeurs
- Profil : Profil astral (thème natal complet + numérologie du prénom) et Journal des tirages passés, tous les deux en localStorage. Le Journal garde la lecture complète (texte par carte + synthèse, IA ou générée hors-ligne), pas seulement les noms des cartes — repliable sous « Revoir la lecture complète » sur chaque entrée. Ré-enregistrer un tirage déjà sauvegardé met à jour l'entrée existante plutôt que d'en créer une en double.
- Progression personnelle (onglet Apprendre) : score composite (`learningProgress()`) sur ce qui a été réellement **consulté en détail**, pas seulement tiré — 60% cartes (78), 20% figures mythologiques (58), 20% symboles et nombres (86), chaque fiche comptée une seule fois même revisitée (`markSeen()`/`seenCount()`, `localStorage`)
- Apprendre met en avant les arcanes majeurs liés à ton profil astral (Soleil/Lune/Ascendant), via une table de correspondance zodiaque ↔ arcane majeur (`ZODIAC_MAJOR_LINKS`, tradition ésotérique classique) — n'apparaît que si un Profil astral est enregistré
- Carte du jour enrichie (accueil) : répartie sur les 365/366 jours de l'année (au lieu des 1-31 jours du mois, qui faisait retomber le 1er de chaque mois sur la même carte), avec un extrait de sa lecture mythologique affiché directement, un signalement si elle résonne avec le profil astral enregistré, et une **série de jours consécutifs** (`updateStreak()`, `localStorage`) qui s'incrémente à la première visite de chaque jour
- Animations légères dans toute l'app : illustrations avec léger zoom/pan continu + halo scintillant, transition douce entre écrans, micro-interactions au toucher, retournement des cartes du tirage, barre de progression et lecture qui s'animent (respecte la préférence système « réduire les animations »)

## Pistes de suite possibles (non bloquantes)
- Ajouter l'illustration du dernier arcane majeur (Le Jugement) + 56 cartes mineures (même gabarit que `assets/`, 500px de large, JPEG qualité ~78)
- Lecture enrichie similaire (Marseille + mythologie) pour les cartes mineures — actuellement seuls les 22 majeurs ont la double lecture
- Système de compte / sync cloud si l'app doit devenir multi-appareil (actuellement tout est en localStorage, donc local à l'appareil)
- Emballage en app native (Capacitor) pour publication App Store / Google Play
- Suivi des coûts d'API si l'usage grandit (chaque tirage = un appel Claude ; prévoir un cache ou une limite si le trafic augmente)
