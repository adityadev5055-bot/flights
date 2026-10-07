/**
 * ==============================================================================
 * SMOOTH SCROLL-DRIVEN FRAME ANIMATION ENGINE
 * 100% As-Per-Scroll Synchronous Frame Engine (Zero Auto-Play, Zero Runaway)
 * ==============================================================================
 */

(function (global) {
  'use strict';

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  class SmoothScrollFrameEngine {
    constructor(config = {}) {
      this.canvas = document.getElementById(config.canvasId || 'sequenceCanvas');
      if (!this.canvas) {
        throw new Error('[SmoothScrollFrameEngine] Canvas element not found');
      }

      this.ctx = this.canvas.getContext('2d', { alpha: false });
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = 'high';

      // Responsive lerp rate for instant, snappy follow that settles immediately
      this.lerpRate = config.lerpRate || 0.22;

      // 5 scenes definition (1485 total frames)
      this.scenes = [
        { id: 0, dir: 'frames/',  prefix: 'ezgif-frame-', ext: '.jpg', total: 285, startIdx: 1 },
        { id: 1, dir: 'frames2/', prefix: 'ezgif-frame-', ext: '.jpg', total: 300, startIdx: 1 },
        { id: 2, dir: 'frames3/', prefix: 'ezgif-frame-', ext: '.jpg', total: 300, startIdx: 1 },
        { id: 3, dir: 'frames4/', prefix: 'ezgif-frame-', ext: '.jpg', total: 300, startIdx: 1 },
        { id: 4, dir: 'frames5/', prefix: 'ezgif-frame-', ext: '.jpg', total: 300, startIdx: 1 },
      ];

      this.sceneOffsets = [];
      let acc = 0;
      this.scenes.forEach((s) => {
        this.sceneOffsets.push(acc);
        acc += s.total;
      });
      this.totalFrames = acc; // 1485 frames

      // Image cache
      this.frames = new Array(this.totalFrames);
      this.status = new Uint8Array(this.totalFrames); // 0=empty, 1=loading, 2=ready, 3=error
      for (let i = 0; i < this.totalFrames; i++) {
        this.frames[i] = null;
        this.status[i] = 0;
      }
      this.loadedCount = 0;

      // Scroll & Interpolation State
      this.targetProgress = 0;
      this.currentProgress = 0;
      this.targetFrame = 0;
      this.currentFrame = 0;
      this.lastDrawnIndex = -1;
      this.lastRenderedImage = null;

      // Progressive loading concurrency
      this.concurrency = 14;
      this.activeRequests = 0;
      this.queue = [];

      // Callbacks
      this.onProgress = null;
      this.onLoadProgress = null;
      this.onInitialReady = null;
      this.isInitialReady = false;

      this.tick = this.tick.bind(this);
      this.handleResize = this.handleResize.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
    }

    getUrlForGlobalIndex(globalIndex) {
      for (let i = this.scenes.length - 1; i >= 0; i--) {
        if (globalIndex >= this.sceneOffsets[i]) {
          const s = this.scenes[i];
          const localNum = (globalIndex - this.sceneOffsets[i]) + s.startIdx;
          const padNum = String(localNum).padStart(3, '0');
          return `${s.dir}${s.prefix}${padNum}${s.ext}`;
        }
      }
      return `frames/ezgif-frame-001.jpg`;
    }

    getSceneForProgress(progress) {
      const globalIndex = progress * (this.totalFrames - 1);
      for (let i = this.scenes.length - 1; i >= 0; i--) {
        if (globalIndex >= this.sceneOffsets[i]) {
          return i;
        }
      }
      return 0;
    }

    init() {
      this.resize();
      window.addEventListener('resize', this.handleResize, { passive: true });
      window.addEventListener('scroll', this.handleScroll, { passive: true });

      // Start priority loading
      this.startPriorityLoading();

      // Read initial scroll
      this.handleScroll();

      // Start render loop
      requestAnimationFrame(this.tick);

      return this;
    }

    startPriorityLoading() {
      // Prioritize Scene 1 (the plane)
      for (let i = 0; i < Math.min(80, this.totalFrames); i++) {
        this.queue.push({ index: i, priority: 10000 - i });
      }

      // Remaining frames
      for (let i = 80; i < this.totalFrames; i++) {
        this.queue.push({ index: i, priority: 1000 - i });
      }

      this.processQueue();
    }

    prioritizeAround(centerIndex) {
      const radius = 60;
      for (const item of this.queue) {
        const dist = Math.abs(item.index - centerIndex);
        if (dist <= radius) {
          item.priority = 10000 - dist * 15;
        } else {
          item.priority = 1000 - dist;
        }
      }
      this.queue.sort((a, b) => b.priority - a.priority);
      this.processQueue();
    }

    processQueue() {
      while (this.activeRequests < this.concurrency && this.queue.length > 0) {
        const item = this.queue.shift();
        if (this.status[item.index] === 2) continue;

        this.activeRequests++;
        this.loadFrame(item.index)
          .catch(() => {})
          .finally(() => {
            this.activeRequests--;
            this.processQueue();
          });
      }
    }

    loadFrame(index) {
      return new Promise((resolve) => {
        if (this.status[index] === 2 && this.frames[index]) {
          resolve();
          return;
        }

        this.status[index] = 1;
        const img = new Image();
        img.onload = () => {
          if (img.naturalWidth > 0) {
            this.frames[index] = img;
            this.status[index] = 2;
            this.loadedCount++;

            if (!this.isInitialReady && this.loadedCount >= 2) {
              this.isInitialReady = true;
              this.drawCurrentFrame();
              if (this.onInitialReady) this.onInitialReady();
            }

            if (this.onLoadProgress) {
              const pct = Math.round((this.loadedCount / this.totalFrames) * 100);
              this.onLoadProgress(this.loadedCount, this.totalFrames, pct);
            }

            if ('decode' in img) {
              img.decode().catch(() => {});
            }
          } else {
            this.status[index] = 3;
          }
          resolve();
        };

        img.onerror = () => {
          this.status[index] = 3;
          resolve();
        };

        img.src = this.getUrlForGlobalIndex(index);
      });
    }

    getNearestReadyFrame(targetIndex) {
      const idx = Math.round(clamp(targetIndex, 0, this.totalFrames - 1));

      if (this.status[idx] === 2 && this.frames[idx] && this.frames[idx].complete) {
        return this.frames[idx];
      }

      // Search outwardly for nearest loaded frame
      const maxDelta = 100;
      for (let delta = 1; delta < maxDelta; delta++) {
        const prev = idx - delta;
        if (prev >= 0 && this.status[prev] === 2 && this.frames[prev]) {
          return this.frames[prev];
        }
        const next = idx + delta;
        if (next < this.totalFrames && this.status[next] === 2 && this.frames[next]) {
          return this.frames[next];
        }
      }

      return this.lastRenderedImage;
    }

    resize() {
      const w = window.innerWidth || 1920;
      const h = window.innerHeight || 1080;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const targetW = Math.round(w * dpr);
      const targetH = Math.round(h * dpr);

      if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
        this.canvas.width = targetW;
        this.canvas.height = targetH;
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        this.drawCurrentFrame();
      }
    }

    handleResize() {
      this.resize();
      this.handleScroll();
    }

    handleScroll() {
      const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const winHeight = window.innerHeight || 1;
      const maxScroll = Math.max(1, docHeight - winHeight);

      const rawProgress = scrollY / maxScroll;
      this.targetProgress = clamp(rawProgress, 0, 1);
      this.targetFrame = this.targetProgress * (this.totalFrames - 1);

      this.prioritizeAround(Math.round(this.targetFrame));
    }

    drawCurrentFrame() {
      const img = this.getNearestReadyFrame(this.currentFrame);
      if (!img || !img.naturalWidth) return;

      const cw = this.canvas.width;
      const ch = this.canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover scaling
      const scale = Math.max(cw / iw, ch / ih);
      const sw = Math.ceil(iw * scale);
      const sh = Math.ceil(ih * scale);
      const sx = Math.floor((cw - sw) / 2);
      const sy = Math.floor((ch - sh) / 2);

      this.ctx.drawImage(img, sx, sy, sw, sh);
      this.lastRenderedImage = img;
      this.lastDrawnIndex = Math.round(this.currentFrame);

      if (this.onProgress) {
        this.onProgress(this.currentProgress, this.currentFrame, this.totalFrames);
      }
    }

    tick() {
      const diff = this.targetFrame - this.currentFrame;

      // Responsive easing that follows scroll synchronously and settles immediately
      if (Math.abs(diff) > 0.05) {
        this.currentFrame += diff * this.lerpRate;
        this.currentProgress = clamp(this.currentFrame / (this.totalFrames - 1), 0, 1);
        this.drawCurrentFrame();
      } else if (Math.round(this.currentFrame) !== this.lastDrawnIndex) {
        this.currentFrame = this.targetFrame;
        this.currentProgress = this.targetProgress;
        this.drawCurrentFrame();
      }

      requestAnimationFrame(this.tick);
    }

    scrollToProgress(progress, smooth = true) {
      const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const winHeight = window.innerHeight || 1;
      const maxScroll = Math.max(1, docHeight - winHeight);
      const targetY = clamp(progress, 0, 1) * maxScroll;

      window.scrollTo({
        top: targetY,
        behavior: smooth ? 'smooth' : 'instant'
      });
    }

    scrollToScene(sceneIndex) {
      const idx = clamp(sceneIndex, 0, this.scenes.length - 1);
      const prog = this.sceneOffsets[idx] / (this.totalFrames - 1);
      this.scrollToProgress(prog, true);
    }
  }

  global.SmoothScrollFrameEngine = SmoothScrollFrameEngine;

})(typeof window !== 'undefined' ? window : this);
