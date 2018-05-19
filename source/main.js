/**
 * Created by bad4iz on 14.03.2017.
 */
const POINT = 20;

const conf = {
    POINT: POINT, // in pix
    FIELD_WIDTH: Math.floor(document.documentElement.clientWidth  / POINT), // in point
    FIELD_HEIGHT: Math.floor(document.documentElement.clientHeight  / POINT ), // in point

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    START_DIRECTION: 39,

    DEFAULT_COLOR: "#222",
    FOOD_COLOR: "#090",
    POISON_COLOR: "#900",
    START_SNAKE_X: 10,
    START_SNAKE_Y: 10,
    START_SNAKE_SIZE: 6,
    GAME_OVER: false,
    SHOW_DELAY: 100,
    getRandom: function (max) {
        return Math.round(Math.random() * max);
    }
};

/**
 * холст
 */
class Canvas {
    constructor() {
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.id = "snake_canvas";
        document.body.appendChild(this.canvasElement);
        this.canvasElement.width = conf.FIELD_WIDTH * conf.POINT;
        this.canvasElement.height = conf.FIELD_HEIGHT * conf.POINT;
        this.canvasElement.style.position = 'fixed';
        this.canvasElement.style.top = '0';
        this.canvasElement.style.left = '0';
    }

    context(context) {
        return this.canvasElement.getContext(context);
    }
}
/**
 * игра
 */
class GameSnake {
    go() {
        let canvas = new Canvas();
        let ctx = canvas.context('2d');
        let food = new Food();
        let poisons = [];
        let snake = new Snake(food, poisons);
        snake.paint(ctx);

        addEventListener("keydown", function (event) {
            snake.setDirection(event.keyCode);
        });

        setInterval(() => {
            if (conf.GAME_OVER) {
                return;
            }
            snake.move(ctx);

            if (food.isEaten()) {
                poisons.push(new Poison(ctx));
                food.next(ctx);
            }
        }, conf.SHOW_DELAY + 100);
    }
}
/**
 * точка
 */
class Point {
    constructor(x, y) {
        this.setXY(x, y);
        this.color = conf.DEFAULT_COLOR;
        this.graphics = {};
    }

    paint(graphics) {
        this.graphics = graphics;
        graphics.beginPath();
        graphics.fillStyle = this.color;
        graphics.fillRect(this.x, this.y, conf.POINT, conf.POINT);
    }

    isYou(x, y) {
        if ((this.x == x) && (this.y == y)) {
            return this instanceof Point;
        }
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

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    clear() {
        this.graphics.clearRect(this.x, this.y, conf.POINT, conf.POINT);
    }

}
/**
 * змея
 */
class Snake {
    constructor(food, poisons) {
        let i,
            x = conf.START_SNAKE_X,
            y = conf.START_SNAKE_Y;
        this.length = conf.START_SNAKE_SIZE;
        this.snake = [];
        this.direction = conf.START_DIRECTION;
        this.graphics = {};
        this.food = food;
        this.poisons = poisons;
        // инициализация тела змеи
        for (i = 0; i < this.length; i += 1) {
            let point = new Point((x - i) * conf.POINT, y);
            this.snake.push(point);
        }
    }

    /**
     * прорисовка тела
     * @param graphics
     */
    paint(graphics) {
        this.snake.forEach((point) => point.paint(graphics))
    }

    /**
     * фильт направлений и нажитий клавиш
     * @param direction
     */
    setDirection(direction) {
        if ((direction >= conf.LEFT) && (direction <= conf.DOWN)) { // отсев
            if (Math.abs(this.direction - direction) != 2) { // отсев вхождения головы в во второй элемент тела
                this.direction = direction;
            }
        }
    }

    /**
     * шаг змеи
     * @param graphics
     */
    move(graphics) {
        this.graphics = graphics;
        // получаем голову
        let x = this.snake[0].x;
        let y = this.snake[0].y;

        [x, y] = this.getDirection(x, y); // деструктивное присваивание координат следующего шага

        conf.GAME_OVER = this.isInsideSnake(x, y) || this.isInsidePoison(x, y);

        if (this.food.isYou(x, y)) { // это еда
            this.food.eat();
        } else {
            this.removeTail(); // иначе удалить хвост
        }

        this.snake.unshift(new Point(x, y));
        this.paint(this.graphics);
    }

    /**
     * удалить хвост
     */
    removeTail() {
        let snakeLength = this.snake.length - 1;
        this.snake[snakeLength].clear();
        this.snake.pop(snakeLength);
    }

    /**
     * проверка вхождения головы в тело
     * @param x
     * @param y
     * @returns {boolean}
     */
    isInsideSnake(x, y) {
        let inside = false;
        this.snake.forEach((point) => {
            if (point.isYou(x, y)) {
                inside = true;
            }
        });
        return inside;
    }

    /**
     *  проверка вхождения головы в яд
     * @param x
     * @param y
     * @returns {boolean}
     */
    isInsidePoison(x, y) {
        let inside = false;
        this.poisons.forEach((point) => {
            if (point.isYou(x, y)) {
                inside = true;
            }
        });
        return inside;
    }

    /**
     * логика вычисления координат следующего шага
     * @param x
     * @param y
     * @returns {[x,y]}
     */
    getDirection(x, y) {
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
            x = conf.FIELD_WIDTH * conf.POINT;
        }
        if (y > conf.FIELD_HEIGHT * conf.POINT) {
            y = 0;
        }
        if (y < 0) {
            y = conf.FIELD_HEIGHT * conf.POINT;
        }
        return [x, y];
    }

}
/**
 * еда
 */
class Food extends Point {
    constructor() {
        super(-100, -100);
        this.color = conf.FOOD_COLOR;
    }

    eat() {
        this.clear();
        this.setXY(-100, -100);
    }

    isEaten() {
        return this.x == -100;
    }

    /**
     * следующаая перересовка еды
     * @param graphics
     */
    next(graphics) {
        let x = conf.getRandom(conf.FIELD_WIDTH) * conf.POINT;
        let y = conf.getRandom(conf.FIELD_HEIGHT) * conf.POINT;
        this.setXY(x, y);
        this.paint(graphics)
    }
}
/**
 * яд
 */
class Poison extends Food {
    constructor(graphics) {
        super();
        this.color = conf.POISON_COLOR;
        this.next(graphics);
    }
}

// запуск
let snake = new GameSnake();
snake.go();