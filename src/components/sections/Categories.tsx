import Link from "next/link";
import { Laptop, Headphones, Watch, Keyboard, Tablet } from "lucide-react";
import { products } from "@/lib/products";

const CATEGORIES = [
  {
    label: "Laptops",
    icon: Laptop,
    color: "bg-card",
  },
  {
    label: "Audio",
    icon: Headphones,
    color: "bg-card",
  },
  {
    label: "Wearables",
    icon: Watch,
    color: "bg-card",
  },
  {
    label: "Peripherals",
    icon: Keyboard,
    color: "bg-card",
  },
  {
    label: "Tablets",
    icon: Tablet,
    color: "bg-card",
  },
];

const CategorySection = () => {
  return (
    <section className="section-surface-alt w-full px-4 py-16 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Shop by <span className="text-primary">Category</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Find exactly what you&apos;re looking for.
          </p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map(({ label, icon: Icon, color }) => {
            const count = products.filter((p) => p.category === label).length;

            return (
              <Link
                key={label}
                href={`/shop?category=${label}`}
                className={`${color} rounded-2xl p-6 flex flex-col items-center justify-center gap-3 border border-border hover:border-primary/50 hover:brightness-110 transition-all duration-200 group`}
              >
                <Icon className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
                <div className="text-center">
                  <p className="text-sm font-bold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {count} {count === 1 ? "product" : "products"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
