document.addEventListener('DOMContentLoaded', function() {
    const jugador = new Jugador();
    jugador.generarCasillas();
    jugador.generarBarcos();

    let tocado = '';
    jugador.ver(false);

    while (tocado !== 'Final') {
        do {
            console.log('Tu turno\n');
            tocado = jugador.disparado();
            jugador.ver(false);
        } while (tocado === 'Tocado');

        if (tocado !== 'Final') {
            do {
                console.log();
                tocado = jugador1.disparado();
                jugador1.ver(true);
            } while (tocado === 'Tocado');
        }
    }
});
