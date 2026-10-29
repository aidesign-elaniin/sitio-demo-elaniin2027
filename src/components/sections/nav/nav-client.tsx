"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, MotionConfig, motion, useIsPresent, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitch } from "@/components/ui/language-switch";
import type { CommonCopy, NavCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import type { SwitchLink } from "@/lib/routes";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { MobileMenu } from "./mobile-menu";
import { ctaTarget, plainLinks, resolveTarget, resourcesTarget, type MenuId } from "./nav-data";
import { asset } from "@/lib/asset";
import { EngagementMenu } from "./engagement-menu";
import { ResourcesMenu } from "./resources-menu";
import { SolutionsMenu } from "./solutions-menu";

const ORDER: MenuId[] = ["solutions", "engagement", "resources"];
const OPEN_DELAY = 80; // ms of intent before the first menu opens
const CLOSE_DELAY = 140; // ms of grace before the panel closes

const itemClass =
  "inline-flex h-10 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-button px-3 font-display text-body-sm font-medium text-text-primary transition-colors duration-150 ease-standard focus-ring group-data-[theme=dark]:text-text-on-dark group-data-[theme=dark]:hover:bg-white/10";

/** Keeps the panel height in sync with the visible menu content. Ignores exiting content. */
function Measured({ onHeight, children }: { onHeight: (h: number) => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isPresent = useIsPresent();
  const presentRef = useRef(isPresent);

  useEffect(() => {
    presentRef.current = isPresent;
  }, [isPresent]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const report = () => presentRef.current && onHeight(el.offsetHeight);
    const ro = new ResizeObserver(report);
    ro.observe(el);
    report();
    return () => ro.disconnect();
  }, [onHeight]);

  return <div ref={ref}>{children}</div>;
}

export function NavClient({
  lang,
  copy,
  common,
  switchLinks,
}: {
  lang: Lang;
  copy: NavCopy;
  common: CommonCopy;
  switchLinks: SwitchLink[];
}) {
  const [open, setOpen] = useState<MenuId | null>(null);
  const [dir, setDir] = useState(1);
  const [height, setHeight] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "blue" | "black">("light");

  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<MenuId, HTMLButtonElement | null>>({
    solutions: null,
    engagement: null,
    resources: null,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const openRef = useRef<MenuId | null>(null);
  const lastPointer = useRef<string>("mouse");
  const focusPanelOnOpen = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const clear = () => clearTimeout(timer.current);

  const openMenu = useCallback((id: MenuId) => {
    const current = openRef.current;
    if (current && current !== id) setDir(ORDER.indexOf(id) > ORDER.indexOf(current) ? 1 : -1);
    setOpen(id);
  }, []);

  const scheduleOpen = (id: MenuId) => {
    clear();
    timer.current = setTimeout(() => openMenu(id), openRef.current ? 0 : OPEN_DELAY);
  };

  const scheduleClose = (delay = CLOSE_DELAY) => {
    clear();
    timer.current = setTimeout(() => setOpen(null), delay);
  };

  const closeNow = useCallback(() => {
    clear();
    setOpen(null);
  }, []);

  // Escape closes (and returns focus to the trigger if it was inside the panel).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const id = openRef.current;
      if (id && panelRef.current?.contains(document.activeElement)) triggerRefs.current[id]?.focus();
      closeNow();
      setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeNow]);

  // Click or tap outside closes.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) closeNow();
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [closeNow]);

  // After opening with the keyboard, move focus into the panel.
  useEffect(() => {
    if (open && focusPanelOnOpen.current) {
      focusPanelOnOpen.current = false;
      requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a, button")?.focus());
    }
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onTriggerKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>, id: MenuId) => {
    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey && open === id)) {
      e.preventDefault();
      if (open === id) panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
      else {
        focusPanelOnOpen.current = true;
        openMenu(id);
      }
    }
  };

  const onTriggerClick = (id: MenuId) => {
    // A mouse click on a menu already opened by hover keeps it open; touch and keyboard toggle.
    if (lastPointer.current === "mouse" && open === id) return;
    if (open === id) closeNow();
    else openMenu(id);
  };

  const onHeaderBlur = (e: React.FocusEvent) => {
    if (!headerRef.current?.contains(e.relatedTarget as Node | null)) closeNow();
  };

  const pointerEnter = (e: ReactPointerEvent, id: MenuId) => {
    lastPointer.current = e.pointerType;
    if (e.pointerType === "mouse") scheduleOpen(id);
  };

  // Adaptive glass bar (DESIGN.md nav.adaptive-theme): the bar takes the theme of the section under the middle of it.
  // Dark sections declare data-nav-theme="blue" or "black" (their color); everything else is light.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = (headerRef.current?.offsetHeight ?? 64) / 2;
      let next: "light" | "blue" | "black" = "light";
      document.querySelectorAll<HTMLElement>("[data-nav-theme]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) {
          const t = el.dataset.navTheme;
          next = t === "blue" || t === "black" ? t : "light";
        }
      });
      setTheme(next);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // The panels and the mobile sheet are white and attach flush under the bar, so the bar stays light while one is open.
  const barTheme = open || mobileOpen ? "light" : theme;

  const triggers: { id: MenuId; label: string }[] = [
    { id: "solutions", label: copy.solutions.trigger },
    { id: "engagement", label: copy.engagement.trigger },
    { id: "resources", label: copy.resources.trigger },
  ];

  const heightTransition = reduce ? { duration: 0 } : { duration: duration.slow, ease: ease.emphasized };

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-button focus:bg-excellence-blue focus:px-4 focus:py-2 focus:text-body-sm focus:text-white"
      >
        {common.skipToContent}
      </a>

      <header
        ref={headerRef}
        onBlur={onHeaderBlur}
        onPointerEnter={clear}
        onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
        data-theme={barTheme === "light" ? "light" : "dark"}
        data-tone={barTheme === "black" ? "black" : "blue"}
        className="group sticky top-0 z-50 h-[var(--nav-height)] border-b border-border-default bg-white/80 backdrop-blur-sm transition-colors duration-150 ease-standard data-[theme=dark]:border-border-on-dark data-[theme=dark]:bg-surface-dark/80 data-[theme=dark]:data-[tone=black]:bg-surface-dark-alt/80"
      >
        <div className="container-site flex h-full items-center gap-4 xl:gap-6">
          <Link
            href={resolveTarget({ route: "home", anchor: "home" }, lang)}
            aria-label={copy.homeAria}
            className="shrink-0 rounded-button focus-ring"
          >
            <Image
              src={asset("/assets/logotipo-elaniin.svg")}
              alt="Elaniin"
              width={104}
              height={28}
              priority
              className="h-7 w-auto group-data-[theme=dark]:hidden"
            />
            <Image
              src={asset("/assets/white-logotipo-elaniin.svg")}
              alt="Elaniin"
              width={104}
              height={28}
              className="hidden h-7 w-auto group-data-[theme=dark]:block"
            />
          </Link>

          <nav aria-label={common.mainNav} className="hidden items-center gap-1 lg:flex xl:ml-4">
            {triggers.map(({ id, label }) => {
              const isOpen = open === id;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    triggerRefs.current[id] = el;
                  }}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`menu-${id}`}
                  onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                  onPointerEnter={(e) => pointerEnter(e, id)}
                  onClick={() => onTriggerClick(id)}
                  onKeyDown={(e) => onTriggerKeyDown(e, id)}
                  className={cn(itemClass, isOpen ? "bg-surface-subtle" : "hover:bg-surface-subtle")}
                >
                  {label}
                  <ChevronDown
                    className={cn(
                      "size-4 text-text-secondary transition-transform duration-200 ease-standard group-data-[theme=dark]:text-text-on-dark-secondary",
                      isOpen && "rotate-180",
                    )}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
            {plainLinks.map((link) => (
              <Link
                key={link.id}
                href={resolveTarget(link.to, lang)}
                onPointerEnter={(e) => e.pointerType === "mouse" && scheduleClose(100)}
                className={cn(itemClass, "hover:bg-surface-subtle")}
              >
                {copy.plain[link.id]}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <LanguageSwitch links={switchLinks} label={common.language.label} className="hidden lg:flex" />
            <Button
              href={resolveTarget(resourcesTarget, lang)}
              variant="secondary"
              className="max-lg:hidden group-data-[theme=dark]:border-border-on-dark-strong group-data-[theme=dark]:bg-transparent group-data-[theme=dark]:text-white group-data-[theme=dark]:hover:bg-white/10"
            >
              {copy.blog}
            </Button>
            <Button href={resolveTarget(ctaTarget, lang)}>{copy.cta}</Button>
            <button
              type="button"
              aria-label={mobileOpen ? copy.menu.close : copy.menu.open}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                closeNow();
                setMobileOpen((v) => !v);
              }}
              className="grid size-10 cursor-pointer place-items-center rounded-button border border-border-strong bg-white focus-ring group-data-[theme=dark]:border-border-on-dark-strong group-data-[theme=dark]:bg-transparent group-data-[theme=dark]:text-text-on-dark lg:hidden"
            >
              {mobileOpen ? (
                <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu className="size-5" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop panel: one surface that resizes and cross-slides between menus. */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              ref={panelRef}
              className="absolute inset-x-0 top-full hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration.fast, ease: ease.standard }}
            >
              <div className="container-site">
                <motion.div
                  className="overflow-hidden rounded-menu border border-border-default bg-white shadow-menu"
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={heightTransition}
                >
                  <div className="relative">
                    <AnimatePresence initial={false} mode="popLayout" custom={dir}>
                      <motion.div
                        key={open}
                        id={`menu-${open}`}
                        custom={dir}
                        variants={{
                          enter: (d: number) => ({ opacity: 0, x: d * 24 }),
                          center: { opacity: 1, x: 0 },
                          exit: (d: number) => ({ opacity: 0, x: d * -24 }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: duration.base, ease: ease.emphasized }}
                      >
                        <Measured onHeight={setHeight}>
                          {open === "solutions" && <SolutionsMenu lang={lang} copy={copy} />}
                          {open === "engagement" && <EngagementMenu lang={lang} copy={copy} onNavigate={closeNow} />}
                          {open === "resources" && <ResourcesMenu lang={lang} copy={copy} onNavigate={closeNow} />}
                        </Measured>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        lang={lang}
        copy={copy}
        switchLinks={switchLinks}
        languageLabel={common.language.label}
      />
    </MotionConfig>
  );
}
