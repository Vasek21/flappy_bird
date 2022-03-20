def on_button_pressed_a():
    Bird.change(LedSpriteProperty.Y, -1)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    Bird.change(LedSpriteProperty.Y, 1)
input.on_button_pressed(Button.B, on_button_pressed_b)

EmptyObstacleY = 0
Bird: game.LedSprite = None
index = 0
Bird = game.create_sprite(0, 2)
Bird.set(LedSpriteProperty.BLINK, 300)

def on_forever():
    global EmptyObstacleY
    obstacle: List[game.LedSprite] = []
    while len(obstacle) > 0 and obstacle[0].get(LedSpriteProperty.X) == 0:
        obstacle.remove_at(0).delete()
    for obstacle2 in obstacle:
        obstacle2.change(LedSpriteProperty.X, -1)
    EmptyObstacleY = randint(0, 4)
    for index2 in range(5):
        if index2 != EmptyObstacleY:
            obstacle.append(game.create_sprite(4, index2))
    basic.pause(1000)
basic.forever(on_forever)
