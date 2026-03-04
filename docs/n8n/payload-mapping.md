# Typeform/Tally Webhook Payload & Field Mapping

Este documento descreve o contrato canonical do payload para o fluxo n8n da Aptus.
Mesmo quando o Typeform/Tally enviar campos com nomes diferentes, o node `Normalize Payload`
do workflow converte tudo para `snake_case` antes de seguir para CRM e notificacoes.

## Endpoint de Captura

- **Method:** `POST`
- **Headers obrigatorios:**
  - `Content-Type: application/json`
  - `Authorization: Bearer <N8N_WEBHOOK_BEARER_TOKEN>`

## Variaveis Obrigatorias (n8n)

Defina as variaveis abaixo no ambiente do n8n (backend), nao no frontend Astro:

- `N8N_WEBHOOK_BEARER_TOKEN`: token do header auth para o endpoint de webhook.
- `N8N_NOTION_DATABASE_ID`: ID do database Notion de destino.
- `N8N_SLACK_CHANNEL_ID`: canal de alerta de novos leads.
- `N8N_ERROR_WORKFLOW_ID`: ID do workflow de erro vinculado ao workflow principal.
- `N8N_DLQ_ENDPOINT`: endpoint de persistencia da DLQ (fila morta).
- `N8N_DLQ_AUTH_TOKEN`: token Bearer para gravacao no endpoint de DLQ.

## Formato Canonical do Payload (snake_case)

```json
{
  "lead_name": "Joao da Silva",
  "company_name": "Tech Corp Ltda",
  "email": "joao.silva@techcorp.com.br",
  "phone_number": "+5511999999999",
  "pain_points": [
    "Dificuldade em organizar processos",
    "Falta de visibilidade de metricas",
    "Gargalos de comunicacao interna"
  ],
  "current_tooling": "Planilhas Excel e WhatsApp",
  "budget_range": "R$ 5.000 - R$ 10.000",
  "urgency": "Alta - Preciso para este mes",
  "source": "landing_page",
  "submitted_at": "2026-03-04T10:30:00Z"
}
```

## Mapeamento de Campos: Notion CRM

| Campo JSON (`snake_case`) | Propriedade no Notion | Tipo | Observacoes |
| :--- | :--- | :--- | :--- |
| `lead_name` | Name | Title | Identificador principal do registro |
| `company_name` | Empresa | Rich Text | Nome da empresa |
| `email` | E-mail | Email | Contato principal |
| `phone_number` | Telefone | Phone | Telefone com codigo de pais/area |
| `pain_points` | Dores Principais | Multi-select | Lista de dores do lead |
| `current_tooling` | Stack Atual | Rich Text | Ferramentas atuais |
| `budget_range` | Orcamento | Select | Faixa de investimento |
| `urgency` | Urgencia | Select | Prioridade de atendimento |
| `source` | Origem | Select | Origem da captura |
| `submitted_at` | Data de Entrada | Date | Timestamp da submissao |

## Observacao de Compatibilidade

Se a integracao final usar Trello em vez de Notion, o contrato `snake_case` permanece igual.
Somente o mapeamento de destino muda (campos customizados ou descricao do card).
