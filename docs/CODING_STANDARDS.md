# TextTile ERP
# Coding Standards

Version: 1.0

---

# Purpose

This document defines the coding standards for the TextTile ERP project.

Every contributor, including AI coding agents, must follow these standards.

The objective is to ensure that the entire project feels like it was written by a single senior software engineer.

---

# Core Principles

Every piece of code should be:

- Simple
- Readable
- Predictable
- Reusable
- Maintainable
- Testable
- Type-safe

Readable code is preferred over clever code.

---

# General Rules

Always:

- Use TypeScript.
- Write self-explanatory code.
- Prefer composition over inheritance.
- Keep functions focused on one responsibility.
- Remove dead code immediately.
- Reuse existing utilities before creating new ones.

Never:

- Use `any` unless absolutely unavoidable.
- Copy and paste code.
- Leave commented-out code.
- Commit debugging statements.
- Mix business logic with UI components.

---

# TypeScript Standards

Strict mode is mandatory.

Use explicit types whenever practical.

Prefer interfaces for object contracts.

Example

```ts
interface Product {
  id: string;
  name: string;
  sku: string;
}
```

Avoid:

```ts
const product: any = {};
```

---

# Naming Conventions

## Variables

camelCase

```ts
productName
totalQuantity
currentUser
```

---

## Functions

camelCase

Use verbs.

```ts
createOrder()

updateInventory()

calculateCost()

generateSku()
```

Avoid

```ts
data()

save()

handle()
```

---

## Components

PascalCase

```tsx
ProductCard

DashboardHeader

ProductionSummary
```

---

## Interfaces

PascalCase

```ts
User

Product

Order

InventoryItem
```

---

## Enums

PascalCase

```ts
OrderStatus

Role

MachineStatus
```

---

## Constants

UPPER_SNAKE_CASE

```ts
MAX_UPLOAD_SIZE

DEFAULT_PAGE_SIZE
```

---

# React Standards

Components should have one responsibility.

Good

```tsx
ProductCard
```

Bad

```tsx
ProductCardWithModalAndApiAndValidation
```

---

# Component Size

Preferred

100–200 lines

Maximum

300 lines

Split large components.

---

# Hooks

Move reusable logic into hooks.

Example

```ts
useAuth()

usePermissions()

usePagination()

useDebounce()
```

---

# State Management

Use:

- React State
- Context (only when appropriate)
- TanStack Query (server state)

Do NOT store API data in Context.

---

# Props

Keep props minimal.

Avoid passing unnecessary objects.

Bad

```tsx
<Component app={entireApp} />
```

Good

```tsx
<Component title={title} />
```

---

# Pages

Pages should:

- Load data
- Compose components
- Delegate logic

Pages should not contain complex business logic.

---

# Business Logic

Business logic belongs in:

Frontend

Feature Services

Backend

Service Layer

Never inside UI components.

---

# API Standards

All requests go through service classes.

Never call fetch() directly inside components.

Good

```ts
productService.getAll()
```

Bad

```tsx
fetch("/api/products")
```

---

# Error Handling

Every async function must handle errors.

Example

```ts
try {
   ...
}
catch(error){
   ...
}
```

Never ignore exceptions.

---

# Validation

All user input must be validated.

Frontend

Zod

Backend

Zod

Never trust client data.

---

# Forms

Use

React Hook Form

Zod

No uncontrolled forms.

---

# Database Rules

Never access Supabase directly from UI components.

Flow

```
UI

↓

Service

↓

API

↓

Backend

↓

Repository

↓

Supabase
```

---

# Comments

Write comments only when necessary.

Good comments explain "why".

Bad comments explain "what".

Bad

```ts
// Increment count

count++;
```

Good

```ts
// Required to preserve production batch numbering.
```

---

# Logging

Development

console.log allowed temporarily.

Production

No console.log.

Use proper logging.

---

# Imports

Preferred order

```
React

↓

Third-party libraries

↓

Internal libraries

↓

Components

↓

Hooks

↓

Types

↓

Utilities

↓

Styles
```

---

# File Organization

Typical React file

Imports

↓

Types

↓

Component

↓

Helpers

↓

Export

---

# Backend Standards

Controller

↓

Service

↓

Repository

↓

Database

Controllers stay thin.

Services contain business logic.

Repositories handle database communication.

---

# API Responses

Always return consistent JSON.

Success

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

# Security

Never expose:

- Service Role Key
- Passwords
- Secrets
- Tokens

Always use environment variables.

---

# Performance

Avoid unnecessary re-renders.

Use:

- React.memo (when beneficial)
- useMemo
- useCallback

Only after profiling or when clearly appropriate.

Do not prematurely optimize.

---

# Accessibility

Every page should include:

- Semantic HTML
- Form labels
- Keyboard navigation
- Proper button types
- ARIA attributes when necessary

Target Lighthouse Accessibility ≥ 95.

---

# Styling

Use Tailwind CSS.

Do not:

- Use inline styles.
- Mix CSS methodologies.
- Hardcode spacing values repeatedly.

Prefer design tokens.

---

# Git Standards

Branch names

```
feature/auth

feature/products

bugfix/login

hotfix/security
```

Commit messages

```
feat(auth): add login page

fix(product): resolve duplicate SKU validation

refactor(ui): simplify dashboard cards

docs(module-00): update landing documentation
```

---

# Code Review Checklist

Before marking a task complete:

- [ ] TypeScript passes
- [ ] ESLint passes
- [ ] Build succeeds
- [ ] No unused imports
- [ ] No dead code
- [ ] Responsive UI verified
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Empty states implemented
- [ ] Documentation updated

---

# AI Agent Requirements

AI agents must:

- Follow existing architecture.
- Prefer reusable components.
- Search for existing utilities before creating new ones.
- Keep files small.
- Update documentation when completing modules.
- Ask for clarification instead of guessing.

AI agents must never:

- Change architecture without approval.
- Install unnecessary dependencies.
- Rewrite completed modules without instruction.
- Ignore lint or build errors.
- Mark tasks complete without verification.

---

# Definition of Done

A task is complete only if:

- Feature works.
- Code is clean.
- Tests (if available) pass.
- Build succeeds.
- Lint succeeds.
- Documentation is updated.
- Acceptance criteria are satisfied.

---

End of Document