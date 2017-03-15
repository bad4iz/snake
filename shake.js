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
    FIELD_WIDTH: 100, // in point
    FIELD_HEIGHT: 50, // in point

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    START_DIRECTION: 39,

    DEFAULT_COLOR: "222",
    FOOD_COLOR: "#423",
    START_SNAKE_X: 10,
    START_SNAKE_Y: 10,
    START_SNAKE_SIZE: 6,

    GAME_OVER: false,
    SHOW_DELAY: 100,
    getRandom: function (max) {
        return Math.random() * max;
    }
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
    }

    go() {
        let canvas = new Canvas();
        let ctx = canvas.context('2d');
        console.log('DIRECTION ' + conf.START_DIRECTION);
        let snake = new Snake(conf.START_SNAKE_X, conf.START_SNAKE_Y, conf.START_SNAKE_SIZE, conf.START_DIRECTION);
        snake.paint(ctx);

        addEventListener("keydown", function (event) {
            snake.setDirection(event.keyCode);
            console.log(event.keyCode);
        });

        let food = new Food();

        setInterval(() => {
            if (conf.GAME_OVER) {
                return
            }
            snake.move(ctx);
            food.next(ctx);
        }, conf.SHOW_DELAY);


    }
}

class Point {
    constructor(xq, yq) {
        this.setXY(xq, yq);
        this.color = conf.DEFAULT_COLOR;
        this.graphics = {};
    }

    paint(graphics) {
        this.graphics = graphics;
        graphics.beginPath();
        graphics.fillStyle = this.color;
        graphics.fillRect(this.x, this.y, conf.POINT, conf.POINT);
        graphics.beginPath();
    }

    set y(variable) {
        this._y = variable;
    }

    set x(variable) {
        this._x = variable;
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

    clear() {
        this.graphics.clearRect(this.x, this.y, conf.POINT, conf.POINT);
    }
}

class Snake {
    constructor(x, y, length, direction) {
        let i;
        this.length = length;
        this.snake = [];
        for (i = 0; i < this.length; i += 1) {
            let point = new Point((x - i) * conf.POINT, y);
            this.snake.push(point);
        }
        this.direction = direction;
        this.graphics = {};
    }

    paint(graphics) {
        this.snake.forEach((point) => point.paint(graphics))
    }

    setDirection(direction) {
        if ((direction >= conf.LEFT) && (direction <= conf.DOWN)) {
            if (Math.abs(this.direction - direction) != 2) {
                this.direction = direction;
            }
        }
    }

    move(graphics) {
        this.graphics = graphics;
        let x = this.snake[0].x;
        let y = this.snake[0].y;

        if (this.direction == conf.LEFT) {
            x -= conf.POINT;
        }
        if (this.direction == conf.RIGHT) {
            x += conf.POINT;
        }
        if (this.direction == conf.UP) {
            y -= conf.POINT;
        }
        if (this.direction == conf.DOWN) {
            y += conf.POINT;
        }

        if (x > conf.FIELD_WIDTH * conf.POINT) {
            x = 0;
        }
        if (x < 0) {
            x = conf.FIELD_WIDTH * conf.POINT - 1;
        }
        if (y > conf.FIELD_HEIGHT * conf.POINT - 1) {
            y = 0;
        }
        if (y < 0) {
            y = conf.FIELD_HEIGHT * conf.POINT - 1;
        }

        this.snake.unshift(new Point(x, y));
        this.removeTail();
        console.log('move ' + this.snake.length);
        this.paint(this.graphics);

    }

    removeTail() {
        this.snake[this.length].clear();
        this.snake.pop(this.snake[this.length]);
    }

    isInsideSnake(x, y) {
        this.snake.forEach((point) => {
            if ((point.x() == x) && (point.x() == y)) {
                return true;
            }
        });
        return false;
    }
    isFood(food) {
    return ((this.snake[0].x == food.x) && (this.snake[0].x == food.y));
}

}

class Food extends Point {
    constructor() {
        super(-1, -1);
        this.color = conf.FOOD_COLOR;
    }

    eat() {
        this.setXY(-1, -1);
    }

    isEaten() {
        return this.x() == -1;
    }

    next(graphics) {
        let x,
            y;
            x = conf.getRandom(conf.FIELD_WIDTH * conf.POINT) / conf.POINT ;
            y = conf.getRandom(conf.FIELD_HEIGHT* conf.POINT) / conf.POINT ;
        this.setXY(x, y);
        this.paint(graphics)
    }
}


new GameSnake().go();