# TextTile ERP
# Development Workflow

Version: 1.0

---

# Purpose

This document defines the official software development workflow for the TextTile ERP project.

Every developer and AI coding agent must follow this workflow.

The objective is to ensure predictable development, high code quality, and consistent documentation throughout the project.

---

# Development Philosophy

The project follows an iterative, module-based development process.

Every module should be:

- Planned
- Implemented
- Verified
- Documented
- Reviewed

before moving to the next module.

Never work on multiple unrelated modules simultaneously.

---

# Development Lifecycle

Every task follows this sequence.

```

Requirements

↓

Planning

↓

Architecture Review

↓

Implementation

↓

Verification

↓

Documentation

↓

Review

↓

Commit

↓

Next Task

```

No step may be skipped.

---

# Phase 1 — Understand Requirements

Before writing any code:

Read:

- PROJECT_OVERVIEW.md
- TECH_STACK.md
- FOLDER_STRUCTURE.md
- CODING_STANDARDS.md
- AI_AGENT_RULES.md
- Module README.md
- TASKS.md

Understand:

- Feature purpose
- Business requirements
- Existing implementation
- User flow
- API impact
- Database impact

If requirements are unclear:

Stop and ask.

Never guess.

---

# Phase 2 — Planning

Before implementation:

Create a short implementation plan.

Example:

```

Implement Login

1. Login page

2. Form validation

3. API endpoint

4. Authentication

5. Route protection

6. Testing

```

Only begin coding after planning.

---

# Phase 3 — Architecture Review

Before creating files:

Check:

- Does a similar component already exist?
- Can an existing hook be reused?
- Does a utility already solve this?
- Is a new dependency required?
- Is the folder correct?

Avoid duplicate implementations.

---

# Phase 4 — Implementation

Implementation should follow:

Small commits.

Small components.

Small functions.

Single responsibility.

Keep changes focused.

Avoid unrelated refactoring.

---

# Phase 5 — Verification

Before considering work complete:

Run:

```

npm run lint

npm run build

```

Verify:

- TypeScript passes
- ESLint passes
- No console errors
- No runtime errors
- Responsive layout
- Loading state
- Error state
- Empty state

---

# Phase 6 — Documentation

If implementation changes:

Update:

README.md

TASKS.md

ACCEPTANCE.md

Any relevant project documentation.

Documentation is part of the deliverable.

---

# Phase 7 — Review

Review:

Code quality

Naming

Folder placement

Reusability

Performance

Accessibility

Security

Remove:

Unused imports

Dead code

Debug statements

Temporary comments

---

# Phase 8 — Completion Report

When reporting work complete, include:

## Completed

List completed work.

## Verification

State:

- Lint passed
- Build passed
- TypeScript passed

## Remaining Work

List pending items.

## Risks

Identify known issues.

Do not simply say:

"Done"

---

# Module Workflow

Every module follows:

```

README

↓

TASKS

↓

Implementation

↓

Verification

↓

Acceptance

↓

Documentation

↓

Complete

```

---

# Feature Workflow

Every feature follows:

```

Design

↓

Component

↓

API

↓

Database

↓

Testing

↓

Review

```

---

# Database Workflow

Never modify production tables directly.

Always:

Migration

↓

Review

↓

Apply

↓

Verify

↓

Document

---

# UI Workflow

For UI tasks:

1. Review Figma
2. Review PNG reference
3. Match spacing
4. Match typography
5. Match colors
6. Match responsive behavior
7. Verify visually

Never redesign without approval.

---

# API Workflow

For every endpoint:

Controller

↓

Service

↓

Repository

↓

Supabase

Never bypass layers.

---

# Error Handling Workflow

Every feature must support:

Loading

↓

Success

↓

Empty

↓

Error

↓

Recovery

---

# AI Decision Workflow

When unsure:

Identify problem.

↓

List possible solutions.

↓

Recommend one.

↓

Wait for approval.

Never invent requirements.

---

# Pull Request Checklist

Before merge:

- [ ] Feature complete
- [ ] Build successful
- [ ] ESLint passed
- [ ] TypeScript passed
- [ ] Responsive verified
- [ ] Accessibility reviewed
- [ ] Documentation updated
- [ ] Acceptance criteria satisfied

---

# Definition of Done

A task is complete only if:

- Implementation complete
- No build errors
- No lint errors
- Documentation updated
- Acceptance criteria satisfied
- Ready for production

Anything less is considered Work in Progress.

---

# Module Progress Tracking

Each module should maintain:

```

Planning        ✅

Development     ✅

Verification    ✅

Documentation   ✅

Acceptance      ✅

Completed       ✅

```

---

# Continuous Improvement

After every completed module:

Review:

- What went well?
- What can be improved?
- Can components be reused?
- Should documentation be updated?

Use lessons learned to improve future modules.

---

# Long-Term Goal

The goal is not to complete modules quickly.

The goal is to build an enterprise-grade ERP platform that remains maintainable, scalable, and reliable for many years.

Quality always takes priority over speed.

---

End of Document