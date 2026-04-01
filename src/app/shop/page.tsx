import { products } from '@/lib/products';
import ProductGrid from '@/components/product/ProductGrid';

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}