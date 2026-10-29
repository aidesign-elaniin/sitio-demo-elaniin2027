import type { SolutionsCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { AssistantVisual } from "./assistant-visual";
import { CloudVisual } from "./cloud-visual";
import { DeliveryVisual } from "./delivery-visual";
import type { SolutionId } from "./solutions-data";
import type { VisualSize } from "./visual-panel";

/* The animated mock of a solution, with its strings from the dictionary. Used by the card and by the dialog. */
export function SolutionVisual({
  id,
  copy,
  lang,
  size,
  bare,
}: {
  id: SolutionId;
  copy: SolutionsCopy["visuals"];
  lang: Lang;
  size?: VisualSize;
  bare?: boolean;
}) {
  if (id === "software") return <DeliveryVisual copy={copy.software} size={size} bare={bare} />;
  if (id === "ai") return <AssistantVisual copy={copy.ai} size={size} bare={bare} />;
  return <CloudVisual copy={copy.cloud} lang={lang} size={size} bare={bare} />;
}
