import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";

/*
  "What's included" as one connected flow, for services whose parts are a chain (architecture to QA). Reference: the
  node diagram of PlayerZero ("Fix. Learn. Prevent.", design-system/elaniin-2027/brief.md). From lg the nodes sit on
  one hairline that a small Elevate Blue pulse travels (the page's living loop, off under reduced motion); below lg the
  line runs down the left edge. Inspire Grey section, white nodes.
*/
export function BuildFlow({
  id,
  title,
  lead,
  items,
  icons,
}: {
  id: string;
  title: string;
  lead?: { strong: string; rest: string };
  items: { title: string; text: string }[];
  icons: LucideIcon[];
}) {
  return (
    <section aria-labelledby={id} className="bg-surface-subtle pb-[var(--section-y)]">
      <div className="container-site pt-[var(--section-y)] pb-16">
        <SectionHead id={id} title={title} lead={lead} />
      </div>

      <Reveal className="container-site">
        <div className="relative">
          {/* The connector: horizontal through the node centers from lg, vertical along the nodes below. */}
          <div aria-hidden="true" className="absolute top-7 bottom-7 left-7 w-px bg-border-strong lg:top-7 lg:right-[calc((100%-4.5rem)/8)] lg:bottom-auto lg:left-[calc((100%-4.5rem)/8)] lg:h-px lg:w-auto">
            <div className="absolute inset-x-0 top-1/2 hidden h-2 -translate-y-1/2 overflow-hidden lg:block">
              <div className="flow-pulse absolute inset-0">
                <span className="absolute top-1/2 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-elevate-blue" />
              </div>
            </div>
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {items.map((item, i) => {
              const Icon = icons[i];
              return (
                <li key={item.title} className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-x-6 lg:grid-cols-1 lg:justify-items-center lg:text-center">
                  <span
                    aria-hidden="true"
                    className="row-span-2 grid size-14 place-items-center rounded-full border border-border-strong bg-white text-elevate-blue lg:row-span-1"
                  >
                    {Icon && <Icon className="size-6" strokeWidth={1.5} />}
                  </span>
                  <h3 className="self-center font-display text-h3 font-medium text-text-primary lg:mt-8">{item.title}</h3>
                  <p className="mt-2 max-w-[30ch] text-body text-text-secondary">{item.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
