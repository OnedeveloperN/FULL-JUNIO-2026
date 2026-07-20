const express = require('express');
const appConfig = require('./config/config.js');

const app = express();

app.get('/', (req, res) => {
  res.json({
    entorno: process.env.NODE_ENV || 'development',
    puerto: appConfig.port,
    app: appConfig.appName,
    baseDeDatos: appConfig.dbName,
  });
});

app.listen(appConfig.port, () => {
  console.log(`[${process.env.NODE_ENV || 'development'}] Servidor en puerto ${appConfig.port}`);
});