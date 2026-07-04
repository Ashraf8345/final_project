import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BETTER_AUTH_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(16).max(128),
    RESEND_API_KEY: z.string().min(16).max(128),
  },

  experimental__runtimeEnv: {},
});
