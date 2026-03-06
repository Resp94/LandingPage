---
stepsCompleted:
  - step-01-validate-prerequisites
  - step-02-design-epics
  - step-03-create-stories
  - step-04-final-validation
status: complete
completedAt: '2026-03-06T13:10:00-04:00'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
  - '_bmad-output/planning-artifacts/sprint-change-proposal-2026-03-05.md'
---

# LandingPage - Epic Breakdown (V2 Refactor Formalization)

## Overview

Este documento formaliza a virada para a V2 (Aptus High-Impact Minimalist), preservando o historico concluido dos Epics 1-3 e abrindo um novo ciclo de execucao para Identidade, Narrativa e Conversao V2.

## Epic Status Ledger

| Epic | Titulo | Status |
|---|---|---|
| Epic 1 | Foundation & Visual Identity | done |
| Epic 2 | Narrative Content & Authority Positioning | done |
| Epic 3 | Lead Qualification Engine & Conversion | done |
| Epic 4 | Identidade V2 (Precision Black + EngineeringGrid + Componentizacao) | backlog |
| Epic 5 | Narrativa V2 (Hero + Flow + Technical Rebuild) | backlog |
| Epic 6 | Conversao V2 (DiagnosticModalV2 + gatilhos cinematograficos) | backlog |

## Registro Concluido - Epics 1, 2 e 3

### Epic 1: Foundation & Visual Identity (done)

Stories concluidas:
- 1.1 Project Initialization & Tooling Setup
- 1.2 Design System & Global Styles
- 1.3 BaseLayout, Header & Footer
- 1.4 ScrollReveal Component & Animations
- 1.5 CI/CD Pipeline & Deployment
- 1.6 Dynamic Global Settings (Supabase Integration)

### Epic 2: Narrative Content & Authority Positioning (done)

Stories concluidas:
- 2.1 Hero Section - The "Choque Empatico"
- 2.2 Problem Section - "O Voo Cego"
- 2.3 Solution Section - "Metodo Aptus"
- 2.4 CTA Section & Privacy Page
- 2.5 Index Page Assembly

### Epic 3: Lead Qualification Engine & Conversion (done)

Stories concluidas:
- 3.1 TacticalCTA Component
- 3.2 DiagnosticModal - Overlay & Focus Lock
- 3.3 Typeform/Tally Embed & Form Integration
- 3.4 Success State & Post-Submission Experience
- 3.5 Webhook Integration & CRM Pipeline

## Epic 4: Identidade V2

A V2 precisa nascer de uma base visual e estrutural nova: tokens Precision Black, grade de engenharia reutilizavel e componentizacao coerente com a linguagem "brutalismo estrutural + minimalismo etereo".

### Story 4.1: Configuracao de Tokens V2 (Precision Black)

As a **developer**,
I want **a complete V2 token map for colors, typography, borders, spacing, and accents**,
So that **all sections share the same visual grammar and avoid visual drift**.

**Acceptance Criteria:**

**Given** a base Astro + Tailwind project ja funcional  
**When** os tokens V2 forem definidos em `global.css`/Tailwind theme  
**Then** a paleta Precision Black e aplicada (`#000000`, `#050505`, `#0D0D0D`, `#F5F5F5`, `#B3B3B3`, `#7A7A7A`)  
**And** os acentos taticos (`#8FFFE3`, `#A7F3FF`) ficam restritos a indicadores criticos  
**And** tipografia operacional fica padronizada (Inter/Geist + Geist Mono fallback)  
**And** bordas e linhas de engenharia (1px baixa opacidade) viram token reutilizavel  
**And** "Lighthouse Score >= 95" e obrigatorio para Performance, Accessibility, Best Practices e SEO.

### Story 4.2: EngineeringGrid em Tailwind CSS Puro

As a **developer**,
I want **a reusable EngineeringGrid pattern built with Tailwind CSS puro**,
So that **the V2 structural language appears consistently without custom grid libraries or heavy scripts**.

**Acceptance Criteria:**

**Given** os tokens V2 estejam ativos  
**When** o componente/utilitario `EngineeringGrid` for criado  
**Then** as linhas de grade e divisores tecnicos sao implementados apenas com Tailwind CSS puro  
**And** o grid suporta variacoes para desktop, tablet e mobile com densidade ajustada  
**And** nao existe dependencia de JS para render da grade estrutural  
**And** a grade nunca compete com legibilidade de texto e CTA  
**And** "Lighthouse Score >= 95" e obrigatorio para Performance, Accessibility, Best Practices e SEO.

### Story 4.3: Componentizacao V2 Core

As a **developer**,
I want **V2 core components aligned to the new tokens and structural language**,
So that **Hero, Flow, Technical e Conversao possam ser reconstruidos com consistencia e velocidade**.

**Acceptance Criteria:**

**Given** tokens e EngineeringGrid estejam prontos  
**When** os componentes V2 core forem criados (`DataMatrixBadgeV2`, `TacticalCTAV2`, wrappers de secao)  
**Then** todos os componentes usam os mesmos tokens de cor, tipografia e borda  
**And** estados `hover`, `focus-visible`, `active` e `disabled` ficam padronizados  
**And** o CTA V2 emite gatilho de abertura para o modal V2 sem acoplamento fraco  
**And** componentes preservam acessibilidade por teclado e contraste AA  
**And** "Lighthouse Score >= 95" e obrigatorio para Performance, Accessibility, Best Practices e SEO.

