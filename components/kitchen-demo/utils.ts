import type { CalendarView, Ingredient, Macros, MenuItem, Person, PlacedMeal } from "./types";

let counter = 0;
export function genId(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now()}-${counter}`;
}

// ── Date helpers ──

export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromDateString(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(dateStr: string, days: number): string {
  const d = fromDateString(dateStr);
  d.setDate(d.getDate() + days);
  return toDateString(d);
}

/** Get the Monday of the week containing the given date. */
export function getMonday(dateStr: string): string {
  const d = fromDateString(dateStr);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Sunday → go back 6
  d.setDate(d.getDate() + diff);
  return toDateString(d);
}

export function getToday(): string {
  return toDateString(new Date());
}

export function getVisibleDates(startDate: string, view: CalendarView): string[] {
  const count = view === "day" ? 1 : view === "3day" ? 3 : 7;
  return Array.from({ length: count }, (_, i) => addDays(startDate, i));
}

export function navigateDate(
  currentDate: string,
  view: CalendarView,
  direction: "prev" | "next" | "today"
): string {
  if (direction === "today") {
    return view === "week" ? getMonday(getToday()) : getToday();
  }
  const step = view === "day" ? 1 : view === "3day" ? 3 : 7;
  const delta = direction === "next" ? step : -step;
  return addDays(currentDate, delta);
}

export function formatDateShort(dateStr: string): string {
  const d = fromDateString(dateStr);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function formatDateRange(startDate: string, view: CalendarView): string {
  const dates = getVisibleDates(startDate, view);
  const first = fromDateString(dates[0]);
  const last = fromDateString(dates[dates.length - 1]);
  const sameMonth = first.getMonth() === last.getMonth();
  if (sameMonth) {
    return `${first.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${last.getDate()}, ${last.getFullYear()}`;
  }
  return `${first.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${last.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
}

export function isToday(dateStr: string): boolean {
  return dateStr === getToday();
}

// ── Per-person servings helpers ──

/** Sum of all personServings values for a placed meal. */
export function getTotalServingsConsumed(meal: PlacedMeal): number {
  return Object.values(meal.personServings).reduce((sum, s) => sum + s, 0);
}

/** Calories for one person based on their servings of this meal. */
export function getPersonCalories(meal: PlacedMeal, menuItem: MenuItem, personId: string): number {
  const servings = meal.personServings[personId] ?? 0;
  if (menuItem.servings === 0) return 0;
  return Math.round((servings / menuItem.servings) * menuItem.macros.calories);
}

/** Scale macros by totalConsumedServings / menuItem.servings. */
export function getScaledMacros(meal: PlacedMeal, menuItem: MenuItem): Macros {
  const total = getTotalServingsConsumed(meal);
  if (menuItem.servings === 0) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
  const scale = total / menuItem.servings;
  return {
    calories: Math.round(menuItem.macros.calories * scale),
    protein: Math.round(menuItem.macros.protein * scale),
    carbs: Math.round(menuItem.macros.carbs * scale),
    fat: Math.round(menuItem.macros.fat * scale),
  };
}

/** Scale ingredients by totalConsumedServings / menuItem.servings. */
export function getScaledIngredients(meal: PlacedMeal, menuItem: MenuItem): Ingredient[] {
  const total = getTotalServingsConsumed(meal);
  if (menuItem.servings === 0) return menuItem.ingredients;
  const scale = total / menuItem.servings;
  return menuItem.ingredients.map((ing) => ({
    ...ing,
    amount: Math.round(ing.amount * scale * 100) / 100,
  }));
}

/** Total consumed calories across all assigned people for a placed meal. */
export function getMealTotalCalories(meal: PlacedMeal, menuItem: MenuItem): number {
  return getScaledMacros(meal, menuItem).calories;
}

/** Per-person daily calories from all meals on a given date. */
export function getPersonDailyCalories(
  person: Person,
  date: string,
  meals: PlacedMeal[],
  menuItems: MenuItem[]
): number {
  return meals
    .filter((m) => m.date === date && m.personServings[person.id])
    .reduce((sum, m) => {
      const item = menuItems.find((mi) => mi.id === m.menuItemId);
      if (!item) return sum;
      return sum + getPersonCalories(m, item, person.id);
    }, 0);
}

// ── Macro helpers ──

export function aggregateMacros(meals: PlacedMeal[], menuItems: MenuItem[]): Macros {
  return meals.reduce<Macros>(
    (acc, meal) => {
      const item = menuItems.find((m) => m.id === meal.menuItemId);
      if (!item) return acc;
      const scaled = getScaledMacros(meal, item);
      return {
        calories: acc.calories + scaled.calories,
        protein: acc.protein + scaled.protein,
        carbs: acc.carbs + scaled.carbs,
        fat: acc.fat + scaled.fat,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

// ── Shopping list helpers ──

export interface AggregatedIngredient {
  name: string;
  amounts: { amount: number; unit: string }[];
}
export function formatAmount(amount: number): string {
  if (amount === Math.floor(amount)) return amount.toString();
  return amount.toFixed(1).replace(/\.0$/, "");
}

// ── Droppable ID parsing ──

export function makeDroppableId(date: string, mealType: string): string {
  return `${date}:${mealType}`;
}

export function parseDroppableId(id: string): { date: string; mealType: string } | null {
  const parts = id.split(":");
  if (parts.length !== 2) return null;
  return { date: parts[0], mealType: parts[1] };
}

// Deduplicated aggregation using the map keys directly
export function aggregateIngredientsSimple(
  meals: PlacedMeal[],
  menuItems: MenuItem[]
): AggregatedIngredient[] {
  const nameMap = new Map<string, { originalName: string; units: Map<string, number> }>();

  for (const meal of meals) {
    const item = menuItems.find((m) => m.id === meal.menuItemId);
    if (!item) continue;
    const total = getTotalServingsConsumed(meal);
    const scale = item.servings > 0 ? total / item.servings : 1;
    for (const ing of item.ingredients) {
      const key = ing.name.toLowerCase();
      if (!nameMap.has(key)) {
        nameMap.set(key, { originalName: ing.name, units: new Map() });
      }
      const entry = nameMap.get(key)!;
      const scaledAmount = Math.round(ing.amount * scale * 100) / 100;
      entry.units.set(ing.unit, (entry.units.get(ing.unit) || 0) + scaledAmount);
    }
  }

  return [...nameMap.values()]
    .map((entry) => ({
      name: entry.originalName,
      amounts: [...entry.units.entries()].map(([unit, amount]) => ({ unit, amount })),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
