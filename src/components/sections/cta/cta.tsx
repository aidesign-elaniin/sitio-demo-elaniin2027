import { ArrowRight } from "lucide-react";
import { BlueGlow } from "@/components/ui/blue-glow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ModuleField } from "@/components/sections/hero/module-field";
import { ctaTarget, resolveTarget } from "@/components/sections/nav/nav-data";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";

/*
  Section 07. Closing call to action on Excellence Blue: a soft blue glow on the right, with the hero's
  module grid over it (the squares keep reacting to the pointer). The left stays clear so the text keeps its contrast.
  Short copy: a title, one line, two buttons.
*/
export async function Cta() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("cta")]);
  return (
    <section
      id={anchors.contact}
      data-nav-theme="blue"
      aria-labelledby="cta-title"
      className="relative overflow-hidden border-t border-border-on-dark bg-surface-dark"
    >
      <BlueGlow variant="cta" />
      <ModuleField fade="left" tone="dark" />

      <div className="container-site relative py-[var(--section-y-statement)]">
        <Reveal className="max-w-[44rem]">
          <h2
            id="cta-title"
            className="max-w-[22ch] font-display text-h2 font-medium text-balance text-text-on-dark"
          >
            {copy.title}
          </h2>
          <p className="mt-4 max-w-[40ch] text-body-lg text-text-on-dark-secondary">
            {copy.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 max-md:flex-col">
            <Button href={resolveTarget(ctaTarget, lang)} size="lg" className="focus-ring-on-dark max-md:w-full">
              {copy.primary}
              <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
            <Button href="#" variant="on-dark-secondary" size="lg" className="max-md:w-full">
              {copy.secondary}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
