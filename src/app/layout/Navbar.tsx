"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
// import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/providers/CartProvider";
import { Zap, Sun, Moon, ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "@/components/providers/WishlistProvider";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-primary"
        >
          <Zap className="h-6 w-6 fill-cyan-400" />
          Deetech
        </Link>

        <ul className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative pb-1 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          {/* <Searchbar value={searchQuery} onChange={setSearchQuery} /> */}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Link
            href="/cart"
            aria-label={`Cart (${cartCount} items)`}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/wishlist"
            aria-label={`Wishlist (${wishlistCount} items)`}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
