import Link from "next/link";
import { Zap } from "lucide-react";

const SUPPORT_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "Shipping", href: "/shipping" },
  { label: "Returns", href: "/returns" },
  { label: "FAQ", href: "/faq" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-primary font-bold text-lg tracking-tight w-fit"
            >
              <Zap className="w-5 h-5 fill-primary" />
              lumex
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Premium tech products curated for enthusiasts who demand the best.
            </p>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h3 className="text-foreground text-sm font-semibold">Support</h3>
            <ul className="flex flex-col gap-2.5">
              {SUPPORT_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-foreground text-sm font-semibold">Legal</h3>
            <ul className="flex flex-col gap-2.5">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-border" />

        {/* Bottom copyright */}
        <p className="mt-6 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} lumex. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
