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

Uma **relação de recorrência** é uma equação matemática que descreve o tempo de execução de um algoritmo recursivo em função do tamanho da sua entrada ($n$).

Em geral, algoritmos de divisão e conquista seguem um formato muito característico:

$$T(n) = a T(n/b) + f(n)$$

Para não se perder na sopa de letrinhas, entenda o papel de cada termo no código:
- **$T(n)$:** É o tempo total necessário para processar uma entrada de tamanho $n$.
- **$a$ (Número de subproblemas):** Representa quantas chamadas recursivas a função faz. Na árvore, isso define o **fator de ramificação** (quantos galhos saem de cada nó).
- **$n/b$ (ou $n - c$):** É o tamanho da entrada que passamos para as chamadas filhas. Ele dita a velocidade com que o problema encolhe a cada passo.
- **$f(n)$ (Trabalho local):** É o esforço feito no nó atual *fora* das chamadas recursivas — ou seja, o custo de preparar a divisão dos dados antes da chamada e de juntar/combinar os resultados depois que elas retornam.

#### O Modelo Mental da Árvore de Recursão

A forma mais transparente e intuitiva de resolver qualquer recorrência é desenhar a sua **árvore de recursão**. Imagine o algoritmo como uma árvore crescendo de cima para baixo:

- O topo (Nível 0) é a chamada inicial com o problema original de tamanho $n$.
- Cada chamada gera filhos (subproblemas menores) no nível de baixo.
- Na base da árvore estão as **folhas**, que representam as chamadas no caso base (quando o tamanho do problema chega a $1$ e a recursão para).

Para descobrir a complexidade de qualquer recorrência, você só precisa responder às mesmas **4 perguntas** em cada nível:

1. **Quantos nós temos neste nível?** (Quantos subproblemas estão rodando simultaneamente).
2. **Qual é o tamanho da entrada em cada nó?** (Quanto dado cada chamada filha recebeu).
3. **Qual é o custo de trabalho local de cada nó?** (Quanto esforço individual aquele nó faz).
4. **Qual é o custo total somado deste nível?** ($\text{Quantidade de nós} \times \text{Custo de cada nó}$).

No final, o tempo total de execução do algoritmo será simplesmente a **soma de duas contas fundamentais**:

$$\text{Tempo Total} = \sum (\text{Custo de todos os nós internos}) + (\text{Custo de todas as folhas})$$

A complexidade assintótica final ($\Theta$) será decidida por quem vencer essa disputa:
- O trabalho pode estar **concentrado nas folhas** (na base da árvore);
- O trabalho pode estar **concentrado na raiz** (no topo da árvore);
- O trabalho pode estar **perfeitamente equilibrado** em todos os andares da árvore.

---

### 2. A Grande Bifurcação: Divisão ($n/b$) vs. Subtração ($n - c$)

Antes de somarmos os custos, precisamos saber a profundidade (altura) da árvore. Isso depende inteiramente de como o tamanho da entrada é reduzido a cada chamada recursiva:

#### A Mágica da Divisão ($n/b$)
Quando dividimos a entrada por um fator constante (ex: $n/2$, $n/3$), o tamanho do problema encolhe geometricamente. 

Quantas vezes precisamos dividir um número $n$ pela metade até chegar a $1$? Exatamente $\log_2 n$ vezes.
- **Profundidade (altura) da árvore:** $\log_b n$.
- **Impacto no desempenho:** Como o logaritmo cresce de forma incrivelmente lenta (por exemplo, para $n = 1.000.000$, $\log_2 n \approx 20$), a árvore tem pouquíssimos andares! É por isso que algoritmos do tipo divisão e conquista são tão velozes.

#### O Caminho Longo da Subtração ($n - c$)
Quando reduzimos a entrada subtraindo um valor constante (ex: $n - 1$), o problema encolhe de forma linear e vagarosa.

Quantas vezes você precisa subtrair $1$ de $n$ até chegar a zero? Exatamente $n$ vezes.
- **Profundidade (altura) da árvore:** $n$.
- **Impacto no desempenho:** A árvore tem uma quantidade enorme de andares. Se cada nó se ramificar em duas chamadas, teremos uma árvore binária com $n$ níveis de profundidade, resultando em $2^n$ folhas. Para $n = 100$, $2^{100}$ já é um número com mais de 30 dígitos! É a receita clássica para explosões exponenciais.

---

### 3. A Matemática Essencial (Sem Mistério)

