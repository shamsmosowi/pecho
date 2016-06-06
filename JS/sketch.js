var veggieBurgerMenu;
var s;
var millisecond;
var messagesArray = [];
var canvas;
var s;
var grab;
var btnsArray = {};
var buttonText = true;// controls showing of text when mouse hover on button
var btnImgDict = {};

function preload() {
    // things to load before setup() runs
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
    btnImgDict.invite = inviteImg;
    btnImgDict.download = downloadImg;
    btnImgDict.delete = deleteImg;
    btnsArray.undo = undoBtn;
      veggieBurgerMenu = new VeggieBurgerMenu();
    var undoBtn = new Button(80,25,40,40,1,-360,undoImg,true,"undo");
    btnsArray.undo = undoBtn;
    var redoBtn = new Button(130,25,40,40,1,360,redoImg,true,"redo");
    btnsArray.redo = redoBtn;
    var copyBtn = new Button(180,25,40,40,1.2,0,copyImg,true,"copy");
    btnsArray.copy = copyBtn;
    var cutBtn = new Button(230,25,40,40,1.2,0,cutImg,true,"cut");
  btnsArray.cut = cutBtn;
    var pasteBtn = new Button(280,25,40,40,1.2,0,pasteImg,false,"paste",function(){});
  btnsArray.paste = pasteBtn;

}

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360, 100, 100, 100);
    canvas = new Canvas();
    var zoomOutImg = loadImage("assests/buttons/functions/zoomOut.png");
    var zoomInImg = loadImage("assests/buttons/functions/zoomIn.png");
    var zoomInBtn = new Button(width - 30,height -30,35,35,1.2,0,zoomInImg,true,"zoom in",function(){zoom.value = zoom.value*1.1;});
  btnsArray.zoomIn = zoomInBtn;
    var zoomOutBtn = new Button( width - 270,height - 30,35,35,0.8,0,zoomOutImg,true,"zoom out",function(){zoom.value = zoom.value*0.9;});
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
    for(var index in btnsArray) {
      btnsArray[index].draw();
}
    veggieBurgerMenu.draw();
    //showFrameRate();

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
    //  print(frameCount / (millisecond / 1000));
}
var mousePos;
function mouseClicked() {
    // mouse clicked, detects mouse press after release
    // this is used for actions where user can cancel by holding the key while moving away from the action button.()

    veggieBurgerMenu.clicked();
    messagesArray.forEach(clickItem);
    //btnsArray.forEach(clickItem);
    for(var index in btnsArray) {
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
