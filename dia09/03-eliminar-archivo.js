const fs = require('fs');

const archivo = 'mensaje.txt';

if (fs.existsSync(archivo)) {
  fs.unlinkSync(archivo);
  console.log(`Archivo "${archivo}" eliminado correctamente.`);
} else {
  console.log(`El archivo "${archivo}" no existe, no hay nada que borrar.`);
}