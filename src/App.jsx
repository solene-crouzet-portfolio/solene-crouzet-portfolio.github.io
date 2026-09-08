import React, { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  DATA                                                                */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  "Identité visuelle",
  "Branding",
  "Affiche",
  "Édition",
  "Packaging",
  "UI / Digital",
  "3D",
  "Illustration",
  "Projets personnels",
];

const PROJECTS = [
  {
    id: "pamparina",
    title: "Pamparina",
    image: "/images/pamparina_projet_1.png",
    category: "Identité visuelle",
    year: "2024",
    accent: "#4640D6",
    pattern: "grid",
    size: "tall",
    tagline: "Identité pour un collectif d'architectes",
    context:
      "Un jeune collectif d'architectes basé à Lyon me contacte pour poser les bases visuelles de sa toute première identité, avant l'ouverture de son agence.",
    objective:
      "Traduire une pratique architecturale rigoureuse et sensible en un système graphique simple, capable de vivre sur un plan comme sur une carte de visite.",
    concept:
      "Le nom, Pamparina, m'a menée vers la structure elle-même : une grille visible, presque brute, qui organise chaque support comme un plan organise un bâtiment. Le logotype se construit sur cette même trame, colonne par colonne.",
    role: "Direction artistique, identité de marque, système graphique",
    tools: ["Illustrator", "InDesign", "Figma"],
    process:
      "J'ai commencé par dessiner la grille avant le logo : neuf colonnes, des marges strictes, un rapport hauteur/largeur repris de leurs plans d'exécution. Le logotype est ensuite venu se loger dans cette structure, comme une pièce dans un plan.",
    results:
      "Un système d'identité modulaire décliné sur le papier à en-tête, les plaquettes de présentation, la signalétique de chantier et les réseaux sociaux du collectif, aujourd'hui utilisé pour chacun de leurs projets.",
  },
  {
    id: "elmer",
    title: "Elmer",
    image: "/images/elmer_projet_2.jpg",
    category: "Illustration",
    year: "2023",
    accent: "#FF5B39",
    pattern: "stripes",
    size: "wide",
    tagline: "Marque de boisson énergisante indépendante",
    context:
      "Une marque de boisson énergisante 100 % naturelle souhaite se démarquer des codes du secteur, saturé de noir mat et de promesses de performance.",
    objective:
      "Créer une marque qui parle d'énergie sans crier, avec une identité assez forte pour tenir en rayon à côté des grands groupes.",
    concept:
      "Elmer s'appuie sur un seul geste graphique : une diagonale franche, reprise sur chaque support à une intensité différente. Elle devient tour à tour éclair, ligne d'horizon ou trait de rature.",
    role: "Branding, packaging, direction artistique photo",
    tools: ["Illustrator", "Photoshop", "Cinema 4D"],
    process:
      "Plus de trente itérations de la diagonale ont été testées avant de trouver le bon angle : ni trop agressif, ni trop sage. Chaque parfum reçoit sa propre couleur, la diagonale restant l'unique constante.",
    results:
      "Une gamme de six parfums lancée en épicerie fine, un packaging remarqué par la presse spécialisée et un système extensible à de futures références.",
  },
  {
    id: "binche",
    title: "Carnaval de Binche",
    image: "/images/binche_projet_3.png",
    category: "Affiche",
    year: "2022",
    accent: "#8C2BD9",
    pattern: "circles",
    size: "normal",
    tagline: "Série d'affiches pour un festival de jazz",
    context:
      "Un festival de jazz de nuit, installé dans d'anciens entrepôts, me confie sa communication visuelle pour sa cinquième édition.",
    objective:
      "Donner une image nocturne et physique à un festival qui se vit debout, dans le noir, tout près des musiciens.",
    concept:
      "Chaque affiche part d'une forme ronde, comme un projecteur ou une note tenue, déformée par la musique elle-même : les contours suivent littéralement une onde sonore enregistrée pendant les concerts précédents.",
    role: "Direction artistique, illustration, typographie",
    tools: ["Illustrator", "Procreate", "InDesign"],
    process:
      "J'ai enregistré des extraits de concerts passés et transformé leurs ondes en tracés vectoriels, réinjectés ensuite dans la composition de chaque affiche.",
    results:
      "Une série de cinq affiches déclinée en sérigraphie, exposée dans le hall du festival et vendue au profit d'une école de musique locale.",
  },
  {
    id: "vinyle",
    title: "Pensée sur l'amour",
    image: "/images/vinyle_projet_4.png",
    category: "Identité visuelle",
    year: "2023",
    accent: "#7A7350",
    pattern: "type",
    size: "normal",
    tagline: "Recueil de poésie contemporaine",
    context:
      "Une jeune maison d'édition indépendante prépare son premier recueil, un texte court et dense sur le rapport au temps qui passe.",
    objective:
      "Concevoir un objet-livre qui donne au texte l'espace de respirer, sans jamais l'illustrer au premier degré.",
    concept:
      "Grain joue sur la texture du papier et sur un seul caractère typographique poussé dans tous ses états : romain, italique, capitales, jusqu'à l'épuisement de la page.",
    role: "Direction artistique, mise en page, choix des matières",
    tools: ["InDesign", "Illustrator"],
    process:
      "Plusieurs maquettes papier ont été testées avant impression pour juger du grain exact, du poids du livre en main et de la façon dont l'encre se pose sur une matière non couchée.",
    results:
      "Un recueil de 96 pages, tiré à 500 exemplaires, salué pour son objet autant que pour son texte lors de sa sortie en librairie indépendante.",
  },
  {
    id: "pokematch",
    title: "Collaboration Roland Garros",
    image: "/images/pokematch_projet_5.png",
    category: "Identité visuelle",
    year: "2024",
    accent: "#4C7A54",
    pattern: "blob",
    size: "tall",
    tagline: "Gamme de cosmétique solide",
    context:
      "Une marque de cosmétique solide, fabriquée en Bretagne à partir d'algues locales, prépare son lancement en magasin bio.",
    objective:
      "Concevoir un packaging sans plastique, capable de raconter l'origine des ingrédients sans tomber dans l'imagerie « nature » attendue.",
    concept:
      "Chaque référence porte la silhouette d'une algue réelle, dessinée à l'encre puis simplifiée jusqu'à devenir un motif presque abstrait, unique par produit.",
    role: "Direction artistique, packaging, illustration botanique",
    tools: ["Illustrator", "Photoshop"],
    process:
      "Des séances de dessin d'observation en bord de mer ont nourri chaque silhouette, ensuite vectorisée et testée en impression sur carton recyclé non blanchi.",
    results:
      "Une gamme de huit produits, un packaging entièrement recyclable et une identité immédiatement reconnaissable en rayon.",
  },
  {
    id: "halo",
    title: "Halo",
    category: "UI / Digital",
    year: "2024",
    accent: "#7C6FEE",
    pattern: "waves",
    size: "wide",
    tagline: "Application de respiration et de sommeil",
    context:
      "Une application indépendante de respiration guidée cherche à se distinguer des interfaces de méditation trop lisses et interchangeables.",
    objective:
      "Dessiner une interface calme mais habitée, avec une vraie identité graphique plutôt qu'un dégradé pastel générique.",
    concept:
      "Halo s'organise autour d'un seul élément animé, un cercle qui respire littéralement au rythme de l'utilisateur, et d'une typographie ronde choisie pour sa douceur sans être enfantine.",
    role: "UI design, direction artistique, motion",
    tools: ["Figma", "After Effects"],
    process:
      "De nombreux prototypes de respiration animée ont été testés avec des utilisateurs pour trouver un rythme ni trop lent, ni trop mécanique.",
    results:
      "Une application lancée sur iOS et Android, un système de composants réutilisable et une identité qui se démarque clairement du reste du secteur.",
  },
  {
    id: "relief",
    title: "Relief",
    category: "3D",
    year: "2023",
    accent: "#C9B92C",
    pattern: "stack",
    size: "normal",
    tagline: "Personnage et art toy expérimental",
    context:
      "Un projet personnel né d'une envie de faire sortir mes personnages illustrés du papier, et de les rendre manipulables.",
    objective:
      "Concevoir un art toy en édition limitée, pensé dès le départ pour la fabrication en résine.",
    concept:
      "Relief reprend un personnage récurrent de mes carnets, simplifié en formes empilées pour tenir debout et se décliner facilement en plusieurs coloris.",
    role: "Design de personnage, modélisation 3D, direction de fabrication",
    tools: ["Cinema 4D", "Blender", "Procreate"],
    process:
      "De l'esquisse au fichier d'impression 3D, en passant par plusieurs prototypes physiques pour ajuster l'équilibre de la figurine.",
    results:
      "Une première série de 50 pièces en résine peintes à la main, vendue lors d'un marché de créateurs et sur commande.",
  },
  {
    id: "spectre",
    title: "Spectre",
    category: "Illustration",
    year: "2022",
    accent: "#D6398C",
    pattern: "scatter",
    size: "normal",
    tagline: "Série d'illustrations pour la presse",
    context:
      "Un magazine culturel me commande une série d'illustrations pour accompagner un dossier sur la mémoire et les souvenirs qui s'effacent.",
    objective:
      "Traduire une idée abstraite et un peu triste sans verser dans le pathos, avec une palette et un vocabulaire graphique qui restent identifiables.",
    concept:
      "Chaque image superpose plusieurs couches semi-transparentes, comme des souvenirs qui se recouvrent les uns les autres sans jamais se figer.",
    role: "Illustration éditoriale",
    tools: ["Procreate", "Photoshop"],
    process:
      "Chaque illustration part d'un croquis rapide au feutre, scanné puis reconstruit numériquement par couches successives.",
    results:
      "Six illustrations publiées sur quatre pages du magazine, puis reprises dans une exposition collective sur le thème de la mémoire.",
  },
  {
    id: "cabinet",
    title: "Cabinet de curiosités",
    category: "Projets personnels",
    year: "2021 — en cours",
    accent: "#4640D6",
    pattern: "frame",
    size: "big",
    tagline: "Journal graphique et objets expérimentaux",
    context:
      "Un espace personnel, sans commanditaire ni contrainte, où j'accumule affiches auto-initiées, objets, typographies et expériences visuelles.",
    objective:
      "Garder un terrain d'essai vivant, où je peux me tromper, tester des idées trop risquées pour un client et nourrir mes projets commandés.",
    concept:
      "Le cabinet de curiosités fonctionne comme une collection plutôt qu'un portfolio : chaque pièce garde sa cohérence propre, l'ensemble prenant sens par accumulation.",
    role: "Tout, du concept à la fabrication",
    tools: ["Illustrator", "Procreate", "Cinema 4D", "Risographie"],
    process:
      "Une pièce par mois, sans exception, publiée qu'elle me plaise ou non : la contrainte de régularité compte plus que le résultat final.",
    results:
      "Plus de quarante pièces à ce jour, plusieurs reprises en commande par des clients ayant découvert le projet, et un vivier permanent d'idées.",
  },
];

