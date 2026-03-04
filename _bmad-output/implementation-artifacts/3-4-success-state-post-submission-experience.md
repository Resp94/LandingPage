# Story 3.4: Success State & Post-Submission Experience

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want rich, authoritative confirmation after submitting my diagnostic form,
so that I feel my request is being actively processed by specialists, not thrown into a void.

## Acceptance Criteria

1. **Dado** que o visitante conclui o envio do formulário Typeform/Tally
   **Quando** a submissão é finalizada
   **Então** o DiagnosticModal transiciona para um estado de sucesso (dentro do próprio modal, sem redirecionamento de página).
2. **Dado** o estado de sucesso
   **Então** a mensagem de sucesso exibe o conteúdo: "Analisando seu ecossistema..." seguido por "Seu perfil foi enviado ao núcleo de Engenharia Aptus. Tempo de resposta projetado: 24h úteis."
3. **Dado** a estilização da mensagem
   **Então** deve ser utilizado `text-zinc-100` para a confirmação primária e `text-zinc-400` para os detalhes da timeline.
4. **Dado** a confirmação visual
   **Então** um discreto checkmark Emerald ou elemento de sotaque (`#10b981`) confirma o sucesso visualmente.
5. **Dado** as regras de identidade e marca da Aptus
   **Então** nenhum confete, fogos de artifício ou mensagem genérica de "Obrigado!" deve ser exibida.
6. **Dado** as ações pós-submissão
   **Então** um botão "Fechar" (estilo Ghost) permite ao usuário fechar o modal e retornar à landing page principal.
7. **Dado** os requisitos de acessibilidade (a11y)
   **Então** o estado de sucesso deve possuir atributos `role="status"` e `aria-live="polite"` para screen readers.

## Tasks / Subtasks

- [x] Tarefa 1: Interceptar a Submissão do Formulário
  - [x] Implementar event listener (ex: `window.addEventListener('message', ...)`) no script do modal para detectar a submissão bem-sucedida vinda do iframe do Typeform/Tally.
- [x] Tarefa 2: Codificar a UI do Estado de Sucesso
  - [x] Criar toda a estrutura HTML do "Success State" em `DiagnosticModal.astro` (escondida por padrão via `hidden`).
  - [x] Estilizar o texto principal "Analisando seu ecossistema..." com `text-zinc-100`.
  - [x] Estilizar o texto de apoio "Seu perfil foi enviado ao núcleo..." com `text-zinc-400`.
  - [x] Inserir ícone de checkmark compatível com a cor Emerald (`text-emerald-500`).
- [x] Tarefa 3: Lógica de Transição de Estado
  - [x] Expandir o script em `modal.ts` (ou equivalente) para ocultar o iframe (adicionar `.hidden`) e revelar o painel de sucesso (remover `.hidden`) ao receber o evento de submit.
  - [x] Aplicar fade-in sutil para transição elegante.
- [x] Tarefa 4: Botão "Fechar"
  - [x] Adicionar um Ghost Button "Fechar" ao painel de sucesso.
  - [x] Vincular evento de clique para fechar o modal completamente (usando as rotinas já estabelecidas do `DiagnosticModal`).
- [x] Tarefa 5: Acessibilidade (A11y)
  - [x] Inserir os atributos `role="status"` e `aria-live="polite"` no wrapper da mensagem de sucesso.
  - [x] Garantir `focus-visible` e `aria-label` apropriados no botão Fechar.

## Dev Notes

- **Detecção de Evento de Submit:** Como o form é um embed via iFrame, é mandatório escutar chamadas de `postMessage`. O Typeform emite eventos `form-submit` que carregam os dados. Consulte a documentação (ex: `window.addEventListener('message', event => { if(event.data?.type === 'form-submit') ... })`).
- **Engenharia CSS (Simplicidade Evitando Reflows):** Gerencie as views (Form view e Success view) escondendo/exibindo elementos com `.hidden` (Display: none) manipulados via `classList`. Não desmonte o HTML via JS para preservar performance e simplificar no SSG.
- **Tone of Voice C-Level:** Lembre-se, o texto e UI são "Brutalismo Estrutural" + "Minimalismo Etéreo". O checkmark deve ser minimalista, estritamente `emerald-500`. NUNCA use comemorações. 
- **Sem Redirecionamentos:** Tudo opera dentro da SPA em `index.astro`. Não há mudança de Location.

### Project Structure Notes

