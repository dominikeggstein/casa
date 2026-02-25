"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointer2,
  Search,
  CalendarDays,
  Film,
  ChefHat,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Cursor = ({ active }: { active: boolean }) => (
  <motion.div
    className="relative z-50 flex items-center justify-center text-white drop-shadow-md"
    animate={{ scale: active ? 0.9 : 1 }}
    transition={{ duration: 0.15 }}
  >
    <MousePointer2 className="size-6 fill-black text-white" />
    {active && (
      <motion.div
        className="absolute -inset-2 rounded-full border-2 border-chart-5/50"
        initial={{ opacity: 1, scale: 0.5 }}
        animate={{ opacity: 0, scale: 1.5 }}
        transition={{ duration: 0.4 }}
      />
    )}
  </motion.div>
);

const movies = [
  { title: "The Grand Hotel Budapest", short: "Grand Hotel Budapest" },
  { title: "Midnight in Paris", short: "Midnight in Paris" },
  { title: "Spirited Forest", short: "Spirited Forest" },
];

export function AnimatedEntertainmentFeatures() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const timings = [
      1000, // 0->1: initial pause
      800,  // 1->2: move to card
      600,  // 2->3: grab
      600,  // 3->4: drag to calendar
      300,  // 4->5: drop settled
      800,  // 5->6: click opens modal
      800,  // 6->7: move to AI button
      600,  // 7->8: click AI
      1200, // 8->9: AI thinking
      800,  // 9->10: click add
      600,  // 10->11: toast, modal closes, calendar updates
      800,  // 11->12: show completion badge
      2000, // 12->0: hold, then loop
    ];

    if (step < 12) {
      timeout = setTimeout(() => setStep((s) => s + 1), timings[step]);
    } else {
      timeout = setTimeout(() => setStep(0), timings[12]);
    }

    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-xl sm:aspect-video lg:p-6 pb-2">
      <div className="relative h-full w-full">
        {/* Main UI */}
        <motion.div
          className="flex h-full gap-4"
          animate={{ opacity: step >= 6 && step < 11 ? 0.3 : 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Sidebar: Movie Library */}
          <div className="hidden w-48 shrink-0 flex-col gap-3 rounded-xl border border-border/50 bg-charcoal/40 p-3 sm:flex">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Library</span>
              <Search className="size-3.5 text-muted-foreground" />
            </div>

            <div className="flex flex-col gap-2">
              {movies.map((movie, i) => (
                <motion.div
                  key={movie.title}
                  className={cn(
                    "relative rounded-lg border border-border/50 bg-background p-2",
                    i === 0 && step >= 2 && step < 4 && "opacity-0",
                    i > 0 && "opacity-60"
                  )}
                >
                  <div className={cn("h-12 rounded mb-1.5", i === 0 ? "bg-muted/30" : "bg-muted/20")} />
                  <div className="h-2.5 w-3/4 rounded bg-muted" />
                  {i === 0 && <div className="mt-1 h-2 w-1/2 rounded bg-muted/60" />}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Weekend Calendar Grid */}
          <div className="flex-1 rounded-xl border border-border/50 bg-charcoal/40 p-3">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-chart-5" />
                <span className="text-sm font-medium">Weekend</span>
              </div>
            </div>

            <div className="grid h-[calc(100%-2rem)] grid-cols-3 gap-2">
              {["Fri", "Sat", "Sun"].map((day, colIdx) => (
                <div
                  key={day}
                  className="flex flex-col gap-1.5 rounded-lg border border-border/30 bg-background/30 p-2"
                >
                  <span className="text-center text-xs font-medium text-muted-foreground">
                    {day}
                  </span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    {/* Morning slot */}
                    <div className="flex-1 rounded border border-dashed border-border/50 bg-background/20 p-1">
                      <span className="text-[9px] text-muted-foreground/50">Morning</span>
                    </div>
                    {/* Evening slot */}
                    <div
                      className={cn(
                        "flex-1 rounded border border-dashed bg-background/20 p-1 relative",
                        colIdx === 0 && step === 3
                          ? "border-chart-5 bg-chart-5/10"
                          : "border-border/50"
                      )}
                    >
                      <span className="text-[9px] text-muted-foreground/50">Evening</span>

                      {/* Dropped chips on Friday Evening */}
                      {colIdx === 0 && (
                        <AnimatePresence>
                          {step >= 4 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: step === 5 ? 0.95 : 1 }}
                              className="absolute inset-0 m-0.5 flex flex-col gap-0.5 overflow-hidden"
                            >
                              {/* Movie chip */}
                              <div
                                className={cn(
                                  "flex items-center gap-1 rounded bg-chart-5/15 border border-chart-5/30 px-1.5 py-0.5",
                                  step >= 11 ? "flex-1" : "flex-1"
                                )}
                              >
                                <Film className="size-2.5 shrink-0 text-chart-5" />
                                <span className="truncate text-[8px] font-medium text-chart-5">
                                  Grand Hotel Budapest
                                </span>
                                <span className="ml-auto text-[7px] text-chart-5/70 hidden lg:inline">
                                  7 PM
                                </span>
                              </div>

                              {/* Snack chip (cross-module, appears step 11+) */}
                              {step >= 11 && (
                                <motion.div
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="flex items-center gap-1 rounded bg-orange/15 border border-orange/30 px-1.5 py-0.5 flex-1"
                                >
                                  <ChefHat className="size-2.5 shrink-0 text-orange" />
                                  <span className="truncate text-[8px] font-medium text-orange">
                                    Movie Snacks
                                  </span>
                                  <span className="ml-auto text-[7px] text-orange/70 hidden lg:inline">
                                    6:30 PM
                                  </span>
                                </motion.div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Modal Overlay (steps 6-10) */}
        <AnimatePresence>
          {step >= 6 && step < 11 && (
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
                <div className="border-b border-border/50 bg-charcoal/40 p-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Film className="size-4 text-chart-5" />
                    The Grand Hotel Budapest
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Comedy, Drama &bull; 1h 40m
                  </p>
                </div>

                {/* Modal Body */}
                <div className="p-4 flex flex-col gap-4">
                  {/* Who's watching */}
                  <div className="space-y-1.5">
                    <span className="text-xs text-muted-foreground">Who&apos;s watching?</span>
                    <div className="flex gap-2">
                      {[
                        { letter: "D", bg: "bg-chart-5/30 text-chart-5" },
                        { letter: "L", bg: "bg-blue-500/30 text-blue-400" },
                        { letter: "M", bg: "bg-emerald-500/30 text-emerald-400" },
                      ].map((a) => (
                        <div
                          key={a.letter}
                          className={cn(
                            "flex size-7 items-center justify-center rounded-full text-xs font-semibold",
                            a.bg
                          )}
                        >
                          {a.letter}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Section */}
                  <div className="rounded-lg border border-border/50 bg-background/50 p-3 flex flex-col gap-3">
                    <div className="flex items-start gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chart-5/20 text-chart-5">
                        <Sparkles className="size-3" />
                      </div>
                      <div className="flex-1 rounded-lg rounded-tl-none bg-charcoal p-2 text-xs text-muted-foreground">
                        Need snack ideas for movie night?
                      </div>
                    </div>

                    {/* AI button / response */}
                    {step === 7 && (
                      <motion.button
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="self-end rounded-md bg-chart-5 px-3 py-1.5 text-xs font-medium text-white shadow-sm flex items-center gap-1.5"
                      >
                        <Sparkles className="size-3" />
                        Suggest snacks
                      </motion.button>
                    )}

                    {/* Loading shimmer */}
                    {step === 8 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ml-8 flex gap-1"
                      >
                        {[0, 1, 2].map((d) => (
                          <motion.div
                            key={d}
                            className="size-1.5 rounded-full bg-chart-5/60"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: d * 0.2,
                            }}
                          />
                        ))}
                      </motion.div>
                    )}

                    {/* AI response */}
                    {step >= 9 && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-chart-5/20 text-chart-5">
                          <Sparkles className="size-3" />
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                          <div className="rounded-lg rounded-tl-none bg-charcoal p-2 text-xs text-foreground">
                            Try popcorn with truffle salt + sparkling cider
                          </div>
                          {step >= 9 && (
                            <motion.button
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{
                                opacity: 1,
                                scale: step === 10 ? 0.95 : 1,
                              }}
                              className="self-start rounded-full bg-chart-5/15 text-chart-5 border border-chart-5/30 px-3 py-1 text-[10px] font-medium flex items-center gap-1"
                            >
                              <ChefHat className="size-3" />
                              Add to Friday dinner
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Toast notification at step 10 */}
                  <AnimatePresence>
                    {step === 10 && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="rounded-md bg-chart-5/15 border border-chart-5/30 px-3 py-2 text-xs text-chart-5 flex items-center gap-2"
                      >
                        <CheckCircle2 className="size-3.5" />
                        Snack added to Friday
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-border/50 bg-charcoal/40 p-3 flex justify-end">
                  <button className="rounded-md bg-chart-5 px-4 py-1.5 text-xs font-medium text-white shadow-sm flex items-center gap-1.5 opacity-90">
                    <CalendarDays className="size-3" />
                    Plan Another Night
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion Badge (step 12) */}
        <AnimatePresence>
          {step >= 12 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-chart-5/20 text-chart-5 px-4 py-1.5 text-xs font-medium border border-chart-5/30 flex items-center gap-1.5"
            >
              <CheckCircle2 className="size-3.5" />
              Movie night planned
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
              step === 1 ? "10%" :
              step === 2 ? "10%" :
              step === 3 ? "35%" :
              step === 4 ? "35%" :
              step === 5 ? "35%" :
              step === 6 ? "50%" :
              step === 7 ? "62%" :
              step === 8 ? "62%" :
              step === 9 ? "50%" :
              step === 10 ? "45%" :
              step === 11 ? "35%" :
              "150%",
            y:
              step === 0 ? "100%" :
              step === 1 ? "35%" :
              step === 2 ? "35%" :
              step === 3 ? "65%" :
              step === 4 ? "65%" :
              step === 5 ? "65%" :
              step === 6 ? "50%" :
              step === 7 ? "72%" :
              step === 8 ? "72%" :
              step === 9 ? "72%" :
              step === 10 ? "78%" :
              step === 11 ? "65%" :
              "150%",
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 150,
            mass: 0.5,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Cursor active={step === 2 || step === 5 || step === 8 || step === 10} />

          {/* Dragged card ghost (steps 2-3) */}
          <AnimatePresence>
            {step >= 2 && step < 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.8, scale: 0.9 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute left-6 top-6 w-36 rounded-lg border-2 border-chart-5 bg-card p-2 shadow-2xl pointer-events-none"
              >
                <div className="h-10 rounded bg-muted/30 mb-1.5" />
                <div className="h-2.5 w-3/4 rounded bg-muted" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
