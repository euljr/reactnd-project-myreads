# Projeto MyReads

Este é o primeiro projeto do Nanodegree React da Udacity, nesse trabalho optei por utilizar o [reactnd-project-myreads-starter](https://github.com/udacity/reactnd-project-myreads-starter) e não criar do zero por conta do tempo que tenho para me dedicar aos estudos.

## Rodando a aplicação

### Ambiente de Desenvolvimento

A forma mais simples para executar e desenvolver o projeto, é ter o `Node.js` instalado na máquina local, acessar o diretório do projeto apartir de um terminal e executar os comandos abaixo:

```bash
npm install && npm start
```

### Produção

Para rodar em produção, devemos gerar os arquivos estáticos rodando o seguinte comando:

```bash
npm run build
```

Os arquivos estáticos estarão em um novo diretório **dist**, agora é só hospedar esses em algum servidor WEB configurado apropriadamente.

## Estrutura de pastas (src)

Os principais arquivos do projeto estão listados abaixo:

```
src
|--- index.js
│--- App.js
│--- BooksAPI.js    
| 
+--- pages
│   │--- List.js
│   |--- Search.js
|
+--- components
│   │--- Book.js
│   │--- Booksgrid.js
│   |--- Bookshelf.js
|
+--- icons
|--- ...
```

Para os componentes que correspondem à uma rota, eu coloquei no subdiretório `pages`, todo o restante no `comoponents`. O App.js é o ponto de entrada e onde estão configuradas as principais rotas da aplicação, como somente adicionei interatividade e conexão com a API, não movi ele para outro lugar.

## Principais componentes

### App

Neste componente encontramos a configuração de roteamento, estado de armazenamento dos livros, resultados de uma busca e métodos para manipular esse estado.

Os livros da página inicial são carregados nesse comoponente.

### List

List é a página principal, tem como filhos três componentes do tipo `Bookshelf`, Currently Reading, Want to Read e Read.

### Search

Search é onde podemos realizar a busca de livros, os livros buscado aqui também são adicionados ao state da aplicação. O resultado da busca que está armazenado no App é utilizado como filtro para os livros que estão armazenados no estado da aplicação, os livros filtrados são renderizados nessa página no componente `Booksgrid`.

### Bookshelf

Estante de livros, tendo um título e um filho do tipo `Booksgrid`.

### Booksgrid

Recebe uma lista de livros a serem renderizados, para cada livro uma instância do componente `Book`.

### Book

Componente de um livro, também temos o seletor para mostrar onde está e mover o livro entre estantes.
