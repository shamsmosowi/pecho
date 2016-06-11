class Element {

  constructor(x, y, s,r,selected){
    //this.vertices = vertices;
    this.selected = selected;
    this.x = x || 0;
    this.y = y || 0;
    this.scaleX = s.x || 1;
      this.scaleY = s.y || 1;
    this.rotation = r || 0;}
    draw() {
        noStroke();
        push();
        translate(this.x, this.y);


        pop();
    }

    drag(dx, dy) {
      if(this.selected){this.x -= dx/(canvas.s);this.y -= dy/(canvas.s);}
    }


}
