const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({    
  name: { type: String, required: true },
  status: { type: Boolean, required: false },
  Description: { type: String, default: '' }
});

const Task = mongoose.model('tasks', taskSchema);
module.exports = Task;