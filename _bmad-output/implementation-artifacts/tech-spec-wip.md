---
title: 'Refatoração de Cores e Temas dos Componentes'
slug: 'refatoracao-cores-tema'
created: '2026-03-04T14:50:54-04:00'
status: 'Completed'
stepsCompleted: [1]
tech_stack: ['Astro', 'Tailwind CSS', 'CSS']
files_to_modify: []
code_patterns: []
test_patterns: []
---

# Tech-Spec: Refatoração de Cores e Temas dos Componentes

**Created:** 2026-03-04T14:50:54-04:00

## Overview

### Problem Statement

A aplicação atualmente utiliza classes utilitárias de cores do Tailwind com valores fixos (como `bg-zinc-950`, `text-zinc-400`, `text-emerald-400`) espalhadas por componentes centrais (Header, HeroSection, Layout, Botões, etc.). Isso reduz a flexibilidade do design system e impede que o novo tema da Aptus definido no arquivo `global.css` aplique 100% de controle sobre a interface.

### Solution

Refatorar os arquivos Astro (`src/components/` e `src/layouts/`) substituindo as classes utilitárias fixas por classes semânticas. Especificamente, substituir referências a `zinc` por varições de `surface` (como `bg-surface-primary`) e substituir referências a `emerald` pela classe genérica `accent`. As cores de texto fixas, como `text-zinc-400`, devem ser revistas ou removidas para deixar a cor global / tema fluir pelos elementos.

### Scope

**In Scope:**
- Substituição massiva de classes `bg-zinc-*` para classes semânticas como `bg-surface-primary`, `bg-surface-secondary` nos componentes Layout, Sections e UI.
- Substituição de utilitários `text-emerald-*`, `border-emerald-*` para `text-accent`, `border-accent`, etc.
- Atualização em componentes de navegação, modal, formulário (Header, Footer, DiagnosticModal, FormEmbed, TacticalCTA, DataMatrixBadge).
- Remoção / ajustes de cores de texto engessadas.

**Out of Scope:**
- Alteração das lógicas de JavaScript/Astro contidas nestes componentes.
- Alteração das próprias variáveis em `global.css` (elas já estão mapeadas e atualizadas).
- Mudanças de estrutura em Grid, Flex ou Spacing.

## Context for Development

### Codebase Patterns

O projeto utiliza Astro, Tailwind CSS (v4 provável, de acordo com o `@theme` em `global.css`), e componentes funcionais. O sistema de cores possui variáveis mapeadas para as superfícies (`--color-surface-*`) e realces (`--color-accent`), que são disponibilizadas no Tailwind através das utility class customizadas (ex: `.bg-surface-primary`, `.text-accent`).

### Files to Reference

| File | Purpose |
| ---- | ------- |
| `src/styles/global.css` | Fonte de verdade das novas variáveis semânticas de cores, como as superfícies e cores de destaque. |
| `src/components/layout/Header.astro` | Componente de cabeçalho global, deve utilizar as novas classes de navegação. |
| `src/components/sections/*.astro` | Seções da Landing Page que contêm várias tags e botões com cores fixas. |
| `src/components/ui/*.astro` | Elementos de interface como os Botões Táticos e Modais de Diagnóstico com referências a `emerald` ou `zinc`. |

### Technical Decisions

- **Adoção Cega do Novo Tema**: Nenhuma nova cor customizada será injetada diretamete inline. O foco deve ser o uso exclusivo de `.bg-surface-*` e das utilitárias the tema Tailwind.
- **Herança de Cores**: Sempre que possível, texto genérico herdará cores semânticas do container ascendente caso a sua cor fixa limitante seja removida.

## Implementation Plan

### Tasks

- [x] Task 1: Refatorar BaseLayout, Header, Footer (`src/layouts` e `src/components/layout`)
- [x] Task 2: Refatorar Seções: HeroSection, CTASection, ProblemSection, SolutionSection (`src/components/sections`)
- [x] Task 3: Refatorar Componentes de UI: TacticalCTA, DiagnosticModal, FormEmbed, DataMatrixBadge (`src/components/ui`)
- [x] Task 4: Atualizar classes Tailwind nas Páginas (`src/pages`)

### Acceptance Criteria

- [x] Nenhuma classe com `zinc` ou `emerald` presente nos arquivos Astro das listagens.
- [x] Classes semânticas de cor (como `bg-surface-primary`, `text-accent`) substituem cores globais.
- [x] Estilos de texto fixos alterados para herança ou opacidade sobre branco.

## Additional Context

### Dependencies

- A nova paleta de cores reflete as mudanças recentes no logotipo da Aptus, conforme conversas anteriores.

### Testing Strategy

- Validação visual rodando `npm run dev` nos URLs da página inicial para garantir que não existam resquícios de classes cinzas (`zinc`) ou verdes (`emerald`).

### Notes

- Cuidado extra ao substituir utilitários para transição do Modal e overlays.

## Review Notes
- Adversarial review completed
- Findings: 2 total, 2 fixed, 0 skipped
- Resolution approach: fix automatically
