---
layout: post
title: Por que não deixar o "console.log" em produção
category: Dev
tags: [console]
---

Quem nunca usou o `console.log` para depurar um código e ver o valor daquela variável ou até mesmo para checar se uma função foi chamada devidamente?

Eu ainda faço isso. Não vejo problema nenhum nisso. O ruim é deixar que isso vá para produção.

Segundo o facebook, eles podem causar [problemas de performance](https://facebook.github.io/react-native/docs/performance.html#using-consolelog-statements) no seu _bundled app_ por causar um grande gargalo na thread do JavaScript.

Isso vale inclusive para alguns _middlewares_ como o ótimo [redux-logger](https://github.com/evgenyrodionov/redux-logger) - _outra lib que uso bastante nos meu apps e agora terei que remover quando for colocar o app em produção._ :/ 

Paa não precisar (nem correr o risco de esquecer) de sempre retirar os `console.*` do código, recomendo usar [este plugin do babel](https://babeljs.io/docs/en/babel-plugin-transform-remove-console/) para automaticamente removê-los em produção. Super simples de usar. Bastar instalar:

```
npm install babel-plugin-transform-remove-console --save-dev
```

Depois criar um arquivo chamado `.babelrc` na raiz do projeto e colar o conteúdo nele:

```json
{
     "plugins": ["transform-remove-console"]
}
```