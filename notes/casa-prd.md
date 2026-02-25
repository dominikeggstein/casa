# Casa — Product Specification

> _"Your home, in flow."_

**Version:** 1.0 — Initial Product Spec
**Date:** February 23, 2026
**Author:** Dominik (Solo Founder)
**Domain:** trycasa.io

---

## 1. Vision & Concept

Casa is a modular household management platform that helps people organize every aspect of their home life — from meal planning and grocery shopping to cleaning schedules and storage organization. Powered by AI, Casa turns the chaos of running a household into a smooth, shared, and even enjoyable experience.

Casa is built as a **modular system** where each area of household life is its own "Casa Module." Users start with what they need and unlock more as their household grows. The modular architecture doubles as the brand identity:

- **Casa Kitchen** — Recipes, meal planning, grocery lists
- **Casa Clean** — Cleaning schedules, task rotation, room management
- **Casa Organize** — Storage optimization, AI labeling, inventory tracking
- **Casa Entertainment** — Movies, activities, weekend scheduling
- **Casa Family** _(future)_ — Parenting duties, kid schedules
- **Casa Budget** _(future)_ — Household expenses, subscriptions
- **Casa Garden** _(future)_ — Plant care, seasonal tasks
- **Casa Guests** _(future)_ — Event planning, hosting checklists
- **Casa Pets** _(future)_ — Feeding schedules, vet appointments

All modules feed into a unified **Casa Dashboard** and **Casa Calendar**.

---

## 2. Target Audience

Casa is designed for **anyone running a household** — couples, families, roommates, or solo dwellers. The product is not tailored to a specific demographic but built to be universally useful. The SaaS model allows different household types to pick the modules relevant to them.

---

## 3. Business Model

**Freemium — all modules, per household pricing:**

- **All modules available in free tier** with basic features
- **Advanced features are paid** (premium tier unlocks per module):
  - Advanced scaling engine (per-person calorie optimization)
  - AI-powered features: recipe generation, image generation, meal plan auto-generation, storage suggestions, label AI naming
  - Advanced gamification features
  - Export suite (PDF cookbook, printable plans)
  - Multi-household support
- **Pricing is per household** — one subscription covers all members
- **AI features are rate-limited** — prevents spam/abuse while keeping pricing predictable
- Community/social features (public recipe library) planned as a future growth layer

---

## 4. Platform & Tech Stack

### Platform Strategy

- **Responsive web application** (mobile browser-friendly)
- No native mobile app at launch — responsive web-first approach
- **PWA with offline capability** — essential for grocery list check-off in stores with poor connectivity
- Progressive enhancement for other offline scenarios over time

### Tech Stack

| Layer        | Technology                                                                                |
| ------------ | ----------------------------------------------------------------------------------------- |
| Frontend     | **Next.js** (React, full-stack)                                                           |
| Backend & DB | **Supabase** (PostgreSQL, Auth, Realtime, Row-Level Security)                             |
| AI (LLM)     | **OpenRouter** (flexible multi-model: GPT-4o, Claude, Mistral, etc.)                      |
| AI (Images)  | **Flux via Replicate/fal.ai** (recipe visuals)                                            |
| Hosting      | TBD (Vercel likely for Next.js)                                                           |
| i18n         | Full internationalization setup from day one (easy to add languages)                      |
| Auth         | Supabase Auth — Email + password, Social login (Google, Apple), Magic link (passwordless) |

### Key Technical Decisions

- **OpenRouter** allows routing different AI tasks to different models based on cost/quality tradeoffs (e.g., cheap model for label names, powerful model for meal plan generation)
- **Supabase Realtime** enables live-synced grocery lists and shared household updates
- **Row-Level Security** in Supabase handles multi-household data isolation natively
- **i18n from day one** avoids costly refactoring — initial language TBD, but architecture supports any language addition

---

## 5. Cross-Module Features

These features span all modules and create the unified Casa experience.

### 5.1 Casa Dashboard

