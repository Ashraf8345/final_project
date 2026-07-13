/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabling explicit-any rule is justified in this canvas file to allow dynamic type assertions for dynamic block renderers.
"use client";

import * as React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { StudioBlock } from "../types";
import { useStudio } from "../engines/studio-context";
import { UpdateTextCommand } from "../engines/commands";
import { toast } from "sonner";
import {
  Sparkles,
  Terminal,
  Mail,
  ExternalLink,
  ShieldCheck,
  MessageSquare,
  AlertCircle,
  Minus,
  Quote as QuoteIcon,
  Video as VideoIcon,
  Image as ImageIcon,
  Plus,
  Trash2,
  Users,
  LayoutGrid,
  Calendar,
  Maximize,
  Play,
  Upload,
} from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";

// ==========================================
// 1. INLINE TEXT WRAPPER
// ==========================================

export function InlineText({
  value,
  blockId,
  field,
  className,
  as: Component = "span",
  placeholder = "Click to type...",
}: {
  value: string;
  blockId: string;
  field: string;
  className?: string;
  as?: React.ElementType;
  placeholder?: string;
}) {
  const { runCommand, state } = useStudio();
  const elementRef = React.useRef<HTMLSpanElement>(null);
  const [isEmpty, setIsEmpty] = React.useState(!value);

  const block = state?.blocks.find((b) => b.id === blockId);
  const device = state?.preferences.device || "desktop";
  const customColor = block ? (block.style.color as any)?.[device] : undefined;

  const hasCustomColor = !!customColor;
  const isTextColorClass = customColor?.startsWith("text-");

  const cleanedClass = className
    ? className
        .split(" ")
        .filter((cls) => !hasCustomColor || !cls.startsWith("text-"))
        .join(" ")
    : "";

  const finalStyle: React.CSSProperties = {};
  if (hasCustomColor && !isTextColorClass) {
    finalStyle.color = customColor;
  }

  // Synchronize initial value from props to ref when value changes (e.g. undo/redo)
  React.useEffect(() => {
    if (elementRef.current && elementRef.current.textContent !== value) {
      elementRef.current.textContent = value;
      setIsEmpty(!value);
    }
  }, [value]);

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.textContent || "";
    setIsEmpty(!text);
    if (text !== value) {
      runCommand(new UpdateTextCommand(blockId, field, text));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    const text = e.currentTarget.textContent || "";
    setIsEmpty(!text);
  };

  return (
    <Component
      ref={elementRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      style={finalStyle}
      className={`outline-none focus:ring-2 focus:ring-brand/40 rounded-md px-1 transition-all ${
        isEmpty && !hasCustomColor ? "text-muted-foreground/60 italic" : isEmpty ? "italic opacity-60" : ""
      } ${cleanedClass} ${hasCustomColor && isTextColorClass ? customColor : ""}`}
      data-placeholder={placeholder}
    />
  );
}

// ==========================================
// 2. CANVAS BLOCK RENDERERS
// ==========================================

// HERO BLOCK RENDERER
export function HeroCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const avatar = content.avatarUrl || "";
  const { runCommand } = useStudio();
  const generateUploadUrl = useMutation(api.studio.generateUploadUrl);
  const getStorageUrl = useMutation(api.studio.getStorageUrl);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const droppedUrl = e.dataTransfer.getData("text/plain");
    const dragType = e.dataTransfer.getData("type");
    if (droppedUrl && dragType === "image-asset") {
      runCommand(new UpdateTextCommand(block.id, "avatarUrl", droppedUrl));
      toast.success("Avatar updated from library!");
      return;
    }

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      toast.info("Uploading avatar to storage...");
      try {
        const localUrl = URL.createObjectURL(file);
        runCommand(new UpdateTextCommand(block.id, "avatarUrl", localUrl));

        const uploadUrl = await generateUploadUrl();
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await response.json();
        const permanentUrl = await getStorageUrl({ storageId });
        if (permanentUrl) {
          runCommand(new UpdateTextCommand(block.id, "avatarUrl", permanentUrl));
          toast.success("Avatar uploaded successfully!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload avatar.");
      }
    }
  };

  const device = useStudio().state.preferences.device;
  const align = (block.style.textAlign as any)?.[device] || "left";
  const alignClass = 
    align === "center" ? "items-center text-center" :
    align === "right" ? "items-end text-right" :
    "items-start text-left";

  return (
    <div className={`flex flex-col justify-center space-y-4 py-8 w-full ${alignClass}`}>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative group/avatar cursor-pointer h-20 w-20 rounded-full border border-border/60 overflow-hidden mb-2"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="h-full w-full object-cover shadow-sm group-hover/avatar:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/40 text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all">
            <Plus className="h-5 w-5 opacity-40" />
          </div>
        )}
        {/* Click to upload direct overlay */}
        {isSelected && (
          <label
            htmlFor={`canvas-avatar-uploader-${block.id}`}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Upload className="h-4 w-4" />
          </label>
        )}
        <input
          type="file"
          id={`canvas-avatar-uploader-${block.id}`}
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            toast.info("Uploading avatar image...");
            try {
              const localUrl = URL.createObjectURL(file);
              runCommand(new UpdateTextCommand(block.id, "avatarUrl", localUrl));

              const uploadUrl = await generateUploadUrl();
              const response = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
              });
              const { storageId } = await response.json();
              const permanentUrl = await getStorageUrl({ storageId });
              if (permanentUrl) {
                runCommand(new UpdateTextCommand(block.id, "avatarUrl", permanentUrl));
                toast.success("Avatar uploaded!");
              }
            } catch {
              toast.error("Upload failed.");
            }
          }}
        />
      </div>
      <InlineText
        value={content.title || ""}
        blockId={block.id}
        field="title"
        as="h1"
        className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl"
        placeholder="Enter your name"
      />
      <InlineText
        value={content.subtitle || ""}
        blockId={block.id}
        field="subtitle"
        as="p"
        className="text-lg text-muted-foreground max-w-xl font-normal leading-relaxed"
        placeholder="Enter your bio or headline"
      />
      <div className="pt-2">
        <button className="h-10 px-6 rounded-lg bg-brand text-brand-foreground font-medium text-sm hover:opacity-90 shadow-sm transition-all">
          <InlineText
            value={content.ctaText || "Explore Projects"}
            blockId={block.id}
            field="ctaText"
            placeholder="CTA button text"
          />
        </button>
      </div>
    </div>
  );
}

