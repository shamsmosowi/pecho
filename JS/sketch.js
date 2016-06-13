var veggieBurgerMenu;
var s;
var millisecond;
var messagesArray = [];
var canvas;
var s;
var grab;
var btnsArray = {};
var buttonText = true; // controls showing of text when mouse hover on button
var btnImgDict = {};
var redoArray = [];
var OSName = "Unknown";
var backgroundColour;
var menuDict = {};
var actions;
var mouseMenu = [];
var dragSelect;

function preload() {
    // things to load before setup() runs
    /*    app.listen(3000, '0.0.0.0', function() {
        console.log('Listening to port:  ' + 3000);

    });*/
    actions = new Actions();
    dragSelect = new DragSelect();
    backgroundColour = color('#BDC3C7');
    if (window.navigator.userAgent.indexOf("Windows")) OSName = "Windows";
    if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
    if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";
    veggieBurgerMenu = new VeggieBurgerMenu();
    grab = loadImage("assests/cursors/grab.png");
    let imgsArray = ['fullScreen', 'invite', 'download', 'delete', 'undo', 'redo', 'cut', 'copy', 'zoomIn',
        'zoomOut', 'paste', 'settings', 'bucket', 'shapes', 'polygon', 'circle', 'paintPalette', 'roundSquare',
        'borderedSquare', 'noFillSquare', 'square', 'horizontalCenterAlignment', 'leftAlignment', 'rightAlignment',
        'verticalCenterAlignment', 'topAlignment', 'bottomAlignment', 'rotate', 'scale', 'triangle', 'pencil', 'pen', 'spiral',
        'mirrorVertically', 'mirrorVertically', 'mirrorHorizontally', 'flipHorizontally', 'mirrorVertically', 'mirrorHorizontally',
        'eyedropper', 'crop', 'text', 'cube'
    ];
    for (var i = 0; i < imgsArray.length; i++) {
        btnImgDict[imgsArray[i]] = loadImage('assests/buttons/theme1/' + imgsArray[i] + '.png')
    }


    veggieBurgerMenu = new VeggieBurgerMenu();
//Creating buttons
    var undoBtn = new Button({
        x: 80,
        y: 25,
        w: 40,
        h: 40,
        s: 1,
        r: -360,
        img: btnImgDict.undo,
        enabled: 0,
        name: "undo",
        call: function() {
            undo();
        },
        success: "pervious action was undone",
        fail: "there is no action history"
    }, createVector(0, 0));
    btnsArray.undo = undoBtn;
    var redoBtn = new Button({
        x: 130,
        y: 25,
        w: 40,
        h: 40,
        s: 1,
        r: 360,
        img: btnImgDict.redo,
        enabled: 0,
        name: "redo",
        call: function() {
            redo();
        },
        success: "pervious action was redone",
        fail: "there is no action to be done"
    }, createVector(0, 0));
    btnsArray.redo = redoBtn;
    var copyBtn = new Button({
        x: 180,
        y: 25,
        w: 40,
        h: 40,
        s: 1.2,
        r: 0,
        img: btnImgDict.copy,
        enabled: 1,
        name: "copy",
        call: function() {
            actions.copy();
        },

        fail: "select an element to copy"
    }, createVector(0, 0));
    btnsArray.copy = copyBtn;
    var cutBtn = new Button({
        x: 230,
        y: 25,
        w: 40,
        h: 40,
        s: 1.2,
        r: 0,
        img: btnImgDict.cut,
        enabled: 1,
        name: "cut",
        call: function() {
            actions.cut();
        },
        fail: "select an element to cut"
    }, createVector(0, 0));
    btnsArray.cut = cutBtn;
    var pasteBtn = new Button({
        x: 280,
        y: 25,
        w: 40,
        h: 40,
        s: 1.2,
        r: 0,
        img: btnImgDict.paste,
        enabled: 1,
        name: "paste",
        call: function() {
            actions.paste();
        },
        fail: "clipboard is empty"
    }, createVector(0, 0));
    btnsArray.paste = pasteBtn;
    var settingsBtn = new Button({
        x: windowWidth - 30,
        y: 30,
        w: 45,
        h: 45,
        s: 1.1,
        r: 360,
        img: btnImgDict.settings,
        enabled: true,
        name: "Settings",
        call: function() {
            //shows settings menu

        }
    }, createVector(0, 0));
    btnsArray.settings = settingsBtn;

    //TODO:mouseMenu dictionaries, create element menu, shape menu,text menu, image menu,grapgics minute


}

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360, 100, 100, 100);
    canvas = new Canvas();

    //mouseMenu = new MouseMenu(createVector(0,0),{});
    var zoomInBtn = new Button({
        x: width - 30,
        y: height - 30,
        w: 35,
        h: 35,
        s: 1.2,
        r: 0,
        img: btnImgDict.zoomIn,
        enabled: true,
        name: "zoom in",
        call: function() {
            zoom.value = zoom.value * 1.1;
            rescaleCanvas();
        }
    }, createVector(0, 0));
    btnsArray.zoomIn = zoomInBtn;
    var zoomOutBtn = new Button({
        x: width - 270,
        y: height - 25,
        w: 35,
        h: 35,
        s: 0.8,
        r: 0,
        img: btnImgDict.zoomOut,
        enabled: true,
        name: "zoom out",
        call: function() {
            zoom.value = zoom.value * 0.9;
            rescaleCanvas();
        }
    }, createVector(0, 0));
    btnsArray.zoomOut = zoomOutBtn;

    var fullScreenBtn = new Button({
        x: width - 310,
        y: height - 26,
        w: 35,
        h: 35,
        s: 1.2,
        r: 0,
        img: btnImgDict.fullScreen,
        enabled: true,
        name: "fit canvas",
        call: function() {
            //  resizes and centers the canvas
            canvas.drag.x = 0;
            canvas.drag.y = 0;
            zoom.value = 1;
            rescaleCanvas();
        }
    }, createVector(0, 0));
    btnsArray.fullScreen = fullScreenBtn;
    mousePos = createVector(mouseX, mouseY);
    //noLoop();
    (elem = document.getElementById("loading")).parentNode.removeChild(elem);

}
var drawItem = x => x.draw()
var clickItem = x => x.clicked()

