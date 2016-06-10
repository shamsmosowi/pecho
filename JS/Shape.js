class Shape extends Element{
  constructor(x, y, s,r,selected,v,colour){
    super(x,y,s,r,selected);
    this.vertices = v;
    this.hue = colour.h;
    this.saturation = colour.s;
    this.brightness = colour.b;
  }
  draw(){
    //TODO:join shape and Graphic draw functions boilers
      push();

      translate(this.x,this.y);
      push();

        scale(this.scale);
      push();
      rotate(radians(this.rotation));
      fill(this.hue,this.saturation,this.brightness);
      beginShape();
      this.vertices.forEach(x=> vertex(x.x,x.y));
      endShape(CLOSE);
      if(this.selected){

        /*

        //unefficent, reduces fps to ~11(39fps without it)

        strokeWeight(1);
        beginShape();
        this.vertices.forEach(x=> {vertex(x.x,x.y);fill('#2D3E50');noStroke();rect(x.x,x.y,3,3)});
          noFill();stroke('#2D3E50');
        endShape(CLOSE);*/
      }
      pop();
      pop();
      pop();
  }
}
