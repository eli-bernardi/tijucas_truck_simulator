class Caminhao extends Obj {
      constructor(x, y, w, h, src) {
            super(x, y, w, h, src)
            this.dir = 0
            this.pos = 0
            this.dinheiro = 1500
            this.carga = 100
            this.fase = 1
            this.entregas = 0

            // Imagens por fase
            this.imagensFase = {
                  1: { src: '../assets/images/veiculo/caminhao_madeira.png', w: 400, h: 120 },
                  2: { src: '../assets/images/veiculo/caminhao_bau.png', w: 260, h:80 },
                  3: { src: '../assets/images/veiculo/1620_cacamba.png', w: 250 , h: 80 },
            }
      }

      trocarImagemFase(fase) {
            const dados = this.imagensFase[fase]
            this.w = dados.w
            this.h = dados.h
            this.img.src = dados.src
            this.imgCarregada = false
            this.img.onload = () => this.imgCarregada = true
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
            if (this.x > 1580) this.x = 1580
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