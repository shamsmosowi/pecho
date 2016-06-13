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
*/
        this.mbtns = [];
        this.btnWidth = 70;
        this.padding = 15;
        this.r = ((this.padding+this.btnWidth)*menubtns.length)/(2*PI);
        for (var i = 0; i< menubtns.length;i++) {


              let bx = this.pos.x+this.r * cos(radians((360/menubtns.length)*i));
              let by = this.pos.y+this.r * sin(radians((360/menubtns.length)*i));
              let btn = new Button({
        x: bx,
        y: by,
        w: this.btnWidth,
        h: this.btnWidth,
        s: 1.1,
        r: 0,
        img: menubtns[i].img,
        enabled: true,
        name: menubtns[i].name,
        call: menubtns[i].call

    },this.pos);
            this.mbtns.push(btn);


        }


    }
    draw() {
        if (this.visible) {
           background(20, this.background);
          //  push()
            //translate(this.pos.x, this.pos.y)
           this.mbtns.forEach(drawItem);

          //  pop()
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

      this.mbtns.forEach(clickItem);
    }

}


function shapesCall() {
    //console.log(this);
    let mousePos = createVector(mouseX, mouseY);
    let menubs = [{
        name: 'triangle',
        img: btnImgDict.triangle,
        call: function() {


        }
    }, {
        name: 'square',
        img: btnImgDict.square,
        call: function() {

        }
    }, {
        name: 'polygon',
        img: btnImgDict.polygon,
        call: function() {

        }
    }, {
        name: 'circle',
        img: btnImgDict.circle,
        call: function() {

        }
    }];
    //  mouseMenu.pos = createVector(mouseX,mouseY);
    let mb = new MouseMenu(mousePos, menubs);
    //mouseMenu.pop();
    mouseMenu.push(mb);
    mouseMenu[mouseMenu.length - 1].visible = true;


}
