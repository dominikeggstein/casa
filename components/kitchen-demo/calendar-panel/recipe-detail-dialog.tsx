"use client";

import { Clock, Flame, Drumstick, Wheat, Droplets, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { MenuItem } from "../types";
import { RecipeAiChat } from "./recipe-ai-chat";

interface RecipeDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuItem: MenuItem;
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
  onUpdateMenuItem,
}: RecipeDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{menuItem.emoji}</span>
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
                </span>
              </div>

              {/* Macros grid */}
              <div className="grid grid-cols-4 gap-2">
                {MACRO_ITEMS.map(({ key, label, icon: Icon, color }) => (
                  <div
                    key={key}
                    className="rounded-lg border border-border/50 p-2 text-center"
                  >
                    <Icon className={`mx-auto size-4 ${color}`} />
                    <p className="mt-1 text-sm font-semibold">
                      {menuItem.macros[key]}
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
                  {menuItem.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className="flex items-baseline justify-between text-xs"
                    >
                      <span className="text-foreground">{ing.name}</span>
                      <span className="ml-2 shrink-0 text-muted-foreground">
                        {ing.amount} {ing.unit}
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
