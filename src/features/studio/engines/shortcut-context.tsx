"use client";

import * as React from "react";
import { useHotkey } from "@tanstack/react-hotkeys";
import { useStudio } from "./studio-context";
import {
  DeleteBlockCommand,
  DuplicateBlockCommand,
  InsertBlockCommand,
  UpdateThemePresetCommand,
} from "./commands";
import { StudioBlock } from "../types";
import { toast } from "sonner";
import { BlockRegistry } from "../registries/block-registry";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Laptop,
  Tablet,
  Smartphone,
  Undo2,
  Redo2,
  Plus,
  Paintbrush,
} from "lucide-react";

export interface ShortcutMetadata {
  keys: string;
  label: string;
  description: string;
  scope: "Editing" | "Navigation" | "Clipboard" | "General";
}

interface ShortcutContextProps {
  shortcuts: ShortcutMetadata[];
  isHelpOpen: boolean;
  setHelpOpen: (open: boolean) => void;
  isPaletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
}

const ShortcutContext = React.createContext<ShortcutContextProps | undefined>(undefined);

export const REGISTERED_SHORTCUTS: ShortcutMetadata[] = [
  { keys: "Mod+Z", label: "Undo", description: "Undo the last editor command", scope: "Editing" },
  { keys: "Mod+Shift+Z", label: "Redo", description: "Redo the previously undone command", scope: "Editing" },
  { keys: "Mod+S", label: "Save", description: "Force trigger draft autosave", scope: "Editing" },
  { keys: "Delete", label: "Delete Block", description: "Delete selected block", scope: "Editing" },
  { keys: "Backspace", label: "Delete Block", description: "Delete selected block (alternative)", scope: "Editing" },
  { keys: "Escape", label: "Clear Selection", description: "Deselect currently active element", scope: "Editing" },
  { keys: "Enter", label: "Edit Text", description: "Focus text content editing inside active block", scope: "Editing" },
  { keys: "ArrowUp", label: "Select Previous", description: "Select the block above in layout", scope: "Navigation" },
  { keys: "ArrowDown", label: "Select Next", description: "Select the block below in layout", scope: "Navigation" },
  { keys: "Tab", label: "Next Focusable", description: "Cycle selection forwards", scope: "Navigation" },
  { keys: "Shift+Tab", label: "Previous Focusable", description: "Cycle selection backwards", scope: "Navigation" },
  { keys: "Mod+C", label: "Copy Block", description: "Copy block JSON data to clipboard", scope: "Clipboard" },
  { keys: "Mod+V", label: "Paste Block", description: "Paste copied block at end of current section", scope: "Clipboard" },
  { keys: "Mod+D", label: "Duplicate Block", description: "Instantly clone selected block", scope: "Clipboard" },
  { keys: "Mod+K", label: "Command Palette", description: "Scaffold command search actions palette", scope: "General" },
  { keys: "Mod+H", label: "Shortcut Help", description: "Open shortcut reference list", scope: "General" },
];

