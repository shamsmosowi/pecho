class Shape extends Element{
  constructor(x, y, s,r,v){
    super(x,y,s,r);
    this.vertices = v;
  }
  draw(){
    //TODO:join shape and Graphic draw functions boilers
      push();
      rotate(radians(this.rotation));
      scale(this.scale);
      push();
      translate(this.x,this.y);
      fill(0);
      beginShape();
      this.vertices.forEach(x=> vertex(x.x,x.y));
      endShape(CLOSE);
      pop();
      pop();
  }
}
