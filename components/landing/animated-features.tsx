"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointer2,
  Search,
  MessageSquare,
  CheckCircle2,
  CalendarDays,
  ListTodo,
  ChefHat,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Cursor Component
const Cursor = ({ active }: { active: boolean }) => (
  <motion.div
    className="relative z-50 flex items-center justify-center text-white drop-shadow-md"
    animate={{ scale: active ? 0.9 : 1 }}
    transition={{ duration: 0.15 }}
  >
    <MousePointer2 className="size-6 fill-black text-white" />
    {active && (
      <motion.div
        className="absolute -inset-2 rounded-full border-2 border-orange/50"
        initial={{ opacity: 1, scale: 0.5 }}
        animate={{ opacity: 0, scale: 1.5 }}
        transition={{ duration: 0.4 }}
      />
    )}
  </motion.div>
);

export function AnimatedFeatures() {
  const [step, setStep] = useState(0);

  // Sequences:
  // 0: Initial
  // 1: Move to menu item
  // 2: Drag to calendar
  // 3: Drop in calendar
  // 4: Move to dropped meal
  // 5: Click meal (open modal)
  // 6: Move to calories slider, drag it
  // 7: Move to chat input
  // 8: Type "slightly different recipe..."
  // 9: AI updates meal
  // 10: Move to export button & click
  // 11: Export view (grocery list opens)
  // 12: List ticks off

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const timings = [
      1000, // 0 -> 1: wait 1s
      800,  // 1 -> 2: move to item
      600,  // 2 -> 3: drag to cal
      300,  // 3 -> 4: drop
      800,  // 4 -> 5: move to dropped meal
      600,  // 5 -> 6: click meal & open modal
      1000, // 6 -> 7: slide calories
      800,  // 7 -> 8: move to chat
      1500, // 8 -> 9: type text
      800,  // 9 -> 10: AI updates
      800,  // 10 -> 11: click export
      800,  // 11 -> 12: show export view
      2000, // 12 -> 13 (reset): ticks finish, wait, then repeat from 0
    ];

    if (step < 12) {
      timeout = setTimeout(() => setStep(s => s + 1), timings[step]);
    } else {
      timeout = setTimeout(() => setStep(0), timings[12]);
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-xl sm:aspect-video lg:p-6 pb-2">
      {/* Container to scale down nicely on smaller screens if needed */}
      <div className="relative h-full w-full">
        
        {/* Main UI Container */}
        <motion.div 
          className="flex h-full gap-4"
          animate={{
            x: step >= 11 ? -80 : 0,
            opacity: step >= 11 ? 0.3 : 1
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Sidebar Menu */}
          <div className="hidden w-48 shrink-0 flex-col gap-3 rounded-xl border border-border/50 bg-charcoal/40 p-3 sm:flex">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Menu</span>
              <Search className="size-3.5 text-muted-foreground" />
            </div>
            
            <div className="flex flex-col gap-2">
              <motion.div 
                className={cn(
                  "relative rounded-lg border border-border/50 bg-background p-2",
                  step >= 2 && step < 3 && "opacity-0" // hidden while dragging
                )}
              >
                <div className="h-16 rounded bg-muted/30 mb-2"></div>
                <div className="h-3 w-3/4 rounded bg-muted"></div>
                <div className="mt-1 h-2 w-1/2 rounded bg-muted/60"></div>
              </motion.div>
              <div className="rounded-lg border border-border/50 bg-background/50 p-2 opacity-60">
                <div className="h-16 rounded bg-muted/20 mb-2"></div>
                <div className="h-3 w-2/3 rounded bg-muted/50"></div>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 rounded-xl border border-border/50 bg-charcoal/40 p-3">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-orange" />
                <span className="text-sm font-medium">This Week</span>
              </div>
            </div>
            
            <div className="grid h-[calc(100%-2rem)] grid-cols-3 gap-2">
              {["Mon", "Tue", "Wed"].map((day, i) => (
                <div key={day} className="flex flex-col gap-2 rounded-lg border border-border/30 bg-background/30 p-2">
                  <span className="text-center text-xs font-medium text-muted-foreground">{day}</span>
                  <div className="flex flex-1 flex-col gap-2 relative">
                    {/* Meal Slots */}
                    <div className="flex-1 rounded border border-dashed border-border/50 bg-background/20 relative">
                      {/* Dropped Meal (Monday Dinner equivalent) */}
                      {i === 0 && (
                        <AnimatePresence>
                          {step >= 3 && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ 
                                opacity: 1, 
                                scale: step === 5 ? 0.95 : 1, // pressing effect
                                borderColor: step >= 9 ? "rgba(232, 115, 74, 0.5)" : "rgba(74, 72, 67, 0.5)"
                              }}
                              className={cn(
                                "absolute inset-0 m-1 rounded bg-card border p-2 flex flex-col justify-between overflow-hidden cursor-pointer",
                                step >= 9 ? "border-orange/50 bg-orange/5" : "border-border"
                              )}
                            >
                              <div>
                                <div className={cn("h-2 w-3/4 rounded mb-1", step >= 9 ? "bg-orange" : "bg-muted")}></div>
                                <div className="h-1.5 w-1/2 rounded bg-muted/60"></div>
                              </div>
                              <div className="flex items-center gap-1 mt-auto">
                                <Flame className="size-3 text-orange opacity-80" />
                                <span className="text-[10px] text-muted-foreground">
                                  {step >= 9 ? "550" : "450"} kcal
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                    <div className="flex-1 rounded border border-dashed border-border/50 bg-background/20"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {step >= 5 && step < 11 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-md rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
              >
                {/* Modal Header */}
                <div className="border-b border-border/50 bg-charcoal/40 p-4 relative overflow-hidden">
                  <motion.div 
                    animate={{ backgroundColor: step >= 9 ? "rgba(232, 115, 74, 0.1)" : "transparent" }}
                    className="absolute inset-0 transition-colors duration-1000"
                  />
                  <div className="relative">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <ChefHat className="size-4 text-orange" />
                      {step >= 9 ? "Spicy Lemon Chicken" : "Lemon Herb Chicken"}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">High protein, low carb dinner</p>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-4 flex flex-col gap-4">
                  {/* Calories Slider Section */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Calories needed</span>
                      <span className="font-medium text-orange">
                        {step < 7 ? "450" : "550"} kcal
                      </span>
                    </div>
                    <div className="relative h-2 w-full rounded-full bg-background overflow-hidden relative">
                      <motion.div 
                        className="absolute left-0 top-0 bottom-0 bg-orange"
                        initial={{ width: "40%" }}
                        animate={{ width: step >= 7 ? "60%" : "40%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                      <motion.div 
                        className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-orange bg-white shadow"
                        initial={{ left: "40%", x: "-50%" }}
                        animate={{ left: step >= 7 ? "60%" : "40%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  {/* AI Chat Section */}
                  <div className="mt-2 rounded-lg border border-border/50 bg-background/50 p-3 flex flex-col gap-3">
                    <div className="flex items-start gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange/20 text-orange">
                        <MessageSquare className="size-3" />
                      </div>
                      <div className="flex-1 rounded-lg rounded-tl-none bg-charcoal p-2 text-xs text-muted-foreground">
                        How can I adjust this recipe for you?
                      </div>
                    </div>
                    
                    {/* User typing simulation */}
                    <div className="relative flex items-center px-1">
                      <div className="h-8 w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground flex items-center">
                        <span className="text-muted-foreground opacity-50">
                          {step < 8 ? "Type your request..." : ""}
                        </span>
                        {step >= 8 && (
                          <motion.span
                            initial={{ clipPath: "inset(0 100% 0 0)" }}
                            animate={{ clipPath: "inset(0 0% 0 0)" }}
                            transition={{ duration: 1.2, ease: "linear" }}
                            className="text-foreground"
                          >
                            Make it a bit spicier!
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-border/50 bg-charcoal/40 p-3 flex justify-end">
                  <button className="rounded-md bg-orange px-4 py-1.5 text-xs font-medium text-white shadow-sm flex items-center gap-1.5 opacity-90">
                    <ListTodo className="size-3" />
                    Export List
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Export / Tab Slide-in View (Grocery List) */}
        <AnimatePresence>
          {step >= 11 && (
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 z-10 w-[60%] sm:w-[50%] p-3"
            >
              <div className="h-full w-full rounded-xl border border-border bg-card shadow-2xl p-4 flex flex-col">
                <div className="flex items-center gap-2 border-b border-border/50 pb-3 mb-3 text-orange">
                  <ListTodo className="size-5" />
                  <h3 className="font-semibold text-foreground">Grocery List</h3>
                </div>
                
                <div className="flex-1 overflow-hidden flex flex-col gap-2 relative">
                  {[
                    "Chicken Breast (500g)",
                    "Lemons (2)",
                    "Chili Flakes (Spicy)",
                    "Fresh Herbs",
                    "Olive Oil"
                  ].map((item, i) => (
                    <motion.div 
                      key={item}
                      className="flex items-center gap-3 rounded p-2 text-sm bg-background/50 border border-border/30"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <motion.div
                        animate={{
                          color: step >= 12 && i < 3 ? "var(--color-orange)" : "var(--color-muted-foreground)"
                        }}
                      >
                        <CheckCircle2 className={cn("size-4", step >= 12 && i < 3 ? "" : "opacity-30")} />
                      </motion.div>
                      <span className={cn(
                        "transition-all duration-300",
                        step >= 12 && i < 3 ? "text-muted-foreground line-through opacity-50" : "text-foreground"
                      )}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                  
                  {step >= 12 && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-orange/20 text-orange px-3 py-1 text-xs font-medium border border-orange/30 flex items-center gap-1"
                    >
                      <CheckCircle2 className="size-3" />
                      Ready to shop
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Cursor */}
        <motion.div
          className="absolute top-0 left-0 z-50 pointer-events-none"
          initial={false}
          animate={{
            x: 
              step === 0 ? "50%" :
              step === 1 ? "10%" : // move to menu item
              step === 2 ? "10%" : // grab menu item
              step === 3 ? "40%" : // drag to cal
              step === 4 ? "40%" : // dropped
              step === 5 ? "40%" : // click item
              step === 6 ? "50%" : // move to slider (modal center)
              step === 7 ? "65%" : // drag slider
              step === 8 ? "50%" : // move to chat input
              step === 9 ? "50%" : // typing
              step === 10 ? "70%" : // move to export button
              step === 11 ? "70%" : // clicked export
              "150%", // moves offscreen or to list
            y:
              step === 0 ? "100%" :
              step === 1 ? "40%" : // on menu item
              step === 2 ? "40%" : // grab menu item
              step === 3 ? "40%" : // drop in cal
              step === 4 ? "40%" : // dropped
              step === 5 ? "40%" : // click item
              step === 6 ? "45%" : // on slider
              step === 7 ? "45%" : // dragging slider
              step === 8 ? "70%" : // on chat input
              step === 9 ? "70%" : // typing
              step === 10 ? "85%" : // on export button
              step === 11 ? "85%" : // clicked export
              "150%" // offscreen
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 150,
            mass: 0.5
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Cursor active={step === 2 || step === 5 || step === 7 || step === 10} />
          
          {/* Dragged item following cursor */}
          <AnimatePresence>
            {step >= 2 && step < 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.8, scale: 0.9 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute left-6 top-6 w-40 rounded-lg border-2 border-orange bg-card p-2 shadow-2xl pointer-events-none"
              >
                <div className="h-16 rounded bg-muted/30 mb-2"></div>
                <div className="h-3 w-3/4 rounded bg-muted"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
