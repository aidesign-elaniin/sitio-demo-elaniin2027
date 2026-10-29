import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { engagementItems } from "@/components/sections/nav/nav-data";
import type { EngagementCopy, NavCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { href } from "@/lib/routes";

/*
  Comparison of the engagement models on Inspire Grey. From 768px a hairline table (criteria as rows, one column per
  model, model names link to their page); below, one white card per model with the same rows, so nothing scrolls
  sideways.
*/
export function Comparison({
  copy,
  names,
  lang,
}: {
  copy: EngagementCopy["hub"]["comparison"];
  names: NavCopy["engagement"]["items"];
  lang: Lang;
}) {
  const link = "rounded-tag text-text-primary transition-colors duration-150 ease-standard hover:text-text-link focus-ring";
  return (
    <section aria-labelledby="comparison-title" className="bg-surface-subtle">
      <div className="container-site pt-[var(--section-y)] pb-12">
        <SectionHead id="comparison-title" title={copy.title} lead={copy.lead} />
      </div>

      <Reveal className="container-site pb-[var(--section-y)]">
        <table className="hidden w-full table-fixed border-collapse overflow-hidden rounded-card bg-white text-left md:table">
          <thead>
            <tr className="border border-border-default">
              <td className="w-1/4 p-6" />
              {engagementItems.map((m) => (
                <th key={m.id} scope="col" className="border-l border-border-default p-6 font-display text-body-lg font-medium">
                  <Link href={href(m.id, lang)} className={link}>
                    {names[m.id].title}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {copy.criteria.map((criterion, r) => (
              <tr key={criterion} className="border border-border-default">
                <th scope="row" className="p-6 align-top text-body-sm font-medium text-text-primary">
                  {criterion}
                </th>
                {engagementItems.map((m) => (
                  <td key={m.id} className="border-l border-border-default p-6 align-top text-body-sm text-text-secondary">
                    {copy.rows[m.id][r]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="flex flex-col gap-4 md:hidden">
          {engagementItems.map((m) => (
            <li key={m.id} className="rounded-card border border-border-default bg-white pad-card">
              <h3 className="font-display text-body-lg font-medium">
                <Link href={href(m.id, lang)} className={link}>
                  {names[m.id].title}
                </Link>
              </h3>
              <dl className="mt-4 divide-y divide-border-default">
                {copy.criteria.map((criterion, r) => (
                  <div key={criterion} className="py-3">
                    <dt className="text-body-sm font-medium text-text-primary">{criterion}</dt>
                    <dd className="mt-1 text-body-sm text-text-secondary">{copy.rows[m.id][r]}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
