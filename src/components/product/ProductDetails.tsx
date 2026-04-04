"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Heart,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import { Product } from "@/lib/types";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { addToCart } = useCart();
  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : null;

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-secondary/30 shadow-sm">
            <Image
              src={`/${product.image}`}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
              {product.category}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${index < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold sm:text-4xl">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Save ${savings?.toLocaleString()}
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <Check
                className={`h-4 w-4 ${product.inStock ? "text-emerald-500" : "text-destructive"}`}
              />
              <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
              <span className="mx-2 text-border">|</span>
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping over $99</span>
            </div>

            <div className="mt-6 flex gap-3 sm:mt-8">
              <Button
                type="button"
                size="lg"
                disabled={!product.inStock}
                onClick={() => addToCart(product)}
                className="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <button
                type="button"
                aria-label={`Save ${product.name} to wishlist`}
                className="rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary hover:text-primary"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-lg font-semibold">
                Specifications
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="rounded-lg bg-secondary/50 p-3">
                    <p className="text-xs text-muted-foreground">{spec.label}</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
