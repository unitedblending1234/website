// United Blending — premium revamp
// Hero video plays once and holds its last frame; text reveals on scroll.

// Always start at the top on refresh so the hero video + reveals replay
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
window.scrollTo(0, 0);

// ---------- Nav: transparent over the video, solid once you scroll ----------
const nav = document.getElementById("nav");
function updateNav() {
  nav.classList.toggle("solid", window.scrollY > 40);
}
window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// ---------- Hero: film plays once; drum drops, then the words come out ----------
const video = document.getElementById("heroVideo");
const videoTitle = document.getElementById("videoTitle");
const heroReveals = Array.from(document.querySelectorAll(".hero .reveal"));

const DRUM_AT = 700;      // ms after the hero appears: drum starts falling
const WORDS_AT = 2500;    // header comes out as the drum settles
let heroStarted = false;

function startHero() {
  if (heroStarted) return;
  heroStarted = true;

  if (video) {
    // No `loop` attribute: when it ends, the browser keeps the last frame.
    video.play().catch(() => {
      // Autoplay blocked (rare with muted, but possible): play on first
      // interaction instead of showing a frozen first frame forever.
      const kick = () => {
        video.play().catch(() => {});
        window.removeEventListener("pointerdown", kick);
        window.removeEventListener("keydown", kick);
      };
      window.addEventListener("pointerdown", kick);
      window.addEventListener("keydown", kick);
    });
  }

  // 1. The drum drops down the middle (hero-barrel.js listens for this;
  //    flag as well as event, in case the module loads after it fires)
  setTimeout(() => {
    window.__heroLanded = true;
    window.dispatchEvent(new Event("hero:landed"));
  }, DRUM_AT);

  // 2. Then the header, followed by the sub-header and button
  setTimeout(() => videoTitle && videoTitle.classList.add("show"), WORDS_AT);
  heroReveals.forEach((el, i) =>
    setTimeout(() => el.classList.add("in"), WORDS_AT + 350 + i * 180)
  );
}

// ---------- Preloader: logo wipes in left to right, then it lifts ----------
const preloader = document.getElementById("preloader");
if (preloader) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MIN = reduce ? 500 : 2500;                   // long enough to see the logo land
  const t0 = performance.now();
  let lifted = false;

  const lift = () => {
    if (lifted) return;
    lifted = true;
    preloader.classList.add("done");
    document.documentElement.classList.remove("preloading");
    startHero();                                     // film is moving as it appears
    setTimeout(() => preloader.remove(), 1200);
  };
  // Lift once the animation has played and the page has loaded (6s at most)
  const ready = () => setTimeout(lift, Math.max(0, MIN - (performance.now() - t0)));
  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready, { once: true });
  setTimeout(lift, 6000);
} else {
  startHero();
}

// ---------- Selling points: tap toggles the photo + description (touch) ----------
document.querySelectorAll(".ksp").forEach((card) => {
  card.addEventListener("click", () => card.classList.toggle("open"));
});

// ---------- About: statement lights up word by word as you scroll ----------
const aboutSec = document.getElementById("about");
const aboutOut = document.getElementById("aboutStatement");
if (aboutSec && aboutOut) {
  let words = [];
  const build = () => {
    aboutOut.textContent = "";
    words = [];
    aboutSec.querySelectorAll(".about-src").forEach((src) => {
      const text = src.textContent.trim();
      // Languages without spaces (Chinese) reveal character by character
      const spaced = /\s/.test(text);
      const parts = spaced ? text.split(/\s+/) : Array.from(text);
      const para = document.createElement("p");
      parts.forEach((part, i) => {
        const span = document.createElement("span");
        span.className = "w";
        span.textContent = part;
        para.appendChild(span);
        if (spaced && i < parts.length - 1) para.appendChild(document.createTextNode(" "));
        words.push(span);
      });
      aboutOut.appendChild(para);
    });
    update();
  };
  const update = () => {
    const r = aboutSec.getBoundingClientRect();
    const vh = window.innerHeight;
    const travel = Math.max(1, r.height - vh);       // distance spent pinned
    // begins as the section rises into view, done a little before it unpins
    const p = Math.min(1, Math.max(0, (vh * 0.45 - r.top) / (vh * 0.45 + travel * 0.82)));
    const n = words.length;
    const SOFT = 5;                                  // words lit at once (soft edge)
    for (let i = 0; i < n; i++) {
      const o = Math.min(1, Math.max(0, (p * (n + SOFT) - i) / SOFT));
      words[i].style.opacity = (0.14 + 0.86 * o).toFixed(3);
    }
  };
  build();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("ub:lang", build);          // re-split translated copy
}

// ---------- Industries marquee: duplicate the row for a seamless loop ----------
const indTrack = document.getElementById("indTrack");
if (indTrack) indTrack.innerHTML += indTrack.innerHTML;

// ---------- Products: floating-card slider (drag, arrows, index) ----------
const scScroll = document.getElementById("scScroll");
if (scScroll) {
  const cards = Array.from(scScroll.querySelectorAll(".sc-card"));
  const idxEl = document.getElementById("scIndex");
  const step = () =>
    cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 320;

  document.getElementById("scPrev")?.addEventListener("click", () =>
    scScroll.scrollBy({ left: -step(), behavior: "smooth" })
  );
  document.getElementById("scNext")?.addEventListener("click", () =>
    scScroll.scrollBy({ left: step(), behavior: "smooth" })
  );

  // Big page number tracks the nearest card
  scScroll.addEventListener("scroll", () => {
    if (!idxEl) return;
    const i = Math.min(
      cards.length,
      Math.max(1, Math.round(scScroll.scrollLeft / step()) + 1)
    );
    idxEl.textContent = String(i).padStart(2, "0");
  }, { passive: true });

  // Drag to scroll, snapping to the nearest card on release
  let dragging = false;
  let startX = 0;
  let startScroll = 0;
  scScroll.addEventListener("pointerdown", (e) => {
    dragging = true;
    scScroll.classList.add("dragging");
    scScroll.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startScroll = scScroll.scrollLeft;
  });
  scScroll.addEventListener("pointermove", (e) => {
    if (dragging) scScroll.scrollLeft = startScroll - (e.clientX - startX);
  });
  const scEnd = () => {
    if (!dragging) return;
    dragging = false;
    scScroll.classList.remove("dragging");
    const snapped = Math.round(scScroll.scrollLeft / step()) * step();
    scScroll.scrollTo({ left: snapped, behavior: "smooth" });
  };
  scScroll.addEventListener("pointerup", scEnd);
  scScroll.addEventListener("pointercancel", scEnd);
}

// ---------- Scroll reveals (staggered within each section) ----------
const revealEls = Array.from(document.querySelectorAll(".reveal"))
  .filter((el) => !heroReveals.includes(el));
const counts = new Map();
for (const el of revealEls) {
  const sec = el.closest("section, header, footer") || document.body;
  const idx = counts.get(sec) ?? 0;
  counts.set(sec, idx + 1);
  el.style.transitionDelay = `${Math.min(idx, 6) * 110}ms`;
}
const io = new IntersectionObserver(
  (entries) => {
    for (const en of entries) {
      if (en.isIntersecting) {
        const el = en.target;
        // Double rAF so the hidden state is painted before the reveal —
        // otherwise the transition is skipped and elements just pop in.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => el.classList.add("in"))
        );
        io.unobserve(el);
      }
    }
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));
