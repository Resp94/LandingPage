# Story 2.1: Hero Section — The "Choque Empático"

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como **visitante (CEO/COO)**,
Eu quero **ver imediatamente uma forte manchete (headline) e proposta de valor que espelhe a minha dor operacional**,
Para que **nos primeiros 3 segundos eu me sinta profundamente compreendido e permaneça engajado (FR1)**.

## Critérios de Aceitação

1. **Dado** que o visitante carrega a landing page
2. **Quando** `HeroSection.astro` for renderizado em `src/components/sections/`
3. **Então** a manchete "Pare de Automatizar o Caos" (ou copy aprovado equivalente) deve ser exibida com `text-zinc-100`, fonte Inter, peso semibold/bold, `tracking-tight`, dimensionado para alto impacto (`text-5xl md:text-6xl lg:text-7xl`)
4. **E** uma sub-manchete de no máximo 3 linhas descrevendo a proposta de valor "Engenharia Operacional" em `text-zinc-400`
5. **E** um botão TacticalCTA ("Agendar Auditoria") posicionado de forma proeminente logo abaixo do texto
6. **E** a seção usa espaçamento vertical `py-24 lg:py-32` com centralização `max-w-7xl mx-auto`
7. **E** a seção possui a classe `.scroll-reveal` para animação de entrada
8. **E** a seção é totalmente responsiva: textos dimensionam para baixo no mobile (`text-3xl max`), com alinhamento à esquerda no mobile
9. **E** nenhuma imagem de banco de imagens abstrata ou de IA genérica é usada — a tipografia e o espaço negativo são os principais elementos visuais
10. **E** o conteúdo renderiza dentro do orçamento de LCP (≤ 2.0s), por ser um HTML estático above-the-fold

## Tarefas / Subtarefas

- [x] Criar arquivo `HeroSection.astro` na pasta `src/components/sections/` (CA: 2)
  - [x] Estruturar marcação HTML semântica (`<section>`, `<header>`, `<h1>`, `<p>`)
- [x] Aplicar classes de tipografia baseadas na `Inter` (Font weight, Color, Tracking, Sizes) (CA: 3, 4)
  - [x] Título (h1) com classes Tailwind: `text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100`
  - [x] Sub-título (p) com `text-zinc-400 max-w-2xl`
- [x] Criar espaçamentos e grids (CA: 6, 8)
  - [x] Aplicar ao container principal: `w-full py-24 lg:py-32`
  - [x] Aplicar no interior: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` para segurar centralização segura
  - [x] Garantir que o texto mude de left-align no mobile para center no Desktop (se essa for a orientação adotada da Hero). *Nota: O UX cita restrições severas sobre text-alignment, revisar a preferência do mobile esquerda / Desktop central se achar adequado*.
- [x] Adicionar botão de "Agendar Auditoria" (TacticalCTA Placeholder) (CA: 5)
  - [x] Use as classes provisórias para simular o Tactical CTA (uma vez que ele passará por detalhamento total na Story 3.1): `inline-flex items-center justify-center uppercase tracking-wider border border-zinc-700 text-zinc-300 bg-transparent hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-200 ease-out px-8 py-4 mt-8 rounded-none` (ou com pouca borda).
- [x] Otimização para LCP e Animações (CA: 7, 9, 10)
  - [x] Adicionar classe `.scroll-reveal` no wrapper que envolve os textos e CTA, para entrada animada pelo script global base.
  - [x] Certificar que esse arquivo não traga componentes pesados `<script>` ou pacotes externos.

## Dev Notes

- **Architecture Constraints:**
  - Component strategy: **Astro Islands (Zero-JS Default)** - `HeroSection.astro` não terá nenhum bloco JavaScript ativado no lado do cliente. Componente 100% renderizado no servidor (SSG) para focar na performance e tempo de TTFB/LCP. Não deve possuir a diretriz `client:load` nem `client:visible`.
  - **Tailwind Order Convention:** O desenvolvedor DEVE ordernar os utilitários segundo o padrão:
    `Layout → Spacing → Size → Typography → Colors → Effects → Transitions → States → Responsive`
  - Nenhuma regra CSS inline (`style="..."`).
  - Nenhum CSS custom via tags `<style>` no Astro para esse elemento (Tudo via utilitários do Tailwind v4).

- **UX/Design Constraints:**
  - Direção de Design: **Luxo Operacional B2B**. Use e abuse do "Void" (Espaço Neutro/Vácuo). O respiro em volta do texto é a verdadeira arte.
  - Modo: Dark Mode Nativo sem toggle (O fundo da página já é `bg-zinc-950` na BaseLayout, a Hero deve incorporar esse visual).
  - Nunca use uma cor 100% branca ou preta, utilize a paleta Zinc (`text-zinc-100` para impacto e `text-zinc-400` para leitura prolongada).
  - A cor Accent (Emerald) só deve ser usada pontualmente no Hover do botão ("Agendar Auditoria"), para reter a singularidade técnica.

### Referências do Projeto

- **Arquitetura (Design Decisions):** `_bmad-output/planning-artifacts/architecture.md#Frontend Architecture` e `_bmad-output/planning-artifacts/architecture.md#Implementation Patterns & Consistency Rules`
- **UX Design:** `_bmad-output/planning-artifacts/ux-design-specification.md#User Journey Flows` e `#Component Strategy`
- **Epics:** `_bmad-output/planning-artifacts/epics.md#Story 2.1: Hero Section — The "Choque Empático"`

