"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { DashboardCard } from "./dashboard-card";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <DashboardCard className={cn("max-w-2xl mx-auto shadow-sm my-8", className)}>
      <div className="flex flex-col items-center justify-center p-12 text-center">
        {icon && (
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-border/40 text-muted-foreground mb-6 shadow-inner shrink-0">
            {icon}
          </div>
        )}

        <h2 className="text-xl font-bold tracking-tight text-foreground mb-2">
          {title}
        </h2>
        
        <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
          {description}
        </p>

        {action && (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
            {action}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
