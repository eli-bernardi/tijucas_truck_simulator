class VeiculoInimigo extends Obj {
    constructor(x, y, w, h, src) {
        super(x, y, w, h, src)
        this.velocidade = 3.5
        this.dano = 10
        this.multa = 200
    }

    mov_car() {
        this.x -= this.velocidade
        if (this.x + this.w < 0) {
            this.x = 1200 + Math.random() * 400 
            this.y = Math.floor(Math.random() * 4) * 90 + 80
        } 
    }
    getDano() { return this.dano }
    getMulta() { return this.multa }
}  