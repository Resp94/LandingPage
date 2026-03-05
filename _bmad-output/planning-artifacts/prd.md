---
stepsCompleted:
  - step-01-init
  - step-02-discovery
  - step-02b-vision
  - step-02c-executive-summary
  - step-03-success
  - step-04-journeys
  - step-05-domain
  - step-06-innovation
  - step-07-project-type
  - step-08-scoping
  - step-09-functional
  - step-10-nonfunctional
  - step-11-polish
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-LandingPage-2026-03-02.md'
  - '_bmad-output/planning-artifacts/research/domain-posicionamento-vibecoding-research-20260301.md'
  - '_bmad-output/planning-artifacts/research/market-vibecoding-research-20260301.md'
  - '_bmad-output/planning-artifacts/research/technical-vibecoding-research-20260302.md'
  - '_bmad-output/brainstorming/brainstorming-session-20260301-194931.md'
documentCounts:
  briefCount: 1
  researchCount: 3
  brainstormingCount: 1
  projectDocsCount: 0
workflowType: 'prd'
classification:
  projectType: 'web_app'
  domain: 'general'
  complexity: 'low'
  projectContext: 'greenfield'
---

# Product Requirements Document - LandingPage

**Author:** Jonathas
**Date:** 2026-03-02

## Executive Summary

A Aptus se posiciona como uma parceira premium de Engenharia Operacional projetada para eliminar o "Voo Cego" enfrentado por líderes de PMEs e empresas em rápido crescimento. O projeto consiste em uma Landing Page de alta conversão (desenvolvida em Astro) focada em atrair e qualificar decisores que sofrem com o esgotamento logístico, escalabilidade dependente de contratações lineares e processos baseados no esforço humano. A solução centraliza-se em demonstrar autoridade na substituição do caos operacional por sistemas arquitetônicos invisíveis, operados 24/7 por Agentes de IA e Automações robustas (n8n/Vibecoding), devolvendo o tempo estratégico ao fundador.

### What Makes This Special

Diferente de agências tradicionais que vendem automações superficiais ou "bots" isolados, a Aptus atua com Autoridade Sistêmica baseada no **Método Aptus**. Não automatizamos o caos; nós o reestruturamos através de uma rigorosa Auditoria Estratégica. O posicionamento afasta quem busca "ferramentas milagrosas" e atrai CEOs dispostos a investir em Governança Operacional e infraestrutura de retaguarda à prova de falhas. A página em si atuará como o primeiro filtro desse método, trocando o formulário de contato genérico por uma aplicação de diagnóstico profundo.

## Project Classification

- **Project Type:** Web App (Landing Page / SPA)
- **Domain:** Serviços B2B / Tecnologia da Informação (Geral)
- **Complexity:** Baixa (foco em estratégia visual e de conversão, sem amarras regulatórias)
- **Project Context:** Greenfield

## Success Criteria

### User Success
- **Alívio Imediato e Identificação:** O líder (decisor) se reconhece no "Voo Cego" descrito e sente alívio ao perceber que há uma solução real de Engenharia Operacional.
- **Percepção de Autoridade:** O visitante compreende o Método Aptus e a necessidade de uma auditoria estrutural.
- **Fricção Positiva para Conversão:** O lead completa a aplicação (formulário) focado em expor de forma detalhada as dores de seus processos.

### Business Success
- **Aceleração do Ciclo de Venda:** O lead chega à primeira reunião educado sobre o Método Aptus.
- **Aumento do Ticket Médio Percebido:** Posicionamento premium afasta leads buscando soluções de baixo ticket ("apenas um bot").
- **Autoridade Sistêmica:** Posiciona a Aptus como "Thought Leader" regional/nacional.

### Technical Success
- **Performance Extrema ("Senioridade Técnica"):** Notas superiores a 95 no Google Lighthouse (Core Web Vitals).
- **Estabilidade e Fluidade UI:** Carregamento de transições e integrações de formulário sem intermitências interativas.

