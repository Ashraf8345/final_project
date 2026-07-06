"use client";

import * as React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { SparklesIcon, GitHubIcon } from "@/components/ui/icons";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "Developer";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Section */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground/80 bg-clip-text text-transparent">
          Welcome back, {userName}
        </h1>
        <p className="text-sm text-muted-foreground leading-normal">
          Here is an overview of your portfolios, resumes, and analytics.
        </p>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center border border-dashed border-border/60 bg-muted/30 dark:bg-zinc-900/10 rounded-2xl p-12 text-center max-w-2xl mx-auto shadow-sm my-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-border/40 text-muted-foreground mb-6 shadow-inner">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
          </svg>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-foreground mb-2">
          No Portfolios Built Yet
        </h2>
        
        <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
          Connect your GitHub account to let our AI scan your repositories, write your professional bio, extract your skills, and deploy a stunning portfolio in seconds.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button variant="brand" className="gap-2 text-sm font-semibold h-10 px-6 rounded-lg" disabled>
            <GitHubIcon className="h-4 w-4" />
            Connect GitHub Profile
          </Button>
          <Button variant="outline" className="gap-2 text-sm font-semibold border-border/80 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 h-10 px-6 rounded-lg" disabled>
            <SparklesIcon className="h-4 w-4" />
            Create Manually
          </Button>
        </div>
      </div>
    </div>
  );
}
