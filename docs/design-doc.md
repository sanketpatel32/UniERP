# Frontend Style System Design Doc

Design Doc Version: `1.0.0`  
Last Updated: `2026-02-23`  
Audience: `Engineering Team`  
Status: `Approved Baseline`

## 1. Purpose

This document defines the canonical frontend style system for this repository.  
It is the single source of truth for visual consistency, dark-theme behavior, design tokens, component styling contracts, and PR-level compliance.

This specification is intentionally AI-readable and engineering-first:
- Every enforceable requirement is written with `MUST`, `MUST NOT`, `SHOULD`, or `MAY`.
- Rules are identified by stable IDs.
- Components map directly to semantic tokens.

## 2. Scope and Non-Goals

In scope:
- Semantic design token definitions for colors, spacing, typography, radius, shadows, motion, and z-index.
- Dark-theme-first visual language.
- Full UI kit styling rules and states.
- Accessibility baseline (WCAG AA).
- Tailwind v4 + Next.js implementation snippets.
- PR compliance and governance workflow.

Out of scope for v1:
- Light theme production styling.
- Brand redesign and logo system.
- Runtime theming engine implementation.
- Third-party component library migration details.
- Pixel-perfect screen mocks.

## 3. Mandatory Rules for AI and Engineers

### 3.1 AI Execution Contract

- `R-AI-001` Generated UI code `MUST` conform to this document before it is considered complete.
- `R-AI-002` If generated code violates any `MUST` or `MUST NOT` rule, generation output `MUST` be treated as failed and revised.
- `R-AI-003` Generated code `MUST NOT` introduce raw, undocumented visual values (for example hard-coded hex colors or arbitrary spacing) in component markup.
- `R-AI-004` Generated code `SHOULD` reference semantic tokens and documented component patterns first, then add minimal custom styles only when explicitly approved.

### 3.2 Global Enforcement Rules

| Rule ID | Requirement |
| --- | --- |
| `R-COLOR-001` | Visual color usage `MUST` come from `color.*` or `text.*` semantic tokens. |
| `R-COLOR-002` | Raw hex values in JSX/TSX/class strings `MUST NOT` be used for production components. |
| `R-SPACE-001` | Spacing `MUST` use `space.*` scale tokens only. |
| `R-TYPE-001` | Typography `MUST` use Geist Sans and Geist Mono token mappings. |
| `R-COMP-001` | UI primitives `MUST` follow component rule matrix definitions in Section 9. |
| `R-MOTION-001` | Motion `MUST` use subtle durations/easing from `motion.*` tokens. |
| `R-A11Y-001` | All production UI states `MUST` meet WCAG AA contrast and visible focus requirements. |
| `R-GOV-001` | UI pull requests `MUST` include a completed checklist from Section 12. |

## 4. Theme Policy

- `R-THEME-001` Dark theme is the default and required production theme for v1.
- `R-THEME-002` Light theme is out of scope for v1 and `MUST NOT` be optimized in implementation work unless a separate design-doc version is approved.
- `R-THEME-003` Components `MUST` consume semantic tokens, not direct palette values.
- `R-THEME-004` Surfaces `SHOULD` preserve clear elevation hierarchy: canvas -> surface -> elevated -> overlay.

## 5. Design Tokens (Canonical)

### 5.1 Token Naming Contract

All style tokens `MUST` follow these prefixes:
- `color.*` for surfaces, borders, accents, states
- `text.*` for typography color semantics
- `space.*` for spacing scale
- `radius.*` for corner radii
- `shadow.*` for elevation depth
- `motion.*` for durations/easing
- `z.*` for layer order

### 5.2 Color Tokens

#### 5.2.1 Surface and Border Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `color.bg.canvas` | `#0B1120` | App/page background |
| `color.bg.surface` | `#111827` | Primary containers |
| `color.bg.elevated` | `#1F2937` | Elevated cards/panels |
| `color.bg.overlay` | `rgba(2, 6, 23, 0.72)` | Modal/drawer overlay |
| `color.border.default` | `#334155` | Standard borders |
| `color.border.strong` | `#475569` | Emphasized separators |
| `color.border.focus` | `#3B82F6` | Focus ring color |

