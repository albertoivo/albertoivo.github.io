---
layout: post
title: Nunca use target="_blank" sozinho
category: Dev
tags: [security, web]
---

O `target="_blank"` é muito usado quando queremos abrir um link em outra aba. Apenas nãp o use sozinho por questões de segurança.

**A página que estamos linkando ganha acesso parcial à página de que possui o link via `window.opener`**

A nova página aberta poderia, por exemplo, mudar o `window.opener.location` para uma página de _phishing_. Ou executar um JavaScript na página aberta em seu nome. Em geral, usuários confiam na página que já está aberta.

**Exemplo de ataque:** crie uma página "viral" falsa com fotos de gatos, piadas ou qualquer outra coisa, compartilhe-a no Facebook (que é conhecida por abrir links via `_blank`) e toda vez que alguém clicar no link - execute:

`window.opener.location = 'https://fakewebsite/facebook.com/PHISHING-PAGE.html';`

...Redirecionando para uma página que pede ao usuário que redigite sua senha do Facebook.

## Como consertar

Adicione o seguinte trecho ao seu link:

`rel="noopener noreferrer"`

No final, seu link ficará +/- assim:

`<a href="#" target="_blank" rel="noopener noreferrer">...</a>`

Pronto! Sua página, pelo menos no que se refere à links abertos em outras abas, estará segura! 😄
