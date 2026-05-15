---
layout: post
title: "Como Construí o ABNTizador - Automação de Formatação ABNT no Navegador"
category: Dev
tags: [abnt, apa, micro-saas, react, nextjs]
---

<video width="100%" controls autoplay muted loop playsinline style="border-radius: 8px; margin-bottom: 20px;">
  <source src="../../../images/abntizador-compressed.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Se você já fez um TCC, dissertação ou tese, sabe que a reta final é muitas vezes ofuscada por um monstro burocrático: a formatação nas normas da ABNT. Ajustar margens, espaçamentos, citações e referências em um arquivo `.docx` caótico não é apenas entediante, é um verdadeiro ralo de produtividade e paz mental.

Foi para resolver exatamente essa dor que decidi criar o **[ABNTizador](https://www.abntizador.com.br/)**, um micro-SaaS focado em transformar o pesadelo da formatação em um processo rápido, acessível e sem dor de cabeça para o estudante. O sistema pega um documento cru e devolve um `.docx` perfeitamente estruturado do zero.

Neste post, quero compartilhar um pouco dos bastidores técnicos desse projeto, as decisões de arquitetura e como resolvi o desafio de processar documentos de forma segura e privada.

## A Arquitetura e a Stack Escolhida

Para entregar uma experiência rápida e fluida, optei por uma stack moderna focada no ecossistema JavaScript/TypeScript:

*   **Front-end:** React com Next.js (App Router) e TypeScript, garantindo tipagem forte e facilidade de manutenção.
*   **Estilização:** Tailwind CSS. A interface precisava ser limpa, moderna e sem distrações, passando uma sensação *premium*.
*   **Back-end/Infraestrutura:** Next.js Route Handlers hospedados na Vercel.
*   **Banco de Dados (Estado Efêmero):** Vercel KV (Redis) para gerenciar o status rápido do pagamento.
*   **Gateway de Pagamento:** Mercado Pago (focado em Pix).

## O Grande Desafio (e Diferencial): Privacidade Absoluta

Uma das maiores preocupações de quem escreve um trabalho acadêmico é o plágio ou o vazamento de pesquisas inéditas. Pensando nisso, estabeleci uma regra de negócio inegociável: **100% do processamento do `.docx` ocorre no Client-Side (no navegador do usuário). O arquivo nunca é enviado para a nuvem.**

Para fazer essa mágica acontecer no front-end:
1.  Utilizo o `mammoth.js` (com algumas adaptações customizadas) para ler e extrair a estrutura bruta e os textos do documento original.
2.  Após a extração e organização lógica dos dados, recrio o documento usando a biblioteca npm `docx`, gerando um novo arquivo do zero, garantindo que as margens, estilos e sumários sigam à risca as normas da ABNT.

Isso não só garante a privacidade total dos dados do estudante, como também economiza muito custo de servidor no projeto.

## UX e o "Human-in-the-Loop"

A automação cega pode gerar desconfiança. O algoritmo é muito bom em extrair os dados, mas o usuário precisa ter o controle final. Por isso, apliquei o conceito de *Human-in-the-Loop*. 

Antes de chegar na tela de pagamento, a plataforma pede que o usuário valide algumas informações estruturais (como lidar com imagens, citações longas e referências). Essa etapa interativa gera extrema confiança na ferramenta.

Além disso, caprichei nas micro-interações: incluí estados de *loading* informativos (como *"Analisando margens..."*, *"Ordenando referências..."*). Isso diminui a ansiedade da espera e aumenta o valor percebido do trabalho pesado que está sendo feito por trás dos panos.

## Uma Experiência de Pagamento "Seamless"

A fricção na hora de pagar mata as conversões de qualquer micro-SaaS. O fluxo que desenhei é direto ao ponto:
1. A API gera um Pix Copia e Cola / QR Code via Mercado Pago.
2. O front-end utiliza o `SWR` para fazer um *polling* leve no Vercel KV.
3. Quando o webhook do Mercado Pago avisa que o pagamento caiu, o Vercel KV é atualizado.
4. Magicamente, a tela de pagamento some e o download do `.docx` formatado inicia de forma automática, sem o usuário precisar clicar em mais nada.

## Conclusão

Desenvolver o ABNTizador foi um exercício incrível de unir regras de negócio extremamente chatas (normas da ABNT) com uma experiência de usuário (UX) deliciosa de usar. Provar que é viável manipular arquivos pesados puramente no Client-Side abre um leque imenso de possibilidades para ferramentas focadas em privacidade.

Em breve compartilharei mais novidades e resultados de conversão do projeto. Se você curtiu a stack ou a ideia, deixa um comentário ou me chama para bater um papo!
