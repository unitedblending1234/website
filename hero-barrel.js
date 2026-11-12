// United Blending: hero drum
// A realistic 3D steel drum (assets/drum.glb) that drops into the hero once
// the fly-in film has "landed" (main.js fires `hero:landed` when the video
// ends), then keeps tumbling down the page as you scroll.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const about = document.getElementById("about");
const mount = document.getElementById("heroBarrel");

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
mount.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
camera.position.set(0, 0.2, 10);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
keyLight.position.set(4, 6, 5);
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0x9db1ff, 1.1);
rimLight.position.set(-6, 2, -4);
scene.add(rimLight);

// ---------- Procedural textures (painted label + wear, drawn on canvas) ----------
function makeBodyTexture() {
  const c = document.createElement("canvas");
  c.width = 2048;
  c.height = 1024;
  const g = c.getContext("2d");

  const paint = (font) => {
    // Base paint: navy with a subtle vertical sheen
    const grad = g.createLinearGradient(0, 0, 0, c.height);
    grad.addColorStop(0, "#2148c9");
    grad.addColorStop(0.5, "#1c3fc0");
    grad.addColorStop(1, "#16329a");
    g.fillStyle = grad;
    g.fillRect(0, 0, c.width, c.height);

    // Faint vertical wear streaks so the paint isn't factory-perfect
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * c.width;
      const y = Math.random() * c.height;
      const w = 1 + Math.random() * 3;
      const h = 40 + Math.random() * 400;
      const tone = Math.random() > 0.5 ? "255,255,255" : "0,0,20";
      g.fillStyle = `rgba(${tone},${0.015 + Math.random() * 0.02})`;
      g.fillRect(x, y, w, h);
    }

    // Pale accent stripes framing the label band (at the rib lines)
    g.fillStyle = "rgba(235,240,250,0.92)";
    g.fillRect(0, c.height * 0.3, c.width, 8);
    g.fillRect(0, c.height * 0.7 - 8, c.width, 8);

  };
  paint('"Arial Black", sans-serif');

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  // Repaint with the brand font once it has actually loaded
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      paint('"Baloo 2", sans-serif');
      tex.needsUpdate = true;
    });
  }
  return tex;
}

function makeBumpTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const g = c.getContext("2d");
  g.fillStyle = "#808080";
  g.fillRect(0, 0, c.width, c.height);
  for (let i = 0; i < 4000; i++) {
    const v = 110 + Math.floor(Math.random() * 40);
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.fillRect(Math.random() * c.width, Math.random() * c.height, 2, 2);
  }
  return new THREE.CanvasTexture(c);
}