- **Unified overview** aggregating all active modules into one view
- Weekly snapshot: meals planned, cleaning tasks due, upcoming events
- Module cards that expand into detail views
- Each module feels like a "room" in your Casa

### 5.2 Casa Calendar

- **Shared household calendar** that aggregates:
  - Meal plans (from Casa Kitchen)
  - Cleaning schedules (from Casa Clean)
  - Tasks and assignments (from all modules)
- **External calendar sync:** Google Calendar, Apple Calendar, Outlook
- Flexible views: week, day, month (user chooses)
- **Open decision:** Sync direction — one-way (Casa → Calendar) is simpler to build, two-way enables richer workflows but adds complexity. To be decided during implementation.

### 5.3 Household Member Profiles

- **Per-person calorie/macro profiles** — e.g., "Dominik: 2200 kcal/day, Partner: 1800 kcal/day"
  - Drives automatic portion calculation in Casa Kitchen
  - When planning a meal for two, calculates different portion sizes per person
  - Aggregates grocery list correctly based on individual portions
- **Per-person dietary restrictions** — allergies, intolerances, preferences (vegan, lactose-free, etc.)
  - Filters recipe suggestions automatically
  - Flags conflicts when planning meals
- **Per-person cleaning preferences/abilities** — used for fair task distribution in Casa Clean

### 5.4 Notification System

- **Email digests** — daily or weekly summary (configurable)
  - "This week's meal plan, your cleaning tasks, and storage reminders"
- **Calendar sync** — all assignments and schedules pushed to external calendars
- No push notifications or in-app notifications at launch (clean, non-intrusive approach)

### 5.5 Activity Feed

- Household-wide activity stream: "Lisa checked off bathroom cleaning," "New recipe added: Thai Green Curry"
- Creates accountability and shared awareness without nagging

### 5.6 AI Assistant Chat

- Natural language interface across all modules
- "What should we cook tonight?" → suggests based on pantry, preferences, and dietary profiles
- "I bought 3 shelves from IKEA" → updates Casa Organize accordingly
- Contextual awareness across modules

### 5.7 Sharing & Collaboration

- **Role-based access:** Admin, Member, Viewer
- Admins manage modules, invite members, configure household settings
- Members can interact with all active modules
- Viewers have read-only access (useful for guests, extended family)

### 5.8 Multi-Household Support

- Users can belong to multiple households (e.g., primary home + vacation house)
- Each household has its own modules, members, and data
- Easy switching between households

### 5.9 Export Suite

All modules support exporting data for offline or external use:

- **Grocery list** → PDF, shareable to messaging apps
- **Meal plan** → PDF, printable weekly view
- **Recipes** → PDF cookbook-style export
- **Cleaning schedule** → PDF or calendar file (.ics)
- **Recipes** → Publicly shareable via link (social sharing)

---

## 6. Casa Kitchen — Recipe & Meal Planning Module

### 6.1 Recipe Database

#### Recipe Input Methods

1. **Manual entry** — structured form for typing in recipes
2. **Import from URL** — paste a recipe website link, AI parses and extracts structured data (ingredients, steps, times)
3. **AI-generated from description** — describe a dish in natural language ("a light summer pasta with lemon and herbs") and AI generates a complete recipe
4. **Photo/scan of handwritten recipe** — upload a photo of a handwritten or printed recipe, OCR + AI extracts and structures it

#### Recipe Data Model

Each recipe contains:

- **Title and description**
- **Ingredients with quantities** — structured (ingredient, amount, unit)
- **Step-by-step instructions** — ordered, with optional timing per step
- **Nutritional info** — calories, macros (protein, carbs, fat), auto-calculated from ingredients
- **Prep time / cook time / difficulty** — metadata for filtering and planning
- **Tags** — flexible tagging system (vegan, quick, comfort food, weeknight, date night, etc.)
- **Cost estimate per serving** — calculated from ingredient prices (manual or estimated by AI)
- **Wine or drink pairing** — AI-suggested or manually added
- **Serving size** — base serving count, fully scalable
- **Image** — AI-generated by default (via Flux), user can override with own photo

