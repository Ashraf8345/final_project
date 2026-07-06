import { createGoogleGenerativeAI } from "@ai-sdk/google";

// Access environment variables directly to prevent importing Next.js T3 Env into Convex server functions
const apiKey = typeof process !== "undefined"
  ? process.env.GOOGLE_API_KEY
  : undefined;

export const google = createGoogleGenerativeAI({
  apiKey: apiKey || "",
});
