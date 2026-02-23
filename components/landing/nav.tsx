"use client";

import { Button } from "@/components/ui/button";

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="text-xl font-bold tracking-tight text-foreground">
          Casa
        </a>
        <Button
          size="sm"
          className="rounded-full bg-orange text-white hover:bg-orange-light"
          onClick={() =>
            document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Get Early Access
        </Button>
      </div>
    </nav>
  );
}
