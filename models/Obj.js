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
            this.imgCarregada = true
        }
        this.img.onerror = () => {
            this.imgCarregada = false
        }
        this.img.src = src
    }

    des_ret() {
        if (this.imgCarregada) {
            des.drawImage(this.img, this.x, this.y, this.w, this.h)
        } else {
            this.desenharFallback()
        }
    }

    desenharFallback() {
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
    }
}
