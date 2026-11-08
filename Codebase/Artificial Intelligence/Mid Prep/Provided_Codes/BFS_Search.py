state_space = {
    '1': ['2', '3', '4'],
    '2': ['5', '6'],
    '3': [],
    '4': ['7'],
    '5': [],
    '6': [],
    '7': []
}
def bfs(graph, start_node, end_node):
    bfs_traversal = []
    to_visit = []      
    visited = []       
    to_visit.append(start_node)
    visited.append(start_node)

    # Main BFS Loop
    while to_visit:
        selected_node = to_visit.pop(0)

        # Goal Checking
        if selected_node == end_node:
            bfs_traversal.append(selected_node)
            break
        bfs_traversal.append(selected_node)

        # Visit all unvisited neighbors
        for neighbour in graph[selected_node]:
            if neighbour not in visited:
                to_visit.append(neighbour)
                visited.append(neighbour)
    return bfs_traversal

start_state = "1"
goal_state = "7"
bfs_traversal = bfs(state_space, start_state, goal_state)
print("BFS Traversal:", bfs_traversal)
