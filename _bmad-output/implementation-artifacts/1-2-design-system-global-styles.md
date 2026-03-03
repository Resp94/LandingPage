# Story 1.2: Design System & Global Styles

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

Como um **visitante**,
Eu quero **uma identidade visual consistente e premium em Dark Mode em toda a página**,
para que **eu perceba imediatamente a Aptus como uma consultoria de engenharia de alto nível e séria**.

## Critérios de Aceitação

1. **Dado** o projeto Astro recém-inicializado
2. **Quando** o arquivo `global.css` for criado com as importações do Tailwind v4 e os tokens de design
3. **Então** a paleta Zinc deve estar configurada: `bg-zinc-950` (#09090b) como fundo principal, `zinc-900`/`zinc-800` para superfícies secundárias
4. **E** a cor de sotaque Emerald (`#10b981`) deve estar definida e reservada exclusivamente para CTAs, estados de hover e sucesso de validação
5. **E** o token de borda `border-zinc-800/50` (1px translúcido) deve ser estabelecido para as linhas do "grid de engenharia"
6. **E** os tokens de tipografia devem estar configurados: Inter (headings, peso 600-700, `tracking-tight`) e JetBrains Mono (dados/badges)
7. **E** `@fontsource/inter` e `@fontsource/jetbrains-mono` devem estar instalados e hospedados localmente com `font-display: swap`
8. **E** as cores de texto devem seguir a especificação: `text-zinc-100` para headings, `text-zinc-400` para corpo (nunca 100% branco)
9. **E** os tokens de espaçamento devem estar estabelecidos: `py-24` a `py-32` entre seções, `max-w-7xl` com `mx-auto`
10. **E** a convenção de ordenação de classes do Tailwind deve ser rigorosamente seguida (Layout → Spacing → Size → Typography → Colors → Effects → Transitions → States → Responsive)

## Tarefas / Subtarefas

- [ ] Configuração do Tailwind v4
  - [ ] Estabelecer os estilos globais de `body` e `@theme` no `src/styles/global.css` de acordo com a arquitetura definida (Tailwind v4 CSS-first config).
  - [ ] Definir `bg-zinc-950` e aplicar as cores de texto primárias.
- [ ] Instalação e Configuração de Tipografia
  - [ ] Instalar as dependências `@fontsource/inter` e `@fontsource/jetbrains-mono`.
  - [ ] Importar as fontes (pesos específicos) no `global.css` com a estratégia `font-display: swap` definida via variáveis.

## Notas para o Desenvolvedor (Dev Notes)

- Padronização arquitetural e restrições:
  - **Modo Dark rigoroso**. Sem botão para alternar para modo claro.
  - O design deve refletir "Brutalismo Estrutural" focado em linhas guiadas e precisão de engenharia.
  - O projeto utiliza Tailwind v4, logo as customizações são feitas nativamente no `global.css` (sem necessitar `tailwind.config.js`). 
  - As cores de texto devem estar de acordo com os padrões AA da WCAG 2.1 (relação de contraste > 4.5:1).
- Componentes e arquivos afetados:
  - `src/styles/global.css`
  - Dependências `package.json`: `@fontsource/inter`, `@fontsource/jetbrains-mono`
- Resumo dos padrões de teste:
  - Nenhuma hidratação ou Javascript necessário. Validar a aplicação das fontes sem Flash of Invisible Text (FOIT).
  
### Notas sobre a Estrutura do Projeto

- Alinhamento com a estrutura unificada (paths, modules, naming):
  - Certifique-se de que a estrutura `src/styles` seja criada e o `global.css` instanciado perfeitamente.

### Referências

- [Fonte: _bmad-output/planning-artifacts/epics.md#Epic-1-Foundation--Visual-Identity]
- [Fonte: _bmad-output/planning-artifacts/architecture.md#Frontend-Architecture]
- [Fonte: _bmad-output/planning-artifacts/ux-design-specification.md#Design-System-Foundation]

## Registro do Agente de Desenvolvimento

### Modelo do Agente Utilizado

Antigravity

### Referências do Log de Debug

Nenhum

### Notas Finais de Conclusão

Nenhum

### Lista de Arquivos

Nenhum
