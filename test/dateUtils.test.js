// dateUtils.test.js

const converterFormatoData = require('../dateUtils');

describe('Testes para a função converterFormatoData', () => {
  it('Deve converter a data corretamente', () => {
    // Defina uma data de exemplo no formato original
    const dataOriginal = 'Sun, 23 Oct 2023 02:45:32 GMT';

    // Chame a função para converter a data
    const dataFormatada = converterFormatoData(dataOriginal);

    // Verifique se a data foi convertida corretamente
    expect(dataFormatada).toBe('23-10-2023');
  });
});
