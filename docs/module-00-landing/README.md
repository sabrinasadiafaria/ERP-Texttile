# Module 00
# Public Website (Landing Pages)

Version: 1.0

Status: Planning

---

# Module Overview

Module 00 is responsible for building the complete public-facing corporate website for TextTile.

This module is completely independent from the ERP.

Visitors should never see ERP functionality.

The website should communicate:

- Premium Manufacturing
- Innovation
- Trust
- Sustainability
- Engineering Excellence

The implementation must closely follow the approved Figma design and exported PNG assets.

---

# Objectives

Build a responsive, production-ready marketing website.

The website should:

- Represent the company's brand.
- Showcase manufacturing capabilities.
- Present products professionally.
- Display certifications.
- Highlight sustainability initiatives.
- Provide contact methods.
- Prepare visitors for future buyer engagement.

---

# Scope

Included

- Navigation
- Home Page
- Products
- Capabilities
- Sustainability
- Certifications
- Contact
- Footer
- Responsive Design
- Animations

Not Included

- ERP
- Authentication
- Dashboard
- User Profiles
- Admin Features
- Inventory
- Orders

Those belong to later modules.

---

# Design Reference

Official design files

```
assets/

Home Page.png

Product.png

Capabilities.png

Sustainability.png

Certifications.png

Get in Touch.png
```

These files are the official visual reference.

Do not redesign layouts.

---

# Technology

Frontend

React

Vite

TypeScript

TailwindCSS

shadcn/ui

Framer Motion

Backend

Node.js

Express

Supabase

---

# Routing

```
/

/products

/capabilities

/sustainability

/certifications

/contact
```

---

# Navigation

Navigation should include

Logo

Home

Products

Capabilities

Sustainability

Certifications

Contact

CTA Button

Navigation should remain consistent across all pages.

---

# Responsive Requirements

Desktop

1920

1440

1280

Laptop

1024

Tablet

768

Mobile

390

320

No horizontal scrolling.

---

# Layout

Every page should follow:

Hero

↓

Content

↓

CTA

↓

Footer

Maintain consistent spacing.

---

# Components

The module should build reusable components.

Examples

```
Navbar

Footer

Hero

Button

SectionTitle

Container

PageHeader

StatisticCard

FeatureCard

CertificationCard

ProductCard

ContactForm

Timeline

ImageGallery
```

Avoid duplicated UI.

---

# Images

Use optimized images.

Preserve aspect ratio.

Never stretch images.

Support lazy loading.

---

# Animations

Use Framer Motion.

Allowed

Fade

Slide

Scale

Hover

Counter Animation

Avoid

Complex timelines

Heavy motion

Parallax

Animation should enhance usability.

---

# Accessibility

Every page must support

Keyboard navigation

Screen readers

Visible focus states

Semantic HTML

Color contrast

Target Lighthouse Accessibility ≥ 95.

---

# Performance

Target

Performance ≥ 90

Accessibility ≥ 95

SEO ≥ 95

Best Practices ≥ 95

Optimize

Images

Fonts

Bundles

Rendering

---

# SEO

Each page should include

Unique title

Meta description

Open Graph tags

Structured headings

Semantic HTML

---

# Browser Support

Latest versions of

Chrome

Edge

Firefox

Safari

---

# Coding Standards

Follow

PROJECT_OVERVIEW.md

TECH_STACK.md

ARCHITECTURE.md

CODING_STANDARDS.md

UI_GUIDELINES.md

AI_AGENT_RULES.md

No exceptions.

---

# Acceptance Criteria

Module 00 is complete only when

✓ Every page matches the approved design.

✓ Responsive on all supported devices.

✓ Lighthouse targets achieved.

✓ Build passes.

✓ Lint passes.

✓ Documentation updated.

✓ No TypeScript errors.

✓ No console errors.

---

# Deliverables

React application

Reusable components

Responsive layouts

Optimized assets

Animations

SEO metadata

Documentation

---

# Future Integration

The navigation should be designed so future ERP authentication can be added without redesign.

Reserve space for

Login

Portal

Language Selector

if required later.

---

# AI Instructions

Before implementation

1. Read all project documentation.

2. Inspect the assets.

3. Build reusable components first.

4. Build pages second.

5. Verify responsiveness.

6. Run lint.

7. Run build.

8. Update documentation.

Never skip verification.

---

End of Document