var popUpTheme = {
    banner: '#34495E',
    boarder: '#95A5A6',
    body: '#ECF0F1',
    text: '#2C3E50',
    greenbtn: '#2ECC71',
    redbtn: '#E74C3C',
    disabledBtn: '#BDC3C7'
};
var popUpParams = {
    btns: [],
    swithes: [],
    steppers: [{
    }],
    sliders: []
}
class Popup {
    constructor(x, y, title, buttons,labels, params) {
        this.title = title;
        this.x = x;
        this.y = y;
        this.parameters = params;
        this.w = 300;
        this.h = 30 + params.length*50;
        this.scale = 1;
        this.labels = labels;
        this.buttons = buttons;
    }
    draw() {
        push();
        translate(this.x,this.y);
        //  noStroke()
        stroke(popUpTheme.banner);
        strokeWeight(3)
        fill(popUpTheme.body)
        rect(0, 0, this.w, this.h, 10, 10, 10, 10);
        fill(popUpTheme.banner)
        rect(0, 0, this.w, 30, 10, 10, 0, 0);
        this.header();
        this.drawLabels();
        pop();
        this.drawParams();
        this.drawBtns();
    }
    drag(dx, dy) {

      if (mouseX>this.x && mouseY>this.y && mouseX<this.x+this.w && mouseY<this.y+40) {
        this.x -= dx;
        this.y -= dy;
      }
      this.parameters.forEach(dragItem);

    }
    header(){
      fill(popUpTheme.body)
      noStroke();
      textSize(20)
     textAlign(CENTER)
      fill(255);
      text(this.title,this.w / 2,22)
    }
    drawLabels(){
        noStroke();
        textSize(15)
        textAlign(LEFT)
        fill(popUpTheme.text);
      let index = 0;
        this.labels.forEach(x=>{text(x,10,50 + 40 *index);index+=1});
    }
    drawParams(){
      let index = 0;
      this.parameters.forEach(x=> {x.y = dialogBox[dialogBox.length-1].y + 40 + 40 *index;
         x.x = dialogBox[dialogBox.length-1].x + dialogBox[dialogBox.length-1].w - x.w -10;
         index+=1});
      this.parameters.forEach(drawItem);
    }
    drawBtns(){
        let index = 0;
        this.buttons.forEach(x=> {x.x = dialogBox[dialogBox.length-1].x + 40 + 120 *index;
       x.y = dialogBox[dialogBox.length-1].y + dialogBox[dialogBox.length-1].h - x.h -10;
       index+=1});
       this.buttons.forEach(drawItem);

    }
    press(){

    }
    clicked() {
      //check for press location
      this.parameters.forEach(clickItem);
      this.buttons.forEach(clickItem);
    }
    onUpdate() {


    }
    shake(){
      //when user trys to interact with the canvas without existing the dialog

    }
}
