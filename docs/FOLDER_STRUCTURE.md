# TextTile ERP
# Folder Structure

Version: 1.0

---

# Purpose

This document defines the official folder structure of the TextTile ERP project.

Every developer and AI agent must follow this structure.

Do not create new top-level folders unless approved.

The goal is to keep the repository organized, scalable, and easy to navigate.

---

# Root Structure

```
texttile/
│
├── frontend/
├── backend/
├── database/
├── docs/
├── .github/
├── .vscode/
├── README.md
├── .gitignore
└── package.json (optional workspace)
```

---

# Frontend

```
frontend/
│
├── public/
├── src/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

---

# src

```
src/
│
├── app/
├── assets/
├── components/
├── features/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── routes/
├── services/
├── store/
├── styles/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

---

# app/

Contains application initialization.

Examples

- Providers
- Query Client
- Theme
- Global configuration

Do not place feature code here.

---

# assets/

Contains static assets.

```
assets/

images/

icons/

logos/

fonts/
```

No business logic.

---

# components/

Reusable UI components.

Examples

```
Button

Input

Modal

Card

Table

Avatar

Badge

Dialog

Dropdown

Tabs
```

Rules

Components must be generic.

Do not place business logic here.

---

# features/

Contains business modules.

Example

```
features/

auth/

dashboard/

products/

orders/

warehouse/

inventory/

production/

users/

reports/
```

Each feature owns its own

- components
- hooks
- services
- pages
- types

Example

```
features/

products/

components/

hooks/

services/

types/

pages/
```

---

# hooks/

Reusable custom hooks.

Examples

```
useAuth()

useDebounce()

usePagination()

useModal()

usePermissions()
```

---

# layouts/

Page layouts.

Examples

```
PublicLayout

DashboardLayout

AuthLayout
```

---

# lib/

Third-party configuration.

Examples

```
axios.ts

supabase.ts

queryClient.ts
```

Only initialization belongs here.

---

# pages/

Top-level routed pages.

Examples

```
Home

Login

Dashboard

Products

Contact
```

Pages should remain small.

Business logic belongs in features.

---

# routes/

React Router configuration.

Examples

```
publicRoutes.ts

privateRoutes.ts

router.tsx
```

---

# services/

API communication.

Examples

```
auth.service.ts

product.service.ts

order.service.ts
```

Never manipulate the UI here.

---

# store/

Global application state.

Only if needed.

Do NOT store server data here.

Server state belongs to TanStack Query.

---

# styles/

Global styles.

Examples

```
globals.css

variables.css
```

Avoid component-specific CSS.

---

# types/

Global TypeScript types.

Examples

```
User.ts

Product.ts

Order.ts
```

---

# utils/

Pure helper functions.

Examples

```
formatDate()

formatCurrency()

generateSKU()

downloadFile()
```

No API calls.

---

# Backend

```
backend/

src/

controllers/

services/

repositories/

routes/

middleware/

config/

database/

types/

utils/

validators/

app.ts

server.ts
```

---

# controllers/

Receive requests.

Return responses.

No business logic.

Example

```
ProductController

UserController

AuthController
```

---

# services/

Business logic.

Examples

```
Create Order

Approve Sample

Generate Invoice

Update Inventory
```

Controllers call services.

---

# repositories/

Database layer.

Responsible for all Supabase communication.

Services should not directly access Supabase.

Architecture

```
Controller

↓

Service

↓

Repository

↓

Supabase
```

---

# routes/

Express routes.

Example

```
auth.routes.ts

product.routes.ts

warehouse.routes.ts
```

---

# middleware/

Examples

```
Authentication

Authorization

Error Handler

Logger

Rate Limiter
```

---

# validators/

Request validation.

Use Zod.

Every request should be validated.

---

# config/

Application configuration.

Examples

```
env.ts

supabase.ts
```

---

# database/

Database-related resources.

```
database/

migrations/

seeds/

schema/

functions/
```

---

# migrations/

SQL migrations.

One migration per change.

Never modify old migrations.

Create new ones.

---

# seeds/

Development data.

Never use in production.

---

# schema/

ER diagrams.

Database documentation.

Table reference.

---

# functions/

Database functions.

Triggers.

Views.

Policies.

---

# docs/

Project documentation.

```
docs/

PROJECT_OVERVIEW.md

TECH_STACK.md

FOLDER_STRUCTURE.md

CODING_STANDARDS.md

UI_GUIDELINES.md

AI_AGENT_RULES.md

DEVELOPMENT_WORKFLOW.md
```

---

# Module Documentation

Every module gets its own folder.

Example

```
module-00-landing/

README.md

TASKS.md

ACCEPTANCE.md

assets/
```

Later

```
module-01-auth/

module-02-master-data/

module-03-merchandising/

...
```

---

# Naming Conventions

Folders

```
lowercase

kebab-case
```

Examples

```
sample-development

production-planning

quality-control
```

---

Files

React Components

```
ProductCard.tsx

DashboardHeader.tsx
```

Hooks

```
useAuth.ts

useTheme.ts
```

Services

```
auth.service.ts

product.service.ts
```

Repositories

```
product.repository.ts
```

Validators

```
create-product.validator.ts
```

---

# Maximum File Size

Recommended

Components

<300 lines

Services

<400 lines

Pages

<250 lines

Split large files.

---

# Imports

Preferred

```
Feature

↓

Components

↓

Hooks

↓

Utils

↓

Types
```

Avoid circular imports.

---

# AI Rules

AI agents must

✅ Use existing folders

✅ Respect module boundaries

✅ Avoid duplicate utilities

✅ Keep related files together

AI agents must NOT

❌ Create random folders

❌ Mix backend/frontend code

❌ Place business logic in UI components

❌ Create multiple implementations of the same helper

---

# Future Modules

The folder structure must support future additions such as

- Mobile application
- Barcode module
- RFID
- AI assistant
- Machine monitoring
- Multi-company
- Multi-factory

without major restructuring.

---

End of Document