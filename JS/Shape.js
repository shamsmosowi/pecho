function polygon(sides){
//polygon creates a shape with n sides, used to create different geometetric shapes
  let polygonVertices = []
   for (var i =0 ; i < 360; i+=(360/sides)) {
     let xt = 25*cos(radians(i));
     let yt = 25*sin(radians(i));
     polygonVertices.push(createVector(xt,yt));
   }
      return polygonVertices
}


class Shape extends Element{
  constructor(x, y, s,r,selected,v,colour){
    super(x,y,s,r,selected);
    this.vertices = v;
    this.hue = colour.h;
    this.saturation = colour.s;
    this.brightness = colour.b;
    this.cx = 0;
    this.cy = 0;
    this.vertices.forEach(x=>{this.cx+=x.x;this.cy+=x.y});
    this.cx = this.cx/this.vertices.length;
    this.cy = this.cy/this.vertices.length;


  }
  draw(){
      push();

      translate(this.x,this.y);
      push();

        scale(this.scaleX*this.scale,this.scaleY*this.scale);
      push();
      rotate(radians(this.rotation));
      fill(this.hue,this.saturation,this.brightness);
      beginShape();
      this.vertices.forEach(x=> vertex(x.x,x.y));
      endShape(CLOSE);
      if(this.selected){
        //unefficent, reduces fps to 1/4
        strokeWeight(1);
        beginShape();
        this.vertices.forEach(x=> {vertex(x.x,x.y);fill('#2D3E50');noStroke();rect(x.x,x.y,3/this.scaleX,3/this.scaleY)});
          noFill();stroke('#2D3E50');
        endShape(CLOSE);
      }

      pop();
      pop();
      pop();
      fill(0);


  }
  clicked() {
        if(dist(mouseX,mouseY,canvas.x+((this.x+this.cx-canvasWidth/2)*canvas.s),canvas.y+((this.y+this.cy-canvasHeight/2)*canvas.s))<25*Math.sqrt(pow(this.scaleX*canvas.s,2)+pow(this.scaleY*canvas.s,2)))
        {
        this.selected =true;
        }else{

    }
  }
}
