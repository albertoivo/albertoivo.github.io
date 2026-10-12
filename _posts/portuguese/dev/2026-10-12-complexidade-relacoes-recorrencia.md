---
layout: post
title: "Como Encontrar a Complexidade de Relações de Recorrência Passo a Passo"
description: "Aprenda de forma prática e didática como calcular a complexidade assintótica em relações de recorrência, usando a árvore de recursão sem decoreba de fórmulas matemáticas complexas."
category: Dev
tags: [algoritmos, estrutura de dados, big o, complexidade, recursão, matemática]
keywords:
  - relações de recorrência
  - árvore de recursão
  - complexidade assintótica
  - big theta
  - teorema mestre
math: true
---

Se você estuda algoritmos e estruturas de dados, em algum momento se deparou com códigos recursivos (como o famoso Merge Sort ou a busca binária). Calcular o tempo de execução desses algoritmos exige resolver algo chamado **relação de recorrência**.

<!--more-->

Talvez você tenha tentado decorar o Teorema Mestre ou se assustado com expansões matemáticas gigantes. A boa notícia é que você não precisa de nada disso. O segredo está em entender o **modelo mental da árvore de recursão**.

Neste artigo, vamos desmistificar o cálculo da complexidade assintótica ($\Theta$), mostrando passo a passo como você pode encontrar a resposta apenas observando como o trabalho é distribuído.

---

### 1. A Introdução: O que é e o Modelo Mental

Uma **relação de recorrência** é simplesmente uma equação matemática que descreve o tempo de execução de um algoritmo recursivo em função do tamanho da entrada ($n$). Ela nos diz: "O tempo para processar $n$ elementos é igual ao tempo para processar as partes menores, mais o trabalho feito para dividir e combinar essas partes".

A forma mais visual de resolver isso é usando a **árvore de recursão**. Esqueça as fórmulas complicadas por um minuto. Imagine o algoritmo como uma árvore crescendo para baixo. O tempo total de execução é apenas a **soma de duas contas fundamentais**:

1. **O custo dos nós internos:** O trabalho realizado em cada nível da árvore para dividir o problema e juntar os resultados.
2. **O custo das folhas:** O trabalho realizado na base da recursão, quando chegamos à condição de parada.

Quem dominar essa soma total da árvore descobre o $\Theta$ do algoritmo. O trabalho vencedor é o que vai ditar a complexidade. Pode ser que o trabalho esteja todo concentrado nas folhas (a base), que esteja concentrado na raiz (o início), ou que esteja equilibrado em todos os níveis. Vamos descobrir isso analisando como a árvore se comporta.

---

### 2. A Grande Bifurcação: Divisão ($n/b$) vs. Subtração ($n - c$)

Antes de fazermos contas, precisamos entender como o tamanho do problema diminui. Isso determina a profundidade (altura) da nossa árvore de recursão. Existem duas maneiras principais:

#### A Mágica da Divisão ($n/b$)
Quando dividimos o problema em frações (ex: $n/2$), a árvore afunila muito rapidamente. Quantas vezes você precisa dividir um número $n$ pela metade até chegar a $1$? A resposta é $\log_2 n$.
- **Profundidade da árvore:** $\log n$.
- É por isso que algoritmos do tipo "dividir para conquistar" são tão rápidos! A árvore é bem curtinha.

#### O Caminho Longo da Subtração ($n - c$)
Quando subtraímos um valor constante (ex: $n-1$), a árvore cresce de forma lenta e comprida. Quantas vezes você precisa tirar $1$ de $n$ até chegar a $0$? Exatamente $n$ vezes.
- **Profundidade da árvore:** $n$.
- A árvore é profunda, o que geralmente (mas nem sempre) leva a tempos de execução muito maiores. O impacto na ramificação é drástico: imagine cada nó gerando dois filhos numa profundidade de $n$ níveis; você terá uma quantidade absurda de folhas.

---

### 3. A Matemática Essencial (Sem Mistério)

Para somar o trabalho em cada nível da árvore, nós geralmente encontramos uma **Progressão Geométrica (PG)**. Não precisa se desesperar, você só precisa entender dois casos de soma de PG, dependendo de como o trabalho cresce (ou encolhe) conforme descemos a árvore.

#### A Soma da PG Finita ($q > 1$): A árvore "pesa" para baixo
Quando a razão $q$ (o fator multiplicador entre os níveis) é maior que $1$, significa que o trabalho está crescendo a cada nível. As folhas farão o maior trabalho. A fórmula clássica da soma de $k$ termos é:

