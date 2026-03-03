# Story 1.5: CI/CD Pipeline & Deployment

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como um **desenvolvedor**,
Eu quero **um pipeline de deploy automatizado que bloqueie releases que falhem nos padrões de performance**,
para que **o site em produção sempre mantenha um score Lighthouse >= 95 e seja publicado de forma confiável na edge do Cloudflare Pages**.

## Acceptance Criteria

1. **Dado** que o projeto foi atualizado no repositório GitHub.
2. **Quando** um push para a branch `main` ocorrer.
3. **Então** o GitHub Actions deve rodar: lint -> `astro build` -> Lighthouse CI check -> deploy to Cloudflare Pages.
4. **E** a build deve falhar se o score do Lighthouse for < 95 em Performance, Best Practices, Accessibility ou SEO.
5. **E** pushes para as branches `preview/*` (ou PRs) devem criar Cloudflare Pages preview deployments automaticamente.
6. **E** o Cloudflare Web Analytics deve ser habilitado (cookieless, zero JS, sem impacto no Lighthouse).
7. **E** variáveis de ambiente (como `TYPEFORM_FORM_ID`) devem estar documentadas e prontas para configuração no Cloudflare Pages dashboard.
8. **E** os arquivos de workflow `deploy.yml` e `lighthouse.yml` devem existir no diretório `.github/workflows/`.

## Tasks / Subtasks

- [x] Criar a infraestrutura de `.github/workflows/`
  - [x] Criar arquivo `deploy.yml` para gerir builds e deploys para o Cloudflare Pages.
  - [x] Implementar a lógica no pipeline para rodar um formatação/lint (opcional dependendo de linter ativo, mas recomedado validar tipo TS `tsc --noEmit`).
  - [x] Integrar usando wrangler action v3+ (`cloudflare/pages-action`) ou command via npm para enviar `dist/` para a Cloudflare após build.
- [x] Implementar a verificação de Quality Gate via Lighthouse CI
  - [x] Criar arquivo `lighthouse.yml` (ou adicionar job integrado no pipeline) para auditoria.
  - [x] Criar configuração lhc (`lighthouserc.js` ou equivalente) com assertions configurados em threshold 0.95 globalmente.
  - [x] Assegurar que o CI usa um servidor de preview para validar o build (ex: `npx astro preview`).
- [x] Setup do Cloudflare Analytics e Env Vars
  - [x] Adicionar beacon web analytics caso projeto não dependa da injeção auto do dashboard do Cloudflare, garantindo zero JS overhead na main thread.
  - [x] Documentar localmente ou prover mock local no `.env.example` para suporte e CI.

## Dev Notes

### Architecture and Tech Constraints:
- **Zero tolerance performance budget**: O NFR1-NFR4 exige TTFB <= 250ms e LCP <= 2.0s com rating Google Lighthouse >= 95. A quebra de score pelo Lighthouse CI tem que retornar *exit code non-zero* falhando o deploy real.
- **Cloudflare Pages Integration**: O deployment edge necessita a build process final gerando código via SSG em Astro (`astro build`).
- **Lighthouse execution**: O plugin usa Node e Chrome headless. Você precisa rodar o servidor locamente no Action process (comando de start `npx astro preview` na URL `http://localhost:4321`) e plugar o LHCI collect para varrer.
- **Astro SSG default**: Toda a lógica anterior e CSSs (Astro Islands) gerará static content em `dist/`. Deploy apenas desta pasta.

### Contexto de Implementações Prévias:
- Nas stories passadas (1.1 a 1.4), o `global.css` implementou TailwindCSS v4 com Dark Mode corporativo e ScrollReveal, ambos totalmente adaptáveis semanticamente (sem problemas severos de Web Vitals por CLS/LCP, graças à ausência de libs JS pesadas).
- *Atenção à Acessibilidade*: Alguns scores podem alertar, mantenha a assertividade do LHCI para prevenir que as cores Zinc prejudiquem pontuações no setup Lighthouse de accessibility.

### Project Structure Notes
- Crie a pasta se não existir na raiz do workspace (`.github/workflows/`).
- Adicione script NPM no `package.json` para testar lighthouse localmente, caso necessário. 

### References
- [Source: _bmad-output/planning-artifacts/epics.md#Story-1.5-CI/CD-Pipeline--Deployment]
- [Source: _bmad-output/planning-artifacts/architecture.md#Infrastructure-&-Deployment]

## Dev Agent Record

### Agent Model Used
Gemini 2.5 Flash

### Debug Log References
- Checked the build works perfectly inside astro environment natively.
- Checked Lighthouse CI correctly references localhost:4321 with `npm run preview`.

### Completion Notes List
- ✅ Created `deploy.yml` with CI/CD stages mapping format:check, astro check, build and LHCI CI, following cloudflare deploy.
- ✅ Created `lighthouserc.js` with `.95` minScore for categories:performance, accessibility, best-practices, and seo.
- ✅ Injected `CF_WEB_ANALYTICS_TOKEN` script in `BaseLayout.astro`.
- ✅ Updated `.env.example` implicitly standardizing `CF_WEB_ANALYTICS_TOKEN`.

### Senior Developer Review (AI)
- **Fixed (Critical)**: Added `CF_WEB_ANALYTICS_TOKEN` and `TYPEFORM_FORM_ID` context environment variables to the Astro build step in Github Actions workflow.
- **Fixed (High)**: Restructured CI by splitting PR tests into a dedicated `.github/workflows/lighthouse.yml` and explicitly matching Acceptance Criteria 8.
- **Fixed (Medium)**: Interfaced the Lighthouse CLI autorun with an NPM package script (`npm run lighthouse`).

### File List
- `A` .github/workflows/deploy.yml
- `A` .github/workflows/lighthouse.yml
- `A` lighthouserc.js
- `M` .env.example
- `M` src/layouts/BaseLayout.astro
- `M` package.json
