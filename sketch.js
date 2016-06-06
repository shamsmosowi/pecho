var veggieBurgerMenu;
var s;
var millisecond;
var messagesArray = [];
var canvas;
var s;
function preload() {
    // things to load before setup() runs
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    veggieBurgerMenu = new VeggieBurgerMenu();
    colorMode(HSB, 360, 100, 100, 100);
    canvas = new Canvas();
    //noLoop();

}
var drawItem = x => x.draw()
var clickItem = x => x.clicked()
function draw() {
    //draw loop mainly used to call objects draw functions
    millisecond = millis();
    background('#d1d1d1');
    canvas.draw();

    veggieBurgerMenu.draw();
    messagesArray.forEach(drawItem); //loops through the array to show messages

    veggieBurgerMenu.draw();

    showFrameRate();

}

function windowResized() {
    // keeps canvas at full screen
    resizeCanvas(windowWidth, windowHeight);
    messagesArray.forEach((x) => x.windowResized());

}

function mouseClicked() {
    // mouse clicked, detects mouse press after release
    veggieBurgerMenu.clicked();
    messagesArray.forEach(clickItem);
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

function keyPressed() {
    //TODO: implement keyboard interface(delete, copy,paste, cut,save)
    //TODO: arrow keys to move visual elements


}
