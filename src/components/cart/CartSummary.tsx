import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary = ({ subtotal }: CartSummaryProps) => {
  return (
    <div className="glass-card h-fit p-6">
      <h3 className="font-display text-lg font-semibold">Order Summary</h3>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="text-emerald-500">Free</span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex justify-between font-display text-lg font-bold">
            <span>Total</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* ── PHASE F: button no longer disabled — wrapped in Next.js <Link> to /checkout
          - asChild lets the Button render as the Link so styling stays
          - removed the "demo only" caption that sat below */}
      <Button
        size="lg"
        asChild
        className="mt-6 w-full rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/80"
      >
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  );
};

export default CartSummary;
