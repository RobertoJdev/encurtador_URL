// redirecionar.test.js
const redirecionar = require('../redirecionar');

// Mock para o objeto 'req'
const req = {
  query: {
    url_curta: 'cxm95TmWI', // Substitua com o valor desejado
  },
};

// Mock para o objeto 'res'
const res = {
  send: jest.fn(),
};

// Mock da função 'db.get' para simular que a URL original foi encontrada
const db = {
  get: jest.fn((query, params, callback) => {
    const row = {
      url_original: 'https://chat.openai.com/c/b72a0675-e293-4780-8724-91da01753072', // Substitua com a URL original correspondente
    };
    callback(null, row);
  }),
};

describe('Teste para a função redirecionar', () => {
  it('Deve redirecionar para a URL original se a URL curta for encontrada', () => {
    redirecionar(req, res, db);

    // Verifique se a função 'send' foi chamada com a URL original
    expect(res.send).toHaveBeenCalledWith(expect.stringMatching('https://chat.openai.com/c/b72a0675-e293-4780-8724-91da01753072'));
  });
});
