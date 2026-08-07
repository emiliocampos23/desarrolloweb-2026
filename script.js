const numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;

while (true) {
    let respuesta = prompt(`Adivina el número (1-100)\nIntento ${intentos + 1}`);

    if (respuesta === null) {
        console.log('Juego cancelado. El número era:', numeroSecreto);
        break;
    }

    let numero = Number(respuesta);

    if (isNaN(numero) || numero < 1 || numero > 100) {
        alert('Ingresa un número válido entre 1 y 100');
        continue;
    }

    intentos++;

    let diferencia = Math.abs(numeroSecreto - numero);

    if (numero === numeroSecreto) {
        alert(`¡Correcto! Lo lograste en ${intentos} intentos 🎉`);
        break;
    } else if (diferencia <= 4) {
        alert('¡Ya casi le atinas!');
    } else if (diferencia <= 25) {
        if (numero < numeroSecreto) alert('Bajo');
        else alert('Alto');
    } else {
        if (numero < numeroSecreto) alert('Muy bajo');
        else alert('Muy alto');
    }
}