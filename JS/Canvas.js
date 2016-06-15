var shapesDict = {};
var zoom;
var canvasWidth = 1920;
var canvasHeight = 1080;
var circlePoints = 20;
class Canvas {
    constructor() {
      this.movable = false;
      this.backgroundColour = color('#fff');
        //shapesDict.triangle = [createVector(25, 0), createVector(50, 50), createVector(0, 50)];
        //shapesDict.square = [createVector(0, 0), createVector(50, 0), createVector(50, 50),createVector(0, 50)];
        shapesDict.triangle =polygon(3) ;
        shapesDict.square = polygon(4);
        shapesDict.pentagon = polygon(5);
        shapesDict.hexagon = polygon(6);
        shapesDict.septagon = polygon(7);
        shapesDict.octagon = polygon(8);
        //x^2+y^2 = r^2
        //r = 25
        //y = sqrt(r^2 - x^2)


        shapesDict.circle = polygon(50)
        var shapes  = [];
        for (var i = 0; i < 40; i++) {
          for (var j = 0; j < 10; j++) {
            let s = floor(random(3));
            if(s ===0){var e = new Shape(51*i, 51*j, createVector(1,1), 0, false,shapesDict.septagon,{h:0,s:70,b:100});}
            if(s ===1){var e = new Shape(51*i, 51*j, createVector(1,1), 0, false,shapesDict.hexagon,{h:0,s:70,b:100});}
            if(s ===2){var e = new Shape(51*i, 51*j, createVector(1,1), 0, false,shapesDict.pentagon,{h:0,s:70,b:100});}
          current.push(e);
        }
        }
      this.drag = createVector(0, 0);
        this.scale = 1;

        this.x = (width/2)+ this.drag.x;
        this.y = (height/2)+ this.drag.y;
        this.ws = (0.9 * width * this.scale) / canvasWidth;
        this.hs = (0.9 * height * this.scale) / canvasHeight;
        this.s = 1;
        zoom = new Slider(width - 250, height - 31, 200, 10,1, 0.05, 3,function(){rescaleCanvas()});

    }
    draw() {


        //if (mouseX > this.x && mouseY > this.y && mouseX < this.x + (this.ws * canvasWidth) && mouseY < this.y + (this.hs * canvasHeight)) {cursor(HAND);} else {cursor(ARROW);}
        push();
        translate(this.x+this.drag.x, this.y+this.drag.y); //centering the canvas
        push()
        if (this.ws < this.hs) {
          this.s = this.ws;
        } else {
            this.s = this.hs;

        }
     scale(this.s);
        noStroke();
        fill(this.backgroundColour);
        rectMode(CENTER);
        rect(0, 0, canvasWidth, canvasHeight);
        this.drawElements();
        pop();
        pop();


        zoom.draw();//shows zoom slider
    }
    drawElements(){
      push();
      translate(-canvasWidth/2,-canvasHeight/2);
      current.forEach(drawItem);

      pop();
    }
    move(dx, dy) {

      this.drag.x -=dx*this.s;
      this.drag.y -=dy*this.s;

    }
}


function rescaleCanvas(){
  // rescale / repostions objects when a screen is resized
   if(typeof zoom != 'undefined'|| typeof canvas.drag !='undefined'){
     console.log('true1');
      canvas.scale = zoom.val;
      canvas.x = (width/2)+ canvas.drag.x;
      canvas.y = (height/2)+ canvas.drag.y;
      canvas.ws = (0.9 * width * canvas.scale) / canvasWidth;
      canvas.hs = (0.9 * height * canvas.scale) / canvasHeight;
    }

    }
