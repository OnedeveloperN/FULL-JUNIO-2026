const fs = require('fs');

function leerConStream(nombreArchivo) {
  console.log(`\n--- Leyendo "${nombreArchivo}" con stream ---`);

  const stream = fs.createReadStream(nombreArchivo, { encoding: 'utf8' });

  let numeroDeChunks = 0;
  let totalBytes = 0;

  stream.on('data', (chunk) => {
    numeroDeChunks++;
    totalBytes += Buffer.byteLength(chunk, 'utf8');
  });

  stream.on('end', () => {
    console.log(`Archivo: ${nombreArchivo}`);
    console.log(`Chunks recibidos: ${numeroDeChunks}`);
    console.log(`Tamaño total leído: ${(totalBytes / 1024).toFixed(2)} KB`);
  });

  stream.on('error', (error) => {
    console.error(`Error leyendo ${nombreArchivo}:`, error.message);
  });
}

leerConStream('pequeno.txt');
leerConStream('mediano.txt');
leerConStream('grande.txt');