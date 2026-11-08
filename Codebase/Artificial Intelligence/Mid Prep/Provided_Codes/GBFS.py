# Graph represented using an adjacency list
graph = {
'A': ['B', 'C'],
'B': ['D', 'E'],
'C': ['F'],
'D': ['G'],
'E': ['G'],
'F': ['G'], 
'G': []
}
# Heuristic values
heuristic = {
'A': 7,
'B': 5,
'C': 3,
'D': 4,
'E': 2,
'F': 1,
'G': 0
}
def greedy_best_first(graph, heuristic, start, goal):
    frontier = [start]
    visited = set()
    while frontier: # the lambda creates a small temporary function that tells Python what value to use for comparison. it means take a node as input & Return that node's heuristic value."."
        current = min(frontier, key=lambda node: heuristic[node]) # Select the node having the smallest heuristic
        frontier.remove(current)
        print(current)
# Goal test
        if current == goal:
            print("Goal found!")
            return
        visited.add(current)
        
        for neighbour in graph[current]:# Add unvisited neighbours to the frontier
            if neighbour not in visited and neighbour not in frontier:
                frontier.append(neighbour)

# Driver Code
greedy_best_first(graph, heuristic, 'A', 'G')