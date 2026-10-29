import { Reveal } from "@/components/ui/reveal";

/*
  Running text of a detail page, one editorial row per section (reference: the magazine and portfolio layouts,
  design-system/elaniin-2027/brief.md): from lg the h2 sits on the left and the paragraphs on the right at the reading
  measure (68ch), each row under a top hairline. White section.
*/
export function Prose({ sections }: { sections: { title: string; paragraphs: string[] }[] }) {
  return (
    <section className="bg-white">
      <div className="container-site flex flex-col gap-16 py-[var(--section-y)]">
        {sections.map((s) => (
          <Reveal
            key={s.title}
            className="grid gap-5 border-t border-border-default pt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16"
          >
            <h2 className="max-w-[20ch] font-display text-h2 font-medium text-balance text-text-primary">{s.title}</h2>
            <div className="max-w-[68ch]">
              {s.paragraphs.map((p, i) => (
                <p key={p} className={i ? "mt-5 text-body-lg text-text-secondary" : "text-body-lg text-text-secondary"}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