// ---------- Procedural oil barrel (dark blue, realistic drum shape) ----------
function createBarrel() {
  const barrel = new THREE.Group();

  // Physical material with clearcoat = glossy painted steel
  const drumBlue = new THREE.MeshPhysicalMaterial({
    map: makeBodyTexture(),
    bumpMap: makeBumpTexture(),
    bumpScale: 0.015,
    metalness: 0.45,
    roughness: 0.42,
    clearcoat: 0.7,
    clearcoatRoughness: 0.3,
  });
  const lidBlue = new THREE.MeshPhysicalMaterial({
    color: 0x16329a,
    metalness: 0.6,
    roughness: 0.38,
    clearcoat: 0.5,
    clearcoatRoughness: 0.35,
  });
  const steel = new THREE.MeshStandardMaterial({
    color: 0xb9c2d4,
    metalness: 0.9,
    roughness: 0.25,
  });

  const H = 3.0;      // total height
  const R = 1.0;      // base radius
  const bulge = 0.05; // slight swell in the middle

  // Real drums have two ribs PRESSED INTO the steel — shaped into the profile
  const points = [];
  const SEGMENTS = 120;
  for (let i = 0; i <= SEGMENTS; i++) {
    const t = i / SEGMENTS;               // 0 (bottom) → 1 (top)
    const y = (t - 0.5) * H;
    let r = R + Math.sin(t * Math.PI) * bulge;
    for (const c of [0.28, 0.72]) {       // rolling-rib positions
      r += 0.05 * Math.exp(-Math.pow((t - c) / 0.022, 2));
    }
    points.push(new THREE.Vector2(r, y));
  }
  const body = new THREE.Mesh(new THREE.LatheGeometry(points, 96), drumBlue);
  barrel.add(body);

  // Chimes: the rolled steel lips at the very top and bottom
  const chimeGeo = new THREE.TorusGeometry(R + 0.015, 0.045, 16, 96);
  for (const y of [-H / 2, H / 2]) {
    const chime = new THREE.Mesh(chimeGeo, steel);
    chime.rotation.x = Math.PI / 2;
    chime.position.y = y;
    barrel.add(chime);
  }

  // Lid and base
  const lidGeo = new THREE.CylinderGeometry(R - 0.02, R - 0.02, 0.06, 96);
  const lid = new THREE.Mesh(lidGeo, lidBlue);
  lid.position.y = H / 2;
  barrel.add(lid);
  const base = lid.clone();
  base.position.y = -H / 2;
  barrel.add(base);

  // Bung caps (the two small plugs on the lid)
  const bungGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.05, 32);
  for (const x of [0.45, -0.45]) {
    const bung = new THREE.Mesh(bungGeo, steel);
    bung.position.set(x, H / 2 + 0.05, 0);
    barrel.add(bung);
  }

  return barrel;
}

// `barrel` is the animated holder; the realistic model is loaded into it.
const barrel = new THREE.Group();
scene.add(barrel);
let ready = false;

new GLTFLoader().load(
  "assets/drum.glb?v=2",
  (gltf) => {
    const model = gltf.scene;
    // Normalise: centre the model and scale it to the 3-unit height the
    // choreography below was tuned for, whatever size it was exported at.
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const centre = box.getCenter(new THREE.Vector3());
    model.position.sub(centre);
    const fit = new THREE.Group();
    fit.add(model);
    fit.scale.setScalar(3 / size.y);
    barrel.add(fit);
    model.traverse((o) => {
      if (o.isMesh && o.material) {
        o.material.envMapIntensity = 1.25;   // painted steel wants reflections
        if (o.material.map) o.material.map.anisotropy = 8;
      }
    });
    ready = true;
  },
  undefined,
  () => {                                     // model missing: plain coded drum
    barrel.add(createBarrel());
    ready = true;
  }
);

// ---------- Layout ----------
const REST_Y = -2.15;     // hero resting spot: low in the frame, base below the fold
const START_Y = 7.5;      // well above the top edge
const EXIT_Y = -8;        // well below the bottom edge
barrel.position.set(0, START_Y, 0);

let visH = 1, visW = 1, pxPerUnit = 1, wide = true;
let heroH = 1, aboutTop = 1, aboutTravel = 1;
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  // World units visible at the drum's depth, for placing it in screen terms
  visH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
  visW = visH * camera.aspect;
  pxPerUnit = h / visH;
  wide = w >= 1100;       // room beside the centred About text for the drum
  heroH = h;
  aboutTop = about ? about.offsetTop : h;
  aboutTravel = about ? Math.max(1, about.offsetHeight - h) : h;
}
window.addEventListener("resize", resize);
window.addEventListener("load", resize);
resize();

// ---------- The drop ----------
const DROP = 1.9;         // seconds: lands just as the header comes out
let dropT = -1;           // -1 = waiting above the frame
let last = performance.now();
let spin = 0;
let cleared = false;

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;
// Glides in and slows to a stop with no bounce
const landEase = (t) => 1 - Math.pow(1 - t, 4);

