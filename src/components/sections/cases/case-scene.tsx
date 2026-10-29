import type { CasesCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { CloudScene } from "./cloud-scene";
import type { SceneKind } from "./cases-data";
import { ShipmentScene } from "./shipment-scene";
import { SignupScene } from "./signup-scene";
import { SupportScene } from "./support-scene";

/* The animated product scene of a case, with its strings from the dictionary. */
export function CaseScene({
  kind,
  accent,
  copy,
  lang,
}: {
  kind: SceneKind;
  accent: string;
  copy: CasesCopy["scenes"];
  lang: Lang;
}) {
  if (kind === "shipment") return <ShipmentScene accent={accent} copy={copy.shipment} lang={lang} />;
  if (kind === "signup") return <SignupScene accent={accent} copy={copy.signup} lang={lang} />;
  if (kind === "support") return <SupportScene accent={accent} copy={copy.support} />;
  return <CloudScene accent={accent} copy={copy.cloud} lang={lang} />;
}