Ao calcular o custo total de cada nível da árvore, nós quase sempre encontramos uma **Progressão Geométrica (PG)**. Você não precisa se assustar com fórmulas: o que realmente importa é entender a **razão $q$**, que é a taxa pela qual o trabalho de um nível varia para o nível seguinte:

$$q = \frac{\text{Custo do Nível } (k+1)}{\text{Custo do Nível } k}$$

Existem apenas três cenários possíveis para $q$:

#### 1. A PG Crescente ($q > 1$): A árvore pesa para baixo (As Folhas Vencem)
Se $q > 1$, o trabalho está **aumentando** a cada andar que descemos. O nível mais pesado de todos é o último andar (o nível das folhas). 

A fórmula da soma dos termos de uma PG finita é:

$$S_k = a_1 \frac{q^k - 1}{q - 1}$$

O que importa aqui? Como $q > 1$, o termo dominante que explode e dita o resultado é $q^k$ (o trabalho lá na base). O custo das folhas domina o algoritmo, e o trabalho feito nos níveis superiores se torna desprezível.

#### 2. O Equilíbrio ($q = 1$): Todos os andares trabalham igual
Se $q = 1$, cada nível da árvore realiza **exatamente a mesma quantidade de trabalho**. 

Aqui você nem precisa de fórmula de PG: basta multiplicar o custo de um nível pela quantidade total de níveis da árvore:

$$\text{Custo Total} = (\text{Custo de 1 nível}) \times (\text{Altura da árvore})$$

Como a altura em divisões é $\log n$, o resultado costuma ser algo como $\Theta(n \log n)$.

#### 3. A PG Decrescente ($q < 1$): A raiz domina tudo (O Topo Vence)
Se $q < 1$, o trabalho está **diminuindo** a cada nível. Conforme descemos, os subproblemas ficam tão pequenos que o custo local despenca. O maior esforço do algoritmo inteiro acontece logo no Nível 0 (a raiz).

A soma de uma PG decrescente pode ser limitada pela soma infinita:

$$S = \frac{a_1}{1 - q}$$

Como $q$ é uma fração fixa, o termo $\frac{1}{1-q}$ é apenas uma **constante numérica**. Isso significa que a soma total é simplesmente uma constante multiplicada pelo custo da raiz ($a_1$). Em notação assintótica, **o custo final é simplesmente a ordem de grandeza da raiz**!

---

### 4. Estudos de Caso Resolvidos Passo a Passo

Agora vamos aplicar esse método nível por nível em cinco casos fundamentais. Em cada um, vamos responder às 4 perguntas, mostrar de onde vem cada número e somar o resultado.

---

#### Caso 1: Divisão com custo constante
$$T(n) = 2T(n/2) + 1$$
*(Exemplo prático: Percorrer todos os nós de uma árvore binária)*

**Identificando os parâmetros da equação:**
- Cada chamada gera $a = 2$ chamadas filhas.
- Cada subproblema recebe metade do tamanho ($n/2$).
- O trabalho local fora da recursão é $f(n) = 1$ (tempo constante).

**Construindo a árvore nível por nível:**
- **Nível 0 (Raiz):**
  - Quantidade de nós: $1$ nó.
  - Tamanho da entrada: $n$.
  - Custo local do nó: $1$.
  - **Custo total do Nível 0:** $1 \times 1 = 1$.
  - *Ramificação:* Esta raiz faz $2$ chamadas recursivas, cada uma recebendo tamanho $n/2$.
- **Nível 1:**
  - Quantidade de nós: $2$ nós (os 2 filhos gerados pela raiz).
  - Tamanho em cada nó: $n/2$.
  - Custo local de cada nó: $1$ (pois $f(n/2) = 1$).
  - **Custo total do Nível 1:** $2 \text{ nós} \times 1 = 2$.
  - *Ramificação:* Cada um desses $2$ nós faz $2$ novas chamadas. Portanto, teremos $2 \times 2 = 4$ nós no próximo nível!
- **Nível 2:**
  - Quantidade de nós: $4$ nós ($2^2$).
  - Tamanho em cada nó: $(n/2)/2 = n/4$.
  - Custo local de cada nó: $1$.
  - **Custo total do Nível 2:** $4 \text{ nós} \times 1 = 4$.
  - *Ramificação:* Cada um dos $4$ nós faz $2$ chamadas $\implies 4 \times 2 = 8$ nós ($2^3$) no Nível 3.
