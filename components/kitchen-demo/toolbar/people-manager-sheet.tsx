"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Users, X } from "lucide-react";
import type { Person } from "../types";
import { PERSON_COLORS } from "../data";
import { genId } from "../utils";
import { cn } from "@/lib/utils";

interface PeopleManagerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  people: Person[];
  onAddPerson: (person: Person) => void;
  onRemovePerson: (id: string) => void;
  onUpdatePerson: (
    id: string,
    updates: Partial<Pick<Person, "name" | "dailyCalorieTarget" | "color">>
  ) => void;
}

export function PeopleManagerSheet({
  open,
  onOpenChange,
  people,
  onAddPerson,
  onRemovePerson,
}: PeopleManagerSheetProps) {
  const [newName, setNewName] = useState("");
  const [newKcal, setNewKcal] = useState("2000");
  const [newColor, setNewColor] = useState(
    PERSON_COLORS[people.length % PERSON_COLORS.length]
  );

  function handleAdd() {
    if (!newName.trim()) return;
    onAddPerson({
      id: genId("person"),
      name: newName.trim(),
      color: newColor,
      dailyCalorieTarget: parseInt(newKcal) || 2000,
    });
    setNewName("");
    setNewKcal("2000");
    setNewColor(PERSON_COLORS[(people.length + 1) % PERSON_COLORS.length]);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[340px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Household Members
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          {people.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
            >
              <div
                className="size-4 shrink-0 rounded-full"
                style={{ backgroundColor: person.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{person.name}</p>
                <p className="text-xs text-muted-foreground">
                  {person.dailyCalorieTarget} kcal / day
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => onRemovePerson(person.id)}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <X className="size-3.5" />
              </Button>
            </div>
          ))}

          {people.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No members yet
            </p>
          )}
        </div>

        <Separator className="my-4" />

        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Add Person
        </p>
        <div className="space-y-3">
          <div>
            <Label htmlFor="person-name" className="mb-1.5 block text-xs">
              Name
            </Label>
            <Input
              id="person-name"
              placeholder="Name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="person-kcal" className="mb-1.5 block text-xs">
              Daily Calorie Target
            </Label>
            <Input
              id="person-kcal"
              type="number"
              value={newKcal}
              onChange={(e) => setNewKcal(e.target.value)}
              min={500}
              max={5000}
            />
          </div>
          <div>
            <Label className="mb-1.5 block text-xs">Color</Label>
            <div className="flex gap-2">
              {PERSON_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewColor(color)}
                  className={cn(
                    "size-6 rounded-full transition-transform",
                    newColor === color
                      ? "scale-125 ring-2 ring-foreground ring-offset-2 ring-offset-background"
                      : "hover:scale-110"
                  )}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
          <Button
            onClick={handleAdd}
            disabled={!newName.trim()}
            className="w-full gap-2"
          >
            <Plus className="size-4" />
            Add Person
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
