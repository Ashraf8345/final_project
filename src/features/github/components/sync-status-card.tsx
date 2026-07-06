"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CloudCheck } from "@/components/ui/icons";

interface SyncStatusCardProps {
  status: {
    status: "pending" | "syncing" | "success" | "error";
    progress: number;
    error: string | null;
    lastSyncStart: number | null;
    lastSyncEnd: number | null;
  } | null;
  onSync: () => Promise<void>;
}

export function SyncStatusCard({ status, onSync }: SyncStatusCardProps) {
  const [loading, setLoading] = React.useState(false);

  const handleSync = async () => {
    setLoading(true);
    try {
      await onSync();
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Synchronization failed.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!status) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
          Not Connected
        </span>
      );
    }

    switch (status.status) {
      case "syncing":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/50 animate-pulse dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30">
            <svg className="animate-spin -ml-0.5 mr-1 h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Syncing... {status.progress}%
          </span>
        );
      case "success":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Synced
          </span>
        );
      case "error":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20 dark:bg-destructive/10 dark:text-destructive-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
            Pending
          </span>
        );
    }
  };

  const formattedLastSync = status?.lastSyncEnd
    ? new Date(status.lastSyncEnd).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never";

  const isSyncingState = status?.status === "syncing" || loading;

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Sync Engine</h3>
            {getStatusBadge()}
          </div>
          <p className="text-xs text-muted-foreground leading-normal">
            Last successfully synchronized: <strong className="text-foreground font-medium">{formattedLastSync}</strong>
          </p>
        </div>

        <Button
          variant="brand"
          size="sm"
          className="text-xs font-semibold h-9 px-4 rounded-lg flex items-center gap-1.5"
          onClick={handleSync}
          disabled={isSyncingState || !status}
        >
          {isSyncingState ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Synchronizing...
            </>
          ) : (
            <>
              <CloudCheck />
              Sync Now
            </>
          )}
        </Button>
      </div>

      {status?.status === "syncing" && (
        <div className="mt-4 space-y-2">
          <div className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${status.progress}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground text-right leading-none">
            Importing profile, metadata, languages, and readmes ({status.progress}%)
          </p>
        </div>
      )}

      {status?.status === "error" && status.error && (
        <div className="mt-4 p-3.5 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-xl flex items-start gap-2">
          <svg className="h-4 w-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div className="space-y-0.5">
            <p className="font-semibold leading-normal">Synchronization Error</p>
            <p className="leading-relaxed text-muted-foreground">{status.error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
