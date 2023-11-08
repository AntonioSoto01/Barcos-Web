document.addEventListener('DOMContentLoaded', function() {
    const jugador = new Jugador();
    const maquina = new Jugador1();

var turnoJugador=true;

     maquina.generarTablero(maquina.getX(), maquina.getY(), maquina.getNombreTablero());
    maquina.generarCasillas();
     maquina.generarBarcos();


     jugador.generarTablero(jugador.getX(), jugador.getY(), jugador.getNombreTablero());
     jugador.generarCasillas();
     jugador.generarBarcos();

    const contenedor = document.getElementById(jugador.nombreTablero);
    const celdas = contenedor.querySelectorAll('.square');

    celdas.forEach(celda => {
        celda.addEventListener('click', () => {
            const [_, x, y] = celda.id.split('-');
            if (turnoJugador) {
                devolver(jugador, parseInt(x), parseInt(y));
            }else{
                console.log("no es tu turno")
            }

        });
    });
    
    function devolver(jugador, x, y) {
        const resultado = jugador.disparado(x, y);
        if (resultado === 'Hundido') {

        } else if (resultado === 'Tocado') {

        } else if (resultado === 'Final') {

        } else if (resultado === 'Agua') {
            turnoJugador = !turnoJugador;

        } else if (resultado === 'Repetido') {
 
        } else {
        }
        if (!turnoJugador) {
            setTimeout(function() {
                devolver(maquina);
            }, 1000);

        }
    }
});

