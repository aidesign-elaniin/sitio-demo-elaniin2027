import { ArrowRight, Check, FileCheck, FileText, FlaskConical, Gauge, PanelsTopLeft, Sparkles, UserCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import type { AppliedAiCopy } from "@/content/schema";
import { CapacityGrid } from "./capacity-grid";

type PillarId = keyof AppliedAiCopy["pillars"]["items"];

/* Shared with the Applied AI mention of the Solutions page. */
export const PILLARS: { id: PillarId; icon: LucideIcon }[] = [
  { id: "capacity", icon: Gauge },
  { id: "humanLoop", icon: UserCheck },
  { id: "deliverables", icon: FileCheck },
];

/* Human-in-the-loop picture: AI, then a person, then delivery, on one hairline. Decorative. */
function LoopPicture() {
  const steps = [Sparkles, UserCheck, Check];
  return (
    <div aria-hidden="true" className="flex items-center gap-2">
      {steps.map((Icon, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ArrowRight className="size-4 text-text-muted" strokeWidth={1.5} />}
          <span
            className={
              i === 1
                ? "grid size-12 place-items-center rounded-full bg-surface-dark text-text-on-dark"
                : "grid size-12 place-items-center rounded-full border border-border-strong bg-white text-elevate-blue"
            }
          >
            <Icon className="size-5" strokeWidth={1.5} />
          </span>
        </span>
      ))}
    </div>
  );
}

/* Deliverables picture: the extra pieces stacked like sheets coming out of the sprint. Decorative. */
function DeliverablesPicture() {
  const sheets = [FileText, FlaskConical, PanelsTopLeft];
  return (
    <div aria-hidden="true" className="relative h-28 w-44">
      {sheets.map((Icon, i) => (
        <span
          key={i}
          className="absolute grid h-20 w-28 place-items-center rounded-menu border border-border-default bg-white text-elevate-blue shadow-card-rest transition-transform duration-300 ease-emphasized group-hover/pillar:translate-x-[calc(var(--k)*8px)] motion-reduce:transition-none"
          style={{ left: i * 22, top: i * 10, zIndex: 3 - i, "--k": i } as React.CSSProperties}
        >
          <Icon className="size-6" strokeWidth={1.5} />
        </span>
      ))}
    </div>
  );
}

/*
  Applied AI, section 2: the three pillars, each with its own picture instead of an icon box (references: the module
  grids and halftone readouts of the board, design-system/elaniin-2027/brief.md): capacity is one square multiplying
  into a hundred, human-in-the-loop is AI, a person and delivery in a row, deliverables are sheets stacked out of the
  sprint. Hairline grid on Inspire Grey, white cells.
*/
export function Pillars({ copy, capacity }: { copy: AppliedAiCopy["pillars"]; capacity: AppliedAiCopy["capacity"] }) {
  const pictures: Record<PillarId, React.ReactNode> = {
    capacity: <CapacityGrid one={capacity.one} many={capacity.many} />,
    humanLoop: <LoopPicture />,
    deliverables: <DeliverablesPicture />,
  };
  return (
    <section aria-labelledby="pillars-title" className="bg-surface-subtle pb-[var(--section-y)]">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id="pillars-title" title={copy.title} lead={copy.lead} />
      </div>
      <div className="container-site">
        <ul className="grid gap-px overflow-hidden rounded-card border border-border-default bg-border-default md:grid-cols-3">
          {PILLARS.map(({ id }, i) => (
            <li key={id} className="group/pillar min-w-0 bg-white">
              <Reveal delay={i * 0.06} className="flex h-full flex-col gap-10 pad-card">
                <div className="flex min-h-36 items-center">{pictures[id]}</div>
                <div className="mt-auto">
                  <h3 className="font-display text-h3 font-medium text-text-primary">{copy.items[id].title}</h3>
                  <p className="mt-3 max-w-[40ch] text-body text-text-secondary">{copy.items[id].text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
