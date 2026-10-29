import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* DESIGN.md components.tag: Geist Mono (label token), uppercase, 24px high, fit-content. */
export function Tag({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: "default" | "brand";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 w-fit items-center rounded-tag border px-2 mono-label text-caption leading-none whitespace-nowrap",
        variant === "default" && "border-neutral-border bg-surface-subtle text-text-secondary",
        variant === "brand" && "border-blue-200 bg-blue-tint-50 text-blue-600",
        className,
      )}
    >
      {children}
    </span>
  );
}
