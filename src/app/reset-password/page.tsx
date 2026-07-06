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
import { PasswordInput } from "@/features/auth/components/password-input";
import { PasswordStrength, isPasswordValid } from "@/features/auth/components/password-strength";
import { LoadingButton, ErrorAlert, SuccessAlert } from "@/features/auth/components/ui-helpers";
import { authClient } from "@/lib/auth-client";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

const resetPasswordSchema = z.object({
  password: z.string().min(1, "Password is required."),
  confirmPassword: z.string().min(1, "Confirm password is required."),
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const missingTokenError = !token ? "Missing reset token. Please request a new password reset link." : null;

  const { control, handleSubmit, watch } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordVal = watch("password");

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("Missing reset token. Please request a new password reset link.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isPasswordValid(values.password)) {
      setError("Please meet all password strength requirements.");
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.resetPassword({
        newPassword: values.password,
        token: token,
      });

      if (authError) {
        setError(authError.message || "Failed to reset password.");
      } else {
        setSuccess("Password reset successfully! Redirecting to sign in...");
        setTimeout(() => {
          router.push("/sign-in?reset=true" as Route);
        }, 1500);
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
        title="Choose a new password"
        description="Please choose a strong password for your account"
        footer={footer}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ErrorAlert message={error || missingTokenError} />
          <SuccessAlert message={success} />

          {token && (
            <>
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
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

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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

              <PasswordStrength value={passwordVal} />

              <LoadingButton type="submit" variant="brand" loading={loading}>
                Reset Password
              </LoadingButton>
            </>
          )}
        </form>
      </AuthCard>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-800 border-t-zinc-400" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
