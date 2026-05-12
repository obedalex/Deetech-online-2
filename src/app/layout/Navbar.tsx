"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Searchbar from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import { Zap, Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Wishlist", href: "/wishlist" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

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
          <Searchbar />

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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
