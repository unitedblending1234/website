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

// ---------- Hero video: play once, then hold the final frame ----------
const video = document.getElementById("heroVideo");
if (video) {
  // No `loop` attribute: when it ends, the browser keeps the last frame.
  const tryPlay = () => video.play().catch(() => {
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
  tryPlay();
}

// ---------- Hero text waits for the video to finish ----------
// The film carries the brand title; our headline fades in on the still
// frame after it ends (with a fallback timer in case playback stalls).
const heroReveals = Array.from(document.querySelectorAll(".hero .reveal"));
let heroShown = false;
function showHero() {
  if (heroShown) return;
  heroShown = true;
  // The helicopter has "landed": tell hero-barrel.js to drop the drum in.
  // (flag as well as event, in case the module loads after this fires)
  window.__heroLanded = true;
  window.dispatchEvent(new Event("hero:landed"));
  // Sub-line and button follow once the drum is on its way down
  heroReveals.forEach((el, i) =>
    setTimeout(() => el.classList.add("in"), 900 + i * 160)
  );
}
if (video) {
  video.addEventListener("ended", showHero, { once: true });
  setTimeout(showHero, 11000);
} else {
  showHero();
}

// Brand title pops in (small → big) halfway through the film and stays
const videoTitle = document.getElementById("videoTitle");
if (video && videoTitle) {
  const onTime = () => {
    if (video.duration && video.currentTime >= video.duration / 2) {
      videoTitle.classList.add("show");
      video.removeEventListener("timeupdate", onTime);
    }
  };
  video.addEventListener("timeupdate", onTime);
  setTimeout(() => videoTitle.classList.add("show"), 7000); // fallback
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