const NAV_ITEMS = [
  { id: "home", label: "Accueil" },
  { id: "projects", label: "Projets" },
  { id: "about", label: "À propos" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/*  VISUAL PLACEHOLDER ART                                              */
/* ------------------------------------------------------------------ */

function Art({ accent, pattern, ink = "#17142B", paper = "#F1F0F7" }) {
  const common = { width: "100%", height: "100%", display: "block" };
  switch (pattern) {
    case "grid":
      return (
        <svg viewBox="0 0 400 500" style={common} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="500" fill={paper} />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={"v" + i} x1={i * 44 + 10} y1="0" x2={i * 44 + 10} y2="500" stroke={ink} strokeOpacity="0.12" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={"h" + i} x1="0" y1={i * 46 + 10} x2="400" y2={i * 46 + 10} stroke={ink} strokeOpacity="0.12" />
          ))}
          <rect x="54" y="102" width="176" height="138" fill={accent} />
          <rect x="230" y="240" width="132" height="184" fill={ink} />
          <circle cx="142" cy="332" r="46" fill={paper} stroke={ink} strokeWidth="2" />
        </svg>
      );
    case "stripes":
      return (
        <svg viewBox="0 0 400 300" style={common} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="300" fill={ink} />
          {Array.from({ length: 6 }).map((_, i) => (
            <polygon key={i} points={`${-40 + i * 90},320 ${40 + i * 90},320 ${180 + i * 90},-20 ${100 + i * 90},-20`} fill={i % 2 === 0 ? accent : paper} opacity={i % 2 === 0 ? 1 : 0.9} />
          ))}
        </svg>
      );
    case "circles":
      return (
        <svg viewBox="0 0 400 400" style={common} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="400" fill={ink} />
          <circle cx="200" cy="200" r="150" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
          <circle cx="200" cy="200" r="110" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7" />
          <circle cx="230" cy="180" r="64" fill={accent} />
          <circle cx="150" cy="260" r="20" fill={paper} />
        </svg>
      );
    case "type":
      return (
        <svg viewBox="0 0 400 300" style={common} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="300" fill={paper} />
          <text x="20" y="110" fontFamily="Fraunces, serif" fontSize="120" fontStyle="italic" fill={ink} opacity="0.9">Gr</text>
          <text x="150" y="230" fontFamily="Fraunces, serif" fontSize="120" fill={accent}>ain</text>
          <line x1="24" y1="255" x2="376" y2="255" stroke={ink} strokeWidth="1" opacity="0.3" />
        </svg>
      );
    case "blob":
      return (
        <svg viewBox="0 0 400 500" style={common} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="500" fill={paper} />
          <path d="M120 90 C 40 140, 40 300, 130 360 C 220 420, 340 380, 350 270 C 360 160, 260 60, 180 70 C 160 72, 140 78, 120 90 Z" fill={accent} />
          <path d="M170 150 C 130 180, 140 260, 190 290 C 240 320, 300 290, 300 230 C 300 170, 230 130, 190 140 Z" fill={ink} opacity="0.15" />
        </svg>
      );
    case "waves":
      return (
        <svg viewBox="0 0 400 300" style={common} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="300" fill={ink} />
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M -20 ${80 + i * 45} C 80 ${20 + i * 45}, 160 ${140 + i * 45}, 420 ${60 + i * 45}`} fill="none" stroke={i % 2 === 0 ? accent : paper} strokeOpacity={i % 2 === 0 ? 0.9 : 0.35} strokeWidth="3" />
          ))}
          <circle cx="200" cy="150" r="46" fill={accent} opacity="0.9" />
        </svg>
      );
    case "stack":
      return (
        <svg viewBox="0 0 400 400" style={common} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="400" fill={paper} />
          <ellipse cx="200" cy="330" rx="90" ry="18" fill={ink} opacity="0.12" />
          <rect x="130" y="230" width="140" height="70" rx="18" fill={accent} />
          <rect x="150" y="150" width="100" height="90" rx="26" fill={ink} />
          <circle cx="200" cy="110" r="46" fill={accent} />
          <circle cx="182" cy="100" r="6" fill={paper} />
          <circle cx="218" cy="100" r="6" fill={paper} />
        </svg>
      );
    case "scatter":
      return (
        <svg viewBox="0 0 400 300" style={common} preserveAspectRatio="xMidYMid slice">
          <rect width="400" height="300" fill={paper} />
          <circle cx="90" cy="90" r="60" fill={accent} opacity="0.55" />
          <circle cx="150" cy="140" r="60" fill={ink} opacity="0.5" />
          <circle cx="230" cy="90" r="60" fill={accent} opacity="0.4" />
          <circle cx="270" cy="180" r="50" fill={ink} opacity="0.35" />
          <circle cx="180" cy="210" r="40" fill={accent} opacity="0.6" />
        </svg>
      );
    case "frame":
    default:
      return (
        <svg viewBox="0 0 500 400" style={common} preserveAspectRatio="xMidYMid slice">
          <rect width="500" height="400" fill={paper} />
          <rect x="24" y="24" width="452" height="352" fill="none" stroke={ink} strokeWidth="1.5" opacity="0.5" />
          <rect x="60" y="60" width="160" height="140" fill={accent} />
          <circle cx="350" cy="130" r="70" fill={ink} opacity="0.9" />
          <rect x="70" y="240" width="360" height="10" fill={ink} opacity="0.3" />
          <rect x="70" y="264" width="230" height="10" fill={ink} opacity="0.3" />
          <path d="M300 300 L 340 340 L 380 300 L 420 340" fill="none" stroke={accent} strokeWidth="4" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  SMALL UI PIECES                                                     */
/* ------------------------------------------------------------------ */

function Wordmark({ onClick }) {
  return (
    <button className="wordmark" onClick={onClick} aria-label="Retour à l'accueil">
      <img
  src="/images/Logo_sula.svg"
  alt="Logo Sula"
  style={{ width: "280px", height: "auto" }}
/>
    </button>
  );
}

function Nav({ page, go }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <Wordmark onClick={() => go("home")} />
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Ouvrir le menu"
      >
        {menuOpen ? "✕" : "☰"}
  </button>
  <div className={`mobile-menu-overlay ${menuOpen ? "is-open" : ""}`}>

  <span className="menu-star star-1">★</span>
  <span className="menu-star star-2">★</span>
  <span className="menu-star star-3">★</span>
  <span className="menu-star star-4">★</span>
  <span className="menu-star star-5">★</span>

  {NAV_ITEMS.map((item, index) => (
    <button
      key={item.id}
      className="mobile-menu-link"
      style={{ "--delay": `${index * 0.08}s` }}
      onClick={() => {
        go(item.id);
        setMenuOpen(false);
      }}
    >
      {item.label}
    </button>
  ))}
</div>
      <nav className="nav-links">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={"nav-link" + (page === item.id ? " is-active" : "")}
            onClick={() => go(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-row">
        <p className="site-footer-line">Basée à Lyon, disponible partout.</p>
        <div className="site-footer-links">
          <a href="mailto:bonjour@solenecrouzet.studio">bonjour@solenecrouzet.studio</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className="site-footer-row site-footer-row-bottom">
        <span>© {new Date().getFullYear()} Solène Crouzet</span>
        <button className="text-link" onClick={() => go("contact")}>Travaillons ensemble</button>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGES                                                               */
/* ------------------------------------------------------------------ */

function Home({ go, openProject }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const featured = [PROJECTS[0], PROJECTS[1], PROJECTS[2], PROJECTS[3]];

  return (
    <div className="page">
      <section className={"hero" + (loaded ? " is-loaded" : "")}>

 <div className="hero-banner">
  <span className="hero-star hero-star-1">★</span>
<span className="hero-star hero-star-2">★</span>
<span className="hero-star hero-star-3">★</span>
  <div className="hero-content">
  <img
    src="/images/titre_portfolio.svg"
    alt="Portfolio"
    className="hero-logo"
  />
  <div className="hero-specialty">
  <span className="hero-specialty-icon">›</span>
  <span className="hero-specialty-text">
    Design graphique et illustration
  </span>
</div>

</div>

  </div>
      </section>
<section className="presentation-home">

  <p className="presentation-home-text">
    Bienvenue dans mon univers ! J’imagine et conçois des identités visuelles et des projets créatifs, du print au digital. Vous avez un projet ou une idée en tête ? N’hésitez pas à me contacter, je serais ravie d’en discuter avec vous !
  </p>

  <button
    className="presentation-home-button"
    onClick={() => go("contact")}
  >
    Me contacter
  </button>

</section>
      <section className="section">
        <div className="section-head">
          <h2>Quelques projets</h2>
          <button className="text-link" onClick={() => go("projects")}>Tous les projets</button>
        </div>
        <div className="featured-grid">
          {featured.map((p, i) => (
            <button
              key={p.id}
              className={"featured-tile featured-tile-" + (i % 2 === 0 ? "a" : "b")}
              onClick={() => openProject(p.id)}
            >
              <div className="featured-art">
              <img
                src={p.image}
                alt={p.title}
                className={
                  p.id === "binche"
                    ? "image-binche"
                    : p.id === "elmer"
                    ? "image-elmer"
                    : p.title === "Pensée sur l'amour"
                    ? "image-pensee"
                    : p.id === "ossature"
                    ? "image-pamparina"
                    : ""
                }
              />
              </div>
              
              <div className="featured-meta">
                <span className="featured-arrow">›</span>
                
                <div className="featured-text">
                  <div className="featured-title">{p.title}</div>
                  <div className="featured-cat">{p.category}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span className="marquee-set" key={i}>
              Identité visuelle&nbsp;&nbsp;·&nbsp;&nbsp;Branding&nbsp;&nbsp;·&nbsp;&nbsp;Typographie&nbsp;&nbsp;·&nbsp;&nbsp;Illustration&nbsp;&nbsp;·&nbsp;&nbsp;3D&nbsp;&nbsp;·&nbsp;&nbsp;Direction artistique&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <section className="section about-teaser">
        <div className="about-teaser-portrait">
  <img
    src="/images/photo_solene.png"
    alt="Solène Crouzet"
    className="about-teaser-image"
  />
</div>
        <div className="about-teaser-text">
          <h2>À propos de moi</h2>
          <p>
            Moi, c’est Solène, j’ai 21 ans et je suis graphiste récemment diplômée. 
            J’aime imaginer des univers, donner vie à des idées et créer des projets qui ont leur propre personnalité. 
            Au fil de mes études et de mes expériences, j’ai eu l’occasion de travailler sur des projets très variés, 
            qui m’ont permis d’expérimenter, de développer ma créativité et de construire petit à petit mon propre univers graphique.
          </p>
          <button className="text-link" onClick={() => go("about")}>Mon parcours et mes outils</button>
        </div>
      </section>

      <Footer go={go} />
    </div>
  );
}

function Projects({ openProject }) {
  const [filter, setFilter] = useState("Tous");
  const list = filter === "Tous" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="page">
      <section className="section projects-head">
        <h1>Projets</h1>
        <p className="projects-intro">
          Neuf projets, neuf terrains différents : identité, packaging,
          édition, illustration, un peu de 3D. Cliquez sur un projet pour
          voir la démarche complète.
        </p>
        <div className="chips" role="tablist">
          <button className={"chip" + (filter === "Tous" ? " is-active" : "")} onClick={() => setFilter("Tous")}>Tous</button>
          {CATEGORIES.map((c) => (
            <button key={c} className={"chip" + (filter === c ? " is-active" : "")} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="editorial-grid" key={filter}>
        {list.map((p) => (
          <button
            key={p.id}
            className={"editorial-tile editorial-tile-" + p.size}
            onClick={() => openProject(p.id)}
          >
            <div className="editorial-art"><Art accent={p.accent} pattern={p.pattern} /></div>
            <div className="editorial-overlay" style={{ "--tile-accent": p.accent }}>
              <span className="editorial-cat">{p.category}</span>
              <span className="editorial-title">{p.title}</span>
              <span className="editorial-tagline">{p.tagline}</span>
            </div>
          </button>
        ))}
      </section>
    </div>
  );
}

function ProjectDetail({ project, openProject, go }) {
  const index = PROJECTS.findIndex((p) => p.id === project.id);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="page">
      <section className="project-header">
        <button className="back-link" onClick={() => go("projects")}>Tous les projets</button>
        <div className="project-header-row">
          <h1>{project.title}</h1>
          <dl className="project-meta">
            <div><dt>Année</dt><dd>{project.year}</dd></div>
            <div><dt>Catégorie</dt><dd>{project.category}</dd></div>
            <div><dt>Rôle</dt><dd>{project.role}</dd></div>
            <div><dt>Logiciels</dt><dd>{project.tools.join(", ")}</dd></div>
          </dl>
        </div>
        <p className="project-tagline">{project.tagline}</p>
      </section>

      <div className="project-hero-art"><Art accent={project.accent} pattern={project.pattern} /></div>

      <section className="project-body">
        <div className="project-block">
          <h3>Contexte</h3>
          <p>{project.context}</p>
        </div>
        <div className="project-block">
          <h3>Objectif</h3>
          <p>{project.objective}</p>
        </div>
      </section>

      <div className="project-two-art">
        <div className="project-art-item"><Art accent={project.accent} pattern="scatter" /></div>
        <div className="project-art-item"><Art accent={project.accent} pattern="grid" /></div>
      </div>

      <section className="project-body project-body-alt">
        <div className="project-block">
          <h3>Concept</h3>
          <p>{project.concept}</p>
        </div>
        <div className="project-block">
          <h3>Processus créatif</h3>
          <p>{project.process}</p>
        </div>
      </section>

      <div className="project-hero-art project-hero-art-short"><Art accent={project.accent} pattern="stack" /></div>

      <section className="project-body">
        <div className="project-block project-block-wide">
          <h3>Résultats</h3>
          <p>{project.results}</p>
        </div>
      </section>

      <nav className="project-pager">
        <button onClick={() => openProject(prev.id)}>
          <span className="project-pager-label">Projet précédent</span>
          <span className="project-pager-title">{prev.title}</span>
        </button>
        <button onClick={() => openProject(next.id)} className="project-pager-next">
          <span className="project-pager-label">Projet suivant</span>
          <span className="project-pager-title">{next.title}</span>
        </button>
      </nav>

      <Footer go={go} />
    </div>
  );
}

function About({ go }) {
  const timeline = [
    { year: "2018", text: "Licence arts appliqués, option design graphique — Lyon." },
    { year: "2020", text: "Master direction artistique, spécialisation identité de marque." },
    { year: "2021", text: "Premières commandes en freelance, aux côtés d'un studio de branding." },
    { year: "2023", text: "Installation en indépendante à temps plein, à Lyon." },
    { year: "2024", text: "Premiers projets d'édition limitée et d'objets 3D imprimés." },
  ];

  return (
    <div className="page">
      <section className="about-hero">
       <div className="about-portrait">
  <img src="/images/photo_solene.png" alt="Solène Crouzet" />
</div>
        <div className="about-intro">
          <h1>À propos</h1>
          <p className="about-lede">
            Je suis graphiste, passionnée par tout ce qui donne une forme à
            une idée : une identité, une affiche, un objet en volume. J'aime
            autant travailler sur des projets très cadrés que sur des choses
            plus manuelles et expérimentales, où j'ai le droit de me tromper.
          </p>
          <p>
            Ce qui m'intéresse particulièrement : le branding, la direction
            artistique, l'illustration, la typographie, la 3D, les objets et
            art toys, et toutes les expérimentations graphiques qui n'ont pas
            encore de nom. Je crois qu'un bon projet garde toujours une trace
            de la main qui l'a fait, même quand il finit sur un écran.
          </p>
        </div>
      </section>

      <section className="section about-grid">
        <div>
          <h3 className="about-label">Compétences</h3>
          <ul className="tag-list">
            {["Identité de marque", "Direction artistique", "Illustration", "Typographie", "Packaging", "Motion léger", "Modélisation 3D"].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="about-label">Logiciels</h3>
          <ul className="tag-list">
            {["Illustrator", "Photoshop", "InDesign", "Figma", "Procreate", "Cinema 4D", "After Effects"].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <h3 className="about-label">Parcours</h3>
        <ul className="timeline">
          {timeline.map((t) => (
            <li key={t.year}>
              <span className="timeline-year">{t.year}</span>
              <span className="timeline-text">{t.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section about-cta">
        <p>Une idée, un projet, une envie de collaborer ?</p>
        <button className="btn btn-primary" onClick={() => go("contact")}>Écrivons-nous</button>
      </section>

      <Footer go={go} />
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="page">
      <section className="contact-hero">
        <h1>
          Parlons de <span className="italic">votre projet</span>.
        </h1>
        <p>
          Que ce soit pour une identité complète, un objet ponctuel ou une
          simple envie d'échanger, je réponds toujours moi-même.
        </p>
      </section>

      <section className="contact-body">
        <div className="contact-details">
          <a className="contact-email" href="mailto:bonjour@solenecrouzet.studio">bonjour@solenecrouzet.studio</a>
          <div className="contact-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <p className="contact-note">
            Ouverte aux missions freelance, aux collaborations ponctuelles et
            aux projets un peu fous. Basée à Lyon, je travaille aussi à
            distance.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {sent ? (
            <div className="contact-success">
              <p>Message envoyé — merci !</p>
              <p className="contact-success-sub">Je reviens vers vous très vite.</p>
            </div>
          ) : (
            <>
              <label>
                Nom
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label>
                E-mail
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label>
                Message
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>
              <button type="submit" className="btn btn-primary">Envoyer le message</button>
            </>
          )}
        </form>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  const [page, setPage] = useState("home");
  const [projectId, setProjectId] = useState(PROJECTS[0].id);
  const scrollRef = useRef(null);

  function go(p) {
    setPage(p);
    window.scrollTo(0, 0);
  }

  function openProject(id) {
    setProjectId(id);
    setPage("project");
    window.scrollTo(0, 0);
  }

  const currentProject = PROJECTS.find((p) => p.id === projectId);

  return (
    <div className="app-root" ref={scrollRef}>
      <style>{CSS}</style>
      <Nav page={page} go={go} />
      <main key={page + projectId} className="page-transition">
        {page === "home" && <Home go={go} openProject={openProject} />}
        {page === "projects" && <Projects openProject={openProject} />}
        {page === "project" && <ProjectDetail project={currentProject} openProject={openProject} go={go} />}
        {page === "about" && <About go={go} />}
        {page === "contact" && <Contact />}
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CSS                                                                 */
/* ------------------------------------------------------------------ */

const CSS = `
html,
body {
  margin: 0;
  min-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
  * {
  box-sizing: border-box;
}
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Inter:wght@400;500;600&display=swap');

.app-root {
  --ink: #17142B;
  --paper: #F1F0F7;
  --paper-2: #E7E4F0;
  --accent: #FFBEE3;
  --accent-text: color-mix(in srgb, #FFBEE3 35%, #17142B 65%);
  --serif: 'Fraunces', serif;
  --sans: 'Inter', sans-serif;

  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

.app-root * { box-sizing: border-box; }
.app-root button { font-family: inherit; background: none; border: none; cursor: pointer; color: inherit; padding: 0; }
.app-root a { color: inherit; }
.app-root ul { list-style: none; margin: 0; padding: 0; }
.app-root dl { margin: 0; }
.app-root h1, .app-root h2, .app-root h3 { font-family: var(--serif); font-weight: 500; margin: 0; }
.app-root p { margin: 0; }

.page-transition {
  animation: fadeIn 0.8s ease-in-out both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
}
@media (prefers-reduced-motion: reduce) {
  .page-transition { animation: none; }
}

/* ---------- NAV ---------- */
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px clamp(20px, 4vw, 48px);
  background: #111111;
  border-bottom: none;
}
  nav a {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
}
.wordmark {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  letter-spacing: 0.02em;
}
  
.nav-links { display: flex; gap: clamp(14px, 2.4vw, 30px); }
.nav-link {
  font-size: 0.85rem;
  position: relative;
  padding-bottom: 3px;
  color: white ! important;
  transition: color 0.2s ease;
}
.nav-link::after {
  content: "";
  position: absolute;
  left: 0; right: 100%; bottom: 0;
  height: 1px;
  background: var(--accent);
  transition: right 0.25s ease;
}
.nav-link:hover {
  color: #ff83d6 !important;
}

.nav-link.is-active {
  color: white !important;
}

.menu-toggle {
  display: none;
}
.mobile-menu-overlay {
  display: none;
}

/* ---------- LAYOUT HELPERS ---------- */
.page { display: flex; flex-direction: column; }
.section { padding: clamp(40px, 6vw, 80px) clamp(20px, 4vw, 48px); }

.section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 16px;
}
.section-head h2 {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
}

.text-link {
  font-size: 0.85rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;

  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  color: var(--accent-text);
  white-space: nowrap;
}

.btn {
  font-size: 0.9rem;
  padding: 13px 26px;
  border-radius: 999px;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.btn-primary { background: var(--ink); color: var(--paper); }
.btn-primary:hover { background: var(--accent); color: var(--ink); transform: translateY(-1px); }
.btn-ghost { border: 1px solid color-mix(in srgb, var(--ink) 30%, transparent); }
.btn-ghost:hover { border-color: var(--ink); transform: translateY(-1px); }

/* ---------- HERO ---------- */
.hero {
  height: calc(100vh - 80px);
  padding: 0;
  position: relative;
  overflow: hidden;
}
.hero-role {
  font-size: 0.85rem;
  color: white;
  opacity: 0;
  transform: translateY(6px);
}
.hero-banner {
  width: 100%;
  height: calc(100vh - 90px);
  background: color #ffffff;

.hero-content {
  position: absolute;
  top: 46%;
  left: 50%;

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  z-index: 3;

  transform: translate(-50%, -50%);
}
.hero-logo {
  width: 1500px !important;
  max-width: 85% !important;
  height: auto !important;
  display: block;
  margin: 0 auto;
}
.hero-signature {
  width: 250px;
  height: auto;
  display: block;
  margin: -90px auto 20px;
  transform: translateX(60px);
}
.home-intro {
  width: 100% !important;
  min-height: 420px !important;

  background: linear-gradient(
    110deg,
    #ff00a8 0%,
    #ff39b2 45%,
    #f5b1d0 100%
  ) !important;

  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;

  padding: 70px 30px !important;
  text-align: center !important;
}

.home-intro .hero-description {
  color: white !important;
  max-width: 760px;
  margin: 0 auto 55px;
  text-align: center;
}

.home-intro .hero-button {
  background: #111 !important;
  color: white !important;
}
.hero-specialty {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  width: 700px;
  max-width: 85%;
  margin: 0px auto 0;
  position: relative;
  left: -130px;
  top: -60px;
}

.hero-specialty-icon {
  width: 58px;
  height: 58px;
  min-width: 58px;

  border-radius: 50%;
  background: #111;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  font-weight: 700;
}

.hero-specialty-text {
  background: #111;
  color: white;

  padding: 15px 28px;
  border-radius: 999px;

  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.2;
}
.hero-description {
  margin: 0 0 24px;
  color: #ffffff;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  line-height: 1.5;
  max-width: 700px;
  margin: 20px auto 0;
}
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
 .hero-button {
  margin-top:80px;
  display: inline-block;

  min-width: 160px !important;
  padding: 25px 55px !important;

  background-color: black !important;
  color: white !important;

  border: none !important;
  border-radius: 50px !important;

  font-size: 1.20rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;

  text-decoration: none;
  cursor: pointer;

  transition: 0.3s ease;
}

.hero-button:hover {
  background-color: white !important;
  color: #000000 !important;
}
  .hero-banner-title {
  margin: 0;
  text-align: center;
  font-size: clamp(4rem, 10vw, 9rem);
  color: white;
  line-height: 1;
}

.hero-banner-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.35),
    rgba(0, 0, 0, 0)
  );
}

.hero-banner-title {
  margin: 0;
  position: static;
  text-align: center;
  font-size: clamp(4rem, 10vw, 9rem);
  color: white;
  line-height: 1;
}

.hero-name {
  font-size: clamp(3.6rem, 13vw, 8.5rem);
  line-height: 0.92;
  display: flex;
  flex-direction: column;
}
.hero-name-line {
  opacity: 0;
  transform: translateY(16px);
  display: inline-block;
}
.hero-name-line-italic { font-style: italic; color: var(--accent-text); margin-left: clamp(20px, 8vw, 120px); }
.hero.is-loaded .hero-role { animation: riseIn 0.7s ease 0.05s forwards; }
.hero.is-loaded .hero-name-line:nth-child(1) { animation: riseIn 0.7s ease 0.15s forwards; }
.hero.is-loaded .hero-name-line:nth-child(2) { animation: riseIn 0.7s ease 0.3s forwards; }
@keyframes riseIn { to { opacity: 1; transform: translateY(0); } }

.hero-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 30px;
  flex-wrap: wrap;
  border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  padding-top: 26px;
}
.hero-tagline { max-width: 34ch; font-size: 1.05rem; }
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }

