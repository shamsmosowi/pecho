class SimpleBtn{
  constructor(x,y,w,h,name,state,colour,call){
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.call = call;
    this.colour = colour;
    console.log(this.call);
  }
    draw(){
        console.log(this.update);
      push();
      translate(this.x,this.y)
      fill(this.colour);
      rect(0,0,this.w,this.h,5,5,5,5);
      fill(popUpTheme.body);
      //fill(0);
      textSize(20);
      textAlign(CENTER);
      text(this.name,this.w/2,(this.h/2)+5);
      pop();
    }
    clicked(){
      if (this.x<mouseX && this.y<mouseY &&this.w+this.x>mouseX && this.h+this.y>mouseY) {

        this.call();
      }

    }


}
