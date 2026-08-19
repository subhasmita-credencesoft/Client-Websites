# Welcome To Hotel Hari International — UI Guidelines

Token-driven, implementation-ready design guidance for the Hotel Hari International marketing site, targeting WCAG 2.2 AA. Companion to the shipped Next.js + TypeScript + SCSS codebase (`/hotel-hari-international`).

---

## 1. Context and Goals

**Design intent:** Give buyers, teams, and decision-makers evaluating Hotel Hari International (Chakradharpur, Jharkhand) a fast, trustworthy, accessible path from "who is this hotel" to "book a room," across a small, content-dense marketing site (1 nav, 6 buttons, 5 inputs, 16 lists, 53 links per the known page inventory).

**Confidence note:** Audience/product-surface inference was flagged low-confidence in the brief. This guidance was cross-checked against the live site (`hhickp.com`): it is a single-property hotel marketing site selling room bookings and a banquet hall to leisure/business travelers and event organizers — closer to "local hospitality buyer" than an enterprise SaaS "decision-maker." Component and content guidance below is written for that audience; revisit if the intended audience differs.

---

## 2. Design Tokens and Foundations

All values below are the single source of truth (`src/styles/_tokens.scss`). Components **must** reference tokens by name; raw hex/px/ms values in component code are a shipped defect.

### 2.1 Typography

| Token | Value |
|---|---|
| `font.family.primary` / `font.family.stack` | Montserrat, system sans-serif fallback |
| `font.size.base` | 16px |
| `font.weight.base` | 400 |
| `font.lineHeight.base` | 26px |
| `font.size.xs…4xl` | 12 / 13 / 15 / 16 / 18 / 20 / 25 / 36 px |

Scale usage: `4xl` page H1 only; `3xl` section H2; `2xl` card/aside H3; `xl` H4 and button label; `lg` body/base; `md` secondary body/labels; `sm` meta/eyebrow; `xs` legal/caption.

### 2.2 Color — semantic usage rules (as supplied, contrast-verified)

| Token | Value | Verified contrast | Rule |
|---|---|---|---|
| `color.text.primary` | `#70717b` | 4.84:1 on white; **4.45:1 on surface.strong (fails AA)** | **Must** use on `surface.page` only, for placeholder/caption/meta text ≤ `font.size.sm`. **Must not** use as body text on `surface.strong`. |
| `color.text.secondary` | `#1f3347` | 11.9–12.9:1 on white and surface.strong | Default color for all body text and headings. |
| `color.border.strong` | `#9a4a34` | 6.17:1 on white | Brand accent: links, primary CTA fill, focus ring, active/selected state. |
| `color.text.inverse` | `#ffffff` | 21:1 on `surface.base` | Text/icons on dark or photographic surfaces only. |
| `color.surface.base` | `#000000` | — | Reserved for footer and hero photo scrim. **Must not** be used as the default page background. |
| `color.surface.strong` | `#f8f5f0` | — | Section banding / card fills against `surface.page`. |

