// this class is based on Huiying ke's, Drawing Rectangle by mouse event.
//ref:http://www.openprocessing.org/sketch/5563

class DragSelect {
    constructor() {
        this.sizex = 0;
        this.sizey = 0;
        this.rect_x1 = 0;
        this.rect_x2 = 0;
        this.rect_y1 = 0;
        this.rect_y2 = 0;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;

    }
    draw() {


        stroke(10);
        fill(10, 10, 10, 10);


        this.sizex = this.rect_x2 - this.rect_x1;
        this.sizey = this.rect_y2 - this.rect_y1;

        if (mousePressed && mouseButton == LEFT) {
            rect(this.rect_x1, this.rect_y1, this.sizex, this.sizey);
        }


    }
    press() {
        this.rect_x1 = mouseX;
        this.rect_y1 = mouseY;
        this.drag(); // Reset vars
        unselectall();

    }
    drag() {

        this.rect_x2 = mouseX;
        this.rect_y2 = mouseY;

    }
    release() {
        this.rect_x2 = mouseX;
        this.rect_y2 = mouseY;
        if (this.rect_x1 < this.rect_x2) {
            this.x1 = this.rect_x1;
            this.x2 = this.rect_x2;
        } else {
            this.x2 = this.rect_x1;
            this.x1 = this.rect_x2;
        }
        if (this.rect_y1 < this.rect_y2) {
            this.y1 = this.rect_y1;
            this.y2 = this.rect_y2;
        } else {
            this.y2 = this.rect_y1;
            this.y1 = this.rect_y2;
        }
        current.forEach(x => {
            if (canvas.x + ((x.x + x.cx - canvasWidth / 2) * canvas.s) > this.x1 && canvas.x + ((x.x + x.cx - canvasWidth / 2) * canvas.s) < this.x2 && canvas.y + ((x.y + x.cy - canvasHeight / 2) * canvas.s) > this.y1 && canvas.y + ((x.y + x.cy - canvasHeight / 2) * canvas.s) < this.y2) {
                x.selected = true;
            }

        });



        this.rect_x1 = 0;
        this.rect_y1 = 0;
        this.rect_x2 = 0;
        this.rect_y2 = 0;
    }


}
