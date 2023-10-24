const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbEncurtadorURL.db');

/**
 * Responsável por criar o banco de dados na raiz do projeto.
 * @param {}  - Não são necessários parametros para criação.
 * @returns {db} - Retorna um objeto do tipo DB sendo criado na pasta raiz do projeto.
 */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY,
      url_original TEXT,
      url_curta TEXT,
      data_criacao TEXT
    )
  `);
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Banco de dados criado com sucesso.');
});

