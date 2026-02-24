"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { CalendarView } from "../types";

interface ViewSelectorProps {
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
}

export function ViewSelector({ view, onViewChange }: ViewSelectorProps) {
  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={(v) => {
        if (v) onViewChange(v as CalendarView);
      }}
      className="bg-charcoal-lighter rounded-lg p-0.5"
    >
      <ToggleGroupItem
        value="day"
        className="px-3 py-1 text-xs data-[state=on]:bg-orange data-[state=on]:text-white"
      >
        Day
      </ToggleGroupItem>
      <ToggleGroupItem
        value="3day"
        className="px-3 py-1 text-xs data-[state=on]:bg-orange data-[state=on]:text-white"
      >
        3-Day
      </ToggleGroupItem>
      <ToggleGroupItem
        value="week"
        className="px-3 py-1 text-xs data-[state=on]:bg-orange data-[state=on]:text-white"
      >
        Week
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
