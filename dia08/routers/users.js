const express = require('express');
const router = express.Router();
const Usuario = require('../models/user');

// Crear un usuario
router.post('/', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    const usuarioGuardado = await usuario.save();

    // Ocultamos el password en la respuesta, aunque ya vaya encriptado
    const { password, ...usuarioSinPassword } = usuarioGuardado.toObject();
    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    // Error de email duplicado (índice unique de MongoDB)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(400).json({ error: error.message });
  }
});

// Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-password');
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un usuario por id
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select('-password');
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Asignamos los cambios y usamos .save() para que el pre('save') encripte
    // el password si viene incluido en el body
    Object.assign(usuario, req.body);
    const usuarioActualizado = await usuario.save();

    const { password, ...usuarioSinPassword } = usuarioActualizado.toObject();
    res.status(200).json(usuarioSinPassword);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;