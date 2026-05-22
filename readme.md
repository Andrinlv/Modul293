# Meine Portrait-Website (Bauplan)

> Diese README ist mein persönlicher Bauplan. Hier lerne ich, wie alles zusammenhängt.
> **Info**: Ordnerstrukturen und Dateibenennungen sind Geschmackssache. Es gibt kein "richtig" oder "falsch". Es geht darum, eine Struktur zu finden, die für mich Sinn macht und die ich konsequent durchhalte. Ebenfalls sollte zur Kenntniss genommen werden, dass ich Claude für die Strukturierung (Ordnerstrukturen) und Planung dieser Website verwendet habe. Es ist also eine Mischung aus meinen eigenen Erfahrungen und den Best Practices, die Claude mir empfohlen hat.

---

## Inhaltsverzeichnis

1. [Warum diese Struktur?](#-warum-diese-struktur)
2. [Ordnerstruktur](#-ordnerstruktur)
3. [HTML-Struktur](#-html-struktur)
4. [CSS-Architektur](#-css-architektur)
5. [JavaScript-Aufteilung](#-javascript-aufteilung)
6. [Sektionen der OnePage](#-sektionen-der-onepage)
7. [Namenkonventionen](#-namenkonventionen)
8. [Assets & Ressourcen](#-assets--ressourcen)
9. [Checkliste vor dem Launch](#-checkliste-vor-dem-launch)

---

## Warum diese Struktur?

Bevor ich mit dem Coden anfange, halte ich mir vor Augen: **Struktur ist alles.** Eine OnePage-Website sieht von aussen einfach aus, ein HTML-File und ein paar Styles. Aber ohne Plan wächst sie schnell zu einem unlesbaren Chaos (ist mir schon oft passiert).

Ich teile deshalb alles nach dem **Trennung-der-Verantwortlichkeiten-Prinzip** auf:

```
HTML   →  Was ist da? (Struktur & Inhalt)
CSS    →  Wie sieht es aus? (Design & Layout)
JS     →  Was tut es? (Verhalten & Interaktion)
```

> **Merksatz:** HTML ist das Skelett, CSS ist die Kleidung, JS ist die Persönlichkeit.

---

## 📁 Ordnerstruktur

```
Modul293/
│
├── 📄 index.html                  ← Einzige HTML Datei (OnePage)
│
├── 📁 assets/
│   ├── 📁 images/
│   │   ├── portrait/
│   │   │   ├── hero.jpg           ← Hauptbild (Header Bereich)
│   │   │   ├── about.jpg          ← Bild im Über-mich Bereich
│   │   │   └── profile-thumb.jpg  ← Kleines Profilbild (Navigation)
│   │   ├── projects/
│   │   │   ├── project-1.jpg
│   │   │   ├── project-2.jpg
│   │   │   └── project-3.jpg
│   │   └── icons/
│   │       ├── favicon.ico
│   │       └── og-image.jpg       ← Social-Media Vorschaubild
│   │
|   ├── 📁 wiki/
|   │   ├── K1 - K10                ← Meine Screenshots zu jeder Kompetenz
|   │   └── optionale Ressourcen (z.B. Inspirationen)
|   │
│   └── 📁 fonts/                   ← Selbst gehostete Schriften (Zeit abhängig)
│       ├── MyFont-Regular.woff2
│       └── MyFont-Bold.woff2
│
├── 📁 css/
│   ├── base.css                   ← Reset, Variablen, Typografie
│   ├── layout.css                 ← Grid, Sections, Container
│   ├── components.css             ← Buttons, Cards, Tags, Badges
│   ├── sections.css               ← Hero, About, Skills, Portfolio…
│   ├── animations.css             ← Keyframes & Transitions
│   └── responsive.css             ← Media Queries (mobile-first)
│
├── 📁 js/
│   ├── main.js                    ← Einstiegspunkt, initialisiert alles
│   ├── navigation.js              ← Smooth Scroll, Active-State
│   ├── animations.js              ← Scroll-Reveal, Intersection Observer
│   ├── theme.js                   ← Dark/Light Mode Toggle
│   ├── form.js                    ← Kontaktformular-Validierung & Submit
│   └── utils.js                   ← Hilfsfunktionen (debounce, throttle…)
│
├── 📄 .gitignore
├── 📁 .vscode/
│   ├── launch.json
│   └── settings.json
├── 📄 .prettierrc
├── 📄 README.md
└── 📄 LICENSE
```

> **Was ich hier lerne:** Jede Datei hat genau **eine Aufgabe**. Wenn ich nach `animations.css` suche, weiss ich sofort, wo ich bin. Das nennt sich **Single Responsibility Principle**, nicht nur für Code, sondern auch für Dateien.

---

## HTML-Struktur

### Das Grundgerüst von `index.html`

```html
<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Andrin Leo Virisario" />
    <meta name="author" content="Andrin Leo Virisario" />

    <!--Open Graph (für Social Media Vorschau)-->
    <meta property="og:title" content="Andrin Leo Virisario | Portfolio" />
    <meta property="og:description" content="Die Maschine aus der Schweiz!" />
    <meta property="og:image" content="assets/images/icons/og-image.jpg" />
    <meta property="og:type" content="website" />

    <title>Andrin Leo Virisario</title>
    <link rel="icon" href="assets/images/icons/favicon.ico" />

    <!-- Stylesheets (Reihenfolge ist wichtig)-->
    <link rel="stylesheet" href="css/base.css" />
    <link rel="stylesheet" href="css/layout.css" />
    <link rel="stylesheet" href="css/components.css" />
    <link rel="stylesheet" href="css/sections.css" />
    <link rel="stylesheet" href="css/animations.css" />
    <link rel="stylesheet" href="css/responsive.css" />
  </head>

  <body data-theme="light">
    <!--Navigation (sticky, ausserhalb main)-->
    <header class="site-header" id="site-header">
      <nav class="nav" aria-label="Hauptnavigation">
        <a href="#hero" class="nav__logo">MN</a>
        <ul class="nav__links" role="list">
          <li><a href="#about" class="nav__link">Über mich</a></li>
          <li><a href="#skills" class="nav__link">Skills</a></li>
          <li><a href="#portfolio" class="nav__link">Portfolio</a></li>
          <li><a href="#contact" class="nav__link">Kontakt</a></li>
        </ul>
        <button
          class="nav__theme-toggle"
          aria-label="Theme wechseln"
          id="themeToggle"
        >
          🌙
        </button>
        <button
          class="nav__burger"
          aria-label="Menü öffnen"
          aria-expanded="false"
          id="burgerBtn"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </header>

    <!--main content-->
    <main id="main-content">
      <!--Hero Bereich-->
      <section class="section section--hero" id="hero" aria-label="Willkommen!">
        <div class="container">
          <div class="hero__content">
            <span class="hero__greeting reveal">Hallo, ich bin</span>
            <h1 class="hero__title reveal reveal--delay-1">
              Andrin Leo Virisario
            </h1>
            <p class="hero__subtitle reveal reveal--delay-2">
              Was ich tue / Mein Beruf
            </p>
            <div class="hero__actions reveal reveal--delay-3">
              <a href="#portfolio" class="btn btn--primary">Meine Arbeiten</a>
              <a href="#contact" class="btn btn--outline">Kontakt aufnehmen</a>
            </div>
          </div>
          <div class="hero__image reveal reveal--delay-2">
            <img
              src="assets/images/portrait/hero.jpg"
              alt="Portrait von Mein Name"
              loading="eager"
              width="480"
              height="560"
            />
          </div>
        </div>
        <a
          href="#about"
          class="hero__scroll-hint"
          aria-label="Nach unten scrollen"
        >
          <span class="scroll-arrow"></span>
        </a>
      </section>

      <!--über-mich Bereich-->
      <section class="section section--about" id="about" aria-label="Über mich">
        <div class="container">
          <h2 class="section__title reveal">Über mich</h2>
          <div class="about__grid">
            <div class="about__image reveal">
              <img
                src="assets/images/portrait/about.jpg"
                alt="Ich bei der Arbeit"
                loading="lazy"
                width="400"
                height="500"
              />
            </div>
            <div class="about__text reveal reveal--delay-1">
              <p class="about__lead">Kurze, prägnante Einleitung über mich.</p>
              <p>
                Längerer Beschreibungstext über mich, meine Werte und was mich
                antreibt.
              </p>
              <ul class="about__facts" role="list">
                <li class="about__fact">
                  <span class="about__fact-label">Standort</span>
                  <span class="about__fact-value">Basel, Schweiz</span>
                </li>
                <li class="about__fact">
                  <span class="about__fact-label">Verfügbar</span>
                  <span class="about__fact-value">Ab sofort</span>
                </li>
              </ul>
              <a href="#contact" class="btn btn--primary">Lass uns reden</a>
            </div>
          </div>
        </div>
      </section>

      <!--Skills Bereich-->
      <section
        class="section section--skills"
        id="skills"
        aria-label="Meine Fähigkeiten"
      >
        <div class="container">
          <h2 class="section__title reveal">Skills</h2>
          <p class="section__subtitle reveal">
            Was ich kann und womit ich arbeite
          </p>
          <div class="skills__grid">
            <!-- Skill-Gruppe -->
            <article class="skill-card reveal">
              <div class="skill-card__icon" aria-hidden="true">⚡</div>
              <h3 class="skill-card__title">Frontend</h3>
              <ul class="skill-card__tags" role="list">
                <li class="tag">HTML</li>
                <li class="tag">CSS</li>
                <li class="tag">JavaScript</li>
              </ul>
            </article>

            <article class="skill-card reveal reveal--delay-1">
              <div class="skill-card__icon" aria-hidden="true">🛠️</div>
              <h3 class="skill-card__title">Tools</h3>
              <ul class="skill-card__tags" role="list">
                <li class="tag">Git</li>
                <li class="tag">Figma</li>
                <li class="tag">VS Code</li>
              </ul>
            </article>

            <article class="skill-card reveal reveal--delay-2">
              <div class="skill-card__icon" aria-hidden="true">🎯</div>
              <h3 class="skill-card__title">Soft Skills</h3>
              <ul class="skill-card__tags" role="list">
                <li class="tag">Kommunikation</li>
                <li class="tag">Teamwork</li>
                <li class="tag">Problemlösung</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <!--Portfolio Bereich-->
      <section
        class="section section--portfolio"
        id="portfolio"
        aria-label="Meine Projekte"
      >
        <div class="container">
          <h2 class="section__title reveal">Portfolio</h2>
          <p class="section__subtitle reveal">Ausgewählte Projekte</p>
          <div class="portfolio__grid">
            <article class="project-card reveal">
              <div class="project-card__image">
                <img
                  src="assets/images/projects/project-1.jpg"
                  alt="Projektname – Kurzbeschreibung"
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div class="project-card__overlay">
                  <a
                    href="#"
                    class="btn btn--outline btn--small"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Live ansehen</a
                  >
                  <a
                    href="#"
                    class="btn btn--ghost btn--small"
                    target="_blank"
                    rel="noopener noreferrer"
                    >GitHub</a
                  >
                </div>
              </div>
              <div class="project-card__body">
                <h3 class="project-card__title">Projektname</h3>
                <p class="project-card__desc">
                  Kurze Beschreibung was dieses Projekt tut.
                </p>
                <ul class="project-card__tags" role="list">
                  <li class="tag tag--accent">HTML</li>
                  <li class="tag tag--accent">CSS</li>
                  <li class="tag tag--accent">JS</li>
                </ul>
              </div>
            </article>

            <!-- Weitere project-card Elemente folgen dem gleichen Muster -->
          </div>
        </div>
      </section>

      <!--Kontakt Bereich-->
      <section
        class="section section--contact"
        id="contact"
        aria-label="Kontaktformular"
      >
        <div class="container container--narrow">
          <h2 class="section__title reveal">Kontakt</h2>
          <p class="section__subtitle reveal">
            Ich freue mich über deine Nachricht
          </p>

          <form class="contact-form reveal" id="contactForm" novalidate>
            <div class="form-group">
              <label class="form-label" for="name">Name *</label>
              <input
                class="form-input"
                type="text"
                id="name"
                name="name"
                required
                autocomplete="name"
                placeholder="Dein Name"
              />
              <span class="form-error" aria-live="polite"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">E-Mail *</label>
              <input
                class="form-input"
                type="email"
                id="email"
                name="email"
                required
                autocomplete="email"
                placeholder="deine@email.ch"
              />
              <span class="form-error" aria-live="polite"></span>
            </div>

            <div class="form-group">
              <label class="form-label" for="message">Nachricht *</label>
              <textarea
                class="form-input form-input--textarea"
                id="message"
                name="message"
                required
                rows="5"
                placeholder="Was möchtest du mir mitteilen?"
              ></textarea>
              <span class="form-error" aria-live="polite"></span>
            </div>

            <button
              class="btn btn--primary btn--full"
              type="submit"
              id="submitBtn"
            >
              Nachricht senden
            </button>
            <p class="form-success" id="formSuccess" aria-live="polite" hidden>
              Danke! Ich melde mich bald.
            </p>
          </form>

          <div class="contact__links reveal">
            <a
              href="mailto:meine@email.ch"
              class="contact__link"
              aria-label="E-Mail senden"
              >andrin@leovirisario.ch</a
            >
            <a
              href="https://instagram.com/…"
              class="contact__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profil"
              >Instagram</a
            >
            <a
              href="https://linkedin.com/in/…"
              class="contact__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profil"
              >LinkedIn</a
            >
            <a
              href="https://github.com/…"
              class="contact__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profil"
              >GitHub</a
            >
          </div>
        </div>
      </section>
    </main>

    <!--Footer Bereich-->
    <footer class="site-footer">
      <div class="container">
        <p class="site-footer__copy">
          &copy; <span id="currentYear"></span> Andrin Leo Virisario / Alle
          Rechte vorbehalten.
        </p>
        <a
          href="#hero"
          class="site-footer__back-to-top"
          aria-label="Zurück nach oben"
          >↑</a
        >
      </div>
    </footer>

    <!--Scripts (Damit es schneller lädt)-->
    <script src="js/utils.js"></script>
    <script src="js/theme.js"></script>
    <script src="js/navigation.js"></script>
    <script src="js/animations.js"></script>
    <script src="js/form.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
```

> **Was ich hier lerne:**
>
> - `aria-label` macht meine Seite für Screenreader zugänglich, das ist kein Bonus, das ist Standard.
> - Scripts kommen ans **Ende** des `<body>`. So wartet der Browser nicht, bis JS geladen ist, bevor er die Seite anzeigt.
> - `loading="lazy"` bei Bildern verbessert die Ladezeit erheblich. Nur das Hero-Bild lädt sofort (`eager`).

---

## CSS-Architektur

### Überblick: Welche Datei macht was?

```
css/
 │
 ├── base.css          ← Das Fundament (wird als erstes geladen)
 │    ├── CSS Custom Properties (Variablen)
 │    ├── CSS Reset / Normalize
 │    └── Globale Typografie (h1–h6, p, a, etc.)
 │
 ├── layout.css        ← Räumliche Struktur
 │    ├── .container, .container--narrow
 │    ├── .section (padding, spacing)
 │    └── Flex/Grid-Hilfklassen
 │
 ├── components.css    ← Wiederverwendbare Bausteine
 │    ├── .btn (alle Button-Varianten)
 │    ├── .tag, .badge
 │    ├── .card (generisch)
 │    └── .form-group, .form-input, .form-label
 │
 ├── sections.css      ← Seitenspezifische Bereiche
 │    ├── .site-header, .nav
 │    ├── .section--hero
 │    ├── .section--about
 │    ├── .section--skills
 │    ├── .section--portfolio
 │    ├── .section--contact
 │    └── .site-footer
 │
 ├── animations.css    ← Bewegung & Übergänge
 │    ├── @keyframes
 │    ├── .reveal (Scroll-Animations-Klasse)
 │    └── Hover-Effekte für Cards
 │
 └── responsive.css    ← Breakpoints (mobile-first)
      ├── @media (min-width: 480px)
      ├── @media (min-width: 768px)
      └── @media (min-width: 1024px)
```

---

### `base.css` / Mein Designsystem als Variablen

```css
/*Base.css / Designsystem-Variablen, Reset & Typografie
Ich definiere hier alle Designentscheidungen an einem
einzigen Ort. Wenn ich eine Farbe ändern will, ändere
ich sie genau einmal und zwar hier.*/

/*custoim properties(CSS-Variablen)*/
:root {
  /* Farben: Light Mode */
  --color-bg: #ffffff;
  --color-bg-alt: #f8f8f6;
  --color-text: #1a1a1a;
  --color-text-muted: #6b7280;
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-accent: #f59e0b;
  --color-border: #e5e7eb;
  --color-card-bg: #ffffff;
  --color-overlay: rgba(0, 0, 0, 0.6);

  /* Typografie */
  --font-display: 'Playfair Display', Georgia, serif; /* Überschriften */
  --font-body: 'Inter', system-ui, sans-serif; /* Fliesstext */
  --font-mono: 'JetBrains Mono', monospace; /* Code */

  --text-xs: 0.75rem; /*  12px */
  --text-sm: 0.875rem; /*  14px */
  --text-base: 1rem; /*  16px */
  --text-lg: 1.125rem; /*  18px */
  --text-xl: 1.25rem; /*  20px */
  --text-2xl: 1.5rem; /*  24px */
  --text-3xl: 1.875rem; /*  30px */
  --text-4xl: 2.25rem; /*  36px */
  --text-5xl: 3rem; /*  48px */
  --text-6xl: 3.75rem; /*  60px */

  /* Abstände */
  --space-1: 0.25rem; /*  4px */
  --space-2: 0.5rem; /*  8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
  --space-24: 6rem; /* 96px */

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-full: 9999px;

  /* Schatten */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.14);

  /* Übergänge */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  /* Layout */
  --container-max: 1200px;
  --container-narrow: 720px;
  --nav-height: 72px;
}

/* Dark Mode Variablen / überschreibt nur die geänderten Werte */
[data-theme='dark'] {
  --color-bg: #0f0f0f;
  --color-bg-alt: #1a1a1a;
  --color-text: #f0f0f0;
  --color-text-muted: #9ca3af;
  --color-border: #2d2d2d;
  --color-card-bg: #1e1e1e;
}

/*css reset*/
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: var(--nav-height);
  font-size: 16px;
}

body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  line-height: 1.6;
  transition: background-color var(--transition-base), color var(--transition-base);
  overflow-x: hidden;
}

/*typografie*/
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-display);
  line-height: 1.15;
  font-weight: 700;
  color: var(--color-text);
}

h1 {
  font-size: var(--text-5xl);
}
h2 {
  font-size: var(--text-4xl);
}
h3 {
  font-size: var(--text-2xl);
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}
a:hover {
  color: var(--color-primary-hover);
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: var(--radius-md);
}

ul,
ol {
  list-style: none;
}
```

---

### `layout.css` / Container & Sections

```css
/*layout.css / Räumliche Struktur der Seite
Hier lerne ich: Jede .section bekommt den gleichen
vertikalen Rhythmus. Konsistenz ist Design.*/

/*container*/
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto; /* zentriert horizontal */
  padding-inline: var(--space-6);
}

.container--narrow {
  max-width: var(--container-narrow);
}

/*sections*/
.section {
  padding-block: var(--space-24); /* oben + unten = 96px */
}

/* Abwechselnde Hintergründe für visuellen Rhythmus */
.section--about,
.section--contact {
  background-color: var(--color-bg-alt);
}

/*section headers*/
.section__title {
  text-align: center;
  margin-bottom: var(--space-4);
}

.section__subtitle {
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  margin-bottom: var(--space-12);
}
```

---

### `components.css` / Wiederverwendbare Bausteine

```css
/*components.css / Buttons, Tags, Cards, Formulare
   Merksatz: Komponenten kennen ihren eigenen Inhalt,
   aber nicht ihre Position. Position ist Aufgabe
   des Elternelements.*/

/*buttons*/
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  border-radius: var(--radius-md);
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all var(--transition-base);
  white-space: nowrap;
}

/* Primär: Ausgefüllt */
.btn--primary {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
.btn--primary:hover {
  background-color: var(--color-primary-hover);
  border-color: var(--color-primary-hover);
  color: white;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Outline: Rahmen, kein Hintergrund */
.btn--outline {
  background-color: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}
.btn--outline:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-2px);
}

/* Ghost: Kein Rahmen, kein Hintergrund */
.btn--ghost {
  background-color: transparent;
  color: var(--color-text-muted);
  border-color: var(--color-border);
}
.btn--ghost:hover {
  background-color: var(--color-border);
  color: var(--color-text);
}

/* Modifier */
.btn--small {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}
.btn--full {
  width: 100%;
  justify-content: center;
}

/*tags*/
.tag {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-bg-alt);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
}

.tag--accent {
  background-color: rgba(37, 99, 235, 0.08);
  color: var(--color-primary);
  border-color: rgba(37, 99, 235, 0.2);
}

/*formular*/
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.form-label {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--color-text);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-bg);
  color: var(--color-text);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: var(--text-base);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  outline: none;
}
.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}
.form-input--textarea {
  resize: vertical;
  min-height: 140px;
}

.form-error {
  font-size: var(--text-sm);
  color: #ef4444;
  min-height: 1.2em;
}
.form-success {
  font-size: var(--text-sm);
  color: #22c55e;
  margin-top: var(--space-4);
}
```

---

## JavaScript Aufteilung

> **Info**:\* JavaScript ist das Herzstück der Interaktivität meiner Seite. Es steuert, wie sich die Seite verhält, wenn Nutzer mit ihr interagieren. Um den Überblick zu behalten, teile ich meinen Code in Module auf, die jeweils eine klar definierte Aufgabe haben. Das meiste ist Vanilla JS, damit ich die Grundlagen wirklich verstehe, ohne von Frameworks abhängig zu sein. Auch muss zur Kenntniss genommen werden, dass ich hier mit JavaScript viel mit Künstlicher Intelligenz arbeite, um schneller voranzukommen. Das ist kein Cheat, sondern eine clevere Nutzung von Tools, die mir helfen, mich auf das Wesentliche zu konzentrieren: das Design und die User Experience. Auch behandeln wir JS nicht im Detail sondern nur Oberflächlich, damit ich nicht den Fokus verliere. Es soll ja eine Portfolio-Seite werden und kein Meisterwerk.

### Überblick: Wer macht was?

```
js/
 │
 ├── utils.js        ← Hilfsfunktionen (kein DOM, reines JS)
 │    ├── debounce()    — verhindert zu häufige Aufrufe (z.B. scroll)
 │    ├── throttle()    — limitiert Aufruf-Frequenz
 │    └── sanitize()    — bereinigt Nutzereingaben
 │
 ├── theme.js        ← Dark/Light Mode
 │    ├── Liest gespeichertes Theme aus localStorage
 │    ├── Setzt data-theme Attribut auf <body>
 │    └── Speichert Wahl bei Klick auf Toggle-Button
 │
 ├── navigation.js   ← Header & Nav-Verhalten
 │    ├── Sticky Header (scrolled-Klasse bei scroll)
 │    ├── Burger-Menü (mobiles Menü öffnen/schließen)
 │    ├── Active Nav-Link (Intersection Observer)
 │    └── Menü schließen nach Klick auf Link
 │
 ├── animations.js   ← Scroll-Reveal Effekte
 │    ├── Intersection Observer auf alle .reveal Elemente
 │    └── Fügt .is-visible hinzu wenn im Viewport
 │
 ├── form.js         ← Kontaktformular
 │    ├── Validierung (Name, E-Mail, Nachricht)
 │    ├── Fehleranzeige pro Feld
 │    └── Submit-Handler (API oder mailto)
 │
 └── main.js         ← Initialisierung
      ├── DOMContentLoaded abwarten
      ├── Alle Module initialisieren
      └── Footer-Jahr automatisch setzen
```

---

### `utils.js`

```javascript
/**
 * utils.js / Wiederverwendbare Hilfsfunktionen
 *
 * Hier lerne ich: Pure Functions haben keine Seiteneffekte.
 * Sie nehmen Input und geben Output, das war's.
 * Das macht sie leicht testbar und universell einsetzbar.
 */

/**
 * Debounce: Führt fn erst aus, wenn seit dem letzten
 * Aufruf `delay` Millisekunden vergangen sind.
 * Anwendung: Input-Felder, Resize-Events
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle: Führt fn maximal einmal pro `limit` ms aus.
 * Anwendung: Scroll-Events, Mousemove
 */
export function throttle(fn, limit = 100) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

/**
 * Sanitize: Entfernt potenziell gefährliche HTML-Zeichen.
 * Immer verwenden, bevor Nutzereingaben angezeigt werden!
 */
export function sanitize(str) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(str).replace(/[&<>"']/g, (ch) => map[ch]);
}
```

---

### `theme.js`

```javascript
/**
 * theme.js / Dark/Light Mode Toggle
 *
 * Hier lerne ich: localStorage erlaubt mir, Einstellungen
 * des Nutzers über Sessions hinweg zu speichern.
 * data-theme auf <body> steuert alle CSS-Variablen auf einmal.
 */

const THEME_KEY = 'portfolio-theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

export function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  // Gespeichertes Theme laden, sonst Systempräferenz prüfen
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ?? (prefersDark ? DARK_THEME : LIGHT_THEME);

  applyTheme(initialTheme, toggleBtn);

  toggleBtn.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    const next = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(next, toggleBtn);
    localStorage.setItem(THEME_KEY, next);
  });
}

function applyTheme(theme, toggleBtn) {
  document.body.setAttribute('data-theme', theme);
  toggleBtn.textContent = theme === DARK_THEME ? '☀️' : '🌙';
  toggleBtn.setAttribute(
    'aria-label',
    theme === DARK_THEME ? 'Light Mode aktivieren' : 'Dark Mode aktivieren'
  );
}
```

---

### `navigation.js`

```javascript
/**
 * navigation.js / Sticky Header, Burger-Menü, Active Links
 *
 * Hier lerne ich: Der Intersection Observer ist viel
 * performanter als scroll-Events, weil der Browser die
 * schwere Arbeit übernimmt. Kein eigenes Scroll-Tracking nötig.
 */

import { throttle } from './utils.js';

export function initNavigation() {
  initStickyHeader();
  initBurgerMenu();
  initActiveLinks();
}

/*Sticky Header: --scrolled Klasse bei Scroll*/
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = throttle(() => {
    header.classList.toggle('site-header--scrolled', window.scrollY > 50);
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
}

/*Burger-Menü für Mobile*/
function initBurgerMenu() {
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.querySelector('.nav__links');
  if (!burger || !navLinks) return;

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('nav__links--open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  // Menü schliessen beim Klick auf Link
  navLinks.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('nav__links--open');
      document.body.classList.remove('menu-open');
    });
  });
}

/* Active Nav-Link via Intersection Observer */
function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('nav__link--active', isActive);
          link.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' } // Sektion gilt als aktiv wenn sie mittig im Viewport ist
  );

  sections.forEach((section) => observer.observe(section));
}
```

---

### `animations.js`

```javascript
/**
 * animations.js / Scroll-Reveal via Intersection Observer
 *
 * Hier lerne ich: Ich füge nur eine CSS-Klasse hinzu (.is-visible).
 * Die eigentliche Animation definiere ich in animations.css.
 * JS und CSS haben klare, getrennte Rollen.
 */

export function initAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Kein Observer für Nutzer die Animationen reduzieren möchten
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Einmal reicht, danach nicht mehr beobachten
      });
    },
    { threshold: 0.15 } // 15% des Elements muss sichtbar sein
  );

  elements.forEach((el) => observer.observe(el));
}
```

---

### `form.js`

```javascript
/**
 * form.js / Kontaktformular Validierung & Submit
 *
 * Hier lerne ich: Client-seitige Validierung ist UX,
 * Server-seitige Validierung ist Sicherheit.
 * Ich brauche beides, niemals nur eine.
 */

export function initForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = {
      name: form.querySelector('#name'),
      email: form.querySelector('#email'),
      message: form.querySelector('#message'),
    };

    // Alle Felder validieren
    const isValid = Object.values(fields).every((field) =>
      validateField(field)
    );
    if (!isValid) return;

    // Ladestate anzeigen
    submitBtn.textContent = 'Wird gesendet…';
    submitBtn.disabled = true;

    try {
      // Option A: mailto (kein Backend nötig)
      // const { name, email, message } = Object.fromEntries(new FormData(form));
      // window.location.href = `mailto:meine@email.ch?subject=Kontakt von ${name}&body=${message}`;

      // Option B: Eigene API / Formspree (eine Variante ist Formspree, sehr bekannt und einfach zu integrieren)
      const response = await fetch('https://formspree.io/f/...', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (!response.ok) throw new Error('Server-Fehler');

      form.reset();
      success.hidden = false;
      success.focus();
    } catch (err) {
      alert('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
      console.error('Form submit error:', err);
    } finally {
      submitBtn.textContent = 'Nachricht senden';
      submitBtn.disabled = false;
    }
  });

  // Live-Validierung nach Verlassen des Feldes
  form.querySelectorAll('.form-input').forEach((input) => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('form-input--error')) validateField(input);
    });
  });
}

function validateField(field) {
  const errorEl = field.parentElement.querySelector('.form-error');
  let message = '';

  if (!field.value.trim()) {
    message = 'Dieses Feld ist erforderlich.';
  } else if (
    field.type === 'email' &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
  ) {
    message = 'Bitte gib eine gültige E-Mail-Adresse ein.';
  } else if (field.id === 'message' && field.value.trim().length < 10) {
    message = 'Die Nachricht muss mindestens 10 Zeichen lang sein.';
  }

  const hasError = Boolean(message);
  field.classList.toggle('form-input--error', hasError);
  field.setAttribute('aria-invalid', String(hasError));
  if (errorEl) errorEl.textContent = message;

  return !hasError;
}
```

---

### `main.js`

```javascript
/**
 * main.js / Einstiegspunkt der Anwendung
 *
 * Hier lerne ich: main.js ist der "Dirigent".
 * Er macht selbst nichts, er initialisiert alle Module
 * zum richtigen Zeitpunkt.
 */

import { initTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  // Reihenfolge ist wichtig: Theme zuerst, um Flash zu vermeiden
  initTheme();
  initNavigation();
  initAnimations();
  initForm();

  // Footer-Jahr automatisch aktuell halten
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  console.log('Portfolio geladen.');
});
```

---

## Sektionen der OnePage

![Abbildung: Sektionen](assets/visual-selection.png)

---

## Namenkonventionen

Ich folge der **BEM-Methodik** (Block, Element, Modifier):

```
Block              →  .nav
Block__Element     →  .nav__link
Block--Modifier    →  .nav__link--active
```

### Warum BEM?

```
OHNE BEM (Chaos):        MIT BEM (Klarheit):
.header-nav-link         .nav__link
.header-nav-link-active  .nav__link--active
.red-button              .btn--primary
.small-red-button        .btn--primary.btn--small
```

### Meine CSS-Klassen auf einen Blick

| Bereich   | Klasse                   | Beschreibung                     |
| --------- | ------------------------ | -------------------------------- |
| Layout    | `.container`             | Maximale Breite, zentriert       |
| Layout    | `.section`               | Abschnitt mit Innenabstand       |
| Nav       | `.nav__link--active`     | Aktuell aktiver Navigationspunkt |
| Nav       | `.site-header--scrolled` | Header nach unten gescrollt      |
| Animation | `.reveal`                | Element wartet auf Sichtbarkeit  |
| Animation | `.reveal--delay-1`       | Verzögerung 150ms                |
| Animation | `.is-visible`            | JS fügt dies hinzu → Animation   |
| Button    | `.btn--primary`          | Hauptaktion                      |
| Button    | `.btn--outline`          | Sekundäre Aktion                 |
| Form      | `.form-input--error`     | Validierungsfehler-Zustand       |
| Projekt   | `.project-card`          | Portfolio-Karte                  |
| Skills    | `.skill-card`            | Skill-Gruppe                     |

---

## Assets & Ressourcen

### Bilder-Optimierung (gute Lösung für Ressourcensparende Bilder)

```
Original-Foto (DSLR)
        │
        ▼
  Squoosh.app / TinyPNG
        │
        ├─ hero.webp     (max. 200 KB)
        ├─ hero.jpg      (Fallback für ältere Browser)
        └─ hero-2x.webp  (für Retina-Displays)
```

### Google Fonts einbinden (in `<head>`)

```html
<!-- Nur die benötigten Gewichte laden / mehr = langsamere Seite! -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

### Empfohlene kostenlose Icon-Quellen

| Quelle              | Link              | Besonderheit           |
| ------------------- | ----------------- | ---------------------- |
| Heroicons           | heroicons.com     | SVG, für UI-Icons      |
| Phosphor Icons      | phosphoricons.com | 6 Gewichtsklassen      |
| Font Awesome (free) | fontawesome.com   | Sehr umfangreich       |
| Tabler Icons        | tabler-icons.io   | 5000+ SVGs, MIT-Lizenz |

---

## Checkliste vor dem Launch (mit Claude erstellt)

### Inhalt

- [ ] Eigenes Portrait-Foto hochgeladen
- [ ] Echter Name, echter Beruf eingetragen
- [ ] Projekte mit echten Links versehen
- [ ] E-Mail-Adresse im Footer & Kontaktformular korrekt
- [ ] Instagram/ LinkedIn / GitHub Links aktuell

### Design

- [ ] Dark Mode funktioniert und sieht gut aus
- [ ] Alle Sektionen haben konsistenten Abstand
- [ ] Farben im Dark Mode haben ausreichend Kontrast (min. 4.5:1)
- [ ] Schriften werden korrekt geladen (kein FOUT)

### Performance

- [ ] Bilder komprimiert (< 200 KB pro Bild)
- [ ] `loading="lazy"` auf allen Bildern ausser Hero
- [ ] Google PageSpeed Score > 90
- [ ] CSS und JS am richtigen Ort (`<link>` im `<head>`, `<script>` vor `</body>`)

### Accessibility

- [ ] Alle Bilder haben `alt`-Attribute
- [ ] Farbkontrast geprüft (WCAG AA)
- [ ] Navigation per Tastatur möglich (Tab-Navigation)
- [ ] `aria-label` auf Buttons ohne sichtbaren Text
- [ ] Keine `<div>` als Button-Ersatz

### Responsive

- [ ] Auf iPhone SE (375px) getestet
- [ ] Auf iPad (768px) getestet
- [ ] Auf Desktop (1440px) getestet
- [ ] Hamburger-Menü öffnet und schliesst korrekt

### SEO & Meta

- [ ] `<meta name="description">` ausgefüllt
- [ ] Open Graph Bild gesetzt (og:image)
- [ ] Favicon vorhanden
- [ ] Seitentitel sprechend und einzigartig

---

## Weiterführendes Lernen (optional für mich)

| Thema                 | Ressource                            |
| --------------------- | ------------------------------------ |
| CSS Custom Properties | MDN: CSS Variables                   |
| BEM-Methodik          | getbem.com                           |
| Intersection Observer | MDN: Intersection Observer API       |
| Web Accessibility     | web.dev/accessibility                |
| Performance           | web.dev/performance                  |
| Formspree (Formular)  | formspree.io                         |
| Bilder optimieren     | squoosh.app                          |
| Farb-Kontrast prüfen  | webaim.org/resources/contrastchecker |

---
Link zu der Dokumentation Wiki:
**[Wiki](https://github.com/Andrinlv/Modul293.wiki.git)**