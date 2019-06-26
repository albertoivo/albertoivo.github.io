---
layout: post
title: Por que não deixar o 'console.log' em produção?
category: Dev
tags: [console]
keywords:
  - console
  - performance
---

Quem nunca usou o `console.log` para _depurar_ um código e ver o valor daquela variável ou até mesmo para checar se uma função foi chamada devidamente? 🙈

Eu ainda faço isso. Não vejo problema nenhum. O ruim é deixar que isso vá para produção.

Segundo o facebook, eles podem causar [problemas de performance](https://facebook.github.io/react-native/docs/performance.html#using-consolelog-statements) no seu _bundled app_ por causar um grande gargalo na _thread_ do JavaScript. Isso vale inclusive para alguns _middlewares_ como o ótimo [redux-logger](https://github.com/evgenyrodionov/redux-logger). 🙃

##### Felizmente existe uma solução fácil

Para não precisar (nem correr o risco de esquecer) de sempre retirar os `console.*` do código, recomenda-se usar [este plugin do babel](https://babeljs.io/docs/en/babel-plugin-transform-remove-console/) para automaticamente removê-los em produção. Super simples de usar. Bastar instalar:

`npm install babel-plugin-transform-remove-console --save-dev`

Depois criar um arquivo chamado `.babelrc` na raiz do projeto e colar o conteúdo abaixo nele:

```json
{
     "plugins": ["transform-remove-console"]
}
```

Pronto! A próxima vez que gerar uma _build_ com `npm run build`, todos os `console.*` do seu código sumirão!