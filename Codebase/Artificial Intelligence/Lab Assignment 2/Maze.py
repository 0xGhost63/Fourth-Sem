#AI LAB ASSIGNMENT # 2
#SUBMITTED TO : MA'AM KHAULA QADEER
#NAME : SANNAN 
#REG # SP25-BSE-118


### 1-> Closed Path,0->Open path,2->Start,3->Goal
maze = [
    [1, 1, 1, 1, 1, 3, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 2, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
]

state_space = {}
start_state = None
goal_state = None

for r in range(len(maze)):
    for c in range(len(maze[0])):
        if maze[r][c] == 1:
            continue                      
        if maze[r][c] == 2:
            start_state = (r, c)
        if maze[r][c] == 3:
            goal_state = (r, c)

        state_space[(r, c)] = []
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < len(maze) and 0 <= nc < len(maze[0]) and maze[nr][nc] != 1:
                state_space[(r, c)].append((nr, nc))


def bfs(graph, start_node, end_node):
    frontier = []          
    visited = []           
    parent = {}            

    frontier.append(start_node)
    visited.append(start_node)
    parent[start_node] = None

    while frontier:
        selected_node = frontier.pop(0)       # dequeue (FIFO)

        if selected_node == end_node:
            path = []
            while selected_node is not None:
                path.append(selected_node)
                selected_node = parent[selected_node]
            path.reverse()
            return path

        for neighbour in graph[selected_node]:
            if neighbour not in visited:
                frontier.append(neighbour)
                visited.append(neighbour)
                parent[neighbour] = selected_node

    return None                               


path = bfs(state_space, start_state, goal_state)

if path:
    print("Path:", path)
    print("Total moves:", len(path) - 1)
else:
    print("No path found")