#### 5.2.2 Text Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `text.primary` | `#F8FAFC` | Main text |
| `text.secondary` | `#CBD5E1` | Supporting text |
| `text.muted` | `#94A3B8` | Meta and tertiary text |
| `text.disabled` | `#64748B` | Disabled labels/content |
| `text.inverse` | `#020617` | Text on light/accent surfaces |
| `text.link` | `#60A5FA` | Links and interactive text |

#### 5.2.3 Accent Blue Scale

| Token | Value | Usage |
| --- | --- | --- |
| `color.accent.blue.300` | `#93C5FD` | Subtle emphasis text/icons |
| `color.accent.blue.400` | `#60A5FA` | Secondary accent interactions |
| `color.accent.blue.500` | `#3B82F6` | Primary actions |
| `color.accent.blue.600` | `#2563EB` | Hover/active primary |
| `color.accent.blue.700` | `#1D4ED8` | Pressed state |

#### 5.2.4 Semantic State Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `color.status.success.bg` | `#052E16` | Success background |
| `color.status.success.fg` | `#86EFAC` | Success text/icon |
| `color.status.warning.bg` | `#3F2A04` | Warning background |
| `color.status.warning.fg` | `#FCD34D` | Warning text/icon |
| `color.status.error.bg` | `#3F0D16` | Error background |
| `color.status.error.fg` | `#FDA4AF` | Error text/icon |
| `color.status.info.bg` | `#0B2B4A` | Informational background |
| `color.status.info.fg` | `#93C5FD` | Informational text/icon |

### 5.3 Spacing Tokens (4px Grid)

| Token | Value |
| --- | --- |
| `space.0` | `0px` |
| `space.1` | `4px` |
| `space.2` | `8px` |
| `space.3` | `12px` |
| `space.4` | `16px` |
| `space.5` | `20px` |
| `space.6` | `24px` |
| `space.8` | `32px` |
| `space.10` | `40px` |
| `space.12` | `48px` |
| `space.16` | `64px` |

Balanced density defaults:
- Form field vertical gap: `space.4`
- Section vertical gap: `space.8`
- Card internal padding: `space.6`
- Page horizontal padding (desktop): `space.8`

### 5.4 Radius Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `radius.sm` | `6px` | Small controls |
| `radius.md` | `10px` | Standard controls/cards |
| `radius.lg` | `14px` | Large containers |
| `radius.xl` | `18px` | Modal/dialog shells |
| `radius.full` | `9999px` | Pills, badges, icon buttons |

### 5.5 Shadow Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `shadow.low` | `0 1px 2px rgba(0, 0, 0, 0.35)` | Minimal lift |
| `shadow.mid` | `0 8px 20px rgba(0, 0, 0, 0.35)` | Cards/dropdowns |
| `shadow.high` | `0 16px 48px rgba(0, 0, 0, 0.45)` | Modals/overlays |

### 5.6 Motion Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `motion.duration.fast` | `120ms` | Hover/focus transitions |
| `motion.duration.base` | `180ms` | Most UI transitions |
| `motion.duration.slow` | `260ms` | Modal/overlay transitions |
| `motion.easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` | Standard easing |
| `motion.easing.emphasized` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Enter/exit emphasis |

### 5.7 Z-Index Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `z.base` | `0` | Standard flow content |
| `z.sticky` | `100` | Sticky headers/filters |
| `z.dropdown` | `400` | Menus/popovers |
| `z.modal` | `800` | Dialog surface |
| `z.toast` | `900` | Toast notifications |
| `z.max` | `999` | Emergency overlays only |

## 6. Typography

- `R-TYPE-002` Primary UI text `MUST` use `Geist Sans`.
- `R-TYPE-003` Code, numeric-heavy, and technical identifiers `MUST` use `Geist Mono`.
- `R-TYPE-004` Body text below `14px` `MUST NOT` be used in product UI except constrained metadata.

### 6.1 Typeface Tokens

| Token | Value |
| --- | --- |
| `font.sans` | `var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif` |
| `font.mono` | `var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace` |

### 6.2 Text Role Scale

| Role | Size | Weight | Line Height | Token Guidance |
| --- | --- | --- | --- | --- |
| `display` | `36px` | `700` | `44px` | Page hero headings only |
| `heading-xl` | `30px` | `700` | `38px` | Top-level screen titles |
| `heading-lg` | `24px` | `650` | `32px` | Section headings |
| `heading-md` | `20px` | `650` | `28px` | Card and module headings |
| `body-lg` | `18px` | `500` | `28px` | Prominent body copy |
| `body-md` | `16px` | `500` | `24px` | Default paragraph text |
| `body-sm` | `14px` | `500` | `20px` | Dense UI labels/help text |
| `caption` | `12px` | `500` | `16px` | Secondary metadata only |
| `code-sm` | `13px` | `500` | `18px` | Inline code/IDs |