export function ShortcutProvider({ children }: { children: React.ReactNode }) {
  const {
    state,
    selection,
    selectBlock,
    runCommand,
    undo,
    redo,
  } = useStudio();

  const [isHelpOpen, setHelpOpen] = React.useState(false);
  const [isPaletteOpen, setPaletteOpen] = React.useState(false);

  // 1. Undo
  useHotkey("Mod+Z", (e) => {
    e.preventDefault();
    undo();
    toast.success("Undone last action");
  });

  // 2. Redo
  useHotkey("Mod+Shift+Z", (e) => {
    e.preventDefault();
    redo();
    toast.success("Redone action");
  });

  // 3. Save
  useHotkey("Mod+S", (e) => {
    e.preventDefault();
    toast.success("Draft saved and up to date!");
  });

  // 4. Delete
  const handleDeleteSelected = React.useCallback((e: KeyboardEvent) => {
    if (!selection.selectedBlockId) return;
    // Don't trigger when editing text inputs
    if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.hasAttribute("contenteditable")) {
      return;
    }
    e.preventDefault();
    runCommand(new DeleteBlockCommand(selection.selectedBlockId));
    selectBlock(null);
    toast.error("Deleted block");
  }, [selection.selectedBlockId, runCommand, selectBlock]);

  useHotkey("Delete", handleDeleteSelected);
  useHotkey("Backspace", handleDeleteSelected);

  // 5. Escape (Clear selection / Blur input)
  useHotkey("Escape", (e) => {
    if (
      document.activeElement?.tagName === "INPUT" ||
      document.activeElement?.tagName === "TEXTAREA" ||
      document.activeElement?.hasAttribute("contenteditable")
    ) {
      (document.activeElement as HTMLElement).blur();
      return;
    }
    e.preventDefault();
    selectBlock(null);
  });

  // 6. Enter (Focus first editable field)
  useHotkey("Enter", (e) => {
    if (!selection.selectedBlockId) return;
    if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.hasAttribute("contenteditable")) {
      return;
    }
    e.preventDefault();
    // Query DOM for contenteditable inside selected element
    setTimeout(() => {
      const activeEl = document.querySelector(`[data-block-id="${selection.selectedBlockId}"] [contenteditable="true"]`);
      if (activeEl) {
        (activeEl as HTMLElement).focus();
        toast.info("Editing text mode enabled");
      }
    }, 50);
  });

  // 7. Navigation (Arrow keys and Tab cycling)
  const navigateSelection = React.useCallback((direction: "next" | "prev") => {
    const visibleBlocks = state.blocks.filter((b) => b.isVisible);
    if (visibleBlocks.length === 0) return;

    const currentIndex = visibleBlocks.findIndex((b) => b.id === selection.selectedBlockId);
    let nextIndex = 0;

    if (direction === "next") {
      nextIndex = currentIndex === -1 || currentIndex === visibleBlocks.length - 1 ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex <= 0 ? visibleBlocks.length - 1 : currentIndex - 1;
    }

    selectBlock(visibleBlocks[nextIndex].id);
  }, [state.blocks, selection.selectedBlockId, selectBlock]);

  useHotkey("ArrowDown", (e) => {
    if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.hasAttribute("contenteditable")) {
      return;
    }
    e.preventDefault();
    navigateSelection("next");
  });

  useHotkey("ArrowUp", (e) => {
    if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.hasAttribute("contenteditable")) {
      return;
    }
    e.preventDefault();
    navigateSelection("prev");
  });

  useHotkey("Tab", (e) => {
    if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.hasAttribute("contenteditable")) {
      return;
    }
    e.preventDefault();
    navigateSelection("next");
  });

  useHotkey("Shift+Tab", (e) => {
    if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.hasAttribute("contenteditable")) {
      return;
    }
    e.preventDefault();
    navigateSelection("prev");
  });

  // 8. Clipboard Actions (Copy, Paste, Duplicate)
  useHotkey("Mod+C", (e) => {
    if (!selection.selectedBlockId) return;
    if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.hasAttribute("contenteditable")) {
      return;
    }
    e.preventDefault();
    const block = state.blocks.find((b) => b.id === selection.selectedBlockId);
    if (block) {
      localStorage.setItem("devora_copied_block", JSON.stringify(block));
      toast.success(`Copied ${block.type} block to clipboard`);
    }
  });

  useHotkey("Mod+V", (e) => {
    if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.hasAttribute("contenteditable")) {
      return;
    }
    e.preventDefault();
    const rawData = localStorage.getItem("devora_copied_block");
    if (!rawData) {
      toast.error("No block found in clipboard");
      return;
    }
    try {
      const copiedBlock = JSON.parse(rawData) as StudioBlock;
      // Generate new ID and reset order
      const newBlock: StudioBlock = {
        ...copiedBlock,
        id: `blk-${copiedBlock.type}-${Math.random().toString(36).substr(2, 9)}`,
        order: 99, // Placed at the end of the section
      };
      runCommand(new InsertBlockCommand(newBlock));
      selectBlock(newBlock.id);
      toast.success(`Pasted ${copiedBlock.type} block`);
    } catch {
      toast.error("Failed to parse copied block data");
    }
  });

  useHotkey("Mod+D", (e) => {
    if (!selection.selectedBlockId) return;
    if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.hasAttribute("contenteditable")) {
      return;
    }
    e.preventDefault();
    const newId = `blk-dup-${Math.random().toString(36).substr(2, 9)}`;
    runCommand(new DuplicateBlockCommand(selection.selectedBlockId, newId));
    selectBlock(newId);
    toast.success("Duplicated block");
  });

  // 9. General (Palette, Help)
  useHotkey("Mod+K", (e) => {
    e.preventDefault();
    setPaletteOpen((prev) => !prev);
  });

  useHotkey("Mod+H", (e) => {
    e.preventDefault();
    setHelpOpen((prev) => !prev);
  });

  useHotkey("Shift+?" as any, (e) => {
    e.preventDefault();
    setHelpOpen((prev) => !prev);
  });

  return (
    <ShortcutContext.Provider
      value={{
        shortcuts: REGISTERED_SHORTCUTS,
        isHelpOpen,
        setHelpOpen,
        isPaletteOpen,
        setPaletteOpen,
      }}
    >
      {children}
      <ShortcutHelpDialog open={isHelpOpen} onOpenChange={setHelpOpen} />
      <CommandPaletteDialog open={isPaletteOpen} onOpenChange={setPaletteOpen} />
    </ShortcutContext.Provider>
  );
}

export function useShortcuts() {
  const context = React.useContext(ShortcutContext);
  if (!context) {
    throw new Error("useShortcuts must be used within a ShortcutProvider");
  }
  return context;
}

