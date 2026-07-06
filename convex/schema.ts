import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  githubProfiles: defineTable({
    userId: v.string(),
    githubId: v.number(),
    username: v.string(),
    displayName: v.union(v.string(), v.null()),
    avatarUrl: v.string(),
    bio: v.union(v.string(), v.null()),
    company: v.union(v.string(), v.null()),
    location: v.union(v.string(), v.null()),
    blog: v.union(v.string(), v.null()),
    email: v.union(v.string(), v.null()),
    followers: v.number(),
    following: v.number(),
    publicRepos: v.number(),
    publicGists: v.number(),
    githubCreatedAt: v.string(),
    lastSynced: v.number(),
  }).index("by_userId", ["userId"]),

  githubRepositories: defineTable({
    userId: v.string(),
    repoId: v.number(),
    name: v.string(),
    fullName: v.string(),
    description: v.union(v.string(), v.null()),
    isPrivate: v.boolean(),
    defaultBranch: v.string(),
    homepage: v.union(v.string(), v.null()),
    license: v.union(v.string(), v.null()),
    topics: v.array(v.string()),
    stars: v.number(),
    forks: v.number(),
    watchers: v.number(),
    openIssues: v.number(),
    primaryLanguage: v.union(v.string(), v.null()),
    languages: v.record(v.string(), v.number()),
    size: v.number(),
    isArchived: v.boolean(),
    isFork: v.boolean(),
    githubCreatedAt: v.string(),
    githubUpdatedAt: v.string(),
    githubPushedAt: v.string(),
    readmeRaw: v.union(v.string(), v.null()),
    readmeLastUpdated: v.union(v.number(), v.null()),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_and_repoId", ["userId", "repoId"]),

  repositoryPreferences: defineTable({
    userId: v.string(),
    repoId: v.number(),
    isHidden: v.boolean(),
    isFeatured: v.boolean(),
    featuredOrder: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_and_repoId", ["userId", "repoId"]),

  syncMetadata: defineTable({
    userId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("syncing"),
      v.literal("success"),
      v.literal("error")
    ),
    progress: v.number(), // 0 to 100
    error: v.union(v.string(), v.null()),
    lastSyncStart: v.union(v.number(), v.null()),
    lastSyncEnd: v.union(v.number(), v.null()),
  }).index("by_userId", ["userId"]),

  repositoryAnalysis: defineTable({
    userId: v.string(),
    repoId: v.number(),
    technicalSummary: v.string(),
    resumeSummary: v.string(),
    businessImpact: v.string(),
    keyTechnologies: v.array(v.string()),
    suggestedImprovements: v.array(v.string()),
    readmeScore: v.number(),
    readmeSuggestions: v.array(v.string()),
    readmeQualityScore: v.number(),
    repositoryHealthScore: v.number(),
    analyzedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_and_repoId", ["userId", "repoId"]),

  repositoryScores: defineTable({
    userId: v.string(),
    repoId: v.number(),
    readmeQuality: v.number(),
    activity: v.number(),
    starsForks: v.number(),
    health: v.number(),
    overallScore: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_and_repoId", ["userId", "repoId"]),

  detectedSkills: defineTable({
    userId: v.string(),
    frontend: v.array(v.string()),
    backend: v.array(v.string()),
    mobile: v.array(v.string()),
    ai: v.array(v.string()),
    devops: v.array(v.string()),
    cloud: v.array(v.string()),
    database: v.array(v.string()),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  careerSummary: defineTable({
    userId: v.string(),
    professionalSummary: v.string(),
    recruiterPitch: v.string(),
    elevatorPitch: v.string(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  aiRecommendations: defineTable({
    userId: v.string(),
    strengths: v.array(v.string()),
    weaknesses: v.array(v.string()),
    missingPortfolioContent: v.array(v.string()),
    suggestedFeaturedRepos: v.array(v.number()), // repoIds
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  aiSyncStatus: defineTable({
    userId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("running"),
      v.literal("success"),
      v.literal("error")
    ),
    progress: v.number(), // 0 to 100
    error: v.union(v.string(), v.null()),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),
});
