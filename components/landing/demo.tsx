"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { KitchenDemo } from "@/components/kitchen-demo";

export function Demo() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="fade-in-section px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-orange/10 px-4 py-1.5 text-sm font-medium text-orange">
            Try it now
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Casa Kitchen in action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Plan your meals for the week. Drag recipes to the calendar, track
            macros, and generate shopping lists — all in one place.
          </p>
        </div>

        <div className="mt-12">
          <KitchenDemo />
        </div>
      </div>
    </section>
  );
}
