goal = (4, 4)
positions = [
    (0, 0),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 4)
]

def manhattan_distance(position, goal):
    return abs(position[0] - goal[0]) + abs(position[1] - goal[1])

for position in positions:
    distance = manhattan_distance(position, goal)
    print("Position:", position, "Manhattan Distance:", distance)