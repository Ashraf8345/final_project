import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ==========================================
// QUERIES
// ==========================================

export const getDraft = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const userId = identity.subject;

    // Check if draft already exists
    const draft = await ctx.db
      .query("studioDrafts")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (draft) {
      return JSON.parse(draft.stateJson);
    }

    return null;
  },
});

// ==========================================
// MUTATIONS
// ==========================================

export const initializeDraft = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    // Double check if draft already exists
    const existing = await ctx.db
      .query("studioDrafts")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      return JSON.parse(existing.stateJson);
    }

    // ------------------------------------------
    // INITIAL DRAFT GENERATION
    // ------------------------------------------
    // Initialize a beautiful default layout based on user's real cached data
    const profile = await ctx.db
      .query("githubProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    const summary = await ctx.db
      .query("careerSummary")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    const skills = await ctx.db
      .query("detectedSkills")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    const repos = await ctx.db
      .query("githubRepositories")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    // Take top 4 repos sorted by stars as default projects
    const topRepos = repos
      .sort((a, b) => b.stars - a.stars)
      .slice(0, 4)
      .map((r) => r.repoId);

    const userName = profile?.displayName || profile?.username || "Developer";
    const bioText = profile?.bio || "Software Engineer & Builder";
    const avatar = profile?.avatarUrl || "";

    const studioId = Math.random().toString(36).substr(2, 9);

    const defaultTheme = {
      presetName: "sleek-dark",
      accentColor: "hsl(250, 95%, 60%)",
      fontFamily: "Inter",
      spacing: 6,
      isDark: true,
    };

    const initialSections = [
      { id: "sec-hero", name: "Hero", order: 0, isVisible: true, isPinned: true },
      { id: "sec-about", name: "About", order: 1, isVisible: true, isPinned: false },
      { id: "sec-skills", name: "Skills", order: 2, isVisible: true, isPinned: false },
      { id: "sec-projects", name: "Projects", order: 3, isVisible: true, isPinned: false },
      { id: "sec-contact", name: "Contact", order: 4, isVisible: true, isPinned: false },
    ];

    const initialBlocks = [
      // Hero Block
      {
        id: "blk-hero-1",
        sectionId: "sec-hero",
        type: "hero",
        content: {
          title: `Hi, I'm ${userName}`,
          subtitle: bioText,
          ctaText: "Explore Projects",
          ctaUrl: "#projects",
          avatarUrl: avatar,
        },
        style: {
          textAlign: { desktop: "center", mobile: "center" },
          paddingTop: { desktop: 16, mobile: 10 },
          paddingBottom: { desktop: 16, mobile: 10 },
        },
        order: 0,
        isVisible: true,
      },
      // About Block
      {
        id: "blk-about-1",
        sectionId: "sec-about",
        type: "about",
        content: {
          title: "About Me",
          text: summary?.professionalSummary || "I am a developer who loves building web applications, optimizing workflows, and writing clean, scalable code.",
        },
        style: {
          textAlign: { desktop: "left", mobile: "left" },
          paddingTop: { desktop: 12, mobile: 8 },
          paddingBottom: { desktop: 12, mobile: 8 },
        },
        order: 0,
        isVisible: true,
      },
      // Skills Block
      {
        id: "blk-skills-1",
        sectionId: "sec-skills",
        type: "skills",
        content: {
          title: "Core Expertise",
          layout: "categories",
          frontend: skills?.frontend?.slice(0, 6) || [],
          backend: skills?.backend?.slice(0, 6) || [],
          devops: skills?.devops?.slice(0, 4) || [],
        },
        style: {
          paddingTop: { desktop: 12, mobile: 8 },
          paddingBottom: { desktop: 12, mobile: 8 },
        },
        order: 0,
        isVisible: true,
      },
      // Projects Block
      {
        id: "blk-projects-1",
        sectionId: "sec-projects",
        type: "projects",
        content: {
          title: "Featured Works",
          projectIds: topRepos,
          showLanguages: true,
          showStars: true,
        },
        style: {
          paddingTop: { desktop: 16, mobile: 10 },
          paddingBottom: { desktop: 16, mobile: 10 },
        },
        order: 0,
        isVisible: true,
      },
      // Contact Block
      {
        id: "blk-contact-1",
        sectionId: "sec-contact",
        type: "contact",
        content: {
          title: "Get In Touch",
          description: "Have an interesting project or opportunities? I'd love to chat.",
          email: profile?.email || "",
          githubUrl: profile?.username ? `https://github.com/${profile.username}` : "",
          linkedinUrl: "",
        },
        style: {
          textAlign: { desktop: "center", mobile: "center" },
          paddingTop: { desktop: 12, mobile: 8 },
          paddingBottom: { desktop: 12, mobile: 8 },
        },
        order: 0,
        isVisible: true,
      },
    ];

    const defaultState = {
      studioId,
      name: `${userName}'s Workspace`,
      theme: defaultTheme,
      sections: initialSections,
      blocks: initialBlocks,
      preferences: {
        device: "desktop",
        isPreviewMode: false,
        activeTab: "layers",
        showGrid: true,
      },
    };

    // Store the newly created draft in the database
    await ctx.db.insert("studioDrafts", {
      studioId,
      userId,
      stateJson: JSON.stringify(defaultState),
      updatedAt: Date.now(),
    });

    return defaultState;
  },
});

