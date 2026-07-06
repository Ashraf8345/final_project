"use client";

import * as React from "react";

interface RepositoryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  selectedStatus: "all" | "featured" | "hidden" | "active";
  onStatusChange: (status: "all" | "featured" | "hidden" | "active") => void;
  languages: string[];
}

export function RepositoryFilters({
  searchQuery,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  selectedStatus,
  onStatusChange,
  languages,
}: RepositoryFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between pb-2">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search repositories by name or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border/60 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all shadow-sm"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Status Filters */}
        <div className="flex items-center rounded-lg border border-border/60 bg-card p-1 shadow-sm">
          <button
            onClick={() => onStatusChange("all")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              selectedStatus === "all"
                ? "bg-zinc-100 dark:bg-zinc-900 text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          <button
            onClick={() => onStatusChange("active")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              selectedStatus === "active"
                ? "bg-zinc-100 dark:bg-zinc-900 text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => onStatusChange("featured")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              selectedStatus === "featured"
                ? "bg-zinc-100 dark:bg-zinc-900 text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => onStatusChange("hidden")}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              selectedStatus === "hidden"
                ? "bg-zinc-100 dark:bg-zinc-900 text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Hidden
          </button>
        </div>

        {/* Language Filter */}
        <div className="relative">
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-xs rounded-lg border border-border/60 bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand shadow-sm font-medium cursor-pointer"
          >
            <option value="all">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