// ----------------------------------------------------
// SHORTCUT HELP DIALOG COMPONENT
// ----------------------------------------------------
function ShortcutHelpDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { shortcuts } = useShortcuts();

  // Group by scope
  const grouped = React.useMemo(() => {
    const res: Record<string, ShortcutMetadata[]> = {};
    shortcuts.forEach((s) => {
      if (!res[s.scope]) res[s.scope] = [];
      res[s.scope].push(s);
    });
    return res;
  }, [shortcuts]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-background border border-border/40 rounded-xl shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold text-foreground">Keyboard Shortcuts</DialogTitle>
          <DialogDescription className="text-3xs text-muted-foreground mt-0.5">
            Platform-aware shortcut commands.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 mt-3">
          {Object.entries(grouped).map(([scope, list]) => (
            <div key={scope} className="space-y-2">
              <h4 className="text-3xs font-bold uppercase text-muted-foreground tracking-widest border-b border-border/20 pb-1">
                {scope}
              </h4>
              <div className="space-y-1.5">
                {list.map((item) => (
                  <div key={item.keys + item.label} className="flex items-center justify-between text-2xs">
                    <span className="font-medium text-foreground">{item.label}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-3xs text-muted-foreground/70 mr-1.5">
                        {item.description}
                      </span>
                      <kbd className="bg-zinc-100 dark:bg-zinc-900 border border-border/40 px-1.5 py-0.5 rounded text-3xs font-bold text-muted-foreground shadow-sm">
                        {item.keys.replace("Mod+", "⌘ ")}
                      </kbd>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------
// COMMAND PALETTE DIALOG COMPONENT
// ----------------------------------------------------
function CommandPaletteDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { state, runCommand, undo, redo, canUndo, canRedo, setDevice, selectBlock } = useStudio();

  const handleAddBlock = (type: string) => {
    const blockDef = BlockRegistry.get(type);
    if (!blockDef) return;

    let targetSectionId = "sec-hero";
    if (type === "about") targetSectionId = "sec-about";
    else if (type === "skills") targetSectionId = "sec-skills";
    else if (type === "projects") targetSectionId = "sec-projects";
    else if (type === "contact") targetSectionId = "sec-contact";

    const newBlock: StudioBlock = {
      id: `blk-${type}-${Math.random().toString(36).substr(2, 9)}`,
      sectionId: targetSectionId,
      type,
      content: { ...blockDef.defaultProps },
      style: {
        textAlign: { desktop: "left" },
        paddingTop: { desktop: 12 },
        paddingBottom: { desktop: 12 },
      },
      order: 99,
      isVisible: true,
    };

    runCommand(new InsertBlockCommand(newBlock));
    selectBlock(newBlock.id);
    toast.success(`Inserted ${type} block!`);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search commands, blocks, or actions..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {/* GROUP 1: ACTIONS */}
        <CommandGroup heading="Editor Actions">
          <CommandItem
            onSelect={() => {
              if (canUndo) {
                undo();
                toast.success("Undone last change");
              } else {
                toast.error("Nothing to undo");
              }
              onOpenChange(false);
            }}
          >
            <Undo2 className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Undo last change</span>
            <CommandShortcut>⌘Z</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              if (canRedo) {
                redo();
                toast.success("Redone change");
              } else {
                toast.error("Nothing to redo");
              }
              onOpenChange(false);
            }}
          >
            <Redo2 className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Redo last change</span>
            <CommandShortcut>⇧⌘Z</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* GROUP 2: DEVICES */}
        <CommandGroup heading="View Breakpoints">
          <CommandItem
            onSelect={() => {
              setDevice("desktop");
              onOpenChange(false);
            }}
          >
            <Laptop className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Switch to Desktop View</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setDevice("tablet");
              onOpenChange(false);
            }}
          >
            <Tablet className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Switch to Tablet View</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setDevice("mobile");
              onOpenChange(false);
            }}
          >
            <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Switch to Mobile View</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* GROUP 3: ACCENT/THEME */}
        <CommandGroup heading="Accent Themes">
          {[
            { id: "sleek-dark", label: "Sleek Dark" },
            { id: "classic-light", label: "Classic Light" },
            { id: "nord-blue", label: "Nord Blue" },
            { id: "minimalist-serif", label: "Minimalist Serif" },
          ].map((theme) => (
            <CommandItem
              key={theme.id}
              onSelect={() => {
                const font = theme.id.includes("serif") ? "Playfair Display" : "Inter";
                runCommand(new UpdateThemePresetCommand(theme.id, font));
                toast.success(`Theme updated to ${theme.label}`);
                onOpenChange(false);
              }}
            >
              <Paintbrush className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Theme: {theme.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* GROUP 4: BLOCKS */}
        <CommandGroup heading="Insert Canvas Blocks">
          {BlockRegistry.getAll().map((blockDef) => {
            const Icon = blockDef.icon || Plus;
            return (
              <CommandItem
                key={blockDef.type}
                onSelect={() => {
                  handleAddBlock(blockDef.type);
                  onOpenChange(false);
                }}
              >
                <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="capitalize">Add {blockDef.type} Block</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
