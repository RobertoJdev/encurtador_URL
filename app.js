const http = require('http');

const hostname = '127.0.0.1'; // O servidor irá escutar no endereço IP local.
const port = 3000; // A porta que o servidor irá escutar.

// Cria um servidor HTTP.
const server = http.createServer((req, res) => {
  res.statusCode = 200; // Código de status HTTP 200 (OK).
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n'); // Responde com "Hello, World!".
});

// O servidor começa a escutar na porta e no endereço especificados.
server.listen(port, hostname, () => {
  console.log(`Servidor está rodando em http://${hostname}:${port}/`);
});
