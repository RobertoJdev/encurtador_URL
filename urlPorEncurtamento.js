const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbEncurtadorURL.db');

/**
 * @module urlPorEncurtamento
 */

/**
 * Retorna uma Url curta previamente cadastrada no DB.
 * @param {string} URL - Url original passada para realiazar o busca no DB.
 * @returns {string} - Retorna uma URL curta referente a Url original.
 */
function urlPorEncurtamento(req, res) {
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
};

module.exports = urlPorEncurtamento;