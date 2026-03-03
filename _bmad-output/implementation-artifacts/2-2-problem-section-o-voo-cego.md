# Story 2.2: Problem Section — "O Voo Cego"

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como **visitante (CEO/COO)**,
Eu quero **ver uma descrição vívida do caos operacional que enfrento diariamente**,
Para que **eu sinta que minha dor foi diagnosticada clinicamente e me sinta motivado a explorar a solução (FR2)**.

## Critérios de Aceitação

1. **Dado** que o visitante rola a página além da Hero Section
2. **Quando** `ProblemSection.astro` for renderizado
3. **Então** ele deve exibir um título de seção (H2) descrevendo a metáfora "Voo Cego"
4. **E** o conteúdo é estruturado como: título H2 + máximo de 3 linhas de texto base + bullet-points com ícones de validação técnica descrevendo dores específicas (processos manuais, escala linear por contratação, operações baseadas em memória)
5. **E** componentes `DataMatrixBadge.astro` exibem métricas quantificáveis na fonte JetBrains Mono com o prefixo estilo terminal (`>`) para reforçar a estética de "diagnóstico de engenharia"
6. **E** a seção usa linhas de "grid de engenharia" `border-zinc-800/50` como separadores visuais
7. **E** a seção possui a classe `.scroll-reveal` nos blocos de conteúdo para permitir a animação de entrada
8. **E** todo texto segue estritamente regras de contraste: `text-zinc-100` para títulos, `text-zinc-400` para corpo de texto (WCAG 2.1 AA ≥ 4.5:1)
9. **E** a seção usa um espaçamento generoso (`py-24 lg:py-32`) para conferir "respiro" contra a sensação de sufocamento operacional

## Tarefas / Subtarefas

- [x] Criar o componente `DataMatrixBadge.astro` na pasta `src/components/ui/` (CA: 5, 8)
  - [x] Utilizar a fonte `JetBrains Mono` importada globalmente via fontsource / Tailwind.
  - [x] Desenhar o prefixo estilo terminal (`>`) com cor mais vibrante (`text-zinc-500` ou similar discreto) e o texto/número em `text-zinc-100`.
  - [x] Implementar as props necessárias (ex: label, value) mantendo o componente estático, renderizado 100% no servidor (SSG). Sem JS client-side.
