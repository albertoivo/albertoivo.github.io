---
layout: post
title: Análise Quantitativa - Medidas de Dispersão
category: Estatística
tags: [Análise Quantitativa, desvio padrão, variância]
---

**Medidas de Dispersão** (ou _Measures of Spread_) são usadas para nos dar uma ideia de como os nossos dados se espalham (ou o quão distantes eles estão) uns dos outros. As mais comuns são: `Amplitude`, `Amplitude Interquartil`, `Desvio Padrão` e `Variância`. 

Neste post, vou explicar os dois últimos: `Desvio Padrão` e `Variância`.

Antes, gostaria de deixar claro que dificilmente vamos calcular essas duas medidas na mão. Seria inviável fazer isso com um grande conjunto de dados. Para isso há diversos softwares que fazem esse cálculo. Mas eu acredito que para entendê-los bem, é bom entender seu cálculo e como chegou ao resultado.

O **Desvio Padrão** e a **Variância** nos diz qual é a média da distância de todos os pontos para o valor médio do conjunto.

Temos o conjunto de dados abaixo:

| 10 | 14 | 10 | 06 |

#### Primeiro vamos calcular a média:

```
Média = (10 + 14 + 10 + 06) / 4
Média = 10
```

####  Qual a distância de cada um dos pontos até a média?

```
10 - 10 = 0
14 - 10 = 4
10 - 10 = 0
06 - 10 = -4
```

#### Agora vamos calcular a média da distância entre os pontos:

```
(0 + 4 + 0 + [-4]) / 4
(0 + 4 + 0 - 4) / 4
0 / 4 = 0
```

O valor acima, **0**, indica que não há _spread_ ou dispersão entre os pontos. O que podemos ver que não é verdade. Por isso nunca podemos pegar números negativos.

Mas sempre haverá pontos negativos porque todo conjunto de dados terá valores maiores e menores que a média. Então o que fazer?

Na matemática, resolvemos isso elevando cada um dos números ao quadrado.

```
(0² + 4² + 0² + [-4]²) / 4
(0 + 16 + 0 + 16) / 4
32 / 4 = 8
```

#### Com o cálculo acima, temos a nossa primeira medida de dispersão: `Variância`.

O problema da Variância é a unidade. Ela está sempre elevada ao quadrado.

Por exemplo, se o conjunto de dados do exemplo acima for em relação à distância em quilômetros dos funcionários até o local de trabalho.

Então temos que: `Variância = 8 km²`

Porém essa não é uma unidade usual para nós. O ideal seria uma medida cuja unidade fosse exatamente igual ao nosso conjunto de dados.

#### É aí que entra o `Desvio Padrão`, onde:

`Desvio Padrão (DP) = raiz quadrada da variância`

Então:

```
DP = √8
DP = 2,83
```

Com isso temos que **2,83** é a distância média de que cada ponto do nosso conjunto de dados está do ponto médio.

Lógico que terão pontos no conjunto bem mais distantes que o valor do Desvio Padrão encontrado. Chamamos esses pontos de [Outliers](), que são pontos de dados que se encaixam muito longe do restante dos valores.

### Por que usar o Desvio Padrão

O Desvio Padrão é usado para obter um único número para comparar a dispersão de vários grupos de dados. Com isso podemos dizer qual grupo se dispersou (ou se propagou) mais.

### Desvio Padrão na área Financeira

Quando essa informação diz respeito ao dinheiro ou à economia, um desvio padrão mais alto, costuma estar associado à riscos maiores.

Comparando duas ações na bolsa de valores. Se o retorno diário da ação **A** durante um determinado período teve um desvio padrão maior do que a ação **B**, significa qua **A** oscilou bem mais que **B**.