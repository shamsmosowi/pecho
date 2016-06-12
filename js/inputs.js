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
    //console.log(shiftKey);
    if(!shiftKey&&!cmdKey){current.forEach(x=>x.selected = false)}
    current.forEach(x => x.clicked());
      if(shiftKey||cmdKey){dragSelect.release();}
}

function mousePressed() {
    // this  function is called as the mouse is press, before release,
    mouse = true;
    mousePos.x = mouseX;
    mousePos.y = mouseY;
    //records the intial value of the mouse press position
      if(shiftKey||cmdKey){dragSelect.press();}
}

function mouseDragged() {

    if (mouseX > canvas.x - canvas.ws * 1920 / 2 && mouseY > canvas.y - canvas.hs * 1080 / 2 && mouseX < canvas.x + (canvas.ws * 1920) / 2 && mouseY < canvas.y + (canvas.hs * 1080) / 2) {

        let selectedElements = selected();
        selectedElements.forEach(x => x.drag((mousePos.x - mouseX), (mousePos.y - mouseY)));
        mousePos.x = mouseX;
        mousePos.y = mouseY;
        cursor(grab);
    }
    zoom.drag();
    if(shiftKey||cmdKey){dragSelect.drag();}

}

function keyPressed() {
    //TODO: implement keyboard interface(delete, copy,paste, cut,save)
    //TODO: arrow keys to move visual elements/canvas


}
var shiftKey = false;
var cmdKey = false;
function KeyPress(e) {
    //ref:http://jsfiddle.net/29sVC/
    //ref:http://keycode.info/

  var evtobj = window.event ? event : e
    key = e;
    if (evtobj.keyCode == 90 && evtobj.ctrlKey && !key.shiftKey&&undos.length>0){btnsArray.undo.clicked(true);}
    if (evtobj.keyCode == 90 && evtobj.ctrlKey && key.shiftKey&&redos.length>0){btnsArray.redo.clicked(true);}
    if (evtobj.keyCode == 90 && evtobj.keyCode == 91 && OSName == "Mac/iOS") alert("Cmd+z");
    if (evtobj.keyCode == 91 && evtobj.keyCode == 67){ actions.copy();}
    if (evtobj.keyCode == 91 && evtobj.keyCode == 88){ actions.cut();}
    if (evtobj.keyCode == 91 && evtobj.keyCode == 86){ actions.paste();}
      //console.log(e);
        if (evtobj.keyCode == 91){cmdKey= true};
 if (e.keyCode == 8) {window.event.keyCode = 0;}
      if(key.shiftKey){shiftKey = true;}else{shiftKey= false}
      if (evtobj.keyCode == 90 && cmdKey && !key.shiftKey&&undos.length>0){btnsArray.undo.clicked(true);}
      if (evtobj.keyCode == 90 && cmdKey && key.shiftKey&&redos.length>0){btnsArray.redo.clicked(true);}
      if(evtobj.keyCode == 67&& cmdKey){btnsArray.copy.clicked(true);}
      if(evtobj.keyCode == 88&& cmdKey){btnsArray.cut.clicked(true);}
      if(evtobj.keyCode == 86&& cmdKey){btnsArray.paste.clicked(true);}

      //console.log(e);
}
function keyReleased(e){
    var evtobj = window.event ? event : e
  key = e;
  shiftKey= false;
  cmdKey = false;
//  console.log(e);
  if (e.keyCode == 8) {window.event.keyCode = 0;}
}

document.onkeydown = KeyPress;
document.onkeyup = keyReleased;
