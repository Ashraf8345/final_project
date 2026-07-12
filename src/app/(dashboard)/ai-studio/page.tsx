"use client";

import * as React from "react";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "@/components/ui/icons";

export default function AIStudioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Studio</h1>
        <p className="text-xs text-muted-foreground leading-normal mt-1">
          Optimize your branding copy, summaries, and achievements.
        </p>
      </div>

      <EmptyState
        title="Devora AI Writing Studio"
        description="Let AI generate high-impact professional bios, project summaries, and achievements based on your synced repository commit logs and README files."
        icon={<SparklesIcon className="h-6 w-6 text-brand" />}
        action={
          <Button variant="brand" className="gap-2 text-xs font-semibold h-10 px-6 rounded-lg" disabled>
            <SparklesIcon className="h-4 w-4" />
            Generate Profile Bio
          </Button>
        }
      />
    </div>
  );
}
