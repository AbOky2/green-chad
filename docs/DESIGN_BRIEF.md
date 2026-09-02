# Brief de direction artistique — Site ONG Green-Chad

> Ce document est le « prompt » de référence pour le design du site. Toute décision visuelle doit pouvoir se justifier par une ligne de ce brief. Il est volontairement prescriptif : mesures, couleurs, règles d'usage, interdits.

## 1. Intention

Green-Chad est une ONG nationale tchadienne (reconnue par arrêté N°136 du 17/07/2025, N°0036/2025) qui intervient sur huit domaines : environnement, éducation, paix, formation technique, violences basées sur le genre, santé, eau-hygiène-assainissement, sécurité alimentaire.

Le site doit inspirer **confiance institutionnelle et sérieux**, sans froideur : celui d'une fondation ou d'une organisation qui publie des rapports, signe des chartes, rend des comptes. Il s'adresse à des partenaires, bailleurs, autorités, journalistes et citoyens, souvent depuis des connexions mobiles lentes.

Le mot-clé de la direction est **« éditorial institutionnel »** : la page se lit comme un beau rapport annuel imprimé, pas comme une landing page de start-up.

## 2. Références de ton (à imiter dans l'esprit, jamais copier)

- Sites de fondations et d'organisations internationales dessinés par des studios typographiques : grandes compositions de texte, filets fins, numérotation des sections, beaucoup d'air.
- Rapports annuels imprimés : une seule famille de titrage à empattement, colonnes strictes, légendes en petites capitales, index et sommaires.
- Signalétique administrative bien faite : hiérarchie nette, peu de couleurs, chiffres lisibles.

## 3. Interdits (ce qui fait « généré par IA » ou « template »)

1. Pas de dégradés décoratifs, pas de halos flous (« blobs »), pas de fonds « mesh ».
2. Pas de « glassmorphism » (verre dépoli, `backdrop-blur` décoratif), pas de badges flottants animés.
3. Pas d'icônes génériques dans des carrés arrondis colorés. Aucune icône de bibliothèque comme élément décoratif principal. Les seules icônes tolérées : pictos utilitaires (menu, flèche, téléchargement, lien externe) dessinés en trait fin, et les glyphes officiels des réseaux sociaux.
4. Pas de cartes à grand rayon avec ombre portée portée partout. Les surfaces se séparent par des **filets de 1 px**, pas par des ombres.
5. Pas de couleur d'accent sur de grandes surfaces. Le vert est un **accent**, pas un fond.
6. Pas de « scroll indicator », pas de compteur animé, pas de texte en dégradé.
7. Pas de placeholders (« Partenaire 2 », « à venir »). Ce qui n'existe pas n'apparaît pas.
8. Pas de coins arrondis supérieurs à 4 px, sauf pastilles et boutons (pilule assumée) et images de portrait (cercle).

## 4. Couleur

Le site est **monochrome chaud** avec deux accents rares.

| Rôle | Nom | Hex | Usage |
|------|-----|-----|-------|
| Fond principal | Papier | `#F5F2EB` | Toutes les pages |
| Fond secondaire | Papier foncé | `#ECE8DF` | Bandeaux alternés, champs de formulaire |
| Texte principal | Encre | `#151515` | Titres, texte courant, pied de page (fond) |
| Texte secondaire | Graphite | `#4B4A46` | Paragraphes longs |
| Texte tertiaire | Pierre | `#87847B` | Légendes, méta-données, petites capitales |
| Filets | Filet | `#D6D1C4` | Toutes les séparations |
| Accent principal | Terre | `#B8461F` | Numéros de section, eyebrows, état actif, soulignements |
| Accent secondaire (marque) | Mousse | `#2F6B3F` | Bouton principal, logo, un seul élément par écran |
| Accent tertiaire | Ocre | `#D9A441` | Un seul usage : la pastille d'état « publié » et le point de la marque |

Règles :
- Proportion cible sur une page : 88 % papier/encre, 8 % graphite/pierre/filets, 3 % terre, 1 % mousse.
- Le vert n'apparaît jamais comme fond de section. Il porte le bouton principal et le logo, c'est tout.
- Le pied de page est **encre** (`#151515`) avec texte papier.
- Aucune couleur n'est utilisée avec de la transparence sur un fond photo.
- Contraste minimum AA sur tous les textes, y compris « pierre » sur papier (ratio ≥ 4,5 pour le corps, ≥ 3 pour les grands titres).

## 5. Typographie

Deux voix, jamais plus.

**Titrage — Instrument Serif** (regular et italique, auto-hébergé, sous-ensemble latin, ≈ 25 Ko par fichier). Serif à fort contraste, chasse étroite, élégant en très grand corps. C'est la voix de l'institution.

