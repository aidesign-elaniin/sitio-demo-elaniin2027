import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/* DESIGN.md components.button. One shape for every variant; hero CTAs use size="lg". */
type Variant =
  | "primary"
  | "dark"
  | "secondary"
  | "tertiary"
  | "on-dark-primary"
  | "on-dark-secondary";
type Size = "sm" | "md" | "lg";

/*
  Tailwind has no merge step, so two utilities for one property are decided by stylesheet order, not intent.
  Rules for callers: hide with a prefixed variant ("max-lg:hidden"), never a bare "hidden"; the base sets no
  width (use "w-full") and no border color (each variant owns it).
*/
const base =
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-button border font-display font-medium whitespace-nowrap transition-colors duration-150 ease-standard focus-ring disabled:cursor-not-allowed disabled:bg-border-default disabled:text-text-disabled";

const variants: Record<Variant, string> = {
  primary: "border-transparent bg-elevate-blue text-white hover:bg-blue-600 active:bg-blue-700",
  dark: "border-transparent bg-excellence-blue text-white hover:bg-blue-800 active:bg-blue-active-dark",
  secondary:
    "border-border-strong bg-white text-excellence-blue hover:bg-surface-subtle active:bg-border-default",
  tertiary:
    "border-transparent bg-transparent px-0 text-text-link hover:text-text-link-hover hover:underline hover:underline-offset-4",
  "on-dark-primary":
    "border-transparent bg-white text-excellence-blue hover:bg-inspire-grey focus-ring-on-dark",
  "on-dark-secondary":
    "border-border-on-dark-strong bg-transparent text-white hover:bg-white/10 focus-ring-on-dark",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3.5 text-button",
  md: "h-10 px-5 text-button",
  lg: "h-12 px-6 text-button-lg",
};

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };
type AsLink = Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(
    base,
    variants[variant],
    variant === "tertiary" ? "h-auto text-button" : sizes[size],
    className,
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as Omit<AsLink, keyof Common>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as Omit<AsButton, keyof Common>)}>
      {children}
    </button>
  );
}
