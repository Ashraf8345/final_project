"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/brand/theme-toggle";
import { Logo } from "@/components/brand/logo";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarSection,
  SidebarItem,
} from "./sidebar";
import { DashboardHeader } from "./dashboard-header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Side menu configuration
interface SidebarLinkConfig {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const coreLinks: SidebarLinkConfig[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
      </svg>
    ),
  },
  {
    label: "Portfolio Builder",
    href: "/builder",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    label: "Resume Builder",
    href: "/resume",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: "Cover Letters",
    href: "/cover-letters",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Templates",
    href: "/templates",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
];

const secondaryLinks: SidebarLinkConfig[] = [
  {
    label: "AI Studio",
    href: "/ai-studio",
    icon: (
      <svg className="h-4 w-4 shrink-0 text-brand dark:text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    label: "GitHub Sync",
    href: "/github",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const systemLinks: SidebarLinkConfig[] = [
  {
    label: "Billing",
    href: "/billing",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

interface SidebarContentProps {
  isCollapsed?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

function SidebarContent({ isCollapsed = false, setMobileOpen }: SidebarContentProps) {
  const handleItemClick = () => {
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-950/40 text-foreground">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-4 md:px-5 border-b border-border/40 gap-3">
        <Logo href="/" />
        {!isCollapsed && (
          <span className="font-bold text-sm tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground/70 bg-clip-text text-transparent">
            Devora
          </span>
        )}
      </div>

      {/* Nav List */}
      <nav aria-label="Sidebar navigation" className="flex-1 overflow-y-auto py-4 space-y-1">
        <SidebarSection title="Core Features" isCollapsed={isCollapsed}>
          {coreLinks.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
          ))}
        </SidebarSection>

        <SidebarSection title="Workspace" isCollapsed={isCollapsed}>
          {secondaryLinks.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
          ))}
        </SidebarSection>

        <SidebarSection title="Settings & Admin" isCollapsed={isCollapsed}>
          {systemLinks.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              href={item.href}
              icon={item.icon}
              isCollapsed={isCollapsed}
              onClick={handleItemClick}
            />
          ))}
        </SidebarSection>
      </nav>

      {/* Dev Environment & Theme Toggle */}
      <div className="p-4 border-t border-border/40 flex items-center justify-between">
        {!isCollapsed ? (
          <>
            <span className="text-2xs text-muted-foreground/60 font-semibold tracking-wider uppercase">
              Dev Environment
            </span>
            <ThemeToggle />
          </>
        ) : (
          <div className="mx-auto">
            <ThemeToggle />
          </div>
        )}
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("devora_sidebar_collapsed");
      return savedState === "true";
    }
    return false;
  });

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("devora_sidebar_collapsed", String(next));
      }
      return next;
    });
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-all duration-300">
      {/* Desktop Sidebar (Left side panel) */}
      <Sidebar
        isCollapsed={isCollapsed}
        className="hidden md:flex md:fixed md:inset-y-0 z-20"
      >
        <SidebarContent isCollapsed={isCollapsed} />
      </Sidebar>

      {/* Main container offset by sidebar width */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isCollapsed ? "md:pl-16" : "md:pl-64"
        }`}
      >
        {/* Header */}
        <DashboardHeader
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={isCollapsed}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />

        {/* Mobile Navigation Menu Panel */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-64 border-r border-border/60 bg-background">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <SidebarContent isCollapsed={false} setMobileOpen={setMobileOpen} />
          </SheetContent>
        </Sheet>

        {/* Page Content */}
        <main
          id="main-content"
          className="flex-1 px-4 py-8 sm:px-6 md:px-8 max-w-7xl mx-auto w-full"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
