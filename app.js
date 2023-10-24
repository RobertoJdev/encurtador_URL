const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const shortid = require('shortid');
const app = express();
const port = process.env.PORT || 3000;


const db = new sqlite3.Database('dbEncurtadorURL.db');
const encurtarURL = require('./urlShortener');
const { converterFormatoData } = require('./dateUtils');
const redirecionar = require('./redirecionar');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/encurtar', encurtarURL);

app.get('/redirecionar', redirecionar);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.get('/urlsPorData', (req, res) => {
  const { data } = req.query;

  const dataOriginal = data;
  const dataFormatada = converterData(dataOriginal);
  //console.log(dataFormatada); // Isso imprimirá "21-10-2023"

  // Realizar a consulta usando a data da URL no formato "YYYY-MM-DD"
  db.all('SELECT url_curta FROM urls WHERE data_criacao = ?', [dataFormatada], (err, rows) => {
    if (err) {
      res.status(500).send('Erro interno do servidor.');
      return;
    }

    res.json(rows);

    const dados = rows;

    console.log(rows);
    // Converter os dados para uma string JSON
    const jsonString = JSON.stringify(dados);
    console.log(jsonString);

    const linhasFormatadas = formatarParaLinhas(dados);
    console.log(linhasFormatadas);
  });
});

app.get('/urlPorEncurtamento', (req, res) => {
  //const { url_original } = req.params;
  const url_original = req.query.url_original;

  db.get('SELECT url_curta FROM urls WHERE url_original = ?', [url_original], (err, row) => {
    if (err) {
      res.status(500).send('Erro interno do servidor.');
      return;
    }

    if (row) {
      //console.log(`URL curta encontrada: ${row.url_original}`);
      //res.redirect(row.url_original);
      res.send(`URL curta: <a href="/${row.url_curta}">/${row.url_curta}</a>`);
    } else {
      console.log('URL curta não encontrada.');
      res.status(404).send('URL curta não encontrada.');
    }

  });
});

function converterData(dataOriginal) {
  const partes = dataOriginal.split('-'); // Divide a data em partes usando o traço
  if (partes.length === 3) {
    const dia = partes[2];
    const mes = partes[1];
    const ano = partes[0];
    return `${dia}-${mes}-${ano}`;
  } else {
    return dataOriginal; // Manter a data como está se não for possível converter
  }
}

function formatarJSONEmLinhas(objeto) {
  return JSON.stringify(objeto, null, 2); // O segundo argumento define o espaçamento de recuo (2 espaços)
}

function formatarParaLinhas(arr) {
  let linhas = '';

  arr.forEach((obj, index) => {
    const urlCurta = obj.url_curta;
    linhas += `Linha ${index + 1}: ${urlCurta}\n`;
  });

  return linhas;
}