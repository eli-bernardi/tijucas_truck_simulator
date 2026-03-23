class Coletavel extends Obj {
    constructor(x, y, w, h, src, tipo) {
        super(x, y, w, h, src)  // src já é o caminho da imagem
        this.tipo = tipo
        this.velocidade = 4
    }

    // des_ret() herdado do Obj — já desenha a imagem automaticamente

    mov_car() {
        this.x -= this.velocidade
    }
}