class Barco {
    constructor(ID, longitud) {
        this.ID = ID;
        this.longitud = longitud;
        this.tocado = 0;
        this.posiciones = [];
        this.alrededor = [];
    }
    getTocado() {
        return this.tocado;
    }
    setTocado(tocado) {
        this.tocado = tocado;
    }
    getLongitud() {
        return this.longitud;
    }
    setLongitud(longitud) {
        this.longitud = longitud;
    }
    generarBarco(jugador) {
        let valido;
        let x, y, horizontal;

        do {
            this.posiciones = [];
            valido = true;
            horizontal = Math.floor(Math.random() * 2);

            if (horizontal < 1) {
                x = Math.floor(Math.random() * (jugador.getX() - this.longitud + 1));
                y = Math.floor(Math.random() * jugador.getY());
            } else {
                x = Math.floor(Math.random() * jugador.getX());
                y = Math.floor(Math.random() * (jugador.getY() - this.longitud));
            }

            let x1 = x;
            let y1 = y;

            while (x1 <= x + this.longitud - 1 && y1 <= y + this.longitud - 1 && valido) {
                // console.log("x1 " + x1)
                //  console.log("y1 " + y1)
                const casilla = jugador.getCasilla(x1, y1);
                // console.log(casilla)
                this.posiciones.push(casilla);
                if ( !casilla.isPuedeBarco()) {
                    valido = false;
                }
                if (horizontal < 1) {
                    x1++;
                } else {
                    y1++;
                }
            }
        } while (!valido);

        this.colocarBarco(jugador);
        this.puedeBarco(x, y, horizontal, jugador);
    }
    colocarBarco(jugador) {
        this.posiciones.forEach(casilla => {
            casilla.setBarco(this);

            // Obtén las coordenadas X e Y de la casilla
            const x = casilla.getX();
            const y = casilla.getY();


            const casillaId = `casilla-${x}-${y}`;

            const contenedor = document.getElementById(jugador.nombreTablero);
            const celda = contenedor.querySelector(`#${casillaId}`);
            if (jugador instanceof Jugador1) {
            celda.classList.add('has-ship');}
            
        });
    }
    puedeBarco(x, y, horizontal, jugador) {
        let aux1, aux2;

        if (horizontal < 1) {
            aux1 = x + this.longitud;
            aux2 = y + 1;
        } else {
            aux1 = x + 1;
            aux2 = y + this.longitud;
        }

        for (let i = x - 1; i <= aux1; i++) {
            for (let j = y - 1; j <= aux2; j++) {
                try {
                    jugador.getCasilla(i, j).setPuedeBarco(false);
                    this.alrededor.push(jugador.getCasilla(i, j));
                } catch (error) {
                    // Manejar la excepción si está fuera de los límites del tablero
                }
            }
        }
    }

    puedeDisparar() {
        this.alrededor.forEach(casilla => {
            casilla.setPuedeDisparar(false);
        });
    }
    hundir(jugador) {
        this.posiciones.forEach(casilla => {
            casilla.setHundido(true);
            const casillaId = `casilla-${casilla.getX()}-${casilla.getY()}`;


            const contenedor = document.getElementById(jugador.nombreTablero);
            const celda = contenedor.querySelector(`#${casillaId}`);
            celda.classList.add('sunk');
            
        });
    }
}