export const saveDraft = mutation({
  args: {
    studioId: v.string(),
    stateJson: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    const existing = await ctx.db
      .query("studioDrafts")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        stateJson: args.stateJson,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("studioDrafts", {
        studioId: args.studioId,
        userId,
        stateJson: args.stateJson,
        updatedAt: Date.now(),
      });
    }
  },
});

export const publishStudio = mutation({
  args: {
    studioId: v.string(),
    stateJson: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;
    const parsedState = JSON.parse(args.stateJson);

    // 1. Reconcile studios metadata record
    const existingStudio = await ctx.db
      .query("studios")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (existingStudio) {
      await ctx.db.patch(existingStudio._id, {
        name: parsedState.name,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("studios", {
        userId,
        name: parsedState.name,
        type: "portfolio",
        themeId: null,
        preferences: parsedState.preferences,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    // 2. Reconcile sections
    const existingSections = await ctx.db
      .query("studioSections")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    for (const sec of existingSections) {
      await ctx.db.delete(sec._id);
    }

    for (const sec of parsedState.sections) {
      await ctx.db.insert("studioSections", {
        studioId: args.studioId,
        userId,
        name: sec.name,
        order: sec.order,
        isVisible: sec.isVisible,
        isPinned: sec.isPinned,
        createdAt: Date.now(),
      });
    }

    // 3. Reconcile blocks
    const existingBlocks = await ctx.db
      .query("studioBlocks")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    for (const blk of existingBlocks) {
      await ctx.db.delete(blk._id);
    }

    for (const blk of parsedState.blocks) {
      await ctx.db.insert("studioBlocks", {
        studioId: args.studioId,
        userId,
        sectionId: blk.sectionId,
        type: blk.type,
        content: blk.content,
        style: blk.style,
        order: blk.order,
        isVisible: blk.isVisible,
        createdAt: Date.now(),
      });
    }

    // 4. Reconcile theme preset
    const existingTheme = await ctx.db
      .query("themes")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    if (existingTheme) {
      await ctx.db.patch(existingTheme._id, {
        presetName: parsedState.theme.presetName,
        accentColor: parsedState.theme.accentColor,
        fontFamily: parsedState.theme.fontFamily,
        spacing: parsedState.theme.spacing,
        isDark: parsedState.theme.isDark,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("themes", {
        studioId: args.studioId,
        userId,
        presetName: parsedState.theme.presetName,
        accentColor: parsedState.theme.accentColor,
        fontFamily: parsedState.theme.fontFamily,
        spacing: parsedState.theme.spacing,
        isDark: parsedState.theme.isDark,
        updatedAt: Date.now(),
      });
    }

    // 5. Append checkpoint version in studioVersions
    const versions = await ctx.db
      .query("studioVersions")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .collect();

    const nextVer = versions.length + 1;
    await ctx.db.insert("studioVersions", {
      studioId: args.studioId,
      userId,
      versionNumber: nextVer,
      snapshotJson: args.stateJson,
      commitMessage: `Version ${nextVer} checkpoint save`,
      createdAt: Date.now(),
    });
  },
});

// ==========================================
// FILE STORAGE API
// ==========================================

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    return await ctx.storage.generateUploadUrl();
  },
});

export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const getStorageUrl = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
