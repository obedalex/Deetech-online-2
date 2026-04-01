import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";

// Take first 4 products as featured (you can customize this logic)
const featuredProducts = products.slice(0, 4);

const FeaturedSection = () => {
  return (
    <section className="w-full py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
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
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          View All →
        </Link>
      </div>

      {/* Grid — matches ProductGrid breakpoints */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
