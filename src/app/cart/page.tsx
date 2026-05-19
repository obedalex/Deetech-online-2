"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag, Heart } from "lucide-react";
import Footer from "@/app/layout/Footer";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/components/providers/CartProvider";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { isLoaded, items, removeFromCart, subtotal, updateQuantity } =
    useCart();

  if (!isLoaded) {
    return (
      <>
        <section className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 bg-background px-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Loading cart...</h1>
        </section>
        <Footer />
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <section className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-4 bg-background px-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Your cart is empty</h1>
          <p className="text-sm text-muted-foreground">
            Add some products to get started.
          </p>
          <Button
            size="lg"
            className="mt-2 rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/80"
            asChild
          >
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </section>
        <Footer />
      </>
    );
  }


  return (
    <>
      <section className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          <h1 className="font-display text-3xl font-bold">Shopping Cart</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CartPage;
