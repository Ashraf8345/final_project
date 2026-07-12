import * as React from "react";
import {
  TypographyPanel,
  SpacingPanel,
  ColorsPanel,
  ProjectsPanel,
  AIPanel,
  ImagePanel,
  VideoPanel,
  AnimationsPanel,
} from "../components/inspector-panels";

class InspectorRegistryClass {
  private registry = new Map<string, React.ComponentType>();

  register(name: string, panel: React.ComponentType) {
    this.registry.set(name, panel);
  }

  get(name: string): React.ComponentType | undefined {
    return this.registry.get(name);
  }

  getAll(): { name: string; component: React.ComponentType }[] {
    return Array.from(this.registry.entries()).map(([name, component]) => ({
      name,
      component,
    }));
  }
}

export const InspectorRegistry = new InspectorRegistryClass();

// ==========================================
// REGISTER ALL CONTEXTUAL INSPECTOR PANELS
// ==========================================
InspectorRegistry.register("typography", TypographyPanel);
InspectorRegistry.register("spacing", SpacingPanel);
InspectorRegistry.register("colors", ColorsPanel);
InspectorRegistry.register("projects", ProjectsPanel);
InspectorRegistry.register("ai", AIPanel);
InspectorRegistry.register("image", ImagePanel);
InspectorRegistry.register("video", VideoPanel);
InspectorRegistry.register("animations", AnimationsPanel);
