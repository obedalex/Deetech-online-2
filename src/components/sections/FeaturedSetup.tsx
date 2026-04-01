import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { Product } from "@/lib/types";

// Use existing products for the gaming setup
const SETUP_PRODUCT_IDS = ["1", "4", "5"]; // Gaming Laptop Pro, Mechanical Keyboard, Gaming Mouse

const setupProducts = SETUP_PRODUCT_IDS.map((id) =>
  products.find((p) => p.id === id),
).filter((p): p is Product => Boolean(p));

const FeaturedSetupSection = () => {
  const [hero, ...rest] = setupProducts;

  if (!hero) return null;

  return (
    <section className="w-full py-12 px-4 sm:px-8 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* ── Left: text content ── */}
        <div className="flex flex-col gap-5">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium">
            <Zap className="w-3 h-3 fill-cyan-400" />
            Editor&apos;s Pick
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            The Ultimate <span className="text-primary">Gaming Setup</span>
          </h2>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
            Pair the Gaming Laptop Pro with the Mechanical Keyboard and Gaming
            Mouse for an unbeatable gaming experience. High-performance RTX graphics,
            custom RGB switches, and precision DPI control — everything you need to dominate.
          </p>

          {/* CTA */}
          <Button
            size="lg"
            className="w-fit rounded-full bg-primary px-7 font-semibold text-primary-foreground hover:bg-primary/80"
            asChild
          >
            <Link href="/shop?category=Gaming">Explore Setup →</Link>
          </Button>
        </div>

        {/* ── Right: product image grid ── */}
        <div className="flex flex-col gap-4">
          {/* Hero product — full width */}
          <Link
            href={`/product/${hero.id}`}
            className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden bg-secondary/30 block"
          >
            <Image
              src={`/${hero.image}`}
              alt={hero.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            {/* Info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-sm font-bold text-white">{hero.name}</p>
              <p className="text-sm font-semibold text-primary">
                ${hero.price.toLocaleString()}
              </p>
            </div>
          </Link>

          {/* Two smaller products side by side */}
          <div className="grid grid-cols-2 gap-4">
            {rest.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-secondary/30 block"
              >
                <Image
                  src={`/${product.image}`}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-xs font-bold text-white">{product.name}</p>
                  <p className="text-xs font-semibold text-primary">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSetupSection;
