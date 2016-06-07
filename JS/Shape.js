class Shape extends Element{
  constructor(x, y, s,r,selected,v,colour){
    super(x,y,s,r,selected);
    this.vertices = v;
    this.hue = colour.h;
    this.saturation = colour.s;
    this.brigthness = colour.b;
  }
  draw(){
    //TODO:join shape and Graphic draw functions boilers
      push();
      rotate(radians(this.rotation));
      scale(this.scale);
      push();
      translate(this.x,this.y);
      fill(this.hue,this.saturation,this.brigthness);
      beginShape();
      this.vertices.forEach(x=> vertex(x.x,x.y));
      endShape(CLOSE);
      pop();
      pop();
  }
}
