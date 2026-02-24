"use client";

import { Flame } from "lucide-react";
import type { MealType, MenuItem, Person, PlacedMeal } from "../types";
import { MEAL_TYPE_ORDER } from "../data";
import { fromDateString, isToday, getMealTotalCalories } from "../utils";
import { MealSlot } from "./meal-slot";
import { cn } from "@/lib/utils";

interface DayColumnProps {
  date: string;
  meals: PlacedMeal[];
  menuItems: MenuItem[];
  people: Person[];
  onRemoveMeal: (id: string) => void;
  onTogglePerson: (mealId: string, personId: string) => void;
  onUpdateServings: (placedMealId: string, personId: string, servings: number) => void;
  onTapPlace?: (date: string, mealType: MealType) => void;
  onPickMeal?: (date: string, mealType: MealType, menuItemId: string) => void;
  onUpdateMenuItem: (updated: MenuItem) => void;
}

export function DayColumn({
  date,
  meals,
  menuItems,
  people,
  onRemoveMeal,
  onTogglePerson,
  onUpdateServings,
  onTapPlace,
  onPickMeal,
  onUpdateMenuItem,
}: DayColumnProps) {
  const d = fromDateString(date);
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum = d.getDate();
  const today = isToday(date);

  const dayMeals = meals.filter((m) => m.date === date);
  const totalCalories = dayMeals.reduce((sum, m) => {
    const item = menuItems.find((mi) => mi.id === m.menuItemId);
    if (!item) return sum;
    return sum + getMealTotalCalories(m, item);
  }, 0);
  // Average target across all people, fallback to 2000
  const avgTarget =
    people.length > 0
      ? Math.round(
          people.reduce((s, p) => s + p.dailyCalorieTarget, 0) / people.length
        )
      : 2000;
  const pct = Math.min((totalCalories / avgTarget) * 100, 100);
  const isOver = totalCalories > avgTarget;

  return (
    <div className="flex min-w-[100px] flex-1 flex-col">
      <div className="mb-2 text-center">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {dayName}
        </p>
        <p
          className={cn(
            "mx-auto mt-0.5 flex size-7 items-center justify-center rounded-full text-sm font-semibold",
            today ? "bg-orange text-white" : "text-foreground"
          )}
        >
          {dayNum}
        </p>
      </div>

      <div className="space-y-1.5">
        {MEAL_TYPE_ORDER.map((mealType) => (
          <MealSlot
            key={mealType}
            date={date}
            mealType={mealType}
            meals={meals}
            menuItems={menuItems}
            people={people}
            onRemoveMeal={onRemoveMeal}
            onTogglePerson={onTogglePerson}
            onUpdateServings={onUpdateServings}
            onTapPlace={onTapPlace}
            onPickMeal={onPickMeal}
            onUpdateMenuItem={onUpdateMenuItem}
          />
        ))}
      </div>

      {/* Daily calorie summary */}
      {totalCalories > 0 && (
        <div className="mt-2 rounded-lg border border-border/30 bg-muted/10 px-2 py-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Flame className={cn("size-3", isOver ? "text-destructive" : "text-orange/80")} />
              <span className="font-mono text-[10px] font-semibold tabular-nums text-foreground">
                {totalCalories}
              </span>
            </div>
            <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
              / {avgTarget}
            </span>
          </div>
          <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted/30">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                isOver ? "bg-destructive" : "bg-orange/70"
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
