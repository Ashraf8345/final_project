import { action, query, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { AnalysisService } from "../src/lib/ai";

// ==========================================
// PUBLIC QUERIES
// ==========================================

export const getAnalysisStatus = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return await ctx.db
      .query("aiSyncStatus")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .unique();
  },
});

export const getAnalysisResults = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const userId = identity.subject;

    const summary = await ctx.db
      .query("careerSummary")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    const skills = await ctx.db
      .query("detectedSkills")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    const recommendations = await ctx.db
      .query("aiRecommendations")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    const repoScores = await ctx.db
      .query("repositoryScores")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const repoAnalyses = await ctx.db
      .query("repositoryAnalysis")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    return {
      summary: summary
        ? {
            professionalSummary: summary.professionalSummary,
            recruiterPitch: summary.recruiterPitch,
            elevatorPitch: summary.elevatorPitch,
            updatedAt: summary.updatedAt,
          }
        : null,
      skills: skills
        ? {
            frontend: skills.frontend,
            backend: skills.backend,
            mobile: skills.mobile,
            ai: skills.ai,
            devops: skills.devops,
            cloud: skills.cloud,
            database: skills.database,
          }
        : null,
      recommendations: recommendations
        ? {
            strengths: recommendations.strengths,
            weaknesses: recommendations.weaknesses,
            missingPortfolioContent: recommendations.missingPortfolioContent,
            suggestedFeaturedRepos: recommendations.suggestedFeaturedRepos,
          }
        : null,
      repoScores: repoScores.map((s) => ({
        repoId: s.repoId,
        readmeQuality: s.readmeQuality,
        activity: s.activity,
        starsForks: s.starsForks,
        health: s.health,
        overallScore: s.overallScore,
      })),
      repoAnalyses: repoAnalyses.map((a) => ({
        repoId: a.repoId,
        technicalSummary: a.technicalSummary,
        resumeSummary: a.resumeSummary,
        businessImpact: a.businessImpact,
        keyTechnologies: a.keyTechnologies,
        suggestedImprovements: a.suggestedImprovements,
        readmeScore: a.readmeScore,
        readmeSuggestions: a.readmeSuggestions,
      })),
    };
  },
});

// ==========================================
// INTERNAL QUERIES & MUTATIONS (called by actions)
// ==========================================

export const getUserProfile = internalQuery({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("githubProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();
  },
});

export const getUserRepositories = internalQuery({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("githubRepositories")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const updateStatus = internalMutation({
  args: {
    userId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("running"),
      v.literal("success"),
      v.literal("error")
    ),
    progress: v.number(),
    error: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("aiSyncStatus")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        status: args.status,
        progress: args.progress,
        error: args.error,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("aiSyncStatus", {
        userId: args.userId,
        status: args.status,
        progress: args.progress,
        error: args.error,
        updatedAt: Date.now(),
      });
    }
  },
});

