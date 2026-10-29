import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccentWord } from "./accent-word";
import { HeroStack } from "./hero-stack";
import { ModuleField } from "./module-field";
import { getCopy, getLang } from "@/content";
import { href } from "@/lib/routes";
import { anchors } from "@/lib/anchors";
import { cn } from "@/lib/cn";

/*
  Section 02. Two official variants (DESIGN.md components.hero.variants):
    split     text on the left, an isometric resource on the right (the home hero)
    centered  everything centered, no resource (the inner pages; the only centered section besides the closing CTA)
  The hero review switcher of the reference (proposals 1 to 3, TEST) is not used here: the home shows the approved stack.
*/
export async function Hero() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("hero")]);
  return (
    <HeroView
      id={anchors.home}
      copy={{ headline: copy.headline, accent: copy.accent, lead: copy.lead, cta: copy.ctaSales }}
      href={href("home", lang, anchors.contact)}
      secondary={{ label: copy.ctaMethod, href: href("engagementModels", lang) }}
      visual={<HeroStack labels={copy.stack} />}
    />
  );
}

type HeroViewProps = {
  copy: { headline: string; lead: string; cta: string; accent?: string };
  href: string;
  secondary?: { label: string; href: string };
  /** The isometric resource; with it the hero is split, without it centered. */
  visual?: ReactNode;
  id?: string;
};

/** The hero layout, shared by the home (split) and the inner pages (centered). */
export function HeroView({ copy, href: primaryHref, secondary, visual, id }: HeroViewProps) {
  // The words of the accent keep the order of the headline; each word knows whether it falls inside the accent.
  const accentStart = copy.accent ? copy.headline.indexOf(copy.accent) : -1;
  const accentEnd = accentStart + (copy.accent?.length ?? 0);
  const raw = copy.headline.split(" ");
  const words = raw.map((word, i) => {
    const start = raw.slice(0, i).reduce((n, w) => n + w.length + 1, 0);
    return { word, accent: accentStart >= 0 && start >= accentStart && start + word.length <= accentEnd };
  });
  const split = Boolean(visual);

  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-16 overflow-hidden border-b border-border-default",
        split && "xl:flex xl:min-h-[calc(100dvh-var(--nav-height))] xl:items-center",
      )}
    >
      <ModuleField />

      <div
        className={cn(
          "container-site relative py-[var(--section-y-statement)] xl:w-full",
          split ? "grid items-center gap-12 lg:grid-cols-12" : "flex flex-col items-center text-center",
        )}
      >
        <div
          className={cn("flex flex-col items-center", split && "text-center lg:col-span-6 lg:items-start lg:text-left")}
        >
          <h1
            className={cn(
              "font-display text-display-xl font-medium text-balance text-text-primary",
              split ? "max-w-[15ch]" : "max-w-[18ch]",
            )}
          >
            {words.map(({ word, accent }, i) => (
              <span key={`${word}-${i}`}>
                {i > 0 && " "}
                <span className="rise inline-block" style={{ "--i": i } as React.CSSProperties}>
                  {accent ? <AccentWord word={word} index={words.slice(0, i).filter((w) => w.accent).length} /> : word}
                </span>
              </span>
            ))}
          </h1>

          <p
            className={cn(
              "rise mt-6 max-w-[56ch] text-lead text-text-secondary",
              split && "max-lg:max-w-[40ch] max-lg:text-balance",
            )}
            style={{ "--i": words.length } as React.CSSProperties}
          >
            {copy.lead}
          </p>

          <div
            className={cn(
              "rise mt-10 flex flex-wrap items-center gap-3 max-md:w-full max-md:flex-col",
              split ? "justify-center lg:justify-start" : "justify-center",
            )}
            style={{ "--i": words.length + 1 } as React.CSSProperties}
          >
            <Button href={primaryHref} size="lg" className="max-md:w-full">
              {copy.cta}
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="secondary" size="lg" className="max-md:w-full">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>

        {split && (
          <div className="mx-auto w-full max-w-[560px] lg:col-span-6 lg:mx-0 lg:max-w-none">
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
