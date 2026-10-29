import type { LegalCopy } from "../schema";

/* Sample text, pending drafting and approval by the legal team. It is not valid legal text. */
export const legal: LegalCopy = {
  back: "Home",
  tag: "Pending approval",
  notice: "Sample text. The final version is drafted and approved by the legal team before the site goes live.",
  pages: {
    legal: {
      title: "Legal terms",
      lead: "The terms of use of this site and of the information we publish on it.",
      sections: [
        { title: "Use of the site", paragraphs: ["The terms under which this site and its content may be used go here."] },
        { title: "Intellectual property", paragraphs: ["Who owns the content, trademarks and software published goes here."] },
        { title: "Liability", paragraphs: ["The limits of liability for the information on the site go here."] },
      ],
    },
    privacy: {
      title: "Privacy",
      lead: "What data we receive through this site, what we use it for and how you can ask us to delete it.",
      sections: [
        { title: "Data we receive", paragraphs: ["The data that arrives through the contact form and the newsletter goes here."] },
        { title: "What we use it for", paragraphs: ["How that data is used goes here: replying to your message and sending news if you asked for it."] },
        { title: "Your rights", paragraphs: ["How to request access to, correction or deletion of your data goes here."] },
      ],
    },
    status: {
      title: "Service status",
      lead: "Availability of the services we run for our clients.",
      sections: [
        {
          title: "Page in preparation",
          paragraphs: [
            "Real-time status will be published once this page is connected to the monitoring service. Meanwhile, if you notice a problem, report it.",
          ],
        },
      ],
      action: "Report an issue",
    },
    reportIssue: {
      title: "Report an issue",
      lead: "If something doesn't work in a service we run or on this site, tell us so we can look into it.",
      sections: [
        { title: "What to include", paragraphs: ["The affected service, what you expected to happen, what happened and since when."] },
        { title: "What happens next", paragraphs: ["A person on the team reviews the report and replies with the next steps."] },
      ],
      action: "Write to the team",
    },
  },
};
