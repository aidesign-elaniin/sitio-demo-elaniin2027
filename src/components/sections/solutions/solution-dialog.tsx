"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBox } from "@/components/ui/icon-box";
import { LOOKS, SolutionSurface } from "@/components/ui/solution-surface";
import type { SolutionsCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { SolutionVisual } from "./solution-visual";
import { formatMetric, type SolutionItem } from "./solutions-data";
import { href } from "@/lib/routes";

/*
  Expanded detail of a solution (after Stripe's expandable cards).
  Accessible modal: focus moves in, Tab is trapped, Escape and backdrop close, focus returns to the trigger.
  Rendered in a portal because the cards sit inside transformed (revealed) ancestors, which would break position: fixed.
  Zooms out of the clicked button; reduced motion keeps only the fade (global MotionConfig).
*/
const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function SolutionDialog({
  item,
  copy,
  lang,
  origin,
  returnFocusTo,
  onClose,
}: {
  item: SolutionItem;
  copy: SolutionsCopy;
  lang: Lang;
  origin: { x: number; y: number };
  returnFocusTo: RefObject<HTMLElement | null>;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const titleId = `solution-title-${item.id}`;
  const text = copy.items[item.id];

  // Zoom from the trigger: express its center in the panel's own coordinates before the first paint.
  useLayoutEffect(() => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) setTransformOrigin(`${origin.x - rect.left}px ${origin.y - rect.top}px`);
  }, [origin.x, origin.y]);

  useEffect(() => {
    const trigger = returnFocusTo.current;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("keydown", onKey, true);
      html.style.overflow = prevOverflow;
      if (trigger) {
        // Focus goes back to where the visitor was, but the keyboard ring is not painted on a focus the page returns by
        // itself (it stayed on after Escape and read as a stray blue line). The ring is back with the next key or blur.
        trigger.dataset.focusReturned = "true";
        trigger.focus();
        const clear = () => {
          delete trigger.dataset.focusReturned;
          trigger.removeEventListener("keydown", clear);
          trigger.removeEventListener("blur", clear);
        };
        trigger.addEventListener("keydown", clear);
        trigger.addEventListener("blur", clear);
      }
    };
  }, [onClose, returnFocusTo]);

  return createPortal(
    <div className="fixed inset-0 z-[70] grid place-items-center p-[var(--gutter)] max-md:p-3">
      <motion.div
        className="absolute inset-0 bg-excellence-blue/55"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: duration.base, ease: ease.standard }}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[min(92dvh,780px)] w-full max-w-[1080px] overflow-y-auto rounded-modal border border-border-default bg-white shadow-menu"
        style={{ transformOrigin }}
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: duration.slow, ease: ease.emphasized }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={copy.dialog.close}
          className="absolute top-4 right-4 z-10 grid size-10 cursor-pointer place-items-center rounded-button border border-border-default bg-white text-text-primary transition-colors duration-150 ease-standard hover:bg-surface-subtle focus-ring"
        >
          <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
        </button>

        <div className="grid lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col gap-6 p-10 max-md:p-6 max-md:pt-16">
            <div className="flex items-center gap-3">
              <IconBox icon={item.icon} />
              <span className="font-display text-body-lg font-medium text-text-primary">{text.name}</span>
            </div>
            <h2 id={titleId} className="font-display text-h2 font-medium text-text-primary">
              {text.title}
            </h2>
            <p className="max-w-[44ch] text-body-lg text-text-secondary">{text.intro}</p>

            <ul className="flex flex-col">
              {text.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  className="grid grid-cols-[20px_1fr] gap-3 border-t border-border-default py-3 first:border-t-0"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration.base, ease: ease.emphasized, delay: 0.12 + i * 0.06 }}
                >
                  <Check className="mt-0.5 size-5 text-elevate-blue" strokeWidth={1.5} aria-hidden="true" />
                  <span className="text-body text-text-secondary">
                    <strong className="font-medium text-text-primary">{b.title}.</strong> {b.text}
                  </span>
                </motion.li>
              ))}
            </ul>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border-default bg-border-default">
              {item.metrics.map((m, i) => (
                <div key={i} className="flex flex-col gap-1 bg-white p-4">
                  <dt className="order-2 text-body-sm text-text-secondary">{text.metrics[i].label}</dt>
                  <dd className="order-1 font-display text-h3 font-medium text-text-primary tabular-nums">
                    {formatMetric(lang, m, copy.units)}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-3">
              <Button href={href(item.route, lang)} size="lg">
                {text.cta}
              </Button>
              <Button href={href("contact", lang)} variant="secondary" size="lg" onClick={onClose}>
                {copy.dialog.talk}
              </Button>
            </div>
          </div>

          {/* The identity of the solution lives where the visual is: this column takes its surface, pattern and glow. */}
          <div
            className={cn(
              "relative isolate overflow-hidden",
              LOOKS[item.id].card,
              !LOOKS[item.id].dark && "border-t border-border-default lg:border-t-0 lg:border-l",
            )}
          >
            <SolutionSurface look={LOOKS[item.id]} />
            <SolutionVisual id={item.id} copy={copy.visuals} size="fill" bare />
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
