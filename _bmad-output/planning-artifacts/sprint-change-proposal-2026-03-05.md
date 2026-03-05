# Sprint Change Proposal: Integração Dinâmica de Configurações Globais (Supabase)

## Section 1: Issue Summary
**Problema:** Foi identificado que os dados institucionais (como links do Instagram, LinkedIn e e-mails de contato/privacidade) estão inseridos de forma estática (hardcoded) no código frontend da Aptus Flow Landing Page. 
**Impacto:** Qualquer necessidade de atualização de um e-mail de contato, por exemplo, exigiria hoje modificação direta no código-fonte por um desenvolvedor e a execução de um novo pipeline de CI/CD para lançamento da página, engessando a operação de marketing/business.

## Section 2: Impact Analysis
- **Epic Impact:** O Epic 1 (Foundation & Visual Identity) foi impactado, gerando a necessidade de uma nova Story (`1.6`) para a integração com o banco de dados. A Story 1.3 (Footer/Header) também foi modificada para consumir dinamicamente a informação.
- **Artifact Conflicts:**
  - **PRD:** Atualizado. Um novo requisito (`FR10`) foi criado para definir a regra de negócio que os Contatos/Links devem ser alimentados de um CMS/DB.
  - **Architecture:** Atualizado. A decisão original "No Database no MVP" foi revista para integrar o Supabase exclusivamente com o objetivo de buscar as Configurações Globais. O fetch de dados será acoplado diretamente à página renderizada, exigindo SSR ou client-fetch.
  - **UI/UX:** Impacto nulo no design final (O visitante visualiza do mesmo modo).

## Section 3: Recommended Approach
**Abordagem Selecionada:** Ajuste Direto via Fetch e Supabase Integration (Híbrido/Tabela).
- **Rationale:** A implementação da Tabela `global_settings` no Supabase soluciona definitivamente a necessidade de edição das variáveis vitais do negócio. 
- **Effort Estimate:** Médio (Requer criar o banco de dados no Supabase, instalar o cliente supabase ou fazer fetch das variáveis usando a API REST, e repassar aos componentes `.astro`).
- **Risk Assessment:** Baixo. Foi definida uma regra de "Fail-Safe" — caso o BD caia, o Frontend utilizará variáveis estáticas default garantindo 100% de confiabilidade para a página.

## Section 4: Detailed Change Proposals
- **PRD:** Adicionado `FR10: O visitante deve visualizar os links de redes sociais (Instagram, LinkedIn) e e-mails de contato na página carregados dinamicamente a partir da base de dados (Supabase)`.
- **Architecture:** Adicionado o bloco SQL para a `global_settings` com chave-valor e configuradas as variáveis de integração. O Fetch Strategy prevê a chamada no componente de Layout/Footer.
- **Epics e Stories:**
  - `Story 1.3`: Ajustada a AC para refletir comportamento dinâmico e não mais links fixos físicos no código.
  - `Story 1.6: Dynamic Global Settings (Supabase Integration)` criada para orientar o desenvolvedor especificamente sobre o setup e as chamadas de API necessárias.
- **Sprint Status:** A story "1-6-dynamic-global-settings-supabase-integration" foi incluída com status de "backlog" dentro do Epic 1 em `sprint-status.yaml`.

## Section 5: Implementation Handoff
- **Scope Classification:** Minor (Pode ser implementado diretamente pela equipe de desenvolvimento em uma sprint ativa que ainda não esteja fechada ou através de uma feature rápida).
- **Handoff:** Como esta é uma mudança "Minor/Moderate", a equipe deve:
  1. Configurar um projeto novo no Supabase e instanciar a SQL referida na documentação de arquitetura (`global_settings` table).
  2. Implementar a story `1.6`. Use o agente dev `/dev-story` apontando para a história 1.6 que deverá ser criada.
