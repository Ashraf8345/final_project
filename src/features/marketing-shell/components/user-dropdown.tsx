"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function UserDropdown() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [signingOut, setSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Sign out failed:", error);
      setSigningOut(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="h-9 w-9 rounded-full bg-zinc-800 animate-pulse border border-border/40" />
    );
  }

  const { name, email, image } = session.user;
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 border border-border/40 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="h-9 w-9">
            {image && <AvatarImage src={image} alt={name || "User avatar"} />}
            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-900 text-xs font-semibold text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-foreground leading-none">{name}</p>
            <p className="text-xs text-muted-foreground leading-none truncate mt-0.5">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer text-sm">
          <Link href={"/dashboard" as Route}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer text-sm">
          <Link href={"/builder" as Route}>Portfolio Builder</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer text-sm">
          <Link href={"/settings" as Route}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer text-sm font-medium"
          disabled={signingOut}
          onClick={handleSignOut}
        >
          {signingOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
