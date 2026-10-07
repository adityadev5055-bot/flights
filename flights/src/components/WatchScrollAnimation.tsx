import { useEffect, useRef } from 'react';

export interface WatchScrollAnimationProps {
  framePath?: string;
  frameCount?: number;
  scrollDistance?: string;
  smoothing?: number;
  scale?: number;
  position?: { x?: string; y?: string };
}

/** A reusable, scroll-scrubbed canvas sequence. Frames are addressed numerically, in order. */
export function WatchScrollAnimation({
  framePath = '/watch-frames/ezgif-frame-',
  frameCount = 300,
  scrollDistance = '320vh',
  smoothing = 0.18,
  scale = 0.82,
  position = { x: '50%', y: '50%' },
}: WatchScrollAnimationProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!section || !canvas || !ctx) return;

    const images: (HTMLImageElement | undefined)[] = new Array(frameCount);
    const state = new Uint8Array(frameCount); // 0 queued, 1 loading, 2 ready, 3 failed
    const queue: number[] = Array.from({ length: frameCount }, (_, i) => i);
    const active = new Set<number>();
    let disposed = false;
    let raf = 0;
    let current = 0;
    let target = 0;
    let lastDrawn = -1;
    let lastImage: HTMLImageElement | undefined;
    let loaded = false;
    let viewportWidth = 0;
    let viewportHeight = 0;
    const concurrency = 8;

    const frameUrl = (index: number) => `${framePath}${String(index + 1).padStart(3, '0')}.jpg`;

    const draw = (img: HTMLImageElement, index: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(viewportWidth * dpr));
      const height = Math.max(1, Math.round(viewportHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = '#080a09';
      ctx.fillRect(0, 0, width, height);
      const fit = Math.min(width / img.naturalWidth, height / img.naturalHeight) * scale;
      const w = img.naturalWidth * fit;
      const h = img.naturalHeight * fit;
      const x = width * (parseFloat(position.x || '50%') / 100) - w / 2;
      const y = height * (parseFloat(position.y || '50%') / 100) - h / 2;
      ctx.drawImage(img, x, y, w, h);
      lastImage = img;
      lastDrawn = index;
      loaded = true;
      canvas.dataset.ready = 'true';
    };

    const render = () => {
      if (disposed) return;
      const diff = target - current;
      if (Math.abs(diff) > 0.08) current += diff * Math.min(0.5, Math.max(0.02, smoothing));
      else current = target;
      const index = Math.max(0, Math.min(frameCount - 1, Math.round(current)));
      if (state[index] === 2 && images[index] && index !== lastDrawn) draw(images[index]!, index);
      else if (!loaded && lastImage) draw(lastImage, lastDrawn);
      raf = requestAnimationFrame(render);
    };

    const load = (index: number) => {
      if (disposed || state[index] !== 0) return;
      state[index] = 1;
      const img = new Image();
      active.add(index);
      img.onload = () => {
        if (!disposed && img.naturalWidth) {
          images[index] = img;
          state[index] = 2;
          if (index === 0 && !loaded) draw(img, 0);
          if (index === Math.round(current)) draw(img, index);
        } else state[index] = 3;
        active.delete(index);
        pump();
      };
      img.onerror = () => { state[index] = 3; active.delete(index); pump(); };
      img.src = frameUrl(index);
    };

    function pump() {
      while (!disposed && active.size < concurrency && queue.length) load(queue.shift()!);
    }

    const prioritize = (center: number) => {
      const pending = queue.filter((i) => state[i] === 0);
      pending.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
      queue.splice(0, queue.length, ...pending);
      // If we moved away from an in-flight, not-yet-loaded area, queue fresh nearby frames next.
      const nearby: number[] = [];
      for (let radius = 0; radius <= 18; radius++) {
        const before = center - radius;
        const after = center + radius;
        if (before >= 0 && state[before] === 0) nearby.push(before);
        if (radius && after < frameCount && state[after] === 0) nearby.push(after);
      }
      const rest = queue.filter((i) => !nearby.includes(i));
      queue.splice(0, queue.length, ...nearby, ...rest);
      pump();
    };

    const updateTarget = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      target = progress * (frameCount - 1);
      prioritize(Math.round(target));
    };

    const resize = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      canvas.width = 0;
      canvas.height = 0;
      if (lastImage) draw(lastImage, lastDrawn);
      updateTarget();
    };

    // Put the first frame and its neighbors ahead of the rest on initial load.
    queue.splice(0, queue.length, ...Array.from({ length: frameCount }, (_, i) => i));
    prioritize(0);
    resize();
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    raf = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      images.forEach((img) => { if (img) img.src = ''; });
    };
  }, [framePath, frameCount, smoothing, scale, position.x, position.y]);

  return (
    <section
      ref={sectionRef}
      className="watch-scroll-section"
      style={{ height: `calc(100vh + ${scrollDistance})` }}
      aria-label="Scroll to explore the watch"
    >
      <div className="watch-sticky-stage">
        <canvas ref={canvasRef} className="watch-canvas" aria-label="A watch evolving through a 300-frame product sequence" />
        <div className="watch-vignette" />
      </div>
    </section>
  );
}
