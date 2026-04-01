# Production File Structure Guide

## Current Approach

The codebase already follows a good high-level split:

- `app/` handles routes
- `components/features/` handles feature composition
- `components/ui/` handles reusable primitives
- `lib/data/` stores content and page data
- `lib/hotelmate/` isolates booking integration
- `store/` contains shared client state

## Recommended Boundaries

### `app/`

Use route files only for:

- metadata
- route params/search params
- server/client boundary setup
- composing feature modules

Avoid placing long presentation logic or large data collections directly in route files.

### `components/features/`

Use for:

- route-level page components
- feature sections
- domain-specific display logic

Avoid importing route files from here.

### `components/ui/`

Use for:

- generic cards
- buttons
- headings
- shared visual primitives

Avoid coupling these components to page copy, route names, or booking-specific data.

### `lib/data/`

Use for:

- static content
- page data objects
- repeatable copy structures

Avoid fetch logic or browser-only code here.

### `lib/hotelmate/`

Use for:

- API URL builders
- response mapping
- integration-specific types

Keep vendor-specific logic isolated here instead of spreading it through page components.

### `store/`

Use for:

- app-wide client state
- slices/selectors/action creators

Avoid putting static content or route definitions into Redux.

## Safe Growth Path

For future production refactors, use this order:

1. Add or use barrel exports.
2. Add folder README or architecture notes.
3. Extract shared types/helpers into `lib/`.
4. Move modules only after import coverage is clear.

This avoids risky route or data breakage while still improving maintainability.
