# Tarot de Delphes

Application web (PWA) de tarot mythologique grec — tirage interactif, lecture personnalisée générée par IA, bibliothèque de symboles, journal.

## Structure
- `index.html` — structure de la page
- `styles.css` — tous les styles (police Cinzel/EB Garamond, thème "divinatoire", animation de chargement en étoiles)
- `app.js` — toute la logique (données des cartes, symboles, tirage, navigation, appel au backend IA)
- `assets/` — 16 illustrations d'arcanes majeurs (Le Mat, Bateleur, Papesse, Impératrice, Empereur, Pape, Amoureux, Chariot, Justice, Hermite, Roue de Fortune, Force, Pendu, Arcane sans nom, Tempérance, Diable) ; les 6 autres arcanes majeurs + 56 cartes mineures utilisent un glyphe emoji en attendant leurs illustrations. 4 illustrations (`learn-*.jpg`) pour les cases de l'onglet Apprendre, et 4 illustrations (`suit-*.jpg`) pour les 4 enseignes dans les sous-sections « Figures de cour » et « Cartes numérales ».
- `manifest.json` + `icon.svg` — nécessaires pour l'installation en PWA
- `service-worker.js` — cache offline
- `api/reading.js` — backend serverless (Vercel) qui appelle l'API Anthropic côté serveur
- `api/astral.js` — backend serverless (Vercel) qui calcule un profil astral (thème natal) à partir d'une date/heure/lieu de naissance
- `package.json` — dépendances `@anthropic-ai/sdk` (`api/reading.js`), `luxon` + `astronomy-engine` (`api/astral.js`)

## Lecture générée par IA — comment ça marche
La fonction `generateAIReading(question, cards)` dans `app.js` envoie `{question, cards}` en `POST` vers `/api/reading`. Cette fonction serverless (`api/reading.js`) :
1. reconstruit le prompt exact (tarologue professionnel, format JSON strict),
2. appelle l'API Anthropic avec la clé stockée dans la variable d'environnement **`ANTHROPIC_API_KEY`** (jamais exposée au navigateur),
3. renvoie `{card1, card2, card3, synthesis}` au client.

Si l'appel échoue ou dépasse 15 secondes, l'app bascule automatiquement sur un texte généré localement (`synthesisParagraphs` / `interpretationFor`) — l'utilisateur n'est jamais bloqué.

### Protéger l'usage IA (recommandé tant que l'appli est personnelle)
Coût réel : ~1 centime par tirage (facturation à l'usage sur console.anthropic.com, indépendante d'un éventuel abonnement Claude.ai — les deux sont des produits distincts). Pour éviter que quelqu'un d'autre qui tomberait sur l'URL de l'appli déclenche des appels avec ta clé :
- Définir une variable d'environnement **`APP_ACCESS_CODE`** (n'importe quelle chaîne secrète). Tant qu'elle est définie, le backend refuse toute requête qui ne fournit pas ce même code — l'appli le demande une fois côté client et le mémorise.
- Recommandé en complément, quel que soit l'usage : fixer un **plafond de dépense mensuel strict** sur console.anthropic.com (Settings → Limits) pour ne jamais pouvoir dépasser un montant que tu choisis.
- Pour ouvrir l'appli à d'autres plus tard : supprimer `APP_ACCESS_CODE` sur Vercel — aucun changement de code nécessaire. Penser alors à revoir le plafond de dépense en conséquence.

