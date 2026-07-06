import { z } from "zod";

export const recommendationsSchema = z.object({
  strengths: z
    .array(z.string())
    .describe("Top 3-5 technical, structural, or architectural strengths demonstrated by code history."),
  weaknesses: z
    .array(z.string())
    .describe("2-4 developer gaps or documentation issues (e.g., missing tests, poor descriptions)."),
  missingPortfolioContent: z
    .array(z.string())
    .describe("2-3 specific project recommendations to build to make the portfolio more complete."),
  suggestedFeaturedRepos: z
    .array(z.string())
    .describe("The exact names of 2-3 repositories that represent the developer's best work and should be featured."),
});
