import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(16).max(128),
    RESEND_API_KEY: z.string().min(16).max(128),

    GOOGLE_CLIENT_SECRET: z.string().min(16).max(128),

    GITHUB_CLIENT_ID: z.string().min(16).max(128),
    GITHUB_CLIENT_SECRET: z.string().min(16).max(128),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_CONVEX_URL: z.url(),
    NEXT_PUBLIC_CONVEX_SITE_URL: z.url(),
    NEXT_PUBLIC_SITE_URL: z.url(),
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().min(16).max(128),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CONVEX_SITE_URL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  },
});
