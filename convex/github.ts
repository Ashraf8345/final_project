import { action, mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { authComponent, createAuth } from "./auth";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  private: boolean;
  default_branch: string;
  homepage: string | null;
  license: { name: string } | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  language: string | null;
  languages_url: string;
  size: number;
  archived: boolean;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  owner: { login: string };
}

interface NormalizedRepo {
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
}

// ==========================================
// QUERIES
// ==========================================

export const getProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("githubProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .unique();
  },
});

export const getSyncStatus = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("syncMetadata")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .unique();
  },
});

export const getRepositories = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const repos = await ctx.db
      .query("githubRepositories")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();

    const prefs = await ctx.db
      .query("repositoryPreferences")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();

    const prefsMap = new Map(prefs.map((p) => [p.repoId, p]));

    return repos.map((repo) => {
      const pref = prefsMap.get(repo.repoId);
      return {
        ...repo,
        isHidden: pref?.isHidden ?? false,
        isFeatured: pref?.isFeatured ?? false,
        featuredOrder: pref?.featuredOrder ?? 0,
      };
    });
  },
});

export const getFeaturedRepositories = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const prefs = await ctx.db
      .query("repositoryPreferences")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();

    const featuredPrefs = prefs
      .filter((p) => p.isFeatured && !p.isHidden)
      .sort((a, b) => a.featuredOrder - b.featuredOrder);

    const result = [];
    for (const pref of featuredPrefs) {
      const repo = await ctx.db
        .query("githubRepositories")
        .withIndex("by_userId_and_repoId", (q) =>
          q.eq("userId", identity.subject).eq("repoId", pref.repoId)
        )
        .unique();
      if (repo) {
        result.push({
          ...repo,
          isFeatured: true,
          isHidden: false,
          featuredOrder: pref.featuredOrder,
        });
      }
    }
    return result;
  },
});

// ==========================================
// MUTATIONS
// ==========================================

export const updateSyncStatus = internalMutation({
  args: {
    userId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("syncing"),
      v.literal("success"),
      v.literal("error")
    ),
    progress: v.number(),
    error: v.union(v.string(), v.null()),
    start: v.optional(v.boolean()),
    end: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("syncMetadata")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    const now = Date.now();
    const patches: Record<string, unknown> = {
      status: args.status,
      progress: args.progress,
      error: args.error,
    };

    if (args.start) {
      patches.lastSyncStart = now;
    }
    if (args.end) {
      patches.lastSyncEnd = now;
    }

    if (existing) {
      await ctx.db.patch(existing._id, patches);
    } else {
      await ctx.db.insert("syncMetadata", {
        userId: args.userId,
        status: args.status,
        progress: args.progress,
        error: args.error,
        lastSyncStart: args.start ? now : null,
        lastSyncEnd: args.end ? now : null,
      });
    }
  },
});

export const storeSyncData = internalMutation({
  args: {
    userId: v.string(),
    profile: v.object({
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
    }),
    repositories: v.array(
      v.object({
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
      })
    ),
  },
  handler: async (ctx, args) => {
    // 1. Store profile
    const existingProfile = await ctx.db
      .query("githubProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    const profileData = {
      ...args.profile,
      userId: args.userId,
      lastSynced: Date.now(),
    };

    if (existingProfile) {
      await ctx.db.replace(existingProfile._id, profileData);
    } else {
      await ctx.db.insert("githubProfiles", profileData);
    }

    // 2. Fetch existing repositories to compute deletions and patch updates
    const existingRepos = await ctx.db
      .query("githubRepositories")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    const existingRepoMap = new Map(existingRepos.map((r) => [r.repoId, r]));
    const incomingRepoIds = new Set(args.repositories.map((r) => r.repoId));

    // Save incoming repos
    for (const repo of args.repositories) {
      const existing = existingRepoMap.get(repo.repoId);
      const repoData = {
        ...repo,
        userId: args.userId,
      };

      if (existing) {
        // Keep readme details if not updated, or use the incoming one
        const readmeUpdated = repo.readmeRaw !== null;
        await ctx.db.replace(existing._id, {
          ...repoData,
          readmeRaw: readmeUpdated ? repo.readmeRaw : existing.readmeRaw,
          readmeLastUpdated: readmeUpdated ? Date.now() : existing.readmeLastUpdated,
        });
      } else {
        await ctx.db.insert("githubRepositories", {
          ...repoData,
          readmeLastUpdated: repo.readmeRaw ? Date.now() : null,
        });
      }
    }

    // Delete repos no longer present on GitHub
    for (const oldRepo of existingRepos) {
      if (!incomingRepoIds.has(oldRepo.repoId)) {
        await ctx.db.delete(oldRepo._id);
        // Clean up preferences
        const pref = await ctx.db
          .query("repositoryPreferences")
          .withIndex("by_userId_and_repoId", (q) =>
            q.eq("userId", args.userId).eq("repoId", oldRepo.repoId)
          )
          .unique();
        if (pref) {
          await ctx.db.delete(pref._id);
        }
      }
    }
  },
});

