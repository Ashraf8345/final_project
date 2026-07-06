"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

// SectionTitle
interface SectionTitleProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function SectionTitle({
  title,
  description,
  actions,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 mb-4", className)}>
      <div className="space-y-0.5">
        <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
        {description && (
          <p className="text-xs text-muted-foreground leading-normal">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

// DashboardCard
interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DashboardCard({
  children,
  className,
  ...props
}: DashboardCardProps) {
  return (
    <Card
      className={cn(
        "border border-border/50 bg-card/60 backdrop-blur-xl shadow-sm rounded-2xl transition-all duration-200 hover:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

// StatCard
interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string | number;
    direction: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtext,
  trend,
  icon,
  className,
}: StatCardProps) {
  return (
    <DashboardCard className={className}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider leading-none">
            {title}
          </p>
          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground/80 border border-border/40 shrink-0">
              {icon}
            </div>
          )}
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {value}
          </span>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-3xs font-semibold leading-none border",
                trend.direction === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                trend.direction === "down" && "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
                trend.direction === "neutral" && "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
              )}
            >
              {trend.direction === "up" && "+"}
              {trend.direction === "down" && "-"}
              {trend.value}
            </span>
          )}
        </div>
        {subtext && (
          <p className="mt-1 text-2xs text-muted-foreground">
            {subtext}
          </p>
        )}
      </CardContent>
    </DashboardCard>
  );
}

// ActivityCard
interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  icon?: React.ReactNode;
}

interface ActivityCardProps {
  title: string;
  activities: ActivityItem[];
  emptyText?: string;
  className?: string;
}

export function ActivityCard({
  title,
  activities,
  emptyText = "No recent activity",
  className,
}: ActivityCardProps) {
  return (
    <DashboardCard className={className}>
      <CardContent className="p-6">
        <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider leading-none mb-6">
          {title}
        </h3>
        {activities.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-6">{emptyText}</p>
        ) : (
          <div className="relative border-l border-border/40 pl-6 space-y-6">
            {activities.map((act) => (
              <div key={act.id} className="relative group">
                {/* Bullet node */}
                <span className="absolute -left-[31px] top-0 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-border/60 text-muted-foreground group-hover:border-foreground/50 transition-colors duration-200">
                  {act.icon ? (
                    <span className="h-2 w-2 shrink-0">{act.icon}</span>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 shrink-0" />
                  )}
                </span>
                {/* Content */}
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors duration-200 leading-normal">
                    {act.title}
                  </p>
                  <p className="text-2xs text-muted-foreground leading-normal">
                    {act.description}
                  </p>
                  <span className="text-[10px] text-muted-foreground/60 block pt-0.5 font-medium uppercase tracking-wider">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </DashboardCard>
  );
}

// QuickActionCard
interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function QuickActionCard({
  title,
  description,
  icon,
  onClick,
  disabled = false,
  className,
}: QuickActionCardProps) {
  return (
    <DashboardCard
      className={cn(
        "cursor-pointer hover:border-brand/40 group",
        disabled && "pointer-events-none opacity-60",
        className
      )}
      onClick={!disabled ? onClick : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        if (!disabled && onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <CardContent className="p-6 flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-border/40 text-muted-foreground group-hover:bg-brand/5 group-hover:text-brand transition-all duration-300 shadow-sm shrink-0">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-brand transition-colors duration-250 leading-none">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground leading-normal">
            {description}
          </p>
        </div>
      </CardContent>
    </DashboardCard>
  );
}
