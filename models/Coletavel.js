class Coletavel extends Obj {
    constructor(x, y, w, h, src, tipo) {
        super(x, y, w, h, src)
        this.tipo = tipo
        this.velocidade = 4
    }
    mov_car() {
        
        this.x -= this.velocidade
    }
}