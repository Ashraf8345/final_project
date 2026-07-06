"use client";

import * as React from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";
import { GitHubProfileCard } from "@/features/github/components/github-profile-card";
import { SyncStatusCard } from "@/features/github/components/sync-status-card";
import { LanguageChart } from "@/features/github/components/language-chart";
import { FeaturedProjects } from "@/features/github/components/featured-projects";
import { RepositoryFilters } from "@/features/github/components/repository-filters";
import { RepositoryTable } from "@/features/github/components/repository-table";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import { toast } from "sonner";

export default function GitHubPage() {
  const profile = useQuery(api.github.getProfile);
  const syncStatus = useQuery(api.github.getSyncStatus);
  const repositories = useQuery(api.github.getRepositories);
  const syncAccountAction = useAction(api.github.syncAccount);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterLanguage, setFilterLanguage] = React.useState("all");
  const [filterStatus, setFilterStatus] = React.useState<"all" | "featured" | "hidden" | "active">("all");
  const [needsLink, setNeedsLink] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);

  // Derive unique languages for the filter dropdown
  const languages = React.useMemo(() => {
    if (!repositories) return [];
    const langs = new Set<string>();
    repositories.forEach((repo) => {
      if (repo.primaryLanguage && !repo.isHidden) {
        langs.add(repo.primaryLanguage);
      }
    });
    return Array.from(langs).sort();
  }, [repositories]);

  const handleSync = async () => {
    setIsSyncing(true);
    setNeedsLink(false);
    const id = toast.loading("Connecting to GitHub API and synchronizing account...");
    try {
      const result = await syncAccountAction();
      if (result.success === false && result.error === "not_linked") {
        setNeedsLink(true);
        toast.error("Your GitHub profile is not connected to your account yet.", { id });
      } else {
        toast.success(`Successfully synchronized ${result.reposSynced} repositories!`, { id });
      }
    } catch (err) {
      console.error(err);
      const errMsg = (err as Error).message || "";
      if (
        errMsg.includes("GitHub account not linked") ||
        errMsg.includes("Account not found") ||
        errMsg.includes("social sign-in")
      ) {
        setNeedsLink(true);
        toast.error("Your GitHub profile is not connected to your account yet.", { id });
      } else {
        toast.error(errMsg || "Failed to synchronize profile.", { id });
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLinkGitHub = async () => {
    try {
      toast.loading("Redirecting to GitHub OAuth...");
      await authClient.linkSocial({
        provider: "github",
        callbackURL: `${window.location.origin}/github`,
      });
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "OAuth redirection failed.");
    }
  };

  const isLoading = profile === undefined || syncStatus === undefined || repositories === undefined;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">GitHub Integration</h1>
            <p className="text-xs text-muted-foreground leading-normal mt-1">
              Synchronize repositories, configure featured projects, and examine language profiles.
            </p>
          </div>
        </div>

        {isLoading ? (
          /* Loading State skeleton */
          <div className="grid gap-6 animate-pulse">
            <div className="h-44 rounded-2xl bg-card border border-border/40" />
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 h-72 rounded-2xl bg-card border border-border/40" />
              <div className="h-72 rounded-2xl bg-card border border-border/40" />
            </div>
          </div>
        ) : !profile && !isSyncing && (syncStatus?.status === "pending" || !syncStatus || needsLink) ? (
          /* Empty Connected State / Link Request */
          <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card max-w-2xl mx-auto my-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 mx-auto mb-5 border border-border/40 shadow-sm">
              <GitHubIcon className="h-7 w-7 text-foreground" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Import Your GitHub Profile</h2>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
              To import repositories, analyze codebases, and display featured projects, we need permission to access your public profile and repositories.
            </p>
            {needsLink ? (
              <Button
                variant="brand"
                onClick={handleLinkGitHub}
                className="gap-2 text-xs font-semibold h-10 px-6 rounded-lg"
              >
                <GitHubIcon className="h-4 w-4" />
                Link GitHub Account
              </Button>
            ) : (
              <Button
                variant="brand"
                onClick={handleSync}
                className="gap-2 text-xs font-semibold h-10 px-6 rounded-lg"
              >
                <GitHubIcon className="h-4 w-4" />
                Connect & Import Profile
              </Button>
            )}
          </div>
        ) : (
          /* Connected State Dashboard Grid */
          <div className="space-y-6">
            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card & Sync Controls */}
              <div className="lg:col-span-2 space-y-6">
                <GitHubProfileCard profile={profile} onDisconnectSuccess={() => setNeedsLink(true)} />
                <SyncStatusCard status={syncStatus} onSync={handleSync} />
              </div>

              {/* Language Breakdown Chart */}
              <div>
                <LanguageChart repositories={repositories || []} />
              </div>
            </div>

            {/* Featured Projects Pane */}
            {profile && (
              <div className="pt-2">
                <FeaturedProjects repositories={repositories || []} />
              </div>
            )}

            {/* Repository List Table Section */}
            {profile && (
              <div className="space-y-4 pt-4 border-t border-border/40">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground">Repositories</h3>
                  <p className="text-xs text-muted-foreground">Manage and filter imported public codebases.</p>
                </div>

                <RepositoryFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedLanguage={filterLanguage}
                  onLanguageChange={setFilterLanguage}
                  selectedStatus={filterStatus}
                  onStatusChange={setFilterStatus}
                  languages={languages}
                />

                <RepositoryTable
                  repositories={repositories || []}
                  searchQuery={searchQuery}
                  filterLanguage={filterLanguage}
                  filterStatus={filterStatus}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