/* ---------- FEATURED GRID (home) ---------- */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.featured-tile-a,
.featured-tile-b {
  grid-row: auto;
  margin-top: 0;
}
.featured-art {
  width: 100%;
  height: 330px;
  position: relative;
  overflow: hidden;
  border-radius: 30px 30px 0 0;
  flex-shrink: 0;
}
  .featured-art::after {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    180deg,
    #ffbee3 0%,
    #ff83d6 50%,
    #ff00aa 100%
  );

  mix-blend-mode: multiply;

  opacity: 1;
  transition: opacity 0.45s ease;

  pointer-events: none;
}
  .featured-tile:hover .featured-art img {
  filter: grayscale(0%);
  transform: scale(1.03);

}

.featured-tile:hover .featured-art::after {
  opacity: 0;
}

.featured-art svg,
.featured-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 30px 30px 0 0 !important;
  filter: grayscale(100%);
  transition: filter 0.45s ease, transform 0.45s ease;
  overflow: hidden;
}

.image-pamparina {
  transform: scale(1.08);
}
.featured-tile:hover .featured-art img.image-pamparina {
  transform: scale(1.14);
}
.image-binche {
  transform: scale(1.2) translateY(18px) !important;
}
.featured-tile:hover .featured-art img.image-binche {
  transform: scale(1.27) translateY(18px) !important;
}
.image-elmer {
  object-fit: cover;
  object-position: 54% center;
}
.featured-tile:hover .featured-art img.image-elmer {
}
.image-pensee {
  object-fit: cover;
  object-position: 80% center !important;

  transform: scale(1.08) translateY(-8px);
}
.featured-tile:hover .featured-art img.image-pensee {
  object-position: 80% center !important;
  transform: scale(1.14) translateY(-8px);
}

