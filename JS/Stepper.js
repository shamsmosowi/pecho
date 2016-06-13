class Stepper{
  constructor(x,y,size,val,step,min,max){
    this.x = x;
    this.y = y;
    this.c = 0;
    this.step = step;
    this.val = val;
    this.w = 3*size;
    this.h = size;
    this.min = min;
    this.max = max;

  }

  draw(){

    push();
    translate(this.x,this.y);
    textSize(26);
    stroke('#34495E');
    strokeWeight(2);
    fill('#ECF0F1')
    rect(0,0,this.w,this.h,5,5,5,5);
    fill('#2C3E50')
    rect(this.c+30,0,this.h,this.h,5,5,5,5);
    fill('#ECF0F1')
    text(this.val, this.c+38, 25)
    if (this.val>this.min) {fill('#2C3E50');stroke('#2C3E50')}
    if (this.val===this.min) {fill('#BDC3C7');stroke('#BDC3C7')}
    text('-', 10, 22)
    if (this.val<this.max) {fill('#2C3E50');stroke('#2C3E50')}
    if (this.val===this.max) {fill('#BDC3C7');stroke('#BDC3C7')}
    text('+', 68, 22)
    pop();

  }
  clicked(){
    if(mouseY>this.y&& mouseY<this.y+this.h){
    if(mouseX>this.x&& mouseX<this.x+this.h){
      if(this.val>this.min) this.val -= this.step;
    }else if(mouseX>this.x+2*this.h && mouseX<this.x+this.w){
      if(this.val<this.max) this.val += this.step;
    }
  }

  }
  dragged(dx){
    this.c -= dx;
  }


}
