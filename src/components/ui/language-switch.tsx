"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { withHash, type SwitchLink } from "@/lib/routes";

/*
  Language switch: two links to the SAME page in the other language (DESIGN.md section 13.2). No state, so it works inside
  the client Nav and in the server Footer. Without JavaScript it is a plain link; with it, a click keeps the #hash so the
  visitor stays on the section they were reading (the anchors are the same in both languages). "auto" follows the nav bar theme through the `group`
  data-theme of the header; "dark" is for surfaces that are always dark (footer).
*/
const TONES = {
  auto: {
    current: "text-text-primary group-data-[theme=dark]:text-text-on-dark focus-ring",
    other:
      "text-text-secondary hover:text-text-primary group-data-[theme=dark]:text-text-on-dark-secondary group-data-[theme=dark]:hover:text-text-on-dark focus-ring",
    separator: "text-border-strong group-data-[theme=dark]:text-border-on-dark-strong",
  },
  dark: {
    current: "text-text-on-dark focus-ring-on-dark",
    other: "text-text-on-dark-secondary hover:text-text-on-dark focus-ring-on-dark",
    separator: "text-border-on-dark-strong",
  },
} as const;

export function LanguageSwitch({
  links,
  label,
  variant = "auto",
  className,
}: {
  links: SwitchLink[];
  label: string;
  variant?: "auto" | "dark";
  className?: string;
}) {
  const tone = TONES[variant];
  return (
    <nav aria-label={label} className={cn("flex items-center", className)}>
      {links.map((link, i) => (
        <span key={link.lang} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className={cn("select-none", tone.separator)}>
              |
            </span>
          )}
          <Link
            href={link.href}
            hrefLang={link.lang}
            lang={link.lang}
            aria-label={link.name}
            aria-current={link.current ? "true" : undefined}
            onClick={(event) => {
              if (link.current || !window.location.hash || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
              event.preventDefault();
              window.location.assign(withHash(link.href, window.location.hash));
            }}
            className={cn(
              "inline-flex h-8 items-center rounded-button px-2 font-text text-body-sm font-medium transition-colors duration-150 ease-standard",
              link.current ? tone.current : tone.other,
            )}
          >
            {link.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
