(() => {
  'use strict';
  const canvas = document.getElementById('watchCanvas');
  const section = document.getElementById('animation');
  const context = canvas.getContext('2d', { alpha: false });
  const frameCount = 300;
  const frameBase = 'watch-frames/ezgif-frame-';
  const images = new Array(frameCount);
  const state = new Uint8Array(frameCount); // queued, loading, ready, failed
  const queue = [];
  const inflight = new Set();
  let target = 0, current = 0, drawn = -1, lastImage = null, raf = 0, disposed = false;
  let vw = innerWidth, vh = innerHeight;
  const smoothing = 0.2;

  function url(index) { return `${frameBase}${String(index + 1).padStart(3, '0')}.jpg`; }
  function draw(image, index) {
    if (!image || !image.naturalWidth) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(vw * dpr)), h = Math.max(1, Math.round(vh * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.fillStyle = '#080a09'; context.fillRect(0, 0, w, h);
    const scale = Math.min(w / image.naturalWidth, h / image.naturalHeight) * 0.82;
    const iw = image.naturalWidth * scale, ih = image.naturalHeight * scale;
    context.drawImage(image, (w - iw) / 2, (h - ih) / 2, iw, ih);
    lastImage = image; drawn = index;
  }
  function pump() {
    while (!disposed && inflight.size < 8 && queue.length) {
      const i = queue.shift(); if (state[i] !== 0) continue;
      state[i] = 1; inflight.add(i);
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth) {
          images[i] = img; state[i] = 2;
          if (i === 0 && !lastImage) draw(img, i);
          if (i === Math.round(current)) draw(img, i);
        } else state[i] = 3;
        inflight.delete(i); pump();
      };
      img.onerror = () => { state[i] = 3; inflight.delete(i); pump(); };
      img.src = url(i);
    }
  }
  function prioritize(center) {
    const nearby = [];
    for (let r = 0; r <= 24; r++) {
      const before = center - r, after = center + r;
      if (before >= 0 && state[before] === 0) nearby.push(before);
      if (r && after < frameCount && state[after] === 0) nearby.push(after);
    }
    const seen = new Set(nearby);
    queue.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
    const rest = queue.filter(i => !seen.has(i));
    queue.splice(0, queue.length, ...nearby, ...rest);
    pump();
  }
  function updateTarget() {
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, section.offsetHeight - innerHeight);
    target = Math.min(frameCount - 1, Math.max(0, -rect.top / travel * (frameCount - 1)));
    prioritize(Math.round(target));
  }
  function resize() { vw = innerWidth; vh = innerHeight; canvas.width = 0; canvas.height = 0; if (lastImage) draw(lastImage, drawn); updateTarget(); }
  function render() {
    if (disposed) return;
    const delta = target - current;
    current = Math.abs(delta) < 0.08 ? target : current + delta * smoothing;
    const i = Math.max(0, Math.min(frameCount - 1, Math.round(current)));
    if (i !== drawn && state[i] === 2) draw(images[i], i);
    raf = requestAnimationFrame(render);
  }
  for (let i = 0; i < frameCount; i++) queue.push(i);
  prioritize(0); resize();
  addEventListener('scroll', updateTarget, { passive: true });
  addEventListener('resize', resize, { passive: true });
  raf = requestAnimationFrame(render);
  addEventListener('pagehide', () => { disposed = true; cancelAnimationFrame(raf); removeEventListener('scroll', updateTarget); removeEventListener('resize', resize); images.forEach(img => { if (img) img.src = ''; }); }, { once: true });
})();
