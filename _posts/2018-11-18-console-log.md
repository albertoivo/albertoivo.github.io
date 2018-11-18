---
layout: post
title: Por que não deixar o "console.log" em produção
category: Dev
tags: [console]
---

Quem nunca usou o `console.log` para depurar um código e ver o valor daquela variável ou até mesmo para checar se uma função foi chamada devidamente? :see_no_evil:

Sempre remova os `console.log` da sua aplicação. Eles podem causar [problemas de performance](https://facebook.github.io/react-native/docs/performance.html#using-consolelog-statements) no seu app. Você também pode colocar [um plugin do babel](https://babeljs.io/docs/en/babel-plugin-transform-remove-console/) para automaticamente remover os `console.log` em produção.