**Texte — pile système** (`system-ui`, Segoe UI, Roboto, Helvetica, Arial). Zéro octet à charger. C'est la voix de service.

Échelle (desktop / mobile) :

| Niveau | Police | Taille | Interlignage | Espacement | Usage |
|--------|--------|--------|--------------|------------|-------|
| Display | Serif | 88 px / 44 px | 0,95 | −0,02 em | Titre du hero |
| H1 | Serif | 64 px / 38 px | 1,0 | −0,015 em | Titres de page |
| H2 | Serif | 44 px / 30 px | 1,05 | −0,01 em | Titres de section |
| H3 | Serif | 28 px / 22 px | 1,15 | 0 | Titres de bloc |
| Lead | Système | 20 px / 18 px | 1,5 | 0 | Chapô |
| Corps | Système | 17 px / 16 px | 1,65 | 0 | Texte courant |
| Petit | Système | 14 px | 1,5 | 0 | Méta |
| Étiquette | Système, capitales | 12 px | 1,2 | +0,14 em | Eyebrows, légendes |

Règles :
- Les titres serif sont toujours en graisse normale ; l'emphase se fait par **l'italique**, jamais par le gras.
- Les eyebrows sont en capitales espacées, couleur terre, précédées d'un **numéro à deux chiffres** (« 01 — À propos »).
- Les chiffres importants (8 domaines, 2023) sont composés en serif de très grand corps, avec leur légende en étiquette en dessous.
- Largeur de lecture maximale : 68 caractères pour le corps, 20 mots pour un titre.
- Alignement à gauche partout. Le centré est réservé aux états vides et au 404.

## 6. Grille et espace

- Conteneur : 1 200 px maximum, marges 24 px (mobile) / 48 px (desktop).
- Grille 12 colonnes, gouttière 24 px. Les sections utilisent des rapports asymétriques : 5/7, 4/8, 3/9. Jamais 6/6 avec deux blocs identiques.
- Rythme vertical : sections espacées de 96 px (mobile) à 160 px (desktop). Chaque section commence par un **filet pleine largeur** et son eyebrow numéroté.
- Le blanc est un matériau : un écran de desktop ne montre jamais plus de trois blocs d'information.

## 7. Composants

**Filets** : 1 px, couleur filet. Les listes (activités, documents, équipe) sont des lignes séparées par des filets, comme un sommaire.

**Boutons** :
- Principal : fond mousse, texte papier, pilule, 14 px semi-gras, padding 12/22 px. Au survol : fond encre. Un seul par écran.
- Secondaire : bordure 1 px encre, texte encre, fond transparent. Survol : fond encre, texte papier.
- Texte : libellé souligné (soulignement 1 px, décalé de 4 px) suivi d'une flèche fine ; le soulignement passe en terre au survol.

**Liens dans le texte** : soulignés 1 px, couleur encre, survol terre.

