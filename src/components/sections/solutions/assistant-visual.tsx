"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import type { AssistantVisualCopy } from "@/content/schema";
import { duration, ease } from "@/lib/motion";
import { VisualPanel, type VisualSize } from "./visual-panel";

/* AI card: a short support exchange. Question, typing, answer revealed word by word, then actions. Loops in view. */

const bubble = "rounded-menu border border-border-default bg-white px-3 py-2 text-body-sm text-text-primary shadow-card-rest";
const enter = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 } };
const enterTransition = { duration: duration.base, ease: ease.emphasized };

export function AssistantVisual({ copy, size = "card", bare = false }: { copy: AssistantVisualCopy; size?: VisualSize; bare?: boolean }) {
  const words = copy.answer.split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0); // 0 empty, 1 question, 2 typing, 3 answer, 4 actions

  useEffect(() => {
    if (reduce || !inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setPhase(0);
      timers.push(setTimeout(() => setPhase(1), 300));
      timers.push(setTimeout(() => setPhase(2), 1300));
      timers.push(setTimeout(() => setPhase(3), 2400));
      timers.push(setTimeout(() => setPhase(4), 4000));
      timers.push(setTimeout(run, 8200));
    };
    timers.push(setTimeout(run, 200));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  const p = reduce ? 4 : phase;

  return (
    <VisualPanel size={size} bare={bare}>
      <div ref={ref} className="flex w-full max-w-sm flex-col gap-3">
        <AnimatePresence>
          {p >= 1 && (
            <motion.div key="q" className={`${bubble} max-w-[88%] self-start`} {...enter} transition={enterTransition}>
              {copy.question}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-tag border border-border-default bg-white text-elevate-blue">
            <Sparkles className="size-4" strokeWidth={1.5} />
          </span>
          <div className="flex min-h-9 flex-1 flex-col gap-2">
            <AnimatePresence mode="wait">
              {p === 2 && (
                <motion.div
                  key="typing"
                  className={`${bubble} flex w-fit items-center gap-1 py-3`}
                  {...enter}
                  transition={{ duration: duration.fast, ease: ease.standard }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-1.5 rounded-full bg-text-muted"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.12, ease: ease.standard }}
                    />
                  ))}
                </motion.div>
              )}
              {p >= 3 && (
                <motion.div key="a" className={bubble} {...enter} transition={enterTransition}>
                  {words.map((w, i) => (
                    <span key={i}>
                      {i > 0 && " "}
                      <motion.span
                        className="inline-block"
                        initial={{ opacity: reduce ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: duration.fast, delay: reduce ? 0 : i * 0.05 }}
                      >
                        {w}
                      </motion.span>
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {p >= 4 && (
                <motion.div key="actions" className="flex flex-wrap gap-2" {...enter} transition={enterTransition}>
                  <span className="inline-flex h-8 items-center rounded-button bg-elevate-blue px-3.5 font-display text-button font-medium text-white">
                    {copy.confirm}
                  </span>
                  <span className="inline-flex h-8 items-center rounded-button border border-border-strong bg-white px-3.5 font-display text-button font-medium text-excellence-blue">
                    {copy.orders}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}
