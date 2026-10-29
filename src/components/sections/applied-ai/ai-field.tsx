"use client";

import { useEffect, useRef } from "react";
import { MODULE_PITCH as PITCH } from "@/lib/module-pattern";

/*
  Applied AI hero field: the module grid turned into a living halftone (references: the generative dot waves, the
  halftone blobs and the dot sphere of the board, design-system/elaniin-2027/brief.md). Every cell is one square whose
  size follows two slow waves, so the field breathes like a model thinking; near the pointer a lens enlarges the
  squares and lights them in the on-dark accent. Squares only (the module language), colors from tokens, a fade toward
  the text column. It runs only while on screen and the tab is visible; under reduced motion it draws one still frame
  and the lens is off. Decorative.
*/
const LENS = 140; // px radius of the pointer lens

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
    const lit = root.getPropertyValue("--color-text-on-dark-accent").trim() || "#7b9bff";

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

    const pointer = { x: -9999, y: -9999, on: 0 };
    let raf = 0;
    let visible = false;

    const frame = (now: number) => {
      const t = reduce ? 0 : now / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      // The lens eases in and out instead of popping.
      pointer.on += ((pointer.x > -9999 ? 1 : 0) - pointer.on) * 0.12;

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
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          // The lens also stays off the text column, so it never sits under the copy.
          const lens = pointer.on * side * Math.exp(-(dx * dx + dy * dy) / (2 * LENS * LENS));
          const size = 1 + wave * 3 * side + lens * 6;
          if (size < 1.2 && lens < 0.05) continue;
          ctx.globalAlpha = Math.min(1, 0.08 + wave * 0.3 * side + lens * 0.9);
          ctx.fillStyle = lens > 0.25 ? lit : rest;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
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
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    if (!reduce) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
