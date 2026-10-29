import type { ContactCopy } from "../schema";

/* Dummy copy. Translation of the Spanish sample content. Structure from docs/sitemap-elaniin.md 3.21. Direct contact values are samples. */
export const contact: ContactCopy = {
  title: "Let's talk about what you want to build.",
  lead: "Tell us the problem in a few lines. We'll reply to book a 30-minute call, no strings attached.",
  form: {
    label: "Contact form",
    name: "Name",
    email: "Work email",
    company: "Company",
    interest: "What you need",
    interests: [
      "Choose an option",
      "Software development",
      "Cloud",
      "AI solutions",
      "Grow my team",
      "Not sure yet",
    ],
    message: "Tell us the problem",
    optional: "optional",
    submit: "Send",
    sending: "Sending…",
    required: "Fill in this field.",
    invalidEmail: "Enter a valid email.",
    success: {
      title: "We got your message.",
      text: "We'll write to you soon to book the call.",
    },
    privacy: "We only use this information to reply to you.",
  },
  direct: {
    title: "Direct contact",
    items: [
      { label: "Email", value: "contacto@example.com" },
      { label: "Phone", value: "+000 0000 0000" },
    ],
    note: "Sample details until the official ones are approved.",
  },
  next: {
    title: "What happens next.",
    lead: { strong: "Three steps, no surprises.", rest: "Before proposing anything, we understand the problem." },
    steps: [
      { title: "We reply", text: "A person on the team reads your message and writes back to book a time." },
      { title: "A 30-minute call", text: "We understand the problem, the context and what you have already tried." },
      { title: "Proposal", text: "We send you a concrete path: service, engagement model and next steps." },
    ],
  },
};
