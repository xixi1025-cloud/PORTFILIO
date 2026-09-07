'use client';

import { useEffect, useRef } from 'react';

export const waterRippleConfig = {
  spawnInterval: 86,
  startRadius: 24,
  endRadius: 250,
  duration: 1680,
  mouseStrength: 0.58,
  maxRipples: 16,
} as const;

type Ripple = {
  x: number;
  y: number;
  born: number;
  delay: number;
  startRadius: number;
  endRadius: number;
  duration: number;
  strength: number;
};

export function HeroWaterEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const surface = canvas?.parentElement;
    const context = canvas?.getContext('2d');

    if (!canvas || !surface || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');
    const tablet = window.matchMedia('(max-width: 1024px)');
    const background = new Image();
    background.src = '/hero-water-background.webp';
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastSpawn = 0;
    let ripples: Ripple[] = [];

    const resize = () => {
      const rect = surface.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawRipple = (ripple: Ripple, now: number) => {
      const elapsed = now - ripple.born - ripple.delay;
      if (elapsed < 0 || elapsed > ripple.duration) return;

      const progress = elapsed / ripple.duration;
      const eased = 1 - Math.pow(1 - progress, 3);
      const radius =
        ripple.startRadius + (ripple.endRadius - ripple.startRadius) * eased;
      const fade = Math.pow(1 - progress, 2) * ripple.strength;

      context.save();
      context.translate(ripple.x, ripple.y);
      context.scale(1, 0.94);

      if (background.complete && background.naturalWidth) {
        context.save();
        context.beginPath();
        context.arc(0, 0, radius * 0.9, 0, Math.PI * 2);
        context.clip();
        context.globalAlpha = fade * 0.18;
        context.globalCompositeOperation = 'soft-light';

        const coverScale = Math.max(
          width / background.naturalWidth,
          height / background.naturalHeight,
        );
        const drawnWidth = background.naturalWidth * coverScale;
        const drawnHeight = background.naturalHeight * coverScale;
        const offsetX = (width - drawnWidth) / 2;
        const offsetY = (height - drawnHeight) / 2;
        const lensScale = 1 + 0.022 * (1 - progress);

        context.scale(lensScale, lensScale);
        context.drawImage(
          background,
          offsetX - ripple.x,
          offsetY - ripple.y,
          drawnWidth,
          drawnHeight,
        );
        context.restore();
      }

      context.globalCompositeOperation = 'screen';

      const lens = context.createRadialGradient(0, 0, 0, 0, 0, radius);
      lens.addColorStop(0, 'rgba(255,255,255,0)');
      lens.addColorStop(0.68, 'rgba(205,225,245,0)');
      lens.addColorStop(0.86, `rgba(200,222,246,${fade * 0.11})`);
      lens.addColorStop(0.965, `rgba(255,255,255,${fade * 0.27})`);
      lens.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = lens;
      context.beginPath();
      context.arc(0, 0, radius, 0, Math.PI * 2);
      context.fill();

      context.shadowColor = `rgba(235,246,255,${fade * 0.75})`;
      context.shadowBlur = 11;
      context.strokeStyle = `rgba(248,252,255,${fade * 0.68})`;
      context.lineWidth = 1.3;
      context.beginPath();
      context.arc(0, -0.8, radius * 0.965, 0, Math.PI * 2);
      context.stroke();

      context.shadowBlur = 0;
      context.strokeStyle = `rgba(184,201,244,${fade * 0.16})`;
      context.lineWidth = 1.6;
      context.beginPath();
      context.arc(0, 1.4, radius, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    };

    const render = (now: number) => {
      context.clearRect(0, 0, width, height);
      ripples = ripples.filter(
        (ripple) => now - ripple.born - ripple.delay <= ripple.duration,
      );
      ripples.forEach((ripple) => drawRipple(ripple, now));
      frame = ripples.length ? requestAnimationFrame(render) : 0;
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const addRipple = (
      event: PointerEvent,
      strength: number,
      delay = 0,
      radiusScale = 1,
    ) => {
      const rect = surface.getBoundingClientRect();
      ripples.push({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        born: performance.now(),
        delay,
        startRadius: waterRippleConfig.startRadius * radiusScale,
        endRadius: waterRippleConfig.endRadius * radiusScale,
        duration: waterRippleConfig.duration + delay * 0.8,
        strength,
      });
      if (ripples.length > waterRippleConfig.maxRipples) ripples.shift();
      wake();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches || coarsePointer.matches) return;
      const now = performance.now();
      if (now - lastSpawn < waterRippleConfig.spawnInterval) return;
      lastSpawn = now;
      addRipple(
        event,
        waterRippleConfig.mouseStrength * (tablet.matches ? 0.62 : 1),
      );
    };

    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      ripples = [];
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      context.clearRect(0, 0, width, height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(surface);
    resize();
    surface.addEventListener('pointermove', onPointerMove, { passive: true });
    reducedMotion.addEventListener('change', onMotionChange);

    return () => {
      resizeObserver.disconnect();
      surface.removeEventListener('pointermove', onPointerMove);
      reducedMotion.removeEventListener('change', onMotionChange);
      if (frame) cancelAnimationFrame(frame);
      ripples = [];
      context.clearRect(0, 0, width, height);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-water-effect" aria-hidden="true" />;
}
