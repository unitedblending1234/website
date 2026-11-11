// United Blending — hero barrel
// A procedural 3D steel drum that drops into the hero once the fly-in
// film has "landed" (main.js fires `hero:landed` when the video ends).
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const hero = document.querySelector(".hero");
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

    // Company label, twice around the drum so it reads from any side
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = "#f2e7ce";
    for (const cx of [c.width * 0.25, c.width * 0.75]) {
      g.font = `800 110px ${font}`;
      g.fillText("UNITED BLENDING", cx, c.height * 0.46);
      g.font = `700 44px ${font}`;
      g.fillText("PACKAGING CONTAINER  •  SINGAPORE", cx, c.height * 0.575);
    }
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

const barrel = createBarrel();
scene.add(barrel);

// ---------- Layout: where the drum rests, sized to the hero ----------
const REST_Y = -2.15;     // low in the frame, base dipping below the fold
const START_Y = 7.5;      // well above the top edge
const SCALE = 1.0;
barrel.scale.setScalar(SCALE);
barrel.position.set(0, START_Y, 0);
barrel.rotation.y = -Math.PI / 2;   // label faces the camera at rest

function resize() {
  const w = hero.clientWidth, h = hero.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

// ---------- The drop ----------
const DROP = 1.9;         // seconds
let dropT = -1;           // -1 = waiting above the frame
let visible = true;
let last = performance.now();
let spin = 0;

// Decelerating fall with one soft settle, like a heavy drum being set down
function landEase(t) {
  const c = 1 - Math.pow(1 - t, 3);                       // easeOutCubic
  const settle = Math.sin(t * Math.PI * 2.2) * 0.035 * (1 - t);
  return c + settle;
}

function start() {
  if (dropT < 0) dropT = 0;
}
window.addEventListener("hero:landed", start);
if (window.__heroLanded) start();                         // event already fired

new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (!visible) return;                                   // no GPU work off-screen

  if (dropT >= 0 && dropT < 1) {
    dropT = Math.min(1, dropT + dt / DROP);
    const k = landEase(dropT);
    barrel.position.y = START_Y + (REST_Y - START_Y) * k;
    barrel.rotation.z = (1 - dropT) * 0.5;                // rights itself as it falls
    barrel.rotation.y = -Math.PI / 2 + (1 - dropT) * 5;   // spins down to label-forward
  } else if (dropT >= 1) {
    spin += dt * 0.22;                                    // slow showroom turn
    barrel.rotation.y = -Math.PI / 2 + spin + window.scrollY * 0.003;
    barrel.position.y = REST_Y + Math.sin(now / 1400) * 0.06;
  }
  renderer.render(scene, camera);
}
requestAnimationFrame(frame);
