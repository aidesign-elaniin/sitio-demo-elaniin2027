import type { Metadata, Viewport } from "next";
import { DM_Sans, Geist_Mono, Instrument_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
import { getLang } from "@/content";
import { langs } from "@/lib/i18n";
import { robotsMeta } from "@/lib/metadata";
import "../globals.css";

/* Brand fonts (DESIGN.md typography.families). Self-hosted by next/font. Geist Mono is for code and for the research list labels (DESIGN.md typography). */
const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* Both languages are statically rendered. English is served unprefixed through src/proxy.ts. */
export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

/* Every page sets its own title, description and canonical (buildMetadata). The review site stays out of search engines: see robotsMeta. */
export const metadata: Metadata = { robots: robotsMeta() };

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const lang = await getLang();
  return (
    <html
      lang={lang}
      className={`${instrumentSans.variable} ${dmSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
