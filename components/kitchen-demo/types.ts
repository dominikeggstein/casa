export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MenuItem {
  id: string;
  image: string;
  name: string;
  time: number; // minutes
  servings: number;
  macros: Macros;
  ingredients: Ingredient[];
  tags: string[];
}

export interface Person {
  id: string;
  name: string;
  color: string;
  dailyCalorieTarget: number;
}

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface PlacedMeal {
  id: string;
  menuItemId: string;
  date: string; // YYYY-MM-DD
  mealType: MealType;
  assignedPersonIds: string[];
  personServings: Record<string, number>; // personId → servings (default 1)
}

export type CalendarView = "day" | "3day" | "week";

export interface DemoState {
  menuItems: MenuItem[];
  placedMeals: PlacedMeal[];
  people: Person[];
  calendarView: CalendarView;
  currentDate: string; // YYYY-MM-DD (start of visible range)
  showMacros: boolean;
  activePanel: "menu" | "calendar";
  selectedMenuItemId: string | null; // for tap-to-place on mobile
}

export type DemoAction =
  | { type: "DROP_MEAL"; menuItemId: string; date: string; mealType: MealType }
  | { type: "REMOVE_MEAL"; placedMealId: string }
  | { type: "MOVE_MEAL"; placedMealId: string; date: string; mealType: MealType }
  | { type: "ADD_MENU_ITEM"; item: MenuItem }
  | { type: "ADD_PERSON"; person: Person }
  | { type: "REMOVE_PERSON"; personId: string }
  | { type: "UPDATE_PERSON"; personId: string; updates: Partial<Pick<Person, "name" | "dailyCalorieTarget" | "color">> }
  | { type: "ASSIGN_PERSON"; placedMealId: string; personId: string }
  | { type: "UNASSIGN_PERSON"; placedMealId: string; personId: string }
  | { type: "UPDATE_PLACED_MEAL_SERVINGS"; placedMealId: string; personId: string; servings: number }
  | { type: "SET_CALENDAR_VIEW"; view: CalendarView }
  | { type: "NAVIGATE_CALENDAR"; direction: "prev" | "next" | "today" }
  | { type: "TOGGLE_MACROS" }
  | { type: "SET_ACTIVE_PANEL"; panel: "menu" | "calendar" }
  | { type: "SELECT_MENU_ITEM"; menuItemId: string | null }
  | { type: "UPDATE_MENU_ITEM"; item: MenuItem };
