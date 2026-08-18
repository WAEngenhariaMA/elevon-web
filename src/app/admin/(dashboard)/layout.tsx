import type { ReactNode } from "react";
import { Sidebar } from "@/components/admin/sidebar";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar />
      <main className="flex-1 p-5 md:p-10">{children}</main>
    </div>
  );
}
