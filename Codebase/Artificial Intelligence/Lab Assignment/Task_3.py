import heapq
from itertools import count

GOAL  = (1, 2, 3, 4, 5, 6, 7, 8, 0)
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


def count_inversions(state):
    tiles = [t for t in state if t]
    return sum(1 for i in range(len(tiles)) for j in range(i+1, len(tiles)) if tiles[i] > tiles[j])


def is_solvable(start):
    return count_inversions(start) % 2 == count_inversions(GOAL) % 2


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


def read_state():
    print("Enter the start state row by row (e.g. '1 2 3'), using 0 for the blank.")
    while True:
        tiles = []
        for r in range(1, 4):
            tiles.extend(input(f"  Row {r}: ").replace(",", " ").replace("_", "0").split())
        try:
            state = tuple(int(t) for t in tiles)
        except ValueError:
            print("  Invalid input: use digits only. Try again.\n")
            continue
        if sorted(state) != list(range(9)):
            print("  Invalid state: use each of 0-8 exactly once. Try again.\n")
            continue
        return state


def main():
    start = read_state()

    print("\nstart:")
    print_state(start)
    print("\ngoal:")
    print_state(GOAL)

    inv, goal_inv = count_inversions(start), count_inversions(GOAL)
    print(f"\ninversions : start={inv} ({'even' if inv % 2 == 0 else 'odd'}), goal={goal_inv} ({'even' if goal_inv % 2 == 0 else 'odd'})")

    if not is_solvable(start):
        print("status     : UNSOLVABLE (parity mismatch)")
        return
    print(f"status     : SOLVABLE (h={heuristic(start)})")

    path, log = gbfs(start)
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
