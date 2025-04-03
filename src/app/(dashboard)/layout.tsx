import type React from "react";
import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <div className="h-screen flex-shrink-0">
          <AppSidebar />
        </div>

        {/* Right side container for navbar and main content */}
        <div className="flex flex-col flex-grow overflow-hidden">
          {/* Navbar at the top of the right side */}
          <header className="flex-shrink-0 border-b">
            <Navbar />
            <div className="mg:hidden">
              <SidebarTrigger />
            </div>
          </header>

          {/* Main content below navbar, with scrolling if needed */}
          <main className="flex-grow overflow-auto p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
