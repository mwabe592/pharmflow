import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  FolderKanban,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import logo from "../../../public/logo.png";
import Image from "next/image";

// Define your sidebar items in an array
const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Accreditations", href: "/accreditations", icon: FolderKanban },
  { label: "Profile", href: "#", icon: MessageSquare },
  { label: "Settings", href: "#", icon: Settings },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-center gap-4">
          <Image src={logo} alt="logo" width={400} height={400} />
        </div>
      </SidebarHeader>
      <SidebarContent className="rounded-xl bg-card px-4 py-2">
        <SidebarMenu>
          {menuItems.map(({ label, href, icon: Icon }) => (
            <SidebarMenuItem key={label} className="my-2">
              <SidebarMenuButton asChild>
                <Link href={href}>
                  <Icon className="h-4 w-4" />
                  <span className="hover:text-brand text-lg">{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
