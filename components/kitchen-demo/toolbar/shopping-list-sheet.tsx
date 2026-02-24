"use client";

import { useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import type { MenuItem, PlacedMeal } from "../types";
import { aggregateIngredientsSimple, formatAmount } from "../utils";
import Image from "next/image";

interface ShoppingListSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placedMeals: PlacedMeal[];
  menuItems: MenuItem[];
}

export function ShoppingListSheet({
  open,
  onOpenChange,
  placedMeals,
  menuItems,
}: ShoppingListSheetProps) {
  const [selectedMealIds, setSelectedMealIds] = useState<Set<string>>(
    () => new Set(placedMeals.map((m) => m.id))
  );
  const [checkedIngredients, setCheckedIngredients] = useState<Set<string>>(
    new Set()
  );

  // Unique menu items that appear in placed meals
  const uniqueMenuItems = useMemo(() => {
    const seen = new Set<string>();
    return placedMeals
      .map((pm) => {
        const item = menuItems.find((m) => m.id === pm.menuItemId);
        if (!item || seen.has(item.id)) return null;
        seen.add(item.id);
        return { placedMealId: pm.id, menuItem: item };
      })
      .filter(Boolean) as { placedMealId: string; menuItem: MenuItem }[];
  }, [placedMeals, menuItems]);

  const selectedMeals = placedMeals.filter((m) => selectedMealIds.has(m.id));
  const ingredients = aggregateIngredientsSimple(selectedMeals, menuItems);

  function toggleMeal(mealId: string) {
    setSelectedMealIds((prev) => {
      const next = new Set(prev);
      if (next.has(mealId)) next.delete(mealId);
      else next.add(mealId);
      return next;
    });
  }

  function toggleIngredient(name: string) {
    setCheckedIngredients((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[340px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="size-5" />
            Shopping List
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="mt-4 h-[calc(100vh-120px)]">
          <div className="pr-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Include meals
            </p>
            <div className="space-y-2">
              {uniqueMenuItems.map(({ placedMealId, menuItem }) => (
                <div key={placedMealId} className="flex items-center gap-2">
                  <Checkbox
                    id={`meal-${placedMealId}`}
                    checked={selectedMealIds.has(placedMealId)}
                    onCheckedChange={() => toggleMeal(placedMealId)}
                  />
                  <Label
                    htmlFor={`meal-${placedMealId}`}
                    className="flex items-center gap-1.5 text-sm"
                  >
                    <Image src={menuItem.image} alt={menuItem.name} width={16} height={16} className="shrink-0 rounded-sm object-cover" />
                    {menuItem.name}
                  </Label>
                </div>
              ))}
            </div>

            {placedMeals.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Add meals to your calendar first
              </p>
            )}

            <Separator className="my-4" />

            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Ingredients ({ingredients.length})
            </p>
            <div className="space-y-1.5">
              {ingredients.map((ing) => (
                <div key={ing.name} className="flex items-center gap-2">
                  <Checkbox
                    id={`ing-${ing.name}`}
                    checked={checkedIngredients.has(ing.name)}
                    onCheckedChange={() => toggleIngredient(ing.name)}
                  />
                  <Label
                    htmlFor={`ing-${ing.name}`}
                    className={`flex flex-1 items-center justify-between text-sm ${
                      checkedIngredients.has(ing.name)
                        ? "text-muted-foreground line-through"
                        : ""
                    }`}
                  >
                    <span>{ing.name}</span>
                    <span className="font-mono text-xs text-orange">
                      {ing.amounts
                        .map(
                          (a) =>
                            `${formatAmount(a.amount)}${a.unit ? ` ${a.unit}` : ""}`
                        )
                        .join(" + ")}
                    </span>
                  </Label>
                </div>
              ))}
            </div>

            {ingredients.length === 0 && selectedMeals.length > 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No ingredients to show
              </p>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