- **Nível $k$ (Genérico):**
  - Quantidade de nós: $2^k$.
  - Tamanho em cada nó: $n/2^k$.
  - Custo local de cada nó: $1$.
  - **Custo total do Nível $k$:** $2^k \times 1 = 2^k$.

**Altura da árvore e Condição de parada:**
A recursão atinge o caso base quando o tamanho do subproblema chega a $1$:
$$\frac{n}{2^k} = 1 \iff 2^k = n \iff k = \log_2 n$$
Portanto, a árvore tem altura $h = \log_2 n$ (vai do nível $0$ ao nível $\log_2 n$).

**O nível das folhas ($k = \log_2 n$):**
- Quantas folhas temos no último nível? $2^{\log_2 n} = n$ folhas!
- Cada folha executa o caso base $T(1)$, que custa tempo constante $1$.
- Custo total das folhas: $n \times 1 = n$.

**Soma total de todos os níveis:**
A sequência de custos nível a nível é: $1, 2, 4, 8, \dots, n$.
Trata-se de uma PG com primeiro termo $a_1 = 1$, razão $q = 2$, e último termo $n$.
Pela fórmula da soma da PG:
$$S = \sum_{k=0}^{\log_2 n} 2^k = 1 \cdot \frac{2^{\log_2 n + 1} - 1}{2 - 1} = 2 \cdot 2^{\log_2 n} - 1 = 2n - 1$$

- **Veredito Final:** As folhas dominam o trabalho. A complexidade é **$\Theta(n)$**.
- **Lição didática:** Por que deu linear se a árvore tem altura logarítmica? Porque a cada nível que descemos, o trabalho dobra. O nível das folhas sozinho concentra $n$ operações, o que é mais do que a soma de todos os níveis anteriores juntos ($n - 1$).

---

#### Caso 2: Subtração com custo constante
$$T(n) = 2T(n-1) + 1$$
*(Exemplo prático: Algoritmo ingênuo da Torre de Hanói ou Fibonacci recursivo simples)*

**Identificando os parâmetros da equação:**
- Cada chamada gera $a = 2$ novas chamadas.
- O tamanho do problema diminui por subtração: $n - 1$.
- O trabalho local fora da recursão é constante: $f(n) = 1$.

**Construindo a árvore nível por nível:**
- **Nível 0 (Raiz):**
  - Quantidade de nós: $1$ nó, tamanho $n$.
  - Custo local do nó: $1$.
  - **Custo total do Nível 0:** $1$.
  - *Ramificação:* Gera $2$ chamadas com tamanho $n-1$.
- **Nível 1:**
  - Quantidade de nós: $2$ nós, cada um com tamanho $n-1$.
  - Custo local de cada nó: $1$.
  - **Custo total do Nível 1:** $2 \times 1 = 2$.
  - *Ramificação:* Cada um dos $2$ nós faz $2$ chamadas $\implies 2 \times 2 = 4$ nós de tamanho $n-2$ no Nível 2.
- **Nível 2:**
  - Quantidade de nós: $4$ nós ($2^2$), cada um com tamanho $n-2$.
  - Custo local de cada nó: $1$.
  - **Custo total do Nível 2:** $4 \times 1 = 4$.
- **Nível $k$ (Genérico):**
  - Quantidade de nós: $2^k$.
  - Tamanho em cada nó: $n - k$.
  - **Custo total do Nível $k$:** $2^k \times 1 = 2^k$.

**Altura da árvore e Condição de parada:**
Como subtraímos $1$ por nível, a recursão só para quando $n - k = 0 \iff k = n$.
A profundidade da árvore é de **$n$ andares inteiros**!

**O nível das folhas ($k = n$):**
- Quantidade de folhas no fundo: $2^n$ folhas.
- Custo das folhas: $2^n \times 1 = 2^n$.

**Soma total:**
$$S = \sum_{k=0}^n 2^k = 1 + 2 + 4 + \dots + 2^n = 2^{n+1} - 1 = 2 \cdot 2^n - 1$$

- **Veredito Final:** O crescimento é puramente exponencial. A complexidade é **$\Theta(2^n)$**.
- **Lição didática:** Compare com o Caso 1. No Caso 1 a árvore também duplicava os nós por nível, mas parava muito rápido porque a profundidade era apenas $\log_2 n$. Aqui, como subtraímos $1$ em vez de dividir, a árvore desce $n$ andares completos. Uma árvore binária com $n$ andares tem $2^n$ folhas, tornando o algoritmo inviável para valores grandes de $n$.