## 7. Layout, Spacing, and Density

### 7.1 Layout Baseline

- `R-LAYOUT-001` Screen content areas `MUST` use consistent container widths.
- `R-LAYOUT-002` Related elements `MUST` align to a 4px spacing scale.
- `R-LAYOUT-003` Balanced density is the baseline for all dashboard and form screens.

### 7.2 Container and Grid Standards

| Token/Pattern | Value | Usage |
| --- | --- | --- |
| `layout.container.max` | `1200px` | Default desktop container |
| `layout.container.reading` | `760px` | Text-heavy views |
| `layout.grid.gap` | `space.6` | Main dashboard grid gap |
| `layout.section.gap` | `space.8` | Between major sections |
| `layout.card.padding` | `space.6` | Standard card content inset |

### 7.3 Anti-Patterns (Forbidden)

- `R-LAYOUT-010` Random per-component margins for alignment fixes `MUST NOT` be used.
- `R-LAYOUT-011` Arbitrary spacing values outside `space.*` scale `MUST NOT` be used.
- `R-LAYOUT-012` Mixed vertical rhythm (for example `space.3` then `space.10` without semantic reason) `MUST NOT` be used.
- `R-LAYOUT-013` Nested cards with conflicting padding scales `SHOULD` be avoided unless documented in component contract.

## 8. Motion and Interaction

- `R-MOTION-002` Motion exists for clarity, not decoration.
- `R-MOTION-003` Transitions `MUST` use `motion.duration.*` and `motion.easing.*`.
- `R-MOTION-004` Motion `MUST` respect reduced-motion user preferences.

### 8.1 Allowed Motion Patterns

| Interaction | Allowed Motion | Token |
| --- | --- | --- |
| Hover state | Color/background/opacity transition | `motion.duration.fast` |
| Focus ring | Ring/outline transition | `motion.duration.fast` |
| Modal open/close | Opacity + small scale (`0.98 -> 1`) | `motion.duration.slow` |
| Toast appear/disappear | Opacity + vertical translate (`8px`) | `motion.duration.base` |
| Dropdown open/close | Opacity + translateY (`4px`) | `motion.duration.base` |

### 8.2 Forbidden Motion Patterns

- `R-MOTION-010` Large parallax and decorative background animations `MUST NOT` be used.
- `R-MOTION-011` Continuous looping motion unrelated to user action `MUST NOT` be used.
- `R-MOTION-012` Long transitions above `300ms` for core interactions `MUST NOT` be used.

## 9. Component Rules (Full UI Kit)

Component contract columns:
- `Component`
- `Variants`
- `States`
- `Allowed Tokens`
- `Forbidden Patterns`
- `Accessibility Requirements`

### 9.1 Controls and Form Inputs

| Component | Variants | States | Allowed Tokens | Forbidden Patterns | Accessibility Requirements |
| --- | --- | --- | --- | --- | --- |
| Button | `primary`, `secondary`, `ghost`, `danger` | default, hover, active, focus, disabled, loading | `color.accent.blue.*`, `text.primary`, `radius.md`, `space.2/3/4`, `shadow.low` | raw hex classes, icon-only without label/aria, inconsistent height | min touch target 40px, visible focus ring, loading has `aria-busy` |
| Icon Button | `neutral`, `accent`, `danger` | default, hover, focus, disabled | `radius.full`, `space.2/3`, `text.secondary`, state colors | unlabeled icons, oversized shadows | `aria-label` required, focus visible |
| Input | `default`, `error`, `success`, `read-only` | default, focus, invalid, disabled, read-only | `color.bg.surface`, `color.border.default/focus`, `text.primary`, `radius.md` | no label, placeholder-only labeling, low contrast placeholders | explicit label + error text association (`aria-describedby`) |
| Textarea | `default`, `error`, `read-only` | default, focus, invalid, disabled | same as Input + `space.3` internal padding | manual resize hacks breaking layout | visible label, focus ring, error mapping |
| Select | `default`, `error`, `disabled` | default, open, focus, invalid | Input token set + dropdown tokens | custom chevrons with insufficient contrast | keyboard navigation, visible focus, labeled field |
| Checkbox | `default`, `indeterminate` | checked, unchecked, focus, disabled | `color.accent.blue.500`, `color.border.default`, `radius.sm` | click area smaller than box + label group | control linked to text label, focus visible |
| Radio | `default` | checked, unchecked, focus, disabled | accent + border + text tokens | standalone dot without label | grouped with `fieldset/legend` or equivalent |
| Switch | `default` | on, off, focus, disabled | `color.accent.blue.500`, neutral surface tokens, `radius.full` | ambiguous state color, no clear knob contrast | programmatic checked state + visible focus |

