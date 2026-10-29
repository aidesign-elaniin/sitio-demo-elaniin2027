import { LegalPageView, legalMetadata } from "@/components/sections/legal/legal-page";

export const generateMetadata = () => legalMetadata("status");

/* Legal page (footer legal row), on the shared legal template. */
export default function Status() {
  return <LegalPageView id="status" />;
}
