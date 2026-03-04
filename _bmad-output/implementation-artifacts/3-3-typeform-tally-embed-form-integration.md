# Story 3.3: Typeform/Tally Embed & Form Integration

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como um visitante (CEO/COO),
Eu quero preencher um questionário de diagnóstico embutido perfeitamente dentro do modal,
Para que eu possa detalhar meus pontos de dor operacionais em um formato focado e conversacional sem sair da página.

## Acceptance Criteria

1. **Dado** que o DiagnosticModal está aberto
   **Quando** o embed do Typeform/Tally carrega dentro do modal
   **Então** o embed é carregado via lazy-load apenas quando o modal for ativado (preservando o budget de performance NFR3 da página principal).
2. **Dado** a experiência de carregamento
   **Então** um skeleton placeholder (`animate-pulse bg-zinc-800 rounded`) deve ser exibido enquanto o embed inicializa a conexão com o provedor.
3. **Dado** o form handler de integração
   **Então** o embed deve usar um iframe responsivo (ou script embed adaptável) que preencha a altura útil do painel de conteúdo dentro de `max-w-xl`.
4. **Dado** a segurança da aplicação
   **Então** o ID do formulário e configurações sensíveis devem vir do ambiente (`TYPEFORM_FORM_ID` via `.env` / `import.meta.env`) — código limpo sem ID hardcoded.
5. **Dado** as regras de arquitetura 
   **Então** toda a validação de regras (requerimentos de campos, emails nulos) deve ser delegada nativamente ao Typeform/Tally (sem validação JS inserida no nosso frontend frontend - FR6).
6. **Dado** o caso de falha silenciosa 
   **Então** se o embed falhar ou o javascript for bloqueado por rede, um call-to-action alternativo é exibido: "Entre em contato: contato@aptus.com" com um href mailto adequado na sombra central do form.
7. **Dado** NFR compliance
   **Então** o embed deve herdar comportamento assíncrono para garantir não-bloqueio na Main Thread.

*(Nota fora de código: a configuração da UI conversacional, bem como consentimento de privacidade "Aceito a Política de Privacidade LGPD" deverão constar nos ajustes internos no dashboard do próprio Typeform/Tally, conforme especificado).*

## Tasks / Subtasks

- [x] Tarefa 1: Setup da Integração e Environment
  - [x] Adicionar `TYPEFORM_FORM_ID` (placeholder string vazia/fake) no `src/.env.example`
  - [x] Criar arquivo ou validar a inserção de types no `env.d.ts` (ou `index.ts` de types) se necessário.
- [x] Tarefa 2: Criar o Subcomponente `FormEmbed.astro`
  - [x] Criar o arquivo em `src/components/ui/FormEmbed.astro`.
  - [x] Estruturar o HTML responsável contendo o iframe base e fallback fallback nativo do `<noscript>`.
  - [x] Capturar a variável `import.meta.env.TYPEFORM_FORM_ID`.
- [x] Tarefa 3: Implementar o Lazy Load + Skeleton
  - [x] Integrar a camada subjacente de carregamento: div com `animate-pulse bg-zinc-800` ocupando `h-full`.
  - [x] Implementar script (Vanila JS) que ativa injetando a tag de Tally/Typeform no DOM unicamente quando escutar um evento de `onOpen` equivalente do modal (ou utilizando Observer API) e disfarce o placeholder no evento `onLoad`.
- [x] Tarefa 4: Conectar o Embed no `DiagnosticModal.astro`
  - [x] Substituir qualquer placeholder existente estático pelo `<FormEmbed />`.
  - [x] Validar padding, width, height responsivos visando `max-w-xl`.
- [x] Tarefa 5: Testar Resiliência
  - [x] Simular ausência da tag do Typeform confirmando a exibição do CTA Mailto fallback "Entre em contato: contato@aptus.com".
  - [x] Fazer checagem de Lighthouse da rota para confirmar manutenção do Score sem vazamento de JS obstrutivo na iniciação.

## Dev Notes

