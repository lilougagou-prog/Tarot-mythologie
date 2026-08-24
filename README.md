# Tarot de Delphes

Application web (PWA) de tarot mythologique grec — tirage interactif, lecture personnalisée générée par IA, bibliothèque de symboles, journal.

> Ce dépôt contient aussi, dans `enfants/`, une seconde application indépendante : **Mini Olympe**, destinée aux enfants (dès 6 ans) pour découvrir les dieux grecs par le jeu. Voir `enfants/README.md`.

## Structure
- `index.html` — structure de la page
- `styles.css` — tous les styles (police Cinzel/EB Garamond, thème "divinatoire", animation de chargement en étoiles)
- `app.js` — toute la logique (données des cartes, symboles, tirage, navigation, appel au backend IA)
- `assets/` — illustrations des 22 arcanes majeurs (Le Mat, Bateleur, Papesse, Impératrice, Empereur, Pape, Amoureux, Chariot, Justice, Hermite, Roue de Fortune, Force, Pendu, Arcane sans nom, Tempérance, Diable, Maison-Dieu, Étoile, Lune, Soleil, Jugement, Monde) — collection complète. Illustration progressive des 56 cartes mineures : le jeu d'Épées et le jeu de Bâtons sont désormais complets (10 numérales + 4 figures de cour chacun, `card-epees-*.jpg` et `card-batons-*.jpg`) ; le reste (Coupes, Deniers) utilise encore un glyphe emoji ou des pips en attendant son illustration. 4 illustrations (`learn-*.jpg`) pour les cases de l'onglet Apprendre, et 4 illustrations (`suit-*.jpg`) pour les 4 enseignes dans les sous-sections « Figures de cour » et « Cartes numérales ».
- `manifest.json` + `icon.svg` — nécessaires pour l'installation en PWA
- `service-worker.js` — cache offline
- `api/reading.js` — backend serverless (Vercel) qui appelle l'API Anthropic côté serveur
- `api/astral.js` — backend serverless (Vercel) qui calcule un profil astral (thème natal) à partir d'une date/heure/lieu de naissance
- `api/transits.js` — backend serverless (Vercel) qui calcule les positions planétaires du jour, pour l'Horoscope du jour (aucune donnée personnelle reçue)
- `api/portrait.js` — backend serverless (Vercel) qui rédige, une seule fois par profil, un portrait de personnalité (texte suivi) à partir d'un résumé du thème natal
- `api/astral-text.js` — backend serverless (Vercel) qui rédige, une seule fois par profil, une phrase personnalisée pour chaque case du Profil astral (nombre du prénom, chaque planète, l'ascendant, chaque aspect) et explique le choix de la divinité tutélaire
- `api/retrospective.js` — backend serverless (Vercel) qui rédige, une fois par an à l'anniversaire, un bilan de l'année de tirages écoulée à partir d'un résumé agrégé du Journal
- `api/ritual.js` — backend serverless (Vercel) qui rédige, une fois par jour, l'Horoscope du jour affiché à l'accueil : une recommandation unique reliant carte du jour + transits (signes + aspect le plus marqué avec le thème natal) + thème natal fixe (Soleil/Lune/ascendant) + nombre personnel du jour
- `api/_lib/astro.js` — briques astronomiques partagées entre `api/astral.js` et `api/transits.js` (longitudes écliptiques, signes, aspects) ; le préfixe `_` évite que Vercel n'en fasse une route
- `package.json` — dépendances `@anthropic-ai/sdk` (`api/reading.js`, `api/portrait.js`, `api/astral-text.js`, `api/retrospective.js`, `api/ritual.js`), `luxon` + `astronomy-engine` (`api/astral.js`, `api/transits.js`)

## Lecture générée par IA — comment ça marche
La fonction `generateAIReading(question, cards, positions)` dans `app.js` envoie `{question, cards, positions, profile?, history?, memory?}` en `POST` vers `/api/reading` — `positions` (les intitulés des positions du tirage choisi, ex. « Défi », « Résultat ») donne à l'IA le sens de chaque carte dans les tirages autres que le tirage général ; `profile`, `history` et `memory` sont trois résumés optionnels de personnalisation (voir « Profil astral », « Journal intelligent » et « Mémoire du Journal » plus bas). Quand un prénom est enregistré, l'IA est aussi invitée à s'adresser à la personne par son prénom une fois dans la lecture, jamais de façon systématique. Cette fonction serverless (`api/reading.js`), agnostique du type de tirage (1 à 12 cartes, voir `SPREADS` dans `app.js`) :
1. reconstruit le prompt exact (tarologue professionnel, format JSON strict, tient compte des positions si fournies),
2. appelle l'API Anthropic avec la clé stockée dans la variable d'environnement **`ANTHROPIC_API_KEY`** (jamais exposée au navigateur),
3. renvoie `{cards: [...], synthesis}` au client (un texte par carte, dans le même ordre, quel que soit le nombre de cartes du tirage).

Si l'appel échoue ou dépasse 15 secondes, l'app bascule automatiquement sur un texte généré localement (`synthesisParagraphs`/`synthesisParagraphsGeneric` selon le tirage, `interpretationFor`) — l'utilisateur n'est jamais bloqué.

### Protéger l'usage IA (recommandé tant que l'appli est personnelle)
Coût réel : de l'ordre du centime par tirage, variable selon le nombre de cartes (facturation à l'usage sur console.anthropic.com, indépendante d'un éventuel abonnement Claude.ai — les deux sont des produits distincts ; les grands tirages comme la Croix celtique ou l'Année à venir coûtent proportionnellement plus qu'un tirage à 1 ou 3 cartes). Le portrait de personnalité (`/api/portrait`), les textes astraux personnalisés (`/api/astral-text`) et la rétrospective annuelle (`/api/retrospective`) ajoutent chacun un appel comparable, mais respectivement une seule fois par profil, une seule fois par profil et une seule fois par an (mis en cache ensuite). L'Horoscope du jour (`/api/ritual`) est en revanche **récurrent** : un petit appel supplémentaire chaque jour, du même ordre qu'un tirage à 1 carte. Pour éviter que quelqu'un d'autre qui tomberait sur l'URL de l'appli déclenche des appels avec ta clé :
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

Le résultat n'est pas qu'une liste brute de signes et degrés : `natalSummaryParagraph()` ouvre l'écran par un paragraphe récapitulatif (Soleil/Lune/Ascendant + densité des aspects), et chaque planète, l'Ascendant et chaque aspect ont 1-2 phrases d'explication (`natalPlanetSentence()`/`natalAscendantSentence()`/`natalAspectSentence()`) — composées à partir d'un vocabulaire réutilisable (`PLANET_THEMES` : le domaine de vie de chaque planète ; `signQuality()` : le mot-clé du signe, via `ZODIAC_MAJOR_LINKS`, la même table que pour « Apprendre »). Entièrement local, aucun appel IA — c'est le texte affiché tant que `/api/astral-text` (voir plus bas) n'a pas encore répondu, ou en repli s'il échoue.

Le prénom reçoit en plus une **numérologie** (`nameNumerology()` dans `app.js`, méthode pythagoricienne classique réduite à 1-9, volontairement sans nombre maître 11/22/33) dont la signification réutilise directement `NUMBER_KEYS`, la même grammaire symbolique que les cartes numérales.

Contrairement au nombre du prénom (fixe à vie), trois nombres évoluent avec le temps — la **numérologie du temps** (`personalYearNumber()`/`personalMonthNumber()`/`personalDayNumber()`, formule classique jour+mois de naissance+année en cours [+mois en cours [+jour en cours]], même réduction 1-9) : l'année personnelle change chaque 1er janvier, le mois personnel chaque mois, le jour personnel chaque jour. Les deux premiers sont affichés dans l'écran Profil astral juste sous le nombre du prénom ; le jour personnel, lui, alimente uniquement l'Horoscope du jour (voir plus bas), où sa granularité quotidienne compte davantage qu'un affichage statique.

Quand un profil est enregistré, `generateAIReading()` envoie automatiquement un résumé (`profileForReading()` : prénom, nombre numérologique, signes solaire/lunaire/ascendant, année personnelle) à `/api/reading`, qui l'intègre avec subtilité à la lecture si c'est pertinent — sans jamais devenir un horoscope générique ni éclipser les cartes tirées. Sans profil enregistré, la lecture se comporte exactement comme avant.

**Divinité tutélaire** : `tutelaryDeity()` détermine la figure mythologique la plus représentée dans le thème natal — chaque planète « vote », via `ZODIAC_MAJOR_LINKS`, pour la divinité liée à son signe, avec un poids plus fort pour les planètes personnelles (Soleil, Lune, Ascendant, Mercure, Vénus, Mars) que pour Jupiter/Saturne, et en excluant Uranus/Neptune/Pluton — trop lentes pour différencier un individu d'une génération entière. Affichée sous forme de carte cliquable (glyphe + nom + note), qui renvoie vers la fiche complète de la divinité, avec une explication de ce choix (voir `/api/astral-text` juste en dessous : `tutelaryReason` en IA, ou une phrase de repli qui énumère les placements les plus lourds via `tutelaryReasonFallback()`).

**Portrait de personnalité** (`POST /api/portrait`, `api/portrait.js`) : un texte suivi de 3-4 paragraphes, rédigé par l'IA à partir d'un résumé du thème (signes, numérologie, divinité tutélaire, aspects les plus serrés — jamais le thème natal complet), sans jargon technique ("aspect", "orbe"…) traduit en traits de caractère concrets. Généré **une seule fois** et mis en cache dans le profil (`profile.portrait`), jamais régénéré tant que les informations de naissance ne changent pas — voir `ensurePortrait()` dans `app.js`, même mécanique de discrétion qu'`ensureTransits()` (aucun appel avant qu'un code d'accès existe déjà). Remplace le paragraphe récapitulatif local (`natalSummaryParagraph()`) une fois prêt ; celui-ci reste affiché en attendant ou si l'appel échoue.

**Textes astraux personnalisés** (`POST /api/astral-text`, `api/astral-text.js`) : à la différence du portrait (un texte d'ensemble), une phrase distincte générée par l'IA pour *chaque* case — le nombre du prénom, chaque planète, l'ascendant, chaque aspect (plafonné aux 10 aspects les plus exacts par orbe) — plus l'explication de la divinité tutélaire. `profileForAstralText()` construit le résumé envoyé (mêmes principes de sobriété que pour le portrait), avec une clé stable par aspect (`sun_carré_moon`, etc., voir le commentaire dans `app.js`) pour que le texte retrouve la bonne case quel que soit l'ordre. Générées **une seule fois** et mises en cache dans le profil (`profile.astralText`), jamais régénérées tant que les informations de naissance ne changent pas — même mécanique que `ensurePortrait()`. Tant qu'un champ précis n'est pas encore généré (ou en cas d'échec), `renderProfilResults()` retombe silencieusement sur la phrase locale correspondante (`natalPlanetSentence()` etc.) — jamais de case vide.

### Horoscope du jour — comment ça marche
Affiché côté interface sous le titre « Horoscope du jour » ; en interne (fonctions, clé `localStorage`, endpoint `/api/ritual`), le nom garde le préfixe historique `ritual` — pas de renommage en profondeur pour un changement de libellé visible.

`POST /api/transits` (`api/transits.js`) calcule les positions planétaires **du jour** (Soleil à Pluton), sans recevoir aucune donnée personnelle — le résultat est identique pour tout le monde, seul l'instant de la requête compte. Le client (`ensureTransits()` dans `app.js`) met ce résultat en cache un jour entier dans `localStorage` (`delphesTransits`) et ne rappelle l'endpoint qu'une fois par jour.

`strongestTransitAspect()` compare ensuite, entièrement côté client, ces positions du jour au thème natal du Profil astral (déjà en `localStorage`, jamais renvoyé au serveur pour ce calcul) : l'aspect le plus exact entre les planètes rapides du jour (Soleil, Lune, Mercure, Vénus, Mars) et les points natals (Soleil, Lune, Ascendant), avec les mêmes types/orbes que `/api/astral`. Gratuit et instantané (aucun appel IA pour ce calcul) — son résultat, ainsi que les signes du Soleil et de la Lune du jour, alimente `ritualSummary()`, envoyé à `/api/ritual` juste en dessous. Une ancienne section « Horoscope du jour » affichait ces mêmes signes séparément, en plus du rituel : supprimée (elle faisait doublon), sa matière a d'abord été entièrement absorbée dans la recommandation unifiée — avant que son titre d'origine ne lui soit rendu par la suite (voir le paragraphe suivant).

`POST /api/ritual` (`api/ritual.js`) fusionne carte du jour, transits du jour (signes + aspect le plus marqué), **thème natal fixe** (Soleil/Lune/ascendant de naissance) et **nombre personnel du jour** (`personalDayNumber()`, pas du mois) en une seule recommandation concrète, plutôt que des blocs séparés à interpréter soi-même. Le thème natal fixe et le nombre du jour ont été ajoutés après un retour direct : sans eux, deux jours qui partagent la même carte (le cycle ne compte que 22 majeurs, voir `dayOfYear()`) et le même signe solaire transitant (constant tout un mois) produisaient un texte quasi identique — le thème natal distingue une personne d'une autre même à carte/signe du jour identiques, et le nombre personnel change chaque jour (contrairement au mois personnel). Le prompt sépare explicitement dans son texte ce qui est fixe (thème natal) de ce qui varie aujourd'hui, et demande explicitement à l'IA d'éviter toute formule interchangeable d'un jour ou d'une personne à l'autre. Contrairement au portrait et à la rétrospective (générés une fois), rappelé **une fois par jour** — coût récurrent, du même ordre qu'une lecture à 1 carte — et mis en cache dans `localStorage` (`delphesRitual`) le temps de la journée. N'apparaît sur l'accueil que si un Profil astral est enregistré, et jamais via un prompt intrusif : le premier appel n'est déclenché que si le code d'accès a déjà été mémorisé par ailleurs (ce qui est garanti dès qu'un Profil astral existe).

### Journal intelligent — comment ça marche
`journalTrends()` dans `app.js` analyse le Journal (à partir de 3 tirages enregistrés, pour éviter qu'un seul tirage ne « devienne » une tendance) et dégage la carte la plus fréquente et le thème de question le plus fréquent (via `detectDomain()`, déjà utilisé pour la synthèse locale). Affiché en tête du Journal (« Tes tendances »), et envoyé en résumé minimal (`journalTrendsForReading()`) à `/api/reading` pour que la lecture IA puisse, avec beaucoup de subtilité, en tenir compte — jamais au détriment des cartes tirées ce jour-là.

### Mémoire du Journal — comment ça marche
Contrairement à `journalTrends()` (une tendance globale), `cardMemory()` est un rappel ponctuel propre à chaque tirage : si l'une des cartes tirées aujourd'hui est déjà apparue dans un tirage précédent sur un sujet proche (même domaine détecté par `detectDomain()`), le tirage précédent le plus récent est envoyé à `/api/reading` (`{cardName, date, domainLabel}` — jamais le texte de la question passée) pour que la lecture IA puisse, si c'est pertinent, le mentionner brièvement.

### Rétrospective annuelle — comment ça marche
`POST /api/retrospective` (`api/retrospective.js`) rédige un bilan de l'année écoulée, une fois par an, à l'anniversaire de naissance (repère plus intuitif qu'un 1er janvier arbitraire pour « une année de ta vie »). `ensureRetrospective()` scope le Journal aux 12 derniers mois (`journalStatsSince()`, en s'appuyant sur `journalStats()` généralisé à un sous-ensemble d'entrées), exige au moins 3 tirages sur la période (comme `journalTrends()`), puis envoie un résumé agrégé — jamais le texte des questions ni des notes — à l'API. Le résultat est mis en cache dans `localStorage` (`delphesRetrospective`, avec l'année de génération) et surfacé dans l'onglet Profil sous forme de 4e tuile (à côté de Profil astral, Journal et Statistiques) tant que l'année en cours correspond ; une nouvelle rétrospective n'est générée qu'au prochain anniversaire.

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
- Tirage : 5 types de tirage au choix (`SPREADS` dans `app.js`), écran de sélection animé (halo scintillant + pluie d'étoiles) — Tirage général (3 cartes, pioche de 15), Oui/Non (1 carte, pioche de 9), Amour (3 cartes — Toi / L'autre / La relation, pioche de 15), Croix celtique (10 cartes avec position dédiée pour chacune, pioche de 24), Année à venir (une carte par mois **restant** de l'année en cours — mois courant inclus, `remainingMonthsPositions()` — pas la peine de tirer pour un mois déjà passé ; pas de question à écrire, un clic sur la tuile pioche directement). Bouton « ← Changer de tirage » pour revenir à la sélection. Lecture personnalisée générée par IA (tient compte de la position de chaque carte dans le tirage), avec animation de chargement (étoiles dorées scintillantes) et repli local si l'IA ne répond pas, enrichie par le Profil astral quand il existe
- Bibliothèque de 89 symboles et nombres, triés par ordre alphabétique, tous cliquables et reliés aux cartes/divinités ; position de scroll préservée à la navigation. Les 79 symboles (plantes, animaux, objets, attributs des dieux, lieux, éléments, astres…) ont tous en plus un texte mythologique détaillé (`lore`, plusieurs paragraphes) affiché dans leur fiche sous « Aux origines du symbole »
- Figures mythologiques (onglet Apprendre → « Figures mythologiques », `DEITY_NOTES`) : les 70 divinités et héros du jeu ont chacun leur fiche dédiée, avec la ou les cartes associées quand il y en a. Les 70 ont en plus un texte mythologique développé (`DEITY_LORE`, séparé de `DEITY_NOTES` pour ne pas changer son type ailleurs dans le code) affiché sous « Le mythe » — même traitement que les symboles, avec renvois croisés entre fiches (ex. la fiche « Iris » renvoie à « Arc-en-ciel », et inversement). Recherche en direct (`#figuresSearch`) sur cette liste, même mécanisme que la recherche des Symboles mais câblé directement dans `showLearnFigures()` (cet écran ne passe pas par `bind()`)
- Détail de carte enrichi : lecture Tarot de Marseille + éclairage mythologique pour les 22 arcanes majeurs
- Profil : Profil astral (thème natal complet + numérologie du prénom et du temps) et Journal des tirages passés, tous les deux en localStorage. Le Journal garde la lecture complète (texte par carte + synthèse, IA ou générée hors-ligne), pas seulement les noms des cartes — repliable sous « Revoir la lecture complète » sur chaque entrée. Ré-enregistrer un tirage déjà sauvegardé met à jour l'entrée existante plutôt que d'en créer une en double. Une fois 3 tirages enregistrés, un bandeau « Tes tendances » dégage la carte et le thème de question les plus fréquents (voir « Journal intelligent » plus haut)
- Profil met en avant les arcanes majeurs liés à ton profil astral (Soleil/Lune/Ascendant), via une table de correspondance zodiaque ↔ arcane majeur (`ZODIAC_MAJOR_LINKS`, tradition ésotérique classique) — n'apparaît que si un Profil astral est enregistré
- Statistiques (onglet Profil → Statistiques, `journalStats()`) : série de jours actuelle et meilleure série jamais atteinte, répartition majeurs/mineurs tirés, cartes qui reviennent le plus souvent, nombre de cartes différentes déjà croisées sur les 78 du jeu, répartition par thème de question et par type de tirage. Contrairement aux « tendances » du Journal (qui exigent 3 tirages avant de s'afficher), ces chiffres apparaissent dès le premier tirage enregistré
- Progression personnelle (onglet Apprendre) : score composite (`learningProgress()`) sur ce qui a été réellement **consulté en détail**, pas seulement tiré — 60% cartes (78), 20% figures mythologiques (70), 20% symboles et nombres (89), chaque fiche comptée une seule fois même revisitée (`markSeen()`/`seenCount()`, `localStorage`)
- Animations : flip 3D dos → face au choix d'une carte à la pioche (`cardBackHTML()`/`bindDeck()` — la face n'est chargée qu'au clic, jamais préchargée pour les cartes jamais choisies), pluie de particules dorées à ce moment-là et ripple doré sur les boutons (`spawnGoldBurst()`, écouteur délégué en fin d'`app.js`), transitions d'écran différenciées (léger zoom avant en entrant dans une fiche, zoom arrière au retour/changement d'onglet — `triggerScreenAnim(kind)`), lecture d'ensemble d'un tirage qui s'écrit mot par mot façon oracle (`typewriterHTML()`, durée plafonnée quelle que soit la longueur du texte), flash « Première découverte » sur une fiche jamais consultée avant (`discoveryFX()`), halo de fond qui varie doucement selon l'heure du jour et filigrane de constellation sur Apprendre/Symboles. Tout respecte `prefers-reduced-motion`
- Carte du jour enrichie (accueil) : répartie sur les 365/366 jours de l'année (au lieu des 1-31 jours du mois, qui faisait retomber le 1er de chaque mois sur la même carte), avec un extrait de sa lecture mythologique affiché directement, un signalement si elle résonne avec le profil astral enregistré, et une **série de jours consécutifs** (`updateStreak()`, `localStorage`) qui s'incrémente à la première visite de chaque jour
- Calendrier attique (accueil) : date du jour dans le calendrier civil d'Athènes antique (`atticCalendarInfo()`), calculée entièrement côté client par arithmétique (nouvelle lune moyenne + solstice de juin approximé par la formule basse précision de Meeus, aucun appel réseau) — affiche le mois et le jour, et, quand ce jour précis du mois a traditionnellement une divinité qui lui est propre (la Tétrade du 4 pour Hermès/Aphrodite/Héraclès/Éros, le 6 pour Artémis, le 7 et le 20 pour Apollon, le 8 pour Poséidon, le dernier jour du mois pour le Deipnon d'Hécate), une puce cliquable vers sa fiche. Approximatif par nature (voir le commentaire en tête du bloc dans `app.js`), à la mesure d'un calendrier qui, dans l'Antiquité, dépendait lui-même de l'observation directe du ciel
- Horoscope du jour (accueil, si un Profil astral est enregistré) : une recommandation unique par IA qui relie carte du jour, transits du jour (signes + aspect le plus marqué avec le thème natal, `strongestTransitAspect()`), thème natal fixe (Soleil/Lune/ascendant de naissance) et nombre personnel du jour (voir « Horoscope du jour » plus haut) — seul appel IA récurrent (quotidien) de l'appli
- Rétrospective annuelle (Profil, 4e tuile, à l'anniversaire) : bilan par IA de l'année de tirages écoulée, dès 3 tirages enregistrés sur les 12 derniers mois (voir « Rétrospective annuelle » plus haut)
- Mémoire du Journal : une lecture IA remarque si une carte tirée aujourd'hui l'a déjà été pour un sujet proche (voir « Mémoire du Journal » plus haut)
- Accueil personnalisé (« Bonjour {prénom} ✦ ») dès qu'un Profil astral est enregistré ; les lectures générées par IA sont aussi invitées à s'adresser à la personne par son prénom, ponctuellement
- Divinité tutélaire (avec l'explication de ce choix), portrait de personnalité et textes astraux personnalisés par case (nombre du prénom, chaque planète, l'ascendant, chaque aspect), tous rédigés par IA dans le Profil astral (voir « Profil astral » plus haut)

## Pistes de suite possibles (non bloquantes)
- Ajouter les illustrations des cartes mineures restantes (même gabarit que `assets/`, 500×750px, JPEG qualité ~88) — les 22 arcanes majeurs, le jeu d'Épées complet et le jeu de Bâtons complet (10 numérales + 4 figures de cour chacun) sont désormais illustrés ; il reste 28 cartes, les jeux complets de Coupes et de Deniers (14 chacun). La double lecture Marseille + mythologie (`CARD_LORE`), elle, couvre déjà les 78 cartes — l'illustration et le texte avancent à des rythmes indépendants.
- Système de compte / sync cloud si l'app doit devenir multi-appareil (actuellement tout est en localStorage, donc local à l'appareil)
- Emballage en app native (Capacitor) pour publication App Store / Google Play
- Suivi des coûts d'API si l'usage grandit (chaque tirage = un appel Claude ; prévoir un cache ou une limite si le trafic augmente)
