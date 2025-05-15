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
import getUser from "../utils/helpers/getUser";

export const metadata: Metadata = {
  title: "Dashboard | Pharmacy Accreditation Manager",
  description: "Manage your pharmacy accreditations efficiently",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { userData } = await getUser();

  const normalizedUserForHeader = userData
    ? {
        name: `${userData.first_name} ${userData.last_name}`,
        email: userData.email,
        image: "/placeholder.svg", // Replace with actual image path or logic
        role: userData.user_type ?? "user",
      }
    : null;

  const normalizedUserForNav = userData
    ? {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        role: userData.user_type ?? "user",
      }
    : null;

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
              {normalizedUserForNav && (
                <DashboardNav user={normalizedUserForNav} />
              )}{" "}
            </SidebarContent>
          </Sidebar>

          <div className="flex flex-1 flex-col">
            {normalizedUserForHeader && (
              <Header user={normalizedUserForHeader} />
            )}{" "}
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
