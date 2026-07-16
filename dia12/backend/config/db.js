const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dia05";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Conexion exitosa a MongoDB');
    } catch(error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }

};

module.exports = connectDB;