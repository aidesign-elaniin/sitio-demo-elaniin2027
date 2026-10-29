import { Reveal } from "@/components/ui/reveal";

/* Running text of a detail page: h2 + paragraphs per section, at the reading measure (68ch). White section. */
export function Prose({ sections }: { sections: { title: string; paragraphs: string[] }[] }) {
  return (
    <section className="bg-white">
      <div className="container-site flex flex-col gap-14 py-[var(--section-y)]">
        {sections.map((s) => (
          <Reveal key={s.title} className="max-w-[68ch]">
            <h2 className="font-display text-h2 font-medium text-balance text-text-primary">{s.title}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-body-lg text-text-secondary">
                {p}
              </p>
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
