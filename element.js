class Element {
  constructor(x, y, s,r){
    //this.vertices = vertices;
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

    }
    drag(dx, dy) {this.x += dx;this.y += dy;
      print(this.x,this.y);
    }
    
}