#### Intelligent Scaling Engine (Core Differentiator)

The scaling engine is the heart of Casa Kitchen:

- **Base input:** number of servings (e.g., 2 people)
- **Fine-tuning:** per-person calorie targets (e.g., Person A: 600 kcal, Person B: 450 kcal for this meal)
- **Cascading recalculation:** changing servings or calorie targets automatically recalculates:
  - Ingredient quantities
  - Nutritional breakdown
  - Cost estimate
  - Grocery list quantities
- **Profile-aware:** when household members are assigned to a meal, their dietary profiles and calorie targets are auto-applied

#### Recipe Visuals

- **AI-generated images** by default using Flux (via Replicate/fal.ai)
  - Generated automatically when a recipe is created
  - Food photography style, appetizing presentation
- **User upload** — can override AI image with own photo
- Both options coexist — AI provides a fallback, user photos take priority when available

### 6.2 Meal Planner

#### Views

- **Flexible view system** — user chooses their preferred view:
  - Weekly (7 days, drag & drop)
  - Weekly + daily detail
  - Full month overview with weekly drill-down
- **Drag & drop** from recipe database directly into the planner
- Meals categorized by type (breakfast, lunch, dinner, snack — configurable)

#### Assignment

- Meals can be assigned to specific household members
- Assignment triggers profile-based scaling (calorie targets, dietary restrictions)
- Unassigned meals use default household serving size

#### AI Meal Plan Generation

- Auto-generate a meal plan based on:
  - Dietary preferences and restrictions
  - Calorie/macro targets per person
  - Available pantry items (connected to Casa Organize)
  - Budget constraints
  - Variety (avoid repetition)
  - Seasonal ingredients
- User can regenerate individual days or the entire week
- AI respects pinned meals (user locks specific days, AI fills the rest)

### 6.3 Grocery List

#### Generation

- **Auto-generate from meal plan** — user selects a date range (flexible: single day, specific days, full week, custom range)
- Ingredients from all planned meals are aggregated, deduplicated, and consolidated (e.g., two recipes needing onions → combined quantity)
- **Manual additions** — freely add items not tied to any recipe

#### Shopping Experience

- **Aisle/category sorting** — items grouped by supermarket section (produce, dairy, meat, pantry, frozen, etc.)
- **Shared list with live sync** — multiple household members see the same list in real-time (Supabase Realtime)
- **Check-off while shopping** — tap to mark items as purchased (mobile-optimized)
- Checked items move to bottom or hide

#### Smart Features (AI-Powered)

- **"Use up expiring ingredients" suggestions** — flags items in pantry nearing expiration, suggests recipes that use them
- **Recipe suggestions based on pantry** — "You have chicken, rice, and bell peppers — here are 5 recipes"
- Connected to Casa Organize inventory for pantry awareness

---

## 7. Casa Entertainment — Movies, Activities & Scheduling Module

### 7.1 Media Library

- **Movie & show database** — household's shared collection of movies, TV shows, documentaries
- **Status tracking** — watchlist, watching, watched per household member
- **Ratings & reviews** — personal ratings (1-5 stars), short notes
- **Tags** — genre, mood (cozy, thrilling, date night), occasion (family movie night, solo wind-down)
- **TMDB search integration** — search and import movie/show metadata (poster, synopsis, cast, runtime) from The Movie Database
- **AI suggestions** — "Based on what you've enjoyed, try these" — personalized per member or for the household

### 7.2 Activity Library

- **Activity types** — board games, restaurants, outings, day trips, sports, hobbies
- **Metadata per activity** — estimated cost, duration, group size (min/max), location, indoor/outdoor
- **Categories & tags** — similar flexible tagging as media (mood, occasion, season)
- **Custom entries** — add any activity manually; AI can suggest metadata

