"use client";

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const BASE_SERVINGS = 4;

const BASE_INGREDIENTS = [
  { name: "Chicken breast", amount: 500, unit: "g" },
  { name: "Plain yogurt", amount: 200, unit: "g" },
  { name: "Crushed tomatoes", amount: 400, unit: "g" },
  { name: "Tikka masala paste", amount: 2, unit: "tbsp" },
  { name: "Coconut cream", amount: 150, unit: "ml" },
  { name: "Garlic cloves", amount: 2, unit: "" },
  { name: "Yellow onion", amount: 1, unit: "" },
  { name: "Olive oil", amount: 2, unit: "tbsp" },
  { name: "Basmati rice", amount: 300, unit: "g" },
];

const BASE_CALORIES = 520;

function formatAmount(amount: number): string {
  if (amount === Math.floor(amount)) return amount.toString();
  return amount.toFixed(1).replace(/\.0$/, "");
}

function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function Demo() {
  const [servings, setServings] = useState(4);
  const ref = useScrollAnimation<HTMLElement>();
  const multiplier = servings / BASE_SERVINGS;

  return (
    <section ref={ref} className="fade-in-section px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-orange/10 px-4 py-1.5 text-sm font-medium text-orange">
            Try it now
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Casa Kitchen in action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Scale any recipe instantly. Adjust servings and watch every ingredient
            update in real time.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Recipe card */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold">Chicken Tikka Masala</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Classic Indian-inspired comfort dish
                </p>
              </div>
              <span className="rounded-lg bg-orange/10 px-3 py-1 text-sm font-medium text-orange">
                30 min
              </span>
            </div>

            {/* Servings slider */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label htmlFor="servings" className="text-sm font-medium">
                  Servings
                </label>
                <span className="rounded-full bg-orange/10 px-3 py-0.5 text-lg font-bold text-orange">
                  {servings}
                </span>
              </div>
              <input
                id="servings"
                type="range"
                min={1}
                max={12}
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value))}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-orange [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>12</span>
              </div>
            </div>

            {/* Calorie display */}
            <div className="mt-6 rounded-xl bg-muted/30 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Per serving</span>
                <span className="text-2xl font-bold text-orange">
                  {Math.round(BASE_CALORIES)} kcal
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-sm font-medium">
                  {formatNumber(Math.round(BASE_CALORIES * servings))} kcal
                </span>
              </div>
            </div>
          </div>

          {/* Ingredients list */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Ingredients</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Scaled for {servings} {servings === 1 ? "serving" : "servings"}
            </p>

            <ul className="mt-6 space-y-3">
              {BASE_INGREDIENTS.map((ing) => {
                const scaled = ing.amount * multiplier;
                return (
                  <li
                    key={ing.name}
                    className="flex items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-muted/30"
                  >
                    <span className="text-sm">{ing.name}</span>
                    <span className="font-mono text-sm font-medium text-orange">
                      {formatAmount(scaled)}
                      {ing.unit && ` ${ing.unit}`}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
