---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
status: complete
completedAt: '2026-03-02T15:19:28-04:00'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
---

# LandingPage - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for LandingPage, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: O Visitante pode visualizar a Proposta de Valor descritiva e seções da problemática macro imediatamente ao carregar a página principal.
FR2: O Visitante pode navegar linearmente pelas instâncias metodológicas (Auditoria, Arquitetura, Deploy) detalhadas de modo lógico ao longo do scroll vertical de tela.
FR3: O Visitante pode visualizar uma interface responsiva alinhada aos hardwares primários (Desktop/Tablet/Mobile).
FR4: O Visitante pode acessar uma interface interativa de qualificação acionada via botões Call To Action.
FR5: O Visitante pode imputar dados curriculares base e detalhes primários via preenchimento segmentado de campos.
FR6: O Sistema de Fricção (Formulário) pode bloquear o envio se o Visitante omitir dados primários classificatórios ativando validações "Required" obrigatórias.
FR7: O Visitante pode receber feedback visual (Tela de status concluído/próximos passos) assim que transmitir efetivamente a solicitação final ao CRM Aptus.
FR8: O Frontend do formulário pode disparar Webhooks seguros comunicando um arquivo/payload de conversão ao Endpoint n8n.
FR9: O Sistema Backend pode injetar as informações pré-estruturadas como um cliente "quente" viável nos repositórios (Notion/Trello) da equipe comercial da Aptus.

### NonFunctional Requirements

NFR1: A SPA deve alcançar métricas de rating Google Lighthouse >= 95 garantindo renderização ultra-estável nas instâncias Performance, Melhores Práticas e SEO.
NFR2: O conteúdo primário de tela deve renderizar as métricas de LCP (Largest Contentful Paint) em intervalo de tempo <= 2.0s em conexões de espectro mobile.
NFR3: A invocação das scripts não-core (pixels de evento e os motores SPA para o widget de Formulário Typeform) deve submeter-se à restrição não-bloqueadora em Main Thread no instante zero visual da página (Deferred ou Lazy Loading on interactive).
NFR4: A CDN deve possuir SLA de entrega superior e garantido de TTFB (Time To First Byte) de proximidade aos ranges de tolerância até os parciais 250ms ou otimizado inferior em endpoints Brasil.
NFR5: A infraestrutura de nuvem periférica (Pages CDN origin) tolerará sem down-time até contingência padrão "enterprise" mantendo SLA público reportado do provider > 99.9% Uptime anualizado garantido.
NFR6: A comunicação assíncrona da ponte Webhook deve processar sem dropar (loss data issue) envios de até 10 a 20 post-requests sincronicamente escalonados de potenciais acessos virais de engajamento sem falha do form provider end.
NFR7: A experiência de UX consolidará identidade visual ativando Dark Mode dominante em esquemas e matizes complementares estritos de alta-fidelidade que comuniquem valor tangível e High-Ticket.
NFR8: Todos blocos contrastantes renderizados textuais (Títulos/Textos longos) respeitam o critério WCAG 2.1 norma AA mantendo legibilidade de contraste perfeita no "UI theme" definido.

### Additional Requirements

**From Architecture:**