### 7.3 Entertainment Calendar

- **Drag & drop scheduling** — drag from media/activity library directly onto calendar slots (same UX pattern as Casa Kitchen meal planner)
- **Calendar views** — weekend focus (Fri/Sat/Sun), full week, month overview
- **Recurring events** — "Movie Friday," "Board Game Sunday," etc.
- **Member assignment** — who's joining which activity
- **Conflict detection** — warns if members are double-booked or if an activity overlaps with meals/cleaning tasks from other modules
- **Time slot suggestions** — AI finds open slots that work for all assigned members

### 7.4 Cross-Module Integration

- **→ Casa Kitchen:** Movie night triggers snack/dinner recipe suggestions; "Plan a movie night" auto-suggests popcorn recipes and easy finger food
- **→ Casa Calendar:** Entertainment events appear in the unified household calendar alongside meals and cleaning tasks
- **→ Casa Clean:** Post-event cleanup tasks can be auto-generated (e.g., "Clean living room after movie night")
- **→ Casa Budget (future):** Track entertainment spending (streaming subscriptions, restaurant costs, activity fees)

### 7.5 AI Features

- **Smart recommendations** — based on household preferences, past ratings, mood, available time
- **"Plan a date night"** — AI generates a complete evening: movie + dinner recipe + activity, all scheduled
- **"Plan a family weekend"** — AI fills Saturday/Sunday with age-appropriate activities, meals, and downtime
- **Smart slot finding** — "When can we all watch a movie this week?" — AI scans calendars and suggests times

---

## 8. Casa Clean — Cleaning Schedule Module

### 8.1 Room-Based Organization

- Household divided into rooms/zones (kitchen, bathroom, living room, bedroom, etc.)
- Each room has its own set of cleaning tasks
- Rooms are user-configurable (add, rename, remove)

### 8.2 Task Management

#### Recurring Task Templates

- Tasks have configurable recurrence: weekly, biweekly, monthly, quarterly, custom
- Examples: "Clean bathroom — weekly," "Deep clean oven — monthly," "Wash windows — quarterly"
- Templates can be created from scratch or from AI-suggested starter sets

#### Task Properties

- **Room assignment** — which room/zone
- **Effort/time estimate** — estimated minutes per task (manual or AI-suggested)
- **Recurrence** — frequency and schedule
- **Assigned person** — who's responsible this cycle
- **Status** — pending, done, overdue
- **Priority** — optional, for sorting

### 8.3 Auto-Rotation (Fair Distribution)

- **Automatic rotation** between household members
- Algorithm balances based on:
  - Total effort/time per person (not just task count)
  - Person-specific preferences/abilities (from profiles)
  - Historical completion data
- AI optimization: rebalances when workload becomes uneven
- Manual override always available

### 8.4 Confirmation & Tracking

- **Check-off** when a task is completed
- Completion logged with timestamp and person
- Overdue tasks highlighted

### 8.5 Gamification

- **Streak tracking** — consecutive weeks of completing all assigned tasks
- **Score/points system** — earn points for completed tasks, weighted by effort
- **Household leaderboard** — friendly competition
- Optional — can be disabled for households that prefer a no-pressure approach

### 8.6 AI Features

- **Cleaning schedule optimization** — AI suggests the most balanced and efficient schedule
- Suggests task frequency based on room type and household size
- Detects patterns (e.g., "bathroom tasks are always late — redistribute or reduce frequency?")

---

## 9. Casa Organize — AI Storage & Labeling Module

### 9.1 Visual Space Definition

#### 2D Grid/Shelf Editor

- **Visual builder** where users define storage spaces spatially
- Drag and drop to create:
  - Rooms (kitchen, bedroom, garage, basement, etc.)
  - Furniture/units within rooms (shelf, cabinet, closet, drawer unit)
  - Shelves/compartments within units
  - Containers/boxes within shelves
