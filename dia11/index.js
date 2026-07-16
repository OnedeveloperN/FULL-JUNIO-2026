const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./middlewares/logs');
const serverError = require('./middlewares/server-error');
const verify = require('./middlewares/verify');
const notFound = require('./middlewares/not-found');
const loggerMiddleware = require('./middlewares/date');
const tokenMiddleware = require('./middlewares/token');
const counter = require('./middlewares/requestCount');
const timing = require('./middlewares/timing');
const blockIP = require('./middlewares/blockIP');

app.use(cors()); /** poner el dominio de la api */
app.use(logger);
app.use(loggerMiddleware);
app.use(counter);
app.use(timing);
app.use(blockIP);
app.use(express.static('public'));
app.use(tokenMiddleware);


app.get('/1', (req, res) => {
    res.send('No autorizado');
})

app.use(verify);

app.get('/2', (req, res) => {
    res.send('Esta autorizado');
});


app.get('/', (req, res) => {
    res.status(200).json({ mensaje: 'Bienvenido' });
});

app.get('/', (req, res) => {
  res.json({ mensaje: 'Ruta principal OK' });
});

app.get('/error', (req, res) => {
  throw new Error('Esto es un error de prueba');
});


// Error 404

app.use(notFound);
app.use(serverError);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

