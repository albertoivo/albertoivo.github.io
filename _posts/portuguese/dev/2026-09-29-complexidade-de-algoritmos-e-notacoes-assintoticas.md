---
layout: post
title: Entendendo a Complexidade de Algoritmos e Notações Assintóticas de Forma Fácil
category: Dev
tags: [algoritmos, estrutura de dados, teoria, computacao]
---

Imagine que você está na maior biblioteca do mundo. Há milhões de livros ao seu redor. Agora, alguém te pede para encontrar um livro específico.

Se os livros estiverem apenas jogados em uma montanha gigante no meio do salão, você teria que olhar um por um até encontrar. Pode ser o primeiro que você pegar? Pode. Mas, no pior dos casos, pode ser o mesmíssimo último livro da pilha de milhões. Frustrante, não é?

Mas e se a biblioteca for extremamente organizada? Com seções por gênero, ordem alfabética de autores e prateleiras numeradas. Encontrar o livro leva apenas alguns minutos, independentemente se a biblioteca tem mil ou dez milhões de exemplares.

No mundo do desenvolvimento de software, a forma como organizamos a informação (a biblioteca) é o que chamamos de **Estruturas de Dados**. E o passo a passo que usamos para encontrar a informação (procurar na pilha vs usar o catálogo) é o nosso **Algoritmo**.

A grande questão que separa o código que "apenas funciona" do código que "escala para milhões de usuários" é justamente entender o quão bem o seu algoritmo se comporta quando a quantidade de dados cresce. E é aqui que entra o estudo da **Complexidade de Algoritmos**.

## Medindo o Esforço: A Complexidade

Quando falamos de complexidade, geralmente estamos medindo duas coisas:
1. **Tempo:** Quantos "passos" ou operações o computador precisa fazer.
2. **Espaço:** Quanta memória ele vai consumir durante o processo.

Hoje, vamos focar no tempo. Mas como medimos o tempo de um algoritmo? Em segundos?

Não podemos medir simplesmente em segundos. Um algoritmo rodando no seu notebook novo de última geração vai ser muito mais rápido do que rodando em um celular antigo, mesmo que o código seja o mesmo.

Por isso, na ciência da computação, nós medimos o tempo baseados na quantidade de entradas (o tamanho do problema). Chamamos essa quantidade de **n**. A pergunta que fazemos é: **"Como o tempo de execução do meu algoritmo cresce à medida que 'n' fica gigantesco?"**

Para responder a isso de forma elegante, usamos as famosas **Notações Assintóticas**.

## Notações Assintóticas: A Bola de Cristal da Programação

O nome parece assustador, mas "assintótico" apenas significa observar o limite das coisas. Basicamente, estamos olhando para o comportamento do nosso código quando a quantidade de dados tende ao infinito.

Existem três notações principais que usamos para classificar algoritmos. Vamos conhecer cada uma delas usando exemplos práticos do nosso dia a dia.

### 1. Big O (O grande): O Pior Cenário

O **Big O** ou **O()** é a notação mais famosa e a que você mais vai ouvir falar no dia a dia e em entrevistas de emprego. Ela descreve o **limite superior** do tempo de execução. Ou seja, ela nos diz qual é o **pior cenário possível**.

**A analogia da viagem de carro:**
Imagine que você vai de carro para o trabalho, que fica a 10km de distância. Se perguntarem quanto tempo você leva, e você quiser dar uma estimativa usando o "Big O", você vai pensar no dia em que choveu muito, teve acidente no caminho e o pneu furou. Você responde: *"No máximo, eu levo 2 horas."* Pode ser que você leve 15 minutos na maioria dos dias, mas o limite máximo (o teto) é 2 horas.

**Na programação:**
Se você tem uma lista de 100 nomes desordenados e quer encontrar o nome "Zeca" olhando um por um (busca linear), o Big O considera o pior cenário: "Zeca" é o último nome da lista ou nem está lá.
Você teve que fazer 100 verificações para descobrir. Se a lista tivesse 1 bilhão de nomes, seriam 1 bilhão de verificações. Como o número de passos cresce proporcionalmente ao número de itens ($n$), dizemos que a complexidade é **O(n)**. O Big O é a nossa garantia: "Independentemente do que aconteça, o tempo não vai passar disso".

