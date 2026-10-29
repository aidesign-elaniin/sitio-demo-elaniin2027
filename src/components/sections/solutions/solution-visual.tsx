import type { SolutionsCopy } from "@/content/schema";
import { CloudVisual } from "./cloud-visual";
import { DeliveryVisual } from "./delivery-visual";
import { ProductVisual } from "./product-visual";
import type { SolutionId } from "./solutions-data";
import type { VisualSize } from "./visual-panel";

/* The animated mock of a solution, with its strings from the dictionary. Used by the card and by the dialog. */
export function SolutionVisual({
  id,
  copy,
  size,
  bare,
}: {
  id: SolutionId;
  copy: SolutionsCopy["visuals"];
  size?: VisualSize;
  bare?: boolean;
}) {
  // Isometric resources: AI delivery is a pipeline crossed by one pulse; software is a product built tier by tier.
  if (id === "ai") return <DeliveryVisual copy={copy.delivery} size={size} bare={bare} />;
  if (id === "software") return <ProductVisual copy={copy.product} size={size} bare={bare} />;
  return <CloudVisual copy={copy.cloud} size={size} bare={bare} />;
}
