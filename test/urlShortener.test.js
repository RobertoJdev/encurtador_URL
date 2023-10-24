const encurtarURL = require('../urlShortener'); // Importe a função a partir do arquivo

describe('Testes para a função encurtarURL', () => {
  it('Deve encurtar uma URL com sucesso', () => {
    // Crie objetos de requisição e resposta fictícios para testar a função
    const req = {
      body: { url_original: 'http://www.example.com' }, // Substitua com a URL desejada
    };

    const res = {
      send: jest.fn(),
    };

    // Chame a função e passe os objetos fictícios de req e res
    encurtarURL(req, res);

    // Adicione asserções para verificar o comportamento da função
    expect(res.send).toHaveBeenCalledWith(expect.stringMatching(/URL encurtada/));
  });
});
