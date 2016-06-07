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
var redoArray =[];
var OSName = "Unknown";
function preload() {
    // things to load before setup() runs
/*    app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);

});*/
if (window.navigator.userAgent.indexOf("Windows"))OSName="Windows";
if (window.navigator.userAgent.indexOf("Mac")!=-1) OSName="Mac/iOS";
if (window.navigator.userAgent.indexOf("X11")!=-1) OSName="UNIX";
if (window.navigator.userAgent.indexOf("Linux")!=-1) OSName="Linux";
  console.log(OSName);
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
    var zoomOutImg = loadImage("assests/buttons/functions/zoomOut.png");
    var zoomInImg = loadImage("assests/buttons/functions/zoomIn.png");
    var fullScreenImg = loadImage("assests/buttons/arrows/full-screen.png");
    btnImgDict.fullScreen = fullScreenImg;
    btnImgDict.invite = inviteImg;
    btnImgDict.download = downloadImg;
    btnImgDict.delete = deleteImg;
    btnsArray.undo = undoBtn;
    btnsArray.zoomIn = zoomInImg;
    btnsArray.zoomOut = zoomOutImg;


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
        x: windowWidth - 30,
        y: 30,
        w: 45,
        h: 45,
        s: 1.1,
        r: 360,
        img: settingsImg,
        enabled: true,
        name: "Settings",
        call: function() {
          //shows settings menu

        }
    });
    btnsArray.settings = settingsBtn;
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360, 100, 100, 100);
    canvas = new Canvas();


    var zoomInBtn = new Button({
        x: width - 30,
        y: height - 30,
        w: 35,
        h: 35,
        s: 1.2,
        r: 0,
        img: btnsArray.zoomIn,
        enabled: true,
        name: "zoom in",
        call: function() {
            zoom.value = zoom.value * 1.1;
        }
    });
    btnsArray.zoomIn = zoomInBtn;
    var zoomOutBtn = new Button({
        x: width - 270,
        y: height - 25,
        w: 35,
        h: 35,
        s: 0.8,
        r: 0,
        img: btnsArray.zoomOut,
        enabled: true,
        name: "zoom out",
        call: function() {
            zoom.value = zoom.value * 0.9;
        }
    });
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
        }
    });
    btnsArray.fullScreen = fullScreenBtn;
    mousePos = createVector(mouseX,mouseY);
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
    noFill();
    strokeWeight(1.5);
    stroke(240,65,50,70);if(mouse){
    rect(mousePos.x,mousePos.y,mouseX-mousePos.x,mouseX-mousePos.y);}
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
var mouse = false;
function mouseClicked() {
    // mouse clicked, detects mouse press after release
    // this is used for actions where user can cancel by holding the key while moving away from the action button.()

    veggieBurgerMenu.clicked();
    messagesArray.forEach(clickItem);
    mouse = false;
    //btnsArray.forEach(clickItem);
    for (var index in btnsArray) {
        btnsArray[index].clicked();
    }
}

function mousePressed() {
    // this  function is called as the mouse is press, before release
    mouse =true;
    mousePos.x = mouseX;mousePos.y = mouseY;

}

function mouseDragged() {
//  if(dist(mouseX,mouseY,canvas.x,canvas.y)<canvas.ws*1000){
    if (mouseX > canvas.x - canvas.ws*1920/2 && mouseY > canvas.y - canvas.hs*1080/2 && mouseX < canvas.x + (canvas.ws * 1920)/2 && mouseY < canvas.y + (canvas.hs * 1080)/2) {
        //canvas.drag.x -= (mousePos.x - mouseX);
        //canvas.drag.y -= (mousePos.y - mouseY);
        canvas.elements[canvas.elements.length-1].forEach(x=>x.drag((mousePos.x - mouseX),(mousePos.y - mouseY)));
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
function KeyPress(e) {
  //ref:http://jsfiddle.net/29sVC/
  //ref:http://keycode.info/
      var evtobj = window.event? event : e
      if (evtobj.keyCode == 90 && evtobj.ctrlKey&&OSName =="Windows") alert("Ctrl+z");
      if (evtobj.keyCode == 90 && evtobj.keyCode==91&&OSName =="Mac/iOS") alert("Cmd+z");
}

document.onkeydown = KeyPress;

window.onresize = function() {
    // centers canvas
    canvas.x = ((width / 2) - (canvas.ws * canvasWidth) / 2) + canvas.drag.x;
    canvas.y = ((height / 2) - (canvas.hs * canvasHeight) / 2) + canvas.drag.y;
    //keeps zoom bar & btns in its postion during window rescaling
    zoom.x = width - 250;
    zoom.y = height - 30;
    btnsArray.zoomOut.x = width - 270;
    btnsArray.zoomOut.y = height - 26;
    btnsArray.zoomIn.x = width - 30;
    btnsArray.zoomIn.y = height - 26;
    btnsArray.settings.x = width -30;
    btnsArray.fullScreen.y = height - 26;
    btnsArray.fullScreen.x = width - 310;
};
function undo() {


  if(canvas.elements.length === 0){
    btnsArray.undo.enabled = false;
    btnsArray.redo.enabled = true;
  }else{
  redos.push(canvas.elements.pop());
  }

  if(canvas.elements.length === 0){
    btnsArray.undo.enabled = false;
    btnsArray.redo.enabled = true;
  }
}

function redo() {

  if(redos.length === 0){
    btnsArray.undo.enabled = true;
    btnsArray.redo.enabled = false;
  }else{
  canvas.elements.push(redos.pop());
  }

  if(redos.length === 0){
    btnsArray.undo.enabled = true;
    btnsArray.redo.enabled = false;
  }
}

function cut() {

}

function copy() {

}

function paste() {

}