- **Atenção nas Integrações com JS de Terceiros:** A diretriz de arquitetura e NFR3 ditam que scripts terceiros não-core como o de formulários não podem travar o page load. Use APIs do framework ou lazy-loading (`IntersectionObserver`, injetamento reativo de script). Se Tally, injetar o `<script async src="https://tally.so/widgets/embed.js"></script>` localmente. 
- O formulário foi descrito com fallback para *Tally*, Tally.so é mais recomendável e com widget flexível em relação a custos se houver hesitação, no entanto a API final será do Typeform caso fornecida.
- **Estruturação de Árvore e Estética Visual:** O embed não deve ter scroll vertical duplo (um para o modal outro pro form) — tentar habilitar resize window postMessage api do Tally/Typeform ou fixar uma proporção calculada de `h-full`.

### Project Structure Notes

- O Componente se encaixa claramente em `src/components/ui/`.
- Variáveis devem ser tratadas pelo core do Vite fornecido no Astro `import.meta.env.XXXX`.
- Padrões visuais Dark Mode (cores ZINC) com acentuações (`focus` states de ring EMERALD) não são controláveis internamente no embed no Astro, o fallback de skeleton base deve ser de classe `bg-zinc-800`.

### References

- [Source: _bmad-output/planning-artifacts/epics.md] Epic 3, Story 3.3
- [Source: _bmad-output/planning-artifacts/architecture.md] Typeform/Tally embed lazy load strategy
- [Source: _bmad-output/implementation-artifacts/3-2-diagnosticmodal-overlay-focus-lock.md] Intelligence on parent modal

## Dev Agent Record

### Agent Model Used

Antigravity / Gemini-2.5-Pro

### Debug Log References

- All components evaluated correctly.
- Fallback JS handles timeout or failure elegantly.
- Tailwind dynamically handles full width behavior using container height constraints.
- Simulated and tested tests in `story-3-3-formembed.test.mjs`.
- Senior review follow-up fixed silent timeout fallback, iframe hardening, and modal initialization reliability.
- Validation rerun: `npm run test:story-3-3`, `npm test`, `npm run lint`.

### Completion Notes List

- `ImportMeta` typed using Astro native definitions.
- Modal loads an iframe component initialized only upon `open` attribute mutation to avoid blocking main thread at start.
- `TYPEFORM_FORM_ID` mapped to variable. If it does not exist, a visual CTA fallback defaults onto the screen securely.
- Responsive height mapping logic set.
- Silent embed failure now triggers explicit fallback CTA after timeout.
- Iframe hardening added with `sandbox` and `referrerPolicy`.
- Modal listener now has an idle-scheduled initialization fallback to avoid missed binding edge cases.

### File List

- `src/env.d.ts` (Added to include generic Astro environment setup)
- `src/components/ui/FormEmbed.astro` (Added iframe, skeleton, and mailto fallback logic)
- `src/components/ui/DiagnosticModal.astro` (Modified to replace placeholder with new component mapped nicely)
- `tests/story-3-3-formembed.test.mjs` (Added smoke checks to validate compliance against requirements)
- `package.json` (Added `test:story-3-3` and included it in aggregate `npm test`)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (Synced story key `3-3-typeform-tally-embed-form-integration` to `done`)

## Senior Developer Review (AI)

### Reviewer
Codex

### Date
2026-03-04

### Outcome
Approved after fixes.

### Findings Resolved
- Added missing environment typing file `src/env.d.ts` and validated `TYPEFORM_FORM_ID`.
- Fixed silent iframe failure path to show fallback CTA when load timeout is reached.
- Improved modal listener reliability with idle-scheduled initialization fallback.
- Hardened third-party iframe configuration with `sandbox` and `referrerPolicy`.
- Expanded Story 3.3 smoke test coverage and added it to the main `npm test` pipeline.
- Updated Story file metadata and File List to match real implementation changes.

### Residual Risks
- Smoke tests are still static source assertions (not browser-E2E), so real runtime edge cases remain partially covered.

## Change Log
- 2026-03-04: Senior code review executed; issues identified (env typing gap, silent fallback handling, modal init reliability, iframe hardening, test coverage gap, test pipeline integration, story/doc discrepancy).
- 2026-03-04: Follow-up fixes applied and validated (`npm run test:story-3-3`, `npm test`, `npm run lint`); story moved to `done`.
