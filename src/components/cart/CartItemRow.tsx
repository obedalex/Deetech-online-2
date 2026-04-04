"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/lib/types";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItemRow = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) => {
  return (
    <div className="glass-card flex flex-col gap-4 p-4 sm:flex-row">
      <Link
        href={`/shop/${item.product.slug}`}
        className="relative h-32 w-full flex-shrink-0 overflow-hidden rounded-lg bg-secondary/50 sm:h-24 sm:w-24"
      >
        <Image
          src={`/${item.product.image}`}
          alt={item.product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-3">
        <div>
          <Link
            href={`/shop/${item.product.slug}`}
            className="font-display text-sm font-semibold transition-colors hover:text-primary"
          >
            {item.product.name}
          </Link>
          <p className="text-xs text-muted-foreground">{item.product.category}</p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              className="rounded-md border border-border p-1.5 transition-colors hover:bg-secondary"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="rounded-md border border-border p-1.5 transition-colors hover:bg-secondary"
            >
              <Plus className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => onRemove(item.product.id)}
              className="ml-2 rounded-md p-1.5 text-destructive transition-colors hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="font-display text-sm font-bold">
            ${item.lineTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
