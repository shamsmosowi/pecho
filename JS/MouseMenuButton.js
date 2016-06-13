class MouseMenuButton extends Button{
  constructor(options,i,n,padding){
    super(options)
    /*
        circumference of the mouse menu = button(width+padding)*n(number of buttons);
       circumference = 2*pi*radius
        rearrange for calculating the radius of the menu
        r = c/2*pi
        use r to calculate the position of the button using the polar cartian to polar
        x = r × cos( θ )
        y = r × sin( θ )
    */
    this.c = (options.w + padding)*n;
    this.r = this.c/(2*3.1415);
    this.theta = i*(360/n);
    this.x = this.r × cos(this.theta);//check for radians
    this.x = this.r × sin(this.theta);
  }
  click(){
  this.call();
    if (dist(mouseX, mouseY, this.x,this.y) < this.w / 2 && this.enabled || hotKey) {
        this.animateRotation();
        this.animateScale();
        if (this.success) {
            sendMessage(this.success, messageType.complete);
        }
    //  this.call();
    } else if (dist(mouseX, mouseY, this.x, this.y) < this.w / 2 && !this.enabled) {
        if (this.fail) {
            sendMessage(this.fail, messageType.alert);
        }
    }
  }
  //TODO:animation, click trigered actions


}
