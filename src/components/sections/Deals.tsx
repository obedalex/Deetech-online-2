import Link from "next/link";
import Image from "next/image";
import { Percent, Star, Heart, ShoppingCart } from "lucide-react";
import { products } from "@/lib/products";

// Derive deals from products that have a discounted originalPrice
const deals = products.filter((p) => p.originalPrice).slice(0, 3);

const DealsSection = () => {
  return (
    <section className="w-full py-12 px-4 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium mb-4">
          <Percent className="w-3 h-3" />
          Limited Time Offers
        </div>

        {/* Heading */}
        <h2 className="font-display text-2xl font-bold text-foreground">
          Deals of the <span className="text-primary">Week</span>
        </h2>
        <p className="mt-1 text-sm text-muted-foreground mb-8">
          Save big on top-rated products. These deals won&apos;t last forever.
        </p>

        {/* Deal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-secondary/30">
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={`/${product.image}`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </Link>

                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {product.badge}
                  </span>
                )}

                {/* Quick actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    aria-label="Add to wishlist"
                    className="rounded-full bg-black/40 p-2 text-white backdrop-blur-sm hover:bg-black/60 transition-colors border border-white/10"
                  >
                    <Heart className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    aria-label="Add to cart"
                    className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/80 transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1.5 p-4">
                <p className="text-xs font-medium text-primary">
                  {product.category}
                </p>
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-sm font-bold text-foreground hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
                  <span className="font-medium text-foreground">
                    {product.rating}
                  </span>
                  <span>({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-1">
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
