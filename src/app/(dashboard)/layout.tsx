"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isStudio = pathname === "/studio";

  return <DashboardLayout isFullWidth={isStudio}>{children}</DashboardLayout>;
}
