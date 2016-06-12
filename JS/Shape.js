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
    //TODO:join shape and Graphic draw functions boilers
      push();

      translate(this.x,this.y);
      push();

        scale(this.scaleX,this.scaleY);
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
        this.vertices.forEach(x=> {vertex(x.x,x.y);fill('#2D3E50');noStroke();rect(x.x,x.y,3,3)});
          noFill();stroke('#2D3E50');
        endShape(CLOSE);
      }

      pop();
      pop();
      pop();
      fill(0);
      //ellipse(this.x+this.cx,this.y+this.cy,25,25);
  }
  clicked() {
    //-canvasWidth/2,-canvasHeight/2
    //canvas.s;

    //if(dist(mouseX,mouseY,this.x+this.cx-((canvasWidth/2)*canvas.s),this.y+this.cy-((canvasHeight/2)*canvas.s))<50){
//,if(dist(mouseX,mouseY,canvas.x+((this.x+this.cx-canvasWidth/2)*canvas.s),((canvas.y+this.y)*canvas.s)+this.cy-canvasHeight/2)<25){

      //if(dist(mouseX,mouseY,canvas.x+((this.x+this.cx-canvasWidth/2)*canvas.s),canvas.y+((this.y+this.cy-canvasHeight/2)*canvas.s))<25*canvas.s){
      //
        if(dist(mouseX,mouseY,canvas.x+((this.x+this.cx-canvasWidth/2)*canvas.s),canvas.y+((this.y+this.cy-canvasHeight/2)*canvas.s))<25*Math.sqrt(pow(this.scaleX*canvas.s,2)+pow(this.scaleY*canvas.s,2)))
        {
          
        this.selected =true;
    }else{

    }
  }
}
