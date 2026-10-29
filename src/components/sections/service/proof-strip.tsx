import { cn } from "@/lib/cn";

/*
  Proof strip: the client strip of the home (label cell + one cell per client, hairline grid), with names as text until
  real logos are approved. Names come from the site map and are never translated.
*/
export function ProofStrip({ label, names }: { label: string; names: string[] }) {
  const odd = names.length % 2 === 1;
  return (
    <section aria-label={label} className="bg-white py-[var(--section-y-compact)]">
      <div className="container-site">
        <ul className="grid grid-cols-2 gap-px border border-border-default bg-border-default md:auto-cols-fr md:grid-flow-col">
          <li className="col-span-2 flex items-center bg-white p-6 md:col-span-1">
            <p className="text-body-sm font-medium text-text-primary md:max-w-[22ch]">{label}</p>
          </li>
          {names.map((name, i) => (
            <li
              key={name}
              className={cn(
                "flex h-28 min-w-0 items-center justify-center bg-white px-4 text-center font-display text-body-lg font-medium text-text-secondary transition-colors duration-150 ease-standard hover:bg-surface-subtle hover:text-text-primary",
                odd && i === names.length - 1 && "col-span-2 md:col-span-1",
              )}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
