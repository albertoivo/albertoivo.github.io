---
layout: post
title: Medidas de Centro - Média, Mediana e Moda
category: Estatística
tags: [estatistica, média, mediana, moda]
---

Ao analisar dados quantitativos, discretos e contínuos, geralmente fala-se em 4 aspectos principais:
1. Centro (_Center_)
2. Dispersão (_Spread_)
3. Forma (_Shape_)
4. Exceções (_Outliers_)

Aqui falaremos sobre as **Medidas de Centro**.

## São três as Medidas de Centro:

Tabela 1:

| Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 | Col 7 |
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
| 5 | 3 | 8 | 3 | 15 | 45 | 9 |

Tabela 2:

| Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 | Col 7 | Col 8 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 5 | 8 | 3 | 2 | 1 | 3 | 10 | 105 |

### Média

Representa a soma de todos os valores no conjunto de dados dividido pela quantidade de pontos de dados neste conjunto.

`Média = Soma de todos os números / Quantidade de números`

#### Exemplo:

<p class="example">
    Para a tabela 1:<br />
    <b>Média = (5 + 3 + 8 + 3 + 15 + 45 + 9) / 7</b><br />
    <b>Média = 12,57</b><br />
    <br />
    E para a tabela 2:<br />
    <b>Média = (5 + 8 + 3 + 2 + 1 + 3 + 10 + 105) / 8</b><br />
    <b>Média = 17,125</b><br />
</p>

A média nem sempre é a melhor medida de centro. Note que **12,57** não parece muito estar no meio dos dados. Só há dois dias que registraram um valor maior do que a média, enquanto há 5 dias que registraram um valor menor.

Para corrigir isso, temos a próxima medida de centro:  

### Mediana

Representa o valor médio do conjunto de dados. Seu valor é maior que 50% dos dados e menor que os 50% restantes.

Para calcular, temos que ordenar os números de forma crescente ou decrescente.

Se a quantidade de números for **ímpar**, basta ordenar e pegar o valor do meio.

<p class="example">
    Para a tabela 1:<br />
    <b>Mediana => 5, 3, 8, 3, 15, 45, 9</b><br />
    <b>Mediana => 3, 3, 5, 8, 9, 15, 45</b><br />
    <b>Mediana = 8</b><br />
</p>

Agora se a quantidade de números for **par**, depois de ordenar, temos que pegar os dois números do meio e calcular sua **média**, ou dividir por 2.

<p class="example">
    Para a tabela 2:<br />
    <b>Mediana => 5, 8, 3, 2, 1, 3, 10, 105</b><br />
    <b>Mediana => 1, 2, 3, 3, 5, 8, 10, 105</b><br />
    <b>Mediana = (3 + 5) / 2</b><br />
    <b>Mediana = 4</b><br />
</p>

Note que nos dois exemplos, o valor da Mediana está exatamente no meio do conjunto de dados.

### Moda

A Moda visa nos fornecer o valor mais comum no conjunto de dados.

<p class="example">
    Para ambas as tabelas:<br />
    <b>Moda = 3</b><br />
</p>