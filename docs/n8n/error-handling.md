# n8n Error Handling & Dead Letter Queue (DLQ)

Este documento define o tratamento obrigatorio de falhas para a Story 3.5.
Objetivo: nenhum lead pode ser perdido.

## Fluxos Envolvidos

- Workflow principal: `docs/n8n/n8n-lead-pipeline.json`
- Workflow de erro: `docs/n8n/n8n-error-workflow.json`

O workflow principal deve apontar para o Error Workflow via:

- `settings.errorWorkflow = {{$env.N8N_ERROR_WORKFLOW_ID}}`

## Regras Obrigatorias

1. Toda falha de execucao no workflow principal deve acionar o Error Workflow.
2. Todo erro deve gerar persistencia de payload em DLQ duravel (sem opcionalidade).
3. Todo erro deve gerar alerta para Ops no Slack.
4. Reprocessamento deve ocorrer a partir do payload salvo em DLQ.

## Implementacao da DLQ

O Error Workflow persiste os dados no endpoint configurado em `N8N_DLQ_ENDPOINT`
usando `Authorization: Bearer <N8N_DLQ_AUTH_TOKEN>`.

Payload minimo enviado para DLQ:

```json
{
  "error_at": "2026-03-04T11:00:00.000Z",
  "failed_workflow": "Typeform/Tally Webhook to CRM",
  "execution_id": "n8n-execution-id",
  "error_message": "Notion API timeout",
  "lead_payload": {
    "lead_name": "Joao da Silva",
    "email": "joao.silva@techcorp.com.br"
  }
}
```

## Notificacao Operacional

O alerta de Slack deve incluir:

- nome do workflow com falha
- execution id
- erro resumido
- contato do lead (nome/email)
- orientacao de reprocessamento com base na entrada gravada em DLQ

## Reprocessamento

1. Consultar a entrada pendente na DLQ.
2. Corrigir causa raiz (credencial, limite de API, indisponibilidade, schema).
3. Reenviar payload para o webhook principal.
4. Confirmar criacao no CRM e envio do alerta de novo lead.
