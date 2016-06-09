var redos = [];
var undos = [];
var clipboard = [];
var current = [];
//history mangment is implemented by having a current array containing all the elements in the art work, the current array is pushed into into the undos array, at every action, keeping
function currentCloner(){
  let clonesArray = [];
  //current.forEach(x=> var a = new Shape(1, 1, 1, 1, [createVector(1,1)],{h:1,s:1,b:1});clonesArray.push(a);});
  //current = [];
  const currentSize = current.length-1;
for(var n = 0; n<=currentSize;n++){
  let ax = new Shape(60, 60, 1, 0, true,[ createVector(75, 50), createVector(100, 100), createVector(50, 100)],{h:0,s:70,b:100});
      clonesArray.push(Object.assign(ax,current[n]));
    //clonesArray[n].hue = 250;
    }
    undos.push(clonesArray);
    //current.reduce(x =>let a = new Shape(1, 1, 1, 1, [createVector(1,1)],{h:1,s:1,b:1}); x.hue = 60;console.log(a););
  return clonesArray;
}
function pushToUndos(){
  //simple function called at each change to the current array.
  undos.push(currentCloner());
  btnsArray.undo.enabled = true;
}
function undo() {
  for (var i = 0; i < 2; i++) {
    //for loop is quick solve to a bug that pushes 2 current array into the undos instead of one
    redos.push(currentCloner());
    current = undos.pop();
    if(undos.length === 0){
      btnsArray.redo.enabled = true;
      btnsArray.undo.enabled = false;
    }else{
    current = undos.pop();
    }
    if(undos.length === 0){
      btnsArray.redo.enabled = true;
      btnsArray.undo.enabled = false;
    }
  }

}

function redo() {
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
