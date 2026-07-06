"use client";

import * as React from "react";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";

export default function GitHubPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">GitHub Integration</h1>
          <p className="text-xs text-muted-foreground leading-normal mt-1">
            Connect profiles, manage synced repositories, and review permissions.
          </p>
        </div>

        <EmptyState
          title="Connect Your GitHub Account"
          description="Link your profile to synchronize public and private repositories, pull requests, language breakdowns, and highlight code contributions automatically."
          icon={<GitHubIcon className="h-6 w-6" />}
          action={
            <Button variant="brand" className="gap-2 text-xs font-semibold h-10 px-6 rounded-lg" disabled>
              <GitHubIcon className="h-4 w-4" />
              Link GitHub Profile
            </Button>
          }
        />
      </div>
    </DashboardLayout>
  );
}
