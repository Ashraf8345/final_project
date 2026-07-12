/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabling explicit-any rule is justified in this workspace shell to support dynamic block creation parameters and registry indexing.
"use client";

import * as React from "react";
import { useStudio } from "../engines/studio-context";
import { BlockRegistry } from "../registries/block-registry";
import { InspectorRegistry } from "../registries/inspector-registry";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import {
  Undo2,
  Redo2,
  Laptop,
  Tablet,
  Smartphone,
  Layers,
  Plus,
  Image as ImageIcon,
  FolderOpen,
  Eye,
  EyeOff,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Globe,
  Loader2,
  Paintbrush,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudioBlock } from "../types";
import { InsertBlockCommand, DeleteBlockCommand, DuplicateBlockCommand, MoveBlockCommand, ToggleVisibilityCommand, UpdateThemePresetCommand, UpdateAssetsCommand, ReorderBlocksCommand, UpdateTextCommand, ReorderSectionsCommand } from "../engines/commands";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ==========================================
// 1. TOOLBAR COMPONENT
// ==========================================
export function StudioToolbar() {
  const {
    state,
    saveStatus,
    lastSavedTime,
    canUndo,
    canRedo,
    undo,
    redo,
    setDevice,
    runCommand,
  } = useStudio();

  const publishMutation = useMutation(api.studio.publishStudio);
  const [publishing, setPublishing] = React.useState(false);

  const handlePublish = async () => {
    setPublishing(true);
    const toastId = toast.loading("Publishing studio layout and committing changes...");
    try {
      await publishMutation({
        studioId: state.studioId,
        stateJson: JSON.stringify(state),
      });
      toast.success("Successfully published to Devora Studio and updated checkpoints!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to publish changes.", { id: toastId });
    } finally {
      setPublishing(false);
    }
  };

  const formattedTime = lastSavedTime
    ? new Date(lastSavedTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "";

  return (
    <div className="h-14 border-b border-border/40 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur px-4 flex items-center justify-between gap-4 select-none shrink-0">
      {/* Undo/Redo & Save Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 border-r border-border/40 pr-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={undo}
            disabled={!canUndo}
            className="h-8 w-8 text-foreground/80"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={redo}
            disabled={!canRedo}
            className="h-8 w-8 text-foreground/80"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Save indicator */}
        <span className="text-2xs font-medium text-muted-foreground flex items-center gap-1.5">
          {saveStatus === "saving" && (
            <>
              <Loader2 className="h-3 w-3 animate-spin text-brand" />
              Saving...
            </>
          )}
          {saveStatus === "saved" && (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Saved {formattedTime && `at ${formattedTime}`}
            </>
          )}
          {saveStatus === "unsaved" && (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              Unsaved Changes
            </>
          )}
        </span>
      </div>

      {/* Device Breakpoint Switcher */}
      <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-lg p-0.5 border border-border/40">
        {[
          { id: "desktop", icon: Laptop },
          { id: "tablet", icon: Tablet },
          { id: "mobile", icon: Smartphone },
        ].map((device) => {
          const Icon = device.icon;
          return (
            <button
              key={device.id}
              onClick={() => setDevice(device.id as any)}
              className={`h-7 px-2.5 rounded-md flex items-center justify-center transition-all ${
                state.preferences.device === device.id
                  ? "bg-background text-foreground shadow-sm font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-2xs px-2.5 rounded-lg border border-border/40 bg-background text-foreground font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Paintbrush className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="capitalize">{state.theme.presetName?.replace("-", " ") || "Select Theme"}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground/60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px] border border-border/40 bg-popover text-popover-foreground">
            {[
              { id: "sleek-dark", label: "Sleek Dark" },
              { id: "classic-light", label: "Classic Light" },
              { id: "nord-blue", label: "Nord Blue" },
              { id: "minimalist-serif", label: "Minimalist Serif" },
            ].map((theme) => (
              <DropdownMenuItem
                key={theme.id}
                onClick={() => {
                  const font = theme.id.includes("serif") ? "Playfair Display" : "Inter";
                  runCommand(new UpdateThemePresetCommand(theme.id, font));
                }}
                className={`text-2xs font-semibold cursor-pointer ${
                  state.theme.presetName === theme.id ? "bg-zinc-100 dark:bg-zinc-900" : ""
                }`}
              >
                {theme.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={handlePublish}
          disabled={publishing}
          size="sm"
          className="bg-brand text-brand-foreground hover:bg-brand/90 text-xs font-semibold h-8 rounded-lg shadow-sm"
        >
          {publishing ? (
            <>
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Globe className="mr-1.5 h-3.5 w-3.5" />
              Publish
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ==========================================
// 2. LAYERS PANEL COMPONENT
// ==========================================

interface SortableLayerItemProps {
  block: StudioBlock;
  isSelected: boolean;
  selectBlock: (id: string) => void;
  handleMove: (e: React.MouseEvent, id: string, direction: "up" | "down") => void;
  handleToggleHide: (e: React.MouseEvent, id: string) => void;
  handleDuplicate: (e: React.MouseEvent, id: string) => void;
  handleDelete: (e: React.MouseEvent, id: string) => void;
  Icon: React.ComponentType<any>;
}

function SortableLayerItem({
  block,
  isSelected,
  selectBlock,
  handleMove,
  handleToggleHide,
  handleDuplicate,
  handleDelete,
  Icon,
}: SortableLayerItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => selectBlock(block.id)}
      className={cn(
        "group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all border select-none touch-none",
        isSelected
          ? "bg-brand/10 text-foreground border-brand/40 shadow-sm"
          : "bg-background border-border/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/35"
      )}
    >
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        {/* Grab Handle */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-muted-foreground/45 hover:text-foreground shrink-0 transition-colors"
        >
          <GripVertical className="h-3.5 w-3.5" />
        </div>
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="text-2xs font-semibold truncate capitalize">
          {block.type} Block
        </span>
      </div>

      {/* Quick layer actions */}
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
        <button
          onClick={(e) => handleMove(e, block.id, "up")}
          className="h-5 w-5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-muted-foreground"
          title="Move Up"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => handleMove(e, block.id, "down")}
          className="h-5 w-5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-muted-foreground"
          title="Move Down"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => handleToggleHide(e, block.id)}
          className="h-5 w-5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-muted-foreground"
          title="Toggle Visibility"
        >
          {block.isVisible ? (
            <Eye className="h-3.5 w-3.5" />
          ) : (
            <EyeOff className="h-3.5 w-3.5 text-red-500" />
          )}
        </button>
        <button
          onClick={(e) => handleDuplicate(e, block.id)}
          className="h-5 w-5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-muted-foreground"
          title="Duplicate"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={(e) => handleDelete(e, block.id)}
          className="h-5 w-5 rounded hover:bg-red-50 dark:hover:bg-red-950 flex items-center justify-center text-red-500"
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function SortableSectionItem({
  section,
  children,
}: {
  section: any;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
    position: "relative" as const,
  };

  return (
    <div ref={setNodeRef} style={style} className="space-y-1 rounded-xl border border-border/10 bg-zinc-50/50 dark:bg-zinc-950/20 p-2 shadow-2xs">
      {/* Section Title Header (Acts as the drag handle for the section) */}
      <div className="flex items-center justify-between p-1.5 rounded-lg bg-zinc-100/80 dark:bg-zinc-900/60 border border-border/20 text-xs font-bold text-foreground group/section">
        <div className="flex items-center gap-1.5 min-w-0">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing hover:bg-zinc-200 dark:hover:bg-zinc-800 p-0.5 rounded transition-colors text-muted-foreground shrink-0"
            title="Drag Section to Reorder"
          >
            <GripVertical className="h-3 w-3" />
          </div>
          <span className="truncate">{section.name} Section</span>
        </div>
      </div>
      {children}
    </div>
  );
}

export function LayersPanel() {
  const { state, selection, selectBlock, runCommand } = useStudio();

  // Configure sensors for drag activation
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4, // Triggers drag immediately after 4px movement on handle
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeIdStr = active.id as string;
      const overIdStr = over.id as string;

      if (activeIdStr.startsWith("sec-") && overIdStr.startsWith("sec-")) {
        runCommand(new ReorderSectionsCommand(activeIdStr, overIdStr));
        toast.success("Sections reordered!");
      } else if (activeIdStr.startsWith("blk-") && overIdStr.startsWith("blk-")) {
        runCommand(new ReorderBlocksCommand(activeIdStr, overIdStr));
      }
    }
  };

  const handleToggleHide = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    runCommand(new ToggleVisibilityCommand(id));
  };

  const handleDuplicate = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newId = `blk-${Math.random().toString(36).substr(2, 9)}`;
    runCommand(new DuplicateBlockCommand(id, newId));
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    runCommand(new DeleteBlockCommand(id));
  };

  const handleMove = (e: React.MouseEvent, id: string, direction: "up" | "down") => {
    e.stopPropagation();
    runCommand(new MoveBlockCommand(id, direction));
  };

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            Sections & Blocks
          </h3>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={state.sections.sort((a, b) => a.order - b.order).map((s) => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {state.sections
                  .sort((a, b) => a.order - b.order)
                  .map((section) => {
                    const sectionBlocks = state.blocks
                      .filter((b) => b.sectionId === section.id)
                      .sort((a, b) => a.order - b.order);

                    return (
                      <SortableSectionItem key={section.id} section={section}>
                        {/* Nested Sortable Blocks List */}
                        <SortableContext
                          items={sectionBlocks.map((b) => b.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="pl-3 border-l border-border/40 space-y-1 mt-1">
                            {sectionBlocks.map((block) => {
                              const isSelected = selection.selectedBlockId === block.id;
                              const blockDef = BlockRegistry.get(block.type);
                              const Icon = blockDef?.icon || Layers;

                              return (
                                <SortableLayerItem
                                  key={block.id}
                                  block={block}
                                  isSelected={isSelected}
                                  selectBlock={selectBlock}
                                  handleMove={handleMove}
                                  handleToggleHide={handleToggleHide}
                                  handleDuplicate={handleDuplicate}
                                  handleDelete={handleDelete}
                                  Icon={Icon}
                                />
                              );
                            })}
                          </div>
                        </SortableContext>
                      </SortableSectionItem>
                    );
                  })}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </ScrollArea>
  );
}

// ==========================================
// 3. BLOCK LIBRARY COMPONENT
// ==========================================
function generateRandomBlockId(type: string): string {
  return `blk-${type}-${Math.random().toString(36).substr(2, 9)}`;
}

export function BlockLibrary() {
  const { runCommand, selectBlock } = useStudio();
  const blocks = BlockRegistry.getAll();

  const handleAddBlock = (type: string) => {
    const blockDef = BlockRegistry.get(type);
    if (!blockDef) return;

    // Find the appropriate section to place the block
    let targetSectionId = "sec-hero";
    if (type === "about") targetSectionId = "sec-about";
    else if (type === "skills") targetSectionId = "sec-skills";
    else if (type === "projects") targetSectionId = "sec-projects";
    else if (type === "contact") targetSectionId = "sec-contact";

    const newBlockId = generateRandomBlockId(type);
    const newBlock: StudioBlock = {
      id: newBlockId,
      sectionId: targetSectionId,
      type,
      content: { ...blockDef.defaultProps },
      style: {
        textAlign: { desktop: "left" },
        paddingTop: { desktop: 12 },
        paddingBottom: { desktop: 12 },
      },
      order: 99, // Placed at the end
      isVisible: true,
    };

    runCommand(new InsertBlockCommand(newBlock));
    selectBlock(newBlockId);
    toast.success(`Added a new ${type} block to the layout!`);
  };

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="p-4 space-y-4">
        <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Add Layout Blocks
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {blocks.map((b) => {
            const Icon = b.icon || Layers;
            return (
              <button
                key={b.type}
                onClick={() => handleAddBlock(b.type)}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/40 bg-zinc-50/40 hover:bg-zinc-100/50 dark:bg-zinc-900/20 dark:hover:bg-zinc-900/60 transition-all hover:border-brand/40 text-center gap-2 group"
              >
                <div className="h-10 w-10 rounded-lg bg-background border border-border/40 flex items-center justify-center text-muted-foreground group-hover:text-brand shadow-sm transition-all">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xs font-semibold capitalize text-foreground">{b.type}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  </ScrollArea>
  );
}
// ==========================================
// 4. ASSET MANAGER COMPONENT
// ==========================================
export function AssetManager() {
  const { state, selection, runCommand } = useStudio();
  const generateUploadUrl = useMutation(api.studio.generateUploadUrl);
  const getStorageUrl = useMutation(api.studio.getStorageUrl);
  const [uploading, setUploading] = React.useState(false);

  const assets = state.assets || [];

  const handleApplyAsset = (url: string) => {
    if (!selection.selectedBlockId) {
      toast.warning("Please select a Hero or Image block first on the canvas to apply this asset.");
      return;
    }
    const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);
    if (!selectedBlock) return;

    if (selectedBlock.type === "hero") {
      runCommand(new UpdateTextCommand(selectedBlock.id, "avatarUrl", url));
      toast.success("Applied asset as hero avatar!");
    } else if (selectedBlock.type === "image") {
      runCommand(new UpdateTextCommand(selectedBlock.id, "url", url));
      toast.success("Applied asset to image block!");
    } else {
      toast.warning(`Selected block (${selectedBlock.type}) does not support direct image asset replacement.`);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    toast.info("Uploading asset to storage...");

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
        const newAsset = {
          name: file.name,
          url: permanentUrl,
          size: `${Math.round(file.size / 1024)} KB`,
          type: file.type.startsWith("image/") ? "Image" : "Document",
        };
        runCommand(new UpdateAssetsCommand([...assets, newAsset]));
        toast.success("Asset uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload asset.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const nextAssets = assets.filter((_, idx) => idx !== index);
    runCommand(new UpdateAssetsCommand(nextAssets));
    toast.error("Asset removed from library.");
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploading(true);
      toast.info("Uploading dropped asset...");
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
          const newAsset = {
            name: file.name,
            url: permanentUrl,
            size: `${Math.round(file.size / 1024)} KB`,
            type: file.type.startsWith("image/") ? "Image" : "Document",
          };
          runCommand(new UpdateAssetsCommand([...assets, newAsset]));
          toast.success("Asset uploaded successfully!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload dropped file.");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto h-full pr-1 select-none scrollbar-thin">
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ImageIcon className="h-3.5 w-3.5" />
            Media & Assets
          </h3>
          
          {/* Uploader Dropzone */}
          <label
            htmlFor="media-uploader-input"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border border-dashed border-border/80 rounded-xl p-6 text-center space-y-2 bg-zinc-50/20 dark:bg-zinc-900/10 mb-4 flex flex-col items-center justify-center cursor-pointer hover:border-brand/40 hover:bg-zinc-50/45 dark:hover:bg-zinc-900/30 transition-all shadow-sm"
          >
            <div className="h-8 w-8 rounded-lg bg-background border border-border/40 flex items-center justify-center text-muted-foreground shadow-sm">
              {uploading ? (
                <Loader2 className="h-4 w-4 animate-spin text-brand" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </div>
            <p className="text-2xs font-semibold text-foreground">
              {uploading ? "Uploading file..." : "Upload or drop file"}
            </p>
            <p className="text-3xs text-muted-foreground">Supports PNG, JPG, PDF up to 5MB</p>
          </label>
          <input
            type="file"
            id="media-uploader-input"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />

          <div className="space-y-1.5">
            {assets.length === 0 ? (
              <p className="text-center text-3xs text-muted-foreground py-6">No assets uploaded yet</p>
            ) : (
              assets.map((asset, i) => {
                const Icon = asset.type === "Image" ? ImageIcon : FolderOpen;
                return (
                  <div
                    key={asset.url + i}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", asset.url);
                      e.dataTransfer.setData("type", "image-asset");
                    }}
                    onClick={() => handleApplyAsset(asset.url)}
                    className="group flex items-center justify-between p-2 rounded-lg border border-border/20 bg-background text-2xs hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors cursor-pointer select-none"
                    title="Click to apply to selected block, or drag onto canvas"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <div className="truncate">
                        <p className="font-semibold text-foreground truncate">{asset.name}</p>
                        <p className="text-3xs text-muted-foreground">{asset.type} • {asset.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDelete(e, i)}
                      className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Inspector() {
  const { state, selection } = useStudio();
  const selectedBlock = state.blocks.find((b) => b.id === selection.selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center select-none">
        <Layers className="h-8 w-8 text-muted-foreground/40 mb-3" />
        <p className="text-xs font-semibold text-muted-foreground">Select an element on canvas</p>
        <p className="text-3xs text-muted-foreground mt-1 max-w-[160px] leading-normal">
          Click any block on the live canvas to configure its layout, typography, colors, and AI properties.
        </p>
      </div>
    );
  }

  const blockDef = BlockRegistry.get(selectedBlock.type);
  const activePanels = [...(blockDef?.inspectorPanels || []), "animations"];

  return (
    <div className="flex-1 overflow-y-auto h-full select-none scrollbar-thin">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-2">
          <div>
            <h3 className="text-xs font-bold text-foreground capitalize">{selectedBlock.type} Block</h3>
            <p className="text-3xs text-muted-foreground mt-0.5">Edit properties contextually</p>
          </div>
        </div>

        {/* Render matching panel components from registry */}
        <div className="space-y-4">
          {activePanels.map((panelKey: string) => {
            const Panel = InspectorRegistry.get(panelKey);
            return Panel ? React.createElement(Panel, { key: panelKey }) : null;
          })}

          {/* AI rewriting panel is automatically appended if block supports it */}
          {(() => {
            const AIPanelComponent = InspectorRegistry.get("ai");
            return blockDef?.aiCapabilities?.canRewrite && AIPanelComponent ? (
              React.createElement(AIPanelComponent)
            ) : null;
          })()}
        </div>
      </div>
    </div>
  );
}
