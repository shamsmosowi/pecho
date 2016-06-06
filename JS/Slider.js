
class Slider{
  constructor(value,x,y,w,h,start,end){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.startValue = start;
    this.endValue = end;
    this.value = value;
  }

  draw(){
    push();
    translate(this.x,this.y);
    noStroke();
    fill(70);
    rect(0,0,this.w,this.h,this.h/2,this.h/2,this.h/2,this.h/2);
    this.cx = map(this.value, this.startValue,this.endValue,0,this.w);
    fill(70);
    ellipse(this.cx,this.h/2,this.h*2,this.h*2);
    pop();
  }
  drag(){
    if (mouseX>this.x&&mouseX<this.w+this.x&&mouseY>this.y&&mouseY<this.h+this.y) {
      this.value =  map(mouseX,this.x,this.x+this.w,this.startValue,this.endValue);
    }
  }

}
class VariableSlider extends Slider{
  constructor(x,y,w,h,start,end){
  super(x,y,w,h,start,end);
  }
}
