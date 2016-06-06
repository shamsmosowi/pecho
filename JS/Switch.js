class Switch {
    constructor(x, y, scale, bool) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.bool = bool;
        this.cx = -45;
        this.cxf = -45;
        this.lax = [0, 0, 45, 45];
        this.lbx = [0, 45, 45, 0];
        this.lat = [0, 10, 10, 35];
        this.lbt = [10, 35, 45, 0];
        if (bool) {
            this.la = this.lat;
            this.lb = this.lbt;
        } else {
            this.la = this.lax;
            this.lb = this.lbx;
        }
        this.laf = this.lat;
        this.lbf = this.lbt;


    }

    draw() {
        strokeWeight(2);
        push();
        translate(this.x, this.y);
        push();
        scale(this.scale);
        fill(230);
        rectMode(CENTER);
        rect(0, 0, 200, 100, 50, 50, 50, 50);
        fill(40);
        push();
        translate(this.cx, 0);
        push();
        let mRot = map(this.cx, -45, 45, 0, 360);
        rotate(radians(mRot));

        ellipse(0, 0, 90, 90);
        push()
        translate(-22.5, -22.5)

        line(this.la[0], this.la[1], this.la[2], this.la[3]);
        line(this.lb[0], this.lb[1], this.lb[2], this.lb[3]);

        pop()
        pop();
        pop();
        pop();
        pop();
    }
    clicked() {
        print("clicked")
        if (dist(this.cx, this.cy, mouseX, mouseY) < 45) {}
        this.bool = !this.bool;
        this.animate();
    }
    animate() {
        var cxf;
        if (this.bool) {
            this.cxf = 45;
            this.laf = this.lat;
            this.lbf = this.lbt;
        } else {
            this.cxf = -45;
            this.laf = this.lax;
            this.lbf = this.lbx;
        }
        //tween
        let target = this; //defines this object as the target variable to allow for access within the tween object;
        let tween = new TWEEN.Tween({
                cx: target.cx,
                la1: target.la[0],
                la2: target.la[1],
                la3: target.la[2],
                la4: target.la[3],
                lb1: target.lb[0],
                lb2: target.lb[1],
                lb3: target.lb[2],
                lb4: target.lb[3]
            })
            .to({
                cx: target.cxf,
                la1: target.laf[0],
                la2: target.laf[1],
                la3: target.laf[2],
                la4: target.laf[3],
                lb1: target.lbf[0],
                lb2: target.lbf[1],
                lb3: target.lbf[2],
                lb4: target.lbf[3]
            }, 300)
            .easing(TWEEN.Easing.Circular.InOut)
            .onUpdate(function() {
                target.la = [this.la1, this.la2, this.la3, this.la4];
                target.lb = [this.lb1, this.lb2, this.lb3, this.lb4];
                target.cx = this.cx;
            }).start();
        animate();
    }



}
