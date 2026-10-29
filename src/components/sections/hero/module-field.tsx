"use client";

import { useEffect, useRef } from "react";
import { MODULE_PITCH as PITCH, modulePattern } from "@/lib/module-pattern";

/*
  Decorative module field. The system uses square modules (DESIGN.md motifs.module), so the field is a grid of small squares.
  Near the pointer the squares light up cell by cell, stepping up the blue ramp
  (blue-300 -> blue-400 -> blue-500) and fading out after the pointer leaves.
  The resting grid is pure CSS (no JS needed). The lit layer is a canvas, off for touch and prefers-reduced-motion.
  Listens on its parent element.
*/
export const RADIUS = 6; // cells of influence around the pointer
export const DECAY_MS = 260; // time constant of the fade-out

// Stepped ramp, brightest first: echoes the stepped blue motif.
export const STEPS = [
  { min: 0.66, token: "--color-blue-500", size: 3 },
  { min: 0.33, token: "--color-blue-400", size: 3 },
  { min: 0.04, token: "--color-blue-300", size: 2 },
] as const;

// Resting grid: small and faint, so it reads as texture and never competes with text or a glow.
const REST_OPACITY = 0.45;

type Fade = "bottom" | "left" | "none";
const masks: Record<Fade, string | undefined> = {
  bottom: "linear-gradient(to bottom, #000 35%, transparent 100%)",
  left: "linear-gradient(to right, transparent 8%, #000 60%)",
  none: undefined,
};

type Tone = "light" | "dark";
// Resting squares: grey on light surfaces, a faint white on dark ones.
const REST_COLOR: Record<Tone, string> = {
  light: "var(--color-border-strong)",
  dark: "var(--color-border-on-dark-strong)",
};

export function ModuleField({ fade = "bottom", tone = "light" }: { fade?: Fade; tone?: Tone }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const host = wrap?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !host || !ctx) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const root = getComputedStyle(document.documentElement);
    const colors = STEPS.map((s) => root.getPropertyValue(s.token).trim() || "#1054ff");

    let cols = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = host.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      cols = Math.ceil(width / PITCH);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const lit = new Map<number, number>(); // cell index -> intensity 0..1
    let raf = 0;
    let last = 0;

    const draw = (now: number) => {
      const dt = last ? now - last : 16;
      last = now;
      const k = Math.exp(-dt / DECAY_MS);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      for (const [key, v] of lit) {
        const next = v * k;
        if (next < 0.04) {
          lit.delete(key);
          continue;
        }
        lit.set(key, next);
        const step = STEPS.findIndex((s) => next >= s.min);
        const { size } = STEPS[step];
        ctx.fillStyle = colors[step];
        // squares are centered in their cell, like the resting grid
        ctx.fillRect(
          (key % cols) * PITCH + PITCH / 2 - size / 2,
          Math.floor(key / cols) * PITCH + PITCH / 2 - size / 2,
          size,
          size,
        );
      }

      if (lit.size > 0) raf = requestAnimationFrame(draw);
      else {
        raf = 0;
        last = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / PITCH;
      const cy = (e.clientY - rect.top) / PITCH;
      const c0 = Math.floor(cx);
      const r0 = Math.floor(cy);
      for (let dy = -RADIUS; dy <= RADIUS; dy++) {
        for (let dx = -RADIUS; dx <= RADIUS; dx++) {
          const col = c0 + dx;
          const row = r0 + dy;
          if (col < 0 || col >= cols || row < 0) continue;
          const d = Math.hypot(col + 0.5 - cx, row + 0.5 - cy);
          if (d > RADIUS) continue;
          const v = Math.pow(1 - d / RADIUS, 1.4);
          const key = row * cols + col;
          if (v > (lit.get(key) ?? 0)) lit.set(key, v);
        }
      }
      if (!raf) raf = requestAnimationFrame(draw);
    };

    host.addEventListener("pointermove", onMove);
    return () => {
      host.removeEventListener("pointermove", onMove);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const mask = masks[fade];

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    >
      <div
        className="absolute inset-0"
        style={{ ...modulePattern(REST_COLOR[tone]), opacity: REST_OPACITY }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