### 9.2 Informational and Feedback Components

| Component | Variants | States | Allowed Tokens | Forbidden Patterns | Accessibility Requirements |
| --- | --- | --- | --- | --- | --- |
| Badge | `neutral`, `info`, `success`, `warning`, `error` | static, focusable (optional) | status bg/fg tokens, `radius.full`, `space.1/2` | tiny unreadable text | min 12px text, sufficient contrast |
| Alert | `info`, `success`, `warning`, `error` | default, dismissible | status tokens, `radius.md`, `space.4` | color-only meaning without icon/text cue | semantic role (`status` or `alert`) as needed |
| Card | `default`, `elevated`, `interactive` | default, hover (interactive), focus-within | surface/elevated/bg, border, `shadow.low/mid`, `radius.lg` | nested arbitrary shadows | heading hierarchy preserved, interactive cards keyboard reachable |
| Toast | `info`, `success`, `warning`, `error` | enter, visible, exit | status tokens, `shadow.mid`, `radius.md` | excessive animation, long blocking toasts | polite/assertive live region based on severity |
| Tooltip | `default` | hidden, visible | elevated bg, text.primary, `radius.sm`, `shadow.mid` | critical info only in tooltip | tooltip tied to trigger with accessible semantics |

### 9.3 Navigation, Overlays, and Data Display

| Component | Variants | States | Allowed Tokens | Forbidden Patterns | Accessibility Requirements |
| --- | --- | --- | --- | --- | --- |
| Modal/Dialog | `default`, `danger confirm` | closed, open, entering, exiting | overlay + elevated + border + `shadow.high` + `radius.xl` | full-screen blocking without escape paths | focus trap, close action, labelled title/description |
| Dropdown/Menu | `default` | closed, open, hover, active, disabled items | elevated/bg, border, text tokens, `shadow.mid`, `radius.md` | hover-only interaction | full keyboard navigation and focus management |
| Tabs | `line`, `pill` | active, inactive, hover, focus, disabled | accent + muted text + border tokens | active state by color alone | active state also indicated by weight/indicator |
| Table | `default`, `dense` | row hover, selected, sorted | bg/surface, border, text tokens, `space.3/4` | inconsistent row heights, unreadable cell padding | header semantics, sortable controls accessible |
| Pagination | `compact`, `full` | default, hover, active, disabled, focus | button-like tokens, `radius.md`, spacing scale | unlabeled prev/next icons | announce current page and controls |
| Skeleton | `line`, `avatar`, `card` | static shimmer | muted/elevated bg tokens, subtle motion | high-contrast flashing shimmer | `aria-hidden` for decorative skeleton blocks |
| Empty State | `neutral`, `actionable` | static | text.muted/secondary, accent actions, `space.4/6` | vague no-data messages | clear heading, helpful action, readable text |

## 10. Accessibility Baseline (WCAG AA)

- `R-A11Y-002` Text and interactive components `MUST` satisfy WCAG AA contrast in dark mode.
- `R-A11Y-003` Keyboard focus indicators `MUST` be visible and consistent across all interactive controls.
- `R-A11Y-004` Disabled states `MUST` remain legible and distinguishable from enabled states.
- `R-A11Y-005` Form controls `MUST` expose labels, helper text, and error text with semantic associations.
- `R-A11Y-006` Minimum interactive target size `SHOULD` be `40x40px` for pointer-based interaction.

Required checks:
- Contrast spot-check for `text.primary`, `text.secondary`, `text.muted` on all documented surfaces.
- Keyboard-only traversal for forms, modals, and menus.
- Error states verified with color + text/icon cue, not color alone.

## 11. Tailwind v4 + Next.js Implementation Snippets

