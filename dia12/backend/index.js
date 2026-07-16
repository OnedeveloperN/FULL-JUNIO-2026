const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./middlewares/logs');
const verify = require('./middlewares/verify');
const notFound = require('./middlewares/not-found');


app.use(cors("*")); /** poner el dominio de la api */
app.use(logger);
app.use(express.static('public'));


app.get('/1', (req, res) => {
    res.send('No Autorizado');
});


app.use(verify);

app.get('/2', (req, res) => {
    res.send('Autorizado');
});

const taskRouter = require('./router/task-router');
app.use('/tasks', taskRouter);


//Error 404
app.use(notFound);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

