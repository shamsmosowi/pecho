
var zoom;
var canvasWidth = 1920;
var canvasHeight = 1080;
var redos = [];
class Canvas {
    constructor() {
      this.elements = [];
      this.elements.pop();
        zoom = new Slider(1, width - 250, height - 35, 200, 10, 0.05, 2);
        this.scale = zoom.value;
        var shapes  = [];
        for (var i = 0; i < 10; i++) {
          for (var j = 0; j < 10; j++) {
          var e = new Shape(60*i, 60*j, 1, 0, true,[createVector(50, 50), createVector(100, 50), createVector(100, 100), createVector(50, 100)],{h:0,s:70,b:100});
          shapes.push(e);
        }
        }
        this.elements = [shapes];

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
        this.drawElements();
        pop();
        push();
        pop();

        zoom.draw();//shows zoom slider
    }
    drawElements(){
      push();
      translate(-canvasWidth/2,-canvasHeight/2);
      if(this.elements.length>=1){
        let last = this.elements.length-1;

      this.elements[[last]].forEach(drawItem);}
      pop();

    }


}
function shiftValue(array,p,firstValue,lastValue){
  var property = p;
  var arraySize = array.length-1;
  var selectedArray = array;
  var h  = 0;
  var newArray = []
  var index = 0;
  selectedArray.forEach(x=> {const a = new Shape(1, 1, 1, 1, [],{});
   newArray.push(Object.assign(a,x));newArray[newArray.length-1][property] = firstValue+((lastValue-firstValue)/arraySize)*index;index+=1})


 canvas.elements.push(newArray);
}
