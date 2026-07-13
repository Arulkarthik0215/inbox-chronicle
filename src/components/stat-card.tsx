import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  accent?: string;
  className?: string;
}

export function StatCard({ label, value, hint, icon: Icon, accent, className }: Props) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all hover:border-foreground/20",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-muted-foreground"
          style={accent ? { color: accent, backgroundColor: `color-mix(in oklch, ${accent} 12%, transparent)` } : undefined}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}
