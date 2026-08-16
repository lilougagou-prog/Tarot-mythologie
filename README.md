# Tarot de Delphes

Application web (PWA) de tarot mythologique grec — tirage interactif, lecture personnalisée générée par IA, bibliothèque de symboles, journal.

## Structure
- `index.html` — structure de la page
- `styles.css` — tous les styles (police Cinzel/EB Garamond, thème "divinatoire", animation de chargement en étoiles)
- `app.js` — toute la logique (données des cartes, symboles, tirage, navigation, appel au backend IA)
- `assets/` — 6 illustrations de cartes (Le Mat, Bateleur, Papesse, Impératrice, Empereur, Amoureux) ; les 16 autres arcanes majeurs + 56 cartes mineures utilisent un glyphe emoji en attendant leurs illustrations
- `manifest.json` + `icon.svg` — nécessaires pour l'installation en PWA
- `service-worker.js` — cache offline
- `api/reading.js` — backend serverless (Vercel) qui appelle l'API Anthropic côté serveur
- `package.json` — dépendance `@anthropic-ai/sdk` utilisée par `api/reading.js`

## Lecture générée par IA — comment ça marche
La fonction `generateAIReading(question, cards)` dans `app.js` envoie `{question, cards}` en `POST` vers `/api/reading`. Cette fonction serverless (`api/reading.js`) :
1. reconstruit le prompt exact (tarologue professionnel, format JSON strict),
2. appelle l'API Anthropic avec la clé stockée dans la variable d'environnement **`ANTHROPIC_API_KEY`** (jamais exposée au navigateur),
3. renvoie `{card1, card2, card3, synthesis}` au client.

Si l'appel échoue ou dépasse 15 secondes, l'app bascule automatiquement sur un texte généré localement (`synthesisParagraphs` / `interpretationFor`) — l'utilisateur n'est jamais bloqué.

## Déployer sur Vercel

Vercel héberge en un seul projet le site statique (racine du repo) et la fonction backend (`api/reading.js`) — c'est l'option la plus simple pour ce projet.

1. Créer une clé API sur [console.anthropic.com](https://console.anthropic.com) (nécessite un moyen de paiement configuré).
2. Sur [vercel.com](https://vercel.com), **New Project** → importer ce dépôt GitHub.
3. Aucune configuration de build n'est nécessaire (site statique + dossier `api/` détectés automatiquement).
4. Dans **Settings → Environment Variables**, ajouter :
   - `ANTHROPIC_API_KEY` = la clé créée à l'étape 1 (cocher Production, Preview et Development).
5. Déployer. Vercel donne une URL du type `https://ton-projet.vercel.app/`.

Pour tester en local avec la CLI Vercel :
```bash
npm install
cp .env.example .env   # puis renseigner ANTHROPIC_API_KEY
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

## Pistes de suite possibles (non bloquantes)
- Ajouter les illustrations des 16 arcanes majeurs restants + 56 cartes mineures (même gabarit que `assets/`, 500px de large, JPEG qualité ~78)
- Lecture enrichie similaire (Marseille + mythologie) pour les cartes mineures — actuellement seuls les 22 majeurs ont la double lecture
- Système de compte / sync cloud si l'app doit devenir multi-appareil (actuellement tout est en localStorage, donc local à l'appareil)
- Emballage en app native (Capacitor) pour publication App Store / Google Play
- Suivi des coûts d'API si l'usage grandit (chaque tirage = un appel Claude ; prévoir un cache ou une limite si le trafic augmente)
