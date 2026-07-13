import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, BarChart3, Search, Settings, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Orders", url: "/orders", icon: Package },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Search", url: "/search", icon: Search },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return (
    <aside className="hidden md:flex md:w-60 lg:w-64 shrink-0 flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center gap-2 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
          <Inbox className="h-4 w-4" />
        </div>
        <span className="text-sm font-semibold tracking-tight">OrderHub</span>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {nav.map((item) => {
          const active = item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
          return (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-status-ordered to-status-packed text-xs font-semibold text-white">
            YU
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium">You</div>
            <div className="truncate text-[10px] text-muted-foreground">you@gmail.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
