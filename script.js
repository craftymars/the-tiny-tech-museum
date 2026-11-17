
/* =========================================
   TINY TECH MUSEUM
   Memory Lane Archives
========================================= */

const exhibits = [
  {
    name: "Game Boy",
    year: "1989",
    icon: "🎮",
    image: "assets/gameboy.jpg",
    intro: "Nintendo's iconic handheld brought gaming adventures everywhere.",
    popularity: "A worldwide hit that helped define portable gaming.",
    pros: "Long battery life, portability, and memorable games.",
    cons: "Monochrome display without a built-in backlight.",
    funFact: "Tetris was one of the Game Boy's most famous launch-era games.",
    legacy: "Helped establish the market for handheld gaming.",
    modern: "Nintendo Switch and other modern handheld gaming devices."
  },
  {
    name: "Sega Dreamcast",
    year: "1998",
    icon: "💿",
    image: "assets/dreamcast.jpg",
    intro: "Sega's futuristic console was ahead of its time.",
    popularity: "Developed a devoted fanbase but struggled commercially.",
    pros: "Creative games, arcade-quality experiences, and online features.",
    cons: "Limited commercial success and a short lifespan.",
    funFact: "The Dreamcast controller could hold a removable VMU with its own tiny screen.",
    legacy: "Helped shape the future of online console gaming.",
    modern: "Modern PlayStation and Xbox consoles with built-in online services."
  },
  {
    name: "PlayStation 2",
    year: "2000",
    icon: "🕹️",
    image: "assets/ps2.jpg",
    intro: "Sony's legendary console became a defining part of gaming history.",
    popularity: "One of the best-selling gaming consoles ever.",
    pros: "Huge game library, DVD support, and broad developer support.",
    cons: "Early models had limited built-in online functionality.",
    funFact: "The PlayStation 2 could play DVDs, making it useful beyond gaming.",
    legacy: "Helped establish PlayStation as a major gaming platform.",
    modern: "PlayStation 5."
  },
  {
    name: "Nintendo DS",
    year: "2004",
    icon: "📱",
    image: "assets/nintendo-ds.jpg",
    intro: "Two screens, a stylus, and a whole new way to play.",
    popularity: "A hugely successful handheld with a diverse game library.",
    pros: "Touchscreen controls, portability, and wireless features.",
    cons: "The original model had relatively low screen resolution.",
    funFact: "PictoChat let nearby DS owners exchange drawings and messages.",
    legacy: "Popularized touchscreen interactions in portable gaming.",
    modern: "Nintendo Switch and touchscreen mobile gaming."
  },
  {
    name: "Nintendo Wii",
    year: "2006",
    icon: "✨",
    image: "assets/wii.jpg",
    intro: "Nintendo turned living rooms into virtual bowling alleys.",
    popularity: "A major mainstream success that attracted new audiences.",
    pros: "Motion controls, accessible gameplay, and family-friendly games.",
    cons: "Less graphical power than competing consoles.",
    funFact: "Wii Sports became one of the console's most recognizable games.",
    legacy: "Helped popularize motion-based gaming.",
    modern: "Nintendo Switch motion controls and modern VR experiences."
  }
];

/* =========================================
   ELEMENTS
========================================= */

const startup = document.getElementById("startup");
const desktop = document.getElementById("desktop");
const startButton = document.getElementById("start-btn");

const iconContainer = document.getElementById("desktop-icons");

const museumWindow = document.getElementById("museum-window");
const windowTitle = document.getElementById("window-title");
const windowContent = document.getElementById("window-content");
const closeButton = document.getElementById("close-window");

let lastFocusedIcon = null;

/* =========================================
   HELPER FUNCTIONS
========================================= */

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

function createInfoSection(title, content) {
  const section = createElement("section", "archive-section");

  const heading = createElement("h4", "", title);
  const paragraph = createElement("p", "", content);

  section.append(heading, paragraph);

  return section;
}

/* =========================================
   OPEN EXHIBIT
========================================= */

