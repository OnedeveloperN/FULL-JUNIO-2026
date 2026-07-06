const logger = require('node-color-log');
let prompt = require('prompt-sync')();


//Ejercicio 1
logger.color('white').bgColor('blue').log('       Ejercicio 1 - 1       ');


for (let i = 1; i <= 100; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

//ejercicio 1 - 2
logger.color('white').bgColor('blue').log('       Ejercicio 1 - 2       ');

function saludar(nombre) {
    console.log(`Hola ${nombre}`);
}

const nombre = prompt("Introduce tu nombre: ");

function procesarEntrada(callback) {
    let name = prompt('ingrese su nombre: ')
    if (name === '') {
        callback();
    } else {
        callback(name);
    }
}

procesarEntrada(saludar);

// Ejercicio 1 - 3 
logger.color('white').bgColor('blue').log('       Ejercicio 1 - 3       ');

function tablaMultiplicar(numero) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${numero} x ${i} = ${numero * i}`);
    }
}

const numero = Number(prompt("Introduce un número:"));

tablaMultiplicar(numero);

// Ejercicio 2 - 1
logger.color('white').bgColor('blue').log('       Ejercicio 2 - 1       ');

function constainsS(str) {
    return str.toLowerCase().includes('s');
}

let inputString = prompt('Ingrese una cadena de texto: ');
console.log(constainsS(inputString));

//Ejercicio 2 - 2
logger.color('white').bgColor('blue').log('       Ejercicio 2 - 2       ');

function esParOImpar(numero) {
    if (numero % 2 === 0) {
        console.log(`${numero} es par.`);
    } else {
        console.log(`${numero} es impar.`);
    }
}

const numero1 = Number(prompt("Introduce un número:"));

esParOImpar(numero1);

//Ejercicio 2 - 3
logger.color('white').bgColor('blue').log('       Ejercicio 2 - 3       ');

function elevarASiMismo(numero) {
    console.log(`${numero} elevado a ${numero} es ${numero ** numero}`);
}

const numero2 = Number(prompt("Introduce un número:"));

elevarASiMismo(numero2);

//Ejercicio 2 - 4
logger.color('white').bgColor('blue').log('       Ejercicio 2 - 4       ');

function calcularArea(alto, ancho) {
    return alto * ancho;
}

const alto = Number(prompt("Introduce el alto:"));
const ancho = Number(prompt("Introduce el ancho:"));

const area = calcularArea(alto, ancho);

console.log(`El área del rectángulo es ${area}`);

//Ejercicio 2 - 5
logger.color('white').bgColor('blue').log('       Ejercicio 2 - 5       ');

function calcularAreaTriangulo(alto, ancho) {
    return (alto * ancho) / 2;
}

const alto2 = Number(prompt("Introduce el alto:"));
const ancho2 = Number(prompt("Introduce el ancho:"));

const area2 = calcularAreaTriangulo(alto2, ancho2);

console.log(`El área del triángulo es ${area2}`);

//Ejercicio 2 - 6
logger.color('white').bgColor('blue').log('       Ejercicio 2 - 6      ');

function calcularAreaCirculo(radio) {
    return Math.PI * (radio ** 2);
}

const radio = Number(prompt("Introduce el radio del círculo:"));

const area3 = calcularAreaCirculo(radio);

console.log(`El área del círculo es ${area3}`);

//Ejercicio 3 - 1
logger.color('white').bgColor('blue').log('       Ejercicio 3 - 1       ');

function potencia(base, exponente) {
    return base ** exponente;
}

const base = Number(prompt("Introduce la base:"));
const exponente = Number(prompt("Introduce el exponente:"));

const resultado = potencia(base, exponente);

console.log(`El resultado es ${resultado}`);

//Ejercicio 3 - 2
logger.color('white').bgColor('blue').log('       Ejercicio 3 - 2       ');



