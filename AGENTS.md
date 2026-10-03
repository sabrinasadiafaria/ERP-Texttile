# AGENTS.md

# TextTile ERP Repository Guide

Version: 1.0

---

# Welcome

You are contributing to the TextTile ERP project.

This repository contains:

- Public Website
- ERP
- Backend API
- Database
- Shared UI Library

Your responsibility is to implement requested features while preserving the project's architecture and coding standards.

---

# Before Doing Anything

Read these documents in order:

1. docs/PROJECT_OVERVIEW.md
2. docs/TECH_STACK.md
3. docs/ARCHITECTURE.md
4. docs/FOLDER_STRUCTURE.md
5. docs/CODING_STANDARDS.md
6. docs/UI_GUIDELINES.md
7. docs/AI_AGENT_RULES.md
8. docs/DEVELOPMENT_WORKFLOW.md
9. docs/DECISION_LOG.md

If working inside a module:

Read every document inside that module before writing code.

---

# Repository Philosophy

Quality over speed.

Consistency over cleverness.

Reuse over duplication.

Architecture over shortcuts.

---

# Technology Stack

Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query

Backend

- Node.js
- Express

Database

- Supabase PostgreSQL

---

# Development Rules

Always

✓ Build reusable components

✓ Keep files small

✓ Follow feature-based architecture

✓ Verify before reporting success

✓ Update documentation

Never

✗ Change architecture

✗ Ignore build errors

✗ Guess requirements

✗ Rewrite completed modules

✗ Add unnecessary dependencies

---

# Development Workflow

Plan

↓

Implement

↓

Verify

↓

Document

↓

Report

---

# Verification Checklist

Before completion:

- npm run lint
- npm run build
- TypeScript passes
- Responsive verified
- No console errors

---

# Documentation

Documentation is part of the deliverable.

Whenever code changes:

Update

README

TASKS

PROGRESS

CHANGELOG

ACCEPTANCE

if applicable.

---

# Communication

If requirements are unclear:

Stop.

Explain the issue.

Recommend options.

Wait for approval.

Never guess.

---

# Success

Your objective is not merely to produce code.

Your objective is to build a maintainable, enterprise-grade ERP platform that can evolve over many years without architectural degradation.

End of Document