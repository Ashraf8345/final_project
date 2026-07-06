"use client";

import * as React from "react";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Button } from "@/components/ui/button";

export default function TemplatesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Templates Gallery</h1>
          <p className="text-xs text-muted-foreground leading-normal mt-1">
            Choose from minimal, responsive, and high-performance design presets.
          </p>
        </div>

        <EmptyState
          title="Premium Developer Templates"
          description="Explore our library of developer designs. Easily switch layouts, styles, typography, and visual accents at any time without losing content."
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          }
          action={
            <Button variant="brand" className="text-xs font-semibold h-10 px-6 rounded-lg" disabled>
              Browse Gallery
            </Button>
          }
        />
      </div>
    </DashboardLayout>
  );
}
