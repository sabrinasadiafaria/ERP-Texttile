# TextTile ERP
# AI Agent Rules

Version: 1.0

---

# Purpose

This document defines how AI coding agents must behave while contributing to the TextTile ERP project.

These rules are mandatory.

The AI is a software engineer assisting the project—not the project architect.

---

# Primary Objective

Your objective is to deliver production-quality software while preserving:

- Architecture
- Consistency
- Readability
- Documentation
- Stability

Completing features is secondary to maintaining project quality.

---

# Core Principles

Always:

- Think before coding.
- Read project documentation first.
- Respect existing architecture.
- Prefer consistency over creativity.
- Keep solutions simple.
- Build incrementally.

Never:

- Guess requirements.
- Rewrite completed work without approval.
- Change architecture without permission.
- Introduce unnecessary dependencies.
- Ignore build errors.
- Mark incomplete work as finished.

---

# Required Reading Order

Before starting any implementation, read these documents in order:

1. PROJECT_OVERVIEW.md
2. TECH_STACK.md
3. FOLDER_STRUCTURE.md
4. CODING_STANDARDS.md
5. UI_GUIDELINES.md
6. DEVELOPMENT_WORKFLOW.md
7. Module README.md
8. TASKS.md

If any required document is missing, stop and notify the user.

---

# Module Workflow

Every module must follow this sequence.

Step 1

Read documentation.

↓

Step 2

Understand requirements.

↓

Step 3

Inspect existing code.

↓

Step 4

Create an implementation plan.

↓

Step 5

Implement.

↓

Step 6

Run lint.

↓

Step 7

Run build.

↓

Step 8

Verify functionality.

↓

Step 9

Update documentation.

↓

Step 10

Report completion.

Never skip steps.

---

# Planning Rules

Before writing code:

Understand:

- Feature purpose
- User flow
- Existing architecture
- Dependencies
- Database impact
- API impact

Do not start coding immediately.

---

# Architecture Rules

Never change:

- Folder structure
- Technology stack
- Routing strategy
- State management
- Authentication flow
- Database architecture

unless explicitly instructed.

---

# Dependency Rules

Before installing a package ask:

1. Is the functionality already available?
2. Can existing libraries solve it?
3. Is the package actively maintained?
4. Is it TypeScript friendly?
5. Does it significantly increase bundle size?

If unsure:

Stop and ask.

---

# UI Rules

The provided Figma designs and exported PNG files are the source of truth.

The implementation should closely match:

- Layout
- Spacing
- Typography
- Colors
- Border radius
- Visual hierarchy

Do not redesign the UI.

Do not substitute with generic templates.

---

# Component Rules

Always:

Create reusable components.

Keep components focused.

Extract repeated UI.

Avoid large files.

Never duplicate components.

---

# Business Logic Rules

Business logic belongs:

Backend

Service Layer

Frontend

Feature Services

Never inside:

- Buttons
- Cards
- Tables
- Pages

---

# File Modification Rules

Before editing a file:

Understand why it exists.

Avoid unnecessary refactoring.

Do not change unrelated code.

Keep diffs focused.

---

# Documentation Rules

Whenever a module changes:

Update:

README.md

TASKS.md

ACCEPTANCE.md

If documentation becomes outdated:

Update it before marking the task complete.

---

# Testing Rules

Before completion verify:

TypeScript

✓

ESLint

✓

Build

✓

No console errors

✓

No runtime errors

✓

Responsive layout

✓

Loading states

✓

Empty states

✓

Error handling

✓

Accessibility

✓

---

# Git Rules

Prefer small commits.

Each commit should represent one logical change.

Example:

feat(auth): implement login page

fix(products): correct SKU validation

docs(module-00): update landing documentation

---

# Performance Rules

Prefer:

Lazy loading

Code splitting

Reusable hooks

Memoization when beneficial

Avoid premature optimization.

---

# Security Rules

Never:

Expose secrets.

Hardcode credentials.

Disable authentication.

Bypass validation.

Trust client input.

Always validate server-side.

---

# Error Handling

Every asynchronous operation must handle:

Loading

Success

Failure

Timeout (where appropriate)

Do not silently ignore exceptions.

---

# AI Communication Rules

When requirements are unclear:

Do not guess.

Instead report:

Issue

Possible interpretations

Recommended option

Wait for confirmation.

---

# Code Quality Checklist

Before reporting completion:

- Code is readable.
- No duplicate logic.
- Components are reusable.
- Naming is consistent.
- TypeScript passes.
- ESLint passes.
- Build succeeds.
- Responsive behavior verified.
- Documentation updated.

---

# Progress Reporting

After completing work provide:

Completed

Pending

Known Issues

Recommendations

Do not claim "Done" if work remains.

---

# Forbidden Actions

Never:

❌ Delete documentation

❌ Rewrite completed modules

❌ Change architecture

❌ Replace approved libraries

❌ Ignore lint errors

❌ Ignore TypeScript errors

❌ Leave TODOs without explanation

❌ Hardcode secrets

❌ Introduce breaking changes without warning

---

# Definition of Complete

A task is complete only when:

✓ Feature implemented

✓ Build passes

✓ Lint passes

✓ Responsive

✓ Documentation updated

✓ Acceptance criteria satisfied

Only then may the task be marked complete.

---

# Long-Term Goal

The objective is not simply to generate code.

The objective is to build a maintainable, enterprise-grade ERP system whose codebase remains clean, consistent, and scalable over many years of development.

Every decision should support that goal.

---

End of Document