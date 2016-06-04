var veggieBurgerMenu;
var s;
var millisecond;
var messagesArray = [];
function preload() {
    // things to load before setup() runs
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    veggieBurgerMenu = new VeggieBurgerMenu();
    colorMode(HSB, 360, 100, 100, 100);
}
function draw() {
    //draw loop mainly used to call objects draw functions
    millisecond = millis();
    background(255);
    veggieBurgerMenu.draw();
    let messagesArrayLength = messagesArray.length;
    for (var i = 0; i < messagesArrayLength; i++) {
        messagesArray[i].draw();
    }

    showFrameRate();
}
function windowResized() {
    // keeps canvas at full screen
    resizeCanvas(windowWidth, windowHeight);
    let messagesArrayLength = messagesArray.length;//local scope
    for (var i = 0; i < messagesArrayLength; i++) {
        messagesArray[i].windowResized();
    }
}
function mouseClicked() {
    // mouse clicked, detects mouse press after release
    veggieBurgerMenu.clicked();
    let messagesArrayLength = messagesArray.length;
    for (var i = 0; i < messagesArrayLength; i++) {
        messagesArray[i].clicked();
    }
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
    textSize(24);
    text(frameCount / (millisecond / 1000), width - 40, height - 10);
  //  print(frameCount / (millisecond / 1000));
}

function keyPressed() {
//TODO: implement keyboard interface(delete, copy,paste, cut,save)
//TODO: arrow keys to move visual elements

}
