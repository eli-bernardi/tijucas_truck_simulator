class LinhaEstrada extends Obj {
    constructor(x, y, w, h, a) {
        super(x, y, w, h, a)
        this.velocidade = 5
    }

    mov_car() {
        this.y += this.velocidade
        
        if (this.y > 700) {
            this.y = -50
        }
    }
}