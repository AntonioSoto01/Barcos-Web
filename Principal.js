const readline = require('readline-sync');

class Principal {
    static main() {
        const jugador1 = new Jugador1();
        jugador1.generarcasillas();
        jugador1.generarbarcos();

        const maquina = new Jugador();
        maquina.generarcasillas();
        maquina.generarbarcos();

        let tocado = '';
        maquina.ver(false);

        while (tocado !== 'Final') {
            do {
                console.log('Tu turno\n');
                tocado = maquina.disparado();
                maquina.ver(false);
            } while (tocado === 'Tocado');

            if (tocado !== 'Final') {
                do {
                    console.log();
                    readline.question('Pulsa enter para continuar');
                    console.log('Turno del contrario\n');
                    tocado = jugador1.disparado();
                    jugador1.ver(true);
                } while (tocado === 'Tocado');
            }
        }
    }
}

Principal.main();
