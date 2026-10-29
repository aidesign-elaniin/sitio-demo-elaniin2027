import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
  Small pieces to compose product scenes. They look like parts of a real interface: hairlines, small type in
  three levels, soft tints from the client's accent. Everything is decorative and never focusable.
*/

/** Phone body. The screen is a clipped child; pass the scene as children. Height is up to the caller (scenes crop it on purpose). */
export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-device bg-elaniin-black p-2 shadow-menu", className)}>
      <div className="h-full overflow-hidden rounded-[calc(var(--radius-device)-8px)] bg-white">{children}</div>
    </div>
  );
}

/** Round initials avatar tinted with the scene's accent. */
export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-full bg-[var(--accent-soft)] font-text text-caption leading-none font-medium text-[var(--accent-ink)]",
        className,
      )}
    >
      {initials}
    </span>
  );
}

/** Square icon tile (icon passed as children). */
export function IconTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-tag bg-[var(--accent-soft)] text-[var(--accent-ink)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small pill in the accent tint, optionally with a dot. */
export function AccentPill({ children, dot = false }: { children: ReactNode; dot?: boolean }) {
  return (
    <span className="inline-flex h-6 w-fit items-center gap-1.5 rounded-tag bg-[var(--accent-soft)] px-2 font-text text-caption leading-none font-medium whitespace-nowrap text-[var(--accent-ink)]">
      {dot && <span className="size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />}
      {children}
    </span>
  );
}

/** Small pill for a finished state (status color, never decoration). */
export function SuccessPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-6 w-fit items-center gap-1.5 rounded-tag border border-success-border bg-success-bg px-2 font-text text-caption leading-none font-medium whitespace-nowrap text-success-text">
      <span className="size-1.5 rounded-full bg-success-dot" aria-hidden="true" />
      {children}
    </span>
  );
}
