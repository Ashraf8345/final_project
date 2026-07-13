"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { UserDropdown } from "@/features/marketing-shell/components/user-dropdown";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "./sidebar";

interface DashboardHeaderProps {
  onOpenMobileMenu?: () => void;
}

export function DashboardHeader({
  onOpenMobileMenu,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle (hidden on desktop) */}
        {onOpenMobileMenu && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden border border-border/40 rounded-lg h-9 w-9 p-0"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
          >
            <svg
              className="h-5 w-5 text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        )}

        {/* Sidebar Collapse Toggle Trigger */}
        <SidebarTrigger className="hidden md:flex" />

        {/* Breadcrumbs */}
        <Breadcrumbs />
      </div>

      {/* Right actions: Search, Notification, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Placeholder */}
        <div className="hidden sm:flex relative items-center max-w-xs">
          <svg
            className="absolute left-3 h-4 w-4 text-muted-foreground/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search documentation..."
            disabled
            className="h-9 w-55 rounded-lg border border-border/40 bg-zinc-50 dark:bg-zinc-950/40 pl-9 pr-3 text-xs text-muted-foreground focus-visible:outline-none cursor-not-allowed opacity-80"
          />
          <kbd className="absolute right-3 hidden lg:inline-flex h-5 select-none items-center gap-0.5 rounded border border-border/40 bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground/80 leading-none">
            ⌘K
          </kbd>
        </div>

        {/* Notification Bell Placeholder */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 border border-border/40 rounded-lg p-0 text-muted-foreground hover:text-foreground"
          disabled
          aria-label="Notifications"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
        </Button>

        {/* User profile dropdown menu */}
        <UserDropdown />
      </div>
    </header>
  );
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((s) => s);

  const getSegmentLabel = (segment: string) => {
    switch (segment) {
      case "dashboard":
        return "Overview";
      case "studio":
        return "Devora Studio";
      case "resume":
        return "Resume Builder";
      case "cover-letters":
        return "Cover Letters";
      case "templates":
        return "Templates";
      case "ai-studio":
        return "AI Studio";
      case "github":
        return "GitHub Sync";
      case "analytics":
        return "Analytics";
      case "billing":
        return "Billing";
      case "settings":
        return "Settings";
      default:
        return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-muted-foreground/80 font-medium">
      <Link href={"/dashboard" as Route} className="hover:text-foreground transition-colors duration-150">
        Devora
      </Link>
      {segments.map((segment, index) => {
        const url = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const label = getSegmentLabel(segment);

        return (
          <React.Fragment key={segment}>
            <svg className="h-3 w-3 text-muted-foreground/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            {isLast ? (
              <span className="font-semibold text-foreground truncate max-w-[120px] sm:max-w-none" aria-current="page">
                {label}
              </span>
            ) : (
              <Link href={url as Route} className="hover:text-foreground transition-colors duration-150 truncate max-w-[120px] sm:max-w-none">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
