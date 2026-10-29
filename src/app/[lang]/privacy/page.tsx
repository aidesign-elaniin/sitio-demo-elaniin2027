import { LegalPageView, legalMetadata } from "@/components/sections/legal/legal-page";

export const generateMetadata = () => legalMetadata("privacy");

/* Legal page (footer legal row), on the shared legal template. */
export default function Privacy() {
  return <LegalPageView id="privacy" />;
}
