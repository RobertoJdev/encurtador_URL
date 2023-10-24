// redirecionar.js

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('dbEncurtadorURL.db');

function redirecionar(req, res) {
  const url_curta = req.query.url_curta;
  //console.log(`Parâmetro "url_curta" recebido: ${url_curta}`);
  // Restante da lógica para redirecionar com base na URL curta

  db.get('SELECT url_original FROM urls WHERE url_curta = ?', [url_curta], (err, row) => {
    if (err) {
      res.status(500).send('Erro interno do servidor.');
      return;
    }

    if (row) {
      //console.log(`URL original encontrada: ${row.url_original}`);
      //res.redirect(row.url_original);
      res.send(`URL original: <a href="/${row.url_original}">/${row.url_original}</a>`);
    } else {
      //console.log('URL curta não encontrada.');
      res.status(404).send('URL curta não encontrada.');
    }
  });
}

module.exports = redirecionar;
