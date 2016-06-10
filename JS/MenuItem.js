class MenuItem extends Button {
    constructor(options, i, nItems) {
        super(options);
        this.i = i;
        this.nItems = nItems;
        this.rotf = 180;
        this.scalef = 1;
        this.rotation = 0;
        this.scale = 0;
        this.m = map(this.i, 0, 2, 0, 360);
        this.fillColor = color(this.m, 100, 100);
        this.x = 0;
        this.y = 0;
        this.xf = options.x;
        this.yf = options.y;
    }
    draw() {
        noStroke();

        push();

        translate(this.x,this.y);
        push();
        scale(this.scale);
        fill(this.fillColor);
        ellipse(0, 0, this.w, this.h);
          this.animateHover(dist(mouseX, mouseY, this.x, this.y) < this.w / 2);
        push();
        imageMode(CENTER);
        scale(this.w * 0.7 / this.img.width, this.h * 0.7 / this.img.height);
        if (!this.enabled) {
            tint(0, 0, 40, 40);
        }
        image(this.img);
        pop();
        pop();
        pop();

    }

    show() {
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
    }
    hide() {
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
    }
    clicked(){
      return;

    }
}
