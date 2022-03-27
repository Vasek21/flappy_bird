
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace Snake {
    let delay = 0
    let score = 0
    let last: game.LedSprite = null
    let dx: number[] = []
    let dxOffset: number[][] = []
    let direction = 0
    let py = 0
    let px = 0
    direction = 1
    dxOffset = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    let snake: game.LedSprite[] =[];
    let apple: game.LedSprite;

    // when snake grows to 10 pixels, it stops growing
    // to avoid filling the LED
    let maxLength = 10
    

    export function turnLeft() {
        direction = (direction + 3) % 4
    }

    export function turnRight() {
        direction = (direction + 1) % 4
    }

    export function initSnake(arr: Array<number>) {
        let result = [];
        for (let i = 0; i + 1 < arr.length; i += 2) {
            result.push(game.createSprite(arr[i], arr[i + 1]));
        }
        return result;
    }

    function isOnSnake(x: number, y: number) {
        for (let body of snake) {
            if (body.x() == x && body.y() == y) {
                return true
            }
        }
        return false
    }

    export function moveForward() {
        dx = dxOffset[direction]
        px += dx[0]
        py += dx[1]
        if (!(validPixelCoordinate(px, py))) {
            gameOver()
        }
        snake.unshift(game.createSprite(px, py))
        last = snake.pop()
        last.delete()
    }
    export function resetGame() {
        game.setScore(0)
        score = 0
        direction = 0
        px = 0
        py = 0
        for (let s of snake) {
            s.delete()
        }
        snake = Snake.initSnake([px, py, px + 1, py]);
        placeNextApple()
        game.resume()
    }

    function gameOver() {
        game.setScore(score)
        game.pause()
        basic.pause(1000)
        game.gameOver()
    }

    export function placeNextApple() {
        let x, y;
        do {
            x = Math.randomRange(0, 4);
            y = Math.randomRange(0, 4);
        } while (isOnSnake(x, y));
        apple.goTo(x, y);
        apple.setBrightness(100);
    }
    export function validPixelCoordinate(nx: number, ny: number) {
        return nx >= 0 && nx <= 4 && ny >= 0 && ny <= 4 && !(isOnSnake(nx, ny))
    }

    export function startSnakeLoop(){
        snake = Snake.initSnake([px, py, px + 1, py]);
        apple = game.createSprite(2, 2)
        placeNextApple()
        while(true){
            if (game.isGameOver()) {
                return;
            }
            delay = Math.max(100, 1000 - score * 50)
            basic.pause(delay)
            moveForward()
            if (snake[0].isTouching(apple)) {
                if (snake.length < maxLength) {
                    snake.push(snake[snake.length - 1])
                }
                score += 1
                placeNextApple()
            }
        }
    }
}