---

#### Caso 3: Dominância das folhas na divisão
$$T(n) = 4T(n/2) + n$$

**Identificando os parâmetros da equação:**
- Cada chamada gera $a = 4$ chamadas recursivas (4 ramificações saindo de cada nó).
- Cada subproblema recebe metade do tamanho ($n/2$).
- O trabalho local é linear: $f(n) = n$.

**Construindo a árvore nível por nível:**
- **Nível 0 (Raiz):**
  - Quantidade de nós: $1$ nó.
  - Tamanho da entrada: $n$.
  - Custo local do nó: $f(n) = n$.
  - **Custo total do Nível 0:** $1 \times n = n$.
  - *Ramificação:* A equação diz $4T(n/2)$. Isso significa que essa raiz gera **4 chamadas filhas**, cada uma recebendo uma entrada de tamanho $n/2$.

- **Nível 1:**
  - Quantidade de nós: Temos **4 nós** (os 4 filhos criados pela raiz).
  - Tamanho da entrada em cada nó: $n/2$.
  - Custo local de cada nó: Como o tamanho da entrada agora é $n/2$, cada nó gasta $f(n/2) = n/2$ para fazer seu trabalho local.
  - **Custo total do Nível 1:**
    $$4 \text{ nós} \times \left(\frac{n}{2}\right) = 2n$$
  - *De onde vem o próximo nível (a origem dos 16 problemas):*
    Aqui está a chave da árvore: cada um desses 4 nós precisa rodar o algoritmo novamente. E o que a equação faz? Cada nó gera 4 novas chamadas!
    $$\text{Quantidade de nós no Nível 2} = 4 \text{ nós do Nível 1} \times 4 \text{ filhos por nó} = 16 \text{ nós (ou } 4^2\text{)}$$
    E que tamanho cada um desses 16 nós receberá? Eles pegam o tamanho atual ($n/2$) e dividem por 2 novamente:
    $$\text{Tamanho de cada subproblema} = \frac{n/2}{2} = \frac{n}{4}$$

- **Nível 2:**
  - Quantidade de nós: **16 nós** ($4^2$).
  - Tamanho da entrada em cada nó: $n/4$.
  - Custo local de cada nó: $f(n/4) = n/4$.
  - **Custo total do Nível 2:**
    $$16 \text{ nós} \times \left(\frac{n}{4}\right) = 4n$$
  - *Ramificação para o Nível 3:* Cada um desses 16 nós gera mais 4 chamadas. Teremos $16 \times 4 = 64$ nós ($4^3$), cada um recebendo tamanho $(n/4)/2 = n/8$.

- **Nível 3:**
  - Quantidade de nós: **64 nós** ($4^3$).
  - Tamanho da entrada em cada nó: $n/8$.
  - Custo local de cada nó: $n/8$.
  - **Custo total do Nível 3:**
    $$64 \text{ nós} \times \left(\frac{n}{8}\right) = 8n$$

- **Nível $k$ (Genérico):**
  - Quantidade de nós: $4^k$.
  - Tamanho da entrada em cada nó: $n / 2^k$.
  - Custo local de cada nó: $n / 2^k$.
  - **Custo total do Nível $k$:**
    $$4^k \times \left(\frac{n}{2^k}\right) = \left(\frac{4}{2}\right)^k \times n = 2^k n$$

Observe a progressão dos custos somados de cada nível:
- Nível 0: $n$
- Nível 1: $2n$
- Nível 2: $4n$
- Nível 3: $8n$
- ...
- Nível $k$: $2^k n$

A cada nível que descemos, o custo total do nível **dobra**! Temos uma PG crescente com razão $q = 2$.

**Altura da árvore e Caso Base:**
A divisão por 2 atinge o caso base quando o tamanho chega a $1$:
$$\frac{n}{2^k} = 1 \iff 2^k = n \iff k = \log_2 n$$
A altura da árvore é $h = \log_2 n$.

**O nível das folhas ($k = \log_2 n$):**
- Quantas folhas temos no último nível da árvore?
  $$\text{Número de folhas} = 4^h = 4^{\log_2 n}$$
  Usando a propriedade das potências e logaritmos $4^{\log_2 n} = (2^2)^{\log_2 n} = (2^{\log_2 n})^2 = n^2$:
  $$\text{Temos exatamente } n^2 \text{ folhas!}$$
