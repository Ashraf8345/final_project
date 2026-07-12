/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabling explicit-any rule is justified in this canvas container to allow dynamic runtime type casting for arbitrary block style objects.
"use client";

import * as React from "react";
import { useStudio } from "../engines/studio-context";
import { BlockRegistry } from "../registries/block-registry";
import {
  DeleteBlockCommand,
  MoveBlockCommand,
  DuplicateBlockCommand,
  ReorderBlocksCommand,
} from "../engines/commands";
import { Trash2, Copy, ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedBlockWrapper } from "./canvas-blocks";

// dnd-kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

const presetStyles: Record<string, React.CSSProperties> = {
  "classic-light": {
    backgroundColor: "#ffffff",
    color: "#09090b",
    borderColor: "#e4e4e7",
    ["--background" as any]: "oklch(1 0 0)",
    ["--foreground" as any]: "oklch(0.22 0.02 255)",
    ["--card" as any]: "oklch(0.996 0.002 250)",
    ["--card-foreground" as any]: "oklch(0.22 0.02 255)",
    ["--border" as any]: "oklch(0.9 0.007 252)",
    ["--muted" as any]: "oklch(0.965 0.004 252)",
    ["--muted-foreground" as any]: "oklch(0.49 0.02 255)",
  },
  "sleek-dark": {
    backgroundColor: "#09090b",
    color: "#fafafa",
    borderColor: "#27272a",
    ["--background" as any]: "oklch(0.13 0.005 240)",
    ["--foreground" as any]: "oklch(0.94 0.005 240)",
    ["--card" as any]: "oklch(0.16 0.005 240)",
    ["--card-foreground" as any]: "oklch(0.94 0.005 240)",
    ["--border" as any]: "oklch(1 0 0 / 0.08)",
    ["--muted" as any]: "oklch(0.19 0.005 240)",
    ["--muted-foreground" as any]: "oklch(0.68 0.005 240)",
  },
  "nord-blue": {
    backgroundColor: "#2e3440",
    color: "#eceff4",
    borderColor: "#3b4252",
    ["--background" as any]: "oklch(0.26 0.02 230)",
    ["--foreground" as any]: "oklch(0.94 0.01 240)",
    ["--card" as any]: "oklch(0.22 0.02 230)",
    ["--card-foreground" as any]: "oklch(0.94 0.01 240)",
    ["--border" as any]: "oklch(0.35 0.02 230)",
    ["--muted" as any]: "oklch(0.35 0.02 230)",
    ["--muted-foreground" as any]: "oklch(0.75 0.01 240)",
  },
  "minimalist-serif": {
    backgroundColor: "#faf8f5",
    color: "#1c1917",
    borderColor: "#e7e5e4",
    ["--background" as any]: "oklch(0.98 0.004 60)",
    ["--foreground" as any]: "oklch(0.2 0.01 60)",
    ["--card" as any]: "oklch(0.99 0.002 60)",
    ["--card-foreground" as any]: "oklch(0.2 0.01 60)",
    ["--border" as any]: "oklch(0.92 0.005 60)",
    ["--muted" as any]: "oklch(0.95 0.005 60)",
    ["--muted-foreground" as any]: "oklch(0.5 0.01 60)",
  },
};

