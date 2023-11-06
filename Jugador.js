class Jugador {
    constructor() {
        this.x = 10;
        this.y = 10;
        this.longBarco = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
        this.nbarcos = this.longBarco.length;
        this.tablero = new Array(this.x).fill(null).map(() => new Array(this.y).fill(null));
        this.barcos = new Array(this.nbarcos);
        this.barcoshundidos = 0;
    }

    getNbarco() {
        return this.nbarcos;
    }

    getBarcoshundidos() {
        return this.barcoshundidos;
    }

    setBarcoshundidos(barcoshundidos) {
        this.barcoshundidos = barcoshundidos;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getCasilla(x, y) {
        return this.tablero[x][y];
    }

 generarCasillas() {
    const filas = document.querySelectorAll('.row');
    filas.forEach((fila, i) => {
        const celdas = fila.querySelectorAll('.square');
        celdas.forEach((celda, j) => {
            const casilla = new Casilla(i, j);
            celda.casilla = casilla;
            this.tablero[i][j] = casilla
        });
    });
}

    generarBarcos() {
        for (let i = 0; i < this.nbarcos; i++) {
            this.barcos[i] = new Barco(i, this.longBarco[i]);
            this.barcos[i].generarBarco(this);
        }
    }

    disparado() {
        let casillaDisparada = this.casillaDisparada();
        casillaDisparada.setDisparado(true);
        if (casillaDisparada.getBarco() !== null) {
            this.IATocado(casillaDisparada);
            casillaDisparada.getBarco().setTocado(casillaDisparada.getBarco().getTocado() + 1);
            if (casillaDisparada.getBarco().getTocado() === casillaDisparada.getBarco().getLongitud()) {
                console.log(this.espacios() + "HUNDIDO!!!");
                this.IAHundido();
                this.setBarcoshundidos(this.getBarcoshundidos() + 1);
                if (this.getBarcoshundidos() === this.getNbarco()) {
                    console.log(this.espacios() + "Todos los barcos hundidos");
                    return "Final";
                }
                return "Tocado";
            } else {
                console.log(this.espacios() + "TOCADO!!!");
                return "Tocado";
            }
        } else {
            console.log(this.espacios() + "Agua");
            this.IAgua();
            return "Agua";
        }
    }

    casillaDisparada() {
        let x = 0;
        let y = 0;
        let valido = true;
        let s = require("readline-sync");
        let veces = false;
        do {
            if (veces) {
                console.log("Ya has disparado esa casilla");
            }
            do {
                valido = true;
                console.log("Introduce una posicion y(de la A a la J) y x(de 1 a 10)");
                let cadena = s.question();

                try {
                    y = cadena.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
                    x = parseInt(cadena.substring(1)) - 1;
                    if (x < 0 || x > this.getX() - 1 || y < 0 || y > this.getY() - 1) {
                        throw new Error("ArrayIndexOutOfBoundsException");
                    }
                } catch (error) {
                    valido = false;
                    console.log(this.espacios() + "Valor no admitido");
                }
            } while (!valido);
            veces = true;
        } while (this.getCasilla(x, y).isDisparado());
        console.log("Dispara a " + this.getCasilla(x, y).toString());
        return this.getCasilla(x, y);
    }

    IATocado(casillaDisparada) {}

    IAHundido() {}

    IAgua() {}

    espacios() {
        return "";
    }

    ver(maquina) {
        let a = 'A';
        process.stdout.write(this.espacios() + String.format("%-6s", ""));
        for (let i = 0; i < this.getX(); i++) {
            process.stdout.write(String.format("%-6s", String.fromCharCode(a.charCodeAt(0) + i)));
        }
        console.log();
        console.log();
        for (let i = 0; i < this.getX(); i++) {
            process.stdout.write(this.espacios() + String.format("%-6s", String.format("%2d", i + 1) + ")"));
            for (let j = 0; j < this.getY(); j++) {
                if (this.getCasilla(i, j).isDisparado()) {
                    if (this.getCasilla(i, j).getBarco() !== null) {
                        process.stdout.write(String.format("%-6s", "T"));
                    } else {
                        process.stdout.write(String.format("%-6s", "A"));
                    }
                } else {
                    if (maquina && this.getCasilla(i, j).getBarco() !== null) {
                        process.stdout.write(String.format("%-6s", "B"));
                    } else {
                        process.stdout.write(String.format("%-6s", "-"));
                    }
                }
            }
            console.log('\n');
        }
    }
}

module.exports = Jugador;
