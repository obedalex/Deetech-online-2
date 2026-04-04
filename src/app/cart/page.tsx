import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  return (
    <section className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 bg-background px-4">
      {/* Icon */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Text */}
      <h1 className="text-xl font-bold text-foreground">Your cart is empty</h1>
      <p className="text-sm text-muted-foreground">
        Add some products to get started.
      </p>

      {/* CTA */}
      <Button
        size="lg"
        className="mt-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/80"
        asChild
      >
        <Link href="/shop">Continue Shopping</Link>
      </Button>
    </section>
  );
};

export default CartPage;
