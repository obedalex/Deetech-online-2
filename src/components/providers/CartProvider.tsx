"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/lib/products";
import { CartEntry, CartItem, Product } from "@/lib/types";
import { toast } from "sonner";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isLoaded: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CART_STORAGE_KEY = "lumex-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

function normalizeCartEntries(raw: unknown): CartEntry[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  return raw.flatMap((entry) => {
    const candidate = entry as Partial<CartEntry>;

    if (
      !entry ||
      typeof entry !== "object" ||
      typeof candidate.productId !== "string" ||
      typeof candidate.quantity !== "number"
    ) {
      return [];
    }

    const quantity = Math.floor(candidate.quantity);

    if (
      !Number.isFinite(quantity) ||
      quantity <= 0 ||
      !getProductById(candidate.productId)
    ) {
      return [];
    }

    return [{ productId: candidate.productId, quantity }];
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as unknown;
        setEntries(normalizeCartEntries(parsedCart));
      }
    } catch {
      setEntries([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Ignore storage write failures and keep the in-memory cart usable.
    }
  }, [entries, isLoaded]);

  const items: CartItem[] = entries.flatMap((entry) => {
    const product = getProductById(entry.productId);

    if (!product) {
      return [];
    }

    return [
      {
        product,
        quantity: entry.quantity,
        lineTotal: product.price * entry.quantity,
      },
    ];
  });

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);

  const addToCart = (product: Product, quantity = 1) => {
    const parsedQuantity = Math.floor(quantity);
    const nextQuantity =
      Number.isFinite(parsedQuantity) && parsedQuantity > 0
        ? parsedQuantity
        : 1;

    setEntries((currentEntries) => {
      const existingItem = currentEntries.find(
        (entry) => entry.productId === product.id,
      );

      if (!existingItem) {
        return [
          ...currentEntries,
          { productId: product.id, quantity: nextQuantity },
        ];
      }

      return currentEntries.map((entry) =>
        entry.productId === product.id
          ? { ...entry, quantity: entry.quantity + nextQuantity }
          : entry,
      );
    }); // ← setEntries call ends here

    // ↓ Toast lives OUTSIDE setEntries but INSIDE addToCart — same pattern as removeFromCart & clearCart
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.productId !== productId),
    );
    toast.success("Removed from cart");
  };
  const updateQuantity = (productId: string, quantity: number) => {
    const nextQuantity = Math.floor(quantity);

    if (!Number.isFinite(nextQuantity) || nextQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.productId === productId
          ? { ...entry, quantity: nextQuantity }
          : entry,
      ),
    );
  };

  const clearCart = () => {
    setEntries([]);
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
