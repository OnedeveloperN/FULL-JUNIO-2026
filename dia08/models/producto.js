const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true,
    default: ''
  },
  precio: {
  type: Number,
  required: [true, 'El precio es obligatorio'],
  validate: {
    validator: Number.isInteger,
    message: 'El precio debe ser un número entero (en centavos)'
  },
  min: [1, 'El precio debe ser positivo']
},
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    min: [0, 'El stock no puede ser negativo'],
    validate: {
      validator: Number.isInteger,
      message: 'El stock debe ser un número entero'
    }
  },
  categoria: {
    type: String,
    trim: true,
    default: 'general'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producto', productoSchema);