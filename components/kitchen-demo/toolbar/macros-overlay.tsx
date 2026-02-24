"use client";

import { motion } from "framer-motion";
import type { MenuItem, Person, PlacedMeal } from "../types";
import { aggregateMacros, formatDateShort } from "../utils";

interface MacrosOverlayProps {
  visibleDates: string[];
  placedMeals: PlacedMeal[];
  menuItems: MenuItem[];
  people: Person[];
}

const MACRO_CONFIG = [
  { key: "calories" as const, label: "Cal", color: "#E8734A", max: 2500, unit: "kcal" },
  { key: "protein" as const, label: "Pro", color: "#5BA37C", max: 150, unit: "g" },
  { key: "carbs" as const, label: "Carb", color: "#4A90D9", max: 300, unit: "g" },
  { key: "fat" as const, label: "Fat", color: "#D4A843", max: 100, unit: "g" },
];

export function MacrosOverlay({
  visibleDates,
  placedMeals,
  menuItems,
}: MacrosOverlayProps) {
  const dailyMacros = visibleDates.map((date) => {
    const dayMeals = placedMeals.filter((m) => m.date === date);
    return { date, macros: aggregateMacros(dayMeals, menuItems) };
  });

  const weeklyTotals = dailyMacros.reduce(
    (acc, { macros }) => ({
      calories: acc.calories + macros.calories,
      protein: acc.protein + macros.protein,
      carbs: acc.carbs + macros.carbs,
      fat: acc.fat + macros.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const avgDays = visibleDates.length;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 overflow-hidden rounded-xl border border-border bg-card p-3"
    >
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Daily Macros
      </p>

      <div className="space-y-3">
        {dailyMacros.map(({ date, macros }) => (
          <div key={date}>
            <p className="mb-1 text-[10px] font-medium text-muted-foreground">
              {formatDateShort(date)}
            </p>
            <div className="space-y-1">
              {MACRO_CONFIG.map((cfg) => {
                const value = macros[cfg.key];
                const pct = Math.min((value / cfg.max) * 100, 100);
                return (
                  <div key={cfg.key} className="flex items-center gap-2">
                    <span className="w-8 text-[10px] text-muted-foreground">
                      {cfg.label}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted/30">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: cfg.color }}
                      />
                    </div>
                    <span className="w-14 text-right font-mono text-[10px]">
                      {value}
                      {cfg.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-border pt-2">
        <p className="mb-1 text-[10px] font-medium text-muted-foreground">
          Average / day ({avgDays} days)
        </p>
        <div className="grid grid-cols-4 gap-2 text-center">
          {MACRO_CONFIG.map((cfg) => (
            <div key={cfg.key}>
              <p
                className="text-sm font-semibold"
                style={{ color: cfg.color }}
              >
                {Math.round(weeklyTotals[cfg.key] / avgDays)}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {cfg.label} ({cfg.unit})
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
