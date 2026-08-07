const sumar = (a, b) => a + b

const multiplicar = (a, b) => a * b

const restar = (a, b) => a - b

//Función que recibe una operacion como parametro
function calcular(num1, num2, operacion) {
    const resultado = operacion(num1, num2)
    console.log('El resultado es: ' + resultado)
    return resultado
}

//Usamos diferentes operaciones
calcular(5,3, sumar)
calcular(5,3, multiplicar)
calcular(5,3, restar)

//Crear funciones flecha para:
//Calcular IVA, convertir pesos en dolares, obtener el cuadrado de un número

const readline = require("readline");

const calcularIVA = (precio) => precio * 0.16;
const pesosADolares = (pesos, tipoCambio = 17.5) => pesos / tipoCambio;
const cuadrado = (num) => num ** 2;

const rl = readline.createInterface({ input: process.stdin });

rl.question("Ingresa el precio: ", (precio) => {
  rl.question("Ingresa los pesos: ", (pesos) => {
    rl.question("Ingresa el número: ", (num) => {
      console.log("IVA:", calcularIVA(Number(precio)));
      console.log("Dólares:", pesosADolares(Number(pesos)));
      console.log("Cuadrado:", cuadrado(Number(num)));
      rl.close();
    });
  });
});

const persona = {name: 'Dani' }
persona.edad = 30
console.log(persona)

const alumno = {
    nombre: "Ana",
    edad: 20,
    carrera: "TI",

    presentarse: function() {
        return `Hola, soy ${this.nombre}, tengo ${this.edad} años y estudio ${this.carrera}.`;
    }
};

console.log(alumno.presentarse());

const cuentaBancaria = {
    titular: "Emilio Campos",
    saldo: 1000,

    depositar(cantidad) {
        this.saldo += cantidad;
        console.log(`Se depositaron $${cantidad}.`);
    },

    retirar(cantidad) {
        if (cantidad <= this.saldo) {
            this.saldo -= cantidad;
            console.log(`Se retiraron $${cantidad}.`);
        } else {
            console.log("Fondos insuficientes.");
        }
    },

    consultarSaldo() {
        return `El saldo actual es: $${this.saldo}`;
    }
};

// Pruebas
cuentaBancaria.depositar(500);
console.log(cuentaBancaria.consultarSaldo());

cuentaBancaria.retirar(300);
console.log(cuentaBancaria.consultarSaldo());

cuentaBancaria.retirar(1500);
console.log(cuentaBancaria.consultarSaldo());