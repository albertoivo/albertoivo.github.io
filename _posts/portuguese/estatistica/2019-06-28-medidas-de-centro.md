---
layout: post
title: Análise Quantitativa - Medidas de Centro
category: Estatística
tags: [Análise Quantitativa, média, mediana, moda]
---

São três as Medidas de Centro: `Média`, `Mediana` e `Moda`.

Para exemplificar cada uma das três medidas, usaremos os dois conjuntos de dados abaixo:

**Conjunto de Dados 1:**

| 5 | 3 | 8 | 3 | 15 | 45 | 9 |

**Conjunto de Dados 2:**

| 5 | 8 | 3 | 2 | 1 | 3 | 10 | 105 |

## Média

Representa a soma de todos os valores no conjunto de dados dividido pela quantidade de pontos de dados neste conjunto.

`Média = Soma de todos os números / Quantidade de números`

#### Exemplo:

<p class="example">
    Para o Conjunto 1:<br />
    <b>Média = (5 + 3 + 8 + 3 + 15 + 45 + 9) / 7</b><br />
    <b>Média = 12,57</b>
</p>

<p class="example">
    Para o Conjunto 2:<br />
    <b>Média = (5 + 8 + 3 + 2 + 1 + 3 + 10 + 105) / 8</b><br />
    <b>Média = 17,125</b>
</p>

A média nem sempre é a melhor medida de centro. Note que, para a conjunto 1, **12,57** não parece muito estar no meio dos dados. Só dois dados registraram um valor maior do que ele, enquanto 5 registraram um valor menor.

Para corrigir isso, temos a próxima medida de centro:  

## Mediana

Representa o valor médio do conjunto de dados. Seu valor é maior que 50% dos dados e menor que os 50% restantes.

Para calcular, temos que ordenar os números de forma crescente ou decrescente.

Se a quantidade de números for **ímpar**, basta ordenar e pegar o valor do meio.

<p class="example">
    Para a conjunto 1:<br />
    <b>3, 3, 5, 8, 9, 15, 45</b> (ordenado)<br />
    <b>Mediana = 8</b>
</p>

Agora se a quantidade de números for **par**, depois de ordenar, temos que pegar os dois números do meio e calcular sua **média** ou dividir por 2.

<p class="example">
    Para a conjunto 2:<br />
    <b>1, 2, 3, 3, 5, 8, 10, 105</b> (ordenado)<br />
    <b>Mediana = (3 + 5) / 2</b><br />
    <b>Mediana = 4</b>
</p>

Note que nos dois exemplos, o valor da Mediana está exatamente no meio do conjunto de dados.

## Moda

A Moda nos fornece o valor mais comum no conjunto de dados.

<p class="example">
    Para ambos os conjuntos:<br />
    <b>Moda = 3</b>
</p>