
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace Snake {
    let snake: game.LedSprite[] = [];
    let apple: game.LedSprite = null;
    let last_snake_part: game.LedSprite = null

    let directions: number[][]  = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    let direction : number = 1
    let pos_y : number = 0
    let pos_x : number = 0

    let score: number = 0
    let maxLength : number = 10

    export function turnLeft() {
        direction = (direction + 3) % 4
    }

    export function turnRight() {
        direction = (direction + 1) % 4
    }

    function createSnake(arr: Array<number>) {
        let result = [];
        result.push(game.createSprite(arr[0], arr[1]));
        result.push(game.createSprite(arr[2], arr[3]));
        return result;
    }

    function isSnake(x: number, y: number) {
        for (let part of snake) {
            if (part.x() == x && part.y() == y) {
                return true
            }
        }
        return false
    }

    function moveForward() {
        pos_x += directions[direction][0]
        pos_y += directions[direction][1]
        if (!(validateCoords(pos_x, pos_y))) {
            gameOver()
        }
        snake.unshift(game.createSprite(pos_x, pos_y))
        last_snake_part = snake.pop()
        last_snake_part.delete()
    }

    function gameOver() {
        game.setScore(score)
        game.pause()
        basic.pause(1000)
        game.gameOver()
    }

    function generateApple() {
        let x = Math.randomRange(0, 4);
        let y = Math.randomRange(0, 4);
        while (isSnake(x, y)){
            x = Math.randomRange(0, 4);
            y = Math.randomRange(0, 4);
        }
        apple.goTo(x, y);
        apple.setBrightness(100);
    }
    function validateCoords(nx: number, ny: number) {
        return nx >= 0 && nx <= 4 && ny >= 0 && ny <= 4 && !(isSnake(nx, ny))
    }

    export function startSnakeLoop(){
        snake = createSnake([pos_x, pos_y, pos_x + 1, pos_y]);
        apple = game.createSprite(2, 2)
        generateApple()
        while(true){
            if (game.isGameOver()) {
                return;
            }
            basic.pause(Math.max(100, 1000 - score * 50))
            moveForward()
            if (snake[0].isTouching(apple)) {
                if (snake.length < maxLength) {
                    snake.push(snake[snake.length - 1])
                }
                score += 1
                generateApple()
            }
        }
    }
}
