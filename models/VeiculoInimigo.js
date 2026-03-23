class VeiculoInimigo extends Obj {
    constructor(x, y, w, h, src) {
        super(x, y, w, h, src)
        this.velocidade = 3.5
        this.dano = 20
        this.multa = 200
    }

    mov_car() {
        // Move da DIREITA para a ESQUERDA
        this.x -= this.velocidade

        // Quando sai pela esquerda, reposiciona à direita
        if (this.x + this.w < 0) {
            this.x = 700 + Math.random() * 300
            // Sorteia nova faixa vertical
            this.y = Math.floor(Math.random() * 4) * 90 + 80
        }
    }

    getDano() { return this.dano }
    getMulta() { return this.multa }
}