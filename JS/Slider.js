class Slider {
    constructor(x, y, w, h,val,start, end,call) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.startValue = start;
        this.endValue = end;
        this.val = val;
        this.update = call;
    }

    draw() {
        push();
        translate(this.x, this.y);
        noStroke();
        fill(70);
        rect(0, 0, this.w, this.h, this.h / 2, this.h / 2, this.h / 2, this.h / 2);
        this.cx = map(this.val, this.startValue, this.endValue, 0, this.w);
        fill(popUpTheme.text);
        strokeWeight(1.5);
        stroke(popUpTheme.disabledBtn);
        ellipse(this.cx, this.h / 2, this.h * 2, this.h * 2);
        pop();
    }
    drag() {
        if (mouseX > this.x && mouseX < this.w + this.x && mouseY > this.y && mouseY -10 < this.h + this.y + 10) {
            this.val = map(mouseX, this.x, this.x + this.w, this.startValue, this.endValue);
            this.update(this.val);
        }
    }
    clicked(){
      console.log(this.val);
    }

}
class VariableSlider extends Slider {
    constructor(x, y, w, h, start, end) {
        super(x, y, w, h, start, end);
    }
}
