'use client';

import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [tabindex]:not([tabindex="-1"])';

export function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    if (!cursor || !finePointer.matches) return;

    let frame = 0;
    let targetX = -120;
    let targetY = -120;
    let currentX = targetX;
    let currentY = targetY;

    document.documentElement.classList.add('has-glow-cursor');

    const render = () => {
      currentX += (targetX - currentX) * 0.34;
      currentY += (targetY - currentY) * 0.34;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (
        Math.abs(targetX - currentX) > 0.08 ||
        Math.abs(targetY - currentY) > 0.08
      ) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    const updateInteractiveState = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      cursor.classList.toggle(
        'is-interactive',
        Boolean(element?.closest(INTERACTIVE_SELECTOR)),
      );
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add('is-visible');
      updateInteractiveState(event.target);
      wake();
    };

    const onPointerLeave = () => cursor.classList.remove('is-visible');
    const onPointerDown = () => cursor.classList.add('is-pressed');
    const onPointerUp = () => cursor.classList.remove('is-pressed');

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    window.addEventListener('blur', onPointerLeave);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    return () => {
      document.documentElement.classList.remove('has-glow-cursor');
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      window.removeEventListener('blur', onPointerLeave);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={cursorRef} className="site-glow-cursor" aria-hidden="true">
      <span className="site-glow-cursor-orb" />
    </div>
  );
}
