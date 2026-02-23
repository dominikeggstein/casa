"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const TIERS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to get started.",
    features: [
      "1 household",
      "All core modules",
      "Recipe scaling & meal plans",
      "Cleaning schedules",
      "Basic organization tools",
      "Community recipes",
    ],
    cta: "Join Waitlist",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "TBD",
    period: "early access pricing",
    description: "Unlock the full power of Casa.",
    features: [
      "Everything in Free",
      "AI meal suggestions",
      "Smart grocery optimization",
      "Export & print recipes",
      "Multi-household support",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Get Early Access",
    highlighted: true,
  },
];

export function Pricing() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="fade-in-section bg-card/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-orange/10 px-4 py-1.5 text-sm font-medium text-orange">
            Simple pricing
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Start free, upgrade when ready
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Casa is free to use with all core features. Premium unlocks AI and
            advanced capabilities.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-8 ${
                tier.highlighted
                  ? "border-orange/40 bg-orange/5 ring-1 ring-orange/20"
                  : "border-border bg-card"
              }`}
            >
              {tier.highlighted && (
                <span className="mb-4 inline-block rounded-full bg-orange/10 px-3 py-1 text-xs font-medium text-orange">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-sm text-muted-foreground">
                  / {tier.period}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {tier.description}
              </p>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`size-4 shrink-0 ${
                        tier.highlighted ? "text-orange" : "text-muted-foreground"
                      }`}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full rounded-full ${
                  tier.highlighted
                    ? "bg-orange text-white hover:bg-orange-light"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
                onClick={() =>
                  document
                    .getElementById("waitlist")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