.featured-meta {
  width: 100%;
  height: 100px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  gap: 12px;

  padding: 0 24px;
  box-sizing: border-box;

  text-align: left;
}
  .featured-arrow {
  width: 46px;
  height: 46px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #111111;
  color: white;

  border-radius: 50%;

  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
}

.featured-text {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  align-items: flex-start !important;
}

.featured-title {
  margin: 0 !important;
  font-family: "Montserrat", sans-serif;
  font-size: 1.08rem !important;
  font-weight: 700;
  color: #111111;
  line-height: 1.05;
}

.featured-tile {
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 430px;

  display: flex;
  flex-direction: column;

  background: #ffffff;
  border-radius: 30px !important;

  padding: 14px;

 box-shadow:
  0 2px 2px rgba(0, 0, 0, 0.3),
  0 10px 10px rgba(0, 0, 0, 0.2);

  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
    .featured-tile:hover {
  transform: translateY(-10px) rotate(-1deg);

  box-shadow:
    0 2px 2px rgba(0, 0, 0, 0.3),
    0 10px 10px rgba(0, 0, 0, 0.2);
}
.featured-cat {
  font-family: "elite", sans-serif !important;
  font-weight: 500 !important;
  font-size: 1rem !important;
  line-height: 1 !important;
  margin: 6px 0 0 !important;
  color: #111111 !important;
}
/* ---------- MARQUEE ---------- */
.marquee {
  overflow: hidden;
  border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  padding: 20px 0;
  white-space: nowrap;
  background: linear-gradient(-90deg, #ff00a8, #e8a0c8);
  color: white;
}
.marquee-track { display: inline-flex; animation: marquee 26s linear infinite; }
.marquee-set {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  color: white;
  font-size: clamp(1.3rem, 3vw, 2rem);
  padding-right: 8px;
}
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee-track { animation: none; } }

/* ---------- ABOUT TEASER (home) ---------- */
.about-teaser {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: clamp(24px, 5vw, 60px);
  align-items: center;
}
.about-teaser-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.about-teaser-portrait {
  width: 100%;
  max-width: 350px;
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  transform: translateX(160px);
}
.about-teaser-portrait img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-teaser-text h2 {
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  margin-bottom: 16px;
}

.about-teaser-text p {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  max-width: 50ch;
  margin-bottom: 18px;
  color: color-mix(in srgb, var(--ink) 82%, transparent);
}

/* ---------- FOOTER ---------- */
.site-footer {
  margin-top: auto;
  padding: 34px clamp(20px, 4vw, 48px) 40px;
  border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.site-footer-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
.site-footer-links { display: flex; gap: 20px; font-size: 0.85rem; }
.site-footer-links a { border-bottom: 1px solid transparent; }
.site-footer-links a:hover { border-color: currentColor; }
.site-footer-row-bottom { font-size: 0.78rem; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.site-footer-line { font-family: var(--serif); font-style: italic; font-size: 1.1rem; color: var(--ink); }

/* ---------- PROJECTS PAGE ---------- */
.projects-head h1 { font-size: clamp(2.6rem, 6vw, 4.5rem); margin-bottom: 18px; }
.projects-intro { max-width: 50ch; margin-bottom: 28px; color: color-mix(in srgb, var(--ink) 75%, transparent); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  font-size: 0.82rem;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--ink) 25%, transparent);
  transition: all 0.2s ease;
}
.chip:hover { border-color: var(--ink); }
.chip.is-active { background: var(--ink); color: var(--paper); border-color: var(--ink); }

.editorial-grid {
  padding: 0 clamp(20px, 4vw, 48px) 80px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 18px;
  animation: fadeIn 0.4s ease both;
}
.editorial-tile { position: relative; overflow: hidden; border-radius: 4px; text-align: left; }
.editorial-tile-normal { grid-column: span 3; }
.editorial-tile-wide { grid-column: span 4; }
.editorial-tile-tall { grid-column: span 2; grid-row: span 2; }
.editorial-tile-big { grid-column: span 6; }
.editorial-art { aspect-ratio: 4/3; }
.editorial-tile-tall .editorial-art, .editorial-tile-tall { aspect-ratio: auto; height: 100%; }
.editorial-tile-tall .editorial-art { height: 100%; }
.editorial-tile-big .editorial-art { aspect-ratio: 21/9; }
.editorial-art svg { transition: transform 0.6s ease; }
.editorial-tile:hover .editorial-art svg { transform: scale(1.05) translateY(-2%); }
.editorial-overlay {
  position: absolute;
  inset: auto 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px;
  color: #fff;
  background: linear-gradient(0deg, color-mix(in srgb, var(--tile-accent) 78%, black 20%) 0%, transparent 75%);
  transform: translateY(8%);
  opacity: 0;
  transition: transform 0.35s ease, opacity 0.35s ease;
}
.editorial-tile:hover .editorial-overlay { transform: translateY(0); opacity: 1; }
.editorial-cat { font-size: 0.72rem; text-transform: none; opacity: 0.85; }
.editorial-title { font-family: var(--serif); font-size: 1.4rem; }
.editorial-tagline { font-size: 0.8rem; opacity: 0.85; max-width: 40ch; }

/* ---------- PROJECT DETAIL ---------- */
.project-header { padding: clamp(28px, 5vw, 60px) clamp(20px, 4vw, 48px) 20px; }
.back-link { font-size: 0.82rem; color: color-mix(in srgb, var(--ink) 60%, transparent); margin-bottom: 22px; display: inline-block; border-bottom: 1px solid transparent; }
.back-link:hover { border-color: currentColor; color: var(--ink); }
.project-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 20px;
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
  padding-bottom: 26px;
}
.project-header-row h1 { font-size: clamp(2.6rem, 7vw, 5rem); }
.project-meta { display: flex; gap: clamp(16px, 3vw, 34px); flex-wrap: wrap; }
.project-meta dt { font-size: 0.7rem; color: color-mix(in srgb, var(--ink) 55%, transparent); margin-bottom: 4px; }
.project-meta dd { margin: 0; font-size: 0.88rem; max-width: 22ch; }
.project-tagline { font-family: var(--serif); font-style: italic; font-size: 1.3rem; margin-top: 22px; color: var(--accent-text); }

