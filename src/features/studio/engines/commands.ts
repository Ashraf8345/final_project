/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabling explicit-any rule is justified in this command framework to enable clean, dynamic indexing of state schemas.
import { Command, StudioState, StudioBlock, DeviceBreakpoint } from "../types";

// Helper to deep clone the state to prevent mutations during undo/redo
function deepCloneState(state: StudioState): StudioState {
  return JSON.parse(JSON.stringify(state));
}

// Helpers for nested object access
function getNestedValue(obj: any, path: string): any {
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[part];
  }
  return current;
}

function setNestedValue(obj: any, path: string, value: any): any {
  const parts = path.split(".");
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    const isNextNumber = !isNaN(Number(nextPart));
    
    if (current[part] === undefined) {
      current[part] = isNextNumber ? [] : {};
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
  return obj;
}

// 1. UPDATE TEXT / CONTENT FIELD COMMAND
export class UpdateTextCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Edit Content";
  private prevValue: any;

  constructor(
    private blockId: string,
    private field: string,
    private newValue: any
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    const block = nextState.blocks.find((b) => b.id === this.blockId);
    if (block) {
      this.prevValue = getNestedValue(block.content, this.field);
      setNestedValue(block.content, this.field, this.newValue);
    }
    return nextState;
  }

  undo(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    const block = nextState.blocks.find((b) => b.id === this.blockId);
    if (block) {
      setNestedValue(block.content, this.field, this.prevValue);
    }
    return nextState;
  }
}

// 2. UPDATE STYLE COMMAND
export class UpdateStyleCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Update Styling";
  private prevValue: any;

  constructor(
    private blockId: string,
    private property: string,
    private value: any,
    private device: DeviceBreakpoint = "desktop"
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    const block = nextState.blocks.find((b) => b.id === this.blockId);
    if (block) {
      const styleObj = (block.style as any)[this.property] || { desktop: undefined };
      this.prevValue = styleObj[this.device];
      
      // Initialize if empty
      if (!(block.style as any)[this.property]) {
        (block.style as any)[this.property] = {};
      }
      
      (block.style as any)[this.property][this.device] = this.value;
    }
    return nextState;
  }

  undo(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    const block = nextState.blocks.find((b) => b.id === this.blockId);
    if (block) {
      if ((block.style as any)[this.property]) {
        (block.style as any)[this.property][this.device] = this.prevValue;
      }
    }
    return nextState;
  }
}

// 3. INSERT BLOCK COMMAND
export class InsertBlockCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Add Block";

  constructor(
    private newBlock: StudioBlock,
    private index?: number
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);

    // Ensure parent section is visible
    nextState.sections = nextState.sections.map((s) => {
      if (s.id === this.newBlock.sectionId) {
        return { ...s, isVisible: true };
      }
      return s;
    });

    const sectionBlocks = nextState.blocks
      .filter((b) => b.sectionId === this.newBlock.sectionId)
      .sort((a, b) => a.order - b.order);

    const insertAt = this.index ?? sectionBlocks.length;
    nextState.blocks.push({
      ...this.newBlock,
      order: insertAt,
    });

    // Shift orders of subsequent blocks in the same section
    nextState.blocks = nextState.blocks.map((b) => {
      if (b.sectionId === this.newBlock.sectionId && b.id !== this.newBlock.id && b.order >= insertAt) {
        return { ...b, order: b.order + 1 };
      }
      return b;
    });

    return nextState;
  }

  undo(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    const targetBlock = state.blocks.find((b) => b.id === this.newBlock.id);
    if (!targetBlock) return state;

    nextState.blocks = nextState.blocks.filter((b) => b.id !== this.newBlock.id);
    nextState.blocks = nextState.blocks.map((b) => {
      if (b.sectionId === this.newBlock.sectionId && b.order > targetBlock.order) {
        return { ...b, order: b.order - 1 };
      }
      return b;
    });

    return nextState;
  }
}

