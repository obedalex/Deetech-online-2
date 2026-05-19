"use client";

// ── PHASE J: real error UI (replaces the old "<div>error</div>" stub)
// - Next.js error.tsx receives `error` (the thrown error) + `reset` (a function to retry the route)
// - "use client" is required for error boundaries in Next.js
// - useEffect logs the error — in production this would go to Sentry/etc.

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShopErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ShopError = ({ error, reset }: ShopErrorProps) => {
  useEffect(() => {
    console.error("Shop route error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 bg-background px-4">
      {/* Error icon */}
      <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-5">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>

      <h1 className="text-xl font-bold text-foreground">
        Something went wrong
      </h1>
      <p className="max-w-md text-center text-sm text-muted-foreground">
        We hit a problem loading the shop. Please try again — if it keeps
        happening, head back to the homepage.
      </p>

      {/* CTAs: retry (calls reset) or go home */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          onClick={reset}
          className="rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/80"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button
          size="lg"
          variant="ghost"
          asChild
          className="rounded-full px-8 font-semibold"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
};

export default ShopError;
