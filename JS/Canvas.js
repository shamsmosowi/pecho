var elements = [];
var zoom;
var canvasWidth = 1920;
var canvasHeight = 1080;
class Canvas {
    constructor() {
        zoom = new Slider(1, width - 250, height - 35, 200, 10, 0.05, 2);
        this.scale = zoom.value;
        for (var i = 0; i < 10; i++) {
          for (var j = 0; j < 10; j++) {
          var e = new Shape(50*i, 50*j, 1, 20, [createVector(50, 50), createVector(100, 50), createVector(100, 100), createVector(50, 100)]);
          elements.push(e);
        }
        }

        this.drag = createVector(0, 0);
    }
    draw() {
        smooth();
        this.scale = zoom.value;
        this.x = (width/2)+ this.drag.x;
        this.y = (height/2)+ this.drag.y;
        this.ws = (0.9 * width * this.scale) / canvasWidth;
        this.hs = (0.9 * height * this.scale) / 1080;
        if (mouseX > this.x && mouseY > this.y && mouseX < this.x + (this.ws * canvasWidth) && mouseY < this.y + (this.hs * canvasHeight)) {
            cursor(HAND);
        } else {
            cursor(ARROW);
        }
        push();
        translate(this.x, this.y); //centering the canvas

        if (this.ws < this.hs) {
            scale(this.ws);
        } else {
            scale(this.hs);
        }
        //  scale(this.ws,this.hs);
        noStroke();
        fill(255);
        rectMode(CENTER);
        rect(0, 0, canvasWidth, canvasHeight);
        push();
        translate(-this.ws*1920,-this.hs*1080);
        elements.forEach(drawItem);
        pop();
        pop();
        zoom.draw();//shows zoom slider
    }
    drawElements(){


    }

}
window.onresize = function() {
    // centers canvas

    canvas.x = ((width / 2) - (canvas.ws * canvasWidth) / 2) + canvas.drag.x;
    canvas.y = ((height / 2) - (canvas.hs * canvasHeight) / 2) + canvas.drag.y;
    //keeps zoom bar & btns in its postion during window rescaling
    zoom.x = width - 240;
    zoom.y = height - 30;
    btnsArray.zoomOut.x = width - 270;
    btnsArray.zoomOut.y = height - 30;
    btnsArray.zoomIn.x = width - 30;
    btnsArray.zoomIn.y = height - 30;
    btnsArray.settings.x = width -30;
};
