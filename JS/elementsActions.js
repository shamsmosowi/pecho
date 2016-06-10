
var waveType = {"triangle":1,"sin":2,"square":3,"even":4,"saw":5}
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
alternate(array,p,minValue,maxValue,steps,type){
//use a sine function to alternate value
//requires a min and max, and step size(period)
pushToUndos();
  let property = p;
let d = (maxValue - minValue)/2;//midpoint(vertical shift and Amplitude)
let k = steps/(2*PI);

let index = 0;
console.log(steps);///

console.log(index);
console.log(steps);
if (type === waveType.triangle){
array.forEach(x=>{x[property] = ((maxValue -minValue)/4)+2*abs((index%steps)-(steps/2))-(steps/4);console.log(x[property]);;index+=1});
}else if(type === waveType.sin){
  array.forEach(x=>{x[property] = d*Math.sin(k*index)+minValue;index+=1});
}else if(type === waveType.even){
  array.forEach(x=>{if(index%2){x[property] = minValue}else{x[property] = maxValue};index+=1});
}else if(type === waveType.saw){
  array.forEach(x=>{x[property] = minValue+(maxValue-minValue)*(index%steps)/steps;index+=1});
}else if(type === waveType.saw){
  array.forEach(x=>{x[property] = minValue+(maxValue-minValue)*(index%steps)/steps;index+=1});
}
}
padding(array,property,padding){
  pushToUndos();
  let index = 0;
  array.forEach(x=>{x[property] = x[property] + padding*index;index+=1});


}
exponational(){


}
repeatX(array,padding){


}
delete(){

}
align(direction){


}

pnoise(array,p,minValue,maxValue){
//perlin noise
pushToUndos();
let property = p;
array.forEach(x=>{x[property] = minValue+(maxValue-minValue)*(noise(minValue,maxValue))});

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
