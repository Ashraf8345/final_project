"use client";

import * as React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { StudioProvider, useStudio } from "@/features/studio/engines/studio-context";
import { ShortcutProvider } from "@/features/studio/engines/shortcut-context";
import {
  StudioToolbar,
  LayersPanel,
  BlockLibrary,
  AssetManager,
  Inspector,
} from "@/features/studio/components/editor-panels";
import { StudioCanvas } from "@/features/studio/components/studio-canvas";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2, Sparkles, Layers, Plus, Image } from "lucide-react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

function StudioWorkspaceInner() {
  const { state, setTab } = useStudio();
  const activeTab = state.preferences.activeTab;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden border border-border/40 rounded-xl bg-background shadow-lg">
      {/* 1. TOP HEADER TOOLBAR */}
      <StudioToolbar />

      {/* 2. THREE COLUMN LAYOUT WORKSPACE */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative allotment-custom-theme">
        <Allotment defaultSizes={[260, 600, 300]}>
          
          {/* LEFT COLUMN: Layers, Block Library, Assets */}
          <Allotment.Pane minSize={220} maxSize={380} preferredSize={260}>
            <div className="h-full flex flex-col bg-background min-h-0">
              <Tabs
                value={activeTab}
                onValueChange={(val) => setTab(val as "layers" | "blocks" | "assets")}
                className="flex-1 flex flex-col min-h-0"
              >
                <div className="px-4 pt-3 pb-2 border-b border-border/20 bg-zinc-50/50 dark:bg-zinc-950/20 shrink-0 overflow-x-auto scrollbar-none">
                  <TabsList className="flex items-center w-max min-w-full h-8 p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-border/40">
                    <TabsTrigger
                      value="layers"
                      className="flex-1 shrink-0 px-3 rounded-md text-3xs font-bold flex items-center justify-center gap-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      <Layers className="h-3 w-3" />
                      Layers
                    </TabsTrigger>
                    <TabsTrigger
                      value="blocks"
                      className="flex-1 shrink-0 px-3 rounded-md text-3xs font-bold flex items-center justify-center gap-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      <Plus className="h-3 w-3" />
                      Blocks
                    </TabsTrigger>
                    <TabsTrigger
                      value="assets"
                      className="flex-1 shrink-0 px-3 rounded-md text-3xs font-bold flex items-center justify-center gap-1 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      <Image className="h-3 w-3" />
                      Assets
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="flex-1 flex flex-col min-h-0">
                  <TabsContent value="layers" className="flex-1 flex flex-col m-0 min-h-0 focus-visible:outline-none">
                    <LayersPanel />
                  </TabsContent>
                  <TabsContent value="blocks" className="flex-1 flex flex-col m-0 min-h-0 focus-visible:outline-none">
                    <BlockLibrary />
                  </TabsContent>
                  <TabsContent value="assets" className="flex-1 flex flex-col m-0 min-h-0 focus-visible:outline-none">
                    <AssetManager />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </Allotment.Pane>

          {/* CENTER COLUMN: Live Editable Canvas */}
          <Allotment.Pane minSize={400}>
            <div className="h-full flex flex-col overflow-hidden min-h-0 bg-zinc-50/20 dark:bg-zinc-950/5">
              <StudioCanvas />
            </div>
          </Allotment.Pane>

          {/* RIGHT COLUMN: Property Inspector */}
          <Allotment.Pane minSize={260} maxSize={420} preferredSize={300}>
            <div className="h-full flex flex-col bg-background min-h-0">
              <Inspector />
            </div>
          </Allotment.Pane>

        </Allotment>
      </div>
    </div>
  );
}

export default function StudioPage() {
  const draft = useQuery(api.studio.getDraft);
  const initialize = useMutation(api.studio.initializeDraft);
  const initializedRef = React.useRef(false);

  React.useEffect(() => {
    if (draft === null && !initializedRef.current) {
      initializedRef.current = true;
      initialize().catch((err) => {
        console.error("Failed to initialize draft:", err);
        initializedRef.current = false;
      });
    }
  }, [draft, initialize]);

  if (draft === undefined || draft === null) {
    return (
      <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-brand mx-auto" />
            <p className="text-sm font-semibold text-muted-foreground">
              {draft === null ? "Initializing studio data..." : "Booting Devora Studio..."}
            </p>
            <p className="text-2xs text-muted-foreground/60 max-w-[200px] leading-normal mx-auto">
              Synchronizing layout schemas, compiling plugins, and loading asset states.
            </p>
          </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground/80 bg-clip-text text-transparent">
            Devora Studio
          </h1>
          <p className="text-xs text-muted-foreground leading-normal mt-0.5">
            A premium visual-editing playground to craft, refine, and custom style your developer personal brand.
          </p>
        </div>

        <StudioProvider initialState={draft}>
          <ShortcutProvider>
            <StudioWorkspaceInner />
          </ShortcutProvider>
        </StudioProvider>
      </div>
  );
}
