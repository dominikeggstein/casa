"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const MODULES = [
  {
    title: "Kitchen",
    description:
      "Recipe scaling, meal planning, grocery lists, and nutritional tracking. Cook smarter, waste less.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.362-6.387 8.25 8.25 0 003 2" />
      </svg>
    ),
    accent: "border-orange/30 bg-orange/5",
    iconBg: "bg-orange/10 text-orange",
    available: true,
  },
  {
    title: "Clean",
    description:
      "Room-by-room cleaning schedules, task rotation, and habit tracking. A tidy home, on autopilot.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    accent: "border-chart-2/30 bg-chart-2/5",
    iconBg: "bg-chart-2/10 text-chart-2",
    available: true,
  },
  {
    title: "Organize",
    description:
      "Zone-based home inventory, storage mapping, and declutter workflows. Find anything in seconds.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
    accent: "border-chart-3/30 bg-chart-3/5",
    iconBg: "bg-chart-3/10 text-chart-3",
    available: true,
  },
];

const COMING_SOON = ["Budget", "Maintenance", "Garden", "Pets"];

export function Modules() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="fade-in-section bg-card/30 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-orange/10 px-4 py-1.5 text-sm font-medium text-orange">
            Modular by design
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Pick what you need
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Casa is built around modules. Start with one, add more as your
            household grows. No bloat, no clutter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod) => (
            <div
              key={mod.title}
              className={`rounded-2xl border p-6 transition-colors hover:border-orange/40 ${mod.accent}`}
            >
              <div className={`inline-flex rounded-xl p-3 ${mod.iconBg}`}>
                {mod.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{mod.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {mod.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground">Coming soon:</span>
          {COMING_SOON.map((name) => (
            <span
              key={name}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
