import { z } from "zod";

export const repositoryAnalysisSchema = z.object({
  technicalSummary: z
    .string()
    .describe("An in-depth explanation of the codebase design, file architecture, and coding patterns of this project."),
  resumeSummary: z
    .string()
    .describe("A strong, single-sentence accomplishment bullet in action-driven format (STAR model: situation, task, action, result) ready for a resume."),
  businessImpact: z
    .string()
    .describe("The practical problem this project solves or the business/user value it delivers."),
  keyTechnologies: z
    .array(z.string())
    .describe("Specific packages, libraries, frameworks, or databases detected in the codebase."),
  suggestedImprovements: z
    .array(z.string())
    .describe("2-3 specific technical enhancements or code suggestions."),
  readmeScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Documentation quality score from 0 to 100."),
  readmeSuggestions: z
    .array(z.string())
    .describe("Specific sections, badges, installation steps, or examples to add to improve the README."),
  readmeQualityScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Visual layout and completeness score out of 100."),
  repositoryHealthScore: z
    .number()
    .min(0)
    .max(100)
    .describe("Code readability and standard-compliance score out of 100."),
});
