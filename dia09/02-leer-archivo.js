const fs = require('fs');

const contenido = fs.readFileSync('mensaje.txt', 'utf8');

console.log('Contenido del archivo:');
console.log(contenido);