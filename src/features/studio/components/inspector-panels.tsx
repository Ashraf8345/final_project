/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabling explicit-any rule is justified in this styling control panel to support dynamic indexing of complex nested style objects.
"use client";

import * as React from "react";
import { useStudio } from "../engines/studio-context";
import { UpdateStyleCommand, UpdateTextCommand, UpdateThemeConfigCommand, UpdateAssetsCommand } from "../engines/commands";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import {
  Sparkles,
  Upload,
  Trash2,
  Image as ImageIcon,
  Video as VideoIcon,
  Play,
  Compass,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

// ==========================================
// 1. TYPOGRAPHY PANEL
// ==========================================
export function TypographyPanel() {
  const { state, selection, runCommand } = useStudio();
  const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);
  const device = state.preferences.device;

  if (!selectedBlock) return null;

  const currentAlign = (selectedBlock.style.textAlign as any)?.[device] || "left";
  const currentSize = (selectedBlock.style.fontSize as any)?.[device] || "text-base";

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Typography</h4>
      
      {/* Text Align */}
      <div className="space-y-1">
        <label className="text-2xs text-muted-foreground">Alignment</label>
        <div className="grid grid-cols-3 gap-1">
          {["left", "center", "right"].map((align) => (
            <button
              key={align}
              onClick={() => runCommand(new UpdateStyleCommand(selectedBlock.id, "textAlign", align, device))}
              className={`h-8 text-xs rounded-md border border-border/40 font-medium capitalize transition-all ${
                currentAlign === align
                  ? "bg-brand text-brand-foreground border-brand"
                  : "bg-background text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }`}
            >
              {align}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-1">
        <label className="text-2xs text-muted-foreground">Font Size</label>
        <select
          value={currentSize}
          onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "fontSize", e.target.value, device))}
          className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60"
        >
          <option value="text-xs">Extra Small (xs)</option>
          <option value="text-sm">Small (sm)</option>
          <option value="text-base">Normal (base)</option>
          <option value="text-lg">Large (lg)</option>
          <option value="text-xl">Extra Large (xl)</option>
          <option value="text-2xl">Heading 2 (2xl)</option>
          <option value="text-3xl">Heading 1 (3xl)</option>
          <option value="text-4xl">Title (4xl)</option>
        </select>
      </div>
    </div>
  );
}