## Epic 5: Narrativa V2

A narrativa central sera reconstruida para reforcar autoridade tecnica em menos de 3 segundos e conduzir o decisor no fluxo Hero -> Flow -> Technical sem ruido visual.

### Story 5.1: Rebuild HeroSectionV2

As a **visitor (CEO/COO)**,
I want **a high-impact Hero with immediate authority signals**,
So that **I understand em poucos segundos que a Aptus resolve caos operacional com metodo**.

**Acceptance Criteria:**

**Given** os componentes core V2 estejam disponiveis  
**When** `HeroSectionV2` for implementado  
**Then** a secao exibe badge tecnico, headline de impacto, subheadline curta e CTA primario consultivo  
**And** a dobra inicial usa Precision Black + estrutura limpa sem decoracao redundante  
**And** copy e hierarchy seguem a tese de qualificacao de lead por diagnostico  
**And** comportamento responsivo mantem impacto em desktop/tablet/mobile  
**And** "Lighthouse Score >= 95" e obrigatorio para Performance, Accessibility, Best Practices e SEO.

### Story 5.2: Rebuild FlowSectionV2

As a **visitor (CEO/COO)**,
I want **a deterministic flow section (Diagnostico -> Arquitetura -> Operacao)**,
So that **I veja um metodo previsivel e nao uma promessa vaga**.

**Acceptance Criteria:**

**Given** HeroSectionV2 esteja implementada  
**When** `FlowSectionV2` for reconstruida  
**Then** os 3 blocos metodologicos aparecem em sequencia logica com divisores de 1px  
**And** `EngineeringGrid` e aplicado como linguagem estrutural de fundo/separacao  
**And** toda a composicao da grade tecnica usa Tailwind CSS puro  
**And** badges tecnicos reforcam prova de maturidade sem excesso visual  
**And** "Lighthouse Score >= 95" e obrigatorio para Performance, Accessibility, Best Practices e SEO.

### Story 5.3: Rebuild TechnicalSectionV2

As a **visitor (CEO/COO)**,
I want **a technical capacity section with objective operational proof**,
So that **I confio na execucao real antes de iniciar o diagnostico**.

**Acceptance Criteria:**

**Given** FlowSectionV2 esteja pronta  
**When** `TechnicalSectionV2` for reconstruida  
**Then** os cards tecnicos apresentam capacidades com linguagem objetiva e verificavel  
**And** Data badges em fonte mono destacam confiabilidade, previsibilidade e impacto  
**And** o uso de accent color fica restrito a indicadores criticos  
**And** a secao permanece legivel e densa na medida certa em todos os breakpoints  
**And** "Lighthouse Score >= 95" e obrigatorio para Performance, Accessibility, Best Practices e SEO.

## Epic 6: Conversao V2

A conversao V2 deve parecer uma continuidade cinematografica da narrativa, com modal consultivo em Astro Island e gatilhos de abertura/fechamento precisos, elegantes e performaticos.

### Story 6.1: DiagnosticModalV2 como Astro Island

As a **visitor**,
I want **a premium diagnostic modal that opens without breaking narrative flow**,
So that **I enter a focused consultive environment instead of a generic popup**.

**Acceptance Criteria:**

**Given** o CTA V2 esteja funcional  
**When** `DiagnosticModalV2` for implementado como Astro Island  
**Then** a hidratacao ocorre de forma seletiva (`client:visible` ou equivalente aprovado para o ponto critico)  
**And** modal implementa focus lock, body scroll lock, escape/backdrop close e `aria-modal`  
**And** animacao respeita `prefers-reduced-motion`  
**And** embed de formulario e lazy-loaded apenas na abertura do modal  
**And** "Lighthouse Score >= 95" e obrigatorio para Performance, Accessibility, Best Practices e SEO.

### Story 6.2: Gatilhos Cinematograficos (CTA -> Modal)

As a **visitor**,
I want **a cinematic transition from CTA click to diagnostic focus**,
So that **the action feels inevitable, fluid, and high-trust**.

**Acceptance Criteria:**

**Given** `DiagnosticModalV2` exista como Astro Island  
**When** qualquer `TacticalCTAV2` for clicado  
**Then** o evento de abertura aciona transicao sem troca de rota  
**And** o background recebe blur/atenuacao e o painel emerge com movimento curto e preciso  
**And** nao ha flicker, salto de layout ou sensacao de "popup invasivo"  
**And** o fechamento retorna ao contexto original sem quebrar scroll state  
**And** "Lighthouse Score >= 95" e obrigatorio para Performance, Accessibility, Best Practices e SEO.

### Story 6.3: Conversao Consultiva V2 (Embed + Success)

As a **visitor**,
I want **a full consultive conversion flow with robust success state**,
So that **I complete the diagnostico com confianca no proximo passo**.

**Acceptance Criteria:**

**Given** o modal abra corretamente via gatilhos cinematograficos  
**When** o visitante iniciar e concluir o formulario  
**Then** o fluxo exibe carregamento elegante, fallback de erro e estado de sucesso consultivo (nao generico)  
**And** o sucesso reforca expectativa de retorno e contexto operacional de analise  
**And** eventos de conversao (open, start, submit, success) ficam rastreaveis para validacao de KPI  
**And** integracoes mantem seguranca e comportamento resiliente sem custo alto de JS  
**And** "Lighthouse Score >= 95" e obrigatorio para Performance, Accessibility, Best Practices e SEO.
