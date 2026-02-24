"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MenuItem } from "../types";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RecipeAiChatProps {
  menuItem: MenuItem;
  onUpdateMenuItem: (updated: MenuItem) => void;
}

function getMockResponse(
  userMessage: string,
  item: MenuItem
): { content: string; updatedItem: MenuItem } {
  const msg = userMessage.toLowerCase();

  if (msg.includes("dairy") || msg.includes("vegan") || msg.includes("lactose")) {
    const swaps: Record<string, string> = {
      "Feta": "Cashew Cheese",
      "Milk": "Oat Milk",
      "Cheese": "Nutritional Yeast",
      "Butter": "Olive Oil",
      "Cream": "Coconut Cream",
      "Yogurt": "Coconut Yogurt",
    };
    const swapped: string[] = [];
    const newIngredients = item.ingredients.map((ing) => {
      for (const [from, to] of Object.entries(swaps)) {
        if (ing.name.toLowerCase().includes(from.toLowerCase())) {
          swapped.push(`${ing.name} → ${to}`);
          return { ...ing, name: to };
        }
      }
      return ing;
    });
    const desc =
      swapped.length > 0
        ? `Done! I swapped ${swapped.join(", ")} to make it dairy-free. The flavor profile stays close to the original.`
        : `This recipe is already dairy-free! No changes needed.`;
    return {
      content: desc,
      updatedItem: { ...item, ingredients: newIngredients },
    };
  }

  if (msg.includes("protein") || msg.includes("gains") || msg.includes("muscle")) {
    const bump = Math.round(item.macros.protein * 0.4);
    return {
      content: `Boosted protein by ${bump}g — added extra lean protein to the recipe. New total: ${item.macros.protein + bump}g protein per serving.`,
      updatedItem: {
        ...item,
        macros: {
          ...item.macros,
          protein: item.macros.protein + bump,
          calories: item.macros.calories + bump * 4,
        },
      },
    };
  }

  if (msg.includes("quick") || msg.includes("fast") || msg.includes("less time") || msg.includes("faster")) {
    const newTime = Math.max(10, Math.round(item.time * 0.6));
    return {
      content: `Streamlined the recipe to ${newTime} minutes! Simplified the prep steps and switched to quicker cooking methods.`,
      updatedItem: { ...item, time: newTime },
    };
  }

  if (msg.includes("low carb") || msg.includes("keto") || msg.includes("fewer carbs")) {
    const reduction = Math.round(item.macros.carbs * 0.5);
    return {
      content: `Cut carbs by ${reduction}g. Swapped starchy ingredients for low-carb alternatives. New total: ${item.macros.carbs - reduction}g carbs.`,
      updatedItem: {
        ...item,
        macros: {
          ...item.macros,
          carbs: item.macros.carbs - reduction,
          calories: item.macros.calories - reduction * 4,
        },
      },
    };
  }

  return {
    content: `Great idea! I've tweaked the recipe based on your suggestion. The updated details are reflected on the left.`,
    updatedItem: item,
  };
}

export function RecipeAiChat({ menuItem, onUpdateMenuItem }: RecipeAiChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: `Ask me anything about ${menuItem.name}! I can adjust ingredients, macros, cooking time, or dietary preferences.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentItemRef = useRef(menuItem);

  useEffect(() => {
    currentItemRef.current = menuItem;
  }, [menuItem]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsTyping(true);

    const delay = 800 + Math.random() * 700;
    setTimeout(() => {
      const { content, updatedItem } = getMockResponse(text, currentItemRef.current);
      setMessages((prev) => [...prev, { role: "assistant", content }]);
      setIsTyping(false);
      onUpdateMenuItem(updatedItem);
    }, delay);
  }, [input, isTyping, onUpdateMenuItem]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center gap-1.5">
        <Sparkles className="size-3.5 text-orange" />
        <span className="text-xs font-medium text-orange">AI Assistant</span>
      </div>

      <ScrollArea className="flex-1 pr-2">
        <div ref={scrollRef} className="space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-orange text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce [animation-delay:0.1s]">.</span>
                  <span className="animate-bounce [animation-delay:0.2s]">.</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="mt-2 flex gap-1.5">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Make it dairy-free..."
          className="h-8 text-xs"
          disabled={isTyping}
        />
        <Button
          size="icon"
          className="size-8 shrink-0 bg-orange hover:bg-orange/90"
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
        >
          <Send className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
