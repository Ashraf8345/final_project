"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  value: string;
}

interface Criterion {
  label: string;
  test: (val: string) => boolean;
}

const criteria: Criterion[] = [
  { label: "At least 8 characters", test: (val) => val.length >= 8 },
  { label: "At least one uppercase letter", test: (val) => /[A-Z]/.test(val) },
  { label: "At least one number", test: (val) => /[0-9]/.test(val) },
  { label: "At least one special character", test: (val) => /[^A-Za-z0-9]/.test(val) },
];

export function PasswordStrength({ value }: PasswordStrengthProps) {
  if (!value) return null;

  const passedCount = criteria.filter((c) => c.test(value)).length;
  
  const getStrengthLabel = () => {
    if (passedCount === 0) return "Very Weak";
    if (passedCount <= 2) return "Weak";
    if (passedCount === 3) return "Medium";
    return "Strong";
  };

  const getStrengthColor = () => {
    if (passedCount <= 1) return "bg-red-500";
    if (passedCount <= 2) return "bg-amber-500";
    if (passedCount === 3) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const getStrengthTextClass = () => {
    if (passedCount <= 1) return "text-red-500";
    if (passedCount <= 2) return "text-amber-500";
    if (passedCount === 3) return "text-yellow-500";
    return "text-emerald-500";
  };

  return (
    <div className="space-y-3.5 pt-1.5 pb-2 text-xs">
      <div className="flex items-center justify-between text-muted-foreground/80 font-medium">
        <span>Password Strength:</span>
        <span className={cn("font-semibold transition-colors duration-200", getStrengthTextClass())}>
          {getStrengthLabel()}
        </span>
      </div>

      {/* Progress indicators */}
      <div className="flex gap-1 h-1">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "h-full w-full rounded-full bg-zinc-200 dark:bg-zinc-800 transition-all duration-300",
              idx < passedCount && getStrengthColor()
            )}
          />
        ))}
      </div>

      {/* Detailed checklist */}
      <ul className="space-y-1.5 pl-0 m-0 list-none text-muted-foreground/80">
        {criteria.map((criterion, idx) => {
          const isPassed = criterion.test(value);
          return (
            <li key={idx} className="flex items-center gap-2">
              <svg
                className={cn(
                  "h-3.5 w-3.5 transition-colors duration-200",
                  isPassed ? "text-emerald-500" : "text-zinc-400 dark:text-zinc-600"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                {isPassed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                ) : (
                  <circle cx="12" cy="12" r="8" strokeDasharray="4 4" />
                )}
              </svg>
              <span className={cn("transition-colors duration-200", isPassed && "text-foreground")}>
                {criterion.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export { criteria };
export function isPasswordValid(value: string): boolean {
  return criteria.every((c) => c.test(value));
}
