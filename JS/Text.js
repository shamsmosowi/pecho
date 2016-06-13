// an element subclass used to create text such as svgs and images

class Text extends Element{
  constructor(x, y, s,r,selected,textOptions){
    super(x,y,s,r,selected);
    //textOptions:String,colour,font,strokeSize,strokeColor
    this.content = textOptions.string;
    this.fillColour = textOptions.fillColour;
    this.font = textOptions.font;
    this.strokeWeight = textOptions.stroke;
    this.strokeColour = textOptions.strokeColour;

  }
  draw(){
    push();
    scale(this.scaleX,this.scaleY);
    fill(this.fillColour);
    strokeWeight(this.strokeWeight);

    pop();


  }
  clicked() {
      /*  if(dist(mouseX,mouseY,canvas.x+((this.x-canvasWidth/2)*canvas.s),canvas.y+((this.y-canvasHeight/2)*canvas.s))<25*Math.sqrt(pow(this.scaleX*canvas.s,2)+pow(this.scaleY*canvas.s,2)))
        {
        this.selected = true;
        }else{
        */
    }
  }

}
