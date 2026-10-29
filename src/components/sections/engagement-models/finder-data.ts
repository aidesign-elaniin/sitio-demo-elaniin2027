import type { EngagementModel } from "@/components/sections/nav/nav-data";

/* Model order of the finder: option i of every question points to model i. */
export const finderModels: EngagementModel[] = ["staffAugmentation", "dedicatedTeams", "projectDelivery"];

/*
  Points per question, option and model (same order as finderModels). The option that names a model gives it 3, the
  neighbours on the "who leads" scale get 1. Language free: the copy only carries the labels.
*/
const SCORES: number[][][] = [
  [[3, 1, 0], [0, 3, 1], [0, 1, 3]],
  [[3, 1, 0], [1, 3, 1], [0, 1, 3]],
  [[3, 1, 1], [1, 3, 0], [0, 1, 3]],
];

/** Where each model sits between "your team leads" (0) and "Elaniin leads" (100). */
export const leadPosition: Record<EngagementModel, number> = { staffAugmentation: 8, dedicatedTeams: 52, projectDelivery: 92 };

export type Answers = (number | null)[];

/** Match per model (0 to 100) over the questions answered so far; null until one is answered. */
export function matches(answers: Answers): number[] | null {
  const answered = answers.filter((a): a is number => a !== null);
  if (!answered.length) return null;
  const totals = finderModels.map((_, m) => answers.reduce<number>((sum, a, q) => (a === null ? sum : sum + SCORES[q][a][m]), 0));
  return totals.map((t) => Math.round((t / (answered.length * 3)) * 100));
}

/** Index of the best model, or null when nothing is answered. Ties go to the first. */
export function best(answers: Answers): number | null {
  const m = matches(answers);
  return m ? m.indexOf(Math.max(...m)) : null;
}
