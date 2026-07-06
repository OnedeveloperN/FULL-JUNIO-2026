const logger = require('node-color-log');
let prompt = require('prompt-sync')();
const chalk = require('chalk');

logger.color('white').bgColor('blue').log('       Ejercicio 1 - 1       ');

//Ejercicio 1-1

const elementos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(elementos);

//Ejercicio 1-2

console.log(elementos[2], elementos[6]);

//Ejercicio 1-3

console.log(elementos.length);

//Ejercicio 1-4

elementos.unshift(0);
console.log(elementos);

//Ejercicio 1-5

elementos.push(11);
console.log(elementos); 

//Ejercicio 1-6

elementos.splice(5, 2); //el primer elemento indica la posicion y el segundo cuantos elementos se eliminan
console.log(elementos);

//Ejercicio 1-7

console.log(elementos.indexOf(8));

//Ejercicio 1-8 

console.log(elementos.reverse());

//Ejercicio 1-9

const stingElementos = elementos.join(',');

console.log(stingElementos);

//Ejercicio 1-10

const nuevoArray = stingElementos.split(',').map(Number);

console.log(nuevoArray);


//Ejercicio 2-1

elementos.forEach((valor, indice) => {
    console.log(`Índice ${indice}: ${valor}`);
});

//Ejercisio 2-2

const comboArray = elementos.map((numero, indice) => {
    const nuevoValor = numero + ' perros';
    console.log(`Índice ${indice}: ${nuevoValor}`);
    return nuevoValor;
  });

//Ejercicio 2-3

console.log(comboArray.indexOf('8 perros'));

//Ejercicio 2-4

const filtrado = comboArray.filter((valor) => {
    const numero = parseInt(valor);
    return numero >= 10;
  });
  
console.log(filtrado); 

//Ejercicio 3-1

const [uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez] = comboArray;

console.log(uno);
console.log(dos);
console.log(tres);
console.log(cuatro);
console.log(cinco);
console.log(seis);
console.log(siete);
console.log(ocho);
console.log(nueve);
console.log(diez);

//Ejercicio 3-2

const frutas = ['manzana', 'banana'];
const verduras = ['zanahoria', 'lechuga'];

const todos = [...frutas, ...verduras];
console.log(todos); 

const numeros = [2, 3, 4];
const nuevosNumeros = [1, ...numeros, 5];

console.log(nuevosNumeros); 


const comboArrayModificado = [...comboArray, 'un gato'];

console.log(comboArrayModificado);

// Ejercicio 4-1


console.log(chalk.bgCyan.black(' MENOS ES MÁS!!'));


//Ejercicio 4-2

console.log(chalk.bold.green('✔ SUCCESS:'), 'Array procesado correctamente:', nuevoArray);
console.log(chalk.bold.yellow('⚠ WARNING:'), 'El valor', elementos[6], 'podría estar fuera de rango');
console.log(chalk.bold.red('✖ ERROR:'), 'No se encontró el elemento buscado');


//Ejercicio 4-3

const ora = require('ora');

const spinner = ora('Cargando datos...').start();

setTimeout(() => {
  spinner.succeed('¡Listo!');
}, 2000);

//Ejercicio 4-4

const im2a = require('image-and-video-to-ascii');

im2a.showImage('nicodev.png', { height: 75, width: 75 });
