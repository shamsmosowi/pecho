var mousePos;
var mouse = false;

function mouseClicked() {
    // mouse clicked, detects mouse press after release
    // this is used for actions where user can cancel by holding the key while moving away from the action button.()
    if(mouseMenu.length>0){
    mouseMenu[mouseMenu.length-1].clicked();}
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
    mouse = true;
    mousePos.x = mouseX;
    mousePos.y = mouseY;

}

function mouseDragged() {
    //  if(dist(mouseX,mouseY,canvas.x,canvas.y)<canvas.ws*1000){
    if (mouseX > canvas.x - canvas.ws * 1920 / 2 && mouseY > canvas.y - canvas.hs * 1080 / 2 && mouseX < canvas.x + (canvas.ws * 1920) / 2 && mouseY < canvas.y + (canvas.hs * 1080) / 2) {
        //    canvas.drag.x -= (mousePos.x - mouseX);
        //canvas.drag.y -= (mousePos.y - mouseY);
        current.forEach(x => x.drag((mousePos.x - mouseX), (mousePos.y - mouseY)));
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
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 90 && evtobj.ctrlKey && OSName == "Windows") alert("Ctrl+z");
    if (evtobj.keyCode == 90 && evtobj.keyCode == 91 && OSName == "Mac/iOS") alert("Cmd+z");
}

document.onkeydown = KeyPress;
