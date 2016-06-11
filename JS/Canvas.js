var shapesDict = {};
var zoom;
var canvasWidth = 1920;
var canvasHeight = 1080;
var circlePoints = 20;
class Canvas {
    constructor() {
      this.backgroundColour = color('#fff');
        shapesDict.triangle = [createVector(25, 0), createVector(50, 50), createVector(0, 50)];
        shapesDict.square = [createVector(0, 0), createVector(50, 0), createVector(50, 50),createVector(0, 50)];
        //x^2+y^2 = r^2
        //r = 25
        //y = sqrt(r^2 - x^2)
        let circleVertices = []
         for (var i =0 ; i < 360; i+=(360/circlePoints)) {
           let xt = 25*cos(radians(i));
           let yt = 25*sin(radians(i));
           circleVertices.push(createVector(xt,yt));
         }

        shapesDict.circle = circleVertices;
        var shapes  = [];
        for (var i = 0; i < 40; i++) {
          for (var j = 0; j < 10; j++) {
            let s = floor(random(3));
            if(s ===0){var e = new Shape(51*i, 51*j, createVector(1,1), 0, false,shapesDict.triangle,{h:0,s:70,b:100});}
            if(s ===1){var e = new Shape(51*i, 51*j, createVector(1,1), 0, false,shapesDict.square,{h:0,s:70,b:100});}
            if(s ===2){var e = new Shape(51*i, 51*j, createVector(1,1), 0, false,shapesDict.circle,{h:0,s:70,b:100});}
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
        zoom = new Slider(1, width - 250, height - 31, 200, 10, 0.05, 2,function(){rescaleCanvas()});

    }
    draw() {


        if (mouseX > this.x && mouseY > this.y && mouseX < this.x + (this.ws * canvasWidth) && mouseY < this.y + (this.hs * canvasHeight)) {
            cursor(HAND);
        } else {
            cursor(ARROW);
        }
        push();
        translate(this.x, this.y); //centering the canvas
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




}


function rescaleCanvas(){
   if(typeof zoom != 'undefined'|| typeof canvas.drag !='undefined'){
     console.log('true1');
      canvas.scale = zoom.value;
      canvas.x = (width/2)+ canvas.drag.x;
      canvas.y = (height/2)+ canvas.drag.y;
      canvas.ws = (0.9 * width * canvas.scale) / canvasWidth;
      canvas.hs = (0.9 * height * canvas.scale) / canvasHeight;
    }

    }
