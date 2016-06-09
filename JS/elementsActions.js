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
  let property = p;
let d = (maxValue - minValue)/2;//midpoint(vertical shift and Amplitude)
let k = steps/(2*PI);
let index = 0;
array.forEach(x=>{x[property] = d*Math.sin(k*index)+d;index+=1});

}
repeatX(array,padding){


}
delete(array){
  array.forEach(x=>{if(x.selected)x.()})

}
}
