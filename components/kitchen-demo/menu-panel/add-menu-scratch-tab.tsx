"use client";

import { useState } from "react";
import { PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MenuItem } from "../types";
import { genId } from "../utils";
import Image from "next/image";

const IMAGE_OPTIONS = [
  "/images/food/1_avocado_toast.png",
  "/images/food/2_chicken_tikka_masala.png",
  "/images/food/3_greek_salad.png",
  "/images/food/4_salmon_poke_bowl.png",
  "/images/food/5_blueberry_pancakes.png",
  "/images/food/6_pasta_carbonara.png",
  "/images/food/7_turkey_club_wrap.png",
  "/images/food/8_lentil_soup.png",
  "/images/food/9_protein_energy_bites.png",
  "/images/food/10_falafel_bowl.png",
];

interface AddMenuScratchTabProps {
  onAdd: (item: MenuItem) => void;
}

export function AddMenuScratchTab({ onAdd }: AddMenuScratchTabProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(IMAGE_OPTIONS[0]);
  const [time, setTime] = useState("20");
  const [servings, setServings] = useState("2");
  const [calories, setCalories] = useState("400");

  function handleAdd() {
    if (!name.trim()) return;
    const item: MenuItem = {
      id: genId("menu"),
      image,
      name: name.trim(),
      time: parseInt(time) || 20,
      servings: parseInt(servings) || 2,
      macros: {
        calories: parseInt(calories) || 400,
        protein: Math.round((parseInt(calories) || 400) * 0.25 / 4),
        carbs: Math.round((parseInt(calories) || 400) * 0.45 / 4),
        fat: Math.round((parseInt(calories) || 400) * 0.3 / 9),
      },
      ingredients: [
        { name: "Ingredient 1", amount: 200, unit: "g" },
        { name: "Ingredient 2", amount: 100, unit: "g" },
      ],
      tags: ["custom"],
    };
    onAdd(item);
    setName("");
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1.5 block text-xs">Image</Label>
        <div className="flex flex-wrap gap-1.5">
          {IMAGE_OPTIONS.map((img) => (
            <button
               key={img}
               type="button"
               onClick={() => setImage(img)}
               className={`rounded-md p-1 transition-colors ${
                 image === img
                   ? "bg-orange/20 ring-2 ring-orange"
                   : "hover:bg-muted"
               }`}
             >
               <Image src={img} alt="Option" width={32} height={32} className="rounded-sm object-cover" />
             </button>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="scratch-name" className="mb-1.5 block text-xs">
          Recipe Name
        </Label>
        <Input
          id="scratch-name"
          placeholder="My recipe..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor="scratch-time" className="mb-1.5 block text-xs">
            Time (min)
          </Label>
          <Input
            id="scratch-time"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            min={1}
          />
        </div>
        <div>
          <Label htmlFor="scratch-servings" className="mb-1.5 block text-xs">
            Servings
          </Label>
          <Input
            id="scratch-servings"
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            min={1}
          />
        </div>
        <div>
          <Label htmlFor="scratch-kcal" className="mb-1.5 block text-xs">
            Calories
          </Label>
          <Input
            id="scratch-kcal"
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            min={1}
          />
        </div>
      </div>

      <Button
        onClick={handleAdd}
        disabled={!name.trim()}
        className="w-full gap-2"
      >
        <PenLine className="size-4" />
        Add Recipe
      </Button>
    </div>
  );
}
