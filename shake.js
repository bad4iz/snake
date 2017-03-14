// /**
//  * Created by bad4iz on 14.03.2017.
//  */
// let canvas = document.getElementById('canvas');
// let ctx = canvas.getContext('2d');
// //
// // ctx.fillStyle = '#369';
// // ctx.fillRect(10, 10, 55, 50);
//
// ctx.fillStyle = '#369';
// for (var x = 0.5; x < 1000; x += 10) {
//     ctx.moveTo(x, 0);
//     ctx.lineTo(x, 1500);
// }
// ctx.strokeStyle = "#000";
// ctx.stroke();
// for (var y = 0.5; y < 1500; y += 10) {
//     ctx.moveTo(0, y);
//     ctx.lineTo(1000, y);
// }
// ctx.strokeStyle = "#000";
// ctx.stroke();
//
// ctx.beginPath();
// ctx.moveTo(0, 40);
// ctx.lineTo(240, 40);
// ctx.moveTo(260, 40);
// ctx.lineTo(500, 40);
// ctx.moveTo(495, 35);
// ctx.lineTo(500, 40);
// ctx.lineTo(495, 45);
// ctx.strokeStyle = "#666";
// ctx.stroke();
//
// ctx.moveTo(60, 0);
// ctx.lineTo(60, 153);
// ctx.moveTo(60, 173);
// ctx.lineTo(60, 375);
// ctx.moveTo(65, 370);
// ctx.lineTo(60, 375);
// ctx.lineTo(55, 370);
// ctx.strokeStyle = "#741";
// ctx.stroke();
//
// function graf(step = 0.5) {
//     ctx.moveTo(0, 200);
//     return function () {
//         ctx.beginPath();
//         for (var x = 0.5; x < 1500; x += step) {
//             ctx.lineTo(x, Math.random() * 150 + 200);
//         }
//         ctx.strokeStyle = "#789";
//         ctx.stroke();
//         setTimeout(function () {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//         }, 1);
//
//     }
// }
//
//
// // setInterval(graf(2), 2);
//
// (function () {
//     ctx.beginPath();
//     for (var x = 0.5; x < 1500; x += 1) {
//         ctx.lineTo(x, Math.random() * 150 + 200);
//     }
//     ctx.strokeStyle = "#789";
//     ctx.stroke();
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);
// })();

let conf = {
    POINT: 10, // in pix
    FIELD_WIDTH: 300, // in point
    FIELD_HEIGHT: 200, // in point

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    START_DIRECTION: this.RIGHT,
    DEFAULT_COLOR: "222",
    FOOD_COLOR: "#423",
    START_SNAKE_X: 10,
    START_SNAKE_Y: 10,
    START_SNAKE_SIZE: 6,


    GAME_OVER: false
};


// создаем холст
class Canvas {
    constructor() {
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.id = "snake_canvas";
        document.body.appendChild(this.canvasElement);
        this.canvasElement.width = conf.FIELD_WIDTH * conf.POINT + conf.POINT;
        this.canvasElement.height = conf.FIELD_HEIGHT * conf.POINT + conf.POINT;
    }

    context(context) {
        return this.canvasElement.getContext(context);

    }
}


class GameSnake {
    constructor() {

        // const START_LOCATION = 200;

        // const SHOW_DELAY = 150;

    }

    go() {
        addEventListener("keydown", function (event) {
            console.log(event.keyCode);
        });
        let canvas = new Canvas();
        let ctx = canvas.context('2d');

        let snake = new Snake(conf.START_SNAKE_X, conf.START_SNAKE_Y, conf.START_SNAKE_SIZE, conf.START_DIRECTION);
        snake.paint(ctx);

        setInterval( ()=> {
                snake.move();
            snake.paint(ctx);

        }, 1000)

    }
}

class Point {
    constructor(xq, yq) {
        this.setXY(xq, yq);
        this.color = conf.DEFAULT_COLOR;
    }

    paint(graphics) {
        graphics.beginPath();
        graphics.fillStyle = this.color;
        graphics.fillRect(this.x, this.y, conf.POINT, conf.POINT);
        graphics.beginPath();
    }

    set y(variable) {
        this._y = variable * conf.POINT;
    }

    set x(variable) {
        this._x = variable * conf.POINT;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    setXY(xq, yq) {
        this.x = xq;
        this.y = yq;
    }

    // clear(graphics){
    //     graphics.clear(this.x, this.y, conf.POINT, conf.POINT);
    // }
}

class Snake {
    constructor(x, y, length, direction) {
        let i;
        this.length = length;
        this.snake = [];
        for (i = 0; i < this.length; i += 1) {
            let point = new Point(x - i, y);
            this.snake.push(point);
        }
        this.direction = direction;
    }

    paint(graphics) {
        this.snake.forEach((point) => point.paint(graphics))
    }

    move() {
        let x = this.snake[0].x;
        let y = this.snake[0].y;
        // if (this.direction == conf.LEFT) { x--; }
        // if (this.direction == conf.RIGHT) { x++; }
        // if (this.direction == conf.UP) { y--; }
        // if (this.direction == conf.DOWN) { y++; }
        x++;
        this.snake.push(new Point(x, y));
        console.log('move sdfasdfsdf' + x);
    }
}

class Food extends Point {
    constructor() {
        super(-1, -1);
        this.color = conf.FOOD_COLOR;
    }
}


new GameSnake().go();