import { getCopy } from "@/content";
import { ClientLogo, placeholderLogos } from "./placeholder-logos";

/* Section 03. Client strip as a hairline grid: one label cell plus four logo cells. */
export async function Clients() {
  const copy = await getCopy("clients");
  return (
    <section
      aria-labelledby="clients-label"
      className="rise border-b border-border-default bg-white"
      style={{ "--i": 8 } as React.CSSProperties}
    >
      <div className="container-site">
        <ul className="grid grid-cols-2 gap-px border-x border-border-default bg-border-default md:grid-cols-5">
          <li className="col-span-2 flex items-center bg-white p-6 md:col-span-1">
            <p id="clients-label" className="text-body-sm font-medium text-text-primary md:max-w-[22ch]">
              {copy.label}
            </p>
          </li>
          {placeholderLogos.slice(0, 4).map((logo) => (
            <li
              key={logo.name}
              className="flex h-28 items-center justify-center bg-white px-4 text-text-secondary transition-colors duration-150 ease-standard hover:bg-surface-subtle hover:text-text-primary"
            >
              <ClientLogo logo={logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
