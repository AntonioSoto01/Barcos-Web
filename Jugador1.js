class Jugador1 extends Jugador {
    constructor() {
        super();
        this.ultTocado = null;
        this.estado = 1;
        this.nombreTablero='tableroMaquina'
    }

    getEstado() {
        return this.estado;
    }

    setEstado(estado) {
        this.estado = estado;
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
            } while (this.getCasilla(x, y).isDisparado() || !this.getCasilla(x, y).isPuededisparar());
        } else {
            let valido = true;
            do {
                valido = true;
                x = this.getUllTocado().getX();
                y = this.getUllTocado().getY();
                switch (this.getEstado()) {
                    case 1:
                        x++;
                        break;
                    case 2:
                        x--;
                        break;
                    case 3:
                        y++;
                        break;
                    case 4:
                        y--;
                        break;
                }
                if (y >= this.getY() || y < 0 || x < 0 || x >= this.getX() || this.getCasilla(x, y).isDisparado() || !this.getCasilla(x, y).isPuededisparar()) {
                    this.actuUllTocado(this.getEstado());
                    this.setEstado(this.getEstado() + 1);
                    valido = false;
                }
            } while (!valido);
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
                } catch (error) {}
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
                break;
            case 3:
                this.setUllTocado(this.getCasilla(this.getUllTocado().getX(), this.getUllTocado().getY() - tocado + 1));
                break;
        }
    }

    IATocado(casillaDisparada) {
        this.setUllTocado(casillaDisparada);
    }

    IAHundido() {
        this.getUllTocado().getBarco().puededisparar();
        this.setUllTocado(null);
        this.setEstado(1);
    }

    IAgua() {
        if (this.getUllTocado() !== null) {
            this.actuUllTocado(this.getEstado());
            this.setEstado(this.getEstado() + 1);
        }
    }

    espacios() {
        return " ".repeat(130);
    }
}
