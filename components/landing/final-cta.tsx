"use client";

import { WaitlistForm } from "./waitlist-form";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function FinalCTA() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="fade-in-section px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to put your home{" "}
          <span className="text-orange">in flow?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Join the waitlist today and be the first to experience Casa. Early
          access spots are limited.
        </p>
        <div className="mt-8 flex justify-center">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
