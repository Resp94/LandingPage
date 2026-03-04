# Especificações de UX/UI – Refatoração Aptus Flow (Referência: Dalton Lab)

Este documento foi criado para consolidar as diretrizes de design inspiradas no estilo visual de uma infraestrutura agêntica de alta performance (inspirado pela Dalton Lab). O objetivo é transmitir modernidade, altíssima credibilidade e maturidade tecnológica, fugindo de clichês visuais saturados.

---

## 1. Análise da Referência (Estilo Dalton Lab)

A análise da referência revela um design Premium focado em clareza, confiança e arquitetura de dados silenciosa. Os pilares observados são:

*   **Atmosfera Hybrid Dark/Light**: Diferente de sites 100% dark, a referência utiliza uma transição harmônica. O **Hero Section** e o **Footer** operam em um *Dark Mode Profundo* (transmitindo imponência corporativa, autoridade e seriedade tecnológica), enquanto o miolo da página (Features/Benefícios) utiliza um fundo *Off-White Quente*, que convida à leitura e oferece um alívio cognitivo.
*   **Tipografia (Inter)**: Extremamente legível e hierárquica. O uso sutil de `letter-spacing` negativo nos cabeçalhos grandiosos (sem-serifas estruturais) e espaçamentos contidos criam aquele sentimento de "dashboard premium".
*   **Elementos Interativos (Botões e Cards)**:
    *   Botões são em formato "Pill" (totalmente arredondados, `border-radius: 9999px`) em cores sólidas contrastantes (Dark e Light) que "saltam" visualmente da tela, atraindo o clique.
    *   Cards (Benefícios/Feature) possuem bordas ultrassutis (ex: `0.8px` com `< 10%` de opacidade), promovendo a separação sem pesar os olhos. Muito preenchimento interno (Padding) para deixar os elementos "respirarem".
*   **Ausência de Poluição Visual**: O design se abstém de sombras drop-shadow borradas de bibliotecas clichês e aposta na precisão. Texturas são baseadas em Glassmorphism limpo e fundos "Glow" radiais quase imperceptíveis que apenas sugerem uma fonte de luz.

---

## 2. Nova Paleta de Cores e Tipografia (Aptus Flow)

A paleta a seguir foi criada para replicar e evoluir esse padrão visual. Todas as variáveis de cor (Tailwind) devem ser mapeadas nesses valores para o novo CSS global.

### 2.1 Color System: "Ignition Depth"

A fundação do design transitará entre espaços noturnos avermelhados profundos e pontos de claridade cintilantes para representar o potencial latente da solução da Aptus Flow. A paleta exata a ser utilizada no CSS global será rigorosamente baseada nos tons a seguir:

**Escala Base (Dark & Light Foundations):**
*   `#0C0000`: **Fundo profundo** (Dark Mode, Hero, Footer e fundo do Modal de Diagnóstico).
*   `#3C0000`: **Sombra escura** (Cards dark, modais secundários ou bordas no tema escuro).
*   `#FFFFFF`: **Brilho / Luz** (Para contraste extremo, textos primários no dark mode, fundos em light mode e botões "Pill" invertidos).

**Escala Neutra / Acentos Intermediários (O "Fogo" Tecnológico):**
*   `#600000`: Vermelho escuro (Hover states muito contidos).
*   `#9C0C00`: Vermelho base (Indicadores de estado).
*   `#C01800`: Vermelho médio.
*   `#E40C00`: Vermelho vivo.

**Escala de Ação (Acentos Críticos & CTAs):**
Essas cores só devem brilhar em momentos táticos, não sujando o layout principal.
*   `#F03000`: Laranja-vermelho.
*   `#FC5400`: **Laranja quente** (Cor Institucional Principal - Accent. Use intensamente no detalhamento interativo, foco de inputs e brilhos on-hover).
*   `#FC7800`: Laranja brilhante.
*   `#FC9C00`: Âmbar (Mensagens de aviso e links delicados).
*   `#FCC000`: Ouro (Feedbacks de Sucesso Premium, detalhamento minucioso de badgets ex: estrelas ou features completas).

**Cor de Ação (Primary CTA e Transições)**:
*   Os botões primários usarão extrema vibração para "saltarem" ao olhar. Para o Tema Dark (no fundo `#0C0000`), botão sólido `#FC5400` ou Brilho/Luz (`#FFFFFF` com texto `#0C0000`). No hover, eleve ligeiramente para o Laranja brilhante `#FC7800`.

