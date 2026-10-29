import { Reveal } from "@/components/ui/reveal";

/* Section header of the inner pages, the same as the home sections: h1-size title, then a lead whose first sentence is strong. */
export function SectionHead({ id, title, lead }: { id: string; title: string; lead?: { strong: string; rest: string } }) {
  return (
    <Reveal>
      <h2 id={id} className="max-w-[20ch] font-display text-h1 font-medium text-balance text-text-primary">
        {title}
      </h2>
      {lead && (
        <p className="mt-6 max-w-[60ch] font-display text-lead">
          <strong className="font-medium text-text-primary">{lead.strong}</strong>{" "}
          <span className="text-text-secondary">{lead.rest}</span>
        </p>
      )}
    </Reveal>
  );
}
