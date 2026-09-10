import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

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
    image: "/images/Abris bus pamparina.png",
    category: "Identité visuelle",
    year: "2026",
    accent: "#4640D6",
    pattern: "grid",
    size: "tall",
    tagline: "Identité visuelle",
    context:
      "Un jeune collectif d'architectes basé à Lyon me contacte pour poser les bases visuelles de sa toute première identité, avant l'ouverture de son agence.",
    objective:
      "Traduire une pratique architecturale rigoureuse et sensible en un système graphique simple, capable de vivre sur un plan comme sur une carte de visite.",
    concept:
      "Le nom, Pamparina, m'a menée vers la structure elle-même : une grille visible, presque brute, qui organise chaque support comme un plan organise un bâtiment. Le logotype se construit sur cette même trame, colonne par colonne.",
    role: "Direction artistique, identité de marque, système graphique",
    tools: ["Illustrator", "Photoshop", "Indesign"],
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
    year: "2025",
    accent: "#FF5B39",
    pattern: "stripes",
    size: "wide",
    tagline: "Illustration couverture de livre",
    context:
      "Une marque de boisson énergisante 100 % naturelle souhaite se démarquer des codes du secteur, saturé de noir mat et de promesses de performance.",
    objective:
      "Créer une marque qui parle d'énergie sans crier, avec une identité assez forte pour tenir en rayon à côté des grands groupes.",
    concept:
      "Elmer s'appuie sur un seul geste graphique : une diagonale franche, reprise sur chaque support à une intensité différente. Elle devient tour à tour éclair, ligne d'horizon ou trait de rature.",
    role: "Branding, packaging, direction artistique photo",
    tools: ["Procreate, Indesign, Photoshop"],
    process:
      "Plus de trente itérations de la diagonale ont été testées avant de trouver le bon angle : ni trop agressif, ni trop sage. Chaque parfum reçoit sa propre couleur, la diagonale restant l'unique constante.",
    results:
      "Une gamme de six parfums lancée en épicerie fine, un packaging remarqué par la presse spécialisée et un système extensible à de futures références.",
  },
  {
    id: "binche",
    title: "Binche",
    image: "/images/binche_projet_3.png",
    category: "Affiche de carnaval",
    year: "2022",
    accent: "#8C2BD9",
    pattern: "circles",
    size: "normal",
    tagline: "Affiche de carnaval",
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
    id: "Ehpad",
    title: "Ehpad",
    image: "/images/ehpad_projet_6.png",
    category: "Site internet",
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
      "Ehpad s'organise autour d'un seul élément animé, un cercle qui respire littéralement au rythme de l'utilisateur, et d'une typographie ronde choisie pour sa douceur sans être enfantine.",
    role: "UI design, direction artistique, motion",
    tools: ["Figma", "After Effects"],
    process:
      "De nombreux prototypes de respiration animée ont été testés avec des utilisateurs pour trouver un rythme ni trop lent, ni trop mécanique.",
    results:
      "Une application lancée sur iOS et Android, un système de composants réutilisable et une identité qui se démarque clairement du reste du secteur.",
  },
  {
    id: "vinyle",
    title: "Musique",
    image: "/images/vinyle_projet_4.png",
    category: "Identité visuelle",
    year: "2023",
    accent: "#7A7350",
    pattern: "type",
    size: "normal",
    tagline: "Identité visuelle",
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
    id: "Pokematch",
    title: "Pokématch",
    image: "/images/pokematch_projet_5.png",
    category: "Identité visuelle",
    year: "2024",
    accent: "#4C7A54",
    pattern: "blob",
    size: "tall",
    tagline: "Identité visuelle pour une collaboration fictive",
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
        <svg
          viewBox="0 0 400 500"
          style={common}
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="500" fill={paper} />
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={"v" + i}
              x1={i * 44 + 10}
              y1="0"
              x2={i * 44 + 10}
              y2="500"
              stroke={ink}
              strokeOpacity="0.12"
            />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={"h" + i}
              x1="0"
              y1={i * 46 + 10}
              x2="400"
              y2={i * 46 + 10}
              stroke={ink}
              strokeOpacity="0.12"
            />
          ))}
          <rect x="54" y="102" width="176" height="138" fill={accent} />
          <rect x="230" y="240" width="132" height="184" fill={ink} />
          <circle
            cx="142"
            cy="332"
            r="46"
            fill={paper}
            stroke={ink}
            strokeWidth="2"
          />
        </svg>
      );
    case "stripes":
      return (
        <svg
          viewBox="0 0 400 300"
          style={common}
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="300" fill={ink} />
          {Array.from({ length: 6 }).map((_, i) => (
            <polygon
              key={i}
              points={`${-40 + i * 90},320 ${40 + i * 90},320 ${180 + i * 90},-20 ${100 + i * 90},-20`}
              fill={i % 2 === 0 ? accent : paper}
              opacity={i % 2 === 0 ? 1 : 0.9}
            />
          ))}
        </svg>
      );
    case "circles":
      return (
        <svg
          viewBox="0 0 400 400"
          style={common}
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="400" fill={ink} />
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle
            cx="200"
            cy="200"
            r="110"
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            opacity="0.7"
          />
          <circle cx="230" cy="180" r="64" fill={accent} />
          <circle cx="150" cy="260" r="20" fill={paper} />
        </svg>
      );
    case "type":
      return (
        <svg
          viewBox="0 0 400 300"
          style={common}
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="300" fill={paper} />
          <text
            x="20"
            y="110"
            fontFamily="Fraunces, serif"
            fontSize="120"
            fontStyle="italic"
            fill={ink}
            opacity="0.9"
          >
            Gr
          </text>
          <text
            x="150"
            y="230"
            fontFamily="Fraunces, serif"
            fontSize="120"
            fill={accent}
          >
            ain
          </text>
          <line
            x1="24"
            y1="255"
            x2="376"
            y2="255"
            stroke={ink}
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      );
    case "blob":
      return (
        <svg
          viewBox="0 0 400 500"
          style={common}
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="500" fill={paper} />
          <path
            d="M120 90 C 40 140, 40 300, 130 360 C 220 420, 340 380, 350 270 C 360 160, 260 60, 180 70 C 160 72, 140 78, 120 90 Z"
            fill={accent}
          />
          <path
            d="M170 150 C 130 180, 140 260, 190 290 C 240 320, 300 290, 300 230 C 300 170, 230 130, 190 140 Z"
            fill={ink}
            opacity="0.15"
          />
        </svg>
      );
    case "waves":
      return (
        <svg
          viewBox="0 0 400 300"
          style={common}
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="300" fill={ink} />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M -20 ${80 + i * 45} C 80 ${20 + i * 45}, 160 ${140 + i * 45}, 420 ${60 + i * 45}`}
              fill="none"
              stroke={i % 2 === 0 ? accent : paper}
              strokeOpacity={i % 2 === 0 ? 0.9 : 0.35}
              strokeWidth="3"
            />
          ))}
          <circle cx="200" cy="150" r="46" fill={accent} opacity="0.9" />
        </svg>
      );
    case "stack":
      return (
        <svg
          viewBox="0 0 400 400"
          style={common}
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="400" height="400" fill={paper} />
          <ellipse
            cx="200"
            cy="330"
            rx="90"
            ry="18"
            fill={ink}
            opacity="0.12"
          />
          <rect x="130" y="230" width="140" height="70" rx="18" fill={accent} />
          <rect x="150" y="150" width="100" height="90" rx="26" fill={ink} />
          <circle cx="200" cy="110" r="46" fill={accent} />
          <circle cx="182" cy="100" r="6" fill={paper} />
          <circle cx="218" cy="100" r="6" fill={paper} />
        </svg>
      );
    case "scatter":
      return (
        <svg
          viewBox="0 0 400 300"
          style={common}
          preserveAspectRatio="xMidYMid slice"
        >
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
        <svg
          viewBox="0 0 500 400"
          style={common}
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="500" height="400" fill={paper} />
          <rect
            x="24"
            y="24"
            width="452"
            height="352"
            fill="none"
            stroke={ink}
            strokeWidth="1.5"
            opacity="0.5"
          />
          <rect x="60" y="60" width="160" height="140" fill={accent} />
          <circle cx="350" cy="130" r="70" fill={ink} opacity="0.9" />
          <rect
            x="70"
            y="240"
            width="360"
            height="10"
            fill={ink}
            opacity="0.3"
          />
          <rect
            x="70"
            y="264"
            width="230"
            height="10"
            fill={ink}
            opacity="0.3"
          />
          <path
            d="M300 300 L 340 340 L 380 300 L 420 340"
            fill="none"
            stroke={accent}
            strokeWidth="4"
          />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  SMALL UI PIECES                                                     */
/* ------------------------------------------------------------------ */

function Wordmark({ onClick }) {
  return (
    <button
      className="wordmark"
      onClick={onClick}
      aria-label="Retour à l'accueil"
    >
      <img
        src="/images/Logo_sula.svg"
        alt="Logo Sula"
        style={{ width: "280px", height: "auto" }}
      />
    </button>
  );
}

function Nav({ page, go }) {
  const handleNavClick = (id) => {
    if (id === "projects") {
      if (page !== "home") {
        go("home");

        setTimeout(() => {
          document.getElementById("projets")?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      } else {
        document.getElementById("projets")?.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      go(id);
    }
  };
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
              handleNavClick(item.id);
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
            onClick={() => handleNavClick(item.id)}
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
          <a href="mailto:bonjour@solenecrouzet.studio">
            bonjour@solenecrouzet.studio
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="site-footer-row site-footer-row-bottom">
        <span>© {new Date().getFullYear()} Solène Crouzet</span>
        <button className="text-link" onClick={() => go("contact")}>
          Travaillons ensemble
        </button>
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

  const featured = PROJECTS;

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
      <section
        className="presentation-home"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="tear tear-top"></div>

        <p className="presentation-home-text">
          Bienvenue dans mon univers ! J’imagine et conçois des identités
          visuelles et des projets créatifs, du print au digital. Vous avez un
          projet ou une idée en tête ? N’hésitez pas à me contacter, je serais
          ravie d’en discuter avec vous !
        </p>

        <button
          className="presentation-home-button"
          onClick={() => go("contact")}
        >
          Me contacter
        </button>

        <div className="tear tear-bottom"></div>
      </section>
      <section id="projets" className="section">
        <section id="projects" className="projects-section"></section>
        <div className="section-head">
          <h2>Mes projets</h2>
        </div>
        <div className="projects-carousel-wrapper">
          <div className="projects-carousel">
            {featured.map((p, i) => (
              <button
                key={p.id}
                className={
                  "featured-tile featured-tile-" + (i % 2 === 0 ? "a" : "b")
                }
                onClick={() => openProject(p.id)}
              >
                <div className="featured-art">
                  <img
                    src={p.image}
                    alt={p.title}
                    className={
                      p.title === "Pamparina"
                        ? "image-pamparina"
                        : p.id === "binche"
                          ? "image-binche"
                          : p.id === "elmer"
                            ? "image-elmer"
                            : p.title === "Pensée sur l'amour"
                              ? "image-pensee"
                              : p.title === "Collaboration Fictive"
                                ? "image-roland-garros"
                                : p.title === "Ehpad"
                                  ? "image-ehpad"
                                  : ""
                    }
                  />
                </div>

                <div className="featured-meta">
                  <span className="featured-arrow">{i + 1}</span>

                  <div className="featured-text">
                    <div className="featured-title">{p.title}</div>
                    <div className="featured-cat">{p.category}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button
            className="carousel-prev"
            onClick={() => {
              document.querySelector(".projects-carousel")?.scrollBy({
                left: -350,
                behavior: "smooth",
              });
            }}
            aria-label="Voir les projets précédents"
          >
            ‹
          </button>
          <button
            className="carousel-next"
            onClick={() => {
              document.querySelector(".projects-carousel")?.scrollBy({
                left: 350,
                behavior: "smooth",
              });
            }}
            aria-label="Voir les projets suivants"
          >
            ›
          </button>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span className="marquee-set" key={i}>
              Identité
              visuelle&nbsp;&nbsp;·&nbsp;&nbsp;Branding&nbsp;&nbsp;·&nbsp;&nbsp;Typographie&nbsp;&nbsp;·&nbsp;&nbsp;Illustration&nbsp;&nbsp;·&nbsp;&nbsp;3D&nbsp;&nbsp;·&nbsp;&nbsp;Direction
              artistique&nbsp;&nbsp;·&nbsp;&nbsp;
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
            Moi, c’est Solène, j’ai 21 ans et je suis graphiste récemment
            diplômée. J’aime imaginer des univers, donner vie à des idées et
            créer des projets qui ont leur propre personnalité. Au fil de mes
            études et de mes expériences, j’ai eu l’occasion de travailler sur
            des projets très variés, qui m’ont permis d’expérimenter, de
            développer ma créativité et de construire petit à petit mon propre
            univers graphique.
          </p>
          <button className="text-link" onClick={() => go("about")}>
            Mon parcours et mes outils
          </button>
        </div>
      </section>

      <Footer go={go} />
    </div>
  );
}

function Projects({ openProject }) {
  const [filter, setFilter] = useState("Tous");
  const list =
    filter === "Tous"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="page">
      <section className="section projects-page">
        <h1 className="projects-page-title">Tous les projets</h1>

        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              className="featured-tile"
              onClick={() => openProject(p.id)}
            >
              <div className="featured-art">
                <img
                  src={p.image}
                  alt={p.title}
                  className={
                    p.title === "Pamparina"
                      ? "image-pamparina"
                      : p.id === "elmer"
                        ? "image-elmer"
                        : p.id === "binche"
                          ? "image-binche"
                          : p.title === "Pensée sur l'amour"
                            ? "image-pensee"
                            : p.title === "Collaboration Fictive"
                              ? "image-roland-garros"
                              : p.title === "Ehpad"
                                ? "image-ehpad"
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
    </div>
  );
}
function PamparinaBook() {
  const pages = [
    null,
    "/images/page_1_pamparina.png",
    "/images/page_2_pamparina.png",
    "/images/page_3_pamparina.png",
    "/images/page_4_pamparina.png",
    "/images/page_5_pamparina.png",
    "/images/page_6_pamparina.png",
    "/images/page_7_pamparina.png",
    "/images/page_8_pamparina.png",
    "/images/page_9_pamparina.png",
    "/images/page_10_pamparina.png",
    "/images/page_11_pamparina.png",
    "/images/page_12_pamparina.png",
    "/images/page_13_pamparina.png",
    "/images/page_14_pamparina.png",
    "/images/page_15_pamparina.png",
    "/images/page_16_pamparina.png",
    null,
  ];
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="pamparina-book-section">
      <div className="pamparina-book-wrapper">
        <HTMLFlipBook
          width={390}
          height={620}
          showCover={false}
          usePortrait={false}
          drawShadow={true}
          maxShadowOpacity={0.35}
          flippingTime={1000}
          mobileScrollSupport={true}
          showPageCorners={true}
          className="pamparina-real-book"
          onFlip={(e) => setCurrentPage(e.data)}
        >
          {pages.map((src, index) => (
            <div
              className={`pamparina-book-page ${!src ? "empty-page" : ""} ${
                currentPage === 0 && index === 0 ? "hide-empty-cover" : ""
              }`}
              key={index}
            >
              {src && (
                <img src={src} alt={`Programme Pamparina - page ${index}`} />
              )}
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </section>
  );
}
function ProjectDetail({ project, openProject, go }) {
  const index = PROJECTS.findIndex((p) => p.id === project.id);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const pokemonVideosRef = useRef([]);

  useEffect(() => {
    const videos = pokemonVideosRef.current.filter(Boolean);

    const startVideosTogether = async () => {
      if (videos.length !== 4) return;

      videos.forEach((video) => {
        video.currentTime = 0;
      });

      await Promise.all(videos.map((video) => video.play().catch(() => {})));
    };

    Promise.all(
      videos.map(
        (video) =>
          new Promise((resolve) => {
            if (video.readyState >= 3) {
              resolve();
            } else {
              video.addEventListener("canplay", resolve, { once: true });
            }
          }),
      ),
    ).then(startVideosTogether);
  }, []);

  return (
    <div className="page project-detail-page">
      <section className="project-header">
        <div className="project-intro-layout">
          <div className="project-intro-left">
            <button
              className="back-link"
              onClick={() => {
                go("home");

                setTimeout(() => {
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              ← Tous les projets
            </button>

            <div className="project-title-block">
              <h1>{project.title}</h1>
              <p className="project-tagline project-detail-tagline">
                {project.tagline}
              </p>
            </div>

            <div className="project-meta">
              <div>
                <span>Année</span>
                <p>{project.year}</p>
              </div>

              <div>
                <span>Logiciels utilisés</span>
                <p>{project.tools.join(", ")}</p>
              </div>
            </div>

            <div className="project-intro-description">
              <div className="project-intro-description">
                {project.id === "pamparina" && (
                  <>
                    <p>
                      Dans le cadre d’un workshop réalisé durant ma dernière
                      année de Bachelor, nous avons travaillé à partir d’un
                      brief réel sur la refonte de l’identité visuelle de la
                      Pamparina.
                    </p>

                    <p>
                      Ma proposition a été sélectionnée par le client et est
                      devenue l’identité officielle de l’édition 2026 du
                      festival. J’ai ensuite développé l’affiche principale
                      ainsi que différentes déclinaisons graphiques autour de
                      l’événement.
                    </p>
                  </>
                )}
                {project.id === "pamparina" && (
                  <div className="pamparina-book-position">
                    <PamparinaBook />
                  </div>
                )}
                {project.id === "elmer" && (
                  <>
                    <p>
                      Ce projet d’école avait pour objectif de revisiter la
                      couverture d’un livre existant en l’associant à un thème
                      tiré au hasard. J’ai choisi Elmer et pioché le thème de la
                      magie.
                    </p>

                    <p>
                      J’ai donc imaginé une nouvelle couverture mêlant ces deux
                      univers, tout en travaillant les différentes étapes de
                      préparation du fichier jusqu’à son impression.
                    </p>
                  </>
                )}

                {project.id === "Pokematch" && (
                  <>
                    <p>
                      Pokématch est mon projet de fin de Bachelor. Il s'agit
                      d’une collaboration fictive entre Roland-Garros, Nike et
                      Pokémon. Le concept repose sur l’association d’un joueur
                      de tennis à un Pokémon en fonction de leur personnalité et
                      de leur style de jeu.
                    </p>
                    <p>
                      J’ai créé un univers visuel cohérent mêlant les codes du
                      tennis et de Pokémon que j'ai eunsuite décliné sur
                      différents supports, notamment des maillots,des cartes à
                      collectionner et des figurines Art Toys.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="project-intro-image">
            <img
              src={
                project.id === "pamparina"
                  ? "/public/images/Abris bus pamparina.png"
                  : project.id === "elmer"
                    ? "/images/elmer_projet_2.jpg"
                    : project.image
              }
              className={
                project.id === "pamparina" ? "pamparina-detail-image" : ""
              }
              alt={project.title}
            />
          </div>
        </div>
      </section>

      <section className="project-description">
        <div className="project-description-title">
          <p className="small-title">Le projet</p>

          <h2>Une identité pensée pour faire vivre la Pamparina</h2>
        </div>

        <div className="project-description-text">
          <p>
            Dans le cadre d’un workshop réalisé durant ma dernière année de
            Bachelor, nous avons travaillé à partir d’un brief réel sur la
            refonte de l’identité visuelle de la Pamparina.
          </p>

          <p>
            Ma proposition a été sélectionnée par le client et est devenue
            l’identité officielle de l’édition 2026 du festival. J’ai ensuite
            développé l’affiche principale ainsi que différentes déclinaisons
            graphiques autour de l’événement.
          </p>
        </div>
      </section>

      {project.id === "pamparina" && (
        <div className="project-gallery-three">
          <img src="/images/ecocup_pamparina.png" alt="Pamparina visuel 2" />

          <img
            src="/images/badge_carte_pamparina.png"
            alt="Pamparina visuel 3"
          />

          <img src="/images/tote_bag_pamparina.png" alt="Pamparina visuel 4" />
        </div>
      )}

      {project.id === "elmer" && (
        <div className="elmer-illustrations">
          <img src="/images/elmer_illu_1.png" alt="Illustration Elmer 1" />
          <img src="/images/elmer_illu_2.png" alt="Illustration Elmer 2" />
          <img src="/images/elmer_illu_3.png" alt="Illustration Elmer 3" />
          <img src="/images/elmer_illu_4.png" alt="Illustration Elmer 4" />
        </div>
      )}

      {project.id === "Pokematch" && (
        <div className="pokematch-creations">
          {/* SINNER */}
          <div className="pokematch-row">
            <img src="/images/Maillot Sinner.png" alt="Maillot Sinner" />
            <img src="/images/Carte 1 clair metamorph.png" alt="Carte Sinner" />
            <video
              ref={(el) => (pokemonVideosRef.current[0] = el)}
              src="/images/pokemon_360_1.mp4"
              loop
              muted
              playsInline
            />
          </div>

          {/* ALCARAZ */}
          <div className="pokematch-row">
            <img src="/images/Maillot Alcaraz.png" alt="Maillot Alcaraz" />
            <img
              src="/images/Carte 2 clair metamorph.png"
              alt="Carte Alcaraz"
            />
            <video
              ref={(el) => (pokemonVideosRef.current[1] = el)}
              src="/images/pokemon_360_2.mp4"
              loop
              muted
              playsInline
            />
          </div>

          {/* SABALENKA */}
          <div className="pokematch-row">
            <img src="/images/Maillot Sabalenka.png" alt="Maillot Sabalenka" />
            <img
              src="/images/Carte 3 clair metamorph.png"
              alt="Carte Sabalenka"
            />
            <video
              ref={(el) => (pokemonVideosRef.current[2] = el)}
              src="/images/pokemon_360_3.mp4"
              loop
              muted
              playsInline
            />
          </div>

          {/* ANDREEVA */}
          <div className="pokematch-row">
            <img src="/images/Maillot Andreeva.png" alt="Maillot Andreeva" />
            <img
              src="/images/Carte 4 clair metamorph.png"
              alt="Carte Andreeva"
            />
            <video
              ref={(el) => (pokemonVideosRef.current[3] = el)}
              src="/images/pokemon_360_4.mp4"
              loop
              muted
              playsInline
            />
          </div>
        </div>
      )}

      {project.id === "pamparina" && (
        <p className="project-gallery-caption">
          Voici quelques déclinaisons de l’identité visuelle sur différents
          supports, pour montrer comment l’univers de la Pamparina peut vivre
          au-delà de l’affiche.
        </p>
      )}

      {project.id === "elmer" && (
        <p className="project-gallery-caption">
          Voici les différentes étapes de création de mon illustration, du
          premier croquis jusqu’au rendu final.
        </p>
      )}

      {project.id === "Pokematch" && (
        <p className="project-gallery-caption">
          Voici les quatre figurines imaginées pour le projet Pokématch,
          présentées en rotation à 360°.
        </p>
      )}
    </div>
  );
}

function About({ go }) {
  const timeline = [
    {
      year: "2018",
      text: "Licence arts appliqués, option design graphique — Lyon.",
    },
    {
      year: "2020",
      text: "Master direction artistique, spécialisation identité de marque.",
    },
    {
      year: "2021",
      text: "Premières commandes en freelance, aux côtés d'un studio de branding.",
    },
    {
      year: "2023",
      text: "Installation en indépendante à temps plein, à Lyon.",
    },
    {
      year: "2024",
      text: "Premiers projets d'édition limitée et d'objets 3D imprimés.",
    },
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
            Je suis graphiste, passionnée par tout ce qui donne une forme à une
            idée : une identité, une affiche, un objet en volume. J'aime autant
            travailler sur des projets très cadrés que sur des choses plus
            manuelles et expérimentales, où j'ai le droit de me tromper.
          </p>
          <p>
            Ce qui m'intéresse particulièrement : le branding, la direction
            artistique, l'illustration, la typographie, la 3D, les objets et art
            toys, et toutes les expérimentations graphiques qui n'ont pas encore
            de nom. Je crois qu'un bon projet garde toujours une trace de la
            main qui l'a fait, même quand il finit sur un écran.
          </p>
        </div>
      </section>

      <section className="section about-grid">
        <div>
          <h3 className="about-label">Compétences</h3>
          <ul className="tag-list">
            {[
              "Identité de marque",
              "Direction artistique",
              "Illustration",
              "Typographie",
              "Packaging",
              "Motion léger",
              "Modélisation 3D",
            ].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="about-label">Logiciels</h3>
          <ul className="tag-list">
            {[
              "Illustrator",
              "Photoshop",
              "InDesign",
              "Figma",
              "Procreate",
              "Cinema 4D",
              "After Effects",
            ].map((s) => (
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
        <button className="btn btn-primary" onClick={() => go("contact")}>
          Écrivons-nous
        </button>
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
          <a
            className="contact-email"
            href="mailto:bonjour@solenecrouzet.studio"
          >
            bonjour@solenecrouzet.studio
          </a>
          <div className="contact-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
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
              <p className="contact-success-sub">
                Je reviens vers vous très vite.
              </p>
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
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </label>
              <button type="submit" className="btn btn-primary">
                Envoyer le message
              </button>
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
        {page === "project" && (
          <ProjectDetail
            project={currentProject}
            openProject={openProject}
            go={go}
          />
        )}
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
  background: #ffffff;
}

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
    90deg,
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
  transform: scale(1.1) translateX(6px) translateY(6px) !important;
}

.featured-tile:hover .featured-art img.image-pamparina {
  transform: scale(1.16) translateX(6px) translateY(6px) !important;
}
.image-binche {
  transform: scale(1.26) translateY(18px) !important;
}
.featured-tile:hover .featured-art img.image-binche {
  transform: scale(1.32) translateY(18px) !important;
}
.image-elmer {
  object-fit: cover;
  object-position: 53% center;
  transform: scale(1.18) translateY(14px) !important;
}
.featured-tile:hover .featured-art img.image-elmer {
  transform: scale(1.24) translateY(14px) !important;
}
.image-pensee {
  object-fit: cover;
  object-position: 90% center !important;
  transform: scale(1.4) translateY(-18px) !important;
  transform-origin: center center;
}

.featured-tile:hover .featured-art img.image-pensee {
  object-position: 90% center !important;
  transform: scale(1.46) translateY(-18px) !important;
}

.image-roland-garros {
  object-fit: cover;
  object-position: 46% center !important;
  transform: scale(1.34) translateY(5px) !important;
}

.featured-tile:hover .featured-art img.image-roland-garros {
  object-position: 46% center !important;
  transform: scale(1.4) translateY(5px)!important;
}
.image-ehpad {
  object-fit: cover;
  object-position: 45% center !important;
  transform: scale(1.2) translateY(-20px) !important;
}

.featured-tile:hover .featured-art img.image-ehpad {
  object-position: 45% center !important;
  transform: scale(1.26) translateY(-20px)!important;
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
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #111111;
  color: white;

  border-radius: 50%;

  font-size: 1.2rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  line-height: 1;
}
.section-head {
  padding-left: 80px;
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
  transform: translateY(5px);
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
/* =========================================
   NOUVELLE MISE EN PAGE DU HAUT DU PROJET
========================================= */

.project-intro-layout {
  display: grid;
  grid-template-columns: 42% 58%;
  gap: 60px;
  align-items: start !important;
  width: 100%;
  margin-top: 30px;
}

.project-intro-left {
  align-self: start !important;
}

.project-title-block h1 {
  margin: 0 0 18px;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(42px, 4.5vw, 68px);
  font-weight: 700;
  line-height: 1;
}
.project-title-block .project-tagline.project-detail-tagline {
  font-family: "elite", sans-serif;
  font-weight: 400;
  font-size: 15px !important;
}

.project-tagline {
  font-family: "elite", sans-serif;
  font-weight: 300;
  font-style: normal;
}


/* ANNÉE + LOGICIELS */

.project-meta {
  display: flex;
  gap: 55px;
  margin-top: 45px;
}

.project-meta div {
  margin: 0;
  padding: 0;
  border: none;
}

.project-meta span {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}

.project-meta p {
  margin-top: 28px !important;
  margin-bottom: 0 !important;
}

/* DESCRIPTION */

.project-intro-description {
  margin-top: 28px !important;
  max-width: 520px;
  font-size: 14px;
  line-height: 1.6;
}

.project-intro-description p {
  margin-top: 0 !important;
  margin-bottom: 12px !important;
}

/* IMAGE À DROITE */

.project-intro-image {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  border-radius: 24px;
}

.project-intro-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  transform: scale(1.05) translate(0px, 8px);
}

/* IMPORTANT : on neutralise les anciens styles */

.project-main-image {
  display: none !important;
}

.project-description {
  display: none !important;
}

/* MOBILE */
/* ========================================================= */
/* ================= PROJETS - MOBILE ======================= */
/* ========================================================= */


.project-header {
  min-height: calc(100vh - 110px) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  box-sizing: border-box !important;
  transform: translateY(-20px) !important;

  padding-top: 35px !important;
  padding-bottom: 35px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.project-intro-layout {
  margin-top: 0 !important;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr) !important;
}

.back-link {
  align-self: flex-start !important;
  margin: 0 0 30px 0 !important;
  padding: 0 !important;
}


.project-intro-left {
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.project-intro-image {
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
}

.project-intro-image img {
  width: 100% !important;
  height: auto !important;
  display: block !important;
  object-fit: contain !important;
}

.projects-carousel::-webkit-scrollbar {
  display: none;
}

.projects-carousel .featured-tile {
  flex: 0 0 320px;
  scroll-snap-align: start;
}

.projects-carousel-wrapper {
  position: relative;
  padding: 0 80px;
}

.projects-carousel {
  display: flex;
  gap: 32px;

  overflow-x: auto;
  overflow-y: visible;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  padding-top: 20px;
  padding-bottom: 25px;

  scrollbar-width: none;
}

.projects-carousel::-webkit-scrollbar {
  display: none;
}

.projects-carousel .featured-tile {
  flex: 0 0 calc((100% - 64px) / 3);
  scroll-snap-align: start;
}

.project-gallery-three {
  width: 100% !important;
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 24px !important;
  margin-top: 20px !important;
  margin-bottom: 10px !important;
  box-sizing: border-box !important;
}
.project-gallery-three {
  margin-top: 0 !important;
  transform: translateY(-20px) !important;
}
.project-gallery-three img {
  width: 100% !important;
  height: 100% !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: cover !important;
  display: block !important;
  border-radius: 24px !important;
}
.project-gallery-caption {
  width: 100% !important;
  margin-top: 50px !important;
  margin-bottom: 200px !important;
  font-family: "Montserrat", sans-serif !important;
  font-size: 14px !important;
  line-height: 1.7 !important;
  font-weight: 600 !important;
}
/* FLÈCHE GAUCHE */
.carousel-prev {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);

  width: 48px;
  height: 48px;

  border: none;
  border-radius: 50%;

  background: #111;
  color: white;

  font-size: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 100;
}

/* FLÈCHE DROITE */
.carousel-next {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);

  width: 48px;
  height: 48px;

  border: none;
  border-radius: 50%;

  background: #111;
  color: white;

  font-size: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 100;
}

.carousel-prev:hover,
.carousel-next:hover {
  transform: translateY(-50%) scale(1.08);
}

.projects-carousel {
  display: flex;
  gap: 32px;

  overflow-x: auto;
  overflow-y: visible;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;

  padding-top: 20px;
  padding-bottom: 25px;

  scrollbar-width: none;
}

.projects-carousel::-webkit-scrollbar {
  display: none;
}

.projects-carousel .featured-tile {
  flex: 0 0 calc((100% - 64px) / 3);
  scroll-snap-align: start;
}
.carousel-prev {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);

  width: 52px;
  height: 52px;

  border: none;
  border-radius: 50%;

  background: #111;
  color: white;

  font-size: 36px;
  line-height: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 100;
  transition: transform 0.2s ease;
}

.carousel-prev:hover {
  transform: translateY(-50%) scale(1.08);
}
.carousel-next {
  position: absolute;
  right: 10px;
  top: 50%;

  transform: translateY(-50%);

  width: 52px;
  height: 52px;

  border: none;
  border-radius: 50%;

  background: #111;
  color: white;

  font-size: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 100;
}

.carousel-next:hover {
  transform: translateY(-50%) scale(1.08);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
}

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
.project-header {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0 30px;
  box-sizing: border-box;
}

.project-header-row {
  width: 100%;
}

.project-title-block {
  margin: 0;
  padding: 0;
}

.project-main-image {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  display: block;
}

.project-main-image img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  margin: 0;
  padding: 0;
  border-radius: 24px;
}
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
.project-meta {
  display: flex;
  gap: 60px;
  align-items: flex-start;
}

.project-meta div {
  border-top: none;
  padding: 0;
}
.project-meta dt { font-size: 0.7rem; color: color-mix(in srgb, var(--ink) 55%, transparent); margin-bottom: 4px; }
.project-meta dd { margin: 0; font-size: 0.88rem; max-width: 22ch; }
.project.project-tagline {
  margin-bottom: 34px !important;
}

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

/* =====================================================
   PAGE PROJET — CONTENU APRÈS LE HEADER
   Le header actuel reste inchangé
===================================================== */


/* =========================
   GRANDE IMAGE PRINCIPALE
========================= */

.project-main-image {
  width: calc(100% - 80px);
  max-width: 1400px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px 0;
}

.project-main-image img {
  width: 95%;
  height: auto;

  object-fit: contain;
  display: block;

  border-radius: 24px;
}


/* =========================
   DESCRIPTION DU PROJET
========================= */

.project-description {
  width: calc(100% - 80px);
  max-width: 1200px;

  margin: 100px auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;

  align-items: start;
}


/* Petit titre "LE PROJET" */

.small-title {
  margin: 0 0 15px;

  font-size: 13px;
  font-weight: 500;

  text-transform: uppercase;
  letter-spacing: 1.5px;

  opacity: 0.5;
}


/* Gros titre de description */

.project-description-title h2,
.project-description h2 {
  margin: 0;

  max-width: 520px;

  font-size: clamp(34px, 4vw, 54px);
  line-height: 1.05;

  font-weight: 500;
}


/* Texte explicatif */

.project-description-text {
  max-width: 520px;

  font-size: 17px;
  line-height: 1.7;
}

.project-description-text p {
  margin: 0 0 22px;
}

.project-description-text p:last-child {
  margin-bottom: 0;
}


/* =========================
   GALERIE DE MOCKUPS
========================= */

.project-gallery {
  width: calc(100% - 80px);
  max-width: 1400px;

  margin: 0 auto;

  display: flex;
  flex-direction: column;

  gap: 24px;
}


/* Toutes les images */

.project-gallery img {
  display: block;

  width: 100%;

  object-fit: cover;

  border-radius: 22px;
}


/* Grande image seule */

.gallery-large {
  width: 100%;
  height: 720px;
}


/* Deux images côte à côte */

.gallery-two {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 24px;
}

.gallery-two img {
  width: 100%;
  height: 560px;
}


/* =========================
   LOGICIELS UTILISÉS
========================= */

.project-software {
  width: calc(100% - 80px);
  max-width: 1200px;

  margin: 100px auto;
}

.project-software .small-title {
  margin-bottom: 22px;
}


/* Liste des logiciels */

.software-list {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;
}


/* Pastilles */

.software-list span {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 11px 19px;

  border: 1px solid rgba(0, 0, 0, 0.2);

  border-radius: 999px;

  font-size: 14px;

  background: transparent;
}


/* =========================
   NAVIGATION ENTRE PROJETS
========================= */

.project-navigation {
  width: calc(100% - 80px);
  max-width: 1200px;

  margin: 120px auto 0;

  padding-top: 35px;

  border-top: 1px solid rgba(0, 0, 0, 0.15);

  display: flex;

  justify-content: space-between;
  align-items: center;

  gap: 30px;
}


/* Boutons précédent / suivant */

.project-navigation button {
  padding: 0;

  border: none;

  background: transparent;

  font: inherit;

  font-size: 16px;

  cursor: pointer;

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.project-navigation button:hover {
  opacity: 0.55;
}

.project-navigation button:first-child:hover {
  transform: translateX(-4px);
}

.project-navigation button:last-child:hover {
  transform: translateX(4px);
}
#projects {
  scroll-margin-top: 80px;
}

/* =========================
   ESPACEMENT BAS DE PAGE
========================= */

/* ALIGNEMENT EXACT TEXTE + IMAGE */

.project-detail-page {
  padding-left: 6%;
  padding-right: 6%;
  box-sizing: border-box;
}

.project-header {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 55px 45px;
  box-sizing: border-box;
}

.back-link {
  margin-bottom: 32px;
}

.project-title-block h1 {
  margin: 0 0 18px;
}

.project-tagline {
  margin: 0;
  line-height: 1.6;
}

.project-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 80px;
}

.project-tagline {
  margin-bottom: 34px !important;
}

.project-meta {
  margin-top: 0 !important;
  margin-bottom: 34px !important;
}

.project-meta div {
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
}

.project-meta span {
  margin: 0 !important;
}

.project-meta p {
  margin: 0 !important;
}

.project-intro-description {
  margin-top: 0 !important;
}

.project-main-image {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
}

.project-main-image img {
  width: 100%;
  height: auto;
  display: block;
  margin: 0;
  padding: 0;
  object-fit: contain;
}
/* Sous-titre */
.project-tagline {
  font-size: 15px !important;
  margin: 14px 0 0 !important;
  padding-bottom: 28px !important;

  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}

/* Année + logiciels */
.project-meta {
  margin-top: 28px !important;
  margin-bottom: 32px !important;
  gap: 65px !important;
}

/* Petit espace entre "Année" et "2026"
   et entre "Logiciels" et les logiciels */
.project-meta div {
  display: flex !important;
  flex-direction: column !important;
  gap: 5px !important;
}

.project-meta span,
.project-meta p {
  margin: 0 !important;
}

/* Description */
.project-intro-description {
  margin-top: 0 !important;
  line-height: 1.8 !important;
  font-weight: 600 !important;
}

.project-intro-description p {
  margin: 0 0 16px !important;
}

/* =====================================================
   TABLETTE
===================================================== */



/* PREMIER ÉCRAN DU PROJET */

.project-header {
  min-height: calc(100vh - 80px) !important;
  display: flex !important;
  flex-direction: column !important;
  box-sizing: border-box !important;

  padding-top: 35px !important;
  padding-bottom: 25px !important;
}

/* Descend légèrement texte + image */
.project-intro-layout {
  margin-top: 35px !important;
  align-items: start !important;
}

/* La flèche reste en bas du premier écran */
.scroll-indicator {
  margin-top: auto !important;
  text-align: center !important;
  font-size: 26px !important;
  line-height: 1 !important;
  opacity: 0.45 !important;
  padding-top: 20px !important;
}

/* Les 3 images commencent seulement après le premier écran */
.project-gallery-three {
  margin-top: 45px !important;
}


/* =====================================================
   MOBILE
===================================================== */



  .project-main-image {
    width: calc(100% - 24px);
  }

  .project-main-image img {
    height: auto;

    aspect-ratio: 4 / 3;

    border-radius: 16px;
  }


  /* Description */

  .project-description {
    width: calc(100% - 40px);

    margin: 65px auto;

    grid-template-columns: 1fr;

    gap: 30px;
  }

  .project-description-title h2,
  .project-description h2 {
    max-width: none;

    font-size: 34px;
  }

  .project-description-text {
    max-width: none;

    font-size: 16px;
  }


  /* Galerie */

  .project-gallery {
    width: calc(100% - 24px);

    gap: 12px;
  }

  .project-gallery img {
    border-radius: 14px;
  }

  .gallery-large {
    height: auto;
  }

  .gallery-two {
    grid-template-columns: 1fr;

    gap: 12px;
  }

  .gallery-two img {
    height: auto;
  }


  /* Logiciels */

  .project-software {
    width: calc(100% - 40px);

    margin: 65px auto;
  }

  .software-list span {
    padding: 9px 15px;

    font-size: 13px;
  }


  /* Navigation */

  .project-navigation {
    width: calc(100% - 40px);

    margin-top: 80px;

    padding-top: 25px;
  }

  .project-navigation button {
    font-size: 14px;
  }
} */

/* ======================================== */
/*          FLIPBOOK PAMPARINA             */
/* ======================================== */

.pamparina-book-section {
  width: 100% !important;
  margin-top: 10px !important;
  margin-bottom: 70px !important;
}

.pamparina-book-wrapper {
  width: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  overflow: visible !important;
}

.pamparina-real-book {
  margin: 0 auto !important;
  filter: drop-shadow(
    0 12px 20px rgba(0, 0, 0, 0.12)
  ) !important;
  overflow: hidden !important;
}

.pamparina-book-page {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
}

.pamparina-real-book {
  gap: 0 !important;
}

.pamparina-book-page img {
  width: 100% !important;
  height: 100% !important;
  display: block !important;

  object-fit: fill !important;

  margin: 0 !important;
  padding: 0 !important;

  background: transparent !important;
}

.empty-page {
  background: transparent !important;
  box-shadow: none !important;
}

.hide-empty-cover {
  opacity: 0 !important;
  visibility: hidden !important;
}



.elmer-illustrations {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  gap: 20px;
  align-items: center;
  margin-top: -60px;

  /* On réserve plus de place pour les éléphants agrandis */
  margin-bottom: 80px;
}

.elmer-illustrations img {
  width: 100%;
  height: 280px;
  object-fit: contain;

  transform: scale(2);
  transform-origin: center;

  display: block;
}

.pokemon-videos {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  margin-left: auto;
  margin-right: auto;

  align-items: center;
  justify-items: center;
}

.pokemon-videos video {
  width: 100%;
  height: 300px;

  object-fit: cover;
  object-position: center;

  transform: scale(1.4);

  display: block;
}

.pokematch-row {
  width: 100%;
  display: grid;
  grid-template-columns: 1.15fr 0.7fr 1.15fr;
  gap: 40px;
  align-items: center;
}

/* T-SHIRT : plus grand */
.pokematch-row img:first-child {
  width: 115%;
  height: 420px;
  object-fit: contain;
  justify-self: center;
}

/* CARTE : plus petite + décalée vers la droite */
.pokematch-row img:nth-child(2) {
  width: 75%;
  height: 320px;
  object-fit: contain;
  justify-self: center;
  transform: translateX(70px);

  /* Rogne exactement autour de la carte */
  clip-path: inset(5% 0% 4.5% 0% round 10px);
}

/* VIDÉO : plus grande + rognée en haut et en bas */
.pokematch-row video {
  width: 90%;
  height: 300px;
  object-fit: cover;
  object-position: center;
  justify-self: center;
  display: block;
  /* rognage léger sur les côtés */
  clip-path: inset(0 6% 0 6%);
}
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
  display: none;
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
    90deg,
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
  .tear {
  position: absolute !important;
  left: 0 !important;
  width: 100% !important;
  height: 75px !important;
  background: #f1f0f8 !important; /* garde ici la couleur exacte de ton fond */
  z-index: 999999 !important;
  pointer-events: none !important;
}

.tear-top {
  top: 0 !important;

  clip-path: polygon(
    0 0,
    100% 0,

    100% 42%,
    94% 35%,
    88% 46%,
    81% 37%,
    74% 44%,
    67% 34%,
    60% 46%,
    53% 38%,
    46% 45%,
    39% 35%,
    32% 47%,
    25% 38%,
    18% 44%,
    11% 35%,
    5% 46%,
    0 39%
  ) !important;
}
.tear-bottom {
  display: none !important;
}
.presentation-home-text,
.presentation-home-button {
  position: relative;
  top: 15px;
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

/* ============================================================
   RESPONSIVE — TABLETTE / MOBILE LARGE
   ============================================================ */

@media (max-width: 860px) {


  /* ---------- PREMIER ÉCRAN DU PROJET ---------- */

  .project-header {
    min-height: auto !important;
    height: auto !important;

    display: block !important;

    padding-top: 35px !important;
    padding-bottom: 35px !important;

    margin: 0 !important;
    transform: none !important;
    box-sizing: border-box !important;
  }


  /* ---------- RETOUR TOUS LES PROJETS ---------- */

  .back-link {
    display: block !important;

    margin: 0 0 28px 0 !important;
    padding: 0 !important;

    width: fit-content !important;
  }


  /* ---------- STRUCTURE GÉNÉRALE ---------- */

  .project-intro-layout {
    display: flex !important;
    flex-direction: column !important;

    grid-template-columns: none !important;

    width: 100% !important;

    margin: 0 !important;
    padding: 0 !important;

    gap: 0 !important;
  }


  /*
    IMPORTANT :
    titre + année + logiciels + description
    sont dans .project-intro-left.

    display: contents permet de placer l'image
    ENTRE les infos et la description.
  */

  .project-intro-left {
    display: contents !important;
  }


  /* ========================================================= */
  /* 1 — TITRE + SOUS-TITRE                                   */
  /* ========================================================= */

  .project-title-block {
    order: 1 !important;

    width: 100% !important;

    margin: 0 0 30px 0 !important;
    padding: 0 !important;
  }

  .project-title-block h1 {
    margin: 0 0 12px 0 !important;

    font-size: 42px !important;
    line-height: 1 !important;
  }

  .project-title-block .project-tagline {
    margin: 0 !important;

    font-size: 15px !important;
    line-height: 1.3 !important;
  }


  /* ========================================================= */
  /* 2 — ANNÉE + LOGICIELS SUR UNE SEULE LIGNE                */
  /* ========================================================= */

  .project-meta {
    order: 2 !important;

    display: grid !important;
    grid-template-columns: 0.75fr 1.6fr !important;

    column-gap: 28px !important;

    width: 100% !important;
    transform: translateY(-25px) !important;
    margin: 0 0 30px 0 !important;
    padding: 0 !important;
  }


  /* Chaque bloc : "Année 2026" / "Logiciels utilisés ..." */

  .project-meta > div {
    display: flex !important;
    flex-direction: row !important;

    align-items: center !important;

    gap: 8px !important;

    margin: 0 !important;
    padding: 0 !important;

    min-width: 0 !important;
  }


  .project-meta span {
    display: block !important;

    margin: 0 !important;
    padding: 0 !important;

    font-size: 13px !important;
    font-weight: 600 !important;

    white-space: nowrap !important;
    flex-shrink: 0 !important;
  }


  .project-meta p {
    margin: 0 !important;
    padding: 0 !important;

    font-size: 13px !important;
    line-height: 1.3 !important;
  }


  /* 2026 ne passe jamais à la ligne */

  .project-meta > div:first-child p {
    white-space: nowrap !important;
  }


  /* Les logiciels peuvent revenir légèrement à la ligne si nécessaire */

  .project-meta > div:nth-child(2) p {
    min-width: 0 !important;
  }


  /* ========================================================= */
  /* 3 — IMAGE PRINCIPALE                                     */
  /* ========================================================= */

  .project-intro-image {
    order: 3 !important;

    width: 100% !important;

    margin: 0 !important;
    padding: 0 !important;

    overflow: hidden !important;

    border-radius: 18px !important;
  }


  .project-intro-image img {
    display: block !important;

    width: 100% !important;
    height: auto !important;

    margin: 0 !important;
    padding: 0 !important;

    object-fit: cover !important;

    transform: none !important;
  }


  /* ========================================================= */
  /* 4 — DESCRIPTION SOUS L'IMAGE                             */
  /* ========================================================= */

  .project-intro-description {
    order: 4 !important;

    width: 100% !important;
    max-width: none !important;

    margin-top: 6px !important;
    padding: 0 !important;

    font-size: 14px !important;
    line-height: 1.6 !important;
  }
  .project-intro-description {
    padding-top: 25px !important;
  }

  .project-intro-description p {
    width: 100% !important;

    margin: 0 0 14px 0 !important;
    padding: 0 !important;
  }


  .project-intro-description p:last-child {
    margin-bottom: 0 !important;
  }


  /* ========================================================= */
  /* ÉLÉMENTS QUI VIENNENT APRÈS LE TEXTE                     */
  /* Évite les grosses zones blanches inutiles                 */
  /* ========================================================= */

  /* ---------- GALERIES ---------- */

  .project-gallery-three {
    display: grid !important;
    grid-template-columns: 1fr !important;

    gap: 18px !important;

    width: 100% !important;
  }


  .project-gallery-three img {
    display: block !important;

    width: 100% !important;
    height: auto !important;

    margin: 0 !important;
  }


  /* ---------- ELMER ---------- */

  .elmer-illustrations {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;

    gap: 18px !important;

    width: 100% !important;

    transform: none !important;
  }


  .elmer-illustrations img {
    width: 100% !important;
    max-width: none !important;
    height: auto !important;

    margin: 0 !important;
  }


  /* ---------- POKÉMATCH : VIDÉOS ---------- */

  .pokemon-videos {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;

    gap: 16px !important;

    width: 100% !important;
  }


  .pokemon-videos video {
    display: block !important;

    width: 100% !important;
    height: auto !important;

    object-fit: contain !important;
  }



  .projects-carousel-wrapper {
    padding: 0 55px !important;
    overflow: hidden !important;
  }

  .projects-carousel {
    gap: 24px !important;
    width: 100% !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory !important;
  }

  .projects-carousel .featured-tile {
    flex: 0 0 100% !important;
    width: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;

    scroll-snap-align: center !important;

    margin: 0 !important;
    transform: none !important;
  }

}

/* ============================================================
   RESPONSIVE — TÉLÉPHONE
   ============================================================ */

@media (max-width: 560px) {


/* ===== HERO TÉLÉPHONE ===== */


/* Descend légèrement tout le bloc Portfolio */
.hero-content {
  top: 20% !important;
}

/* Garde UNE SEULE étoile : les étoiles du hero restent masquées ici. */
.hero-star-1,
.hero-star-2,
.hero-star-3 {
  display: none !important;
}

.hero-specialty {
  left: 30px !important;
  top: 0 !important;

  width: 80% !important;
  gap: 12px !important;
}

.hero-specialty-icon {
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  font-size: 0.8rem !important;
  margin-top: -10px !important;
}

.hero-specialty-text {
  padding: 6px 10px !important;
  font-size: 0.6rem !important;
  margin-top: -10px !important;
}

/* Réduit la grosse zone blanche */
.hero {
  height: 430px !important;
  min-height: 430px !important;
}

/* Remonte toute la partie rose qui vient après */
.presentation-home {
  margin-top: -180px !important;
}
  
.presentation-home-text {
  font-size: 14px !important;
}

.presentation-home-button {
  font-size: 0.75rem !important;
  padding: 10px 28px !important;
  width: auto !important;
  min-width: 0 !important;
  height: auto !important;
}


/* ============================= */
/* MENU BURGER MOBILE COMPLET    */
/* ============================= */

.nav-links {
  display: none !important;
}


/* ===== BOUTON BURGER / CROIX ===== */
.nav {
  position: relative !important;
}

.menu-toggle {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: absolute !important;
  top: 55px !important;
  right: 26px !important;

  width: 42px !important;
  height: 42px !important;

  padding: 0 !important;

  background: transparent !important;
  border: none !important;

  color: white !important;
  font-size: 30px !important;
  line-height: 1 !important;

  cursor: pointer !important;

  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.3s ease !important;
}

.menu-toggle:active {
  transform: scale(0.88) !important;
}


/* ===== OVERLAY PLEIN ÉCRAN ===== */

.mobile-menu-overlay {
  position: fixed !important;
  inset: 0 !important;

  width: 100vw !important;
  height: 100dvh !important;

  background: linear-gradient(
    145deg,
    #d6009d 0%,
    #e83cab 45%,
    #f2a7d4 100%
  ) !important;

  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 26px !important;

  overflow: hidden !important;

  opacity: 1 !important;
  visibility: hidden !important;
  pointer-events: none !important;

  clip-path: circle(0px at calc(100% - 45px) 45px) !important;

  transition:
    clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s linear 0.8s !important;

  z-index: 10000 !important;
}


/* ===== OVERLAY OUVERT ===== */

.mobile-menu-overlay.is-open {
  visibility: visible !important;
  pointer-events: auto !important;

  clip-path: circle(150vmax at calc(100% - 45px) 45px) !important;

  transition:
    clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1),
    visibility 0s !important;
}


/* ===== LIENS DU MENU ===== */

.mobile-menu-link {
  position: relative !important;

  background: transparent !important;
  border: none !important;

  color: white !important;

  font-family: "Montserrat", sans-serif !important;
  font-size: 2rem !important;
  font-weight: 700 !important;

  cursor: pointer !important;

  opacity: 0 !important;

  transform:
    translateY(28px)
    scale(0.94) !important;

  transition:
    opacity 0.5s ease,
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) !important;

  transition-delay: 0s !important;

  z-index: 3 !important;
}


/* arrivée progressive des liens */

.mobile-menu-overlay.is-open .mobile-menu-link {
  opacity: 1 !important;

  transform:
    translateY(0)
    scale(1) !important;

  transition-delay: var(--delay) !important;
}


/* petit effet au clic */

.mobile-menu-link:active {
  transform: scale(0.94) !important;
}


/* ===== ÉTOILES ===== */

.menu-star {
  position: absolute !important;

  display: block !important;

  color: white !important;

  pointer-events: none !important;

  opacity: 0 !important;

  z-index: 1 !important;

  animation: menuStarFloat 5s ease-in-out infinite alternate !important;

  transition: opacity 0.7s ease !important;
}


/* étoiles apparaissent progressivement */

.mobile-menu-overlay.is-open .menu-star {
  opacity: 0.85 !important;
}


/* positions */

.menu-star.star-1 {
  top: 14% !important;
  left: 14% !important;
  font-size: 40px !important;

  animation-delay: 0s !important;
}

.menu-star.star-2 {
  top: 25% !important;
  right: 14% !important;
  font-size: 23px !important;

  animation-delay: 0.8s !important;
}

.menu-star.star-3 {
  top: 52% !important;
  left: 9% !important;
  font-size: 28px !important;

  animation-delay: 1.4s !important;
}

.menu-star.star-4 {
  bottom: 18% !important;
  right: 13% !important;
  font-size: 44px !important;

  animation-delay: 2s !important;
}

.menu-star.star-5 {
  bottom: 9% !important;
  left: 24% !important;
  font-size: 20px !important;

  animation-delay: 2.7s !important;
}


/* ===== ANIMATION ÉTOILES ===== */

@keyframes menuStarFloat {
  0% {
    transform:
      translate3d(0, 0, 0)
      rotate(-3deg)
      scale(1);
  }

  50% {
    transform:
      translate3d(5px, -9px, 0)
      rotate(3deg)
      scale(1.05);
  }

  100% {
    transform:
      translate3d(-4px, 6px, 0)
      rotate(-2deg)
      scale(0.98);
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


  .about-teaser-portrait {
  transform: none !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.presentation-home {
  position: relative !important;
  overflow: hidden !important;
}

.presentation-home.torn-paper {
  position: relative !important;
  overflow: hidden !important;
}

/* ================================= */
/* CARROUSEL PROJETS - TÉLÉPHONE     */
/* ================================= */

.projects-carousel-wrapper {
  position: relative !important;
  width: 100% !important;

  padding: 0 60px !important;
  box-sizing: border-box !important;
}


/* zone contenant les 6 projets */

.projects-carousel {
  display: flex !important;
  flex-wrap: nowrap !important;

  width: 100% !important;

  overflow-x: auto !important;
  overflow-y: hidden !important;

  gap: 0 !important;

  scroll-snap-type: x mandatory !important;
  scroll-behavior: smooth !important;

  scrollbar-width: none !important;
}

.projects-carousel::-webkit-scrollbar {
  display: none !important;
}


/* UNE SEULE CARTE À LA FOIS */

.projects-carousel .featured-tile {
  flex: 0 0 100% !important;

  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;

  margin: 0 !important;
  padding: 0 !important;

  transform: none !important;

  scroll-snap-align: center !important;
  scroll-snap-stop: always !important;
}


/* enlève les différences desktop entre a et b */

.projects-carousel .featured-tile-a,
.projects-carousel .featured-tile-b {
  margin: 0 !important;
  transform: none !important;
}


/* IMAGE DU PROJET */

/* CARROUSEL PROJETS MOBILE — IMAGE CARRÉE */

.projects-carousel .featured-art {
  width: 88% !important;

  height: auto !important;
  aspect-ratio: 1 / 1 !important;

  border-radius: 38px !important;
  overflow: hidden !important;
}

.projects-carousel .featured-art img {
  width: 100% !important;
  height: 100% !important;

  object-fit: cover !important;
  display: block !important;
}


/* infos sous l'image */

.projects-carousel .featured-meta {
  width: 100% !important;
  margin-top: 15px !important;
}


/* ===== FLÈCHE GAUCHE ===== */

.carousel-prev {
  position: absolute !important;

  left: 12px !important;
  top: 45% !important;

  transform: translateY(-50%) !important;

  z-index: 20 !important;

  background: transparent !important;
  border: none !important;

  font-size: 2.2rem !important;
  color: #111 !important;

  cursor: pointer !important;
}


/* ===== FLÈCHE DROITE ===== */

.carousel-next {
  position: absolute !important;

  right: 12px !important;
  top: 45% !important;

  transform: translateY(-50%) !important;

  z-index: 20 !important;

  background: transparent !important;
  border: none !important;

  font-size: 2.2rem !important;
  color: #111 !important;

  cursor: pointer !important;
}
}

/* ============================================================
   ACCESSIBILITÉ — ANIMATIONS RÉDUITES
   ============================================================ */

@media (prefers-reduced-motion: reduce) {
  .page-transition {
    animation: none;
  }

  .marquee-track {
    animation: none;
  }
}

`;
