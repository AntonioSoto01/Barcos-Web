class Jugador {
    constructor() {
        this.x = 12;
        this.y = 12;
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
            celda.id = `casilla-${i}-${j}`
            celda.textContent = '●'; 

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
document.querySelectorAll('.square').forEach(celda => {
    celda.addEventListener('click', () => {
        const x = parseInt(celda.parentElement.querySelector('.square').textContent) - 1; 
        const y = celda.cellIndex - 1; 
        const resultado = this.disparado(x, y); 
        console.log(resultado);
    });
});

