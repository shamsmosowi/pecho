function Slider(){
  this.x = 200;
  this.y = 200;
  this.w = 200;
  this.h = 30;
  this.cx = this.x;
  this.cy = this.y;
  this.draw = function(){
    rectMode(ROUND);
    rect(this.x,this.y,this.w,this.h);
  };
  this.drag = function(){
    return map(this.x-this.cx,0,this.w,0,100);
  };

}
