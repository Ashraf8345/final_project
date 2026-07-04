import * as React from "react";
import { DashboardLayout } from "@/features/dashboard/components/dashboard-layout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
