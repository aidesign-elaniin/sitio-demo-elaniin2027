import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModuleField } from "./module-field";
import { getCopy, getLang } from "@/content";
import type { HeroCopy } from "@/content/schema";
import { anchors } from "@/lib/anchors";
import { href } from "@/lib/routes";

/* Section 02. Centered hero (the only place besides the closing CTA where centering is allowed). */
export async function Hero() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("hero")]);
  return <HeroView copy={copy} href={href("contact", lang)} id={anchors.home} />;
}

/** The hero layout, shared by the home and the inner pages (same module field, word-by-word entrance, one button). */
export function HeroView({ copy, href, id }: { copy: HeroCopy; href: string; id?: string }) {
  const words = copy.headline.split(" ");

  return (
    <section id={id} className="relative scroll-mt-16 overflow-hidden border-b border-border-default">
      <ModuleField />

      <div className="container-site relative flex flex-col items-center py-[var(--section-y-statement)] text-center">
        <h1 className="max-w-[18ch] font-display text-display-xl font-medium text-balance text-text-primary">
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              {i > 0 && " "}
              <span className="rise inline-block" style={{ "--i": i } as React.CSSProperties}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="rise mt-6 max-w-[56ch] text-lead text-text-secondary"
          style={{ "--i": words.length } as React.CSSProperties}
        >
          {copy.lead}
        </p>

        <div
          className="rise mt-10 flex flex-wrap items-center justify-center gap-3 max-md:w-full max-md:flex-col"
          style={{ "--i": words.length + 1 } as React.CSSProperties}
        >
          <Button href={href} size="lg" className="max-md:w-full">
            {copy.cta}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
