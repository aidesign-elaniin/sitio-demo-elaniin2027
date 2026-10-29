import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* DESIGN.md components.tag: Geist Mono (label token), uppercase, 24px high, fit-content. */
export function Tag({
  children,
  variant = "default",
  size = "md",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "brand";
  /** "sm" is the small tag of the case cards (DESIGN.md components.tag.size-sm). */
  size?: "md" | "sm";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-tag border mono-label leading-none whitespace-nowrap",
        size === "md" ? "h-6 px-2 text-caption" : "h-5 px-1.5 text-tag-sm",
        variant === "default" && "border-neutral-border bg-surface-subtle text-text-secondary",
        variant === "brand" && "border-blue-200 bg-blue-tint-50 text-blue-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
