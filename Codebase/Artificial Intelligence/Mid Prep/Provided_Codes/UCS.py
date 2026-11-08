import heapq

graph = {
    'A': [('B', 6), ('C', 9), ('E', 1)],
    'B': [('A', 6), ('D', 3), ('E', 4)],
    'C': [('A', 9), ('F', 2), ('G', 3)],
    'D': [('B', 3), ('E', 5), ('F', 7)],
    'E': [('A', 1), ('B', 4), ('D', 5), ('F', 6)],
    'F': [('C', 2), ('E', 6), ('D', 7)],
    'G': [('C', 3)]
}

def uniform_cost_search(graph, start, goal):
    queue = [(0, start)]      
    cost_so_far = {start: 0}  
    parent = {start: None}    
   
    while queue:
        cost, node = heapq.heappop(queue)
        if node == goal:
            return cost, reconstruct_path(parent, goal)
        for neighbor, edge_cost in graph[node]:
            new_cost = cost + edge_cost

            if neighbor not in cost_so_far or new_cost < cost_so_far[neighbor]:
                cost_so_far[neighbor] = new_cost
                parent[neighbor] = node
                heapq.heappush(queue, (new_cost, neighbor))

    return None

def reconstruct_path(parent, goal):
    path = []
    node = goal
    # Walk backwards from the goal to the start using the parents
    while node is not None:
        path.append(node)
        node = parent[node]
    path.reverse()
    return path

# Example usage of the UCS function
start_node = 'C'
goal_node = 'B'
result = uniform_cost_search(graph, start_node, goal_node)

if result:
    total_cost, path = result
    print(f"Least cost path from {start_node} to {goal_node}: {' -> '.join(path)} with total cost {total_cost}")
else:
    print(f"No path found from {start_node} to {goal_node}")