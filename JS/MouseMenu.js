var currentMenu = [];
class MouseMenu{
  constructor(){
    this.visible = false;
    this.background = 0;
    /*
menuDict.main = [1, 2, 3, 4];
menuDict.shapes = [1, 2, 3, 4, 5];
console.log(menuDict.shapes);
*/this.pos = createVector(0,0)
  this.menu = 'main'
  }
  draw(){
    if(visible){
      background(20,this.background);
    push()
    translate(this.pos.x,this.pos.y)
    currentMenu.forEach(drawItem);
    pop()
  }
  }
  doubleClicked(){
    if(!this.visible){
      this.menu = 'main'
    this.visible = true
  }
  }
  itemClicked(){


  }


}
