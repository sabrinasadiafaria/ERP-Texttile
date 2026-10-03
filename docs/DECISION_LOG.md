# TextTile ERP
# Architecture Decision Log (ADR)

Version: 1.0

---

# Purpose

This document records important architectural and technical decisions made during the development of TextTile ERP.

It explains **why** a decision was made, not just **what** was chosen.

Every major architectural change should be documented here.

---

# Decision Record Format

Each decision follows this template.

---

## ADR-XXX

Status

Proposed | Approved | Deprecated | Replaced

Date

YYYY-MM-DD

Decision

Describe the decision.

Reason

Explain why.

Alternatives Considered

List alternatives.

Consequences

Advantages

Disadvantages

---

# ADR-001

Status

Approved

Date

2026-07-31

Decision

The frontend framework will be React using Vite and TypeScript.

Reason

React provides a mature ecosystem, strong TypeScript support, reusable components, and excellent long-term maintainability.

Vite provides significantly faster development builds than traditional bundlers.

Alternatives

- Next.js
- Angular
- Vue

Why Rejected

The project does not currently require server-side rendering.

React + Vite keeps deployment simple while allowing future migration if needed.

Consequences

Advantages

- Fast development
- Modern tooling
- Excellent community support

Disadvantages

- SEO handled separately for the public website if required

---

# ADR-002

Status

Approved

Decision

Tailwind CSS is the official styling framework.

Reason

Utility-first styling promotes consistency and rapid development.

Alternatives

- Bootstrap
- Material UI
- CSS Modules
- SASS

Why Rejected

They either introduce opinionated design systems or increase maintenance complexity.

Consequences

- Smaller CSS
- Faster development
- Consistent spacing system

---

# ADR-003

Status

Approved

Decision

shadcn/ui is the component foundation.

Reason

Provides accessible, customizable components without locking the project into a third-party design system.

Alternatives

- Material UI
- Ant Design
- Chakra UI

Why Rejected

The project requires a custom premium visual identity matching the approved designs.

---

# ADR-004

Status

Approved

Decision

Supabase will be used as the backend platform.

Reason

Supabase combines:

- PostgreSQL
- Authentication
- Storage
- Realtime
- Row Level Security

into a single managed platform.

Alternatives

- Firebase
- MongoDB Atlas
- Appwrite
- Self-hosted PostgreSQL

Consequences

Advantages

- Faster development
- Strong TypeScript support
- SQL database
- Enterprise features

---

# ADR-005

Status

Approved

Decision

Backend API will use Node.js + Express.

Reason

Provides flexibility while keeping the API lightweight.

Business logic remains under our control.

Alternatives

- NestJS
- Fastify

Why Rejected

Express has a lower learning curve and is sufficient for current project requirements.

---

# ADR-006

Status

Approved

Decision

The project follows a feature-based frontend architecture.

Reason

Features remain isolated, easier to maintain, and scalable.

Example

```
features/

products/

inventory/

warehouse/

production/
```

Advantages

- Better scalability
- Easier onboarding
- Clear ownership

---

# ADR-007

Status

Approved

Decision

Backend architecture follows

Route

↓

Controller

↓

Service

↓

Repository

↓

Supabase

Reason

Separates responsibilities and keeps business logic independent from database implementation.

---

# ADR-008

Status

Approved

Decision

Database access must only occur through repositories.

Reason

Prevents business logic from becoming tightly coupled to Supabase.

Future database changes become easier.

---

# ADR-009

Status

Approved

Decision

REST API is the official communication protocol.

Reason

Simple, widely supported, easy to debug.

Alternatives

GraphQL

gRPC

Why Rejected

REST better matches current project requirements.

---

# ADR-010

Status

Approved

Decision

Authentication uses Supabase Auth.

Reason

Avoid implementing custom authentication.

Benefits include:

- JWT
- Password reset
- Session handling
- Email verification

---

# ADR-011

Status

Approved

Decision

Role-Based Access Control (RBAC) will be used.

Reason

Permissions must be centrally managed and scalable.

Future roles can be added without architectural changes.

---

# ADR-012

Status

Approved

Decision

Landing website and ERP share the same design language.

Reason

The company should present one consistent visual identity across public and internal systems.

---

# ADR-013

Status

Approved

Decision

Every module must include documentation.

Required Files

README.md

TASKS.md

ACCEPTANCE.md

Reason

Documentation is treated as part of the software.

---

# ADR-014

Status

Approved

Decision

AI coding agents are contributors, not architects.

Reason

Architectural consistency is more important than autonomous optimization.

AI must follow existing standards unless explicitly instructed otherwise.

---

# Future Decisions

Record future architectural decisions here.

Examples

- Multi-tenancy
- Mobile application
- Barcode integration
- AI assistant
- RFID support
- IoT integration
- Multi-company support
- Deployment strategy changes

---

# Change Policy

Existing ADRs should never be edited to change history.

If a decision changes:

Create a new ADR.

Example

ADR-021

Status

Replaces ADR-004

Reason

Migration from Supabase to another backend.

This preserves project history and explains why changes occurred.

---

End of Document