"use client";

import * as React from "react";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";

export default function CoverLettersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Cover Letters</h1>
          <p className="text-xs text-muted-foreground leading-normal mt-1">
            Draft tailored, high-converting cover letters matching target job descriptions.
          </p>
        </div>

        <EmptyState
          title="Generate AI Cover Letters"
          description="Submit a job description and let our AI models write custom cover letters highlighting your matching libraries, contributions, and project achievements."
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
          action={
            <Button variant="brand" className="gap-2 text-xs font-semibold h-10 px-6 rounded-lg" disabled>
              <PlusIcon className="h-4 w-4" />
              New Cover Letter
            </Button>
          }
        />
      </div>
    </DashboardLayout>
  );
}
