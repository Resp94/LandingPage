# Story 3.5: Webhook Integration & CRM Pipeline

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As the **Aptus operations team**,
I want **every qualified lead automatically injected into our CRM with error notifications**,
so that **no lead is lost and the team can respond within 24 hours**.

## Acceptance Criteria

1. **Dado** que um visitante preenche o formulario Typeform/Tally com sucesso  
   **Quando** o Typeform/Tally dispara o webhook nativo  
   **Entao** um POST HTTP e enviado para a URL do endpoint n8n contendo o payload JSON com todas as respostas.
2. **Dado** o requisito de seguranca da comunicacao  
   **Entao** o webhook deve incluir o cabecalho `Authorization: Bearer <token>` pre-definido.
3. **Dado** o formato de troca de dados exigido  
   **Entao** o payload deve adotar a nomenclatura `snake_case` para as chaves (ex: `lead_name`, `company_name`, `pain_points`).
4. **Dado** o recebimento do payload pelo n8n  
   **Quando** o n8n processa o fluxo  
   **Entao** os dados sao injetados no CRM (Notion/Trello) e uma notificacao de alerta e enviada para a equipe (Slack/Email).
5. **Dado** possiveis falhas temporarias  
   **Quando** o n8n falha ao processar  
   **Entao** um Error Workflow deve notificar a equipe e o payload falho deve ser retido para reprocesamento (Dead Letter Queue).

## Tasks / Subtasks

- [x] Tarefa 1: Definir o payload e mapeamento de campos
  - [x] Documentar o formato JSON exato (`snake_case`) que reflete as questoes do Typeform/Tally.
  - [x] Mapear as colunas do Notion/Trello correspondentes a cada chave do JSON.
- [x] Tarefa 2: Projetar a estrutura do workflow do n8n (Export JSON)
  - [x] Criar um arquivo exportavel representativo do workflow `n8n-lead-pipeline.json` na pasta `docs/n8n/`.
  - [x] Configurar o no Webhook principal no JSON para aceitar apenas requisicoes `POST` com `Authorization`.
- [x] Tarefa 3: Configurar integracoes do workflow (Mock/Specs)
  - [x] Adicionar os nos de integracao com Notion/Trello (Create Page/Card) no arquivo JSON.
  - [x] Adicionar os nos de notificacao (Slack/Email).
- [x] Tarefa 4: Error Handling & Dead Letter Queue
  - [x] Definir e documentar fluxo de erro com retry e alertas em caso de falha do fluxo primario.
  - [x] Exportar o workflow de erro (`docs/n8n/n8n-error-workflow.json`) com persistencia de DLQ obrigatoria.
- [x] Tarefa 5: Testes e verificacao
  - [x] Criar smoke test da Story 3.5 (`tests/story-3-5-webhook-pipeline.test.mjs`).
  - [x] Integrar o teste no pipeline `npm test`.

## Dev Notes

- **Fronteira de Arquitetura:** Sem alteracoes no frontend Astro para este fluxo. Comunicacao e server-to-server (Typeform/Tally -> n8n).
- **Seguranca do endpoint:** Autenticacao por Bearer token em header auth.
- **Resiliencia:** O fluxo principal aponta para Error Workflow dedicado e a retencao de payload falho e obrigatoria via DLQ.

### Project Structure Notes

- Entregas centralizadas em `docs/n8n/` como especificacao e infra declarativa.
- Sem alteracoes em `src/`.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#epic-3-lead-qualification-engine--conversion] Story 3.5
- [Source: _bmad-output/planning-artifacts/architecture.md#api--communication-patterns] Webhook
- [Source: _bmad-output/planning-artifacts/architecture.md#data-architecture] Schema de dados snake_case

## Dev Agent Record

### Agent Model Used

Antigravity / Gemini-2.5-Pro + Codex (review follow-up)

### Debug Log References

- `npm run test:story-3-5`
- `npm run test`

### Completion Notes List

- Criado contrato canonical de payload com normalizacao para `snake_case` no workflow principal.
- Atualizado `docs/n8n/n8n-lead-pipeline.json` com no `Normalize Payload` entre webhook e CRM.
- Corrigido mapeamento de CRM para incluir `pain_points` e `submitted_at`.
- Tornado o tratamento de falhas mandatorio com DLQ duravel e alerta para Ops.
- Exportado Error Workflow em `docs/n8n/n8n-error-workflow.json`.
- Adicionada documentacao de variaveis obrigatorias de n8n (`docs/n8n/env.example` + docs).
- Criado teste dedicado da Story 3.5 e integrado ao `npm test`.

### File List

- `docs/n8n/payload-mapping.md` (Modified)
- `docs/n8n/n8n-lead-pipeline.json` (Modified)
- `docs/n8n/error-handling.md` (Modified)
- `docs/n8n/n8n-error-workflow.json` (Added)
- `docs/n8n/env.example` (Added)
- `tests/story-3-5-webhook-pipeline.test.mjs` (Added)
- `package.json` (Modified)
- `_bmad-output/implementation-artifacts/3-5-webhook-integration-crm-pipeline.md` (Modified)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (Modified)

## Senior Developer Review (AI)

### Reviewer
Codex

### Date
2026-03-04

### Outcome
Approved after fixes.

### Findings Resolved
- Added explicit normalization stage (`Normalize Payload`) so incoming native webhook data is converted to canonical `snake_case`.
- Enforced DLQ persistence as mandatory behavior and exported dedicated error workflow (`n8n-error-workflow.json`).
- Completed CRM mapping for `pain_points` and `submitted_at`.
- Added n8n environment variable documentation (`payload-mapping.md` + `docs/n8n/env.example`).
- Added Story 3.5 smoke coverage and integrated it into aggregate `npm test`.

### Residual Risks
- The workflows are representative manifests; final import validation still depends on n8n runtime and provider credentials.
- DLQ endpoint availability and auth policy must be validated in staging before production.

### Change Log

- 2026-03-04: Senior code review executed; findings identified (snake_case normalization gap, optional DLQ behavior, incomplete CRM mapping, missing n8n env docs, missing Story 3.5 test coverage).
- 2026-03-04: Follow-up fixes applied and validated (`npm run test:story-3-5`, `npm run test`); story moved to `done`.
