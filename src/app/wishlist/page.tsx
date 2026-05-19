"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/components/providers/WishlistProvider";
// ── FIX: missing imports — Footer was used but never imported; ProductGrid needed for the has-items state
import Footer from "@/app/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";

// ── FIX: there was a duplicate `const WishlistPage = () => {` block above this one
// ── The first declaration didn't even pull `items` from the provider, so `items.length` would crash.
// ── Now there is exactly ONE component with all three states as sequential early returns.
const WishlistPage = () => {
  const { items, isLoaded, clearWishlist } = useWishlist();

  // ── STATE 1: loading
  if (!isLoaded) {
    return (
      <>
        <section className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 bg-background px-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          {/* ── FIX: copy-paste leftover said "Loading cart..." — now correctly says "Loading wishlist..." */}
          <h1 className="text-xl font-bold text-foreground">
            Loading wishlist...
          </h1>
        </section>
        <Footer />
      </>
    );
  }

  // ── STATE 2: empty
  if (items.length === 0) {
    return (
      <>
        <section className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 bg-background px-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          {/* ── FIX: text said "Your cart is empty" — corrected to wishlist */}
          <h1 className="text-xl font-bold text-foreground">
            Your wishlist is empty
          </h1>
          <p className="text-sm text-muted-foreground">
            Save products you love for later.
          </p>
          <Button
            size="lg"
            className="mt-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/80"
            asChild
          >
            <Link href="/shop">Browse Products</Link>
          </Button>
        </section>
        <Footer />
      </>
    );
  }

  // ── STATE 3: has items — this state was missing entirely before
  // ── ProductGrid + ProductCard already handle the heart icon → removeFromWishlist flow
  return (
    <>
      <section className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="font-display text-3xl font-bold">
              Your Wishlist ({items.length})
            </h1>
            <Button variant="ghost" onClick={clearWishlist}>
              Clear All
            </Button>
          </div>

          <ProductGrid products={items} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default WishlistPage;
