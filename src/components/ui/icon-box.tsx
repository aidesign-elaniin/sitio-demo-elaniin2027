import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

/* DESIGN.md: icons are stroke-based (1.5px), 24px grid, always inside a container. Elevate Blue is allowed for small icons. */
export function IconBox({
  icon: Icon,
  tone = "light",
  className,
}: {
  icon: LucideIcon;
  /** "dark" is for icon boxes placed on a dark surface (the AI card of the solutions menu). */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-tag border",
        tone === "light"
          ? "border-border-default bg-white text-elevate-blue"
          : "border-border-on-dark bg-white/10 text-text-on-dark-accent",
        className,
      )}
    >
      <Icon className="size-5" strokeWidth={1.5} />
    </span>
  );
}
