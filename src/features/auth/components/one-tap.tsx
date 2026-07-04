"use client";

import { authClient } from "@/lib/auth-client";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OneTap() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useConvexAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading)
      authClient.oneTap({
        fetchOptions: {
          onSuccess: () => {
            router.push("/dashboard");
          },
        },
      });
  }, [isLoading]);

  return null;
}
