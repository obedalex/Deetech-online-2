import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/lib/types"; // make sure this path is correct

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <Link href={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="relative bg-muted">
          <Image
            src={`/${product.image}`} // make sure image is in /public
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover"
          />
          {/* Simple icons */}
          <div className="absolute top-2 right-2 flex gap-2">
            <button className="bg-card p-2 rounded-full border border-border">
              <Heart className="w-4 h-4 text-primary" />
            </button>
            <button className="bg-card p-2 rounded-full border border-border">
              <ShoppingCart className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <p className="text-xs text-muted-foreground">{product.category}</p>
          <h3 className="text-sm font-semibold text-foreground">
            {product.name}
          </h3>

          {/* Rating */}
          {/* <div className="flex items-center gap-1 text-xs mt-1">
            <Star className="w-3 h-3" /> {product.rating || 0}
          </div> */}

          {/* Price */}
          <p className="mt-2 font-bold text-foreground">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
