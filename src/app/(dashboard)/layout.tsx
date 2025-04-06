import type React from "react";
import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full ">
        <AppSidebar />
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex-shrink-0 border-b">
            <Navbar />
            <div className="mg:hidden">
              <SidebarTrigger />
            </div>
          </div>
          <main className="flex-grow overflow-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
