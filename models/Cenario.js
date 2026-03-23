class Cenario {
    constructor() {
        this.fase = 1
        this.offset = 0
        this.vel = 3

        // Uma imagem por fase
        this.fundos = {
            1: this._carregarImg('../assets/images/fase1.png'),
            2: this._carregarImg('../assets/images/fase2_ceu.png'),
            3: this._carregarImg('../assets/images/fase3_ceu.png'),
        }
    }

    _carregarImg(src) {
        const img = new Image()
        img.src = src
        return img
    }

    _desenharCamada(img, offset, y, h) {
        if (!img.complete || img.naturalWidth === 0) return
        const w = img.naturalWidth
        const ox = ((offset % w) + w) % w
        des.drawImage(img, -ox, y, w, h)
        des.drawImage(img, -ox + w, y, w, h)
    }

    desenhar() {
        // Fundo único rolando
        this._desenharCamada(this.fundos[this.fase], this.offset, 0, 500)


        // Linha de entrega
        des.strokeStyle = '#f1c40f'
        des.lineWidth = 5
        des.setLineDash([10, 6])
        des.beginPath()
        des.moveTo(600, 360)
        des.lineTo(600, 460)
        des.stroke()
        des.setLineDash([])

        // Placa de esdwsntrega
        des.fillStyle = 'rgba(0,0,0,0.55)'
        des.fillRect(608, 355, 84, 28)
        des.fillStyle = '#f1c40f'
        des.font = 'bold 13px Arial'
        des.textAlign = 'center'
        des.fillText('🚩 ENTREGA', 650, 374)
    }

    atualizarLinhas() {
        this.offset += this.vel
    }

    getNomeFase() {
        return { 1: 'CIDADE NOTURNA', 2: 'FLORESTA', 3: 'SERRA' }[this.fase] || ''
    }

    resetar() {
        this.fase = 1
        this.offset = 0
    }
}