---
layout: post
title: Análise Quantitativa - Medidas de Dispersão - Amplitude Interquartil
category: Estatística
tags: [Análise Quantitativa, interquartil]
---

Uma das formas mais comuns de medir o _spread_ dos nossos dados é observar o resumo dos 5 números _(5-number summary)_ que nos dá valores para calcular a **Amplitude Interquartil**:

- **Máximo** - O maior valor do conjunto
- **Terceiro Quartil (Q3)** - 75% dos dados estão abaixo dele
- **Segundo Quartil (Q2)** - 50% dos dados estão abaixo dele
- **Primeiro Quartil (Q1)** - 25% dos dados estão abaixo dele
- **Mínimo** - O menor valor do Conjunto

_Obs.: Antes de começarmos aqui, é importante entender bem o que é_ [MEDIANA](https://albertoivo.github.io/medidas-de-centro/).

## Primeiro exemplo: conjunto de dados com número ÍMPAR

Considere o seguinte conjunto de dados:

5 | 8 | 3 | 2 | 1 | 3 | 10

O **primeiro** passo para achar os 5 números é **ordenar** os valores:

1 | 2 | 3 | 3 | 5 | 8 | 10

Uma vez ordenado, já temos o **mínimo** e **máximo**:

| Min | Máx |
|:---:|:---:|
|  1  |  10 |

Em seguida, vamos calcular o **Q2** que é a **mediana** de todo o conjunto de dados e como tem um número ímpar de valores, basta pegar o valor do centro do connjunto:

| Min |  Q2 | Máx |
|:---:|:---:|:---:|
|  1  |  3  |  10 |

Falta agora achar o **Q1** e o **Q3** que são, respectivamente, as medianas dos lados esquerdo e direito do **Q2 (sem incluir o Q2)**.

Logo,

**Q1** é a mediana do subconjunto `| 1 | 2 | 3 |` que é igual a `2`.

**Q3** é a mediana do subconjunto `| 5 | 8 | 10 |` que é igual a `8`.

Então:

| Min |  Q1 |  Q2 |  Q3 | Máx |
|:---:|:---:|:---:|:---:|:---:|
|  1  |  2  |  3  |  8  | 10  |

## Segundo exemplo: conjunto de dados com número PAR

Agora vamos considerar o seguinte conjunto de dados:

| 5 | 8 | 3 | 2 | 105 | 1 | 3 | 10 |

De novo, o **primeiro** passo para achar os 5 números é **ordenar** os valores:

| 1 | 2 | 3 | 3 | 5 | 8 | 10 | 105 |

Então temos o **mínimo** e **máximo**:

| Min | Máx |
|:---:|:---:|
|  1  | 105 |

Para calcular o **Q2** de um conjunto de dados de tamanho ímpar, temos que calcular a **média** dos dois valores do centro. 

```
Q2 = (3 + 5) / 2
Q2 = 4
```

| Min |  Q2 | Máx |
|:---:|:---:|:---:|
|  1  |  4  | 105 |

Como **Q1** é a mediana de todos os valores à esquerda do **Q2**, então temos que:

**Q1** é a mediana do subconjunto `| 1 | 2 | 3 | 3 |`, logo:

```
Q1 = (2 + 3) / 2
Q1 = 2.5
```

E **Q3** é a mediana de todos os valores à direita do **Q2**, então temos que:

**Q3** é a mediana do subconjunto `| 5 | 8 | 10 | 105 |`, logo:

```
Q3 = (8 + 10) / 2
Q3 = 9
```

Então temos que:

| Min |  Q1 |  Q2 |  Q3 | Máx |
|:---:|:---:|:---:|:---:|:---:|
|  1  | 2,5 |  4  |  9  | 105 |

## Conclusão

Bem, a **amplitude interquartil** é muito boa para vermos o quão **disperso** está o nosso conjunto de dados. Quanto maior a distância entre `Mínimo`, `Q1`, `Q2`, `Q3` e `Máximo`, mais diperso estão os dados.

### Mas tem um problema

Calcular 5 números e analisar cada um deles para checar a dispersão dos dados pode dar muito trabalho. Por isso, temos o [Desvio Padrão](https://albertoivo.github.io/medidas-de-dispersao/), que nos dá a dispersão dos dados representado em um **único** número.