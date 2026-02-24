"use client";

import { useState } from "react";
import { Loader2, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MenuItem } from "../types";
import { genId } from "../utils";

const IMPORTED_RECIPE: Omit<MenuItem, "id"> = {
  emoji: "\u{1F96F}",
  name: "Honey Garlic Salmon",
  time: 25,
  servings: 2,
  macros: { calories: 460, protein: 36, carbs: 24, fat: 22 },
  ingredients: [
    { name: "Salmon fillet", amount: 400, unit: "g" },
    { name: "Honey", amount: 3, unit: "tbsp" },
    { name: "Garlic cloves", amount: 4, unit: "" },
    { name: "Soy sauce", amount: 2, unit: "tbsp" },
    { name: "Butter", amount: 30, unit: "g" },
    { name: "Asparagus", amount: 200, unit: "g" },
  ],
  tags: ["protein", "quick"],
};

interface AddMenuUrlTabProps {
  onAdd: (item: MenuItem) => void;
}

export function AddMenuUrlTab({ onAdd }: AddMenuUrlTabProps) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  function handleImport() {
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      onAdd({ ...IMPORTED_RECIPE, id: genId("menu") });
      setLoading(false);
      setUrl("");
    }, 1500);
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Paste recipe URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        type="url"
      />
      <Button
        onClick={handleImport}
        disabled={loading || !url.trim()}
        className="w-full gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Importing...
          </>
        ) : (
          <>
            <Link className="size-4" />
            Import Recipe
          </>
        )}
      </Button>
    </div>
  );
}
