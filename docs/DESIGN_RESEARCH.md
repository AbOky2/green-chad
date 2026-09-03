# Veille design — refonte v3 (septembre 2026)

Objectif : sortir d'un rendu « template » et construire une identité web contemporaine, vivante et fluide, cohérente avec ce qui se fait aujourd'hui sur Dribbble, Figma Community et les sites primés du secteur associatif.

> Note de méthode : depuis l'environnement de travail, Dribbble, Figma et Awwwards ne sont pas consultables directement (proxy réseau). La veille s'appuie sur les fiches indexées de ces plateformes (titres, descriptions de shots et de fichiers communautaires) et sur les analyses publiées des sites lauréats. Les sources sont listées en fin de document.

## 1. Ce que montrent les shots Dribbble « NGO / charity website » (2025-2026)

Motifs récurrents dans les shots les mieux classés (« NGO Homepage » d'Andrea Jelić, « Charity & Nonprofit Website Landing Page » de Devignedge, « NGO Kalypsia », « Golife », « SOMA – NGO Brand Identity », « NGO Website Hero Section UI » de Bibhu Prasanna Mohanty) :

1. **Hero plein écran sur fond sombre ou photo assombrie**, titre énorme en grotesque géométrique (2 à 3 lignes), un mot mis en couleur d'accent, un pill « badge » au-dessus du titre, deux boutons pilule (plein + contour).
2. **Cartes très arrondies (24–32 px)** avec fond légèrement teinté, ombres douces uniquement au survol.
3. **Bento grid** pour les programmes / domaines : un mélange de grandes et petites tuiles, chiffres géants, une tuile d'accent colorée.
4. **Bande de chiffres d'impact** (compteurs animés) sur fond contrasté.
5. **Marquee de logos partenaires** avec fondu sur les bords, souvent en couleur.
6. **Section contact/CTA sombre** avec un accent chaud (orange, jaune, lime) qui « éclaire » le bas de page.
7. **Pied de page avec le nom de la marque en très grand corps**, parfois en contour.
8. **Palette** : un sombre profond (bleu nuit ou vert forêt presque noir), un blanc cassé chaud, un seul accent vif. Le vert est présent mais rarement dominant : il sert de rappel, l'accent chaud porte l'énergie.

## 2. Navigation et menu burger (Figma Community)

Fichiers de référence : « Hamburger Menu Animation – Figma Prototype », « Animated Hamburger Menu UI » (3 variantes), « Animated Burger Menu » (bouton animé + toggle), « Interactive Hamburger Menu », « Stylish Hamburger Menu ».

Patrons dominants :
- **Barre flottante en « pilule »** détachée du bord (marges 12–16 px), fond translucide flouté, ombre douce, qui apparaît/se condense après quelques dizaines de pixels de défilement. Sur Dribbble : « Glassmorphism Navbar » (7 000+ shots), « Floating Navbar », « Pill Nav », barres « liquid glass » inspirées d'iOS 26.
- **Bouton burger animé** : deux barres qui se transforment en croix par rotation (Smart Animate), avec inversion de couleur.
- **Menu mobile plein écran** qui recouvre la page (overlay), liens en très grand corps entrant en cascade (décalage 40–60 ms), coordonnées et réseaux sociaux en bas.

## 3. Sites primés du secteur (Webby / Awwwards / sélections 2025-2026)

- **Obama Foundation** (Webby 2025) : bannière et vidéo hero, puis panneau fixe à gauche / contenu défilant à droite (split-screen narratif).
- **Team Rubicon** : typographie capitale très grasse sur fond vidéo.
- **The Ocean Cleanup** : narration au défilement, micro-animations, hiérarchie visuelle forte.
- **Age of Union** (environnement) : identité graphique fondée sur la typographie et des éléments linéaires, photographie et vidéo intégrées.
- **British Red Cross – One Kind Thing** (Awwwards) : campagne narrative, interactions ludiques.

Enseignement : la personnalité vient d'un **dispositif graphique propre** (un motif, une forme, une typographie) et non d'icônes génériques.

## 4. Tendances transversales 2026

D'après les synthèses de tendances (Figma Resource Library, Envato, Moburst, Inspo AI, UX Pilot) :
- **Typographie expressive et surdimensionnée**, polices variables, titres cinétiques.
- **Micro-interactions attendues** (survol, apparition au défilement) mais **légères** : CSS et petits scripts, chargement paresseux, dégradation propre sur mobiles modestes.
- **Éléments flottants** pour signifier la hiérarchie (barre de navigation, panneaux).
- **Grilles cassées et bento**, personnalité visuelle assumée.
- **Mobile d'abord** : rapidité, cibles tactiles, contenu minimal.

## 5. Techniques de fluidité (marquee, parallaxe)

- Défilement de logos : deux copies de la piste, `transform: translate3d()` animé (composité GPU), `will-change: transform`, pause au survol, `prefers-reduced-motion` respecté. Fondu de bord par `mask-image` ou pseudo-éléments en dégradé ; ombre intérieure pour donner du relief aux bords (sources : Codrops, Master.dev, Effect Labs, jh3y).
- Parallaxe moderne : `animation-timeline: scroll()` (CSS natif, sans JavaScript, 60 fps) pour déplacer légèrement une couche décorative par rapport au contenu ; repli automatique sur les navigateurs sans prise en charge. Jamais de parallaxe sur le texte principal.
- Apparition au défilement : `IntersectionObserver` (une seule fois, seuil 15 %), uniquement `opacity` et `transform`.

## 6. Direction retenue pour Green-Chad (v3)

**Concept : « Le Tchad en points »**. Le dispositif graphique propre au site est la silhouette du Tchad rendue en **matrice de points** (données géographiques réelles), qui apparaît dans le hero, en filigrane dans les sections sombres et en signature dans le pied de page. Elle remplace toute icône décorative.

**Palette** — sombre profond + blanc chaud + accent solaire ; le vert redevient un rappel de marque :

| Rôle | Hex |
|------|-----|
| Nuit (fonds sombres) | `#0B1411` |
| Nuit 2 (cartes sur sombre) | `#13221C` |
| Ivoire (fonds clairs) | `#F6F4EE` |
| Ivoire 2 (cartes sur clair) | `#ECE9E1` |
| Texte sur clair | `#101614` / `#4C5350` |
| Soleil (accent principal, CTA) | `#F6B21B` |
| Feuille (rappel marque, tags) | `#2FA35C` |
| Terre (secondaire, très rare) | `#E2643C` |

**Typographie** — Space Grotesk (titres, variable 300–700, 21 Ko) + Manrope (texte, variable 200–800, 24 Ko), auto-hébergées.

**Composants** — barre flottante en pilule floutée ; burger animé et menu plein écran en cascade ; hero sombre avec carte en points et compteurs ; ruban de domaines défilant ; bento des domaines d'intervention ; bande d'impact ; cartes actualités arrondies 24 px ; équipe en cartes photo couleur ; marquee partenaires **en couleur, vers la gauche, ombres de bord** ; contact sombre éclairé par l'accent ; pied de page avec wordmark géant.

**Motion** — apparition au défilement (IntersectionObserver), compteurs, parallaxe CSS sur la carte de points, transitions 200–400 ms, `prefers-reduced-motion` respecté partout. Budget : aucune bibliothèque d'animation.

## Sources

- Dribbble : [NGO website](https://dribbble.com/tags/ngo-website), [NGO landing page](https://dribbble.com/tags/ngo-landing-page), [Charity landing page](https://dribbble.com/tags/charity-landing-page), [Nonprofit website](https://dribbble.com/tags/nonprofit-website), [Nonprofit hero](https://dribbble.com/tags/nonprofit-hero), [NGO Website Hero Section UI](https://dribbble.com/shots/16332613-NGO-Website-Hero-Section-UI), [Bento grid](https://dribbble.com/tags/bento-grid), [Bento Grid Website Hero Section](https://dribbble.com/shots/23707072-Bento-Grid-Website-Hero-Section), [Glassmorphism navbar](https://dribbble.com/tags/glassmorphism-navbar), [Floating navbar](https://dribbble.com/search/floating-navbar), [Pill nav](https://dribbble.com/search/pill-nav)
- Figma Community : [Hamburger Menu Animation – Figma Prototype](https://www.figma.com/community/file/1393582827270386105/hamburger-menu-animation-figma-prototype), [Animated Hamburger Menu UI](https://www.figma.com/community/file/1324410499496853486/animated-hamburger-menu-ui), [Animated Burger Menu](https://www.figma.com/community/file/1318976961660477896/animated-burger-menu), [Interactive Hamburger Menu](https://www.figma.com/community/file/1253213069960804217/interactive-hamburger-menu), [Stylish Hamburger Menu](https://www.figma.com/community/file/1101504492732656271/stylish-hamburger-menu), [Figma – Top Web Design Trends for 2026](https://www.figma.com/resource-library/web-design-trends/)
- Sites primés et sélections : [Awwwards – Nonprofit websites](https://www.awwwards.com/awwwards/collections/nonprofit-websites/), [Awwwards – One Kind Thing, British Red Cross](https://www.awwwards.com/inspiration/one-kind-thing-british-red-cross), [Numiko – The best non-profit websites 2026](https://numiko.com/insights/the-best-non-profit-websites-2026), [Kanopi – Best nonprofit websites](https://kanopi.com/blog/best-nonprofit-websites/), [Colorlib – NGO website examples 2026](https://colorlib.com/wp/nonprofit-websites/)
- Tendances : [Envato – Web design trends 2026](https://elements.envato.com/learn/web-design-trends), [Moburst – Landing page trends 2026](https://www.moburst.com/blog/landing-page-design-trends-2026/), [Inspo AI – 15 trends 2026](https://www.inspoai.io/blog/web-design-trends-2026), [UX Pilot – 14 trends 2026](https://uxpilot.ai/blogs/web-design-trends-2026)
- Techniques : [Codrops – CSS-only marquee](https://tympanus.net/codrops/2020/03/31/css-only-marquee-effect/), [Master.dev – Infinite marquee with modern CSS](https://master.dev/blog/infinite-marquee-animation-using-modern-css/), [Effect Labs – Seamless marquee loop](https://effect-labs.com/en/pages/blog/marquee-infinite-scroll.html), [jh3y – Infinite CSS logo marquee](https://codepen.io/jh3y/pen/RNwyqpL), [Azie88 – Infinite logo marquee](https://github.com/Azie88/Infinite-Logo-Marquee-CSS)
