// ── PHASE J: real loading skeleton (replaces the old "<div>loading</div>" stub)
// - Next.js automatically shows this file's component while the /shop route is loading
// - We mimic the actual shop layout (sidebar + grid) so the transition looks smooth
// - Skeleton blocks are pulsing gray placeholders where content will appear

const ShopLoading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Heading skeleton */}
      <div className="mb-8 h-9 w-48 animate-pulse rounded bg-muted" />

      {/* Search bar skeleton */}
      <div className="h-10 w-full max-w-md animate-pulse rounded bg-muted" />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar skeleton — 3 filter card placeholders */}
        <aside className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-lg border border-border bg-card"
            />
          ))}
        </aside>

        {/* Right column: sort bar + 8 product card skeletons */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="h-5 w-40 animate-pulse rounded bg-muted" />
            <div className="h-8 w-32 animate-pulse rounded bg-muted" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                {/* Image placeholder */}
                <div className="h-48 w-full animate-pulse bg-muted" />
                <div className="space-y-2 p-3">
                  {/* Category placeholder */}
                  <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                  {/* Name placeholder */}
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  {/* Price placeholder */}
                  <div className="h-5 w-20 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLoading;
