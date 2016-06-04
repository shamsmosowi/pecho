function Element(vertices,x, y, s,r) {
    this.vertices = vertices;
    this.x = x || 0;
    this.y = y || 0;
    this.scale = s || 1;
    this.rotation = r || 0;
    this.draw = function() {
        noStroke();
        push();
        translate(this.x, this.y);
      //  rotate(radians(this.rotation));
        fill(211, 220, 70, 255);
        rectMode(CENTER);
        beginShape();
        for (var v = 0; v < this.vertices.length; v++) {
            vertex(this.vertices[v].x,this.vertices[v].y);
        }
        endShape(CLOSE);
        pop();
    };
    this.clicked = function() {

    };
    this.drag = function(dx, dy) {
        this.x += dx;
        this.x += dy;
    };
    this.copy = function(rx,ry,paddingX,paddingY) {
        var e = new Element(this.vertices,this.x, this.y, this.scale, this.rotation);
    };
}
