const fs = require('fs');

const linea = 'Esta es una línea de texto de prueba para generar contenido.\n';

function generarArchivo(nombre, vecesRepetir) {
  const stream = fs.createWriteStream(nombre);
  for (let i = 0; i < vecesRepetir; i++) {
    stream.write(linea);
  }
  stream.end();
  console.log(`Generando "${nombre}"...`);
}

generarArchivo('pequeno.txt', 100);
generarArchivo('mediano.txt', 50_000);
generarArchivo('grande.txt', 1_500_000);