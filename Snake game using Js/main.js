var s;
var sc1 = 20;
var food;

function setup() {
    createCanvas(600, 600);
    s = new snake();
    //Delay the movement of square to be like arcade games
    frameRate(10);
    //will be defined later
    pickLocation();

}

function pickLocation() {
    var cols = floor(width / sc1);
    var rows = floor(height / sc1);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(sc1);
}

function draw() {
    background(0);
    s.death();
    s.update();
    s.show();

    if (s.eat(food)) {
        pickLocation()
    }


    //food
    fill(242, 242, 242);
    rect(food.x, food, y, sc1, sc1)

}

function keypressed() {
    if (keyCode === UP_ARROW) {
        s.dir(0, -1)
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1)
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}


function snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y
    }


    this.eat = function (pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 4) {
            this.total++;
            return true;
        } else {
            return false
        }
    }
    this.death = function () {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.total = 0;
                this.tail = [];
            }
        }
    }

    this.update = function () {
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1]
        }
        this.tail[this.total] = createVector(this.x, this.y)
        this.x = this.x + this.xspeed * sc1;
        this.y = this.y + this.yspeed * sc1;

        //to avoid snake to go out the canvas
        this.x = constrain(this.x, 0, width - sc1);
        this.y = constrain(this.y, 0, height - sc1);


    }

    this.show = function () {
        fill(1, 245, 0);
        for (var i = 0; i < this.total; i++) {
            rect(this.tail[i].x, this.tail[i].y, sc1, sc1)
        }
        rect(this.x, this.y, sc1, sc1)
    }









}