export function StudioCanvas() {
  const {
    state,
    selection,
    selectBlock,
    hoverBlock,
    runCommand,
  } = useStudio();

  const device = state.preferences.device;

  // 1. Auto-scroll to selected block
  React.useEffect(() => {
    if (selection.selectedBlockId) {
      const element = document.getElementById(selection.selectedBlockId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selection.selectedBlockId]);

  // 2. Configure dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Triggers drag after 8px movement to prevent click conflicts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      runCommand(new ReorderBlocksCommand(active.id as string, over.id as string));
    }
  };

  // Determine viewport width class
  const getViewportWidthClass = () => {
    switch (device) {
      case "mobile":
        return "max-w-[390px] border border-border/40 shadow-xl my-6 rounded-2xl h-[780px] flex flex-col overflow-hidden";
      case "tablet":
        return "max-w-[768px] border border-border/40 shadow-lg my-4 rounded-xl h-[90vh] flex flex-col overflow-hidden";
      default:
        return "max-w-5xl w-full min-h-[80vh]";
    }
  };

  const canvasContent = (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="px-6 py-8 md:px-12 md:py-16 space-y-12">
        {state.sections
          .filter((s) => s.isVisible)
          .sort((a, b) => a.order - b.order)
          .map((section) => {
            const sectionBlocks = state.blocks
              .filter((b) => b.sectionId === section.id && b.isVisible)
              .sort((a, b) => a.order - b.order);

            return (
              <section
                key={section.id}
                className="relative group/section rounded-lg transition-all"
              >
                <SortableContext
                  items={sectionBlocks.map((b) => b.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-6">
                    {sectionBlocks.map((block) => {
                      const isSelected = selection.selectedBlockId === block.id;
                      const isHovered = selection.hoveredBlockId === block.id && !isSelected;
                      const blockDef = BlockRegistry.get(block.type);

                      if (!blockDef) return null;
                      const Renderer = blockDef.canvasRenderer;

                      return (
                        <SortableBlockItem
                          key={block.id}
                          block={block}
                          isSelected={isSelected}
                          isHovered={isHovered}
                          Renderer={Renderer}
                          selectBlock={selectBlock}
                          hoverBlock={hoverBlock}
                          runCommand={runCommand}
                          device={device}
                        />
                      );
                    })}
                  </div>
                </SortableContext>
              </section>
            );
          })}
      </div>
    </DndContext>
  );

  const preset = state.theme.presetName || "sleek-dark";
  const activePresetStyle: any = { ...presetStyles[preset] };

  if (state.theme.accentColor) {
    activePresetStyle["--primary" as any] = state.theme.accentColor;
  }

  return (
    <ScrollArea className="flex-1 h-full bg-zinc-100/50 dark:bg-zinc-950/20 select-none">
      <div className="flex justify-center items-start p-6 md:p-8 min-h-full">
        <div
          style={activePresetStyle}
          className={cn(
            "border shadow-sm transition-all duration-300 ease-in-out",
            preset === "minimalist-serif" ? "font-serif" : "font-sans",
            getViewportWidthClass()
          )}
        >
          {device !== "desktop" ? (
            <ScrollArea className="flex-1 h-full">
              {canvasContent}
            </ScrollArea>
          ) : (
            canvasContent
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

// ----------------------------------------------------
// SORTABLE ITEM WRAPPER COMPONENT
// ----------------------------------------------------
function SortableBlockItem({
  block,
  isSelected,
  isHovered,
  Renderer,
  selectBlock,
  hoverBlock,
  runCommand,
  device,
}: {
  block: any;
  isSelected: boolean;
  isHovered: boolean;
  Renderer: any;
  selectBlock: (id: string | null) => void;
  hoverBlock: (id: string | null) => void;
  runCommand: (cmd: any) => void;
  device: string;
}) {
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
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      id={block.id}
      onClick={(e) => {
        e.stopPropagation();
        selectBlock(block.id);
      }}
      onMouseEnter={() => hoverBlock(block.id)}
      onMouseLeave={() => hoverBlock(null)}
      className={`relative transition-all rounded-xl ${
        isSelected
          ? "ring-2 ring-brand dark:ring-brand z-10 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
          : isHovered
            ? "ring-1 ring-dashed ring-brand/40"
            : "hover:bg-zinc-50/10"
      }`}
    >
      {/* Selection handle overlays */}
      {isSelected && (
        <div className="absolute -top-9.5 left-2 bg-brand text-brand-foreground text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-2 shadow-md z-20 select-none animate-in fade-in duration-100">
          {/* Drag Grip Handle */}
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing hover:bg-brand-foreground/20 p-1 rounded transition-colors shrink-0"
            title="Drag to Reorder"
            onClick={(e) => e.stopPropagation()}
          >
            <GripVertical className="h-3.5 w-3.5" />
          </div>
          <span className="capitalize">{block.type}</span>
          <div className="flex items-center gap-1 border-l border-brand-foreground/30 pl-2 ml-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                runCommand(new MoveBlockCommand(block.id, "up"));
              }}
              className="hover:bg-brand-foreground/20 p-1 rounded transition-colors"
              title="Move Up"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                runCommand(new MoveBlockCommand(block.id, "down"));
              }}
              className="hover:bg-brand-foreground/20 p-1 rounded transition-colors"
              title="Move Down"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const newId = `blk-${block.type}-${Math.random().toString(36).substr(2, 9)}`;
                runCommand(new DuplicateBlockCommand(block.id, newId));
              }}
              className="hover:bg-brand-foreground/20 p-1 rounded transition-colors"
              title="Duplicate Block"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                runCommand(new DeleteBlockCommand(block.id));
                selectBlock(null);
              }}
              className="hover:bg-red-500/40 p-1 rounded transition-colors text-red-200 hover:text-white"
              title="Delete Block"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Block style overrides wrapper */}
      <div
        className="p-3 rounded-xl border border-transparent"
        style={{
          paddingTop: `${((block.style.paddingTop as any)?.[device] ?? 8) * 4}px`,
          paddingBottom: `${((block.style.paddingBottom as any)?.[device] ?? 8) * 4}px`,
          textAlign: (block.style.textAlign as any)?.[device] || "left",
        }}
      >
        <AnimatedBlockWrapper block={block}>
          <Renderer block={block} isSelected={isSelected} />
        </AnimatedBlockWrapper>
      </div>
    </div>
  );
}