- [x] Criar o componente `ProblemSection.astro` na pasta `src/components/sections/` (CA: 3, 4, 6, 8)
  - [x] Estruturar a tag `<section>` com os espaçamentos principais e wrappers exigidos (`w-full py-24 lg:py-32`, e internamente `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
  - [x] Seguir a estrutura do conteúdo estipulada: 1 `<header>` com título `H2` (`text-zinc-100 font-bold tracking-tight text-4xl lg:text-5xl`) e layout em Flex ou CSS Grid para dispor ao lado ou abaixo o texto limitando a no máximo `3 linhas` (`max-w-3xl text-zinc-400`).
  - [x] Adicionar os blocos de "dores": Grid de 2 ou 3 colunas divididas contendo bullet points visuais e com os componentes `DataMatrixBadge.astro`.
  - [x] Configurar os `border-zinc-800/50` para construir separadores estruturais (Grid lines) entre blocos de conteúdos da seção.
- [x] Otimização Visual & Animação (CA: 7, 9)
  - [x] Embutir aos conteiners dos textos e blocos do grid a classe base `.scroll-reveal` que interage com o IntersectionObserver global em `src/scripts/scrollReveal.ts` (já ativado na HeroSection).
  - [x] Certificar adequação responsiva: No Mobile uma única coluna vertical empilhada com texto alinhado à esquerda; em Tablet/Desktop dividindo o grid da arquitetura de problemas. Replicar ordem sugerida de classes do Tailwind v4 (`Layout → Spacing → Size → Typography → Colors → Effects → Transitions → States → Responsive`).

## Dev Notes

- **Architecture Constraints:**
  - Component strategy: **Astro Islands (Zero-JS Default)** - `ProblemSection.astro` e `DataMatrixBadge.astro` não terão bloco JavaScript (Nada de diretriz `client:load` ou `client:visible`). Estes são os "estáticos", o focus é LCP (Performance >= 95).
  - **Tailwind Order Convention:** O layout de regras Tailwind deve ser seguido (Layout → Spacing → ... → Responsive).
  - Evite bibliotecas externas (sem scripts CDN).

- **UX/Design Constraints:**
  - Direção de Design: **Luxo Operacional B2B e Brutalismo**. Muito "Void" (espaço em branco que para Dark UI é preto). Sem imagens de stock ou templates de IA.
  - Apenas as fontes *Inter* para os textos descritivos e *JetBrains Mono* para as métricas (`DataMatrixBadge`).
  - Dark Mode Nativo sem toggle (O fundo da página Base já entrega `bg-zinc-950`). Nenhum item será 100% branco ou preto. Priorizar os aliases do design `text-zinc-100` para títulos e `text-zinc-400` para descrições.
  - O texto não pode assustar com sua extensão espacial. Uma linha de texto que ocupe muito na horizontal é evitada (`max-w-` aplicável via utility).

- **Learnings from Previous Story (2.1 Hero Section):**
  - O contêiner de safearea padrão estabelecido e testado com êxito na SR 2.1 é `w-full` seguido por outro wrapper base de `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`. Este padrão deve ser mantido na Problem Section para alinhamento vertical impecável e respiro.

### Project Structure Notes

- `src/components/sections/ProblemSection.astro` (New)
- `src/components/ui/DataMatrixBadge.astro` (New)
- Refira-se localmente aos guias de Tailwind v4 no arquivo `src/styles/global.css` originário da story base (1.2) para compreender se utilities foram mapeadas.

### References

- **Architecture (Design Decisions):** `_bmad-output/planning-artifacts/architecture.md#Frontend Architecture` e `#Implementation Patterns & Consistency Rules`
- **UX Design:** `_bmad-output/planning-artifacts/ux-design-specification.md#User Journey Flows`
- **Epics:** `_bmad-output/planning-artifacts/epics.md#Story 2.2: Problem Section — "O Voo Cego"`

## Dev Agent Record

### Agent Model Used
Gemini 2.5 Pro (BMAD-Agent)

### Debug Log References
- Extracted contexts natively from PRD, Epics, UX and Arch files correctly avoiding all missing docs. 
- Integrated Git pattern analysis regarding safe area container wrappers structure `max-w-7xl px-4...` and the scroll-reveal usage validated on Story 2.1.
- Document generated completely in localized Portuguese (pt-BR) as mandated by user's set global rules.

### Completion Notes List
- Ultimate context engine analysis completed. 
- Component guide formulated with meticulous focus in 'Static-SSG' requirement ensuring no framework reactivity bloat.
- Status configured as 'ready-for-dev'.
- Implementado DataMatrixBadge.astro estritamente seguindo styling do terminal e Astro estático.
- Implementado ProblemSection.astro com animações de scrollReveal nativas, grid cards e design limpo.
- Adicionados os DataMatrixBadge com valores estáticos e responsividade do grid conforme solicitado nas notas.
- Todos os testes de build confirmam sucesso do empacotamento Astro. O status da story evoluiu para 'review'.

### File List
- `_bmad-output/implementation-artifacts/2-2-problem-section-o-voo-cego.md`
- `src/components/ui/DataMatrixBadge.astro`
- `src/components/sections/ProblemSection.astro`
- `src/pages/index.astro`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`

## Change Log
- 2026-03-03: Code review fixes aplicadas (montagem da `ProblemSection` na `index`, ajuste de contraste do H2, conversão para lista semântica `ul/li`, SVGs decorativos com `aria-hidden` e sincronização de status para `done`).

