"use client";

import * as React from "react";
import Link from "next/link";
import type { Route } from "next";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthCard } from "@/features/auth/components/auth-card";
import { LoadingButton, ErrorAlert, SuccessAlert } from "@/features/auth/components/ui-helpers";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error: authError } = await authClient.requestPasswordReset({
        email: values.email,
        redirectTo: "/reset-password" as Route,
      });

      if (authError) {
        setError(authError.message || "Something went wrong.");
      } else {
        setSuccess("If that email address exists in our system, we have sent a link to reset your password.");
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div>
      Back to{" "}
      <Link href={"/sign-in" as Route} className="text-brand hover:underline font-semibold transition-colors duration-150">
        Sign in
      </Link>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <AuthCard
        title="Reset your password"
        description="Enter your email address and we'll send you a link to reset your password"
        footer={footer}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ErrorAlert message={error} />
          <SuccessAlert message={success} />

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
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <LoadingButton type="submit" variant="brand" loading={loading}>
            Send Reset Link
          </LoadingButton>
        </form>
      </AuthCard>
    </div>
  );
}
