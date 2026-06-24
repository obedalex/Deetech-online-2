import { ShieldCheck, Truck, Star, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    description:
      "Every product is rigorously tested and hand-picked by our expert team.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Free express shipping on all orders, delivered to your door in 2–4 days.",
  },
  {
    icon: Star,
    title: "Curated Selection",
    description:
      "We don't sell everything — only the products we'd use ourselves.",
  },
  {
    icon: Zap,
    title: "Latest Tech",
    description:
      "Stay ahead of the curve with early access to cutting-edge products.",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="section-surface w-full px-4 py-16 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Why Choose <span className="text-primary">lumex</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;re not just another tech store.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center gap-4 rounded-2xl border border-border bg-card p-6"
            >
              {/* Icon container */}
              <div className="rounded-xl bg-primary/10 p-3">
                <Icon className="w-6 h-6 text-primary" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-bold text-foreground">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