// 4. DELETE BLOCK COMMAND
export class DeleteBlockCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Remove Block";
  private deletedBlock: StudioBlock | null = null;
  private prevOrder = 0;

  constructor(private blockId: string) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    const blockIndex = state.blocks.findIndex((b) => b.id === this.blockId);
    if (blockIndex === -1) return state;

    this.deletedBlock = state.blocks[blockIndex];
    this.prevOrder = this.deletedBlock.order;

    nextState.blocks = nextState.blocks.filter((b) => b.id !== this.blockId);
    nextState.blocks = nextState.blocks.map((b) => {
      if (b.sectionId === this.deletedBlock!.sectionId && b.order > this.prevOrder) {
        return { ...b, order: b.order - 1 };
      }
      return b;
    });

    return nextState;
  }

  undo(state: StudioState): StudioState {
    if (!this.deletedBlock) return state;
    const nextState = deepCloneState(state);
    
    // Put back the block
    nextState.blocks.push({
      ...this.deletedBlock,
      order: this.prevOrder,
    });

    // Shift other blocks back up
    nextState.blocks = nextState.blocks.map((b) => {
      if (b.sectionId === this.deletedBlock!.sectionId && b.id !== this.deletedBlock!.id && b.order >= this.prevOrder) {
        return { ...b, order: b.order + 1 };
      }
      return b;
    });

    return nextState;
  }
}

// 5. DUPLICATE BLOCK COMMAND
export class DuplicateBlockCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Duplicate Block";
  private createdBlockId: string | null = null;

  constructor(
    private blockId: string,
    private newBlockId: string
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    const sourceBlock = state.blocks.find((b) => b.id === this.blockId);
    if (!sourceBlock) return state;

    this.createdBlockId = this.newBlockId;
    const insertAt = sourceBlock.order + 1;

    // Shift all subsequent blocks down
    nextState.blocks = nextState.blocks.map((b) => {
      if (b.sectionId === sourceBlock.sectionId && b.order >= insertAt) {
        return { ...b, order: b.order + 1 };
      }
      return b;
    });

    nextState.blocks.push({
      ...sourceBlock,
      id: this.newBlockId,
      order: insertAt,
    });

    return nextState;
  }

  undo(state: StudioState): StudioState {
    if (!this.createdBlockId) return state;
    const nextState = deepCloneState(state);

    const createdBlock = state.blocks.find((b) => b.id === this.createdBlockId);
    if (!createdBlock) return state;

    nextState.blocks = nextState.blocks.filter((b) => b.id !== this.createdBlockId);
    nextState.blocks = nextState.blocks.map((b) => {
      if (b.sectionId === createdBlock.sectionId && b.order > createdBlock.order) {
        return { ...b, order: b.order - 1 };
      }
      return b;
    });

    return nextState;
  }
}

// 6. MOVE BLOCK COMMAND (REORDER)
export class MoveBlockCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Move Block";

  constructor(
    private blockId: string,
    private direction: "up" | "down"
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    const block = nextState.blocks.find((b) => b.id === this.blockId);
    if (!block) return state;

    const sectionBlocks = nextState.blocks
      .filter((b) => b.sectionId === block.sectionId)
      .sort((a, b) => a.order - b.order);

    const blockIndex = sectionBlocks.findIndex((b) => b.id === this.blockId);
    const swapWithIndex = this.direction === "up" ? blockIndex - 1 : blockIndex + 1;

    if (swapWithIndex < 0 || swapWithIndex >= sectionBlocks.length) return state;

    const otherBlock = sectionBlocks[swapWithIndex];
    const prevOrder = block.order;

    // Swap orders
    block.order = otherBlock.order;
    
    // Find the actual record of the other block in nextState and swap its order
    const nextOtherBlock = nextState.blocks.find((b) => b.id === otherBlock.id);
    if (nextOtherBlock) {
      nextOtherBlock.order = prevOrder;
    }

    return nextState;
  }

  undo(state: StudioState): StudioState {
    // Swapping back is identical to moving in opposite direction
    const oppositeDirection = this.direction === "up" ? "down" : "up";
    const reverseCommand = new MoveBlockCommand(this.blockId, oppositeDirection);
    return reverseCommand.execute(state);
  }
}