**Extended tokens** (required for a working UI, not in the original brief; flag for design sign-off): `surface.page` (#ffffff), `border.subtle` (#e4e0d8), `border.strong.hover` (#7e3c29), `state.error` (#b3261e), `state.error.bg` (#fbeceb), `state.success` (#2e6b34), `state.success.bg` (#eaf3ea), `overlay.scrim` (rgba(0,0,0,.55)), `focus.ring` (alias of `border.strong`).

### 2.3 Spacing

Supplied scale `space.1`–`space.8` (5/6/8/10/15/16/20/24px) governs micro-spacing (component padding, gaps between related elements). Extended macro tokens `space.9`–`space.13` (32/40/56/72/96px) govern section rhythm and page-level gutters. **Must not** introduce spacing values outside this combined set.

### 2.4 Radius, shadow, motion

- `radius.xs` 4px (inputs, chips, focus-ring corner), `radius.sm` 5px (buttons), extended `radius.md` 8px (cards, media).
- `shadow.1` for resting elevation is intentionally unused at rest (pure black shadow reads harshly on a light UI) — reserved for high-emphasis states. `shadow.2` is the default hover/elevated-card shadow.
- `motion.duration.instant/fast/normal/slow` (150/200/300/500ms) map to: micro press-state (instant), hover color/border transitions (fast), card elevation and image reveals (normal), spinners (slow, looped). All motion **must** respect `prefers-reduced-motion`.

---

## 3. Component-Level Rules

Anatomy, variants, and state matrix for every shipped component. State coverage (default/hover/focus-visible/active/disabled/loading/error, where applicable) is implemented in code, not just documented here.

### 3.1 Button (6 instances on the page)

- **Variants:** `primary` (filled `border.strong`, inverse text — main CTA, one per view: "Book Now"), `secondary` (outlined `border.strong`), `ghost` (text-only, low emphasis: "View More"), `inverse` (outlined white, for use over photography).
- **Anatomy:** optional leading spinner + label. Min height `touch.target.comfortable` (44px).
- **States:** default; hover (fast-duration color/background shift); focus-visible (2px `focus.ring` outline, 2px offset — never removed without this replacement); active (1px translateY press); disabled (0.5 opacity, `cursor: not-allowed`, `aria-disabled`); loading (spinner + `aria-busy`, label stays visible for context).
- **Keyboard:** reachable via Tab, activates on Enter/Space (native `<button>`) or Enter (native `<a>`/`Link`). Disabled/loading buttons are removed from the interaction result but remain focusable-visible, never hidden.
- **Pointer/touch:** 44×44px minimum hit area at all breakpoints; no hover-only affordance — every hover state has a focus-visible equivalent.
- **Responsive/edge cases:** long labels wrap rather than truncate (buttons are short-copy by convention — "Book Now," "Send Message"); `fullWidth` variant for stacked mobile forms.
- **Internal vs external targets:** `href` starting with `/` or `#` renders as an in-app `Link` (client-side nav); any other `href` renders as `<a target="_blank" rel="noopener noreferrer">` (e.g., the third-party booking engine) so external hand-offs are explicit to the user and don't leak `window.opener`.

### 3.2 Text Field / Text Area (5 instances: name, email, phone, message + implicit search-free contact form)

- **Anatomy:** label (always visible, never placeholder-only) + control + optional hint + optional error.
- **States:** default (`border.subtle`); hover (`border.strong`); focus-visible (2px `focus.ring` outline); active/typing (native caret, no custom override); disabled (`surface.strong` fill, 0.7 opacity); error (`state.error` border + tinted background + `role="alert"` message).
- **Keyboard:** standard Tab order; no keyboard traps; Enter in a single-line field does not submit unless it's the last field before the submit button (native browser behavior, unmodified).
- **Validation:** required fields marked with a visible `*` plus `aria-required`; errors are field-adjacent (`aria-describedby`) and screen-reader announced, never color-only.
- **Edge cases:** textarea min-height 120px with vertical resize; long pasted content is not truncated; empty-submit is blocked client-side with a field-level error, not a silent no-op.

### 3.3 Navigation (1 instance)

- **Anatomy:** logo/home link, primary link list, primary CTA ("Book Now"), mobile disclosure toggle.
- **States:** link default/hover/focus-visible (underline-on-hover + color shift, never color-alone); current-section indication reserved for future scroll-spy enhancement (not yet implemented — see anti-patterns).
- **Keyboard:** logo → links → CTA → toggle is the tab order; **Escape** closes the open mobile menu and is handled at the `<nav>` level; a **skip-to-content** link is the first focusable element on every page.
- **Responsive:** link list collapses to a full-width disclosure panel below `breakpoint.lg` (1024px); toggle button is a 44×44px hit target with `aria-expanded`/`aria-controls`.
- **Density note:** with 53 links total on the page, only wayfinding links (4) plus the CTA belong in primary nav; the remaining links (room "View More," gallery, footer, tel/mailto) live in-content, not in the nav, to keep the nav scannable.

### 3.4 Room Card (list item, repeated per the 16-list inventory)

- **Anatomy:** media (4:3, `radius.md`), title (linked), 3-line-clamped summary, amenity chip list, two CTAs ("Book Now" primary, "View More" ghost).
- **States:** card hover raises `shadow.2`; title link and CTAs each carry their own focus-visible ring (no nested-interactive violations — the card itself is not a link).
- **Long content/overflow:** title is not clamped (short by data contract); summary clamps to 3 lines (`-webkit-line-clamp`) with no "read more" affordance inline — full detail lives on the room's own page.
- **Empty state:** if the room collection is empty, the grid renders a single centered message ("Room information is being updated…") instead of an empty grid — never a blank section.

### 3.5 Gallery grid / list components

- Images use `alt` text describing the specific room/space, not filenames; grid items are non-interactive on the homepage (visual only) — this is intentional restraint, not a missing feature; a future lightbox must preserve keyboard operability (Enter/Space to open, Escape to close, focus returned to the trigger).

---

## 4. Accessibility Requirements and Acceptance Criteria

Target: **WCAG 2.2 AA**, testable pass/fail per criterion.

| # | Rule | Pass condition | Fail condition |
|---|---|---|---|
| A1 | Text contrast | Body/heading text ≥ 4.5:1; large text (≥24px or ≥19px bold) ≥ 3:1, measured against its actual rendered background | Any `text.primary` on `surface.strong`; any custom color not in the verified table in §2.2 |
| A2 | Focus visibility | Every interactive element shows a ≥3:1-contrast, ≥2px outline on keyboard focus, distinguishable from hover | `outline: none` without a replacement; focus ring hidden by `overflow: hidden` on an ancestor |
| A3 | Keyboard operability | All actions (nav, form submit, menu toggle) completable with Tab/Shift+Tab/Enter/Space/Escape alone | Any control reachable only by pointer/hover; any keyboard trap |
| A4 | Touch target size | Interactive controls ≥ 24×24px CSS px, with primary controls ≥ 44×44px | Buttons/links smaller than 24px with insufficient spacing to neighbors |
| A5 | Labels and names | Every input has a persistent, programmatically-associated `<label>`; every icon-only control has an `aria-label` | Placeholder-as-label; unlabeled icon buttons |
| A6 | Error identification | Errors are described in text, linked via `aria-describedby`, and announced via `role="alert"` or a live region | Color-only error indication; errors that don't reach assistive tech |
| A7 | Motion sensitivity | All non-essential transitions/animations are removed or reduced under `prefers-reduced-motion: reduce` | Spinners/parallax/scroll-behavior that ignore the media query |
| A8 | Landmark structure | One `<header>`, one `<main>`, one `<footer>`; one `<h1>` per page; heading levels do not skip | Sections built from `<div>` soup with no landmark roles; H1 → H3 skip |
| A9 | Link purpose | Link text is understandable out of context ("View the Deluxe Room" beats a bare "View More" without an accessible-name suffix) | Multiple links on one page reading identically ("Read more," "Read more," …) with no distinguishing accessible name |

---

## 5. Content and Tone Standards

Voice: concise, confident, implementation-focused — plain verbs, no filler, one job per element.

**Do:**
- Name the action and its object: *"Book Now"* (not *"Submit"*), *"Send Message"* (not *"Go"*).
- Keep CTA vocabulary consistent end-to-end: the button that says "Send Message" must lead to a confirmation that says the message was sent, not "your request was processed."
- Write room summaries around who they're for and what's included: *"Cozy and well-equipped, our Standard Rooms are ideal for 2 guests."*
- Write errors as instructions, not apologies: *"Enter your name and email so we can reply."*

**Don't:**
- Don't use ambiguous labels: a bare *"More"*, *"Click Here"*, or *"#"* href is a shipped defect.
- Don't invent urgency or filler ("Amazing offer, book today!!") — the brand's credibility is functional, not promotional.
- Don't let two different words describe the same action in the same flow (e.g., "Reserve" on one screen and "Book" on the next).

---

## 6. Anti-Patterns and Prohibited Implementations

- **No raw hex/px/ms in component styles.** Every value traces to a token in `_tokens.scss`.
- **No color-only signal.** Errors, required fields, and links must carry a non-color cue (icon, underline, text) in addition to color.
- **No placeholder-as-label.** Placeholders may hint at format ("you@example.com"); they never replace the `<label>`.
- **No `outline: none` without a replacement focus style.**
- **No nested interactive elements** (e.g., a `<button>` inside an `<a>`, or a card that is simultaneously a link and contains its own links) — the Room Card pattern in §3.4 is the reference implementation.
- **No dead or placeholder hrefs (`href="#"`) on production content links.** Every room in the data layer either points to a real detail route or, until content exists, is excluded from the grid rather than linking nowhere.
- **No one-off spacing/typography exceptions.** If a design need doesn't fit the scale, it's a signal to add a token deliberately (with sign-off), not to hardcode a value once.
- **No motion that ignores `prefers-reduced-motion`.**
- **No full-page use of `surface.base` (black)** — it is a high-emphasis accent surface (footer, hero scrim), not a page background; using it globally would force every other token's contrast math to be re-verified against black instead of white.

---

## 7. QA Checklist

**Tokens & consistency**
- [ ] No raw hex/px/ms values found in component SCSS (grep for `#[0-9a-f]{3,6}` outside `_tokens.scss`)
- [ ] All spacing values trace to `space.1`–`space.13`
- [ ] All type sizes trace to `font.size.xs`–`4xl`

**Accessibility (WCAG 2.2 AA)**
- [ ] Automated scan (axe or equivalent) run against every page template — zero critical/serious issues
- [ ] Keyboard-only pass: complete a booking hand-off and a contact-form submission using only keyboard
- [ ] Every focus-visible ring is visually confirmed on light, dark, and photographic backgrounds
- [ ] Screen reader pass (VoiceOver or NVDA): nav, room cards, and contact form announce correctly
- [ ] `prefers-reduced-motion: reduce` verified in browser dev tools — spinners/scroll/image-hover transitions stop
- [ ] Color contrast re-verified for any new token pairing before merge (see §2.2 method)

**Component states**
- [ ] Every interactive component demonstrates default/hover/focus-visible/active/disabled states in Storybook or equivalent
- [ ] Loading and error states verified for the contact form (slow network + forced failure)
- [ ] Empty-state verified for the rooms grid (zero-room data fixture)

**Responsive**
- [ ] 375px, 768px, 1024px, 1440px breakpoints visually reviewed for every template
- [ ] Mobile nav: toggle opens/closes via pointer and keyboard; Escape closes and returns focus to the toggle

**Content**
- [ ] No link text reads "click here," "more," or "#" without a distinguishing accessible name
- [ ] CTA vocabulary consistent from trigger → confirmation across the booking and contact flows
