export interface ProductSpec {
  label: string;
  value: string;
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