// 7. TOGGLE VISIBILITY COMMAND
export class ToggleVisibilityCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Toggle Visibility";

  constructor(
    private targetId: string,
    private isBlock: boolean = true
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    if (this.isBlock) {
      const block = nextState.blocks.find((b) => b.id === this.targetId);
      if (block) block.isVisible = !block.isVisible;
    } else {
      const section = nextState.sections.find((s) => s.id === this.targetId);
      if (section) section.isVisible = !section.isVisible;
    }
    return nextState;
  }

  undo(state: StudioState): StudioState {
    return this.execute(state); // Double toggle toggles back
  }
}

// 8. UPDATE THEME PRESET COMMAND
export class UpdateThemePresetCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Change Theme Preset";
  private prevPreset: string = "";
  private prevFont: string = "";

  constructor(
    private presetName: string,
    private fontFamily: string
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    this.prevPreset = state.theme.presetName;
    this.prevFont = state.theme.fontFamily;

    nextState.theme.presetName = this.presetName;
    nextState.theme.fontFamily = this.fontFamily;
    return nextState;
  }

  undo(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    nextState.theme.presetName = this.prevPreset;
    nextState.theme.fontFamily = this.prevFont;
    return nextState;
  }
}

// 10. UPDATE THEME CONFIG COMMAND
export class UpdateThemeConfigCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Update Theme Configuration";
  private prevValue: any;

  constructor(
    private key: string,
    private value: any
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    this.prevValue = (nextState.theme as any)[this.key];
    (nextState.theme as any)[this.key] = this.value;
    return nextState;
  }

  undo(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    (nextState.theme as any)[this.key] = this.prevValue;
    return nextState;
  }
}

// 9. UPDATE ASSETS LIST COMMAND
export class UpdateAssetsCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Update Assets Library";
  private prevAssets: any[] = [];

  constructor(private nextAssets: any[]) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    this.prevAssets = state.assets || [];
    nextState.assets = this.nextAssets;
    return nextState;
  }

  undo(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    nextState.assets = this.prevAssets;
    return nextState;
  }
}

// 10. REORDER BLOCKS COMMAND
export class ReorderBlocksCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Reorder Blocks";
  private prevBlocks: StudioBlock[] = [];

  constructor(
    private activeId: string,
    private overId: string
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    this.prevBlocks = JSON.parse(JSON.stringify(state.blocks));

    const activeIndex = nextState.blocks.findIndex((b) => b.id === this.activeId);
    const overIndex = nextState.blocks.findIndex((b) => b.id === this.overId);

    if (activeIndex !== -1 && overIndex !== -1) {
      const [removed] = nextState.blocks.splice(activeIndex, 1);
      nextState.blocks.splice(overIndex, 0, removed);

      // Re-assign order parameters based on index
      nextState.blocks.forEach((block, idx) => {
        block.order = idx;
      });
    }

    return nextState;
  }

  undo(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    nextState.blocks = this.prevBlocks;
    return nextState;
  }
}

// 11. REORDER SECTIONS COMMAND
export class ReorderSectionsCommand implements Command {
  id = Math.random().toString(36).substr(2, 9);
  label = "Reorder Sections";
  private prevSections: any[] = [];

  constructor(
    private activeId: string,
    private overId: string
  ) {}

  execute(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    this.prevSections = JSON.parse(JSON.stringify(state.sections));

    const activeIndex = nextState.sections.findIndex((s) => s.id === this.activeId);
    const overIndex = nextState.sections.findIndex((s) => s.id === this.overId);

    if (activeIndex !== -1 && overIndex !== -1) {
      const [removed] = nextState.sections.splice(activeIndex, 1);
      nextState.sections.splice(overIndex, 0, removed);

      // Re-assign order parameters based on index
      nextState.sections.forEach((section, idx) => {
        section.order = idx;
      });
    }

    return nextState;
  }

  undo(state: StudioState): StudioState {
    const nextState = deepCloneState(state);
    nextState.sections = this.prevSections;
    return nextState;
  }
}