// Where the drum should be for the current scroll position.
// Wide screens: it slides to the right margin and turns slowly beside the
// About statement, then falls out of the bottom as the next section arrives.
// Narrow screens: no margin to sit in, so it simply falls away with the hero.
function target(scroll) {
  const a = clamp01(scroll / aboutTop);                   // hero scrolling away
  if (!wide) {
    const k = a * a;
    return { x: 0, y: lerp(REST_Y, EXIT_Y, k), s: 1, tumble: scroll * 0.0026, gone: a >= 1 };
  }
  const b = clamp01((scroll - aboutTop) / aboutTravel);   // through About
  const past = scroll - aboutTop - aboutTravel;           // scrolled beyond About
  const c = clamp01(past / (heroH * 1.05));               // crossing to the left
  const d = clamp01((past - heroH * 0.95) / (heroH * 0.8));   // falling away
  const sideS = THREE.MathUtils.clamp(190 / pxPerUnit / 3, 0.34, 0.6);    // ~190px tall
  const sideX = visW / 2 - 135 / pxPerUnit;               // ~135px in from the edge
  const e = smooth(a);
  let y = lerp(REST_Y, -1.1, e);
  y = lerp(y, -1.7, smooth(b));
  // After About it drops and sweeps across to the left, slipping behind the
  // selling-point cards (they sit on a layer above this canvas), then falls away.
  y = lerp(y, -2.3, smooth(c));
  y = lerp(y, EXIT_Y, d * d);
  const x = lerp(sideX * e, -sideX, smooth(c));
  return { x, y, s: lerp(1, sideS, e), tumble: scroll * 0.0021, gone: d >= 1 };
}

const cur = { x: 0, y: START_Y, s: 1, tumble: 0 };
function start() {
  if (dropT >= 0) return;
  const t = target(window.scrollY);
  if (t.gone) {
    // Visitor has already scrolled past its whole path: no drop to show,
    // just pick up the scroll choreography if they come back up.
    dropT = 1;
    Object.assign(cur, { x: t.x, y: t.y, s: t.s, tumble: t.tumble });
  } else {
    dropT = 0;
  }
}
window.addEventListener("hero:landed", start);
if (window.__heroLanded) start();                         // event already fired

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (!ready || dropT < 0) return;

  const t = target(window.scrollY);
  if (dropT < 1) {
    // Falls to wherever it belongs for the current scroll position, so it
    // never lands on top of a section the visitor has already scrolled to.
    dropT = Math.min(1, dropT + dt / DROP);
    const k = landEase(dropT);
    cur.x = t.x * k;
    cur.y = lerp(START_Y, t.y, k);
    cur.s = t.s;
    cur.tumble = t.tumble;
    barrel.position.set(cur.x, cur.y, 0);
    barrel.scale.setScalar(cur.s);
    barrel.rotation.set(t.tumble, (1 - k) * 4, (1 - k) * 0.45);   // rights itself as it falls
  } else {
    // Heavy, damped follow: scroll steps are smoothed into one continuous glide
    const f = 1 - Math.exp(-dt * 3.2);
    cur.x += (t.x - cur.x) * f;
    cur.y += (t.y - cur.y) * f;
    cur.s += (t.s - cur.s) * f;
    cur.tumble += (t.tumble - cur.tumble) * f;

    // Nothing to draw once it has fallen out of view: clear once, then idle
    if (t.gone && cur.y < EXIT_Y + 0.5) {
      if (!cleared) { renderer.clear(); cleared = true; }
      return;
    }
    cleared = false;

    spin += dt * 0.2;                                     // slow showroom turn
    barrel.position.set(cur.x, cur.y + Math.sin(now / 1600) * 0.04, 0);
    barrel.scale.setScalar(cur.s);
    barrel.rotation.y = spin + cur.tumble * 0.5;
    barrel.rotation.x = cur.tumble;                       // end over end as it falls
    barrel.rotation.z = Math.sin(cur.tumble * 0.6) * 0.28;
  }
  renderer.render(scene, camera);
}
requestAnimationFrame(frame);
