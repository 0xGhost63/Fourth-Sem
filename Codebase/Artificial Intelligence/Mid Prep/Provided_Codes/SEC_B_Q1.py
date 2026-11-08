# Part A: Hill Climbing Search on the maze (A -> Y)

# rows from top (y=5) to bottom (y=0); '#' = black tile (wall)
MAZE = [
    "##W#XY",  # y=5
    "RSTU#V",  # y=4
    "MN#OPQ",  # y=3
    "HIJ#KL",  # y=2
    "F#G###",  # y=1
    "A#BCDE",  # y=0
]

ROWS = len(MAZE)

# map (x, y) -> letter for every traversable tile
cells = {}
for r, row in enumerate(MAZE):
    y = ROWS - 1 - r
    for x, ch in enumerate(row):
        if ch != '#':
            cells[(x, y)] = ch

pos_of = {v: k for k, v in cells.items()}
START = pos_of['A']
GOAL = pos_of['Y']

# move order: up, down, left, right (ties go to the first one)
MOVES = [(0, 1), (0, -1), (-1, 0), (1, 0)]


def h(n):
    # Manhattan distance to goal
    return abs(n[0] - GOAL[0]) + abs(n[1] - GOAL[1])


def neighbors(n):
    for dx, dy in MOVES:
        nxt = (n[0] + dx, n[1] + dy)
        if nxt in cells:
            yield nxt


def hill_climbing():
    cur = START
    path = [cur]
    while cur != GOAL:
        # pick the neighbor with the lowest h (first one wins ties)
        best = None
        for nb in neighbors(cur):
            if best is None or h(nb) < h(best):
                best = nb
        # stop if no neighbor is better than the current node
        if best is None or h(best) >= h(cur):
            return path, False
        cur = best
        path.append(cur)
    return path, True


if __name__ == "__main__":
    path, reached = hill_climbing()
    print("Hill Climbing Path:")
    for p in path:
        print(f"  {cells[p]} {p}  h={h(p)}")
    print("Route:", " -> ".join(cells[p] for p in path))
    if reached:
        print("Goal reached")
    else:
        last = path[-1]
        print(f"Stuck at {cells[last]} (h={h(last)}), goal not reached")