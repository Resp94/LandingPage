# Story 2.3: Solution Section — "Método Aptus"

Status: in-progress

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como **visitante (CEO/COO)**,
Eu quero **entender o Método Aptus (Auditoria → Arquitetura → Deploy) como um processo estruturado e confiável**,
Para que **eu transacione da frustração para a confiança de que existe uma abordagem confiável de engenharia para consertar minhas operações (FR2)**.

## Critérios de Aceitação

1. **Dado** que o visitante rola através da Problem Section
2. **Quando** `SolutionSection.astro` renderiza
3. **Então** ele deve apresentar as três etapas metodológicas (Auditoria, Arquitetura, Deploy) em um layout visual claro e sequencial
4. **E** cada etapa deve ser numerada usando a fonte JetBrains Mono (01, 02, 03) reforçando a estética de "engenharia/código"
5. **E** cada etapa deve ter um título conciso (H3) + uma breve descrição (máximo 3 linhas) explicando o valor entregue
6. **E** componentes `DataMatrixBadge.astro` devem exibir métricas relevantes onde aplicável
7. **E** a seção usa linhas estruturais `border-zinc-800/50` para separar visualmente as três fases
8. **E** a seção possui a classe `.scroll-reveal` em cada bloco de fase para animação de revelação em estágios
9. **E** o layout é responsivo: horizontal no desktop (grid de 3 colunas), empilhamento vertical no mobile
10. **E** o tratamento visual evoca "blueprints arquiteturais" — estruturado, preciso e com autoridade

## Tarefas / Subtarefas

- [x] Criar o componente `SolutionSection.astro` na pasta `src/components/sections/` (CA: 2 a 10)
  - [x] Implementar a tag estrutural `<section>` e o grid wrapper limitando a `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` utilizando espaçamento base `py-24 lg:py-32`. (CA: 9)
  - [x] Configurar layout responsivo com um CSS Grid (ex: `grid grid-cols-1 lg:grid-cols-3 gap-8` ou uso de divisores laterais `divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/50`) para dar o tom de "blueprint". (CA: 7, 9)
  - [x] Adicionar um loop ou repetição estática das três etapas metodológicas: Auditoria, Arquitetura e Deploy. (CA: 3)
  - [x] Em cada card da etapa, renderizar o número com `JetBrains Mono` formatado (ex. `01`, `02`) antes de um título `H3` e de texto descritivo curto. (CA: 4, 5)
  - [x] Embutir a chamada do componente pré-existente `DataMatrixBadge.astro` com métricas sugeridas do método (prazo SLA estimativo, ou output metric). (CA: 6)
  - [x] Embutir aos conteiners dos cards a classe `.scroll-reveal` para a animação em scroll gerenciada pelo observer global (`src/scripts/scrollReveal.ts`). (CA: 8)

## Dev Notes

- **Architecture Constraints:**
  - Component strategy: **Astro Islands (Zero-JS Default)** - `SolutionSection.astro` renderizado 100% via servidor. JS client-side deve se manter zero (LCP <= 2.0s). Nada de diretriz `client:load` ou `client:visible`.
  - Componentização visual: Manter CSS transitions nativas, controladas através das utilities Tailwind, e obedecer à diretriz de ordenamento de classes (Layout → Spacing → ... → Responsive).
- **UX/Design Constraints:**
  - Direção de Design: **Luxo Operacional B2B e Brutalismo**. Muito "Void" e divisão através de border lines que remetem a blueprints matemáticos.
  - Utilizar fontes *Inter* para copy natural e *JetBrains Mono* apenas para marcadores numéricos/métricas.
  - Strict Dark Mode rules: Fundo herdado do parent `bg-zinc-950`. Texto de apoio usando aliases brandos do design (como `text-zinc-400`); nada que seja ofuscantemente branco. 
- **Learnings from Previous Story (2.2 Problem Section):**
  - O uso progressivo de classes de atraso estagiado para `.scroll-reveal` se você fizer loop, ou simplesmente adicioná-las aos blocos individuais com CSS estruturado funcionou validamente via intersection observer da story 1.4.
  - O `DataMatrixBadge.astro` atua em conformidade nativa e não requer reestruturação. Assegure o uso das flexbox gaps e padding simétricos do "safe area" `px-4 sm:px-6 lg:px-8`.

