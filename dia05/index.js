require('dotenv').config();
const express = require('express');
const usuariosRouter = require(../routers/users');
const mongoose = require('mongoose');

connectDB()

const app = express();
const PORT = proces.env.PORT || 3000; 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dia05';

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Conected to MongoDB');
    })
    .catch((error) => {
        res.send('Hello Word!');
    });

app.get('/', (req, res) => {
    res.send('Hello Word');
});

app.listen(PORT, () => {
    console.log('Server is running on ${PORT}');
});
    