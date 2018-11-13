Como publicar seu app JS no **Firebase** usando a ferramenta de Integração Contínua **Travis CI**

- Obs. 1: Estou considerando que o app está no GitHub e no Firebase. Aqui é apenas para colocar na Integração Contínua.
- Obs. 2: Caso o app não esteja no Firebase ainda, primeiro siga os passos deste [artigo](https://albertoivo.github.io/publish-firebase/).

_Vamos lá!_

1. No browser, acesse [travis-ci.org](https://travis-ci.org/) e logue-se nele através de sua conta do GitHub.

2. Na página de [repositórios](https://travis-ci.org/account/repositories) procure pelo repo que deseja ter a integração contínua e ative-o. Depois clique no nome dele para ir para a página de _builds_. A URL é **https://travis-ci.org/<user_name>/<repo_name>**

3. Na raiz do projeto, crie o arquivo `travis.yml` e cole o conteúdo abaixo (explicação sobre esse arquivo no final do post):

```yml
language: node_js
node_js:
  - "lts/*"
cache:
  directories:
  - node_modules
script:
  - npm run build
deploy:
  provider: firebase
  token:
    secure: "<um token gerado>"
  message: "deploy via Travis CI"
  skip_cleanup: true
  local_dir: build
  on:
    branch: master
```

4. Agora vamos gerar um token, Na linah comando rode:

    `firebase login:ci`

    ```
    Waiting for authentication...

    ✔  Success! Use this token to login on a CI server:

    1/aw8HV5QoNRAVejOchCujq4-VbFd4GnOVru207mLQEkNXMnzjVd05U3aYxuKZFlN
    ```

5. Pegue o token que acabou de gerar e susbtitua o `travis.yml` pelo trecho em:
    ```yml
    deploy:
        token:
            secure: "1/aw8HV5QoNRAVejOchCujq4-VbFd4GnOVru207mLQEkNXMnzjVd05U3aYxuKZFlN"
    ```

6. Pronto. Adicione e dê o `git push` do `travis.yml`.

7. Pronto! O próximo `git push` que der nos arquivos HTML/CSS/JS, o Travis CI vai gerar uma nova _build_ e fazer  o deploy no _Firebase_ automaticamente.

8. Acompanhe a build em tempo real em  **https://travis-ci.org/<user_name>/<repo_name>**

### Explicação sobre o arquivo `travis.yml`

```yml
language: node_js
node_js:
  - "lts/*"
```

Fala pro Travis usar o NodeJS na versão LTS (Long Time Support). Você pode especificar outra como "7" ou "stable", por exemplo. Eu prefiro a LTS.

```yml
cache:
  directories:
  - node_modules
```

Fala pro Travis fazer _cache_ deste diretório entre as _builds_ ao invés de re-compilar o diretório inteiro sempre.

```yml
script:
  - npm run build
```

Fala pro Travis qual comando rodar. Você pode adicionar qualquer comando aqui, por exemplo, `- npm test`. _O Travis já sabe que deve rodar o `npm install`, não precisa dizer aqui_.

```yml
deploy:
  provider: firebase
  token:
    secure: "<um token gerado>"
  message: "deploy via Travis CI"
  skip_cleanup: true
  local_dir: build
  on:
    branch: master
```

`provider: firebase` - especifica que estamos usando o _Firebase_. Poderia ser `pages` para GitHub-Pages.

`secure: "<um token gerado>"` - usa o token gerado no **Passo 4** e substituiu aqui.

`skip_cleanup: true` - não apagar o arquivos de _build_.

`local_dir: build` - pegar arquivos apenas no diretório _build_.

`on: branch: master` - o Travis vai fazer o deploy apenas quando houver `push` na _branch_ informada aqui. Neste caso, _master_. Você pode colocar qualquer _branch_ aqui.