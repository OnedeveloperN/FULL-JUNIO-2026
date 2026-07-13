const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware para poder leer JSON en el body de las peticiones POST
app.use(express.json());

// Carpeta donde se guardarán los archivos que gestione la API.
// path.join asegura que la ruta se construya bien sin importar el sistema operativo.
const CARPETA_ARCHIVOS = path.join(__dirname, 'archivos');


if (!fs.existsSync(CARPETA_ARCHIVOS)) {
  fs.mkdirSync(CARPETA_ARCHIVOS);
}


function rutaArchivo(nombre) {
  return path.join(CARPETA_ARCHIVOS, nombre);
}


app.get('/archivos/:nombre', (req, res) => {
  const ruta = rutaArchivo(req.params.nombre);

  if (!fs.existsSync(ruta)) {
    return res.status(404).json({ error: 'Archivo no encontrado' });
  }

  const contenido = fs.readFileSync(ruta, 'utf8');
  res.status(200).json({ nombre: req.params.nombre, contenido });
});


app.post('/archivos', (req, res) => {
  const { nombre, contenido } = req.body;

  if (!nombre || !contenido) {
    return res.status(400).json({ error: 'Debes enviar "nombre" y "contenido" en el body' });
  }

  const ruta = rutaArchivo(nombre);
  fs.writeFileSync(ruta, contenido);

  res.status(201).json({ mensaje: `Archivo "${nombre}" creado correctamente` });
});


app.delete('/archivos/:nombre', (req, res) => {
  const ruta = rutaArchivo(req.params.nombre);

  if (!fs.existsSync(ruta)) {
    return res.status(404).json({ error: 'Archivo no encontrado' });
  }

  fs.unlinkSync(ruta);
  res.status(200).json({ mensaje: `Archivo "${req.params.nombre}" eliminado correctamente` });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});