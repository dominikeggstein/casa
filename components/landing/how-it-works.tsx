"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const STEPS = [
  {
    number: "01",
    title: "Pick your modules",
    description:
      "Choose Kitchen, Clean, Organize — or all three. Only install what your household needs.",
  },
  {
    number: "02",
    title: "Set up your household",
    description:
      "Add family members, preferences, and dietary needs. Casa adapts to how you live.",
  },
  {
    number: "03",
    title: "Let Casa flow",
    description:
      "Recipes scale, tasks rotate, spaces stay organized. Your home runs itself.",
  },
];

export function HowItWorks() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="fade-in-section px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Up and running in minutes, not hours.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 font-mono text-lg font-bold text-orange">
                {step.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
