# TextTile ERP
# UI Guidelines

Version: 1.0

---

# Purpose

This document defines the visual language of the TextTile platform.

It serves as the single source of truth for:

- Public Website
- ERP
- Future Mobile Applications
- Internal Dashboards

Every screen must follow these guidelines.

The objective is consistency, professionalism, and scalability.

---

# Brand Personality

The UI should communicate:

✓ Precision

✓ Manufacturing Excellence

✓ Professionalism

✓ Engineering

✓ Trust

✓ Premium Quality

✓ Modern Technology

✓ Simplicity

The interface should feel like enterprise software used by international textile manufacturers.

---

# Design Philosophy

The design follows a minimalist approach.

Less decoration.

More clarity.

Every element must have a purpose.

Whitespace is part of the design.

Avoid visual clutter.

---

# Source of Truth

The official design reference is located in:

docs/module-00-landing/assets/

The provided PNG exports are considered the visual reference until a newer approved Figma design replaces them.

Never redesign components without approval.

---

# Color Palette

## Primary

White

Used for

- Backgrounds
- Cards
- Forms

---

## Secondary

Dark Navy

Used for

- Hero sections
- Footer
- Navigation
- Dashboard sidebar
- Important headings

---

## Accent

Blue

Used for

- Buttons
- Active navigation
- Links
- Icons
- Highlights

Accent color should be used sparingly.

---

## Success

Green

Used only for

- Sustainability
- Success messages
- Completed status

---

## Warning

Amber

Used only for

- Pending
- Warning states

---

## Danger

Red

Used only for

- Errors
- Delete actions
- Critical alerts

---

# Visual Hierarchy

Every page should naturally guide the user's attention.

Priority:

1. Hero
2. Headline
3. CTA
4. Supporting content
5. Secondary information
6. Footer

Never compete with the main message.

---

# Typography

Style

Modern

Clean

Readable

Professional

Hierarchy

Display

↓

Heading

↓

Subheading

↓

Body

↓

Caption

Avoid excessive font sizes.

Use consistent spacing between headings and content.

---

# Grid System

Use a consistent responsive grid.

Desktop

12 Columns

Tablet

8 Columns

Mobile

4 Columns

Content should align consistently across pages.

---

# Spacing

Spacing should feel generous.

Preferred spacing scale:

4

8

12

16

24

32

48

64

96

Avoid arbitrary spacing values.

---

# Border Radius

Cards

Medium

Buttons

Medium

Inputs

Medium

Dialogs

Large

Maintain consistency.

Avoid mixing different corner radii.

---

# Shadows

Use soft shadows.

Purpose:

Separate surfaces.

Never create dramatic floating effects.

Shadow should be subtle.

---

# Cards

Cards are the primary content container.

Characteristics:

- White background
- Rounded corners
- Soft shadow
- Comfortable padding
- Clear hierarchy

Cards should never appear crowded.

---

# Buttons

Primary

Blue background

White text

Rounded corners

Hover state

---

Secondary

Outlined

Minimal

Used for secondary actions.

---

Danger

Red

Used only for destructive actions.

---

Rules

Buttons must have:

Hover state

Focus state

Disabled state

Loading state

---

# Forms

Forms should be clean.

Fields require:

- Label
- Placeholder
- Validation message
- Focus state
- Error state

Avoid unnecessary fields.

---

# Tables

Tables should prioritize readability.

Requirements

Sticky header (when appropriate)

Hover row

Sorting

Filtering

Pagination

Responsive behavior

Avoid excessive borders.

---

# Navigation

Top navigation

Simple

Minimal

Large spacing

Clear active state

---

ERP Sidebar

Collapsible

Icon + Label

Grouped menus

Current page highlighted

---

# Icons

Official icon library

Lucide React

Only one icon style should exist.

Avoid mixing icon libraries.

---

# Images

Use:

Professional factory photography

High resolution

Consistent aspect ratio

Avoid:

Low-quality images

Stock photos that do not represent the company

Pixelated assets

---

# Animations

Animations should be subtle.

Examples

Fade

Slide

Scale

Hover elevation

Counter animation

Avoid

Large rotations

Long transitions

Flashy effects

Animation should support usability.

---

# Motion Timing

Fast

Hover

Medium

Page transition

Slow

Never

The interface should always feel responsive.

---

# Responsive Design

Desktop First

Support:

Desktop

Laptop

Tablet

Mobile

Content should never overflow.

Navigation should adapt gracefully.

---

# Dashboard Design

ERP dashboards should inherit the website's design language.

Use:

White cards

Dark sidebar

Blue highlights

Simple charts

Generous spacing

Avoid:

Generic admin templates

Heavy gradients

Neon colors

Glassmorphism

---

# Charts

Use clean charts.

Minimal colors.

Avoid unnecessary 3D effects.

Prioritize readability.

---

# Empty States

Every empty page should include:

Illustration (optional)

Title

Helpful description

Primary action

Never leave blank screens.

---

# Loading States

Use:

Skeleton loaders

Progress indicators

Loading buttons

Avoid flashing layouts.

---

# Error States

Friendly message

Explanation

Recovery action

Retry button

Never expose technical errors to end users.

---

# Accessibility

Target Lighthouse Accessibility ≥ 95.

Requirements:

Keyboard navigation

Visible focus states

Color contrast

Semantic HTML

Screen reader support

---

# Consistency Rules

Every page should feel like part of the same application.

Consistency applies to:

Spacing

Typography

Colors

Buttons

Cards

Forms

Tables

Icons

Navigation

Animations

---

# Do

✓ Use whitespace generously

✓ Build reusable components

✓ Match the provided designs closely

✓ Keep layouts clean

✓ Use meaningful icons

✓ Design for readability

---

# Don't

✗ Use Bootstrap styling

✗ Use Material UI styling

✗ Add unnecessary gradients

✗ Use random colors

✗ Mix border radius values

✗ Use inconsistent spacing

✗ Introduce multiple design styles

✗ Build pages that don't match the approved visual language

---

# Future Expansion

These guidelines should also apply to:

- ERP Modules
- Mobile Apps
- Admin Portal
- Customer Portal
- Supplier Portal
- Reporting Dashboard

This ensures the entire TextTile ecosystem maintains a unified visual identity.

---

# Final Principle

When making a design decision, ask:

"Does this look like it belongs in the approved TextTile Figma designs?"

If the answer is no,

do not implement it.

---

End of Document