require('dotenv').config();
const express = require('express');
const usersRouter = require('./routers/users');
const connectDB = require('./db');

connectDB()

const app = express();
const PORT = process.env.PORT || 3000; 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dia05';

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Word');
});

app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log('Server is running on ${PORT}');
});
    