## Profil astral — comment ça marche
`POST /api/astral` (`api/astral.js`) calcule un thème astral complet à partir d'une date, heure et lieu de naissance. Reçoit `{ date: "AAAA-MM-JJ", time: "HH:MM", place: string }` (heure **locale** au lieu de naissance) et renvoie :
```json
{
  "resolvedPlace": "Lyon, Rhône-Alpes, France",
  "latitude": 45.75, "longitude": 4.85,
  "timezone": "Europe/Paris",
  "utcInstant": "1990-07-15T12:00:00.000Z",
  "sunSign": "Cancer", "moonSign": "Bélier",
  "bodies": {
    "sun": { "longitude": 112.75, "sign": "Cancer", "degreeInSign": 22.75, "retrograde": false },
    "moon": { "...": "..." },
    "mercury": {}, "venus": {}, "mars": {}, "jupiter": {}, "saturn": {}, "uranus": {}, "neptune": {}, "pluto": {}
  }
}
```
Pipeline en 3 étapes, chacune sur un service/bibliothèque activement maintenu :
1. **Géocodage** — [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) (gratuite, sans clé) : convertit le lieu en latitude/longitude, et renvoie directement le **fuseau IANA** du lieu (ex. `"Europe/Paris"`) via GeoNames.
2. **Heure UTC exacte** — [Luxon](https://moment.github.io/luxon/) convertit l'heure locale dans ce fuseau, en tenant compte des règles historiques de changement d'heure (base IANA intégrée à Node). Un contrôle maison détecte les heures locales qui n'ont jamais existé (le "trou" d'un passage à l'heure d'été) et renvoie une erreur claire plutôt que de laisser Luxon deviner silencieusement.
3. **Positions planétaires** — [astronomy-engine](https://github.com/cosinekitty/astronomy) calcule la longitude écliptique géocentrique "de la date" de chaque corps (Soleil à Pluton), d'où sont dérivés signe zodiacal, degré dans le signe et rétrogradation.

**Pas encore implémenté** (maisons astrologiques Placidus + ascendant + aspects entre planètes) — prévu par-dessus les mêmes calculs d'astronomy-engine (temps sidéral local, obliquité de l'écliptique), sans dépendance supplémentaire.

**Vie privée** : la date/heure/lieu de naissance ne sont utilisées que le temps du calcul (fonction serverless sans état, rien n'est journalisé ni persisté côté serveur) — c'est au client de les garder en `localStorage` s'il veut les réutiliser. Même protection optionnelle `APP_ACCESS_CODE` que `/api/reading` (en-tête `X-App-Access-Code`).

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
- Navigation 5 onglets (Accueil / Tirage / Apprendre / Symboles / Journal)
- Tirage : pioche de 15 cartes face cachée, l'utilisateur en choisit 3 ; lecture personnalisée générée par IA avec animation de chargement (étoiles dorées scintillantes)
- Bibliothèque de ~70 symboles, classés par catégorie, tous cliquables et reliés aux cartes/divinités ; position de scroll préservée à la navigation
- Détail de carte enrichi : lecture Tarot de Marseille + éclairage mythologique pour les 22 arcanes majeurs
- Sauvegarde locale (localStorage) : journal des tirages + état du tirage en cours (persiste même après fermeture du navigateur)
- Animations légères dans toute l'app : illustrations avec léger zoom/pan continu + halo scintillant, transition douce entre écrans, micro-interactions au toucher, retournement des cartes du tirage, barre de progression et lecture qui s'animent (respecte la préférence système « réduire les animations »)

## Pistes de suite possibles (non bloquantes)
- Ajouter les illustrations des 6 arcanes majeurs restants + 56 cartes mineures (même gabarit que `assets/`, 500px de large, JPEG qualité ~78)
- Lecture enrichie similaire (Marseille + mythologie) pour les cartes mineures — actuellement seuls les 22 majeurs ont la double lecture
- Profil astral : maisons Placidus + ascendant + aspects (`api/astral.js`), puis l'écran « Profil astral » côté client et le lien avec les arcanes majeurs via les correspondances zodiaque/planètes ↔ divinités déjà présentes dans `MAJORS`
- Système de compte / sync cloud si l'app doit devenir multi-appareil (actuellement tout est en localStorage, donc local à l'appareil)
- Emballage en app native (Capacitor) pour publication App Store / Google Play
- Suivi des coûts d'API si l'usage grandit (chaque tirage = un appel Claude ; prévoir un cache ou une limite si le trafic augmente)
