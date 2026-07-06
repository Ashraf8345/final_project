"use client";

import * as React from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { StarIcon } from "@/components/ui/icons";
import { toast } from "sonner";

interface Repository {
  repoId: number;
  name: string;
  description: string | null;
  stars: number;
  primaryLanguage: string | null;
  isFeatured: boolean;
  isHidden: boolean;
  featuredOrder: number;
}

interface FeaturedProjectsProps {
  repositories: Repository[];
}

export function FeaturedProjects({ repositories }: FeaturedProjectsProps) {
  const setPreference = useMutation(api.github.setPreference);
  const reorderFeatured = useMutation(api.github.reorderFeatured);
  const [updatingId, setUpdatingId] = React.useState<number | null>(null);

  const featured = repositories
    .filter((r) => r.isFeatured && !r.isHidden)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);

  const handleUnfeature = async (repoId: number) => {
    setUpdatingId(repoId);
    try {
      await setPreference({ repoId, isFeatured: false });
      toast.success("Removed from featured projects.");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to unfeature project.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const newFeatured = [...featured];
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    if (swapIndex < 0 || swapIndex >= newFeatured.length) return;

    // Swap elements
    const temp = newFeatured[index];
    newFeatured[index] = newFeatured[swapIndex];
    newFeatured[swapIndex] = temp;

    const orderedIds = newFeatured.map((r) => r.repoId);

    try {
      await reorderFeatured({ orderedRepoIds: orderedIds });
      toast.success("Project order updated.");
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to update project sequence.");
    }
  };

  if (featured.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card">
        <svg className="h-8 w-8 text-muted-foreground/60 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        <h4 className="text-sm font-semibold text-foreground mb-1">No featured projects</h4>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Highlight your best work! Toggle the &quot;Feature&quot; button in the repository table below to showcase projects on your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">Featured Projects</h3>
        <p className="text-xs text-muted-foreground">Select and reorder repositories to display in your portfolio showcase.</p>
      </div>

      <div className="grid gap-3">
        {featured.map((repo, index) => (
          <div
            key={repo.repoId}
            className="flex items-center gap-4 rounded-xl border border-border/40 bg-card p-4 shadow-sm hover:border-border/60 transition-colors"
          >
            {/* Index indicator */}
            <div className="flex items-center justify-center h-6 w-6 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-border/40 text-xs font-bold text-muted-foreground">
              {index + 1}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-foreground truncate">{repo.name}</h4>
              {repo.description && (
                <p className="text-[10px] text-muted-foreground truncate max-w-lg mt-0.5">{repo.description}</p>
              )}
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
                {repo.primaryLanguage && (
                  <span className="inline-flex items-center font-medium bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-border/40 text-foreground">
                    {repo.primaryLanguage}
                  </span>
                )}
                <span className="flex items-center gap-0.5">
                  <StarIcon className="h-3 w-3 fill-muted-foreground/10" />
                  {repo.stars}
                </span>
              </div>
            </div>

            {/* Reorder and Unfeature Actions */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center rounded-lg border border-border/50 bg-zinc-50/50 dark:bg-zinc-900/30 p-0.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-md"
                  onClick={() => handleMove(index, "up")}
                  disabled={index === 0}
                  title="Move Up"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-md"
                  onClick={() => handleMove(index, "down")}
                  disabled={index === featured.length - 1}
                  title="Move Down"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-[10px] font-bold text-destructive hover:bg-destructive/10 border-destructive/20 h-8 px-2.5 rounded-lg"
                onClick={() => handleUnfeature(repo.repoId)}
                disabled={updatingId === repo.repoId}
              >
                Unfeature
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
