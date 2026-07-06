import { generateObject } from "ai";
import { DEFAULT_AI_MODEL, COMPLEX_AI_MODEL } from "../models";
import { repositoryAnalysisSchema } from "../schemas/repository-analysis";
import { skillsOverviewSchema } from "../schemas/skills-overview";
import { careerSummarySchema } from "../schemas/career-summary";
import { recommendationsSchema } from "../schemas/recommendations";
import { getRepositoryAnalysisPrompt, RepositoryInput } from "../prompts/repository-analysis";
import { getCareerSummaryPrompt, ProfileInput, AnalyzedRepoInput } from "../prompts/career-summary";
import { getSkillsOverviewPrompt, RawSkillInput } from "../prompts/skills-overview";
import { getRecommendationsPrompt, RepoScoreInput } from "../prompts/recommendations";

export class AnalysisService {
  /**
   * Evaluates a single repository for technical merit, resume highlights, and suggestions.
   */
  static async analyzeRepository(repo: RepositoryInput) {
    const { system, prompt } = getRepositoryAnalysisPrompt(repo);
    const result = await generateObject({
      model: DEFAULT_AI_MODEL,
      schema: repositoryAnalysisSchema,
      system,
      prompt,
    });
    return result.object;
  }

  /**
   * Synthesizes profile details and project summaries into developer pitches.
   */
  static async generateCareerSummary(profile: ProfileInput, repos: AnalyzedRepoInput[]) {
    const { system, prompt } = getCareerSummaryPrompt(profile, repos);
    const result = await generateObject({
      model: COMPLEX_AI_MODEL,
      schema: careerSummarySchema,
      system,
      prompt,
    });
    return result.object;
  }

  /**
   * Groups all detected packages and languages into standardized skills buckets.
   */
  static async generateSkillsOverview(repos: RawSkillInput[]) {
    const { system, prompt } = getSkillsOverviewPrompt(repos);
    const result = await generateObject({
      model: DEFAULT_AI_MODEL,
      schema: skillsOverviewSchema,
      system,
      prompt,
    });
    return result.object;
  }

  /**
   * Generates weaknesses, strengths, and portfolio roadmap suggestions.
   */
  static async generateRecommendations(
    repos: RepoScoreInput[],
    skills: { frontend: string[]; backend: string[]; DevOps: string[] }
  ) {
    const { system, prompt } = getRecommendationsPrompt(repos, skills);
    const result = await generateObject({
      model: COMPLEX_AI_MODEL,
      schema: recommendationsSchema,
      system,
      prompt,
    });
    return result.object;
  }
}
