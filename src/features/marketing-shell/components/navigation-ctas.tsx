"use client";

import type { Route } from "next";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";

import { marketingNavigationCtas } from "@/config/navigation";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserDropdown } from "./user-dropdown";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

interface NavigationCtasProps {
  className?: string;
  stacked?: boolean;
}

export function NavigationCtas({ className, stacked = false }: NavigationCtasProps) {
  const router = useRouter();

  const handleSignOut = async () => {
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
    }
  };

  return (
    <>
      <Unauthenticated>
        <div className={cn("flex items-center gap-3", stacked && "flex-col items-stretch w-full", className)}>
          <Button asChild variant="ghost" size="lg" className={cn(stacked && "w-full justify-center")}>
            <Link href={marketingNavigationCtas.secondary.href as Route}>
              {marketingNavigationCtas.secondary.label}
            </Link>
          </Button>
          <Button asChild variant="brand" size="lg" className={cn(stacked && "w-full justify-center")}>
            <Link href={marketingNavigationCtas.primary.href as Route}>
              {marketingNavigationCtas.primary.label}
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className={cn("flex items-center gap-3", stacked && "flex-col items-stretch w-full", className)}>
          <Button asChild variant="ghost" size="lg" className={cn(stacked && "w-full justify-center")}>
            <Link href={"/dashboard" as Route}>
              Dashboard
            </Link>
          </Button>
          {stacked ? (
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-center border-red-500/20 text-red-400 hover:bg-red-950/20 hover:text-red-400"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <UserDropdown />
          )}
        </div>
      </Authenticated>
    </>
  );
}
