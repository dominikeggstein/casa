"use client";

import { Clock, Flame, Drumstick, Wheat, Droplets, Users, Minus, Plus, X, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { MenuItem, Person, PlacedMeal } from "../types";
import {
  getPersonCalories,
  getScaledMacros,
  getScaledIngredients,
  getTotalServingsConsumed,
  formatAmount,
} from "../utils";
import { RecipeAiChat } from "./recipe-ai-chat";
import Image from "next/image";

interface RecipeDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuItem: MenuItem;
  meal?: PlacedMeal;
  people?: Person[];
  onTogglePerson?: (personId: string) => void;
  onUpdateServings?: (personId: string, servings: number) => void;
  onUpdateMenuItem: (updated: MenuItem) => void;
}

const MACRO_ITEMS = [
  { key: "calories" as const, label: "Cal", icon: Flame, color: "text-orange" },
  { key: "protein" as const, label: "Protein", icon: Drumstick, color: "text-emerald-400" },
  { key: "carbs" as const, label: "Carbs", icon: Wheat, color: "text-amber-400" },
  { key: "fat" as const, label: "Fat", icon: Droplets, color: "text-blue-400" },
];

export function RecipeDetailDialog({
  open,
  onOpenChange,
  menuItem,
  meal,
  people,
  onTogglePerson,
  onUpdateServings,
  onUpdateMenuItem,
}: RecipeDetailDialogProps) {
  const hasMealContext = !!(meal && people);
  const scaledMacros = hasMealContext ? getScaledMacros(meal, menuItem) : menuItem.macros;
  const scaledIngredients = hasMealContext ? getScaledIngredients(meal, menuItem) : menuItem.ingredients;
  const totalConsumed = hasMealContext ? getTotalServingsConsumed(meal) : menuItem.servings;

  const assignedPeople = hasMealContext
    ? people.filter((p) => meal.assignedPersonIds.includes(p.id))
    : [];
  const unassignedPeople = hasMealContext
    ? people.filter((p) => !meal.assignedPersonIds.includes(p.id))
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image src={menuItem.image} alt={menuItem.name} width={32} height={32} className="shrink-0 rounded-md object-cover" />
            <span>{menuItem.name}</span>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {menuItem.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-[10px] capitalize"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid max-h-[60vh] gap-4 overflow-hidden md:grid-cols-[1fr,280px]">
          {/* Left: Recipe details (scrollable) */}
          <div className="overflow-y-auto overscroll-contain pr-1" style={{ scrollbarWidth: "thin" }}>
            <div className="space-y-4">
              {/* Quick stats */}
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {menuItem.time} min
                </span>
                <span className="flex items-center gap-1">
                  <Users className="size-3.5" />
                  {menuItem.servings} serving{menuItem.servings > 1 ? "s" : ""}
                  {hasMealContext && totalConsumed !== menuItem.servings && (
                    <span className="text-orange">({totalConsumed} used)</span>
                  )}
                </span>
              </div>

              {/* People & Servings panel */}
              {hasMealContext && (
                <div className="rounded-lg border border-border/50 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-semibold">People & Servings</h4>
                    {unassignedPeople.length > 0 && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 gap-1 px-2 text-[10px]">
                            <UserPlus className="size-3" />
                            Add
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[160px] p-2" side="bottom" align="end">
                          <div className="space-y-1">
                            {unassignedPeople.map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => onTogglePerson?.(p.id)}
                                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors hover:bg-muted"
                              >
                                <span
                                  className="size-2.5 rounded-full"
                                  style={{ backgroundColor: p.color }}
                                />
                                {p.name}
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                  <div className="space-y-2">
                    {assignedPeople.map((person) => {
                      const servings = meal.personServings[person.id] ?? 1;
                      const personCal = getPersonCalories(meal, menuItem, person.id);
                      return (
                        <div
                          key={person.id}
                          className="flex items-center gap-2"
                        >
                          <span
                            className="size-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: person.color }}
                          />
                          <span className="min-w-0 flex-1 truncate text-xs font-medium">
                            {person.name}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => onUpdateServings?.(person.id, servings - 0.5)}
                              disabled={servings <= 0.5}
                              className="flex size-5 items-center justify-center rounded border border-border/50 text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-6 text-center font-mono text-xs tabular-nums">
                              {formatAmount(servings)}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateServings?.(person.id, servings + 0.5)}
                              className="flex size-5 items-center justify-center rounded border border-border/50 text-muted-foreground transition-colors hover:bg-muted"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="w-12 text-right font-mono text-[10px] tabular-nums text-orange/70">
                            {personCal} cal
                          </span>
                          <button
                            type="button"
                            onClick={() => onTogglePerson?.(person.id)}
                            className="flex size-4 items-center justify-center rounded-full text-muted-foreground/50 transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <X className="size-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  {assignedPeople.length === 0 && (
                    <p className="py-2 text-center text-[10px] text-muted-foreground">
                      No people assigned
                    </p>
                  )}
                </div>
              )}

              {/* Macros grid */}
              <div className="grid grid-cols-4 gap-2">
                {MACRO_ITEMS.map(({ key, label, icon: Icon, color }) => (
                  <div
                    key={key}
                    className="rounded-lg border border-border/50 p-2 text-center"
                  >
                    <Icon className={`mx-auto size-4 ${color}`} />
                    <p className="mt-1 text-sm font-semibold">
                      {scaledMacros[key]}
                      {key === "calories" ? "" : "g"}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              {/* Ingredients */}
              <div>
                <h4 className="mb-2 text-sm font-semibold">Ingredients</h4>
                <ul className="space-y-1.5">
                  {scaledIngredients.map((ing, i) => (
                    <li
                      key={i}
                      className="flex items-baseline justify-between text-xs"
                    >
                      <span className="text-foreground">{ing.name}</span>
                      <span className="ml-2 shrink-0 text-muted-foreground">
                        {formatAmount(ing.amount)} {ing.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: AI Chat */}
          <div className="flex h-[300px] flex-col rounded-lg border border-border/50 p-3 md:h-auto">
            <RecipeAiChat
              menuItem={menuItem}
              onUpdateMenuItem={onUpdateMenuItem}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
