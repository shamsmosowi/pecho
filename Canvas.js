var elements = [];
var zoom;
class Canvas {
    constructor() {
      zoom = new Slider(1,width - 220,height-20,200,10,0.1,3);
        this.scale = zoom.value;
        var e = new Shape(50,50,1,20,[createVector(50,50),createVector(100,50),createVector(100,100),createVector(50,100)]);
        elements.push(e);
    }
    draw(){
        this.scale = zoom.value;
      this.ws = (((0.9*width*this.scale)/1000));
      this.hs = (((0.9*height*this.scale)/1000));
      push();
      translate(width/2 -(this.ws*1000)/2,height/2 - (this.hs*1000)/2);//centering the canvas

      scale(this.ws,this.hs);
      noStroke();
      fill(255);
      rect(0,0,1000,1000);

      elements.forEach(drawItem);
      pop();
      zoom.draw();
    }

}
window.onresize = function() {
    //keeps zoom bar in its postion during window rescaling
    zoom.x = width - 220;
    zoom.y = height - 20;
};
function mouseDragged(){

  zoom.drag();

}