$$S_k = a_1 \frac{q^k - 1}{q - 1}$$

**O que importa aqui?** O foco não é decorar, mas perceber que o expoente $k$ é o **número de níveis** da árvore. E como $q > 1$, o termo dominante é o próprio $q^k$. O trabalho explode lá embaixo.

#### A Soma da PG Decrescente ($|q| < 1$): A raiz domina tudo
Quando a razão $q$ é menor que $1$, o trabalho diminui a cada nível. O maior esforço é feito logo na raiz da árvore. Conforme você desce, os nós trabalham cada vez menos. Podemos aproximar isso para a soma de uma PG infinita:

$$S = \frac{a_1}{1 - q}$$

**O que importa aqui?** Perceba por que invertemos o denominador (de $q-1$ para $1-q$): como $q$ é uma fração, $1-q$ mantém o valor positivo. O grande segredo dessa equação é que o resultado é apenas a raiz ($a_1$) multiplicada por uma constante. Ou seja, **a raiz domina a complexidade**.

---

### 4. Estudos de Caso Resolvidos Passo a Passo

Vamos aplicar a árvore de recursão e nossa matemática essencial em cinco casos muito comuns. Para cada um, vamos expandir alguns níveis e somar o trabalho.

#### Caso 1: Divisão com custo constante
$$T(n) = 2T(n/2) + 1$$
*(Exemplo: Percorrer os nós de uma árvore binária)*

- **Iteração 1 (Nível 0):** Custo $1$ (a raiz). Ela chama $2$ problemas de tamanho $n/2$.
- **Iteração 2 (Nível 1):** Custo $2 \times 1 = 2$. Eles chamam $4$ problemas de tamanho $n/4$.
- **Nível $k$:** Custo $2^k$.
- **Condição de parada:** A árvore para quando $n/2^k = 1$, logo $k = \log_2 n$.
- **Soma dos níveis:** Temos a soma $1 + 2 + 4 + ... + 2^{\log_2 n}$. Isso é uma PG com razão $q=2$. O último termo (nível das folhas) é $2^{\log_2 n} = n$. Pela soma da PG finita, a soma é algo próximo de $2n - 1$.
- **Veredito Final:** As folhas dominam o trabalho. Portanto, a complexidade é **$\Theta(n)$**.

#### Caso 2: Subtração com custo constante
$$T(n) = 2T(n-1) + 1$$
*(Exemplo: Cálculo ingênuo de Fibonacci)*

- **Iteração 1 (Nível 0):** Custo $1$. Chama $2$ problemas de tamanho $n-1$.
- **Iteração 2 (Nível 1):** Custo $2 \times 1 = 2$. Chamam $4$ problemas de tamanho $n-2$.
- **Nível $k$:** Custo $2^k$.
- **Condição de parada:** A árvore para quando subtraímos $n$ vezes, logo $k = n$.
- **Soma dos níveis:** A soma é $1 + 2 + 4 + ... + 2^n$. Isso é uma PG de razão $2$, mas com $n$ níveis! A soma total será $2^{n+1} - 1$.
- **Veredito Final:** O crescimento é exponencial. A complexidade é **$\Theta(2^n)$**.

#### Caso 3: Dominância das folhas na divisão
$$T(n) = 4T(n/2) + n$$

- **Iteração 1 (Nível 0):** Custo $n$. Chama $4$ problemas de tamanho $n/2$.
- **Iteração 2 (Nível 1):** Custo $4 \times (n/2) = 2n$. Chamam $16$ problemas de tamanho $n/4$.
- **Iteração 3 (Nível 2):** Custo $16 \times (n/4) = 4n$.
- **Nível $k$:** Custo $2^k n$. A razão é $q=2$.
- **Condição de parada:** Como dividimos por $2$, a altura é $\log_2 n$.
- **Soma das folhas:** No último nível $k = \log_2 n$, o custo é $2^{\log_2 n} \cdot n = n \cdot n = n^2$.
- **Soma total:** O trabalho cresce a cada nível (PG crescente). O custo total é dominado pelo último nível, as folhas.
- **Veredito Final:** A complexidade é **$\Theta(n^2)$**.

#### Caso 4: O Equilíbrio Perfeito
$$T(n) = 2T(n/2) + n$$
*(Exemplo: O clássico Merge Sort)*

