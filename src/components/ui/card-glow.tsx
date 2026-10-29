import { cn } from "@/lib/cn";

/*
  Soft blue glow for dark cards (DESIGN.md motifs.card-glow). Two tones: "feature" for Excellence Blue cards and "quiet" for
  Elaniin Black ones, where the same blue looks stronger, so it is darker and smaller. It lives inside the card, behind its
  content (the card needs `relative isolate overflow-hidden`), and is decorative. With `drift` the blobs move slowly (only
  transform, still under prefers-reduced-motion); `className` sets the strength of the whole layer.
*/
const TONES = {
  feature: [
    {
      pos: "-top-16 -right-16 h-56 w-72",
      color: "bg-blue-700/80",
      blur: 70,
      s: "17s",
    },
    {
      pos: "top-40 -left-20 h-56 w-72",
      color: "bg-blue-600/60",
      blur: 70,
      s: "21s",
    },
    {
      pos: "-right-16 -bottom-16 h-60 w-80",
      color: "bg-blue-700",
      blur: 70,
      s: "25s",
    },
  ],
  quiet: [
    {
      pos: "-right-16 -bottom-16 h-56 w-72",
      color: "bg-blue-800/70",
      blur: 80,
      s: "19s",
    },
    {
      pos: "-top-20 -left-20 h-48 w-60",
      color: "bg-blue-700/25",
      blur: 80,
      s: "23s",
    },
  ],
} as const;

export function CardGlow({
  tone = "quiet",
  drift = false,
  className,
}: {
  tone?: keyof typeof TONES;
  drift?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      {TONES[tone].map((b, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full",
            b.pos,
            b.color,
            drift && "glow-drift",
          )}
          style={
            {
              filter: `blur(${b.blur}px)`,
              "--glow-s": b.s,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
