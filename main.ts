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
            flappy_bird.buttonPressedA();
        }
    }
})

input.onButtonPressed(Button.AB, function () {
    if (game.isGameOver()) {
        control.reset()
    }
    if (!(game_started)) {
        if (game_counter == 1) {
            game_started = true
            flappy_bird.startFlapyBird()
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
            flappy_bird.buttonPressedB();
        }
    }
})
input.onGesture(Gesture.Shake, function () {
    control.reset()
})
function main() {
    basic.showNumber(game_counter)
}
let playing = false
let game_started = false
let game_counter = 1;
main()
