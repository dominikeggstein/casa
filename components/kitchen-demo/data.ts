import type { MenuItem, Person, PlacedMeal } from "./types";

export const MEAL_TYPE_LABELS = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
} as const;

export const MEAL_TYPE_ORDER = ["breakfast", "lunch", "dinner", "snack"] as const;

export const PERSON_COLORS = [
  "#E8734A", // orange
  "#5BA37C", // green
  "#4A90D9", // blue
  "#D4A843", // gold
  "#9B6DC6", // purple
  "#E05A8A", // pink
] as const;

export const DEFAULT_MENU_ITEMS: MenuItem[] = [
  {
    id: "menu-1",
    image: "/images/food/1_avocado_toast.png",
    name: "Avocado Toast",
    time: 10,
    servings: 2,
    macros: { calories: 320, protein: 12, carbs: 28, fat: 18 },
    ingredients: [
      { name: "Sourdough bread", amount: 2, unit: "slices" },
      { name: "Avocado", amount: 1, unit: "" },
      { name: "Cherry tomatoes", amount: 100, unit: "g" },
      { name: "Lemon juice", amount: 1, unit: "tbsp" },
      { name: "Red pepper flakes", amount: 0.5, unit: "tsp" },
    ],
    tags: ["quick", "vegetarian"],
  },
  {
    id: "menu-2",
    image: "/images/food/2_chicken_tikka_masala.png",
    name: "Chicken Tikka Masala",
    time: 35,
    servings: 4,
    macros: { calories: 520, protein: 38, carbs: 42, fat: 22 },
    ingredients: [
      { name: "Chicken breast", amount: 500, unit: "g" },
      { name: "Plain yogurt", amount: 200, unit: "g" },
      { name: "Crushed tomatoes", amount: 400, unit: "g" },
      { name: "Tikka masala paste", amount: 2, unit: "tbsp" },
      { name: "Coconut cream", amount: 150, unit: "ml" },
      { name: "Basmati rice", amount: 300, unit: "g" },
      { name: "Garlic cloves", amount: 3, unit: "" },
      { name: "Yellow onion", amount: 1, unit: "" },
    ],
    tags: ["protein", "comfort"],
  },
  {
    id: "menu-3",
    image: "/images/food/3_greek_salad.png",
    name: "Greek Salad",
    time: 15,
    servings: 2,
    macros: { calories: 280, protein: 10, carbs: 14, fat: 22 },
    ingredients: [
      { name: "Cucumber", amount: 1, unit: "" },
      { name: "Tomatoes", amount: 3, unit: "" },
      { name: "Red onion", amount: 0.5, unit: "" },
      { name: "Feta cheese", amount: 150, unit: "g" },
      { name: "Kalamata olives", amount: 80, unit: "g" },
      { name: "Olive oil", amount: 3, unit: "tbsp" },
    ],
    tags: ["quick", "vegetarian"],
  },
  {
    id: "menu-4",
    image: "/images/food/4_salmon_poke_bowl.png",
    name: "Salmon Poke Bowl",
    time: 20,
    servings: 2,
    macros: { calories: 480, protein: 32, carbs: 52, fat: 16 },
    ingredients: [
      { name: "Sushi-grade salmon", amount: 300, unit: "g" },
      { name: "Sushi rice", amount: 200, unit: "g" },
      { name: "Soy sauce", amount: 3, unit: "tbsp" },
      { name: "Sesame oil", amount: 1, unit: "tbsp" },
      { name: "Avocado", amount: 1, unit: "" },
      { name: "Edamame", amount: 100, unit: "g" },
      { name: "Nori sheets", amount: 2, unit: "" },
    ],
    tags: ["protein", "fresh"],
  },
  {
    id: "menu-5",
    image: "/images/food/5_blueberry_pancakes.png",
    name: "Blueberry Pancakes",
    time: 20,
    servings: 3,
    macros: { calories: 380, protein: 10, carbs: 52, fat: 14 },
    ingredients: [
      { name: "All-purpose flour", amount: 200, unit: "g" },
      { name: "Blueberries", amount: 150, unit: "g" },
      { name: "Eggs", amount: 2, unit: "" },
      { name: "Milk", amount: 250, unit: "ml" },
      { name: "Butter", amount: 30, unit: "g" },
      { name: "Maple syrup", amount: 3, unit: "tbsp" },
    ],
    tags: ["breakfast", "sweet"],
  },
  {
    id: "menu-6",
    image: "/images/food/6_pasta_carbonara.png",
    name: "Pasta Carbonara",
    time: 25,
    servings: 4,
    macros: { calories: 580, protein: 24, carbs: 62, fat: 26 },
    ingredients: [
      { name: "Spaghetti", amount: 400, unit: "g" },
      { name: "Guanciale", amount: 200, unit: "g" },
      { name: "Eggs", amount: 4, unit: "" },
      { name: "Pecorino Romano", amount: 100, unit: "g" },
      { name: "Black pepper", amount: 2, unit: "tsp" },
    ],
    tags: ["comfort", "italian"],
  },
  {
    id: "menu-7",
    image: "/images/food/7_turkey_club_wrap.png",
    name: "Turkey Club Wrap",
    time: 10,
    servings: 1,
    macros: { calories: 420, protein: 30, carbs: 36, fat: 18 },
    ingredients: [
      { name: "Flour tortilla", amount: 1, unit: "" },
      { name: "Sliced turkey", amount: 120, unit: "g" },
      { name: "Bacon", amount: 2, unit: "strips" },
      { name: "Lettuce", amount: 30, unit: "g" },
      { name: "Tomato", amount: 1, unit: "" },
      { name: "Mayo", amount: 1, unit: "tbsp" },
    ],
    tags: ["quick", "protein"],
  },
  {
    id: "menu-8",
    image: "/images/food/8_lentil_soup.png",
    name: "Lentil Soup",
    time: 40,
    servings: 6,
    macros: { calories: 310, protein: 18, carbs: 44, fat: 8 },
    ingredients: [
      { name: "Red lentils", amount: 300, unit: "g" },
      { name: "Carrots", amount: 2, unit: "" },
      { name: "Celery stalks", amount: 2, unit: "" },
      { name: "Yellow onion", amount: 1, unit: "" },
      { name: "Vegetable broth", amount: 1, unit: "L" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Olive oil", amount: 2, unit: "tbsp" },
    ],
    tags: ["vegetarian", "meal-prep"],
  },
  {
    id: "menu-9",
    image: "/images/food/9_protein_energy_bites.png",
    name: "Protein Energy Bites",
    time: 15,
    servings: 12,
    macros: { calories: 140, protein: 6, carbs: 16, fat: 7 },
    ingredients: [
      { name: "Rolled oats", amount: 200, unit: "g" },
      { name: "Peanut butter", amount: 120, unit: "g" },
      { name: "Honey", amount: 60, unit: "ml" },
      { name: "Dark chocolate chips", amount: 60, unit: "g" },
      { name: "Protein powder", amount: 30, unit: "g" },
    ],
    tags: ["snack", "meal-prep"],
  },
  {
    id: "menu-10",
    image: "/images/food/10_falafel_bowl.png",
    name: "Falafel Bowl",
    time: 30,
    servings: 3,
    macros: { calories: 460, protein: 16, carbs: 54, fat: 20 },
    ingredients: [
      { name: "Chickpeas (canned)", amount: 400, unit: "g" },
      { name: "Fresh parsley", amount: 30, unit: "g" },
      { name: "Garlic cloves", amount: 3, unit: "" },
      { name: "Cumin", amount: 1, unit: "tsp" },
      { name: "Tahini", amount: 60, unit: "ml" },
      { name: "Pita bread", amount: 3, unit: "" },
      { name: "Mixed greens", amount: 100, unit: "g" },
    ],
    tags: ["vegetarian", "protein"],
  },
];

export const DEFAULT_PEOPLE: Person[] = [
  { id: "person-1", name: "Alex", color: PERSON_COLORS[0], dailyCalorieTarget: 2200 },
  { id: "person-2", name: "Jordan", color: PERSON_COLORS[1], dailyCalorieTarget: 1800 },
];

export function getInitialPlacedMeals(startDate: string): PlacedMeal[] {
  return [
    {
      id: "placed-1",
      menuItemId: "menu-5",
      date: startDate,
      mealType: "breakfast",
      assignedPersonIds: ["person-1", "person-2"],
      personServings: { "person-1": 1, "person-2": 1 },
    },
    {
      id: "placed-2",
      menuItemId: "menu-2",
      date: startDate,
      mealType: "dinner",
      assignedPersonIds: ["person-1"],
      personServings: { "person-1": 1 },
    },
    {
      id: "placed-3",
      menuItemId: "menu-7",
      date: startDate,
      mealType: "lunch",
      assignedPersonIds: ["person-2"],
      personServings: { "person-2": 1 },
    },
  ];
}