// ==========================================
// 2. SPACING & LAYOUT PANEL
// ==========================================
export function SpacingPanel() {
  const { state, selection, runCommand } = useStudio();
  const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);
  const device = state.preferences.device;

  if (!selectedBlock) return null;

  const paddingTop = (selectedBlock.style.paddingTop as any)?.[device] ?? 8;
  const paddingBottom = (selectedBlock.style.paddingBottom as any)?.[device] ?? 8;
  const borderWidth = (selectedBlock.style.borderWidth as any)?.[device] ?? 0;
  const borderRadius = (selectedBlock.style.borderRadius as any)?.[device] || "rounded-xl";
  const boxShadow = (selectedBlock.style.boxShadow as any)?.[device] || "shadow-none";
  const maxWidth = (selectedBlock.style.maxWidth as any)?.[device] || "max-w-5xl";

  return (
    <div className="space-y-4 border-t border-border/20 pt-4">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layout & Spacing</h4>
      
      {/* Container Max Width */}
      <div className="space-y-1">
        <label className="text-2xs text-muted-foreground">Max Width Limit</label>
        <select
          value={maxWidth}
          onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "maxWidth", e.target.value, device))}
          className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60"
        >
          <option value="max-w-xl">Small Box (xl)</option>
          <option value="max-w-3xl">Medium Box (3xl)</option>
          <option value="max-w-5xl">Default Page (5xl)</option>
          <option value="max-w-none">Full Fluid Width (none)</option>
        </select>
      </div>

      {/* Padding Top */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-2xs">
          <span className="text-muted-foreground">Padding Top</span>
          <span className="font-semibold text-foreground">{paddingTop * 4}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="24"
          value={paddingTop}
          onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "paddingTop", parseInt(e.target.value, 10), device))}
          className="w-full accent-brand bg-zinc-200 dark:bg-zinc-800 h-1 rounded-lg cursor-pointer"
        />
      </div>

      {/* Padding Bottom */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-2xs">
          <span className="text-muted-foreground">Padding Bottom</span>
          <span className="font-semibold text-foreground">{paddingBottom * 4}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="24"
          value={paddingBottom}
          onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "paddingBottom", parseInt(e.target.value, 10), device))}
          className="w-full accent-brand bg-zinc-200 dark:bg-zinc-800 h-1 rounded-lg cursor-pointer"
        />
      </div>

      {/* Borders & Corners */}
      <div className="grid grid-cols-2 gap-2 border-t border-border/10 pt-3">
        <div className="space-y-1">
          <label className="text-2xs text-muted-foreground">Border Width</label>
          <select
            value={borderWidth}
            onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "borderWidth", parseInt(e.target.value, 10), device))}
            className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60"
          >
            <option value="0">None</option>
            <option value="1">1px Thin</option>
            <option value="2">2px Normal</option>
            <option value="4">4px Thick</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-2xs text-muted-foreground">Corner Radius</label>
          <select
            value={borderRadius}
            onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "borderRadius", e.target.value, device))}
            className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60"
          >
            <option value="rounded-none">Sharp (none)</option>
            <option value="rounded-md">Medium (md)</option>
            <option value="rounded-xl">Curved (xl)</option>
            <option value="rounded-2xl">Extra Curved (2xl)</option>
            <option value="rounded-full">Pill (full)</option>
          </select>
        </div>
      </div>

      {/* Shadow Selection */}
      <div className="space-y-1">
        <label className="text-2xs text-muted-foreground">Box Shadow</label>
        <select
          value={boxShadow}
          onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "boxShadow", e.target.value, device))}
          className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60"
        >
          <option value="shadow-none">Flat (none)</option>
          <option value="shadow-sm">Subtle (sm)</option>
          <option value="shadow-md">Elevated (md)</option>
          <option value="shadow-lg">Prominent (lg)</option>
          <option value="shadow-xl">Deep (xl)</option>
        </select>
      </div>
    </div>
  );
}

