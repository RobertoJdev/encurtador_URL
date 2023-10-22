const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const shortid = require('shortid');
const app = express();
const port = process.env.PORT || 3000;

const db = new sqlite3.Database('dbEncurtadorURL.db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/encurtar', (req, res) => {
  const { url_original } = req.body;
  const url_curta = shortid.generate();

  //console.log(url_original);

  const data_criacao = new Date().toUTCString();
  console.log(data_criacao);


  //const dataOriginal = "Sun, 22 Oct 2023 02:45:32 GMT";
  const dataFormatada = converterFormatoData(data_criacao);
  console.log(dataFormatada); // Isso imprimirá "22-10-2023"


  const stmt = db.prepare('INSERT INTO urls (url_original, url_curta, data_criacao) VALUES (?, ?, ?)');
  stmt.run(url_original, url_curta, dataFormatada);
  stmt.finalize();

  res.send(`URL encurtada: <a href="/${url_curta}">/${url_curta}</a>`);
});

app.get('/redirecionar', (req, res) => {
  const url_curta = req.query.url_curta;
  console.log(`Parâmetro "url_curta" recebido: ${url_curta}`);
  // Restante da lógica para redirecionar com base na URL curta

  // Restante da lógica para redirecionar com base na URL curta
  db.get('SELECT url_original FROM urls WHERE url_curta = ?', [url_curta], (err, row) => {
    if (err) {
      res.status(500).send('Erro interno do servidor.');
      return;
    }

    if (row) {
      console.log(`URL original encontrada: ${row.url_original}`);
      //res.redirect(row.url_original);
      res.send(`URL original: <a href="/${row.url_original}">/${row.url_original}</a>`);
    } else {
      console.log('URL curta não encontrada.');
      res.status(404).send('URL curta não encontrada.');
    }
  });
});

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

function converterFormatoData(dataOriginal) {
  const meses = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12',
  };

  // Dividir a data em partes
  const partes = dataOriginal.split(' ');

  // Extrair dia, mês e ano
  const dia = partes[1];
  const mes = meses[partes[2]];
  const ano = partes[3];

  // Formatar a data no formato "dd-mm-yyyy"
  const dataFormatada = `${dia}-${mes}-${ano}`;

  return dataFormatada;
}

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