"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

// ==========================================
// 1. SIDEBAR CONTEXT & CUSTOM HOOK
// ==========================================
type SidebarState = "expanded" | "collapsed";

interface SidebarContextType {
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// ==========================================
// 2. SIDEBAR PROVIDER
// ==========================================
export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    const saved = localStorage.getItem("devora_sidebar_collapsed");
    if (saved === "true") {
      setTimeout(() => {
        setOpen(false);
      }, 0);
    }
  }, []);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("devora_sidebar_collapsed", String(!next));
      }
      return next;
    });
  }, []);

  // Mod+B Keyboard Shortcut to Toggle Sidebar Collapse
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        if (
          document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA" ||
          document.activeElement?.hasAttribute("contenteditable")
        ) {
          return;
        }
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        isMobile,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// ==========================================
// 3. SIDEBAR COMPONENTS
// ==========================================
interface SidebarProps {
  className?: string;
  children: React.ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
  const { open } = useSidebar();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 text-foreground border-r border-border/40 overflow-x-hidden",
        mounted ? "transition-all duration-300 ease-in-out" : "",
        open ? "w-64" : "w-16",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SidebarSectionProps {
  title?: string;
  isCollapsed?: boolean;
  children: React.ReactNode;
}

export function SidebarSection({
  title,
  isCollapsed: isCollapsedOverride,
  children,
}: SidebarSectionProps) {
  const { open } = useSidebar();
  const isCollapsed = isCollapsedOverride !== undefined ? isCollapsedOverride : !open;

  return (
    <div className="space-y-1.5 py-4 first:pt-2">
      {title && !isCollapsed && (
        <h3 className="px-6 text-2xs font-semibold text-muted-foreground/60 uppercase tracking-widest leading-none mb-2">
          {title}
        </h3>
      )}
      <ul className={cn("space-y-1 list-none m-0 p-0 w-full", isCollapsed ? "px-0 flex flex-col items-center" : "px-3")}>
        {children}
      </ul>
    </div>
  );
}

interface SidebarItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isCollapsed?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  label,
  href,
  icon,
  isCollapsed: isCollapsedOverride,
  onClick,
}: SidebarItemProps) {
  const pathname = usePathname();
  const { open } = useSidebar();
  const isCollapsed = isCollapsedOverride !== undefined ? isCollapsedOverride : !open;
  const isActive = pathname === href;

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <li>
      <Link
        href={href as Route}
        onClick={onClick}
        prefetch={true}
        className={cn(
          "group/item relative flex items-center text-sm font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isCollapsed ? "w-10 h-10 p-0 justify-center gap-0" : "w-full px-3 py-2.5 justify-start gap-3",
          isActive
            ? "bg-white dark:bg-zinc-900 text-foreground shadow-sm border border-border/40"
            : "text-muted-foreground hover:bg-zinc-100/80 dark:hover:bg-zinc-900/40 hover:text-foreground"
        )}
      >
        <span className={cn("flex-shrink-0 transition-transform duration-200 hover:scale-105", isActive ? "text-primary dark:text-foreground" : "text-muted-foreground")}>
          {icon}
        </span>
        <span
          className={cn(
            "truncate",
            mounted ? "transition-all duration-200 ease-in-out" : "",
            isCollapsed
              ? "w-0 max-w-0 opacity-0 pointer-events-none translate-x-2 overflow-hidden"
              : "w-auto max-w-40 opacity-100 translate-x-0"
          )}
        >
          {label}
        </span>
        {isCollapsed && (
          // Visual floating tooltip on hover
          <span className="absolute left-16 z-50 rounded-md border border-border/40 bg-zinc-900 dark:bg-zinc-950 px-2.5 py-1.5 text-3xs font-bold text-zinc-50 dark:text-zinc-100 shadow-md transition-all duration-150 scale-95 opacity-0 pointer-events-none group-hover/item:opacity-100 group-hover/item:scale-100 select-none whitespace-nowrap">
            {label}
          </span>
        )}
      </Link>
    </li>
  );
}

// ==========================================
// 4. SIDEBAR TRIGGER COMPONENT
// ==========================================
export function SidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "border border-border/40 rounded-lg h-9 w-9 p-0 text-muted-foreground hover:text-foreground",
        className
      )}
      onClick={toggleSidebar}
      aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  );
}