- Cada folha executa o caso base $T(1)$, que custa tempo constante $\Theta(1)$.
- Custo total do nível das folhas:
  $$\text{Custo das folhas} = n^2 \times \Theta(1) = \Theta(n^2)$$

**Soma total de toda a árvore:**
- Custo somado dos nós internos (níveis de $0$ até $\log_2 n - 1$):
  $$S_{\text{internos}} = \sum_{k=0}^{\log_2 n - 1} 2^k n = n \sum_{k=0}^{\log_2 n - 1} 2^k = n (2^{\log_2 n} - 1) = n (n - 1) = n^2 - n$$
- Somando os nós internos com o nível das folhas:
  $$\text{Custo Total} = S_{\text{internos}} + \text{Folhas} = (n^2 - n) + n^2 = 2n^2 - n = \Theta(n^2)$$

- **Veredito Final:** As folhas dominam o custo total. A complexidade é **$\Theta(n^2)$**.
- **Lição didática:** Por que deu quadrático se o trabalho na raiz era apenas linear ($n$)? Porque a árvore se ramifica muito agressivamente ($4$ novos galhos por nó) enquanto divide o problema lentamente (apenas pela metade). Essa proliferação de ramos gera tantas folhas no final ($n^2$) que o trabalho na base esmaga todo o restante!

---

#### Caso 4: O Equilíbrio Perfeito
$$T(n) = 2T(n/2) + n$$
*(Exemplo prático: O algoritmo Merge Sort)*

**Identificando os parâmetros da equação:**
- Cada chamada gera $a = 2$ chamadas filhas (divide o vetor em duas metades).
- Cada subproblema recebe metade do tamanho ($n/2$).
- O trabalho local é linear: $f(n) = n$ (o custo de intercalar as duas metades).

**Construindo a árvore nível por nível:**
- **Nível 0 (Raiz):**
  - Quantidade de nós: $1$ nó de tamanho $n$.
  - Custo local do nó: $f(n) = n$.
  - **Custo total do Nível 0:** $1 \times n = n$.
  - *Ramificação:* Gera $2$ chamadas com tamanho $n/2$.
- **Nível 1:**
  - Quantidade de nós: $2$ nós de tamanho $n/2$.
  - Custo local de cada nó: $f(n/2) = n/2$.
  - **Custo total do Nível 1:**
    $$2 \text{ nós} \times \left(\frac{n}{2}\right) = n$$
  - *Ramificação:* Cada um dos $2$ nós faz $2$ chamadas $\implies 2 \times 2 = 4$ nós no Nível 2, cada um com tamanho $(n/2)/2 = n/4$.
- **Nível 2:**
  - Quantidade de nós: $4$ nós ($2^2$) de tamanho $n/4$.
  - Custo local de cada nó: $f(n/4) = n/4$.
  - **Custo total do Nível 2:**
    $$4 \text{ nós} \times \left(\frac{n}{4}\right) = n$$
  - *Ramificação:* Cada um dos $4$ nós faz $2$ chamadas $\implies 4 \times 2 = 8$ nós ($2^3$) no Nível 3.
- **Nível $k$ (Genérico):**
  - Quantidade de nós: $2^k$.
  - Tamanho da entrada em cada nó: $n / 2^k$.
  - Custo local de cada nó: $n / 2^k$.
  - **Custo total do Nível $k$:**
    $$2^k \times \left(\frac{n}{2^k}\right) = n$$

**Observe a mágica deste caso:** Em *qualquer* nível $k$, a soma de trabalho é rigorosamente igual a $n$! A razão é $q = 1$. Não há crescimento nem decrescimento.

**Altura da árvore e Folhas:**
- A recursão para quando $n / 2^k = 1 \iff k = \log_2 n$.
- A altura da árvore é $h = \log_2 n$.
- A árvore tem exatamente $(\log_2 n + 1)$ andares (do nível $0$ ao nível $\log_2 n$).
- No nível das folhas ($k = \log_2 n$), temos $2^{\log_2 n} = n$ folhas. Cada uma custa $\Theta(1)$, totalizando $n \times 1 = n$.

**Soma total:**
Como cada andar custa exatamente $n$, basta multiplicar o custo de um nível pelo número de andares:
$$\text{Custo Total} = n \times (\log_2 n + 1) = n \log_2 n + n = \Theta(n \log n)$$

