import { Search } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ThemeToggle } from "./theme-toggle";
import { useEffect, useState } from "react";

export function AppHeader() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("global-search")?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <Link to="/" className="md:hidden text-sm font-semibold">OrderHub</Link>
      <form
        className="relative ml-auto md:ml-0 md:flex-1 md:max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/search", search: { q } });
        }}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          id="global-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search orders, merchants…"
          className="h-9 w-full rounded-lg border bg-muted/40 pl-9 pr-14 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:bg-background focus:ring-2 focus:ring-ring/20 transition-all"
        />
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
          ⌘K
        </kbd>
      </form>
      <div className="ml-auto flex items-center gap-1">
        <ThemeToggle />
      </div>
    </header>
  );
}
