import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroCopy } from "@/content/schema";
import { AiField } from "./ai-field";

/* The headline opens with the brand name; it is highlighted like a selected token. */
const BRAND = /^Applied AI\b/;

/*
  Applied AI hero: the most expressive surface of the site, still inside the system. An Excellence Blue band with the
  living halftone field (AiField) on the right, the headline on the left entering word by word; "Applied AI" sits on
  an Elevate Blue block like a highlighted token (reference: the TYPEONE magazine highlight blocks,
  design-system/elaniin-2027/brief.md) and a block caret blinks after the last word, as if the model were still
  writing. One white button.
*/
export function AiHero({ copy, href }: { copy: HeroCopy; href: string }) {
  const words = copy.headline.split(" ");
  const marked = BRAND.test(copy.headline);
  return (
    <section className="relative isolate overflow-hidden bg-surface-dark text-text-on-dark">
      <AiField />
      <div className="container-site relative flex min-h-[36rem] flex-col justify-center py-[var(--section-y-statement)] lg:min-h-[44rem]">
        <h1 className="max-w-[16ch] font-display text-display-xl font-medium text-balance">
          {words.map((word, i) => {
            // The brand name ("Applied AI") shares one highlight block, like one selected token.
            if (marked && i === 1) return null;
            const token = marked && i === 0 ? `${words[0]} ${words[1]}` : word;
            return (
              <span key={`${word}-${i}`}>
                {i > 0 && " "}
                <span
                  className={marked && i === 0 ? "rise inline-block rounded-tag bg-elevate-blue px-2 text-white" : "rise inline-block"}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {token}
                </span>
              </span>
            );
          })}
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
