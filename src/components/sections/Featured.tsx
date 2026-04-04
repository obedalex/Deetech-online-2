import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";

const featuredProducts = products.slice(0, 4);

const FeaturedSection = () => {
  return (
    <section className="section-surface w-full px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Featured <span className="text-primary">Products</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Hand-picked by our team for you.
            </p>
          </div>

          <Link
            href="/shop"
            className="shrink-0 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View All -&gt;
          </Link>
        </div>

        {/* Grid matches ProductGrid breakpoints */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
