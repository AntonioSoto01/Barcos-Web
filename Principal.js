document.addEventListener('DOMContentLoaded', function () {
    const jugador = new Jugador();
    const maquina = new Maquina();

    var turnoJugador = true;

    maquina.generarTablero(maquina.getX(), maquina.getY(), maquina.getNombreTablero());
    maquina.generarCasillas();
    maquina.generarBarcos();


    jugador.generarTablero(jugador.getX(), jugador.getY(), jugador.getNombreTablero());
    jugador.generarCasillas();
    jugador.generarBarcos();

    const contenedor = document.getElementById(jugador.nombreTablero);
    const celdas = contenedor.querySelectorAll('.square');
    var desactivado;
    celdas.forEach(celda => {
        celda.addEventListener('click', () => {
            const [_, x, y] = celda.id.split('-');
            if (!desactivado && turnoJugador) {
                desactivado = true;
                devolver(jugador, parseInt(x), parseInt(y));
            } else {
                console.log("no es tu turno")
            }

        });
    });

    function devolver(jugador, x, y) {
        const resultado = jugador.disparado(x, y);

        if (resultado === 'Final') {
            desactivado = true;
            if (!turnoJugador) {
                Swal.fire("¡Juego Terminado!", "¡Has perdido el juego!", "error");
            } else {
                Swal.fire("¡Juego Terminado!", "¡Has ganado el juego!", "success");
            }
        } else if (resultado === 'Agua') {
            turnoJugador = !turnoJugador;
        }

        console.log(turnoJugador);
        setTimeout(function () {
            actualizarMensajes();
            if (!turnoJugador) {
                if (resultado !== 'Final') {
                    devolver(maquina);
                }

            } else {
                desactivado = false;
            }
        }, 2000);
    }

    function actualizarMensajes() {
        document.getElementById('mensajeTurnoJugador').innerHTML = turnoJugador ? 'Tu turno' : '<br>';
        document.getElementById('mensajeTurnoMaquina').innerHTML = turnoJugador ? '<br>' : 'Turno de la máquina';
    }
});

