import { betterAuth } from "better-auth";
import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";
import type { GenericCtx } from "@convex-dev/better-auth";
import authConfig from "./auth.config";
import VerifyEmail from "./emails/verify_email";
import ResetPasswordEmail from "./emails/reset_password";
import { Resend } from "@convex-dev/resend";
import { type DataModel } from "./_generated/dataModel";
import { requireActionCtx } from "@convex-dev/better-auth/utils";
import { render } from "react-email";
import { oneTap } from "better-auth/plugins";

export const resend = new Resend(components.resend, {
  apiKey: process.env.RESEND_API_KEY,
  testMode: false,
});

const resendFromEmail = "hello@yousefdawood.me";

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  const siteUrl = process.env.SITE_URL || "http://localhost:3000";

  return betterAuth({
    baseURL: siteUrl,
    secret: process.env.BETTER_AUTH_SECRET,
    database: authComponent.adapter(ctx),

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,

      sendResetPassword: async ({ user, url }) => {
        try {
          await resend.sendEmail(requireActionCtx(ctx), {
            from: `Devora <${resendFromEmail}>`,
            to: [user.email],
            subject: "Reset your password - Devora",
            html: await render(
              ResetPasswordEmail({ name: user.name || "Developer", url }),
            ),
          });
        } catch (error) {
          console.error("Failed to send reset password email:", error);
        }
      },
    },

    emailVerification: {
      autoSignInAfterVerification: true,
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url }) => {
        try {
          await resend.sendEmail(requireActionCtx(ctx), {
            from: `Devora <${resendFromEmail}>`,
            to: [user.email],
            subject: "Verify your email - Devora",
            html: await render(
              VerifyEmail({ name: user.name || "Developer", url }),
            ),
          });
        } catch (error) {
          console.error("Failed to send verification email:", error);
        }
      },
    },

    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      },
      google: {
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      },
    },

    plugins: [convex({ authConfig }), oneTap()],
  });
};
