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

function preload() {
    // things to load before setup() runs
/*    app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);

});*/
    veggieBurgerMenu = new VeggieBurgerMenu();
    grab = loadImage("assests/cursors/grab.png");
    var undoImg = loadImage("assests/buttons/arrows/undo-1.png");
    var redoImg = loadImage("assests/buttons/arrows/redo-1.png");
    var copyImg = loadImage("assests/buttons/functions/copy.png");
    var cutImg = loadImage("assests/buttons/functions/cut.png");
    var pasteImg = loadImage("assests/buttons/functions/paste.png");
    var downloadImg = loadImage("assests/buttons/functions/download.png");
    var inviteImg = loadImage("assests/buttons/functions/invite.png");
    var deleteImg = loadImage("assests/buttons/functions/delete.png");
    var settingsImg = loadImage("assests/buttons/functions/settings.png");
    btnImgDict.invite = inviteImg;
    btnImgDict.download = downloadImg;
    btnImgDict.delete = deleteImg;
    btnsArray.undo = undoBtn;
    veggieBurgerMenu = new VeggieBurgerMenu();

    var undoBtn = new Button({
        x: 80,
        y: 25,
        w: 40,
        h: 40,
        s: 1,
        r: -360,
        img: undoImg,
        enabled: 1,
        name: "undo",
        call: function() {
            undo();
        },
        success: "pervious action was undone",
        fail: "there is no action history"
    });
    btnsArray.undo = undoBtn;
    var redoBtn = new Button({
        x: 130,
        y: 25,
        w: 40,
        h: 40,
        s: 1,
        r: 360,
        img: redoImg,
        enabled: 1,
        name: "redo",
        call: function() {
            redo();
        },
        success: "pervious action was redone",
        fail: "there is no action to be done"
    });
    btnsArray.redo = redoBtn;
    var copyBtn = new Button({
        x: 180,
        y: 25,
        w: 40,
        h: 40,
        s: 1.2,
        r: 0,
        img: copyImg,
        enabled: 1,
        name: "copy",
        call: function() {
            copy();
        },
        success: "selected element/s were copied",
        fail: "select an element to copy"
    });
    btnsArray.copy = copyBtn;
    var cutBtn = new Button({
        x: 230,
        y: 25,
        w: 40,
        h: 40,
        s: 1.2,
        r: 0,
        img: cutImg,
        enabled: 1,
        name: "cut",
        call: function() {
            cut();
        },
        success: "selected element/s were cut",
        fail: "select an element to cut"
    });
    btnsArray.cut = cutBtn;
    var pasteBtn = new Button({
        x: 280,
        y: 25,
        w: 40,
        h: 40,
        s: 1.2,
        r: 0,
        img: pasteImg,
        enabled: 1,
        name: "paste",
        call: function() {
            paste();
        },
        success: "clipboard items were pasted",
        fail: "clipboard is empty"
    });
    btnsArray.paste = pasteBtn;
    var settingsBtn = new Button({
        x: 280,
        y: 25,
        w: 40,
        h: 40,
        s: 1.2,
        r: 0,
        img: settingsImg,
        enabled: 1,
        name: "Settings",
        call: function() {
            paste();
        },
        success: "clipboard items were pasted",
        fail: "clipboard is empty"
    });
    btnsArray.paste = pasteBtn;
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360, 100, 100, 100);
    canvas = new Canvas();
    var zoomOutImg = loadImage("assests/buttons/functions/zoomOut.png");
    var zoomInImg = loadImage("assests/buttons/functions/zoomIn.png");

    var zoomInBtn = new Button({
        x: width - 30,
        y: height - 30,
        w: 35,
        h: 35,
        s: 1.2,
        r: 0,
        img: zoomInImg,
        enabled: true,
        name: "zoom in",
        call: function() {
            zoom.value = zoom.value * 1.1;
        }
    });
    btnsArray.zoomIn = zoomInBtn;
    var zoomOutBtn = new Button({
        x: width - 280,
        y: height - 30,
        w: 35,
        h: 35,
        s: 0.8,
        r: 0,
        img: zoomOutImg,
        enabled: true,
        name: "zoom out",
        call: function() {
            zoom.value = zoom.value * 0.9;
        }
    });
    btnsArray.zoomOut = zoomOutBtn;
    //noLoop();

}
var drawItem = x => x.draw()
var clickItem = x => x.clicked()

function draw() {
    //draw loop mainly used to call objects draw functions
    millisecond = millis();
    background('#d1d1d1');
    canvas.draw();
    messagesArray.forEach(drawItem); //loops through the array to show messages
    //btnsArray.forEach(drawItem);
    for (var index in btnsArray) {
        btnsArray[index].draw();
    }
    veggieBurgerMenu.draw();
    showFrameRate();

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

function sendMessage(message, type) {
    //function used to send users messages
    var messageBar = new MessageBar(message, type);
    messagesArray.push(messageBar);
    messageBar.show();
}

function showFrameRate() {
    //this function is for performance testing only, remove preRelease;
    stroke(2);
    strokeWeight(1);
    textSize(24);
    text(frameCount / (millisecond / 1000), width - 40, height - 10);
    // print(frameCount / (millisecond / 1000));
}
var mousePos;

function mouseClicked() {
    // mouse clicked, detects mouse press after release
    // this is used for actions where user can cancel by holding the key while moving away from the action button.()

    veggieBurgerMenu.clicked();
    messagesArray.forEach(clickItem);
    //btnsArray.forEach(clickItem);
    for (var index in btnsArray) {
        btnsArray[index].clicked();
    }
}

function mousePressed() {
    // this  function is called as the mouse is press, before release
    mousePos = createVector(mouseX, mouseY);
    print(mousePos);
}

function mouseDragged() {
    if (mouseX > canvas.x && mouseY > canvas.y && mouseX < canvas.x + (canvas.ws * 1000) && mouseY < canvas.y + (canvas.hs * 1000)) {
        canvas.drag.x -= (mousePos.x - mouseX);
        canvas.drag.y -= (mousePos.y - mouseY);
        mousePos.x = mouseX;
        mousePos.y = mouseY;
        cursor(grab);
    }
    zoom.drag();

}

function keyPressed() {
    //TODO: implement keyboard interface(delete, copy,paste, cut,save)
    //TODO: arrow keys to move visual elements/canvas


}

function undo() {

}

function redo() {

}

function cut() {

}

function copy() {

}

function paste() {

}