// ABOUT BLOCK RENDERER
export function AboutCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const device = useStudio().state.preferences.device;
  const align = (block.style.textAlign as any)?.[device] || "left";
  const alignClass = 
    align === "center" ? "items-center text-center" :
    align === "right" ? "items-end text-right" :
    "items-start text-left";

  return (
    <div className={`space-y-3 py-6 flex flex-col w-full ${alignClass}`}>
      <InlineText
        value={content.title || "About Me"}
        blockId={block.id}
        field="title"
        as="h2"
        className="text-2xl font-bold tracking-tight text-foreground"
        placeholder="Section Title"
      />
      <InlineText
        value={content.text || ""}
        blockId={block.id}
        field="text"
        as="p"
        className="text-sm text-foreground/80 leading-relaxed font-normal"
        placeholder="Describe yourself, your work, and your goals..."
      />
    </div>
  );
}

// SKILLS RENDERER
export function SkillsCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const frontend = (content.frontend as string[]) || [];
  const backend = (content.backend as string[]) || [];
  const devops = (content.devops as string[]) || [];
  const { runCommand } = useStudio();

  const device = useStudio().state.preferences.device;
  const align = (block.style.textAlign as any)?.[device] || "left";
  const alignClass = 
    align === "center" ? "items-center text-center" :
    align === "right" ? "items-end text-right" :
    "items-start text-left";

  return (
    <div className={`space-y-4 py-6 flex flex-col w-full ${alignClass}`}>
      <InlineText
        value={content.title || "Skills"}
        blockId={block.id}
        field="title"
        as="h2"
        className="text-2xl font-bold tracking-tight text-foreground"
        placeholder="Skills Section Title"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {/* Frontend */}
        <div className="border border-border/40 rounded-xl bg-zinc-50/20 dark:bg-zinc-900/10 p-4 space-y-3 relative group/skillcol">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Frontend</h3>
            {isSelected && (
              <button
                onClick={() => runCommand(new UpdateTextCommand(block.id, "frontend", [...frontend, "New Skill"]))}
                className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-border/40 text-[9px] font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 text-foreground transition-all flex items-center gap-0.5"
              >
                <Plus className="h-2 w-2" /> Add
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {frontend.map((s, i) => (
              <div key={s + i} className="group/badge relative flex items-center">
                <InlineText
                  value={s}
                  blockId={block.id}
                  field={`frontend.${i}`}
                  className="px-2 py-0.5 rounded-md text-xs font-medium border border-foreground/10 bg-foreground/10 text-foreground pr-5 cursor-text min-w-[50px] inline-block"
                />
                {isSelected && (
                  <button
                    onClick={() => {
                      const next = frontend.filter((_, idx) => idx !== i);
                      runCommand(new UpdateTextCommand(block.id, "frontend", next));
                    }}
                    className="absolute right-1 text-3xs text-red-500 hover:text-red-700 font-bold transition-all focus:outline-none"
                    title="Remove Skill"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {frontend.length === 0 && (
              <p className="text-3xs italic text-muted-foreground">No frontend skills configured</p>
            )}
          </div>
        </div>

        {/* Backend */}
        <div className="border border-border/40 rounded-xl bg-zinc-50/20 dark:bg-zinc-900/10 p-4 space-y-3 relative group/skillcol">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Backend</h3>
            {isSelected && (
              <button
                onClick={() => runCommand(new UpdateTextCommand(block.id, "backend", [...backend, "New Skill"]))}
                className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-border/40 text-[9px] font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 text-foreground transition-all flex items-center gap-0.5"
              >
                <Plus className="h-2 w-2" /> Add
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {backend.map((s, i) => (
              <div key={s + i} className="group/badge relative flex items-center">
                <InlineText
                  value={s}
                  blockId={block.id}
                  field={`backend.${i}`}
                  className="px-2 py-0.5 rounded-md text-xs font-medium border border-foreground/10 bg-foreground/10 text-foreground pr-5 cursor-text min-w-[50px] inline-block"
                />
                {isSelected && (
                  <button
                    onClick={() => {
                      const next = backend.filter((_, idx) => idx !== i);
                      runCommand(new UpdateTextCommand(block.id, "backend", next));
                    }}
                    className="absolute right-1 text-3xs text-red-500 hover:text-red-700 font-bold transition-all focus:outline-none"
                    title="Remove Skill"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {backend.length === 0 && (
              <p className="text-3xs italic text-muted-foreground">No backend skills configured</p>
            )}
          </div>
        </div>

        {/* DevOps */}
        <div className="border border-border/40 rounded-xl bg-zinc-50/20 dark:bg-zinc-900/10 p-4 space-y-3 relative group/skillcol">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">DevOps</h3>
            {isSelected && (
              <button
                onClick={() => runCommand(new UpdateTextCommand(block.id, "devops", [...devops, "New Skill"]))}
                className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-border/40 text-[9px] font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 text-foreground transition-all flex items-center gap-0.5"
              >
                <Plus className="h-2 w-2" /> Add
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {devops.map((s, i) => (
              <div key={s + i} className="group/badge relative flex items-center">
                <InlineText
                  value={s}
                  blockId={block.id}
                  field={`devops.${i}`}
                  className="px-2 py-0.5 rounded-md text-xs font-medium border border-foreground/10 bg-foreground/10 text-foreground pr-5 cursor-text min-w-[50px] inline-block"
                />
                {isSelected && (
                  <button
                    onClick={() => {
                      const next = devops.filter((_, idx) => idx !== i);
                      runCommand(new UpdateTextCommand(block.id, "devops", next));
                    }}
                    className="absolute right-1 text-3xs text-red-500 hover:text-red-700 font-bold transition-all focus:outline-none"
                    title="Remove Skill"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {devops.length === 0 && (
              <p className="text-3xs italic text-muted-foreground">No DevOps skills configured</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// PROJECTS RENDERER
export function ProjectsCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const repos = useQuery(api.github.getRepositories) || [];
  const projectIds = (content.projectIds as any[]) || [];

  // Filter repositories that are in the projects block list, using safe number comparisons
  const activeRepos = React.useMemo(() => {
    const map = new Map(repos.map((r) => [Number(r.repoId), r]));
    return projectIds.map((id) => map.get(Number(id))).filter(Boolean) as any[];
  }, [repos, projectIds]);

  const device = useStudio().state.preferences.device;
  const align = (block.style.textAlign as any)?.[device] || "left";
  const alignClass = 
    align === "center" ? "items-center text-center" :
    align === "right" ? "items-end text-right" :
    "items-start text-left";

  return (
    <div className={`space-y-4 py-6 flex flex-col w-full ${alignClass}`}>
      <InlineText
        value={content.title || "Projects"}
        blockId={block.id}
        field="title"
        as="h2"
        className="text-2xl font-bold tracking-tight text-foreground"
        placeholder="Projects Section Title"
      />

      {activeRepos.length === 0 ? (
        <div className="border border-dashed border-border/80 rounded-xl p-8 text-center text-xs text-muted-foreground">
          No projects configured yet. Select this block and choose repositories from the Property Inspector.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {activeRepos.map((repo: any) => {
            const customName = content.overrides?.[repo.repoId]?.name ?? repo.name;
            const customDesc = content.overrides?.[repo.repoId]?.description ?? repo.description ?? "";

            return (
              <div
                key={repo.repoId}
                className="border border-border/40 hover:border-brand/40 bg-background hover:bg-zinc-50/10 dark:hover:bg-zinc-900/10 rounded-xl p-4 flex flex-col justify-between shadow-sm transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <InlineText
                      value={customName}
                      blockId={block.id}
                      field={`overrides.${repo.repoId}.name`}
                      as="h3"
                      className="font-semibold text-sm text-foreground flex items-center gap-1.5 cursor-text min-w-[80px]"
                      placeholder="Project Name"
                    />
                    {repo.primaryLanguage && (
                      <span className="px-2 py-0.5 text-2xs font-semibold rounded-md border border-border/40 bg-zinc-50 dark:bg-zinc-900 text-muted-foreground">
                        {repo.primaryLanguage}
                      </span>
                    )}
                  </div>
                  <InlineText
                    value={customDesc}
                    blockId={block.id}
                    field={`overrides.${repo.repoId}.description`}
                    as="p"
                    className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mt-2 cursor-text min-h-[36px]"
                    placeholder="Project Description"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-border/20 pt-3 mt-4 text-2xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    {content.showStars && (
                      <span className="flex items-center gap-1">
                        ★ {repo.stars}
                      </span>
                    )}
                    <span>Forks: {repo.forks}</span>
                  </div>
                  <a
                    href={`https://github.com/${repo.fullName}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-brand flex items-center gap-1 transition-colors"
                  >
                    GitHub <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// CONTACT RENDERER
export function ContactCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const email = content.email || "";
  const github = content.githubUrl || "";

  const device = useStudio().state.preferences.device;
  const align = (block.style.textAlign as any)?.[device] || "left";
  const alignClass = 
    align === "center" ? "items-center text-center" :
    align === "right" ? "items-end text-right" :
    "items-start text-left";

  return (
    <div className={`space-y-4 py-8 border-t border-border/20 mt-8 flex flex-col w-full ${alignClass}`}>
      <InlineText
        value={content.title || "Get in Touch"}
        blockId={block.id}
        field="title"
        as="h2"
        className="text-2xl font-bold tracking-tight text-foreground"
        placeholder="Contact Title"
      />
      <InlineText
        value={content.description || "I'd love to connect on engineering projects or branding ideas!"}
        blockId={block.id}
        field="description"
        as="p"
        className="text-sm text-muted-foreground max-w-md leading-relaxed"
        placeholder="Contact Description"
      />

      <div className="flex items-center gap-4 pt-3">
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 px-4 h-9 rounded-lg border border-border/40 bg-zinc-50 dark:bg-zinc-900/20 text-xs font-semibold text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900/60 shadow-sm transition-all"
          >
            <Mail className="h-3.5 w-3.5" />
            Email Me
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 h-9 rounded-lg border border-border/40 bg-zinc-50 dark:bg-zinc-900/20 text-xs font-semibold text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-900/60 shadow-sm transition-all"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            GitHub Profile
          </a>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. ANIMATION BLOCK WRAPPER
// ==========================================
export function AnimatedBlockWrapper({
  block,
  children,
  className = "",
  device = "desktop",
}: {
  block: StudioBlock;
  children: React.ReactNode;
  className?: string;
  device?: string;
}) {
  const preset = (block.style.animationPreset as any)?.[device] || "none";
  const duration = (block.style.animationDuration as any)?.[device] ?? 500;
  const delay = (block.style.animationDelay as any)?.[device] ?? 0;
  const easing = (block.style.animationEasing as any)?.[device] || "ease-out";
  const trigger = (block.style.animationTrigger as any)?.[device] || "viewport";

  // State to track if visible in viewport
  const [inView, setInView] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (trigger !== "viewport") {
      const timer = setTimeout(() => setInView(true), 0);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [trigger]);

  // Transform coordinates based on preset selection
  const getPresetTransform = () => {
    if (inView) return "translate(0, 0) scale(1) rotate(0deg)";
    
    switch (preset) {
      case "slide-up":
        return "translate(0, 30px) scale(1) rotate(0deg)";
      case "slide-down":
        return "translate(0, -30px) scale(1) rotate(0deg)";
      case "slide-left":
        return "translate(30px, 0) scale(1) rotate(0deg)";
      case "slide-right":
        return "translate(-30px, 0) scale(1) rotate(0deg)";
      case "scale":
        return "translate(0, 0) scale(0.95) rotate(0deg)";
      case "zoom":
        return "translate(0, 0) scale(0.85) rotate(0deg)";
      case "rotate":
        return "translate(0, 0) scale(1) rotate(-3deg)";
      default:
        return "translate(0, 0) scale(1) rotate(0deg)";
    }
  };

  const opacity = inView && preset !== "none" ? "1" : preset === "none" ? "1" : "0";
  const transform = getPresetTransform();
  const transitionTimingFunction =
    easing === "ease-in-out" ? "cubic-bezier(0.4, 0, 0.2, 1)" :
    easing === "ease-in" ? "cubic-bezier(0.4, 0, 1, 1)" :
    easing === "linear" ? "linear" : "cubic-bezier(0, 0, 0.2, 1)";

  const hoverClass = trigger === "hover" ? 
    "hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 animate-in fade-in" : "";

  return (
    <div
      ref={elementRef}
      style={{
        opacity,
        transform,
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction,
      }}
      className={`w-full ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}

// ==========================================
// 4. NEW CUSTOM BLOCK CANVASES
// ==========================================

// TESTIMONIALS CANVAS BLOCK
export function TestimonialsCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const items = content.items || [];
  const { runCommand } = useStudio();

  const handleAddItem = () => {
    const newItem = {
      id: `item-${Math.random().toString(36).substr(2, 9)}`,
      avatar: "",
      name: "Sarah Connor",
      role: "Principal Architect",
      company: "Cyberdyne Systems",
      quote: "Absolute game changer.",
      rating: 5,
    };
    runCommand(new UpdateTextCommand(block.id, "items", [...items, newItem]));
    toast.success("Added testimonial item");
  };

  const handleDeleteItem = (index: number) => {
    const nextItems = items.filter((_: any, i: number) => i !== index);
    runCommand(new UpdateTextCommand(block.id, "items", nextItems));
    toast.error("Removed testimonial item");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <InlineText
          value={content.title || "Testimonials"}
          blockId={block.id}
          field="title"
          as="h2"
          className="text-2xl font-bold tracking-tight text-foreground"
        />
        {isSelected && (
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1 px-3 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-border/40 text-3xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 text-foreground transition-all"
          >
            <Plus className="h-3 w-3" /> Add Testimonial
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item: any, i: number) => (
          <div
            key={item.id || i}
            className="p-5 rounded-2xl border border-border/40 bg-zinc-50/50 dark:bg-zinc-900/10 space-y-3 relative group"
          >
            {isSelected && (
              <button
                onClick={() => handleDeleteItem(i)}
                className="absolute top-2 right-2 p-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            )}

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-border/20 overflow-hidden flex items-center justify-center text-muted-foreground">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <Users className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="text-2xs font-bold text-foreground">
                  <InlineText
                    value={item.name || "Sarah Connor"}
                    blockId={block.id}
                    field={`items.${i}.name`}
                  />
                </p>
                <p className="text-3xs text-muted-foreground flex gap-1">
                  <InlineText
                    value={item.role || "Principal Architect"}
                    blockId={block.id}
                    field={`items.${i}.role`}
                  />
                  <span>at</span>
                  <InlineText
                    value={item.company || "Cyberdyne"}
                    blockId={block.id}
                    field={`items.${i}.company`}
                  />
                </p>
              </div>
            </div>

            <p className="text-xs italic text-muted-foreground leading-relaxed">
              &quot;
              <InlineText
                value={item.quote || ""}
                blockId={block.id}
                field={`items.${i}.quote`}
                placeholder="Write quote here..."
              />
              &quot;
            </p>

            {item.rating && (
              <div className="flex text-amber-500 gap-0.5 text-3xs pt-1">
                {Array.from({ length: item.rating }).map((_, r) => (
                  <span key={r}>★</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// CODE SNIPPET CANVAS BLOCK
export function CodeSnippetCanvasBlock({ block }: { block: StudioBlock }) {
  const content = block.content as any;
  const { runCommand } = useStudio();

  return (
    <div className="space-y-4">
      <InlineText
        value={content.title || "Code Example"}
        blockId={block.id}
        field="title"
        as="h3"
        className="text-xs font-bold text-foreground capitalize tracking-wider"
      />
      <div className="rounded-xl border border-border/40 bg-zinc-950 dark:bg-black p-4 font-mono text-2xs leading-relaxed text-zinc-300 shadow-md">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          </div>
          <span className="text-3xs text-zinc-500 uppercase font-bold tracking-widest">{content.language || "typescript"}</span>
        </div>
        <pre
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => {
            runCommand(new UpdateTextCommand(block.id, "code", e.currentTarget.textContent || ""));
          }}
          className="outline-none whitespace-pre-wrap select-text font-mono"
        >
          {content.code}
        </pre>
      </div>
    </div>
  );
}

// CALLOUT CANVAS BLOCK
export function CalloutCanvasBlock({ block }: { block: StudioBlock }) {
  const content = block.content as any;
  const calloutType = content.type || "info";

  const getColors = () => {
    switch (calloutType) {
      case "warning":
        return "bg-amber-50/50 border-amber-200/60 dark:bg-amber-950/10 dark:border-amber-900/40 text-amber-800 dark:text-amber-200";
      case "success":
        return "bg-emerald-50/50 border-emerald-200/60 dark:bg-emerald-950/10 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-200";
      case "tip":
        return "bg-purple-50/50 border-purple-200/60 dark:bg-purple-950/10 dark:border-purple-900/40 text-purple-800 dark:text-purple-200";
      default:
        return "bg-blue-50/50 border-blue-200/60 dark:bg-blue-950/10 dark:border-blue-900/40 text-blue-800 dark:text-blue-200";
    }
  };

  return (
    <div className={`p-4 rounded-xl border flex gap-3 ${getColors()}`}>
      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <p className="text-xs font-bold capitalize">{content.title || "Note"}</p>
        <p className="text-xs leading-relaxed opacity-90">
          <InlineText
            value={content.text || ""}
            blockId={block.id}
            field="text"
            placeholder="Type note content here..."
          />
        </p>
      </div>
    </div>
  );
}

// DIVIDER CANVAS BLOCK
export function DividerCanvasBlock({ block }: { block: StudioBlock }) {
  const content = block.content as any;
  const style = content.style || "solid";
  const thickness = content.thickness || 1;
  const color = content.color || "currentColor";

  return (
    <div className="py-2">
      <hr
        style={{
          borderStyle: style,
          borderWidth: `${thickness}px 0 0 0`,
          borderColor: color,
        }}
        className="opacity-20"
      />
    </div>
  );
}

// QUOTE CANVAS BLOCK
export function QuoteCanvasBlock({ block }: { block: StudioBlock }) {
  const content = block.content as any;

  return (
    <div className="border-l-4 border-brand/60 pl-4 py-2 space-y-2 font-serif">
      <p className="text-sm italic text-foreground leading-relaxed">
        &quot;
        <InlineText
          value={content.text || ""}
          blockId={block.id}
          field="text"
          placeholder="Quote text..."
        />
        &quot;
      </p>
      <p className="text-2xs font-bold text-muted-foreground">
        —{" "}
        <InlineText
          value={content.author || ""}
          blockId={block.id}
          field="author"
          placeholder="Author"
        />
      </p>
    </div>
  );
}

// IMAGE CANVAS BLOCK
export function ImageCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const url = content.url || "";
  const { runCommand } = useStudio();
  const generateUploadUrl = useMutation(api.studio.generateUploadUrl);
  const getStorageUrl = useMutation(api.studio.getStorageUrl);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const droppedUrl = e.dataTransfer.getData("text/plain");
    const dragType = e.dataTransfer.getData("type");
    if (droppedUrl && dragType === "image-asset") {
      runCommand(new UpdateTextCommand(block.id, "url", droppedUrl));
      toast.success("Image updated from library!");
      return;
    }

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      toast.info("Uploading image to storage...");
      try {
        const localUrl = URL.createObjectURL(file);
        runCommand(new UpdateTextCommand(block.id, "url", localUrl));

        const uploadUrl = await generateUploadUrl();
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await response.json();
        const permanentUrl = await getStorageUrl({ storageId });
        if (permanentUrl) {
          runCommand(new UpdateTextCommand(block.id, "url", permanentUrl));
          toast.success("Image uploaded successfully!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload image.");
      }
    }
  };

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="relative group/img overflow-hidden rounded-xl border border-border/40 bg-zinc-50 dark:bg-zinc-900/20 aspect-video flex items-center justify-center cursor-pointer"
      >
        {url ? (
          <img src={url} alt={content.alt || "Block Image"} className="h-full w-full object-cover transition-transform duration-300 group-hover/img:scale-[1.01]" />
        ) : (
          <div className="text-center space-y-2 text-muted-foreground p-6">
            <ImageIcon className="h-8 w-8 mx-auto opacity-40" />
            <p className="text-3xs font-semibold">No Image Uploaded</p>
            {isSelected && <p className="text-4xs">Drag and drop an image here or click in the Inspector to upload</p>}
          </div>
        )}
        {/* Hover Click-to-upload action trigger */}
        {isSelected && (
          <label
            htmlFor={`canvas-image-uploader-${block.id}`}
            className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white gap-1.5 text-2xs font-bold shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Upload className="h-4 w-4" /> Change Image
          </label>
        )}
        <input
          type="file"
          id={`canvas-image-uploader-${block.id}`}
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            toast.info("Uploading image to storage...");
            try {
              const localUrl = URL.createObjectURL(file);
              runCommand(new UpdateTextCommand(block.id, "url", localUrl));

              const uploadUrl = await generateUploadUrl();
              const response = await fetch(uploadUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
              });
              const { storageId } = await response.json();
              const permanentUrl = await getStorageUrl({ storageId });
              if (permanentUrl) {
                runCommand(new UpdateTextCommand(block.id, "url", permanentUrl));
                toast.success("Image uploaded!");
              }
            } catch {
              toast.error("Upload failed.");
            }
          }}
        />
      </div>
      <p className="text-center text-3xs italic text-muted-foreground leading-normal mt-1">
        <InlineText
          value={content.caption || ""}
          blockId={block.id}
          field="caption"
          placeholder="Add an image caption..."
        />
      </p>
    </div>
  );
}

// VIDEO CANVAS BLOCK
export function VideoCanvasBlock({ block }: { block: StudioBlock }) {
  const content = block.content as any;
  const url = content.url || "";

  return (
    <div className="rounded-xl overflow-hidden border border-border/40 bg-zinc-950 aspect-video flex items-center justify-center">
      {url ? (
        <video src={url} controls className="h-full w-full object-cover" />
      ) : (
        <div className="text-center space-y-2 text-muted-foreground p-6">
          <VideoIcon className="h-8 w-8 mx-auto opacity-40" />
          <p className="text-3xs font-semibold">Video Showcase Box</p>
          <p className="text-4xs">Supports direct mp4 file links</p>
        </div>
      )}
    </div>
  );
}

// CUSTOM HTML CANVAS BLOCK (SCAFFOLD)
export function HtmlCanvasBlock({ block }: { block: StudioBlock }) {
  const content = block.content as any;

  return (
    <div className="border border-dashed border-brand/30 rounded-xl p-6 bg-zinc-50/10 dark:bg-zinc-900/10 text-center space-y-3">
      <Terminal className="h-6 w-6 text-brand mx-auto opacity-60" />
      <div className="space-y-1">
        <p className="text-2xs font-bold text-foreground">Custom HTML Sandbox</p>
        <p className="text-3xs text-muted-foreground max-w-[280px] mx-auto leading-normal">
          Direct HTML snippet rendering is disabled in visual canvas mode for security. Replaces on live publication pages.
        </p>
      </div>
      <pre className="text-4xs text-left bg-zinc-100 dark:bg-zinc-950 p-2.5 rounded-lg border border-border/40 max-h-[100px] overflow-auto select-none opacity-80">
        {content.html || "<!-- Custom HTML code template -->"}
      </pre>
    </div>
  );
}

// GALLERY CANVAS BLOCK
export function GalleryCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const items = content.items || [];
  const { runCommand } = useStudio();
  const generateUploadUrl = useMutation(api.studio.generateUploadUrl);
  const getStorageUrl = useMutation(api.studio.getStorageUrl);

  const handleAddItem = () => {
    const newItem = {
      id: `gal-${Math.random().toString(36).substr(2, 9)}`,
      url: "",
      caption: `Gallery Image ${items.length + 1}`,
    };
    runCommand(new UpdateTextCommand(block.id, "items", [...items, newItem]));
  };

  const handleDeleteItem = (index: number) => {
    const nextItems = items.filter((_: any, idx: number) => idx !== index);
    runCommand(new UpdateTextCommand(block.id, "items", nextItems));
  };

  const handleDrop = async (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const droppedUrl = e.dataTransfer.getData("text/plain");
    const dragType = e.dataTransfer.getData("type");
    if (droppedUrl && dragType === "image-asset") {
      const nextItems = [...items];
      nextItems[index] = { ...nextItems[index], url: droppedUrl };
      runCommand(new UpdateTextCommand(block.id, "items", nextItems));
      toast.success("Gallery image replaced!");
      return;
    }

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      toast.info("Uploading gallery image...");
      try {
        const localUrl = URL.createObjectURL(file);
        const nextItemsLocal = [...items];
        nextItemsLocal[index] = { ...nextItemsLocal[index], url: localUrl };
        runCommand(new UpdateTextCommand(block.id, "items", nextItemsLocal));

        const uploadUrl = await generateUploadUrl();
        const response = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await response.json();
        const permanentUrl = await getStorageUrl({ storageId });
        if (permanentUrl) {
          const nextItemsPermanent = [...items];
          nextItemsPermanent[index] = { ...nextItemsPermanent[index], url: permanentUrl };
          runCommand(new UpdateTextCommand(block.id, "items", nextItemsPermanent));
          toast.success("Gallery image uploaded!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload image.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <InlineText
          value={content.title || "Project Gallery"}
          blockId={block.id}
          field="title"
          as="h2"
          className="text-2xl font-bold tracking-tight text-foreground"
        />
        {isSelected && (
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-border/40 text-3xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 text-foreground transition-all"
          >
            <Plus className="h-3 w-3" /> Add Image
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item: any, i: number) => (
          <div
            key={item.id || i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, i)}
            className="relative group border border-border/40 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/20 aspect-square flex flex-col justify-between cursor-pointer"
          >
            {isSelected && (
              <button
                onClick={() => handleDeleteItem(i)}
                className="absolute top-2 right-2 p-1 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            )}

            <div className="flex-1 w-full relative flex items-center justify-center group/item-img">
              {item.url ? (
                <img src={item.url} alt={item.caption || "Gallery Preview"} className="h-full w-full object-cover" />
              ) : (
                <div className="text-center p-3 text-muted-foreground">
                  <ImageIcon className="h-6 w-6 mx-auto opacity-30 mb-1" />
                  <p className="text-4xs font-semibold">Drop image here</p>
                </div>
              )}
              {/* Click to upload direct overlay */}
              {isSelected && (
                <label
                  htmlFor={`canvas-gallery-uploader-${block.id}-${i}`}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white z-25"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Upload className="h-4 w-4" />
                </label>
              )}
              <input
                type="file"
                id={`canvas-gallery-uploader-${block.id}-${i}`}
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  toast.info("Uploading gallery image...");
                  try {
                    const localUrl = URL.createObjectURL(file);
                    const nextItemsLocal = [...items];
                    nextItemsLocal[i] = { ...nextItemsLocal[i], url: localUrl };
                    runCommand(new UpdateTextCommand(block.id, "items", nextItemsLocal));

                    const uploadUrl = await generateUploadUrl();
                    const response = await fetch(uploadUrl, {
                      method: "POST",
                      headers: { "Content-Type": file.type },
                      body: file,
                    });
                    const { storageId } = await response.json();
                    const permanentUrl = await getStorageUrl({ storageId });
                    if (permanentUrl) {
                      const nextItemsPermanent = [...items];
                      nextItemsPermanent[i] = { ...nextItemsPermanent[i], url: permanentUrl };
                      runCommand(new UpdateTextCommand(block.id, "items", nextItemsPermanent));
                      toast.success("Gallery image uploaded!");
                    }
                  } catch {
                    toast.error("Upload failed.");
                  }
                }}
              />
            </div>

            <div className="bg-background/85 dark:bg-zinc-950/85 p-2 border-t border-border/20 text-center">
              <p className="text-3xs text-muted-foreground leading-normal">
                <InlineText
                  value={item.caption || ""}
                  blockId={block.id}
                  field={`items.${i}.caption`}
                  placeholder="Caption..."
                />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// TIMELINE CANVAS BLOCK
export function TimelineCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const items = content.items || [];
  const { runCommand } = useStudio();

  const handleAddItem = () => {
    const newItem = {
      id: `time-${Math.random().toString(36).substr(2, 9)}`,
      date: "2024",
      title: "New Job Title",
      subtitle: "Company Name",
      text: "Write experience details here...",
    };
    runCommand(new UpdateTextCommand(block.id, "items", [...items, newItem]));
  };

  const handleDeleteItem = (index: number) => {
    const nextItems = items.filter((_: any, idx: number) => idx !== index);
    runCommand(new UpdateTextCommand(block.id, "items", nextItems));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <InlineText
          value={content.title || "Experience Timeline"}
          blockId={block.id}
          field="title"
          as="h2"
          className="text-2xl font-bold tracking-tight text-foreground"
        />
        {isSelected && (
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-border/40 text-3xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 text-foreground transition-all"
          >
            <Plus className="h-3 w-3" /> Add Event
          </button>
        )}
      </div>

      <div className="relative border-l-2 border-border/60 pl-6 ml-3 space-y-8 py-2">
        {items.map((item: any, i: number) => (
          <div key={item.id || i} className="relative group space-y-1">
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-brand bg-background" />

            {isSelected && (
              <button
                onClick={() => handleDeleteItem(i)}
                className="absolute top-0 right-0 p-1 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}

            <div className="text-3xs font-bold text-brand tracking-wider uppercase">
              <InlineText
                value={item.date || "Date"}
                blockId={block.id}
                field={`items.${i}.date`}
              />
            </div>
            <h3 className="text-sm font-bold text-foreground">
              <InlineText
                value={item.title || "Job Title"}
                blockId={block.id}
                field={`items.${i}.title`}
              />
            </h3>
            <h4 className="text-2xs font-semibold text-muted-foreground flex gap-1.5 items-center">
              <InlineText
                value={item.subtitle || "Company Name"}
                blockId={block.id}
                field={`items.${i}.subtitle`}
              />
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2 pt-1">
              <InlineText
                value={item.text || ""}
                blockId={block.id}
                field={`items.${i}.text`}
                placeholder="Description details..."
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// MARKDOWN CANVAS BLOCK
export function MarkdownCanvasBlock({ block }: { block: StudioBlock }) {
  const content = block.content as any;
  const { runCommand } = useStudio();

  return (
    <div className="space-y-4">
      <InlineText
        value={content.title || "Documentation"}
        blockId={block.id}
        field="title"
        as="h3"
        className="text-xs font-bold text-foreground capitalize tracking-wider"
      />
      <div className="rounded-xl border border-border/40 bg-zinc-50/40 dark:bg-zinc-900/10 p-4 font-mono text-2xs leading-relaxed text-foreground shadow-sm">
        <textarea
          value={content.markdown || ""}
          onChange={(e) => {
            runCommand(new UpdateTextCommand(block.id, "markdown", e.target.value));
          }}
          placeholder="# Edit Markdown here..."
          className="w-full h-32 bg-transparent outline-none resize-none border-none font-mono text-xs select-text text-foreground"
        />
      </div>
    </div>
  );
}

// SPACER CANVAS BLOCK
export function SpacerCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const height = content.height || 32;
  const { runCommand } = useStudio();

  return (
    <div
      style={{ height: `${height}px` }}
      className={`relative w-full border border-dashed flex items-center justify-center transition-all ${
        isSelected
          ? "border-brand/40 bg-brand/5"
          : "border-transparent"
      }`}
    >
      {isSelected && (
        <div className="text-4xs font-bold text-muted-foreground select-none flex items-center gap-2">
          <span>Spacer: {height}px</span>
          <input
            type="range"
            min="8"
            max="128"
            step="8"
            value={height}
            onChange={(e) => {
              runCommand(new UpdateTextCommand(block.id, "height", parseInt(e.target.value, 10)));
            }}
            className="accent-brand w-20 cursor-pointer h-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-800"
          />
        </div>
      )}
    </div>
  );
}

// BUTTON GROUP CANVAS BLOCK
export function ButtonGroupCanvasBlock({ block, isSelected }: { block: StudioBlock; isSelected: boolean }) {
  const content = block.content as any;
  const items = content.items || [];
  const align = content.align || "left";
  const { runCommand } = useStudio();

  const handleAddItem = () => {
    const newItem = {
      id: `btn-${Math.random().toString(36).substr(2, 9)}`,
      label: "New Button",
      url: "#",
      variant: "outline",
    };
    runCommand(new UpdateTextCommand(block.id, "items", [...items, newItem]));
  };

  const handleDeleteItem = (index: number) => {
    const nextItems = items.filter((_: any, idx: number) => idx !== index);
    runCommand(new UpdateTextCommand(block.id, "items", nextItems));
  };

  const getAlignClass = () => {
    switch (align) {
      case "center":
        return "justify-center";
      case "right":
        return "justify-end";
      default:
        return "justify-start";
    }
  };

  return (
    <div className="space-y-4">
      {isSelected && (
        <div className="flex items-center justify-between border-b border-border/20 pb-2 mb-2">
          <div className="flex items-center gap-1">
            <span className="text-3xs text-muted-foreground mr-1">Align:</span>
            {["left", "center", "right"].map((a) => (
              <button
                key={a}
                onClick={() => runCommand(new UpdateTextCommand(block.id, "align", a))}
                className={`px-2 py-0.5 text-3xs font-semibold rounded-md capitalize border transition-all ${
                  align === a
                    ? "bg-brand text-brand-foreground border-brand"
                    : "bg-background border-border/40 text-foreground"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <button
            onClick={handleAddItem}
            className="flex items-center gap-1 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-border/40 text-3xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-800 text-foreground transition-all"
          >
            <Plus className="h-3 w-3" /> Add Button
          </button>
        </div>
      )}

      <div className={`flex flex-wrap gap-3 items-center ${getAlignClass()}`}>
        {items.map((item: any, i: number) => (
          <div key={item.id || i} className="relative group/btn flex items-center">
            {isSelected && (
              <button
                onClick={() => handleDeleteItem(i)}
                className="absolute -top-7 right-0 p-0.5 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity z-10 shadow-sm"
              >
                <Trash2 className="h-2.5 w-2.5" />
              </button>
            )}

            <div className="flex flex-col gap-1">
              <span className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all select-none ${
                item.variant === "primary"
                  ? "bg-brand text-brand-foreground border-brand hover:opacity-90"
                  : item.variant === "secondary"
                    ? "bg-zinc-100 dark:bg-zinc-900 border-border/40 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    : "bg-transparent border-border/40 text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900/25"
              }`}>
                <InlineText
                  value={item.label || "Button"}
                  blockId={block.id}
                  field={`items.${i}.label`}
                />
              </span>
              {isSelected && (
                <div className="flex flex-col gap-1 p-2 border border-border/40 bg-popover rounded-md mt-1 shadow-md max-w-[150px] z-20">
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => {
                      const nextItems = [...items];
                      nextItems[i] = { ...nextItems[i], url: e.target.value };
                      runCommand(new UpdateTextCommand(block.id, "items", nextItems));
                    }}
                    placeholder="URL: #"
                    className="w-full text-4xs bg-transparent border-b border-border/40 outline-none text-foreground"
                  />
                  <select
                    value={item.variant}
                    onChange={(e) => {
                      const nextItems = [...items];
                      nextItems[i] = { ...nextItems[i], variant: e.target.value };
                      runCommand(new UpdateTextCommand(block.id, "items", nextItems));
                    }}
                    className="w-full text-4xs bg-transparent outline-none text-foreground"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
