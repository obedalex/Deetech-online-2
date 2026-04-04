"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative bg-muted">
        <Link href={`/shop/${product.slug}`} className="block">
          <Image
            src={`/${product.image}`}
            alt={product.name}
            width={300}
            height={200}
            className="h-48 w-full object-cover"
          />
        </Link>

        <div className="absolute right-2 top-2 flex gap-2">
          <button
            type="button"
            aria-label={`Save ${product.name} to wishlist`}
            className="rounded-full border border-border bg-card p-2"
          >
            <Heart className="h-4 w-4 text-primary" />
          </button>
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => addToCart(product)}
            className="rounded-full border border-border bg-card p-2"
          >
            <ShoppingCart className="h-4 w-4 text-primary" />
          </button>
        </div>
      </div>

      <Link href={`/shop/${product.slug}`} className="block p-3">
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <h3 className="text-sm font-semibold text-foreground">{product.name}</h3>
        <p className="mt-2 font-bold text-foreground">
          ${product.price.toLocaleString()}
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
