# Story 2.4: CTA Section & Privacy Page

Status: done
<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como **visitante (CEO/COO)**,
Eu quero **uma seção de call-to-action final e persuasiva que me conduza a solicitar uma auditoria, além de ter acesso a uma política de privacidade clara**,
para que **eu possa transicionar do interesse à ação com total segurança e conformidade com a LGPD (FR2, LGPD)**.

## Aceitação e Critérios (Acceptance Criteria)

1. **Dado** que o visitante passa da seção de Solução (SolutionSection)
2. **Quando** `CTASection.astro` for renderizado
3. **Então** um título conciso reafirmando o valor deve aparecer ("Sua Operação Merece Engenharia, Não Remendos" ou equivalente).
4. **E** um botão `TacticalCTA` proeminente ("Agendar Auditoria") deve estar centralizado com estilo de sotaque Emerald.
5. **E** um texto de apoio abaixo do CTA deve tranquilizar o usuário ("Análise sem compromisso. Sua operação diagnosticada em até 24h úteis.").
6. **E** a seção usa espaçamento `py-24 lg:py-32` e possui a classe de animação `.scroll-reveal`.
7. **E** nenhuma tabela de preços, colunas de planos ou linguagem como "Compre Agora" é utilizada.
8. **Dado** que a página de privacidade é obrigatória para LGPD
9. **Quando** o arquivo `src/pages/privacidade.astro` for criado
10. **Então** ele deve utilizar o `BaseLayout` e exibir uma política de privacidade estática abrangente: dados coletados (nome, e-mail, empresa), propósito (qualificação de lead), processamento (webhook para CRM), direitos (acesso, retificação, exclusão), contato do controlador de dados.
11. **E** o link da página deve estar acessível via `Footer.astro`.
12. **E** a página deve seguir o Design System em Modo Escuro Absoluto (Dark Mode corporativo).

## Tarefas / Subtarefas

- [x] Criar o componente `CTASection.astro` (CA: 1 a 7)
  - [x] Implementar a estrutura raiz `<section>` com as classes de espaçamento vertical padrão `py-24 lg:py-32` e adicionar o wrapper interno centralizado via `max-w-4xl mx-auto text-center px-4`. (CA: 6)
  - [x] Inserir o título principal usando os estilos e variáveis tipográficas definidas para a consistência Brutalista (ex: `H2` formatado com `text-zinc-100 font-bold tracking-tight text-4xl md:text-5xl`). (CA: 3)
  - [x] Importar e utilizar o componente `TacticalCTA.astro` já existente (da Epic 3, assumindo que esteja implementado ou implementá-lo via proxy/placeholder se necessário, com texto "Agendar Auditoria"). (CA: 4)
  - [x] Inserir a descrição auxiliar sob o botão usando cores mais sutis (ex: `text-zinc-400 mt-6`) referenciando a análise em "24h úteis". (CA: 5)
  - [x] Adicionar as classes de animação `.scroll-reveal` ao pacote principal da call to action. (CA: 6)
  
- [x] Criar a página `privacidade.astro` (CA: 8 a 12)
  - [x] Criar arquivo `privacidade.astro` dentro de `src/pages/`. (CA: 9)
  - [x] Utilizar o `BaseLayout.astro` existente para encapsular a página. (CA: 10, 12)
  - [x] Adicionar o conteúdo estático abordando os direitos do usuário e a proteção de dados segundo LGPD usando formatação `text-zinc-400` para base e `text-zinc-100` em subtítulos de sessões. (CA: 10, 12)
  - [x] Atualizar o componente `Footer.astro` (caso necessário) ou confirmar se o link já aponta corretamente para `/privacidade`. (CA: 11)

## Dev Notes

### Arquitetura e Constraints
- **Zero-JS Default:** Componente `CTASection.astro` e página `privacidade.astro` devem ser renderizados 100% no servidor (SSG - Static Site Generation via Astro). O único gatilho dinâmico é a observação do `.scroll-reveal`, gerenciada fora do componente. NUNCA utilize diretivas como `client:load` ou `client:idle` nestes novos arquivos.
- **Tailwind Strict Ordering:** Lembre-se de ordenar as classes conforme definição do projeto (Layout → Spacing → Typography → Colors → Effects → Transitions → Responsive). Ex: `flex flex-col items-center py-24 w-full max-w-7xl mx-auto text-center`.
- **Acessibilidade Absoluta (A11y):** Garanta as declarações corretas semânticas; links na página de privacidade demandarão estados de foco `focus-visible:ring-2 focus-visible:ring-emerald-500` visíveis ao teclado.
- **Aprendizados Extraídos da Revisão da Story Anterior (2.3):**
  - Mantenha estruturação semântica correta nas listas da política de privacidade (`ul`/`li`).
  - Lembre-se de adicionar `CTASection` de fato em `src/pages/index.astro`. (Verificação do review apontou que as seções não renderizam magicamente se não importadas).

