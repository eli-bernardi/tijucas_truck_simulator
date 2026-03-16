class VeiculoInimigo extends Obj {
    constructor(x, y, w, h, a, velocidade, tipo) {
        super(x, y, w, h, a); // 'a' agora é o caminho da imagem
        this.velocidade = velocidade || 3 + Math.random() * 4;
        this.tipo = tipo || 'carroPequeno';
    }

    pos_x() {
        const posicoesFixas = [60, 130, 200, 270, 340, 410];
        return posicoesFixas[Math.floor(Math.random() * posicoesFixas.length)];
    }

    // Não precisamos mais do des_ret personalizado, a classe Obj já desenha a imagem
    // Mas podemos manter para adicionar informações extras

    des_ret() {
        // Desenha a imagem do veículo
        super.des_ret();

        // Opcional: desenhar o tipo do veículo como texto
        des.fillStyle = 'white';
        des.font = '10px Arial';
        des.textAlign = 'center';
        des.fillText(this.tipo, this.x + this.w / 2, this.y - 5);
    }

    mov_car() {
        this.y += this.velocidade;

        if (this.y > 750) {
            this.y = -100 - Math.random() * 200;
            this.x = this.pos_x();
            this.velocidade = 3 + Math.random() * 5;
        }
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