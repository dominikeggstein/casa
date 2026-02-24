"use client";

import { useReducer, useState, useCallback } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { DemoAction, DemoState, MealType, MenuItem } from "./types";
import { DEFAULT_MENU_ITEMS, DEFAULT_PEOPLE, getInitialPlacedMeals } from "./data";
import {
  genId,
  getMonday,
  getToday,
  getVisibleDates,
  navigateDate,
} from "./utils";
import { MenuPanel } from "./menu-panel/menu-panel";
import { CalendarPanel } from "./calendar-panel/calendar-panel";
import { DemoToolbar } from "./toolbar/demo-toolbar";
import { ShoppingListSheet } from "./toolbar/shopping-list-sheet";
import { MacrosOverlay } from "./toolbar/macros-overlay";
import { PeopleManagerSheet } from "./toolbar/people-manager-sheet";

function getInitialState(): DemoState {
  const today = getToday();
  const monday = getMonday(today);
  return {
    menuItems: DEFAULT_MENU_ITEMS,
    placedMeals: getInitialPlacedMeals(today),
    people: DEFAULT_PEOPLE,
    calendarView: "week",
    currentDate: monday,
    showMacros: false,
    activePanel: "calendar",
    selectedMenuItemId: null,
  };
}

function reducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "DROP_MEAL": {
      const personServings: Record<string, number> = {};
      for (const p of state.people) {
        personServings[p.id] = 1;
      }
      return {
        ...state,
        placedMeals: [
          ...state.placedMeals,
          {
            id: genId("placed"),
            menuItemId: action.menuItemId,
            date: action.date,
            mealType: action.mealType,
            assignedPersonIds: state.people.map((p) => p.id),
            personServings,
          },
        ],
        selectedMenuItemId: null,
      };
    }
    case "REMOVE_MEAL":
      return {
        ...state,
        placedMeals: state.placedMeals.filter((m) => m.id !== action.placedMealId),
      };
    case "MOVE_MEAL":
      return {
        ...state,
        placedMeals: state.placedMeals.map((m) =>
          m.id === action.placedMealId
            ? { ...m, date: action.date, mealType: action.mealType }
            : m
        ),
      };
    case "ADD_MENU_ITEM":
      return { ...state, menuItems: [...state.menuItems, action.item] };
    case "ADD_PERSON":
      return { ...state, people: [...state.people, action.person] };
    case "REMOVE_PERSON": {
      return {
        ...state,
        people: state.people.filter((p) => p.id !== action.personId),
        placedMeals: state.placedMeals.map((m) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [action.personId]: _, ...restServings } = m.personServings;
          return {
            ...m,
            assignedPersonIds: m.assignedPersonIds.filter((id) => id !== action.personId),
            personServings: restServings,
          };
        }),
      };
    }
    case "UPDATE_PERSON":
      return {
        ...state,
        people: state.people.map((p) =>
          p.id === action.personId ? { ...p, ...action.updates } : p
        ),
      };
    case "ASSIGN_PERSON":
      return {
        ...state,
        placedMeals: state.placedMeals.map((m) =>
          m.id === action.placedMealId
            ? {
                ...m,
                assignedPersonIds: [...m.assignedPersonIds, action.personId],
                personServings: { ...m.personServings, [action.personId]: 1 },
              }
            : m
        ),
      };
    case "UNASSIGN_PERSON":
      return {
        ...state,
        placedMeals: state.placedMeals.map((m) => {
          if (m.id !== action.placedMealId) return m;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [action.personId]: _, ...restServings } = m.personServings;
          return {
            ...m,
            assignedPersonIds: m.assignedPersonIds.filter(
              (id) => id !== action.personId
            ),
            personServings: restServings,
          };
        }),
      };
    case "SET_CALENDAR_VIEW": {
      let newDate = state.currentDate;
      if (action.view === "week") {
        newDate = getMonday(state.currentDate);
      }
      return { ...state, calendarView: action.view, currentDate: newDate };
    }
    case "NAVIGATE_CALENDAR":
      return {
        ...state,
        currentDate: navigateDate(
          state.currentDate,
          state.calendarView,
          action.direction
        ),
      };
    case "TOGGLE_MACROS":
      return { ...state, showMacros: !state.showMacros };
    case "SET_ACTIVE_PANEL":
      return { ...state, activePanel: action.panel };
    case "SELECT_MENU_ITEM":
      return { ...state, selectedMenuItemId: action.menuItemId };
    case "UPDATE_MENU_ITEM":
      return {
        ...state,
        menuItems: state.menuItems.map((m) =>
          m.id === action.item.id ? action.item : m
        ),
      };
    case "UPDATE_PLACED_MEAL_SERVINGS":
      return {
        ...state,
        placedMeals: state.placedMeals.map((m) =>
          m.id === action.placedMealId
            ? {
                ...m,
                personServings: {
                  ...m.personServings,
                  [action.personId]: Math.max(0.5, action.servings),
                },
              }
            : m
        ),
      };
    default:
      return state;
  }
}

