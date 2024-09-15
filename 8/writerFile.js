const fs = require('fs');

const content = 'Este es el contenido que será escrito en el archivo.\n';

fs.writeFile('documento.txt', content, 'utf8', (err) => {
  if (err) {
    console.error('Ocurrió un error al escribir el archivo:', err);
    return;
  }
  console.log('El archivo ha sido escrito exitosamente.');
});

console.log('Esta línea se ejecuta antes de que se complete la escritura del archivo.');