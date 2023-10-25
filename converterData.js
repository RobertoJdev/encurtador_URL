/**
 * Retorna uma data formata para busca no DB seguido o formato salvo.
 * @param {string} - Data para busca no banco de dados.
 * @returns {string} - Retorna a data formata no padrão definido para o DB.
 */
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

module.exports = converterData;