- **Iteração 1 (Nível 0):** Custo $n$. Chama $2$ problemas de $n/2$.
- **Iteração 2 (Nível 1):** Custo $2 \times (n/2) = n$. Chamam $4$ problemas de $n/4$.
- **Iteração 3 (Nível 2):** Custo $4 \times (n/4) = n$.
- **Nível $k$:** Custo $n$. A razão é $q=1$.
- **Condição de parada:** A altura da árvore é $\log_2 n$.
- **Soma dos níveis:** Aqui, todo nível tem exatamente o mesmo custo de trabalho: $n$. Não há PG crescente nem decrescente, é uma constante. Então, basta multiplicar o custo de um nível pelo número de níveis.
- **Veredito Final:** Custo por nível $\times$ número de níveis = **$\Theta(n \log n)$**.

#### Caso 5: Dominância da raiz (PG decrescente)
$$T(n) = 2T(n/2) + n^2$$

- **Iteração 1 (Nível 0):** Custo $n^2$. Chama $2$ problemas de $n/2$.
- **Iteração 2 (Nível 1):** Custo $2 \times (n/2)^2 = 2 \times (n^2/4) = n^2/2$.
- **Iteração 3 (Nível 2):** Custo $4 \times (n/4)^2 = 4 \times (n^2/16) = n^2/4$.
- **Nível $k$:** Custo $n^2 / 2^k$.
- **Soma dos níveis:** Note que o trabalho *cai pela metade* a cada nível. A razão é $q = 1/2$. A soma é $n^2 + n^2/2 + n^2/4 + ...$
- **Conclusão com a PG decrescente:** Usando nossa fórmula $S = a_1 / (1-q)$, temos a soma total limitando a $n^2 / (1 - 1/2) = 2n^2$. A raiz ($n^2$) faz o maior peso sozinha!
- **Veredito Final:** A complexidade é a da própria raiz, **$\Theta(n^2)$**.

---

### 5. A Conexão com o Teorema Mestre

Lembra do "temido" Teorema Mestre? Agora que entendemos como a árvore de recursão funciona, os três casos mágicos do teorema se revelam não como regras decoradas, mas como **os três comportamentos naturais da nossa árvore de recursão**:

1. **A raiz vence (Caso 3 do Teorema Mestre):** Como vimos no nosso Caso 5, se o trabalho para dividir ($f(n)$) for maior que o peso que desce para as folhas, a complexidade final é apenas o trabalho da raiz.
2. **O equilíbrio perfeito (Caso 2 do Teorema Mestre):** Como vimos no nosso Caso 4, se o peso se mantém constante em todos os níveis, basta multiplicar o custo de um nível pela altura da árvore ($\log n$).
3. **As folhas vencem (Caso 1 do Teorema Mestre):** Como vimos no nosso Caso 3, se a quantidade de subproblemas gera folhas demais, o custo nas pontas da árvore domina o total, resultando na complexidade baseada apenas no número de folhas (que costuma ser $n^{\log_b a}$).

Viu? O Teorema Mestre é só o resumo das contas de soma de PG que acabamos de fazer!

---

### 6. Resumão de Complexidade de Recorrências

Para fechar, se você quer um atalho mental após entender os conceitos, aqui vai uma tabela resumo comparando o impacto do tipo de redução e o custo que domina a árvore:

| Recorrência Exemplo | Tipo de Redução | Altura da Árvore | Quem Domina o Custo? | Complexidade Final $\Theta$ |
| :--- | :---: | :---: | :--- | :---: |
| $T(n) = 2T(n/2) + 1$ | Divisão | $\log n$ | As folhas (PG Crescente) | $\Theta(n)$ |
| $T(n) = 2T(n/2) + n$ | Divisão | $\log n$ | Empate (Equilíbrio) | $\Theta(n \log n)$ |
| $T(n) = 4T(n/2) + n$ | Divisão | $\log n$ | As folhas (PG Crescente) | $\Theta(n^2)$ |
| $T(n) = 2T(n/2) + n^2$ | Divisão | $\log n$ | A raiz (PG Decrescente) | $\Theta(n^2)$ |
| $T(n) = 2T(n-1) + 1$ | Subtração | $n$ | As folhas explodem rápido | $\Theta(2^n)$ |

Agora você sabe que toda vez que esbarrar num algoritmo recursivo, basta fechar os olhos, imaginar como a árvore divide o trabalho, e você não vai precisar de mais do que papel, caneta e um pouquinho de observação matemática para encontrar o $\Theta$. Feliz codificação!
