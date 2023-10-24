// dateUtils.js

function converterFormatoData(dataOriginal) {
  //console.log(dataOriginal);
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
  //console.log(dataFormatada);

  return dataFormatada;
}

module.exports = converterFormatoData;
