const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');
const Producto = require('../models/producto');

// Crear un pedido
router.post('/', async (req, res) => {
  try {
    const { usuario, productos } = req.body;
    // productos esperado: [{ producto: "id", cantidad: 2 }, ...]

    if (!productos || productos.length === 0) {
      return res.status(400).json({ error: 'El pedido debe tener al menos un producto' });
    }

    let total = 0;
    const itemsConPrecio = [];

    for (const item of productos) {
      const productoDB = await Producto.findById(item.producto);

      if (!productoDB) {
        return res.status(404).json({ error: `Producto ${item.producto} no encontrado` });
      }
      if (productoDB.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para "${productoDB.nombre}"` });
      }

      const subtotal = productoDB.precio * item.cantidad;
      total += subtotal;

      itemsConPrecio.push({
        producto: productoDB._id,
        cantidad: item.cantidad,
        precioUnitario: productoDB.precio
      });

      // Descontamos el stock
      productoDB.stock -= item.cantidad;
      await productoDB.save();
    }

    const pedido = new Pedido({ usuario, productos: itemsConPrecio, total });
    const pedidoGuardado = await pedido.save();

    res.status(201).json(pedidoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('usuario', 'nombre email')
      .populate('productos.producto', 'nombre precio');
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un pedido por id
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id)
      .populate('usuario', 'nombre email')
      .populate('productos.producto', 'nombre precio');
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estado del pedido
router.put('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { estado: req.body.estado },
      { new: true, runValidators: true }
    );
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un pedido
router.delete('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.status(200).json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;