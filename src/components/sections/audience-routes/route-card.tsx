"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import type { AudienceRouteText, AudienceVisualsCopy } from "@/content/schema";
import type { VisualId } from "./audience-routes-data";
import { AvailabilityVisual } from "./availability-visual";
import { CriticalVisual } from "./critical-visual";
import { ImpactVisual } from "./impact-visual";
import { ModernizationVisual } from "./modernization-visual";
import { PublicVisual } from "./public-visual";
import { SoftwareVisual } from "./software-visual";
import { StaffVisual } from "./staff-visual";

/*
  One route card (DESIGN.md components.audience-routes): the isometric, the text and the link, and over the isometric the panel
  with the success stories. The panel shows on hover or keyboard focus (CSS) and, on devices that cannot hover, with a button.
*/
export function RouteCard({
  text,
  visual,
  labels,
  href,
  casesHref,
  casesLabel,
  casesClose,
  open,
  onToggle,
}: {
  text: AudienceRouteText;
  visual: VisualId;
  labels: AudienceVisualsCopy;
  href: string;
  casesHref: string;
  casesLabel: string;
  casesClose: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li className="group/route relative transition-colors duration-150 ease-standard hover:bg-white/50 lg:row-span-2 lg:grid lg:grid-rows-subgrid">
      <div className="flex h-full flex-col lg:contents">
        <div className="relative grid border-b border-border-default">
          <div className="col-start-1 row-start-1 mx-auto w-[90%] max-w-[420px] self-center lg:max-w-none">
            <RouteVisual id={visual} labels={labels} />
          </div>

          <div
            data-open={open}
            className="pointer-events-none relative z-20 col-start-1 row-start-1 flex flex-col justify-center overflow-hidden bg-white/70 p-4 opacity-0 backdrop-blur-md transition-opacity duration-150 ease-standard xl:p-6 has-[a:focus]:pointer-events-auto has-[a:focus]:opacity-100 group-hover/route:pointer-events-auto group-hover/route:opacity-100 data-[open=true]:pointer-events-auto data-[open=true]:opacity-100"
          >
            {/* The glow behind the glass cards: two soft blurred blobs of the blue ramp. */}
            <div
              aria-hidden="true"
              className="absolute -top-16 -right-10 h-56 w-72 rounded-full bg-blue-300/45"
              style={{ filter: "blur(70px)" }}
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -left-10 h-56 w-72 rounded-full bg-blue-200/70"
              style={{ filter: "blur(70px)" }}
            />

            <div className="relative flex items-center justify-between">
              <p className="mono-label text-caption text-text-secondary">
                {casesLabel}
              </p>
            </div>
            <button
              type="button"
              aria-label={casesClose}
              onClick={onToggle}
              className="absolute top-1 right-1 z-10 hidden size-9 items-center justify-center rounded-button text-text-link transition-colors duration-150 ease-standard hover:text-text-link-hover focus-ring [@media(hover:none)]:inline-flex"
            >
              <X className="size-5" strokeWidth={2} aria-hidden="true" />
            </button>
            <ul className="relative mt-3 flex flex-col gap-3">
              {text.cases.map((item) => (
                <li key={item.title}>
                  <Link
                    href={casesHref}
                    className="group/case flex items-center justify-between gap-4 rounded-card border border-white/70 bg-white/70 p-3 shadow-card-rest xl:p-4 backdrop-blur-md transition-colors duration-150 ease-standard hover:bg-white/90 focus-ring"
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-display text-body font-medium text-text-primary">
                        {item.title}
                      </span>
                      <span className="text-body-sm text-text-secondary">
                        {item.result}
                      </span>
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-text-link transition-transform duration-150 ease-standard group-hover/case:translate-x-1"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {!open && (
            <button
              type="button"
              aria-expanded={open}
              onClick={onToggle}
              className="absolute right-3 bottom-3 z-30 hidden h-9 items-center rounded-button border border-border-default bg-white px-3 font-display text-button font-medium text-text-primary focus-ring [@media(hover:none)]:inline-flex"
            >
              {casesLabel}
            </button>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-6 p-8 max-md:p-6">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-h4 font-medium text-text-primary">
              {text.lead}
            </h3>
            <p className="text-body text-text-secondary">{text.rest}</p>
          </div>
          <Link
            href={href}
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-tag pt-4 font-display text-button font-medium text-text-link transition-colors duration-150 ease-standard after:absolute after:inset-0 hover:text-text-link-hover focus-ring"
          >
            {text.link}
            <ArrowRight
              className="size-4 transition-transform duration-150 ease-standard group-hover/route:translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </li>
  );
}

/* The isometric resource of each item (decorative: the card text carries the meaning). */
function RouteVisual({
  id,
  labels,
}: {
  id: VisualId;
  labels: AudienceVisualsCopy;
}) {
  if (id === "staff") return <StaffVisual labels={labels.staff} />;
  if (id === "availability")
    return <AvailabilityVisual labels={labels.availability} />;
  if (id === "impact") return <ImpactVisual labels={labels.impact} />;
  if (id === "critical") return <CriticalVisual labels={labels.critical} />;
  if (id === "software") return <SoftwareVisual labels={labels.software} />;
  if (id === "modernization")
    return <ModernizationVisual labels={labels.modernization} />;
  return <PublicVisual labels={labels.public} />;
}
