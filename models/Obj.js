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

    des_ret(ctx) {
        if (this.imgCarregada) {
            ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        } else {
            this.desenharFallback(ctx)
        }
    } 
    
    desenharFallback(ctx) {
        ctx.fillStyle = '#FF0000'
        ctx.fillRect(this.x, this.y, this.w, this.h)
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x + this.w, this.y + this.h)
        ctx.moveTo(this.x + this.w, this.y)
        ctx.lineTo(this.x, this.y + this.h)
        ctx.stroke()
    }
}
