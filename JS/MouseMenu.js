var paramsDict = {};
var simpleBtnDict = {};
class MouseMenu {
    constructor(mousePos, menubtns) {
        this.visible = false;
        this.background = 30;
        this.backgroundf = 20;
        this.pos = mousePos;

        let sideStepper = new Stepper(50, 50, 30, 5, 1, 3, 20, function(val) {
            console.log('new val is' + val)
              selected().forEach(x=>{x.vertices = polygon(val)})
        });
        let rotateSlider = new Slider(50, 90, 200, 10, 45, 0, 360, function(val) {
          selected().forEach(x=>{x.rotation = val;})
        });
        let hueSlider = new Slider(50, 90, 200, 10, 45, 0, 360, function(val) {
          selected().forEach(x=>{x.hue = val;})
        });
        let brightnessSlider = new Slider(50, 90, 200, 10, 45, 0, 100, function(val) {
          selected().forEach(x=>{x.brightness = val;})
        });
        let saturationSlider = new Slider(50, 90, 200, 10, 45, 0, 100, function(val) {
          selected().forEach(x=>{x.saturation = val;})
        });
        let scaleSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {

                selected().forEach(x=>{x.scaleX = val;x.scaleY = val;})
        });
        let scaleXSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {

                selected().forEach(x=>{x.scaleX = val;})

        });
        let scaleYSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {

                selected().forEach(x=>{x.scaleY = val;})
        });
        paramsDict.sideStepper = sideStepper;
        paramsDict.rotateSlider = rotateSlider;
        paramsDict.scaleSlider = scaleSlider;
        paramsDict.scaleXSlider = scaleXSlider;
        paramsDict.scaleYSlider = scaleYSlider;
        paramsDict.hueSlider = hueSlider;
        paramsDict.brightnessSlider = brightnessSlider;
        paramsDict.saturationSlider = saturationSlider;

        let saveBtn = new SimpleBtn(20,50,80,40,'save',true,popUpTheme.greenbtn,function(){saveDialog()})
        let cancelBtn = new SimpleBtn(20,50,80,40,'cancel',true,popUpTheme.redbtn,function(){cancelDialog()})
        simpleBtnDict.saveBtn = saveBtn;
        simpleBtnDict.cancelBtn = cancelBtn;





        /*
menuDict.main = [1, 2, 3, 4];
menuDict.shapes = [1, 2, 3, 4, 5];
console.log(menuDict.shapes);
*/
        /*
        circumference of the mouse menu = button(width+padding)*n(number of buttons);
        circumference = 2*pi*radius
        rearrange for calculating the radius of the menu
        r = c/2*pi
        use r to calculate the position of the button using the polar cartian to polar
        x = r × cos( θ )
        y = r × sin( θ )
        */


        this.mbtns = [];
        this.btnWidth = 70;
        this.padding = 15;
        this.r = ((this.padding + this.btnWidth) * menubtns.length) / (2 * PI);
        for (var i = 0; i < menubtns.length; i++) {


            let bx = this.pos.x + this.r * cos(radians((360 / menubtns.length) * i));
            let by = this.pos.y + this.r * sin(radians((360 / menubtns.length) * i));
            let btn = new Button({
                x: bx,
                y: by,
                w: this.btnWidth,
                h: this.btnWidth,
                s: 1.1,
                r: 0,
                img: menubtns[i].img,
                enabled: true,
                name: menubtns[i].name,
                call: menubtns[i].call

            }, this.pos);
            this.mbtns.push(btn);


        }


    }
    draw() {
        if (this.visible) {
            background(20, this.background);

            //  push()
            //translate(this.pos.x, this.pos.y)
            this.mbtns.forEach(drawItem);

            //  pop()
        }
    }
    doubleClicked() {
        if (!this.visible) {
            this.menu = 'main'
            this.visible = true
        }
    }
    itemClicked() {


        }
        //TODO:add animations
    clicked() {

        this.mbtns.forEach(clickItem);
    }

}


function shapesCall() {
    // menu for creating shapes
    let mousePos = createVector(mouseX, mouseY);
    let menubs = [{
        name: 'triangle',
        img: btnImgDict.triangle,
        call: function() {
            let e = new Shape(mousePos.x, mousePos.y, createVector(1, 1), 30, false, shapesDict.triangle, {
                h: random(360),
                s: 70,
                b: 100
            });
            current.push(e);

            closeMouseMenu()
        }
    }, {
        name: 'square',
        img: btnImgDict.square,
        call: function() {

            let e = new Shape(mousePos.x, mousePos.y, createVector(1, 1), 45, false, shapesDict.square, {
                h: random(360),
                s: 70,
                b: 100
            });
            current.push(e);
            closeMouseMenu()
        }
    }, {
        name: 'polygon',
        img: btnImgDict.polygon,
        call: function() {
            polygonCall()
            closeMouseMenu()
        }
    }, {
        name: 'circle',
        img: btnImgDict.circle,
        call: function() {
            let e = new Shape(mousePos.x, mousePos.y, createVector(1, 1), 0, false, shapesDict.circle, {
                h: random(360),
                s: 70,
                b: 100
            });
            current.push(e);
            current[current.length-1].selected = true;

    let d = new Popup(width / 2, height / 2, 'Create a circle', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['width','height','hue','brightness','saturation'],[paramsDict.scaleXSlider,paramsDict.scaleYSlider,paramsDict.hueSlider,paramsDict.brightnessSlider,paramsDict.saturationSlider]);
    dialogBox.push(d);
            closeMouseMenu()
        }
    }];
    //  mouseMenu.pos = createVector(mouseX,mouseY);
    let mb = new MouseMenu(mousePos, menubs);
    //mouseMenu.pop();
    mouseMenu.push(mb);
    mouseMenu[mouseMenu.length - 1].visible = true;
}

function polygonCall() {
    unselectall();
    pushToUndos();
    var e = new Shape((width / 2) - 100, (height / 2) + 100, createVector(1, 1), 0, true, polygon(5), {
        h: 0,
        s: 70,
        b: 100
    });
    current.push(e);
    current[current.length-1].selected = true;

    let d = new Popup(width / 2, height / 2, 'Create a polygon', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['number of sides','rotation','size','hue','brightness','saturation'],[paramsDict.sideStepper,paramsDict.rotateSlider,paramsDict.scaleSlider,paramsDict.hueSlider,paramsDict.brightnessSlider,paramsDict.saturationSlider]);
    dialogBox.push(d);
}

function closeMouseMenu() {
    for (var m = 0; m < mouseMenu.length + 1; m++) {
        mouseMenu.pop();
    }

}
function saveDialog(){
  dialogBox.pop();
}
function cancelDialog(){
  undo();
  dialogBox.pop();
}
