# Story 2.1: Hero Section — The "Choque Empático"

Status: ready-for-dev

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

- [ ] Criar arquivo `HeroSection.astro` na pasta `src/components/sections/` (CA: 2)
  - [ ] Estruturar marcação HTML semântica (`<section>`, `<header>`, `<h1>`, `<p>`)
- [ ] Aplicar classes de tipografia baseadas na `Inter` (Font weight, Color, Tracking, Sizes) (CA: 3, 4)
  - [ ] Título (h1) com classes Tailwind: `text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100`
  - [ ] Sub-título (p) com `text-zinc-400 max-w-2xl`
- [ ] Criar espaçamentos e grids (CA: 6, 8)
  - [ ] Aplicar ao container principal: `w-full py-24 lg:py-32`
  - [ ] Aplicar no interior: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` para segurar centralização segura
  - [ ] Garantir que o texto mude de left-align no mobile para center no Desktop (se essa for a orientação adotada da Hero). *Nota: O UX cita restrições severas sobre text-alignment, revisar a preferência do mobile esquerda / Desktop central se achar adequado*.
- [ ] Adicionar botão de "Agendar Auditoria" (TacticalCTA Placeholder) (CA: 5)
  - [ ] Use as classes provisórias para simular o Tactical CTA (uma vez que ele passará por detalhamento total na Story 3.1): `inline-flex items-center justify-center uppercase tracking-wider border border-zinc-700 text-zinc-300 bg-transparent hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-200 ease-out px-8 py-4 mt-8 rounded-none` (ou com pouca borda).
- [ ] Otimização para LCP e Animações (CA: 7, 9, 10)
  - [ ] Adicionar classe `.scroll-reveal` no wrapper que envolve os textos e CTA, para entrada animada pelo script global base.
  - [ ] Certificar que esse arquivo não traga componentes pesados `<script>` ou pacotes externos.

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
