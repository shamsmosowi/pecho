var mousePos;
var mouse = false; //tracks the press state of the mouse

document.onkeydown = KeyPress;
document.onkeyup = keyReleased;
document.ondblclick = doubleClick;
window.onscroll= mouseWheel;
function mouseClicked() {

    // mouse clicked, detects mouse press after release
    // this is used for actions where user can cancel by holding the key while moving away from the action button.()
    if (mouseMenu.length > 0) {

        mouseMenu[mouseMenu.length - 1].clicked();
    }
    veggieBurgerMenu.clicked();
    messagesArray.forEach(clickItem);
    mouse = false;
    //btnsArray.forEach(clickItem);
    for (var index in btnsArray) {
        btnsArray[index].clicked();
    }
    //console.log(shiftKey);
    //if(!shiftKey&&!cmdKey){unselectall()}
    if (!canvas.movable&& dialogBox.length===0) {
        if (!shiftKey && !cmdKey) {
            current.forEach(x => x.selected = false);
        }
            current.forEach(x => x.clicked());
        if (shiftKey || cmdKey) {
            dragSelect.release();
        }
    }
  mouseMenu.splice(0, 1);// hides the mouse menu
  if(dialogBox.length>0){
dialogBox[dialogBox.length-1].clicked();
}
}


function mousePressed() {
    // this  function is called as the mouse is press, before release,
    mouse = true;
    mousePos.x = mouseX;
    mousePos.y = mouseY;
    //records the intial value of the mouse press position
    if (!canvas.movable) {
        if (shiftKey || cmdKey) {
            dragSelect.press();
        }
    }
}

function mouseDragged() {
    if(dialogBox.length>0){
      dialogBox[dialogBox.length-1].drag((mousePos.x - mouseX), (mousePos.y - mouseY))
    }else if (!canvas.movable) {
        if (mouseX > canvas.x - canvas.ws * 1920 / 2 && mouseY > canvas.y - canvas.hs * 1080 / 2 && mouseX < canvas.x + (canvas.ws * 1920) / 2 && mouseY < canvas.y + (canvas.hs * 1080) / 2) {

            let selectedElements = selected();
            selectedElements.forEach(x => x.drag((mousePos.x - mouseX), (mousePos.y - mouseY)));

          //  cursor(grab);
        }

        if (shiftKey || cmdKey) {
            dragSelect.drag();
        }
    } else {
        canvas.move((mousePos.x - mouseX), (mousePos.y - mouseY));

    }
    mousePos.x = mouseX;
    mousePos.y = mouseY;

    zoom.drag();
}

function keyPressed() {
    //TODO: arrow keys to move visual elements/canvas


}
var shiftKey = false;
var cmdKey = false;

function KeyPress(e) {
    //ref:http://jsfiddle.net/29sVC/
    //ref:http://keycode.info/


    var evtobj = window.event ? event : e
    key = e;
    if (!e.metaKey) {
        e.preventDefault();
    }

    if (evtobj.keyCode == 90 && evtobj.ctrlKey && !key.shiftKey && undos.length > 0) {
        btnsArray.undo.clicked(true);
    }
    if (evtobj.keyCode == 90 && evtobj.ctrlKey && key.shiftKey && redos.length > 0) {
        btnsArray.redo.clicked(true);
    }

    if (evtobj.ctrlKey && evtobj.keyCode == 67) {
        actions.copy();
    }
    if (evtobj.ctrlKey && evtobj.keyCode == 88) {
        actions.cut();
    }
    if (evtobj.ctrlKey && evtobj.keyCode == 86) {
        actions.paste();
    }
    if (evtobj.ctrlKey && evtobj.keyCode == 65) {
        selectall();
    }
    //console.log(e);
    if (evtobj.keyCode == 91) {
        cmdKey = true
    };
    if (e.keyCode == 8 || e.keyCode == 46) {
        actions.delete();
    }
    if (e.keyCode == 27) {
        unselectall();
        closeMouseMenu();
    }
    if (key.shiftKey) {
        shiftKey = true;
    } else {
        shiftKey = false
    }
    if (evtobj.keyCode == 90 && cmdKey && !key.shiftKey && undos.length > 0) {
        btnsArray.undo.clicked(true);
    }
    if (evtobj.keyCode == 90 && cmdKey && key.shiftKey && redos.length > 0) {
        btnsArray.redo.clicked(true);
    }
    if (evtobj.keyCode == 67 && cmdKey) {
        btnsArray.copy.clicked(true);
    }
    if (evtobj.keyCode == 88 && cmdKey) {
        btnsArray.cut.clicked(true);
    }
    if (evtobj.keyCode == 86 && cmdKey) {
        btnsArray.paste.clicked(true);
    }
    if (evtobj.keyCode == 65 && cmdKey) {
        selectall();
    }
    //console.log(e);


    let stepper // used to controller movement speed

    if (shiftKey || cmdKey) {
        stepper = 10
    } else {
        stepper = 1;
    }
    //arrow keys to control the movement of selected elements
    if (evtobj.keyCode == 37) {
        selected().forEach(x => x.drag(stepper, 0))
    }
    if (evtobj.keyCode == 38) {
        selected().forEach(x => x.drag(0, stepper))
    }
    if (evtobj.keyCode == 39) {
        selected().forEach(x => x.drag(-stepper, 0))
    }
    if (evtobj.keyCode == 40) {
        selected().forEach(x => x.drag(0, -stepper))
    }



}