- Starter Template: Astro CLI (Minimal) + Tailwind v4 — `npm create astro@latest ./ -- --template minimal --typescript strict --install --git` + integrations (tailwind, cloudflare, sitemap). This must be Epic 1, Story 1.
- TypeScript Strict mode enforced from project creation
- Islands Architecture: 90% HTML/CSS estático renderizado no servidor, JS hidratado apenas em DiagnosticModal (`client:visible`) e ScrollReveal (`client:visible`)
- Self-hosted fonts via `@fontsource/inter` e `@fontsource/jetbrains-mono` com preload + `font-display: swap`
- Astro `<Image />` component for automatic optimization (WebP/AVIF, responsive srcsets)
- CSS-only animations: IntersectionObserver + CSS `@keyframes` para scroll reveal, CSS `transition` (150-200ms, ease-out) para hover/focus states
- `@media (prefers-reduced-motion: reduce)` mandatory on all animations
- CI/CD Pipeline: GitHub Actions → lint → build → Lighthouse CI check → deploy Cloudflare Pages
- Lighthouse CI como gate: build falha se score < 95
- Cloudflare Web Analytics (cookieless, zero JS — no Lighthouse impact)
- LGPD Compliance: Checkbox consentimento no Typeform/Tally + Página estática `/privacidade`
- Webhook Security: `Authorization: Bearer <token>` header on n8n endpoint
- Typeform Native Webhook → n8n (zero custom JS on frontend for integration)
- Error Handling: n8n Error Workflows centralizados com notificações para equipe
- Environment Configuration: `.env` local + Cloudflare Pages environment variables para produção
- SEO: Meta tags, OG tags, structured data (Organization schema), sitemap.xml, robots.txt
- Project structure: `src/components/sections/`, `src/components/ui/`, `src/components/layout/`, `src/layouts/`, `src/pages/`, `src/styles/`, `src/scripts/`, `src/assets/`, `src/types/`
- Naming conventions: PascalCase for .astro components, camelCase for .ts scripts, kebab-case for pages and CSS
- Anti-patterns enforced: No inline styles, no CSS custom properties, no Google Fonts CDN, no client:load, no console.log, no !important, no images > 200KB without optimization

**From UX Design Specification:**

- Dark Mode corporativo exclusivo (bg-zinc-950 `#09090b`) — sem toggle light/dark
- Design direction: "Luxo Operacional B2B" (convergência Brutalismo Estrutural + Minimalismo Etéreo)
- Accent Color: Emerald (verde elétrico `#10b981`) usado de forma ultra-controlada (apenas CTAs, hover states, validação success)
- Typography: Inter (headings, peso 600-700, `tracking-tight`) + JetBrains Mono (data badges, métricas)
- Text colors: `text-zinc-100` for headings, `text-zinc-400` for body (never 100% white)
- Spacing generous: `py-24` to `py-32` between sections, `max-w-7xl` container com `mx-auto`
- Borders: Linhas finas 1px translúcidas `border-zinc-800/50` formando "grid da engenharia"
- Responsive: Desktop-first com "Content-First Fluidity" approach — breakpoints sm(640), md(768), lg(1024), xl(1280)
- Diagnostic Modal: `backdrop-blur-xl`, `bg-zinc-950/80`, slide-up animation (`translate-y`), focus lock, body scroll lock, botão X absoluto, `max-w-xl` centralizado
- Tactical CTA: `tracking-wider`, ícone chevron-right que translada no hover, borda 1px glow, estados Default/Hover/Disabled
- Data Matrix Badge: JetBrains Mono, prefixo estilo terminal (`>`), cursor piscante
- Form pattern: One field per screen (conversational UI via Typeform/Tally embed)
- Success State: Rich messaging ("Analisando seu ecossistema... Tempo de resposta projetado: 24h úteis") — never generic "Obrigado"
- Button hierarchy: Primary (Emerald CTA only), Secondary (Ghost buttons — sem fundo, text-zinc-400, hover:bg-zinc-900)
- Focus rings: `focus-visible:ring-2 focus-visible:ring-emerald-500`
- Reading pacing: H2 + max 3 linhas de body text, depois bullet-points com ícones
- Header minimal: Logo SVG monocromático + CTA apenas (sem nav links "Sobre nós", "Blog")
- Footer: Links secundários (Políticas, Contato, Redes Sociais) — rede de segurança institucional
- No Corporate Memphis illustrations, no neon purple/blue gradients, no floating chatbots, no pricing tables

### FR Coverage Map

| FR | Epic | Descrição |
|---|---|---|
| FR1 | Epic 2 | Proposta de Valor na HeroSection |
| FR2 | Epic 2 | Navegação metodológica (Problem → Solution → CTA sections) |
| FR3 | Epic 1 | Responsividade via BaseLayout + Tailwind breakpoints |
| FR4 | Epic 3 | Interface de qualificação via TacticalCTA → DiagnosticModal |
| FR5 | Epic 3 | Preenchimento segmentado via Typeform/Tally embed |
| FR6 | Epic 3 | Validações Required via Typeform/Tally nativo |
| FR7 | Epic 3 | Feedback visual (Success State no DiagnosticModal) |
| FR8 | Epic 3 | Webhook seguro Typeform → n8n |
| FR9 | Epic 3 | Injeção CRM via n8n pipeline |

