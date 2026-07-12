"use client";

import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@/components/brand/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ThemeValue = "light" | "dark" | "system";

const options: Array<{
  value: ThemeValue;
  label: string;
  description: string;
}> = [
  { value: "light", label: "Light", description: "Bright workspace" },
  { value: "dark", label: "Dark", description: "Low-glare contrast" },
  { value: "system", label: "System", description: "Match your device" },
];

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const activeTheme = (theme ?? "system") as ThemeValue;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change theme"
        className="relative size-8 rounded-full border border-border/40 bg-zinc-50/50 hover:bg-zinc-100 dark:bg-zinc-950/50 dark:hover:bg-zinc-900 text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="sr-only">Change theme</span>
        <SunIcon className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {options.map((option) => {
          const active = option.value === activeTheme;

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className="items-start justify-between gap-3"
            >
              <span className="flex flex-col">
                <span className="font-medium text-foreground">
                  {option.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {option.description}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "mt-1 size-2 rounded-full bg-border",
                  active && "bg-foreground",
                )}
              />
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