- **Veredito Final:** Equilíbrio perfeito entre todos os níveis. A complexidade é **$\Theta(n \log n)$**.
- **Lição didática:** O aumento do número de nós ($2^k$) cancela perfeitamente a redução no tamanho do problema ($1/2^k$). Como nenhum andar domina o outro, o custo total é a multiplicação do trabalho por nível pela altura da árvore.

---

#### Caso 5: Dominância da raiz
$$T(n) = 2T(n/2) + n^2$$

**Identificando os parâmetros da equação:**
- Cada chamada gera $a = 2$ subproblemas.
- O problema é dividido pela metade ($n/2$).
- O trabalho local é quadrático: $f(n) = n^2$.

**Construindo a árvore nível por nível:**
- **Nível 0 (Raiz):**
  - Quantidade de nós: $1$ nó de tamanho $n$.
  - Custo local do nó: $f(n) = n^2$.
  - **Custo total do Nível 0:** $1 \times n^2 = n^2$.
  - *Ramificação:* Gera $2$ chamadas com tamanho $n/2$.
- **Nível 1:**
  - Quantidade de nós: $2$ nós de tamanho $n/2$.
  - Custo local de cada nó: Como $f(x) = x^2$, ao passar $x = n/2$:
    $$f(n/2) = \left(\frac{n}{2}\right)^2 = \frac{n^2}{4}$$
  - **Custo total do Nível 1:**
    $$2 \text{ nós} \times \left(\frac{n^2}{4}\right) = \frac{n^2}{2}$$
  - *Ramificação:* Cada um dos $2$ nós gera $2$ filhos $\implies 2 \times 2 = 4$ nós no Nível 2 com tamanho $(n/2)/2 = n/4$.
- **Nível 2:**
  - Quantidade de nós: $4$ nós ($2^2$) de tamanho $n/4$.
  - Custo local de cada nó:
    $$f(n/4) = \left(\frac{n}{4}\right)^2 = \frac{n^2}{16}$$
  - **Custo total do Nível 2:**
    $$4 \text{ nós} \times \left(\frac{n^2}{16}\right) = \frac{n^2}{4}$$
  - *Ramificação:* Cada um dos $4$ nós gera $2$ filhos $\implies 4 \times 2 = 8$ nós ($2^3$) no Nível 3.
- **Nível $k$ (Genérico):**
  - Quantidade de nós: $2^k$.
  - Tamanho da entrada em cada nó: $n / 2^k$.
  - Custo local de cada nó: $\left(\frac{n}{2^k}\right)^2 = \frac{n^2}{4^k}$.
  - **Custo total do Nível $k$:**
    $$2^k \times \frac{n^2}{4^k} = 2^k \times \frac{n^2}{2^{2k}} = \frac{n^2}{2^k}$$

Observe a sequência de custos dos níveis:
- Nível 0: $n^2$
- Nível 1: $\frac{n^2}{2}$
- Nível 2: $\frac{n^2}{4}$
- Nível 3: $\frac{n^2}{8}$
- ...
- Nível $k$: $\frac{n^2}{2^k}$

O custo total de cada nível **cai pela metade** a cada andar que descemos! A razão é $q = 1/2 < 1$. Temos uma PG decrescente.

**Altura da árvore e Folhas:**
- A árvore para quando $n / 2^k = 1 \iff k = \log_2 n$.
- No nível das folhas ($k = \log_2 n$), temos $2^{\log_2 n} = n$ folhas.
- Custo das folhas: $n \times \Theta(1) = \Theta(n)$.

**Soma total (PG Decrescente):**
Somando todos os níveis:
$$S = n^2 + \frac{n^2}{2} + \frac{n^2}{4} + \dots = n^2 \left(1 + \frac{1}{2} + \frac{1}{4} + \dots + \frac{1}{2^{\log_2 n}}\right)$$

Como a razão $q = 1/2$ é menor que 1, a soma de toda a árvore é limitada pela soma da PG infinita:
$$S < n^2 \sum_{k=0}^{\infty} \left(\frac{1}{2}\right)^k = n^2 \times \frac{1}{1 - 1/2} = n^2 \times 2 = 2n^2$$

Repare que o custo das folhas ($n$) é insignificante perto de $n^2$. A soma de todos os andares juntos não chega a passar do dobro da raiz!

