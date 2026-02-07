# gemini.md — Finance Dashboard App Instructions

## Project Overview

Build a personal finance dashboard web application that tracks income, expenses, savings, budgets, cards, and goals.

The app must be:
- Built using **Next.js (14+) App Router**
- Written in **TypeScript**
- Styled using **Tailwind CSS**
- Fully responsive (mobile-first)
- Frontend-only MVP using **localStorage** for persistence
- Clean, modern, dashboard-style UI

No backend, no authentication, no external database.

---

## Technical Stack

### Core Framework
- Next.js (App Router)
- TypeScript

### Styling
- Tailwind CSS
- Utility-based component styling
- Class merging using `clsx` + `tailwind-merge`

### Libraries
- chart.js
- react-chartjs-2
- lucide-react (icons)
- clsx
- tailwind-merge

---

## Constraints & Rules

- Use **localStorage** for all data persistence
- Data is browser-specific and will reset if cache is cleared
- No backend APIs
- No authentication
- No branding unless explicitly required by the UI
- Code must be modular, readable, and scalable
- Follow clean component separation

---

## Phase 1: Setup & Configuration

### Tasks
- Initialize Next.js project with TypeScript
- Configure Tailwind CSS
- Install required dependencies
- Extend Tailwind theme with custom color tokens
- Configure global font using Inter via `next/font/google`
- Create utility for class merging

### Required Files
- `tailwind.config.ts`
- `app/layout.tsx`
- `utils/cn.ts`

---

## Phase 2: Architecture & Data Layer

### Type Definitions
Create strict TypeScript interfaces in:
- `types/index.ts`

Required interfaces:
- User
- Transaction
- Category
- Card
- Goal
- Budget

Each interface must include:
- Unique IDs
- Timestamps where relevant
- Strong typing (no `any`)

---

### Local Storage Service

Create:
- `services/storage.ts`

Responsibilities:
- Read/write data from localStorage
- Namespaced keys per entity
- Safe JSON parsing
- Initialize seed data on first load

---

### State Management

Create:
- `context/FinanceContext.tsx`

Responsibilities:
- Global state provider
- Expose data and mutation methods:
  - addTransaction
  - editTransaction
  - deleteTransaction
  - addGoal
  - updateGoal
  - deleteGoal
  - addCard

Use React Context (no Redux).

---

## Phase 3: UI Components

### Base Components
- Button (Primary / Secondary)
- Card (shadow, padding, rounded)
- Input
- Select

All components must:
- Be reusable
- Accept className overrides
- Follow consistent spacing and sizing

---

### Layout Components
- Header (navigation, profile placeholder, theme toggle)
- Sidebar or Top Navigation (dashboard-style)
- Responsive layout adjustments

---

### Feature Components
- TransactionItem
- MetricCard
- ChartContainer
- EmptyState components

---

## Phase 4: Feature Implementation

### Dashboard Page
- Key metric cards:
  - Total Balance
  - Total Income
  - Total Expense
  - Savings
- Income bar chart (fixed vs variable)
- Budget donut chart
- Recent transactions table
- Spending limits widget
- Cards overview widget

---

### Transactions Page
- Full transaction list
- Filters:
  - Type
  - Category
  - Date
- Add/Edit transaction modal
- Delete transaction functionality

---

### Wallet Page
- List of cards
- Display-only card details
- Add card form (MVP display logic only)

---

### Goals Page
- List savings goals
- Create goal functionality
- Visual progress indicators

---

## Phase 5: Polish & Verification

### Checklist
- Mobile responsiveness verified
- Consistent spacing and typography
- Data persists on reload
- No console errors
- Charts render correctly
- Forms validate inputs
- Empty states handled gracefully

---

## Output Expectations

- Clean folder structure
- Idiomatic TypeScript
- No unused components
- No mock branding
- UI optimized for dashboard use
- Code suitable for further backend extension

---

## Important Notes

This is an MVP.
Focus on:
- Structure
- Clarity
- Usability
- Extensibility

Do not over-engineer.
Do not add unnecessary abstractions.
