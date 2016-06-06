function MenuItem(i, nItems) {
    this.i = i;
    this.nItems = nItems;
    this.w = 60;
    this.h = 60;
    this.rotf = 180;
    this.scalef = 1;
    this.rotation = 0;
    this.scale = 0;
    this.m = map(this.i, 0, this.nItems, 0, 1);
    this.fillColor = color(this.m * 360, 166, 255);
    this.x = 0;
    this.y = 0;
    this.xf = 20;
    this.yf = 40 + this.m * 120;
    this.draw = function() {
        noStroke();
        push();

        translate(this.x, 30 + this.y);
        push();
        scale(this.scale);
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
                s: target.scale,
                x: target.x,
                y: target.y
            })
            .to({
                s: 1,
                x: target.xf,
                y: target.yf
            }, 300)
            .easing(TWEEN.Easing.Circular.InOut)
            .onUpdate(function() {

                target.x = this.x;
                target.y = this.y;
                target.scale = this.s;
            }).start();
        animate();
    };
    this.hide = function() {
        let target = this; //defines this object as the target variable to allow for access within the tween object;
        let tween = new TWEEN.Tween({
                s: target.scale,
                x: target.x,
                y: target.y
            })
            .to({
                s: 0,
                x: 0,
                y: target.yf
            }, 300)
            .easing(TWEEN.Easing.Circular.InOut)
            .onUpdate(function() {

                target.x = this.x;
                target.y = this.y;
                target.scale = this.s;
            }).start();
        animate();
    };
}