### Dicas de Otimização e Prevenção de Erros
- **SEO/NFR1 (Lighthouse >= 95):** A página de privacidade, por ser estática e de texto longo, é um prato cheio para perfeição (LCP/FID). Mantenha o markup limpo. Não injete CSS ou scripts desnecessários.
- **Diretriz de Design:** Sem tabelas e sem botões que pisquem ou ofereçam urgência de varejo - continue a narrativa sofisticada e silenciosa do *Luxo Operacional B2B*.

### Project Structure Notes

- `src/components/sections/CTASection.astro` (Nova Seção)
- `src/pages/privacidade.astro` (Nova Página)
- Modificar `src/pages/index.astro` estendendo a página inicial.
- Modificar `src/components/layout/Footer.astro` garantindo integridade de ancoragem se previamente pendente.

### Referências
- **Arquitetura:** `_bmad-output/planning-artifacts/architecture.md#Frontend Architecture`
- **Diretrizes Visuais Formais:** `_bmad-output/planning-artifacts/ux-design-specification.md#Design Direction Decision`
- **Épicos & Acceptance Criteria Base:** `_bmad-output/planning-artifacts/epics.md#Story 2.4: CTA Section & Privacy Page`

## Dev Agent Record

### Agent Model Used

BMAD-Agent (Antigravity Context)

### Debug Log References

- A análise das dependências identificou a vulnerabilidade comum de se criar a seção sem roteá-la devidamente para o `index.astro` graças às anotações da review da Story 2.3. As recomendações foram mitigadas e alocadas nas Dev Notes.

### Completion Notes List

- ✅ Implementação da `CTASection` com foco em SSR (`.astro` sem client directives), estruturada para alinhamento e consistência Brutalista usando componentes e formatação de texto exigidos.
- ✅ Inclusão global do gatilho `scroll-reveal` no CTA para animação.
- ✅ Criação da página `/privacidade` 100% estática utilizando `BaseLayout`.
- ✅ Conteúdo da política particionado e adaptado às regras da LGPD (Dados coletados, compartilhamentos, direitos dos titulares e contato). 
- ✅ Estilização do texto da política de privacidade usando estilos consistentes e semânticos.
- ✅ Inclusão da `CTASection` no arquivo `index.astro`.
- ✅ Verificada a linkagem de `Privacidade` no `Footer.astro`.

### File List
- `src/components/sections/CTASection.astro` (modificado)
- `src/pages/privacidade.astro` (criado)
- `src/pages/index.astro` (modificado)
- `package.json` (modificado)
- `tests/story-2-4-smoke.test.mjs` (criado)

### Senior Developer Review (AI)

**Reviewer:** Codex - 2026-03-03  
**Review Model:** GPT-5 (adversarial code review)

#### Git vs Story Discrepancies
- `Footer.astro` estava listado na File List inicial sem alteração no diff local.
- `sprint-status.yaml` foi sincronizado durante o fluxo e agora está refletido no tracking.

#### Findings Summary

| ID | Severity | Description | Evidence |
|---|---|---|---|
| H1 | HIGH | AC1 não atendido: CTA deveria vir após SolutionSection, mas a SolutionSection não estava na composição da home. | RESOLVIDO: `src/pages/index.astro` agora renderiza Hero -> Problem -> Solution -> CTA. |
| H2 | HIGH | AC4 parcial: CTA final não estava proeminente com sotaque Emerald no estado padrão. | RESOLVIDO: `src/components/sections/CTASection.astro` aplica classes Emerald no estado padrão do `TacticalCTA`. |
| M1 | MEDIUM | Divergência de rastreabilidade entre File List e alterações reais no git. | RESOLVIDO: File List atualizada com os arquivos realmente alterados no pós-review. |
| M2 | MEDIUM | Ferramenta de formatação não validava `.astro` (parser/plugin ausente), reduzindo confiabilidade do gate de qualidade. | RESOLVIDO: scripts de formatação ajustados para tipos suportados + `lint` com `astro check`. |
| M3 | MEDIUM | Não havia testes automatizados cobrindo os critérios desta story (rota `/privacidade` e ordem narrativa da página). | RESOLVIDO: criado `tests/story-2-4-smoke.test.mjs` e script `npm run test:story-2-4`. |

#### Build/Validation
- `npm run test`: passou (`Story 2.4 smoke checks passed.`).
- `npm run lint`: passou (0 erros; apenas hints não-bloqueantes já existentes no projeto).

#### Outcome
- **Approved after fixes** (0 HIGH, 0 MEDIUM).
- Story movida para **done** após validação das correções.

### Change Log
- 2026-03-03: Code review executado; status alterado de `review` para `in-progress` por findings em aberto (H1, H2, M1, M2, M3).
- 2026-03-03: Correções automáticas aplicadas pós-review (H1, H2, M1, M2, M3); status alterado para `done`.