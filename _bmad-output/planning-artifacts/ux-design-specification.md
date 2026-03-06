---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/product-brief-LandingPage-2026-03-02.md
  - _bmad-output/planning-artifacts/research/technical-vibecoding-research-20260302.md
  - _bmad-output/planning-artifacts/research/domain-posicionamento-vibecoding-research-20260301.md
  - _bmad-output/brainstorming/brainstorming-session-20260301-194931.md
---

# UX Design Specification LandingPage - Aptus High-Impact Minimalist V2

**Author:** Jonathas  
**Date:** 2026-03-06  
**Design Direction:** Brutalismo Estrutural + Minimalismo Etereo  
**Primary Goal:** Transformar a landing page em um mecanismo de qualificacao de leads com autoridade instantanea e conversao consultiva.

---

## Executive Summary

A nova direcao V2 eleva impacto visual sem abrir mao de rigor minimalista. A pagina deve comunicar que a Aptus Flow opera como engenharia de sistemas, nao como agencia de automacao generica.

A experiencia central continua sendo o diagnostico. A conversao nao e "captura de contato", e sim entrada em um processo consultivo de alto valor. O design deve reforcar esse posicionamento desde os primeiros 3 segundos:

- Claridade brutal de estrutura
- Sinais de precisao tecnica
- Fluxo cinematografico sem ruido
- Convite a acao com friccao qualificada

---

## V2 Stitch Reference Mapping

A especificacao V2 parte de quatro referencias de tela definidas no Stitch:

1. **Tela 1 - Hero / Impacto**
- Composicao de alto contraste com `true black`
- Headline curta, agressiva e orientada a dor operacional
- Selo de autoridade acima do titulo (badge tecnico)
- CTA primario sem ornamento excessivo

2. **Tela 2 - Fluxo / Estrutura**
- Secao de narrativa com blocos em grade de engenharia
- Leituras em sequencia logica: diagnostico -> arquitetura -> operacao autonoma
- Divisores de 1px para guiar escaneamento sem poluicao

3. **Tela 3 - Secao Tecnica**
- Blocos de capacidade com linguagem objetiva
- Data badges com metrica de impacto e confiabilidade
- Visual de painel tecnico: densidade controlada, tipografia mono pontual

4. **Tela 4 - Conversao / CTA**
- CTA final com discurso consultivo, nao promocional
- Transicao para formulario como continuidade da narrativa
- Sensacao de "camera fechando no foco" no momento do clique

---

## Visual Foundation (V2)

### Color System - "Precision Black"

Paleta primaria baseada em contraste tecnico e profundidade:

- `#000000` - True Black (background principal)
- `#050505` - Surface Black (cards e overlays)
- `#0D0D0D` - Elevated Surface (camadas secundarias)
- `#F5F5F5` - Primary Text
- `#B3B3B3` - Secondary Text
- `#7A7A7A` - Meta Text
- `rgba(255,255,255,0.14)` - Pale Border 1px
- `rgba(255,255,255,0.08)` - Grid Line 1px

Accent limitado (uso estritamente tatico):

- `#8FFFE3` - Success/Signal Accent
- `#A7F3FF` - Data Accent alternativo

Regra: nenhum gradiente chamativo. Luz eterea apenas em glow difuso de baixa opacidade para guiar foco.

### Typography System - "Operational Clarity"

Stack tipografica V2:

- **Primary Sans:** `Inter`
- **Alternative Sans:** `Geist`
- **Technical Mono:** `Geist Mono` (fallback `JetBrains Mono`)

Hierarquia:

- H1: `Inter/Geist 600-700`, `tracking-tight`, alto impacto, linhas curtas
- H2/H3: `Inter/Geist 500-600`, foco em leitura rapida
- Body: `Inter 400`, ritmo de leitura limpo, sem blocos extensos
- Data labels/badges: `Geist Mono 500`, uppercase controlado, espacamento tecnico

### Structural Language

- Bordas de 1px palidas em todos os containers estruturais
- Grid de engenharia visivel, mas sempre sutil (baixa opacidade)
- Raios discretos (`rounded-lg`/`rounded-xl`), evitando visual "soft"
- Espacamento generoso para preservar respiracao premium

### Motion Language

- Animacao curta, precisa, com desaceleracao limpa
- Entrada de blocos por opacidade + deslocamento vertical minimo
- Sem "efeitos de exibicao". Movimento serve narrativa e foco

---

## Hierarchy of Impact

A V2 organiza impacto em 4 niveis visuais:

1. **N1 - Problema Inegociavel (Hero Headline)**
- Frase de choque que explicita o custo do caos operacional
- Elemento mais forte da dobra inicial

2. **N2 - Prova de Maturidade (Badges de Dados)**
- Micro-componentes que mostram sinais de metodo e resultado
- Devem aparecer cedo para consolidar autoridade tecnica

3. **N3 - Leitura Estrutural (Grids de Engenharia)**
- Linhas de grade e divisores conduzem o olhar
- Estrutura transmite previsibilidade e controle

4. **N4 - Convite Consultivo (CTA + Diagnostico)**
- Chamada para auditoria como proximo passo natural
- Sem urgencia artificial ou linguagem de venda agressiva

### Regras de Uso - Data Badges

Os Data Badges sao obrigatorios no V2 para autoridade imediata.

