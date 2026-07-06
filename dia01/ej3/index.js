let prompt = require('prompt-sync')();

let n1 = prompt('ingrese un numero: ');
let n2 = prompt('ingrese otro numero: ');

console.log('la suma de ', n1, 'y', n2, 'es:', parseInt(n1) + parseInt(n2));