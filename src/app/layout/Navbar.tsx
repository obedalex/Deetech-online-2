"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useTheme } from "next-themes";
import {
  Zap,
  Sun,
  Moon,
  User,
  ShoppingCart,
  Search,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Wishlist", href: "/wishlist" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-background sticky top-0 z-50">
      {/* ── Desktop & Tablet bar ── */}
      <nav className="relative max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-primary font-bold text-lg tracking-tight shrink-0"
        >
          <Zap className="w-5 h-5 fill-cyan-400" />
          Deetech
        </Link>

        {/* Center nav links — hidden on mobile */}
        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative text-sm font-medium pb-0.5 transition-colors duration-150 ${
                    isActive
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Expandable search — desktop */}
          <div className="hidden md:flex items-center">
            {searchOpen ? (
              <div className="flex items-center gap-1 bg-background/50 border border-border rounded-md px-2 py-1">
                <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-44"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Theme toggle — pill switch */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            aria-pressed={theme === "dark"}
            className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-border bg-accent hover:bg-accent/80 transition-colors"
          >
            <Sun
              className={`w-3.5 h-3.5 transition-colors ${theme === "dark" ? "text-muted-foreground" : "text-primary"}`}
            />
            {/* Track */}
            <span className="relative w-8 h-4 rounded-full bg-muted border border-border transition-colors">
              {/* Thumb */}
              <span
                className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200 ${
                  theme === "dark"
                    ? "translate-x-4 bg-primary"
                    : "translate-x-0.5 bg-primary"
                }`}
              />
            </span>
            <Moon
              className={`w-3.5 h-3.5 transition-colors ${theme === "dark" ? "text-primary" : "text-muted-foreground"}`}
            />
          </button>

          {/* Divider */}
          <span className="hidden md:block w-px h-4 bg-border mx-1" />

          {/* Account — hidden on mobile */}
          <button
            aria-label="Account"
            className="hidden md:flex p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Cart with badge */}
          <Link
            href="/cart"
            aria-label={`Cart (${itemCount} items)`}
            className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-primary text-[9px] font-bold text-primary-foreground flex items-center justify-center leading-none">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {/* Mobile search */}
          <div className="flex items-center gap-2 bg-accent border border-border rounded-md px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>

          {/* Mobile nav links */}
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile account */}
          <div className="border-t border-border pt-3">
            <button className="flex items-center gap-2 px-2 py-2 w-full rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
              <User className="w-4 h-4" />
              Account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
