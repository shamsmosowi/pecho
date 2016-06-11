class Element {

  constructor(x, y, s,r,selected){
    //this.vertices = vertices;
    this.selected = selected;
    this.x = x || 0;
    this.y = y || 0;
    this.scale = s || 1;
    this.rotation = r || 0;}
    draw() {
        noStroke();
        push();
        translate(this.x, this.y);


        pop();
    }
    clicked() {
      if(mouseX,mouseY){

      }else{
        
      }
    }
    drag(dx, dy) {
      if(this.selected){this.x -= dx;this.y -= dy;}
    }


}
