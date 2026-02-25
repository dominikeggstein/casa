"use client";

import { Film, Sparkles, CalendarDays, Link2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { AnimatedEntertainmentFeatures } from "./animated-entertainment-features";

const FEATURES = [
  {
    title: "Movie Library",
    description:
      "Track your watchlist, rate movies, tag by genre and mood. Your household's shared media collection.",
    icon: Film,
  },
  {
    title: "AI Activity Planner",
    description:
      "Tell Casa your mood, time, and group size — get instant suggestions for the perfect evening.",
    icon: Sparkles,
  },
  {
    title: "Weekend Scheduling",
    description:
      "Drag activities onto your calendar, set recurring events, and keep everyone in sync.",
    icon: CalendarDays,
  },
  {
    title: "Cross-Module Magic",
    description:
      "Movie night triggers Kitchen snack recipes. Everything in Casa works together.",
    icon: Link2,
  },
];

export function EntertainmentFeatures() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="fade-in-section px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-chart-5/10 px-4 py-1.5 text-sm font-medium text-chart-5">
            Casa Entertainment
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Plan your downtime, not just your duties
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Movie nights, weekend plans, and group activities — organized and
            cross-connected with your household.
          </p>
        </div>

        <div className="mt-16 mb-20 w-full flex justify-center">
          <AnimatedEntertainmentFeatures />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-chart-5/30 bg-chart-5/5 p-6 transition-colors hover:border-chart-5/40"
            >
              <div className="inline-flex rounded-xl bg-chart-5/10 p-3 text-chart-5">
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
