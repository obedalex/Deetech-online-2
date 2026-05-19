"use client";

// ── PHASE H: order confirmation page
// - Generates a fake order number on mount (random — not persisted, real apps would get this from the server)
// - Shows thank-you message + CTAs to continue shopping or go home
// - useState + useEffect to generate the number once (not on every render)

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Footer from "@/app/layout/Footer";
import { Button } from "@/components/ui/button";

const CheckoutSuccessPage = () => {
  const [orderNumber, setOrderNumber] = useState<string>("");

  // ── Generate a fake order number once on mount
  // Math.random() → string → slice off the "0." prefix → uppercase
  // Example output: "DT-A8F3K2"
  useEffect(() => {
    const random = Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderNumber(`DT-${random}`);
  }, []);

  return (
    <>
      <section className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 bg-background px-4 py-12">
        {/* Big success icon */}
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 p-5">
          <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        </div>

        <h1 className="font-display text-3xl font-bold text-foreground">
          Order Confirmed
        </h1>

        <p className="max-w-md text-center text-sm text-muted-foreground">
          Thank you for your purchase. A confirmation email is on its way.
        </p>

        {/* Order number card */}
        <div className="mt-2 rounded-lg border border-border bg-card px-6 py-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Order Number
          </p>
          <p className="mt-1 font-mono text-lg font-bold text-foreground">
            {orderNumber || "—"}
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/80"
          >
            <Link href="/shop">Continue Shopping</Link>
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
      <Footer />
    </>
  );
};

export default CheckoutSuccessPage;
