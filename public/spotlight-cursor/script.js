const root = document.documentElement;
const cursor = document.querySelector(".cursor");
const trails = Array.from(document.querySelectorAll(".trail"));
const monoLayer = document.querySelector(".layer-mono");
const hoverables = () => Array.from(document.querySelectorAll("a, button"));

const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
const target = { ...pos };
const trailState = trails.map(() => ({ x: pos.x, y: pos.y }));

let rafId = null;
let stutterCount = 0;
const MAX_STUTTER = 6;
const STUTTER_THRESHOLD = 120; // ms

const lerp = (a, b, n) => (1 - n) * a + n * b;

function animate(timestamp) {
  const now = performance.now();
  const dt = now - (animate.lastTime || now);
  animate.lastTime = now;

  // Stutter guard -> fall back to default cursor
  if (dt > STUTTER_THRESHOLD) {
    stutterCount += 1;
    if (stutterCount > MAX_STUTTER) return disableCustomCursor();
  } else {
    stutterCount = 0;
  }

  pos.x = lerp(pos.x, target.x, parseFloat(getComputedStyle(root).getPropertyValue("--lag")));
  pos.y = lerp(pos.y, target.y, parseFloat(getComputedStyle(root).getPropertyValue("--lag")));

  root.style.setProperty("--cursor-x", `${pos.x}px`);
  root.style.setProperty("--cursor-y", `${pos.y}px`);
  cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

  trailState.forEach((t, i) => {
    const lag = 0.08 + i * 0.05;
    t.x = lerp(t.x, pos.x, lag);
    t.y = lerp(t.y, pos.y, lag);
    trails[i].style.transform = `translate3d(${t.x}px, ${t.y}px, 0)`;
  });

  rafId = requestAnimationFrame(animate);
}

function onMove(e) {
  target.x = e.clientX;
  target.y = e.clientY;
}

function onHover(e) {
  const isHover = e.type === "mouseover";
  cursor.classList.toggle("hovering", isHover);
}

function enableCustomCursor() {
  if ("ontouchstart" in window || matchMedia("(pointer: coarse)").matches) {
    return disableCustomCursor();
  }

  document.body.classList.remove("no-custom-cursor");
  monoLayer.style.maskImage = "";
  monoLayer.style.webkitMaskImage = "";

  window.addEventListener("mousemove", onMove);
  hoverables().forEach((el) => {
    el.addEventListener("mouseover", onHover);
    el.addEventListener("mouseout", onHover);
  });
  animate();
}

function disableCustomCursor() {
  document.body.classList.add("no-custom-cursor");
  window.removeEventListener("mousemove", onMove);
  hoverables().forEach((el) => {
    el.removeEventListener("mouseover", onHover);
    el.removeEventListener("mouseout", onHover);
  });
  if (rafId) cancelAnimationFrame(rafId);
  monoLayer.style.maskImage = "none";
  monoLayer.style.webkitMaskImage = "none";
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    disableCustomCursor();
  } else {
    enableCustomCursor();
  }
});

window.addEventListener("resize", () => {
  target.x = window.innerWidth / 2;
  target.y = window.innerHeight / 2;
});

enableCustomCursor();
