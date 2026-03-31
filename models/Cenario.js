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

    _desenharCamada(img, offset, y, h) {
        if (!img.complete || img.naturalWidth === 0) return
        const w = 1600
        const ox = ((offset % w) + w) % w
        des.drawImage(img, -ox, y, w, h)
        des.drawImage(img, -ox + w, y, w, h)
    }

    desenhar() {
        this._desenharCamada(this.fundos[this.fase], this.offset, 0, 500)

        // Linha de entrega
        des.strokeStyle = '#f1c40f'
        des.lineWidth = 5
        des.setLineDash([10, 6])
        des.beginPath()
        des.moveTo(1500, 0)
        des.lineTo(1500, 500)
        des.stroke()
        des.setLineDash([])

        // Placa de entrega
        des.fillStyle = 'rgba(0,0,0,0.55)'
        des.fillRect(1450, 10, 100, 28)   // ← corrigido
        des.fillStyle = '#f1c40f'
        des.font = 'bold 13px Arial'
        des.textAlign = 'center'
        des.fillText('🚩 ENTREGA', 1500, 29)  // ← corrigido
    }

    
    atualizarLinhas() {
        this.offset += this.vel
    }

    resetar() {
        this.fase = 1
        this.offset = 0
    }
}