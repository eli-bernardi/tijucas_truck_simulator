class Cenario {
    constructor() {
        this.fase = 1;
        this.velocidadeBase = 4;
    }

    desenhar() {
        let ctx = document.getElementById('des').getContext('2d');
        
        // Céu
        ctx.fillStyle = this.getCorCeu();
        ctx.fillRect(0, 0, 500, 700);
        
        // Estrada
        ctx.fillStyle = this.getCorEstrada();
        ctx.fillRect(0, 100, 500, 500);
        
        // Faixas laterais
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 200);
        ctx.lineTo(500, 200);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 500);
        ctx.lineTo(500, 500);
        ctx.stroke();
        
        // Linha central tracejada
        ctx.strokeStyle = this.getCorLinha();
        ctx.lineWidth = 3;
        ctx.setLineDash([20, 20]);
        ctx.beginPath();
        ctx.moveTo(0, 350);
        ctx.lineTo(500, 350);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Nome da fase
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.getNomeFase(), 250, 350);
    }

    getCorCeu() {
        const cores = {
            1: '#87CEEB',  // Céu azul
            2: '#3498db',  // Azul mais escuro
            3: '#2c3e50'   // Céu noturno
        };
        return cores[this.fase] || '#87CEEB';
    }

    getCorEstrada() {
        const cores = {
            1: '#34495e',
            2: '#2c3e50',
            3: '#1a1a2e'
        };
        return cores[this.fase] || '#34495e';
    }

    getCorLinha() {
        const cores = {
            1: '#f1c40f',
            2: '#e67e22',
            3: '#e74c3c'
        };
        return cores[this.fase] || '#f1c40f';
    }

    getNomeFase() {
        const nomes = {
            1: 'CIDADE',
            2: 'ESTRADA',
            3: 'SERRA'
        };
        return nomes[this.fase] || '';
    }

    getVelocidade() {
        const velocidades = {
            1: 4,
            2: 6,
            3: 8
        };
        return velocidades[this.fase] || 4;
    }

    avancarFase() {
        if (this.fase < 3) {
            this.fase++;
            return true;
        }
        return false;
    }

    resetar() {
        this.fase = 1;
    }
}