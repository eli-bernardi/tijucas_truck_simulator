class Caminhao extends Obj {
      constructor(x, y, w, h, src) {
            super(x, y, w, h, src)
            this.dir = 0
            this.pos = 0
            this.dinheiro = 1500
            this.carga = 100
            this.fase = 1
            this.entregas = 0
      }

      getCorCarga() {
            if (this.carga > 70) return '#27ae60'
            if (this.carga > 30) return '#f39c12'
            return '#e74c3c'
      }

      mov_car() {
            this.x += this.dir
            this.y += this.pos
            if (this.x < 20) this.x = 20
            if (this.x > 560) this.x = 560
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