class Casilla {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.disparado = false;
        this.puedeBarco = true;
        this.puedeDisparar = true;
        this.barco = null;
    }

    toString() {
        return String.fromCharCode('A'.charCodeAt(0) + this.y) + (this.x + 1);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    isPuedeDisparar() {
        return this.puedeDisparar;
    }

    setPuedeDisparar(puedeDisparar) {
        this.puedeDisparar = puedeDisparar;
    }

    isPuedeBarco() {
        return this.puedeBarco;
    }

    setPuedeBarco(puedeBarco) {
        this.puedeBarco = puedeBarco;
    }

    isDisparado() {
        return this.disparado;
    }

    setDisparado(disparado) {
        this.disparado = disparado;
    }

    getBarco() {
        return this.barco;
    }

    setBarco(barco) {
        this.barco = barco;
    }
}
