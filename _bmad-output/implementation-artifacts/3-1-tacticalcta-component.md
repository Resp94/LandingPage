# Story 3.1: TacticalCTA Component

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want a visually distinctive, premium call-to-action button that compels me to take action,
so that I clearly identify the single most important action on the page and feel confident clicking it.

## Acceptance Criteria

1. **Given** the TacticalCTA component is placed in Hero, Header, and CTA sections
   **When** `TacticalCTA.astro` renders in `src/components/ui/`
   **Then** it displays text in uppercase with `tracking-wider` letter spacing and Inter font
   **And** a chevron-right icon (`â†’` ou SVG) is placed after the text and translates 4px to the right on hover (`hover:translate-x-1`)
2. **Given** the component states are defined
   **Then** **Default state**: `border border-zinc-700 text-zinc-300 bg-transparent`
   **And** **Hover state**: `hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400` with subtle inner glow
   **And** **Disabled state**: `opacity-50 cursor-not-allowed`
   **And** transitions are smooth: `transition-all duration-200 ease-out`
3. **Given** accessibility requirements
   **Then** the button has `aria-label="Agendar Auditoria EstratÃ©gica"` and `focus-visible:ring-2 focus-visible:ring-emerald-500`
4. **Given** interactivity requirements
   **Then** click instantly triggers a `CustomEvent('open-diagnostic')` or equivalent DOM event â€” no delay
5. **Given** responsiveness
   **Then** on mobile, the button renders as `w-full` when used in standalone CTA sections

## Tasks / Subtasks

- [x] Task 1: Initialize the Component Structure
  - [x] Create `src/components/ui/TacticalCTA.astro`
  - [x] Set up the `<button>` HTML semantics with correct attributes
  - [x] Implement TypeScript `Props` interface for component flexibility (e.g. `ariaLabel`, `fullWidth`, default text)
- [x] Task 2: Implement Component Styling
  - [x] Apply Tailwind UI base styles: inter font, uppercase, `tracking-wider`
  - [x] Add the chevron-right SVG icon and set up `hover:translate-x-1`
  - [x] Implement base, hover, and disabled state classes using `zinc` and `emerald` colors
  - [x] Apply transitions (`transition-all duration-200 ease-out`)
- [x] Task 3: Accessibility Implementation
  - [x] Add focus rings (`focus-visible:ring-2 focus-visible:ring-emerald-500`)
  - [x] Add default prop `aria-label="Agendar Auditoria EstratÃ©gica"` that can be overridden
- [x] Task 4: Add Action Trigger Logic
  - [x] Add an inline `<script>` to dispatch the custom `open-diagnostic` event on click
- [x] Task 5: Responsive layout logic
  - [x] Apply `w-full` conditionally if a `fullWidth` prop is passed or via external class passing

## Dev Notes

- **Architecture Guidance**: 
  - Ensure Astro components strictly use PascalCase: `TacticalCTA.astro`.
  - Enforce Tailwind class ordering: Layout â†’ Spacing â†’ Size â†’ Typography â†’ Colors â†’ Effects â†’ Transitions â†’ States â†’ Responsive.
  - Keep it JavaScript-light. The click event just dispatches a DOM event `CustomEvent('open-diagnostic')`. Do NOT use `client:load` or `client:visible` for this component since it does not have complex hydration requirements, just simple vanilla JS behavior.
  - Never use `console.log()` in production code. Use `aria-label` to ensure WCAG AA compliance.
- **Dependencies**: `@fontsource/inter`, Tailwind V4 classes config.
- **Git Intelligence**: Latest commits indicate high attention to structural implementation (`feat: Monta a pÃ¡gina inicial com a nova seÃ§Ã£o CTA`). Stick to the established patterns. Keep PRs scoped specifically to this component.

### Project Structure Notes

- **File target**: `src/components/ui/TacticalCTA.astro`
- Adheres entirely to the Island constraints (no hydration, purely static + small vanilla snippet).

### References

- [Source: _bmad-output/planning-artifacts/epics.md] Epic 3, Story 3.1
- [Source: _bmad-output/planning-artifacts/architecture.md] Component Boundaries & Naming Conventions

## Dev Agent Record

### Agent Model Used

Antigravity / Gemini-2.5-Pro

### Debug Log References

- Executed `npm run test:story-3-1` confirming failing tests.
- Re-ran tests after implementing `TacticalCTA.astro` with full GREEN pass. 
- Component leverages simple vanillla script rather than Astro React hydration.

### Completion Notes List
- Ultimate context engine analysis completed - comprehensive developer guide created
- Added semantic `button` component meeting all tailwind aesthetic guidelines globally requested (Emerald accent against Zinc).
- Provided proper a11y focus rings and disabled conditional layouts.
- Created robust test case in `tests/story-3-1-tacticalcta.test.mjs`.

### File List
- src/components/ui/TacticalCTA.astro
- src/components/sections/HeroSection.astro
- src/components/sections/CTASection.astro
- tests/story-3-1-tacticalcta.test.mjs
- package.json
## Senior Developer Review (AI)

### Reviewer
Jonathas

### Date
2026-03-03

### Outcome
Approved after fixes.

### Findings Resolved
- Replaced Hero CTA anchor with TacticalCTA usage to satisfy placement requirements in Hero, Header, and CTA sections.
- Updated CTASection TacticalCTA usage to render full-width on mobile (`w-full sm:w-auto`) for standalone CTA behavior.
- Refactored TacticalCTA click wiring to idempotent per-button listeners without DOM cloning/replacement.
- Hardened Story 3.1 smoke test to validate usage in Hero/Header/CTA, mobile width behavior in CTA section, and non-destructive event binding.

### Residual Risks
- Story 3.1 tests remain static source checks; runtime DOM-event integration with DiagnosticModal should still be covered by Story 3.2 integration tests.

## Change Log
- 2026-03-03: Senior code review follow-up applied. Story status moved to done and AC gaps closed.

