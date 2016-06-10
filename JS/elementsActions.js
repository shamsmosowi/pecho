class Actions{

linear(array,p,firstValue,lastValue){
  pushToUndos();
  let property = p;
  let h  = 0;
  let index = 0;
  let length = array.length;
  let k = (lastValue-firstValue)/length;
  array.forEach(x=>{x[property] = firstValue+k*index;index+=1});
}
randomize(array,p,minValue,maxValue){
  pushToUndos();
  let property = p;
  array.forEach(x=>{x[property] = random(minValue,maxValue)});
}
alternate(array,p,minValue,maxValue,steps){
//use a sine function to alternate value
//requires a min and max, and step size(period)
pushToUndos();
  let property = p;
let d = (maxValue - minValue)/2;//midpoint(vertical shift and Amplitude)
let k = steps/(2*PI);
let index = 0;
array.forEach(x=>{x[property] = d*Math.sin(k*index)+minValue;index+=1});

}
exponational(){


}
repeatX(array,padding){


}
delete(){

}
align(direction){


}

noise(){

}
}
function unselectall(){
  current.forEach(x=>x.selected =false);

}
function selectall(){
  current.forEach(x=>{x.selected = true});
}
function cut() {

}

function copy() {

}

function paste() {

}

function ondblclick() {

}
