import { LegalPageView, legalMetadata } from "@/components/sections/legal/legal-page";

export const generateMetadata = () => legalMetadata("reportIssue");

/* Legal page (footer legal row), on the shared legal template. */
export default function ReportIssue() {
  return <LegalPageView id="reportIssue" />;
}
