"use client";

import { AdminShell } from "@/components/admin/AdminShell";
import { AuthGuard } from "@/components/admin/AuthGuard";
import { AdminContentProvider } from "@/contexts/AdminContentContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AdminContentProvider>
        <AdminShell>{children}</AdminShell>
      </AdminContentProvider>
    </AuthGuard>
  );
}
