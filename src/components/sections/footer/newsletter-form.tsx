"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FooterCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";

/* Dummy newsletter form: validates the email, simulates sending, then confirms. Nothing is sent anywhere. */
const field =
  "h-11 w-full rounded-input border border-border-on-dark-strong bg-surface-dark-card px-3 text-body-sm text-white placeholder:text-text-on-dark-muted transition-colors duration-150 ease-standard hover:border-white/40 focus-ring-on-dark focus:border-text-on-dark-accent";

export function NewsletterForm({
  copy,
  lang,
  termsHref,
}: {
  copy: FooterCopy["newsletter"];
  lang: Lang;
  termsHref: string;
}) {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(copy.invalidEmail);
      return;
    }
    setError("");
    setState("sending");
    setTimeout(() => setState("done"), 700);
  };

  const [legalBefore, legalAfter] = copy.legal.split("{terms}");

  if (state === "done") {
    return (
      <div role="status" className="flex items-start gap-3 rounded-card border border-border-on-dark bg-surface-dark-card p-4">
        <Check className="mt-0.5 size-5 shrink-0 text-text-on-dark-accent" strokeWidth={1.5} aria-hidden="true" />
        <p className="text-body-sm text-text-on-dark">
          {copy.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <input type="hidden" name="lang" value={lang} />
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label htmlFor={`${id}-first`} className="sr-only">{copy.first}</label>
          <input id={`${id}-first`} name="first" type="text" autoComplete="given-name" placeholder={copy.first} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-last`} className="sr-only">{copy.last}</label>
          <input id={`${id}-last`} name="last" type="text" autoComplete="family-name" placeholder={copy.last} className={field} />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="sr-only">{copy.email}</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={copy.email}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={field}
        />
        {error && (
          <p id={`${id}-error`} role="alert" className="mt-2 text-body-sm text-text-on-dark-accent">
            {error}
          </p>
        )}
      </div>
      <Button type="submit" variant="on-dark-primary" size="lg" className="w-full" disabled={state === "sending"}>
        {state === "sending" ? copy.sending : copy.submit}
      </Button>
      <p className="text-caption text-text-on-dark-muted">
        {legalBefore}
        <Link href={termsHref} className="underline underline-offset-2 hover:text-text-on-dark focus-ring-on-dark">{copy.terms}</Link>
        {legalAfter}
      </p>
    </form>
  );
}
