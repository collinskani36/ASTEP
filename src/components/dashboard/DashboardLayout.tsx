import { ReactNode } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  FileBarChart,
  Receipt,
  UserCog,
  Settings,
  LogOut,
  Bell,
  MessageSquare,
  Search,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard, end: true },
  { title: "Participants", url: "/dashboard/participants", icon: Users },
  { title: "Support Sessions", url: "/dashboard/sessions", icon: CalendarCheck },
  { title: "Enquiries", url: "/dashboard/enquiries", icon: MessageSquare },
  { title: "Reports", url: "/dashboard/reports", icon: FileBarChart },
  { title: "NDIS Claims", url: "/dashboard/claims", icon: Receipt },
  { title: "Staff", url: "/dashboard/staff", icon: UserCog },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="px-3 py-4">
        {!collapsed ? (
          <Logo />
        ) : (
          <div className="w-9 h-9 rounded-xl gradient-warm flex items-center justify-center text-primary-foreground font-bold">A</div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.end}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-smooth",
                          isActive
                            ? "bg-primary-soft text-primary"
                            : "text-foreground/75 hover:bg-muted hover:text-foreground"
                        )
                      }
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-foreground/75 hover:bg-muted w-full">
                    <Settings className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>Settings</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed ? (
          <div className="flex items-center gap-3 p-2 rounded-xl bg-muted/50">
            <div className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-semibold text-sm">SL</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Ledama</p>
              <p className="text-xs text-muted-foreground truncate">Team Lead</p>
            </div>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-semibold text-sm mx-auto">SL</div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const current = navItems.find((n) =>
    n.end ? location.pathname === n.url : location.pathname.startsWith(n.url)
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border/60 bg-background/90 backdrop-blur-md sticky top-0 z-40 flex items-center gap-3 px-4 md:px-6">
            <SidebarTrigger />
            <div className="flex-1 flex items-center gap-3">
              <h1 className="font-display text-lg font-semibold hidden sm:block">
                {current?.title ?? "Dashboard"}
              </h1>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative hidden md:block">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search participants, claims..." className="pl-9 w-72 rounded-full bg-muted/50 border-transparent" />
                </div>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary" />
                </Button>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
