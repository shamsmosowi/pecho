var elements = [];
var zoom;
var canvasWidth = 1920;
var canvasHeight = 1080;
class Canvas {
    constructor() {
        zoom = new Slider(1, width - 250, height - 35, 200, 10, 0.05, 2);
        this.scale = zoom.value;
        var e = new Shape(50, 50, 1, 20, [createVector(50, 50), createVector(100, 50), createVector(100, 100), createVector(50, 100)]);
        elements.push(e);
        this.drag = createVector(0, 0);
    }
    draw() {
        smooth();
        this.scale = zoom.value;
        //this.x = lerp((windowWidth/2 -(this.ws*1920)/2)+this.drag.x,this.x,8/10.0);
        //  this.y = lerp((windowHeight/2 -(this.hs*1080)/2)+this.drag.y,this.y, 8/10.0);
        this.x = (windowWidth / 2 - (this.ws * canvasWidth) / 2) + this.drag.x;
        this.y = (windowHeight / 2 - (this.hs * 1080) / 2) + this.drag.y;
        this.ws = (0.9 * width * this.scale) / canvasWidth;
        this.hs = (0.9 * height * this.scale) / 1080;
        if (mouseX > this.x && mouseY > this.y && mouseX < this.x + (this.ws * canvasWidth) && mouseY < this.y + (this.hs * canvasHeight)) {
            cursor(HAND);
        } else {
            cursor(ARROW);
        }
        push();
        translate(this.x + (this.ws / 2) * canvasWidth, this.y + (this.hs / 2) * canvasHeight); //centering the canvas
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

        elements.forEach(drawItem);
        pop();
        zoom.draw();
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
};

function copy(x) {
    var e = x;
    element.push(e);
}
