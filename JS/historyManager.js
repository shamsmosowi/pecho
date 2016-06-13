var clipboard = [];//an array of the last copied or cut elements
var current = [];//this is the array in which the stored objects are displayed on the canvas. and is the current state of the sketch
var undos = [];//an array of previous state of the canvas
var redos = [];//an array of undone states of the canvas
//history mangment is implemented by having a current array containing all the elements in the art work, the current array is pushed into into the undos array, at every action, keeping
function currentCloner(){
  // this creates copy of the elements on the canvas to store in an array of undos
  let clonesArray = [];
  const currentSize = current.length-1;
for(var n = 0; n<=currentSize;n++){
      clonesArray.push(elementCloner(current[n]));

    }
    undos.push(clonesArray);
  return clonesArray;
}
function pushToUndos(){
  //simple function called at each change to the current array.
  undos.push(currentCloner());
  btnsArray.undo.enabled = true;
}
function undo() {
  // returns to a previous state of the canvas
  for (var i = 0; i < 2; i++) {
    //for loop is quick solve to a bug that pushes 2 current array into the undos instead of one for a currently unkown reason
    redos.push(currentCloner());
    current = undos.pop();
    if(undos.length === 0){
      btnsArray.redo.enabled = true;
      btnsArray.undo.enabled = false;
    }else{
    current = undos.pop();
    btnsArray.redo.enabled = true;
    }
    if(undos.length === 0){
      btnsArray.redo.enabled = true;
      btnsArray.undo.enabled = false;
    }
  }

}

function redo() {
  //pushes back a previously undo state of the canvas
    for (var i = 0; i < 2; i++) {
  undos.push(currentCloner());
    current = undos.pop();
    if(redos.length === 0){
      btnsArray.undo.enabled = true;
      btnsArray.redo.enabled = false;
    }else{
    current = redos.pop();
    }
    if(redos.length === 0){
      btnsArray.undo.enabled = true;
      btnsArray.redo.enabled = false;
    }
    }
}