export const setPreference = mutation({
  args: {
    repoId: v.number(),
    isHidden: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    // Verify repo ownership
    const repo = await ctx.db
      .query("githubRepositories")
      .withIndex("by_userId_and_repoId", (q) =>
        q.eq("userId", userId).eq("repoId", args.repoId)
      )
      .unique();

    if (!repo) throw new Error("Repository not found or access denied.");

    const existingPref = await ctx.db
      .query("repositoryPreferences")
      .withIndex("by_userId_and_repoId", (q) =>
        q.eq("userId", userId).eq("repoId", args.repoId)
      )
      .unique();

    if (existingPref) {
      const patches: Record<string, unknown> = {};
      if (args.isHidden !== undefined) patches.isHidden = args.isHidden;
      if (args.isFeatured !== undefined) {
        patches.isFeatured = args.isFeatured;
        if (args.isFeatured && !existingPref.isFeatured) {
          // Allocate featuredOrder
          const allPrefs = await ctx.db
            .query("repositoryPreferences")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .collect();
          const maxOrder = allPrefs.reduce((max, p) => (p.isFeatured ? Math.max(max, p.featuredOrder) : max), 0);
          patches.featuredOrder = maxOrder + 1;
        }
      }
      await ctx.db.patch(existingPref._id, patches);
    } else {
      let featuredOrder = 0;
      if (args.isFeatured) {
        const allPrefs = await ctx.db
          .query("repositoryPreferences")
          .withIndex("by_userId", (q) => q.eq("userId", userId))
          .collect();
        const maxOrder = allPrefs.reduce((max, p) => (p.isFeatured ? Math.max(max, p.featuredOrder) : max), 0);
        featuredOrder = maxOrder + 1;
      }

      await ctx.db.insert("repositoryPreferences", {
        userId,
        repoId: args.repoId,
        isHidden: args.isHidden ?? false,
        isFeatured: args.isFeatured ?? false,
        featuredOrder,
      });
    }
  },
});

export const reorderFeatured = mutation({
  args: {
    orderedRepoIds: v.array(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    for (let index = 0; index < args.orderedRepoIds.length; index++) {
      const repoId = args.orderedRepoIds[index];
      const pref = await ctx.db
        .query("repositoryPreferences")
        .withIndex("by_userId_and_repoId", (q) =>
          q.eq("userId", userId).eq("repoId", repoId)
        )
        .unique();

      if (pref) {
        await ctx.db.patch(pref._id, {
          isFeatured: true,
          featuredOrder: index + 1,
        });
      } else {
        await ctx.db.insert("repositoryPreferences", {
          userId,
          repoId,
          isHidden: false,
          isFeatured: true,
          featuredOrder: index + 1,
        });
      }
    }
  },
});

export const disconnectAccount = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    // Remove profile
    const profile = await ctx.db
      .query("githubProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (profile) await ctx.db.delete(profile._id);

    // Remove sync metadata
    const meta = await ctx.db
      .query("syncMetadata")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (meta) await ctx.db.delete(meta._id);

    // Remove repositories (paginated loop for safety if large)
    let repos = await ctx.db
      .query("githubRepositories")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .take(100);

    while (repos.length > 0) {
      for (const r of repos) {
        await ctx.db.delete(r._id);
      }
      repos = await ctx.db
        .query("githubRepositories")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .take(100);
    }

    // Remove preferences
    let prefs = await ctx.db
      .query("repositoryPreferences")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .take(100);

    while (prefs.length > 0) {
      for (const p of prefs) {
        await ctx.db.delete(p._id);
      }
      prefs = await ctx.db
        .query("repositoryPreferences")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .take(100);
    }
  },
});

// ==========================================
// ACTIONS
// ==========================================

