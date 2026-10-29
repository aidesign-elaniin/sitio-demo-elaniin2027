import { cn } from "@/lib/cn";

/*
  The study's figure drawn as dots (reference: the dot-matrix readouts and the dotted budget bar of the board,
  design-system/elaniin-2027/brief.md): 100 dots for a percentage, 10 for "x out of 10", the share filled in Excellence
  Blue and the rest in the hairline grey. The figure itself is in the page title; this is its picture, labelled once.
*/
export function FigureDots({ value, unit, label }: { value: number; unit: "percent" | "outOfTen"; label: string }) {
  const total = unit === "percent" ? 100 : 10;
  return (
    <div className="mt-12 grid items-center gap-8 rounded-card border border-border-default bg-white pad-card md:grid-cols-[auto_minmax(0,1fr)] md:gap-12">
      <p aria-hidden="true" className="font-display text-display-xl font-medium text-text-primary tabular-nums">
        {label}
      </p>
      <div
        role="img"
        aria-label={label}
        className={cn("grid w-full max-w-[40rem] gap-1.5", unit === "percent" ? "grid-cols-20" : "grid-cols-10 gap-3")}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn("aspect-square rounded-full", i < value ? "bg-surface-dark" : "bg-border-default")}
          />
        ))}
      </div>
    </div>
  );
}