### 2.2 Typography System

*   **Fonte Principal (Globais)**: **Inter**
    *   *Headings (H1, H2)*: `font-weight: 600` a `700`, `tracking-tight` (-0.02em a -0.04em). Esse leve estreitamento das letras trará ao texto um peso editorial e imersivo.
    *   *Body (p)*: `font-weight: 400`, com um line-height farto de `1.6` ou `1.75`. Tamanho base de `17px` ou `18px`.
*   **Fonte Secundária (Mono / Dados / Badges)**: **JetBrains Mono**
    *   Usada apenas para tags, labels de pequenos status e números pontuais (como `01`, `02`, `03` nas Features). Trará o "DNA Tecnológico".

---

## 3. Especificações Estruturais (Layout & Componentes)

### 3.1 O Novo Hero Section (O "Impacto Profundo")
*   **Background**: `bg-[#0C0000]`. Deve ter um gradiente radial muito suave ao fundo (um sutil *Glow* colorindo suavemente espaços em `#600000`) orbitando a parte superior central que crie volume 3D, mas sem saturar com vermelho vivo.
*   **Estrutura de Conteúdo**:
    *   **Headline (H1)**: Centralizado (Desktop) ou alinhado à esquerda (Mobile). Texto colossal, contrastante.
    *   **Sub-headline**: Abaixo do H1, com max-width reduzido (ex: `max-w-2xl`) e opacidade controlada (`text-white/60`).
    *   **Call to Action (CTA)**: Botão estilo Pill (`rounded-full`), padding generoso longo (`px-8 py-3`). Cor intensa de ação (`bg-[#FC5400] text-[#0C0000]`). Efeito hover de `scale` ligeiro indo para `#FC7800`.

### 3.2 Seção de Benefícios (O "Alívio Cognitivo")
*   **Transição de Cor**: O Scroll sairá do Dark Mode absoluto (Hero) transitando imediatamente para a superfície de alto brilho (`bg-[#FFFFFF]`). Esse contraste brusco simula a "luz acendendo".
*   **Estrutura dos Cards**:
    *   Cards brancos puros com contornos sutis avermelhados ou cinza levíssimo sobre o fundo super claro.
    *   Cantos moderadamente arredondados (`rounded-2xl` ou `rounded-3xl` dependendo da seção).
    *   **Borda**: A chave é a borda "Hairline" — `border border-[#3C0000]/[0.10]` (opacidade muito baixa). Sem sombras flutuantes pesadas.
    *   **Ícones**: Finos, em tons quentes (`text-[#E40C00]`), e bem espaçados. Muito preenchimento interno (`p-8` ou `p-10`) deixando os itens respirarem adequadamente.

### 3.3 A Nova Seção de FAQ (A Autoridade Silenciosa)
Para acomodar as dúvidas rápidas pré-conversão sem quebrar a elegância arquitetônica da página:
*   **Localização**: Acima do CTA de fim de página e do Footer, geralmente inserida no Tema Light (para seguir o corpo de texto fluido) da página.
*   **Modelo de Componente (Accordion Minimalista)**:
    *   De largura máxima enxuta (ex: `max-w-3xl`) garantindo conforto visual no tamanho linear do texto.
    *   Sem formatações pesadas de "cartão para a pergunta inteira". Apresentar um ícone de `+` ou `Chevron Down` elegante (traço de `1.5px` ou `2px` de grossura).
    *   **Borda Divisória**: Apenas uma linha fina separando cada item (`border-b border-zinc-200`).
    *   **Interação Transicional**: O Chevron/mais rotaciona sutilmente no evento de clique enquanto a resposta colapsada expande a altura suavemente (`transition-all duration-300 ease-out`).
    *   **Feedback Visual de Resposta**: A resposta não deve ser compacta. Manter a classe hierárquica alta do body text do resto do site - a resposta de uma dúvida é algo vital em UX B2B.

---

Este material serve como "North Star" de UX/UI para orientar nossa codificação, componentes Astro e refatoração CSS adiante. Todos os utilitários Tailwind aplicados deverão respeitar estes Design Tokens rígidos para manter e replicar a pureza, velocidade e classe observadas.
