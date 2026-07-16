const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroomController');

router
  .route('/')
  .get(classroomController.list)
  .post(classroomController.create);

router
  .route('/:id')
  .get(classroomController.getOne)
  .put(classroomController.update)
  .delete(classroomController.remove);
        
module.exports = router;
