"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  children: React.ReactNode;
}

export function Sidebar({
  className,
  isCollapsed = false,
  children,
}: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-950/40 text-foreground border-r border-border/40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SidebarSectionProps {
  title?: string;
  isCollapsed?: boolean;
  children: React.ReactNode;
}

export function SidebarSection({
  title,
  isCollapsed = false,
  children,
}: SidebarSectionProps) {
  return (
    <div className="space-y-1.5 py-4 first:pt-2">
      {title && !isCollapsed && (
        <h3 className="px-6 text-2xs font-semibold text-muted-foreground/60 uppercase tracking-widest leading-none mb-2">
          {title}
        </h3>
      )}
      <ul className="space-y-1 px-3 list-none m-0 p-0">
        {children}
      </ul>
    </div>
  );
}

interface SidebarItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  label,
  href,
  icon,
  isCollapsed = false,
  onClick,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href as Route}
        onClick={onClick}
        className={cn(
          "relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isCollapsed ? "justify-center" : "justify-start",
          isActive
            ? "bg-white dark:bg-zinc-900 text-foreground shadow-sm border border-border/40"
            : "text-muted-foreground hover:bg-zinc-100/80 dark:hover:bg-zinc-900/40 hover:text-foreground"
        )}
        title={isCollapsed ? label : undefined}
      >
        <span className={cn("flex-shrink-0 transition-transform duration-200 hover:scale-105", isActive ? "text-primary dark:text-foreground" : "text-muted-foreground")}>
          {icon}
        </span>
        {!isCollapsed && (
          <span className="truncate transition-opacity duration-200">
            {label}
          </span>
        )}
      </Link>
    </li>
  );
}
