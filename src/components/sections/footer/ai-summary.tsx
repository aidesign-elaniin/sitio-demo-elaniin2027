import { fill } from "@/lib/template";
import { siteUrl } from "@/lib/site";
import { assistants } from "./assistants";

/* "Get an AI summary of Elaniin:" and one icon link per assistant. Server Component: the links are plain anchors. */
export function AiSummary({ copy }: { copy: { label: string; prompt: string; opensIn: string } }) {
  const prompt = encodeURIComponent(fill(copy.prompt, { url: siteUrl() }));

  return (
    <div className="ml-auto flex items-center gap-3 max-md:ml-0 max-md:w-full">
      <span>{copy.label}</span>
      <ul className="flex gap-1">
        {assistants.map((a) => (
          <li key={a.name}>
            <a
              href={a.href(prompt)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${a.name} ${copy.opensIn}`}
              className="grid size-8 place-items-center rounded-button text-text-on-dark-secondary transition-colors duration-150 ease-standard hover:bg-white/8 hover:text-text-on-dark focus-ring-on-dark"
            >
              <svg viewBox={a.viewBox} className="size-[18px]" fill="currentColor" aria-hidden="true">
                <path d={a.path} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
