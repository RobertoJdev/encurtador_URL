
/** Essa função possibilita reduzir o tamanho de um URL passando como retorno da função original uma 
 * de formato reduzido além de armazenar em banco de dados 
 * os dados gerados na geração*/

/**
 * Represents a book.
 * @generator
 * Essa função possibilita reduzir o tamanho de um URL passando como retorno da função original uma 
 * de formato reduzido além de armazenar em banco de dados 
 * os dados gerados na geração
 */

const shortid = require('shortid');
const converterFormatoData = require('./dateUtils');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbEncurtadorURL.db'); // Substitua 'meubanco.db' pelo nome do seu arquivo de banco de dados SQLite


function encurtarURL(req, res) {
  const { url_original } = req.body;
  const url_curta = shortid.generate();
  const data_criacao = new Date().toUTCString();
  const dataFormatada = converterFormatoData(data_criacao);

  const stmt = db.prepare('INSERT INTO urls (url_original, url_curta, data_criacao) VALUES (?, ?, ?)');
  stmt.run(url_original, url_curta, dataFormatada);
  stmt.finalize();

  res.send(`URL encurtada: <a href="/${url_curta}">/${url_curta}</a>`);
}

module.exports = encurtarURL;
