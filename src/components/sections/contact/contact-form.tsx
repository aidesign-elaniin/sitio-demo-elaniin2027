"use client";

import { useId, useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactCopy } from "@/content/schema";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/*
  Sample contact form (DESIGN.md components.input): validates name, email and interest, simulates sending, then
  confirms. Nothing is sent anywhere. Errors sit under their field and focus moves to the first invalid one.
*/
const field =
  "w-full rounded-input border bg-white px-3 text-body-sm text-text-primary placeholder:text-text-muted transition-colors duration-150 ease-standard hover:border-elaniin-black focus:border-elevate-blue focus-ring";

type Errors = Partial<Record<"name" | "email" | "interest", string>>;

export function ContactForm({ copy, lang }: { copy: ContactCopy["form"]; lang: Lang }) {
  const id = useId();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const next: Errors = {};
    if (!value("name")) next.name = copy.required;
    if (!value("email")) next.email = copy.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) next.email = copy.invalidEmail;
    if (!value("interest")) next.interest = copy.required;
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState("sending");
    setTimeout(() => setState("done"), 700);
  };

  if (state === "done") {
    return (
      <div role="status" className="flex items-start gap-4 rounded-card border border-border-default bg-white pad-card">
        <Check className="mt-1 size-5 shrink-0 text-elevate-blue" strokeWidth={1.5} aria-hidden="true" />
        <div>
          <p className="font-display text-h4 font-medium text-text-primary">{copy.success.title}</p>
          <p className="mt-2 text-body text-text-secondary">{copy.success.text}</p>
        </div>
      </div>
    );
  }

  const describe = (key: keyof Errors) => (errors[key] ? `${id}-${key}-error` : undefined);
  const border = (key: keyof Errors) => (errors[key] ? "border-error-dot" : "border-border-input");
  const label = "mb-2 block text-body-sm font-medium text-text-primary";
  const error = (key: keyof Errors) =>
    errors[key] && (
      <p id={`${id}-${key}-error`} className="mt-2 text-body-sm text-error-text">
        {errors[key]}
      </p>
    );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label={copy.label}
      className="flex flex-col gap-5 rounded-card border border-border-default bg-white pad-card"
    >
      <input type="hidden" name="lang" value={lang} />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor={`${id}-name`} className={label}>{copy.name}</label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            className={cn(field, "h-11", border("name"))}
          />
          {error("name")}
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-email`} className={label}>{copy.email}</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            className={cn(field, "h-11", border("email"))}
          />
          {error("email")}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor={`${id}-company`} className={label}>
            {copy.company} <span className="font-normal text-text-muted">({copy.optional})</span>
          </label>
          <input id={`${id}-company`} name="company" type="text" autoComplete="organization" className={cn(field, "h-11 border-border-input")} />
        </div>
        <div className="min-w-0">
          <label htmlFor={`${id}-interest`} className={label}>{copy.interest}</label>
          <select
            id={`${id}-interest`}
            name="interest"
            defaultValue=""
            aria-invalid={errors.interest ? true : undefined}
            aria-describedby={describe("interest")}
            className={cn(field, "h-11 cursor-pointer", border("interest"))}
          >
            {copy.interests.map((option, i) => (
              <option key={option} value={i === 0 ? "" : option} disabled={i === 0}>
                {option}
              </option>
            ))}
          </select>
          {error("interest")}
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className={label}>
          {copy.message} <span className="font-normal text-text-muted">({copy.optional})</span>
        </label>
        <textarea id={`${id}-message`} name="message" rows={5} className={cn(field, "resize-y py-3 border-border-input")} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-caption text-text-muted">{copy.privacy}</p>
        <Button type="submit" size="lg" disabled={state === "sending"} className="max-md:w-full">
          {state === "sending" ? copy.sending : copy.submit}
        </Button>
      </div>
    </form>
  );
}