export function KitchenDemo() {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const [shoppingOpen, setShoppingOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);

  const visibleDates = getVisibleDates(state.currentDate, state.calendarView);

  // DnD handler
  const handleDragEnd = useCallback(
    (event: Parameters<NonNullable<React.ComponentProps<typeof DragDropProvider>["onDragEnd"]>>[0]) => {
      if (event.canceled) return;
      const { source, target } = event.operation;
      if (!source || !target) return;

      const sourceData = source.data as { type?: string; menuItemId?: string; placedMealId?: string } | undefined;
      const targetData = target.data as { date?: string; mealType?: string } | undefined;

      if (!sourceData || !targetData?.date || !targetData?.mealType) return;

      if (sourceData.type === "menu-item" && sourceData.menuItemId) {
        dispatch({
          type: "DROP_MEAL",
          menuItemId: sourceData.menuItemId,
          date: targetData.date,
          mealType: targetData.mealType as MealType,
        });
      } else if (sourceData.type === "placed-meal" && sourceData.placedMealId) {
        dispatch({
          type: "MOVE_MEAL",
          placedMealId: sourceData.placedMealId,
          date: targetData.date,
          mealType: targetData.mealType as MealType,
        });
      }
    },
    []
  );

  // Mobile tap-to-place
  const handleTapPlace = useCallback(
    (date: string, mealType: MealType) => {
      if (!state.selectedMenuItemId) return;
      dispatch({
        type: "DROP_MEAL",
        menuItemId: state.selectedMenuItemId,
        date,
        mealType,
      });
    },
    [state.selectedMenuItemId]
  );

  // Click-to-pick a recipe from a calendar slot
  const handlePickMeal = useCallback(
    (date: string, mealType: MealType, menuItemId: string) => {
      dispatch({
        type: "DROP_MEAL",
        menuItemId,
        date,
        mealType,
      });
    },
    []
  );

  // Update a menu item (e.g. from AI chat)
  const handleUpdateMenuItem = useCallback(
    (item: MenuItem) => {
      dispatch({ type: "UPDATE_MENU_ITEM", item });
    },
    []
  );

  // Update servings for a person on a placed meal
  const handleUpdateServings = useCallback(
    (placedMealId: string, personId: string, servings: number) => {
      dispatch({ type: "UPDATE_PLACED_MEAL_SERVINGS", placedMealId, personId, servings });
    },
    []
  );

  // Person toggle on a placed meal
  const handleTogglePerson = useCallback(
    (mealId: string, personId: string) => {
      const meal = state.placedMeals.find((m) => m.id === mealId);
      if (!meal) return;
      if (meal.assignedPersonIds.includes(personId)) {
        dispatch({ type: "UNASSIGN_PERSON", placedMealId: mealId, personId });
      } else {
        dispatch({ type: "ASSIGN_PERSON", placedMealId: mealId, personId });
      }
    },
    [state.placedMeals]
  );

  return (
    <TooltipProvider>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <div className="flex flex-col">
          {/* Toolbar */}
          <div className="mb-3 flex items-center justify-between">
            {/* Mobile panel switcher — wrapper controls visibility */}
            <div className="md:hidden">
              <div className="flex gap-1 rounded-lg bg-charcoal-lighter p-0.5">
                <button
                  type="button"
                  onClick={() => dispatch({ type: "SET_ACTIVE_PANEL", panel: "menu" })}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    state.activePanel === "menu"
                      ? "bg-orange text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  Menu
                </button>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "SET_ACTIVE_PANEL", panel: "calendar" })}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    state.activePanel === "calendar"
                      ? "bg-orange text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  Calendar
                </button>
              </div>
            </div>
            {/* Spacer for desktop when toggle hidden */}
            <div className="hidden md:block" />
            <DemoToolbar
              onOpenShopping={() => setShoppingOpen(true)}
              onToggleMacros={() => dispatch({ type: "TOGGLE_MACROS" })}
              onOpenPeople={() => setPeopleOpen(true)}
              showMacros={state.showMacros}
            />
          </div>

          {/* Main 2-panel layout */}
          <div className="flex gap-4">
            {/* Menu Panel — mobile: shown only when active; desktop: always shown */}
            <div
              className={cn(
                "w-full shrink-0 md:w-[300px] lg:w-[320px]",
                state.activePanel === "menu" ? "" : "max-md:hidden"
              )}
            >
              <div className="h-[620px] rounded-2xl border border-border bg-card p-4">
                <MenuPanel
                  items={state.menuItems}
                  onAddItem={(item) =>
                    dispatch({ type: "ADD_MENU_ITEM", item })
                  }
                  selectedItemId={state.selectedMenuItemId}
                  onSelectItem={(id) =>
                    dispatch({ type: "SELECT_MENU_ITEM", menuItemId: id })
                  }
                />
              </div>
            </div>

            {/* Calendar Panel — mobile: shown only when active; desktop: always shown */}
            <div
              className={cn(
                "min-w-0 flex-1",
                state.activePanel === "calendar" ? "" : "max-md:hidden"
              )}
            >
              <div className="h-[620px] rounded-2xl border border-border bg-card p-4">
                <CalendarPanel
                  startDate={state.currentDate}
                  view={state.calendarView}
                  placedMeals={state.placedMeals}
                  menuItems={state.menuItems}
                  people={state.people}
                  onViewChange={(view) =>
                    dispatch({ type: "SET_CALENDAR_VIEW", view })
                  }
                  onNavigate={(direction) =>
                    dispatch({ type: "NAVIGATE_CALENDAR", direction })
                  }
                  onRemoveMeal={(id) =>
                    dispatch({ type: "REMOVE_MEAL", placedMealId: id })
                  }
                  onTogglePerson={handleTogglePerson}
                  onUpdateServings={handleUpdateServings}
                  onTapPlace={handleTapPlace}
                  onPickMeal={handlePickMeal}
                  onUpdateMenuItem={handleUpdateMenuItem}
                />
              </div>

              {/* Macros overlay */}
              <AnimatePresence>
                {state.showMacros && (
                  <MacrosOverlay
                    visibleDates={visibleDates}
                    placedMeals={state.placedMeals}
                    menuItems={state.menuItems}
                    people={state.people}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hint */}
          {state.selectedMenuItemId && (
            <p className="mt-2 text-center text-xs text-orange md:hidden">
              Tap a meal slot to place the selected recipe
            </p>
          )}
        </div>

        {/* Sheets */}
        <ShoppingListSheet
          open={shoppingOpen}
          onOpenChange={setShoppingOpen}
          placedMeals={state.placedMeals}
          menuItems={state.menuItems}
        />
        <PeopleManagerSheet
          open={peopleOpen}
          onOpenChange={setPeopleOpen}
          people={state.people}
          onAddPerson={(person) => dispatch({ type: "ADD_PERSON", person })}
          onRemovePerson={(id) => dispatch({ type: "REMOVE_PERSON", personId: id })}
          onUpdatePerson={(id, updates) =>
            dispatch({ type: "UPDATE_PERSON", personId: id, updates })
          }
        />
      </DragDropProvider>
    </TooltipProvider>
  );
}
