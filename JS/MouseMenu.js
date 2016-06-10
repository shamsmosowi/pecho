class MouseMenu {
    constructor(mousePos, menubtns) {
        this.visible = false;
        this.background = 30;
        this.backgroundf = 20;
        this.pos = mousePos;
        /*
menuDict.main = [1, 2, 3, 4];
menuDict.shapes = [1, 2, 3, 4, 5];
console.log(menuDict.shapes);
*/

/*
circumference of the mouse menu = button(width+padding)*n(number of buttons);
circumference = 2*pi*radius
rearrange for calculating the radius of the menu
r = c/2*pi
use r to calculate the position of the button using the polar cartian to polar
x = r × cos( θ )
y = r × sin( θ )
*/      this.btns = [];
        this.btnWidth = 70;
        this.padding = 15;
        this.r = ((this.padding+this.btnWidth)*menubtns.length)/(2*PI);
        for (var btns in menubtns) {
            if (menubtns.hasOwnProperty(btns)) {
              console.log(menubtns[btns]);
              let bx = this.r * cos(radians((360/menubtns.length)*btns));
              let by = this.r * sin(radians((360/menubtns.length)*btns));
              let btn = new Button({
        x: bx,
        y: by,
        w: this.btnWidth,
        h: this.btnWidth,
        s: 1.1,
        r: 0,
        img: menubtns[btns].img,
        enabled: true,
        name: menubtns[btns].name,
        call: function(){shapesCall();}

    },this.pos);
            this.btns.push(btn);
            }

        }


    }
    draw() {
        if (this.visible) {
            background(20, this.background);
            push()
            translate(this.pos.x, this.pos.y)
            this.btns.forEach(drawItem);
            pop()
        }
    }
    doubleClicked() {
        if (!this.visible) {
            this.menu = 'main'
            this.visible = true
        }
    }
    itemClicked() {


    }
    //TODO:add animations
    clicked(){

      this.btns.forEach(clickItem);
    }

}
