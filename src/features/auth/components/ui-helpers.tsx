import * as React from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Divider
export function Divider({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex-grow border-t border-border/40"></div>
      {children && (
        <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-muted-foreground/60 font-medium">
          {children}
        </span>
      )}
      <div className="flex-grow border-t border-border/40"></div>
    </div>
  );
}

// LoadingButton
export interface LoadingButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export function LoadingButton({ children, loading, className, disabled, ...props }: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn("relative w-full text-sm font-semibold h-10 rounded-lg shadow-sm transition-all duration-200", className)}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {loading ? "Please wait..." : children}
    </Button>
  );
}

// ErrorAlert
export function ErrorAlert({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-950/20 px-4 py-3 text-xs text-red-600 dark:text-red-400 shadow-sm leading-normal animate-in fade-in duration-200"
    >
      <svg className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>{message}</div>
    </div>
  );
}

// SuccessAlert
export function SuccessAlert({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-lg border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3 text-xs text-emerald-600 dark:text-emerald-400 shadow-sm leading-normal animate-in fade-in duration-200"
    >
      <svg className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>{message}</div>
    </div>
  );
}
