import { cn } from "@/lib/utils";
import { getPlatformMeta } from "@/lib/mock-data";
import type { Platform } from "@/types/order";

interface Props {
  platform: Platform;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

export function MerchantAvatar({ platform, size = "md", className }: Props) {
  const meta = getPlatformMeta(platform);
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl font-semibold text-white shrink-0 ring-1 ring-inset ring-white/10",
        sizes[size],
        className,
      )}
      style={{ backgroundColor: meta.color }}
      aria-label={platform}
    >
      {meta.letter}
    </div>
  );
}
