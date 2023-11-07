class Jugador {
    constructor() {
        this.x = 10;
        this.y = 10;
        this.longBarco = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
        this.nbarcos = this.longBarco.length;
        this.tablero = new Array(this.x).fill(null).map(() => new Array(this.y).fill(null));
        this.barcos = new Array(this.nbarcos);
        this.barcoshundidos = 0;
        this.nombreTablero='tableroJugador'
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
        
        const filas = document.querySelectorAll('.row');
        filas.forEach((fila, i) => {
            const celdas = fila.querySelectorAll('.square');
            celdas.forEach((celda, j) => {
                const casilla = new Casilla(i-1, j); // Ajustar índices aquí
                celda.casilla = casilla;
                celda.id = `casilla-${i-1}-${j}`; // Ajustar índices aquí
                celda.textContent = '●';
                this.tablero[i-1][j] = casilla;
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
            return "Tocado";
        }
    
        casilla.setDisparado(true);

    const casillaId = `casilla-${x}-${y}`;
    const celda = document.getElementById(casillaId);
        if (casilla.getBarco() !== null) {
            this.IATocado(casilla);
            celda.classList.add('tocado');
            casilla.getBarco().setTocado(casilla.getBarco().getTocado() + 1);
            if (casilla.getBarco().getTocado() === casilla.getBarco().getLongitud()) {
                console.log(this.espacios() + "HUNDIDO!!!");
                this.IAHundido();
                casilla.getBarco().hundir();
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
            celda.classList.add('agua');
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
    

    IATocado(casillaDisparada) {}

    IAHundido() {}

    IAgua() {}

    espacios() {
        return "";
    }
    generarTablero(filas, columnas, contenedorId) {
        const contenedor = document.getElementById(contenedorId);
    
        for (let i = 0; i < filas; i++) {
            const row = document.createElement('div');
            row.className = 'row';
    
            for (let j = 0; j < columnas; j++) {
                const cell = document.createElement('div');
                cell.className = 'col-1 p-3 text-center border square';
                cell.textContent = i === 0 ? String.fromCharCode(65 + j) : '';
                row.appendChild(cell);
            }
    
            contenedor.appendChild(row);
        }
    }
}