export const syncAccount = action({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    // 1. Get auth headers containing current Bearer token
    const headers = await authComponent.getHeaders(ctx);
    const { auth } = await authComponent.getAuth(createAuth, ctx);

    // 2. Fetch user access token for GitHub
    let tokenResult;
    try {
      tokenResult = await auth.api.getAccessToken({
        headers,
        body: {
          providerId: "github",
        },
      });
    } catch (e) {
      const msg = (e as Error).message || "";
      if (msg.includes("Account not found") || msg.includes("not found")) {
        return { success: false, error: "not_linked", reposSynced: 0 };
      }
      throw e;
    }

    if (!tokenResult || !tokenResult.accessToken) {
      return { success: false, error: "not_linked", reposSynced: 0 };
    }

    const token = tokenResult.accessToken;

    const requestHeaders = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "Devora-SaaS",
      Accept: "application/vnd.github+json",
    };

    // Helper to fetch JSON from GitHub
    const fetchGitHub = async (url: string, acceptHeader?: string) => {
      const headersCopy: Record<string, string> = { ...requestHeaders };
      if (acceptHeader) {
        headersCopy.Accept = acceptHeader;
      }
      const response = await fetch(url, { headers: headersCopy });
      if (!response.ok) {
        if (response.status === 404) return null;
        if (response.status === 403 || response.status === 429) {
          throw new Error("GitHub API rate limit exceeded or access forbidden.");
        }
        throw new Error(`GitHub API returned error status: ${response.status}`);
      }
      return response;
    };

    try {
      // Step 1: Update status to syncing
      await ctx.runMutation(internal.github.updateSyncStatus, {
        userId,
        status: "syncing",
        progress: 10,
        error: null,
        start: true,
      });

      // Step 2: Fetch profile
      const rawProfile = await fetchGitHub("https://api.github.com/user");
      if (!rawProfile) throw new Error("Could not retrieve GitHub profile.");

      const parsedProfile = JSON.parse(await rawProfile.text());

      const normalizedProfile = {
        githubId: parsedProfile.id,
        username: parsedProfile.login,
        displayName: parsedProfile.name || null,
        avatarUrl: parsedProfile.avatar_url,
        bio: parsedProfile.bio || null,
        company: parsedProfile.company || null,
        location: parsedProfile.location || null,
        blog: parsedProfile.blog || null,
        email: parsedProfile.email || null,
        followers: parsedProfile.followers ?? 0,
        following: parsedProfile.following ?? 0,
        publicRepos: parsedProfile.public_repos ?? 0,
        publicGists: parsedProfile.public_gists ?? 0,
        githubCreatedAt: parsedProfile.created_at,
      };

      await ctx.runMutation(internal.github.updateSyncStatus, {
        userId,
        status: "syncing",
        progress: 25,
        error: null,
      });

      // Step 3: Fetch all public repositories
      let page = 1;
      const reposList: GitHubRepo[] = [];
      let hasMore = true;

      while (hasMore) {
        const url = `https://api.github.com/user/repos?visibility=public&per_page=100&page=${page}`;
        const res = await fetchGitHub(url);
        if (!res) break;

        const batch = JSON.parse(await res.text());
        if (!Array.isArray(batch) || batch.length === 0) {
          hasMore = false;
        } else {
          reposList.push(...(batch as GitHubRepo[]));
          page++;
          if (batch.length < 100) hasMore = false;
        }
      }

      await ctx.runMutation(internal.github.updateSyncStatus, {
        userId,
        status: "syncing",
        progress: 50,
        error: null,
      });

      // Step 4: Batch process repository details (languages & readmes)
      const normalizedRepos: NormalizedRepo[] = [];
      const batchSize = 5;

      for (let i = 0; i < reposList.length; i += batchSize) {
        const batch = reposList.slice(i, i + batchSize);

        const batchPromises = batch.map(async (repo) => {
          // Fetch languages
          let languages: Record<string, number> = {};
          try {
            const langRes = await fetchGitHub(repo.languages_url);
            if (langRes) {
              languages = JSON.parse(await langRes.text());
            }
          } catch (e) {
            console.error(`Failed to fetch languages for ${repo.name}:`, e);
          }

          // Fetch README
          let readmeRaw: string | null = null;
          try {
            const readmeUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`;
            // Accept raw media type to get Markdown text
            const readmeRes = await fetchGitHub(readmeUrl, "application/vnd.github.raw");
            if (readmeRes) {
              readmeRaw = await readmeRes.text();
            }
          } catch (e) {
            console.error(`Failed to fetch README for ${repo.name}:`, e);
          }

          return {
            repoId: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description || null,
            isPrivate: repo.private,
            defaultBranch: repo.default_branch,
            homepage: repo.homepage || null,
            license: repo.license?.name || null,
            topics: repo.topics || [],
            stars: repo.stargazers_count ?? 0,
            forks: repo.forks_count ?? 0,
            watchers: repo.watchers_count ?? 0,
            openIssues: repo.open_issues_count ?? 0,
            primaryLanguage: repo.language || null,
            languages,
            size: repo.size ?? 0,
            isArchived: repo.archived ?? false,
            isFork: repo.fork ?? false,
            githubCreatedAt: repo.created_at,
            githubUpdatedAt: repo.updated_at,
            githubPushedAt: repo.pushed_at,
            readmeRaw,
          };
        });

        const batchResults = await Promise.all(batchPromises);
        normalizedRepos.push(...batchResults);

        // Update progress dynamically
        const processedCount = i + batch.length;
        const progressPercentage = Math.round(50 + (processedCount / reposList.length) * 45);
        await ctx.runMutation(internal.github.updateSyncStatus, {
          userId,
          status: "syncing",
          progress: progressPercentage,
          error: null,
        });
      }

      // Step 5: Save all data to database in a single transaction
      await ctx.runMutation(internal.github.storeSyncData, {
        userId,
        profile: normalizedProfile,
        repositories: normalizedRepos,
      });

      // Step 6: Sync Success
      await ctx.runMutation(internal.github.updateSyncStatus, {
        userId,
        status: "success",
        progress: 100,
        error: null,
        end: true,
      });

      return { success: true, reposSynced: normalizedRepos.length };
    } catch (err) {
      console.error("GitHub Synchronization Action failed:", err);
      // Record error mutation
      await ctx.runMutation(internal.github.updateSyncStatus, {
        userId,
        status: "error",
        progress: 0,
        error: (err as Error).message || "An unexpected error occurred during sync.",
        end: true,
      });
      throw err;
    }
  },
});