## Dev Agent Record

### Agent Model Used
Gemini 2.5 Pro (BMAD-Agent)

### Debug Log References
- Extracted contexts natively from PRD, Epics, UX and Arch.

### Completion Notes List
- Ultimate context engine analysis completed. 
- Story generated in pt-BR as per user global memory rule.
- Sprint status updated to 'ready-for-dev' and Epic 2 to 'in-progress'.
- Arquivo `HeroSection.astro` implementado obedecendo rigorosamente à regra de Zero-JS e estrutura HTML semântica (SSG).
- Tailwind v4 classes aplicadas para tipografia impecável usando Inter.
- Responsividade garantida (textos variam tamanho e alinhamento: left mobile / center desktop).
- Code review AI aplicado com correções de conformidade: CTA copy alinhada, subheadline limitada a 3 linhas, cobertura de teste específica da story 2.1 e remoção de script inline do `TacticalCTA`.

## File List
- `src/components/sections/HeroSection.astro` (Criado)
- `src/components/ui/TacticalCTA.astro` (Atualizado - componente estático sem script inline)
- `src/components/ui/DiagnosticModal.astro` (Atualizado - delegação de clique para dispatch `open-diagnostic`)
- `tests/story-2-1-hero.test.mjs` (Criado - validação completa dos ACs da Story 2.1)
- `tests/story-3-1-tacticalcta.test.mjs` (Atualizado - valida fluxo de trigger delegado)
- `package.json` (Atualizado - script `test:story-2-1`)

## Change Log
- 2026-03-03: Implementada a `HeroSection.astro` com markup estático otimizado par LCP, focando no Dark Mode e paleta Zinc.
- 2026-03-04: Review AI resolvida com ajustes de ACs e testes; story mantida em `done`.

## Senior Developer Review (AI)

### Outcome
- Approved after fixes.

### Summary of Fixes
- Removido JavaScript inline de `TacticalCTA.astro`; trigger de abertura do modal centralizado no script de `DiagnosticModal.astro`.
- Alinhado copy do CTA da Hero para `"Agendar Auditoria"` conforme AC.
- Aplicado `line-clamp-3` na subheadline para garantir limite de até 3 linhas.
- Adicionado teste dedicado `tests/story-2-1-hero.test.mjs` para validar os ACs da Story 2.1.
- Atualizado `tests/story-3-1-tacticalcta.test.mjs` para a arquitetura de click delegation.

### AC Validation Snapshot
- AC3 headline + tipografia: PASS
- AC4 subheadline + `text-zinc-400` + 3 linhas: PASS
- AC5 TacticalCTA proeminente com copy correta: PASS
- AC6 spacing + centering: PASS
- AC7 `.scroll-reveal`: PASS
- AC8 responsividade + alinhamento mobile left: PASS
- AC9 sem imagens genéricas: PASS
- AC10 estrutura estática no `HeroSection.astro` + guarda de testes: PASS
