class Graphic extends Element {
    constructor(x, y, s, r, src) {
        this.img = (src);
    }
    draw() {
        push();
        rotate(this.rotation);
        scale(this.scale);
        push();
        translate(this.x, this.y);
        pop();
        pop();
    }
}
