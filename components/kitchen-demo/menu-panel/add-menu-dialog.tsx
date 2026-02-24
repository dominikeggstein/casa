"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Link, PenLine } from "lucide-react";
import type { MenuItem } from "../types";
import { AddMenuAiTab } from "./add-menu-ai-tab";
import { AddMenuUrlTab } from "./add-menu-url-tab";
import { AddMenuScratchTab } from "./add-menu-scratch-tab";

interface AddMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (item: MenuItem) => void;
}

export function AddMenuDialog({ open, onOpenChange, onAdd }: AddMenuDialogProps) {
  function handleAdd(item: MenuItem) {
    onAdd(item);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Recipe</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="ai" className="mt-2">
          <TabsList className="w-full">
            <TabsTrigger value="ai" className="flex-1 gap-1.5">
              <Sparkles className="size-3.5" />
              AI Generate
            </TabsTrigger>
            <TabsTrigger value="url" className="flex-1 gap-1.5">
              <Link className="size-3.5" />
              From URL
            </TabsTrigger>
            <TabsTrigger value="scratch" className="flex-1 gap-1.5">
              <PenLine className="size-3.5" />
              Scratch
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ai" className="mt-4">
            <AddMenuAiTab onAdd={handleAdd} />
          </TabsContent>
          <TabsContent value="url" className="mt-4">
            <AddMenuUrlTab onAdd={handleAdd} />
          </TabsContent>
          <TabsContent value="scratch" className="mt-4">
            <AddMenuScratchTab onAdd={handleAdd} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