**Coverage: 9/9 FRs mapped (100%)** ✅

## Epic List

### Epic 1: Foundation & Visual Identity
The visitor experiences a blazing-fast, premium Dark Mode landing page with professional branding, responsive design, and accessibility — establishing immediate trust and authority.
**FRs covered:** FR3
**NFRs addressed:** NFR1, NFR2, NFR3, NFR4, NFR7, NFR8

### Epic 2: Narrative Content & Authority Positioning
The visitor reads the complete "Voo Cego" → "Método Aptus" narrative, immediately recognizing their operational pain and perceiving Aptus as the authoritative solution — guided through a cinematic vertical storytelling experience.
**FRs covered:** FR1, FR2

### Epic 3: Lead Qualification Engine & Conversion
The visitor clicks "Agendar Auditoria", is immersed in a focused diagnostic modal with an embedded Typeform/Tally questionnaire, fills out a qualified application, receives a rich success confirmation, and the lead is automatically injected into the Aptus CRM pipeline.
**FRs covered:** FR4, FR5, FR6, FR7, FR8, FR9
**NFRs addressed:** NFR5, NFR6

## Epic 1: Foundation & Visual Identity

The visitor experiences a blazing-fast, premium Dark Mode landing page with professional branding, responsive design, and accessibility — establishing immediate trust and authority.

### Story 1.1: Project Initialization & Tooling Setup

As a **developer**,
I want **a fully initialized Astro project with TypeScript Strict, Tailwind CSS v4, Cloudflare Pages adapter, and sitemap integration**,
So that **the technical foundation is ready for all subsequent development with zero overhead**.

**Acceptance Criteria:**

**Given** a clean project directory
**When** the initialization commands are executed (`npm create astro@latest ./ -- --template minimal --typescript strict --install --git` + `npx astro add tailwind`, `npx astro add cloudflare`, `npx astro add sitemap`)
**Then** the project runs successfully with `npm run dev` at localhost:4321
**And** TypeScript strict mode is enforced in `tsconfig.json`
**And** Tailwind CSS v4 is configured via `@tailwindcss/vite`
**And** the full directory structure is created: `src/components/sections/`, `src/components/ui/`, `src/components/layout/`, `src/layouts/`, `src/pages/`, `src/styles/`, `src/scripts/`, `src/assets/images/`, `src/assets/icons/`, `src/types/`
**And** `.env.example` is created with placeholder variables (`TYPEFORM_FORM_ID`, `PUBLIC_GA_ID`)
**And** `robots.txt` exists in `public/`
**And** naming conventions are documented inline (PascalCase .astro, camelCase .ts, kebab-case pages/CSS)

### Story 1.2: Design System & Global Styles

As a **visitor**,
I want **a consistent, premium Dark Mode visual identity across the entire page**,
So that **I immediately perceive Aptus as a serious, high-end engineering consultancy**.

**Acceptance Criteria:**

