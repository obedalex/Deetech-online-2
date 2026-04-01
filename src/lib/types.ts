// src/lib/types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
  badge?: string;
  specs?: Array<{
    label: string;
    value: string;
  }>;
}

