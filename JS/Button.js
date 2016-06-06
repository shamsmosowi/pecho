class Button {
  constructor(x,y,w,h,s,r,img,enabled,name,call) {
    this.x = x;
    this.y = y;
    this.w = w;this.h = h;
    this.scale = 1;
    this.scalef = s;
    this.img = img;

    //hover circle
    this.hw = 0;
    this.hh = 0;
    this.hwf = 0;
    this.hhf = 0;
    this.rotationf = r;
    this.rotation = 0;
    this.enabled = enabled;
    this.name = name;
    this.call = call;
  }
  draw(){
    push();
    translate(this.x,this.y);
    push();
    scale(this.scale);
    push();
    if(abs(this.rotation)===360){
     this.rotation = 0;
    }
    rotate(radians(this.rotation));
    this.animateHover(dist(mouseX,mouseY,this.x,this.y)<this.w/2);
    noStroke();

    fill(0,0,92,100);
    ellipse(0,0,this.w,this.h);
    fill(0,0,96,100);
    ellipse(0,0,this.hw,this.hh);
    push();
    imageMode(CENTER);
    scale(this.w*0.7/this.img.width,this.h*0.7/this.img.height);
    if(!this.enabled){tint(0, 0, 40, 40);}
    image(this.img);
    pop();
    pop();
    pop();
    pop();


  }
  animateHover(hovering){
    if (hovering&&this.enabled){
      this.hwf = this.w;
      this.hhf = this.h;
      noStroke();
      fill(40);
      textSize(11);
      text(this.name,-this.w/4,this.h-10);
    }else{
      this.hwf = 0;
    this.hhf = 0;
    }
  this.hw = this.hwf;
  this.hh = this.hhf;

    /*var target = this;
    var tween = new TWEEN.Tween({
                  w1:target.hw,
                  h1:target.hh
              })
              .to({
                w1:target.hwf,
                h1:target.hhf
              }, 500)
              .easing(TWEEN.Easing.Cubic.InOut)
              .onUpdate(function() {
                  target.hw = this.w1;
                  target.hh = this.h1;
              }).start();
            animate();
            */
  }
  animateRotation(){
    //rotates button
    var target = this;
    var tween = new TWEEN.Tween({
                  r:target.rotation
              })
              .to({
                  r:target.rotationf
              }, 500)
              .easing(TWEEN.Easing.Cubic.InOut)
              .onUpdate(function() {
                  target.rotation = this.r;
              }).start();
            animate();

  }
  animateScale(){
    //pops the button when pressed
    var target = this;
    var tween = new TWEEN.Tween({
                  s:target.scale
              })
              .to({
                  s:target.scalef
              }, 200)
              .repeat(1)
              .yoyo(true)
              .easing(TWEEN.Easing.Cubic.InOut)
              .onUpdate(function() {
                  target.scale = this.s;
              }).start();
            animate();

  }
  clicked(){
    if(dist(mouseX,mouseY,this.x,this.y)<this.w/2&&this.enabled){
      this.animateRotation();
      this.animateScale();
      return this.call();
    }else if(dist(mouseX,mouseY,this.x,this.y)<this.w/2&&!this.enabled){
      sendMessage("please select an element to copy",messageType.alert)
    }


  }
}