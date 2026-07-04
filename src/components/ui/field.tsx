import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "vertical" | "horizontal" | "responsive";
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, orientation = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="field"
        className={cn(
          "flex gap-1.5",
          orientation === "vertical" && "flex-col",
          orientation === "horizontal" && "flex-row items-center justify-between",
          orientation === "responsive" && "flex-col sm:flex-row sm:items-center sm:justify-between",
          className
        )}
        {...props}
      />
    );
  }
);
Field.displayName = "Field";

export const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      data-slot="field-label"
      className={cn(
        "text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 data-[invalid=true]:text-destructive cursor-pointer",
        className
      )}
      {...props}
    />
  );
});
FieldLabel.displayName = "FieldLabel";

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      data-slot="field-description"
      className={cn("text-[0.8rem] text-muted-foreground/75 leading-normal", className)}
      {...props}
    />
  );
});
FieldDescription.displayName = "FieldDescription";

export interface FieldErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: (any | undefined)[];
}

export const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ className, errors, children, ...props }, ref) => {
    const errorMessages = errors
      ? errors.filter(Boolean).map((err) => (typeof err === "string" ? err : err.message))
      : [];

    if (errorMessages.length === 0 && !children) return null;

    return (
      <p
        ref={ref}
        data-slot="field-error"
        className={cn("text-xs font-semibold text-destructive animate-in fade-in duration-200 mt-1", className)}
        {...props}
      >
        {children || errorMessages.join(", ")}
      </p>
    );
  }
);
FieldError.displayName = "FieldError";