- Adicionar o bloco de UI e classes de controle ao `src/components/ui/DiagnosticModal.astro`.
- Modificar o `src/scripts/modal.ts` para receber a inteligência da troca de estados após interceptar via Tally/Typeform embed Events.

### Previous Story Intelligence

- O embed em `FormEmbed.astro` construído na *Story 3.3* inclui hardening no iframe (atributos do sandbox) - valide se estes atributos (`allow-scripts allow-same-origin`) permitem a postMessage propagation de submits em cross-origin (Geralmente Typeform e Tally exigem scripts habilitados e geram postMessages que atravessam).
- Em *Story 3.3*, nós tivemos problemas de timeouts e fallbacks. Assegure que o success state listener inicie cedo e não conflite com as reinicializações.
- O componente `DiagnosticModal.astro` já controla o body-scroll lock e a11y focus. Garanta que ao transicionar pro Success State, o focus seja transferido para o container de sucesso ou para o botão "Fechar", nunca ficando preso no iFrame morto.

### References

- [Source: _bmad-output/planning-artifacts/epics.md] Epic 3, Story 3.4
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md] Journey Patterns e Success States (Ponto B e Micro-Interactions)
- [Source: _bmad-output/planning-artifacts/architecture.md] Component Strategy - DiagnosticModal Hydration logic

## Dev Agent Record

### Agent Model Used

Antigravity / Gemini-2.5-Pro

### Debug Log References

- `npm run test:story-3-4`
- `npm run test`
- `npm run lint`

### Completion Notes List

- Tarefa 1 concluída: Listener `message` configurado para suportar integração do iFrame form. Reconhece submissões do Tally/Typeform analisando `e.data` em busca do payload de conclusão.
- Tarefa 2 concluída: View de Sucesso encapsulada adjacente ao iframe (`#success-view` vs `#form-view`), aderente ao branding com iconografia emerald-500 e tipografias zincadas.
- Tarefa 3 concluída: Logica em `showSuccessState()` implementa transição cross-fade assíncrona baseada em opacidade (`opacity-0` e `hidden`) para performance otimizada sem reflows abruptos.
- Tarefa 4 concluída: Botão phantom ghost finalizado. Click no `success-close-btn` dispara `closeModal()`, resetando os estados no ciclo subsequente.
- Tarefa 5 concluída: Acessibilidade atendida. Container notificado como `role='status'`, redirecionamento de focus pós-animação diretamente ao botão fechar.

- Review follow-up: handler `postMessage` hardened with strict `origin` and iframe `source` validation.
- Review follow-up: first-open initialization bootstrap added on `open-diagnostic` to avoid missed first click.
- Review follow-up: success close action aligned to Ghost button style (`bg-transparent`, `text-zinc-400`).
- Review follow-up: Story 3.4 smoke test added and wired into `npm test`.

### Change Log

- Implementado estado de confirmação pós subbmissão no `DiagnosticModal.astro`. Modificações extensas na script block (`modal.ts`) para tratamento agnóstico de Typeform e Tally postMessages.

- 2026-03-04: Senior code review executed; findings identified (postMessage trust boundary, first-click init race, ghost-style divergence, missing Story 3.4 test coverage, file-list mismatch).
- 2026-03-04: Follow-up fixes applied and validated (`npm run test:story-3-4`, `npm run test`, `npm run lint`); story moved to `done`.

### File List

- `src/components/ui/DiagnosticModal.astro` (Modificado)
- `src/scripts/modal.ts` (Modificado)
- `tests/story-3-4-successstate.test.mjs` (Adicionado)
- `package.json` (Modificado)
- `_bmad-output/implementation-artifacts/3-4-success-state-post-submission-experience.md` (Modificado)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (Modificado)

## Senior Developer Review (AI)

### Reviewer
Codex

### Date
2026-03-04

### Outcome
Approved after fixes.

### Findings Resolved
- Added strict `postMessage` trust checks (`origin` and iframe `source`) before transitioning to success state.
- Added first-open bootstrap initialization path for `open-diagnostic` to avoid first-click race conditions.
- Updated success close button to a true Ghost style consistent with UX guidance.
- Added Story 3.4 smoke checks and integrated them into `npm test`.
- Synced story metadata, file list, and sprint tracking to match implementation reality.

### Residual Risks
- Coverage remains source-level smoke tests; runtime provider-specific postMessage variations are better validated with browser E2E tests.