**Index (liste d'activités)** : chaque ligne = numéro (serif, terre) · titre (serif H3) · description (corps, graphite) · filet. Au survol, la ligne se décale de 8 px vers la droite et le numéro passe en encre. Aucune icône.

**Fiches article** : image 3/2 sans coin arrondi, avec un fin filet ; sous l'image : étiquette (catégorie · date), titre serif H3, extrait 2 lignes. Pas de cadre, pas d'ombre. Grille 3 colonnes séparées par des gouttières, pas par des cartes.

**Lignes de document** : extension en étiquette dans un carré 40 px bordé (pas de couleur de remplissage), titre serif, description, méta ; à droite deux liens texte : « Ouvrir ↗ » et « Télécharger ↓ ». Filet entre chaque ligne.

**Pastille de catégorie** : texte étiquette avec un point coloré de 6 px devant (couleur par catégorie), sans fond.

**Formulaires** : champs à fond papier foncé, bordure 1 px filet, coin 2 px, hauteur 48 px ; focus = bordure encre + contour 2 px terre. Libellés en étiquette au-dessus.

**Portraits** : cercles, photo en **noir et blanc** avec léger contraste, couleur au survol (transition 400 ms). Cette uniformisation gomme les différences de qualité entre les photos.

**En-tête** : barre de 72 px, fond papier, filet inférieur. Logo à gauche (rond 40 px + « Green-Chad » en serif 22 px). Navigation en corps 15 px ; l'élément actif est souligné en terre. Bouton principal à droite. Sur mobile, menu plein écran encre avec liens en serif 36 px.

**Pied de page** : fond encre. Une grande ligne serif en papier (« Ensemble pour un Tchad durable. »), puis quatre colonnes en corps 14 px, puis une ligne de mentions en étiquette.

## 8. Iconographie et éléments graphiques

- Pas d'illustrations. Le graphisme est fait de **typographie, filets, numéros et chiffres**.
- Pictos utilitaires autorisés, en trait 1,5 px : flèche →, flèche ↗ (externe), flèche ↓ (téléchargement), menu ≡ et fermeture ×. Ils sont dessinés en SVG inline, 16 px, courant `currentColor`.
- Un seul motif décoratif est permis : une **grande règle graduée** (traits fins tous les 8 px, plus longs tous les 80 px) en filet, utilisée en bas du hero et au-dessus du pied de page. Elle évoque le relevé, la mesure, le sérieux du terrain.

## 9. Imagerie

- Portraits de l'équipe : voir composants (noir et blanc).
- Logos partenaires : affichés sur fond papier, hauteur 56 px, **en niveaux de gris à 70 % d'opacité**, couleur au survol ; défilement horizontal continu (voir motion). Marges généreuses entre logos (72 px).
- Images d'articles : ratio 3/2 dans les listes, 16/9 sur la page article, jamais de superposition de texte sur l'image.

## 10. Motion

Budget : aucune bibliothèque, uniquement CSS. Toute animation respecte `prefers-reduced-motion`.

- Apparition au chargement : le hero entre par un fondu + translation de 12 px, 600 ms, décalé de 80 ms par élément. Rien d'autre n'entre « en scène ».
- Survol : transitions 200 ms sur couleur, 400 ms sur les filtres d'image, `translateX(8px)` sur les lignes d'index.
- Défilement des partenaires : bande qui translate de −50 % en 40 s, linéaire, en boucle, pause au survol. Deux copies de la liste pour une boucle sans couture. `transform` uniquement (composité par le GPU, ne déclenche aucun re-layout).
- Aucune animation liée au scroll, aucun parallaxe.

## 11. Pages

### Accueil (ordre des sections)
1. **Hero** — 7/12 : eyebrow (« ONG nationale · N'Djamena · depuis 2023 »), display serif sur trois lignes maximum avec un mot en italique, chapô, deux boutons. 5/12 : le logo dans un cadre carré bordé, avec en dessous trois chiffres en serif (8 domaines · 2023 · 100 % locale). Sous l'ensemble : la règle graduée.
2. **01 — À propos** — 4/8 : titre à gauche, à droite trois paragraphes courts (mission, vision, statut) chacun ouvert par un mot en italique terre. Puis une citation serif en grand corps sur toute la largeur.
3. **02 — Domaines d'intervention** — index de huit lignes numérotées.
4. **03 — Actualités** — trois fiches article, lien « Tous les articles → ».
5. **04 — Équipe** — coordinateur en tête (portrait 160 px), puis grille 4 colonnes de portraits 112 px.
6. **05 — Partenaires** — titre court, bande défilante de logos.
7. **06 — Contact** — 5/7 : coordonnées en liste filetée à gauche, formulaire à droite.
8. Règle graduée, puis pied de page.

### Blog
Titre H1 serif « Actualités », chapô, filtres en ligne d'étiquettes soulignées (actif = terre), grille 3 colonnes, pagination en chiffres serif.

### Article
Colonne de lecture 680 px : étiquette catégorie · date · temps de lecture, H1 serif, chapô, image 16/9, corps 18 px avec titres serif, citation en italique avec filet gauche terre. En bas : filet, lien retour et bloc contact.

### Documents
H1 « Documents officiels », chapô, sommaire des catégories (liens ancrés, en étiquettes), puis pour chaque catégorie un H2 serif et une liste filetée de lignes de document.

### 404
Centré, chiffre « 404 » en serif 160 px, une phrase, un lien retour.

## 12. Accessibilité et performance (budgets)

- Contraste AA partout ; focus visible (contour 2 px terre, décalé de 3 px).
- Navigation clavier complète ; menu mobile fermable par Échap ; `aria-current` sur la page active.
- JavaScript client limité à l'en-tête (menu) et au formulaire de contact : < 60 Ko compressés hors framework.
- Polices : 2 fichiers woff2 ≈ 50 Ko, préchargés, `font-display: swap` avec repli métrique.
- Images : `next/image`, tailles déclarées, lazy sauf l'image du hero de l'article.
- Aucun script tiers.
- Objectifs Lighthouse mobile : Performance ≥ 90, Accessibilité ≥ 95, CLS < 0,05.

## 13. Liste de contrôle avant validation

- [ ] Sur chaque écran, le vert n'occupe qu'un bouton et le logo.
- [ ] Aucune ombre portée, aucun dégradé, aucune icône décorative.
- [ ] Chaque section a son numéro, son filet et son eyebrow.
- [ ] Les titres sont en Instrument Serif regular ; l'emphase est en italique.
- [ ] Les portraits sont en noir et blanc au repos.
- [ ] Les partenaires réels sont visibles ; aucun placeholder.
- [ ] Le site reste lisible et complet sans JavaScript et sans police chargée.
