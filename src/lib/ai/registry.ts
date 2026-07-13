import { github } from "./client";

export const AI_TASKS = {
  portfolioGeneration: {
    model: "openai/gpt-4o",
    temperature: 0.2,
  },
  resumeGeneration: {
    model: "openai/gpt-4o",
    temperature: 0.2,
  },
  coverLetterGeneration: {
    model: "openai/gpt-4o",
    temperature: 0.3,
  },
  portfolioReview: {
    model: "openai/gpt-4o",
    temperature: 0.1,
  },
  rewrite: {
    model: "openai/gpt-4o-mini",
    temperature: 0.5,
  },
  summaries: {
    model: "openai/gpt-4o-mini",
    temperature: 0.3,
  },
  githubAnalysis: {
    model: "openai/gpt-4o",
    temperature: 0.1,
  },
} as const;

export type AITaskType = keyof typeof AI_TASKS;

export class AIRegistry {
  static getModel(task: AITaskType) {
    const config = AI_TASKS[task];
    return github.chat(config.model);
  }

  static getTaskConfig(task: AITaskType) {
    return AI_TASKS[task];
  }
}
