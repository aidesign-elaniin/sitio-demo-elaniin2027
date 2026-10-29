import { FileCheck, Gauge, UserCheck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import type { AppliedAiCopy } from "@/content/schema";
import { CapacityGrid } from "./capacity-grid";
import { LoopPicture } from "./loop-picture";
import { SheetsPicture } from "./sheets-picture";

type PillarId = keyof AppliedAiCopy["pillars"]["items"];

/* Shared with the Applied AI mention of the Solutions page. */
export const PILLARS: { id: PillarId; icon: LucideIcon }[] = [
  { id: "capacity", icon: Gauge },
  { id: "humanLoop", icon: UserCheck },
  { id: "deliverables", icon: FileCheck },
];

/*
  Applied AI, section 2: the three pillars, each with a living, playable picture instead of an icon box (references:
  the module grids and halftone readouts of the board, design-system/elaniin-2027/brief.md): capacity is a wave that
  multiplies one square into a hundred (the pointer paints), human-in-the-loop sends drafts through a reviewer who can
  be clicked, deliverables are sheets that take turns and fill in (hover spreads them). Hairline grid on Inspire Grey,
  white cells. Every loop runs only on screen and rests under reduced motion.
*/
export function Pillars({
  copy,
  capacity,
  pictures: labels,
}: {
  copy: AppliedAiCopy["pillars"];
  capacity: AppliedAiCopy["capacity"];
  pictures: AppliedAiCopy["pictures"];
}) {
  const pictures: Record<PillarId, React.ReactNode> = {
    capacity: <CapacityGrid one={capacity.one} many={capacity.many} />,
    humanLoop: <LoopPicture labels={labels.loop} />,
    deliverables: <SheetsPicture labels={labels.sheets} />,
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