.project-hero-art { margin: 0 clamp(20px, 4vw, 48px); border-radius: 4px; overflow: hidden; aspect-ratio: 16/8; }
.project-hero-art-short { aspect-ratio: 16/6; }

.project-body {
  padding: clamp(36px, 6vw, 70px) clamp(20px, 4vw, 48px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(24px, 5vw, 60px);
}
.project-body-alt { background: var(--paper-2); }
.project-block h3 { font-size: 0.85rem; color: color-mix(in srgb, var(--ink) 55%, transparent); margin-bottom: 12px; }
.project-block p { max-width: 46ch; font-size: 1.02rem; }
.project-block-wide { grid-column: 1 / -1; }
.project-block-wide p { max-width: 70ch; }

.project-two-art { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
.project-art-item { aspect-ratio: 1/1; overflow: hidden; }

.project-pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
}
.project-pager button { padding: 30px clamp(20px, 4vw, 48px); display: flex; flex-direction: column; gap: 6px; }
.project-pager-next { text-align: right; align-items: flex-end; border-left: 1px solid color-mix(in srgb, var(--ink) 12%, transparent); }
.project-pager-label { font-size: 0.75rem; color: color-mix(in srgb, var(--ink) 55%, transparent); }
.project-pager-title { font-family: var(--serif); font-size: 1.5rem; transition: color 0.2s ease; }
.project-pager button:hover .project-pager-title { color: var(--accent-text); }

/* ---------- ABOUT ---------- */
.about-hero {
  display: grid;
  grid-template-columns: 380px 500px;
  gap: 60px;
  padding: clamp(40px, 7vw, 80px) 20px 20px;
  align-items: center;
  justify-content: center;
}
.about-portrait { width: 100%; max-width: 420px; border-radius: 4px; overflow: hidden; aspect-ratio: 1 / 1; }
.about-portrait img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-intro h1 { font-size: clamp(2.6rem, 6vw, 4rem); margin-bottom: 20px; }
.about-lede { font-size: 1.15rem; margin-bottom: 16px; max-width: 54ch; }
.about-intro p:not(.about-lede) { max-width: 58ch; color: color-mix(in srgb, var(--ink) 80%, transparent); }
.about-label { font-size: 0.78rem; color: color-mix(in srgb, var(--ink) 55%, transparent); margin-bottom: 16px; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
.tag-list li { font-size: 0.85rem; padding: 8px 14px; border: 1px solid color-mix(in srgb, var(--ink) 20%, transparent); border-radius: 999px; }

.timeline { display: flex; flex-direction: column; }
.timeline li {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 20px;
  padding: 16px 0;
  border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
}
.timeline li:last-child { border-bottom: 1px solid color-mix(in srgb, var(--ink) 12%, transparent); }
.timeline-year { font-family: var(--serif); font-style: italic; color: var(--accent-text); }
.timeline-text { max-width: 60ch; }

.about-cta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent);
}
.about-cta p { font-family: var(--serif); font-size: 1.5rem; }

