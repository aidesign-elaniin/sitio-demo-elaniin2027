import { resolveTarget } from "@/components/sections/nav/nav-data";
import { getCopy, getLang } from "@/content";
import { anchors } from "@/lib/anchors";
import { engagementModels } from "./engagement-data";
import { EngagementCards } from "./engagement-cards";

/*
  Section 06 (DESIGN.md components.engagement-models): an Elaniin Black band with three cards, each with its isometric
  scene. The link of each model is the call to action of the section.
*/
export async function Engagement() {
  const [lang, copy] = await Promise.all([getLang(), getCopy("engagement")]);
  const hrefs = engagementModels.map((m) => resolveTarget(m.to, lang));

  return (
    <section
      id={anchors.engagement}
      data-nav-theme="black"
      aria-labelledby="engagement-title"
      className="scroll-mt-16 bg-surface-dark-alt"
    >
      <div className="container-site py-[var(--section-y)]">
        <EngagementCards copy={copy} hrefs={hrefs} />
      </div>
    </section>
  );
}
