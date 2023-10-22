const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbEncurtadorURL.db');

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