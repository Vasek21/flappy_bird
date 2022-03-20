input.onButtonPressed(Button.A, function () {
    if (game.isGameOver()) {
    	
    }
    if (!(game_started)) {
        if (game_counter > 1) {
            game_counter += -1
            basic.showNumber(game_counter)
        }
    } else {
        if (game_counter == 1) {
            flappy_bird_wrapper.player.change(LedSpriteProperty.Y, -1)
        }
    }
})
// Flappy bird propretires
function startFlapyBird () {
    flappy_bird_wrapper.ticks = 0
    flappy_bird_wrapper.obstacles = []
    playing = true
    flappy_bird_wrapper.player = game.createSprite(0, 2)
    flappy_bird_wrapper.player.set(LedSpriteProperty.Blink, 300)
    while (playing) {
        while (flappy_bird_wrapper.obstacles.length > 0 && flappy_bird_wrapper.obstacles[0].get(LedSpriteProperty.X) == 0) {
            flappy_bird_wrapper.obstacles.removeAt(0).delete()
        }
        for (let obstacle of flappy_bird_wrapper.obstacles) {
            obstacle.change(LedSpriteProperty.X, -1)
        }
        if (flappy_bird_wrapper.ticks % 3 == 0) {
            flappy_bird_wrapper.empty_y_coord = randint(0, 4)
            for (let index = 0; index <= 4; index++) {
                if (index != flappy_bird_wrapper.empty_y_coord) {
                    flappy_bird_wrapper.obstacles.push(game.createSprite(4, index))
                }
            }
        }
        for (let obstacle2 of flappy_bird_wrapper.obstacles) {
            if (obstacle2.get(LedSpriteProperty.X) == flappy_bird_wrapper.player.get(LedSpriteProperty.X) && obstacle2.get(LedSpriteProperty.Y) == flappy_bird_wrapper.player.get(LedSpriteProperty.Y)) {
                playing = false
            }
        }
        if (!(playing)) {
            flappy_bird_wrapper.player.delete()
            for (let obstacle3 of flappy_bird_wrapper.obstacles) {
                obstacle3.delete()
            }
        }
        flappy_bird_wrapper.ticks += 1
        basic.pause(1000)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (game.isGameOver()) {
        control.reset()
    }
    if (!(game_started)) {
        if (game_counter == 1) {
            game_started = true
            startFlapyBird()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (!(playing) && game_started) {
    	
    }
    if (!(game_started)) {
        if (game_counter < 5) {
            game_counter += 1
            basic.showNumber(game_counter)
        }
    } else {
        if (game_counter == 1) {
            flappy_bird_wrapper.player.change(LedSpriteProperty.Y, 1)
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    control.reset()
})
function main () {
    basic.showNumber(game_counter)
}

let player: game.LedSprite = null
let obstacles: game.LedSprite[] = []
const flappy_bird_wrapper = { 
    player: player,
    ticks: 0,
    obstacles: obstacles,
    empty_y_coord: 0 };

let playing = false
let game_started = false
let game_counter = 0


game_counter = 1
main()
