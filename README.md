# :bar_chart: Métricas de Python vs. Métricas de Java

## :card_index: Sumário

1. [:label: Versões](#label-versões)
2. [:abacus: Dados](#abacus-dados)
3. [:information_source: Introdução](#information_source-introdução)
4. [:fire: Instalação](#fire-instalação)
5. [:busts_in_silhouette: Autores](#busts_in_silhouette-autores)

## :label: Versões

- [Sprint 1 (v0.1.0) - _current_](https://github.com/TheMarini/python-vs-java-metrics/tree/v0.1.0)

**Obs.:** essa lista pode estar desatualizada conforme o lançamento de novas _releases_. A versão atualizada sempre estará no último lançamento feito, o qual se encontra na [branch master](https://github.com/TheMarini/python-vs-java-metrics).

## :abacus:	Dados

As métricas - e as futuras análises sobre elas - serão baseadas conforme os dados diponíveis em [python.csv](https://github.com/TheMarini/python-vs-java-metrics/blob/v1.0.0/data/python.csv) e [java.csv](https://github.com/TheMarini/python-vs-java-metrics/blob/v1.0.0/data/java.csv) presentes neste repositório, obtidos em 30/09/2020 às 18h55 através do código descrito a seguir.

## :information_source: Introdução

Nesta primeira entrega do projeto, o objetivo foi o seguinte:

> **Sprint 01:** arquivo .csv com a lista dos top-100 repositórios Java e os top-100 repositórios Python, bem como os scripts de coleta utilizados para mineração e análise dos repositórios
> - Valor: 5 pontos
> - Entrega em 30/09/2020 até às 18:30 no Canvas e no SGA

Tendo isto em vista, foi desenvolvido um _script_ em Node.js que, a partir de um _token_ da API do GitHub, realiza uma busca paginada da _query_ GraphQL a seguir - alternando somente o atributo `language` entre "Python" e "Java", conforme desejado - enquanto, paralelamente, os resultados são salvos em seus respectivos arquivos CSV.


```GraphQL
{
    search(type: REPOSITORY, query: "stars:>100 language:python", first: 100) {
      repositoryCount
      pageInfo {
        endCursor
      }
      nodes {
        ... on Repository {
          nameWithOwner
          stargazerCount
          createdAt
          forkCount
          watchers {
            totalCount
          }
          releases {
            totalCount
          }
        }
      }
    }
  }  
```

**:warning: AVISO:** devido há limitações da API do GitHub, só é possível ter uma boa taxa de sucesso na requisição da _query_ acima se ela for feita de 5 em 5 resultados. Por isto, este é o número máximo de resultados por página configurado no código, necessitando então de 20 requisições no total para se chegar aos 100 desejados.

## :fire: Instalação

1. Instale as dependências:
    ```
    npm install
    ```
2. (Recomendado) Crie a váriável de ambiente `TOKEN` a partir de um arquivo `.env`, na raiz do projeto, com o seguinte conteúdo:
   ```
   TOKEN=seu_token_do_GitHub_API
   ```
   :information_source: Não se preocupe, caso não queira realizar o item acima, poderá informar seu _token_ diretamente na linha de comando.
3. Execute:
    ```
    npm start
    ```
4. Pronto, agora é só esperar e os resultados estarão no diretório `/data` (a partir da raiz do projeto) com o nome `python.csv` e `java.csv` :heavy_check_mark:

## :busts_in_silhouette: Autores

- [Bruno Marini](https://github.com/TheMarini)
