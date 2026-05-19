"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/lib/products";
import { Product } from "@/lib/types"; // ← removed CartEntry, CartItem — wishlist doesn't need them
import { toast } from "sonner";

// ── FIX: renamed CartContextValue → WishlistContextValue
// ── FIX: removed quantity, subtotal, lineTotal — wishlist is binary (in or out)
// ── FIX: added isInWishlist so UI (e.g. heart icon) can check membership
interface WishlistContextValue {
  items: Product[];
  itemCount: number;
  isLoaded: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

// ── FIX: storage key was "deetech-cart" — would clobber the real cart. Now unique.
const WISHLIST_STORAGE_KEY = "deetech-wishlist";

// ── FIX: renamed CartContext → WishlistContext
const WishlistContext = createContext<WishlistContextValue | undefined>(
  undefined,
);

// ── FIX: normalize a plain string[] of product IDs (no quantities involved)
function normalizeWishlistIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.filter(
    (id): id is string =>
      typeof id === "string" && Boolean(getProductById(id)),
  );
}

// ── FIX: renamed CartProvider → WishlistProvider
export function WishlistProvider({ children }: { children: ReactNode }) {
  // ── FIX: state is just a list of product IDs, not entries-with-quantity
  const [productIds, setProductIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(WISHLIST_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as unknown;
        setProductIds(normalizeWishlistIds(parsed));
      }
    } catch {
      setProductIds([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      window.localStorage.setItem(
        WISHLIST_STORAGE_KEY,
        JSON.stringify(productIds),
      );
    } catch {
      // Ignore storage write failures.
    }
  }, [productIds, isLoaded]);

  // ── FIX: items is just Product[] — no quantity, no lineTotal
  const items: Product[] = productIds.flatMap((id) => {
    const product = getProductById(id);
    return product ? [product] : [];
  });

  const itemCount = items.length;

  const isInWishlist = (productId: string) => productIds.includes(productId);

  // ── FIX: addToWishlist — toast.info if already there, toast.success if newly added
  const addToWishlist = (product: Product) => {
    if (productIds.includes(product.id)) {
      toast.info(`${product.name} is already in your wishlist`);
      return;
    }

    setProductIds((current) => [...current, product.id]);
    toast.success(`${product.name} added to wishlist`);
  };

  const removeFromWishlist = (productId: string) => {
    setProductIds((current) => current.filter((id) => id !== productId));
    toast.success("Removed from wishlist");
  };

  // ── FIX: renamed clearCart → clearWishlist, added missing toast
  const clearWishlist = () => {
    setProductIds([]);
    toast.success("Wishlist cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount,
        isLoaded,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ── FIX: renamed useCart → useWishlist
export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider.");
  }

  return context;
}
