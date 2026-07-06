"use client";

import * as React from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/icons";
import { toast } from "sonner";

interface GitHubProfileCardProps {
  profile: {
    username: string;
    displayName: string | null;
    avatarUrl: string;
    bio: string | null;
    company: string | null;
    location: string | null;
    blog: string | null;
    followers: number;
    following: number;
    publicRepos: number;
    githubCreatedAt: string;
  } | null;
  onDisconnectSuccess: () => void;
}

export function GitHubProfileCard({ profile, onDisconnectSuccess }: GitHubProfileCardProps) {
  const disconnect = useMutation(api.github.disconnectAccount);
  const [isDisconnecting, setIsDisconnecting] = React.useState(false);

  const handleDisconnect = async () => {
    if (!confirm("Are you sure you want to disconnect your GitHub profile? This will purge all imported repository data and preferences from your dashboard.")) {
      return;
    }

    setIsDisconnecting(true);
    try {
      await disconnect();
      toast.success("GitHub profile disconnected successfully.");
      onDisconnectSuccess();
    } catch (err) {
      console.error(err);
      toast.error((err as Error).message || "Failed to disconnect account.");
    } finally {
      setIsDisconnecting(false);
    }
  };

  if (!profile) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-8 text-center bg-card">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900 mx-auto mb-4 border border-border/40">
          <GitHubIcon className="h-6 w-6 text-foreground" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">No GitHub profile linked</h3>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
          Connect your GitHub profile to import repositories, fetch readmes, and analyze language profiles.
        </p>
      </div>
    );
  }

  const joinDate = new Date(profile.githubCreatedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm overflow-hidden relative">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt={profile.displayName || profile.username}
            className="h-16 w-16 rounded-2xl object-cover border border-border/60 shadow-sm"
          />
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground leading-none">
              {profile.displayName || profile.username}
            </h2>
            <p className="text-xs text-muted-foreground font-mono">@{profile.username}</p>
            {profile.bio && (
              <p className="text-xs text-foreground/80 max-w-md mt-2 leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive self-start border-destructive/20 h-9 rounded-lg"
          onClick={handleDisconnect}
          disabled={isDisconnecting}
        >
          {isDisconnecting ? "Disconnecting..." : "Disconnect Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/40">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Followers</p>
          <p className="text-lg font-semibold text-foreground mt-0.5">{profile.followers}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Following</p>
          <p className="text-lg font-semibold text-foreground mt-0.5">{profile.following}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Public Repos</p>
          <p className="text-lg font-semibold text-foreground mt-0.5">{profile.publicRepos}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Joined GitHub</p>
          <p className="text-sm font-semibold text-foreground mt-1.5">{joinDate}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs text-muted-foreground">
        {profile.company && (
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{profile.company}</span>
          </div>
        )}
        {profile.location && (
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{profile.location}</span>
          </div>
        )}
        {profile.blog && (
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <a
              href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {profile.blog}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
