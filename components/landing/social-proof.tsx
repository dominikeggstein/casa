"use client";

import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const TESTIMONIALS = [
  {
    quote:
      "Finally, an app that doesn't try to do everything. I just use Kitchen and it's perfect.",
    author: "Sarah K.",
    role: "Home cook",
  },
  {
    quote:
      "The recipe scaling alone is worth it. No more math when cooking for a crowd.",
    author: "Mike T.",
    role: "Dad of 4",
  },
  {
    quote:
      "Clean module has my whole family on the same page. No more 'whose turn is it' arguments.",
    author: "Priya R.",
    role: "Busy parent",
  },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>;
}

export function SocialProof() {
  const ref = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="fade-in-section px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Counter */}
        <div className="text-center">
          <div className="inline-flex items-baseline gap-2">
            <span className="text-5xl font-bold text-orange sm:text-6xl">
              <AnimatedCounter target={1247} />
            </span>
            <span className="text-xl text-muted-foreground">people on the waitlist</span>
          </div>
          <p className="mt-2 text-muted-foreground">
            Join them and be the first to try Casa.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4 text-orange"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
