"use client";

import * as React from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  EmptyAnalysisState, 
  AnalysisProgress, 
  CareerSummaryCard, 
  SkillsOverview, 
  RepositoryScoreCard, 
  RecommendationCard, 
  FeaturedProjectsPreview 
} from "@/features/ai/components/analysis-components";
import { GitHubIcon, SparklesIcon, ChevronRightIcon } from "@/components/ui/icons";
import Link from "next/link";
import type { Route } from "next";
import { toast } from "sonner";

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const userName = session?.user?.name || "Developer";

  // Convex queries
  const profile = useQuery(api.github.getProfile);
  const syncStatus = useQuery(api.github.getSyncStatus);
  const repos = useQuery(api.github.getRepositories);
  const aiStatus = useQuery(api.ai.getAnalysisStatus);
  const aiResults = useQuery(api.ai.getAnalysisResults);

  // Convex actions
  const startAIAnalysis = useAction(api.ai.startAnalysis);

  const [isTriggering, setIsTriggering] = React.useState(false);

  // Trigger AI Analysis
  const handleStartAnalysis = async () => {
    setIsTriggering(true);
    const toastId = toast.loading("Launching AI models for repository analysis...");
    try {
      const res = await startAIAnalysis();
      if (res && !res.success) {
        toast.error(res.error || "AI Analysis failed to run.", { id: toastId });
      } else {
        toast.success("AI Profile Analysis completed successfully!", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to trigger analysis.", { id: toastId });
    } finally {
      setIsTriggering(false);
    }
  };

  // Check if GitHub is connected & synced
  const hasSyncedRepos = syncStatus?.status === "success" && profile;

  // Construct lookup maps for names, descriptions, stars and languages from active cache
  const lookupMaps = React.useMemo(() => {
    const names: Record<number, string> = {};
    const descriptions: Record<number, string | null> = {};
    const stars: Record<number, number> = {};
    const languages: Record<number, string | null> = {};

    if (repos) {
      for (const r of repos) {
        names[r.repoId] = r.name;
        descriptions[r.repoId] = r.description;
        stars[r.repoId] = r.stars;
        languages[r.repoId] = r.primaryLanguage;
      }
    }

    return { names, descriptions, stars, languages };
  }, [repos]);

  // Render loading skeletons while Convex queries are unresolved
  if (profile === undefined || syncStatus === undefined || aiStatus === undefined) {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="flex flex-col space-y-2 border-b border-border/40 pb-6">
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md animate-pulse" />
          <div className="h-4 w-96 bg-zinc-100 dark:bg-zinc-900 rounded-md animate-pulse" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-48 bg-zinc-100 dark:bg-zinc-900/40 border border-border/20 rounded-2xl animate-pulse" />
            <div className="h-64 bg-zinc-100 dark:bg-zinc-900/40 border border-border/20 rounded-2xl animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-80 bg-zinc-100 dark:bg-zinc-900/40 border border-border/20 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground/80 bg-clip-text text-transparent">
            Welcome, {userName}
          </h1>
          <p className="text-sm text-muted-foreground leading-normal">
            Analyze codebases, customize portfolios, and build recruiter summaries.
          </p>
        </div>
        {hasSyncedRepos && aiStatus?.status === "success" && (
          <Button 
            onClick={handleStartAnalysis} 
            disabled={isTriggering}
            size="sm"
            className="h-9 font-medium shadow-sm"
          >
            <SparklesIcon className="mr-2 h-4 w-4" />
            Re-run AI Analysis
          </Button>
        )}
      </div>

      {/* STATE 1: GitHub not linked/synced yet */}
      {!hasSyncedRepos ? (
        <Card className="border-border/40 bg-zinc-50/50 dark:bg-zinc-950/20 py-10">
          <CardContent className="flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-border/40 flex items-center justify-center mb-5 text-muted-foreground shadow-sm">
              <GitHubIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">
              Connect your GitHub Profile
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              To enable AI Analysis, please first connect your GitHub account and synchronize your repositories.
            </p>
            <Link href={"/github" as Route}>
              <Button className="font-semibold shadow-sm">
                Go to GitHub Sync
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        /* STATE 2: GitHub linked. Render AI sync status and results */
        <div className="space-y-6">
          {/* If running or errored, show progress card */}
          {(aiStatus?.status === "running" || aiStatus?.status === "error") && (
            <AnalysisProgress
              progress={aiStatus.progress}
              status={aiStatus.status}
              error={aiStatus.error}
              onRetry={handleStartAnalysis}
            />
          )}

          {/* If never run, show empty analysis state */}
          {(!aiStatus || aiStatus.status === "pending") && (
            <EmptyAnalysisState 
              onStartAnalysis={handleStartAnalysis} 
              isLoading={isTriggering} 
            />
          )}

          {/* If successfully complete, show AI analysis dashboard widgets */}
          {aiStatus?.status === "success" && aiResults && (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Summaries & Technical Stats */}
              <div className="lg:col-span-2 space-y-6">
                {aiResults.summary && (
                  <CareerSummaryCard
                    summary={aiResults.summary}
                    onReAnalyze={handleStartAnalysis}
                    isAnalyzing={isTriggering}
                  />
                )}

                {aiResults.recommendations && (
                  <FeaturedProjectsPreview
                    suggestedRepoIds={aiResults.recommendations.suggestedFeaturedRepos}
                    repoNames={lookupMaps.names}
                    repoDescriptions={lookupMaps.descriptions}
                    repoStars={lookupMaps.stars}
                    repoLanguages={lookupMaps.languages}
                  />
                )}

                {aiResults.repoScores && aiResults.repoAnalyses && (
                  <RepositoryScoreCard
                    scores={aiResults.repoScores}
                    analyses={aiResults.repoAnalyses}
                    repoNames={lookupMaps.names}
                  />
                )}
              </div>

              {/* Right Column - Skill Badges & Strategic Recommendations */}
              <div className="space-y-6">
                {aiResults.skills && (
                  <SkillsOverview skills={aiResults.skills} />
                )}

                {aiResults.recommendations && (
                  <RecommendationCard recommendations={aiResults.recommendations} />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
