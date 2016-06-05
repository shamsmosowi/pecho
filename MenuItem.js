function MenuItem(i, nItems) {
    this.i = i;
    this.nItems = nItems;
    this.x = 0;
    this.y = 0;
    this.w = 45;
    this.h = 45;
    this.rotf = 90;
    this.rotation = 0;
    this.scale = 0;
    let h = 360 / nItems;
    this.fillColor = color(h * this.i, 126, 255);
    //this.m = map(this.i, 0, this.Items, 270, 360);
    this.m = map(i, 0, nItems, 285, 375);
    this.xf = 50 * cos(radians(this.m));
    this.yf = 50 * sin(radians(this.m));
    this.draw = function() {
        noStroke();
        push();
        scale(this.scale);
        //rotate(radians(this.rotation));
        push();
        translate(this.x, this.y);
        fill(this.fillColor);
        ellipse(this.x, this.y, this.w, this.h);
        pop();
        pop();

    };
    this.clicked = function() {

    };
    this.show = function() {
        /*x = r × cos( θ )
        y = r × sin( θ )*/
        let target = this; //defines this object as the target variable to allow for access within the tween object;
        let tween = new TWEEN.Tween({
                x: 0,
                y: 0,
                s: 0,
                r: 0
            })
            .to({
                x: this.xf,
                y: this.yf,
                s: 1,
                r: this.rotf
            }, 300)
            .easing(TWEEN.Easing.Circular.InOut)
            .onUpdate(function() {
                target.scale = this.s;
                target.x = this.x;
                target.y = this.y;
                target.rotation = this.r;
                target.scale = this.s;
            }).start();
        animate();
    };
    this.hide = function() {
        let target = this; //defines this object as the target variable to allow for access within the tween object;
        let tween = new TWEEN.Tween({
                x: target.x,
                y: target.y,
                s: 1,
                r: target.rotation
            })
            .to({
                x: 0,
                y: 0,
                s: 0,
                r: 0
            }, 300)
            .easing(TWEEN.Easing.Circular.InOut)
            .onUpdate(function() {
                target.scale = this.s;
                target.x = this.x;
                target.y = this.y;
                target.scale = this.s;
                target.rotation = this.r;
            }).start();

    };


}
