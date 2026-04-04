import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "The NovaPro 16\" is hands down the best laptop I've ever owned. Deetech's curation is on another level.",
    name: "Alex R.",
    role: "Software Engineer",
    rating: 5,
  },
  {
    quote:
      "Fast shipping, incredible quality, and their support team helped me choose the perfect setup.",
    name: "Sarah K.",
    role: "Content Creator",
    rating: 5,
  },
  {
    quote:
      "The Phantom X Gaming laptop and Glide Pro mouse combo is unbeatable. My go-to store for gear.",
    name: "James L.",
    role: "Pro Gamer",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-surface-alt w-full px-4 py-16 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground">
            What Our Customers <span className="text-primary">Say</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, name, role, rating }) => (
            <div
              key={name}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                &quot;{quote}&quot;
              </p>

              {/* Reviewer */}
              <div className="border-t border-border pt-4">
                <p className="text-sm font-bold text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
