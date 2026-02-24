"use client";

import { useState, useRef, useCallback } from "react";
import { useDraggable } from "@dnd-kit/react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { MenuItem, Person, PlacedMeal } from "../types";
import { PeoplePickerPopoverContent } from "./people-picker-popover";
import { RecipeDetailDialog } from "./recipe-detail-dialog";

interface PlacedMealCardProps {
  meal: PlacedMeal;
  menuItem: MenuItem;
  people: Person[];
  onRemove: (id: string) => void;
  onTogglePerson: (mealId: string, personId: string) => void;
  onUpdateMenuItem: (updated: MenuItem) => void;
}

export function PlacedMealCard({
  meal,
  menuItem,
  people,
  onRemove,
  onTogglePerson,
  onUpdateMenuItem,
}: PlacedMealCardProps) {
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const { ref } = useDraggable({
    id: `placed-drag-${meal.id}`,
    data: { type: "placed-meal", placedMealId: meal.id },
  });

  const assignedPeople = people.filter((p) =>
    meal.assignedPersonIds.includes(p.id)
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!pointerStart.current) return;
    const dx = Math.abs(e.clientX - pointerStart.current.x);
    const dy = Math.abs(e.clientY - pointerStart.current.y);
    // Only open dialog if the pointer barely moved (not a drag)
    if (dx < 5 && dy < 5) {
      setDetailOpen(true);
    }
    pointerStart.current = null;
  }, []);

  return (
    <>
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
        className="group relative flex touch-none cursor-grab items-center gap-2 rounded-lg border border-border bg-card p-2 text-xs active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <span className="text-base leading-none">{menuItem.emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1">
            <p className="truncate font-medium">{menuItem.name}</p>
            <span className="ml-auto shrink-0 font-mono text-[10px] tabular-nums text-orange/70">
              {menuItem.macros.calories}
            </span>
          </div>
        <Popover open={peopleOpen} onOpenChange={setPeopleOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              onClick={(e) => e.stopPropagation()}
              className="mt-0.5 flex items-center gap-1 rounded-sm px-0.5 py-0.5 transition-colors hover:bg-muted/40"
            >
              {assignedPeople.length > 0 ? (
                assignedPeople.map((p) => (
                  <span
                    key={p.id}
                    className="size-2.5 rounded-full ring-1 ring-background"
                    style={{ backgroundColor: p.color }}
                  />
                ))
              ) : (
                <span className="text-[10px] text-muted-foreground/50">
                  + people
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[180px] p-2"
            side="right"
            align="start"
            onClick={(e) => e.stopPropagation()}
          >
            <PeoplePickerPopoverContent
              people={people}
              assignedPersonIds={meal.assignedPersonIds}
              onTogglePerson={(personId) =>
                onTogglePerson(meal.id, personId)
              }
            />
          </PopoverContent>
        </Popover>
      </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(meal.id);
          }}
          className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-white opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Remove meal"
        >
          <X className="size-2.5" />
        </button>
      </motion.div>

      <RecipeDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        menuItem={menuItem}
        onUpdateMenuItem={onUpdateMenuItem}
      />
    </>
  );
}
