class Obj {
    constructor(x, y, w, h, src) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.src = src
        this.img = new Image()
        this.imgCarregada = false

        this.img.onload = () => {
            console.log('✅ Imagem carregada:', src)
            this.imgCarregada = true
        }

        this.img.onerror = (erro) => {
            console.error('❌ Erro ao carregar imagem:', src, erro)
            // Cria uma imagem de erro visual
            this.imgCarregada = false
        }

        this.img.src = src
    }

    des_ret() {
        if (this.imgCarregada && this.img) {
            try {
                des.drawImage(this.img, this.x, this.y, this.w, this.h)
            } catch (e) {
                console.error('Erro ao desenhar:', e)
                this.desenharFallback()
            }
        } else {
            this.desenharFallback()
        }
    }

    desenharFallback() {
        // Desenha um quadrado vermelho com X quando a imagem não carrega
        des.fillStyle = '#FF0000'
        des.fillRect(this.x, this.y, this.w, this.h)

        des.strokeStyle = '#FFFFFF'
        des.lineWidth = 3
        des.beginPath()
        des.moveTo(this.x, this.y)
        des.lineTo(this.x + this.w, this.y + this.h)
        des.moveTo(this.x + this.w, this.y)
        des.lineTo(this.x, this.y + this.h)
        des.stroke()

        des.fillStyle = '#FFFFFF'
        des.font = '10px Arial'
        des.textAlign = 'center'
        des.fillText('SEM IMG', this.x + this.w / 2, this.y + this.h / 2)
    }
}