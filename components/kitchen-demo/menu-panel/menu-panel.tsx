"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MenuItem } from "../types";
import { MenuItemCard } from "./menu-item-card";
import { AddMenuDialog } from "./add-menu-dialog";
import { cn } from "@/lib/utils";

interface MenuPanelProps {
  items: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
}

export function MenuPanel({ items, onAddItem, selectedItemId, onSelectItem }: MenuPanelProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of items) {
      for (const tag of item.tags) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    }
    return counts;
  }, [items]);

  const allTags = useMemo(
    () => Object.keys(tagCounts).sort(),
    [tagCounts]
  );

  const filtered = items.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesTag = activeTag === null || item.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex h-full flex-col">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tag filter chips */}
      <div className="mt-2 flex flex-wrap gap-1">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
              activeTag === tag
                ? "bg-orange text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {tag} ({tagCounts[tag]})
          </button>
        ))}
      </div>

      <ScrollArea className="mt-3 min-h-0 flex-1">
        <div className="space-y-2 pr-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                isSelected={selectedItemId === item.id}
                onSelect={() =>
                  onSelectItem(selectedItemId === item.id ? null : item.id)
                }
              />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No recipes found
            </p>
          )}
        </div>
      </ScrollArea>

      <Button
        onClick={() => setDialogOpen(true)}
        className="mt-3 w-full gap-2"
        variant="outline"
      >
        <Plus className="size-4" />
        Add Recipe
      </Button>

      <AddMenuDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={(item) => {
          onAddItem(item);
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
