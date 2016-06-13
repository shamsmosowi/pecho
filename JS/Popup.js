var popUpTheme = {
    banner: '#34495E',
    boarder: '#95A5A6',
    body: '#ECF0F1',
    text: '#2C3E50',
    btn: '#2ECC71',
    disabledBtn: '#BDC3C7'
};
class Popup() {
    constructor(x, y, title, params) {
        this.title = title;
        this.x = 0;
        this.y = 0;
        this.parameters = params;
        
        this.w = 100;
        this.h = 100;
        this.scale = 1;


    }
    draw() {
        push();
        translate();
        fill()
        rect(thid.x, this.y, this.w, this.h);
        pop();
    }
    drag(dx,dy) {
      this.x -= dx;
      this.y -= dy;

    }
    click() {

    }
    onUpdate() {


    }
}
