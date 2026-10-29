import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/* Section header of the inner pages, the same as the home sections: h1-size title, then a lead whose first sentence is strong. */
export function SectionHead({
  id,
  title,
  lead,
  tone = "light",
}: {
  id: string;
  title: string;
  lead?: { strong: string; rest: string };
  /** "dark" is for an Excellence Blue section. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <Reveal>
      <h2 id={id} className={cn("max-w-[20ch] font-display text-h1 font-medium text-balance", dark ? "text-text-on-dark" : "text-text-primary")}>
        {title}
      </h2>
      {lead && (
        <p className="mt-6 max-w-[60ch] font-display text-lead">
          <strong className={cn("font-medium", dark ? "text-text-on-dark" : "text-text-primary")}>{lead.strong}</strong>{" "}
          <span className={dark ? "text-text-on-dark-secondary" : "text-text-secondary"}>{lead.rest}</span>
        </p>
      )}
    </Reveal>
  );
}
