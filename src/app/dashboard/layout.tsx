import type React from "react";
import type { Metadata } from "next";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Header } from "@/components/dashboard/Header";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { AuthProvider } from "../contexts/Authcontext";

export const metadata: Metadata = {
  title: "Dashboard | Pharmacy Accreditation Manager",
  description: "Manage your pharmacy accreditations efficiently",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // In a real app, you would fetch this from your auth provider
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    image: "/placeholder.svg?height=32&width=32",
    role: "admin", // or "individual"
  };

  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar className="border-r">
            <SidebarHeader className="border-b px-6 py-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-[#5e8e4b] flex items-center justify-center text-white font-semibold">
                  PA
                </div>
                <span className="font-semibold">Pharmacy Accreditation</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <DashboardNav user={user} />
            </SidebarContent>
          </Sidebar>

          <div className="flex flex-1 flex-col">
            <Header user={user} />
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
