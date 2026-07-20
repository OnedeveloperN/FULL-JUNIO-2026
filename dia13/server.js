const express = require('express');
const config = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.json({
    mensaje: 'Servidor funcionando MODIFICADO',
    entorno: config.env,
    baseDeDatos: config.dbName,
  });
});

app.listen(config.port, () => {
  console.log(`Servidor corriendo en modo "${config.env}" en el puerto ${config.port}`);
});