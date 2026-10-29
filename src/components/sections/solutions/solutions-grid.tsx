"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import type { SolutionsCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { SolutionCard } from "./solution-card";
import { SolutionDialog } from "./solution-dialog";
import { solutionItems } from "./solutions-data";

/* The three solution cards. Owns which detail is open and where the zoom starts. */
export function SolutionsGrid({ copy, lang }: { copy: SolutionsCopy; lang: Lang }) {
  const [opened, setOpened] = useState<{ id: string; x: number; y: number } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = (id: string, trigger: HTMLButtonElement) => {
    const rect = trigger.getBoundingClientRect();
    triggerRef.current = trigger;
    setOpened({ id, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  };
  const close = useCallback(() => setOpened(null), []);
  const current = solutionItems.find((s) => s.id === opened?.id);

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        {solutionItems.map((item, i) => (
          <Reveal key={item.id} className="h-full" delay={i * 0.08}>
            <SolutionCard item={item} copy={copy} onOpen={(trigger) => open(item.id, trigger)} />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {current && opened && (
          <SolutionDialog
            key={current.id}
            item={current}
            copy={copy}
            lang={lang}
            origin={{ x: opened.x, y: opened.y }}
            returnFocusTo={triggerRef}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </>
  );
}
