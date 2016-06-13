var popUpTheme = {
    banner: '#34495E',
    boarder: '#95A5A6',
    body: '#ECF0F1',
    text: '#2C3E50',
    btn: '#2ECC71',
    disabledBtn: '#BDC3C7'
};
var popUpParams = {
    btns: [],
    swithes: [],
    steppers: [{
        new Stepper()
    }],
    sliders: []
}
class Popup {
    constructor(x, y, title, buttons, params) {
        this.title = title;
        this.x = x;
        this.y = y;
        this.parameters = params;
        this.w = 300;
        this.h = 40 + (params.btns.length + params.swithes.length + params.steppers.length)*30 + params.sliders.length*60;
        this.scale = 1;
    }
    draw() {
        push();
        translate();
        //  noStroke()
        stroke('#34495E')
        strokeWeight(3)
        fill(popUpTheme.body)
        rect(this.x, this.y, this.w, this.h, 10, 10, 10, 10);
        fill(popUpTheme.banner)
        rect(this.x, this.y, this.w, 30, 10, 10, 0, 0);
        fill(popUpTheme.body)
        noStroke();
        textSize(20)
        textAlign(CENTER)
        fill(255);

        text(this.title, this.x + this.w / 2, this.y + 22)
        pop();
    }
    drag(dx, dy) {
        this.x -= dx;
        this.y -= dy;

    }
    click() {

    }
    onUpdate() {


    }
    shake(){
      //when user trys to interact with the canvas without existing the dialog

    }
}
