# Story 1.3: BaseLayout, Header & Footer

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como um **visitante**,
Eu quero **um shell de página responsivo com metadados SEO adequados, header profissional e footer institucional**,
para que **a página carregue rapidamente, pareça premium nos resultados de busca e forneça credibilidade institucional (FR3)**.

## Critérios de Aceitação

1. **Dado** que o design system está no lugar, **Quando** `BaseLayout.astro` for criado, **Então** deve incluir `<head>` com: charset, viewport, title tag, meta description, OG tags (og:title, og:description, og:image, og:type), dados estruturados (Organization schema), e URL canônica.
2. **E** as fontes devem ser pré-carregadas: variantes Inter 400, 600, 700 com `rel="preload"` e `as="font"`.
3. **E** `global.css` deve ser importado no layout.
4. **E** `<body>` deve ter as classes base `bg-zinc-950 text-zinc-100`.
5. **Dado** que `Header.astro` foi criado, **Quando** a página carregar, **Então** o header exibe o logo da Aptus (SVG monocromático) à esquerda.
6. **E** um botão placeholder TacticalCTA aparece à direita ("Agendar Auditoria").
7. **E** o header é sticky/fixed no scroll com efeito `bg-zinc-950/80 backdrop-blur`.
8. **E** o header é responsivo: logo + CTA no desktop, logo centralizado + CTA como `w-full` no mobile.
9. **E** nenhum link de navegação estará presente (sem "Sobre nós", "Blog", etc.).
10. **Dado** que `Footer.astro` foi criado, **Quando** o visitante rolar até o fim, **Então** o footer exibe: link para `/privacidade`, informações de contato e links de mídias sociais.
11. **E** o footer usa estilo suavizado `text-zinc-500` com separador `border-t border-zinc-800/50`.
12. **E** todos os links possuem atributos `aria-label` adequados e `focus-visible:ring-2 focus-visible:ring-emerald-500`.

## Tarefas / Subtarefas

- [x] Criar o componente `BaseLayout.astro` (AC: 1, 2, 3, 4)
  - [x] Implementar as meta tags de SEO, OG tags, JSON-LD Schema (Organization).
  - [x] Adicionar o preload das fontes do Inter local (`@fontsource/inter`).
  - [x] Importar `src/styles/global.css`.
  - [x] Adicionar um `<slot />` na tag `<body>` com as classes `bg-zinc-950 text-zinc-100 flex flex-col min-h-screen`.
- [x] Criar o componente `Header.astro` (AC: 5, 6, 7, 8, 9)
  - [x] Desenvolver a barra superior com `fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur`.
  - [x] Inserir o logo em SVG (Aptus monocromático) à esquerda (ou centrado no mobile).
  - [x] Construir o botão `TacticalCTA` (como componente placeholder `src/components/ui/TacticalCTA.astro` temporário). O botão deve exibir ("Agendar Auditoria").
  - [x] Garantir o comportamento reponsivo (logo + cta row no desktop, flex-col/w-full no mobile se necessário). Não colocar links de navegação.
- [x] Criar o componente `Footer.astro` (AC: 10, 11, 12)
  - [x] Implementar a barra de rodapé usando bloco com `mt-auto border-t border-zinc-800/50 py-12`.
  - [x] Adicionar link para a rota estática `/privacidade`.
  - [x] Adicionar bloco de contatos e redes sociais usando os estilos `text-zinc-500 hover:text-zinc-100 transition-colors`.
  - [x] Assegurar foco de acessibilidade `focus-visible:ring-2 focus-visible:ring-emerald-500`.

## Dev Notes

### Arquitetura e Restrições Técnicas:
- **Zero-JS no Layout, Header e Footer (SSG puro):** Estes componentes são estruturais e devem ser puramente estáticos. Nenhum JavaScript hidratado (`client:*`) deve ser colocado nestes três componentes.
- **Tailwind `global.css`:** Já definido no projeto. Deve ser puramente usado com utilities e design tokens de cor do "Zinc".
- **Sem Links de Navegação:** Essa é uma página de conversão, links no Header criam pontos de escape visuais. Mantenha restrito a Logo e CTA.
- **Acessibilidade:** É obrigatório o uso de `aria-label` em links SVG (redes sociais) e configurações de focus ring nos links e botão do CTA para cumprir com o NFR8 (WCAG 2.1 AA).
- **SEO/OG Tags:** O arquivo de imagem original `og-image.png` será referenciado aqui. Crie a URL apontando logicamente para `/og-image.png` em public/ ou assets/.

