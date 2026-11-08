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

def greedy_best_first(graph,heuristic,start,goal):

    frontier=[start]
    visited = set()
    current=start

    while frontier:
        current=min(frontier,key=lambda node :heuristic[node])
        frontier.remove(current)
        print(current)


        ## goal check
        if current==goal:
            print("Goal Found")
            return
        visited.add(current)

        for neighbour in graph[current]:
            if neighbour not in visited and neighbour not in frontier:
                frontier.append(neighbour)
                print (f"Added neighbour {neighbour}")

greedy_best_first(graph,heuristic,'A','G')



