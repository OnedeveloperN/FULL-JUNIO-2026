const path = require('path');
const { readCSV, writeCSV, getNextId } = require('../helpers/csvHelper');
    
const FILE_PATH = path.join(__dirname, '../data/classrooms.csv');
const HEADERS = [
    'Id',
    'Name',
    'Teacher_id',
    'Students'
];

// Devuelve todos los registros de classrooms.csv como array de objetos
function getAll() {
  return readCSV(FILE_PATH);
}

// Sobrescribe classrooms.csv con el array de objetos recibido
function saveAll(classrooms) {
  writeCSV(FILE_PATH, HEADERS, classrooms);
}

// Calcula el siguiente Id disponible en base a los registros actuales
function nextId(classrooms) {
  return getNextId(classrooms);
}

module.exports = { getAll, saveAll, nextId };
