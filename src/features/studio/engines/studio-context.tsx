"use client";

import * as React from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { StudioState, EditorSelection, Command } from "../types";

interface StudioContextProps {
  // State
  state: StudioState;
  selection: EditorSelection;
  saveStatus: "saved" | "saving" | "unsaved";
  lastSavedTime: number | null;
  canUndo: boolean;
  canRedo: boolean;

  // Selection Actions
  selectBlock: (id: string | null) => void;
  selectSection: (id: string | null) => void;
  hoverBlock: (id: string | null) => void;
  hoverSection: (id: string | null) => void;

  // Command & History Actions
  runCommand: (command: Command) => void;
  undo: () => void;
  redo: () => void;

  // Preferences Actions
  setDevice: (device: StudioState["preferences"]["device"]) => void;
  setTab: (tab: StudioState["preferences"]["activeTab"]) => void;
  togglePreviewMode: () => void;
  setState: React.Dispatch<React.SetStateAction<StudioState>>;
}

const StudioContext = React.createContext<StudioContextProps | undefined>(undefined);

export function StudioProvider({
  initialState,
  children,
}: {
  initialState: StudioState;
  children: React.ReactNode;
}) {
  const [state, setState] = React.useState<StudioState>(initialState);
  const [selection, setSelection] = React.useState<EditorSelection>({
    selectedBlockId: null,
    selectedSectionId: null,
    hoveredBlockId: null,
    hoveredSectionId: null,
  });

  // History stacks
  const [undoStack, setUndoStack] = React.useState<Command[]>([]);
  const [redoStack, setRedoStack] = React.useState<Command[]>([]);

  // Autosave status
  const [saveStatus, setSaveStatus] = React.useState<"saved" | "saving" | "unsaved">("saved");
  const [lastSavedTime, setLastSavedTime] = React.useState<number | null>(null);

  // Convex mutation hook
  const saveDraftMutation = useMutation(api.studio.saveDraft);

  // Selection actions
  const selectBlock = React.useCallback((id: string | null) => {
    setSelection((prev) => ({
      ...prev,
      selectedBlockId: id,
      selectedSectionId: id ? prev.selectedSectionId : null,
    }));
  }, []);

  const selectSection = React.useCallback((id: string | null) => {
    setSelection((prev) => ({
      ...prev,
      selectedSectionId: id,
      selectedBlockId: null,
    }));
  }, []);

  const hoverBlock = React.useCallback((id: string | null) => {
    setSelection((prev) => ({ ...prev, hoveredBlockId: id }));
  }, []);

  const hoverSection = React.useCallback((id: string | null) => {
    setSelection((prev) => ({ ...prev, hoveredSectionId: id }));
  }, []);

  // Debounced auto-save function
  const debouncedSave = React.useRef<NodeJS.Timeout | null>(null);

  const queueSave = React.useCallback((currentState: StudioState) => {
    setSaveStatus("unsaved");
    if (debouncedSave.current) {
      clearTimeout(debouncedSave.current);
    }

    debouncedSave.current = setTimeout(async () => {
      setSaveStatus("saving");
      try {
        await saveDraftMutation({
          studioId: currentState.studioId,
          stateJson: JSON.stringify(currentState),
        });
        setSaveStatus("saved");
        setLastSavedTime(Date.now());
      } catch (err) {
        console.error("Failed to auto-save draft:", err);
        setSaveStatus("unsaved");
      }
    }, 1500); // Debounce saves by 1.5 seconds
  }, [saveDraftMutation]);

  // Clean up timers on unmount
  React.useEffect(() => {
    return () => {
      if (debouncedSave.current) clearTimeout(debouncedSave.current);
    };
  }, []);

  // Execute an undoable command
  const runCommand = React.useCallback((command: Command) => {
    setState((prev) => {
      const next = command.execute(prev);
      setUndoStack((stack) => [...stack, command]);
      setRedoStack([]); // Clear redo stack on new action
      queueSave(next);
      return next;
    });
  }, [queueSave]);

  // Undo execution
  const undo = React.useCallback(() => {
    if (undoStack.length === 0) return;
    const command = undoStack[undoStack.length - 1];

    setState((prev) => {
      const next = command.undo(prev);
      setUndoStack((stack) => stack.slice(0, -1));
      setRedoStack((stack) => [...stack, command]);
      queueSave(next);
      return next;
    });
  }, [undoStack, queueSave]);

  // Redo execution
  const redo = React.useCallback(() => {
    if (redoStack.length === 0) return;
    const command = redoStack[redoStack.length - 1];

    setState((prev) => {
      const next = command.execute(prev);
      setRedoStack((stack) => stack.slice(0, -1));
      setUndoStack((stack) => [...stack, command]);
      queueSave(next);
      return next;
    });
  }, [redoStack, queueSave]);

  // Preferences actions
  const setDevice = React.useCallback((device: StudioState["preferences"]["device"]) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, device },
    }));
  }, []);

  const setTab = React.useCallback((activeTab: StudioState["preferences"]["activeTab"]) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, activeTab },
    }));
  }, []);

  const togglePreviewMode = React.useCallback(() => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, isPreviewMode: !prev.preferences.isPreviewMode },
    }));
  }, []);

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;

  return (
    <StudioContext.Provider
      value={{
        state,
        selection,
        saveStatus,
        lastSavedTime,
        canUndo,
        canRedo,
        selectBlock,
        selectSection,
        hoverBlock,
        hoverSection,
        runCommand,
        undo,
        redo,
        setDevice,
        setTab,
        togglePreviewMode,
        setState,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = React.useContext(StudioContext);
  if (!context) {
    throw new Error("useStudio must be used within a StudioProvider");
  }
  return context;
}
