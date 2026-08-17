# Tarot de Delphes

Application web (PWA) de tarot mythologique grec — tirage interactif, lecture personnalisée générée par IA, bibliothèque de symboles, journal.

## Structure
- `index.html` — structure de la page
- `styles.css` — tous les styles (police Cinzel/EB Garamond, thème "divinatoire", animation de chargement en étoiles)
- `app.js` — toute la logique (données des cartes, symboles, tirage, navigation, appel au backend IA)
- `assets/` — 6 illustrations de cartes (Le Mat, Bateleur, Papesse, Impératrice, Empereur, Amoureux) ; les 16 autres arcanes majeurs + 56 cartes mineures utilisent un glyphe emoji en attendant leurs illustrations. 4 illustrations supplémentaires (`learn-*.jpg`) pour les cases de l'onglet Apprendre.
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

### Protéger l'usage IA (recommandé tant que l'appli est personnelle)
Coût réel : ~1 centime par tirage (facturation à l'usage sur console.anthropic.com, indépendante d'un éventuel abonnement Claude.ai — les deux sont des produits distincts). Pour éviter que quelqu'un d'autre qui tomberait sur l'URL de l'appli déclenche des appels avec ta clé :
- Définir une variable d'environnement **`APP_ACCESS_CODE`** (n'importe quelle chaîne secrète). Tant qu'elle est définie, le backend refuse toute requête qui ne fournit pas ce même code — l'appli le demande une fois côté client et le mémorise.
- Recommandé en complément, quel que soit l'usage : fixer un **plafond de dépense mensuel strict** sur console.anthropic.com (Settings → Limits) pour ne jamais pouvoir dépasser un montant que tu choisis.
- Pour ouvrir l'appli à d'autres plus tard : supprimer `APP_ACCESS_CODE` sur Vercel — aucun changement de code nécessaire. Penser alors à revoir le plafond de dépense en conséquence.

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

## Pistes de suite possibles (non bloquantes)
- Ajouter les illustrations des 16 arcanes majeurs restants + 56 cartes mineures (même gabarit que `assets/`, 500px de large, JPEG qualité ~78)
- Lecture enrichie similaire (Marseille + mythologie) pour les cartes mineures — actuellement seuls les 22 majeurs ont la double lecture
- Système de compte / sync cloud si l'app doit devenir multi-appareil (actuellement tout est en localStorage, donc local à l'appareil)
- Emballage en app native (Capacitor) pour publication App Store / Google Play
- Suivi des coûts d'API si l'usage grandit (chaque tirage = un appel Claude ; prévoir un cache ou une limite si le trafic augmente)