export const storeRepoAnalysis = internalMutation({
  args: {
    userId: v.string(),
    repoId: v.number(),
    analysis: v.object({
      technicalSummary: v.string(),
      resumeSummary: v.string(),
      businessImpact: v.string(),
      keyTechnologies: v.array(v.string()),
      suggestedImprovements: v.array(v.string()),
      readmeScore: v.number(),
      readmeSuggestions: v.array(v.string()),
      readmeQualityScore: v.number(),
      repositoryHealthScore: v.number(),
    }),
    scores: v.object({
      readmeQuality: v.number(),
      activity: v.number(),
      starsForks: v.number(),
      health: v.number(),
      overallScore: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    // 1. Save or Update Analysis
    const existingAnalysis = await ctx.db
      .query("repositoryAnalysis")
      .withIndex("by_userId_and_repoId", (q) =>
        q.eq("userId", args.userId).eq("repoId", args.repoId)
      )
      .unique();

    if (existingAnalysis) {
      await ctx.db.patch(existingAnalysis._id, {
        ...args.analysis,
        analyzedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("repositoryAnalysis", {
        userId: args.userId,
        repoId: args.repoId,
        ...args.analysis,
        analyzedAt: Date.now(),
      });
    }

    // 2. Save or Update Score
    const existingScore = await ctx.db
      .query("repositoryScores")
      .withIndex("by_userId_and_repoId", (q) =>
        q.eq("userId", args.userId).eq("repoId", args.repoId)
      )
      .unique();

    if (existingScore) {
      await ctx.db.patch(existingScore._id, args.scores);
    } else {
      await ctx.db.insert("repositoryScores", {
        userId: args.userId,
        repoId: args.repoId,
        ...args.scores,
      });
    }
  },
});

export const storeAggregatedAnalysis = internalMutation({
  args: {
    userId: v.string(),
    skills: v.object({
      frontend: v.array(v.string()),
      backend: v.array(v.string()),
      mobile: v.array(v.string()),
      ai: v.array(v.string()),
      devops: v.array(v.string()),
      cloud: v.array(v.string()),
      database: v.array(v.string()),
    }),
    career: v.object({
      professionalSummary: v.string(),
      recruiterPitch: v.string(),
      elevatorPitch: v.string(),
    }),
    recommendations: v.object({
      strengths: v.array(v.string()),
      weaknesses: v.array(v.string()),
      missingPortfolioContent: v.array(v.string()),
      suggestedFeaturedRepos: v.array(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    // 1. Save Skills
    const existingSkills = await ctx.db
      .query("detectedSkills")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    if (existingSkills) {
      await ctx.db.patch(existingSkills._id, {
        ...args.skills,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("detectedSkills", {
        userId: args.userId,
        ...args.skills,
        updatedAt: Date.now(),
      });
    }

    // 2. Save Career Summary
    const existingCareer = await ctx.db
      .query("careerSummary")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    if (existingCareer) {
      await ctx.db.patch(existingCareer._id, {
        ...args.career,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("careerSummary", {
        userId: args.userId,
        ...args.career,
        updatedAt: Date.now(),
      });
    }

    // 3. Save Recommendations
    const existingRecs = await ctx.db
      .query("aiRecommendations")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    if (existingRecs) {
      await ctx.db.patch(existingRecs._id, {
        ...args.recommendations,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("aiRecommendations", {
        userId: args.userId,
        ...args.recommendations,
        updatedAt: Date.now(),
      });
    }
  },
});

// ==========================================
// ACTIONS (Running LLM queries via SDK)
// ==========================================

export const startAnalysis = action({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const userId = identity.subject;

    // 1. Update status to Running
    await ctx.runMutation(internal.ai.updateStatus, {
      userId,
      status: "running",
      progress: 5,
      error: null,
    });

    try {
      // 2. Fetch profile data
      const profile = await ctx.runQuery(internal.ai.getUserProfile, { userId });
      if (!profile) {
        throw new Error("GitHub profile not synchronized. Please link and sync your GitHub account first.");
      }

      // 3. Fetch public repositories
      const repos = await ctx.runQuery(internal.ai.getUserRepositories, { userId });
      const activeRepos = repos.filter((r) => !r.isPrivate); // Only analyze public repos for recruiter quality
      
      if (activeRepos.length === 0) {
        throw new Error("No public repositories found to analyze.");
      }

      // Sort by stars descending and take top 6 to prevent rate limits and model token caps
      const sortedRepos = [...activeRepos].sort((a, b) => b.stars - a.stars).slice(0, 6);

      await ctx.runMutation(internal.ai.updateStatus, {
        userId,
        status: "running",
        progress: 15,
        error: null,
      });

      const repoAnalyses: Array<{
        name: string;
        primaryLanguage: string | null;
        technicalSummary: string;
        resumeSummary: string;
        businessImpact: string;
      }> = [];

      const repoScores: Array<{
        name: string;
        repoId: number;
        overallScore: number;
        technicalSummary: string;
        readmeScore: number;
      }> = [];

      const baseProgress = 15;
      const progressDelta = 50 / sortedRepos.length;

      // 4. Iterate and analyze each codebase
      for (let i = 0; i < sortedRepos.length; i++) {
        const repo = sortedRepos[i];

        const analysis = await AnalysisService.analyzeRepository({
          name: repo.name,
          description: repo.description,
          readme: repo.readmeRaw,
          primaryLanguage: repo.primaryLanguage,
          topics: repo.topics,
          stars: repo.stars,
          forks: repo.forks,
        });

        // Compute aggregate overall project score out of 100
        const calculatedOverall = Math.round(
          analysis.readmeQualityScore * 0.3 +
            analysis.repositoryHealthScore * 0.3 +
            Math.min(repo.stars * 5, 20) +
            Math.min(repo.forks * 10, 20)
        );

        // Store repository specific structured insights in DB
        await ctx.runMutation(internal.ai.storeRepoAnalysis, {
          userId,
          repoId: repo.repoId,
          analysis: {
            technicalSummary: analysis.technicalSummary,
            resumeSummary: analysis.resumeSummary,
            businessImpact: analysis.businessImpact,
            keyTechnologies: analysis.keyTechnologies,
            suggestedImprovements: analysis.suggestedImprovements,
            readmeScore: analysis.readmeScore,
            readmeSuggestions: analysis.readmeSuggestions,
            readmeQualityScore: analysis.readmeQualityScore,
            repositoryHealthScore: analysis.repositoryHealthScore,
          },
          scores: {
            readmeQuality: analysis.readmeQualityScore,
            activity: repo.forks * 2 + 10,
            starsForks: repo.stars + repo.forks,
            health: analysis.repositoryHealthScore,
            overallScore: calculatedOverall,
          },
        });

        repoAnalyses.push({
          name: repo.name,
          primaryLanguage: repo.primaryLanguage,
          technicalSummary: analysis.technicalSummary,
          resumeSummary: analysis.resumeSummary,
          businessImpact: analysis.businessImpact,
        });

        repoScores.push({
          name: repo.name,
          repoId: repo.repoId,
          overallScore: calculatedOverall,
          technicalSummary: analysis.technicalSummary,
          readmeScore: analysis.readmeScore,
        });

        await ctx.runMutation(internal.ai.updateStatus, {
          userId,
          status: "running",
          progress: Math.round(baseProgress + (i + 1) * progressDelta),
          error: null,
        });
      }

      // 5. Generate Skills Breakdown
      await ctx.runMutation(internal.ai.updateStatus, {
        userId,
        status: "running",
        progress: 70,
        error: null,
      });

      const skillInputs = sortedRepos.map((r) => ({
        repoName: r.name,
        languages: Object.keys(r.languages),
        topics: r.topics,
        readmeSnippets: r.readmeRaw ? [r.readmeRaw.substring(0, 1000)] : [],
      }));

      const skillsResult = await AnalysisService.generateSkillsOverview(skillInputs);

      // 6. Generate Profile-Level Career Summary
      await ctx.runMutation(internal.ai.updateStatus, {
        userId,
        status: "running",
        progress: 80,
        error: null,
      });

      const careerResult = await AnalysisService.generateCareerSummary(
        {
          username: profile.username,
          displayName: profile.displayName,
          bio: profile.bio,
          followers: profile.followers,
          publicRepos: profile.publicRepos,
        },
        repoAnalyses
      );

      // 7. Generate Portfolio recommendations
      await ctx.runMutation(internal.ai.updateStatus, {
        userId,
        status: "running",
        progress: 90,
        error: null,
      });

      const recommendationsResult = await AnalysisService.generateRecommendations(repoScores, {
        frontend: skillsResult.frontend,
        backend: skillsResult.backend,
        DevOps: skillsResult.devops,
      });

      // Find suggested repoIds based on names
      const suggestedRepoIds: number[] = [];
      for (const name of recommendationsResult.suggestedFeaturedRepos) {
        const found = activeRepos.find((r) => r.name.toLowerCase() === name.toLowerCase());
        if (found) {
          suggestedRepoIds.push(found.repoId);
        }
      }

      // 8. Store aggregated analysis results
      await ctx.runMutation(internal.ai.storeAggregatedAnalysis, {
        userId,
        skills: skillsResult,
        career: careerResult,
        recommendations: {
          strengths: recommendationsResult.strengths,
          weaknesses: recommendationsResult.weaknesses,
          missingPortfolioContent: recommendationsResult.missingPortfolioContent,
          suggestedFeaturedRepos: suggestedRepoIds,
        },
      });

      // 9. Update status to Success
      await ctx.runMutation(internal.ai.updateStatus, {
        userId,
        status: "success",
        progress: 100,
        error: null,
      });

      return { success: true };
    } catch (e) {
      const err = e as Error;
      console.error("AI Analysis Engine Error:", err);
      await ctx.runMutation(internal.ai.updateStatus, {
        userId,
        status: "error",
        progress: 100,
        error: err.message || "An unexpected error occurred during AI analysis.",
      });
      return { success: false, error: err.message };
    }
  },
});

export const processPrompt = action({
  args: {
    inputText: v.string(),
    promptTemplate: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const outputText = await AnalysisService.processPrompt(args.inputText, args.promptTemplate);
    return { outputText };
  },
});
