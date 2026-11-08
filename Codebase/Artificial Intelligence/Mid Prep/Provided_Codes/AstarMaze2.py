
import heapq

# Coordinates of traversable nodes
nodes = {
    'A': (0, 0), 'B': (2, 0), 'C': (3, 0),
    'D': (4, 0), 'E': (5, 0), 'F': (0, 1),
    'G': (2, 1), 'H': (0, 2), 'I': (1, 2),
    'J': (2, 2), 'K': (4, 2), 'L': (5, 2),
    'M': (0, 3), 'N': (1, 3), 'O': (3, 3),
    'P': (4, 3), 'Q': (5, 3), 'R': (0, 4),
    'S': (1, 4), 'T': (2, 4), 'U': (3, 4),
    'V': (5, 4), 'W': (2, 5), 'X': (4, 5),
    'Y': (5, 5)
}

# Graph connections
graph = {
    'A': ['F'],
    'B': ['C', 'G'],
    'C': ['B', 'D'],
    'D': ['C', 'E'],
    'E': ['D'],
    'F': ['A', 'H'],
    'G': ['B', 'J'],
    'H': ['F', 'I', 'M'],
    'I': ['H', 'J', 'N'],
    'J': ['I', 'G'],
    'K': ['L', 'P'],
    'L': ['K', 'Q'],
    'M': ['H', 'N', 'R'],
    'N': ['M', 'I', 'S'],
    'O': ['P', 'U'],
    'P': ['O', 'Q', 'K'],
    'Q': ['P', 'L', 'V'],
    'R': ['M', 'S'],
    'S': ['R', 'T', 'N'],
    'T': ['S', 'U', 'W'],
    'U': ['T', 'O'],
    'V': ['Q', 'Y'],
    'W': ['T'],
    'X': [],
    'Y': ['V']
}

# Manhattan distance heuristic
def manhattan_distance(node, goal):
    x1, y1 = nodes[node]
    x2, y2 = nodes[goal]
    return abs(x1 - x2) + abs(y1 - y2)


def a_star(graph, start, goal):
    open_list = []

    # Store (f-value, node)
    heapq.heappush(
        open_list,
        (manhattan_distance(start, goal), start)
    )

    g_cost = {start: 0}
    parent = {start: None}
    closed = set()

    while open_list:
        current_f, current = heapq.heappop(open_list)#heapq.heappop() removes the tuple with the smallest priority value.

        if current in closed:#If the node has already been explored, continue skips the remaining statements in the current loop iteration and starts the next iteration.
            continue

        print(
            "Node:", current,
            "g =", g_cost[current],
            "h =", manhattan_distance(current, goal),
            "f =", current_f
        )

        # Goal test
        if current == goal:
            path = []
            #This loop follows the parent pointers backward, starting from the goal.
            while current is not None:
                path.append(current)
                current = parent[current]

            path.reverse()
            return path

        closed.add(current)#Marking a node as explored.This adds the current node to the set of explored nodes. 

        # Explore neighbours
        for neighbour in graph[current]:
            if neighbour in closed:#If a neighbor has already been explored, the algorithm skips it.
                continue
#Calculates the cost of reaching the neighbor through the current node.+ 1 means every graph edge has a cost of 1 in this implementation.
            new_g = g_cost[current] + 1
#Checking whether the new path is better.The neighbor has not yet been assigned a known path cost or A cheaper path to that neighbor has been found.
            if neighbour not in g_cost or new_g < g_cost[neighbour]:
                g_cost[neighbour] = new_g#Stores the actual cost of reaching the neighbor.
                h = manhattan_distance(neighbour, goal)
                f = new_g + h

                parent[neighbour] = current#Records the current node as the neighbor's parent.
                heapq.heappush(open_list, (f, neighbour))#Adds the neighbor and its priority to the queue, so it can be explored later.

    return None
# Driver code
start = 'A'
goal = 'Y'

path = a_star(graph, start, goal)

print("\nFinal Path:")
print(path)

if path:
    print("Total Path Cost:", len(path) - 1)
else:
    print("No path found.")