- **Veredito Final:** A raiz domina completamente a complexidade. O resultado é **$\Theta(n^2)$**.
- **Lição didática:** O trabalho local na raiz é tão pesado ($n^2$) que, mesmo que o número de nós dobre a cada nível, os problemas menores ficam quadraticamente mais leves. A raiz faz praticamente todo o trabalho do algoritmo por conta própria.

---

### 5. A Conexão com o Teorema Mestre

Lembra do "temido" Teorema Mestre? Agora que entendemos como a árvore de recursão funciona, os três casos mágicos do teorema se revelam não como fórmulas abstratas para decorar, mas como **os três comportamentos naturais da nossa árvore de recursão**:

Para uma equação $T(n) = a T(n/b) + f(n)$, o número de folhas é sempre $n^{\log_b a}$. O Teorema Mestre apenas compara o peso das folhas com o peso da raiz $f(n)$:

1. **As folhas vencem (Caso 1 do Teorema Mestre):**
   Quando o trabalho local $f(n)$ cresce mais devagar que a quantidade de folhas $n^{\log_b a}$.
   - O custo nas pontas da árvore domina o total: **$\Theta(n^{\log_b a})$**.
   - *Foi exatamente o que vimos no nosso Caso 3:* $f(n) = n$, mas as folhas foram $n^{\log_2 4} = n^2$. Resultado: $\Theta(n^2)$.

2. **O equilíbrio perfeito (Caso 2 do Teorema Mestre):**
   Quando o trabalho local $f(n)$ cresce no mesmo ritmo que a quantidade de folhas $n^{\log_b a}$.
   - Todos os níveis têm o mesmo custo. Multiplicamos o trabalho de um nível pela altura da árvore ($\log n$): **$\Theta(f(n) \log n)$**.
   - *Foi exatamente o que vimos no nosso Caso 4 (Merge Sort):* $f(n) = n$ e as folhas foram $n^{\log_2 2} = n$. Resultado: $\Theta(n \log n)$.

3. **A raiz vence (Caso 3 do Teorema Mestre):**
   Quando o trabalho local $f(n)$ cresce mais rápido que a quantidade de folhas $n^{\log_b a}$.
   - A raiz é tão pesada que concentra quase todo o custo do algoritmo: **$\Theta(f(n))$**.
   - *Foi exatamente o que vimos no nosso Caso 5:* $f(n) = n^2$, enquanto as folhas foram apenas $n^{\log_2 2} = n$. Resultado: $\Theta(n^2)$.

> **A grande vantagem da Árvore de Recursão:** O Teorema Mestre só funciona quando a divisão é do tipo $n/b$. Se a recorrência for por subtração (como o nosso Caso 2: $T(n) = 2T(n-1) + 1$), o Teorema Mestre não pode ser aplicado. Já com a Árvore de Recursão, o mesmo modelo mental resolve o problema sem esforço!

---

### 6. Resumão de Complexidade de Recorrências

Para fechar com chave de ouro, aqui está o resumo comparativo para você usar como guia rápido de consulta mental:

| Recorrência Exemplo | Tipo de Redução | Altura da Árvore | Razão ($q$) entre Níveis | Quem Domina o Custo? | Complexidade Final $\Theta$ |
| :--- | :---: | :---: | :---: | :--- | :---: |
| $T(n) = 2T(n/2) + 1$ | Divisão | $\log_2 n$ | $q = 2 > 1$ | As folhas (PG Crescente) | $\Theta(n)$ |
| $T(n) = 2T(n-1) + 1$ | Subtração | $n$ | $q = 2 > 1$ | As folhas explodem ($2^n$) | $\Theta(2^n)$ |
| $T(n) = 4T(n/2) + n$ | Divisão | $\log_2 n$ | $q = 2 > 1$ | As folhas (PG Crescente) | $\Theta(n^2)$ |
| $T(n) = 2T(n/2) + n$ | Divisão | $\log_2 n$ | $q = 1$ | Empate (Equilíbrio) | $\Theta(n \log n)$ |
| $T(n) = 2T(n/2) + n^2$ | Divisão | $\log_2 n$ | $q = 1/2 < 1$ | A raiz (PG Decrescente) | $\Theta(n^2)$ |

Agora você sabe: sempre que esbarrar em um algoritmo recursivo, basta fechar os olhos, desenhar mentalmente a árvore, responder às 4 perguntas de cada nível e verificar se o peso está no topo, na base ou espalhado igualmente. Sem fórmulas mágicas, apenas raciocínio lógico claro!
