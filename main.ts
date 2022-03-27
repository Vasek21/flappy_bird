input.onButtonPressed(Button.A, function () {
    if (!(game_started)) {
        if (game_counter > 1) {
            game_counter += -1
            basic.showNumber(game_counter)
        }
    } else {
        if (game_counter == 1) {
            flappy_bird.buttonPressedA();
        }
        if (game_counter == 2) {
            Snake.turnRight()
        }
    }
})

input.onButtonPressed(Button.AB, function () {
    if (game.isGameOver()) {
        control.reset()
    }
    if (!(game_started)) {
        if (game_counter == 1) {
            game_started = true;
            flappy_bird.startFlapyBird();
        }
        else if (game_counter == 2){
            game_started = true;
            Snake.startSnakeLoop();
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
        if( game_counter == 2){
            Snake.turnLeft()
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
