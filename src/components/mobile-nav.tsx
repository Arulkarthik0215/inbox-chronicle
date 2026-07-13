import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, BarChart3, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { url: "/", icon: LayoutDashboard, label: "Home" },
  { url: "/orders", icon: Package, label: "Orders" },
  { url: "/analytics", icon: BarChart3, label: "Stats" },
  { url: "/search", icon: Search, label: "Search" },
  { url: "/settings", icon: Settings, label: "Settings" },
] as const;

export function MobileNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t bg-background/95 backdrop-blur">
      <div className="grid grid-cols-5">
        {nav.map((item) => {
          const active = item.url === "/" ? pathname === "/" : pathname.startsWith(item.url);
          return (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px]",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
