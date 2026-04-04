"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Percent, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { products } from "@/lib/products";

const deals = products.filter((product) => product.originalPrice).slice(0, 3);

const DealsSection = () => {
  const { addToCart } = useCart();

  return (
    <section className="section-surface w-full px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary">
          <Percent className="h-3 w-3" />
          Limited Time Offers
        </div>

        <h2 className="font-display text-2xl font-bold text-foreground">
          Deals of the <span className="text-primary">Week</span>
        </h2>
        <p className="mb-8 mt-1 text-sm text-muted-foreground">
          Save big on top-rated products. These deals won&apos;t last forever.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {deals.map((product) => (
            <article
              key={product.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="relative aspect-[4/3] bg-secondary/30">
                <Link href={`/shop/${product.slug}`}>
                  <Image
                    src={`/${product.image}`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </Link>

                {product.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {product.badge}
                  </span>
                )}

                <div className="absolute right-3 top-3 flex flex-col gap-2">
                  <button
                    type="button"
                    aria-label={`Save ${product.name} to wishlist`}
                    className="rounded-full border border-border/50 bg-background/40 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background/60"
                  >
                    <Heart className="h-4 w-4 text-primary" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/80"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  {product.category}
                </p>
                <Link href={`/shop/${product.slug}`}>
                  <h3 className="text-sm font-bold text-foreground transition-colors hover:text-primary">
                    {product.name}
                  </h3>
                </Link>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {product.description}
                </p>

                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="font-medium text-foreground">
                    {product.rating}
                  </span>
                  <span>({product.reviewCount})</span>
                </div>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
