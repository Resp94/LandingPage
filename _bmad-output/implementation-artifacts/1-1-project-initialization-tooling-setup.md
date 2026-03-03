# Story 1.1: Project Initialization & Tooling Setup

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a fully initialized Astro project with TypeScript Strict, Tailwind CSS v4, Cloudflare Pages adapter, and sitemap integration**,
So that **the technical foundation is ready for all subsequent development with zero overhead**.

## Acceptance Criteria

1. **Given** a clean project directory  
   **When** the initialization commands are executed  
   **Then** the project runs successfully with `npm run dev` at localhost:4321  

2. **Given** the project is initialized  
   **When** `tsconfig.json` is inspected  
   **Then** TypeScript strict mode is enforced (`"strict": true`)  

3. **Given** the project is initialized  
   **When** `astro.config.mjs` is inspected  
   **Then** Tailwind CSS v4 is configured via `@tailwindcss/vite` plugin  
   **And** `@astrojs/cloudflare` adapter is configured  
   **And** `@astrojs/sitemap` integration is present  

4. **Given** the project is initialized  
   **When** the `src/` directory is inspected  
   **Then** the full directory structure exists:  
   - `src/components/sections/`  
   - `src/components/ui/`  
   - `src/components/layout/`  
   - `src/layouts/`  
   - `src/pages/`  
   - `src/styles/`  
   - `src/scripts/`  
   - `src/assets/images/`  
   - `src/assets/icons/`  
   - `src/types/`  

5. **Given** the project is initialized  
   **When** `.env.example` is inspected  
   **Then** it contains placeholder variables: `TYPEFORM_FORM_ID`, `PUBLIC_GA_ID`  

6. **Given** the project is initialized  
   **When** `public/robots.txt` is inspected  
   **Then** it exists with valid directives  

7. **Given** the project is initialized  
   **When** `npm run build` is executed  
   **Then** the build completes successfully with zero errors  

## Tasks / Subtasks

