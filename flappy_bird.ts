
/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace FlappyBird {

    let obstacles: game.LedSprite[] = []
    let player: game.LedSprite = null
    let score : number = 0;
    let ticks : number = 0;

    //% block
    export function startFlapyBird() {
        player = game.createSprite(0, 2)
        player.set(LedSpriteProperty.Blink, 300)
        while (true) {
            while (obstacles.length > 0 && obstacles[0].get(LedSpriteProperty.X) == 0) {
                obstacles.removeAt(0).delete()
            }

            for (let obstacle of obstacles) {
                obstacle.change(LedSpriteProperty.X, -1)
            }

            if (ticks % 3 === 0) {
                let empty_y_coord = randint(0, 4)
                for (let i = 0; i <= 4; i++) {
                    if (i != empty_y_coord) {
                        obstacles.push(game.createSprite(4, i))
                    }
                }
                
            }

            if ((ticks - 2) % 3 === 0 && ticks !== 2){   
                score++;
            }

            for (let obst of obstacles) {
                if (obst.get(LedSpriteProperty.X) == player.get(LedSpriteProperty.X) && obst.get(LedSpriteProperty.Y) == player.get(LedSpriteProperty.Y)) {
                    game.setScore(score)
                    game.pause()
                    basic.pause(1000)
                    game.gameOver()
                }
            }

            ticks += 1
            basic.pause(Math.max(100, 1000 - score * 50))
        }
    }

    //% block
    export function buttonPressedA() {
        player.change(LedSpriteProperty.Y, -1)
    }


    //% block
    export function buttonPressedB() {
        player.change(LedSpriteProperty.Y, 1)
    }
}
