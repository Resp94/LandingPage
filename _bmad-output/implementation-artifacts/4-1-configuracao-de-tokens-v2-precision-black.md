# Story 4.1: Configuracao de Tokens V2 (Precision Black)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a complete V2 token map for colors, typography, borders, spacing, and accents**,
so that **all sections share the same visual grammar and avoid visual drift**.

## Criterios de Aceitacao

1. **Given** the project runs Astro + Tailwind CSS v4 in CSS-first mode  
   **When** V2 tokens are configured  
   **Then** the source of truth is `src/styles/global.css` (`@theme`) and there is no dependency on `tailwind.config.mjs` (file does not exist in this repository).
2. **Given** the current palette in `src/styles/global.css` still uses legacy values  
   **When** the token map is updated  
   **Then** the exact Precision Black values below are applied and legacy values are removed from theme tokens:  
   `#000000`, `#050505`, `#0D0D0D`, `#F5F5F5`, `#B3B3B3`, `#7A7A7A`, `rgba(255,255,255,0.14)`, `rgba(255,255,255,0.08)`, `#8FFFE3`, `#A7F3FF`.
3. **Given** V2 typography must follow Operational Clarity rules  
   **When** font tokens/classes are declared  
   **Then** `Inter` is the primary sans, `Geist` is available as alternative sans, and `Geist Mono` uses `JetBrains Mono` fallback  
   **And** hierarchy is enforced: H1 600-700 + tracking-tight; H2/H3 500-600; body 400; data badges mono 500 with controlled uppercase.
4. **Given** contrast regressions are a known risk in dark systems  
   **When** text tokens are used on V2 surfaces  
   **Then** the implementation must satisfy at least these WCAG AA contrast baselines (normal text):  
   `#F5F5F5` on `#0D0D0D` >= `17.83:1`; `#B3B3B3` on `#0D0D0D` >= `9.27:1`; `#7A7A7A` on `#0D0D0D` >= `4.53:1`.
5. **Given** accent colors are tactical  
   **When** styling text and UI signals  
   **Then** `#8FFFE3` and `#A7F3FF` are restricted to indicators, emphasis snippets, focus rings, and state signals  
   **And** accents are forbidden for long body copy, paragraph defaults, or large heading blocks.
6. **Given** structural language in V2 depends on subtle engineering lines  
   **When** borders/dividers/grid are implemented  
   **Then** only tokenized 1px lines are used (`rgba(255,255,255,0.14)` border and `rgba(255,255,255,0.08)` grid), with low visual competition against content.
7. **Given** token drift often comes from ad-hoc classes  
   **When** implementation is complete  
   **Then** no legacy hardcoded palette remains in `src/` (`#fc5400`, `#fc7800`, `#0c0000`, `#3c0000`, `#600000`) except historical docs/artifacts.
8. **Given** non-functional constraints for the project  
   **When** story verification runs  
   **Then** Lighthouse remains >= 95 for Performance, Accessibility, Best Practices, and SEO.

## Tasks / Subtasks

- [ ] Task 1: Audit and replace legacy token map in `src/styles/global.css` (AC: 1, 2, 7)
  - [ ] Replace legacy surface/accent values with Precision Black V2 values.
  - [ ] Introduce semantic text/border/grid/accent token names that are reused by sections/components.
  - [ ] Keep Tailwind v4 CSS-first pattern (`@import 'tailwindcss'` + `@theme`) as the only token configuration path.
- [ ] Task 2: Implement typography token system for V2 (AC: 3)
  - [ ] Update sans/mono stacks to include Inter + Geist and Geist Mono fallback to JetBrains Mono.
  - [ ] Align heading/body/badge utility usage with required weights and tracking rules.
- [ ] Task 3: Apply contrast guardrails in base styles and key components (AC: 4, 5, 6)
  - [ ] Ensure body/headings/metadata default classes consume V2 text tokens.
  - [ ] Ensure accents are not used as default text color for long content.
  - [ ] Ensure engineering lines are tokenized and remain subtle.
- [ ] Task 4: Add automated guardrail tests for token integrity and contrast safety (AC: 4, 5, 7)
  - [ ] Add `tests/story-4-1-tokens-v2.test.mjs` to assert required token values and forbid legacy token values in source CSS.
  - [ ] Add checks for approved text/surface pairings and banned accent misuse patterns in section components.
  - [ ] Register `test:story-4-1` in `package.json` and aggregate pipeline if required.
- [ ] Task 5: Validate quality gates (AC: 8)
  - [ ] Run `npm run test:story-4-1` and full regression set required by sprint policy.
  - [ ] Run Lighthouse verification and record scores in the story completion notes.

## Dev Notes

- Tailwind config reality check: this project uses Tailwind v4 CSS-first configuration. `tailwind.config.mjs` is absent; token changes must happen in `src/styles/global.css` under `@theme`.
- Current token block to replace is in `src/styles/global.css` with legacy brand values (`--color-accent: #fc5400`, `--color-accent-hover: #fc7800`, `--color-surface-primary: #0c0000`, `--color-surface-secondary: #3c0000`, `--color-surface-tertiary: #600000`, plus `.border-grid` tied to old palette).
- Contrast guardrail: keep semantic pairing discipline. Recommended defaults:
  - Primary content: `#F5F5F5`
  - Secondary content: `#B3B3B3`
  - Meta/supporting text: `#7A7A7A`
  - Do not place meta text over translucent overlays that reduce effective contrast below AA.
- Preserve architecture constraints already established for this codebase:
  - Astro + Tailwind v4
  - Minimal JS and CSS-native visual language
  - Existing component/file naming conventions

### Project Structure Notes

- Files expected for this story:
  - `src/styles/global.css` (primary token source)
  - `src/components/sections/*.astro` (token usage alignment)
  - `src/components/ui/*.astro` (badge/CTA accent governance)
  - `tests/story-4-1-tokens-v2.test.mjs` (new)
  - `package.json` (test script wiring)

### References

- [Source: _bmad-output/planning-artifacts/epics.md#story-41-configuracao-de-tokens-v2-precision-black]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#visual-foundation-v2]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#typography-system-operational-clarity]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#responsive-and-accessibility-requirements]
- [Source: _bmad-output/planning-artifacts/architecture.md#selected-starter-astro-cli-minimal--tailwind-v4-integration]

## Dev Agent Record

### Agent Model Used

Codex (GPT-5)

### Debug Log References

- Loaded and compared:
  - `_bmad-output/planning-artifacts/ux-design-specification.md`
  - `src/styles/global.css`
  - `_bmad-output/planning-artifacts/epics.md`
  - `_bmad-output/planning-artifacts/architecture.md`

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Story includes explicit token replacement scope, typography rules, and contrast guardrails with measurable thresholds.
- Story status set to `ready-for-dev`.

### File List

- `_bmad-output/implementation-artifacts/4-1-configuracao-de-tokens-v2-precision-black.md` (added)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (updated story 4-1 to ready-for-dev)
