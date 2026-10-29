import type { EngagementCopy } from "../schema";

/* Title and models supplied by the team (2026-10-27). The visuals are sample first names. */
export const engagement: EngagementCopy = {
  title: "Three ways to work with us.",
  lead: "Choose how much of the work you want us to own.",
  items: [
    {
      id: "staff",
      name: "Staff augmentation",
      rest: "Add senior engineers to your team. They work in your sprints, your tools and your time zone, and you know each one by name.",
      fit: "Best for teams with a roadmap that need more capacity now.",
      link: "Learn more",
    },
    {
      id: "dedicated",
      name: "Dedicated\ndevelopment\nteams",
      rest: "A complete team (engineering, design, QA and a delivery lead) focused only on your product.",
      fit: "Best for products that need sustained speed without building an in-house team.",
      link: "Learn more",
    },
    {
      id: "project",
      name: "Project delivery",
      rest: "We own the outcome from discovery to launch, with scope, timeline and investment clear before we start.",
      fit: "Best for defined initiatives with a fixed goal.",
      link: "Learn more",
    },
  ],
  visuals: { staff: { names: ["Diego", "Lucía", "Camila"] } },
};