// ==========================================
// 3. COLOR PALETTE PANEL
// ==========================================
export function ColorsPanel() {
  const { state, selection, runCommand } = useStudio();
  const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);
  const device = state.preferences.device;

  if (!selectedBlock) return null;

  const currentBg = (selectedBlock.style.backgroundColor as any)?.[device] || "transparent";
  const customBorderColor = (selectedBlock.style.borderColor as any)?.[device] || "";

  const colorPresets = [
    { name: "Transparent", value: "transparent" },
    { name: "White", value: "bg-white" },
    { name: "Zinc 50", value: "bg-zinc-50/50" },
    { name: "Zinc 100", value: "bg-zinc-100/50" },
    { name: "Dark Zinc", value: "bg-zinc-900/40" },
    { name: "Deep Black", value: "bg-zinc-950/60" },
  ];

  return (
    <div className="space-y-4 border-t border-border/20 pt-4">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Colors</h4>
      
      {/* Background Color Picker */}
      <div className="space-y-1">
        <label className="text-2xs text-muted-foreground">Background Presets</label>
        <div className="grid grid-cols-3 gap-1.5">
          {colorPresets.map((color) => (
            <button
              key={color.value}
              onClick={() => runCommand(new UpdateStyleCommand(selectedBlock.id, "backgroundColor", color.value, device))}
              className={`h-8 text-2xs rounded-md border border-border/40 px-1 font-semibold transition-all ${
                currentBg === color.value
                  ? "bg-brand text-brand-foreground border-brand"
                  : "bg-background text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-900"
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Background color hex/accent input */}
      <div className="space-y-1">
        <label className="text-2xs text-muted-foreground">Custom Background (Hex / class)</label>
        <input
          type="text"
          value={colorPresets.some(p => p.value === currentBg) ? "" : currentBg}
          onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "backgroundColor", e.target.value, device))}
          placeholder="#ffffff or bg-zinc-900"
          className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60 font-mono"
        />
      </div>

      {/* Border Color hex input */}
      <div className="space-y-1 pt-1">
        <label className="text-2xs text-muted-foreground">Border Color (Hex / Accent)</label>
        <input
          type="text"
          value={customBorderColor}
          onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "borderColor", e.target.value, device))}
          placeholder="#e4e4e7 or border-brand"
          className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60 font-mono"
        />
      </div>

      {/* Text Color hex input */}
      <div className="space-y-1 pt-1">
        <label className="text-2xs text-muted-foreground">Text Color (Hex / Accent)</label>
        <input
          type="text"
          value={(selectedBlock.style.color as any)?.[device] || ""}
          onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "color", e.target.value, device))}
          placeholder="#ffffff or text-zinc-100"
          className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60 font-mono"
        />
      </div>

      {/* Custom Theme Accent Color update */}
      <div className="space-y-2 border-t border-border/10 pt-3">
        <label className="text-2xs font-bold text-muted-foreground">Theme Settings</label>
        <div className="space-y-1">
          <label className="text-3xs text-muted-foreground">Studio Accent Color</label>
          <div className="flex gap-2 items-center">
            <input
              type="color"
              value={state.theme.accentColor.startsWith("#") ? state.theme.accentColor : "#3b82f6"}
              onChange={(e) => runCommand(new UpdateThemeConfigCommand("accentColor", e.target.value))}
              className="h-8 w-8 rounded border border-border/40 p-0.5 cursor-pointer bg-background"
            />
            <input
              type="text"
              value={state.theme.accentColor}
              onChange={(e) => runCommand(new UpdateThemeConfigCommand("accentColor", e.target.value))}
              placeholder="#3b82f6"
              className="flex-1 h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. PROJECTS SELECTOR PANEL
// ==========================================
export function ProjectsPanel() {
  const { state, selection, runCommand } = useStudio();
  const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);

  // Load user's synced repos
  const repos = useQuery(api.github.getRepositories) || [];

  if (!selectedBlock || selectedBlock.type !== "projects") return null;

  // Cast both types to number to avoid string/number type mismatches
  const activeIds = ((selectedBlock.content.projectIds as any[]) || []).map((id) => Number(id));

  const handleToggleRepo = (repoId: number) => {
    let nextIds = [...activeIds];
    const targetId = Number(repoId);
    if (nextIds.includes(targetId)) {
      nextIds = nextIds.filter((id) => id !== targetId);
    } else {
      nextIds.push(targetId);
    }
    runCommand(new UpdateTextCommand(selectedBlock.id, "projectIds", nextIds));
  };

  const handleToggleStars = () => {
    runCommand(new UpdateTextCommand(selectedBlock.id, "showStars", !selectedBlock.content.showStars));
  };

  const handleToggleLanguages = () => {
    runCommand(new UpdateTextCommand(selectedBlock.id, "showLanguages", !selectedBlock.content.showLanguages));
  };

  return (
    <div className="space-y-3 border-t border-border/20 pt-4">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Configure Projects</h4>
      
      {/* Display Options */}
      <div className="space-y-1.5">
        <label className="text-2xs text-muted-foreground">Display Settings</label>
        <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/20 border border-border/40 text-xs font-medium">
          <span>Show Star Counts</span>
          <input
            type="checkbox"
            checked={!!selectedBlock.content.showStars}
            onChange={handleToggleStars}
            className="accent-brand cursor-pointer"
          />
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/20 border border-border/40 text-xs font-medium">
          <span>Show Tech Badges</span>
          <input
            type="checkbox"
            checked={!!selectedBlock.content.showLanguages}
            onChange={handleToggleLanguages}
            className="accent-brand cursor-pointer"
          />
        </div>
      </div>

      {/* Selected Repositories Order */}
      {activeIds.length > 0 && (
        <div className="space-y-1.5">
          <label className="text-2xs text-muted-foreground font-semibold">Reorder Selected Projects</label>
          <div className="border border-border/40 rounded-lg p-2 bg-background space-y-1.5 max-h-40 overflow-y-auto">
            {activeIds.map((id, index) => {
              const repo = repos.find((r) => Number(r.repoId) === id);
              if (!repo) return null;
              return (
                <div key={id} className="flex items-center justify-between p-1 px-2 bg-zinc-50/50 dark:bg-zinc-900/35 border border-border/20 rounded text-2xs">
                  <span className="font-semibold truncate max-w-[130px]">{repo.name}</span>
                  <div className="flex items-center gap-0.5">
                    <button
                      onClick={() => {
                        if (index === 0) return;
                        const nextIds = [...activeIds];
                        const temp = nextIds[index];
                        nextIds[index] = nextIds[index - 1];
                        nextIds[index - 1] = temp;
                        runCommand(new UpdateTextCommand(selectedBlock.id, "projectIds", nextIds));
                      }}
                      disabled={index === 0}
                      className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 text-muted-foreground hover:text-foreground transition-colors"
                      title="Move Up"
                    >
                      <ChevronUp className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => {
                        if (index === activeIds.length - 1) return;
                        const nextIds = [...activeIds];
                        const temp = nextIds[index];
                        nextIds[index] = nextIds[index + 1];
                        nextIds[index + 1] = temp;
                        runCommand(new UpdateTextCommand(selectedBlock.id, "projectIds", nextIds));
                      }}
                      disabled={index === activeIds.length - 1}
                      className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 text-muted-foreground hover:text-foreground transition-colors"
                      title="Move Down"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Repository Selection List */}
      <div className="space-y-1.5">
        <label className="text-2xs text-muted-foreground">Select Repositories</label>
        <div className="max-h-48 overflow-y-auto border border-border/40 rounded-lg p-2 bg-background space-y-1">
          {repos.length === 0 ? (
            <p className="text-2xs text-muted-foreground italic text-center p-2">No repositories synced yet.</p>
          ) : (
            repos.map((repo) => {
              const isChecked = activeIds.includes(Number(repo.repoId));
              return (
                <div
                  key={repo.repoId}
                  onClick={() => handleToggleRepo(repo.repoId)}
                  className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition-all ${
                    isChecked
                      ? "bg-brand/10 text-foreground border border-brand/20"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-900/40 border border-transparent"
                  }`}
                >
                  <span className="text-2xs font-semibold truncate max-w-[130px]">{repo.name}</span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="accent-brand pointer-events-none"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. AI ACTIONS PANEL
// ==========================================
export function AIPanel() {
  const { state, selection, runCommand } = useStudio();
  const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);
  
  // Convex AI rewrite action
  const processPrompt = useAction(api.ai.processPrompt);
  const [loading, setLoading] = React.useState(false);

  if (!selectedBlock) return null;

  // Render list of AI template triggers based on the block type
  const getPromptOptions = () => {
    switch (selectedBlock.type) {
      case "hero":
        return [
          { label: "Make Headline Catchy", prompt: "Make the title more punchy and professional. Return ONLY the title text." },
          { label: "Elaborate Bio Subtitle", prompt: "Expand this developer subtitle into an engaging, impact-focused bio. Return ONLY the subtitle text." },
        ];
      case "about":
        return [
          { label: "Sound Professional", prompt: "Rewrite this developer bio in a confident, professional software engineer tone. Return ONLY the bio." },
          { label: "Shorten Bio", prompt: "Shorten this developer bio for maximum readability while keeping key details. Return ONLY the bio." },
        ];
      case "contact":
        return [
          { label: "Draft Recruitment CTA", prompt: "Make this contact section invitation highly compelling for recruiters. Return ONLY the description." },
        ];
      default:
        return [];
    }
  };

  const options = getPromptOptions();
  if (options.length === 0) return null;

  const handleAIAction = async (promptTemplate: string, field: string) => {
    const content = selectedBlock.content as any;
    const textToImprove = content[field] || "";
    if (!textToImprove) {
      toast.warning("Please enter some text first before running AI improvements!");
      return;
    }

    setLoading(false);
    const toastId = toast.loading("Launching AI models to rewrite block...");
    try {
      setLoading(true);
      const res = await processPrompt({
        inputText: textToImprove,
        promptTemplate: promptTemplate,
      });

      if (res && res.outputText) {
        runCommand(new UpdateTextCommand(selectedBlock.id, field, res.outputText.trim()));
        toast.success("AI block optimization completed!", { id: toastId });
      } else {
        toast.error("AI returned empty results.", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to trigger AI rewrite.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 border-t border-border/20 pt-4">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-3.5 w-3.5 text-brand" />
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Studio Toolkit</h4>
      </div>

      <div className="flex flex-col gap-1.5">
        {options.map((opt, i) => {
          // Map option to correct field
          const targetField = selectedBlock.type === "hero" 
            ? (i === 0 ? "title" : "subtitle") 
            : (selectedBlock.type === "about" ? "text" : "description");

          return (
            <button
              key={opt.label}
              disabled={loading}
              onClick={() => handleAIAction(opt.prompt, targetField)}
              className="h-8 px-3 text-2xs font-semibold rounded-md border border-border/40 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-900/60 flex items-center justify-between text-left text-foreground transition-all"
            >
              <span>{opt.label}</span>
              <Sparkles className="h-3 w-3 text-muted-foreground/60" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 6. IMAGE PANEL
// ==========================================
export function ImagePanel() {
  const { state, selection, runCommand } = useStudio();
  const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);
  const device = state.preferences.device;

  const [uploading, setUploading] = React.useState(false);
  const [zoom, setZoom] = React.useState(100);
  const [rotate, setRotate] = React.useState(0);

  const generateUploadUrl = useMutation(api.studio.generateUploadUrl);
  const getStorageUrl = useMutation(api.studio.getStorageUrl);

  if (!selectedBlock) return null;

  const isHero = selectedBlock.type === "hero";
  const fieldName = isHero ? "avatarUrl" : "url";
  const currentUrl = (selectedBlock.content as any)[fieldName] || "";

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Instant local preview
    const localUrl = URL.createObjectURL(file);
    runCommand(new UpdateTextCommand(selectedBlock.id, fieldName, localUrl));
    toast.info("Uploading image to storage...");

    try {
      const uploadUrl = await generateUploadUrl();
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { storageId } = await response.json();
      const permanentUrl = await getStorageUrl({ storageId });

      if (permanentUrl) {
        runCommand(new UpdateTextCommand(selectedBlock.id, fieldName, permanentUrl));
        
        // Save to assets collection in state
        const currentAssets = state.assets || [];
        const newAsset = {
          name: file.name,
          url: permanentUrl,
          size: `${Math.round(file.size / 1024)} KB`,
          type: "Image",
        };
        runCommand(new UpdateAssetsCommand([...currentAssets, newAsset]));

        toast.success("Image uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image. Using local preview.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = () => {
    runCommand(new UpdateTextCommand(selectedBlock.id, fieldName, ""));
    toast.error("Image removed");
  };

  return (
    <div className="space-y-4 border-t border-border/20 pt-4">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <ImageIcon className="h-3.5 w-3.5" />
        Image Inspector
      </h4>

      {currentUrl && (
        <div className="relative group/inspector-img aspect-video rounded-lg border border-border/40 overflow-hidden bg-zinc-50 dark:bg-zinc-900/40">
          <img
            src={currentUrl}
            alt="Preview"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotate}deg)`,
              transition: "transform 0.1s ease-out",
            }}
            className="h-full w-full object-cover"
          />
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 p-1.5 rounded bg-red-500 text-white hover:bg-red-600 shadow-md opacity-0 group-hover/inspector-img:opacity-100 transition-opacity"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Upload button wrapper */}
      <div className="space-y-2">
        <label
          htmlFor="inspector-img-uploader"
          className="w-full h-8 rounded-lg border border-border/40 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-900/60 flex items-center justify-center text-2xs font-semibold text-foreground gap-1.5 cursor-pointer shadow-sm transition-all"
        >
          <Upload className="h-3.5 w-3.5 text-muted-foreground" />
          {uploading ? "Uploading..." : currentUrl ? "Replace Image" : "Upload Image"}
        </label>
        <input
          type="file"
          id="inspector-img-uploader"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
      </div>

      {/* Cropping scaffold controls */}
      {currentUrl && (
        <div className="space-y-3 border-t border-border/10 pt-3">
          <label className="text-2xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
            <Compass className="h-3 w-3" /> Cropping Scaffold
          </label>
          <div className="space-y-2">
            {/* Zoom Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-3xs text-muted-foreground">
                <span>Scale Zoom</span>
                <span>{zoom}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="200"
                value={zoom}
                onChange={(e) => setZoom(parseInt(e.target.value, 10))}
                className="w-full accent-brand bg-zinc-200 dark:bg-zinc-800 h-1 rounded-lg cursor-pointer"
              />
            </div>
            {/* Rotate Slider */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-3xs text-muted-foreground">
                <span>Rotate Alignment</span>
                <span>{rotate}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                value={rotate}
                onChange={(e) => setRotate(parseInt(e.target.value, 10))}
                className="w-full accent-brand bg-zinc-200 dark:bg-zinc-800 h-1 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Media Library assets selection */}
      {state.assets && state.assets.length > 0 && (
        <div className="space-y-2 border-t border-border/10 pt-3">
          <label className="text-2xs font-bold text-muted-foreground uppercase tracking-wider">
            Choose from Media Library
          </label>
          <div className="grid grid-cols-3 gap-1.5 max-h-[150px] overflow-y-auto pr-1">
            {state.assets
              .filter((a: any) => a.type === "Image")
              .map((asset: any, idx: number) => (
                <button
                  key={asset.url + idx}
                  onClick={() => runCommand(new UpdateTextCommand(selectedBlock.id, fieldName, asset.url))}
                  className={`aspect-square rounded-md border overflow-hidden hover:border-brand/60 transition-all bg-zinc-100 dark:bg-zinc-900 relative group/asset-picker ${
                    currentUrl === asset.url ? "border-brand ring-2 ring-brand/40" : "border-border/40"
                  }`}
                >
                  <img src={asset.url} alt={asset.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/asset-picker:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[8px] text-white font-bold uppercase">Apply</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. VIDEO PANEL
// ==========================================
export function VideoPanel() {
  const { state, selection, runCommand } = useStudio();
  const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);

  if (!selectedBlock) return null;

  const content = selectedBlock.content as any;
  const currentUrl = content.url || "";
  const currentProvider = content.provider || "direct";
  const currentAutoplay = content.autoplay || false;

  return (
    <div className="space-y-4 border-t border-border/20 pt-4">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <VideoIcon className="h-3.5 w-3.5" />
        Video Inspector
      </h4>

      {/* Video URL Input */}
      <div className="space-y-1">
        <label className="text-2xs text-muted-foreground">Video Source URL</label>
        <input
          type="text"
          value={currentUrl}
          onChange={(e) => runCommand(new UpdateTextCommand(selectedBlock.id, "url", e.target.value))}
          placeholder="https://example.com/movie.mp4"
          className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60 font-mono"
        />
      </div>

      {/* Provider Selector */}
      <div className="space-y-1">
        <label className="text-2xs text-muted-foreground">Video Provider</label>
        <select
          value={currentProvider}
          onChange={(e) => runCommand(new UpdateTextCommand(selectedBlock.id, "provider", e.target.value))}
          className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60"
        >
          <option value="direct">Direct Direct MP4 File Link</option>
          <option value="youtube">YouTube Embed Link</option>
          <option value="vimeo">Vimeo Embed Link</option>
        </select>
      </div>

      {/* Autoplay Checkbox */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="video-autoplay-checkbox"
          checked={currentAutoplay}
          onChange={(e) => runCommand(new UpdateTextCommand(selectedBlock.id, "autoplay", e.target.checked))}
          className="accent-brand cursor-pointer h-3.5 w-3.5 rounded"
        />
        <label htmlFor="video-autoplay-checkbox" className="text-2xs font-semibold text-foreground cursor-pointer">
          Autoplay Loop Mode
        </label>
      </div>
    </div>
  );
}

// ==========================================
// 8. ANIMATIONS PANEL
// ==========================================
export function AnimationsPanel() {
  const { state, selection, runCommand } = useStudio();
  const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);
  const device = state.preferences.device;

  if (!selectedBlock) return null;

  const currentPreset = selectedBlock.style.animationPreset?.desktop || "none";
  const currentDuration = selectedBlock.style.animationDuration?.desktop ?? 500;
  const currentDelay = selectedBlock.style.animationDelay?.desktop ?? 0;
  const currentEasing = selectedBlock.style.animationEasing?.desktop || "ease-out";
  const currentTrigger = selectedBlock.style.animationTrigger?.desktop || "viewport";

  return (
    <div className="space-y-4 border-t border-border/20 pt-4">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
        <Play className="h-3.5 w-3.5" />
        Animations
      </h4>

      {/* Animation Preset Selector */}
      <div className="space-y-1">
        <label className="text-2xs text-muted-foreground">Transition Preset</label>
        <select
          value={currentPreset}
          onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "animationPreset", e.target.value, device))}
          className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60"
        >
          <option value="none">None (Instant)</option>
          <option value="fade">Fade In</option>
          <option value="slide-up">Slide Up</option>
          <option value="slide-down">Slide Down</option>
          <option value="slide-left">Slide Left</option>
          <option value="slide-right">Slide Right</option>
          <option value="scale">Scale Up</option>
          <option value="zoom">Zoom Out</option>
          <option value="rotate">Subtle Rotate</option>
        </select>
      </div>

      {currentPreset !== "none" && (
        <>
          {/* Easing Options */}
          <div className="space-y-1">
            <label className="text-2xs text-muted-foreground">Transition Easing</label>
            <select
              value={currentEasing}
              onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "animationEasing", e.target.value, device))}
              className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60"
            >
              <option value="ease-out">Ease Out (Decel)</option>
              <option value="ease-in-out">Ease In-Out (Smooth)</option>
              <option value="ease-in">Ease In (Accel)</option>
              <option value="linear">Linear (Flat)</option>
            </select>
          </div>

          {/* Trigger Options */}
          <div className="space-y-1">
            <label className="text-2xs text-muted-foreground">Trigger Mode</label>
            <select
              value={currentTrigger}
              onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "animationTrigger", e.target.value, device))}
              className="w-full h-8 text-xs rounded-md border border-border/40 bg-background text-foreground px-2 outline-none focus:border-brand/60"
            >
              <option value="viewport">On Viewport Intersection</option>
              <option value="hover">On Cursor Hover</option>
            </select>
          </div>

          {/* Duration Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-2xs text-muted-foreground">
              <span>Duration</span>
              <span className="font-semibold text-foreground">{currentDuration}ms</span>
            </div>
            <input
              type="range"
              min="100"
              max="3000"
              step="50"
              value={currentDuration}
              onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "animationDuration", parseInt(e.target.value, 10), device))}
              className="w-full accent-brand bg-zinc-200 dark:bg-zinc-800 h-1 rounded-lg cursor-pointer"
            />
          </div>

          {/* Delay Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-2xs text-muted-foreground">
              <span>Start Delay</span>
              <span className="font-semibold text-foreground">{currentDelay}ms</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={currentDelay}
              onChange={(e) => runCommand(new UpdateStyleCommand(selectedBlock.id, "animationDelay", parseInt(e.target.value, 10), device))}
              className="w-full accent-brand bg-zinc-200 dark:bg-zinc-800 h-1 rounded-lg cursor-pointer"
            />
          </div>
        </>
      )}
    </div>
  );
}
