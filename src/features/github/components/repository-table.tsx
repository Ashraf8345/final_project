"use client";

import * as React from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { StarIcon, GitForkIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Repository {
  repoId: number;
  name: string;
  fullName: string;
  description: string | null;
  isPrivate: boolean;
  defaultBranch: string;
  homepage: string | null;
  license: string | null;
  topics: string[];
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  primaryLanguage: string | null;
  languages: Record<string, number>;
  size: number;
  isArchived: boolean;
  isFork: boolean;
  githubCreatedAt: string;
  githubUpdatedAt: string;
  githubPushedAt: string;
  readmeRaw: string | null;
  isHidden: boolean;
  isFeatured: boolean;
  featuredOrder: number;
}

interface RepositoryTableProps {
  repositories: Repository[];
  searchQuery: string;
  filterLanguage: string;
  filterStatus: "all" | "featured" | "hidden" | "active";
}

export function RepositoryTable({
  repositories,
  searchQuery,
  filterLanguage,
  filterStatus,
}: RepositoryTableProps) {
  const setPreference = useMutation(api.github.setPreference);
  const [updatingId, setUpdatingId] = React.useState<number | null>(null);

  const handleToggleFeature = async (repoId: number, isFeatured: boolean) => {
    setUpdatingId(repoId);
    try {
      await setPreference({ repoId, isFeatured: !isFeatured });
      toast.success(isFeatured ? "Removed from featured projects" : "Added to featured projects");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to update repository preferences.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleHide = async (repoId: number, isHidden: boolean) => {
    setUpdatingId(repoId);
    try {
      await setPreference({ repoId, isHidden: !isHidden });
      toast.success(isHidden ? "Repository is now visible" : "Repository is now hidden from sync queries");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to update repository preferences.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter logic
  const filteredRepos = repositories.filter((repo) => {
    // 1. Search Query
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase()));

    // 2. Language Filter
    const matchesLanguage =
      filterLanguage === "all" ||
      repo.primaryLanguage === filterLanguage;

    // 3. Status Filter
    let matchesStatus = true;
    if (filterStatus === "featured") matchesStatus = repo.isFeatured;
    else if (filterStatus === "hidden") matchesStatus = repo.isHidden;
    else if (filterStatus === "active") matchesStatus = !repo.isHidden;

    return matchesSearch && matchesLanguage && matchesStatus;
  });

  if (filteredRepos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-12 text-center bg-card">
        <svg className="h-10 w-10 text-muted-foreground/60 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <h4 className="text-sm font-semibold text-foreground mb-1">No repositories found</h4>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Try adjusting your filters, search queries, or make sure your repositories are synchronized.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/40 bg-card overflow-hidden shadow-sm">
      {/* Desktop view */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/40 bg-zinc-50 dark:bg-zinc-900/30">
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Repository</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stats</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Language</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {filteredRepos.map((repo) => (
              <tr key={repo.repoId} className="hover:bg-zinc-50/55 dark:hover:bg-zinc-900/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <a
                      href={`https://github.com/${repo.fullName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-foreground hover:text-primary hover:underline flex items-center gap-1.5 self-start"
                    >
                      {repo.name}
                      <svg className="h-3 w-3 opacity-60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground max-w-sm line-clamp-1">
                        {repo.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <StarIcon className="h-3.5 w-3.5 fill-muted-foreground/10" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitForkIcon className="h-3.5 w-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {repo.primaryLanguage ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 border border-border/40 text-foreground">
                      {repo.primaryLanguage}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {repo.isFeatured && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand/10 text-brand dark:bg-brand/20">
                        Featured #{repo.featuredOrder}
                      </span>
                    )}
                    {repo.isHidden && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-destructive/10 text-destructive">
                        Hidden
                      </span>
                    )}
                    {!repo.isFeatured && !repo.isHidden && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        Active
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleFeature(repo.repoId, repo.isFeatured)}
                      disabled={updatingId === repo.repoId || repo.isHidden}
                      className={`text-xs font-semibold h-8 px-3 rounded-lg ${
                        repo.isFeatured
                          ? "bg-brand/10 text-brand border-brand/20 hover:bg-brand/15"
                          : ""
                      }`}
                    >
                      {repo.isFeatured ? "Unfeature" : "Feature"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleHide(repo.repoId, repo.isHidden)}
                      disabled={updatingId === repo.repoId}
                      className={`text-xs font-semibold h-8 px-3 rounded-lg ${
                        repo.isHidden
                          ? "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15"
                          : ""
                      }`}
                    >
                      {repo.isHidden ? "Show" : "Hide"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="block lg:hidden divide-y divide-border/40">
        {filteredRepos.map((repo) => (
          <div key={repo.repoId} className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <a
                  href={`https://github.com/${repo.fullName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-foreground hover:text-primary hover:underline flex items-center gap-1.5"
                >
                  {repo.name}
                  <svg className="h-3 w-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                {repo.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {repo.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {repo.primaryLanguage && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-900 border border-border/40 text-foreground">
                  {repo.primaryLanguage}
                </span>
              )}
              <span className="flex items-center gap-1">
                <StarIcon className="h-3.5 w-3.5 fill-muted-foreground/10" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitForkIcon className="h-3.5 w-3.5" />
                {repo.forks}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/30">
              <div className="flex gap-1.5 flex-wrap">
                {repo.isFeatured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand/10 text-brand">
                    Featured #{repo.featuredOrder}
                  </span>
                )}
                {repo.isHidden && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-destructive/10 text-destructive">
                    Hidden
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleFeature(repo.repoId, repo.isFeatured)}
                  disabled={updatingId === repo.repoId || repo.isHidden}
                  className={`text-[10px] font-semibold h-7 px-2.5 rounded-md ${
                    repo.isFeatured
                      ? "bg-brand/10 text-brand border-brand/20"
                      : ""
                  }`}
                >
                  {repo.isFeatured ? "Unfeature" : "Feature"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleHide(repo.repoId, repo.isHidden)}
                  disabled={updatingId === repo.repoId}
                  className={`text-[10px] font-semibold h-7 px-2.5 rounded-md ${
                    repo.isHidden
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : ""
                  }`}
                >
                  {repo.isHidden ? "Show" : "Hide"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
