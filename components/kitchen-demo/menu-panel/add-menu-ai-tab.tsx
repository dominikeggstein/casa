"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { MenuItem } from "../types";
import { genId } from "../utils";

const AI_RESULTS: Omit<MenuItem, "id">[] = [
  {
    emoji: "\u{1F961}",
    name: "Teriyaki Chicken Stir-Fry",
    time: 25,
    servings: 3,
    macros: { calories: 440, protein: 34, carbs: 38, fat: 16 },
    ingredients: [
      { name: "Chicken thigh", amount: 400, unit: "g" },
      { name: "Broccoli", amount: 200, unit: "g" },
      { name: "Bell pepper", amount: 1, unit: "" },
      { name: "Teriyaki sauce", amount: 4, unit: "tbsp" },
      { name: "Jasmine rice", amount: 250, unit: "g" },
      { name: "Sesame seeds", amount: 1, unit: "tbsp" },
    ],
    tags: ["protein", "asian"],
  },
  {
    emoji: "\u{1F96C}",
    name: "Spinach & Ricotta Stuffed Shells",
    time: 45,
    servings: 4,
    macros: { calories: 490, protein: 22, carbs: 48, fat: 24 },
    ingredients: [
      { name: "Jumbo pasta shells", amount: 250, unit: "g" },
      { name: "Ricotta cheese", amount: 400, unit: "g" },
      { name: "Baby spinach", amount: 200, unit: "g" },
      { name: "Marinara sauce", amount: 500, unit: "ml" },
      { name: "Mozzarella", amount: 150, unit: "g" },
      { name: "Parmesan", amount: 50, unit: "g" },
    ],
    tags: ["vegetarian", "italian"],
  },
  {
    emoji: "\u{1F35B}",
    name: "Coconut Curry Shrimp",
    time: 20,
    servings: 2,
    macros: { calories: 410, protein: 28, carbs: 32, fat: 20 },
    ingredients: [
      { name: "Large shrimp", amount: 300, unit: "g" },
      { name: "Coconut milk", amount: 400, unit: "ml" },
      { name: "Red curry paste", amount: 2, unit: "tbsp" },
      { name: "Jasmine rice", amount: 200, unit: "g" },
      { name: "Lime", amount: 1, unit: "" },
      { name: "Fresh basil", amount: 10, unit: "g" },
    ],
    tags: ["quick", "seafood"],
  },
];

interface AddMenuAiTabProps {
  onAdd: (item: MenuItem) => void;
}

export function AddMenuAiTab({ onAdd }: AddMenuAiTabProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const template = AI_RESULTS[Math.floor(Math.random() * AI_RESULTS.length)];
      onAdd({ ...template, id: genId("menu") });
      setLoading(false);
      setPrompt("");
    }, 1500);
  }

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Describe a meal... e.g. 'A high-protein lunch with chicken and veggies'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
      />
      <Button
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="size-4" />
            Generate Recipe
          </>
        )}
      </Button>
    </div>
  );
}