### Contexto de Implementações Prévias:
- O sistema de Design (`global.css`) desenvolvido na Story 1.2 já previu fontes (`@fontsource`) e a variação correta de background (`bg-zinc-950`) e cor de acento (`emerald-500`).

### Project Structure Notes

- **Layouts:** O layout base deve ser renderizado em `src/layouts/BaseLayout.astro`.
- **Componentes Estruturais:** `Header.astro` e `Footer.astro` devem ser guardados em `src/components/layout/`.
- **Botão CTA Placeholder:** Deve ser desenhado em `src/components/ui/TacticalCTA.astro` para reuso.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.3-BaseLayout-Header--Footer]
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend-Architecture]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Navigation-Patterns]

## Dev Agent Record

### Agent Model Used

Antigravity

### Debug Log References

- Astro check aprovado (pré-review e pós-review: 0 erros, 0 warnings)

### Completion Notes List

- BaseLayout implementado com SEO, Schema Org, preload do Inter e slot injetado em um wrapper min-h-screen.
- Header monocromático e minimalista, sticky/fixed, com blur no desktop e mobile.
- Footer implementado de forma harmoniosa e focado em acessibilidade.
- Suporte a focus-visible com anéis emerald garantido.

### File List

- src/components/ui/TacticalCTA.astro (Novo → Atualizado via Review)
- src/components/layout/Header.astro (Novo)
- src/components/layout/Footer.astro (Novo → Atualizado via Review)
- src/layouts/BaseLayout.astro (Novo → Atualizado via Review)
- public/og-image.png (Novo via Review)

### Change Log

- 2026-03-02: Implementação inicial (Antigravity)
- 2026-03-03: Code Review + Fixes aplicados (Antigravity)

## Senior Developer Review (AI)

**Reviewer:** Jonathas — 2026-03-03
**Outcome:** ✅ Approved (com fixes aplicados)

### Issues Encontrados e Resolvidos

| # | Severidade | Descrição | Fix Aplicado |
|---|------------|-----------|-------------|
| H2 | 🔴 HIGH | `og-image.png` referenciado mas inexistente | Gerado e salvo em `public/og-image.png` |
| H3 | 🔴 HIGH | `logo.png` no JSON-LD Schema inexistente | Referência alterada para `/favicon.svg` (existente) |
| H4 | 🔴 HIGH | TacticalCTA sem `aria-label` (violação AC 12) | Adicionado `aria-label="Agendar Auditoria Estratégica"` |
| M2 | 🟡 MEDIUM | TacticalCTA com estilo sólido verde, conflitando com UX Spec (ghost button) | Refatorado para ghost button com `border-zinc-700`, `tracking-wider`, chevron icon com `hover:translate-x-1` |
| M3 | 🟡 MEDIUM | Footer com `href="#"` no LinkedIn (page jump) e apenas 1 rede social | LinkedIn href corrigido para URL real com `target="_blank" rel="noopener noreferrer"`, Instagram adicionado |
| M4 | 🟡 MEDIUM | Importação duplicada de fonts Inter entre BaseLayout e global.css | CSS imports removidos do BaseLayout (mantidos em global.css); woff2 URL imports preservados para preload |

### Issues Documentados (Não corrigidos — Fora de Escopo)

| # | Severidade | Descrição | Motivo |
|---|------------|-----------|--------|
| H1 | 🔴 HIGH | `index.astro` não usa `BaseLayout.astro` — SEO/OG/fonts inativos | Planejado para Story 2.5 (Index Page Assembly) |
| L1 | 🟢 LOW | Header sem tag `<nav>` semântica | Melhoria menor; não bloqueia funcionalidade |
| L2 | 🟢 LOW | Domínio email `aptus.com` vs `aptus.com.br` inconsistente | Requer decisão de negócio |

