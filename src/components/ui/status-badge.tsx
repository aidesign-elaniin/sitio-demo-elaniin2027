import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/* DESIGN.md components.status-badge: Geist Mono (label token), uppercase. State only, never decoration. */
const variants = {
  success: { box: "border-success-border bg-success-bg text-success-text", dot: "bg-success-dot" },
  warning: { box: "border-warning-border bg-warning-bg text-warning-text", dot: "bg-warning-dot" },
  error: { box: "border-error-border bg-error-bg text-error-text", dot: "bg-error-dot" },
  info: { box: "border-info-border bg-info-bg text-info-text", dot: "bg-info-dot" },
  neutral: { box: "border-neutral-border bg-neutral-bg text-neutral-text", dot: "bg-neutral-dot" },
} as const;

export function StatusBadge({
  variant = "neutral",
  children,
  className,
}: {
  variant?: keyof typeof variants;
  children: ReactNode;
  className?: string;
}) {
  const v = variants[variant];
  return (
    <span
      className={cn(
        "inline-flex h-6 w-fit items-center gap-1.5 rounded-tag border px-2 mono-label text-caption leading-none whitespace-nowrap",
        v.box,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", v.dot)} aria-hidden="true" />
      {children}
    </span>
  );
}
