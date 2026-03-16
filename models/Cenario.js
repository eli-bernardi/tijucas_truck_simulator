class Cenario {
    constructor() {
        this.fase = 1
        this.velocidadeBase = 4
        this.linhasEstrada = []
    }
    criarLinhas() {
        this.linhasEstrada = [];
        for (let i = 0; i < 5; i++) {
            this.linhasEstrada.push(new LinhaEstrada(245, i * 150 - 100, 10, 40, '#ffffff'));
        }
    }

    desenhar() {

        // Estrada
        des.fillStyle = '#2c3e50';
        des.fillRect(0, 0, 500, 700);

        // Faixas laterais
        des.strokeStyle = '#ecf0f1';
        des.lineWidth = 3;
        des.beginPath();
        des.moveTo(30, 0);
        des.lineTo(30, 700);
        des.stroke();
        des.beginPath();
        des.moveTo(470, 0);
        des.lineTo(470, 700);
        des.stroke();

        // Linhas da estrada (efeito de movimento)
        this.linhasEstrada.forEach(linha => linha.des_ret());

        // Linha de chegada
        des.strokeStyle = '#f1c40f';
        des.lineWidth = 5;
        des.beginPath();
        des.moveTo(0, 100);
        des.lineTo(500, 100);
        des.stroke();

        // Placa de "ENTREGA"
        des.fillStyle = '#f1c40f';
        des.font = 'bold 16px Arial';
        des.textAlign = 'center';
        des.fillText('🚩 ENTREGA', 250, 90);

        // Nome da fase
        des.fillStyle = 'rgba(255, 255, 255, 0.3)';
        des.font = '30px Arial';
        des.textAlign = 'center';
        des.fillText(this.getNomeFase(), 250, 350);
    }

    // Método para atualizar as linhas da estrada
    atualizarLinhas() {
        this.linhasEstrada.forEach(linha => linha.mov_car());
    }

    // Método para obter o nome da fase
    getNomeFase() {
        const nomes = {
            1: 'CIDADE',
            2: 'ESTRADA',
            3: 'SERRA'
        };
        return nomes[this.fase] || '';
    }

    // Método para obter a velocidade da fase
    getVelocidade() {
        const velocidades = {
            1: 4,
            2: 6,
            3: 8
        };
        return velocidades[this.fase] || 4;
    }

    // Método para avançar de fase
    avancarFase() {
        if (this.fase < 3) {
            this.fase++;
            return true;
        }
        return false;
    }

    // Método para resetar o cenário
    resetar() {
        this.fase = 1;
        this.criarLinhas(); // Recria as linhas
    }
}