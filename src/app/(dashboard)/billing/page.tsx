"use client";

import * as React from "react";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { Button } from "@/components/ui/button";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Billing</h1>
        <p className="text-xs text-muted-foreground leading-normal mt-1">
          Manage your subscription details, renewals, invoices, and plans.
        </p>
      </div>

      <EmptyState
        title="Subscription & Pricing Plans"
        description="Manage billing cycles, upgrade to Premium tier to unlock custom domains, unlimited resumes, and priority AI model queues."
        icon={
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        }
        action={
          <Button variant="brand" className="text-xs font-semibold h-10 px-6 rounded-lg" disabled>
            View Pricing Tiers
          </Button>
        }
      />
    </div>
  );
}
