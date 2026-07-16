const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

/**
 * Lee un archivo CSV y devuelve un array de objetos.
 * Si el archivo no existe o está vacío, devuelve [].
 */
function readCSV(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.trim()) return [];
  return parse(content, {
    columns: true,
    skip_empty_lines: true,
  });
}

/**
 * Escribe un array de objetos en un archivo CSV, respetando el orden de columnas indicado.
 */
function writeCSV(filePath, headers, records) {
  const csv = stringify(records, { header: true, columns: headers });
  fs.writeFileSync(filePath, csv);
}

/**
 * Calcula el siguiente ID disponible (autoincremental) a partir de los registros existentes.
 * Garantiza que los IDs no se repitan aunque se borren registros intermedios.
 */
function getNextId(records) {
  if (records.length === 0) return 1;
  const maxId = Math.max(...records.map((r) => parseInt(r.Id, 10) || 0));
  return maxId + 1;
}

module.exports = { readCSV, writeCSV, getNextId };
