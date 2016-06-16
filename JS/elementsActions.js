var waveType = {
    // this is a dicitonary of functions that can be applied on differnet properties of shape elements, to create genrative patterns
    "triangle": x => {
        //ref:https://en.wikipedia.org/wiki/Triangle_wave
        x[actions.property] = ((actions.max - actions.min) / 4) + 2 * abs((actions.index % actions.steps) - (actions.steps / 2)) - (actions.steps / 4);
        actions.index += 1
    },
    "sin": x => {
        //ref:https://en.wikipedia.org/wiki/Sine_wave
        x[actions.property] = actions.d * Math.sin(actions.k * actions.index) + actions.min;
        actions.index += 1
    },
    "square": x => {
        //ref:https://en.wikipedia.org/wiki/Square_wave
        x[actions.property] = actions.d * sgn(Math.sin(actions.k * actions.index)) + actions.min;
        actions.index += 1
    },
    "even": x => {
        //alternates between the highest and lowest values
        if (actions.index % 2) {
            x[actions.property] = actions.min;
        } else {
            x[actions.property] = actions.max;
        }
        actions.index += 1;
    },
    "saw": x => {
        //ref:https://en.wikipedia.org/wiki/Sawtooth_wave
        x[actions.property] = actions.min + (actions.max - actions.min) * (actions.index % actions.steps) / actions.steps;
        actions.index += 1;
    }
}
class Actions {
    constructor() {
        this.property = 'hue';
        this.index = 0;
        this.d = 0;
        this.k = 0;
        this.min = 0;
        this.max = 0;
        this.steps = 0;
        this.pattern ='linear';
        this.array = selected();
        this.wave = waveType.even;
        this.padding = createVector(50,50);
        this.nIter = createVector(10,10);
    }
    linear() {
        let index = 0;
        let length = this.array.length;
        this.k = (this.max - this.min) / length;
        this.array.forEach(x => {
            x[this.property] = actions.min + actions.k * index;
            index += 1;
        });
    }
    randomize() {
        this.array.forEach(x => {
            x[this.property] = random(actions.min, actions.max)
        });
    }
    alternate() {
        //use a sine function to alternate value
        //requires a min and max, and step size(period)
        //pushToUndos();
        this.d = (this.max - this.min) / 2; //midpoint(vertical shift and Amplitude)
        this.k = this.steps / (2 * PI);
        this.index = 0;
        actions.array.forEach(this.wave);
    }
    Padding(array, property, padding) {
        let index = 0;
        array.forEach(x => {
            x[property] = x[property] + padding * index;
            index += 1
        });
    }
    exponational() {


    }
    repeat1D(array, paddingXY, nIter,index) {
        // is vector used to postion clones in desired direction
        var newArray = [];
        for (var i = 0; i < nIter; i++) {
            for (var a = 0; a < array.length; a++) {
              let x = elementCloner(array[a]);
              x.x = x.x + this.padding.x * index;
                newArray.push(x);

            }

        }

      //  this.Padding(newArray, 'y', paddingXY.y);
        return newArray;
    }
    repeat2D() {
        //padding is a vector
        //nIter is a vector
        pushToUndos();
        let sArray = this.array;
        let newArray = [];
        let paddingXY = this.padding;
        for (var i = 0; i < this.nIter.y; i++) {
            let tempArray = this.repeat1D(sArray, this.padding, this.nIter.x,i);
            this.Padding(tempArray, 'y', this.padding.y);
            moveItem(tempArray, newArray, tempArray.length);
        }
        moveItem(newArray, current, newArray.length);
        //for (var i = 0; i < sArray.length; i++) {sArray[i]}


    }
    delete() {
        if (selected().length > 0) {
            pushToUndos();
            current = current.filter(x => !x.selected);
        }
    }


    paste() {

        //  pushes clipboard clone array to current
        //  let clipboardClone = clipboard.forEach(x=>return elementCloner(x));
        let clipboardLength = clipboard.length;
        if (clipboardLength > 0) {
            pushToUndos();
            for (var a = 0; a < clipboardLength; a++) {
                let newElement = elementCloner(clipboard[a]);
                newElement.selected = true;
                current.push(newElement);
            }

            if (clipboardLength > 1) {
                sendMessage(clipboardLength + " clipboard items were pasted", messageType.complete);
            } else {

                sendMessage("clipboard item was pasted", messageType.complete);
            }
        } else {
            sendMessage("your clipboard is empty", messageType.alert);
        }


    }
    copy() {

        let objects = selected();
        let objectsLength = objects.length;
        if (objectsLength > 0) {
            clipboard = [];
            for (var a = 0; a < objectsLength; a++) {
                clipboard.push(elementCloner(objects[a]));
            }
            if (objectsLength > 1) {
                sendMessage(objectsLength + " selected elements were copied", messageType.complete);
            } else {
                sendMessage("Selected element was copied", messageType.complete);
            }
        } else {
            sendMessage("No element is selected to be copied", messageType.alert);
        }


        //stores a clone in clipboard array

    }
    cut() {
            let selectedLength = selected().length;
            if (selectedLength > 0) {
                pushToUndos();
                clipboard = selected();
                this.delete();
                if (selectedLength > 1) {

                    sendMessage(selectedLength + " selected elements were cut", messageType.complete);
                } else {
                    sendMessage("Selected element was cut", messageType.complete);
                }
            } else {
                sendMessage("No element is selected to be cut", messageType.alert);
            }
        }
        //cut(){clipboard = [];moveItem(selected(),clipboard, selected().length);}
        //current.filter(x=>x.selected);this.delete();

    align(direction) {

    }
    fractal() {

    }
    pnoise(array, p, minValue, maxValue) {
        //perlin noise
        pushToUndos();
        let property = p;
        let index = 0;
        array.forEach(x => {
            x[property] = minValue + (maxValue - minValue) * (noise(index));
            index += 0.1
        });
    }

}

function unselectall() {
    let selectedElements = selected();
    selectedElements.forEach(x => x.selected = false);

}

function selectall() {
    current.forEach(x => {
        x.selected = true
    });
}




function ondblclick() {

}
function selected() {
    return arrayFilter(current, 'selected');
}
function arrayFilter(array, boolean) {
    return array.filter(x => x[boolean]);
}



function elementCloner(obj) {
    if (obj instanceof Shape) {
        let eShape = new Shape(60, 60, 1, 0, true, [createVector(75, 50)], {
            h: 0,
            s: 70,
            b: 100
        });
        return (Object.assign(eShape, obj));
    } else if (obj instanceof Graphic) {
        //let eGraphic = new Graphic(60, 60, 1, 0, true,[createVector(75, 50)],{h:0,s:70,b:100});
        return (Object.assign(eGraphic, obj));
    } //TODO:text element state
}

function moveItem(fromArray, toArray, n) {
    for (var i = 0; i < n; i++) {
        toArray.push(fromArray.pop());
    }
}

function sgn(n) {
    //returns a boolean based on the sign of the sin(n) function, where positive returns true
    if (Math.sin(n) > 0) {
        return true
    } else {
        return false
    }

}
