class Jugador {
    constructor() {
        this.x = 10;
        this.y = 10;
        this.longBarco = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
        this.nbarcos = this.longBarco.length;
        this.tablero = new Array(this.x).fill(null).map(() => new Array(this.y).fill(null));
        this.barcos = new Array(this.nbarcos);
        this.barcoshundidos = 0;
        this.nombreTablero = 'tableroJugador'
    }

    getNbarco() {
        return this.nbarcos;
    }

    getBarcoshundidos() {
        return this.barcoshundidos;
    }

    getNombreTablero() {
        return this.nombreTablero;
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
        const contenedor = document.getElementById(this.nombreTablero);
        const filas = contenedor.querySelectorAll('.row');
        filas.forEach((fila, i) => {
            const celdas = fila.querySelectorAll('.square');
            celdas.forEach((celda, j) => {
                const casilla = new Casilla(i - 1, j);
                celda.casilla = casilla;
                celda.id = `casilla-${i - 1}-${j}`;



                this.tablero[i - 1][j] = casilla;

            });
        });
    }



    generarBarcos() {
        for (let i = 0; i < this.nbarcos; i++) {
            this.barcos[i] = new Barco(i, this.longBarco[i]);
            this.barcos[i].generarBarco(this);
        }
    }

    disparado(x, y) {
        const casilla = this.casillaDisparada(x, y);

        if (casilla === null) {
            return "Repetido";
        }

        casilla.setDisparado(true);

        const casillaId = `casilla-${casilla.x}-${casilla.y}`;
        const contenedor = document.getElementById(this.nombreTablero);
        const celda = contenedor.querySelector(`#${casillaId}`);
        celda.textContent = '●';
        if (casilla.getBarco() !== null) {
            this.IATocado(casilla);
            // celda.classList.add('tocado');
            celda.classList.add('has-ship');
            casilla.getBarco().setTocado(casilla.getBarco().getTocado() + 1);
            if (casilla.getBarco().getTocado() === casilla.getBarco().getLongitud()) {
                console.log(this.espacios() + "HUNDIDO!!!");
                this.IAHundido();
                casilla.getBarco().hundir(this);
                this.setBarcoshundidos(this.getBarcoshundidos() + 1);
                if (this.getBarcoshundidos() === this.getNbarco()) {
                    console.log(this.espacios() + "Todos los barcos hundidos");
                    return "Final";
                }
                return "Hundido";
            } else {
                console.log(this.espacios() + "TOCADO!!!");
                return "Tocado";
            }
        } else {
            console.log(this.espacios() + "Agua");
            celda.classList.remove('gris');
            this.IAgua();
            //celda.classList.add('agua');
            return "Agua";
        }
    }
    casillaDisparada(x, y) {
        const casilla = this.getCasilla(x, y);

        if (casilla.isDisparado()) {
            console.log("Ya has disparado esa casilla");
            return null;
        }

        casilla.setDisparado(true);
        console.log("Dispara a " + casilla.toString());


        return casilla;
    }


    IATocado(casillaDisparada) { }

    IAHundido() { }

    IAgua() { }

    espacios() {
        return "";
    }
    generarTablero(filas, columnas) {
        const contenedor = document.getElementById(this.nombreTablero);


        for (let i = 0; i <= filas; i++) {
            const row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j <= columnas; j++) {
                const col = document.createElement('div');
                col.classList.add('col-1', 'p-3', 'text-center', 'border');

                if (i === 0) {
                    col.classList.add('square2');
                    if (j > 0) {
                        col.textContent = String.fromCharCode(64 + j);
                    }
                } else if (j === 0 && i > 0) {
                    col.textContent = i;
                    col.classList.add('square2');
                } else {
                    col.classList.add('square');
                    // if (!(this instanceof Jugador1)) {
                    //     col.classList.add('gris');
                    // }
                }

                row.appendChild(col);
            }

            contenedor.appendChild(row);
        }
    }
}

