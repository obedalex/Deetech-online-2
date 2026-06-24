export interface ProductSpec {
  label: string;
  value: string;
}

export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate?: number;
    count?: number;
  };
}

export function slugifyFakeStoreProduct(title: string, id: number) {
  return `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${id}`;
}

export function mapFakeStoreProduct(product: FakeStoreProduct): Product {
  return {
    id: String(product.id),
    slug: slugifyFakeStoreProduct(product.title, product.id),
    name: product.title,
    price: product.price,
    image: product.image,
    category: product.category,
    description: product.description,
    inStock: true,
    rating: product.rating?.rate ?? 0,
    reviewCount: product.rating?.count ?? 0,
    specs: [],
    originalPrice: undefined,
    badge: undefined,
  };
}


export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  specs: ProductSpec[];
  originalPrice?: number;
  badge?: string;
}

export interface CartEntry {
  productId: string;
  quantity: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  lineTotal: number;
}