function draw() {
    //draw loop mainly used to call objects draw functions

    millisecond = millis();
    background(backgroundColour);
    canvas.draw();
    dragSelect.draw();
    //btnsArray.forEach(drawItem);
    for (var index in btnsArray) {
        btnsArray[index].draw();
    }
    veggieBurgerMenu.draw();
    showFrameRate();
    noFill();
    strokeWeight(1.5);
    stroke(240, 65, 50, 70);
    if (mouseMenu.length > 0) {
        mouseMenu[mouseMenu.length - 1].draw();
    }
    messagesArray.forEach(drawItem); //loops through the array to show messages
    //if(mouse){rect(mousePos.x,mousePos.y,mouseX-mousePos.x,mouseX-mousePos.y);}
}

function windowResized() {
    // keeps canvas at full screen
    resizeCanvas(windowWidth, windowHeight);
    messagesArray.forEach((x) => x.windowResized());

}



function animate() {
    //actives Tweenjs animations
    requestAnimationFrame(animate);
    TWEEN.update();
}



function showFrameRate() {
    //this function is for performance testing only, keeps track of preformance effciency
    stroke(2);
    strokeWeight(1);
    textSize(24);
    text(round(frameCount / (millisecond / 1000)) + 'fps', 10, height - 10);
    // print(frameCount / (millisecond / 1000));
}
window.onresize = function() {
    // centers canvas
    canvas.x = ((width / 2) - (canvas.ws * canvasWidth) / 2) + canvas.drag.x;
    canvas.y = ((height / 2) - (canvas.hs * canvasHeight) / 2) + canvas.drag.y;
    rescaleCanvas();
    //keeps zoom bar & btns in its postion during window rescaling
    zoom.x = width - 250;
    zoom.y = height - 30;
    btnsArray.zoomOut.x = width - 270;
    btnsArray.zoomOut.y = height - 26;
    btnsArray.zoomIn.x = width - 30;
    btnsArray.zoomIn.y = height - 26;
    btnsArray.settings.x = width - 30;
    btnsArray.fullScreen.y = height - 26;
    btnsArray.fullScreen.x = width - 310;
};
document.ondblclick = function() {
    let mousePos = createVector(mouseX, mouseY);
    let menuBtns = [{
        name: 'shapes',
        img: btnImgDict.shapes,
        call: shapesCall
    }, {
        name: 'colors',
        img: btnImgDict.paintPalette,
        call: function() {

        }
    }, {
        name: 'pen',
        img: btnImgDict.pen,
        call: function() {

        }
    }, {
        name: 'text',
        img: btnImgDict.text,
        call: function() {

        }
    }]
    mm = new MouseMenu(mousePos, menuBtns);
    mouseMenu.push(mm);
    mouseMenu[mouseMenu.length - 1].visible = true;
}
