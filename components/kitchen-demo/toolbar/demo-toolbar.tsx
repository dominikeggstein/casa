"use client";

import { BarChart3, ShoppingCart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DemoToolbarProps {
  onOpenShopping: () => void;
  onToggleMacros: () => void;
  onOpenPeople: () => void;
  showMacros: boolean;
}

export function DemoToolbar({
  onOpenShopping,
  onToggleMacros,
  onOpenPeople,
  showMacros,
}: DemoToolbarProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-charcoal-lighter p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" onClick={onOpenShopping} aria-label="Shopping List">
            <ShoppingCart className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Shopping List</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleMacros}
            className={cn(showMacros && "bg-orange/20 text-orange")}
            aria-label="Macros"
          >
            <BarChart3 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Macros</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm" onClick={onOpenPeople} aria-label="People">
            <Users className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>People</TooltipContent>
      </Tooltip>
    </div>
  );
}
