# :bar_chart: Métricas de Python vs. Métricas de Java

## :card_index: Sumário

1. [:label: Versões](#label-versões)
2. [:spiral_notepad: Relatório Final](#spiral_notepad-relatório-final)
3. [:abacus: Dados](#abacus-dados)
4. [:information_source: Introdução](#information_source-introdução)
5. [:fire: Instalação](#fire-instalação)
6. [:busts_in_silhouette: Autores](#busts_in_silhouette-autores)

## :label: Versões

- [Sprint 3 (v1.0.0) - _current_](https://github.com/TheMarini/python-vs-java-metrics/tree/v1.0.0)
- [Sprint 2 (v0.2.0)](https://github.com/TheMarini/python-vs-java-metrics/tree/v0.2.0)
- [Sprint 1 (v0.1.0)](https://github.com/TheMarini/python-vs-java-metrics/tree/v0.1.0)

**Obs.:** essa lista pode estar desatualizada conforme o lançamento de novas _releases_. A versão atualizada sempre estará no último lançamento feito, o qual se encontra na [branch master](https://github.com/TheMarini/python-vs-java-metrics).

## :spiral_notepad: Relatório Final

[Link para o PDF com as análises e métricas](https://github.com/TheMarini/python-vs-java-metrics/blob/v1.0.0/docs/Relatório%20Final.pdf).

## :abacus: Dados

As métricas - e as análises sobre elas - foram baseadas conforme os dados diponíveis em [python.csv](https://github.com/TheMarini/python-vs-java-metrics/blob/v1.0.0/data/python.csv) e [java.csv](https://github.com/TheMarini/python-vs-java-metrics/blob/v1.0.0/data/java.csv) presentes neste repositório, obtidos em 07/10/2020 às 23h30 através do código descrito a seguir.

## :information_source: Introdução

Foi desenvolvido um _script_ em Node.js que, a partir de um _token_ da API do GitHub, realiza uma busca paginada da _query_ GraphQL a seguir - alternando somente o atributo `language` entre "Python" e "Java", conforme desejado - e calcula o **LOC**, **SLOC** e **CLOC** de cada repositório enquanto, paralelamente, os resultados são salvos em seus respectivos arquivos CSV.


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

Enquanto as métricas relacionadas ao repositório são obtidas através da​ _query_ acima, os valores de **LOC**, **SLOC** e **CLOC** são obtidos através da ferramenta de análise estática de código ​[sloc](https://github.com/flosse/sloc)​, pelo comando `sloc <diretório> --keys total,source,comment`. Desta forma, a cada resultado da busca paginada, é clonado automaticamente um repositório, calculado com a ferramenta, armazenado os valores no respectivo CSV, deletado do disco de armazenamento e feito o mesmo processo para o repositório seguinte.

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