/* ---------- CONTACT ---------- */
.contact-hero { padding: clamp(48px, 8vw, 100px) clamp(20px, 4vw, 48px) 20px; max-width: 900px; }
.contact-hero h1 { font-size: clamp(2.6rem, 7vw, 4.6rem); margin-bottom: 18px; }
.contact-hero .italic { font-style: italic; color: var(--accent-text); }
.contact-hero p { font-size: 1.1rem; max-width: 50ch; color: color-mix(in srgb, var(--ink) 80%, transparent); }

.contact-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(30px, 6vw, 70px);
  padding: clamp(20px, 4vw, 48px) clamp(20px, 4vw, 48px) 90px;
}
.contact-details { display: flex; flex-direction: column; gap: 20px; align-items: flex-start; }
.contact-email {
  font-family: var(--serif);
  font-size: clamp(1.6rem, 3.4vw, 2.3rem);
  border-bottom: 2px solid var(--accent);
  padding-bottom: 4px;
}
.contact-socials { display: flex; gap: 18px; font-size: 0.9rem; }
.contact-socials a { border-bottom: 1px solid color-mix(in srgb, var(--ink) 30%, transparent); }
.contact-socials a:hover { border-color: var(--ink); }
.contact-note { max-width: 40ch; color: color-mix(in srgb, var(--ink) 70%, transparent); font-size: 0.95rem; }

