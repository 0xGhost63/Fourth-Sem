import heapq
from itertools import count

GOAL  = (1, 2, 3, 4, 5, 6, 7, 8, 0)
START = (1, 2, 3, 4, 0, 6, 7, 5, 8)
MOVES = {"Up": (-1,0), "Down": (1,0), "Left": (0,-1), "Right": (0,1)}


def heuristic(state):
    return sum(1 for s, g in zip(state, GOAL) if s and s != g)


def print_state(state):
    for r in range(3):
        print("   ", " ".join("_" if t == 0 else str(t) for t in state[3*r:3*r+3]))


def neighbors(state):
    b = state.index(0)
    r, c = divmod(b, 3)
    for name, (dr, dc) in MOVES.items():
        nr, nc = r+dr, c+dc
        if 0 <= nr < 3 and 0 <= nc < 3:
            s = list(state)
            s[b], s[3*nr+nc] = s[3*nr+nc], s[b]
            yield name, tuple(s)


def gbfs(start):
    tie = count()
    heap = [(heuristic(start), next(tie), start)]
    parent = {start: (None, None)}
    closed, log = set(), []

    while heap:
        h, _, state = heapq.heappop(heap)
        if state in closed:
            continue
        closed.add(state)
        log.append((state, h))

        if state == GOAL:
            path = []
            while state:
                prev, move = parent[state]
                path.append((move, state))
                state = prev
            return path[::-1], log

        for move, nxt in neighbors(state):
            if nxt not in parent:
                parent[nxt] = (state, move)
                heapq.heappush(heap, (heuristic(nxt), next(tie), nxt))

    return None, log


def main():
    print("start:")
    print_state(START)
    print(f"  h = {heuristic(START)}")
    print("\ngoal:")
    print_state(GOAL)

    path, log = gbfs(START)
    if path is None:
        print("\nno solution found.")
        return

    print("\n-- solution path --")
    for step, (move, state) in enumerate(path):
        label = "start" if move is None else f"step {step} ({move})"
        print(f"  {label}  h={heuristic(state)}")
        print_state(state)

    print("\n-- explored states --")
    for i, (state, h) in enumerate(log, 1):
        print(f"  {i}. {' '.join('_' if t==0 else str(t) for t in state)}  h={h}")

    print("\n-- summary --")
    print(f"  steps    : {len(path) - 1}")
    print(f"  explored : {len(log)}")
    print(f"  moves    : {', '.join(m for m, _ in path[1:]) or '-'}")


if __name__ == "__main__":
    main()
