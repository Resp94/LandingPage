# Story 4.2: EngineeringGrid em Tailwind CSS Puro

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como um **desenvolvedor**,
eu quero **um padrão de EngineeringGrid reutilizável construído apenas com Tailwind CSS puro**,
para que **a linguagem estrutural V2 apareça de forma consistente sem bibliotecas de grid customizadas ou scripts pesados**.

## Criterios de Aceitacao

1. **Given** os tokens V2 (Precision Black) já configurados em `src/styles/global.css`  
   **When** o componente `EngineeringGrid.astro` (ou utilitário equivalente) for implementado  
   **Then** ele deve utilizar a cor de token `--color-grid-subtle` (`rgba(255, 255, 255, 0.08)`) para as linhas.
2. **Given** a necessidade de performance extrema (Lighthouse >= 95)  
   **When** a grade estrutural for renderizada  
   **Then** a implementação deve usar apenas CSS nativo (ex: `background-image` com `linear-gradient` ou elementos `div` absolutos) via Tailwind CSS  
   **And** não deve haver dependência de JavaScript para a renderização visual da grade.
3. **Given** diferentes tamanhos de tela (desktop, tablet, mobile)  
   **When** a densidade do grid for aplicada  
   **Then** o grid deve suportar variações automáticas: largura de célula maior em mobile (ex: 40-60px) e menor/mais densa em desktop (ex: 20-30px)  
   **And** a visibilidade deve permanecer sutil, nunca competindo com a legibilidade de textos ou botões de ação (CTA).
4. **Given** a flexibilidade de layout exigida no V2  
   **When** integrado em seções como Hero e Flow  
   **Then** o grid deve ser capaz de atuar como background (posição absoluta/atrás) ou como separador estrutural explícito.
5. **Given** os padrões de acessibilidade WCAG AA  
   **When** o grid for renderizado  
   **Then** ele deve ser ignorado por tecnologias assistivas (`aria-hidden="true"`).
6. **Given** a meta de qualidade do projeto  
   **When** a implementação for validada  
   **Then** o Lighthouse Score deve permanecer >= 95 para Performance, Accessibility, Best Practices e SEO.

## Tarefas / Subtarefas

- [ ] Task 1: Criar o componente core `src/components/ui/EngineeringGrid.astro` (AC: 1, 2)
  - [ ] Implementar o padrão de grid usando `repeating-linear-gradient` no background via classes Tailwind (ou `style` inline se necessário para tokens dinâmicos, mas priorizando classes).
  - [ ] Garantir que o componente aceite `className` para customização de opacidade e posicionamento.
- [ ] Task 2: Implementar responsividade de densidade (AC: 3, 4)
  - [ ] Configurar breakpoints do Tailwind para ajustar o `background-size` da grade entre mobile, tablet e desktop.
  - [ ] Validar a "respirabilidade" visual em dispositivos móveis.
- [ ] Task 3: Integrar em um wrapper de seção reutilizável (AC: 4)
  - [ ] Criar ou atualizar um layout de seção que permita habilitar/desabilitar o grid de fundo conforme a narrativa.
- [ ] Task 4: Adicionar testes de integridade visual e performance (AC: 6)
  - [ ] Criar `tests/story-4-2-engineering-grid.test.mjs` para verificar se o grid não introduz mudanças de layout inesperadas (CLS) e se usa os tokens corretos.
  - [ ] Validar o score Lighthouse no ambiente de preview.

## Notas de Desenvolvimento (Dev Notes)

- **Performance First:** Não utilize SVGs externos ou bibliotecas como "Particles" ou "Canvas". O grid deve ser 100% CSS.
- **Tokens:** Utilize `var(--color-grid-subtle)` para as linhas. A opacidade já está embutida no token, mas pode ser ajustada via `opacity-*` do Tailwind se necessário para sub-seções.
- **Z-Index:** O grid deve sempre estar em `z-0` ou `z-[-1]` para não interceptar cliques ou eventos de hover dos componentes reais.
- **Mobile Density:** Em telas pequenas, grids muito densos criam ruído. A recomendação é dobrar o tamanho da célula ou reduzir a opacidade pela metade.

### Project Structure Notes

- Novo componente: `src/components/ui/EngineeringGrid.astro`
- Testes: `tests/story-4-2-engineering-grid.test.mjs`
- Alinhamento com a estrutura unificada definida em `architecture.md`.

### References

- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#visual-foundation-v2]
- [Source: _bmad-output/planning-artifacts/epics.md#story-42-engineeringgrid-em-tailwind-css-puro]
- [Source: _bmad-output/planning-artifacts/architecture.md#frontend-architecture]

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
