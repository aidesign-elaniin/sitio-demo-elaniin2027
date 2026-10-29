import { FileCheck, Gauge, UserCheck, type LucideIcon } from "lucide-react";
import { FeatureGrid } from "@/components/sections/service/feature-grid";
import type { AppliedAiCopy } from "@/content/schema";

type PillarId = keyof AppliedAiCopy["pillars"]["items"];

export const PILLARS: { id: PillarId; icon: LucideIcon }[] = [
  { id: "capacity", icon: Gauge },
  { id: "humanLoop", icon: UserCheck },
  { id: "deliverables", icon: FileCheck },
];

/* Applied AI, section 2. The three pillars as a hairline grid, with their icons. */
export function Pillars({ copy }: { copy: AppliedAiCopy["pillars"] }) {
  return (
    <FeatureGrid
      id="pillars-title"
      title={copy.title}
      lead={copy.lead}
      items={PILLARS.map(({ id, icon }) => ({ ...copy.items[id], icon }))}
    />
  );
}
