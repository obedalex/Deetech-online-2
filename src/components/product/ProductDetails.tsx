import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  Star,
  Check,
  Truck,
} from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
          <div className="glass-card overflow-hidden">
            <div className="relative aspect-square bg-secondary/30">
              <Image
                src={`/${product.image}`}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-medium text-primary">
              {product.category}
            </p>
            <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
              {product.name}
            </h1>

            {product.rating && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    Save ${product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-success" />
              <span>In Stock</span>
              <span className="mx-2 text-border">|</span>
              <Truck className="h-4 w-4 text-primary" />
              <span>Free shipping over $99</span>
            </div>

            <div className="mt-6 sm:mt-8 flex gap-3">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25">
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button className="rounded-lg border px-4 py-3 border-border hover:border-primary hover:text-primary">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-lg font-semibold">
                Specifications
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.specs?.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-lg bg-secondary/50 p-3"
                  >
                    <p className="text-xs text-muted-foreground">
                      {spec.label}
                    </p>
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