### 2. Ômega Grande (Ω): O Melhor Cenário

O **Big Omega (Ω)** é exatamente o oposto do Big O. Ele descreve o **limite inferior** do tempo de execução. Ou seja, ele nos diz qual é o **melhor cenário possível**.

**A analogia da viagem de carro:**
Usando o mesmo trajeto para o trabalho, o melhor cenário é quando você sai de madrugada, não há nenhum trânsito, todos os semáforos estão verdes e você vai na velocidade máxima permitida o caminho inteiro. Você diria: *"No mínimo, eu levo 8 minutos."* É fisicamente impossível fazer o trajeto em menos de 8 minutos, esse é o piso.

**Na programação:**
Voltando à nossa busca pelo nome "Zeca" na lista de 100 pessoas olhando um por um. O melhor cenário absoluto é se "Zeca" for simplesmente o primeiro nome da lista! Você encontrou na primeira tentativa, e não precisa olhar o resto.
Não importa se a lista tem 100 ou 1 bilhão de pessoas, no melhor cenário, você fez 1 única verificação. Nesse caso, dizemos que a complexidade inferior é **Ω(1)** (lê-se Ômega de um, ou tempo constante).

Na prática, o Big Omega é menos usado no dia a dia, porque ser otimista não ajuda muito quando estamos planejando a infraestrutura de um servidor. Queremos estar preparados para o tranco, não para a calmaria.

### 3. Theta Grande (Θ): A Precisão Exata

A notação **Big Theta (Θ)** é o meio do caminho, ela impõe limites tanto superiores quanto inferiores simultaneamente. Ela diz que o algoritmo vai se comportar **sempre** dentro de um padrão específico. Para usar o Theta, o melhor e o pior caso precisam crescer na mesma proporção.

**A analogia da viagem de trem:**
Desta vez, você vai para o trabalho de trem subterrâneo. Não tem trânsito, não tem sinal vermelho e não tem acidente na via. O trem sempre anda na mesma velocidade e para o mesmo tempo nas estações.
Não importa se está chovendo ou fazendo sol, você sabe que vai levar **exatamente** 15 minutos. O pior caso é 15 minutos e o melhor caso é 15 minutos. O tempo é cravado. Isso é o Theta.

**Na programação:**
Imagine que em vez de buscar o "Zeca", você quer apenas imprimir todos os nomes de uma lista.
Não existe atalho, e não existe pior caso. Se a lista tem 100 nomes, você vai fazer 100 operações de impressão. Se tiver 1 bilhão, serão 1 bilhão de impressões. O melhor caso imprime todos, o pior também imprime todos. Como o comportamento é sempre estritamente proporcional a $n$, dizemos que o tempo é **Θ(n)**.

## Resumo da Ópera

Para fixar, pense nas notações assintóticas como formas de fazer promessas sobre o tempo que seu algoritmo vai levar quando o volume de dados (n) for absurdo:

*   **Big O (O):** Promete o **teto**. *"No pior dos dias, vai levar até tanto tempo."* (É o que mais nos importa para evitar que o sistema caia).
*   **Big Omega (Ω):** Promete o **piso**. *"Se tudo der perfeitamente certo, vai ser tão rápido quanto isso."*
*   **Big Theta (Θ):** Promete a **certeza**. *"Faça chuva ou faça sol, o comportamento vai seguir exatamente esta curva."*

Escolher a estrutura de dados correta (como usar uma tabela Hash, ou uma Árvore Binária em vez de uma simples Lista) muda completamente a forma como podemos criar os algoritmos, e consequentemente, impacta essas notações.

Da próxima vez que for escrever uma função, pare e pergunte-se: "Se eu tiver 10 milhões de usuários usando isso ao mesmo tempo, qual será o pior cenário?". Entender essa lógica transforma você de um apenas "escrevedor de código" para um verdadeiro engenheiro de software.

Até a próxima!
