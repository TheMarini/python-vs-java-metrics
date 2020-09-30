const moment = require('moment');
const ObjectsToCsv = require('objects-to-csv');
const fetch = require('./utils/fetch');
const l = require('./utils/logger');

class Mine {
  constructor(objective, language) {
    this.objective = objective;
    this.language = language;
    this.file = `./${this.language ? this.language : 'results'}.csv`;
    this.current = 1;
    this.cursor = null;
  }

  async start(token) {
    l.title(
      `\n--- Iniciando busca ${this.language ? `(${this.language}) ` : ''}---`
    );
    const digs = [];
    let tag = `[${this.current}/${this.objective}]`;
    while (this.current <= this.objective) {
      console.log(`${tag} Buscando...`);
      // eslint-disable-next-line no-await-in-loop
      await this.dig(token, tag);
      tag = `[${this.current}/${this.objective}]`;
    }
    await Promise.all(digs);
    l.title('--- Fim da busca ---\n');
    l.info(`Veja o resultado em ${this.file} :D`);
  }

  async dig(token, tag) {
    try {
      await fetch(token, this.cursor, this.language).then((res) => {
        this.cursor = res.pageInfo.endCursor || null;
        this.current += 1;
        return Mine.store(this.file, Mine.polish(res.nodes, tag), tag);
      });
    } catch (e) {
      l.error(`${tag} Erro na requisição:`, e.message);
      l.info(`${tag} Tentando novamente...`);
    }
  }

  static async store(file, data, tag) {
    console.log(`${tag} Salvando...`);
    return new ObjectsToCsv(data)
      .toDisk(file, {
        append: true,
        bom: true,
      })
      .then(() => {
        l.success(`${tag} Salvo em ${file}`);
      });
  }

  static polish(dirt, tag) {
    console.log(`${tag} Formatando...`);
    return dirt.map((repo) => {
      return {
        '<usuário>/<repositório>': repo.nameWithOwner,
        'Nº de estrelas': repo.stargazerCount,
        'Idade (anos)': moment().diff(repo.createdAt, 'years', true).toFixed(2),
        'Data de criação': repo.createdAt,
        Forks: repo.forkCount,
        Watchers: repo.watchers.totalCount,
        Releases: repo.releases.totalCount,
      };
    });
  }
}

module.exports = Mine;
