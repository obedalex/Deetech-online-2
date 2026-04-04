import { Product } from './types';

export const products: Product[] = [
  {
    id: "1",
    slug: "gaming-laptop-pro",
    name: "Gaming Laptop Pro",
    price: 1299,
    originalPrice: 1599,
    badge: "Bestseller",
    rating: 4.8,
    reviewCount: 124,
    image: "product-laptop-1.jpg",
    category: "laptops",
    description:
      "A high-performance gaming laptop with RTX graphics, a fast-refresh display, and cooling tuned for long competitive sessions.",
    inStock: true,
    specs: [
      { label: "CPU", value: "Intel Core i9-14900HX" },
      { label: "GPU", value: "NVIDIA RTX 4070" },
      { label: "RAM", value: "32GB DDR5" },
      { label: "Storage", value: "1TB NVMe SSD" },
      { label: "Display", value: "16-inch QHD 240Hz" },
      { label: "Battery", value: "99Wh, up to 8 hours" },
    ],
  },
  {
    id: "2",
    slug: "ultra-laptop",
    name: "Ultra Laptop",
    price: 1599,
    originalPrice: 1799,
    rating: 4.6,
    reviewCount: 89,
    image: "product-laptop-2.jpg",
    category: "laptops",
    description:
      "An ultra-thin premium laptop built for work and travel, with a vivid OLED screen and battery life that comfortably lasts all day.",
    inStock: true,
    specs: [
      { label: "CPU", value: "Intel Core Ultra 7" },
      { label: "GPU", value: "Intel Arc Graphics" },
      { label: "RAM", value: "16GB LPDDR5X" },
      { label: "Storage", value: "1TB SSD" },
      { label: "Display", value: "14-inch 2.8K OLED" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
  },
  {
    id: "3",
    slug: "wireless-headphones",
    name: "Wireless Headphones",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    reviewCount: 156,
    image: "product-headphones.jpg",
    category: "audio",
    description:
      "Premium over-ear headphones with hybrid noise cancellation, rich sound, and a lightweight design for all-day listening.",
    inStock: true,
    specs: [
      { label: "Drivers", value: "40mm dynamic drivers" },
      { label: "Noise Canceling", value: "Hybrid ANC" },
      { label: "Battery", value: "Up to 35 hours" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Charging", value: "USB-C fast charge" },
      { label: "Weight", value: "255g" },
    ],
  },
  {
    id: "4",
    slug: "mechanical-keyboard",
    name: "Mechanical Keyboard",
    price: 149,
    originalPrice: 179,
    badge: "Hot Pick",
    rating: 4.5,
    reviewCount: 98,
    image: "product-keyboard.jpg",
    category: "accessories",
    description:
      "A compact RGB mechanical keyboard with tactile switches, durable keycaps, and hot-swappable sockets for easy customization.",
    inStock: true,
    specs: [
      { label: "Layout", value: "75% compact" },
      { label: "Switches", value: "Hot-swappable tactile" },
      { label: "Keycaps", value: "Double-shot PBT" },
      { label: "Lighting", value: "Per-key RGB" },
      { label: "Connection", value: "USB-C wired" },
      { label: "Frame", value: "Aluminum top plate" },
    ],
  },
  {
    id: "5",
    slug: "gaming-mouse",
    name: "Gaming Mouse",
    price: 79,
    originalPrice: 99,
    rating: 4.4,
    reviewCount: 112,
    image: "product-mouse.jpg",
    category: "accessories",
    description:
      "A lightweight gaming mouse with precision tracking, customizable DPI stages, and low-latency clicks built for fast reactions.",
    inStock: true,
    specs: [
      { label: "Sensor", value: "26K optical sensor" },
      { label: "DPI", value: "Up to 26,000 DPI" },
      { label: "Weight", value: "59g" },
      { label: "Buttons", value: "6 programmable buttons" },
      { label: "Cable", value: "Ultra-flex braided cable" },
      { label: "Feet", value: "PTFE glide feet" },
    ],
  },
  {
    id: "6",
    slug: "smart-watch-pro",
    name: "Smart Watch Pro",
    price: 299,
    originalPrice: 349,
    rating: 4.5,
    reviewCount: 74,
    image: "product-smartwatch.jpg",
    category: "wearables",
    description:
      "A fitness-first smartwatch with heart-rate tracking, sleep insights, GPS, and a bright always-on display for daily wear.",
    inStock: true,
    specs: [
      { label: "Display", value: "1.9-inch AMOLED" },
      { label: "Tracking", value: "Heart rate and SpO2" },
      { label: "GPS", value: "Dual-band GPS" },
      { label: "Battery", value: "Up to 7 days" },
      { label: "Water Rating", value: "5ATM" },
      { label: "Compatibility", value: "iOS and Android" },
    ],
  },
  {
    id: "7",
    slug: "tablet-ultra",
    name: "Tablet Ultra",
    price: 899,
    originalPrice: 999,
    badge: "New",
    rating: 4.7,
    reviewCount: 63,
    image: "product-tablet.jpg",
    category: "tablets",
    description:
      "A high-resolution tablet with stylus support, desktop-grade performance, and a lightweight build for work or creativity on the go.",
    inStock: true,
    specs: [
      { label: "Display", value: "12.9-inch Liquid Retina" },
      { label: "Chip", value: "Octa-core flagship SoC" },
      { label: "Storage", value: "256GB" },
      { label: "Accessories", value: "Stylus supported" },
      { label: "Battery", value: "Up to 12 hours" },
      { label: "Audio", value: "Quad speakers" },
    ],
  },
  {
    id: "8",
    slug: "hero-laptop",
    name: "Hero Laptop",
    price: 1199,
    originalPrice: 1399,
    rating: 4.3,
    reviewCount: 51,
    image: "laptop-hero.jpg",
    category: "laptops",
    description:
      "An all-purpose laptop tuned for everyday work, streaming, and travel, with balanced performance in a clean aluminum chassis.",
    inStock: false,
    specs: [
      { label: "CPU", value: "Intel Core i7" },
      { label: "RAM", value: "16GB DDR5" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Display", value: "15.6-inch FHD IPS" },
      { label: "Battery", value: "Up to 11 hours" },
      { label: "Weight", value: "1.7kg" },
    ],
  },
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  return [...new Set(products.map(product => product.category))];
};