These snippets are reference patterns. They are intentionally small and directly reusable.

### 11.1 `frontend/src/app/globals.css` Token Declaration Pattern

```css
@import "tailwindcss";

:root {
  /* color.* */
  --color-bg-canvas: #0B1120;
  --color-bg-surface: #111827;
  --color-bg-elevated: #1F2937;
  --color-border-default: #334155;
  --color-border-focus: #3B82F6;
  --color-accent-blue-500: #3B82F6;
  --color-accent-blue-600: #2563EB;

  /* text.* */
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;

  /* radius.* */
  --radius-md: 10px;
  --radius-lg: 14px;

  /* motion.* */
  --motion-duration-fast: 120ms;
  --motion-duration-base: 180ms;
  --motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
}

@theme inline {
  --color-background: var(--color-bg-canvas);
  --color-foreground: var(--text-primary);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--color-bg-canvas);
  color: var(--text-primary);
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
}
```

### 11.2 Tailwind Usage Pattern (Semantic Token Mapping)

```tsx
export function ExampleCard() {
  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-6 text-[var(--text-primary)] shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
      <h2 className="text-xl font-semibold">Section title</h2>
      <p className="mt-2 text-[var(--text-secondary)]">Secondary supporting copy.</p>
      <button className="mt-4 rounded-[var(--radius-md)] bg-[var(--color-accent-blue-500)] px-4 py-2 font-medium text-[var(--text-inverse,#020617)] transition-colors duration-150 hover:bg-[var(--color-accent-blue-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]">
        Primary action
      </button>
    </section>
  );
}
```

### 11.3 Component Class Composition Pattern

```tsx
type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonVariantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent-blue-500)] text-[var(--text-inverse,#020617)] hover:bg-[var(--color-accent-blue-600)]",
  secondary:
    "border border-[var(--color-border-default)] bg-[var(--color-bg-elevated)] text-[var(--text-primary)] hover:bg-[var(--color-bg-surface)]",
  ghost:
    "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--color-bg-elevated)]",
};

export function buttonClass(variant: ButtonVariant) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-4 py-2",
    "transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-easing-standard)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    buttonVariantClass[variant],
  ].join(" ");
}
```

## 12. PR Compliance Checklist

Every UI pull request `MUST` include this checklist and supporting evidence.

| Item | PASS/FAIL | Evidence Required |
| --- | --- | --- |
| Tokens only (no raw visual literals) |  | Screenshot or snippet showing semantic token usage |
| Spacing follows `space.*` scale |  | Notes or diff references for spacing classes/styles |
| Component rules from Section 9 followed |  | List of affected components and matched variants/states |
| Focus visibility verified |  | Keyboard navigation video or brief test notes |
| WCAG AA contrast checked |  | Contrast check notes for primary/secondary/muted text |
| Disabled/loading/read-only states validated |  | Screenshots or QA notes |
| Motion follows subtle token policy |  | Note any transitions and mapped motion tokens |
| No forbidden anti-patterns introduced |  | Confirmation line in PR description |

### 12.1 Validation Scenarios

1. AI conformance test:
   - Prompt AI to generate a form page.
   - Fail if raw hex or undocumented spacing appears.
2. Manual component audit:
   - Verify each touched component maps to Section 9 contract.
3. Accessibility checks:
   - Keyboard-only flow for modal + form submission.
   - Contrast spot-check for body and muted text.
4. PR workflow test:
   - Ensure checklist includes explicit PASS/FAIL for every row.
5. Drift prevention:
   - Detect and reject arbitrary spacing or ad-hoc token names.

## 13. Versioning and Change Management

### 13.1 Version Header Format

Every update to this document `MUST` include:
- `Design Doc Version`
- `Last Updated`
- `Change Summary`

### 13.2 Change Rules

- `R-CHANGE-001` Any new token `MUST` be added to Section 5 with value and usage.
- `R-CHANGE-002` Any component contract change `MUST` update Section 9 and Section 12 checklist expectations if needed.
- `R-CHANGE-003` Breaking style-system changes `MUST` include migration notes in `Change Summary`.
- `R-CHANGE-004` Unreviewed rule edits `MUST NOT` be merged.

### 13.3 Initial Change Summary

- Introduced v1 dark-theme-first token system.
- Established strict AI and engineering guardrails.
- Added full UI kit component contracts and PR enforcement checklist.
