"use client";

import { Check } from "lucide-react";
import type { Person } from "../types";
import { cn } from "@/lib/utils";

interface PeoplePickerPopoverProps {
  people: Person[];
  assignedPersonIds: string[];
  onTogglePerson: (personId: string) => void;
}

export function PeoplePickerPopoverContent({
  people,
  assignedPersonIds,
  onTogglePerson,
}: PeoplePickerPopoverProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        Assign people
      </p>
      <div className="flex flex-col gap-0.5">
        {people.map((person) => {
          const isAssigned = assignedPersonIds.includes(person.id);
          return (
            <button
              key={person.id}
              type="button"
              onClick={() => onTogglePerson(person.id)}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors hover:bg-muted"
            >
              <span
                className="size-3 rounded-full ring-1 ring-border"
                style={{ backgroundColor: person.color }}
              />
              <span
                className={cn(
                  "flex-1 font-medium",
                  !isAssigned && "text-muted-foreground"
                )}
              >
                {person.name}
              </span>
              {isAssigned && (
                <Check className="size-3.5 text-orange" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
