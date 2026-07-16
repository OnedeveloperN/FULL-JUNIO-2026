const Person = require('../models/personModel');

// GET /persons  (con busqueda por name, surname, isTeacher)
exports.list = (req, res) => {
  let persons = Person.getAll();
  const { name, surname, isTeacher } = req.query;

  if (name) {
    persons = persons.filter((p) =>
      p.Name.toLowerCase().includes(String(name).toLowerCase())
    );
  }
  if (surname) {
    persons = persons.filter((p) =>
      p.Surname.toLowerCase().includes(String(surname).toLowerCase())
    );
  }
  if (isTeacher !== undefined) {
    persons = persons.filter((p) => p.IsTeacher === String(isTeacher));
  }

  res.json(persons);
};

// GET /persons/:id
exports.getOne = (req, res) => {
  const persons = Person.getAll();
  const person = persons.find((p) => p.Id === req.params.id);
  if (!person) return res.status(404).json({ error: 'Person no encontrada' });
  res.json(person);
};

// POST /persons
exports.create = (req, res) => {
  const { Name, Surname, IsTeacher, Birthdate } = req.body;

  if (!Name || !Surname) {
    return res.status(400).json({ error: 'Name y Surname son obligatorios' });
  }

  const persons = Person.getAll();
  const newPerson = {
    Id: String(Person.nextId(persons)),
    Name,
    Surname,
    IsTeacher: String(IsTeacher === true || IsTeacher === 'true'),
    Birthdate: Birthdate || '',
  };

  persons.push(newPerson);
  Person.saveAll(persons);
  res.status(201).json(newPerson);
};

// PUT /persons/:id
exports.update = (req, res) => {
  const persons = Person.getAll();
  const index = persons.findIndex((p) => p.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person no encontrada' });

  const { Name, Surname, IsTeacher, Birthdate } = req.body;
  const updated = {
    ...persons[index],
    ...(Name !== undefined && { Name }),
    ...(Surname !== undefined && { Surname }),
    ...(IsTeacher !== undefined && {
      IsTeacher: String(IsTeacher === true || IsTeacher === 'true'),
    }),
    ...(Birthdate !== undefined && { Birthdate }),
  };

  persons[index] = updated;
  Person.saveAll(persons);
  res.json(updated);
};

// DELETE /persons/:id
exports.remove = (req, res) => {
  const persons = Person.getAll();
  const index = persons.findIndex((p) => p.Id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Person no encontrada' });

  const [deleted] = persons.splice(index, 1);
  Person.saveAll(persons);
  res.json({ message: 'Person eliminada', person: deleted });
};
