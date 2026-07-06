
//Ejercicio 1.1

console.log("Nicolas Becerini");

//Ejercicio 1.2

let a = 100;
let b = a * a;
console.log(a * a);
console.log(b);

//ejercicio 1.3

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min +1)) + min;
}

console.log(randomNumber(50, 500));
