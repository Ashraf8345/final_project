"use client";

import * as React from "react";

interface Repository {
  languages: Record<string, number>;
  isHidden: boolean;
}

interface LanguageChartProps {
  repositories: Repository[];
}

// Sleek curated palettes for languages
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500 dark:bg-blue-600",
  JavaScript: "bg-yellow-400 dark:bg-yellow-500",
  HTML: "bg-orange-500 dark:bg-orange-600",
  CSS: "bg-purple-500 dark:bg-purple-600",
  Python: "bg-sky-500 dark:bg-sky-600",
  Go: "bg-cyan-500 dark:bg-cyan-600",
  Rust: "bg-amber-600 dark:bg-amber-700",
  Ruby: "bg-red-500 dark:bg-red-600",
  Java: "bg-red-600 dark:bg-red-700",
  "C++": "bg-pink-500 dark:bg-pink-600",
  C: "bg-zinc-500 dark:bg-zinc-600",
  PHP: "bg-indigo-400 dark:bg-indigo-500",
  Swift: "bg-orange-400 dark:bg-orange-500",
  Kotlin: "bg-violet-500 dark:bg-violet-600",
  Shell: "bg-emerald-500 dark:bg-emerald-600",
};

// Fallback background colors for dots/bars
const COLOR_CLASSES = [
  "bg-teal-500",
  "bg-indigo-500",
  "bg-fuchsia-500",
  "bg-rose-500",
  "bg-lime-500",
  "bg-amber-500",
];

export function LanguageChart({ repositories }: LanguageChartProps) {
  const activeRepos = repositories.filter((r) => !r.isHidden);

  // 1. Calculate aggregated language sizes
  const languageTotals: Record<string, number> = {};
  let totalBytes = 0;

  activeRepos.forEach((repo) => {
    Object.entries(repo.languages).forEach(([lang, bytes]) => {
      languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
      totalBytes += bytes;
    });
  });

  if (totalBytes === 0) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm flex flex-col justify-center items-center h-48 text-center">
        <p className="text-xs text-muted-foreground">No language statistics available.</p>
      </div>
    );
  }

  // 2. Sort and map
  const sortedLanguages = Object.entries(languageTotals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: (bytes / totalBytes) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes);

  // Group smaller languages into "Other" if there are more than 5
  const displayLimit = 5;
  const topLanguages = sortedLanguages.slice(0, displayLimit);
  const otherLanguages = sortedLanguages.slice(displayLimit);

  if (otherLanguages.length > 0) {
    const otherBytes = otherLanguages.reduce((sum, item) => sum + item.bytes, 0);
    topLanguages.push({
      name: "Other",
      bytes: otherBytes,
      percentage: (otherBytes / totalBytes) * 100,
    });
  }

  // Format bytes helper
  const formatBytes = (bytes: number) => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${bytes} B`;
  };

  const getLanguageColor = (name: string, index: number) => {
    if (name === "Other") return "bg-zinc-400 dark:bg-zinc-600";
    return LANGUAGE_COLORS[name] || COLOR_CLASSES[index % COLOR_CLASSES.length];
  };

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-foreground">Language Distribution</h3>
        <p className="text-xs text-muted-foreground">Aggregated code volume across public projects.</p>
      </div>

      {/* Progress Bar Visualizer */}
      <div className="flex h-3 w-full rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-border/10">
        {topLanguages.map((lang, index) => (
          <div
            key={lang.name}
            className={`${getLanguageColor(lang.name, index)} h-full transition-all duration-300`}
            style={{ width: `${lang.percentage}%` }}
            title={`${lang.name}: ${lang.percentage.toFixed(1)}% (${formatBytes(lang.bytes)})`}
          />
        ))}
      </div>

      {/* Grid Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4 pt-2">
        {topLanguages.map((lang, index) => {
          const colorClass = getLanguageColor(lang.name, index);
          // Extract background-color matching or custom dot style
          return (
            <div key={lang.name} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${colorClass}`} />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{lang.name}</p>
                <p className="text-[10px] text-muted-foreground leading-normal">
                  {lang.percentage.toFixed(1)}% <span className="text-[9px] opacity-70">({formatBytes(lang.bytes)})</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
