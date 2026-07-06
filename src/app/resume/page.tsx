"use client";

import * as React from "react";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";

export default function ResumePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Resume Builder</h1>
          <p className="text-xs text-muted-foreground leading-normal mt-1">
            Generate, customize, and export professional PDF resumes.
          </p>
        </div>

        <EmptyState
          title="Create a Professional PDF Resume"
          description="Build structured, ATS-compliant software engineering resumes automatically based on your project history and role selections."
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
          action={
            <Button variant="brand" className="gap-2 text-xs font-semibold h-10 px-6 rounded-lg" disabled>
              <PlusIcon className="h-4 w-4" />
              Create New Resume
            </Button>
          }
        />
      </div>
    </DashboardLayout>
  );
}
