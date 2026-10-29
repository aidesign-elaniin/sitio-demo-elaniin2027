import { Reveal } from "@/components/ui/reveal";
import { getCopy, getLang } from "@/content";
import { SolutionsGrid } from "./solutions-grid";
import { anchors } from "@/lib/anchors";

/* Section 04. Header, then three cards (one per solution line, each with its own look) with animated mocks. */
export async function Solutions() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("solutions")]);
  return (
    <section id={anchors.solutions} aria-labelledby="solutions-title" className="bg-white">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <Reveal>
          <h2
            id="solutions-title"
            className="max-w-[20ch] font-display text-h1 font-medium text-balance text-text-primary"
          >
            {copy.title}
          </h2>
          <p className="mt-6 max-w-[60ch] font-display text-lead">
            <strong className="font-medium text-text-primary">{copy.lead.strong}</strong>{" "}
            <span className="text-text-secondary">{copy.lead.rest}</span>
          </p>
        </Reveal>
      </div>

      <div className="container-site pb-[var(--section-y)]">
        <SolutionsGrid copy={copy} lang={lang} />
      </div>
    </section>
  );
}
