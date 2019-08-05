---
layout: post
title: Entendendo Sharpe Ratio (índice de Sharpe)
category: Bolsa de Valores
tags: [sharpe ratio]
---

O _Sharpe Ratio_ foi desenvolvido pelo ganhador do Prêmio Nobel William F. Sharpe e tem sido uma das medidas de risco/retorno mais referenciadas nas finanças.

Simplificando, o índice analisa o retorno médio de um investimento que tem um risco associado com um outro investimento livre de risco.

Ele compara, por exemplo, o retorno médio de uma carteira de ações na bolsa de valores com um investimento em renda fixa como um CDB que tem uma taxa de retorno livre de risco e verifica se estamos sendo devidamente compensados pelo risco adicional assumido. 

De uma forma geral, quanto **maior** o valor do _Sharpe Ratio_, **mais atraente** é esse investimento que tem um risco associado. Mas se for um valor **negativo**, significa que a taxa livre de risco é maior do que o retorno do portfólio ou o retorno do portfólio deve ser negativo.

Ele se tornou um método bastante utilizado para calcular o retorno de aplicações com um certo grau de riscos pois mostrou que a adição de ativos a uma carteira diversificada que tenha baixas correlações pode **diminuir o risco deste portfólio sem sacrificar o retorno**.

Portanto, uma estratégia para aumentar o _Sharpe Ratio_ é diversificar a carteira de investimentos. Mas para isso ser verdade, é preciso aceitar a suposição de que risco é igual a volatilidade, ou seja, quanto mais volátil for um ativo ou uma carteira de ativos, mais arriscado é esse investimento.

### Então, o que é considerado um bom índice de Sharpe que indica um alto grau de retorno esperado para uma quantidade relativamente baixa de risco?

 - Normalmente, qualquer valor maior que `1.0` é considerado aceitável para os investidores.
 - Um valor superior a `2.0` é classificado como muito bom.
 - Um valor de `3.0` ou superior é considerado excelente.
 - Um valor inferior a `1.0` é considerado abaixo do ideal.
 
### Exemplo
 
 Abaixo temos **3 portfólios**. Ao final de 10 anos, todos acabaram tendo o **mesmo retorno médio**, no entanto cada um de uma forma diferente. Um portfólio foi constante, um com uma baixa volatilidade e outro com uma alta volatilidade.
 
|Ano | Portfólio A | Portfólio B | Portfólio C|
|----|:-----------:|:-----------:|:----------:|
|Ano 1 |	10.00% | 9.00% | 2.00%|
|Ano 2 |	10.00% | 15.00%	| -2.00%|
|Ano 3 |	10.00% | 23.00%	| 18.00%|
|Ano 4 |	10.00% | 10.00%	| 12.00%|
|Ano 5 |	10.00% | 11.00% | 15.00%|
|Ano 6 |	10.00% | 8.00% | 2.00%|
|Ano 7 |	10.00% | 7.00% | 7.00%|
|Ano 8 |	10.00% | 6.00% | 21.00%|
|Ano 9 |	10.00% | 6.00% | 8.00%|
|Ano 10 |	10.00% | 5.00% | 17.00%|
|Retorno Médio | 10.00% | 10.00%	| 10.00%|
|[Desvio Padrão](https://albertoivo.github.io/medidas-de-dispersao-desvio-padrao/) | 0.00% | 5.44% | 7.80%|

Qual dos portfólios acima você escolheria?

Caso você tenha escolhido o **Portfólio A**, então você prefere uma carteira de investimentos com uma menor volatilidade que, no mundo do investimentos, quer dizer um menor risco. Neste caso você provavalmente deveria ter uma carteira com o _Sharpe Ratio_ mais **alto** possível.

Já se escolheu o **Portfólio C**, você está disposto a assumir riscos maiores para ter retornos maiores. Só analise bem o _risco x retorno_ desse investimento. No exemplo acima não vale a pena escolher o mais arriscado já que todos tem o mesmo retorno final. Mas em mercados eficientes, em geral, não é possível ganhar muito dinheiro sem assumir riscos. Em outras palavras: quanto maior o risco, maior a expectativa de ganhos.

### Conclusão

O risco e a recompensa devem ser avaliados em conjunto quando se considera as opções de investimento; este é o ponto focal na montagem de um Portfólio.

O **índice de Sharpe** pode ajudá-lo a determinar a opção de investimento que fornecerá os retornos mais altos enquanto considera o risco.
