# TextTile ERP
# System Architecture

Version: 1.0

Status: Approved

---

# Purpose

This document defines the official architecture of the TextTile ERP project.

Every module, feature, API, database table, and UI component must follow this architecture.

AI agents are NOT allowed to redesign the architecture unless explicitly instructed.

---

# High-Level Architecture

```

                Public Website
                      │
                      ▼
              React Frontend (Vite)
                      │
             REST API (HTTPS)
                      │
                      ▼
          Node.js + Express Backend
                      │
                Business Services
                      │
                Repository Layer
                      │
                      ▼
            Supabase PostgreSQL
                      │
      Auth • Storage • Realtime • RLS

```

---

# Architecture Principles

The project follows these principles.

- Separation of Concerns
- Feature-Based Development
- Modular Design
- Reusable Components
- Clean Architecture
- Type Safety
- Scalability
- Security by Default

---

# Frontend Architecture

The frontend is divided into three layers.

```

Presentation

↓

Business Logic

↓

API Layer

```

---

## Presentation Layer

Contains

- Pages
- Layouts
- Components

Responsibilities

- Render UI
- Handle interactions
- Display data

Never perform business logic.

---

## Business Layer

Contains

- Feature services
- Custom hooks
- Validation
- State coordination

Responsibilities

- Transform data
- Manage workflows
- Prepare requests

---

## API Layer

Responsible only for communication.

Example

```

ProductService

↓

GET /products

POST /products

PUT /products

```

No UI code.

---

# Backend Architecture

Backend follows:

```

Route

↓

Controller

↓

Service

↓

Repository

↓

Supabase

```

---

## Routes

Responsibilities

- Register endpoints
- Apply middleware
- Forward requests

No business logic.

---

## Controllers

Responsibilities

- Receive request
- Validate request
- Call service
- Return response

Controllers remain thin.

---

## Services

The heart of the application.

Responsibilities

- Business rules
- Validation
- Calculations
- Workflows
- Permissions

No database queries.

---

## Repository Layer

Responsibilities

- Execute database operations
- Encapsulate Supabase access
- Return typed data

Only repositories communicate with Supabase.

---

# Database Architecture

Primary Database

Supabase PostgreSQL

Architecture

```

Application

↓

Repository

↓

Supabase

↓

PostgreSQL

```

---

## Database Standards

Every table must include

- id (UUID)
- created_at
- updated_at

Recommended

- created_by
- updated_by
- deleted_at

Soft delete preferred.

---

# Authentication

Authentication Provider

Supabase Auth

Supported

- Email & Password
- Session Management
- Password Reset
- JWT

Authentication should never be custom-built.

---

# Authorization

Authorization uses RBAC.

```

User

↓

Role

↓

Permissions

↓

Feature Access

```

Permissions are evaluated on both

Frontend

and

Backend.

Never rely on frontend permissions alone.

---

# Feature Architecture

Every business module is isolated.

Example

```

Production

↓

Components

Services

Hooks

Pages

Types

```

Modules should communicate through APIs rather than importing each other's internal logic.

---

# UI Architecture

```

Layout

↓

Page

↓

Feature

↓

Reusable Components

```

Reusable components should not contain feature-specific logic.

---

# State Management

Local UI State

React State

Server State

TanStack Query

Global State

Context (only when necessary)

Avoid unnecessary global state.

---

# API Design

RESTful API

Example

```

GET    /api/products

POST   /api/products

PUT    /api/products/:id

DELETE /api/products/:id

```

Responses must follow a consistent structure.

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
  "message": "..."
}
```

---

# Validation Strategy

Frontend

React Hook Form + Zod

↓

Backend

Zod

↓

Database

Constraints + RLS

Validation must exist at multiple layers.

---

# Error Handling

Errors should flow consistently.

```

Repository

↓

Service

↓

Controller

↓

Client

```

Never expose internal implementation details.

---

# File Storage

Use Supabase Storage.

Store

- Images
- Product files
- Certificates
- Documents
- User avatars

Never store uploads in the application server.

---

# Notifications

Future notifications should use

Supabase Realtime

or

WebSockets

without changing existing architecture.

---

# Security

Every request must support

Authentication

↓

Authorization

↓

Validation

↓

Execution

↓

Logging

Never skip validation.

---

# Logging

Application logs should record

- Login
- Logout
- Errors
- Critical updates
- Data changes

Avoid logging sensitive information.

---

# Performance

Frontend

- Lazy loading
- Code splitting
- Optimized assets

Backend

- Pagination
- Indexed queries
- Efficient joins

Database

- Proper indexes
- Query optimization

---

# Scalability

The architecture must support

- Multi-company
- Multi-factory
- Multiple warehouses
- Multiple currencies
- Multiple languages
- Mobile applications
- AI modules
- Barcode systems
- RFID
- IoT integration

without major redesign.

---

# Public Website

The public website is completely separated from ERP functionality.

Responsibilities

- Branding
- Products
- Certifications
- Sustainability
- Contact

No internal business logic should exist here.

---

# ERP

ERP modules are protected.

Authentication required.

Role-based access required.

Each module owns its own features while following the shared architecture.

---

# AI Development Rules

AI agents must

✓ Follow this architecture

✓ Keep layers separate

✓ Use existing services

✓ Respect module boundaries

AI agents must never

✗ Bypass repositories

✗ Query Supabase directly from UI

✗ Place business logic in controllers

✗ Mix unrelated concerns

---

# Definition of Architecture Compliance

A feature is architecture compliant if

- Layers are respected
- Business logic is isolated
- Components are reusable
- Database access uses repositories
- API responses are consistent
- Authentication and authorization are enforced

---

# Long-Term Vision

This architecture is intended to support the TextTile ERP platform for many years of development.

Future features should extend this architecture rather than replace it.

Changes to architecture require project owner approval.

---

End of Document