- Each space has configurable dimensions (width, height, depth) or simple size labels (small, medium, large)
- Visual representation shows the spatial layout — users can see where things are at a glance

### 9.2 AI-Powered Organization

#### Storage Suggestions

- Tell the system what you need to store → AI suggests optimal grouping and placement
- Respects constraints:
  - Size limitations ("this shelf is too small")
  - Safety rules (cleaning products away from food, heavy items low)
  - Frequency of use (daily items at eye level, seasonal items high/back)
  - Logical grouping (baking supplies together, breakfast items together)

#### Feedback Loop

- User can flag: "too small," "too big," "wrong category," "I access this daily"
- AI redistributes and suggests alternatives
- "Split into _Baking Essentials_ (upper) and _Baking Extras_ (lower shelf)"

#### Natural Language Input

- "I bought 3 new IKEA KALLAX shelves for the basement"
- AI creates the spaces and suggests how to organize existing items into new storage

### 9.3 Label/Sticker Generator

#### AI Label Naming

- AI generates clean, aesthetic names for storage categories
- Bilingual support (e.g., German + English on same label): "Öle & Essig / Oils & Vinegar"
- Consistent naming style across the entire household

#### Label Design

- **Curated Casa themes** — user picks from a set of professionally designed label styles
- Themes ensure visual consistency (font, color scheme, layout)
- Multiple themes available (minimal, modern, rustic, playful, etc.)

#### Label Sizes

- Shelf labels (larger, meant to be read from a distance)
- Box/container labels (medium)
- Drawer labels (compact)
- Each size adjusts layout and font size automatically

#### Export

- **PDF export** — formatted for standard label paper or custom sizes
- **Label printer support** — formatted for common label printers (Dymo, Brother, etc.)
- Print-ready with crop marks
- **Open decision:** Specific label printer models to support TBD — will evaluate based on market research and user feedback post-launch.

### 9.4 Inventory Tracking

- Track what's stored where — not just categories but actual items
- Search across all storage: "Where did I put the Christmas decorations?"
- Global search with results showing: item → container → shelf → room (breadcrumb path)

### 9.5 Cross-Module Connections

- **→ Casa Kitchen:** Pantry items in Casa Organize feed into Kitchen's "what's in stock" for recipe suggestions and smart grocery lists
- **→ Casa Clean:** Cleaning supply locations tracked, easy to find and restock
- **→ Casa Budget (future):** AI suggests containers/organizers to buy, with estimated costs

---

## 10. Casa Games — Gamified Task Assignment

### 10.1 Concept

Instead of purely algorithmic task rotation, Casa offers playful ways to decide who does what. Any assignable task across modules can be resolved through a mini-game. This turns mundane chore distribution into a shared moment of fun — and a potential viral feature.

### 10.2 Game Modes

#### Spin the Wheel

- Visual spinner animation with household member names
- Weighted or equal probability (configurable)
- "Who does the dishes tonight?" → spin → result animated on screen
- Satisfying, shareable moment

#### Coin Flip

- Simple 50/50 for two-person households
- Quick, no-fuss resolution
- Best of 3 option for high-stakes chores

#### Rock Paper Scissors

- In-app game between two members
- Real-time or async (Player 1 picks, Player 2 picks when they open the app)
- Animated result reveal

#### Quiz Challenge

- Quick trivia question — first correct answer wins (loser does the task)
- Questions can be general knowledge or household-specific ("Where do we keep the baking soda?")

#### Streak Challenges

- "Clean 5 days in a row → exempt from Sunday dishes"
- Motivates consistent effort through earned rewards
- Configurable by household admins

#### Bet/Wager System

- "I'll do bathrooms this week if you do kitchen next week"
- Proposals sent between members, tracked and enforced by the app
- History of bets kept for accountability

### 10.3 Integration Points

- **Casa Clean** → any cleaning task can be gamified instead of directly assigned
- **Casa Kitchen** → "Who cooks tonight?" resolved via game
- **Activity Feed** → game results posted: "Spin result: Lisa does the dishes!"
- **Dashboard** → upcoming gamified tasks shown with a play icon

