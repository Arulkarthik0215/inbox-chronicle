import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { z } from "zod";
import { OrderCard } from "@/components/order-card";
import { mockOrders } from "@/lib/mock-data";
import { EmptyState } from "@/components/empty-state";
import { SearchIcon } from "lucide-react";

const searchSchema = z.object({ q: z.string().optional().default("") });

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search · OrderHub" }] }),
  validateSearch: searchSchema,
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return mockOrders.filter((o) => {
      const hay = [
        o.platform,
        o.merchant,
        o.orderId,
        o.status,
        String(o.totalAmount),
        ...o.products.map((p) => p.name),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Find anything across every order — merchant, product, order ID, price.
      </p>

      <input
        autoFocus
        value={q}
        onChange={(e) => navigate({ to: "/search", search: { q: e.target.value } })}
        placeholder="Search orders…"
        className="mt-6 h-12 w-full rounded-xl border bg-card px-4 text-base outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
      />

      <div className="mt-6">
        {!q.trim() ? (
          <EmptyState
            icon={SearchIcon}
            title="Start typing to search"
            description="Try searching for 'Amazon', 'Nike', or an order ID."
          />
        ) : results.length === 0 ? (
          <EmptyState
            icon={SearchIcon}
            title={`No results for "${q}"`}
            description="Try a different query or check your spelling."
          />
        ) : (
          <>
            <div className="mb-3 text-xs text-muted-foreground">
              {results.length} result{results.length === 1 ? "" : "s"}
            </div>
            <div className="space-y-2">
              {results.map((o) => (
                <OrderCard key={o.id} order={o} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
