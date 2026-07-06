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
});
