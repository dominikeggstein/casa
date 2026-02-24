"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CalendarView } from "../types";
import { formatDateRange } from "../utils";

interface CalendarNavProps {
  startDate: string;
  view: CalendarView;
  onNavigate: (dir: "prev" | "next" | "today") => void;
}

export function CalendarNav({ startDate, view, onNavigate }: CalendarNavProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onNavigate("prev")}
        aria-label="Previous"
      >
        <ChevronLeft className="size-4" />
      </Button>
      <span className="min-w-[140px] text-center text-sm font-medium">
        {formatDateRange(startDate, view)}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onNavigate("next")}
        aria-label="Next"
      >
        <ChevronRight className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="xs"
        onClick={() => onNavigate("today")}
        className="ml-1 text-orange"
      >
        Today
      </Button>
    </div>
  );
}