### Measurable Outcomes
- **Geração de Leads Qualificados:** Fluxo de visitantes convertendo em solicitação de Auditoria entre 2% e 4%.
- **Lead Quality Score:** Mais de 60% dos leads adequados ao Perfil de Cliente Ideal (ICP) após triagem automática.
- **Engajamento no Conteúdo:** Tempo médio (Time-on-Page) mantendo leitura alta nas seções essenciais "Problema Real" e "Método Aptus".

## Product Scope & Phased Development

A estratégia do MVP atua como um "Lead Qualification Engine". O esforço foca na conversão guiada pela narrativa visual.

### Phase 1: MVP (Minimum Viable Product)
- SPA desenvolvida em Astro (Islands Architecture) e hospedada na Cloudflare Pages.
- Equipe reduzida focada na execução rápida (Vibecoding, design de narrativa e setup do CRM via n8n).
- **Seções Essenciais:** Hero Section contrastante, O Problema ("Voo Cego"), A Solução ("Método Aptus") e Call-to-Action conectando-se fluidamente com o Formulário Diagnóstico (Typeform/Tally embedado).
- **Feature Exclusions:** Exclusão sumária de elementos genéricos como Painel de Usuários Web (Logins), Blogs ou listagem conteudista exaustiva sobre "softwares" individuais da stack Aptus.

### Phase 2: Growth (Post-MVP)
- **Estudos de Caso Visuais:** Seções interativas abordando "Antes e Depois" arquitetônico.
- **Micro-Calculadoras Embarcadas:** Ferramenta autônoma na LP calculando "o peso financeiro do Voo Cego" em tempo real para leads de topo-meio de funil.

### Phase 3: Expansion (Vision)
- **Portal de Governança Integrado:** Lançamento de área restrita B2B acompanhando fluxos dos agentes n8n para clientes implantados.

### Risk Mitigation Strategy
- **Technical Risks:** Scripts terceiros (Typeform) penalizando SEO. *Mitigação:* Estratégias de carregamento assíncrono profundo (lazy loading on-interaction).
- **Market Risks:** Percepção visual idêntica à de agências tradicionais. *Mitigação:* *Dark Mode* dramático, layouts esparsos e paleta corporativa transmitindo "consultoria global".
- **Resource Risks:** Delongas críticas pré-lançamento. *Mitigação:* Vibecoding acelerado garantindo lançamento inicial rápido para medição e iteração de métricas de engajamento (Heatmaps).

## User Journeys

### 1. O Voo Cego da Liderança (Primary User - Success Path)
**Persona:** Marcelo, 42 anos, CEO/Fundador de PME de serviços refém da operação.
**A Jornada:**
- *Busca:* Em horário fora do expediente (noite), procura meios racionais de organizar demandas sem novas contratações.
- *Choque (Página):* Ao bater os olhos na Headline ("Pare de Automatizar o Caos"), conecta imediatamente com a dor da gestão baseada em memória da equipe descrita em página densa, sombria (Dark UI) e Premium.
- *Ação:* Clica com determinação em "Agendar Auditoria", não ligando para a fricção do longo form para explicar sua dor operacional.
- *Resolução:* Engaja numa call altamente produtiva; converte-se assinando implantação dos projetos (Vibecoding) e ganhando painéis invisíveis automatizados.

### 2. O COO Procurando Eficiência (Primary User - Escalabilidade)
**Persona:** Carla, 35 anos, COO sob pressão de escalabilidade e contenção de OPEX.
**A Jornada:**
- *Validação Tecnológica:* Procura integrações puras de APIs via buscadores. Avalia tecnicamente a Landing Page para checar senilidade. SPA ultrarrápida (Astro) garante sua atenção.
- *Ação e Resolução:* Submete requerimento focado em integrar ERPs legados, economizando slots de contratação da empresa para fins mais rentáveis que Ctrl+V.

