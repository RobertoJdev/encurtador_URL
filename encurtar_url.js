const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const shortid = require('shortid');
const app = express();
const port = 3000;

const db = new sqlite3.Database('urls.db');

app.use(express.json());

app.post('/encurtar', (req, res) => {
    const { url_original } = req.body;
    const url_curta = shortid.generate();

    const data_criacao = new Date().toUTCString();

    const stmt = db.prepare('INSERT INTO urls (url_original, url_curta, data_criacao) VALUES (?, ?, ?)');
    stmt.run(url_original, url_curta, data_criacao);
    stmt.finalize();

    res.json({ url_curta });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

app.get('/:url_curta', (req, res) => {
    const { url_curta } = req.params;

    db.get('SELECT url_original FROM urls WHERE url_curta = ?', [url_curta], (err, row) => {
        if (err) {
            res.status(500).send('Erro interno do servidor.');
            return;
        }

        if (row) {
            res.redirect(row.url_original);
        } else {
            res.status(404).send('URL curta não encontrada.');
        }
    });
});

app.get('/urlsPorData/:data', (req, res) => {
    const { data } = req.params;

    db.all('SELECT * FROM urls WHERE data_criacao = ?', [data], (err, rows) => {
        if (err) {
            res.status(500).send('Erro interno do servidor.');
            return;
        }

        res.json(rows);
    });
});

app.get('/urlPorEncurtamento/:url_curta', (req, res) => {
    const { url_curta } = req.params;

    db.get('SELECT url_original FROM urls WHERE url_curta = ?', [url_curta], (err, row) => {
        if (err) {
            res.status(500).send('Erro interno do servidor.');
            return;
        }

        if (row) {
            res.json({ url_original: row.url_original });
        } else {
            res.status(404).send('URL curta não encontrada.');
        }
    });
});
