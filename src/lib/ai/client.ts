import { createOpenAI } from "@ai-sdk/openai";

// Access GITHUB_API_KEY directly to prevent importing Next.js T3 Env into Convex server functions
const apiKey = typeof process !== "undefined"
  ? process.env.GITHUB_API_KEY
  : undefined;

export const github = createOpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: apiKey || "",
});
