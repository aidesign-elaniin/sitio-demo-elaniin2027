import { LegalPageView, legalMetadata } from "@/components/sections/legal/legal-page";

export const generateMetadata = () => legalMetadata("legal");

/* Legal page (footer legal row), on the shared legal template. */
export default function Legal() {
  return <LegalPageView id="legal" />;
}
