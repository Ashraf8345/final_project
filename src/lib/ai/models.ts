import { google } from "./client";

// Primary model for structured outputs and analysis
export const DEFAULT_AI_MODEL = google("gemini-2.0-flash");

// High-capacity model if complex reasoning or long contexts are needed (falls back to DEFAULT_AI_MODEL for now)
export const COMPLEX_AI_MODEL = google("gemini-2.0-flash");
