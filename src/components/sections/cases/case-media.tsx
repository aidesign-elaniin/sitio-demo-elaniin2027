import type { ReactNode } from "react";
import { BlueGlow } from "@/components/ui/blue-glow";

/*
  Stage for a case study's product scene: Excellence Blue surface and the animated blue gradient behind.
  The scene fills the whole stage (absolute) and is free to be cropped by its edges. Decorative (aria-hidden): the card text carries the result.
*/
export function CaseMedia({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="relative isolate h-96 overflow-hidden bg-surface-dark">
      <BlueGlow variant="media" />
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  );
}
