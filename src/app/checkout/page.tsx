"use client";

// ── PHASE G + I: full checkout page
// - Two-column layout: form (left) + order summary (right)
// - Form is UI-only (no payment validation, no API call)
// - Submit handler: clearCart() → redirect to /checkout/success
// - Empty-cart guard: redirects user to /shop if they land here with an empty cart

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import Footer from "@/app/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, subtotal, isLoaded, clearCart } = useCart();

  // ── Form state: one useState per field (UI-only, never sent anywhere)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  // ── Empty-cart guard: if cart is empty after loading, push them back to shop
  useEffect(() => {
    if (isLoaded && items.length === 0) {
      router.replace("/shop");
    }
  }, [isLoaded, items.length, router]);

  // ── Submit handler — clear cart, redirect to success page
  // (preventDefault stops the browser's default form submission/page reload)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/checkout/success");
  };

  // While loading or about to redirect, show nothing rather than the form
  if (!isLoaded || items.length === 0) {
    return null;
  }

  return (
    <>
      <section className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <Link
            href="/cart"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <h1 className="font-display text-3xl font-bold">Checkout</h1>

          <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-8 lg:grid-cols-3"
          >
            {/* LEFT — form fields, spans 2 columns on desktop */}
            <div className="space-y-8 lg:col-span-2">
              {/* Shipping address section */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-semibold text-foreground">
                  Shipping Address
                </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-muted-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm text-muted-foreground">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground">
                      ZIP / Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm text-muted-foreground">
                      Country
                    </label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment section — UI ONLY, no real processing */}
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-foreground">
                    Payment Details
                  </h2>
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-muted-foreground">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground">
                      CVC
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <p className="mt-4 text-xs text-muted-foreground">
                  This is a demo form. No real payment is processed.
                </p>
              </div>
            </div>

            {/* RIGHT — order summary, 1 column */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-lg border border-border bg-card p-6">
                <h2 className="font-semibold text-foreground">Order Summary</h2>

                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.product.name}{" "}
                        <span className="text-xs">× {item.quantity}</span>
                      </span>
                      <span className="text-foreground">
                        ${item.lineTotal.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-emerald-500">Free</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                    <span>Total</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/80"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CheckoutPage;
