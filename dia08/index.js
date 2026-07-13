require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productoRoutes = require('./routers/productos');
const usuarioRoutes = require('./routers/users');
const pedidoRoutes = require('./routers/pedidos');

const app = express();


// Middleware para parsear JSON en el body de las peticiones
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Ruta raíz - mensaje de bienvenida
app.get('/', (req, res) => {
  res.status(200).json({ mensaje: 'Bienvenido a la API de la tienda' });
});

// Rutas de productos
app.use('/api/productos', productoRoutes);

// Rutas de usuarios
app.use('/api/usuarios', usuarioRoutes);

// Rutas de pedidos
app.use('/api/pedidos', pedidoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