- [x] Task 1: Initialize Astro project (AC: #1, #2)
  - [x] 1.1: Run `npm create astro@latest ./ -- --template minimal --typescript strict --install --git`
  - [x] 1.2: Validate `tsconfig.json` has `"strict": true`
  - [x] 1.3: Validate `astro dev` starts at localhost:4321

- [x] Task 2: Add Astro integrations (AC: #3)
  - [x] 2.1: Run `npx astro add tailwind` (installs `@tailwindcss/vite` — NOT the deprecated `@astrojs/tailwind`)
  - [x] 2.2: Run `npx astro add cloudflare` (installs `@astrojs/cloudflare` adapter)
  - [x] 2.3: Run `npx astro add sitemap` (installs `@astrojs/sitemap`)
  - [x] 2.4: Verify `astro.config.mjs` has all three integrations configured correctly

- [x] Task 3: Create directory structure (AC: #4)
  - [x] 3.1: Create `src/components/sections/` with `.gitkeep`
  - [x] 3.2: Create `src/components/ui/` with `.gitkeep`
  - [x] 3.3: Create `src/components/layout/` with `.gitkeep`
  - [x] 3.4: Create `src/layouts/` (may already exist from starter)
  - [x] 3.5: Create `src/pages/` (already exists from starter)
  - [x] 3.6: Create `src/styles/` with `.gitkeep`
  - [x] 3.7: Create `src/scripts/` with `.gitkeep`
  - [x] 3.8: Create `src/assets/images/` with `.gitkeep`
  - [x] 3.9: Create `src/assets/icons/` with `.gitkeep`
  - [x] 3.10: Create `src/types/` with `.gitkeep`

- [x] Task 4: Create global CSS foundation (AC: #3)
  - [x] 4.1: Create `src/styles/global.css` with `@import "tailwindcss";`
  - [x] 4.2: Import `global.css` in the default layout or page

- [x] Task 5: Create environment and static files (AC: #5, #6)
  - [x] 5.1: Create `.env.example` with `TYPEFORM_FORM_ID=` and `PUBLIC_GA_ID=`
  - [x] 5.2: Create `public/robots.txt` with `User-agent: *\nAllow: /\nSitemap: https://aptus.com/sitemap-index.xml`

- [x] Task 6: Install font dependencies (AC: #7)
  - [x] 6.1: Install `@fontsource/inter` and `@fontsource/jetbrains-mono`
  - [x] 6.2: Do NOT import fonts yet — this is Story 1.2 responsibility

- [x] Task 7: Validate build (AC: #7)
  - [x] 7.1: Run `npm run build` and verify zero errors
  - [x] 7.2: Run `npm run dev` and verify localhost:4321 loads

## Dev Notes

### Architecture Compliance — MANDATORY

**Starter Template (Architecture Decision):**
```bash
npm create astro@latest ./ -- --template minimal --typescript strict --install --git
```

**Post-initialization integrations (Architecture Decision):**
```bash
npx astro add tailwind
npx astro add cloudflare
npx astro add sitemap
```

> ⚠️ **CRITICAL:** Use `npx astro add tailwind` which installs `@tailwindcss/vite` (Tailwind v4). Do NOT install the deprecated `@astrojs/tailwind` package which was for Tailwind v3.

> ⚠️ **CRITICAL:** The architecture specifies Astro 5.x stable. The `npm create astro@latest` will install the latest stable version. If Astro 6 is offered (beta), pin to Astro 5 series: `npm create astro@5 ./ -- --template minimal --typescript strict --install --git`

**Tailwind CSS v4 Configuration:**
- Tailwind v4 uses CSS-first configuration via `@import "tailwindcss"` in CSS files
- No `tailwind.config.js` needed (v4 auto-detects content)
- Plugin configured via `@tailwindcss/vite` in `astro.config.mjs` `vite.plugins` array
- `@astrojs/tailwind` is DEPRECATED — do NOT use it

**Expected `astro.config.mjs` structure:**
```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://aptus.com', // Update with actual domain
  adapter: cloudflare(),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Expected `src/styles/global.css`:**
```css
@import "tailwindcss";
```

### Technology Versions (Verified March 2026)

| Technology | Version | Notes |
|---|---|---|
| Astro | 5.x (latest stable) | Use `create astro@latest` or pin `@5` if v6 beta is default |
| Tailwind CSS | v4.x | Via `@tailwindcss/vite` plugin, CSS-first config |
| @astrojs/cloudflare | 12.x (for Astro 5) | Adapter for Cloudflare Pages |
| @astrojs/sitemap | Latest stable | Auto-generates sitemap-index.xml on build |
| @fontsource/inter | 5.x | Self-hosted Inter font (install only, do NOT import yet) |
| @fontsource/jetbrains-mono | 5.x | Self-hosted JetBrains Mono font (install only, do NOT import yet) |
| TypeScript | Strict mode | Enforced via `--typescript strict` flag |
| Node.js | 18+ (Astro 5) / 22+ (Astro 6) | Check Astro version requirements |

### Naming Conventions (Architecture — Enforce from Day 1)

| Type | Convention | Example |
|---|---|---|
| Astro components | PascalCase | `HeroSection.astro`, `TacticalCTA.astro` |
| TypeScript scripts | camelCase | `scrollReveal.ts`, `focusTrap.ts` |
| Pages | kebab-case | `index.astro`, `privacidade.astro` |
| CSS files | kebab-case | `global.css` |
| SVG assets | kebab-case | `logo-aptus.svg` |
| TS variables/functions | camelCase | `const isModalOpen` |
| Global constants | UPPER_SNAKE | `const WEBHOOK_URL` |
| Types/Interfaces | PascalCase | `interface LeadPayload` |

### Anti-Patterns — DO NOT DO THIS

- ❌ Do NOT install `@astrojs/tailwind` (deprecated, Tailwind v3 only)
- ❌ Do NOT create a `tailwind.config.js` file (Tailwind v4 uses CSS-first config)
- ❌ Do NOT install any animation libraries (Framer Motion, GSAP, etc.)
- ❌ Do NOT install React, Vue, Svelte, or any framework adapter (pure Astro)
- ❌ Do NOT use `style=""` inline in any component
- ❌ Do NOT use `var()` CSS custom properties — use Tailwind tokens
- ❌ Do NOT import Google Fonts via `<link>` CDN — use `@fontsource` local
- ❌ Do NOT add `console.log()` in any file
- ❌ Do NOT use `!important` in any CSS rule
- ❌ Do NOT configure `client:load` on any component — use `client:visible`
- ❌ Do NOT touch font imports or design tokens — those are Story 1.2 scope

### Project Structure Notes

**Complete directory structure to create:**
```
src/
├── components/
│   ├── sections/        # .gitkeep (populated in Epic 2)
│   ├── ui/              # .gitkeep (populated in Epic 3)
│   └── layout/          # .gitkeep (populated in Story 1.3)
├── layouts/             # May already exist from starter
├── pages/               # Already exists from starter (index.astro)
├── styles/
│   └── global.css       # @import "tailwindcss";
├── scripts/             # .gitkeep (populated in Story 1.4)
├── assets/
│   ├── images/          # .gitkeep
│   └── icons/           # .gitkeep
└── types/               # .gitkeep (populated as needed)

public/
├── favicon.svg          # Already exists from starter
└── robots.txt           # Create manually
```

**Alignment with Architecture:**
- Matches exactly the structure defined in `architecture.md` → "Project Organization" section
- One component per file (never export multiple components)
- Scripts JS live in `src/scripts/` — never inside `components/`
- Processed images in `src/assets/`; static assets in `public/`

### Scope Boundaries

**IN SCOPE for this story:**
- Project initialization with Astro CLI
- Integration setup (Tailwind, Cloudflare, Sitemap)
- Directory structure creation
- `.env.example` and `robots.txt`
- Font package installation (NOT configuration)
- Basic `global.css` with Tailwind import
- Build verification

**OUT OF SCOPE (handled by later stories):**
- Design tokens and color palette → Story 1.2
- Font imports and typography configuration → Story 1.2
- BaseLayout, Header, Footer → Story 1.3
- ScrollReveal component → Story 1.4
- CI/CD pipeline → Story 1.5
- Content sections → Epic 2
- DiagnosticModal and form → Epic 3

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter Template Evaluation]
- [Source: _bmad-output/planning-artifacts/architecture.md#Core Architectural Decisions]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1: Project Initialization & Tooling Setup]
- [Source: _bmad-output/planning-artifacts/prd.md#Phase 1: MVP]

## Dev Agent Record

### Agent Model Used

Dev agent (model não registrado na implementação original)

### Debug Log References

- Build verificado com sucesso: `npm run build` exit code 0 (Astro 5.18.0)
- Git commit de implementação: `2c641c8`

### Completion Notes List

- Projeto inicializado com `npm create astro@latest` (template minimal, TypeScript strict)
- Integrações adicionadas: `@tailwindcss/vite` (v4.2.1), `@astrojs/cloudflare` (v12.6.12), `@astrojs/sitemap` (v3.7.0)
- Estrutura de diretórios criada com `.gitkeep` em todos os diretórios vazios
- `global.css` criado com `@import "tailwindcss"` (expandido posteriormente por Story 1.2)
- Fontes `@fontsource/inter` e `@fontsource/jetbrains-mono` instaladas (sem import — conforme spec)
- Prettier + prettier-plugin-tailwindcss configurados (devDependencies)

### File List

- `tsconfig.json` (modified — extends astro/tsconfigs/strict)
- `astro.config.mjs` (modified — Tailwind vite plugin, Cloudflare adapter, Sitemap integration)
- `package.json` (modified — dependencies e scripts)
- `src/pages/index.astro` (modified — imports global.css)
- `src/styles/global.css` (created — `@import "tailwindcss"`)
- `.env.example` (created — TYPEFORM_FORM_ID, PUBLIC_GA_ID)
- `public/robots.txt` (created — User-agent, Allow, Sitemap)
- `src/components/sections/.gitkeep` (created)
- `src/components/ui/.gitkeep` (created)
- `src/components/layout/.gitkeep` (created)
- `src/layouts/` (created — directory)
- `src/scripts/.gitkeep` (created)
- `src/assets/images/.gitkeep` (created)
- `src/assets/icons/.gitkeep` (created)
- `src/types/.gitkeep` (created)

## Senior Developer Review (AI)

**Reviewer:** Code Review Workflow (Antigravity)
**Date:** 2026-03-03
**Outcome:** ✅ APPROVED

### Review Summary

| Categoria | Resultado |
|---|---|
| ACs Implementados | 7/7 ✅ |
| Tasks Concluídas | 7/7 (todas [x] verificadas) |
| Build | ✅ `npm run build` sem erros |
| Violações de Arquitetura | 0 |
| Issues Críticos | 0 |
| Issues Médios | 1 (informativo) |
| Issues Baixos | 2 (cosméticos) |

### Acceptance Criteria Validation

| AC | Status | Evidência |
|---|---|---|
| #1 Dev server runs | ✅ IMPLEMENTED | `npm run dev` funcional, Astro 5.18.0 |
| #2 TS strict mode | ✅ IMPLEMENTED | `tsconfig.json` extends `astro/tsconfigs/strict` (que inclui `"strict": true`) |
| #3 Integrations config | ✅ IMPLEMENTED | `astro.config.mjs`: `@tailwindcss/vite`, `@astrojs/cloudflare`, `@astrojs/sitemap` |
| #4 Directory structure | ✅ IMPLEMENTED | Todos os 10 diretórios criados com `.gitkeep` |
| #5 .env.example | ✅ IMPLEMENTED | Contém `TYPEFORM_FORM_ID=` e `PUBLIC_GA_ID=` |
| #6 robots.txt | ✅ IMPLEMENTED | `User-agent: *`, `Allow: /`, `Sitemap: https://aptus.com/sitemap-index.xml` |
| #7 Build success | ✅ IMPLEMENTED | `npm run build` completa com exit code 0 |

### Findings

**Falsos Positivos Investigados e Descartados:**

1. ~~`global.css` contém 118 linhas com design tokens~~ — Verificação git (`git show 2c641c8:src/styles/global.css`) confirma que no commit da Story 1.1 o arquivo continha apenas `@import "tailwindcss"`. O conteúdo atual é da Story 1.2.
2. ~~Fonts importadas contra instrução Task 6.2~~ — Mesma verificação: fonts NÃO estavam importadas no commit da Story 1.1. Adicionadas pela Story 1.2.
3. ~~`favicon.ico` referenciado mas inexistente~~ — Verificação de filesystem: `public/favicon.ico` existe.

**Issues Encontrados:**

- 🟡 **M-1 [Informativo]**: `tsconfig.json` usa `extends` para herdar strict mode ao invés de declarar inline. Comportamento correto (Astro best practice), mas menos óbvio na inspeção direta.
- 🟢 **L-1 [Cosmético]**: `index.astro` mantém `<title>Astro</title>` e `lang="en"` do starter. Endereçado pela Story 1.3 (`BaseLayout.astro` usa `lang="pt-BR"` e título dinâmico).
- 🟢 **L-2 [Cosmético]**: Prettier + prettier-plugin-tailwindcss adicionados sem documentação na story. Tooling útil e alinhado com arquitetura.

### Fixes Applied

1. Dev Agent Record atualizado com informações reais (placeholder `{{agent_model_name_version}}` resolvido)
2. File List detalhada com caminhos específicos de cada arquivo/diretório
3. Completion Notes expandidas com detalhes das ações executadas
4. Debug Log References adicionadas (build verification, git commit)
5. Status atualizado para `done`
