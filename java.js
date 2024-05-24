// declaramos la variantes del jugador 1 y el jugador maquina 

let jugadorActual = '❌';
let tablero = ['', '', '', '', '', '', '', '', ''];

const nombresJugadores = {
    '⭕': 'tablero',
    '❌': ' Jugador 1'
};

function actualizarIndicadorTurno() {
    const indicador = document.getElementById('indicadorTurno');
    console.log(nombresJugadores[jugadorActual])
    indicador.textContent = `Turno de: ${nombresJugadores[jugadorActual]} (${jugadorActual})`;
}


// se realiza una funcion al boton (los cuadros)
    function acciones(button) {

    // crea una nueva array.devuelve “cualquier nodo” padre.
    const index = Array.from(button.parentNode.children).indexOf(button);
    // retorna el primer índice en el que se puede encontrar un elemento dado en el array, indexof

    if (tablero[index] === '') {
        tablero[index] = jugadorActual;
        // modificas el contenido en texto = textContent
        button.textContent = jugadorActual;

        actualizarIndicadorTurno()
        if (verificarGanador()) {
            alert(`¡El jugador ${jugadorActual} ha ganado!`);
            reinicioJuego();
        } else if (tablero.every(casilla => casilla !== '')) {
            alert('¡Es un empate!');
            reinicioJuego();
        } else {
            jugadorActual = jugadorActual === '❌' ? '⭕' : '❌';
            if (jugadorActual === '⭕') {
                setTimeout(movimientoMaquina, 800); // La máquina hace su movimiento
            }
        }
    }
}
     // funcion de movimiento 
        function movimientoMaquina() {
    //    Encuentra todas las casillas vacías. 
    //     // . map() una nueva matriz llamando a una función en cada elemento de la matriz original y almacenando los resultados en una nueva matriz 
        const indicesVacios = tablero.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    //     // comprueba cada elemento del array para ver si cumple la condición  FILTER


    // LENGTH se utiliza para manipular series de caracteres de todos los tipos de datos de series de caracteres
        if (indicesVacios.length > 0) {
        const indexAleatorio = indicesVacios[Math.floor(Math.random() * indicesVacios.length)];
        //         // FLOOR redondea un número dado hacia el número entero anterior... Math.random método integrado para producir números aleatorios

        actualizarIndicadorTurno()
        tablero[indexAleatorio] = jugadorActual;
        document.querySelectorAll('.botones')[indexAleatorio].textContent = jugadorActual;
        // modificas el contenido en texto = textContent
        if (verificarGanador()) {
            alert(`¡El jugador ${jugadorActual} ha ganado!`);
            reinicioJuego();
        } else if (tablero.every(casilla => casilla !== '')) {
            alert('¡Es un empate!');
            reinicioJuego();
        } else {
            jugadorActual = '❌'; // Devuelve el turno al jugador
        }
    }
}
// funcion que indica las jugadas ganarodas 
function verificarGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    //  funcion para llevar el juego a cabo 
    // SOME comprueba si al menos un elemento del array cumple con la condición implementada por la función proporcionada .
    return combinacionesGanadoras.some(combinacion => {
        const [a, b, c] = combinacion;
        return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
    });
}

function reinicioJuego() {
    tablero.fill("");
    // método fill() cambia todos los elementos en un arreglo por un valor estático,
    document.querySelectorAll(".botones").forEach(button => {
        //FOREACH bucle utiliza internamente un iterador para abrir sucesivamente cada elemento del array o lista 
        button.textContent = '';
    });// modificas el contenido en texto = textContent
    jugadorActual = '❌';

}
//  funcion al tocar el boton empieza el juego 
function iniciarJuego() {
    reinicioJuego();
    jugadorActual = '❌';
}
document.addEventListener('DOMContentLoaded', iniciarJuego);