### Project Structure Notes

- `src/components/sections/SolutionSection.astro` (Novo component)
- Componente `src/components/ui/DataMatrixBadge.astro` importado e reuse.
- Alinhado perfeitamente com a estruturação Astro-native (pascal-case).

### References

- **Architecture (Design Decisions):** `_bmad-output/planning-artifacts/architecture.md#Frontend Architecture` 
- **UX Design:** `_bmad-output/planning-artifacts/ux-design-specification.md#Chosen Direction`
- **Epics:** `_bmad-output/planning-artifacts/epics.md#Story 2.3: Solution Section — "Método Aptus"`

## Dev Agent Record

### Agent Model Used
BMAD-Agent (Antigravity Context)

### Debug Log References
- Extracted and contextualized from full epics map. Web research was applied inherently to Astro/Tailwind performance standards already mapped. UI grid structural analysis included.

### Completion Notes List
- Ultimate context engine analysis complete. Developer guide ready to prevent deviations, especially in design constraints (Zero-JS default and Brutalism alignment).
- ✅ Criado o componente `SolutionSection.astro`. Estrutura de grid `lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/50` aplicada em conjunto com as especificações estritas do Dark Mode (`bg-zinc-950/50`).
- ✅ Etapas de `Auditoria`, `Arquitetura`, e `Deploy` refatoradas como loop de array estático no servidor. JetBrains Mono configurado como classe `font-mono`. `DataMatrixBadge` renderizando as métricas SLA e status adequadamente.
- ✅ Sucesso completo do bundle Astro testado no build (`npm run build`).

### File List
- `_bmad-output/implementation-artifacts/2-3-solution-section-metodo-aptus.md`
- `_bmad-output/implementation-artifacts/sprint-status.yaml`
- `src/components/sections/SolutionSection.astro`

### Senior Developer Review (AI)

**Reviewer:** Codex — 2026-03-03  
**Review Model:** GPT-5 (adversarial code review)

#### Git vs Story Discrepancies
- Nenhuma discrepância de documentação identificada entre File List e mudanças locais detectadas (`git status`).

#### Findings Summary

| ID | Severity | Description | Evidence |
|---|---|---|---|
| H1 | HIGH | A seção foi criada, mas não está renderizada na landing page. Isso impede o fluxo narrativo Hero → Problem → Solution descrito no AC (story 2.3) e no épico. | `src/pages/index.astro` só contém `<HeroSection />` e `<ProblemSection />` (linhas 11-12), sem `<SolutionSection />`. |
| M1 | MEDIUM | O CTA da Hero aponta para `#auditoria`, mas não existe alvo correspondente na seção de solução. Isso gera navegação quebrada no clique. | `src/components/sections/HeroSection.astro` linha 22 (`href="#auditoria"`); `src/components/sections/SolutionSection.astro` não define `id="auditoria"`. |
| M2 | MEDIUM | A sequência metodológica é visualmente numerada, mas não semântica para tecnologias assistivas (não usa lista ordenada). Isso reduz clareza de "processo sequencial" fora do contexto visual. | `src/components/sections/SolutionSection.astro` usa `div` + `article` (linhas 46-62), sem `ol/li`. |
| L1 | LOW | Regra de ordenação de classes Tailwind definida na arquitetura não está consistente em parte do componente (impacto de consistência/manutenibilidade). | Ex.: `scroll-reveal` aparece antes de utilitários de layout/spacing em `src/components/sections/SolutionSection.astro` linha 35 e linha 48. |

#### Build/Validation
- `npm run build` executado com sucesso em 2026-03-03.
- Aviso não-bloqueante detectado no CSS minify: classe utilitária inválida gerada a partir de token `[file:line]` no escopo de conteúdo do Tailwind.

#### Outcome
- **Changes Requested** (1 HIGH, 2 MEDIUM, 1 LOW).
- Story permanece em **in-progress** até correção de H1 e M1/M2.

### Change Log
- 2026-03-03: Code review executado; status alterado de `review` para `in-progress` por findings em aberto (H1, M1, M2, L1).
