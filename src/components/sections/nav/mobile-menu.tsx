"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconBox } from "@/components/ui/icon-box";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { LanguageSwitch } from "@/components/ui/language-switch";
import type { NavCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import type { SwitchLink } from "@/lib/routes";
import {
  ctaTarget,
  engagementItems,
  exploreItems,
  latestItems,
  navOrder,
  plainLinks,
  resolveTarget,
  solutions,
  type MenuId,
  type Target,
} from "./nav-data";

/* Full-height sheet under the bar for < 1024px. Accordions for the three menus, Applied AI as a plain link, in the bar order. */
export function MobileMenu({
  open,
  onClose,
  lang,
  copy,
  switchLinks,
  languageLabel,
}: {
  open: boolean;
  onClose: () => void;
  lang: Lang;
  copy: NavCopy;
  switchLinks: SwitchLink[];
  languageLabel: string;
}) {
  const row = (i: { id: string; icon: LucideIcon; to: Target }, text: { title: string; description: string }) => ({
    id: i.id,
    icon: i.icon,
    ...text,
    href: resolveTarget(i.to, lang),
  });
  const rows: Record<MenuId, ReturnType<typeof row>[]> = {
    solutions: solutions.map((s) => row(s, copy.solutions.items[s.id])),
    engagement: engagementItems.map((i) => row(i, copy.engagement.items[i.id])),
    resources: [
      ...exploreItems.map((i) => row(i, copy.resources.explore.items[i.id])),
      ...latestItems.map((i) => row(i, copy.resources.latest.items[i.id])),
    ],
  };
  const labels: Record<MenuId, string> = {
    solutions: copy.solutions.trigger,
    engagement: copy.engagement.trigger,
    resources: copy.resources.trigger,
  };
  const [expanded, setExpanded] = useState<MenuId | null>("solutions");

  // Lock page scroll while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // Close if the viewport grows into the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const handler = () => mq.matches && onClose();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-x-0 top-[var(--nav-height)] bottom-0 z-40 flex flex-col overflow-y-auto bg-white lg:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: duration.base, ease: ease.emphasized }}
        >
          <nav aria-label={copy.mobileNavLabel} className="container-site flex flex-1 flex-col py-4">
            {navOrder.map((item) => {
              if (item.kind === "link") {
                const link = plainLinks.find((l) => l.id === item.id)!;
                return (
                  <Link
                    key={link.id}
                    href={resolveTarget(link.to, lang)}
                    onClick={onClose}
                    className="flex h-14 items-center gap-2.5 border-b border-border-default font-display text-h4 font-medium focus-ring"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-elevate-blue" />
                    {copy.plain[link.id]}
                  </Link>
                );
              }
              const id = item.id;
              return (
                <Accordion
                  key={id}
                  id={id}
                  label={labels[id]}
                  expanded={expanded === id}
                  onToggle={() => setExpanded(expanded === id ? null : id)}
                >
                  <ul className="flex flex-col gap-1 pb-3">
                    {rows[id].map((r) => (
                      <li key={r.id}>
                        <Link
                          href={r.href}
                          onClick={onClose}
                          className="flex items-start gap-4 rounded-menu p-3 hover:bg-surface-subtle focus-ring"
                        >
                          <IconBox icon={r.icon} />
                          <span className="flex flex-col gap-0.5">
                            <span className="font-display text-body-lg font-medium">{r.title}</span>
                            <span className="text-body-sm text-text-secondary">{r.description}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              );
            })}

            <div className="mt-auto flex flex-col gap-3 pt-8 pb-4">
              <LanguageSwitch links={switchLinks} label={languageLabel} className="self-start" />
              <Button href={resolveTarget(ctaTarget, lang)} size="lg" className="w-full" onClick={onClose}>
                {copy.cta}
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Accordion({
  id,
  label,
  expanded,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-border-default">
      <h2>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`mobile-${id}`}
          onClick={onToggle}
          className="flex h-14 w-full cursor-pointer items-center justify-between font-display text-h4 font-medium focus-ring"
        >
          {label}
          <ChevronDown
            className={cn(
              "size-5 text-text-secondary transition-transform duration-200 ease-standard",
              expanded && "rotate-180",
            )}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`mobile-${id}`}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: duration.slow, ease: ease.emphasized }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
