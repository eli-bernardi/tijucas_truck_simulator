class VeiculoInimigo extends Obj {
    constructor(x, y, w, h, a, tipo) {
        super(x, y, w, h, a); // 'a' é o caminho da imagem
        this.vel = 2; // Velocidade fixa
        this.tipo = tipo || 'carroPequeno';
    }

    // Método para reiniciar posição no topo
    recomeca() {
        this.y = -100;
        this.x = Math.floor(Math.random() * (460 - 60) + 60);
    }

    // Método de movimento (vertical)
    mov_car() {
        this.y += this.vel;

        if (this.y > 750) {
            this.recomeca();
        }
    }

    // Desenha o veículo
    des_ret() {
        super.des_ret(); // Desenha a imagem

        // Opcional: mostrar o tipo
        des.fillStyle = 'white';
        des.font = '10px Arial';
        des.textAlign = 'center';
        des.fillText(this.tipo, this.x + this.w / 2, this.y - 5);
    }

    getMulta() {
        const multas = {
            'carroPequeno': 100,
            'carroGrande': 200,
            'caminhao': 400,
            'moto': 50
        };
        return multas[this.tipo] || 100;
    }

    getDano() {
        const danos = {
            'carroPequeno': 5,
            'carroGrande': 15,
            'caminhao': 30,
            'moto': 5
        };
        return danos[this.tipo] || 5;
    }
}