.contact-form { display: flex; flex-direction: column; gap: 16px; }
.contact-form label { display: flex; flex-direction: column; gap: 6px; font-size: 0.82rem; color: color-mix(in srgb, var(--ink) 65%, transparent); }
.contact-form input, .contact-form textarea {
  font-family: var(--sans);
  font-size: 0.95rem;
  color: var(--ink);
  background: var(--paper-2);
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 12px 14px;
  resize: vertical;
  transition: border-color 0.2s ease;
}
.contact-form input:focus, .contact-form textarea:focus {
  outline: none;
  border-color: var(--accent);
}
.contact-form .btn { align-self: flex-start; margin-top: 6px; }
.contact-success { padding: 30px; background: var(--paper-2); border-radius: 4px; }
.contact-success p:first-child { font-family: var(--serif); font-size: 1.4rem; margin-bottom: 6px; }
.contact-success-sub { color: color-mix(in srgb, var(--ink) 60%, transparent); font-size: 0.9rem; }

.hero-star {
  position: absolute;
  pointer-events: none;
  z-index: 1;
  animation: heroStarFloat 4s ease-in-out infinite;

  background: linear-gradient(
    135deg,
    #ff2fa3 0%,
    #ff77c8 50%,
    #ffc1e3 100%
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-star-1 {
  display: none;
}
  .hero-star-3 {
  display: none;
}
.hero-star-2 {
  top: 14%;
  right: 19.5%;
  font-size: 7rem;
  animation: none !important;
}

@keyframes heroStarFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-10px) rotate(8deg);
  }
}
.presentation-home {
  width: 100%;
  min-height: 420px;
  box-sizing: border-box;

  background: linear-gradient(
    110deg,
    #ff00a8 0%,
    #ff39b2 45%,
    #f5b1d0 100%
  );

  padding: 70px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.presentation-home-text {
  width: 90% !important;
  max-width: 1100px !important;

  margin: 0 auto 50px;

  color: #ffffff;
  text-align: center;

  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.5;
}

.presentation-home-button {
  display: inline-block !important;

  margin-top: 50px !important;
  padding: 18px 50px !important;

  background: #111111 !important;
  color: #ffffff !important;

  border: none !important;
  border-radius: 999px !important;

  font-family: "Montserrat", sans-serif !important;
  font-size: 1rem !important;
  font-weight: 700 !important;

  cursor: pointer !important;
  transition: background 0.25s ease, color 0.25s ease;
}
  .presentation-home-button:hover {
  background: #ffffff !important;
  color: #111111 !important;
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 860px) {
  .featured-grid { grid-template-columns: repeat(2, 1fr); }
  .featured-tile-b { margin-top: 0; }
  .about-teaser, .about-hero, .about-grid, .project-body, .contact-body { grid-template-columns: 1fr; }
  .editorial-grid { grid-template-columns: repeat(2, 1fr); }
  .editorial-tile-normal, .editorial-tile-wide, .editorial-tile-big { grid-column: span 2; }
  .editorial-tile-tall { grid-column: span 2; height: auto; }
  .editorial-tile-tall .editorial-art { height: auto; aspect-ratio: 4/3; }
  .project-two-art { grid-template-columns: 1fr; }
  .project-pager { grid-template-columns: 1fr; }
  .project-pager-next { border-left: none; border-top: 1px solid color-mix(in srgb, var(--ink) 12%, transparent); align-items: flex-start; text-align: left; }
  .nav-links { gap: 14px; }
}

@media (max-width: 560px) {

.hero-star {
  display: none;
}
.hero-content {
  width: 90%;
  left: 50%;
  right: auto;
  top: 15% !important;
  transform: translateX(-50%);
}
  .mobile-menu-overlay {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: #ffffff !important;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  z-index: 9999;

  clip-path: circle(0% at 88% 8%);
  transition: clip-path 0.65s cubic-bezier(0.77, 0, 0.18, 1);

  pointer-events: none;
}

.mobile-menu-overlay.is-open {
  clip-path: circle(150% at 88% 8%);
  pointer-events: auto;
}

.mobile-menu-link {
  background: none;
  border: none;
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 2rem;
  cursor: pointer;

  opacity: 0;
  transform: translateY(20px);

  transition:
    opacity 0.35s ease,
    transform 0.45s ease;

  transition-delay: var(--delay);
}

.mobile-menu-overlay.is-open .mobile-menu-link {
  opacity: 1;
  transform: translateY(0);
}
  .menu-star {
  position: absolute;
  color: #ff3ba7;
  pointer-events: none;
  animation: starFloat 3s ease-in-out infinite;
}

.star-1 {
  top: 18%;
  left: 15%;
  font-size: 2rem;
}

.star-2 {
  top: 28%;
  right: 14%;
  font-size: 1.3rem;
  animation-delay: 0.5s;
}

.star-3 {
  top: 52%;
  left: 10%;
  font-size: 1.5rem;
  animation-delay: 1s;
}

.star-4 {
  bottom: 18%;
  right: 18%;
  font-size: 2.2rem;
  animation-delay: 1.5s;
}

.star-5 {
  bottom: 28%;
  left: 22%;
  font-size: 1.1rem;
  animation-delay: 0.8s;
}
  .menu-star {
  display: block;
  position: absolute;
  color: #ff3ba7;
  pointer-events: none;
  animation: starFloat 3s ease-in-out infinite;
}

@keyframes starFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.55;
  }

  50% {
    transform: translateY(-8px) rotate(12deg);
    opacity: 1;
  }
}

.hero-title {
  font-size: 3.2rem !important;
  white-space: nowrap;
  display: block;
}
.hero-signature {
  display: block;
  width: 120px !important;
  transform: translate(40px,25px)!important;
}
.hero-description {
  max-width: 80% !important;
  font-size: 0.8rem !important;
  margin-left: auto;
  margin-right: auto;
  margin-top: 55px !important;
  text-align: left;
  
}
.hero-button {
  padding: 14px 30px;
  font-size:1rem;
}
  .nav { padding: 16px 18px; }
  .nav-links { gap: 10px; }
  .nav-link { font-size: 0.75rem; }
  .hero-bottom { align-items: flex-start; }

  .nav-links {
  display: none;
}
.menu-toggle {
  display: block;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  margin-right: 15px;
  position: relative;
  z-index: 1001;
}
  .about-teaser-portrait {
  transform: none !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
`;
