import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const root = process.cwd();
const pipelinePath = join(root, 'docs/n8n/n8n-lead-pipeline.json');
const errorWorkflowPath = join(root, 'docs/n8n/n8n-error-workflow.json');
const payloadMappingPath = join(root, 'docs/n8n/payload-mapping.md');
const errorHandlingPath = join(root, 'docs/n8n/error-handling.md');
const envTemplatePath = join(root, 'docs/n8n/env.example');

assert(existsSync(pipelinePath), 'Missing docs/n8n/n8n-lead-pipeline.json');
assert(existsSync(errorWorkflowPath), 'Missing docs/n8n/n8n-error-workflow.json');
assert(existsSync(payloadMappingPath), 'Missing docs/n8n/payload-mapping.md');
assert(existsSync(errorHandlingPath), 'Missing docs/n8n/error-handling.md');
assert(existsSync(envTemplatePath), 'Missing docs/n8n/env.example');

const pipelineRaw = readFileSync(pipelinePath, 'utf8');
const errorWorkflowRaw = readFileSync(errorWorkflowPath, 'utf8');
const payloadMapping = readFileSync(payloadMappingPath, 'utf8');
const errorHandling = readFileSync(errorHandlingPath, 'utf8');
const envTemplate = readFileSync(envTemplatePath, 'utf8');

const pipeline = JSON.parse(pipelineRaw);
const errorWorkflow = JSON.parse(errorWorkflowRaw);

const pipelineNodeNames = new Set((pipeline.nodes ?? []).map((node) => node.name));
assert(pipelineNodeNames.has('Webhook Inbound'), 'Pipeline must include Webhook Inbound node');
assert(pipelineNodeNames.has('Normalize Payload'), 'Pipeline must include Normalize Payload node');
assert(pipelineNodeNames.has('Notion Create Lead'), 'Pipeline must include Notion Create Lead node');
assert(pipelineNodeNames.has('Slack Notification'), 'Pipeline must include Slack Notification node');

const normalizeNode = (pipeline.nodes ?? []).find((node) => node.name === 'Normalize Payload');
assert(normalizeNode?.type === 'n8n-nodes-base.code', 'Normalize Payload must be a code node');
assert(String(normalizeNode?.parameters?.jsCode).includes('lead_name'), 'Normalize node must build snake_case payload');

const notionNode = (pipeline.nodes ?? []).find((node) => node.name === 'Notion Create Lead');
const notionKeys = (notionNode?.parameters?.propertiesUi?.propertyValues ?? []).map((prop) => String(prop.key));
assert(
  notionKeys.some((key) => key.includes('Dores Principais')),
  'Notion mapping must include pain_points field'
);
assert(
  notionKeys.some((key) => key.includes('Data de Entrada')),
  'Notion mapping must include submitted_at field'
);

assert(
  String(pipeline.settings?.errorWorkflow || '').includes('N8N_ERROR_WORKFLOW_ID'),
  'Pipeline must reference error workflow env id'
);

const errorNodeNames = new Set((errorWorkflow.nodes ?? []).map((node) => node.name));
assert(errorNodeNames.has('Error Trigger'), 'Error workflow must include Error Trigger node');
assert(errorNodeNames.has('Build DLQ Record'), 'Error workflow must include Build DLQ Record node');
assert(errorNodeNames.has('Persist DLQ Payload'), 'Error workflow must persist failed payload to DLQ');
assert(errorNodeNames.has('Slack Ops Alert'), 'Error workflow must alert Ops in Slack');

assert(payloadMapping.includes('snake_case'), 'Payload mapping doc must define snake_case contract');
assert(payloadMapping.includes('N8N_WEBHOOK_BEARER_TOKEN'), 'Payload mapping doc must list auth env var');
assert(payloadMapping.includes('N8N_DLQ_ENDPOINT'), 'Payload mapping doc must list DLQ env var');

assert(
  /obrigatori/i.test(errorHandling),
  'Error handling doc must declare mandatory DLQ/alert behavior'
);
assert(
  errorHandling.includes('n8n-error-workflow.json'),
  'Error handling doc must reference exported error workflow file'
);

assert(envTemplate.includes('N8N_ERROR_WORKFLOW_ID='), 'n8n env template must include N8N_ERROR_WORKFLOW_ID');
assert(envTemplate.includes('N8N_DLQ_ENDPOINT='), 'n8n env template must include N8N_DLQ_ENDPOINT');

console.log('Story 3.5 smoke checks passed.');
