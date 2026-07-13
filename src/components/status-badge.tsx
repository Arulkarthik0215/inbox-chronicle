import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";
import { statusLabel } from "@/lib/mock-data";

const styles: Record<OrderStatus, string> = {
  ordered: "bg-status-ordered/10 text-status-ordered ring-status-ordered/20",
  packed: "bg-status-packed/10 text-status-packed ring-status-packed/20",
  shipped: "bg-status-shipped/10 text-status-shipped ring-status-shipped/20",
  out_for_delivery: "bg-status-ofd/10 text-status-ofd ring-status-ofd/20",
  delivered: "bg-status-delivered/10 text-status-delivered ring-status-delivered/25",
  cancelled: "bg-status-cancelled/10 text-status-cancelled ring-status-cancelled/25",
  refunded: "bg-status-refunded/15 text-status-refunded ring-status-refunded/25",
};

interface Props {
  status: OrderStatus;
  className?: string;
  withDot?: boolean;
}

export function StatusBadge({ status, className, withDot = true }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        styles[status],
        className,
      )}
    >
      {withDot && (
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "currentColor" }} />
      )}
      {statusLabel(status)}
    </span>
  );
}
