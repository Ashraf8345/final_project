"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthCard } from "@/features/auth/components/auth-card";
import { OAuthButton } from "@/features/auth/components/oauth-button";
import { PasswordInput } from "@/features/auth/components/password-input";
import {
  PasswordStrength,
  isPasswordValid,
} from "@/features/auth/components/password-strength";
import {
  Divider,
  LoadingButton,
  ErrorAlert,
} from "@/features/auth/components/ui-helpers";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [registeredEmail, setRegisteredEmail] = React.useState("");

  const { control, handleSubmit, watch } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const passwordVal = watch("password");

  const onSubmit = async (values: SignUpFormValues) => {
    setError(null);

    if (!isPasswordValid(values.password)) {
      setError("Please meet all password strength requirements.");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      if (authError) {
        setError(authError.message || "Sign up failed.");
      } else {
        setRegisteredEmail(values.email);
        setIsRegistered(true);
      }
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div>
      Already have an account?{" "}
      <Link
        href={"/sign-in" as Route}
        className="text-brand hover:underline font-semibold transition-colors duration-150"
      >
        Sign in
      </Link>
    </div>
  );

  if (isRegistered) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center py-12">
        <AuthCard
          title="Verify your email"
          description="Verification link sent successfully"
          footer={footer}
        >
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We&apos;ve sent a verification link to{" "}
              <strong className="text-foreground">{registeredEmail}</strong>.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please check your email and click the link to activate your
              account.
            </p>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <AuthCard
        title="Create your account"
        description="Join Devora and start building your brand"
        footer={footer}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <OAuthButton provider="github" isLoading={loading} />
            <OAuthButton provider="google" isLoading={loading} />
          </div>

          <Divider>or credentials</Divider>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <ErrorAlert message={error} />

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="John Doe"
                    aria-invalid={fieldState.invalid}
                    disabled={loading}
                    className="border-border/80 focus-visible:ring-ring bg-zinc-50 dark:bg-zinc-900/20 h-10 rounded-lg text-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                    disabled={loading}
                    className="border-border/80 focus-visible:ring-ring bg-zinc-50 dark:bg-zinc-900/20 h-10 rounded-lg text-sm"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <PasswordInput
                    {...field}
                    id={field.name}
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                    disabled={loading}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <PasswordStrength value={passwordVal} />

            <LoadingButton type="submit" variant="brand" loading={loading}>
              Sign Up
            </LoadingButton>
          </form>
        </div>
      </AuthCard>
    </div>
  );
}
