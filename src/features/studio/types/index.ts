/* eslint-disable @typescript-eslint/no-explicit-any */
// Disabling explicit-any rule is justified in these core studio types to allow mapping dynamic block component render signatures.
import * as React from "react";

// Breakpoints for responsive editing
export type DeviceBreakpoint = "desktop" | "tablet" | "mobile";

// Responsive container utility
export interface ResponsiveValue<T> {
  desktop: T;
  tablet?: T;
  mobile?: T;
}

// Layout sizing and spacing styles
export interface BlockStyle {
  width?: ResponsiveValue<string>;
  maxWidth?: ResponsiveValue<string>;
  textAlign?: ResponsiveValue<"left" | "center" | "right">;
  paddingTop?: ResponsiveValue<number>;
  paddingBottom?: ResponsiveValue<number>;
  paddingLeft?: ResponsiveValue<number>;
  paddingRight?: ResponsiveValue<number>;
  marginTop?: ResponsiveValue<number>;
  marginBottom?: ResponsiveValue<number>;
  fontSize?: ResponsiveValue<string>;
  fontWeight?: ResponsiveValue<string>;
  lineHeight?: ResponsiveValue<string>;
  letterSpacing?: ResponsiveValue<string>;
  textColor?: ResponsiveValue<string>;
  backgroundColor?: ResponsiveValue<string>;
  borderRadius?: ResponsiveValue<string>;
  boxShadow?: ResponsiveValue<string>;
  borderColor?: ResponsiveValue<string>;
  borderWidth?: ResponsiveValue<number>;
  gap?: ResponsiveValue<number>;
  // Animation settings
  animationPreset?: ResponsiveValue<"none" | "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "zoom" | "rotate">;
  animationDuration?: ResponsiveValue<number>;
  animationDelay?: ResponsiveValue<number>;
  animationEasing?: ResponsiveValue<"ease-in" | "ease-out" | "ease-in-out" | "linear">;
  animationTrigger?: ResponsiveValue<"viewport" | "hover">;
}

// Block and Section records
export interface StudioBlock {
  id: string;
  sectionId: string;
  type: string;
  content: Record<string, unknown>;
  style: BlockStyle;
  order: number;
  isVisible: boolean;
}

export interface StudioSection {
  id: string;
  name: string;
  order: number;
  isVisible: boolean;
  isPinned: boolean;
}

export interface StudioTheme {
  presetName: string;
  accentColor: string; // Hex or HSL color code
  fontFamily: string;
  spacing: number; // base padding unit
  isDark: boolean;
}

export interface StudioAsset {
  name: string;
  url: string;
  size: string;
  type: string;
}

// Combined Workspace State
export interface StudioState {
  studioId: string;
  name: string;
  theme: StudioTheme;
  sections: StudioSection[];
  blocks: StudioBlock[];
  assets?: StudioAsset[];
  preferences: {
    device: DeviceBreakpoint;
    isPreviewMode: boolean;
    activeTab: "layers" | "blocks" | "assets";
    showGrid: boolean;
  };
}

// Base Command interface for the Command pattern
export interface Command {
  id: string;
  label: string;
  execute(state: StudioState): StudioState;
  undo(state: StudioState): StudioState;
}

// Selection Manager State
export interface EditorSelection {
  selectedBlockId: string | null;
  selectedSectionId: string | null;
  hoveredBlockId: string | null;
  hoveredSectionId: string | null;
}

export interface RegisteredBlock {
  id: string;
  type: string;
  category: "hero" | "about" | "showcase" | "resume" | "custom";
  icon: React.ComponentType<any>;
  defaultProps: Record<string, unknown>;
  schema: unknown;
  canvasRenderer: React.ComponentType<{ block: StudioBlock; isSelected: boolean }>;
  inspectorPanels: string[];
  aiCapabilities: {
    canRewrite: boolean;
    prompts: string[];
  };
}
