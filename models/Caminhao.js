class Caminhao extends Obj {
      constructor(x, y, w, h, a) {
            super(x, y, w, h, a); // 'a' agora é o caminho da imagem
            this.dir = 0;
            this.pos = 0;
            this.dinheiro = 1500;
            this.carga = 100;
            this.fase = 1;
            this.entregas = 0;
      }

      // Não precisamos mais do des_ret personalizado, pois a classe Obj já desenha a imagem
      // Mas podemos manter o método para adicionar a barra de carga por cima da imagem

      des_ret() {
            // Primeiro desenha a imagem do caminhão (chama o método da classe pai)
            super.des_ret();

            // Depois desenha a barra de carga por cima (se quiser manter)
            des.fillStyle = this.getCorCarga();
            let alturaCarga = (this.carga / 100) * 30;
            des.fillRect(this.x + 10, this.y + 10, 5, alturaCarga);

            // Desenha o texto da carga
            des.fillStyle = 'white';
            des.font = '12px Arial';
            des.textAlign = 'center';
            des.fillText(`${this.carga}%`, this.x + this.w / 2, this.y - 5);
      }

      getCorCarga() {
            if (this.carga > 70) return '#27ae60';
            if (this.carga > 30) return '#f39c12';
            return '#e74c3c';
      }

      mov_car() {
            this.x += this.dir;
            this.y += this.pos;

            // Limites da tela
            if (this.x < 0) this.x = 0;
            if (this.x > 460) this.x = 460;
            if (this.y < 100) this.y = 100;
            if (this.y > 550) this.y = 550;
      }

      sofrerDano(dano, multa) {
            this.carga = Math.max(0, this.carga - dano);
            this.dinheiro = Math.max(0, this.dinheiro - multa);
      }

      coletarDinheiro(valor) {
            this.dinheiro += valor;
      }

      recuperarCarga(valor) {
            this.carga = Math.min(100, this.carga + valor);
      }
}