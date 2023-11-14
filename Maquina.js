class Maquina extends Jugador {
    constructor() {
        super();
        this.ultTocado = null;
        this.estado = 0;
        this.nombreTablero = 'tableroMaquina'
    }

    getDireccion() {
        return this.estado;
    }

    setDireccion(direccion) {
        this.estado = direccion;
    }

    getUllTocado() {
        return this.ultTocado;
    }

    setUllTocado(ultidisparo) {
        this.ultTocado = ultidisparo;
    }

    casillaDisparada() {
        let x = 0;
        let y = 0;
        let casillaDisparada = null;

        if (this.getUllTocado() === null) {
            do {
                x = Math.floor(Math.random() * this.getX());
                y = Math.floor(Math.random() * this.getY());
            } while (this.getCasilla(x, y).isDisparado() || !this.getCasilla(x, y).isPuedeDisparar());
        } else {
            let valido = false;

            while (!valido) {
                x = this.getUllTocado().getX();
                y = this.getUllTocado().getY();

                switch (this.getDireccion()) {
                    case 1: x++; break;
                    case 2: x--; break;
                    case 3: y++; break;
                    case 4: y--; break;
                }

                valido = (y < this.getY() && y >= 0 && x >= 0 && x < this.getX() &&
                    !this.getCasilla(x, y).isDisparado() && this.getCasilla(x, y).isPuedeDisparar());

                if (!valido) {
                    this.cambiarDireccion();
                }
            }
        }

        casillaDisparada = this.getCasilla(x, y);
        console.log(this.espacios() + "Dispara a " + casillaDisparada.toString());
        return casillaDisparada;
    }

    Comprobaralrededor(x, y) {
        let i = x - 1;
        let j = y - 1;
        let valido = true;
        while (i <= x + 1 && valido) {
            j = y - 1;
            while (j <= y + 1 && valido) {
                try {
                    if ((this.getCasilla(i, j).getBarco() !== null && this.getCasilla(i, j) !== this.getUllTocado()) && this.getCasilla(i, j).isDisparado()) {
                        valido = false;
                    }
                } catch (error) { }
                j++;
            }
            i++;
        }
        return valido;
    }

    actuUllTocado(estado) {
        let tocado = this.getUllTocado().getBarco().getTocado();
        switch (estado) {
            case 1:
                this.setUllTocado(this.getCasilla(this.getUllTocado().getX() - tocado + 1, this.getUllTocado().getY()));
                console.log("abajo")
                break;
            case 2:
                this.setUllTocado(this.getCasilla(this.getUllTocado().getX() + tocado - 1, this.getUllTocado().getY()));
                console.log("arriba")
                break;
            case 3:
                this.setUllTocado(this.getCasilla(this.getUllTocado().getX(), this.getUllTocado().getY() - tocado + 1));
                console.log("derecha")
                break;
            case 4:
                this.setUllTocado(this.getCasilla(this.getUllTocado().getX(), this.getUllTocado().getY() + tocado - 1));
                console.log("izquierda")
                break;
        }
    }

    IATocado(casillaDisparada) {
        if (this.getUllTocado() == null) {
            this.setDireccion(Math.floor(Math.random() * 4) + 1);
        }
        this.setUllTocado(casillaDisparada);
    }

    IAHundido() {

        this.getUllTocado().getBarco().puedeDisparar();
        this.setUllTocado(null);
        this.setDireccion(0);
    }

    IAgua() {
        if (this.getUllTocado() !== null) {

            this.cambiarDireccion();



        }
    }

    espacios() {
        return " ".repeat(130);
    }
    cambiarDireccion() {
        const tocado = this.getUllTocado().getBarco().getTocado();
    
        if (tocado > 1) {
            this.actuUllTocado(this.getDireccion());
            this.setDireccion(this.getDireccion() + (this.getDireccion() % 2 !== 0 ? 1 : -1));
        } else {
            this.setDireccion(Math.floor(Math.random() * 4) + 1);
        }
    }
}