**Given** the initialized Astro project
**When** `global.css` is created with Tailwind v4 imports and design tokens
**Then** the Zinc palette is configured: `bg-zinc-950` (#09090b) as primary background, `zinc-900`/`zinc-800` for secondary surfaces
**And** the Emerald accent color (`#10b981`) is defined and reserved exclusively for CTAs, hover states, and validation success
**And** border token `border-zinc-800/50` (1px translucent) is established for "engineering grid" lines
**And** typography tokens are configured: Inter (headings, 600-700 weight, `tracking-tight`) and JetBrains Mono (data/badges)
**And** `@fontsource/inter` and `@fontsource/jetbrains-mono` are installed, self-hosted with `font-display: swap`
**And** text colors follow spec: `text-zinc-100` for headings, `text-zinc-400` for body (never 100% white)
**And** spacing tokens are established: `py-24` to `py-32` between sections, `max-w-7xl` with `mx-auto`
**And** Tailwind class ordering convention is enforced per Architecture doc (Layout → Spacing → Size → Typography → Colors → Effects → Transitions → States → Responsive)

### Story 1.3: BaseLayout, Header & Footer

As a **visitor**,
I want **a responsive page shell with proper SEO metadata, professional header and institutional footer**,
So that **the page loads fast, appears premium in search results, and provides institutional credibility** (FR3).

**Acceptance Criteria:**

**Given** the design system is in place
**When** `BaseLayout.astro` is created
**Then** it includes `<head>` with: charset, viewport, title tag, meta description, OG tags (og:title, og:description, og:image, og:type), structured data (Organization schema), canonical URL
**And** fonts are preloaded: Inter 400, 600, 700 variants with `rel="preload"` and `as="font"`
**And** `global.css` is imported in the layout
**And** `<body>` has `bg-zinc-950 text-zinc-100` base classes

**Given** `Header.astro` is created
**When** the page loads
**Then** the header displays the Aptus logo (SVG monocromático) on the left
**And** a TacticalCTA placeholder button appears on the right ("Agendar Auditoria")
**And** the header is sticky/fixed on scroll with `bg-zinc-950/80 backdrop-blur` effect
**And** the header is responsive: logo + CTA on desktop, logo centered + CTA as `w-full` on mobile
**And** no navigation links are present (no "Sobre nós", "Blog", etc.)

**Given** `Footer.astro` is created
**When** the visitor scrolls to the bottom
**Then** the footer displays: link to `/privacidade`, contact information, and social media links
**And** the footer uses `text-zinc-500` subdued styling with `border-t border-zinc-800/50` separator
**And** all links have proper `aria-label` attributes and `focus-visible:ring-2 focus-visible:ring-emerald-500`

### Story 1.4: ScrollReveal Component & Animations

As a **visitor**,
I want **content sections to elegantly reveal as I scroll the page**,
So that **the experience feels cinematic and premium, reinforcing the "architectural" brand identity**.

**Acceptance Criteria:**

**Given** the BaseLayout and design system are in place
**When** `ScrollReveal.astro` is created as an Astro Island (`client:visible`)
**Then** it uses IntersectionObserver to detect elements with `.scroll-reveal` class entering the viewport
**And** elements animate from `opacity-0 translate-y-4` to `opacity-100 translate-y-0` with CSS transitions (duration 500-700ms, ease-out)
**And** the `scrollReveal.ts` script lives in `src/scripts/` (not inside `components/`)
**And** `@media (prefers-reduced-motion: reduce)` disables all animations (elements appear instantly)
**And** no JavaScript animation libraries are used (CSS native only)
**And** the component uses `client:visible` (never `client:load`)

### Story 1.5: CI/CD Pipeline & Deployment

As a **developer**,
I want **an automated deployment pipeline that blocks releases failing performance standards**,
So that **the production site always meets Lighthouse ≥ 95 and deploys reliably to Cloudflare Pages edge**.

**Acceptance Criteria:**

**Given** the project is pushed to a GitHub repository
**When** a push to `main` branch occurs
**Then** GitHub Actions runs: lint → `astro build` → Lighthouse CI check → deploy to Cloudflare Pages
**And** the build fails if Lighthouse score < 95 in Performance, Best Practices, or SEO
**And** pushes to `preview/*` branches create Cloudflare Pages preview deployments automatically
**And** Cloudflare Web Analytics is enabled (cookieless, zero JS, no Lighthouse impact)
**And** environment variables (`TYPEFORM_FORM_ID`) are configured in Cloudflare Pages dashboard
**And** the `deploy.yml` and `lighthouse.yml` workflow files exist in `.github/workflows/`

## Epic 2: Narrative Content & Authority Positioning

The visitor reads the complete "Voo Cego" → "Método Aptus" narrative, immediately recognizing their operational pain and perceiving Aptus as the authoritative solution — guided through a cinematic vertical storytelling experience.

### Story 2.1: Hero Section — The "Choque Empático"

As a **visitor (CEO/COO)**,
I want **to immediately see a powerful headline and value proposition that mirrors my operational pain**,
So that **within the first 3 seconds I feel deeply understood and stay engaged** (FR1).

**Acceptance Criteria:**

**Given** the visitor loads the landing page
**When** `HeroSection.astro` renders in `src/components/sections/`
**Then** the headline "Pare de Automatizar o Caos" (or equivalent approved copy) is displayed in `text-zinc-100`, Inter font, semibold-bold weight, `tracking-tight`, sized appropriately for impact (`text-5xl md:text-6xl lg:text-7xl`)
**And** a subheadline of maximum 3 lines describes the "Engenharia Operacional" value proposition in `text-zinc-400`
**And** a TacticalCTA button ("Agendar Auditoria") is prominently placed below the text
**And** the section uses `py-24 lg:py-32` vertical spacing with `max-w-7xl mx-auto` centering
**And** the section has `.scroll-reveal` class for entrance animation
**And** the section is fully responsive: text sizes scale down for mobile (`text-3xl` max), left-aligned on mobile
**And** no stock images or generic AI illustrations are used — typography and spacing are the visual elements
**And** the content renders within LCP budget (≤ 2.0s) as it is above-the-fold static HTML

### Story 2.2: Problem Section — "O Voo Cego"

As a **visitor (CEO/COO)**,
I want **to see a vivid description of the operational chaos I face daily**,
So that **I feel my pain is clinically understood and I'm motivated to explore the solution** (FR2).

**Acceptance Criteria:**

**Given** the visitor scrolls past the Hero Section
**When** `ProblemSection.astro` renders
**Then** it displays a section title (H2) describing the "Voo Cego" (blind flight) metaphor
**And** the content is structured as: H2 headline + maximum 3 lines of body text + bullet-points with validation icons describing specific pain points (manual processes, linear scaling via hiring, memory-based operations)
**And** `DataMatrixBadge.astro` components display quantifiable metrics in JetBrains Mono font with terminal-style prefix (`>`) to reinforce the "engineering diagnosis" aesthetic
**And** the section uses `border-zinc-800/50` engineering grid lines as visual separators
**And** the section has `.scroll-reveal` on content blocks for staggered fade-in animation
**And** all text follows contrast rules: `text-zinc-100` for headlines, `text-zinc-400` for body (WCAG 2.1 AA ≥ 4.5:1 contrast ratio)
**And** the section uses generous spacing (`py-24 lg:py-32`) to provide "breathing room" combating the visitor's sense of operational suffocation

### Story 2.3: Solution Section — "Método Aptus"

As a **visitor (CEO/COO)**,
I want **to understand the Aptus method (Auditoria → Arquitetura → Deploy) as a structured, trustworthy process**,
So that **I transition from frustration to confidence that there's a reliable engineering approach to fix my operations** (FR2).

**Acceptance Criteria:**

**Given** the visitor scrolls past the Problem Section
**When** `SolutionSection.astro` renders
**Then** it presents the three methodological steps (Auditoria, Arquitetura, Deploy) in a clear, sequential visual layout
**And** each step is numbered using JetBrains Mono (`01`, `02`, `03`) reinforcing the engineering/code aesthetic
**And** each step has a concise title (H3) + a brief description (max 3 lines) explaining the value delivered
**And** `DataMatrixBadge.astro` components display relevant metrics where applicable
**And** the section uses `border-zinc-800/50` structural lines to separate the three phases visually
**And** the section has `.scroll-reveal` on each phase block for staggered reveal animation
**And** the layout is responsive: horizontal on desktop (3-column grid), vertical stack on mobile
**And** the visual treatment evokes "architectural blueprints" — structured, precise, and authoritative

### Story 2.4: CTA Section & Privacy Page

As a **visitor (CEO/COO)**,
I want **a final, compelling call-to-action section that drives me to request an audit, plus access to a clear privacy policy**,
So that **I transition from interest to action with full LGPD compliance** (FR2, LGPD).

**Acceptance Criteria:**

**Given** the visitor scrolls past the Solution Section
**When** `CTASection.astro` renders
**Then** it displays a concise headline reaffirming the value ("Sua Operação Merece Engenharia, Não Remendos" or equivalent approved copy)
**And** a prominent TacticalCTA button ("Agendar Auditoria") is centered with Emerald accent styling
**And** supporting text beneath the CTA provides reassurance ("Análise sem compromisso. Sua operação diagnosticada em até 24h úteis.")
**And** the section uses `py-24 lg:py-32` spacing and `.scroll-reveal` animation
**And** no pricing tables, plan columns, or "Compre Agora" language is used

**Given** a privacy page is required for LGPD
**When** `src/pages/privacidade.astro` is created
**Then** it uses the BaseLayout and displays a static privacy policy covering: data collected (name, email, company), purpose (lead qualification), processing (webhook to CRM), rights (access, rectification, deletion), data controller contact
**And** the page is accessible via the Footer link
**And** the page follows the same Dark Mode design system

### Story 2.5: Index Page Assembly

As a **visitor**,
I want **all content sections assembled into a single, cohesive vertical narrative on the main page**,
So that **I experience a seamless storytelling flow from "pain recognition" to "solution" to "action"** (FR1, FR2).

**Acceptance Criteria:**

**Given** all section components (HeroSection, ProblemSection, SolutionSection, CTASection) are complete
**When** `src/pages/index.astro` is updated to compose all sections
**Then** sections appear in the correct narrative order: Hero → Problem → Solution → CTA
**And** the page uses `BaseLayout.astro` as its layout wrapper
**And** ScrollReveal component is included for animations across all sections
**And** the vertical scroll flow is continuous with no page transitions or route changes (SPA experience)
**And** spacing between sections is consistent (`py-24 lg:py-32`) across the entire page
**And** the page passes Lighthouse ≥ 95 for Performance, Best Practices, SEO, and Accessibility
**And** OG image (`og-image.png` 1200x630px) is created and referenced in BaseLayout meta tags

## Epic 3: Lead Qualification Engine & Conversion

The visitor clicks "Agendar Auditoria", is immersed in a focused diagnostic modal with an embedded Typeform/Tally questionnaire, fills out a qualified application, receives a rich success confirmation, and the lead is automatically injected into the Aptus CRM pipeline.

### Story 3.1: TacticalCTA Component

As a **visitor**,
I want **a visually distinctive, premium call-to-action button that compels me to take action**,
So that **I clearly identify the single most important action on the page and feel confident clicking it** (FR4).

**Acceptance Criteria:**

**Given** the TacticalCTA component is placed in Hero, Header, and CTA sections
**When** `TacticalCTA.astro` renders in `src/components/ui/`
**Then** it displays text in uppercase with `tracking-wider` letter spacing and Inter font
**And** a chevron-right icon (`→` or SVG) is placed after the text and translates 4px to the right on hover (`hover:translate-x-1`)
**And** **Default state**: `border border-zinc-700 text-zinc-300 bg-transparent`
**And** **Hover state**: `hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400` with subtle inner glow
**And** **Disabled state**: `opacity-50 cursor-not-allowed`
**And** transitions are smooth: `transition-all duration-200 ease-out`
**And** the button has `aria-label="Agendar Auditoria Estratégica"` and `focus-visible:ring-2 focus-visible:ring-emerald-500`
**And** click instantly triggers a `CustomEvent('open-diagnostic')` or equivalent DOM event — no delay
**And** on mobile, the button renders as `w-full` when used in standalone CTA sections

### Story 3.2: DiagnosticModal — Overlay & Focus Lock

As a **visitor**,
I want **an immersive, distraction-free modal overlay that locks my focus on the diagnostic form**,
So that **I feel like I'm entering a serious, premium consultation environment, not a generic popup** (FR4).

**Acceptance Criteria:**

**Given** the visitor clicks any TacticalCTA button
**When** `DiagnosticModal.astro` opens as an Astro Island (`client:visible`)
**Then** the modal overlay covers 100vw × 100vh with `bg-zinc-950/80 backdrop-blur-xl`
**And** the modal content panel is centered with `max-w-xl mx-auto` with a subtle slide-up animation (`translate-y` from 8px to 0, opacity 0 to 1, duration 300ms ease-out)
**And** a close button (X) is positioned absolute top-right with `text-zinc-500 hover:text-zinc-100` and proper `aria-label="Fechar formulário de diagnóstico"`
**And** body scroll is locked when modal is open (preventing background scrolling)
**And** focus is trapped within the modal (Tab cycling through interactive elements only)
**And** pressing `Escape` key closes the modal
**And** clicking the backdrop (outside modal content) closes the modal
**And** `modal.ts` script lives in `src/scripts/` and handles: open/close, focus trap, body scroll lock
**And** the modal uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to the modal title
**And** `@media (prefers-reduced-motion: reduce)` disables the slide-up animation (modal appears instantly)

### Story 3.3: Typeform/Tally Embed & Form Integration

As a **visitor (CEO/COO)**,
I want **to fill out a diagnostic questionnaire embedded seamlessly within the modal**,
So that **I can detail my operational pain points in a focused, conversational format without leaving the page** (FR5, FR6).

**Acceptance Criteria:**

**Given** the DiagnosticModal is open
**When** the Typeform/Tally embed loads inside the modal
**Then** the embed is lazy-loaded only when the modal opens (never on page load — preserving NFR3)
**And** a skeleton placeholder (`animate-pulse bg-zinc-800 rounded`) displays while the embed loads
**And** the embed uses a responsive iframe that adapts to `max-w-xl` container width and fills available height
**And** the form ID is sourced from environment variable (`TYPEFORM_FORM_ID`) — never hardcoded
**And** form validation (required fields) is handled natively by Typeform/Tally (FR6) — zero custom JS validation
**And** the one-field-per-screen conversational UI pattern is configured within Typeform/Tally
**And** LGPD consent checkbox ("Aceito a Política de Privacidade" with link to `/privacidade`) is included as a required field in the Typeform/Tally form
**And** if the embed fails to load, a fallback is displayed: "Entre em contato: contato@aptus.com" with a mailto link

### Story 3.4: Success State & Post-Submission Experience

As a **visitor**,
I want **rich, authoritative confirmation after submitting my diagnostic form**,
So that **I feel my request is being actively processed by specialists, not thrown into a void** (FR7).

**Acceptance Criteria:**

**Given** the visitor successfully submits the Typeform/Tally form
**When** the submission is completed
**Then** the DiagnosticModal transitions to a success state (within the same modal, not a redirect)
**And** the success message displays rich content: "Analisando seu ecossistema..." followed by "Seu perfil foi enviado ao núcleo de Engenharia Aptus. Tempo de resposta projetado: 24h úteis."
**And** the message uses `text-zinc-100` for the primary confirmation and `text-zinc-400` for the timeline details
**And** a subtle Emerald checkmark or accent element confirms success visually
**And** no confetti, fireworks, or generic "Obrigado!" messaging is used
**And** a "Fechar" button (Ghost style) allows the user to return to the landing page
**And** the success state is accessible: proper `role="status"` and `aria-live="polite"` for screen readers

### Story 3.5: Webhook Integration & CRM Pipeline

As the **Aptus operations team**,
I want **every qualified lead automatically injected into our CRM with error notifications**,
So that **no lead is lost and the team can respond within 24 hours** (FR8, FR9).

**Acceptance Criteria:**

**Given** a visitor successfully submits the Typeform/Tally form
**When** Typeform/Tally triggers its native webhook
**Then** an HTTP POST request is sent to the n8n endpoint URL with a JSON payload containing all form responses
**And** the webhook includes `Authorization: Bearer <token>` header for security
**And** the payload follows `snake_case` key format: `{ "lead_name": "...", "email": "...", "company": "...", "pain_points": "...", "team_size": "...", "tools_count": ... }`
**And** Typeform/Tally's built-in retry mechanism handles transient failures automatically

**Given** n8n receives the webhook payload
**When** the n8n workflow processes the lead
**Then** it validates the payload structure and enriches the lead data if applicable
**And** it injects the lead as a card/entry in the CRM (Notion/Trello) with all submitted details
**And** it triggers a notification to the Aptus team (Slack/Email) with lead summary

**Given** the n8n workflow encounters an error
**When** processing fails
**Then** the n8n Error Workflow activates and sends an error notification to the operations team
**And** the failed payload is logged for manual recovery (Dead Letter Queue pattern)
**And** the webhook tolerates up to 10-20 simultaneous submissions without data loss (NFR6)