- Devem usar `Geist Mono`
- Conteudo curto: metricas, estados, status de operacao, ganhos de eficiencia
- Posicionamento: hero, secao tecnica, pre-CTA
- Uso de accent apenas em valor/indicador critico
- Evitar excesso: 2 a 4 badges por secao

### Regras de Uso - Engineering Grids

A grade tecnica e a espinha dorsal da linguagem V2.

- Grid sempre no plano de fundo ou separacao de blocos
- Linha de 1px com baixa opacidade
- Nunca competir com texto principal
- Em mobile, reduzir densidade para manter legibilidade

---

## Core Experience: Lead Qualification First

### Experience Thesis

A pagina existe para qualificar leads por diagnostico. Cada secao deve responder uma pergunta mental do decisor:

- "Eles entendem meu problema real?"
- "Eles tem metodo confiavel?"
- "Vale investir meu tempo no diagnostico?"

### Conversion Strategy

A conversao e intencionalmente consultiva:

- CTA principal: "Solicitar Diagnostico Estrutural"
- Formulario extenso e estrategico (Typeform/Tally)
- Friccao positiva para filtrar curiosos e priorizar decisores serios

### Invisible Cinematic Transition (CTA -> Form)

A abertura do formulario deve parecer inevitavel, fluida e elegante:

1. Clique no CTA ativa transicao sem mudanca de rota
2. Background reduz brilho e ganha blur suave
3. Painel de diagnostico emerge com movimento curto e preciso
4. Focus lock total no formulario
5. Primeira pergunta aparece imediatamente (sem tela vazia)

Principios:

- Sem sensacao de "pop-up"
- Sem loading aparente
- Sem quebra de atmosfera premium

---

## Section-Level UX Guidelines (V2)

### 1. Hero / Impact

Objetivo: gerar identificacao e autoridade em menos de 3 segundos.

- Headline curta e decisiva
- Subheadline com promessa de reorganizacao operacional
- 1 badge tecnico acima da headline
- 1 CTA primario + 1 link secundario discreto

### 2. Flow / Estrutura

Objetivo: tornar o metodo Aptus visualmente inevitavel.

- Sequencia em 3 blocos: Diagnostico, Arquitetura, Operacao
- Cada bloco com divisor de 1px e titulo de alta legibilidade
- Ritmo vertical com espacamento amplo para leitura executiva

### 3. Secao Tecnica

Objetivo: confirmar capacidade real de execucao.

- Cards com linguagem de engenharia operacional
- Data badges destacando previsibilidade, tempo recuperado, confiabilidade
- Zero decoracao redundante

### 4. Conversao / CTA

Objetivo: transformar interesse em compromisso qualificado.

- Copy orientado a diagnostico, nao "orcamento rapido"
- Refuerzo de privacidade e analise consultiva
- CTA final visualmente forte, textual e formal

---

## Design System and Component Strategy

### Core Components

- `HeroSection`
- `ProblemSection`
- `SolutionSection`
- `DataMatrixBadge`
- `EngineeringGrid` (novo padrao visual reutilizavel)
- `TacticalCTA`
- `DiagnosticModal`
- `FormEmbed`

### Component Principles

- Estrutura visual primeiro, efeito depois
- Reuso de tokens de cor/borda/tipo para consistencia
- Estados interativos claros (`hover`, `focus-visible`, `active`, `disabled`)
- Acessibilidade e performance como requisito de design, nao etapa final

---

## Technical Preservation (Astro + Tailwind)

A base tecnica permanece:

- **Framework:** Astro
- **Styling:** Tailwind CSS
- **Interatividade seletiva:** Astro Islands apenas para pontos criticos

### Performance Targets

- Lighthouse >= 95 (Performance)
- Lighthouse >= 95 (Accessibility)
- Lighthouse >= 95 (Best Practices)
- Lighthouse >= 95 (SEO)

### Performance Rules

- Evitar bibliotecas de animacao pesadas
- Priorizar CSS nativo para transicoes
- Carregar scripts de formulario sob demanda
- Reduzir custo de layout shift no modal de diagnostico

---

## Responsive and Accessibility Requirements

### Responsive Behavior

- Desktop: estrutura completa de grid de engenharia
- Tablet: simplificacao de densidade, mantendo hierarquia
- Mobile: foco no texto, CTA full-width, badges reduzidos

### Accessibility

- Contraste minimo WCAG AA
- Navegacao completa por teclado
- `focus-visible` evidente em botoes e links
- `prefers-reduced-motion` respeitado

---

## Measurement and Validation

### UX and Business KPIs

- Taxa de abertura do diagnostico (CTA -> modal)
- Taxa de conclusao do formulario
- Tempo medio ate inicio do formulario
- Scroll depth ate secao tecnica
- Bounce rate na primeira dobra

### Qualitative Validation

- Testes com perfis CEO/COO para leitura e confianca percebida
- Verificacao de linguagem visual: "premium tecnico" vs "agencia generica"
- Revisao de clareza no fluxo Hero -> Metodo -> CTA -> Diagnostico

---

## Final Direction Statement

Aptus High-Impact Minimalist V2 combina brutalismo estrutural e minimalismo etereo para produzir uma landing page de alta autoridade, baixa poluicao e conversao consultiva.

A experiencia nao tenta "impressionar com efeitos". Ela prova maturidade operacional atraves de precisao visual, narrativa de diagnostico e execucao tecnica impecavel em Astro + Tailwind.

