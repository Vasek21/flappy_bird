
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace flappy_bird {

    let obstacles: game.LedSprite[] = []
    let player: game.LedSprite = null
    const flappy_bird_wrapper = {
        player: player,
        ticks: 0,
        obstacles: obstacles,
        empty_y_coord: 0
    };

    //% block
    export function startFlapyBird() {
        flappy_bird_wrapper.ticks = 0
        flappy_bird_wrapper.obstacles = []
        flappy_bird_wrapper.player = game.createSprite(0, 2)
        flappy_bird_wrapper.player.set(LedSpriteProperty.Blink, 300)
        while (true) {
            while (flappy_bird_wrapper.obstacles.length > 0 && flappy_bird_wrapper.obstacles[0].get(LedSpriteProperty.X) == 0) {
                flappy_bird_wrapper.obstacles.removeAt(0).delete()
                //game.setScore(game.score() + 1)
            }
            for (let obstacle of flappy_bird_wrapper.obstacles) {
                obstacle.change(LedSpriteProperty.X, -1)
            }
            if (flappy_bird_wrapper.ticks % 3 == 0) {
                flappy_bird_wrapper.empty_y_coord = randint(0, 4)
                for (let i = 0; i <= 4; i++) {
                    if (i != flappy_bird_wrapper.empty_y_coord) {
                        flappy_bird_wrapper.obstacles.push(game.createSprite(4, i))
                    }
                }
                
            }
            for (let obstacle2 of flappy_bird_wrapper.obstacles) {
                if (obstacle2.get(LedSpriteProperty.X) == flappy_bird_wrapper.player.get(LedSpriteProperty.X) && obstacle2.get(LedSpriteProperty.Y) == flappy_bird_wrapper.player.get(LedSpriteProperty.Y)) {
                    game.gameOver()
                }
            }

            flappy_bird_wrapper.ticks += 1
            
            basic.pause(1000)
        }
    }

    //% block
    export function buttonPressedA() {
        flappy_bird_wrapper.player.change(LedSpriteProperty.Y, -1)
    }

    //% block
    export function buttonPressedB() {
        flappy_bird_wrapper.player.change(LedSpriteProperty.Y, 1)
    }
}