### 10.4 Fairness System

- **History tracking** — the app tracks win/loss ratios over time
- **Optional fairness balancing** — if someone has lost many times in a row, odds can be subtly weighted to rebalance
- **Long-term stats** — "This month: Dominik 12 tasks, Lisa 10 tasks" — transparency prevents resentment

### 10.5 Social/Viral Potential

- Shareable game results (screenshot-friendly or share link)
- "Who does the dishes?" spin results are inherently fun to post on social media
- Potential organic growth driver

---

## 11. AI Architecture

### 11.1 AI Provider Strategy

- **OpenRouter** as the routing layer — enables flexible model selection per task
- Different tasks routed to different models based on cost/quality needs:

| Task                               | Model Tier                            | Reasoning                             |
| ---------------------------------- | ------------------------------------- | ------------------------------------- |
| Label name generation              | Fast/cheap (e.g., Haiku, GPT-4o-mini) | Simple creative task                  |
| Recipe parsing from URL            | Mid-tier (e.g., Sonnet, GPT-4o)       | Structured extraction                 |
| Meal plan generation               | High-tier (e.g., Opus, GPT-4o)        | Complex multi-constraint optimization |
| Recipe generation from description | Mid-tier                              | Creative + structured                 |
| Storage optimization               | Mid-tier                              | Spatial reasoning                     |
| Natural language input processing  | Mid-tier                              | Intent parsing + action               |
| OCR recipe extraction              | Vision model                          | Image understanding                   |

### 11.2 Image Generation

- **Flux via Replicate/fal.ai** for recipe visuals
- Triggered automatically on recipe creation
- Prompt engineered for appetizing food photography style
- User can regenerate or upload their own photo

### 11.3 AI Cost Management

- **All AI features are premium/paid** — directly offsets API costs
- **Rate limiting** on AI generations to prevent abuse (e.g., max N recipe generations per day/week)
- Heavy users hit rate limits rather than incurring overage charges — predictable for both user and business
- Caching common queries (e.g., nutritional data for standard ingredients) to reduce API calls
- **Ingredient pricing:** AI-estimated with location-based indexing for regional accuracy; user can override manually
- **Nutritional data:** AI-estimated from ingredient lists, no external API dependency at launch

---

## 12. Data Model Overview

### Core Entities

```
Household
├── Members (User → Household, with role: admin/member/viewer)
│   └── Profile (calories, macros, dietary restrictions, cleaning preferences)
│
├── Casa Kitchen
│   ├── Recipes
│   │   ├── Ingredients (structured: name, amount, unit, nutritional data)
│   │   ├── Steps (ordered instructions)
│   │   ├── Tags
│   │   ├── Image (AI-generated or user-uploaded)
│   │   └── Metadata (prep time, cook time, difficulty, cost, pairings)
│   ├── Meal Plan
│   │   └── Meal Slots (date, meal type, recipe reference, assigned members)
│   └── Grocery Lists
│       └── Items (ingredient reference or freeform, quantity, checked status, category)
│
├── Casa Clean
│   ├── Rooms
│   │   └── Tasks (name, effort, recurrence, assigned member, status, history)
│   └── Rotation Schedule
│
├── Casa Organize
│   ├── Spaces (hierarchical: room → unit → shelf → container)
│   │   └── Space Properties (dimensions/size, position in 2D grid)
│   ├── Items (name, quantity, location reference, expiry date optional)
│   ├── Labels (generated name, theme, size, bilingual text, PDF export reference)
│   └── Label Themes (curated designs)
│
├── Casa Entertainment
│   ├── Media Library
│   │   └── Items (title, type, status, rating, tags, TMDB ID, poster URL)
│   ├── Activity Library
│   │   └── Items (name, type, cost, duration, group size, location, tags)
│   └── Entertainment Calendar
│       └── Slots (date, time, media/activity reference, assigned members, recurring flag)
│
├── Calendar (aggregated from all modules)
├── Activity Feed (log of all household actions)
└── Settings (notification preferences, language, theme)
```

