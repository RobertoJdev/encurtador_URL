const shortid = require('shortid');
const converterFormatoData = require('./dateUtils');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbEncurtadorURL.db'); // Substitua 'meubanco.db' pelo nome do seu arquivo de banco de dados SQLite

/**
 * Pega uma URL longa retornando um formato mais curto.
 * @param {string} URL - Url passada para realiazar o encurtamento.
 * @returns {string} - Retorna uma URL mais curta.
 */
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
