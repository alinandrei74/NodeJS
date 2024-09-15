import { createServer } from "node:http";

const server = createServer((request, response) => {
  console.log("Solicitud recibida");

  response.statusCode = 200;

  response.setHeader("Content-Type", "text/html");

  response.end(
    "<html><body><h1>¡Bienvenido a mi servidor Node.js!</h1><p>Este es un mensaje personalizado servido desde Node.js.</p></body></html>"
  );
});

server.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});