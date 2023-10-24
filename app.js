const express = require('express');
const shortid = require('shortid');
const app = express();
const port = process.env.PORT || 3000;

const encurtarURL = require('./urlShortener');
const redirecionar = require('./redirecionar');
const urlsPorData = require('./urlsPorData');
const urlPorEncurtamento = require('./urlPorEncurtamento');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

app.post('/encurtar', encurtarURL);

app.get('/redirecionar', redirecionar);

app.get('/urlsPorData', urlsPorData);

app.get('/urlPorEncurtamento', urlPorEncurtamento);
