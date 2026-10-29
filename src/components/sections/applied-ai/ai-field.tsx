"use client";

import { useEffect, useRef } from "react";
import { DECAY_MS, RADIUS, STEPS } from "@/components/sections/hero/module-field";
import { MODULE_PITCH as PITCH } from "@/lib/module-pattern";

/*
  Applied AI hero field: the module grid turned into a living halftone (references: the generative dot waves, the
  halftone blobs and the dot sphere of the board, design-system/elaniin-2027/brief.md). Every cell is one square whose
  size follows two slow waves, so the field breathes like a model thinking. The pointer behaves as in every other
  module field of the site (ModuleField, same radius, decay and blue steps): cells light up around it, a still pointer
  leaves a spot that fades, a moving one leaves a trail that thins out as it fades. Squares only (the module language),
  colors from tokens, a fade toward the text column. It runs only while on screen and the tab is visible; under reduced
  motion it draws one still frame and the pointer trail is off. Decorative.
*/

export function AiField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = getComputedStyle(document.documentElement);
    const rest = root.getPropertyValue("--color-text-on-dark").trim() || "#ffffff";
    const steps = STEPS.map((step) => root.getPropertyValue(step.token).trim() || "#1054ff");

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = host.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };
    resize();

    const trail = new Map<number, number>(); // cell index -> intensity 0..1, decaying
    let raf = 0;
    let last = 0;
    let visible = false;

    const frame = (now: number) => {
      const t = reduce ? 0 : now / 1000;
      const k = Math.exp(-(last ? now - last : 16) / DECAY_MS);
      last = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / PITCH);
      const rows = Math.ceil(h / PITCH);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * PITCH + PITCH / 2;
          const y = r * PITCH + PITCH / 2;
          // Two slow waves crossing: the halftone "thought".
          const wave = 0.5 + 0.5 * Math.sin(c * 0.18 + t * 0.7) * Math.cos(r * 0.23 - t * 0.5 + Math.sin(c * 0.05 + t * 0.2));
          // Fade toward the text: from the left on wide screens, from the top on narrow ones (text spans the width).
          const side =
            w < 768
              ? Math.min(1, Math.max(0, (y / h - 0.78) / 0.22))
              : Math.min(1, Math.max(0, (x / w - 0.2) / 0.5));
          const size = 1 + wave * 3 * side;
          if (size < 1.2) continue;
          ctx.globalAlpha = Math.min(1, 0.08 + wave * 0.3 * side);
          ctx.fillStyle = rest;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;

      // The pointer trail, drawn over the wave exactly like ModuleField: stepped blues, fading out.
      for (const [key, v] of trail) {
        const next = v * k;
        if (next < 0.04) {
          trail.delete(key);
          continue;
        }
        trail.set(key, next);
        const step = STEPS.findIndex((s) => next >= s.min);
        const { size } = STEPS[step];
        ctx.fillStyle = steps[step];
        ctx.fillRect((key % cols) * PITCH + PITCH / 2 - size / 2, Math.floor(key / cols) * PITCH + PITCH / 2 - size / 2, size, size);
      }
      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (reduce) frame(0);
      else if (visible) start();
      else stop();
    });
    io.observe(host);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) frame(0);
    });
    ro.observe(host);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = host.getBoundingClientRect();
      const cx = (e.clientX - r.left) / PITCH;
      const cy = (e.clientY - r.top) / PITCH;
      const cols = Math.ceil(w / PITCH);
      for (let dy = -RADIUS; dy <= RADIUS; dy++) {
        for (let dx = -RADIUS; dx <= RADIUS; dx++) {
          const col = Math.floor(cx) + dx;
          const row = Math.floor(cy) + dy;
          if (col < 0 || col >= cols || row < 0) continue;
          const d = Math.hypot(col + 0.5 - cx, row + 0.5 - cy);
          if (d > RADIUS) continue;
          const v = Math.pow(1 - d / RADIUS, 1.4);
          const key = row * cols + col;
          if (v > (trail.get(key) ?? 0)) trail.set(key, v);
        }
      }
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    if (!reduce) {
      host.addEventListener("pointermove", onMove);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
