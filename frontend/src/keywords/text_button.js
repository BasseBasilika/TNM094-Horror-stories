import triggerList from "./triggers.js";

let audioCtx = null;
const audioBuffers = {};
let lastTriggeredElement = null;
let trail = [];

async function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") await audioCtx.resume();
  return audioCtx;
}

async function unlockAudio() {
  await getCtx();
}

async function play(soundFile) {
  const ctx = await getCtx();
  if (!audioBuffers[soundFile]) {
    const res = await fetch(soundFile);
    const raw = await res.arrayBuffer();
    audioBuffers[soundFile] = await ctx.decodeAudioData(raw);
  }
  const src = ctx.createBufferSource();
  src.buffer = audioBuffers[soundFile];
  src.connect(ctx.destination);
  src.start();
}

function findTrigger(word) {
  const clean = word.toLowerCase().replace(/[.,!?;:()"']/g, "");
  return triggerList.find(t => t.keyword === clean);
}

let triggerElements = [];

let fadeTimeout = null;
function clearTrail() {
  trail.forEach(el => el.classList.remove('word-trail'));
  trail = [];
}
function handleMove(e) {
  unlockAudio();  // ← add this line at the top
  const point = e.touches?.[0] ?? e;
  const cx = point.clientX;
  const cy = point.clientY;

  // reset the 30s fade timer on every move
  clearTimeout(fadeTimeout);
  fadeTimeout = setTimeout(() => {
    clearTrail();
  }, 10000);

  // auto scroll the story box
  const box = document.querySelector('.story-box');
  if (box) {
    const rect = box.getBoundingClientRect();
    const threshold = 100;
    const speed = 1;

    if (cy > rect.bottom - threshold) {
      box.scrollBy(0, speed);
    } else if (cy < rect.top + threshold) {
      box.scrollBy(0, -speed);
    }
  }

  const elements = document.elementsFromPoint(cx, cy);
  const hit = elements.find(el => el.dataset?.trigger);
  const hoveredSpan = elements.find(el => el.dataset?.word || el.dataset?.trigger);

  if (hoveredSpan && hoveredSpan !== trail[trail.length - 1]) {
    hoveredSpan.classList.add('word-trail');
    trail.push(hoveredSpan);
  }

  if (hit && hit !== lastTriggeredElement) {
    lastTriggeredElement = hit;
    play(hit.dataset.trigger);
  }
  if (!hit) lastTriggeredElement = null;
}

function handleEnd() {
  lastTriggeredElement = null;
}

function RenderStoryText({ text }) {
  triggerElements = [];
  trail = [];

  const words = (text ?? "").split(/\s+/);

  return (
    <div
      onPointerMove={handleMove}
      onTouchMove={handleMove}
      onPointerDown={() => unlockAudio()}
      onTouchStart={() => unlockAudio()}
      onTouchEnd={handleEnd}
      onPointerUp={handleEnd}
      style={{ touchAction: "none" }}
    >
      {words.map((word, i) => {
        const match = findTrigger(word);
        if (match) {
          return (
            <span
              key={i}
              ref={el => el && triggerElements.push(el)}
              data-trigger={match.sound}
              data-word="true"
              className="word-button"
            >
              {word}{" "}
            </span>
          );
        }
        return <span key={i} data-word="true">{word} </span>;
      })}
    </div>
  );
}

export default RenderStoryText;