### Key Relationships

- **Recipe → Ingredients → Nutritional DB**: ingredient lookup provides calorie/macro data
- **Meal Plan → Recipe → Scaling Engine → Grocery List**: meal planning drives automated grocery generation
- **Meal Plan → Member Profiles**: assigned members' dietary profiles drive scaling
- **Casa Organize Items → Casa Kitchen Pantry**: shared inventory awareness
- **All Modules → Calendar**: everything surfaces in the shared calendar
- **All Modules → Activity Feed**: all actions logged for household visibility

---

## 13. MVP Phasing Strategy

Given solo development, here's a suggested build order:

### Phase 1 — Foundation + Casa Kitchen (Weeks 1-8)

**Goal:** Core platform with the most compelling module

1. **Auth & Household Setup**
   - Supabase auth (email, social, magic link)
   - Household creation, member invites, role-based access
   - Member profiles (basic: name, dietary restrictions, calorie targets)

2. **Recipe Database (Core)**
   - Manual recipe entry with structured form
   - URL import (AI-powered recipe parsing)
   - Recipe display with scaling engine (servings + calorie-based)
   - AI image generation (Flux)
   - Tag system

3. **Meal Planner**
   - Weekly drag & drop planner
   - Flexible views (week/day)
   - Member assignment on meals

4. **Grocery List**
   - Auto-generation from meal plan (flexible date range)
   - Category sorting
   - Live-synced shared list
   - Check-off while shopping
   - Manual item addition

5. **Basic Dashboard**
   - Week overview (meals planned)
   - Quick actions

### Phase 2 — Casa Clean (Weeks 9-12)

**Goal:** Second module, proves the modular architecture

1. Room-based task management
2. Recurring task templates
3. Auto-rotation between members
4. Check-off and completion tracking
5. Effort/time estimates
6. Basic gamification (streaks, scores)
7. Dashboard integration
6. Entertainment module basics (media library, activity library, calendar integration)

### Phase 3 — Casa Organize (Weeks 13-18)

**Goal:** The wow-factor module with AI differentiation

1. 2D grid/shelf editor
2. AI storage suggestions
3. Label generator with curated themes
4. Bilingual labels
5. PDF/label printer export
6. Inventory tracking
7. Search across all storage
8. Pantry connection to Casa Kitchen

### Phase 4 — Polish & SaaS Launch (Weeks 19-22)

**Goal:** Production-ready for public users

1. Unified Casa Calendar with external sync (Google, Apple, Outlook)
2. Email digest notifications
3. Full export suite (PDFs for all modules)
4. AI assistant chat
5. Activity feed
6. Freemium billing (Stripe integration)
7. Multi-household support
8. Public recipe sharing links
9. i18n infrastructure + first additional language

### Phase 5+ — Growth Features

- AI meal plan auto-generation
- "Use up expiring ingredients" suggestions
- Pantry-based recipe suggestions
- Community recipe library
- Additional modules (Casa Family, Casa Budget, etc.)

---

## 14. Branding Reference

### Name & Domain

- **Name:** Casa
- **Domain:** trycasa.io
- **Tagline options:** "Your home, in flow" / "Home life, sorted" / "Run your Casa"

### Module Naming Convention

All features follow the "Casa [Name]" pattern:

- Casa Kitchen, Casa Clean, Casa Organize, Casa Entertainment, Casa Family, Casa Budget, Casa Garden, Casa Guests, Casa Pets

### Design Direction

- **Open decision:** Design references will be uploaded to the codebase. Visual direction to be established through reference research before development begins.
- Design system should support curated themes (especially for Casa Organize labels)
- Brand should feel premium but approachable — lifestyle product, not just a tool

---

_This document is a living spec. Update as decisions are made and features evolve._
