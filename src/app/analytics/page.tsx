"use client";

import * as React from "react";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-xs text-muted-foreground leading-normal mt-1">
            Track views, clicks, references, and geographical visitor distributions.
          </p>
        </div>

        <EmptyState
          title="Visitor Metrics & Page Views"
          description="Gain deep insights into who is visiting your developer portfolios, download frequencies for your resumes, and referral clicks from your socials."
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
          action={
            <Button variant="brand" className="text-xs font-semibold h-10 px-6 rounded-lg" disabled>
              Configure Tracking
            </Button>
          }
        />
      </div>
    </DashboardLayout>
  );
}
