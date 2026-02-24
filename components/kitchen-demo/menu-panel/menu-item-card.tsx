"use client";

import { useDraggable } from "@dnd-kit/react";
import { motion } from "framer-motion";
import { Clock, Flame, GripVertical } from "lucide-react";
import type { MenuItem } from "../types";
import { cn } from "@/lib/utils";

interface MenuItemCardProps {
  item: MenuItem;
  onSelect?: () => void;
  isSelected?: boolean;
}

export function MenuItemCard({ item, onSelect, isSelected }: MenuItemCardProps) {
  const { ref } = useDraggable({
    id: `menu-drag-${item.id}`,
    data: { type: "menu-item", menuItemId: item.id },
  });

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={cn(
        "group flex touch-none cursor-grab items-center gap-3 rounded-xl border bg-card p-3 transition-colors active:cursor-grabbing",
        isSelected
          ? "border-orange ring-2 ring-orange/40"
          : "border-border hover:border-orange/40"
      )}
    >
      <GripVertical className="size-4 shrink-0 text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity" />
      <span className="text-2xl leading-none">{item.emoji}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{item.name}</p>
        <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {item.time}m
          </span>
          <span className="flex items-center gap-1">
            <Flame className="size-3" />
            {item.macros.calories} kcal
          </span>
        </div>
      </div>
    </motion.div>
  );
}
