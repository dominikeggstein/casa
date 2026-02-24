"use client";

import type { CalendarView, MealType, MenuItem, Person, PlacedMeal } from "../types";
import { getVisibleDates } from "../utils";
import { ViewSelector } from "./view-selector";
import { CalendarNav } from "./calendar-nav";
import { DayColumn } from "./day-column";

interface CalendarPanelProps {
  startDate: string;
  view: CalendarView;
  placedMeals: PlacedMeal[];
  menuItems: MenuItem[];
  people: Person[];
  onViewChange: (view: CalendarView) => void;
  onNavigate: (dir: "prev" | "next" | "today") => void;
  onRemoveMeal: (id: string) => void;
  onTogglePerson: (mealId: string, personId: string) => void;
  onUpdateServings: (placedMealId: string, personId: string, servings: number) => void;
  onTapPlace?: (date: string, mealType: MealType) => void;
  onPickMeal?: (date: string, mealType: MealType, menuItemId: string) => void;
  onUpdateMenuItem: (updated: MenuItem) => void;
}

export function CalendarPanel({
  startDate,
  view,
  placedMeals,
  menuItems,
  people,
  onViewChange,
  onNavigate,
  onRemoveMeal,
  onTogglePerson,
  onUpdateServings,
  onTapPlace,
  onPickMeal,
  onUpdateMenuItem,
}: CalendarPanelProps) {
  const dates = getVisibleDates(startDate, view);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <CalendarNav
          startDate={startDate}
          view={view}
          onNavigate={onNavigate}
        />
        <ViewSelector view={view} onViewChange={onViewChange} />
      </div>

      <div className="mt-3 flex-1 overflow-x-auto">
        <div className="flex gap-2">
          {dates.map((date) => (
            <DayColumn
              key={date}
              date={date}
              meals={placedMeals}
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
      </div>
    </div>
  );
}