function openExhibit(exhibit, trigger) {
  lastFocusedIcon = trigger;

  windowTitle.textContent = `${exhibit.name}.exe`;
  windowContent.replaceChildren();

  const archive = createElement("article", "archive");

  const heading = createElement(
    "h3",
    "archive-title",
    exhibit.name
  );

  const release = createElement(
    "p",
    "archive-release",
    `RELEASED: ${exhibit.year}`
  );

  const imageBox = createElement("div", "archive-image");

  const image = document.createElement("img");
  image.src = exhibit.image;
  image.alt = `${exhibit.name} gaming device`;
  image.loading = "lazy";

  const fallback = createElement(
    "span",
    "archive-fallback",
    exhibit.icon
  );

  fallback.hidden = true;

  image.addEventListener("error", () => {
    image.hidden = true;
    fallback.hidden = false;
  });

  imageBox.append(image, fallback);

  archive.append(heading, release, imageBox);

  archive.append(
    createInfoSection("✦ MEMORY LANE", exhibit.intro),
    createInfoSection("★ POPULARITY", exhibit.popularity),
    createInfoSection("✓ THE GOOD", exhibit.pros),
    createInfoSection("✕ THE NOT-SO-GOOD", exhibit.cons),
    createInfoSection("♡ DID YOU KNOW?", exhibit.funFact),
    createInfoSection("↗ LEGACY", exhibit.legacy)
  );

  const comparison = createElement(
    "section",
    "archive-comparison"
  );

  const comparisonTitle = createElement(
    "h4",
    "",
    "THEN VS. NOW"
  );

  const comparisonGrid = createElement(
    "div",
    "comparison-grid"
  );

  const thenBox = createElement("div", "comparison-box");
  thenBox.append(
    createElement("strong", "", "THEN"),
    createElement("p", "", `${exhibit.name} (${exhibit.year})`)
  );

  const nowBox = createElement("div", "comparison-box");
  nowBox.append(
    createElement("strong", "", "NOW"),
    createElement("p", "", exhibit.modern)
  );

  comparisonGrid.append(thenBox, nowBox);
  comparison.append(comparisonTitle, comparisonGrid);

  archive.append(comparison);
  windowContent.append(archive);

  museumWindow.classList.remove("hidden");
  closeButton.focus();
}

/* =========================================
   CLOSE EXHIBIT
========================================= */

function closeExhibit() {
  museumWindow.classList.add("hidden");
  lastFocusedIcon?.focus();
}

/* =========================================
   CREATE DESKTOP ICONS
========================================= */

exhibits.forEach((exhibit) => {
  const button = createElement("button", "desktop-icon");

  button.type = "button";

  button.setAttribute(
    "aria-label",
    `Explore ${exhibit.name}`
  );

  const icon = createElement(
    "span",
    "icon-art",
    exhibit.icon
  );

  const label = createElement(
    "span",
    "icon-label",
    exhibit.name
  );

  button.append(icon, label);

  button.addEventListener("click", () => {
    openExhibit(exhibit, button);
  });

  iconContainer.appendChild(button);
});

/* =========================================
   STARTUP ANIMATION
========================================= */

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  startButton.textContent = "LOADING...";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  setTimeout(() => {
    startup.classList.add("hidden");
    desktop.classList.remove("hidden");

    iconContainer.querySelector("button")?.focus();
  }, reducedMotion ? 0 : 650);
});

/* =========================================
   WINDOW CONTROLS
========================================= */

closeButton.addEventListener("click", closeExhibit);

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    !museumWindow.classList.contains("hidden")
  ) {
    closeExhibit();
  }
});

/* =========================================
   FLOATING BACKGROUND BUBBLES
========================================= */

const bubbleBackground = document.querySelector(
  ".bubble-background"
);

const bubbleColors = [
  "rgba(182, 218, 202, 0.55)",
  "rgba(213, 165, 219, 0.55)",
  "rgba(155, 197, 236, 0.55)",
  "rgba(111, 165, 166, 0.45)"
];

if (bubbleBackground) {
  for (let i = 0; i < 18; i++) {
    const bubble = document.createElement("span");

    bubble.classList.add("bubble");

    const size = Math.random() * 55 + 15;
    const duration = Math.random() * 12 + 12;
    const delay = Math.random() * -24;

    const color = bubbleColors[
      Math.floor(Math.random() * bubbleColors.length)
    ];

    bubble.style.setProperty("--size", `${size}px`);
    bubble.style.setProperty("--left", `${Math.random() * 100}%`);
    bubble.style.setProperty("--duration", `${duration}s`);
    bubble.style.setProperty("--delay", `${delay}s`);
    bubble.style.setProperty("--bubble-color", color);

    bubbleBackground.appendChild(bubble);
  }
}
