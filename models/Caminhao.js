class Caminhao extends Obj {
      constructor(x, y, w, h, src) {
            super(x, y, w, h, src);
            this.dir = 0;
            this.pos = 0;
            this.dinheiro = 1500;
            this.carga = 100;
            this.fase = 1;
            this.entregas = 0;
      }

      des_ret() {
            // Desenha a imagem do caminhão
            super.des_ret()

            // UI em cima da imagem (sempre desenha, independente da imagem)
            this.desenharBarraCarga()
            this.desenharTexto()
      }

      desenharBarraCarga() {
            // Barra vertical de carga
            des.fillStyle = this.getCorCarga()
            let alturaCarga = (this.carga / 100) * 30
            des.fillRect(this.x + 5, this.y + 5, 8, alturaCarga)

            // Contorno da barra
            des.strokeStyle = '#000000'
            des.lineWidth = 1
            des.strokeRect(this.x + 5, this.y + 5, 8, 30)
      }

      desenharTexto() {
            // Porcentagem da carga
            des.fillStyle = '#FFFFFF'
            des.font = 'bold 14px Arial'
            des.textAlign = 'center'
            des.shadowColor = '#000000'
            des.shadowBlur = 4
            des.fillText(`${this.carga}%`, this.x + this.w / 2, this.y - 10)
            des.shadowBlur = 0

            // Dinheiro (opcional)
            des.font = '12px Arial'
            des.fillStyle = '#FFFF00'
            des.fillText(`R$ ${this.dinheiro}`, this.x + this.w / 2, this.y - 25)
      }

      getCorCarga() {
            if (this.carga > 70) return '#27ae60'  // Verde
            if (this.carga > 30) return '#f39c12'  // Laranja
            return '#e74c3c'  // Vermelho
      }

      mov_car() {
            this.x += this.dir
            this.y += this.pos

            // Limites da tela
            if (this.x < 0) this.x = 0;
            if (this.x > 460) this.x = 460
            if (this.y < 100) this.y = 100
            if (this.y > 550) this.y = 550
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