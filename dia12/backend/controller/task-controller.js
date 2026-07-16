const Task = require('../models/personModel');

// GET /tasks  (con busqueda por title, description, completed)
exports.list = (req, res) => {
  let tasks = Task.getAll();
  const { name, status, description } = req.query;

  if (name) {
    tasks = tasks.filter((t) =>
      t.name.toLowerCase().includes(String(name).toLowerCase())
    );
  }
  if (status) {
    tasks = tasks.filter((t) =>
      t.Status === String(status)
    );
  }
  if (description) {
    tasks = tasks.filter((t) =>
      t.Description.toLowerCase().includes(String(description).toLowerCase())
    );
  }

  res.json(tasks);
};

// GET /tasks/:id
exports.getOne = (req, res) => {
  const tasks = Task.getAll();
  const task = tasks.find((t) => t.Id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task no encontrada' });
  res.json(task);
};

// POST /tasks
exports.create = (req, res) => {
  const { name, status  , Completed } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name es obligatorio' });
  }

  const tasks = Task.getAll();
  const newTask = {
    Id: String(Task.nextId(tasks)),
    name,
    status,
                
    Completed: Boolean(Completed),
  };

  tasks.push(newTask);
  Task.saveAll(tasks);
  res.status(201).json(newTask);
};

// PUT /tasks/:id
exports.update = (req, res) => {
  const tasks = Task.getAll();
  const index = tasks.findIndex((t) => t.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task no encontrada' });

  const { name, status, Description, Completed } = req.body;
  const updated = {
    ...tasks[index],
    ...(name !== undefined && { name }),
    ...(status !== undefined && { status }),
    ...(Description !== undefined && { Description }),
    ...(Completed !== undefined && { Completed: Boolean(Completed) }),
  };

  tasks[index] = updated;
  Task.saveAll(tasks);
  res.json(updated);
};

// DELETE /tasks/:id
exports.remove = (req, res) => {
  const tasks = Task.getAll();
  const index = tasks.findIndex((t) => t.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task no encontrada' });

  const [deleted] = tasks.splice(index, 1);
  Task.saveAll(tasks);
  res.json({ message: 'Task eliminada', task: deleted });
};
