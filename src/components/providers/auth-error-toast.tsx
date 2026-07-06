"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Route } from "next";
import { toast } from "sonner";

function AuthErrorToastInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      let friendlyMessage = "An authentication error occurred.";
      let title = "Authentication Failed";

      if (error === "email_doesn't_match") {
        friendlyMessage = "The email associated with your social profile does not match your registered email on Devora. Please connect with the correct account.";
        title = "Email Mismatch";
      } else if (error === "account_already_linked" || error === "account_already_exists") {
        friendlyMessage = "This social profile is already linked to another user account.";
        title = "Account Already Connected";
      } else if (error === "access_denied") {
        friendlyMessage = "Authorization was cancelled or access was denied.";
        title = "Access Denied";
      } else if (error === "session_expired") {
        friendlyMessage = "Your session has expired. Please sign in again.";
        title = "Session Expired";
      }

      toast.error(friendlyMessage, {
        description: title,
        duration: 8000,
      });

      // Clear the query parameter from URL bar to keep it clean and prevent showing toast again on reload
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      router.replace((url.pathname + url.search) as Route);
    }
  }, [searchParams, router]);

  return null;
}

export function AuthErrorToast() {
  return (
    <React.Suspense fallback={null}>
      <AuthErrorToastInner />
    </React.Suspense>
  );
}
