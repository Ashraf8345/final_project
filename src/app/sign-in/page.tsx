"use client";

import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthCard } from "@/features/auth/components/auth-card";
import { OAuthButton } from "@/features/auth/components/oauth-button";
import { PasswordInput } from "@/features/auth/components/password-input";
import { Divider, LoadingButton, ErrorAlert, SuccessAlert } from "@/features/auth/components/ui-helpers";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type SignInFormValues = z.infer<typeof signInSchema>;

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const verified = searchParams.get("verified");
  const resetParam = searchParams.get("reset");
  const querySuccess = verified === "true"
    ? "Email successfully verified. You can now sign in."
    : resetParam === "true"
    ? "Password reset successful. Please sign in with your new password."
    : null;

  const { control, handleSubmit } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error: authError } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard" as Route,
      });

      if (authError) {
        setError(authError.message || "Invalid credentials.");
      } else {
        router.push("/dashboard" as Route);
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div className="space-y-2">
      <div>
        Don&apos;t have an account?{" "}
        <Link href={"/sign-up" as Route} className="text-brand hover:underline font-semibold transition-colors duration-150">
          Sign up
        </Link>
      </div>
      <div>
        <Link href={"/forgot-password" as Route} className="text-muted-foreground hover:text-foreground font-medium transition-colors duration-150">
          Forgot your password?
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 py-12">
      <AuthCard
        title="Welcome back"
        description="Sign in to your account to manage your developer portfolio"
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
            <SuccessAlert message={success || querySuccess} />

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
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    disabled={loading}
                    className="border-border/80 focus-visible:ring-ring bg-zinc-900/20 h-10 rounded-lg text-sm"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <LoadingButton type="submit" variant="brand" loading={loading}>
              Sign In
            </LoadingButton>
          </form>
        </div>
      </AuthCard>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-800 border-t-zinc-400" />
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
