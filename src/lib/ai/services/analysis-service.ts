import { generateText, Output } from "ai";
import { AIRegistry } from "../registry";
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
    const result = await generateText({
      model: AIRegistry.getModel("githubAnalysis"),
      temperature: AIRegistry.getTaskConfig("githubAnalysis").temperature,
      system,
      prompt,
      output: Output.object({
        schema: repositoryAnalysisSchema,
      }),
    });
    return result.output;
  }

  /**
   * Synthesizes profile details and project summaries into developer pitches.
   */
  static async generateCareerSummary(profile: ProfileInput, repos: AnalyzedRepoInput[]) {
    const { system, prompt } = getCareerSummaryPrompt(profile, repos);
    const result = await generateText({
      model: AIRegistry.getModel("portfolioGeneration"),
      temperature: AIRegistry.getTaskConfig("portfolioGeneration").temperature,
      system,
      prompt,
      output: Output.object({
        schema: careerSummarySchema,
      }),
    });
    return result.output;
  }

  /**
   * Groups all detected packages and languages into standardized skills buckets.
   */
  static async generateSkillsOverview(repos: RawSkillInput[]) {
    const { system, prompt } = getSkillsOverviewPrompt(repos);
    const result = await generateText({
      model: AIRegistry.getModel("githubAnalysis"),
      temperature: AIRegistry.getTaskConfig("githubAnalysis").temperature,
      system,
      prompt,
      output: Output.object({
        schema: skillsOverviewSchema,
      }),
    });
    return result.output;
  }

  /**
   * Generates weaknesses, strengths, and portfolio roadmap suggestions.
   */
  static async generateRecommendations(
    repos: RepoScoreInput[],
    skills: { frontend: string[]; backend: string[]; DevOps: string[] }
  ) {
    const { system, prompt } = getRecommendationsPrompt(repos, skills);
    const result = await generateText({
      model: AIRegistry.getModel("portfolioReview"),
      temperature: AIRegistry.getTaskConfig("portfolioReview").temperature,
      system,
      prompt,
      output: Output.object({
        schema: recommendationsSchema,
      }),
    });
    return result.output;
  }

  /**
   * General purpose editor block text rewrite using selected rewrite model.
   */
  static async processPrompt(inputText: string, promptTemplate: string) {
    const result = await generateText({
      model: AIRegistry.getModel("rewrite"),
      temperature: AIRegistry.getTaskConfig("rewrite").temperature,
      system: "You are an expert technical editor. Refine the provided text according to the user request. Keep your output concise. Return ONLY the requested text, without quote wrappers or conversational commentary.",
      prompt: `${promptTemplate}\n\nInput text to refine:\n${inputText}`,
    });
    return result.text;
  }
}
