/**
 * Formata para melhor exibição a relaçaõ de Urls salvas no banco.
 * @param {JSON} - Data para busca no banco de dados.
 * @returns {string} - Retorna a lista de Urls para melhor visualização.
 */
function formatarParaLinhas(arr) {
    let linhas = '';

    arr.forEach((obj, index) => {
        const urlCurta = obj.url_curta;
        linhas += `Linha ${index + 1}: ${urlCurta}\n`;
    });

    return linhas;
}

module.exports = formatarParaLinhas;