### 3. A Gestão de Leads da Aptus (Admin/Ops User)
**Persona:** Founder/Lead Ops Interno.
**A Jornada:**
- *Filtro e Triagem:* Ao expor fricção (Apenas lideranças preencherão), "Curiosos e robôs de marketing" desistem no Typeform embedado.
- *Nutrição Assíncrona:* O form qualificado ativa um trigger automático interno (n8n). Via Webhook, payload do lead é enriquecido por API (Ex: Clearbit), acionando automação interna adicionando um card prioritário no CRM.

## Functional Requirements (FR)

### Conteúdo de Autoridade e Navegação (Discovery)
- **FR1:** O Visitante pode visualizar a Proposta de Valor descritiva e seções da problemática macro imediatamente ao carregar a página principal.
- **FR2:** O Visitante pode navegar linearmente pelas instâncias metodológicas (Auditoria, Arquitetura, Deploy) detalhadas de modo lógico ao longo do scroll vertical de tela.
- **FR3:** O Visitante pode visualizar uma interface responsiva alinhada aos hardwares primários (Desktop/Tablet/Mobile).

### Captura Qualificada (Lead Engine)
- **FR4:** O Visitante pode acessar uma interface interativa de qualificação acionada via botões Call To Action.
- **FR5:** O Visitante pode imputar dados curriculares base e detalhes primários via preenchimento segmentado de campos.
- **FR6:** O Sistema de Fricção (Formulário) pode bloquear o envio se o Visitante omitir dados primários classificatórios ativando validações "Required" obrigatórias.
- **FR7:** O Visitante pode receber feedback visual (Tela de status concluído/próximos passos) assim que transmitir efetivamente a solicitação final ao CRM Aptus.

### Automação (Backend API System)
- **FR8:** O Frontend do formulário pode disparar Webhooks seguros comunicando um arquivo/payload de conversão ao Endpoint n8n.
- **FR9:** O Sistema Backend pode injetar as informações pré-estruturadas como um cliente "quente" viável nos repositórios (Notion/Trello) da equipe comercial da Aptus.

### Conteúdo Institucional Dinâmico (Global Settings)
- **FR10:** O visitante deve visualizar os links de redes sociais (Instagram, LinkedIn) e e-mails de contato na página carregados dinamicamente a partir da base de dados (CMS/Supabase).

## Non-Functional Requirements (NFR)

### Performance & Technical Capabilities
- **NFR1:** A SPA deve alcançar métricas de rating Google Lighthouse >= 95 garantindo renderização ultra-estável nas instâncias Performance, Melhores Práticas e SEO.
- **NFR2:** O conteúdo primário de tela deve renderizar as métricas de LCP (Largest Contentful Paint) em intervalo de tempo <= 2.0s em conexões de espectro mobile.
- **NFR3:** A invocação das scripts não-core (pixels de evento e os motores SPA para o widget de Formulário Typeform) deve submeter-se à restrição não-bloqueadora em Main Thread no instante zero visual da página (Deferred ou Lazy Loading on interactive).
- **NFR4:** A CDN deve possuir SLA de entrega superior e garantido de TTFB (Time To First Byte) de proximidade aos ranges de tolerância até os parciais 250ms ou otimizado inferior em endpoints Brasil.

### Reliability
- **NFR5:** A infraestrutura de nuvem periférica (Pages CDN origin) tolerará sem down-time até contingência padrão "enterprise" mantendo SLA público reportado do provider > 99.9% Uptime anualizado garantido.
- **NFR6:** A comunicação assíncrona da ponte Webhook deve processar sem dropar (loss data issue) envios de até 10 a 20 post-requests sincronicamente escalonados de potenciais acessos virais de engajamento sem falha do form provider end.

### Design System and Presentation Standard
- **NFR7:** A experiência de UX consolidará identidade visual ativando Dark Mode dominante em esquemas e matizes complementares estritos de alta-fidelidade que comuniquem valor tangível e High-Ticket.
- **NFR8:** Todos blocos contrastantes renderizados textuais (Títulos/Textos longos) respeitam o critério WCAG 2.1 norma AA mantendo legibilidade de contraste perfeita no "UI theme" definido.
