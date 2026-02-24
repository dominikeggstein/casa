"use client";

import { MousePointerClick, Sparkles, Filter, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const FEATURES = [
  {
    title: "Click to Plan",
    description:
      "Click any slot, pick a recipe. No drag required.",
    icon: MousePointerClick,
  },
  {
    title: "AI Recipe Assistant",
    description:
      "Chat with AI to tweak any recipe — swap ingredients, adjust macros.",
    icon: Sparkles,
  },
  {
    title: "Smart Filters",
    description:
      "Filter recipes by tag, search by name. Find the right meal in seconds.",
    icon: Filter,
  },
  {
    title: "Family Friendly",
    description:
      "Assign meals to household members, track individual nutrition.",
    icon: Users,
  },
];

export function Features() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="fade-in-section px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-orange/10 px-4 py-1.5 text-sm font-medium text-orange">
            Powerful features
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to plan meals
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Built for real households. Fast, flexible, and designed to get out of
            your way.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-orange/30 bg-orange/5 p-6 transition-colors hover:border-orange/40"
            >
              <div className="inline-flex rounded-xl bg-orange/10 p-3 text-orange">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
