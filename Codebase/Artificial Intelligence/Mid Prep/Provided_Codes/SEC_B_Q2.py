# Part B: A* Search on the maze (A -> Y), Manhattan heuristic, unit cost
import heapq

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

# allowed moves: up, down, left, right
MOVES = [(0, 1), (0, -1), (-1, 0), (1, 0)]


def h(n):
    # Manhattan distance: |xn - xg| + |yn - yg|
    return abs(n[0] - GOAL[0]) + abs(n[1] - GOAL[1])


def neighbors(n):
    for dx, dy in MOVES:
        nxt = (n[0] + dx, n[1] + dy)
        if nxt in cells:
            yield nxt


def a_star():
    counter = 0  # keeps heap ordering stable
    # heap entry: (f, -g, counter, node); -g prefers deeper nodes on ties
    open_heap = [(h(START), 0, counter, START)]
    g_cost = {START: 0}
    parent = {START: None}
    closed = set()
    order = []  # expansion order: (letter, g, h, f)

    while open_heap:
        f, neg_g, _, cur = heapq.heappop(open_heap)
        if cur in closed:
            continue
        closed.add(cur)
        g = -neg_g
        order.append((cells[cur], g, h(cur), f))

        if cur == GOAL:
            # rebuild the path using parents
            path = []
            while cur is not None:
                path.append(cur)
                cur = parent[cur]
            return path[::-1], g, order

        for nb in neighbors(cur):
            new_g = g + 1  # each move costs 1
            if nb not in g_cost or new_g < g_cost[nb]:
                g_cost[nb] = new_g
                parent[nb] = cur
                counter += 1
                # f(n) = g(n) + h(n)
                heapq.heappush(open_heap, (new_g + h(nb), -new_g, counter, nb))

    return None, None, order


if __name__ == "__main__":
    path, cost, order = a_star()
    print("Expansion order (node, g, h, f):")
    for name, g, hh, f in order:
        print(f"  {name}: g={g} h={hh} f={f}")
    if path:
        print("Path:", " -> ".join(cells[p] for p in path))
        print("Cost:", cost)
    else:
        print("No path found")