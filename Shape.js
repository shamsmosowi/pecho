class Shape extends Element{
  constructor(x, y, s,r,w,h){
    super(x,y,s,r,w,h);
    this.w = w;
    this.h = h;
  }
  draw(){
    fill(0);
    print(this.h,this.w);
    rect(this.x,this.y,this.w,this.h);
  }

}
