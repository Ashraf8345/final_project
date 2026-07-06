"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Terminal, 
  TrendingUp, 
  ShieldAlert, 
  AlertTriangle, 
  Cpu, 
  CheckCircle2, 
  Compass, 
  FileText, 
  RefreshCw 
} from "lucide-react";

// ==========================================
// 1. EMPTY ANALYSIS STATE
// ==========================================

interface EmptyAnalysisStateProps {
  onStartAnalysis: () => void;
  isLoading: boolean;
}

export function EmptyAnalysisState({ onStartAnalysis, isLoading }: EmptyAnalysisStateProps) {
  return (
    <Card className="border-dashed border-2 border-border/60 bg-zinc-50/50 dark:bg-zinc-950/20 py-12 text-center">
      <CardContent className="flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="h-12 w-12 rounded-2xl bg-brand/5 border border-brand/20 text-brand flex items-center justify-center mb-4 shadow-sm animate-pulse">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">
          Run AI Profile Analysis
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Analyze your synced GitHub profile and codebases. This generates recruiter-ready pitches, technical skills mapping, documentation scores, and recommendations.
        </p>
        <Button 
          onClick={onStartAnalysis} 
          disabled={isLoading}
          className="relative overflow-hidden group font-medium"
        >
          {isLoading ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Running Analysis...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Start AI Analysis
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

// ==========================================
// 2. ANALYSIS PROGRESS
// ==========================================

interface AnalysisProgressProps {
  progress: number;
  status: "running" | "error" | "pending" | "success";
  error: string | null;
  onRetry: () => void;
}

export function AnalysisProgress({ progress, status, error, onRetry }: AnalysisProgressProps) {
  const getStatusText = () => {
    if (status === "error") return "Analysis Failed";
    if (progress < 20) return "Validating GitHub tokens & credentials...";
    if (progress < 70) return "Analyzing code repositories & README templates...";
    if (progress < 80) return "Compiling developer languages & frameworks...";
    if (progress < 90) return "Writing professional & recruiter summaries...";
    return "Optimizing roadmap recommendations...";
  };

  return (
    <Card className="border-border/40 bg-zinc-50/50 dark:bg-zinc-950/30">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              {status === "error" ? (
                <ShieldAlert className="h-4 w-4 text-destructive" />
              ) : (
                <Sparkles className="h-4 w-4 text-brand animate-spin" />
              )}
              {getStatusText()}
            </h4>
            <p className="text-xs text-muted-foreground">
              {status === "error" ? "Please check your network or API keys" : "Do not close this window"}
            </p>
          </div>
          <span className="text-sm font-bold text-brand">{progress}%</span>
        </div>

        {status === "error" ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-xs font-mono text-destructive flex items-start gap-2">
              <Terminal className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1 whitespace-pre-wrap">{error || "An unknown error occurred."}</div>
            </div>
            <Button size="sm" variant="outline" onClick={onRetry} className="text-xs">
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Retry Analysis
            </Button>
          </div>
        ) : (
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900 border border-border/20">
            <div
              className="h-full bg-brand transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==========================================
// 3. CAREER SUMMARY CARD
// ==========================================

interface CareerSummaryCardProps {
  summary: {
    professionalSummary: string;
    recruiterPitch: string;
    elevatorPitch: string;
  };
  onReAnalyze: () => void;
  isAnalyzing: boolean;
}

export function CareerSummaryCard({ summary, onReAnalyze, isAnalyzing }: CareerSummaryCardProps) {
  // Convert bullet block to list if necessary
  const pitchBullets = summary.recruiterPitch
    .split("\n")
    .filter((line) => line.trim().startsWith("-") || line.trim().startsWith("*") || line.trim().match(/^\d+\./))
    .map((line) => line.replace(/^[-*\s]+|\d+\.\s*/, "").trim());

  return (
    <Card className="border-border/40 bg-zinc-50/50 dark:bg-zinc-950/20 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 z-10">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onReAnalyze} 
          disabled={isAnalyzing}
          className="text-xs h-8 bg-background/50 border-border/40 backdrop-blur-sm"
        >
          <RefreshCw className={`h-3 w-3 mr-1.5 ${isAnalyzing ? "animate-spin" : ""}`} />
          Re-Analyze
        </Button>
      </div>

      <Tabs defaultValue="professional" className="w-full">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4.5 w-4.5 text-brand" />
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80 leading-none">
              AI Professional Profile
            </CardTitle>
          </div>
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-zinc-100/80 dark:bg-zinc-900/80">
            <TabsTrigger value="professional" className="text-xs">Summary</TabsTrigger>
            <TabsTrigger value="recruiter" className="text-xs">Recruiter Pitch</TabsTrigger>
            <TabsTrigger value="elevator" className="text-xs">Elevator</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="professional" className="mt-0 focus-visible:outline-none">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {summary.professionalSummary}
            </p>
          </TabsContent>

          <TabsContent value="recruiter" className="mt-0 focus-visible:outline-none">
            {pitchBullets.length > 0 ? (
              <ul className="space-y-3">
                {pitchBullets.map((bullet, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-brand shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {summary.recruiterPitch}
              </p>
            )}
          </TabsContent>

          <TabsContent value="elevator" className="mt-0 focus-visible:outline-none">
            <p className="text-sm text-foreground/90 font-medium italic border-l-2 border-brand/50 pl-4 py-1 leading-relaxed">
              &ldquo;{summary.elevatorPitch}&rdquo;
            </p>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}

// ==========================================
// 4. SKILLS OVERVIEW & BADGES
// ==========================================

interface SkillsOverviewProps {
  skills: {
    frontend: string[];
    backend: string[];
    mobile: string[];
    ai: string[];
    devops: string[];
    cloud: string[];
    database: string[];
  };
}

export function SkillsOverview({ skills }: SkillsOverviewProps) {
  const categories = [
    { title: "Frontend", items: skills.frontend, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { title: "Backend", items: skills.backend, color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    { title: "Mobile", items: skills.mobile, color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    { title: "AI / ML", items: skills.ai, color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    { title: "DevOps", items: skills.devops, color: "bg-pink-500/10 text-pink-500 border-pink-500/20" },
    { title: "Cloud Integration", items: skills.cloud, color: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20" },
    { title: "Database Systems", items: skills.database, color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
  ].filter((cat) => cat.items.length > 0);

  return (
    <Card className="border-border/40 bg-zinc-50/50 dark:bg-zinc-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Cpu className="h-4.5 w-4.5 text-brand" />
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80 leading-none">
            Detected Technology Stack
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          Languages, frameworks, and packages verified from your source codebases
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-2">
            <h5 className="text-xs font-semibold text-foreground/85">{cat.title}</h5>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((skill, sIdx) => (
                <Badge 
                  key={sIdx} 
                  variant="outline" 
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${cat.color}`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ==========================================
// 5. REPOSITORY SCORE CARD
// ==========================================

interface RepositoryScore {
  repoId: number;
  readmeQuality: number;
  activity: number;
  starsForks: number;
  health: number;
  overallScore: number;
}

interface RepositoryAnalysis {
  repoId: number;
  technicalSummary: string;
  resumeSummary: string;
  businessImpact: string;
  keyTechnologies: string[];
  suggestedImprovements: string[];
  readmeScore: number;
  readmeSuggestions: string[];
}

interface RepositoryScoreCardProps {
  scores: RepositoryScore[];
  analyses: RepositoryAnalysis[];
  repoNames: Record<number, string>; // Maps repoId -> Name
}

export function RepositoryScoreCard({ scores, analyses, repoNames }: RepositoryScoreCardProps) {
  return (
    <Card className="border-border/40 bg-zinc-50/50 dark:bg-zinc-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4.5 w-4.5 text-brand" />
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80 leading-none">
            Repository Quality Metrics
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          LLM-driven codebase assessment on documentation standards, code health, and structure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {scores.map((score) => {
          const name = repoNames[score.repoId] || `Repository #${score.repoId}`;
          const analysis = analyses.find((a) => a.repoId === score.repoId);
          
          return (
            <div 
              key={score.repoId}
              className="group rounded-xl border border-border/40 bg-background/50 dark:bg-zinc-900/40 p-4 transition-all duration-300 hover:border-brand/30 hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                  {name}
                </span>
                <Badge variant="outline" className="text-xs border-brand/20 bg-brand/5 text-brand rounded-md font-bold px-2 py-0.5">
                  Score: {score.overallScore}/100
                </Badge>
              </div>

              {/* Progress metrics */}
              <div className="grid gap-3 sm:grid-cols-3 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>README Quality</span>
                    <span className="font-semibold">{score.readmeQuality}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-border/20">
                    <div className="h-full bg-blue-500" style={{ width: `${score.readmeQuality}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Code Health</span>
                    <span className="font-semibold">{score.health}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-border/20">
                    <div className="h-full bg-emerald-500" style={{ width: `${score.health}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Activity Signals</span>
                    <span className="font-semibold">{score.activity}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-border/20">
                    <div className="h-full bg-purple-500" style={{ width: `${score.activity}%` }} />
                  </div>
                </div>
              </div>

              {analysis && (
                <div className="space-y-2.5 border-t border-border/30 pt-3">
                  <div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      Accomplishment Bullet
                    </span>
                    <p className="text-xs text-foreground/80 leading-relaxed mt-0.5">
                      {analysis.resumeSummary}
                    </p>
                  </div>
                  {analysis.readmeSuggestions.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-amber-500" />
                        README Improvement Ideas
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 mt-1 text-[11px] text-muted-foreground">
                        {analysis.readmeSuggestions.slice(0, 2).map((s, sIdx) => (
                          <li key={sIdx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

// ==========================================
// 6. RECOMMENDATION CARD
// ==========================================

interface RecommendationCardProps {
  recommendations: {
    strengths: string[];
    weaknesses: string[];
    missingPortfolioContent: string[];
  };
}

export function RecommendationCard({ recommendations }: RecommendationCardProps) {
  return (
    <Card className="border-border/40 bg-zinc-50/50 dark:bg-zinc-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Compass className="h-4.5 w-4.5 text-brand" />
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80 leading-none">
            Strategic Roadmap & Feedback
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          Actionable coaching on strengths, vulnerabilities, and target content development
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h5 className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">
            Verified Strengths
          </h5>
          <div className="space-y-2">
            {recommendations.strengths.map((str, idx) => (
              <div key={idx} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                <span className="text-emerald-500 font-bold">•</span>
                <span>{str}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 border-t border-border/30 pt-4">
          <h5 className="text-xs font-semibold text-amber-600 dark:text-amber-500 uppercase tracking-wider">
            Detected Vulnerabilities
          </h5>
          <div className="space-y-2">
            {recommendations.weaknesses.map((weak, idx) => (
              <div key={idx} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                <span className="text-amber-500 font-bold">•</span>
                <span>{weak}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 border-t border-border/30 pt-4">
          <h5 className="text-xs font-semibold text-blue-600 dark:text-blue-500 uppercase tracking-wider">
            Missing Portfolio Content
          </h5>
          <div className="space-y-2">
            {recommendations.missingPortfolioContent.map((item, idx) => (
              <div key={idx} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                <span className="text-blue-500 font-bold">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ==========================================
// 7. FEATURED PROJECTS PREVIEW
// ==========================================

interface FeaturedProjectsPreviewProps {
  suggestedRepoIds: number[];
  repoNames: Record<number, string>;
  repoDescriptions: Record<number, string | null>;
  repoStars: Record<number, number>;
  repoLanguages: Record<number, string | null>;
}

export function FeaturedProjectsPreview({
  suggestedRepoIds,
  repoNames,
  repoDescriptions,
  repoStars,
  repoLanguages,
}: FeaturedProjectsPreviewProps) {
  const validIds = suggestedRepoIds.filter((id) => repoNames[id] !== undefined);

  return (
    <Card className="border-border/40 bg-zinc-50/50 dark:bg-zinc-950/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4.5 w-4.5 text-brand" />
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80 leading-none">
            Recommended Featured Showcases
          </CardTitle>
        </div>
        <CardDescription className="text-xs">
          AI-recommended public codebases that highlight the highest technical depth
        </CardDescription>
      </CardHeader>
      <CardContent>
        {validIds.length === 0 ? (
          <p className="text-xs text-muted-foreground">No featured recommendations available.</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {validIds.map((id) => (
              <div 
                key={id}
                className="rounded-xl border border-border/40 bg-background p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">
                    {repoNames[id]}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {repoLanguages[id] && (
                      <Badge variant="outline" className="text-[10px] px-2 font-medium">
                        {repoLanguages[id]}
                      </Badge>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      ★ {repoStars[id] || 0}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {repoDescriptions[id] || "No repository description."}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
