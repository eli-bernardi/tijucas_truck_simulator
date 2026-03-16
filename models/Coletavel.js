class Coletavel extends Obj {
    constructor(x, y, w, h, a, tipo) {
        super(x, y, w, h, a);
        this.tipo = tipo;
        this.velocidade = 4;
    }

    des_ret() {
        des.fillStyle = this.a;
        des.beginPath();
        des.arc(this.x + this.w/2, this.y + this.h/2, this.w/2, 0, Math.PI*2);
        des.fill();
        
        des.fillStyle = 'white';
        des.font = '16px Arial';
        des.textAlign = 'center';
        des.fillText(this.tipo === 'dinheiro' ? '💰' : '📦', this.x + 12, this.y + 18);
    }

    mov_car() {
        this.y += this.velocidade;
    }
}