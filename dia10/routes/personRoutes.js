const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

router
  .route('/')
  .get(personController.list)
  .post(personController.create);

router
  .route('/:id')
  .get(personController.getOne)
  .put(personController.update)
  .delete(personController.remove);

module.exports = router;
