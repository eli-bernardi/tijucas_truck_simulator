class Cenario {
    constructor() {
        this.fase = 1
        this.offset = 0
        this.vel = 3

        this.fundos = {
            1: this._carregarImg('../assets/images/game/fase1.png'),
            2: this._carregarImg('../assets/images/game/fase2.png'),
            3: this._carregarImg('../assets/images/game/fase3.png'),
        }
    }

    _carregarImg(src) {
        const img = new Image()
        img.src = src
        return img
    }

    _desenharCamada(ctx, img, offset, y, h) {
        if (!img.complete || img.naturalWidth === 0) return
        const w = 1600
        const ox = ((offset % w) + w) % w
        ctx.drawImage(img, -ox, y, w, h)
        ctx.drawImage(img, -ox + w, y, w, h)
    }

    desenhar(ctx) {
        const img = this.fundos[this.fase]
        this._desenharCamada(ctx, img, this.offset, 0, 500)

        // Linha de entrega
        ctx.strokeStyle = '#f1c40f'
        ctx.lineWidth = 5
        ctx.setLineDash([10, 6])
        ctx.beginPath()
        ctx.moveTo(1150, 0)
        ctx.lineTo(1150, 500)
        ctx.stroke()
        ctx.setLineDash([])

        // Placa de entrega
        ctx.fillStyle = 'rgba(0,0,0,0.55)'
        ctx.fillRect(1100, 10, 100, 28)
        ctx.fillStyle = '#f1c40f'
        ctx.font = 'bold 13px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('🚩 ENTREGA', 1150, 29)
    }

    atualizarLinhas() {
        this.offset += this.vel
    }
 
    resetar() {
        this.fase = 1
        this.offset = 0
    }
}