class Obj {
    constructor(x, y, w, h, a) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a; // cor ou imagem
    }

    des_ret() {
        des.fillStyle = this.a;
        des.fillRect(this.x, this.y, this.w, this.h);
    }
}