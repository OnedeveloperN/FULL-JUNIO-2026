const fs = require('fs');

fs.writeFileSync('mensaje.txt', 'Hola, este es mi primer archivo creado con Node.js\n');

console.log('Archivo "mensaje.txt" creado correctamente.');