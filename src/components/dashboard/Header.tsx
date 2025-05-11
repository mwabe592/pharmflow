"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "../ThemeToggle";
import { UserNav } from "./UserNav";
interface HeaderProps {
  user: {
    name: string;
    email: string;
    image: string;
    role: string;
  };
}

export function Header({ user }: HeaderProps) {
  const { toggleSidebar } = useSidebar();
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden md:block">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Pharmacy Accreditation Manager
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="relative max-w-[300px] w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 w-full bg-background"
          />
        </div>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link href="/dashboard/notifications">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-[#5e8e4b]">
                {notifications}
              </Badge>
            )}
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>

        <UserNav user={user} />
      </div>
    </header>
  );
}
