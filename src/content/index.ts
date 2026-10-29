import { lang as langParam } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLang, type Lang } from "@/lib/i18n";
import type { Schema, SectionKey } from "./schema";

const dictionaries: Record<Lang, () => Promise<{ copy: Schema }>> = {
  en: () => import("./en"),
  es: () => import("./es"),
};

/** Language of the current request, from the [lang] root param. Unknown languages are a 404. */
export async function getLang(): Promise<Lang> {
  const lang = await langParam();
  if (!lang || !hasLang(lang)) notFound();
  return lang;
}

/** Copy of one section in the current language. Call it in Server Components and pass strings to client leaves as props. */
export async function getCopy<K extends SectionKey>(section: K): Promise<Schema[K]> {
  const { copy } = await dictionaries[await getLang()]();
  return copy[section];
}
