const path = require('path');
const { readCSV, writeCSV, getNextId } = require('../helpers/csvHelper');

const FILE_PATH = path.join(__dirname, '../data/persons.csv');
const HEADERS = ['Id', 'Name', 'Surname', 'IsTeacher', 'Birthdate'];

// Devuelve todos los registros de persons.csv como array de objetos
function getAll() {
  return readCSV(FILE_PATH);
}

// Sobrescribe persons.csv con el array de objetos recibido
function saveAll(persons) {
  writeCSV(FILE_PATH, HEADERS, persons);
}

// Calcula el siguiente Id disponible en base a los registros actuales
function nextId(persons) {
  return getNextId(persons);
}

function getById(id) {
  return getAll().find((p) => p.Id === String(id));
}

module.exports = { getAll, saveAll, nextId, getById };
