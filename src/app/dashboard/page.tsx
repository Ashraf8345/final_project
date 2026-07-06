"use client";

import * as React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  SparklesIcon,
  GitHubIcon,
  PlusIcon,
  ArrowRightIcon,
} from "@/components/ui/icons";
import {
  SectionTitle,
  StatCard,
  QuickActionCard,
  ActivityCard,
} from "@/features/dashboard/components/dashboard-card";
import Link from "next/link";
import type { Route } from "next";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "Developer";

  // Mock activity logs
  const mockActivities = [
    {
      id: "1",
      title: "Account Created",
      description: "Welcome to Devora! Your personal workspace is ready.",
      time: "2 hours ago",
      icon: (
        <svg className="h-2.5 w-2.5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
  ];

  // Steps for the checklist
  const checklistSteps = [
    {
      id: 1,
      title: "Connect your GitHub account",
      description: "Allow Devora to scan your repositories and extract metadata.",
      completed: false,
      href: "/github",
    },
    {
      id: 2,
      title: "Select a custom template",
      description: "Pick from our collection of premium developer layouts.",
      completed: false,
      href: "/templates",
    },
    {
      id: 3,
      title: "Generate AI resume & portfolio",
      description: "Customize sections, write bios, and publish your branding site.",
      completed: false,
      href: "/builder",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground/80 bg-clip-text text-transparent">
          Welcome back, {userName}
        </h1>
        <p className="text-sm text-muted-foreground leading-normal">
          Build your professional brand, sync repositories, and review analytics here.
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Portfolio Status"
          value="Not Published"
          subtext="No live URLs yet"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          }
        />

        <StatCard
          title="GitHub Connection"
          value="Disconnected"
          subtext="No profile linked"
          icon={<GitHubIcon className="h-4 w-4" />}
        />

        <StatCard
          title="AI Credits Balance"
          value="50 Credits"
          subtext="Renewed monthly"
          trend={{ value: "100%", direction: "up" }}
          icon={<SparklesIcon className="h-4 w-4 text-brand" />}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <SectionTitle
          title="Quick Actions"
          description="Access core developer branding tools directly"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href={"/builder" as Route} className="no-underline block">
            <QuickActionCard
              title="Portfolio Builder"
              description="Build and publish developer landing pages."
              icon={<PlusIcon className="h-4 w-4" />}
            />
          </Link>

          <Link href={"/resume" as Route} className="no-underline block">
            <QuickActionCard
              title="Resume Builder"
              description="Extract skills and build PDF resumes."
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
          </Link>

          <Link href={"/cover-letters" as Route} className="no-underline block">
            <QuickActionCard
              title="Cover Letters"
              description="Generate tailored summaries for applications."
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
          </Link>

          <Link href={"/ai-studio" as Route} className="no-underline block">
            <QuickActionCard
              title="AI Studio"
              description="Optimise profiles and generate bios."
              icon={<SparklesIcon className="h-4 w-4" />}
            />
          </Link>
        </div>
      </div>

      {/* Main Section: Checklist & Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <SectionTitle
            title="Getting Started Checklist"
            description="Complete these steps to set up your online presence"
          />
          <div className="border border-border/50 bg-card/60 backdrop-blur-xl rounded-2xl overflow-hidden divide-y divide-border/40">
            {checklistSteps.map((step) => (
              <div
                key={step.id}
                className="p-5 flex items-start justify-between gap-4 hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10 transition-colors duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground">
                    <span className="text-xs font-semibold">{step.id}</span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground leading-none">{step.title}</p>
                    <p className="text-xs text-muted-foreground leading-normal">{step.description}</p>
                  </div>
                </div>
                <Link href={step.href as Route} className="shrink-0">
                  <Button variant="outline" size="sm" className="h-8 text-xs gap-1 border-border/80">
                    Start <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Activity & Credits */}
        <div className="space-y-6">
          <ActivityCard
            title="Recent Activity"
            activities={mockActivities}
          />

          {/* Prompt card */}
          <div className="border border-border/50 bg-card/60 backdrop-blur-xl rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <SparklesIcon className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-foreground leading-none">AI Profile Tips</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Syncing your GitHub account gives the AI models context about your repositories. Connect your account to enable automated portfolio generation!
            </p>
            <Link href={"/github" as Route} className="inline-block w-full">
              <Button className="w-full text-xs font-semibold h-9 rounded-lg" variant="brand">
                Connect Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
