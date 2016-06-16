class MouseMenu {
    constructor(mousePos, menubtns) {
        this.visible = false;
        this.background = 30;
        this.backgroundf = 20;
        this.pos = mousePos;





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
            unselectall();
            pushToUndos();
            let e = new Shape(mousePos.x, mousePos.y, createVector(1, 1), 30, false, shapesDict.triangle, {
                h: random(360),
                s: 70,
                b: 100
            });
            current.push(e);
            current[current.length - 1].selected = true;

            let d = new Popup(width / 2, height / 2, 'Create a triangle', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['width', 'height', 'rotate', 'hue', 'brightness', 'saturation'], [paramsDict.scaleXSlider, paramsDict.scaleYSlider, paramsDict.rotateSlider, paramsDict.hueSlider, paramsDict.brightnessSlider, paramsDict.saturationSlider]);
            dialogBox.push(d);
            closeMouseMenu()
        }
    }, {
        name: 'square',
        img: btnImgDict.square,
        call: function() {
            unselectall();
            pushToUndos();
            let e = new Shape(mousePos.x, mousePos.y, createVector(1, 1), 45, false, shapesDict.square, {
                h: random(360),
                s: 70,
                b: 100
            });
            current.push(e);
            current[current.length - 1].selected = true;

            let d = new Popup(width / 2, height / 2, 'Create a square', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['width', 'height', 'rotate', 'hue', 'brightness', 'saturation'], [paramsDict.scaleXSlider, paramsDict.scaleYSlider, paramsDict.rotateSlider, paramsDict.hueSlider, paramsDict.brightnessSlider, paramsDict.saturationSlider]);
            dialogBox.push(d);
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
            unselectall();
            pushToUndos();
            let e = new Shape(mousePos.x, mousePos.y, createVector(1, 1), 0, false, shapesDict.circle, {
                h: random(360),
                s: 70,
                b: 100
            });
            current.push(e);
            current[current.length - 1].selected = true;

            let d = new Popup(width / 2, height / 2, 'Create a circle', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['width', 'height', 'hue', 'brightness', 'saturation'], [paramsDict.scaleXSlider, paramsDict.scaleYSlider, paramsDict.hueSlider, paramsDict.brightnessSlider, paramsDict.saturationSlider]);
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
    current[current.length - 1].selected = true;

    let d = new Popup(width / 2, height / 2, 'Create a polygon', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['number of sides', 'rotation', 'size', 'hue', 'brightness', 'saturation'], [paramsDict.sideStepper, paramsDict.rotateSlider, paramsDict.scaleSlider, paramsDict.hueSlider, paramsDict.brightnessSlider, paramsDict.saturationSlider]);
    dialogBox.push(d);
}

function closeMouseMenu() {
    for (var m = 0; m < mouseMenu.length + 1; m++) {
        mouseMenu.pop();
    }

}

function saveDialog() {
    dialogBox.pop();
}

function cancelDialog() {
    undo();
    dialogBox.pop();
}

function modeCall() {
    pushToUndos();
    sendMessage('choose a pattern type to apply', messageType.tip);
    let mousePos = createVector(mouseX, mouseY);
    let menubs = [{
        name: 'alternate',
        img: btnImgDict.alternate,
        call: function() {
            actions.steps = 1;
            actions.wave = waveType.even;
            let maxSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
                actions.max = val;
                actions.alternate();
            });
            let minSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
                actions.min = val;
                actions.alternate();
            });
            if (actions.property == 'hue' || actions.property == 'rotation') {
                maxSlider.endValue = 360;
                minSlider.endValue = 360;
            } else if (actions.property == 'scale') {
                maxSlider.endValue = 6;
                minSlider.endValue = 6;
            }
            let d = new Popup(width / 2, height / 2, 'Choose values to alternate', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['Value A', 'Value B'], [minSlider, maxSlider]);
            dialogBox.push(d);
            closeMouseMenu()
        }
    }, {
        name: 'random',
        img: btnImgDict.random,
        call: function() {
            let maxSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
                actions.max = val;
                actions.randomize()
            });
            let minSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
                actions.min = val;
                actions.randomize();
            });
            if (actions.property == 'hue' || actions.property == 'rotation') {
                maxSlider.endValue = 360;
                minSlider.endValue = 360;
            } else if (actions.property == 'scale') {
                maxSlider.endValue = 6;
                minSlider.endValue = 6;
            }else if (actions.property == 'x'||actions.property == 'y') {
                maxSlider.endValue = 1000;
                minSlider.endValue = 1000;
            }
            let d = new Popup(width / 2, height / 2, 'Choose a range(Random)', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['minmum', 'maximum'], [minSlider, maxSlider]);
            dialogBox.push(d);
            closeMouseMenu()
        }
    }, {
        name: 'square wave',
        img: btnImgDict.squareWave,
        call: function() {
            actions.steps = 1;
            actions.wave = waveType.square;
            alternateCall();
        }
    }, {
        name: 'sine wave',
        img: btnImgDict.sin,
        call: function() {
            actions.steps = 1;
            actions.wave = waveType.sin;
            alternateCall();
        }
    }, {
        name: 'saw wave',
        img: btnImgDict.saw,
        call: function() {
            actions.steps = 1;
            actions.wave = waveType.saw;
            alternateCall();
        }
    }, {
        name: 'linear',
        img: btnImgDict.linear,
        call: function() {
            let maxSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
                actions.max = val;
                actions.linear()
            });
            let minSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
                actions.min = val;
                actions.linear();
            });
            if (actions.property == 'hue' || actions.property == 'rotation') {
                maxSlider.endValue = 360;
                minSlider.endValue = 360;
            } else if (actions.property == 'scale') {
                maxSlider.endValue = 6;
                minSlider.endValue = 6;
            } else if (actions.property == 'x', actions.property == 'y') {
                maxSlider.endValue = 1000;
                minSlider.endValue = 1000;
            }
            let d = new Popup(width / 2, height / 2, 'Choose a range(Linear)', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['minmum', 'maximum'], [minSlider, maxSlider]);
            dialogBox.push(d);
            closeMouseMenu()
        }
    }, {
        name: 'constant',
        img: btnImgDict.constant,
        call: function() {
            actions.steps = 1;
            actions.wave = waveType.even;
            let maxSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
                actions.min = val;
                actions.max = val;
                actions.alternate();
            });
            if (actions.property == 'hue' || actions.property == 'rotation') {
                maxSlider.endValue = 360;
            } else if (actions.property == 'scale') {
                maxSlider.endValue = 6;
            } else if (actions.property == 'x', actions.property == 'y') {
                maxSlider.endValue = 1000;
            }
            let d = new Popup(width / 2, height / 2, 'Choose a value', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['Value'], [maxSlider]);
            dialogBox.push(d);
            closeMouseMenu();
        }
    }];
    //  mouseMenu.pos = createVector(mouseX,mouseY);
    let mb = new MouseMenu(mousePos, menubs);
    //mouseMenu.pop();
    mouseMenu.push(mb);
    mouseMenu[mouseMenu.length - 1].visible = true;



}


function alternateCall() {
    let maxSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
        actions.max = val;
        actions.alternate();
    });
    let minSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
        actions.min = val;
        actions.alternate();
    });
    let stepSlider = new Slider(50, 90, 200, 10, 1, 0, 100, function(val) {
        actions.steps = val;
        actions.alternate();
    });
    if (actions.property == 'hue' || actions.property == 'rotation') {
        maxSlider.endValue = 360;
        minSlider.endValue = 360;
    } else if (actions.property == 'scale') {
        maxSlider.endValue = 6;
        minSlider.endValue = 6;
    } else if (actions.property == 'x', actions.property == 'y') {
        maxSlider.endValue = 1000;
        minSlider.endValue = 1000;
    }
    let d = new Popup(width / 2, height / 2, 'Choose values to alternate', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['Minmum', 'Maximum', 'period'], [minSlider, maxSlider, stepSlider]);
    dialogBox.push(d);
    closeMouseMenu()

}
