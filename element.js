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
      //  rotate(radians(this.rotation));
        fill(211, 220, 70, 255);
        rectMode(CENTER);
      /*  beginShape();
        vertices.forEach(x=> vertex(x.x,x.y));

        endShape(CLOSE);*/
        pop();
    }
    clicked() {

    }
    drag(dx, dy) {this.x += dx;this.y += dy;
      print(this.x,this.y);
    }
    copy(rx,ry,paddingX,paddingY) {
        var e = new Element(this.vertices,this.x, this.y, this.scale, this.rotation);
    }
}
