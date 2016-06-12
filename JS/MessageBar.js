var messageType = {
    // this is a dictionary of color arrays used to allow for styling the message to indecate the type of different information presented to the user
    complete: ['#6FBB84', '#91F5AD', '#fff'], //green used for positive
    tip: ['#4E4EE8', '#4165f0', '#fff'], //blue to give relevent information to the task the user is preforming
    error: ['#E8352E', '#F06541', '#fff'], //red is used to alert users of actions high consequnce
    alert: ['#FFED51', '#FFED75', '#000'] //yellow theme, alert minor errors or suggesting changes
        //TODO: change colours
};
var messageTimer = true; //switchs message timer on
function MessageBar(message, type) {
    // a class for alerting users of problems, notify for any changes, and provides relevent tips related to the context of what the user is creating(by observing selected elements or tools being used)
    // takes a string and message enum value, creates message bar with a dynamic width depending on message length and buttons buttons

    this.messageText = message;
    this.y = height;
    this.w = this.messageText.length * 9 + 100;
    this.x = width / 2 - this.w / 2;
    this.h = 60;
    this.p = 0;
    this.fillColor = type[0];
    this.strokeColor = type[1];
    this.textColor = type[2];
    this.duration = this.messageText.length * 150;
    this.radius = 25;
    this.visible = true;
    this.draw = function() {
        push();
        translate(this.x, this.y);
        strokeWeight(1);
        stroke(color(this.strokeColor));
        fill(color(this.fillColor));
        rect(0, 0, this.w, this.h, 15, 15, 0, 0);
        textSize(20);
        noStroke();
        fill(this.textColor);
        text(this.messageText, 50, 25);
        noFill();
        stroke(this.textColor);

        if (dist(mouseX, mouseY, this.x + this.w - this.radius, this.y + this.h - 40) < 25) {
            strokeWeight(2);
        } else {
            strokeWeight(1);
        }
        this.closeButton();
        pop();
    };
    this.clicked = function() {
        if (dist(mouseX, mouseY, this.x + this.w - this.radius, this.y + this.h - 40) < 25) {
            //  messagesArray.remove(this);
            if (this.visible) {
                this.hide();
                this.visible = false;
            } else {
                this.show();
                this.visible = true;
            }
        }
    };
    this.closeButton = function() {
        var ex = this.w - this.radius;
        var ey = this.h - 40;
        var px = [ex - this.radius / 4, ex + this.radius / 4];
        var py = [ey - this.radius / 4, ey + this.radius / 4];
        line(px[0], py[0], px[1], py[1]);
        line(px[0], py[1], px[1], py[0]);
        //ellipse(ex, ey, this.radius, this.radius);
        arc(ex, ey, this.radius, this.radius, this.p, 2 * PI - 0.01);
        //this.clicked = function(){};
    };
    this.show = function(visible) {
        let yf = height - 35;
        let af = 1;

        var target = this; //defines this object as the target variable to allow for access within the tween object;
        var tween = new TWEEN.Tween({
                y: height,
                A: 0
            })
            .to({
                y: height - 35,
                A: 1
            }, 300)
            .easing(TWEEN.Easing.Circular.InOut)
            .onUpdate(function() {
                target.y = this.y;
            }).start();
        if (messageTimer) {
            var tt = new TWEEN.Tween({
                    p: 0
                })
                .to({
                    p: 2 * PI - 0.01,
                }, target.duration)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function() {
                    target.p = this.p;
                    if (target.p > 6.249) {
                        let tween = new TWEEN.Tween({
                                y: height - 35,
                                s: 1
                            })
                            .to({
                                y: height,
                                s: 0
                            }, 300)
                            .easing(TWEEN.Easing.Circular.InOut)
                            .onUpdate(function() {
                                target.y = this.y;
                            }).start();
                    }

                }).start();
        }
        animate();
    };
    this.hide = function() {
        let target = this; //defines this object as the target variable to allow for access within the tween object;
        let tween = new TWEEN.Tween({
                y: height - 35,
                s: 1
            })
            .to({
                y: height,
                s: 0
            }, 300)
            .easing(TWEEN.Easing.Circular.InOut)
            .onUpdate(function() {
                target.y = this.y;
            }).start();
        animate();
    };
    this.windowResized = function() {
        //keeps bar at the bottom of the screen
        this.y = height - 35;
        this.w = this.messageText.length * 8.5 + 100;
        this.x = width / 2 - this.w / 2;
        this.h = 60;
    };


}
