input.onButtonPressed(Button.A, function on_button_pressed_a() {
    if (!game_started) {
        if (game_counter > 1) {
            game_counter += -1
            basic.showNumber(game_counter)
        }
        
    } else {
        if (game_counter == 1) {
            FlappyBird.buttonPressedA()
        }
        
        if (game_counter == 2) {
            Snake.turnRight()
        }
        
    }
    
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (!game_started) {
        if (game_counter == 1) {
            game_started = true
            FlappyBird.startFlapyBird()
        } else if (game_counter == 2) {
            game_started = true
            Snake.startSnakeLoop()
        }
        
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (!game_started) {
        if (game_counter < 2) {
            game_counter += 1
            basic.showNumber(game_counter)
        }
        
    } else {
        if (game_counter == 1) {
            FlappyBird.buttonPressedB()
        }
        
        if (game_counter == 2) {
            Snake.turnLeft()
        }
        
    }
    
})
input.onGesture(Gesture.Shake, function on_gesture_shake() {
    control.reset()
})

let game_started = false
let game_counter = 1
basic.showNumber(game_counter)