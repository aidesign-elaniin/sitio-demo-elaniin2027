import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PageHeroCopy } from "@/content/schema";
import { AiField } from "./ai-field";

/*
  Applied AI hero: the most expressive surface of the site, still inside the system. An Excellence Blue band with the
  living halftone field (AiField) on the right, the headline on the left entering word by word, and a block caret that
  blinks after the last word, as if the model were still writing. One white button.
*/
export function AiHero({ copy, href }: { copy: PageHeroCopy; href: string }) {
  const words = copy.headline.split(" ");
  return (
    <section className="relative isolate overflow-hidden bg-surface-dark text-text-on-dark">
      <AiField />
      <div className="container-site relative flex min-h-[36rem] flex-col justify-center py-[var(--section-y-statement)] lg:min-h-[44rem]">
        <h1 className="max-w-[16ch] font-display text-display-xl font-medium text-balance">
          {words.map((word, i) => (
            <span key={`${word}-${i}`}>
              {i > 0 && " "}
              <span className="rise inline-block" style={{ "--i": i } as React.CSSProperties}>
                {word}
              </span>
            </span>
          ))}
          <span aria-hidden="true" className="caret-blink ml-2 inline-block h-[0.8em] w-[0.45em] translate-y-[0.08em] bg-text-on-dark-accent" />
        </h1>

        <p
          className="rise mt-8 max-w-[52ch] text-lead text-text-on-dark-secondary"
          style={{ "--i": words.length } as React.CSSProperties}
        >
          {copy.lead}
        </p>

        <div className="rise mt-10 max-md:w-full" style={{ "--i": words.length + 1 } as React.CSSProperties}>
          <Button href={href} size="lg" variant="on-dark-primary" className="max-md:w-full">
            {copy.cta}
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
