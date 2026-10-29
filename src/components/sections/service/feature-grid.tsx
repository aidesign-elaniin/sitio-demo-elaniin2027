import type { LucideIcon } from "lucide-react";
import { IconBox } from "@/components/ui/icon-box";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { cn } from "@/lib/cn";

type Item = { title: string; text: string; icon?: LucideIcon };

/* Fixed classes per count: Tailwind only sees whole class names. */
const COLS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

/*
  Header + points in a hairline grid (shared 1px lines, the logo-strip pattern). Used for the Applied AI pillars and for
  the problem and "what's included" blocks of the service pages. White cells; the section is white or Inspire Grey.
*/
export function FeatureGrid({
  id,
  title,
  lead,
  items,
  tone = "white",
}: {
  id: string;
  title: string;
  lead?: { strong: string; rest: string };
  items: Item[];
  tone?: "white" | "subtle";
}) {
  return (
    <section
      aria-labelledby={id}
      className={cn("pb-[var(--section-y)]", tone === "white" ? "bg-white" : "bg-surface-subtle")}
    >
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id={id} title={title} lead={lead} />
      </div>

      <div className="container-site">
        <ul className={cn("grid gap-px border border-border-default bg-border-default", COLS[items.length] ?? COLS[3])}>
          {items.map((item, i) => (
            <li key={item.title} className="min-w-0 bg-white">
              <Reveal
                delay={i * 0.06}
                className="flex h-full flex-col gap-6 pad-card transition-colors duration-150 ease-standard hover:bg-surface-subtle"
              >
                {item.icon && <IconBox icon={item.icon} />}
                <div>
                  <h3 className="font-display text-h3 font-medium text-text-primary">{item.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-body text-text-secondary">{item.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
