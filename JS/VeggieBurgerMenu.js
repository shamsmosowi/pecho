function VeggieBurgerMenu() {
    /* this Veggie Burger menu is 100% animal meat free
     it controls the top-left corner minute
     it allows users to access save, share and print, download, other funtionalities.
     a,b,c variables are used to create the menu icon
    */
    this.a = [10, 10, 20, 10, 30, 10];
    this.b = [10, 20, 20, 20, 30, 20];
    this.c = [10, 30, 20, 30, 30, 30];
    this.af = [10, 10, 20, 10, 30, 10];
    this.bf = [10, 20, 20, 20, 30, 20];
    this.cf = [10, 30, 20, 30, 30, 30];
    this.items = [];
    this.nItems = 3;
    this.background = 0;
    this.backgroundf = 0;
    this.spoke =false;
    this.items.push(new MenuItem({
        x: 80,
        y: 25,
        w: 70,
        h: 70,
        s: 1.2,
        r: 0,
        img: btnImgDict.invite,
        enabled: true,
        name: "invite a friend",
        call: function() {}
    }, 1, 3));
    this.items.push(new MenuItem({
        x: 80,
        y: 25,
        w: 70,
        h: 70,
        s: 1.2,
        r: 0,
        img: btnImgDict.download,
        enabled: true,
        name: "download",
        call: function() {}
    }, 2, 3));
    this.items.push(new MenuItem({
        x: 80,
        y: 25,
        w: 70,
        h: 70,
        s: 1.2,
        r: 0,
        img: btnImgDict.delete,
        enabled: true,
        name: "delete Canvas",
        call: function() {}
    }, 3, 3));
    /*
        for (var i = 0; i < this.nItems; i++) {
            var item = new MenuItem(i, this.nItems);
            this.items.push(item);
        }*/

    this.opened = false;
    this.draw = function() {



        background(0, 0, 20, this.background);
        this.items.forEach(drawItem);
        this.mainButton();
    };
    this.mainButton = function() {
        //TODO:Add a blur behind menu to focus, or maybe just a darken everything, if blur is expensive
        stroke(0, 0, 30, 255);

          this.onHover(mouseX < this.a[4] && mouseY < this.c[5]);


        noFill();
        beginShape();

        vertex(this.a[0], this.a[1]);
        vertex(this.a[2], this.a[3]);
        vertex(this.a[4], this.a[5]);
        endShape();
        beginShape();
        vertex(this.b[0], this.b[1]);
        vertex(this.b[2], this.b[3]);
        vertex(this.b[4], this.b[5]);
        endShape();
        beginShape();
        vertex(this.c[0], this.c[1]);
        vertex(this.c[2], this.c[3]);
        vertex(this.c[4], this.c[5]);
        endShape();
    };
    this.clicked = function() {
        if (mouseX < this.a[4] && mouseY < this.c[5] && !this.opened) {
            //changes the state of the button
            this.af = [10, 10, 20, 20, 30, 10];
            this.bf = [20, 20, 20, 20, 20, 20];
            this.cf = [10, 30, 20, 20, 30, 30];
            this.backgroundf = 60;
            this.items.forEach(x => x.show());
            this.opened = true;


        } else if (mouseX < this.a[4] && mouseY < this.c[5] && this.opened) {
            this.af = [10, 10, 20, 10, 30, 10];
            this.bf = [10, 20, 20, 20, 30, 20];
            this.cf = [10, 30, 20, 30, 30, 30];
            this.backgroundf = 0;
            this.items.forEach(x => x.hide());
            this.opened = false;


        } else {
            this.items.forEach(clickItem);
            this.af = [10, 10, 20, 10, 30, 10];
            this.bf = [10, 20, 20, 20, 30, 20];
            this.cf = [10, 30, 20, 30, 30, 30];
            this.backgroundf = 0;
            this.items.forEach(x => x.hide());
            this.opened = false;


        }
        //animates the menu
        //changes the values of a,b,c over 300ms period,
        let target = this;
        let tween = new TWEEN.Tween({
                a1: this.a[0],
                a2: this.a[1],
                a3: this.a[2],
                a4: this.a[3],
                b1: this.b[0],
                b2: this.b[1],
                b3: this.b[2],
                b4: this.b[3],
                c1: this.c[0],
                c2: this.c[1],
                c3: this.c[2],
                c4: this.c[3],
                a5: this.a[4],
                a6: this.a[5],
                b5: this.b[4],
                b6: this.b[5],
                c5: this.c[4],
                c6: this.c[5],


            })
            .to({
                a1: this.af[0],
                a2: this.af[1],
                a3: this.af[2],
                a4: this.af[3],
                b1: this.bf[0],
                b2: this.bf[1],
                b3: this.bf[2],
                b4: this.bf[3],
                c1: this.cf[0],
                c2: this.cf[1],
                c3: this.cf[2],
                c4: this.cf[3],
                a5: this.af[4],
                a6: this.af[5],
                b5: this.bf[4],
                b6: this.bf[5],
                c5: this.cf[4],
                c6: this.cf[5],

            }, 500)
            .easing(TWEEN.Easing.Back.InOut)
            .onUpdate(function() {
                target.a = [this.a1, this.a2, this.a3, this.a4, this.a5, this.a6];
                target.b = [this.b1, this.b2, this.b3, this.b4, this.b5, this.b6];
                target.c = [this.c1, this.c2, this.c3, this.c4, this.c5, this.c6];
            }).start();
        var tween2 = new TWEEN.Tween({
                b: this.background
            })
            .to({
                b: this.backgroundf
            }, 500)
            .easing(TWEEN.Easing.Cubic.InOut)
            .onUpdate(function() {
                target.background = this.b;
            }).start();
        animate();

    };
    this.onHover = function(state){
      if(state){
      strokeWeight(4);
      if(!this.spoke&&voiceEnable){
        this.spoke = true;
        responsiveVoice.speak("Menu",voiceSpeaker);
      }
    }else{
      this.spoke = false;
      strokeWeight(2.5);
    }
  };

}
