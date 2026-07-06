import { z } from "zod";

export const careerSummarySchema = z.object({
  professionalSummary: z
    .string()
    .describe("An engineering-focused professional summary that is evidence-based, showcasing actual languages and architectures built."),
  recruiterPitch: z
    .string()
    .describe("A set of bullet points explaining key hiring criteria like stack suitability, development agility, and codebase hygiene."),
  elevatorPitch: z
    .string()
    .describe("A brief 2-3 sentence introductory hook highlighting core specialties and product contributions."),
});
