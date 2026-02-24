import type { CalendarView, Ingredient, Macros, MenuItem, PlacedMeal } from "./types";

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
  if (view === "day") return formatDateShort(startDate);
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

// ── Macro helpers ──

export function aggregateMacros(meals: PlacedMeal[], menuItems: MenuItem[]): Macros {
  return meals.reduce<Macros>(
    (acc, meal) => {
      const item = menuItems.find((m) => m.id === meal.menuItemId);
      if (!item) return acc;
      return {
        calories: acc.calories + item.macros.calories,
        protein: acc.protein + item.macros.protein,
        carbs: acc.carbs + item.macros.carbs,
        fat: acc.fat + item.macros.fat,
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

export function aggregateIngredients(
  meals: PlacedMeal[],
  menuItems: MenuItem[]
): AggregatedIngredient[] {
  const map = new Map<string, Map<string, number>>();

  for (const meal of meals) {
    const item = menuItems.find((m) => m.id === meal.menuItemId);
    if (!item) continue;
    for (const ing of item.ingredients) {
      const key = ing.name.toLowerCase();
      if (!map.has(key)) map.set(key, new Map());
      const unitMap = map.get(key)!;
      unitMap.set(ing.unit, (unitMap.get(ing.unit) || 0) + ing.amount);
    }
  }

  const result: AggregatedIngredient[] = [];
  for (const [, unitMap] of map) {
    const entries = [...unitMap.entries()];
    const firstEntry = entries[0];
    if (!firstEntry) continue;
    // Use the original casing from the first matching ingredient
    let originalName = "";
    for (const meal of meals) {
      const item = menuItems.find((m) => m.id === meal.menuItemId);
      if (!item) continue;
      const found = item.ingredients.find(
        (i) => i.name.toLowerCase() === [...map.keys()].find((k) => map.get(k) === unitMap) || i.name.toLowerCase() === firstEntry[0]
      );
      if (found) {
        originalName = found.name;
        break;
      }
    }
    result.push({
      name: originalName || firstEntry[0],
      amounts: entries.map(([unit, amount]) => ({ unit, amount })),
    });
  }

  return result.sort((a, b) => a.name.localeCompare(b.name));
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
    for (const ing of item.ingredients) {
      const key = ing.name.toLowerCase();
      if (!nameMap.has(key)) {
        nameMap.set(key, { originalName: ing.name, units: new Map() });
      }
      const entry = nameMap.get(key)!;
      entry.units.set(ing.unit, (entry.units.get(ing.unit) || 0) + ing.amount);
    }
  }

  return [...nameMap.values()]
    .map((entry) => ({
      name: entry.originalName,
      amounts: [...entry.units.entries()].map(([unit, amount]) => ({ unit, amount })),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
