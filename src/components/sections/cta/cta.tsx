import { ArrowRight } from "lucide-react";
import { BlueGlow } from "@/components/ui/blue-glow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ModuleField } from "@/components/sections/hero/module-field";
import { ctaTarget, resolveTarget } from "@/components/sections/nav/nav-data";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";

/*
  The closing call to action on Excellence Blue, CENTERED: a soft blue glow at the bottom center, with the hero's module
  grid around the edges (the squares keep reacting to the pointer) and a clear middle so the text keeps its contrast.
  Short copy: a big title, one line, two buttons.
*/
export async function Cta() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("cta")]);
  const contact = resolveTarget(ctaTarget, lang);
  return (
    <section
      id={anchors.contact}
      data-nav-theme="blue"
      aria-labelledby="cta-title"
      className="relative overflow-hidden border-t border-border-on-dark bg-surface-dark"
    >
      <BlueGlow variant="cta" />
      <ModuleField fade="center" tone="dark" />

      <div className="container-site relative py-[var(--section-y-statement)]">
        <Reveal className="mx-auto flex max-w-[56rem] flex-col items-center text-center">
          <h2
            id="cta-title"
            className="max-w-[22ch] font-display text-display-lg font-medium text-balance text-text-on-dark"
          >
            {copy.title}
          </h2>
          <p className="mt-6 max-w-[40ch] text-lead text-text-on-dark-secondary">{copy.body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3 max-md:w-full max-md:flex-col">
            <Button href={contact} size="lg" className="focus-ring-on-dark max-md:w-full">
              {copy.primary}
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
            <Button href={contact} variant="on-dark-secondary" size="lg" className="max-md:w-full">
              {copy.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
