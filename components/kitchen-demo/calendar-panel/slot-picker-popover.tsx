"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { MenuItem } from "../types";
import Image from "next/image";

interface SlotPickerPopoverProps {
  items: MenuItem[];
  onSelect: (menuItemId: string) => void;
}

export function SlotPickerPopoverContent({
  items,
  onSelect,
}: SlotPickerPopoverProps) {
  const [search, setSearch] = useState("");

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-8 pl-7 text-xs"
          autoFocus
        />
      </div>
      <ScrollArea className="max-h-[200px]">
        <div className="flex flex-col gap-0.5">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted"
            >
              <Image src={item.image} alt={item.name} width={16} height={16} className="shrink-0 rounded-sm object-cover" />
              <span className="min-w-0 flex-1 truncate font-medium">
                {item.name}
              </span>
              <span className="shrink-0 text-[10px] text-muted-foreground">
                {item.macros.calories} kcal
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="py-4 text-center text-[10px] text-muted-foreground">
              No recipes found
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
