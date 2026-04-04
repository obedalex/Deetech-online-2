import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const WishlistPage = () => {
  return (
    <section className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 bg-background px-4">
      {/* Icon */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <Heart className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Text */}
      <h1 className="text-xl font-bold text-foreground">
        Your wishlist is empty
      </h1>
      <p className="text-sm text-muted-foreground">
        Save products you love for later.
      </p>

      {/* CTA */}
      <Button
        size="lg"
        className="mt-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/80"
        asChild
      >
        <Link href="/shop">Browse Products</Link>
      </Button>
    </section>
  );
};

export default WishlistPage;
