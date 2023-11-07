document.addEventListener('DOMContentLoaded', function() {
    const jugador = new Jugador();
    const maquina = new Jugador1();

   // maquina.generarCasillas();
    //maquina.generarBarcos();
    const celdas = document.querySelectorAll('.square');

    jugador.generarTablero(jugador.getX(), jugador.getY(), jugador.getNombreTablero());

    jugador.generarCasillas();
    jugador.generarBarcos();
    //maquina.generarTablero(maquina.getX(), maquina.getY(), maquina.getNombreTablero());

    celdas.forEach(celda => {
        celda.addEventListener('click', () => {

            const [_, x, y] = celda.id.split('-');
            

            const resultado = jugador.disparado(parseInt(x), parseInt(y));
            
            console.log(resultado);
        });
    });
    let tocado = '';
    //jugador.ver(false);

    // while (tocado !== 'Final') {
    //     do {
    //         console.log('Tu turno\n');
    //         tocado = jugador.disparado();
    //         jugador.ver(false);
    //     } while (tocado === 'Tocado');

    //     if (tocado !== 'Final') {
    //         do {
    //             console.log();
    //             tocado = jugador1.disparado();
    //             jugador1.ver(true);
    //         } while (tocado === 'Tocado');
    //     }
    // }
});
