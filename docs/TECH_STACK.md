# TextTile ERP
# Technology Stack

Version: 1.0

---

# Purpose

This document defines the official technology stack for the TextTile ERP project.

The technologies listed here are mandatory unless explicitly changed by the project owner.

AI agents must not replace, remove, or introduce alternative technologies without approval.

---

# Core Principles

The technology stack is chosen based on:

- Stability
- Scalability
- Long-term maintainability
- Large ecosystem support
- Type safety
- Performance
- Developer experience

Consistency is more important than using the newest libraries.

---

# Frontend

Framework

- React 19

Reason

- Mature ecosystem
- Component-based architecture
- Excellent TypeScript support
- Large community

---

## Build Tool

Vite

Reason

- Extremely fast development server
- Optimized production builds
- Modern tooling
- React first-class support

---

## Language

TypeScript

Rules

- Strict mode enabled
- Avoid `any`
- Prefer explicit types
- Interfaces for object contracts
- Enums only when appropriate

---

## Styling

Tailwind CSS

Reason

- Utility-first workflow
- Consistent spacing
- Small bundle size
- Easy responsive design

Rules

- No inline styles
- No CSS frameworks
- Custom CSS only when Tailwind cannot solve the problem

---

## UI Components

shadcn/ui

Reason

- Accessible
- Customizable
- Modern
- No vendor lock-in

Rules

- Customize components instead of replacing them
- Keep design consistent with the UI guidelines

---

## Icons

lucide-react

Reason

- Lightweight
- Modern
- Consistent

Do not mix multiple icon libraries.

---

## Routing

React Router

Reason

- Official routing solution
- Nested routing
- Lazy loading support

---

## Server State

TanStack Query

Purpose

- API requests
- Caching
- Background refetching
- Optimistic updates

Do not use Redux for server state.

---

## Forms

React Hook Form

Validation

Zod

Reason

- High performance
- Excellent TypeScript integration

---

## Animation

Framer Motion

Purpose

- Page transitions
- Scroll animations
- Card hover effects
- Modal animations

Rules

Animations should be subtle.

Never use excessive motion.

---

# Backend

Runtime

Node.js (LTS)

---

Framework

Express.js

Reason

- Lightweight
- Flexible
- Large ecosystem

---

Language

TypeScript

Strict mode required.

---

Validation

Zod

All API input must be validated.

Never trust client data.

---

Authentication

Supabase Auth

Purpose

- Login
- JWT
- Session management
- Password reset
- Email verification

Custom authentication is prohibited.

---

Database

Supabase PostgreSQL

Purpose

- Primary relational database

Reasons

- PostgreSQL
- Built-in authentication
- Realtime
- Storage
- RLS
- Excellent TypeScript support

---

Storage

Supabase Storage

Purpose

- Images
- Product files
- Technical documents
- Attachments
- User avatars

No local file storage.

---

Realtime

Supabase Realtime

Used only when necessary.

Examples

- Notifications
- Live dashboards
- Machine monitoring

---

Database Standards

Primary Key

UUID

---

Audit Columns

Every table must include

- id
- created_at
- updated_at

Optional

- deleted_at
- created_by
- updated_by

---

Soft Delete

Preferred over permanent deletion.

---

Foreign Keys

Always enforced.

---

Indexes

Create indexes for

- Foreign keys
- Frequently searched columns
- Unique values

---

API Design

Architecture

Controller

↓

Service

↓

Repository

↓

Supabase

Business logic must never exist inside controllers.

---

API Standard

REST API

Examples

GET

POST

PUT

PATCH

DELETE

Use consistent endpoint naming.

Example

/api/products

/api/orders

/api/users

---

Environment Variables

Frontend

VITE_API_URL

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Backend

PORT

SUPABASE_URL

SUPABASE_SERVICE_ROLE_KEY

JWT_SECRET

NODE_ENV

Never hardcode secrets.

Never commit .env files.

---

Package Manager

npm

Use a single package manager throughout the project.

Do not mix npm, pnpm, or yarn.

---

Linting

ESLint

Required

No warnings before merge.

---

Formatting

Prettier

Required.

---

Testing

Phase 1

Manual testing

Phase 2

Vitest

Phase 3

API integration tests

---

Documentation

Markdown

Every completed module must update:

README

TASKS

ACCEPTANCE

---

Deployment

Frontend

Vercel

Backend

Railway (preferred)

Alternative

Render

Database

Supabase

---

Version Control

Git

Main Branch

main

Development Branch

develop

Feature Branch

feature/module-name

Example

feature/authentication

feature/products

feature/dashboard

---

Dependency Policy

AI agents must NOT install packages without justification.

Before installing a dependency, verify:

- Can the feature be built using existing packages?
- Is the package actively maintained?
- Is it widely adopted?
- Does it support TypeScript?
- Does it increase bundle size significantly?

If uncertain, ask before installing.

---

Forbidden Technologies

Do not introduce:

Angular

Vue

Redux

Material UI

Bootstrap

jQuery

Firebase

MongoDB

Prisma

Styled Components

Emotion

SASS

CSS Modules

unless explicitly approved.

---

Performance Goals

Lighthouse

Performance

90+

Accessibility

95+

SEO

95+

Best Practices

95+

---

Build Requirements

Before completing any task:

npm run lint

must pass.

npm run build

must pass.

No TypeScript errors.

No ESLint errors.

No unused imports.

No console.log statements in production code.

---

Future Expansion

The chosen stack should support future additions such as:

- Mobile application
- Multi-company
- Multi-factory
- Barcode integration
- RFID
- AI forecasting
- IoT connectivity
- Business Intelligence
- Offline support

without requiring major architectural changes.

---

End of Document