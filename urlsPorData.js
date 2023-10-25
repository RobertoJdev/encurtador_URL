const converterData = require('./converterData');
const formatarParaLinhas = require('./formatarParaLinhas');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('dbEncurtadorURL.db');
/**
 * Retorna uma lista de Urls cadastradas em uma determinada data.
 * @param {date} - Data para busca no banco de dados.
 * @returns {json} - Retorna uma coleção de objetos Json com os dados de Urls cadastradas na data especificada.
 */
function urlsPorData(req, res) {
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

        //console.log(rows);
        // Converter os dados para uma string JSON
        const jsonString = JSON.stringify(dados);
        //console.log(jsonString);

        const linhasFormatadas = formatarParaLinhas(dados);
        //console.log(linhasFormatadas);
    });
}

module.exports = urlsPorData;