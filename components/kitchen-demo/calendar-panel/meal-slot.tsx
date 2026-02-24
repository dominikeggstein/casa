"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/react";
import { AnimatePresence } from "framer-motion";
import { Plus, UtensilsCrossed } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { MealType, MenuItem, Person, PlacedMeal } from "../types";
import { MEAL_TYPE_LABELS } from "../data";
import { makeDroppableId } from "../utils";
import { PlacedMealCard } from "./placed-meal-card";
import { SlotPickerPopoverContent } from "./slot-picker-popover";
import { cn } from "@/lib/utils";

interface MealSlotProps {
  date: string;
  mealType: MealType;
  meals: PlacedMeal[];
  menuItems: MenuItem[];
  people: Person[];
  onRemoveMeal: (id: string) => void;
  onTogglePerson: (mealId: string, personId: string) => void;
  onTapPlace?: (date: string, mealType: MealType) => void;
  onPickMeal?: (date: string, mealType: MealType, menuItemId: string) => void;
  onUpdateMenuItem: (updated: MenuItem) => void;
}

export function MealSlot({
  date,
  mealType,
  meals,
  menuItems,
  people,
  onRemoveMeal,
  onTogglePerson,
  onTapPlace,
  onPickMeal,
  onUpdateMenuItem,
}: MealSlotProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const droppableId = makeDroppableId(date, mealType);
  const { ref, isDropTarget } = useDroppable({
    id: droppableId,
    data: { date, mealType },
  });

  const slotMeals = meals.filter(
    (m) => m.date === date && m.mealType === mealType
  );

  const handlePickRecipe = (menuItemId: string) => {
    onPickMeal?.(date, mealType, menuItemId);
    setPickerOpen(false);
  };

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        "min-h-[52px] rounded-lg border p-1.5 transition-all",
        isDropTarget
          ? "border-orange bg-orange/10"
          : "border-border/50 border-dashed"
      )}
    >
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {MEAL_TYPE_LABELS[mealType]}
      </p>

      {slotMeals.length > 0 ? (
        <div className="space-y-1">
          <AnimatePresence mode="popLayout">
            {slotMeals.map((meal) => {
              const menuItem = menuItems.find((m) => m.id === meal.menuItemId);
              if (!menuItem) return null;
              return (
                <PlacedMealCard
                  key={meal.id}
                  meal={meal}
                  menuItem={menuItem}
                  people={people}
                  onRemove={onRemoveMeal}
                  onTogglePerson={onTogglePerson}
                  onUpdateMenuItem={onUpdateMenuItem}
                />
              );
            })}
          </AnimatePresence>

          {/* Add another recipe to this slot */}
          <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1 rounded-md py-0.5 text-[10px] text-muted-foreground/40 transition-colors hover:bg-muted/20 hover:text-muted-foreground"
              >
                <Plus className="size-3" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-2" side="right" align="start">
              <SlotPickerPopoverContent
                items={menuItems}
                onSelect={handlePickRecipe}
              />
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              onClick={() => onTapPlace?.(date, mealType)}
              className="flex w-full items-center justify-center gap-1.5 rounded-md py-2 text-[10px] text-muted-foreground/50 transition-colors hover:bg-muted/20 hover:text-muted-foreground"
            >
              <UtensilsCrossed className="size-3" />
              Drop a recipe
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[220px] p-2" side="right" align="start">
            <SlotPickerPopoverContent
              items={menuItems}
              onSelect={handlePickRecipe}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
