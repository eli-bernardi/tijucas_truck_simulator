class Caminhao extends Obj {
      constructor(x, y, w, h, src) {
            super(x, y, w, h, src)
            this.dir = 0  // movimento horizontal (A/D)
            this.pos = 0  // movimento vertical (W/S)
            this.dinheiro = 1500
            this.carga = 100
            this.fase = 1
            this.entregas = 0
      }

      des_ret() {
            super.des_ret()
            this.desenharBarraCarga()
            this.desenharTexto()
      }

      desenharBarraCarga() {
            // Barra HORIZONTAL de carga (em vez de vertical)
            des.fillStyle = this.getCorCarga()
            let larguraCarga = (this.carga / 100) * this.w
            des.fillRect(this.x, this.y - 10, larguraCarga, 6)

            des.strokeStyle = '#000000'
            des.lineWidth = 1
            des.strokeRect(this.x, this.y - 10, this.w, 6)
      }

      desenharTexto() {
            des.fillStyle = '#FFFFFF'
            des.font = 'bold 13px Arial'
            des.textAlign = 'center'
            des.shadowColor = '#000000'
            des.shadowBlur = 4
            des.fillText(`${this.carga}%`, this.x + this.w / 2, this.y - 16)
            des.shadowBlur = 0
      }

      getCorCarga() {
            if (this.carga > 70) return '#27ae60'
            if (this.carga > 30) return '#f39c12'
            return '#e74c3c'
      }

      mov_car() {
            this.x += this.dir  // A/D = esquerda/direita
            this.y += this.pos  // W/S = cima/baixo (dentro da pista)

            // Limites horizontais: não pode sair pela esquerda nem chegar à zona de entrega
            if (this.x < 20) this.x = 20
            if (this.x > 560) this.x = 560

            // Limites verticais: dentro da estrada (faixas)
            if (this.y < 70) this.y = 70
            if (this.y > 390) this.y = 390
      }

      sofrerDano(dano, multa) {
            this.carga = Math.max(0, this.carga - dano)
            this.dinheiro = Math.max(0, this.dinheiro - multa)
      }

      coletarDinheiro(valor) { this.dinheiro += valor }
      recuperarCarga(valor) { this.carga = Math.min(100, this.carga + valor) }
}