function keyReleased(e) {
    var evtobj = window.event ? event : e
    key = e;
    shiftKey = false;
    cmdKey = false;
    //  console.log(e);
    if (e.keyCode == 8) {
        window.event.keyCode = 0;
    }

}

function doubleClick() {
    // double click gives the user a contextual menu, it checks for selected elements to provide a more consise an useful set of tools
    let mousePos = createVector(mouseX, mouseY);
    let menuBtns = []
    if (selected().length === 0) {
        menuBtns = [{
            name: 'shapes',
            img: btnImgDict.shapes,
            call: shapesCall
        }, {
            name: 'Background Colour',
            img: btnImgDict.paintPalette,
            call: function() {
              let d = new Popup(width/2, height/2, 'Background Colour', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['hue','brightness','saturation'],[paramsDict.BhueSlider,paramsDict.BbrightnessSlider,paramsDict.BsaturationSlider]);
              dialogBox.push(d);
              closeMouseMenu()
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
    }

    if (selected().length > 0) {
      actions.array = selected()
        menuBtns = [{
            name: 'repeat',
            img: btnImgDict.shapes,
            call: function() {
            pushToUndos();
            let xSlider = new Slider(50, 90, 200, 10, 10, 0, 50, function(val) {
                undo()
                actions.nIter.x = round(val);
                actions.repeat2D()
            });
            let ySlider = new Slider(50, 90, 200, 10, 10, 0, 50, function(val) {
              actions.nIter.y = round(val);
              undo()
              actions.repeat2D()
            });
            let paddingXSlider = new Slider(50, 90, 200, 10, 10, 0, 200, function(val) {
                undo()
                actions.padding.x = round(val);
                actions.repeat2D()
            });
            let paddingYSlider = new Slider(50, 90, 200, 10, 10, 0, 200, function(val) {
              actions.padding.y = round(val);
              undo()
              actions.repeat2D()
            });

            let d = new Popup(width / 2, height / 2, 'Choose a range(Random)', [simpleBtnDict.saveBtn, simpleBtnDict.cancelBtn], ['columns','padding(x)','rows', 'padding(y)'], [ySlider,paddingXSlider, xSlider,paddingYSlider]);
            dialogBox.push(d);
            closeMouseMenu()
          }
        }, {
            name: 'colors',
            img: btnImgDict.paintPalette,
            call: function() {
              actions.property = 'hue';
              modeCall();
            }
        }, {
            name: 'scale',
            img: btnImgDict.scale,
            call: function() {
              actions.property = 'scale';
              modeCall();
            }
        }, {
            name: 'rotate',
            img: btnImgDict.rotate,
            call: function() {
              actions.property = 'rotation';
              modeCall();
            }
        }, {
            name: 'x',
            img: btnImgDict.y,
            call: function() {
              actions.property = 'x';
              modeCall();
            }
        }, {
            name: 'y',
            img: btnImgDict.x,
            call: function() {
              actions.property = 'y';
              modeCall();
            }
        }]
    }

    mm = new MouseMenu(mousePos, menuBtns);
    mouseMenu.push(mm);
    mouseMenu[mouseMenu.length - 1].visible = true;
}

// prevent defualt right click menu, ref:http://stackoverflow.com/questions/4909167/how-to-add-a-custom-right-click-menu-to-a-webpage
if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        doubleClick();
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function() {
        doubleClick();
        window.event.returnValue = false;
    });
}

function mouseWheel(event) {
  //TODO:scrolling to zoom does not work
    zoom.value += event.delta/10;

}
